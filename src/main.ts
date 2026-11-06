import { t, LANGUAGES, isLanguageSetting, setLanguage, type LanguageSetting } from './i18n';
import { getLanguage, App, Component, EditableFileView, ItemView, MarkdownRenderer, MarkdownView, Menu, Notice, Platform, Plugin, PluginSettingTab, Scope, Setting, TFile, WorkspaceLeaf, normalizePath, parseLinktext, setIcon, type HoverPopover } from 'obsidian';
import { moveBranches, changeNodes, copyBranches, deleteNodes, parseMap, editNode, addNode, addParent, deleteNode, moveNode, copyBranch, pasteBranch, toggleTask, setStep, setDated, setQuestion, getSteps, compareSteps, renumberSteps } from './core';
import { addressNode, onlyAddedBlockIds } from './block-links';
import { captureHotkey, DEFAULT_HOTKEYS, HOTKEY_DEFINITIONS, resolveHotkey, validateHotkeys } from './hotkeys';
import { compileMapPatterns, PatternError, type MapRules, type PatternMode } from './map-patterns';
import { MapSearch } from './map-search';
import { MapSurface } from './surface';
import { attachMapFilter, queueLabel } from './queue-controls';
import { mountNativeEditor, prepareNativeEditor, type NativeConstructor } from './native-editor';
import type { InlineEditor, InlineDriver } from './inline';
import type { Editor } from 'obsidian';
import { InputEditor } from './input-editor';
import { attachImagePaste, saveClipboardImage } from './image-paste';
import { attachNodeTools, DateDialog, MapPicker, TextDialog } from './editor';
import { exportHtml, exportSvg } from './export';
import { guardedChange, History, restoreViewState, serializeViewState } from './session';
import type { MapDocument, MapViewState, NodeAction, Step, WidthMode, DropPosition } from './types';

const VIEW = 'traceview-mindmap-map';
const QUEUE = 'traceview-mindmap-queue';
const LARGE_RESTORE_NODE_LIMIT = 400;

function hasLargeVisibleTree(doc: MapDocument, state?: MapViewState): boolean {
  const collapsed = new Set(state?.collapsed);
  const pending = state?.focusRoot ? [state.focusRoot] : [...doc.roots];
  let count = 0;
  while (pending.length) {
    const node = doc.byId.get(pending.pop()!);
    if (!node) continue;
    if (++count >= LARGE_RESTORE_NODE_LIMIT) return true;
    if (!collapsed.has(node.id)) for (const child of node.children) pending.push(child);
  }
  return false;
}
interface Settings extends MapRules { previousPluginId?: string; language: LanguageSetting; nodeEditor: 'native' | 'text'; autoOpen: boolean; autoRestoreLargeMaps: boolean; hideFrozen: boolean; queueTaskMarker: boolean; queueStepTag: boolean; collapseOnLeft: boolean; hotkeys: Record<string, string>; widthMode: WidthMode; }
const DEFAULT_SETTINGS: Settings = { patternMode: 'glob', mapPatterns: '*.mindmap.md\n🎯*.md', language: 'auto', nodeEditor: 'native', autoOpen: false, autoRestoreLargeMaps: true, hideFrozen: true, queueTaskMarker: true, queueStepTag: true, collapseOnLeft: false, hotkeys: {}, widthMode: 'fixed' };
const widthModes = (): [WidthMode, string][] => [['fixed', t("Fixed width")], ['content', t("Fit node content")], ['column', t("Fit visible column")]];
const message = (error: unknown) => error instanceof Error ? error.message : String(error);
const button = (parent: HTMLElement, label: string, action: () => void, title = label) => {
  const element = parent.createEl('button', { text: label, attr: { title, 'aria-label': title, type: 'button' } });
  element.onclick = action;
  return element;
};
const iconButton = (parent: HTMLElement, icon: string, label: string, action: () => void) => {
  const element = button(parent, '', action, label);
  element.addClass('tvm-icon-button');
  setIcon(element, icon);
  return element;
};

export default class TraceViewMindmap extends Plugin {
  settings: Settings = { ...DEFAULT_SETTINGS };
  private clipboard = '';
  private matchesMap = compileMapPatterns(DEFAULT_SETTINGS);
  private saveQueues = new Map<string, Promise<void>>();
  private sourceLeaves = new WeakMap<WorkspaceLeaf, string>();
  private sourcePreferences = new Set<string>();
  private autoTimers = new Map<WorkspaceLeaf, number>();
  private nativeLinkTargets = new WeakMap<MarkdownView, { path: string; subpath: string }>();
  private opening = new WeakSet<WorkspaceLeaf>();

