/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t, LANGUAGES, isLanguageSetting, setLanguage, type LanguageSetting } from './i18n';
import { getLanguage, App, Component, EditableFileView, ItemView, MarkdownRenderer, MarkdownView, Menu, Notice, Platform, Plugin, PluginSettingTab, Scope, Setting, TFile, WorkspaceLeaf, normalizePath, parseLinktext, setIcon, type HoverPopover } from 'obsidian';
import { moveBranches, changeNodes, copyBranches, copyNodeLabels, deleteNodes, parseMap, restoreTemplateLineEndings, nodeNoteContent, nodeNoteLabel, editNode, addFirstNode, addNode, addParent, deleteNode, moveNode, copyBranch, pasteBranch, toggleTask, toggleStepNumber, setDated, setQuestion, getSteps, compareSteps, renumberSteps, moveCompletedChildrenToBottom, shiftSelectedBranches, unnumberStep } from './core';
import { addressNode, onlyAddedBlockIds, removeNodeAddress, nodeBacklinks } from './block-links';
import { captureHotkey, DEFAULT_HOTKEYS, HOTKEY_DEFINITIONS, resolveHotkey, validateHotkeys } from './hotkeys';
import { compileMapPatterns, PatternError, type MapRules, type PatternMode } from './map-patterns';
import { MapSearch } from './map-search';
import { MapSurface } from './surface';
import { attachMapFilter, excludedQueueNodes, queueExclusions, queueLabel, queueMapMatcher } from './queue-controls';
import { mountNativeEditor, prepareNativeEditor, type NativeConstructor } from './native-editor';
import type { InlineEditor, InlineDriver } from './inline';
import type { Editor } from 'obsidian';
import { InputEditor } from './input-editor';
import { Modal } from 'obsidian';
import { DraftRecovery, type LocalDraft } from './draft-recovery';
import { NodeTemplatePicker, type NodeTemplate } from './node-templates';
import { attachImagePaste, saveClipboardImage } from './image-paste';
import { attachNodeTools, ConfirmDialog, DateDialog, EmbeddedNotePicker, MapPicker, NotePicker, TextDialog } from './editor';
import { exportHtml, exportSvg } from './export';
import { guardedChange, History, restoreViewState, serializeViewState } from './session';
import type { MapDocument, MapLayout, MapNode, MapViewState, NodeAction, Step, WidthMode, DropPosition } from './types';

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
interface Settings extends MapRules { previousPluginId?: string; language: LanguageSetting; nodeEditor: 'native' | 'text'; autoOpen: boolean; rememberLastMode: boolean; autoRestoreLargeMaps: boolean; queueExcludedMaps: string; queueExcludedBranches: string; queueTaskMarker: boolean; queueStepTag: boolean; collapseOnLeft: boolean; arrowAcrossBranches: boolean; toolbarMode: ToolbarMode; showMapPreviews: boolean; collapsePastedBranches: boolean; hotkeys: Record<string, string>; widthMode: WidthMode; embeddedNoteFontSize: number; nodeMaxHeight: number; }
const DEFAULT_SETTINGS: Settings = { patternMode: 'glob', mapPatterns: '*.mindmap.md\n🎯*.md', language: 'auto', nodeEditor: 'native', autoOpen: false, rememberLastMode: false, autoRestoreLargeMaps: true, queueExcludedMaps: 'архів тижнів\nold', queueExcludedBranches: '🧊\n❌', queueTaskMarker: true, queueStepTag: true, collapseOnLeft: false, arrowAcrossBranches: false, toolbarMode: 'visible', showMapPreviews: true, collapsePastedBranches: true, hotkeys: {}, widthMode: 'fixed', embeddedNoteFontSize: 0, nodeMaxHeight: 0 };
const widthModes = (): [WidthMode, string][] => [['fixed', t("Fixed width")], ['content', t("Fit node content")], ['column', t("Fit visible column")]];
type ToolbarMode = 'visible' | 'hover' | 'hidden';
const toolbarModes = (): [ToolbarMode, string][] => [
  ['visible', t("Always show toolbar")], ['hover', t("Show toolbar on hover")], ['hidden', t("Hide toolbar buttons")],
];
const highlightColors: Record<string, string> = {
  '🔴': 'red', '🟠': 'orange', '🟡': 'yellow', '🟢': 'green', '🔵': 'blue', '🟣': 'purple',
};
const requireMarkdown = (file: TFile): void => {
  if (file.extension.toLowerCase() !== 'md') throw new Error(t("Only Markdown notes can be edited as maps."));
};
const message = (error: unknown) => error instanceof Error ? error.message : String(error);
const createsNode = (action: NodeAction) => action === 'add-child' || action === 'add-parent' || action === 'add-sibling' || action === 'add-sibling-before';
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
  drafts?: DraftRecovery;
  liveDrafts = new Set<string>();
  settings: Settings = { ...DEFAULT_SETTINGS };
  private clipboard = '';
  private matchesMap = compileMapPatterns(DEFAULT_SETTINGS);
  private saveQueues = new Map<string, Promise<void>>();
  private sourceLeaves = new WeakMap<WorkspaceLeaf, string>();
  private sourcePreferences = new Set<string>();
  private mapPreferences = new Set<string>();
  private autoTimers = new Map<WorkspaceLeaf, number>();
  private nativeLinkTargets = new WeakMap<MarkdownView, { path: string; subpath: string }>();
  private opening = new WeakSet<WorkspaceLeaf>();

  async onload(): Promise<void> {
    const saved = await this.loadData();
    this.register(() => { for (const timer of this.autoTimers.values()) window.clearTimeout(timer); this.autoTimers.clear(); });
    this.settings = { ...DEFAULT_SETTINGS, ...saved, hotkeys: {} };
    for (const [key, min, max] of [['embeddedNoteFontSize', 10, 48], ['nodeMaxHeight', 80, 2400]] as const) {
      const value = this.settings[key];
      if (!Number.isInteger(value) || (value !== 0 && (value < min || value > max))) this.settings[key] = 0;
    }
    if (typeof saved?.queueExcludedMaps !== 'string') this.settings.queueExcludedMaps = DEFAULT_SETTINGS.queueExcludedMaps;
    if (typeof saved?.queueExcludedBranches !== 'string') this.settings.queueExcludedBranches = saved?.hideFrozen === false ? '' : DEFAULT_SETTINGS.queueExcludedBranches;
    if (typeof this.settings.previousPluginId !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(this.settings.previousPluginId) || this.settings.previousPluginId === 'traceview-mindmap') delete this.settings.previousPluginId;
    try {
      let paths = this.app.loadLocalStorage('traceview-mindmap:source-preferences');
      if (!Array.isArray(paths) && this.settings.previousPluginId) paths = this.app.loadLocalStorage(this.settings.previousPluginId + ':source-preferences');
      if (Array.isArray(paths)) { this.sourcePreferences = new Set(paths.filter(path => typeof path === 'string')); this.rememberSource(); }
    } catch { /* Optional local preferences. */ }
    this.settings.rememberLastMode = saved?.rememberLastMode === true;
    try {
      const paths = this.app.loadLocalStorage('traceview-mindmap:map-preferences');
      if (Array.isArray(paths)) this.mapPreferences = new Set(paths.filter(path => typeof path === 'string').slice(-500));
    } catch { /* Device-local mode memory is optional. */ }
    if (this.settings.nodeEditor !== 'native' && this.settings.nodeEditor !== 'text') this.settings.nodeEditor = 'native';
    if (!isLanguageSetting(this.settings.language)) this.settings.language = 'auto';
    setLanguage(this.settings.language, typeof getLanguage === 'function' ? getLanguage() : 'en');
    if (Platform?.isAndroidApp) {
      this.drafts = new DraftRecovery(this.app);
      this.addCommand({ id: 'recover-draft', name: t("Recover local draft"), callback: () => this.showDrafts() });
    }
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
      if (observeLinks && this.app === plugin.app && this.file && plugin.opensAsMap(this.file) && typeof state?.subpath === 'string') {
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
    this.addCommand({ id: 'toggle-map-source', name: t("Switch between map and Markdown"), checkCallback: checking => {
      const view = this.app.workspace.getActiveViewOfType(MapView) ?? this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view?.file) return false;
      if (view instanceof MapView && view.surface?.isEditing()) return false;
      if (!checking) void this.toggleMapSource(view).catch(error => new Notice(message(error), 8000));
      return true;
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
      ['add-sibling-before', t("Add sibling above"), 'add-sibling-before'],
      ['add-parent', t("Add parent node"), 'add-parent'], ['insert-template', t("Insert template at selected node…"), 'insert-template'],
      ['copy-node-link', t("Copy link to node"), 'copy-node-link'], ['remove-node-address', t("Remove node address"), 'remove-node-address'], ['edit-node', t("Edit node"), 'edit'], ['node-note', t("Edit embedded node note"), 'node-note'], ['convert-node-note', t("Convert to multiline note…"), 'convert-node-note'], ['attach-node-note', t("Choose an existing note…"), 'attach-node-note'], ['make-step', t("Mark as atomic step"), 'make-step'],
      ['make-dated', t("Add step deadline"), 'make-dated'], ['make-question', t("Mark as QA"), 'make-question'],
      ['toggle-task', t("Toggle step completion"), 'toggle-task'], ['completed-bottom', t("Move completed children to bottom"), 'completed-bottom'], ['copy-node-labels', t("Copy selected nodes without children"), 'copy-node-labels'], ['copy-branch', t("Copy branch"), 'copy'], ['cut-branch', t("Cut branch"), 'cut'],
      ['paste-branch', t("Paste as child branch"), 'paste'], ['paste-after', t("Paste as sibling branch"), 'paste-after'], ['undo', t("Undo map change"), 'undo'], ['redo', t("Redo map change"), 'redo']
    ];
    for (const [id, name, action] of commands) this.addCommand({ id, name, checkCallback: checking => {
      const view = this.app.workspace.getActiveViewOfType(MapView);
      if (!view) return false;
      if (action === 'insert-template' && (view.surface?.isEditing() || view.surface?.getSelection().length !== 1)) return false;
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
        const view = leaf.view;
        if (!(view instanceof MapView)) continue;
        if (view.path === file.path) view.scheduleReload();
      }
      if (this.isMap(file)) this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on('rename', (file, oldPath) => {
      this.mapPreferences = new Set([...this.mapPreferences].map(path => path === oldPath || path.startsWith(oldPath + '/') ? file.path + path.slice(oldPath.length) : path)); this.rememberMaps();
      this.sourcePreferences = new Set([...this.sourcePreferences].map(path => path === oldPath || path.startsWith(oldPath + '/') ? file.path + path.slice(oldPath.length) : path)); this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
        const explicit = this.sourceLeaves.get(leaf);
        if (explicit === oldPath || explicit?.startsWith(`${oldPath}/`)) this.sourceLeaves.set(leaf, file.path + explicit.slice(oldPath.length));
      }
      this.app.workspace.requestSaveLayout();
      this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on('delete', file => {
      this.mapPreferences = new Set([...this.mapPreferences].filter(path => path !== file.path && !path.startsWith(file.path + '/'))); this.rememberMaps();
      this.sourcePreferences = new Set([...this.sourcePreferences].filter(path => path !== file.path && !path.startsWith(file.path + '/'))); this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
        const view = leaf.view;
        if (!(view instanceof MapView)) continue;
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
  private rememberMaps(): void {
    try { this.app.saveLocalStorage('traceview-mindmap:map-preferences', [...this.mapPreferences]); } catch { /* Storage may be full. */ }
  }
  opensAsMap(file: TFile): boolean {
    if (file.extension.toLowerCase() !== 'md') return false;
    return (this.settings.autoOpen && this.isMap(file))
      || (this.settings.rememberLastMode && this.mapPreferences.has(file.path) && !this.sourcePreferences.has(file.path));
  }
  private scheduleAutoOpen(leaf: WorkspaceLeaf, expectedPath?: string): void {
    if (this.opening.has(leaf)) return;
    const previous = this.autoTimers.get(leaf); if (previous !== undefined) window.clearTimeout(previous);
    this.autoTimers.set(leaf, window.setTimeout(() => {
      this.autoTimers.delete(leaf);
      const view = leaf.view;
      if (!(view instanceof MarkdownView) || !view.file || (expectedPath && view.file.path !== expectedPath)) return;
      if (this.sourceLeaves.get(leaf) !== view.file.path) this.sourceLeaves.delete(leaf);
      if (!this.opensAsMap(view.file) || this.sourceLeaves.get(leaf) === view.file.path) return;
      this.opening.add(leaf);
      const file = view.file;
      const linkState = this.nativeLinkTargets.get(view); this.nativeLinkTargets.delete(view);
      void (async () => {
        try {
          await view.save();
          if (leaf.view === view && view.file === file && this.opensAsMap(file) && this.sourceLeaves.get(leaf) !== file.path) {
            await this.openMap(file, leaf, undefined, true);
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

  private async toggleMapSource(view: MapView | MarkdownView): Promise<void> {
    const { file, leaf } = view;
    if (!file) return;
    if (view instanceof MapView) {
      const selected = view.selected();
      await this.source(file, selected ? view.doc?.byId.get(selected)?.line ?? 0 : 0, leaf);
      return;
    }
    const text = view.editor.getValue();
    const line = view.editor.getCursor().line;
    await view.save();
    if (leaf.view !== view || view.file !== file || view.editor.getValue() !== text) return;
    const id = parseMap(text).nodes.find(node => node.line === line)?.id;
    await this.openMap(file, leaf, id);
  }

  pickMap(): void { new MapPicker(this.app, file => this.isMap(file), file => { void this.openMap(file); }).open(); }
  showDrafts(path?: string): void {
    const modal = new Modal(this.app);
    modal.titleEl.setText(t("Recover local draft"));
    const drafts = this.drafts?.list().filter(d => !this.liveDrafts.has(d.key) && (!path || d.path === path)) ?? [];
    if (!drafts.length) modal.contentEl.createEl('p', { text: t("No saved drafts") });
    for (const draft of drafts) {
      modal.contentEl.createEl('p', { text: draft.path + ' · ' + draft.original });
      const preview = modal.contentEl.createEl('textarea');
      preview.value = draft.text; preview.readOnly = true;
      button(modal.contentEl, t("Continue editing"), () => { void (async () => {
        const file = this.app.vault.getAbstractFileByPath(draft.path);
        if (!(file instanceof TFile)) throw new Error(t("File missing or deleted. Open another map."));
        await this.openMap(file);
        const view = this.app.workspace.getActiveViewOfType(MapView);
        const node = view?.doc?.byId.get(draft.nodeId);
        const matches = draft.nodeId ? node?.text === draft.original : view?.doc?.nodes.length === 0;
        if (view?.file !== file || !matches || view.surface?.isEditing() || this.liveDrafts.has(draft.key))
          throw new Error(t("The note changed. Open it again at the current line."));
        modal.close();
        await view.action(draft.action, node?.id ?? null, draft);
      })().catch(error => new Notice(message(error))); });
      button(modal.contentEl, t("Discard changes"), () => new ConfirmDialog(this.app, t("Discard changes"), draft.text, async () => {
        if (!this.liveDrafts.has(draft.key)) this.drafts?.remove(draft.key);
        modal.close();
        for (const view of this.mapViews()) view.refreshDraftButton();
      }, {label:t("Discard changes"), focusConfirm:false}).open());
    }
    modal.open();
  }
  activeFile(): TFile | null {
    const view = this.app.workspace.getActiveViewOfType(MapView);
    if (view?.path) { const file = this.app.vault.getAbstractFileByPath(view.path); if (file instanceof TFile) return file; }
    return this.app.workspace.getActiveFile();
  }
  async openMap(file: TFile, target?: WorkspaceLeaf, nodeId?: string, replaceHistory = false): Promise<void> {
    requireMarkdown(file);
    const existing = this.app.workspace.getLeavesOfType(VIEW).find(leaf => (leaf.view as MapView).path === file.path);
    const leaf = target ?? existing ?? this.app.workspace.getLeaf('tab');
    if (leaf.view instanceof MapView && leaf.view.surface?.isEditing()) { new Notice(t("Save or cancel the node draft.")); leaf.view.surface.focusEditor(); return; }
    this.sourceLeaves.delete(leaf); this.sourcePreferences.delete(file.path); this.rememberSource();
    if (this.settings.rememberLastMode && !this.mapPreferences.has(file.path)) {
      this.mapPreferences.add(file.path);
      if (this.mapPreferences.size > 500) this.mapPreferences.delete(this.mapPreferences.values().next().value!);
      this.rememberMaps();
    }
    // Native link navigation already recorded the previous file. Converting its view is the same visit.
    const state = { type: VIEW, state: { file: file.path, openNow: true }, active: true, ...(replaceHistory ? { popstate: true } : {}) };
    await leaf.setViewState(state);
    await this.app.workspace.revealLeaf(leaf);
    if (nodeId && leaf.view instanceof MapView) { await leaf.view.reload(); leaf.view.surface?.reveal(nodeId); }
  }
  async openQueue(): Promise<void> {
    const file = this.activeFile();
    const leaf = this.app.workspace.getLeavesOfType(QUEUE)[0] ?? this.app.workspace.getLeaf('tab');
    await leaf.setViewState({ type: QUEUE, state: { filter: file?.path ?? '' }, active: true });
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
  async resetSettings(): Promise<void> {
    const defaults: Settings = { ...DEFAULT_SETTINGS, hotkeys: {} };
    if (this.settings.previousPluginId) defaults.previousPluginId = this.settings.previousPluginId;
    await this.saveData(defaults);
    this.settings = defaults;
    this.matchesMap = compileMapPatterns(defaults);
    this.refreshBindings();
    for (const view of this.mapViews()) {
      view.refreshAppearance();
      view.refreshRestoreWait();
    }
    this.refreshQueues();
  }
  mapViews(): MapView[] {
    return this.app.workspace.getLeavesOfType(VIEW).map(leaf => leaf.view).filter((view): view is MapView => view instanceof MapView);
  }
  refreshQueues(): void {
    for (const leaf of this.app.workspace.getLeavesOfType(QUEUE)) {
      if (leaf.view instanceof QueueView) leaf.view.scheduleReload();
    }
  }
  refreshBindings(): void {
    for (const view of this.mapViews()) view.refreshBindings();
  }
  async setMapAppearance(key: 'embeddedNoteFontSize' | 'nodeMaxHeight', value: number): Promise<void> {
    const [min, max] = key === 'embeddedNoteFontSize' ? [10, 48] : [80, 2400];
    if (!Number.isInteger(value) || (value !== 0 && (value < min || value > max))) return;
    this.settings[key] = value;
    for (const view of this.mapViews()) view.refreshAppearance();
    await this.saveData(this.settings);
  }
  async setWidthMode(mode: WidthMode): Promise<void> {
    this.settings.widthMode = mode;
    for (const view of this.mapViews()) view.surface?.refreshLayout();
    await this.saveData(this.settings);
  }
  async setToolbarMode(mode: ToolbarMode): Promise<void> {
    this.settings.toolbarMode = mode;
    for (const view of this.mapViews()) view.refreshToolbarMode();
    await this.saveData(this.settings);
  }
  async source(file: TFile, line = 0, target?: WorkspaceLeaf): Promise<void> {
    requireMarkdown(file);
    const leaf = target ?? this.app.workspace.getLeaf(false);
    this.sourceLeaves.set(leaf, file.path); this.sourcePreferences.add(file.path); this.rememberSource();
    if (this.mapPreferences.delete(file.path)) this.rememberMaps();
    // Explicit view state avoids another plugin choosing a map view for this .md file.
    await leaf.setViewState({ type: 'markdown', state: { file: file.path, mode: 'source' }, active: true });
    await this.app.workspace.revealLeaf(leaf);
    if (leaf.view instanceof MarkdownView) {
      leaf.view.editor.setCursor({ line, ch: 0 });
      leaf.view.editor.scrollIntoView({ from: { line, ch: 0 }, to: { line, ch: 0 } }, true);
      leaf.view.editor.focus();
    }
  }
  async insertNodeTemplate(map: MapView, file: TFile, doc: MapDocument, node: MapNode, template: NodeTemplate): Promise<string | undefined> {
    const workspace = this.app.workspace;
    const expected = doc.lines.join('\n');
    const conflict = () => new Error(t("The note changed. Open it again at the current line."));
    if (workspace.getMostRecentLeaf() !== map.leaf || map.file !== file) throw conflict();
    for (const leaf of workspace.getLeavesOfType('markdown')) {
      const view = leaf.view;
      if (view instanceof MarkdownView && view.file === file && view.getMode() === 'source' && view.editor.getValue().replace(/\r\n?/g, '\n') !== expected) throw conflict();
    }

    const tab = workspace.getLeaf('tab');
    this.sourceLeaves.set(tab, file.path);
    let editorView: MarkdownView | undefined;
    let keepOpen = false;
    try {
      await tab.setViewState({ type: 'markdown', state: { file: file.path, mode: 'source' }, active: true });
      if (!(tab.view instanceof MarkdownView) || tab.view.file !== file) throw conflict();
      editorView = tab.view;
      const editor = editorView.editor;
      if (workspace.getMostRecentLeaf() !== tab || editor.getValue().replace(/\r\n?/g, '\n') !== expected) throw conflict();
      const line = node.line, original = editor.getLine(line);
      const pos = { line, ch: original.length };
      editor.setCursor(pos);
      editor.focus();
      if (workspace.activeEditor?.editor !== editor) throw conflict();
      // A provider can prompt, navigate or change frontmatter. Keep its real editor
      // alive until it completes, and leave it open if the save fails.
      keepOpen = true;
      await template.insert();
      if (tab.view !== editorView || editorView.file !== file) return;
      // Plain templates may append text on the same line. Keep the parent's
      // existing block link at the end of its line when that happens.
      const updated = editor.getLine(line);
      if (node.blockId && updated?.startsWith(original) && updated.length > original.length) {
        const labelEnd = node.prefix.length + node.text.length;
        editor.replaceRange(updated.slice(original.length) + original.slice(labelEnd),
          { line, ch: labelEnd }, { line, ch: updated.length });
      }
      const result = editor.getValue();
      await editorView.save();
      keepOpen = false;
      const saved = await this.app.vault.read(file);
      return saved.replace(/\r\n?/g, '\n') === result.replace(/\r\n?/g, '\n') ? saved : undefined;
    } finally {
      if (!keepOpen && (tab.view === editorView && editorView?.file === file || tab.view.getViewType() === 'empty')) {
        const restore = workspace.getMostRecentLeaf() === tab && map.leaf.view === map && map.file === file;
        if (restore) workspace.setActiveLeaf(map.leaf, { focus: true });
        tab.detach();
      }
    }
  }
  async openMapLink(link: string, view: MapView, event: MouseEvent): Promise<void> {
    if (view.surface?.isEditing()) { view.surface.focusEditor(); return; }
    const parts = parseLinktext(link);
    const file = parts.path ? this.app.metadataCache.getFirstLinkpathDest(parts.path, view.path) : view.file;
    const newTab = event.ctrlKey || event.metaKey || event.button === 1;
    if (file && (file === view.file || this.opensAsMap(file))) {
      const leaf = newTab ? this.app.workspace.getLeaf('tab') : view.leaf;
      await this.openMap(file, leaf);
      if (leaf.view instanceof MapView) leaf.view.revealSubpath(parts.subpath);
    } else {
      if (file) {
        const leaf = newTab ? this.app.workspace.getLeaf('tab') : view.leaf;
        if (file.extension.toLowerCase() !== 'md') { await leaf.openFile(file, {active: true}); return; }
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
    requireMarkdown(file);
    if (expected === next) return;
    const previous = this.saveQueues.get(file.path) ?? Promise.resolve();
    const operation = previous.catch(() => undefined).then(async () => {
      requireMarkdown(file);
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
  private draftButton?: HTMLButtonElement;
  private activeDraftKey?: string;
  refreshDraftButton(): void {
    if (this.draftButton) this.draftButton.hidden = !this.plugin.drafts?.list().some(d => d.path === this.path && !this.plugin.liveDrafts.has(d.key));
  }
  path = '';
  hoverPopover: HoverPopover | null = null;
  editor?: Editor;
  editMode?: unknown;
  private nativeWarning = false;
  private nativeConstructor?: NativeConstructor;
  private pendingSubpath?: string;
  surface?: MapSurface;
  doc?: MapDocument;
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
  private layoutMode: MapLayout = 'map';
  private showSearch?: () => void;
  private undoButton?: HTMLButtonElement;
  private redoButton?: HTMLButtonElement;
  private toolbar?: HTMLDivElement;
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
    if (state.file && !/\.md$/i.test(state.file)) throw new Error(t("Only Markdown notes can be edited as maps."));
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
    requireMarkdown(file);
    this.cancelRestoreWait?.();
    this.path = file.path; this.doc = undefined; this.history = new History();
    this.refreshDraftButton();
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
    if (nodes.length === 1) this.surface.jumpTo(nodes[0].id);
    else new Notice(nodes.length ? t("This address is duplicated. Fix the block ID in Markdown.") : t("The linked node was not found."));
  }
  async onOpen(): Promise<void> {
    await super.onOpen();
    this.closed = false;
    this.contentEl.empty(); this.contentEl.addClass('tvm-view', 'tvm-map-view');
    this.addChild(this.renderer);
    const toolbar = this.contentEl.createDiv('tvm-toolbar');
    this.toolbar = toolbar;
    this.refreshToolbarMode(); this.refreshAppearance();
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
    if (Platform.isMobile) {
      iconButton(actions, 'check-square', t("Toggle step completion"), () => { void this.action('toggle-task', this.selected()); });
      iconButton(actions, 'calendar', t("Step deadline"), () => { void this.action('make-dated', this.selected()); });
    }
    const selectionButton = iconButton(actions, 'box-select', t("Multiple selection: taps or rectangle"), () => this.surface?.toggleSelectionMode());
    selectionButton.setAttribute('aria-pressed', 'false');
    iconButton(actions, 'search', t("Search"), () => this.showSearch?.()).dataset.tvmAction = 'find';
    iconButton(actions, 'maximize', t("Fit map"), () => this.surface?.fit()).dataset.tvmAction = 'fit';
    const layout = iconButton(actions, 'panels-top-left', t("Layout and node width"), () => this.layoutMenu(layout));
    const more = iconButton(toolbar, 'ellipsis', t("Map actions"), () => this.menu(more));
    this.host = this.contentEl.createDiv('tvm-map-host');
    let searchSelection: Set<string> | undefined;
    let searchDraft = false;
    const search = new MapSearch(this.host, {
      search: (text, alpha) => {
        if (!searchDraft) return this.surface?.search(text, alpha, searchSelection) ?? [];
        this.surface?.highlightDraft(text);
        const draft = this.editor?.getValue() ?? '';
        return text.trim() && draft.toLocaleLowerCase().includes(text.trim().toLocaleLowerCase()) ? [{ id: 'draft', text: draft }] : [];
      },
      reveal: id => {
        if (!searchDraft) { this.surface?.jumpTo(id); return; }
        const editor = this.editor;
        const query = search.input.value.trim();
        const offset = editor?.getValue().toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) ?? -1;
        if (editor && offset >= 0) editor.setSelection(editor.offsetToPos(offset), editor.offsetToPos(offset + query.length));
      },
      focusMap: () => {
        if (searchDraft) this.surface?.focusEditor();
        else this.host?.querySelector<HTMLElement>('.tvm-surface')?.focus({ preventScroll: true });
      },
    });
    this.showSearch = () => {
      if (search.overlay.hidden) {
        searchDraft = this.surface?.isEditing() ?? false;
        const selected = this.surface?.getSelection() ?? [];
        searchSelection = selected.length > 1 ? new Set(selected) : undefined;
      }
      search.show();
    };
    this.surface = new MapSurface(this.host, {
      getWidthMode: () => this.plugin.settings.widthMode,
      getNodeMaxHeight: () => this.plugin.settings.nodeMaxHeight,
      useTransformPan: () => Platform.isMobile,
      getHotkeys: () => this.plugin.settings.hotkeys,
      getCollapseOnLeft: () => this.plugin.settings.collapseOnLeft,
      getArrowAcrossBranches: () => this.plugin.settings.arrowAcrossBranches,
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
        const embeddedMaps = new Map<string, TFile>();
        const content = text.replace(/`+[^`]*`+|(?<!\\)!\[\[([^\]\n]+)\]\]/g, (embed, link?: string) => {
          if (!link) return embed;
          const target = link.split('|', 1)[0];
          const { path } = parseLinktext(target);
          const file = path ? this.app.metadataCache.getFirstLinkpathDest(path, this.path) : this.file;
          if (!file || !this.plugin.isMap(file)) return embed;
          if (file !== this.file) embeddedMaps.set(target, file);
          return embed.slice(1);
        });
        await MarkdownRenderer.render(this.app, content, element, this.path, component);
        if (text.includes('==')) for (const mark of element.querySelectorAll<HTMLElement>('mark')) {
          const color = mark.dataset.highlight ?? highlightColors[Array.from(mark.textContent?.trimStart() ?? '')[0]];
          if (color && Object.values(highlightColors).includes(color)) mark.dataset.tvmHighlight = color;
        }
        if (this.plugin.settings.showMapPreviews) for (const [target, file] of embeddedMaps) {
          if (element.querySelectorAll('a.internal-link').length && this.renderedNodes.get(element) === component) {
            await this.appendMapPreview(element, file, target);
          }
        }
      },
      onEditEmbed: (id, link, frame) => {
        const doc = this.doc, node = doc?.byId.get(id);
        const { path } = parseLinktext(link);
        const file = path ? this.app.metadataCache.getFirstLinkpathDest(path, this.path) : this.file;
        if (!doc || !node || !file || file === this.file || file.extension !== 'md' || this.plugin.isMap(file)) return false;
        void this.editNodeNote(doc, node, file, frame).catch(error => new Notice(message(error), 8000));
        return true;
      },
      onOpenLink: (link, event) => { void this.plugin.openMapLink(link, this, event).catch(error => new Notice(message(error))); },
      onHoverLink: (event, targetEl, linktext) => this.app.workspace.trigger('hover-link', { event, source: 'traceview-mindmap', hoverParent: this, targetEl, linktext, sourcePath: this.path }),
    });
    this.status = this.host.createDiv('tvm-status tvm-map-status');
    if (this.plugin.drafts) {
      this.draftButton = button(this.host, t("Recover local draft"), () => this.plugin.showDrafts(this.path));
      this.refreshDraftButton();
    }
    this.startupGate = this.host.createDiv('tvm-startup-gate');
    this.startupGate.hidden = true;
    this.startupMessage = this.startupGate.createDiv({ attr: { role: 'status' } });
    button(this.startupGate, t("Open now"), () => { void this.activateRestoredMap(); });
    this.refreshBindings();
    this.refreshHistory();
    await this.reload();
  }
  private refreshTitle(): void {
    if (!this.file || !this.title || this.title.ownerDocument.activeElement === this.title) return;
    this.title.setText(this.file.basename);
  }
  private showMenu(menu: Menu, anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect(); menu.showAtPosition({ x: rect.left, y: rect.bottom });
  }
  private layoutMenu(anchor: HTMLElement): void {
    const menu = new Menu();
    for (const [mode, label] of [['map', t("Map")], ['vertical', t("Tree")], ['outline', t("Outline")], ['table', t("Table")]] as const) {
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
        try { const mode = JSON.parse(saved).layout; if (['map', 'vertical', 'outline', 'table'].includes(mode)) this.layoutMode = mode; } catch { /* Ignore malformed view preference. */ }
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
    const keepFolded = position === 'child' && this.surface?.getState().collapsed.includes(target);
    try {
      await this.apply(doc, moveBranches(doc, ids, target, position));
      if (!keepFolded) this.surface?.revealSelection(ids);
    }
    catch (error) { new Notice(message(error), 8000); }
  }
  async action(action: NodeAction, id: string | null, recovered?: LocalDraft): Promise<void> {
    const doc = this.doc;
    const path = this.path;
    if (!doc) return;
    if (this.changing || this.cutting) return;
    if (this.surface?.isEditing()) {
      if (!createsNode(action)) { this.surface.focusEditor(); return; }
      if (!await this.surface.saveForCreation() || this.path !== path) return;
      return this.action(action, this.selected());
    }
    try {
      if (!id && !doc.nodes.length && action === 'add-sibling') { await this.beginNodeEdit(doc, action, undefined, recovered); return; }
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
      if (action === 'node-backlinks') {
        if (node.blockId && this.file) this.nodeAddressMenu(node);
        return;
      }
      if (action === 'remove-node-address') {
        if (!node.blockId) return;
        new ConfirmDialog(this.app, t("Remove node address"), t("Links to this node may stop working. Remove its block ID? Undo can restore the address."), async () => {
          if (this.path !== path) throw new Error(t("The note changed. Open it again at the current line."));
          await this.apply(doc, removeNodeAddress(doc, id));
        }, {label: t("Remove node address"), focusConfirm: false}).open();
        return;
      }
      if (action === 'copy-node-labels') { await this.plugin.copy(copyNodeLabels(doc, ids)); return; }
      if (ids.length > 1) {
        if (action === 'move-up' || action === 'move-down') {
          await this.apply(doc, shiftSelectedBranches(doc, ids, action === 'move-up' ? 'up' : 'down'));
          this.surface?.revealSelection(ids);
          return;
        }
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
        const change = action === 'toggle-task' ? toggleTask : action === 'make-step' ? toggleStepNumber : action === 'make-question' ? setQuestion : null;
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
      if (action === 'copy-node-text') { await this.plugin.copy(node.text); return; }
      if (action === 'completed-bottom') { await this.apply(doc, moveCompletedChildrenToBottom(doc, id)); return; }
      if (action === 'node-note-options') { this.nodeNoteOptions(doc, node); return; }
      if (action === 'attach-node-note') { this.attachNodeNote(doc, node); return; }
      if (action === 'convert-node-note') { this.convertNodeNote(doc, node); return; }
      if (action === 'node-note') { await this.editNodeNote(doc, node); return; }
      if (action === 'insert-template' && this.file) {
        const file = this.file;
        new NodeTemplatePicker(this.app, async item => {
          if (this.closed || this.changing || this.cutting || this.surface?.isEditing() || this.doc !== doc || this.file !== file) {
            throw new Error(t("The note changed. Open it again at the current line."));
          }
          this.changing = true;
          try {
            const saved = await this.plugin.insertNodeTemplate(this, file, doc, node, item);
            if (saved !== undefined) {
              const next = restoreTemplateLineEndings(doc, saved);
              if (next !== saved) await this.plugin.write(file, saved, next);
              if (!this.closed && this.file === file) this.history.push(doc.source, next);
            }
          } finally {
            this.changing = false;
            if (!this.closed && this.file === file) { await this.reload(); this.refreshHistory(); }
          }
        }).open();
        return;
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
          const roots = this.doc?.nodes.filter(candidate => !doc.byId.has(candidate.id)
            && (!candidate.parentId || doc.byId.has(candidate.parentId))) ?? [];
          if (this.plugin.settings.collapsePastedBranches) this.surface?.collapseBranches(roots.map(root => root.id));
          if (roots[0]) this.surface?.reveal(roots[0].id);
        }
        return;
      }
      if (action === 'edit' || createsNode(action)) { await this.beginNodeEdit(doc, action, node, recovered); return; }
      if (action === 'delete') {
        await this.apply(doc, deleteNode(doc, id));
        return;
      }
      if (action === 'make-dated') {
        new DateDialog(this.app, getSteps(doc).find(step => step.nodeId === id)?.date ?? '?', async value => this.apply(doc, setDated(doc, id, value))).open();
        return;
      }
      const next = action === 'toggle-task' ? toggleTask(doc, id)
        : action === 'make-step' ? toggleStepNumber(doc, id)
        : action === 'make-question' ? setQuestion(doc, id)
        : moveNode(doc, id, action === 'move-up' ? 'up' : action === 'move-down' ? 'down' : action === 'indent' ? 'indent' : 'outdent');
      await this.apply(doc, next);
    } catch (error) { new Notice(message(error), 8000); }
  }
  private async beginNodeEdit(doc: MapDocument, action: NodeAction, node?: MapNode, recovered?: LocalDraft): Promise<void> {
    const path = this.path;
    if (this.plugin.settings.nodeEditor === 'native') {
      try { this.nativeConstructor = await prepareNativeEditor(this.app); }
      catch (error) { this.nativeConstructor = undefined; console.warn('TraceView Mindmap: preparing native editor failed', error); }
      if (this.path !== path || this.doc !== doc || this.surface?.isEditing()) return;
    }
    const transformOn = (base: MapDocument, selected: string, text: string): string => {
      if (!node) return addFirstNode(base, text);
      if (action === 'edit') return text.trim() ? editNode(base, selected, text) : deleteNode(base, selected);
      if (action === 'add-parent') return addParent(base, selected, text);
      const relation = action === 'add-child' ? 'child' : action === 'add-sibling-before' ? 'before' : 'sibling';
      return addNode(base, selected, relation, text);
    };
    const id = node?.id ?? '';
    const transform = (text: string) => transformOn(doc, id, text);
    const placeholder = `tvm-draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const draft = action === 'edit' ? doc : parseMap(transform(placeholder), doc);
    const draftNode = action === 'edit' ? node : draft.nodes.find(candidate => candidate.text === placeholder);
    if (!draftNode) throw new Error(t("The note changed. Open it again at the current line."));
    const initial = action === 'edit' ? node!.text : '';
    const storage = this.plugin.drafts;
    const record = storage ? recovered ?? {key: crypto.randomUUID(), path, nodeId:id, original:node?.text ?? '', action, text:initial} : undefined;
    this.surface?.beginEdit(draftNode.id, initial, async text => {
      if (!text.trim() && action !== 'edit') return;
      if (this.path !== path) throw new Error(t("The note was renamed. Copy the draft and reopen the editor."));
      await this.reload();
      const base = this.doc;
      if (!base || (base !== doc && !onlyAddedBlockIds(doc, base))) throw new Error(t("The map changed externally. Your draft is preserved. Copy it before editing again."));
      const selected = node ? base.nodes.find(candidate => candidate.line === node.line)?.id : '';
      if (selected === undefined) throw new Error(t("The node no longer exists. Your draft is preserved."));
      await this.apply(base, transformOn(base, selected, text));
      return text.trim() ? this.doc?.nodes.find(candidate => candidate.line === draftNode.line)?.id : base.byId.get(selected)?.parentId ?? undefined;
    }, (input, tools, inline) => {
      const driver = this.mountEditor(input, tools, path, inline);
      if (storage && record) {
        this.activeDraftKey = record.key; this.plugin.liveDrafts.add(record.key);
        if (recovered) { input.value = recovered.text; input.dispatchEvent(new input.ownerDocument.defaultView!.Event('input', { bubbles:true })); }
        let warned = false;
        input.addEventListener('input', () => {
          try {
            if (input.value === initial) storage.remove(record.key);
            else storage.save({ ...record, text: input.value });
          } catch (error) { if (!warned) new Notice(message(error)); warned = true; }
        });
      }
      return driver;
    }, draft, record && (() => {
      this.plugin.liveDrafts.delete(record.key); this.activeDraftKey = undefined;
      storage!.remove(record.key); this.refreshDraftButton();
    }));
    if (recovered) this.refreshDraftButton();
  }

  private nodeAddressMenu(node: MapNode): void {
    const file = this.file;
    if (!file || !node.blockId) return;
    const menu = new Menu();
    const refs = nodeBacklinks(this.app, file, node.blockId);
    if (!refs.length) menu.addItem(item => item.setTitle(t("No cached links to this node")).setDisabled(true));
    for (const ref of refs) menu.addItem(item => item.setTitle(ref.file.basename + ' · ' + (ref.line + 1)).setIcon('link').onClick(() => {
      void (async () => {
        const doc = parseMap(await this.app.vault.read(ref.file));
        const target = doc.nodes.find(node => node.line === ref.line);
        if (target && this.plugin.opensAsMap(ref.file)) await this.plugin.openMap(ref.file, undefined, target.id);
        else await this.plugin.source(ref.file, ref.line);
      })().catch(error => new Notice(message(error)));
    }));
    menu.addSeparator();
    menu.addItem(item => item.setTitle(t("Remove node address")).setIcon('unlink').onClick(() => { void this.action('remove-node-address', node.id); }));
    const anchor = this.contentEl.querySelector<HTMLElement>('.tvm-node.is-selected .tvm-node-address');
    this.showMenu(menu, anchor ?? this.contentEl);
  }
  private nodeNoteOptions(doc: MapDocument, node: MapNode, position?: {x: number; y: number}): void {
    const menu = new Menu();
    menu.addItem(item => item.setTitle(t("Convert to multiline note…")).setIcon('file-plus').onClick(() => this.convertNodeNote(doc, node)));
    menu.addItem(item => item.setTitle(t("Choose an existing note…")).setIcon('file-input').onClick(() => this.attachNodeNote(doc, node)));
    if (position) menu.showAtPosition(position);
    else this.showMenu(menu, this.contentEl.querySelector<HTMLElement>('.tvm-node.is-selected') ?? this.contentEl);
  }
  private attachNodeNote(doc: MapDocument, node: MapNode): void {
    const map = this.file;
    if (!map) return;
    new NotePicker(this.app, file => file !== map && !this.plugin.isMap(file), file => {
      void (async () => {
        if (this.file !== map || this.doc !== doc || this.surface?.isEditing() || this.app.vault.getAbstractFileByPath(file.path) !== file) {
          throw new Error(t("The note changed. Open it again at the current line."));
        }
        const embeds = [...node.text.matchAll(/!\[\[([^\]#|]+)(?:[^\]]*)\]\]/g)];
        if (embeds.some(match => this.app.metadataCache.getFirstLinkpathDest(match[1], map.path) === file)) return;
        const link = this.app.metadataCache.fileToLinktext(file, map.path, true);
        await this.apply(doc, editNode(doc, node.id, node.text + ' ![[' + link + ']]'));
      })().catch(error => new Notice(message(error), 8000));
    }).open();
  }
  private convertNodeNote(doc: MapDocument, node: MapNode): void {
    const map = this.file;
    if (!map) return;
    const name = map.basename.replace(/\.mindmap$/, '').replace(/[\\/:*?"<>|#\[\]^]/g, ' ').slice(0, 40).trim() || 'Map';
    const initial = name + ' - note ' + globalThis.crypto.randomUUID().slice(0, 8);
    new EmbeddedNotePicker(this.app, initial, file => file !== map && !this.plugin.isMap(file), target => {
      void (async () => {
        if (this.file !== map || this.doc !== doc || this.surface?.isEditing() || await this.app.vault.read(map) !== doc.source) {
          throw new Error(t("The note changed. Open it again at the current line."));
        }
        let note: TFile;
        let created: TFile | undefined;
        let content = '';
        if (target.kind === 'file') {
          const existing = this.app.vault.getAbstractFileByPath(target.path);
          if (!(existing instanceof TFile) || existing.extension !== 'md' || existing === map || this.plugin.isMap(existing)) throw new Error(t("The file changed or was deleted. Search again."));
          note = existing;
        } else {
          const title = target.path.trim().replace(/(?:\.md)+$/i, '');
          if (!title || title === '.' || title === '..' || /[\\/:*?"<>|#\[\]^\x00-\x1f]/.test(title) || /[. ]$/.test(title)) throw new Error(t("Use a note name without path separators or reserved characters."));
          const destination = map.parent?.path ?? '';
          const path = normalizePath((destination ? destination + '/' : '') + title + '.md');
          const {body} = nodeNoteLabel(node.text);
          content = nodeNoteContent(body, this.app.metadataCache.fileToLinktext(map, path, true), map.name);
          note = created = await this.app.vault.create(path, content);
        }
        const link = this.app.metadataCache.fileToLinktext(note, map.path, true);
        const label = created ? nodeNoteLabel(node.text).prefix + '![[' + link + ']]' : node.text + ' ![[' + link + ']]';
        try {
          await this.apply(doc, editNode(doc, node.id, label));
        } catch (error) {
          if (created && !(await this.app.vault.read(map)).includes('![[' + link + ']]') && await this.app.vault.read(created) === content) await this.app.vault.trash(created, true);
          throw error;
        }
        const next = this.doc, selected = next?.nodes.find(candidate => candidate.line === node.line);
        if (!next || !selected || this.file !== map) return;
        await this.surface?.waitForNodeMarkdown(selected.id);
        if (this.doc === next && this.file === map && !this.surface?.isEditing()) await this.editNodeNote(next, selected, note);
      })().catch(error => new Notice(message(error), 8000));
    }).open();
  }
  private async editNodeNote(doc: MapDocument, node: MapNode, targetNote?: TFile, targetFrame?: HTMLElement): Promise<void> {
    const map = this.file;
    if (!map) return;
    const embeds = [...node.text.matchAll(/!\[\[([^\]#|]+)(?:\|[^\]]*)?\]\]/g)];
    const notes = embeds.map(match => this.app.metadataCache.getFirstLinkpathDest(match[1], map.path))
      .filter((file): file is TFile => file !== null && file !== map && file.extension === 'md');
    const note = targetNote ?? notes.reverse().find(file => !this.plugin.isMap(file) || / - note [a-f\d]{8}$/.test(file.basename));
    const frame = targetFrame ?? (note ? [...this.contentEl.querySelectorAll<HTMLElement>('.tvm-node-content .markdown-embed[src]')].find(element => {
      if (element.closest<HTMLElement>('.tvm-node')?.dataset.nodeId !== node.id) return false;
      const {path} = parseLinktext(element.getAttribute('src')!);
      return this.app.metadataCache.getFirstLinkpathDest(path, map.path) === note;
    }) : undefined);
    const original = note ? await this.app.vault.read(note) : '';
    const Native = await prepareNativeEditor(this.app);
    if (this.file !== map || this.doc !== doc || !this.surface || this.surface.isEditing()) return;
    let created: TFile | undefined;
    let savedText = '';
    this.surface.beginEdit(node.id, original, async text => {
      if (note) {
        await this.plugin.write(note, original, original.includes("\r\n") ? text.replace(/\n/g, "\r\n") : text);
        this.surface?.invalidateMarkdown();
        return node.id;
      }
      if (!text.trim()) throw new Error(t("A node cannot be empty."));
      if (this.file !== map || this.doc !== doc) throw new Error(t("The note changed. Open it again at the current line."));
      if (created) await this.plugin.write(created, savedText, text);
      else {
        const folder = this.app.fileManager.getNewFileParent(map.path);
        const name = map.basename.replace(/\.mindmap$/, '').replace(/[\\/:*?"<>|#\[\]^]/g, ' ').slice(0, 40).trim() || 'Map';
        const suffix = globalThis.crypto.randomUUID().slice(0, 8);
        created = await this.app.vault.create(normalizePath(`${folder.path}/${name} - note ${suffix}.md`), text);
      }
      savedText = text;
      const link = this.app.metadataCache.fileToLinktext(created, map.path, true);
      await this.apply(doc, editNode(doc, node.id, `${node.text} ![[${link}]]`));
      return this.doc?.nodes.find(candidate => candidate.line === node.line)?.id;
    }, (input, tools, inline) => {
      const owner = Object.assign(new Component(), { app: this.app, file: note ?? map, getMode: () => 'source' as const, hoverPopover: null as HoverPopover | null, editor: undefined as Editor | undefined, editMode: undefined as unknown });
      this.addChild(owner);
      const previousEditor = this.editor;
      try {
        const driver = mountNativeEditor(owner, input, tools, inline, Native, (file, line, expected) => this.nativeAddress(file, line, expected));
        this.editor = owner.editor;
        return { ...driver, dispose: () => {
          const editor = owner.editor;
          driver.dispose(); this.removeChild(owner);
          if (this.editor === editor) this.editor = previousEditor;
        } };
      } catch (error) { this.removeChild(owner); throw error; }
    }, undefined, undefined, true, frame);
  }
  private menu(anchor: HTMLElement): void {
    const menu = new Menu();
    if (!Platform.isMobile) {
      for (const [mode, label] of toolbarModes()) menu.addItem(item => item.setTitle(label)
        .setChecked(this.plugin.settings.toolbarMode === mode)
        .onClick(() => { void this.plugin.setToolbarMode(mode).catch(error => new Notice(message(error))); }));
      menu.addSeparator();
    }
    for (const [direction, label] of [['back', t("Previous map location")], ['forward', t("Next map location")]] as const) {
      menu.addItem(item => item.setTitle(label).setDisabled(!this.surface?.canNavigateHistory(direction))
        .onClick(() => this.surface?.navigateHistory(direction)));
    }
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
  refreshAppearance(): void {
    const size = this.plugin.settings.embeddedNoteFontSize;
    if (this.contentEl) {
      this.contentEl.classList.toggle('has-embed-font-size', size > 0);
      if (size) this.contentEl.style.setProperty('--tvm-embed-font-size', size + 'px');
      else this.contentEl.style.removeProperty('--tvm-embed-font-size');
    }
    this.surface?.refreshLayout();
  }
  refreshToolbarMode(): void {
    if (this.toolbar) this.toolbar.dataset.mode = Platform.isMobile ? 'visible' : this.plugin.settings.toolbarMode;
  }
  private async appendMapPreview(container: HTMLElement, file: TFile, target: string): Promise<void> {
    if (file.stat.size > 256_000) return;
    const component = this.renderedNodes.get(container);
    const doc = parseMap(await this.app.vault.cachedRead(file));
    if (this.renderedNodes.get(container) !== component || !this.plugin.settings.showMapPreviews) return;
    const preview = container.createDiv('tvm-embedded-map');
    const link = (parent: HTMLElement, linktext: string, label: string) => {
      const anchor = parent.createEl('a', { cls: 'internal-link', text: label, attr: { href: linktext, 'data-href': linktext } });
      return anchor;
    };
    const nestedLink = (value: string) => {
      const { path, subpath } = parseLinktext(value);
      const nested = path ? this.app.metadataCache.getFirstLinkpathDest(path, file.path) : file;
      return nested ? this.app.metadataCache.fileToLinktext(nested, this.path, true) + subpath : null;
    };
    let remaining = 24;
    const draw = (parent: HTMLElement, ids: string[], depth: number) => {
      for (const id of ids) {
        if (remaining <= 0) break;
        const node = doc.byId.get(id);
        if (!node) continue;
        remaining--;
        const branch = parent.createDiv('tvm-embedded-map-branch');
        const label = branch.createDiv('tvm-embedded-map-label');
        let offset = 0;
        for (const match of node.text.matchAll(/!?\[\[([^\]#|]+(?:#[^\]|]+)?)(?:\|([^\]]+))?\]\]/g)) {
          label.append(node.text.slice(offset, match.index));
          const linktext = nestedLink(match[1]);
          if (linktext) link(label, linktext, match[2] ?? match[1]);
          else label.append(match[2] ?? match[1]);
          offset = match.index! + match[0].length;
        }
        label.append(node.text.slice(offset) || (offset ? '' : t("Untitled")));
        if (depth < 3 && node.children.length && remaining > 0) draw(branch.createDiv('tvm-embedded-map-children'), node.children, depth + 1);
      }
    };
    draw(preview, doc.roots, 0);
    if (doc.nodes.length > 24) link(preview, target, '…');
  }
  private async nativeAddress(file: TFile, line: number, expected: string): Promise<string | undefined> {
    if (!this.plugin.isMap(file)) return undefined;
    const target = this.plugin.mapViews().find(view => view.path === file.path);
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
    const notes = tools.ownerDocument.createElement('button');
    notes.type = 'button'; notes.className = 'tvm-node-note-options'; notes.textContent = '![[…]]';
    notes.title = t("Multiline note…"); notes.setAttribute('aria-label', notes.title); tools.append(notes);
    const convert = async () => {
      if (!await this.surface?.saveForCreation() || this.path !== path) return;
      const doc = this.doc, id = this.selected(), node = id ? doc?.byId.get(id) : undefined;
      if (doc && node) this.convertNodeNote(doc, node);
    };
    notes.onclick = () => { void convert().catch(error => new Notice(message(error), 8000)); };
    inline.requestMultiline = () => {
      new ConfirmDialog(this.app, t("Convert to multiline note…"), t("Create an embedded note for multiline editing?"), async () => {
        window.setTimeout(() => { if (input.isConnected) void convert().catch(error => new Notice(message(error), 8000)); }, 0);
      }, {label: t("Convert to multiline note…"), warning: false}).open();
    };
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
    if (this.activeDraftKey) this.plugin.liveDrafts.delete(this.activeDraftKey);
    this.cancelRestoreWait?.();
    this.persist(); this.closed = true; this.revision++;
    window.clearTimeout(this.refreshTimer); window.clearTimeout(this.stateTimer);
    this.surface?.destroy(); this.renderer.unload(); this.contentEl.empty();
  }
}

interface IndexedMap { file: TFile; doc: MapDocument; mtime: number; }
interface QueueChange { file: TFile; before: string; after: string; }
class QueueView extends ItemView {
  private renderer?: Component;
  private undoChanges: QueueChange[] = [];
  private redoChanges: QueueChange[] = [];
  private undoButton?: HTMLButtonElement;
  private redoButton?: HTMLButtonElement;
  private writing = false;
  private cache = new Map<string, IndexedMap>();
  private host?: HTMLElement;
  private mode = 'steps';
  private completedMode: 'hide' | 'footer' | 'inline' = 'footer';
  private completedControl?: HTMLSelectElement;
  private completedExpanded = new Set<string>();
  private collapsed = new Set<string>();
  private foldControls?: HTMLElement;
  private filter = '';
  private mapFilter?: ReturnType<typeof attachMapFilter>;
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
    this.completedControl = toolbar.createEl('select', { attr: { 'aria-label': t("Completed tasks") } });
    for (const [value, label] of [['hide', t("Hide completed tasks")], ['footer', t("Completed tasks below")], ['inline', t("Completed tasks in place")]]) {
      this.completedControl.createEl('option', { text: label, value });
    }
    this.completedControl.value = this.completedMode;
    this.completedControl.onchange = () => {
      this.completedMode = this.completedControl!.value as typeof this.completedMode;
      this.draw(); this.app.workspace.requestSaveLayout();
    };
    this.undoButton = iconButton(toolbar, 'undo-2', t("Undo"), () => { void this.history('undo'); });
    this.redoButton = iconButton(toolbar, 'redo-2', t("Redo"), () => { void this.history('redo'); });
    button(toolbar, t("Refresh"), () => { this.cache.clear(); void this.reload(); });
    this.mapFilter = attachMapFilter(toolbar, () => this.queueFiles(), path => {
      try { queueMapMatcher(path); }
      catch (error) { new Notice(message(error)); this.mapFilter?.set(this.filter); return; }
      this.filter = path;
      void this.reload();
    });
    this.foldControls = toolbar.createDiv('tvm-queue-fold-controls');
    button(this.foldControls, t("Collapse all"), () => {
      for (const path of this.cache.keys()) if (queueMapMatcher(this.filter)(path)) this.collapsed.add(path);
      this.draw();
    });
    button(this.foldControls, t("Expand all"), () => {
      for (const path of this.cache.keys()) if (!this.filter || path === this.filter) this.collapsed.delete(path);
      this.draw();
    });
    const search = toolbar.createEl('input', { type: 'search', attr: { 'aria-label': t("Search steps"), placeholder: t("Find…") } });
    search.oninput = () => { this.query = search.value.toLocaleLowerCase(); this.draw(); };
    this.host = this.contentEl.createDiv('tvm-panel');
  }
  getState(): Record<string, unknown> { return { filter: this.filter, completedMode: this.completedMode }; }
  async setState(state: Record<string, unknown>, result: any): Promise<void> {
    const filter = typeof state.filter === 'string' ? state.filter : '';
    try { queueMapMatcher(filter); this.filter = filter; }
    catch { this.filter = ''; }
    this.completedMode = state.completedMode === 'hide' || state.completedMode === 'inline' ? state.completedMode : 'footer';
    if (this.completedControl) this.completedControl.value = this.completedMode;
    this.mapFilter?.set(this.filter);
    await this.reload();
    await super.setState(state, result);
  }
  scheduleReload(): void { window.clearTimeout(this.timer); this.timer = window.setTimeout(() => { void this.reload(); }, 250); }
  private queueFiles(): TFile[] {
    const terms = queueExclusions(this.plugin.settings.queueExcludedMaps);
    return this.app.vault.getMarkdownFiles().filter(file => (this.plugin.isMap(file) || file.path === this.filter)
      && !terms.some(term => file.basename.toLocaleLowerCase().includes(term)));
  }
  private async reload(): Promise<void> {
    const generation = ++this.generation;
    const matches = queueMapMatcher(this.filter);
    const files = this.queueFiles().filter(file => matches(file.path));
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
    this.refreshHistoryButtons();
    if (this.renderer) this.removeChild(this.renderer);
    this.renderer = this.addChild(new Component());
    this.host.empty();
    if (this.foldControls) this.foldControls.hidden = this.mode === 'dates';
    if (this.completedControl) this.completedControl.hidden = this.mode !== 'steps';
    let count = 0;
    const matches = queueMapMatcher(this.filter);
    const maps = [...this.cache.values()].filter(map => matches(map.file.path)).sort((a, b) => a.file.path.localeCompare(b.file.path));
    const terms = queueExclusions(this.plugin.settings.queueExcludedBranches);
    const excluded = new Map(maps.map(map => [map, excludedQueueNodes(map.doc, terms)]));
    if (this.mode === 'dates') {
      const rows = maps.flatMap(map => getSteps(map.doc).filter(step => !step.completed && (step.date || step.unknownDate) && !excluded.get(map)!.has(step.nodeId)).map(step => ({ map, step })));
      rows.sort((a, b) => (a.step.unknownDate ? '' : a.step.date!).localeCompare(b.step.unknownDate ? '' : b.step.date!));
      for (const { map, step } of rows) if (!this.query || step.text.toLocaleLowerCase().includes(this.query)) { this.stepRow(this.host, map, step, false); count++; }
    } else for (const map of maps) {
      const hidden = excluded.get(map)!;
      const allSteps = getSteps(map.doc).filter(step => !hidden.has(step.nodeId) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const steps = allSteps.filter(step => !step.completed || this.completedMode === 'inline');
      const completed = this.completedMode === 'footer' ? allSteps.filter(step => step.completed).sort(compareSteps) : [];
      const stepCount = steps.length + completed.length;
      const questions = map.doc.nodes.filter(node => !hidden.has(node.id) && /\[\[QA ❓(?:\||\]\])|\/\/todo\s+Q\s*:/i.test(node.text) && !node.text.includes('✅') && (!this.query || node.text.toLocaleLowerCase().includes(this.query)));
      if (!(this.mode === 'qa' ? questions.length : stepCount)) continue;
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
      header.createSpan({ cls: 'tvm-badge', text: String(this.mode === 'qa' ? questions.length : stepCount) });
      if (collapsed) { count += this.mode === 'qa' ? questions.length : stepCount; continue; }
      if (this.mode === 'qa') for (const node of questions) {
        const row = section.createDiv('tvm-step-row');
        this.renderLabel(row, map, node.id, queueLabel(node.text, this.plugin.settings.queueTaskMarker, this.plugin.settings.queueStepTag));
        count++;
      } else {
        steps.sort(compareSteps);
        for (const step of steps) { this.stepRow(section, map, step, step.number !== null && !step.completed); count++; }
        if (completed.length) {
          const footer = section.createEl('details', { cls: 'tvm-completed-tasks' });
          footer.open = this.completedExpanded.has(map.file.path);
          footer.createEl('summary', { text: t("Completed ({count})", { count: completed.length }) });
          footer.addEventListener('toggle', () => { if (footer.open) this.completedExpanded.add(map.file.path); else this.completedExpanded.delete(map.file.path); });
          for (const step of completed) { this.stepRow(footer, map, step, false); count++; }
        }
      }
    }
    if (!count) this.host.createDiv({ cls: 'tvm-empty', text: t("No open items match this filter.") });
  }
  private renderLabel(parent: HTMLElement, map: IndexedMap, id: string, text: string): void {
    const label = parent.createDiv('tvm-step-text');
    button(parent, '↗', () => { void this.plugin.openMap(map.file, undefined, id); }, t("Open node"));
    const row = parent.closest<HTMLElement>('.tvm-step-row');
    if (row) row.addEventListener('click', event => {
      if ((event.target as Element).closest('a, button, input, select, textarea')) return;
      if (!row.ownerDocument.getSelection()?.isCollapsed) return;
      void this.plugin.openMap(map.file, undefined, id);
    });
    label.addEventListener('click', event => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a.internal-link');
      const target = link?.dataset.href ?? link?.getAttribute('href');
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      void this.app.workspace.openLinkText(target, map.file.path, event.ctrlKey || event.metaKey);
    });
    void MarkdownRenderer.render(this.app, text, label, map.file.path, this.renderer!).catch(() => {
      label.textContent = text;
    });
  }
  private stepRow(parent: HTMLElement, map: IndexedMap, step: Step, reorder: boolean): void {
    const row = parent.createDiv('tvm-step-row');
    row.classList.toggle('is-complete', step.completed);
    const checkbox = row.createEl('input', { type: 'checkbox', attr: { 'aria-label': t(step.completed ? "Mark incomplete" : "Mark completed") } });
    checkbox.checked = step.completed;
    checkbox.onchange = () => { this.queueWrite(map, toggleTask(map.doc, step.nodeId)); };
    if (reorder) {
      const controls = row.createDiv('tvm-step-controls');
      button(controls, '↑', () => { void this.reorder(map, step.nodeId, -1); }, t("Move earlier in execution order"));
      button(controls, '↓', () => { void this.reorder(map, step.nodeId, 1); }, t("Move later in execution order"));
      controls.draggable = true;
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
    const commands = row.createDiv('tvm-step-controls');
    iconButton(commands, 'calendar', t("Step deadline"), () => {
      new DateDialog(this.app, step.unknownDate ? '?' : step.date ?? '', value => this.change(map, setDated(map.doc, step.nodeId, value))).open();
    });
    if (step.number !== null) iconButton(commands, 'list-minus', t("Remove step number"), () => {
      this.queueWrite(map, unnumberStep(map.doc, step.nodeId));
    });
    this.renderLabel(content, map, step.nodeId, queueLabel(step.text, false, this.plugin.settings.queueStepTag));
  }
  private async reorder(map: IndexedMap, id: string, target: number | string): Promise<void> {
    const numbered = getSteps(map.doc).filter(step => step.number !== null).sort(compareSteps);
    const ids = numbered.map(step => step.nodeId), from = ids.indexOf(id);
    if (from < 0) return;
    let to: number;
    if (typeof target === 'string') to = ids.indexOf(target);
    else {
      const excluded = excludedQueueNodes(map.doc, queueExclusions(this.plugin.settings.queueExcludedBranches));
      const visible = numbered.filter(step => !step.completed && !excluded.has(step.nodeId) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const position = visible.findIndex(step => step.nodeId === id);
      to = ids.indexOf(visible[position + target]?.nodeId ?? '');
    }
    if (to < 0 || to === from) return;
    ids.splice(from, 1); ids.splice(to, 0, id);
    this.queueWrite(map, renumberSteps(map.doc, ids, true));
  }
  private queueWrite(map: IndexedMap, next: string): void {
    void this.change(map, next).catch(error => new Notice(message(error), 8000));
  }
  private async change(map: IndexedMap, next: string): Promise<void> {
    if (this.writing || next === map.doc.source) return;
    await this.writeQueueChange(map.file, map.doc.source, next, () => {
      this.undoChanges.push({ file: map.file, before: map.doc.source, after: next });
      if (this.undoChanges.length > 50) this.undoChanges.shift();
      this.redoChanges.length = 0;
    });
  }
  private refreshHistoryButtons(): void {
    if (this.undoButton) this.undoButton.disabled = this.writing || !this.undoChanges.length;
    if (this.redoButton) this.redoButton.disabled = this.writing || !this.redoChanges.length;
  }
  private async history(direction: 'undo' | 'redo'): Promise<void> {
    const undo = direction === 'undo';
    const from = undo ? this.undoChanges : this.redoChanges;
    const to = undo ? this.redoChanges : this.undoChanges;
    const edit = from.at(-1);
    if (!edit || this.writing) return;
    try {
      await this.writeQueueChange(edit.file, undo ? edit.after : edit.before, undo ? edit.before : edit.after, () => {
        from.pop();
        to.push(edit);
      });
    } catch (error) { new Notice(message(error), 8000); }
  }
  private async writeQueueChange(file: TFile, expected: string, next: string, record: () => void): Promise<void> {
    this.writing = true;
    this.refreshHistoryButtons();
    try {
      await this.plugin.write(file, expected, next);
      record();
    } finally {
      this.writing = false;
      this.cache.delete(file.path);
      this.refreshHistoryButtons();
      if (!this.closed) await this.reload();
    }
  }
  async onClose(): Promise<void> { this.closed = true; this.generation++; window.clearTimeout(this.timer); this.cache.clear(); this.contentEl.empty(); }
}

class SettingsTab extends PluginSettingTab {
  private stopRecording: () => void = () => {};
  private patternRevision = 0;
  private savingPatterns = Promise.resolve();
  constructor(private plugin: TraceViewMindmap) {
    super(plugin.app, plugin);
    plugin.register(() => this.stopRecording());
  }
  hide(): void { this.stopRecording(); }
  display(): void {
    this.stopRecording();
    this.patternRevision++;
    this.containerEl.empty();
    const header = this.containerEl.createDiv('tvm-settings-header');
    header.createEl('h2', { text: 'TraceView Mindmap' });
    button(header, t("Restore default settings"), () => {
      new ConfirmDialog(this.app, t("Restore default settings"), t("Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language."), async () => {
        this.patternRevision++;
        await this.savingPatterns;
        await this.plugin.resetSettings();
        this.display();
        new Notice(t("Default settings restored. Restart Obsidian to apply the language."));
      }, { label: t("Restore defaults"), focusConfirm: false }).open();
    });
    this.containerEl.createEl('h3', {text: t("General")});
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
    this.containerEl.createEl('h3', {text: t("Opening notes")});
    const patternSettings: Setting[] = [];
    const updatePatternAvailability = () => { for (const setting of patternSettings) setting.setDisabled(!this.plugin.settings.autoOpen); };
    new Setting(this.containerEl).setName(t("Automatically open matching notes as maps")).setDesc(t("Matching notes reopen as maps, overriding remembered Markdown. Open as Markdown keeps the current tab in Markdown.")).addToggle(toggle => toggle.setValue(this.plugin.settings.autoOpen).onChange(async value => { this.plugin.settings.autoOpen = value; updatePatternAvailability(); await this.plugin.saveData(this.plugin.settings); }));
    new Setting(this.containerEl).setName(t("Remember last note view")).setDesc(t("Reopen notes in their last map or Markdown view. Automatic map opening takes priority. Stores up to 500 map paths on this device.")).addToggle(toggle => toggle.setValue(this.plugin.settings.rememberLastMode).onChange(async value => {
      this.plugin.settings.rememberLastMode = value;
      await this.plugin.saveData(this.plugin.settings);
    }));
    let patternMode = this.plugin.settings.patternMode, mapPatterns = this.plugin.settings.mapPatterns;
    const patternStatus = this.containerEl.createEl('p', { cls: 'setting-item-description', attr: { role: 'status', 'aria-live': 'polite' } });
    const savePatterns = () => {
      const revision = ++this.patternRevision;
      const rules = { patternMode, mapPatterns };
      try { compileMapPatterns(rules); }
      catch (error) {
        patternStatus.setText(error instanceof PatternError ? t("Invalid pattern on line {line}: {error}", { line: error.line, error: error.message }) : message(error));
        return;
      }
      this.savingPatterns = this.savingPatterns.then(async () => {
        if (revision !== this.patternRevision) return;
        try {
          await this.plugin.setMapRules(rules);
          if (revision === this.patternRevision) patternStatus.setText(t("Patterns saved."));
        } catch (error) { if (revision === this.patternRevision) patternStatus.setText(message(error)); }
      });
    };
    let syntaxInput: HTMLSelectElement, patternsInput: HTMLTextAreaElement;
    const syntaxSetting = new Setting(this.containerEl).setName(t("Pattern syntax")).addDropdown(dropdown => {
      syntaxInput = dropdown.selectEl;
      dropdown.addOption('glob', t("Glob (wildcards)")).addOption('regex', t("Regular expressions"));
      dropdown.setValue(patternMode).onChange(value => { patternMode = value as PatternMode; savePatterns(); });
    });
    const patternsSetting = new Setting(this.containerEl).setName(t("Map file patterns")).setDesc(t("One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.")).addTextArea(text => {
      patternsInput = text.inputEl;
      text.setValue(mapPatterns).setPlaceholder('*.mindmap.md\n🎯*.md').onChange(value => { mapPatterns = value; savePatterns(); });
      text.inputEl.rows = 5; text.inputEl.setAttribute('aria-label', t("Map file patterns"));
      text.inputEl.spellcheck = false;
    }).addButton(button => button.setButtonText(t("Restore default patterns")).onClick(() => {
      patternMode = DEFAULT_SETTINGS.patternMode; mapPatterns = DEFAULT_SETTINGS.mapPatterns;
      syntaxInput.value = patternMode; patternsInput.value = mapPatterns;
      savePatterns();
    }));
    patternsSetting.settingEl.addClass('tvm-pattern-setting');
    patternSettings.push(syntaxSetting, patternsSetting);
    updatePatternAvailability();
    this.containerEl.createEl('p', { cls: 'setting-item-description', text: t("The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.") });
    if (Platform?.isWin) new Setting(this.containerEl).setName(t("Automatically restore large maps")).setDesc(t("At startup the active map waits for Obsidian to respond steadily. “Open now” skips the wait.")).addToggle(toggle => toggle.setValue(this.plugin.settings.autoRestoreLargeMaps).onChange(async value => {
      this.plugin.settings.autoRestoreLargeMaps = value;
      for (const view of this.plugin.mapViews()) view.refreshRestoreWait();
      await this.plugin.saveData(this.plugin.settings);
    }));
    this.containerEl.createEl('h3', {text: t("Planning lists")});
    for (const [key, label] of [['queueExcludedMaps', t("Exclude maps from planning")],
      ['queueExcludedBranches', t("Exclude branches from planning")]] as const) {
      new Setting(this.containerEl).setName(label).setDesc(t("One term per line. Leave blank to show all."))
        .addTextArea(input => input.setValue(this.plugin.settings[key]).onChange(async value => {
          this.plugin.settings[key] = value;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refreshQueues();
        }));
    }
    for (const [key, label] of [['queueTaskMarker', t("Show [ ] in list text")], ['queueStepTag', t("Show #step in list text")]] as const) {
      new Setting(this.containerEl).setName(label).setDesc(t("Affects only Steps · Deadlines · QA display. Note text and completion controls are preserved.")).addToggle(toggle => toggle.setValue(this.plugin.settings[key]).onChange(async value => {
        this.plugin.settings[key] = value; await this.plugin.saveData(this.plugin.settings); this.plugin.refreshQueues();
      }));
    }
    this.containerEl.createEl('h3', {text: t("Map appearance")});
    if (!Platform.isMobile) {
      new Setting(this.containerEl).setName(t("Map toolbar")).addDropdown(dropdown => {
        for (const [mode, label] of toolbarModes()) dropdown.addOption(mode, label);
        dropdown.setValue(this.plugin.settings.toolbarMode).onChange(value => this.plugin.setToolbarMode(value as ToolbarMode));
      });
    }
    new Setting(this.containerEl).setName(t("Show embedded map previews")).addToggle(toggle =>
      toggle.setValue(this.plugin.settings.showMapPreviews).onChange(async value => {
        this.plugin.settings.showMapPreviews = value;
        for (const view of this.plugin.mapViews()) view.surface?.invalidateMarkdown();
        await this.plugin.saveData(this.plugin.settings);
      }));
    new Setting(this.containerEl).setName(t("Map node width")).setDesc(t("Applies immediately to all open maps. Outline and Table keep their own widths.")).addDropdown(dropdown => {
      for (const [mode, label] of widthModes()) dropdown.addOption(mode, label);
      dropdown.setValue(this.plugin.settings.widthMode).onChange(value => { void this.plugin.setWidthMode(value as WidthMode).catch(error => new Notice(message(error))); });
    });
    for (const [key, label, description, min, max] of [
      ['embeddedNoteFontSize', t("Embedded note font size (px)"), t("Leave blank to follow the theme. Changes only embedded notes in maps."), 10, 48],
      ['nodeMaxHeight', t("Default maximum node height (px)"), t("Leave blank for automatic height. Short content shrinks naturally; manual node sizes take precedence."), 80, 2400],
    ] as const) {
      new Setting(this.containerEl).setName(label).setDesc(description).addText(input => {
        input.inputEl.type = 'number'; input.inputEl.min = String(min); input.inputEl.max = String(max); input.inputEl.step = '1';
        input.setValue(this.plugin.settings[key] ? String(this.plugin.settings[key]) : '').onChange(async text => {
          const value = text.trim() ? Number(text) : 0;
          const valid = Number.isInteger(value) && (value === 0 || (value >= min && value <= max));
          input.inputEl.setAttribute('aria-invalid', String(!valid));
          if (valid) await this.plugin.setMapAppearance(key, value);
        });
      });
    }
    this.containerEl.createEl('h3', {text: t("Navigation")});
    new Setting(this.containerEl).setName(t("Navigate across branches with arrow keys")).addToggle(toggle =>
      toggle.setValue(this.plugin.settings.arrowAcrossBranches).onChange(async value => {
        this.plugin.settings.arrowAcrossBranches = value;
        await this.plugin.saveData(this.plugin.settings);
      }));
    new Setting(this.containerEl).setName(t("Collapse pasted branches")).addToggle(toggle =>
      toggle.setValue(this.plugin.settings.collapsePastedBranches).onChange(async value => {
        this.plugin.settings.collapsePastedBranches = value;
        await this.plugin.saveData(this.plugin.settings);
      }));
    new Setting(this.containerEl).setName(t("Left arrow collapses the branch first")).setDesc(t("Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.")).addToggle(toggle => toggle.setValue(this.plugin.settings.collapseOnLeft).onChange(async value => { this.plugin.settings.collapseOnLeft = value; await this.plugin.saveData(this.plugin.settings); }));
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
