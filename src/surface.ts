/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { Camera, MapDocument, MapLayout, MapNode, MapSurfaceOptions, MapViewState, NodeAction, DropPosition, NodeSize } from './types';
import { canDropBranches } from './core';
import { MIN_SCALE, MAX_SCALE } from './types';
import { DEFAULT_HOTKEYS, resolveHotkey, type HotkeyAction } from './hotkeys';
import { CreationHandles } from './creation-handles';
import { InlineEditor, type InlineOptions } from './inline';

interface Position { x: number; y: number; width: number; height: number }
interface TouchPoint { x: number; y: number }
interface NavigationStop { view: MapViewState; selection: string[] }
interface RenderedNode { label: string; content: HTMLDivElement; started: boolean; pending?: Promise<void> }
const MARKDOWN_BATCH_SIZE = 8;
const MARKDOWN_LOADING_THRESHOLD = 128;
const WIDTH = 328;
const COLUMN_GAP = 74;
const ROW_GAP = 18;
const ROOT_GAP = 44;
const MIN_WIDTH = 84;
const EDITOR_VIEWPORT_PADDING = 12;
const VERTICAL_NAVIGATION: Partial<Record<HotkeyAction, HotkeyAction>> = {
  parent: 'previous', child: 'next', previous: 'parent', next: 'child',
  'select-parent': 'select-previous', 'select-child': 'select-next',
  'select-previous': 'select-parent', 'select-next': 'select-child',
};

/** A read-only document surface: every source mutation is an explicit action. */
export class MapSurface {
  private readonly lastChildByParent = new Map<string, string>();
  private readonly backStops: NavigationStop[] = [];
  private readonly forwardStops: NavigationStop[] = [];
  private readonly viewport: HTMLDivElement;
  private readonly world: HTMLDivElement;
  private readonly edges: SVGSVGElement;
  private readonly nodeLayer: HTMLDivElement;
  private readonly live: HTMLDivElement;
  private readonly loading: HTMLDivElement;
  private handles?: CreationHandles;
  private doc: MapDocument | null = null;
  private state: MapViewState = { collapsed: [], selected: null, camera: { x: 36, y: 36, scale: 1 }, focusRoot: null };
  private collapsed = new Set<string>();
  private selection = new Set<string>();
  private selectionAnchor: string | null = null;
  private selectionMode = false;
  private hasTouchMarqueeSelection = false;
  private marquee?: { pointer: number; x: number; y: number; moved: boolean; base: string[]; before: string[]; element: HTMLDivElement };

  private readonly elements = new Map<string, HTMLDivElement>();
  private readonly positions = new Map<string, Position>();
  private visible: string[] = [];
  private visibleRoots: string[] = [];
  private query = '';
  private matches = new Set<string>();
  private readonly cleanup: (() => void)[] = [];
  private destroyed = false;
  private frame: number | null = null;
  private followAfterLayout = false;
  private preservedEditAnchor?: string;
  private observer: ResizeObserver | null = null;
  private menu: HTMLDivElement | null = null;
  private readonly touches = new Map<number, TouchPoint>();
  private pan: { pointer: number; x: number; y: number; camera: Camera; moved: boolean;
    sample?: { x: number; y: number; time: number; vx: number; vy: number };
    table?: { element: HTMLElement; x: number; y: number } } | null = null;
  private coastFrame: number | null = null;
  private pinch: { distance: number; scale: number; worldX: number; worldY: number } | null = null;
  private suppressClickUntil = 0;
  private resizing?: {id: string; pointer: number; capture: HTMLElement; x: number; y: number; width: number; height: number; previous?: NodeSize};
  private bounds = { width: 0, height: 0 };
  private mode: MapLayout = 'map';
  private editing?: { id: string; editor: InlineEditor; original: MapDocument; state: MapViewState; latest?: MapDocument; latestState?: MapViewState; embedded?: { slot: HTMLElement; restore: () => void } };
  private touchHold?: { pointer: number; x: number; y: number; timer: number };
  private lastPress?: { id: string; time: number; x: number; y: number };
  private dragScrollFrame: number | null = null;
  private dragPoint?: TouchPoint;
  private drag?: { id: string; ids: string[]; position: DropPosition; pointer: number; x: number; y: number; active: boolean; target: string | null };
  private rendered = new Map<string, RenderedNode>();
  private markdownQueue: RenderedNode[] = [];
  private markdownInFlight = 0;
  private loadingMarkdown = false;
  private cancelMarkdownFrame?: () => void;
  private renderKey = '';
  private paintScale = 1;
  private paintX = 0;
  private paintY = 0;
  private settleTimer = 0;
  private cameraFrame: number | null = null;

  constructor(private readonly container: HTMLElement, private readonly options: MapSurfaceOptions) {
    const d = container.ownerDocument;
    this.viewport = d.createElement('div');
    this.viewport.className = 'tvm-surface';
    // Like Obsidian Canvas, own these gestures instead of starting workspace swipes.
    this.viewport.dataset.ignoreSwipe = 'true';
    this.viewport.tabIndex = 0;
    this.viewport.setAttribute('role', 'tree');
    this.viewport.setAttribute('aria-multiselectable', 'true');
    // Obsidian shows every aria-label as a hover tooltip, so name the map through a hidden label instead.
    const label = d.createElement('span');
    label.id = `tvm-map-label-${this.instanceId}`; label.hidden = true; label.textContent = t("Map");
    this.viewport.setAttribute('aria-labelledby', label.id);
    this.world = d.createElement('div');
    this.world.className = 'tvm-world';
    this.edges = d.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.edges.classList.add('tvm-edges');
    this.edges.setAttribute('aria-hidden', 'true');
    this.nodeLayer = d.createElement('div');
    this.nodeLayer.className = 'tvm-nodes';
    this.world.append(this.nodeLayer);
    this.live = d.createElement('div');
    this.live.className = 'tvm-sr-only';
    this.live.setAttribute('aria-live', 'polite');
    this.loading = d.createElement('div');
    this.loading.className = 'tvm-loading-map';
    this.loading.setAttribute('role', 'status');
    this.loading.textContent = t("Loading map…");
    this.loading.hidden = true;
    this.viewport.append(this.edges, this.world, this.live, this.loading, label);
    container.append(this.viewport);
    this.listen(this.viewport, 'click', (e) => this.click(e as MouseEvent), { capture: true });
    this.listen(this.viewport, 'auxclick', (e) => { if ((e as MouseEvent).button === 1 && (e.target as Element).closest('a')) this.click(e as MouseEvent); }, { capture: true });
    this.listen(this.viewport, 'mouseover', (event) => {
      if (this.editing) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a.internal-link');
      if (!anchor || anchor.contains((event as MouseEvent).relatedTarget as Node)) return;
      const link = anchor.getAttribute('data-href') ?? anchor.getAttribute('href');
      if (link && this.options.onHoverLink) { event.stopPropagation(); this.options.onHoverLink(event as MouseEvent, anchor, link); }
    }, { capture: true });
    this.listen(this.viewport, 'dblclick', (e) => { void this.doubleClick(e as MouseEvent); }, { capture: true });
    this.listen(this.viewport, 'contextmenu', (e) => this.contextMenu(e as MouseEvent));
    this.listen(this.viewport, 'keydown', (e) => this.handleKeydown(e as KeyboardEvent), { capture: true });
    this.listen(this.viewport, 'wheel', (e) => this.wheel(e as WheelEvent), { passive: false });
    this.listen(this.viewport, 'pointerdown', (e) => this.pointerDown(e as PointerEvent));
    this.listen(this.viewport, 'pointermove', (e) => this.pointerMove(e as PointerEvent));
    this.listen(this.viewport, 'pointerup', (e) => this.pointerUp(e as PointerEvent));
    this.listen(this.viewport, 'pointercancel', (e) => this.pointerUp(e as PointerEvent));
    this.listen(this.viewport, 'lostpointercapture', event => {
      if (this.resizing?.pointer === (event as PointerEvent).pointerId) this.finishResize(false);
      if (event.target === this.viewport) { this.clearDrag(); this.cancelMarquee(); }
    });
    this.listen(this.nodeLayer, 'load', () => this.scheduleContentLayout(), { capture: true });
    this.listen(d, 'pointerdown', (e) => { if (this.menu && !this.menu.contains(e.target as Node)) this.closeMenu(); });
    const Observer = d.defaultView?.ResizeObserver;
    if (Observer) {
      this.observer = new Observer(() => { if (this.editing) this.followEditorViewport(); else this.scheduleLayout(); });
      this.observer.observe(this.viewport);
    }
    const win = d.defaultView;
    const followEditor = () => this.followEditorViewport();
    if (win) this.listen(win, 'resize', followEditor);
    if (win?.visualViewport) {
      this.listen(win.visualViewport, 'resize', followEditor);
      this.listen(win.visualViewport, 'scroll', followEditor);
    }
    this.applyCamera();
  }

  update(doc: MapDocument, state?: MapViewState): void {
    if (this.destroyed) return;
    if (this.editing) { this.editing.latest = doc; if (state) this.editing.latestState = state; return; }
    this.finishResize(true);
    this.clearDrag(); this.cancelMarquee();
    const previous = this.doc;
    if (state) { this.selection.clear(); this.hasTouchMarqueeSelection = false; }
    this.doc = doc;
    if (state) {
      this.state = {
        collapsed: [...state.collapsed], selected: state.selected, focusRoot: state.focusRoot,
        camera: this.safeCamera(state.camera),
        ...(state.nodeSizes ? {nodeSizes: {...state.nodeSizes}} : {}),
      };
    }
    this.collapsed = new Set([...(state?.collapsed ?? this.collapsed)].filter((id) => doc.byId.has(id)));
    if (this.state.nodeSizes) this.state.nodeSizes = Object.fromEntries(Object.entries(this.state.nodeSizes).filter(([id]) => doc.byId.has(id)));
    if (this.state.focusRoot && !doc.byId.has(this.state.focusRoot)) this.state.focusRoot = null;
    if (this.state.selected && !doc.byId.has(this.state.selected)) {
      let old = previous?.byId.get(this.state.selected);
      while (old && !doc.byId.has(old.id)) old = old.parentId ? previous?.byId.get(old.parentId) : undefined;
      this.state.selected = old?.id ?? null;
    }
    if (!previous && !state) this.state.selected ??= this.state.focusRoot ?? doc.roots[0] ?? null;
    this.matches = new Set(this.matchNodes(this.query).map((node) => node.id));
    this.render();
  }

  getState(): MapViewState {
    if (this.editing) return { ...this.editing.state, camera: { ...this.state.camera } };
    return { ...this.state, collapsed: [...this.collapsed], camera: { ...this.state.camera } };
  }

  getSelection(): string[] { return [...this.selection]; }
  isSelectionMode(): boolean { return this.selectionMode; }
  toggleSelectionMode(): void {
    if (this.editing) return;
    this.selectionMode = !this.selectionMode;
    this.viewport.classList.toggle('is-selecting', this.selectionMode);
    this.viewport.focus({ preventScroll: true });
    this.emitState();
  }