  async onload(): Promise<void> {
    const saved = await this.loadData();
    this.register(() => { for (const timer of this.autoTimers.values()) window.clearTimeout(timer); this.autoTimers.clear(); });
    this.settings = { ...DEFAULT_SETTINGS, ...saved, hotkeys: {} };
    if (typeof this.settings.previousPluginId !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(this.settings.previousPluginId) || this.settings.previousPluginId === 'traceview-mindmap') delete this.settings.previousPluginId;
    try {
      let paths = this.app.loadLocalStorage('traceview-mindmap:source-preferences');
      if (!Array.isArray(paths) && this.settings.previousPluginId) paths = this.app.loadLocalStorage(this.settings.previousPluginId + ':source-preferences');
      if (Array.isArray(paths)) { this.sourcePreferences = new Set(paths.filter(path => typeof path === 'string')); this.rememberSource(); }
    } catch { /* Optional local preferences. */ }
    if (this.settings.nodeEditor !== 'native' && this.settings.nodeEditor !== 'text') this.settings.nodeEditor = 'native';
    if (!isLanguageSetting(this.settings.language)) this.settings.language = 'auto';
    setLanguage(this.settings.language, typeof getLanguage === 'function' ? getLanguage() : 'en');
    if (this.settings.patternMode !== 'regex') this.settings.patternMode = 'glob';
    if (typeof this.settings.mapPatterns !== 'string') this.settings.mapPatterns = DEFAULT_SETTINGS.mapPatterns;
    try { this.matchesMap = compileMapPatterns(this.settings); }
    catch {
      this.settings.patternMode = DEFAULT_SETTINGS.patternMode;
      this.settings.mapPatterns = DEFAULT_SETTINGS.mapPatterns;
      new Notice(t("Invalid saved map patterns. Default patterns are active."));
    }
    if (!widthModes().some(([mode]) => mode === this.settings.widthMode)) this.settings.widthMode = 'fixed';
    for (const definition of HOTKEY_DEFINITIONS) {
      const binding = saved?.hotkeys?.[definition.id];
      if (typeof binding === 'string' && !validateHotkeys(binding)) this.settings.hotkeys[definition.id] = binding;
    }
    const originalEphemeral = MarkdownView.prototype.setEphemeralState;
    let observeLinks = true;
    const plugin = this;
    const receiveEphemeral = function(this: MarkdownView, state: any) {
      if (observeLinks && this.app === plugin.app && plugin.settings.autoOpen && this.file && plugin.isMap(this.file) && typeof state?.subpath === 'string') {
        plugin.nativeLinkTargets.set(this, { path: this.file.path, subpath: state.subpath });
      }
      return originalEphemeral.call(this, state);
    };
    MarkdownView.prototype.setEphemeralState = receiveEphemeral;
    this.register(() => { observeLinks = false; if (MarkdownView.prototype.setEphemeralState === receiveEphemeral) MarkdownView.prototype.setEphemeralState = originalEphemeral; });
    this.registerView(VIEW, leaf => new MapView(leaf, this));
    this.registerView(QUEUE, leaf => new QueueView(leaf, this));
    if (this.settings.previousPluginId) {
      this.registerView(this.settings.previousPluginId + '-map', leaf => new MapView(leaf, this));
      this.registerView(this.settings.previousPluginId + '-queue', leaf => new QueueView(leaf, this));
    }
    this.registerHoverLinkSource('traceview-mindmap', { display: 'TraceView Mindmap', defaultMod: true });
    this.addSettingTab(new SettingsTab(this));
    this.addRibbonIcon('git-fork', t("TraceView Mindmap: open map"), () => this.pickMap());
    this.addCommand({ id: 'open-map', name: t("Open current note as a map"), callback: () => {
      const file = this.activeFile();
      if (file?.extension === 'md') void this.openMap(file, this.app.workspace.getMostRecentLeaf() ?? undefined); else this.pickMap();
    } });
    this.addCommand({ id: 'open-node-at-cursor', name: t("Open map at the Markdown cursor"), editorCheckCallback: (checking, editor, context) => {
      if (!(context instanceof MarkdownView) || !context.file) return false;
      const doc = parseMap(editor.getValue()), line = editor.getCursor().line;
      if (!doc.nodes.some(node => node.line === line)) return false;
      if (!checking) void this.openAtCursor(context).catch(error => new Notice(message(error), 8000));
      return true;
    } });
    this.addCommand({ id: 'find-map', name: t("Find a map"), callback: () => this.pickMap() });
    this.addCommand({ id: 'new-map', name: t("Create a simple tree"), callback: () => this.createMap(false) });
    this.addCommand({ id: 'new-vector', name: t("Create a vector (separate template)"), callback: () => this.createMap(true) });
    this.addCommand({ id: 'open-queue', name: t("Steps, deadlines and QA"), callback: () => { void this.openQueue(); } });
    const commands: [string, string, NodeAction][] = [
      ['add-child', t("Add child node"), 'add-child'], ['add-sibling', t("Add sibling node"), 'add-sibling'],
      ['add-parent', t("Add parent node"), 'add-parent'],
      ['copy-node-link', t("Copy link to node"), 'copy-node-link'], ['edit-node', t("Edit node"), 'edit'], ['make-step', t("Mark as atomic step"), 'make-step'],
      ['make-dated', t("Add step deadline"), 'make-dated'], ['make-question', t("Mark as QA"), 'make-question'],
      ['toggle-task', t("Toggle step completion"), 'toggle-task'], ['copy-branch', t("Copy branch"), 'copy'], ['cut-branch', t("Cut branch"), 'cut'],
      ['paste-branch', t("Paste as child branch"), 'paste'], ['paste-after', t("Paste as sibling branch"), 'paste-after'], ['undo', t("Undo map change"), 'undo'], ['redo', t("Redo map change"), 'redo']
    ];
    for (const [id, name, action] of commands) this.addCommand({ id, name, checkCallback: checking => {
      const view = this.app.workspace.getActiveViewOfType(MapView);
      if (!view) return false;
      if (!checking) void view.action(action, view.surface?.getState().selected ?? null);
      return true;
    } });
    for (const definition of HOTKEY_DEFINITIONS.filter(definition => !commands.some(([, , action]) => action === definition.id))) {
      this.addCommand({ id: `map-${definition.id}`, name: definition.label, checkCallback: checking => {
        const view = this.app.workspace.getActiveViewOfType(MapView);
        if (!view?.surface) return false;
        if (!checking) view.surface.runHotkey(definition.id);
        return true;
      } });
    }
    this.addCommand({ id: 'insert-question-editor', name: t("Insert QA in Markdown editor"), editorCallback: editor => editor.replaceSelection('==//todo Q: ==') });
    this.addCommand({ id: 'insert-step-editor', name: t("Insert unnumbered step in Markdown editor"), editorCallback: editor => editor.replaceSelection('[ ] #step ) ') });
    this.registerEvent(this.app.workspace.on('editor-menu', (menu, editor, context) => {
      if (context instanceof MarkdownView && context.file && parseMap(editor.getValue()).nodes.some(node => node.line === editor.getCursor().line)) {
        menu.addItem(item => item.setTitle(t("Open map at this node")).setIcon('git-fork').onClick(() => { void this.openAtCursor(context).catch(error => new Notice(message(error), 8000)); }));
      }
    }));
    this.registerEvent(this.app.workspace.on('file-menu', (menu, file, _source, leaf) => {
      if (!(file instanceof TFile) || file.extension !== 'md') return;
      const current = leaf ?? this.app.workspace.getMostRecentLeaf();
      if (current?.view instanceof MapView && current.view.path === file.path) {
        menu.addItem(item => item.setTitle(t("Open source Markdown")).setIcon('file-code').onClick(() => { void this.source(file, 0, current); }));
      } else menu.addItem(item => item.setTitle(t("Open in TraceView Mindmap")).setIcon('git-fork').onClick(() => { void this.openMap(file, current ?? undefined); }));
    }));
    this.registerEvent(this.app.vault.on('modify', file => {
      if (!(file instanceof TFile)) return;
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
        const view = leaf.view as MapView;
        if (view.path === file.path) view.scheduleReload();
      }
      if (this.isMap(file)) this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on('rename', (file, oldPath) => {
      this.sourcePreferences = new Set([...this.sourcePreferences].map(path => path === oldPath || path.startsWith(oldPath + '/') ? file.path + path.slice(oldPath.length) : path)); this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
        const explicit = this.sourceLeaves.get(leaf);
        if (explicit === oldPath || explicit?.startsWith(`${oldPath}/`)) this.sourceLeaves.set(leaf, file.path + explicit.slice(oldPath.length));
      }
      this.app.workspace.requestSaveLayout();
      this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on('delete', file => {
      this.sourcePreferences = new Set([...this.sourcePreferences].filter(path => path !== file.path && !path.startsWith(file.path + '/'))); this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
        const view = leaf.view as MapView;
        if (view.path === file.path) view.scheduleReload();
      }
      this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on('create', file => { if (file instanceof TFile && this.isMap(file)) this.refreshQueues(); }));
    this.registerEvent(this.app.workspace.on('file-open', file => {
      const leaf = this.app.workspace.getMostRecentLeaf();
      if (leaf && file) this.scheduleAutoOpen(leaf, file.path);
    }));
    this.registerEvent(this.app.workspace.on('active-leaf-change', leaf => { if (leaf) this.scheduleAutoOpen(leaf); }));
    this.registerEvent(this.app.workspace.on('layout-change', () => {
      for (const leaf of this.app.workspace.getLeavesOfType('markdown')) this.scheduleAutoOpen(leaf);
    }));
  }

  private rememberSource(): void {
    try { this.app.saveLocalStorage('traceview-mindmap:source-preferences', [...this.sourcePreferences]); } catch { /* Storage may be full. */ }
  }
  private scheduleAutoOpen(leaf: WorkspaceLeaf, expectedPath?: string): void {
    if (this.opening.has(leaf)) return;
    const previous = this.autoTimers.get(leaf); if (previous !== undefined) window.clearTimeout(previous);
    this.autoTimers.set(leaf, window.setTimeout(() => {
      this.autoTimers.delete(leaf);
      const view = leaf.view;
      if (!(view instanceof MarkdownView) || !view.file || (expectedPath && view.file.path !== expectedPath)) return;
      if (this.sourceLeaves.get(leaf) !== view.file.path) this.sourceLeaves.delete(leaf);
      if (!this.settings.autoOpen || !this.isMap(view.file) || this.sourceLeaves.get(leaf) === view.file.path || this.sourcePreferences.has(view.file.path)) return;
      this.opening.add(leaf);
      const file = view.file;
      const linkState = this.nativeLinkTargets.get(view); this.nativeLinkTargets.delete(view);
      void (async () => {
        try {
          await view.save();
          if (leaf.view === view && view.file === file && this.settings.autoOpen && !this.sourcePreferences.has(file.path)) {
            await this.openMap(file, leaf);
            if (linkState?.path === file.path && linkState.subpath && leaf.view instanceof MapView) leaf.view.revealSubpath(linkState.subpath);
          }
        } catch (error) { new Notice(message(error), 8000); }
        finally { this.opening.delete(leaf); }
      })();
    }, 0));
  }
  private async openAtCursor(view: MarkdownView): Promise<void> {
    const file = view.file; if (!file) return;
    const source = view.editor.getValue(), line = view.editor.getCursor().line;
    const node = parseMap(source).nodes.find(node => node.line === line); if (!node) return;
    await view.save();
    if (view.file !== file || view.editor.getValue() !== source) throw new Error(t("The note changed. Open it again at the current line."));
    await this.openMap(file, view.leaf, node.id);
  }

  pickMap(): void { new MapPicker(this.app, file => this.isMap(file), file => { void this.openMap(file); }).open(); }
  activeFile(): TFile | null {
    const view = this.app.workspace.getActiveViewOfType(MapView);
    if (view?.path) { const file = this.app.vault.getAbstractFileByPath(view.path); if (file instanceof TFile) return file; }
    return this.app.workspace.getActiveFile();
  }
  async openMap(file: TFile, target?: WorkspaceLeaf, nodeId?: string): Promise<void> {
    const existing = this.app.workspace.getLeavesOfType(VIEW).find(leaf => (leaf.view as MapView).path === file.path);
    const leaf = target ?? existing ?? this.app.workspace.getLeaf('tab');
    if (leaf.view instanceof MapView && leaf.view.surface?.isEditing()) { new Notice(t("Save or cancel the node draft.")); leaf.view.surface.focusEditor(); return; }
    this.sourceLeaves.delete(leaf); this.sourcePreferences.delete(file.path); this.rememberSource();
    await leaf.setViewState({ type: VIEW, state: { file: file.path, openNow: true }, active: true });
    await this.app.workspace.revealLeaf(leaf);
    if (nodeId && leaf.view instanceof MapView) { await leaf.view.reload(); leaf.view.surface?.reveal(nodeId); }
  }
  async openQueue(): Promise<void> {
    const leaf = this.app.workspace.getLeavesOfType(QUEUE)[0] ?? this.app.workspace.getLeaf('tab');
    await leaf.setViewState({ type: QUEUE, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }
  isMap(file: TFile): boolean {
    return this.matchesMap(file.path, this.app.metadataCache.getFileCache(file)?.frontmatter);
  }
  async setMapRules(rules: MapRules): Promise<void> {
    const matches = compileMapPatterns(rules);
    await this.saveData({ ...this.settings, ...rules });
    Object.assign(this.settings, rules);
    this.matchesMap = matches;
    this.refreshQueues();
  }
  refreshQueues(): void {
    for (const leaf of this.app.workspace.getLeavesOfType(QUEUE)) (leaf.view as QueueView).scheduleReload();
  }
  refreshBindings(): void {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) (leaf.view as MapView).refreshBindings();
  }
  async setWidthMode(mode: WidthMode): Promise<void> {
    this.settings.widthMode = mode;
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) (leaf.view as MapView).surface?.refreshLayout();
    await this.saveData(this.settings);
  }
  async source(file: TFile, line = 0, target?: WorkspaceLeaf): Promise<void> {
    const leaf = target ?? this.app.workspace.getLeaf(false);
    this.sourceLeaves.set(leaf, file.path); this.sourcePreferences.add(file.path); this.rememberSource();
    // Explicit view state avoids another plugin choosing a map view for this .md file.
    await leaf.setViewState({ type: 'markdown', state: { file: file.path, mode: 'source' }, active: true });
    await this.app.workspace.revealLeaf(leaf);
    if (leaf.view instanceof MarkdownView) {
      leaf.view.editor.setCursor({ line, ch: 0 });
      leaf.view.editor.scrollIntoView({ from: { line, ch: 0 }, to: { line, ch: 0 } }, true);
      leaf.view.editor.focus();
    }
  }
  async openMapLink(link: string, view: MapView, event: MouseEvent): Promise<void> {
    if (view.surface?.isEditing()) { view.surface.focusEditor(); return; }
    const parts = parseLinktext(link);
    const file = parts.path ? this.app.metadataCache.getFirstLinkpathDest(parts.path, view.path) : view.file;
    const newTab = event.ctrlKey || event.metaKey || event.button === 1;
    if (file && this.isMap(file)) {
      const leaf = newTab ? this.app.workspace.getLeaf('tab') : view.leaf;
      await this.openMap(file, leaf);
      if (leaf.view instanceof MapView) leaf.view.revealSubpath(parts.subpath);
    } else {
      if (file) {
        const leaf = newTab ? this.app.workspace.getLeaf('tab') : view.leaf;
        await leaf.setViewState({ type: 'markdown', state: { file: file.path }, active: true });
        if (parts.subpath) leaf.setEphemeralState({ subpath: parts.subpath });
      } else await this.app.workspace.openLinkText(link, view.path, newTab ? 'tab' : false, { active: true });
    }
  }
  createMap(vector: boolean): void {
    new TextDialog(this.app, vector ? t("New vector name") : t("New tree name"), '', async value => {
      const name = value.trim().replace(/\.mindmap(?:\.md)?$/i, '');
      if (!name || /[\\/:*?"<>|\r\n]/.test(name) || name === '.' || name === '..') throw new Error(t("Use a name without path characters."));
      const parent = this.activeFile()?.parent?.path ?? '';
      const path = normalizePath(`${parent}/${name}.mindmap.md`);
      if (this.app.vault.getAbstractFileByPath(path)) throw new Error(t("A file with this name already exists."));
      const body = vector ? `- ${name}\n  - ▶️ ${t("Next action")}\n    - [ ] #step ) ${t("First action")}\n  - 🔥 ${t("Active now")}\n  - 🧊 ${t("Frozen / someday")}\n` : `- ${name}\n  - [ ] #step 1) ${t("First step")}\n`;
      const file = await this.app.vault.create(path, `---\nmindmap: true\n---\n\n# /\n\n${body}`);
      await this.openMap(file);
    }, '', false).open();
  }

  async write(file: TFile, expected: string, next: string): Promise<void> {
    if (expected === next) return;
    const previous = this.saveQueues.get(file.path) ?? Promise.resolve();
    const operation = previous.catch(() => undefined).then(async () => {
      // A native editor may have a newer buffer than the last file system read.
      for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
        const view = leaf.view;
        if (view instanceof MarkdownView && view.file?.path === file.path && view.editor.getValue() !== expected) throw new Error(t("The Markdown editor has newer text. Wait for it to save and try again."));
      }
      await this.app.vault.process(file, current => guardedChange(current, expected, next));
    });
    this.saveQueues.set(file.path, operation);
    try { await operation; } finally { if (this.saveQueues.get(file.path) === operation) this.saveQueues.delete(file.path); }
  }
  async copy(text: string): Promise<void> {
    this.clipboard = text;
    try { await navigator.clipboard.writeText(text); new Notice(t("Branch copied")); }
    catch { new Notice(t("Branch saved to the plugin clipboard")); }
  }
  async copyForCut(text: string): Promise<void> {
    try { await navigator.clipboard.writeText(text); }
    catch { throw new Error(t("Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.")); }
    this.clipboard = text;
  }
  async paste(): Promise<string> {
    try { const text = await navigator.clipboard.readText(); if (text) return text; } catch { /* Android can deny clipboard reads. */ }
    if (this.clipboard) return this.clipboard;
    throw new Error(t("Clipboard unavailable. Use “Paste branch text” in the ⋯ menu."));
  }
}

class MapView extends EditableFileView {
  path = '';
  hoverPopover: HoverPopover | null = null;
  editor?: Editor;
  editMode?: unknown;
  private nativeWarning = false;
  private nativeConstructor?: NativeConstructor;
  private pendingSubpath?: string;
  surface?: MapSurface;
  private doc?: MapDocument;
  private history = new History();
  private title?: HTMLElement;
  private status?: HTMLElement;
  private host?: HTMLElement;
  private renderer = new Component();
  private renderedNodes = new Map<HTMLElement, Component>();
  private refreshTimer = 0;
  private stateTimer = 0;
  private revision = 0;
  private closed = false;
  private waitingForLayout = false;
  private restoredRender: 'inspect' | 'paused' | 'allowed' = 'allowed';
  private startupGate?: HTMLDivElement;
  private startupMessage?: HTMLDivElement;
  private cancelRestoreWait?: () => void;
  private changing = false;
  private cutting = false;
  private pendingState?: string;
  private layoutMode: 'map' | 'outline' | 'table' = 'map';
  private showSearch?: () => void;
  private undoButton?: HTMLButtonElement;
  private redoButton?: HTMLButtonElement;
  private deleteButton?: HTMLButtonElement;
  constructor(leaf: WorkspaceLeaf, private plugin: TraceViewMindmap) {
    super(leaf);
    this.scope = new Scope(this.app.scope);
    this.scope.register(null, null, event => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target && this.contentEl.contains(target) && !target.closest('input, textarea, [contenteditable]') && resolveHotkey(event, this.plugin.settings.hotkeys) === 'find') {
        event.preventDefault(); event.stopPropagation(); this.showSearch?.(); return false;
      }
      if (target?.closest?.('.tvm-surface') && this.contentEl.contains(target) && this.surface?.handleKeydown(event)) return false;
    });
  }
  getViewType(): string { return VIEW; }
  // Native editor commands check this before calling our Editor adapter.
  getMode(): 'source' | 'preview' { return this.editor ? 'source' : 'preview'; }
  getDisplayText(): string { return this.path.split('/').pop()?.replace(/\.mindmap\.md$/, '') || 'TraceView Mindmap'; }
  getIcon(): string { return 'git-fork'; }
  canAcceptExtension(_extension: string): boolean { return false; }
  getState(): Record<string, unknown> { return { file: this.path }; }
  async setState(state: { file?: string; openNow?: boolean }, result: Parameters<ItemView['setState']>[1]): Promise<void> {
    if (state.file && this.path !== state.file) {
      if (this.surface?.isEditing()) { new Notice(t("Save or cancel the node draft before navigating.")); this.surface.focusEditor(); return; }
      this.restoredRender = Platform?.isWin && !state.openNow ? 'inspect' : 'allowed';
    }
    const activate = state.openNow && state.file === this.path && this.restoredRender !== 'allowed';
    await super.setState(state, result);
    if (activate) await this.activateRestoredMap();
    this.refreshTitle();
  }
  async onLoadFile(file: TFile): Promise<void> {
    this.cancelRestoreWait?.();
    this.path = file.path; this.doc = undefined; this.history = new History();
    if (this.startupGate) this.startupGate.hidden = true;
    this.pendingState = this.readState();
    if (this.surface) await this.reload();
  }
  async onUnloadFile(): Promise<void> { this.cancelRestoreWait?.(); this.persist(); this.doc = undefined; this.pendingSubpath = undefined; this.path = ''; this.surface?.update(parseMap('')); }
  private async activateRestoredMap(): Promise<void> {
    if (this.closed || this.restoredRender === 'allowed') return;
    this.cancelRestoreWait?.();
    this.restoredRender = 'allowed';
    if (this.startupGate) this.startupGate.hidden = true;
    await this.reload();
  }

  refreshRestoreWait(): void {
    this.cancelRestoreWait?.();
    if (this.closed || this.restoredRender !== 'paused') return;
    const automatic = this.plugin.settings.autoRestoreLargeMaps;
    this.startupMessage?.setText(automatic
      ? t("Waiting for Obsidian to be ready…")
      : t("Wait for Obsidian to load, then open the map."));
    const win = this.startupGate?.ownerDocument?.defaultView;
    if (!automatic || !win) return;
    const workspace = this.app.workspace;
    let previous = win.performance.now(), quietSince = previous;
    let timer = 0, cancelled = false;
    const canOpen = () => workspace.layoutReady && workspace.getMostRecentLeaf() === this.leaf
      && !win.document.hidden && !!this.startupGate?.isConnected;
    const check = () => {
      if (cancelled || this.closed || this.restoredRender !== 'paused') return;
      const now = win.performance.now();
      if (now - previous > 400 || !canOpen()) quietSince = now;
      previous = now;
      if (now - quietSince >= 8000) {
        win.requestIdleCallback(deadline => {
          if (cancelled) return;
          if (win.performance.now() - now <= 400 && deadline.timeRemaining() >= 8 && canOpen()) void this.activateRestoredMap();
          else timer = win.setTimeout(check, 250);
        }, { timeout: 250 });
      } else timer = win.setTimeout(check, 250);
    };
    this.cancelRestoreWait = () => {
      cancelled = true;
      win.clearTimeout(timer);
      this.cancelRestoreWait = undefined;
    };
    timer = win.setTimeout(check, 250);
  }
  async onRename(file: TFile): Promise<void> {
    // FileView receives every vault rename, not just its own file.
    if (file !== this.file) return;
    this.path = file.path;
    this.persist();
    await super.onRename(file);
    this.refreshTitle(); this.surface?.invalidateMarkdown(); await this.reload();
  }
  setEphemeralState(state: any): void {
    super.setEphemeralState(state);
    if (typeof state?.subpath === 'string') this.revealSubpath(state.subpath);
    else if (typeof state?.line === 'number' && this.doc) {
      const node = this.doc.nodes.find(node => node.line === state.line); if (node) this.surface?.reveal(node.id);
    }
  }
  getEphemeralState(): Record<string, unknown> {
    const id = this.surface?.getState().selected, node = id ? this.doc?.byId.get(id) : undefined;
    return node?.blockId ? { subpath: '#^' + node.blockId } : node ? { line: node.line } : {};
  }
  revealSubpath(subpath: string): void {
    if (!subpath) return;
    if (!this.doc || !this.surface) { this.pendingSubpath = subpath; return; }
    this.pendingSubpath = undefined;
    const nodes = subpath.startsWith('#^') ? this.doc.nodes.filter(node => node.blockId === subpath.slice(2))
      : this.doc.nodes.filter(node => node.kind === 'heading' && node.text.toLocaleLowerCase() === subpath.slice(1).toLocaleLowerCase());
    if (nodes.length === 1) this.surface.reveal(nodes[0].id);
    else new Notice(nodes.length ? t("This address is duplicated. Fix the block ID in Markdown.") : t("The linked node was not found."));
  }
  async onOpen(): Promise<void> {
    await super.onOpen();
    this.closed = false;
    this.contentEl.empty(); this.contentEl.addClass('tvm-view', 'tvm-map-view');
    this.addChild(this.renderer);
    const toolbar = this.contentEl.createDiv('tvm-toolbar');
    this.title = this.containerEl.querySelector<HTMLElement>('.view-header-title') ?? undefined;
    const actions = toolbar.createDiv('tvm-actions');
    this.undoButton = iconButton(actions, 'undo-2', t("Undo"), () => { void this.action('undo', null); });
    this.redoButton = iconButton(actions, 'redo-2', t("Redo"), () => { void this.action('redo', null); });
    this.undoButton.dataset.tvmAction = 'undo'; this.redoButton.dataset.tvmAction = 'redo';
    const levels = iconButton(actions, 'list-tree', t("Collapse levels"), () => this.levelMenu(levels));
    this.deleteButton = iconButton(actions, 'trash-2', t("Delete selected branch"), () => { void this.action('delete', this.selected()); });
    this.deleteButton.dataset.tvmAction = 'delete'; this.deleteButton.addClass('tvm-delete-node');
    iconButton(actions, 'git-branch-plus', t("Child node"), () => { void this.action('add-child', this.selected()); }).dataset.tvmAction = 'add-child';
    iconButton(actions, 'plus', t("Sibling node"), () => { void this.action('add-sibling', this.selected()); }).dataset.tvmAction = 'add-sibling';
    iconButton(actions, 'pencil', t("Edit"), () => { void this.action('edit', this.selected()); }).dataset.tvmAction = 'edit';
    const selectionButton = iconButton(actions, 'scan', t("Multiple selection: taps or rectangle"), () => this.surface?.toggleSelectionMode());
    selectionButton.setAttribute('aria-pressed', 'false');
    iconButton(actions, 'search', t("Search"), () => this.showSearch?.()).dataset.tvmAction = 'find';
    iconButton(actions, 'maximize', t("Fit map"), () => this.surface?.fit()).dataset.tvmAction = 'fit';
    const layout = iconButton(actions, 'panels-top-left', t("Layout and node width"), () => this.layoutMenu(layout));
    const more = iconButton(toolbar, 'ellipsis', t("Map actions"), () => this.menu(more));
    this.host = this.contentEl.createDiv('tvm-map-host');
    const search = new MapSearch(this.host, {
      search: (text, alpha) => this.surface?.search(text, alpha) ?? [],
      reveal: id => this.surface?.reveal(id),
      focusMap: () => this.host?.querySelector<HTMLElement>('.tvm-surface')?.focus({ preventScroll: true }),
    });
    this.showSearch = () => search.show();
    this.surface = new MapSurface(this.host, {
      getWidthMode: () => this.plugin.settings.widthMode,
      useTransformPan: () => Platform.isMobile,
      getHotkeys: () => this.plugin.settings.hotkeys,
      getCollapseOnLeft: () => this.plugin.settings.collapseOnLeft,
      onFind: () => this.showSearch?.(),
      getRenderKey: () => this.path,
      releaseMarkdown: element => {
        const component = this.renderedNodes.get(element);
        if (component) { this.renderer.removeChild(component); this.renderedNodes.delete(element); }
      },
      onAction: (action, id) => { void this.action(action, id); },
      onMoveBranches: (ids, target, position) => { void this.reparent(ids, target, position); },
      onState: () => {
        const count = this.surface?.getSelection().length ?? 0;
        selectionButton.setAttribute('aria-pressed', String(this.surface?.isSelectionMode() ?? false));
        selectionButton.setAttribute('aria-label', t("Selected nodes: {count}", { count }));
        selectionButton.dataset.count = count > 1 ? String(count) : '';
        this.refreshDeleteButton();
        window.clearTimeout(this.stateTimer); this.stateTimer = window.setTimeout(() => this.persist(), 180); },
      renderMarkdown: async (text, element) => {
        const component = this.renderer.addChild(new Component()); this.renderedNodes.set(element, component);
        await MarkdownRenderer.render(this.app, text, element, this.path, component);
      },
      onOpenLink: (link, event) => { void this.plugin.openMapLink(link, this, event).catch(error => new Notice(message(error))); },
      onHoverLink: (event, targetEl, linktext) => this.app.workspace.trigger('hover-link', { event, source: 'traceview-mindmap', hoverParent: this, targetEl, linktext, sourcePath: this.path }),
    });
    this.status = this.host.createDiv('tvm-status tvm-map-status');
    this.startupGate = this.host.createDiv('tvm-startup-gate');
    this.startupGate.hidden = true;
    this.startupMessage = this.startupGate.createDiv({ attr: { role: 'status' } });
    button(this.startupGate, t("Open now"), () => { void this.activateRestoredMap(); });
    this.refreshBindings();
    this.refreshHistory();
    await this.reload();
  }
  private refreshTitle(): void { this.title?.setText(this.getDisplayText()); }
  private showMenu(menu: Menu, anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect(); menu.showAtPosition({ x: rect.left, y: rect.bottom });
  }
  private layoutMenu(anchor: HTMLElement): void {
    const menu = new Menu();
    for (const [mode, label] of [['map', t("Map")], ['outline', t("Outline")], ['table', t("Table")]] as const) {
      menu.addItem(item => item.setTitle(label).setChecked(this.layoutMode === mode).onClick(() => {
        this.layoutMode = mode; this.surface?.setLayout(mode); this.persist();
      }));
    }
    menu.addSeparator();
    for (const [mode, label] of widthModes()) menu.addItem(item => item.setTitle(label).setChecked(this.plugin.settings.widthMode === mode).onClick(() => {
      void this.plugin.setWidthMode(mode).catch(error => new Notice(message(error)));
    }));
    this.showMenu(menu, anchor);
  }
  private levelMenu(anchor: HTMLElement): void {
    const menu = new Menu();
    const id = this.selected();
    menu.addItem(item => item.setTitle(this.commandLabel(t("Collapse all roots"), 'collapse-all')).onClick(() => this.surface?.runHotkey('collapse-all')));
    menu.addItem(item => item.setTitle(t("Expand entire map")).onClick(() => this.surface?.setDepth(Infinity)));
    menu.addSeparator();
    for (const depth of [0, 1, 2, 3, 4, 5, Infinity]) {
      const label = depth === 0 ? t("Selected node only") : depth === Infinity ? t("All child levels") : t("Child levels: {count}", { count: depth });
      const action = depth === Infinity ? 'depth-all' : 'depth-' + depth;
      menu.addItem(item => item.setTitle(this.commandLabel(label, action)).setDisabled(!id).onClick(() => { if (id) this.surface?.runHotkey(action as Parameters<MapSurface['runHotkey']>[0]); }));
    }
    this.showMenu(menu, anchor);
  }
  private commandLabel(label: string, action: string): string {
    const shortcut = displayBinding(this.plugin.settings.hotkeys[action] ?? DEFAULT_HOTKEYS[action] ?? '');
    return label + (shortcut ? ' (' + shortcut + ')' : '');
  }
  refreshBindings(): void {
    for (const element of this.contentEl.querySelectorAll<HTMLElement>('[data-tvm-action]')) {
      const id = element.dataset.tvmAction!;
      const label = HOTKEY_DEFINITIONS.find(definition => definition.id === id)?.label ?? id;
      const shortcut = displayBinding(this.plugin.settings.hotkeys[id] ?? DEFAULT_HOTKEYS[id] ?? '');
      const title = label + (shortcut ? ` (${shortcut})` : '');
      element.title = title; element.setAttribute('aria-label', title);
    }
  }
  private refreshDeleteButton(): void {
    if (this.deleteButton) this.deleteButton.disabled = !this.surface?.getSelection().length || this.surface.isEditing() || this.changing || this.cutting;
  }
  private refreshHistory(): void {
    this.refreshDeleteButton();
    if (this.undoButton) this.undoButton.disabled = !this.doc || !this.history.can('undo', this.doc.source);
    if (this.redoButton) this.redoButton.disabled = !this.doc || !this.history.can('redo', this.doc.source);
  }
  selected(): string | null { return this.surface?.getState().selected ?? null; }
  private stateKey(): string { return `traceview-mindmap:v1:${this.path}`; }
  private readState(): string | undefined {
    try {
      const current = this.app.loadLocalStorage(this.stateKey());
      if (typeof current === 'string') return current;
      const previous = this.plugin.settings.previousPluginId;
      const imported = previous ? this.app.loadLocalStorage(previous + ':v1:' + this.path) : undefined;
      return typeof imported === 'string' ? imported : undefined;
    } catch { return undefined; }
  }
  persist(): void {
    if (!this.path || !this.surface || !this.doc) return;
    try { this.app.saveLocalStorage(this.stateKey(), JSON.stringify({ ...JSON.parse(serializeViewState(this.doc, this.surface.getState())), layout: this.layoutMode })); } catch { /* Storage may be full; editing remains available. */ }
  }
  scheduleReload(): void { window.clearTimeout(this.refreshTimer); this.refreshTimer = window.setTimeout(() => { void this.reload(); }, 120); }
  async reload(): Promise<void> {
    const revision = ++this.revision;
    if (this.closed || !this.path || !this.surface) return;
    if (this.restoredRender === 'paused') return;
    this.refreshTitle();
    const workspace = this.app.workspace;
    if (!this.doc && workspace.layoutReady === false) {
      this.status?.setText(t("The map will open after the workspace loads…"));
      if (!this.waitingForLayout) {
        this.waitingForLayout = true;
        workspace.onLayoutReady(() => {
          this.waitingForLayout = false;
          void this.reload();
        });
      }
      return;
    }
    const file = this.app.vault.getAbstractFileByPath(this.path);
    if (!(file instanceof TFile)) { this.status?.setText(t("File missing or deleted. Open another map.")); this.doc = undefined; this.surface.update(parseMap('')); return; }
    try {
      const source = await this.app.vault.read(file);
      if (revision !== this.revision || this.closed) return;
      if (/^---\r?\n[\s\S]*?^mindmap-plugin:\s*['"]?rich['"]?\s*$/m.test(source.split(/^---\s*$/m).slice(0, 2).join('---'))) {
        this.doc = undefined; this.surface.update(parseMap('')); this.status?.setText(t("This JSON map format is not supported.")); return;
      }
      if (this.doc?.source === source) return;
      const first = !this.doc;
      const before = this.doc;
      const next = parseMap(source, this.doc);
      const saved = this.pendingState ?? (first ? this.readState() : before && onlyAddedBlockIds(before, next) ? serializeViewState(before, this.surface.getState()) : undefined);
      const state = saved ? restoreViewState(next, saved) : undefined;
      if (this.restoredRender === 'inspect' && hasLargeVisibleTree(next, state)) {
        this.restoredRender = 'paused';
        if (this.startupGate) this.startupGate.hidden = false;
        this.refreshRestoreWait();
        return;
      }
      this.restoredRender = 'allowed';
      this.doc = next;
      if (saved) {
        try { const mode = JSON.parse(saved).layout; if (['map', 'outline', 'table'].includes(mode)) this.layoutMode = mode; } catch { /* Ignore malformed view preference. */ }
      }
      this.surface.setLayout(this.layoutMode);
      this.surface.update(next, state);
      this.pendingState = undefined;
      if (this.pendingSubpath) this.revealSubpath(this.pendingSubpath);
      this.persist();
      this.refreshTitle();
      const steps = getSteps(next);
      this.status?.setText(t("Nodes: {nodes} · Open steps: {steps}", { nodes: next.nodes.length, steps: steps.filter(step => !step.completed).length }));
      this.refreshHistory();
    } catch (error) { this.status?.setText(message(error)); }
  }
  private async apply(expected: MapDocument, next: string, history: 'undo' | 'redo' | 'record' = 'record'): Promise<void> {
    if (this.doc !== expected || this.closed || this.changing) throw new Error(t("The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map."));
    const path = this.path;
    const file = this.app.vault.getAbstractFileByPath(this.path);
    if (!(file instanceof TFile)) throw new Error(t("The file no longer exists."));
    this.changing = true; this.refreshDeleteButton();
    try {
      await this.plugin.write(file, expected.source, next);
      if (this.closed || this.path !== path) return;
      if (history === 'record') this.history.push(expected.source, next); else this.history.commit(history);
      await this.reload();
      this.refreshHistory();
    } catch (error) { await this.reload(); throw error; }
    finally { this.changing = false; this.refreshDeleteButton(); }
  }
  private async reparent(ids: string[], target: string, position: DropPosition): Promise<void> {
    const doc = this.doc;
    if (!doc || this.changing || this.cutting || this.surface?.isEditing()) return;
    try { await this.apply(doc, moveBranches(doc, ids, target, position)); this.surface?.revealSelection(ids); }
    catch (error) { new Notice(message(error), 8000); }
  }
  async action(action: NodeAction, id: string | null): Promise<void> {
    const doc = this.doc;
    const path = this.path;
    if (!doc) return;
    if (this.changing || this.cutting) return;
    if (this.surface?.isEditing()) { this.surface.focusEditor(); return; }
    try {
      if (action === 'undo' || action === 'redo') {
        const next = this.history.peek(action, doc.source);
        if (next !== null) await this.apply(doc, next, action);
        return;
      }
      if (!id) { new Notice(t("Select a map node first")); return; }
      const node = doc.byId.get(id);
      if (!node) return;
      const selection = this.surface?.getSelection() ?? [];
      const ids = selection.includes(id) ? selection : [id];
      if (ids.length > 1) {
        if (action === 'copy') { await this.plugin.copy(copyBranches(doc, ids)); return; }
        if (action === 'delete' || action === 'cut') {
          const next = deleteNodes(doc, ids);
          if (action === 'cut') {
            this.cutting = true;
            try {
              await this.plugin.copyForCut(copyBranches(doc, ids));
              if (this.path !== path) throw new Error(t("Another map is open. The selection was copied, but not cut."));
              await this.apply(doc, next);
            } finally { this.cutting = false; }
          } else await this.apply(doc, next);
          return;
        }
        if (action === 'make-dated') {
          new DateDialog(this.app, '?', async value => this.apply(doc, changeNodes(doc, ids, (current, target) => setDated(current, target, value)))).open(); return;
        }
        const change = action === 'toggle-task' ? toggleTask : action === 'make-step' ? setStep : action === 'make-question' ? setQuestion : null;
        if (change) { await this.apply(doc, changeNodes(doc, ids, change)); return; }
        if (action !== 'source') { new Notice(t("This command requires one selected node.")); return; }
      }
      if (action === 'copy-node-link') {
        const random = globalThis.crypto?.randomUUID?.().replace(/-/g, '') ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
        const address = addressNode(doc, id, 'tvm-' + random.slice(0, 16));
        if (address.source !== doc.source) await this.apply(doc, address.source);
        const file = this.file;
        if (!file || this.path !== path) throw new Error(t("The map was closed or renamed. Copy the address again."));
        await this.plugin.copy('[[' + this.app.metadataCache.fileToLinktext(file, '', true) + '#^' + address.blockId + ']]');
        new Notice(t("Node link copied.")); return;
      }
      if (action === 'source') { const file = this.app.vault.getAbstractFileByPath(this.path); if (file instanceof TFile) await this.plugin.source(file, node.line, this.leaf); return; }
      if (action === 'copy') { await this.plugin.copy(copyBranch(doc, id)); return; }
      if (action === 'cut') {
        const next = deleteNode(doc, id);
        this.cutting = true;
        try {
          await this.plugin.copyForCut(copyBranch(doc, id));
          if (this.path !== path) throw new Error(t("Another map is open. The branch was copied, but not cut."));
          await this.apply(doc, next);
          new Notice(t("Branch cut. Ctrl+V to paste, Undo to restore."));
        } finally { this.cutting = false; }
        return;
      }
      if (action === 'paste' || action === 'paste-after') {
        await this.apply(doc, pasteBranch(doc, id, await this.plugin.paste(), action === 'paste' ? 'child' : 'after'));
        if (this.path === path) {
          const created = this.doc?.nodes.find(candidate => !doc.byId.has(candidate.id));
          if (created) this.surface?.reveal(created.id);
        }
        return;
      }
      if (action === 'edit' || action === 'add-child' || action === 'add-sibling' || action === 'add-sibling-before' || action === 'add-parent') {
        if (this.plugin.settings.nodeEditor === 'native') {
          try { this.nativeConstructor = await prepareNativeEditor(this.app); }
          catch (error) { this.nativeConstructor = undefined; console.warn('TraceView Mindmap: preparing native editor failed', error); }
          if (this.path !== path || this.doc !== doc || this.surface?.isEditing()) return;
        }
        const transformOn = (base: MapDocument, selected: string, text: string) => action === 'edit' ? editNode(base, selected, text) : action === 'add-parent' ? addParent(base, selected, text) : addNode(base, selected, action === 'add-child' ? 'child' : action === 'add-sibling-before' ? 'before' : 'sibling', text);
        const transform = (text: string) => transformOn(doc, id, text);
        const placeholder = `tvm-draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const draft = action === 'edit' ? doc : parseMap(transform(placeholder), doc);
        const draftId = action === 'edit' ? id : draft.nodes.find(candidate => candidate.text === placeholder)!.id;
        this.surface?.beginEdit(draftId, action === 'edit' ? node.text : '', async text => {
          if (this.path !== path) throw new Error(t("The note was renamed. Copy the draft and reopen the editor."));
          await this.reload();
          const base = this.doc;
          if (!base || (base !== doc && !onlyAddedBlockIds(doc, base))) throw new Error(t("The map changed externally. Your draft is preserved. Copy it before editing again."));
          const selected = base.nodes.find(candidate => candidate.line === node.line)?.id;
          if (!selected) throw new Error(t("The node no longer exists. Your draft is preserved."));
          await this.apply(base, transformOn(base, selected, text));
          return action === 'edit' ? selected : action === 'add-parent' ? this.doc?.nodes.find(candidate => candidate.line === node.line)?.id
            : this.doc?.nodes.find(candidate => !base.byId.has(candidate.id))?.id;
        }, (input, tools, inline) => this.mountEditor(input, tools, path, inline), draft);
        return;
      }
      if (action === 'delete') {
        await this.apply(doc, deleteNode(doc, id));
        return;
      }
      if (action === 'make-dated') {
        new DateDialog(this.app, getSteps(doc).find(step => step.nodeId === id)?.date ?? '?', async value => this.apply(doc, setDated(doc, id, value))).open();
        return;
      }
      const next = action === 'toggle-task' ? toggleTask(doc, id)
        : action === 'make-step' ? setStep(doc, id)
        : action === 'make-question' ? setQuestion(doc, id)
        : moveNode(doc, id, action === 'move-up' ? 'up' : action === 'move-down' ? 'down' : action === 'indent' ? 'indent' : 'outdent');
      await this.apply(doc, next);
    } catch (error) { new Notice(message(error), 8000); }
  }
  private menu(anchor: HTMLElement): void {
    const menu = new Menu();
    menu.addItem(item => item.setTitle(t("Find a map…")).setIcon('git-fork').onClick(() => this.plugin.pickMap()));
    menu.addItem(item => item.setTitle(t("Steps · Deadlines · QA")).setIcon('list-checks').onClick(() => { void this.plugin.openQueue(); }));
    menu.addSeparator();
    const actions: [string, NodeAction][] = [ [t("Mark as atomic step"), 'make-step'], [t("Step deadline…"), 'make-dated'], [t("Mark as QA"), 'make-question'], [t("Completed / incomplete"), 'toggle-task'], [t("Copy link to node"), 'copy-node-link'], [t("Copy branch"), 'copy'], [t("Cut branch"), 'cut'], [t("Paste as child branch"), 'paste'], [t("Paste as sibling branch"), 'paste-after'], [t("Add parent node"), 'add-parent'], [t("Move up"), 'move-up'], [t("Move down"), 'move-down'], [t("Nest in previous branch"), 'indent'], [t("Move up one level"), 'outdent'], [t("Open text in editor"), 'source'], [t("Delete branch…"), 'delete'] ];
    for (const [label, action] of actions) menu.addItem(item => item.setTitle(this.commandLabel(label, action)).onClick(() => { void this.action(action, this.selected()); }));
    menu.addSeparator();
    menu.addItem(item => item.setTitle(t("Export HTML…")).onClick(() => this.export('html')));
    menu.addItem(item => item.setTitle(t("Export SVG…")).onClick(() => this.export('svg')));
    menu.addItem(item => item.setTitle(t("Paste branch text…")).onClick(() => {
      const doc = this.doc, id = this.selected();
      if (doc && id) new TextDialog(this.app, t("Paste child Markdown branch"), '', async text => this.apply(doc, pasteBranch(doc, id, text, 'child')), this.path, false).open();
    }));
    menu.addItem(item => item.setTitle(t("Renumber steps")).onClick(() => {
      if (this.doc) void this.apply(this.doc, renumberSteps(this.doc)).catch(error => new Notice(message(error)));
    }));
    const rect = anchor.getBoundingClientRect(); menu.showAtPosition({ x: rect.left, y: rect.bottom });
  }
  private async nativeAddress(file: TFile, line: number, expected: string): Promise<string | undefined> {
    if (!this.plugin.isMap(file)) return undefined;
    const target = this.app.workspace.getLeavesOfType(VIEW).map(leaf => leaf.view as MapView).find(view => view.path === file.path);
    if (target) await target.reload();
    const source = await this.app.vault.read(file);
    if (source !== expected) throw new Error(t("The target map changed. Reopen link suggestions. Your draft is preserved."));
    const doc = target?.doc?.source === source ? target.doc : parseMap(source);
    const node = doc.nodes.find(node => node.line === line);
    if (!node || node.kind === 'root') throw new Error(t("This block is not a separate map node. Use “Copy link to node”."));
    const random = globalThis.crypto?.randomUUID?.().replace(/-/g, '') ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
    const address = addressNode(doc, node.id, 'tvm-' + random.slice(0, 16));
    if (address.source !== source) {
      if (target) await target.apply(doc, address.source); else await this.plugin.write(file, source, address.source);
    }
    return address.blockId;
  }
  private mountEditor(input: HTMLTextAreaElement, tools: HTMLElement, path: string, inline: InlineEditor): (() => void) | InlineDriver {
    if (this.plugin.settings.nodeEditor === 'native') {
      try { return mountNativeEditor(this, input, tools, inline, this.nativeConstructor, (file, line, expected) => this.nativeAddress(file, line, expected)); }
      catch (error) {
        if (!this.nativeWarning) { console.warn('TraceView Mindmap: native editor unavailable', error); new Notice(t("Native editor unavailable. Using text input. ") + message(error), 8000); this.nativeWarning = true; }
      }
    }
    const detachTools = attachNodeTools(this.app, path, input, tools);
    const upload = tools.ownerDocument.createElement('div'); upload.className = 'tvm-inline-upload'; upload.setAttribute('role','status'); tools.after(upload);
    const detachPaste = attachImagePaste(input, {
      save: image => saveClipboardImage(this.app, path, image),
      status: text => { upload.textContent = text; this.surface?.refreshLayout(); },
      report: text => { new Notice(text, 8000); },
    });
    const editor = new InputEditor(input); this.editor = editor;
    const updateToolbar = () => {
      // Optional host integration; mobileToolbar is not part of the public API.
      (this.app as App & { mobileToolbar?: { update?: () => void } }).mobileToolbar?.update?.();
    };
    let scoped = false;
    const scope = new Scope(this.app.scope);
    for (const key of ['Enter', 'Escape']) scope.register([], key, event => { if (inline.handleKeydown(event)) return false; });
    const activate = () => { this.app.workspace.activeEditor = this; if (!scoped) { this.app.keymap?.pushScope(scope); scoped = true; } updateToolbar(); };
    const deactivate = () => { if (scoped) { this.app.keymap?.popScope(scope); scoped = false; } updateToolbar(); };
    input.addEventListener('focus', activate); activate();
    input.addEventListener('blur', deactivate);
    const keys = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !(event.ctrlKey || event.metaKey)) return;
      if (event.code === 'KeyZ' || event.code === 'KeyY') {
        event.preventDefault(); event.stopPropagation();
        if(event.shiftKey || event.code === 'KeyY') editor.redo(); else editor.undo();
      }
    };
    input.addEventListener('keydown', keys);
    return () => {
      detachPaste(); detachTools(); editor.dispose(); deactivate();
      input.removeEventListener('focus', activate); input.removeEventListener('keydown', keys);
      input.removeEventListener('blur', deactivate);
      if (this.editor === editor) this.editor = undefined;
      if (this.app.workspace.activeEditor === this) this.app.workspace.activeEditor = null;
      updateToolbar();
    };
  }
  private export(format: 'html' | 'svg'): void {
    const doc = this.doc;
    if (!doc) return;
    const suggested = this.getDisplayText().replace(/[\\/:*?"<>|]/g, '-');
    new TextDialog(this.app, t("Export {format} — file name", { format: format.toUpperCase() }), suggested, async name => {
      const clean = name.trim().replace(new RegExp(`\\.${format}$`, 'i'), '');
      if (!clean || /[\\/:*?"<>|\r\n]/.test(clean) || clean === '.' || clean === '..') throw new Error(t("Use a name without path characters."));
      const source = this.app.vault.getAbstractFileByPath(this.path);
      if (!(source instanceof TFile)) throw new Error(t("The note does not exist."));
      const target = normalizePath(`${source.parent?.path ?? ''}/${clean}.${format}`);
      if (this.app.vault.getAbstractFileByPath(target)) throw new Error(t("File already exists. Choose another name."));
      await this.app.vault.create(target, format === 'html' ? exportHtml(doc, clean) : exportSvg(doc, clean));
      new Notice(t("Saved {path}", { path: target }));
    }, this.path, 'single-line').open();
  }
  async onClose(): Promise<void> {
    this.cancelRestoreWait?.();
    this.persist(); this.closed = true; this.revision++;
    window.clearTimeout(this.refreshTimer); window.clearTimeout(this.stateTimer);
    this.surface?.destroy(); this.renderer.unload(); this.contentEl.empty();
  }
}

interface IndexedMap { file: TFile; doc: MapDocument; mtime: number; }
class QueueView extends ItemView {
  private cache = new Map<string, IndexedMap>();
  private host?: HTMLElement;
  private mode = 'steps';
  private collapsed = new Set<string>();
  private foldControls?: HTMLElement;
  private filter = '';
  private query = '';
  private timer = 0;
  private generation = 0;
  private closed = false;
  private dragged?: { path: string; id: string };
  constructor(leaf: WorkspaceLeaf, private plugin: TraceViewMindmap) { super(leaf); }
  getViewType(): string { return QUEUE; }
  getDisplayText(): string { return t("Steps · Deadlines · QA"); }
  getIcon(): string { return 'list-checks'; }
  async onOpen(): Promise<void> {
    this.closed = false; this.contentEl.empty(); this.contentEl.addClass('tvm-view', 'tvm-queue-view');
    const toolbar = this.contentEl.createDiv('tvm-toolbar');
    for (const [value, label] of [['steps', t("Steps")], ['dates', t("Deadlines")], ['qa', t("Open QA")]]) button(toolbar, label, () => { this.mode = value; this.draw(); });
    button(toolbar, t("Refresh"), () => { this.cache.clear(); void this.reload(); });
    attachMapFilter(toolbar, () => this.app.vault.getMarkdownFiles().filter(file => this.plugin.isMap(file)), path => { this.filter = path; this.draw(); });
    this.foldControls = toolbar.createDiv('tvm-queue-fold-controls');
    button(this.foldControls, t("Collapse all"), () => {
      for (const path of this.cache.keys()) if (!this.filter || path === this.filter) this.collapsed.add(path);
      this.draw();
    });
    button(this.foldControls, t("Expand all"), () => {
      for (const path of this.cache.keys()) if (!this.filter || path === this.filter) this.collapsed.delete(path);
      this.draw();
    });
    const search = toolbar.createEl('input', { type: 'search', attr: { 'aria-label': t("Search steps"), placeholder: t("Find…") } });
    search.oninput = () => { this.query = search.value.toLocaleLowerCase(); this.draw(); };
    this.contentEl.createEl('p', { cls: 'tvm-status', text: t("Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.") });
    this.host = this.contentEl.createDiv('tvm-panel');
    await this.reload();
  }
  scheduleReload(): void { window.clearTimeout(this.timer); this.timer = window.setTimeout(() => { void this.reload(); }, 250); }
  private async reload(): Promise<void> {
    const generation = ++this.generation;
    const files = this.app.vault.getMarkdownFiles().filter(file => this.plugin.isMap(file));
    const paths = new Set(files.map(file => file.path));
    for (const path of this.cache.keys()) if (!paths.has(path)) this.cache.delete(path);
    for (let offset = 0; offset < files.length; offset += 8) {
      if (this.closed || generation !== this.generation) return;
      await Promise.all(files.slice(offset, offset + 8).map(async file => {
        const cached = this.cache.get(file.path);
        if (cached && cached.mtime === file.stat.mtime) return;
        try {
          const mtime = file.stat.mtime;
          const source = await this.app.vault.read(file);
          if (!this.closed && generation === this.generation) {
            this.cache.set(file.path, { file, doc: parseMap(source, cached?.doc), mtime });
            if (mtime !== file.stat.mtime) this.scheduleReload();
          }
        } catch { this.cache.delete(file.path); }
      }));
      await new Promise<void>(resolve => window.setTimeout(resolve, 0));
    }
    if (!this.closed && generation === this.generation) this.draw();
  }
  private draw(): void {
    if (!this.host) return;
    this.host.empty();
    if (this.foldControls) this.foldControls.hidden = this.mode === 'dates';
    let count = 0;
    const maps = [...this.cache.values()].filter(map => !this.filter || map.file.path === this.filter).sort((a, b) => a.file.path.localeCompare(b.file.path));
    if (this.mode === 'dates') {
      const rows = maps.flatMap(map => getSteps(map.doc).filter(step => !step.completed && (step.date || step.unknownDate) && (!this.plugin.settings.hideFrozen || !step.frozen)).map(step => ({ map, step })));
      rows.sort((a, b) => (a.step.unknownDate ? '' : a.step.date!).localeCompare(b.step.unknownDate ? '' : b.step.date!));
      for (const { map, step } of rows) if (!this.query || step.text.toLocaleLowerCase().includes(this.query)) { this.stepRow(this.host, map, step, false); count++; }
    } else for (const map of maps) {
      const steps = getSteps(map.doc).filter(step => !step.completed && (!this.plugin.settings.hideFrozen || !step.frozen) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const questions = map.doc.nodes.filter(node => /\[\[QA ❓(?:\||\]\])|\/\/todo\s+Q\s*:/i.test(node.text) && !node.text.includes('✅') && (!this.query || node.text.toLocaleLowerCase().includes(this.query)));
      if (!(this.mode === 'qa' ? questions.length : steps.length)) continue;
      const section = this.host.createDiv('tvm-queue-group');
      const header = section.createDiv('tvm-queue-heading');
      const collapsed = this.collapsed.has(map.file.path);
      const toggle = button(header, collapsed ? '▸' : '▾', () => {
        if (this.collapsed.has(map.file.path)) this.collapsed.delete(map.file.path); else this.collapsed.add(map.file.path);
        this.draw();
        Array.from(this.host!.querySelectorAll<HTMLButtonElement>('[data-fold-path]')).find(element => element.dataset.foldPath === map.file.path)?.focus();
      }, t(collapsed ? "Expand map: {name}" : "Collapse map: {name}", { name: map.file.basename }));
      toggle.classList.add('tvm-queue-fold');
      toggle.dataset.foldPath = map.file.path;
      toggle.setAttribute('aria-expanded', String(!collapsed));
      button(header, map.file.basename, () => { void this.plugin.openMap(map.file); }).addClass('tvm-queue-title');
      header.createSpan({ cls: 'tvm-badge', text: String(this.mode === 'qa' ? questions.length : steps.length) });
      if (collapsed) { count += this.mode === 'qa' ? questions.length : steps.length; continue; }
      if (this.mode === 'qa') for (const node of questions) {
        const row = section.createDiv('tvm-step-row');
        button(row, this.label(node.text), () => { void this.plugin.openMap(map.file, undefined, node.id); }).addClass('tvm-step-text');
        count++;
      } else {
        steps.sort(compareSteps);
        for (const step of steps) { this.stepRow(section, map, step, step.number !== null && !step.date && !step.unknownDate); count++; }
      }
    }
    if (!count) this.host.createDiv({ cls: 'tvm-empty', text: t("No open items match this filter.") });
  }
  private label(text: string): string {
    return queueLabel(text, this.plugin.settings.queueTaskMarker, this.plugin.settings.queueStepTag);
  }
  private stepRow(parent: HTMLElement, map: IndexedMap, step: Step, reorder: boolean): void {
    const row = parent.createDiv('tvm-step-row');
    const checkbox = row.createEl('input', { type: 'checkbox', attr: { 'aria-label': t("Mark completed") } });
    checkbox.onchange = () => { void this.change(map, toggleTask(map.doc, step.nodeId)); };
    if (reorder) {
      const controls = row.createDiv('tvm-step-controls');
      button(controls, '↑', () => { void this.reorder(map, step.nodeId, -1); }, t("Move earlier in execution order"));
      button(controls, '↓', () => { void this.reorder(map, step.nodeId, 1); }, t("Move later in execution order"));
      row.draggable = true;
      row.ondragstart = event => { this.dragged = { path: map.file.path, id: step.nodeId }; event.dataTransfer?.setData('text/plain', step.nodeId); };
      row.ondragend = () => { this.dragged = undefined; };
      row.ondragover = event => { if (this.dragged?.path === map.file.path) event.preventDefault(); };
      row.ondrop = event => {
        event.preventDefault();
        if (this.dragged?.path === map.file.path) void this.reorder(map, this.dragged.id, step.nodeId);
        this.dragged = undefined;
      };
    }
    const content = row.createDiv('tvm-step-content');
    if (this.mode === 'dates') {
      const metadata = content.createDiv('tvm-step-meta');
      metadata.createSpan({ cls: 'tvm-badge', text: step.unknownDate ? t("Deadline ?") : step.date! });
      metadata.createSpan({ cls: 'tvm-badge tvm-step-map', text: map.file.basename });
    }
    button(content, this.label(step.text), () => { void this.plugin.openMap(map.file, undefined, step.nodeId); }).addClass('tvm-step-text');
  }
  private async reorder(map: IndexedMap, id: string, target: number | string): Promise<void> {
    const numbered = getSteps(map.doc).filter(step => step.number !== null && !step.date && !step.unknownDate).sort(compareSteps);
    const ids = numbered.map(step => step.nodeId), from = ids.indexOf(id);
    if (from < 0) return;
    let to: number;
    if (typeof target === 'string') to = ids.indexOf(target);
    else {
      const visible = numbered.filter(step => !step.completed && (!this.plugin.settings.hideFrozen || !step.frozen) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const position = visible.findIndex(step => step.nodeId === id);
      to = ids.indexOf(visible[position + target]?.nodeId ?? '');
    }
    if (to < 0 || to === from) return;
    ids.splice(from, 1); ids.splice(to, 0, id);
    await this.change(map, renumberSteps(map.doc, ids));
  }
  private async change(map: IndexedMap, next: string): Promise<void> {
    try { await this.plugin.write(map.file, map.doc.source, next); }
    catch (error) { new Notice(message(error), 8000); }
    this.cache.delete(map.file.path); await this.reload();
  }
  async onClose(): Promise<void> { this.closed = true; this.generation++; window.clearTimeout(this.timer); this.cache.clear(); this.contentEl.empty(); }
}

class SettingsTab extends PluginSettingTab {
  private stopRecording: () => void = () => {};
  constructor(private plugin: TraceViewMindmap) {
    super(plugin.app, plugin);
    plugin.register(() => this.stopRecording());
  }
  hide(): void { this.stopRecording(); }
  display(): void {
    this.stopRecording();
    this.containerEl.empty();
    this.containerEl.createEl('h2', { text: 'TraceView Mindmap' });
    new Setting(this.containerEl).setName(t("Language")).setDesc(t("Automatic follows Obsidian. Restart Obsidian to apply a language change.")).addDropdown(dropdown => {
      dropdown.addOption('auto', t("Automatic (Obsidian)"));
      for (const [code, name] of Object.entries(LANGUAGES)) dropdown.addOption(code, name);
      dropdown.setValue(this.plugin.settings.language).onChange(async value => {
        if (!isLanguageSetting(value)) return;
        this.plugin.settings.language = value;
        await this.plugin.saveData(this.plugin.settings);
        new Notice(t("Language saved. Restart Obsidian to apply it."));
      });
    });
    new Setting(this.containerEl).setName(t("Node editor")).setDesc(t("Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.")).addDropdown(dropdown => {
      dropdown.addOption('native', t("Native Obsidian")).addOption('text', t("Text input"));
      dropdown.setValue(this.plugin.settings.nodeEditor).onChange(async value => { this.plugin.settings.nodeEditor = value === 'text' ? 'text' : 'native'; await this.plugin.saveData(this.plugin.settings); });
    });
    new Setting(this.containerEl).setName(t("Automatically open matching notes as maps")).setDesc(t("Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.")).addToggle(toggle => toggle.setValue(this.plugin.settings.autoOpen).onChange(async value => { this.plugin.settings.autoOpen = value; await this.plugin.saveData(this.plugin.settings); }));
    let patternMode = this.plugin.settings.patternMode, mapPatterns = this.plugin.settings.mapPatterns;
    const patternStatus = this.containerEl.createEl('p', { cls: 'setting-item-description', attr: { role: 'status', 'aria-live': 'polite' } });
    let saveRevision = 0;
    let savingPatterns = Promise.resolve();
    const savePatterns = () => {
      const revision = ++saveRevision;
      const rules = { patternMode, mapPatterns };
      try { compileMapPatterns(rules); }
      catch (error) {
        patternStatus.setText(error instanceof PatternError ? t("Invalid pattern on line {line}: {error}", { line: error.line, error: error.message }) : message(error));
        return;
      }
      savingPatterns = savingPatterns.then(async () => {
        if (revision !== saveRevision) return;
        try {
          await this.plugin.setMapRules(rules);
          if (revision === saveRevision) patternStatus.setText(t("Patterns saved."));
        } catch (error) { if (revision === saveRevision) patternStatus.setText(message(error)); }
      });
    };
    new Setting(this.containerEl).setName(t("Pattern syntax")).addDropdown(dropdown => {
      dropdown.addOption('glob', t("Glob (wildcards)")).addOption('regex', t("Regular expressions"));
      dropdown.setValue(patternMode).onChange(value => { patternMode = value as PatternMode; savePatterns(); });
    });
    new Setting(this.containerEl).setName(t("Map file patterns")).setDesc(t("One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.")).addTextArea(text => {
      text.setValue(mapPatterns).setPlaceholder('*.mindmap.md\n🎯*.md').onChange(value => { mapPatterns = value; savePatterns(); });
      text.inputEl.rows = 5; text.inputEl.style.width = '100%'; text.inputEl.setAttribute('aria-label', t("Map file patterns"));
    });
    this.containerEl.createEl('p', { cls: 'setting-item-description', text: t("The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.") });
    if (Platform?.isWin) new Setting(this.containerEl).setName(t("Automatically restore large maps")).setDesc(t("At startup the active map waits for Obsidian to respond steadily. “Open now” skips the wait.")).addToggle(toggle => toggle.setValue(this.plugin.settings.autoRestoreLargeMaps).onChange(async value => {
      this.plugin.settings.autoRestoreLargeMaps = value;
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) (leaf.view as MapView).refreshRestoreWait();
      await this.plugin.saveData(this.plugin.settings);
    }));
    new Setting(this.containerEl).setName(t("Hide frozen steps")).setDesc(t("Skip 🧊 branches in step and deadline lists. Maps display all text.")).addToggle(toggle => toggle.setValue(this.plugin.settings.hideFrozen).onChange(async value => { this.plugin.settings.hideFrozen = value; await this.plugin.saveData(this.plugin.settings); this.plugin.refreshQueues(); }));
    new Setting(this.containerEl).setName(t("Left arrow collapses the branch first")).setDesc(t("Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.")).addToggle(toggle => toggle.setValue(this.plugin.settings.collapseOnLeft).onChange(async value => { this.plugin.settings.collapseOnLeft = value; await this.plugin.saveData(this.plugin.settings); }));
    for (const [key, label] of [['queueTaskMarker', t("Show [ ] in list text")], ['queueStepTag', t("Show #step in list text")]] as const) {
      new Setting(this.containerEl).setName(label).setDesc(t("Affects only Steps · Deadlines · QA display. Note text and completion controls are preserved.")).addToggle(toggle => toggle.setValue(this.plugin.settings[key]).onChange(async value => {
        this.plugin.settings[key] = value; await this.plugin.saveData(this.plugin.settings); this.plugin.refreshQueues();
      }));
    }
    new Setting(this.containerEl).setName(t("Map node width")).setDesc(t("Applies immediately to all open maps. Outline and Table keep their own widths.")).addDropdown(dropdown => {
      for (const [mode, label] of widthModes()) dropdown.addOption(mode, label);
      dropdown.setValue(this.plugin.settings.widthMode).onChange(value => { void this.plugin.setWidthMode(value as WidthMode).catch(error => new Notice(message(error))); });
    });
    this.containerEl.createEl('p', { text: t("Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.") });
    this.containerEl.createEl('p', { text: t("Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use ⋯ → Open text in editor.") });
    this.containerEl.createEl('h3', { text: t("Map hotkeys") });
    this.containerEl.createEl('p', { cls: 'setting-item-description', text: t("Changes apply immediately to all open maps. Press ⌨ then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. × disables a command, ↺ restores defaults. While editing, normal editor shortcuts apply.") });
    const conflicts = this.containerEl.createDiv('tvm-hotkey-conflicts');
    const updateConflicts = () => {
      const seen = new Map<string, string>();
      const duplicate = new Set<string>();
      for (const definition of HOTKEY_DEFINITIONS) {
        const binding = this.plugin.settings.hotkeys[definition.id] ?? DEFAULT_HOTKEYS[definition.id];
        for (const value of binding.split(',').filter(value => value.trim())) {
          const key = value.toLowerCase().replace(/\s+/g, '').replace(/key(?=[a-z](?:$|\+))/g, '').replace(/digit(?=\d)/g, '').replace(/mod|control/g, 'ctrl').replace(/cmd/g, 'meta').split('+').sort().join('+');
          const previous = seen.get(key);
          if (previous && previous !== definition.label) duplicate.add(`${previous} / ${definition.label}`);
          else seen.set(key, definition.label);
        }
      }
      conflicts.setText(duplicate.size ? t("Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.", { shortcuts: [...duplicate].join("; ") }) : '');
      conflicts.hidden = !duplicate.size;
    };
    for (const definition of HOTKEY_DEFINITIONS) {
      const row = new Setting(this.containerEl).setName(definition.label);
      let input: HTMLInputElement;
      let recording = false;
      const save = (value: string) => {
        const error = validateHotkeys(value);
        input.setAttribute('aria-invalid', error ? 'true' : 'false');
        row.setDesc(error ?? '');
        if (error) return;
        this.plugin.settings.hotkeys[definition.id] = value.trim();
        this.plugin.refreshBindings(); updateConflicts();
        void this.plugin.saveData(this.plugin.settings).catch(error => new Notice(message(error)));
      };
      row.addText(text => {
        input = text.inputEl;
        input.setAttribute('aria-label', definition.label);
        text.setPlaceholder(t("Unassigned")).setValue(displayBinding(this.plugin.settings.hotkeys[definition.id] ?? DEFAULT_HOTKEYS[definition.id])).onChange(save);
        input.addEventListener('blur', () => { if (recording) this.stopRecording(); });
      });
      row.addExtraButton(button => button.setIcon('keyboard').setTooltip(t("Record shortcut")).onClick(() => {
        this.stopRecording();
        const scope = new Scope();
        scope.register(null, null, event => {
          event.preventDefault(); event.stopPropagation();
          const binding = captureHotkey(event);
          if (binding) {
            this.stopRecording();
            input.value = displayBinding(binding); save(binding);
          }
          return false;
        });
        this.stopRecording = () => {
          this.app.keymap.popScope(scope);
          recording = false; input.classList.remove('is-recording');
          this.stopRecording = () => {};
        };
        this.app.keymap.pushScope(scope);
        recording = true; input.classList.add('is-recording'); input.focus(); input.select();
      }));
      row.addExtraButton(button => button.setIcon('x').setTooltip(t("Disable")).onClick(() => { input.value = ''; save(''); }));
      row.addExtraButton(button => button.setIcon('rotate-ccw').setTooltip(t("Default shortcuts")).onClick(() => {
        input.value = displayBinding(DEFAULT_HOTKEYS[definition.id]); save(DEFAULT_HOTKEYS[definition.id]);
      }));
    }
    updateConflicts();
  }
}

function displayBinding(value: string): string {
  return value.replace(/Key([A-Z])/g, '$1').replace(/Digit(\d)/g, '$1').replace(/Mod/g, 'Ctrl');
}
