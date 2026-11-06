/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { Camera, MapDocument, MapNode, MapSurfaceOptions, MapViewState, NodeAction, DropPosition } from './types';
import { canDropBranches } from './core';
import { MIN_SCALE, MAX_SCALE } from './types';
import { DEFAULT_HOTKEYS, resolveHotkey, type HotkeyAction } from './hotkeys';
import { CreationHandles } from './creation-handles';
import { InlineEditor, type InlineOptions } from './inline';

interface Position { x: number; y: number; width: number; height: number }
interface TouchPoint { x: number; y: number }
interface RenderedNode { label: string; content: HTMLDivElement; started: boolean }
const MARKDOWN_BATCH_SIZE = 8;
const MARKDOWN_LOADING_THRESHOLD = 128;
const WIDTH = 328;
const COLUMN_GAP = 74;
const ROW_GAP = 18;
const ROOT_GAP = 44;
const MIN_WIDTH = 84;

/** A read-only document surface: every source mutation is an explicit action. */
export class MapSurface {
  private readonly viewport: HTMLDivElement;
  private readonly world: HTMLDivElement;
  private readonly edges: SVGSVGElement;
  private readonly nodeLayer: HTMLDivElement;
  private readonly live: HTMLDivElement;
  private readonly loading: HTMLDivElement;
  private handles: CreationHandles;
  private doc: MapDocument | null = null;
  private state: MapViewState = { collapsed: [], selected: null, camera: { x: 36, y: 36, scale: 1 }, focusRoot: null };
  private collapsed = new Set<string>();
  private selection = new Set<string>();
  private selectionAnchor: string | null = null;
  private selectionMode = false;
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
  private observer: ResizeObserver | null = null;
  private menu: HTMLDivElement | null = null;
  private readonly touches = new Map<number, TouchPoint>();
  private pan: { pointer: number; x: number; y: number; camera: Camera; moved: boolean } | null = null;
  private pinch: { distance: number; scale: number; worldX: number; worldY: number } | null = null;
  private suppressClickUntil = 0;
  private bounds = { width: 0, height: 0 };
  private mode: 'map' | 'outline' | 'table' = 'map';
  private editing?: { id: string; editor: InlineEditor; original: MapDocument; state: MapViewState; latest?: MapDocument; latestState?: MapViewState };
  private touchHold?: { pointer: number; x: number; y: number; timer: number };
  private lastPress?: { id: string; time: number; x: number; y: number };
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
    this.viewport.setAttribute('aria-label', t("Map"));
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
    this.viewport.append(this.edges, this.world, this.live, this.loading);
    container.append(this.viewport);
    this.handles = new CreationHandles(this.viewport, (action,id) => this.options.onAction(action,id));
    this.listen(this.viewport, 'click', (e) => this.click(e as MouseEvent), { capture: true });
    this.listen(this.viewport, 'auxclick', (e) => { if ((e as MouseEvent).button === 1 && (e.target as Element).closest('a')) this.click(e as MouseEvent); }, { capture: true });
    this.listen(this.viewport, 'mouseover', (event) => {
      if (this.editing) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a.internal-link');
      if (!anchor || anchor.contains((event as MouseEvent).relatedTarget as Node)) return;
      const link = anchor.getAttribute('data-href') ?? anchor.getAttribute('href');
      if (link && this.options.onHoverLink) { event.stopPropagation(); this.options.onHoverLink(event as MouseEvent, anchor, link); }
    }, { capture: true });
    this.listen(this.viewport, 'dblclick', (e) => this.doubleClick(e as MouseEvent));
    this.listen(this.viewport, 'contextmenu', (e) => this.contextMenu(e as MouseEvent));
    this.listen(this.viewport, 'keydown', (e) => this.handleKeydown(e as KeyboardEvent), { capture: true });
    this.listen(this.viewport, 'wheel', (e) => this.wheel(e as WheelEvent), { passive: false });
    this.listen(this.viewport, 'pointerdown', (e) => this.pointerDown(e as PointerEvent));
    this.listen(this.viewport, 'pointermove', (e) => this.pointerMove(e as PointerEvent));
    this.listen(this.viewport, 'pointerup', (e) => this.pointerUp(e as PointerEvent));
    this.listen(this.viewport, 'pointercancel', (e) => this.pointerUp(e as PointerEvent));
    this.listen(this.viewport, 'lostpointercapture', event => { if (event.target === this.viewport) { this.clearDrag(); this.cancelMarquee(); } });
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
    this.clearDrag(); this.cancelMarquee();
    const previous = this.doc;
    if (state) this.selection.clear();
    this.doc = doc;
    if (state) {
      this.state = {
        collapsed: [...state.collapsed], selected: state.selected, focusRoot: state.focusRoot,
        camera: this.safeCamera(state.camera),
      };
    }
    this.collapsed = new Set([...(state?.collapsed ?? this.collapsed)].filter((id) => doc.byId.has(id)));
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
  focusEditor(): void { this.editing?.editor.focus(); }
  invalidateMarkdown(): void {
    this.markdownQueue = [];
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    if (!this.editing) this.render();
  }
  beginEdit(id: string, initial: string, save: (text: string) => Promise<string | undefined>, mount?: InlineOptions['mount'], draft?: MapDocument): void {
    if (this.editing || !this.doc || this.destroyed) { this.focusEditor(); return; }
    const original = this.doc, state = this.getState();
    const editor = new InlineEditor(this.container.ownerDocument, initial, {
      save: async text => { const selected = await save(text); if (this.editing?.editor === editor) this.finishEdit(selected); },
      cancel: () => this.finishEdit(), resize: () => this.scheduleLayout(true), mount,
    });
    this.editing = { id, editor, original, state };
    this.doc = draft ?? original;
    this.reveal(id);
    this.followEditorViewport(); editor.focus();
    editor.input.setSelectionRange(editor.input.value.length, editor.input.value.length);
  }
  private finishEdit(selected?: string): void {
    const edit = this.editing;
    if (!edit) return;
    this.editing = undefined;
    edit.editor.dispose();
    const state = { ...(edit.latestState ?? edit.state), camera: { ...this.state.camera } };
    this.update(edit.latest ?? edit.original, state);
    if (selected) this.reveal(selected);
    else { this.viewport.focus({ preventScroll: true }); this.emitState(); }
  }