  isEditing(): boolean { return !!this.editing; }
  async saveForCreation(): Promise<boolean> {
    const editing = this.editing;
    if (!editing) return true;
    await editing.editor.submit();
    return !this.editing;
  }
  focusEditor(): void { this.editing?.editor.focus(); }
  highlightDraft(query: string): void { this.editing?.editor.highlightSearch(query); }
  async waitForNodeMarkdown(id: string): Promise<void> {
    const entry = this.rendered.get(id);
    if (!entry) return;
    if (!entry.started) {
      this.markdownQueue = this.markdownQueue.filter(value => value !== entry);
      this.markdownQueue.push(entry);
      this.renderMarkdownBatch();
      while (!entry.started && !this.destroyed && this.rendered.get(id) === entry) {
        const pending = [...this.rendered.values()].find(value => value.pending)?.pending;
        if (!pending) return;
        await pending;
        this.renderMarkdownBatch();
      }
    }
    await entry.pending;
  }
  invalidateMarkdown(): void {
    this.markdownQueue = [];
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    if (!this.editing) this.render();
  }
  beginEdit(id: string, initial: string, save: (text: string) => Promise<string | undefined>, mount?: InlineOptions['mount'], draft?: MapDocument, onFinish?: () => void, multiline = false, embeddedFrame?: HTMLElement): void {
    if (this.editing || !this.doc || this.destroyed) { this.focusEditor(); return; }
    this.preservedEditAnchor = undefined;
    const original = this.doc, state = this.getState();
    const editor = new InlineEditor(this.container.ownerDocument, initial, {
      allowEmpty: true, multiline,
      emptyFallback: !multiline && original.byId.get(id)?.children.length ? t("Untitled") : undefined,
      save: async text => { const selected = await save(text); onFinish?.(); if (this.editing?.editor === editor) this.finishEdit(selected); },
      cancel: () => { onFinish?.(); this.finishEdit(); }, resize: () => this.scheduleLayout(true), mount,
      createAbove: event => {
        if (resolveHotkey(event, this.options.getHotkeys?.()) !== 'add-sibling-before') return false;
        if (!event.repeat) this.options.onAction('add-sibling-before', id);
        return true;
      },
    });
    let embedded: {slot: HTMLElement; restore: () => void} | undefined;
    const content = this.elements.get(id)?.querySelector<HTMLElement>('.tvm-node-content');
    if (embeddedFrame && content?.contains(embeddedFrame)) {
      const rect = embeddedFrame.getBoundingClientRect(), viewport = this.viewport.getBoundingClientRect(), area = this.editorArea();
      const left = viewport.left + area.left + EDITOR_VIEWPORT_PADDING, top = viewport.top + area.top + EDITOR_VIEWPORT_PADDING;
      const right = left + area.width - EDITOR_VIEWPORT_PADDING * 2, bottom = top + area.height - EDITOR_VIEWPORT_PADDING * 2;
      const slot = this.container.ownerDocument.createElement('div'); slot.className = 'tvm-embedded-note-editor';
      if (rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom) {
        slot.style.paddingTop = Math.max(0, (top - rect.top) / this.state.camera.scale) + 'px';
        slot.style.paddingLeft = Math.max(0, (left - rect.left) / this.state.camera.scale) + 'px';
        editor.host.style.width = Math.max(26, (Math.min(rect.right, right) - Math.max(rect.left, left)) / this.state.camera.scale) + 'px';
        editor.host.style.maxWidth = '100%';
      }
      embeddedFrame.before(slot); slot.append(editor.host);
      const display = embeddedFrame.style.display; embeddedFrame.style.display = 'none';
      const muted: HTMLElement[] = [], wrappers: HTMLElement[] = [];
      const dim = (parent: Element) => {
        for (const child of [...parent.childNodes]) {
          if (child === slot || child === embeddedFrame) continue;
          if (child.nodeType === 1) {
            const element = child as HTMLElement;
            if (element.contains(slot)) dim(element);
            else { element.classList.add('tvm-embed-context-muted'); muted.push(element); }
          } else if (child.nodeType === 3 && child.textContent?.trim()) {
            const wrapper = this.container.ownerDocument.createElement('span'); wrapper.className = 'tvm-embed-context-muted';
            child.replaceWith(wrapper); wrapper.append(child); wrappers.push(wrapper);
          }
        }
      };
      dim(content);
      embedded = {slot, restore: () => {
        slot.remove(); embeddedFrame.style.display = display;
        if (!embeddedFrame.style.length) embeddedFrame.removeAttribute('style');
        for (const element of muted) {
          element.classList.remove('tvm-embed-context-muted');
          if (!element.className) element.removeAttribute('class');
        }
        for (const wrapper of wrappers) wrapper.replaceWith(...wrapper.childNodes);
      }};
    }
    this.editing = { id, editor, original, state, embedded };
    this.doc = draft ?? original;
    if (embedded) {
      this.select(id);
      this.preservedEditAnchor = id;
      this.render();
    } else this.reveal(id);
    editor.focus(); this.followEditorViewport();
    editor.input.setSelectionRange(editor.input.value.length, editor.input.value.length);
  }
  private finishEdit(selected?: string): void {
    const edit = this.editing;
    if (!edit) return;
    this.editing = undefined;
    this.followAfterLayout = false;
    if (edit.editor.multiline) this.preservedEditAnchor = selected ?? edit.id;
    edit.editor.dispose(); edit.embedded?.restore();
    const state = { ...(edit.latestState ?? edit.state), camera: { ...this.state.camera } };
    this.update(edit.latest ?? edit.original, state);
    if (selected && !edit.editor.multiline) this.reveal(selected);
    else { this.viewport.focus({ preventScroll: true }); this.emitState(); }
  }

  setLayout(mode: MapLayout): void {
    this.preservedEditAnchor = undefined;
    if (this.destroyed || this.mode === mode) return;
    this.mode = mode;
    this.viewport.dataset.layout = mode;
    this.layout();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  refreshLayout(): void {
    const id = this.state.selected;
    const before = id ? this.positions.get(id) : undefined;
    this.layout();
    const after = id ? this.positions.get(id) : undefined;
    if (before && after) {
      this.state.camera.x += (before.x + before.width / 2 - after.x - after.width / 2) * this.state.camera.scale;
      this.state.camera.y += (before.y + before.height / 2 - after.y - after.height / 2) * this.state.camera.scale;
    }
    this.applyCamera();
    this.emitState();
  }

  revealSelection(ids: string[]): void {
    const valid = ids.filter(id => this.doc?.byId.has(id));
    for (const id of valid) this.reveal(id);
    this.selection = new Set(valid.filter(id => this.elements.has(id)));
    this.state.selected = [...this.selection].at(-1) ?? null;
    this.selectionAnchor = this.state.selected;
    this.paintSelection(); this.emitState();
  }

  reveal(id: string): void {
    if (this.editing && id !== this.editing.id) { this.focusEditor(); return; }
    if (!this.doc?.byId.has(id)) return;
    const chain = new Set<string>();
    let changed = false;
    let node = this.doc.byId.get(id);
    while (node?.parentId && !chain.has(node.parentId)) {
      chain.add(node.parentId);
      changed = this.collapsed.delete(node.parentId) || changed;
      node = this.doc.byId.get(node.parentId);
    }
    if (this.state.focusRoot && id !== this.state.focusRoot && !chain.has(this.state.focusRoot)) { this.state.focusRoot = null; changed = true; }
    this.state.selected = id;
    if (changed || !this.elements.has(id) || (this.editing && !this.editing.editor.host.isConnected)) this.render();
    else this.select(id);
    this.ensureVisible(id, true);
    this.viewport.focus({ preventScroll: true });
    this.emitState();
  }

  jumpTo(id: string): void {
    if (!this.doc?.byId.has(id) || this.editing) return;
    if (id !== this.state.selected) this.rememberNavigation();
    this.reveal(id);
  }

  private rememberNavigation(stop: NavigationStop = {view: this.getState(), selection: this.getSelection()}): void {
    if (this.editing) return;
    this.backStops.push(stop);
    if (this.backStops.length > 30) this.backStops.shift();
    this.forwardStops.length = 0;
  }

  private rememberFoldChange(stop: NavigationStop): void {
    if (stop.view.collapsed.length !== this.collapsed.size || stop.view.collapsed.some(id => !this.collapsed.has(id))) this.rememberNavigation(stop);
  }

  canNavigateHistory(direction: 'back' | 'forward'): boolean {
    return !this.editing && (direction === 'back' ? this.backStops : this.forwardStops).length > 0;
  }

  navigateHistory(direction: 'back' | 'forward'): void {
    if (!this.doc || !this.canNavigateHistory(direction)) return;
    const from = direction === 'back' ? this.backStops : this.forwardStops;
    const to = direction === 'back' ? this.forwardStops : this.backStops;
    const stop = from.pop()!;
    to.push({ view: this.getState(), selection: this.getSelection() });
    this.update(this.doc, stop.view);
    this.selection = new Set(stop.selection.filter(id => this.elements.has(id)));
    this.paintSelection();
    this.viewport.focus({ preventScroll: true });
    this.emitState();
  }

  search(query: string, alphabetical = false, scope?: ReadonlySet<string>): MapNode[] {
    this.query = query.trim();
    this.searchScope = scope;
    const words = this.query.split(/\s+/).sort((a, b) => b.length - a.length);
    this.searchMatcher = this.query
      ? new RegExp(words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'giu')
      : undefined;
    const result = this.matchNodes(this.query);
    this.matches = new Set(result.map((node) => node.id));
    for (const [id, el] of this.elements) {
      const content = el.querySelector('.tvm-node-content');
      if (content) this.paintSearchMatch(content, this.matches.has(id));
    }
    if (alphabetical) result.sort((a, b) => a.text.localeCompare(b.text, undefined, { numeric: true, sensitivity: 'base' }));
    return result;
  }

  setDepth(depth: number): void {
    if (this.editing) return;
    if (!this.doc) return;
    const previous = {view: this.getState(), selection: this.getSelection()};
    this.collapsed.clear();
    if (Number.isFinite(depth)) {
      const maxLevel = Math.max(1, Math.floor(depth));
      const stack = this.doc.roots.map((id) => ({ id, level: 1 }));
      const seen = new Set<string>();
      while (stack.length) {
        const { id, level } = stack.pop()!;
        if (seen.has(id)) continue;
        seen.add(id);
        const node = this.doc.byId.get(id);
        if (!node) continue;
        if (level >= maxLevel && node.children.length) this.collapsed.add(id);
        for (const child of node.children) stack.push({ id: child, level: level + 1 });
      }
    }
    this.rememberFoldChange(previous);
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  setBranchDepth(id: string, depth: number): void {
    if (this.editing) return;
    if (!this.doc?.byId.has(id)) return;
    const previous = {view: this.getState(), selection: this.getSelection()};
    const maxLevel = Math.max(0, Math.floor(depth));
    const pending = [{ id, level: 0 }];
    const seen = new Set<string>();
    while (pending.length) {
      const item = pending.pop()!;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      const node = this.doc.byId.get(item.id);
      if (!node) continue;
      if (node.children.length && item.level >= maxLevel) this.collapsed.add(item.id);
      else this.collapsed.delete(item.id);
      for (const child of node.children) pending.push({ id: child, level: item.level + 1 });
    }
    this.rememberFoldChange(previous);
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  collapseBranches(ids: string[]): void {
    let changed = false;
    for (const id of ids) {
      if (this.doc?.byId.get(id)?.children.length && !this.collapsed.has(id)) {
        this.collapsed.add(id);
        changed = true;
      }
    }
    if (changed) { this.render(); this.emitState(); }
  }

  fit(): void {
    if (!this.positions.size) return;
    const size = this.viewportSize();
    const scale = Math.max(MIN_SCALE, Math.min(1, (size.width - 72) / Math.max(this.bounds.width, 1), (size.height - 72) / Math.max(this.bounds.height, 1)));
    this.state.camera = {
      x: (size.width - this.bounds.width * scale) / 2,
      y: (size.height - this.bounds.height * scale) / 2,
      scale,
    };
    this.applyCamera();
    this.emitState();
  }

  destroy(): void {
    this.stopCoasting();
    if (this.destroyed) return;
    this.destroyed = true;
    this.finishResize(true);
    this.cancelMarkdownFrame?.();
    this.markdownQueue = [];
    this.container.ownerDocument.defaultView?.clearTimeout(this.settleTimer);
    if (this.cameraFrame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.cameraFrame);
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    this.editing?.editor.dispose(); this.editing?.embedded?.restore(); this.editing = undefined;
    this.clearDrag(); this.cancelMarquee();
    for (const clean of this.cleanup) clean();
    this.cleanup.length = 0;
    this.observer?.disconnect();
    if (this.frame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
    this.closeMenu();
    this.handles?.destroy();
    this.viewport.remove();
    this.elements.clear();
    this.positions.clear();
    this.touches.clear();
  }

  private listen(target: EventTarget, name: string, handler: EventListener, options?: AddEventListenerOptions): void {
    target.addEventListener(name, handler, options);
    this.cleanup.push(() => target.removeEventListener(name, handler, options));
  }

  private safeCamera(camera: Camera): Camera {
    return {
      x: Number.isFinite(camera?.x) ? camera.x : 36,
      y: Number.isFinite(camera?.y) ? camera.y : 36,
      scale: Number.isFinite(camera?.scale) ? Math.max(MIN_SCALE, Math.min(MAX_SCALE, camera.scale)) : 1,
    };
  }

  private emitState(): void {
    if (!this.destroyed) { this.updateHandles(); this.options.onState(this.getState()); }
  }

  private searchScope?: ReadonlySet<string>;
  private searchMatcher?: RegExp;
  private matchNodes(query: string): MapNode[] {
    if (!this.doc || !query) return [];
    const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return this.doc.nodes.filter(node => {
      if (this.searchScope && !this.searchScope.has(node.id)) return false;
      const label = node.text.toLocaleLowerCase();
      return words.every(word => label.includes(word));
    });
  }

  private paintSearchMatch(content: Element, matched: boolean): void {
    for (const mark of content.querySelectorAll('mark.tvm-search-match')) {
      if (mark.closest('.tvm-inline-editor')) continue;
      const parent = mark.parentNode;
      mark.replaceWith(...mark.childNodes);
      parent?.normalize();
    }
    const matcher = this.searchMatcher;
    if (!matched || !matcher) return;
    const doc = content.ownerDocument;
    const walker = doc.createTreeWalker(content, 4);
    const textNodes: Text[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!node.parentElement?.closest('.tvm-inline-editor')) textNodes.push(node);
    }
    for (const node of textNodes) {
      const matches = [...node.data.matchAll(matcher)];
      for (const match of matches.reverse()) {
        const tail = node.splitText(match.index!);
        tail.splitText(match[0].length);
        const mark = doc.createElement('mark');
        mark.className = 'tvm-search-match';
        tail.replaceWith(mark);
        mark.append(tail);
      }
    }
  }

  private render(): void {
    if (!this.doc || this.destroyed) return;
    const key = this.options.getRenderKey?.() ?? '';
    if (key !== this.renderKey) {
      this.preservedEditAnchor = undefined;
      this.positions.clear();
      this.lastChildByParent.clear();
      this.backStops.length = 0;
      this.forwardStops.length = 0;
    }
    for (const [id, value] of this.rendered) {
      if (key !== this.renderKey || !this.doc.byId.has(id)) { this.options.releaseMarkdown?.(value.content); this.rendered.delete(id); }
    }
    this.renderKey = key;
    this.markdownQueue = [];
    this.closeMenu();
    this.elements.clear();
    this.nodeLayer.replaceChildren();
    this.edges.replaceChildren();
    this.visible = [];
    this.visibleRoots = this.state.focusRoot ? [this.state.focusRoot] : [...this.doc.roots];
    const stack = [...this.visibleRoots].reverse();
    const visited = new Set<string>();
    while (stack.length) {
      const id = stack.pop()!;
      const node = this.doc.byId.get(id);
      if (!node || visited.has(id)) continue;
      visited.add(id);
      this.visible.push(id);
      if (!this.collapsed.has(id)) for (let i = node.children.length - 1; i >= 0; i--) stack.push(node.children[i]);
    }
    this.reconcileSelection(visited);
    const descendantCounts = new Map<string, number>();
    // Source order places parents first; reverse traversal counts descendants once.
    const all = this.documentOrder();
    for (let i = all.length - 1; i >= 0; i--) {
      const node = this.doc.byId.get(all[i])!;
      descendantCounts.set(node.id, node.children.reduce((total, id) => total + 1 + (descendantCounts.get(id) ?? 0), 0));
    }
    const fragment = this.container.ownerDocument.createDocumentFragment();
    const rootSet = new Set(this.visibleRoots);
    let elementIndex = 0;
    for (const id of this.visible) {
      const node = this.doc.byId.get(id)!;
      const el = this.container.ownerDocument.createElement('div');
      el.className = 'tvm-node';
      el.dataset.nodeId = id;
      el.id = `tvm-node-${this.instanceId}-${elementIndex++}`;
      el.setAttribute('role', 'treeitem');
      el.setAttribute('aria-selected', String(this.selection.has(id)));
      el.classList.toggle('is-selected', this.selection.has(id));
      el.classList.toggle('is-root', rootSet.has(id));
      el.classList.toggle('is-complete', /^\s*\[[xX]\]/.test(node.text));
      el.classList.toggle('is-task', /^\s*\[[ xX]\]/.test(node.text));
      el.style.width = `${WIDTH}px`;
      const task = /^\s*\[([ xX])\][ \t]*/.exec(node.text);
      const label = task ? node.text.slice(task[0].length) : node.text;
      if (task) {
        const checkbox = this.container.ownerDocument.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'tvm-task-checkbox';
        checkbox.checked = task[1].toLowerCase() === 'x';
        checkbox.tabIndex = -1;
        checkbox.setAttribute('aria-label', `${checkbox.checked ? t("Mark incomplete") : t("Mark completed")}: ${this.plainText(label)}`);
        el.append(checkbox);
      }
      const cached = this.rendered.get(id);
      const reuse = cached?.label === label;
      if (cached && !reuse) this.options.releaseMarkdown?.(cached.content);
      const content = reuse ? cached!.content : this.container.ownerDocument.createElement('div');
      content.className = 'tvm-node-content';
      const entry = reuse ? cached! : { label, content, started: false };
      if (!reuse) { content.textContent = label || t("Untitled"); this.rendered.set(id, entry); }
      if (!entry.started) this.markdownQueue.push(entry);
      if (this.query || content.querySelector('.tvm-search-match')) this.paintSearchMatch(content, this.matches.has(id));
      el.append(content);
      const resize = this.container.ownerDocument.createElement('button');
      resize.type = 'button'; resize.className = 'tvm-node-resize';
      resize.setAttribute('aria-label', t("Resize node"));
      resize.title = t("Drag to resize. Arrow keys adjust size; Home or double-click resets it.");
      resize.addEventListener('dblclick', event => { event.preventDefault(); event.stopPropagation(); this.setNodeSize(id); this.scheduleLayout(); this.emitState(); });
      resize.addEventListener('keydown', event => {
        if (this.editing || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
        event.preventDefault(); event.stopPropagation();
        const pos = this.positions.get(id); if (!pos) return;
        const size = this.state.nodeSizes?.[id] ?? pos, step = event.shiftKey ? 20 : 5;
        this.preservedEditAnchor = id;
        this.setNodeSize(id, event.key === 'Home' ? undefined : {width: size.width + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0), height: size.height + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0)});
        this.scheduleLayout(); this.emitState();
      });
      el.append(resize);
      if (node.blockId) {
        const marker = this.container.ownerDocument.createElement('span');
        marker.className = 'tvm-node-address'; marker.textContent = '🔗'; marker.title = t("Node address: ^") + node.blockId;
        marker.setAttribute('aria-label', marker.title); marker.setAttribute('role', 'button'); marker.tabIndex = 0;
        marker.addEventListener('keydown', event => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault(); event.stopPropagation(); this.select(id); this.options.onAction('node-backlinks', id);
        });
        el.append(marker);
      }
      if (node.children.length) {
        const folded = this.collapsed.has(id);
        el.setAttribute('aria-expanded', String(!folded));
        const fold = this.container.ownerDocument.createElement('button');
        fold.className = 'tvm-fold';
        fold.dataset.foldId = id;
        fold.tabIndex = -1;
        fold.setAttribute('aria-label', `${folded ? 'Expand' : 'Collapse'} ${descendantCounts.get(id) ?? node.children.length} descendants`);
        const foldBinding = this.options.getHotkeys?.().fold ?? DEFAULT_HOTKEYS.fold;
        fold.title = (folded ? t("Expand node") : t("Collapse node")) + (foldBinding ? ` (${foldBinding.replace(/Key|Digit/g, '')})` : '');
        fold.textContent = folded ? `+${descendantCounts.get(id) ?? node.children.length}` : '−';
        el.append(fold);
      }
      this.elements.set(id, el);
      fragment.append(el);
    }
    this.nodeLayer.append(fragment);
    this.markdownQueue.reverse();
    this.setMarkdownLoading(this.markdownQueue.length >= MARKDOWN_LOADING_THRESHOLD);
    if (!this.cancelMarkdownFrame) this.renderMarkdownBatch();
    if (this.editing) {
      const el = this.elements.get(this.editing.id);
      if (el) {
        el.classList.add('is-editing');
        if (this.editing.embedded) el.classList.add('is-editing-embed');
        else el.append(this.editing.editor.host);
      }
    }
    if (!this.visible.length) {
      const empty = this.container.ownerDocument.createElement('div');
      empty.className = 'tvm-empty';
      empty.textContent = t("This map has no nodes.");
      const create = this.container.ownerDocument.createElement('button');
      create.type = 'button'; create.className = 'tvm-create-first'; create.textContent = t("Add first node");
      create.onclick = () => this.options.onAction('add-sibling', null);
      empty.append(' ', create);
      this.nodeLayer.append(empty);
    }
    this.updateActiveDescendant();
    this.layout();
    this.scheduleContentLayout();
    this.applyCamera();
  }

  private renderMarkdownBatch(): void {
    if (this.destroyed) return;
    for (let count = 0; count < MARKDOWN_BATCH_SIZE && this.markdownInFlight < MARKDOWN_BATCH_SIZE; count++) {
      const entry = this.markdownQueue.pop();
      if (!entry) break;
      const { label, content } = entry;
      entry.started = true;
      try {
        content.replaceChildren();
        const pending = this.options.renderMarkdown(label || t("Untitled"), content);
        if (pending && typeof pending.then === 'function') {
          this.markdownInFlight++;
          entry.pending = Promise.resolve(pending).catch(() => {
            if (!this.destroyed) content.textContent = label;
          }).finally(() => {
            this.markdownInFlight--;
            entry.pending = undefined;
            if (this.query && !this.destroyed) this.paintSearchMatch(content, this.matches.has(content.parentElement?.dataset.nodeId ?? ''));
            if (this.loadingMarkdown || this.nodeLayer.contains(content)) this.scheduleContentLayout();
            this.scheduleMarkdownBatch();
          });
        } else if (this.query) this.paintSearchMatch(content, this.matches.has(content.parentElement?.dataset.nodeId ?? ''));
      } catch {
        content.textContent = label;
      }
    }
    this.scheduleMarkdownBatch();
  }

  private scheduleMarkdownBatch(): void {
    if (this.destroyed || this.cancelMarkdownFrame || !this.markdownQueue.length || this.markdownInFlight >= MARKDOWN_BATCH_SIZE) return;
    const win = this.container.ownerDocument.defaultView;
    if (!win) return;
    const frame = win.requestAnimationFrame(() => {
      this.cancelMarkdownFrame = undefined;
      this.renderMarkdownBatch();
      this.scheduleContentLayout();
    });
    this.cancelMarkdownFrame = () => win.cancelAnimationFrame(frame);
  }

  private setMarkdownLoading(loading: boolean): void {
    this.loadingMarkdown = loading;
    this.loading.hidden = !loading;
    this.viewport.classList.toggle('is-loading-map', loading);
    this.viewport.setAttribute('aria-busy', String(loading));
  }

  private hasPendingMarkdown(): boolean {
    return !!(this.markdownQueue.length || this.markdownInFlight);
  }

  private scheduleContentLayout(): void {
    if (!this.loadingMarkdown || !this.hasPendingMarkdown()) this.scheduleLayout();
  }

  private readonly instanceId = Math.random().toString(36).slice(2, 9);

  private documentOrder(): string[] {
    if (!this.doc) return [];
    const stack = [...this.doc.roots].reverse();
    const result: string[] = [];
    const seen = new Set<string>();
    while (stack.length) {
      const id = stack.pop()!;
      const node = this.doc.byId.get(id);
      if (!node || seen.has(id)) continue;
      seen.add(id);
      result.push(id);
      for (let i = node.children.length - 1; i >= 0; i--) stack.push(node.children[i]);
    }
    return result;
  }

  private reconcileSelection(visible: Set<string>): void {
    let id = this.state.selected;
    this.selection = new Set([...this.selection].filter(value => visible.has(value)));
    if (!id) return;
    const seen = new Set<string>();
    while (id && !visible.has(id) && !seen.has(id)) {
      seen.add(id);
      id = this.doc?.byId.get(id)?.parentId ?? null;
    }
    this.state.selected = id && visible.has(id) ? id : this.visible[0] ?? null;
    if (this.state.selected) this.selection.add(this.state.selected);
  }

  private scheduleLayout(followSelection = false): void {
    this.followAfterLayout ||= followSelection;
    if (this.destroyed || this.frame !== null) return;
    const win = this.container.ownerDocument.defaultView;
    if (!win?.requestAnimationFrame) return;
    this.frame = win.requestAnimationFrame(() => {
      this.frame = null;
      if (!this.destroyed) {
        this.layout();
        if (this.loadingMarkdown && !this.hasPendingMarkdown()) {
          this.setMarkdownLoading(false);
          this.applyCamera();
        }
        if (this.followAfterLayout && this.editing && this.state.selected) {
          this.ensureVisible(this.state.selected);
          this.emitState();
        }
      }
      this.followAfterLayout = false;
    });
  }

  private layout(): void {
    const id = this.preservedEditAnchor;
    const before = id ? this.positions.get(id) : undefined;
    this.layoutNodes();
    const after = id ? this.positions.get(id) : undefined;
    if (before && after) {
      this.state.camera.x += (before.x - after.x) * this.state.camera.scale;
      this.state.camera.y += (before.y - after.y) * this.state.camera.scale;
      this.applyCamera();
    }
  }
  private layoutNodes(): void {
    if (!this.doc || this.destroyed) return;
    const height = new Map<string, number>();
    const branchHeight = new Map<string, number>();
    const visible = new Set(this.visible);
    const widths = new Map<string, number>();
    const levels = new Map<string, number>();
    const columns = new Map<number, number>();
    const vertical = this.mode === 'vertical';
    const widthMode = this.mode === 'map' || vertical ? this.options.getWidthMode?.() ?? 'fixed' : 'fixed';
    const sizes = this.mode === 'map' || vertical ? this.state.nodeSizes : undefined;
    for (const id of this.visible) {
      const el = this.elements.get(id)!;
      el.style.height = '';
      el.style.width = widthMode === 'fixed' || id === this.editing?.id ? `${WIDTH}px` : 'max-content';
      el.style.maxWidth = widthMode === 'fixed' ? '' : `${WIDTH}px`;
      const content = el.querySelector<HTMLElement>('.tvm-node-content');
      if (content) { content.style.maxHeight = ''; content.style.overflowY = ''; }
      if (sizes?.[id]) { el.style.width = `${sizes[id].width}px`; el.style.maxWidth = ''; }
    }
    for (const id of this.visible) {
      const node = this.doc.byId.get(id)!;
      const level = node.parentId && levels.has(node.parentId) ? levels.get(node.parentId)! + 1 : 0;
      levels.set(id, level);
      const fallback = Math.max(MIN_WIDTH, Math.min(WIDTH, this.plainText(node.text).length * 7.5 + 34));
      // offsetWidth rounds to an integer; leave room for fractional text metrics
      // so a natural-width label cannot wrap merely because the zoom changed.
      const measured = this.elements.get(id)!.offsetWidth;
      const width = sizes?.[id]?.width ?? (widthMode === 'fixed' ? WIDTH : measured ? Math.min(WIDTH, measured + 2) : fallback);
      widths.set(id, width);
      columns.set(level, Math.max(columns.get(level) ?? 0, width));
    }
    for (const id of this.visible) {
      const width = sizes?.[id]?.width ?? (widthMode === 'column' && !vertical ? columns.get(levels.get(id)!)! : widths.get(id)!);
      widths.set(id, width);
      const el = this.elements.get(id)!;
      el.style.width = `${width}px`;
      el.style.maxWidth = '';
      const maxHeight = sizes?.[id]?.height ?? this.options.getNodeMaxHeight?.(), content = el.querySelector<HTMLElement>('.tvm-node-content');
      if (maxHeight && content && id !== this.editing?.id && ['map', 'vertical'].includes(this.mode)) {
        const chrome = el.offsetHeight - content.offsetHeight;
        content.style.maxHeight = `${Math.max(24, maxHeight - chrome)}px`;
        content.style.overflowY = 'auto';
      }
    }
    if (this.mode !== 'outline') this.fitEditorHeight();
    for (const id of this.visible) {
      const el = this.elements.get(id)!;
      height.set(id, el.offsetHeight || this.estimateHeight(this.doc.byId.get(id)!.text));
    }
    if (vertical && widthMode === 'column') {
      columns.clear();
      for (const id of this.visible) {
        const level = levels.get(id)!;
        columns.set(level, Math.max(columns.get(level) ?? 0, height.get(id)!));
      }
    }
    if (this.mode === 'outline') {
      this.positions.clear();
      const levels = new Map<string, number>();
      const width = Math.max(WIDTH, this.viewportSize().width - 88);
      let y = 0;
      let maxX = 0;
      for (const id of this.visible) {
        const node = this.doc.byId.get(id)!;
        const level = node.parentId && levels.has(node.parentId) ? levels.get(node.parentId)! + 1 : 0;
        levels.set(id, level);
        const el = this.elements.get(id)!;
        const ownWidth = Math.max(WIDTH, width - level * 28);
        el.style.width = `${ownWidth}px`;
        if (id === this.editing?.id) this.fitEditorHeight();
        const ownHeight = el.offsetHeight || height.get(id)!;
        const pos = { x: level * 28, y, width: ownWidth, height: ownHeight };
        this.positions.set(id, pos);
        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        el.setAttribute('aria-level', String(level + 1));
        y += ownHeight + 7;
        maxX = Math.max(maxX, pos.x + ownWidth + 20);
      }
      this.bounds = { width: maxX, height: Math.max(0, y - 7) };
      this.edges.replaceChildren();
      return;
    }
    const rowGap = this.mode === 'table' ? 0 : ROW_GAP;
    const columnGap = this.mode === 'table' ? 0 : COLUMN_GAP;
    for (let i = this.visible.length - 1; i >= 0; i--) {
      const id = this.visible[i];
      const children = this.doc.byId.get(id)!.children.filter((child) => visible.has(child));
      const total = children.reduce((sum, child) => sum + (branchHeight.get(child) ?? 0), 0) + Math.max(0, children.length - 1) * rowGap;
      branchHeight.set(id, Math.max((vertical ? widths : height).get(id)!, total));
    }
    let rootY = 0;
    const stack: { id: string; x: number; y: number; level: number }[] = [];
    for (const id of this.visibleRoots) {
      if (!visible.has(id)) continue;
      stack.push({ id, x: 0, y: rootY, level: 1 });
      rootY += branchHeight.get(id)! + ROOT_GAP;
    }
    this.positions.clear();
    let maxX = 0;
    let maxY = 0;
    while (stack.length) {
      const item = stack.pop()!;
      const ownHeight = height.get(item.id)!;
      const branch = branchHeight.get(item.id)!;
      const ownWidth = widths.get(item.id)!;
      const pos = this.mode === 'table'
        ? { x: item.x, y: item.y, width: WIDTH, height: branch }
        : vertical
          ? { x: item.y + (branch - ownWidth) / 2, y: item.x, width: ownWidth, height: ownHeight }
          : { x: item.x, y: item.y + (branch - ownHeight) / 2, width: ownWidth, height: ownHeight };
      this.positions.set(item.id, pos);
      const el = this.elements.get(item.id)!;
      if (this.mode === 'table') el.style.height = `${pos.height}px`;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      el.setAttribute('aria-level', String(item.level));
      maxX = Math.max(maxX, pos.x + pos.width + 20);
      maxY = Math.max(maxY, pos.y + pos.height);
      const children = this.doc.byId.get(item.id)!.children.filter((id) => visible.has(id));
      const childTotal = children.reduce((sum, id) => sum + branchHeight.get(id)!, 0) + Math.max(0, children.length - 1) * rowGap;
      let y = item.y + (branch - childTotal) / 2;
      for (const id of children) {
        stack.push({ id, x: item.x + (vertical ? widthMode === 'column' ? columns.get(levels.get(item.id)!)! : ownHeight : ownWidth) + columnGap, y, level: item.level + 1 });
        y += branchHeight.get(id)! + rowGap;
      }
    }
    this.bounds = { width: maxX, height: maxY };
    if (this.mode === 'table') {
      this.edges.replaceChildren();
      return;
    }
    const fragment = this.container.ownerDocument.createDocumentFragment();
    for (const id of this.visible) {
      const parentId = this.doc.byId.get(id)!.parentId;
      if (!parentId) continue;
      const from = this.positions.get(parentId);
      const to = this.positions.get(id);
      if (!from || !to) continue;
      const x1 = from.x + from.width;
      const y1 = from.y + from.height / 2;
      const x2 = to.x;
      const y2 = to.y + to.height / 2;
      const path = this.container.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');
      if (vertical) {
        const startX = from.x + from.width / 2, startY = from.y + from.height;
        const endX = to.x + to.width / 2, endY = to.y;
        path.setAttribute('d', `M ${startX} ${startY} C ${startX} ${startY + COLUMN_GAP / 2}, ${endX} ${endY - COLUMN_GAP / 2}, ${endX} ${endY}`);
      } else {
        path.setAttribute('d', `M ${x1} ${y1} C ${x1 + COLUMN_GAP / 2} ${y1}, ${x2 - COLUMN_GAP / 2} ${y2}, ${x2} ${y2}`);
      }
      fragment.append(path);
    }
    this.edges.replaceChildren(fragment);
    this.paintEdges(this.viewportSize());
  }

  private paintEdges(size: { width: number; height: number }): void {
    if (this.mode !== 'map' && this.mode !== 'vertical') return;
    const { x, y, scale } = this.state.camera;
    this.edges.setAttribute('viewBox', `${-x / scale} ${-y / scale} ${size.width / scale} ${size.height / scale}`);
  }

  private estimateHeight(text: string): number {
    const lines = this.plainText(text).split('\n').reduce((n, line) => n + Math.max(1, Math.ceil(line.length / 36)), 0);
    return Math.max(44, lines * 21 + 24);
  }

  private plainText(text: string): string {
    return text.replace(/!?(\[\[)([^\]]+)\]\]/g, '$2').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`~]/g, '');
  }

  private viewportSize(): { width: number; height: number } {
    const rect = this.viewport.getBoundingClientRect();
    return { width: this.viewport.clientWidth || rect.width || 800, height: this.viewport.clientHeight || rect.height || 600 };
  }

  private updateHandles(viewportRect?: DOMRect): void {
    if (this.options.showCreationHandles?.() === false) {
      this.handles?.destroy(); this.handles = undefined; return;
    }
    this.handles ??= new CreationHandles(this.viewport, (action, id) => this.options.onAction(action, id));
    const id = this.editing?.id ?? (this.selection.size === 1 && !this.selectionMode ? this.state.selected : null);
    const pos = id ? this.positions.get(id) : undefined, c = this.state.camera;
    const geometry = viewportRect && pos ? { viewport: viewportRect, node: {
      left: viewportRect.left + pos.x * c.scale + c.x, top: viewportRect.top + pos.y * c.scale + c.y,
      right: viewportRect.left + (pos.x + pos.width) * c.scale + c.x, bottom: viewportRect.top + (pos.y + pos.height) * c.scale + c.y,
      width: pos.width * c.scale, height: pos.height * c.scale,
    } } : undefined;
    this.handles?.place(id ? this.elements.get(id) : undefined, id, geometry, this.mode === 'vertical');
  }

  private applyCamera(fast = false): void {
    const win = this.container.ownerDocument.defaultView;
    if (fast && win?.requestAnimationFrame) {
      if (this.cameraFrame === null) this.cameraFrame = win.requestAnimationFrame(() => {
        this.cameraFrame = null;
        if (!this.destroyed) this.paintCamera(true);
      });
      return;
    }
    if (this.cameraFrame !== null) { win?.cancelAnimationFrame(this.cameraFrame); this.cameraFrame = null; }
    this.paintCamera(fast);
  }

  private paintCamera(fast = false): void {
    const c = this.state.camera;
    const size = this.viewportSize();
    const viewportRect = this.viewport.getBoundingClientRect();
    const win = this.container.ownerDocument.defaultView;
    win?.clearTimeout(this.settleTimer);
    const transformPan = this.options.useTransformPan?.() ?? true;
    if (!transformPan) {
      // Keep desktop layout in map units even after the zoom gesture ends.
      this.world.style.zoom = '';
      this.world.style.transformOrigin = '0 0';
      this.world.style.transform = c.scale === 1 ? '' : `scale(${c.scale})`;
      this.world.style.willChange = '';
      this.world.style.left = `${c.x}px`;
      this.world.style.top = `${c.y}px`;
    } else if (fast) {
      // Transform the current layout during the gesture; repaint sharp text once it stops.
      this.world.style.transformOrigin = '0 0';
      this.world.style.willChange = 'transform';
      this.world.style.transform = `translate(${(c.x - this.paintX) / this.paintScale}px, ${(c.y - this.paintY) / this.paintScale}px) scale(${c.scale / this.paintScale})`;
      this.settleTimer = win?.setTimeout(() => { if (!this.destroyed) this.applyCamera(); }, 160) ?? 0;
    } else {
      this.paintScale = c.scale;
      this.paintX = c.x; this.paintY = c.y;
      this.world.style.zoom = String(c.scale);
      this.world.style.transform = '';
      this.world.style.willChange = '';
      this.world.style.left = `${c.x / c.scale}px`;
      this.world.style.top = `${c.y / c.scale}px`;
    }
    this.paintEdges(size);
    const grid = 24 * c.scale * 2 ** -Math.floor(Math.log2(c.scale));
    this.viewport.style.backgroundSize = `${grid}px ${grid}px`;
    this.viewport.style.backgroundPosition = `${c.x}px ${c.y}px`;
    this.updateHandles(viewportRect);
    // Hidden nodes keep their layout metrics, but do not repaint outside the viewport.
    for (const [id, pos] of this.positions) {
      const x = pos.x * c.scale + c.x, y = pos.y * c.scale + c.y;
      const visible = x + pos.width * c.scale >= -120 && y + pos.height * c.scale >= -120 && x <= size.width + 120 && y <= size.height + 120;
      const el = this.elements.get(id);
      if (el) el.style.visibility = visible || this.editing?.id === id ? '' : 'hidden';
    }
  }

  private editorArea(): { left: number; top: number; width: number; height: number } {
    const size = this.viewportSize(), rect = this.viewport.getBoundingClientRect();
    const visual = this.container.ownerDocument.defaultView?.visualViewport;
    if (!visual) return { left: 0, top: 0, ...size };
    const left = Math.max(0, visual.offsetLeft - rect.left), top = Math.max(0, visual.offsetTop - rect.top);
    const right = Math.min(size.width, visual.offsetLeft + visual.width - rect.left);
    const bottom = Math.min(size.height, visual.offsetTop + visual.height - rect.top);
    return { left, top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
  }

  private followEditorViewport(): void {
    if (!this.editing || this.destroyed) return;
    this.editing.editor.resize();
    this.scheduleLayout(true);
  }

  private fitEditorHeight(): void {
    if (!this.editing) return;
    const node = this.elements.get(this.editing.id);
    if (!node) return;
    const available = (this.editorArea().height - EDITOR_VIEWPORT_PADDING * 2) / this.state.camera.scale;
    this.editing.editor.fitHeight(this.editing.embedded ? this.editing.editor.host : node, available);
  }

  private ensureVisible(id: string, center = false): void {
    let pos = this.positions.get(id);
    if (!pos) return;
    const embedded = this.editing?.id === id ? this.editing.embedded : undefined;
    const node = this.elements.get(id);
    if (embedded && node) {
      const field = this.editing!.editor.host;
      const rect = field.getBoundingClientRect(), parent = node.getBoundingClientRect();
      pos = {x: pos.x + (rect.left - parent.left) / this.state.camera.scale, y: pos.y + (rect.top - parent.top) / this.state.camera.scale,
        width: field.offsetWidth, height: field.offsetHeight};
    }
    const c = this.state.camera;
    const area = this.editing?.id === id ? this.editorArea() : { left: 0, top: 0, ...this.viewportSize() };
    const size = { width: area.width, height: area.height };
    const padding = this.editing?.id === id ? EDITOR_VIEWPORT_PADDING : 44;
    if (embedded && !center) {
      const left = pos.x * c.scale + c.x, top = pos.y * c.scale + c.y;
      if (left < area.left + size.width - padding && left + pos.width * c.scale > area.left + padding
        && top < area.top + size.height - padding && top + pos.height * c.scale > area.top + padding) return;
    }
    if (center) {
      c.x = area.left + size.width / 2 - (pos.x + pos.width / 2) * c.scale;
      c.y = area.top + size.height / 2 - (pos.y + pos.height / 2) * c.scale;
    } else {
      const left = pos.x * c.scale + c.x;
      const right = left + pos.width * c.scale;
      const top = pos.y * c.scale + c.y;
      const bottom = top + pos.height * c.scale;
      if (pos.width * c.scale > size.width - padding * 2) c.x = area.left + padding - pos.x * c.scale;
      else if (left < area.left + padding) c.x += area.left + padding - left;
      else if (right > area.left + size.width - padding) c.x -= right - area.left - size.width + padding;
      if (pos.height * c.scale > size.height - padding * 2) c.y = area.top + padding - pos.y * c.scale;
      else if (top < area.top + padding) c.y += area.top + padding - top;
      else if (bottom > area.top + size.height - padding) c.y -= bottom - area.top - size.height + padding;
    }
    this.applyCamera();
  }

  private select(id: string, follow = false, mode: 'single' | 'toggle' | 'range' = 'single'): void {
    if (!this.elements.has(id)) return;
    this.preservedEditAnchor = undefined;
    if (id !== this.state.selected || mode !== 'single') this.rememberNavigation();
    if (mode === 'range') {
      this.selectionAnchor ??= this.state.selected ?? id;
      const from = this.visible.indexOf(this.selectionAnchor), to = this.visible.indexOf(id);
      this.selection = new Set(from < 0 ? [id] : this.visible.slice(Math.min(from, to), Math.max(from, to) + 1));
    } else {
      this.selectionAnchor = id;
      if (mode === 'single') {
        this.selection = new Set([id]);
        this.hasTouchMarqueeSelection = false;
      }
      else if (this.selection.has(id)) this.selection.delete(id); else this.selection.add(id);
    }
    this.state.selected = this.selection.has(id) ? id : [...this.selection].at(-1) ?? null;
    this.paintSelection();
    if (follow) this.ensureVisible(id);
    this.emitState();
  }

  private paintSelection(): void {
    for (const [nodeId, el] of this.elements) {
      el.classList.toggle('is-selected', this.selection.has(nodeId));
      el.setAttribute('aria-selected', String(this.selection.has(nodeId)));
    }
    this.updateActiveDescendant();
  }

  private updateActiveDescendant(): void {
    const el = this.state.selected ? this.elements.get(this.state.selected) : null;
    if (el) this.viewport.setAttribute('aria-activedescendant', el.id);
    else this.viewport.removeAttribute('aria-activedescendant');
  }

  private nodeFrom(target: EventTarget | null): string | null {
    const element = target as Element | null;
    return element?.closest?.<HTMLElement>('.tvm-node')?.dataset.nodeId ?? null;
  }

  private click(event: MouseEvent): void {
    if ((event.target as Element).closest('.tvm-create-handles, .tvm-create-first, .tvm-node-resize')) return;
    if (this.editing) {
      if (Date.now() < this.suppressClickUntil) { event.preventDefault(); return; }
      const target = event.target as Element;
      if (!target.closest('.tvm-inline-editor')) {
        event.preventDefault();
        if (!target.closest('.tvm-node') && this.editing.editor.cancelIfUnchanged()) return;
        this.focusEditor();
      }
      return;
    }
    if (Date.now() < this.suppressClickUntil || this.menu?.contains(event.target as Node)) { event.preventDefault(); return; }
    const target = event.target as Element;
    const id = this.nodeFrom(target);
    if (id && (this.selectionMode || (!(target.closest('a')) && (event.ctrlKey || event.metaKey || event.shiftKey)))) {
      event.preventDefault(); event.stopPropagation();
      this.select(id, false, event.shiftKey ? 'range' : 'toggle');
      this.viewport.focus({ preventScroll: true }); return;
    }
    if (id && target.closest('.tvm-node-address')) {
      event.preventDefault(); event.stopPropagation(); this.select(id); this.options.onAction('node-backlinks', id); return;
    }
    const fold = target.closest<HTMLElement>('[data-fold-id]');
    if (fold?.dataset.foldId) { event.preventDefault(); event.stopPropagation(); this.select(fold.dataset.foldId); this.toggleFold(fold.dataset.foldId); this.viewport.focus({ preventScroll: true }); return; }
    const anchor = target.closest<HTMLAnchorElement>('a');
    if (anchor) {
      if (id) this.select(id);
      const link = anchor.getAttribute('data-href') ?? anchor.getAttribute('href');
      const internal = anchor.classList.contains('internal-link') || (anchor.hasAttribute('data-href') && !!link && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link));
      if (internal && link && this.options.onOpenLink) { event.preventDefault(); event.stopPropagation(); this.options.onOpenLink(link, event); }
      return;
    }
    const image = target.closest('img')?.closest('.internal-embed');
    const imageLink = image?.getAttribute('src');
    if (imageLink && this.options.onOpenLink) {
      if (id) this.select(id);
      event.preventDefault(); event.stopPropagation();
      this.options.onOpenLink(imageLink, event);
      return;
    }
    if (id) {
      this.select(id);
      if (target.closest('input[type="checkbox"]')) { event.preventDefault(); this.options.onAction('toggle-task', id); }
    } else this.deselect();
    this.viewport.focus({ preventScroll: true });
  }

  private deselect(): void {
    this.hasTouchMarqueeSelection = false;
    this.state.selected = null;
    this.selection.clear(); this.selectionAnchor = null;
    for (const element of this.elements.values()) {
      element.classList.remove('is-selected');
      element.setAttribute('aria-selected', 'false');
    }
    this.updateActiveDescendant();
    this.emitState();
  }

  private async doubleClick(event: MouseEvent): Promise<void> {
    if (this.selectionMode || event.shiftKey || event.ctrlKey || event.metaKey) return;
    if ((event.target as Element).closest('a, button, input') || Date.now() < this.suppressClickUntil) return;
    const target = event.target as Element;
    let id = this.nodeFrom(target);
    if (!id) return;
    let frame = target.closest<HTMLElement>('.markdown-embed.internal-embed');
    const link = frame?.getAttribute('src');
    if (link && this.options.onEditEmbed) {
      event.preventDefault(); event.stopPropagation();
      if (this.editing) {
        await this.editing.editor.submit();
        if (this.editing || this.destroyed) return;
        id = this.state.selected ?? id;
        await this.waitForNodeMarkdown(id);
        if (this.editing || this.destroyed) return;
        frame = [...(this.elements.get(id)?.querySelectorAll<HTMLElement>('.markdown-embed.internal-embed') ?? [])]
          .find(element => element.getAttribute('src') === link) ?? null;
        if (!frame) return;
      }
      this.select(id);
      if (this.options.onEditEmbed(id, link, frame!)) return;
    }
    if (this.editing) return;
    event.preventDefault();
    this.select(id);
    this.options.onAction('edit', id);
  }

  private toggleFold(id: string): void {
    if (!this.doc?.byId.get(id)?.children.length) return;
    this.rememberNavigation();
    if (this.collapsed.has(id)) this.collapsed.delete(id);
    else this.collapsed.add(id);
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  handleKeydown(event: KeyboardEvent): boolean {
    if (this.destroyed || event.defaultPrevented) return false;
    if (event.key === 'Escape' && this.resizing) { event.preventDefault(); event.stopPropagation(); this.finishResize(true); return true; }
    if (event.key === 'Escape' && this.handles?.cancelIfActive()) { event.preventDefault(); event.stopPropagation(); return true; }
    if (this.editing) {
      if (resolveHotkey(event, this.options.getHotkeys?.()) !== 'find') return this.editing.editor.handleKeydown(event);
      event.preventDefault(); event.stopPropagation();
      this.options.onFind?.();
      return true;
    }
    if (event.key === 'Escape' && this.marquee) { this.cancelMarquee(); event.preventDefault(); event.stopPropagation(); return true; }
    if (event.key === 'Escape' && this.drag) { this.clearDrag(); event.preventDefault(); event.stopPropagation(); return true; }
    const target = event.target as HTMLElement | null;
    if (target?.closest?.('input, textarea, select, button, [contenteditable]:not([contenteditable="false"])') || (target && this.menu?.contains(target))) return false;
    if (event.key === 'Escape' && (this.selection.size > 1 || this.selectionMode)) {
      this.selectionMode = false; this.viewport.classList.remove('is-selecting'); this.deselect();
      event.preventDefault(); event.stopPropagation(); return true;
    }
    const bindings = this.options.getHotkeys?.();
    let action = resolveHotkey(event, bindings);
    if (this.mode === 'vertical' && action && event.key.startsWith('Arrow') && bindings?.[action] === undefined) {
      action = VERTICAL_NAVIGATION[action] ?? action;
    }
    if (event.repeat && action && ['delete', 'cut', 'add-child', 'add-sibling', 'add-sibling-before', 'add-parent', 'edit', 'paste', 'paste-after'].includes(action)) {
      event.preventDefault(); event.stopPropagation(); return true;
    }
    if (!action || !this.runHotkey(action)) return false;
    event.preventDefault(); event.stopPropagation();
    return true;
  }

  runHotkey(action: HotkeyAction): boolean {
    if (this.destroyed || !this.doc) return false;
    if (this.editing) { this.focusEditor(); return true; }
    const id = this.state.selected;
    const node = id ? this.doc.byId.get(id) : undefined;
    if (action === 'select-all') {
      this.selection = new Set(this.visible); this.state.selected = this.visible[0] ?? null; this.selectionAnchor = this.state.selected;
      this.paintSelection(); this.emitState(); return true;
    }
    if (action.startsWith('select-')) {
      const index = id ? this.visible.indexOf(id) : -1;
      const next = action === 'select-next' ? this.visible[index + 1] : action === 'select-previous' ? this.visible[Math.max(0, index - 1)]
        : action === 'select-parent' ? node?.parentId : node?.children[0];
      if (next) this.select(next, true, 'range');
      return true;
    }
    if (action === 'history-back' || action === 'history-forward') {
      this.navigateHistory(action === 'history-back' ? 'back' : 'forward'); return true;
    }
    if (action === 'find') { this.options.onFind?.(); return true; }
    if (action === 'fit') { this.fit(); return true; }
    if (action === 'collapse-all') { this.setDepth(1); return true; }
    if (action.startsWith('depth-')) {
      const depth = action === 'depth-all' ? Infinity : Number(action.slice(6));
      if (id) for (const target of this.getSelection()) this.setBranchDepth(target, depth);
      else this.setDepth(depth + 1);
      return true;
    }
    if (action === 'collapse-branch' || action === 'expand-branch') {
      if (!id) return false;
      for (const target of this.getSelection()) this.setBranchDepth(target, action === 'collapse-branch' ? 0 : Infinity);
      return true;
    }
    if (action === 'fold') {
      if (!id) return false;
      for (const target of this.getSelection()) this.toggleFold(target); return true;
    }
    const navigation = ['parent', 'child', 'previous', 'next', 'first', 'last'].includes(action);
    if (!navigation) {
      if (!id && action !== 'undo' && action !== 'redo' && action !== 'paste' && (this.doc.nodes.length || action !== 'add-sibling')) return false;
      this.options.onAction(action as NodeAction, id);
      return true;
    }
    const siblings = node?.parentId ? this.doc.byId.get(node.parentId)?.children ?? [] : this.doc.roots;
    const peers = this.state.focusRoot === id && id ? [id] : siblings;
    let next: string | undefined;
    if (action === 'first') next = node ? peers[0] : this.visible[0];
    else if (action === 'last') next = node ? peers.at(-1) : this.visible[0];
    else if (!id || !node) next = this.visible[0];
    else if (action === 'parent') {
      if (this.options.getCollapseOnLeft?.() && node.children.length && !this.collapsed.has(id)) {
        this.toggleFold(id); return true;
      }
      next = node.parentId ?? undefined;
      if (next && this.elements.has(next)) this.lastChildByParent.set(next, id);
    } else if (action === 'child') {
      if (this.collapsed.has(id)) { this.toggleFold(id); return true; }
      const lastChild = this.lastChildByParent.get(id);
      next = lastChild && this.doc.byId.get(lastChild)?.parentId === id ? lastChild : node.children[0];
    } else {
      const delta = action === 'previous' ? -1 : 1;
      const index = peers.indexOf(id);
      next = peers[index + delta];
      if (!next && this.options.getArrowAcrossBranches?.()) next = this.visible[this.visible.indexOf(id) + delta];
    }
    if (next) this.select(next, true);
    return true;
  }

  private wheel(event: WheelEvent): void {
    if (this.resizing) { event.preventDefault(); return; }
    this.preservedEditAnchor = undefined;
    this.stopCoasting();
    if ((event.target as Element).closest('.tvm-inline-editor')) return;
    if (this.menu?.contains(event.target as Node)) return;
    const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? this.viewportSize().height : 1;
    if (!event.ctrlKey && !event.metaKey) {
      const id = this.nodeFrom(event.target), node = id ? this.elements.get(id) : undefined;
      if (id && node && this.selection.has(id)) {
        const dx = (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * multiplier;
        const dy = (event.shiftKey && !event.deltaX ? 0 : event.deltaY) * multiplier;
        const scrolls = (element: HTMLElement): boolean => {
          const style = element.ownerDocument.defaultView!.getComputedStyle(element);
          return (Math.abs(dy) >= Math.abs(dx) && dy !== 0 && element.scrollHeight > element.clientHeight + 1 && /auto|scroll/.test(style.overflowY))
            || (dx !== 0 && element.scrollWidth > element.clientWidth + 1 && /auto|scroll/.test(style.overflowX));
        };
        let target = event.target as HTMLElement | null;
        while (target && target !== node && !scrolls(target)) target = target.parentElement;
        if (target === node || !target) {
          const content = node.querySelector<HTMLElement>('.tvm-node-content');
          target = content && scrolls(content) ? content : null;
        }
        if (target) {
          event.preventDefault(); event.stopPropagation();
          target.scrollTop += dy / this.state.camera.scale;
          target.scrollLeft += dx / this.state.camera.scale;
          return;
        }
      }
    }
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      const rect = this.viewport.getBoundingClientRect();
      this.zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * multiplier * 0.006 / Math.max(1, Math.sqrt(this.state.camera.scale))));
    } else {
      this.state.camera.x -= (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * multiplier;
      this.state.camera.y -= (event.shiftKey && !event.deltaX ? 0 : event.deltaY) * multiplier;
      this.applyCamera(true);
    }
    this.emitState();
  }

  private zoomAt(x: number, y: number, factor: number): void {
    const c = this.state.camera;
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, c.scale * factor));
    c.x = x - (x - c.x) * next / c.scale;
    c.y = y - (y - c.y) * next / c.scale;
    c.scale = next;
    this.applyCamera(true);
  }

  private pointerDown(event: PointerEvent): void {
    if (this.resizing) { event.preventDefault(); return; }
    this.preservedEditAnchor = undefined;
    this.stopCoasting();
    const resizeHandle = (event.target as Element).closest<HTMLElement>('.tvm-node-resize');
    if (resizeHandle) {
      event.preventDefault(); event.stopPropagation();
      const id = this.nodeFrom(event.target), position = id ? this.positions.get(id) : undefined;
      if (!id || !position || this.editing || event.button !== 0 || !['map', 'vertical'].includes(this.mode)) return;
      this.select(id);
      this.resizing = {id, pointer: event.pointerId, capture: resizeHandle, x: event.clientX, y: event.clientY, width: position.width, height: position.height, previous: this.state.nodeSizes?.[id]};
      this.viewport.classList.add('is-resizing-node');
      try { resizeHandle.setPointerCapture(event.pointerId); } catch { /* The pointer may already have ended. */ }
      return;
    }
    if ((event.target as Element).closest('.tvm-create-handles, .tvm-create-first')) return;
    if (this.editing && (event.target as Element).closest('.tvm-inline-editor')) return;
    if (this.editing) event.preventDefault();
    if (this.menu?.contains(event.target as Node)) return;
    if (this.drag && this.drag.pointer !== event.pointerId) this.clearDrag();
    const id = this.nodeFrom(event.target);
    const groupDrag = !this.editing && id && this.selection.has(id) && (this.selection.size > 1 || this.selectionMode);
    if (groupDrag && event.pointerType === 'mouse' && event.button === 0 && !event.shiftKey && !event.ctrlKey && !event.metaKey && !(event.target as Element).closest('a, button, input, textarea')) {
      this.drag = { id, ids: this.getSelection(), position: 'child', pointer: event.pointerId, x: event.clientX, y: event.clientY, active: false, target: null };
      return;
    }
    if (!this.editing && !this.selectionMode && this.selection.size <= 1 && !event.shiftKey && !event.ctrlKey && !event.metaKey && event.pointerType === 'mouse' && event.button === 0 && id && !(event.target as Element).closest('a, button, input, textarea')) {
      const last = this.lastPress;
      if (last?.id === id && Date.now() - last.time < 500 && Math.hypot(last.x - event.clientX, last.y - event.clientY) < 8) {
        this.drag = { id, ids: [id], position: 'child', pointer: event.pointerId, x: event.clientX, y: event.clientY, active: false, target: null };
        this.lastPress = undefined;
      } else this.lastPress = { id, time: Date.now(), x: event.clientX, y: event.clientY };
    }
    if (!this.marquee && !this.editing && !id && event.button === 0 && (this.selectionMode || event.shiftKey) && this.touches.size === 0) {
      const element = this.container.ownerDocument.createElement('div'); element.className = 'tvm-selection-box'; this.viewport.append(element);
      const extend = event.ctrlKey || event.metaKey || (event.pointerType === 'touch' && this.hasTouchMarqueeSelection);
      this.marquee = { pointer: event.pointerId, x: event.clientX, y: event.clientY, moved: false, base: extend ? [...this.selection] : [], before: [...this.selection], element };
      try { this.viewport.setPointerCapture(event.pointerId); } catch { /* Synthetic pointer. */ }
      return;
    }
    if (this.marquee) return;
    if (event.pointerType === 'touch') {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touches.size === 2) {
        this.cancelTouchHold();
        const [a, b] = [...this.touches.values()];
        const rect = this.viewport.getBoundingClientRect();
        const x = (a.x + b.x) / 2 - rect.left;
        const y = (a.y + b.y) / 2 - rect.top;
        const c = this.state.camera;
        this.pinch = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), scale: c.scale, worldX: (x - c.x) / c.scale, worldY: (y - c.y) / c.scale };
        this.pan = null;
      }
    }
    if (event.button !== 0 && event.button !== 1) return;
    if (this.touches.size < 2 && (this.editing || event.pointerType === 'touch' || event.button === 1 || !(event.target as Element).closest('.tvm-node'))) {
      this.pan = { pointer: event.pointerId, x: event.clientX, y: event.clientY, camera: { ...this.state.camera }, moved: false };
      const table = (event.target as Element).closest<HTMLElement>('.tvm-node-content table');
      if (event.pointerType === 'touch' && table && (table.scrollWidth > table.clientWidth || table.scrollHeight > table.clientHeight)) {
        this.pan.table = { element: table, x: table.scrollLeft, y: table.scrollTop };
      }
      if (event.button === 1) event.preventDefault();
    }
    if (!this.editing && !this.pan?.table && event.pointerType === 'touch' && this.touches.size === 1 && id && !(event.target as Element).closest('a, button, input, textarea')) {
      this.cancelTouchHold();
      const pointer = event.pointerId, x = event.clientX, y = event.clientY;
      const timer = this.container.ownerDocument.defaultView!.setTimeout(() => {
        this.touchHold = undefined;
        if (this.destroyed || this.editing || this.touches.size !== 1 || !this.touches.has(pointer) || this.pan?.moved || !this.doc?.byId.has(id)) return;
        if (!this.selection.has(id)) this.select(id);
        this.drag = { id, ids: this.getSelection(), position: 'child', pointer, x, y, active: true, target: null };
        this.pan = null;
        this.viewport.classList.add('is-dragging');
        for (const selected of this.drag.ids) this.elements.get(selected)?.classList.add('is-drag-source');
        try { this.viewport.setPointerCapture(pointer); } catch { /* Synthetic pointer. */ }
        this.live.textContent = t("Branch ready to move");
      }, 450);
      this.touchHold = { pointer, x, y, timer };
    }
    // Capturing a tap on a node would retarget its click to the viewport.
    if (this.pinch || (this.pan && !(event.target as Element).closest('.tvm-node'))) {
      try { this.viewport.setPointerCapture(event.pointerId); } catch { /* A detached or synthetic pointer has no capture. */ }
    }
  }

  private pointerMove(event: PointerEvent): void {
    if (this.resizing) {
      if (this.resizing.pointer !== event.pointerId) return;
      event.preventDefault();
      const resize = this.resizing;
      this.preservedEditAnchor = resize.id;
      this.setNodeSize(resize.id, {width: resize.width + (event.clientX - resize.x) / this.state.camera.scale, height: resize.height + (event.clientY - resize.y) / this.state.camera.scale});
      this.scheduleLayout();
      return;
    }
    if (this.touches.has(event.pointerId)) this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.touchHold?.pointer === event.pointerId && Math.hypot(event.clientX - this.touchHold.x, event.clientY - this.touchHold.y) > 4) this.cancelTouchHold();
    if (this.marquee?.pointer === event.pointerId) {
      const box = this.marquee;
      if (!box.moved && Math.hypot(event.clientX - box.x, event.clientY - box.y) < 5) return;
      box.moved = true;
      const rect = this.viewport.getBoundingClientRect();
      const left = Math.min(box.x, event.clientX), top = Math.min(box.y, event.clientY);
      const right = Math.max(box.x, event.clientX), bottom = Math.max(box.y, event.clientY);
      Object.assign(box.element.style, { left: (left - rect.left) + 'px', top: (top - rect.top) + 'px', width: (right - left) + 'px', height: (bottom - top) + 'px' });
      this.selection = new Set(box.base);
      for (const [id, element] of this.elements) {
        const bounds = element.getBoundingClientRect();
        if (bounds.right < left || bounds.left > right || bounds.bottom < top || bounds.top > bottom) continue;
        if (event.pointerType === 'touch' && this.selection.has(id)) this.selection.delete(id);
        else this.selection.add(id);
      }
      this.state.selected = [...this.selection].at(-1) ?? null;
      this.selectionAnchor = this.state.selected;
      this.paintSelection(); this.emitState(); event.preventDefault(); return;
    }

    if (this.drag?.pointer === event.pointerId) {
      const drag = this.drag;
      if (!drag.active && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
      drag.active = true;
      try { this.viewport.setPointerCapture(event.pointerId); } catch { /* Detached pointer. */ }
      this.viewport.classList.add('is-dragging');
      for (const id of drag.ids) this.elements.get(id)?.classList.add('is-drag-source');
      this.updateDropTarget(drag, event.clientX, event.clientY);
      this.trackDragEdge(event.clientX, event.clientY);
      event.preventDefault(); return;
    }
    if (this.pinch && this.touches.size >= 2) {
      const [a, b] = [...this.touches.values()];
      const rect = this.viewport.getBoundingClientRect();
      const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, this.pinch.scale * Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.distance));
      this.state.camera = { x: (a.x + b.x) / 2 - rect.left - this.pinch.worldX * scale, y: (a.y + b.y) / 2 - rect.top - this.pinch.worldY * scale, scale };
      this.suppressClickUntil = Date.now() + 350;
      this.applyCamera(true);
      return;
    }
    if (this.pan?.pointer !== event.pointerId) return;
    const dx = event.clientX - this.pan.x;
    const dy = event.clientY - this.pan.y;
    if (Math.hypot(dx, dy) > 4) this.pan.moved = true;
    if (!this.pan.moved) return;
    if (this.pan.table) {
      const { element, x, y } = this.pan.table;
      element.scrollLeft = x - dx / this.state.camera.scale;
      element.scrollTop = y - dy / this.state.camera.scale;
      this.suppressClickUntil = Date.now() + 350;
      event.preventDefault();
      return;
    }
    if (event.pointerType === 'touch' && !this.editing) {
      const prior = this.pan.sample;
      const elapsed = Math.max(8, event.timeStamp - (prior?.time ?? event.timeStamp - 16));
      const mix = (speed: number, delta: number) => speed * 0.35 + Math.max(-2.5, Math.min(2.5, delta / elapsed)) * 0.65;
      this.pan.sample = {
        x: event.clientX, y: event.clientY, time: event.timeStamp,
        vx: mix(prior?.vx ?? 0, event.clientX - (prior?.x ?? this.pan.x)),
        vy: mix(prior?.vy ?? 0, event.clientY - (prior?.y ?? this.pan.y)),
      };
    }
    try { this.viewport.setPointerCapture(event.pointerId); } catch { /* A detached or synthetic pointer has no capture. */ }
    this.state.camera.x = this.pan.camera.x + dx;
    this.state.camera.y = this.pan.camera.y + dy;
    this.viewport.classList.add('is-panning');
    this.suppressClickUntil = Date.now() + 350;
    this.applyCamera(true);
  }


  private updateDropTarget(drag: NonNullable<MapSurface['drag']>, x: number, y: number): void {
    const previous = this.elements.get(drag.target ?? '');
    previous?.classList.remove('is-drop-target'); previous?.removeAttribute('data-drop-position');
    const hit = this.container.ownerDocument.elementFromPoint(x, y);
    let target = this.nodeFrom(hit);
    if (!target) {
      // The narrow space immediately above/below a node is also a sibling target.
      for (const [id, element] of this.elements) {
        const rect = element.getBoundingClientRect();
        const vertical = this.mode === 'vertical';
        const xInset = vertical ? 12 : 0, yInset = vertical ? 0 : 12;
        if (x >= rect.left - xInset && x <= rect.right + xInset && y >= rect.top - yInset && y <= rect.bottom + yInset) { target = id; break; }
      }
    }
    let position: DropPosition = 'child';
    if (target) {
      const rect = this.elements.get(target)!.getBoundingClientRect();
      const vertical = this.mode === 'vertical';
      const span = vertical ? rect.width : rect.height;
      const relative = (vertical ? x - rect.left : y - rect.top) / Math.max(1, span);
      position = span > 0 ? (relative < 0.25 ? 'before' : relative > 0.75 ? 'after' : 'child') : 'child';
      if (!this.doc || !canDropBranches(this.doc, drag.ids, target, position)) target = null;
    }
    drag.target = target; drag.position = position;
    if (target) {
      const element = this.elements.get(target)!;
      element.classList.add('is-drop-target'); element.dataset.dropPosition = position;
      this.live.textContent = (position === 'before' ? t("Before: ") : position === 'after' ? t("After: ") : t("As children: ")) + this.doc!.byId.get(target)!.text;
    }
  }

  private trackDragEdge(x: number, y: number): void {
    const win = this.viewport.ownerDocument.defaultView;
    if (!win) return;
    this.dragPoint = { x, y };
    if (this.dragScrollFrame !== null) return;
    let start: number | undefined;
    let previous: number | undefined;
    const advance = (time: number) => {
      this.dragScrollFrame = null;
      const drag = this.drag, point = this.dragPoint;
      if (!drag?.active || !point) return;
      const rect = this.viewport.getBoundingClientRect();
      const band = 44;
      const edge = (offset: number, size: number) => {
        if (offset < -band || offset > size + band || size <= 0) return 0;
        const threshold = Math.min(band, size / 4);
        if (offset < threshold) return Math.min(1, (threshold - offset) / threshold);
        if (offset > size - threshold) return -Math.min(1, (offset + threshold - size) / threshold);
        return 0;
      };
      const vx = edge(point.x - rect.left, rect.width), vy = edge(point.y - rect.top, rect.height);
      if (!vx && !vy) return;
      start ??= time;
      const elapsed = Math.min(36, Math.max(0, time - (previous ?? time - 16)));
      previous = time;
      const speed = 0.08 + 0.9 * Math.min(1, (time - start) / 650);
      const camera = this.state.camera;
      const xLimit = Math.min(44, rect.width - this.bounds.width * camera.scale - 44);
      const yLimit = Math.min(44, rect.height - this.bounds.height * camera.scale - 44);
      const x = Math.max(Math.min(camera.x, xLimit), Math.min(Math.max(camera.x, 44), camera.x + vx * speed * elapsed));
      const y = Math.max(Math.min(camera.y, yLimit), Math.min(Math.max(camera.y, 44), camera.y + vy * speed * elapsed));
      if (x === camera.x && y === camera.y) return;
      camera.x = x; camera.y = y;
      this.applyCamera();
      this.updateDropTarget(drag, point.x, point.y);
      this.emitState();
      this.dragScrollFrame = win.requestAnimationFrame(advance);
    };
    this.dragScrollFrame = win.requestAnimationFrame(advance);
  }

  private cancelMarquee(): void {
    if (!this.marquee) return;
    const box = this.marquee; box.element.remove(); this.marquee = undefined;
    this.selection = new Set(box.before); this.state.selected = [...this.selection].at(-1) ?? null;
    this.paintSelection(); this.emitState();
    this.suppressClickUntil = Date.now() + 350;
    try { if (this.viewport.hasPointerCapture(box.pointer)) this.viewport.releasePointerCapture(box.pointer); } catch { /* Pointer already ended. */ }
  }

  private pointerUp(event: PointerEvent): void {
    if (this.resizing?.pointer === event.pointerId) { this.finishResize(event.type === 'pointercancel'); return; }
    if (this.touchHold?.pointer === event.pointerId) this.cancelTouchHold();
    if (event.type === 'pointercancel' && this.marquee?.pointer === event.pointerId) { this.cancelMarquee(); return; }
    if (this.marquee?.pointer === event.pointerId) {
      const box = this.marquee; box.element.remove(); this.marquee = undefined;
      if (box.moved) {
        this.suppressClickUntil = Date.now() + 350;
        if (event.pointerType === 'touch' && this.selectionMode) {
          this.hasTouchMarqueeSelection = this.selection.size > 0;
          this.toggleSelectionMode();
        }
      }
      try { if (this.viewport.hasPointerCapture(event.pointerId)) this.viewport.releasePointerCapture(event.pointerId); } catch { /* Pointer already ended. */ }
      this.viewport.focus({ preventScroll: true }); return;
    }

    if (this.drag?.pointer === event.pointerId) {
      const drag = this.drag;
      this.clearDrag();
      if (drag.active) {
        this.suppressClickUntil = Date.now() + 400;
        if (event.type === 'pointerup' && drag.target) {
          if (this.options.onMoveBranches) this.options.onMoveBranches(drag.ids, drag.target, drag.position);
          else if (drag.position === 'child' && drag.ids.length === 1) this.options.onReparent?.(drag.id, drag.target);
        }
      }
    }
    const wasPinching = !!this.pinch;
    const changed = wasPinching || this.pan?.moved;
    this.touches.delete(event.pointerId);
    if (this.pan?.pointer === event.pointerId) {
      const sample = this.pan.sample;
      this.pan = null;
      if (event.type === 'pointerup' && !wasPinching && !this.editing && sample && event.timeStamp - sample.time < 90) {
        this.coast(sample.vx, sample.vy);
      }
    }
    if (this.touches.size < 2) this.pinch = null;
    if (wasPinching && this.touches.size === 1) {
      const [id, point] = [...this.touches.entries()][0];
      this.pan = { pointer: id, x: point.x, y: point.y, camera: { ...this.state.camera }, moved: false };
    }
    this.viewport.classList.remove('is-panning');
    try { if (this.viewport.hasPointerCapture(event.pointerId)) this.viewport.releasePointerCapture(event.pointerId); } catch { /* Capture may already have ended. */ }
    if (changed) this.emitState();
  }

  private stopCoasting(): void {
    if (this.coastFrame === null) return;
    this.viewport.ownerDocument.defaultView?.cancelAnimationFrame(this.coastFrame);
    this.coastFrame = null;
  }

  private coast(vx: number, vy: number): void {
    const win = this.viewport.ownerDocument.defaultView;
    if (!win || win.matchMedia?.('(prefers-reduced-motion: reduce)').matches || Math.hypot(vx, vy) < 0.18) return;
    let last: number | undefined;
    const step = (now: number) => {
      this.coastFrame = null;
      if (this.destroyed || this.editing) return;
      const elapsed = Math.min(34, now - (last ?? now - 16));
      last = now;
      const decay = Math.exp(-elapsed / 115);
      this.state.camera.x += vx * 115 * (1 - decay);
      this.state.camera.y += vy * 115 * (1 - decay);
      vx *= decay;
      vy *= decay;
      this.paintCamera(true);
      if (Math.hypot(vx, vy) >= 0.05) this.coastFrame = win.requestAnimationFrame(step);
      else this.emitState();
    };
    this.coastFrame = win.requestAnimationFrame(step);
  }

  private contextMenu(event: MouseEvent): void {
    if (this.drag?.active) { event.preventDefault(); event.stopPropagation(); return; }
    if (this.editing) return;
    const id = this.nodeFrom(event.target);
    if (!id) return;
    event.preventDefault(); event.stopPropagation();
    if (!this.selection.has(id)) this.select(id);
    else { this.state.selected = id; this.updateActiveDescendant(); }
    this.closeMenu();
    const menu = this.container.ownerDocument.createElement('div');
    menu.className = 'tvm-context-menu';
    menu.setAttribute('role', 'menu');
    const entries: { label: string; action: HotkeyAction }[] = [
      { label: t("Edit node"), action: 'edit' },
      { label: t("Add child node"), action: 'add-child' },
      { label: t("Add sibling node"), action: 'add-sibling' },
      { label: t("Add parent node"), action: 'add-parent' },
      { label: this.collapsed.has(id) ? t("Expand node") : t("Collapse node"), action: 'fold' },
      { label: t("Collapse branch"), action: 'collapse-branch' },
      { label: t("Expand branch"), action: 'expand-branch' },
      { label: t("Toggle completion"), action: 'toggle-task' },
      { label: t("Make numbered step"), action: 'make-step' },
      { label: t("Set date"), action: 'make-dated' },
      { label: t("Mark as question"), action: 'make-question' },
      { label: t("Copy link to node"), action: 'copy-node-link' },
      ...(this.doc?.byId.get(id)?.blockId ? [{label: t("Remove node address"), action: 'remove-node-address' as const}] : []),
      { label: t("Copy branch"), action: 'copy' },
      { label: t("Copy node text"), action: 'copy-node-text' },
      { label: t("Convert to multiline note…"), action: 'convert-node-note' },
      { label: t("Choose an existing note…"), action: 'attach-node-note' },
      { label: t("Move completed children to bottom"), action: 'completed-bottom' },
      { label: t("Copy selected nodes without children"), action: 'copy-node-labels' },
      { label: t("Cut branch"), action: 'cut' },
      { label: t("Paste as child branch"), action: 'paste' },
      { label: t("Paste after node"), action: 'paste-after' },
      { label: t("Move up"), action: 'move-up' },
      { label: t("Move down"), action: 'move-down' },
      { label: t("Make child of previous node"), action: 'indent' },
      { label: t("Move up one level"), action: 'outdent' },
      { label: t("Open source Markdown"), action: 'source' },
      { label: t("Insert template at selected node…"), action: 'insert-template' },
      { label: t("Delete branch"), action: 'delete' },
    ];
    for (const entry of entries) {
      if (['fold', 'collapse-branch', 'expand-branch'].includes(entry.action) && !this.doc?.byId.get(id)?.children.length) continue;
      const button = this.container.ownerDocument.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'menuitem');
      const label = this.container.ownerDocument.createElement('span');
      label.textContent = this.selection.size > 1 && ['delete', 'copy', 'cut'].includes(entry.action) ? t(entry.action === "copy" ? "Copy selection" : entry.action === "cut" ? "Cut selection" : "Delete selection") : entry.label;
      if (this.selection.size > 1 && ['edit', 'copy-node-text', 'node-note', 'convert-node-note', 'attach-node-note', 'node-note-options', 'completed-bottom', 'add-child', 'add-sibling', 'add-parent', 'insert-template', 'paste', 'paste-after', 'indent', 'outdent'].includes(entry.action)) button.disabled = true;
      button.append(label);
      const binding = this.options.getHotkeys?.()[entry.action] ?? DEFAULT_HOTKEYS[entry.action];
      if (binding) {
        const shortcut = this.container.ownerDocument.createElement('span');
        shortcut.className = 'tvm-menu-shortcut';
        shortcut.textContent = binding.replace(/Key|Digit/g, '').replace(/Mod/g, 'Ctrl/Cmd');
        button.append(shortcut);
      }
      if (entry.action === 'delete') button.classList.add('is-danger');
      button.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation(); this.closeMenu();
        this.runHotkey(entry.action);
      });
      menu.append(button);
    }
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.closeMenu(); this.viewport.focus({ preventScroll: true }); return; }
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault(); e.stopPropagation();
      const buttons = [...menu.querySelectorAll('button')];
      const index = buttons.indexOf(this.container.ownerDocument.activeElement as HTMLButtonElement);
      buttons[(index + (e.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length]?.focus();
    });
    this.menu = menu;
    this.viewport.append(menu);
    const rect = this.viewport.getBoundingClientRect();
    const size = this.viewportSize();
    menu.style.left = `${Math.max(8, Math.min(event.clientX - rect.left, size.width - (menu.offsetWidth || 260) - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(event.clientY - rect.top, size.height - (menu.offsetHeight || 480) - 8))}px`;
    menu.querySelector('button')?.focus();
  }

  private closeMenu(): void {
    this.menu?.remove();
    this.menu = null;
  }

  private cancelTouchHold(): void {
    if (!this.touchHold) return;
    this.container.ownerDocument.defaultView?.clearTimeout(this.touchHold.timer); this.touchHold = undefined;
  }

  private setNodeSize(id: string, size?: NodeSize): void {
    const sizes = {...this.state.nodeSizes};
    if (size) sizes[id] = {width: Math.max(MIN_WIDTH, Math.min(2400, size.width)), height: Math.max(40, Math.min(2400, size.height))};
    else delete sizes[id];
    if (Object.keys(sizes).length) this.state.nodeSizes = sizes;
    else delete this.state.nodeSizes;
  }
  private finishResize(cancel: boolean): void {
    const resize = this.resizing;
    if (!resize) return;
    this.resizing = undefined;
    if (cancel) this.setNodeSize(resize.id, resize.previous);
    this.suppressClickUntil = Date.now() + 250;
    this.preservedEditAnchor = resize.id;
    this.viewport.classList.remove('is-resizing-node');
    try { if (resize.capture.hasPointerCapture(resize.pointer)) resize.capture.releasePointerCapture(resize.pointer); } catch { /* Capture may already have ended. */ }
    if (!this.destroyed) { this.scheduleLayout(); this.emitState(); }
  }
  private clearDrag(): void {
    this.cancelTouchHold();
    if (this.dragScrollFrame !== null) this.viewport.ownerDocument.defaultView?.cancelAnimationFrame(this.dragScrollFrame);
    this.dragScrollFrame = null;
    this.dragPoint = undefined;
    if (!this.drag) return;
    const drag = this.drag; this.drag = undefined;
    if (drag.active) this.suppressClickUntil = Date.now() + 400;
    this.viewport.classList.remove('is-dragging');
    for (const id of drag.ids) this.elements.get(id)?.classList.remove('is-drag-source');
    if (drag.target) { const element = this.elements.get(drag.target); element?.classList.remove('is-drop-target'); element?.removeAttribute('data-drop-position'); }
    try { if (this.viewport.hasPointerCapture(drag.pointer)) this.viewport.releasePointerCapture(drag.pointer); } catch { /* Capture already ended. */ }
  }
}