  setLayout(mode: 'map' | 'outline' | 'table'): void {
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

  search(query: string, alphabetical = false): MapNode[] {
    this.query = query.trim();
    const result = this.matchNodes(this.query);
    this.matches = new Set(result.map((node) => node.id));
    for (const [id, el] of this.elements) el.classList.toggle('is-search-match', this.matches.has(id));
    if (alphabetical) result.sort((a, b) => a.text.localeCompare(b.text, undefined, { numeric: true, sensitivity: 'base' }));
    return result;
  }

  setDepth(depth: number): void {
    if (this.editing) return;
    if (!this.doc) return;
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
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  setBranchDepth(id: string, depth: number): void {
    if (this.editing) return;
    if (!this.doc?.byId.has(id)) return;
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
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
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
    if (this.destroyed) return;
    this.destroyed = true;
    this.cancelMarkdownFrame?.();
    this.markdownQueue = [];
    this.container.ownerDocument.defaultView?.clearTimeout(this.settleTimer);
    if (this.cameraFrame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.cameraFrame);
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    this.editing?.editor.dispose(); this.editing = undefined;
    this.clearDrag(); this.cancelMarquee();
    for (const clean of this.cleanup) clean();
    this.cleanup.length = 0;
    this.observer?.disconnect();
    if (this.frame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
    this.closeMenu();
    this.handles.destroy();
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

  private matchNodes(query: string): MapNode[] {
    if (!this.doc || !query) return [];
    const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return this.doc.nodes.filter((node) => words.every((word) => node.text.toLocaleLowerCase().includes(word)));
  }

  private render(): void {
    if (!this.doc || this.destroyed) return;
    const key = this.options.getRenderKey?.() ?? '';
    for (const [id, value] of this.rendered) {
      if (key !== this.renderKey || !this.doc.byId.has(id)) { this.options.releaseMarkdown?.(value.content); this.rendered.delete(id); }
    }
    this.renderKey = key;
    this.markdownQueue = [];
    this.closeMenu();
    this.elements.clear();
    this.positions.clear();
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
      el.classList.toggle('is-search-match', this.matches.has(id));
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
      el.append(content);
      if (node.blockId) {
        const marker = this.container.ownerDocument.createElement('span');
        marker.className = 'tvm-node-address'; marker.textContent = '🔗'; marker.title = t("Node address: ^") + node.blockId;
        marker.setAttribute('aria-label', marker.title); marker.setAttribute('role', 'img'); el.append(marker);
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
      if (el) { el.classList.add('is-editing'); el.append(this.editing.editor.host); }
    }
    if (!this.visible.length) {
      const empty = this.container.ownerDocument.createElement('div');
      empty.className = 'tvm-empty';
      empty.textContent = t("This map has no nodes. Open the source and add a heading or bullet to begin.");
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
          void Promise.resolve(pending).catch(() => {
            if (!this.destroyed) content.textContent = label;
          }).finally(() => {
            this.markdownInFlight--;
            if (this.loadingMarkdown || this.nodeLayer.contains(content)) this.scheduleContentLayout();
            this.scheduleMarkdownBatch();
          });
        }
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
        if (this.followAfterLayout && this.state.selected) {
          this.ensureVisible(this.state.selected);
          this.emitState();
        }
      }
      this.followAfterLayout = false;
    });
  }

  private layout(): void {
    if (!this.doc || this.destroyed) return;
    const height = new Map<string, number>();
    const branchHeight = new Map<string, number>();
    const visible = new Set(this.visible);
    const widths = new Map<string, number>();
    const levels = new Map<string, number>();
    const columns = new Map<number, number>();
    const widthMode = this.mode === 'map' ? this.options.getWidthMode?.() ?? 'fixed' : 'fixed';
    for (const id of this.visible) {
      const el = this.elements.get(id)!;
      el.style.height = '';
      el.style.width = widthMode === 'fixed' || id === this.editing?.id ? `${WIDTH}px` : 'max-content';
      el.style.maxWidth = widthMode === 'fixed' ? '' : `${WIDTH}px`;
    }
    for (const id of this.visible) {
      const node = this.doc.byId.get(id)!;
      const level = node.parentId && levels.has(node.parentId) ? levels.get(node.parentId)! + 1 : 0;
      levels.set(id, level);
      const fallback = Math.max(MIN_WIDTH, Math.min(WIDTH, this.plainText(node.text).length * 7.5 + 34));
      // offsetWidth rounds to an integer; leave room for fractional text metrics
      // so a natural-width label cannot wrap merely because the zoom changed.
      const measured = this.elements.get(id)!.offsetWidth;
      const width = widthMode === 'fixed' ? WIDTH : measured ? Math.min(WIDTH, measured + 2) : fallback;
      widths.set(id, width);
      columns.set(level, Math.max(columns.get(level) ?? 0, width));
    }
    for (const id of this.visible) {
      const width = widthMode === 'column' ? columns.get(levels.get(id)!)! : widths.get(id)!;
      widths.set(id, width);
      const el = this.elements.get(id)!;
      el.style.width = `${width}px`;
      el.style.maxWidth = '';
    }
    for (const id of this.visible) {
      const el = this.elements.get(id)!;
      height.set(id, el.offsetHeight || this.estimateHeight(this.doc.byId.get(id)!.text));
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
      branchHeight.set(id, Math.max(height.get(id)!, total));
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
        stack.push({ id, x: item.x + pos.width + columnGap, y, level: item.level + 1 });
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
      path.setAttribute('d', `M ${x1} ${y1} C ${x1 + COLUMN_GAP / 2} ${y1}, ${x2 - COLUMN_GAP / 2} ${y2}, ${x2} ${y2}`);
      fragment.append(path);
    }
    this.edges.replaceChildren(fragment);
    this.paintEdges(this.viewportSize());
  }

  private paintEdges(size: { width: number; height: number }): void {
    if (this.mode !== 'map') return;
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
    const id = !this.editing && this.selection.size === 1 && !this.selectionMode ? this.state.selected : null;
    const pos = id ? this.positions.get(id) : undefined, c = this.state.camera;
    const geometry = viewportRect && pos ? { viewport: viewportRect, node: {
      left: viewportRect.left + pos.x * c.scale + c.x, top: viewportRect.top + pos.y * c.scale + c.y,
      right: viewportRect.left + (pos.x + pos.width) * c.scale + c.x, bottom: viewportRect.top + (pos.y + pos.height) * c.scale + c.y,
      width: pos.width * c.scale, height: pos.height * c.scale,
    } } : undefined;
    this.handles?.place(id ? this.elements.get(id) : undefined, id, geometry);
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
    const area = this.editorArea(), editor = this.editing.editor;
    const tools = editor.host.querySelector<HTMLElement>('.tvm-inline-tools');
    editor.setMaxHeight(Math.max(26, (area.height - 32) / this.state.camera.scale - (tools?.offsetHeight ?? 0) - 28));
    editor.resize();
    this.scheduleLayout(true);
  }

  private ensureVisible(id: string, center = false): void {
    const pos = this.positions.get(id);
    if (!pos) return;
    const c = this.state.camera;
    const area = this.editing?.id === id ? this.editorArea() : { left: 0, top: 0, ...this.viewportSize() };
    const size = { width: area.width, height: area.height };
    const padding = this.editing?.id === id ? 12 : 44;
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
    if (mode === 'range') {
      this.selectionAnchor ??= this.state.selected ?? id;
      const from = this.visible.indexOf(this.selectionAnchor), to = this.visible.indexOf(id);
      this.selection = new Set(from < 0 ? [id] : this.visible.slice(Math.min(from, to), Math.max(from, to) + 1));
    } else {
      this.selectionAnchor = id;
      if (mode === 'single') this.selection = new Set([id]);
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
    if ((event.target as Element).closest('.tvm-create-handles')) return;
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
    if (id) {
      this.select(id);
      if (target.closest('input[type="checkbox"]')) { event.preventDefault(); this.options.onAction('toggle-task', id); }
    } else this.deselect();
    this.viewport.focus({ preventScroll: true });
  }

  private deselect(): void {
    this.state.selected = null;
    this.selection.clear(); this.selectionAnchor = null;
    for (const element of this.elements.values()) {
      element.classList.remove('is-selected');
      element.setAttribute('aria-selected', 'false');
    }
    this.updateActiveDescendant();
    this.emitState();
  }

  private doubleClick(event: MouseEvent): void {
    if (this.selectionMode || event.shiftKey || event.ctrlKey || event.metaKey) return;
    if (this.editing) return;
    if ((event.target as Element).closest('a, button, input') || Date.now() < this.suppressClickUntil) return;
    const id = this.nodeFrom(event.target);
    if (!id) return;
    event.preventDefault();
    this.select(id);
    this.options.onAction('edit', id);
  }

  private toggleFold(id: string): void {
    if (!this.doc?.byId.get(id)?.children.length) return;
    if (this.collapsed.has(id)) this.collapsed.delete(id);
    else this.collapsed.add(id);
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }

  handleKeydown(event: KeyboardEvent): boolean {
    if (this.destroyed || event.defaultPrevented) return false;
    if (event.key === 'Escape' && this.handles.cancelIfActive()) { event.preventDefault(); event.stopPropagation(); return true; }
    if (this.editing) return this.editing.editor.handleKeydown(event);
    if (event.key === 'Escape' && this.marquee) { this.cancelMarquee(); event.preventDefault(); event.stopPropagation(); return true; }
    if (event.key === 'Escape' && this.drag) { this.clearDrag(); event.preventDefault(); event.stopPropagation(); return true; }
    const target = event.target as HTMLElement | null;
    if (target?.closest?.('input, textarea, select, button, [contenteditable]:not([contenteditable="false"])') || (target && this.menu?.contains(target))) return false;
    if (event.key === 'Escape' && (this.selection.size > 1 || this.selectionMode)) {
      this.selectionMode = false; this.viewport.classList.remove('is-selecting'); this.deselect();
      event.preventDefault(); event.stopPropagation(); return true;
    }
    const action = resolveHotkey(event, this.options.getHotkeys?.());
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
      if (!id && action !== 'undo' && action !== 'redo' && action !== 'paste') return false;
      this.options.onAction(action as NodeAction, id);
      return true;
    }
    let next: string | undefined;
    if (action === 'first') next = this.visible[0];
    else if (action === 'last') next = this.visible[this.visible.length - 1];
    else if (!id || !node) next = this.visible[0];
    else if (action === 'parent') {
      if (this.options.getCollapseOnLeft?.() && node.children.length && !this.collapsed.has(id)) {
        this.toggleFold(id); return true;
      }
      next = node.parentId ?? undefined;
    } else if (action === 'child') {
      if (this.collapsed.has(id)) { this.toggleFold(id); return true; }
      next = node.children[0];
    } else {
      const siblings = node.parentId ? this.doc.byId.get(node.parentId)?.children ?? [] : this.doc.roots;
      const index = siblings.indexOf(id);
      next = siblings[index + (action === 'previous' ? -1 : 1)];
    }
    if (next) this.select(next, true);
    return true;
  }

  private wheel(event: WheelEvent): void {
    if ((event.target as Element).closest('.tvm-inline-editor')) return;
    if (this.menu?.contains(event.target as Node)) return;
    event.preventDefault();
    const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? this.viewportSize().height : 1;
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
    if ((event.target as Element).closest('.tvm-create-handles')) return;
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
    if (!this.editing && !id && event.button === 0 && (this.selectionMode || event.shiftKey) && this.touches.size === 0) {
      const element = this.container.ownerDocument.createElement('div'); element.className = 'tvm-selection-box'; this.viewport.append(element);
      this.marquee = { pointer: event.pointerId, x: event.clientX, y: event.clientY, moved: false, base: event.ctrlKey || event.metaKey ? [...this.selection] : [], before: [...this.selection], element };
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
      if (event.button === 1) event.preventDefault();
    }
    if (!this.editing && event.pointerType === 'touch' && this.touches.size === 1 && id && !(event.target as Element).closest('a, button, input, textarea')) {
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
        if (bounds.right >= left && bounds.left <= right && bounds.bottom >= top && bounds.top <= bottom) this.selection.add(id);
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
      const previous = this.elements.get(drag.target ?? '');
      previous?.classList.remove('is-drop-target'); previous?.removeAttribute('data-drop-position');
      const hit = this.container.ownerDocument.elementFromPoint(event.clientX, event.clientY);
      let target = this.nodeFrom(hit);
      if (!target) {
        // The narrow space immediately above/below a node is also a sibling target.
        for (const [id, element] of this.elements) {
          const rect = element.getBoundingClientRect();
          if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top - 12 && event.clientY <= rect.bottom + 12) { target = id; break; }
        }
      }
      let position: DropPosition = 'child';
      if (target) {
        const rect = this.elements.get(target)!.getBoundingClientRect();
        const relative = (event.clientY - rect.top) / Math.max(1, rect.height);
        position = rect.height > 0 ? (relative < 0.25 ? 'before' : relative > 0.75 ? 'after' : 'child') : 'child';
        if (!this.doc || !canDropBranches(this.doc, drag.ids, target, position)) target = null;
      }
      drag.target = target; drag.position = position;
      if (target) {
        const element = this.elements.get(target)!;
        element.classList.add('is-drop-target'); element.dataset.dropPosition = position;
        this.live.textContent = (position === 'before' ? t("Before: ") : position === 'after' ? t("After: ") : t("As children: ")) + this.doc!.byId.get(target)!.text;
      }
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
    try { this.viewport.setPointerCapture(event.pointerId); } catch { /* A detached or synthetic pointer has no capture. */ }
    this.state.camera.x = this.pan.camera.x + dx;
    this.state.camera.y = this.pan.camera.y + dy;
    this.viewport.classList.add('is-panning');
    this.suppressClickUntil = Date.now() + 350;
    this.applyCamera(true);
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
    if (this.touchHold?.pointer === event.pointerId) this.cancelTouchHold();
    if (event.type === 'pointercancel' && this.marquee?.pointer === event.pointerId) { this.cancelMarquee(); return; }
    if (this.marquee?.pointer === event.pointerId) {
      const box = this.marquee; box.element.remove(); this.marquee = undefined;
      if (box.moved) this.suppressClickUntil = Date.now() + 350;
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
    if (this.pan?.pointer === event.pointerId) this.pan = null;
    if (this.touches.size < 2) this.pinch = null;
    if (wasPinching && this.touches.size === 1) {
      const [id, point] = [...this.touches.entries()][0];
      this.pan = { pointer: id, x: point.x, y: point.y, camera: { ...this.state.camera }, moved: false };
    }
    this.viewport.classList.remove('is-panning');
    try { if (this.viewport.hasPointerCapture(event.pointerId)) this.viewport.releasePointerCapture(event.pointerId); } catch { /* Capture may already have ended. */ }
    if (changed) this.emitState();
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
      { label: t("Copy branch"), action: 'copy' },
      { label: t("Cut branch"), action: 'cut' },
      { label: t("Paste as child branch"), action: 'paste' },
      { label: t("Paste after node"), action: 'paste-after' },
      { label: t("Move up"), action: 'move-up' },
      { label: t("Move down"), action: 'move-down' },
      { label: t("Make child of previous node"), action: 'indent' },
      { label: t("Move up one level"), action: 'outdent' },
      { label: t("Open source Markdown"), action: 'source' },
      { label: t("Delete branch"), action: 'delete' },
    ];
    for (const entry of entries) {
      if (['fold', 'collapse-branch', 'expand-branch'].includes(entry.action) && !this.doc?.byId.get(id)?.children.length) continue;
      const button = this.container.ownerDocument.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'menuitem');
      const label = this.container.ownerDocument.createElement('span');
      label.textContent = this.selection.size > 1 && ['delete', 'copy', 'cut'].includes(entry.action) ? t(entry.action === "copy" ? "Copy selection" : entry.action === "cut" ? "Cut selection" : "Delete selection") : entry.label;
      if (this.selection.size > 1 && ['edit', 'add-child', 'add-sibling', 'add-parent', 'paste', 'paste-after', 'move-up', 'move-down', 'indent', 'outdent'].includes(entry.action)) button.disabled = true;
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

  private clearDrag(): void {
    this.cancelTouchHold();
    if (!this.drag) return;
    const drag = this.drag; this.drag = undefined;
    if (drag.active) this.suppressClickUntil = Date.now() + 400;
    this.viewport.classList.remove('is-dragging');
    for (const id of drag.ids) this.elements.get(id)?.classList.remove('is-drag-source');
    if (drag.target) { const element = this.elements.get(drag.target); element?.classList.remove('is-drop-target'); element?.removeAttribute('data-drop-position'); }
    try { if (this.viewport.hasPointerCapture(drag.pointer)) this.viewport.releasePointerCapture(drag.pointer); } catch { /* Capture already ended. */ }
  }
}
