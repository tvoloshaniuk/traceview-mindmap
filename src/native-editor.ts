/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import { Scope, MarkdownView, type App, type Component, type Editor, type MarkdownFileInfo, type TFile, type EditorPosition } from 'obsidian';
import { singleLine, type InlineDriver, type InlineEditor } from './inline';

// Obsidian does not expose its standalone Markdown editor as a public constructor.
// Keep the private bridge here; the caller falls back to the textarea on failure.
type NativeOwner = Component & MarkdownFileInfo & { editor?: Editor; editMode?: unknown };
type InternalEditor = Component & {
  editor: Editor & { triggerWikilink?: () => void };
  sourceMode: boolean;
  editorEl: HTMLElement;
  cm: any;
  set: (text: string, clear: boolean) => void;
  get: () => string;
  destroy: () => void;
  onResize: () => void;
  buildLocalExtensions(): any[];
  onUpdate(update: any, changed: boolean): void;
  editorSuggest: { isShowingSuggestion: () => boolean; close: () => void; currentSuggest?: { context?: {editor: Editor; start: EditorPosition; end: EditorPosition} | null } };
};

export type NativeConstructor = new (app: App, host: HTMLElement, owner: NativeOwner) => InternalEditor;
class NativeProbe extends MarkdownView {
  async dispose(): Promise<void> { await this.onClose(); this.unload(); this.containerEl.remove(); }
}
const constructors = new WeakMap<App, Promise<NativeConstructor>>();

export function prepareNativeEditor(app: App): Promise<NativeConstructor> {
  const cached = constructors.get(app); if (cached) return cached;
  const promise = (async () => {
    const current = app.workspace.getLeavesOfType('markdown').find(leaf => leaf.view instanceof MarkdownView);
    const previous = app.workspace.getMostRecentLeaf();
    const temporary = current ? undefined : app.workspace.getLeaf('tab');
    let probe: NativeProbe | undefined;
    try {
      const view = current?.view ?? (probe = new NativeProbe(temporary!));
      const component = (view as any).editor?.editorComponent ?? (view as any).editMode;
      const prototype = component ? Object.getPrototypeOf(Object.getPrototypeOf(component)) : null;
      if (!prototype || typeof prototype.buildLocalExtensions !== 'function' || typeof prototype.getDynamicExtensions !== 'function') {
        throw new Error(t("This Obsidian version has no compatible native editor."));
      }
      return prototype.constructor as NativeConstructor;
    } finally {
      if (probe) await probe.dispose();
      if (temporary) { temporary.detach(); if (previous && previous !== temporary && app.workspace.getMostRecentLeaf() === temporary) app.workspace.setActiveLeaf(previous, { focus: false }); }
    }
  })();
  constructors.set(app, promise);
  void promise.catch(() => constructors.delete(app));
  return promise;
}

export function mountNativeEditor(owner: NativeOwner, input: HTMLTextAreaElement, tools: HTMLElement, inline: InlineEditor, Native?: NativeConstructor, ensureAddress?: (file: TFile, line: number, expected: string) => Promise<string | undefined>): InlineDriver {
  if (!Native) throw new Error(t("Could not prepare the native editor."));
  const document = input.ownerDocument;
  const normalize = (text: string) => inline.multiline ? text : singleLine(text);
  const host = document.createElement('div'); host.className = 'tvm-native-editor';
  input.before(host);
  const previousEditor = owner.editor, previousMode = owner.editMode;
  let active = true, syncing = false, scoped = false, initializing = true;
  const scope = new Scope(owner.app.scope);
  for (const key of ['Enter', 'Escape']) scope.register([], key, event => {
    if (!native?.editorSuggest.isShowingSuggestion() && inline.handleKeydown(event)) return false;
  });
  if (inline.multiline) scope.register(['Mod'], 'Enter', event => { if (inline.handleKeydown(event)) return false; });
  const focus = () => {
    if (!active) return;
    owner.app.workspace.activeEditor = owner;
    if (!scoped) { owner.app.keymap.pushScope(scope); scoped = true; }
  };
  const blur = () => { if (scoped) { owner.app.keymap.popScope(scope); scoped = false; } };
  let native: InternalEditor | undefined;
  let cancelResize: (() => void) | undefined;
  const resize = () => {
    if (!active || !host.isConnected || cancelResize) return;
    const win = document.defaultView!;
    const update = () => {
      cancelResize = undefined;
      if (!active || !host.isConnected || !native) return;
      const context = native.editorSuggest.currentSuggest?.context;
      if (context?.editor === native.editor && [context.start, context.end].some(position =>
        position.line < 0 || position.line >= native!.editor.lineCount()
        || position.ch < 0 || position.ch > native!.editor.getLine(position.line).length
      )) native.editorSuggest.close();
      native.onResize();
    };
    if (win.requestAnimationFrame) {
      const frame = win.requestAnimationFrame(update);
      cancelResize = () => win.cancelAnimationFrame(frame);
    } else {
      const timer = win.setTimeout(update, 0);
      cancelResize = () => win.clearTimeout(timer);
    }
  };
  const releaseSuggestions: (() => void)[] = [];
  const mirror = () => {
    if (!active || syncing || !native) return;
    syncing = true;
    try {
      input.value = normalize(native.get());
      const selection = native.editor.listSelections()[0];
      if (selection) input.setSelectionRange(native.editor.posToOffset(selection.anchor), native.editor.posToOffset(selection.head));
      input.dispatchEvent(new document.defaultView!.Event('input', { bubbles: true }));
    } finally { syncing = false; }
  };
  class DraftEditor extends Native {
    get path(): string { return initializing ? '' : owner.file?.path ?? ''; }
    saveHistory(): void { /* Draft history must not replace the full note editor history. */ }
    buildLocalExtensions(): any[] {
      const extensions = super.buildLocalExtensions();
      const filter = this.cm.state.constructor.transactionFilter;
      if (!filter?.of) throw new Error(t("The native editor cannot protect a single-line draft."));
      extensions.push(filter.of((transaction: any) => {
        if (!transaction.docChanged) return transaction;
        if (input.readOnly && !syncing) return [];
        const text = transaction.newDoc.toString(), normalized = normalize(text);
        if (text === normalized) return transaction;
        return { changes: { from: 0, to: transaction.startState.doc.length, insert: normalized },
          selection: { anchor: singleLine(text.slice(0, transaction.newSelection.main.anchor)).length,
            head: singleLine(text.slice(0, transaction.newSelection.main.head)).length }, userEvent: 'input.paste' };
      }));
      return extensions;
    }
    onUpdate(update: any, changed: boolean): void {
      super.onUpdate(update, changed);
      if (update.docChanged || update.selectionSet) mirror();
    }
  }
  const pull = () => {
    if (!active || syncing || !native || native.get() === input.value) return;
    syncing = true;
    try { native.set(normalize(input.value), false); } finally { syncing = false; }
  };
  const keydown = (event: KeyboardEvent) => {
    if (native?.editorSuggest.isShowingSuggestion()) return;
    if (event.key === 'Enter' || event.key === 'Escape') inline.handleKeydown(event);
  };
  const beforeinput = (event: InputEvent) => {
    if (!inline.multiline && (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak')) event.preventDefault();
  };
  const dispose = () => {
    if (!active) return; active = false; cancelResize?.(); cancelResize = undefined; blur(); for (const release of releaseSuggestions) release();
    input.removeEventListener('input', pull); host.removeEventListener('keydown', keydown, true); host.removeEventListener('beforeinput', beforeinput); host.removeEventListener('focusin', focus); host.removeEventListener('focusout', blur);
    if (native) {
      native.editorSuggest.close(); owner.removeChild(native); native.destroy();
      if (owner.editor === native.editor) owner.editor = previousEditor;
      if (owner.editMode === native) owner.editMode = previousMode;
    } else { owner.editor = previousEditor; owner.editMode = previousMode; }
    if (owner.app.workspace.activeEditor === owner) owner.app.workspace.activeEditor = null;
    host.remove(); input.hidden = false;
  };
  try {
    owner.editMode = { sourceMode: false };
    native = new DraftEditor(owner.app, host, owner);
    owner.editMode = native; owner.editor = native.editor;
    owner.addChild(native);
    native.set(input.value, true); initializing = false;
    native.editor.setCursor(inline.multiline ? native.editor.offsetToPos(input.value.length) : { line: 0, ch: input.value.length });
    if (ensureAddress) for (const suggestion of (native.editorSuggest as any).suggests ?? []) {
      if (!suggestion.suggestManager || typeof suggestion.selectSuggestion !== 'function') continue;
      const original = suggestion.selectSuggestion;
      let pending = false;
      const select = function(this: any, value: any, event: MouseEvent | KeyboardEvent) {
        if (!active || this.context?.editor !== native?.editor || value?.type !== 'block' || value.node?.id) return original.call(this, value, event);
        if (pending || input.readOnly) return;
        const line = value.node?.position?.start?.line;
        if (!value.file || typeof line !== 'number' || typeof value.content !== 'string') return original.call(this, value, event);
        pending = true; input.readOnly = true; input.setAttribute('aria-busy', 'true');
        void ensureAddress(value.file, line - 1, value.content).then(id => {
          if (!active) return;
          input.readOnly = false;
          if (id) value.node.id = id;
          original.call(this, value, event);
        }).catch(error => {
          if (active) { inline.reportError(error); this.close(); }
        }).finally(() => { pending = false; if (active) { input.readOnly = false; input.removeAttribute('aria-busy'); } });
      };
      suggestion.selectSuggestion = select;
      releaseSuggestions.push(() => { if (suggestion.selectSuggestion === select) suggestion.selectSuggestion = original; });
    }
    // Share the draft's hidden label: an aria-label here would surface as an Obsidian hover tooltip.
    const labelledBy = input.getAttribute('aria-labelledby');
    if (labelledBy) native.cm.contentDOM.setAttribute('aria-labelledby', labelledBy);
    else native.cm.contentDOM.setAttribute('aria-label', t("Node text"));
    native.cm.contentDOM.setAttribute('enterkeyhint', inline.multiline ? 'enter' : 'done');
    input.hidden = true;
    input.addEventListener('input', pull); host.addEventListener('keydown', keydown, true); host.addEventListener('beforeinput', beforeinput); host.addEventListener('focusin', focus); host.addEventListener('focusout', blur);
    const add = (label: string, title: string, action: () => void) => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.title = title; button.setAttribute('aria-label', title);
      button.onclick = () => { if (!input.readOnly && active) { action(); native?.editor.focus(); } }; tools.append(button);
    };
    add('[[…]]', t("Native Obsidian link"), () => native?.editor.triggerWikilink?.());
    add('==', t("Highlight text"), () => {
      const editor = native?.editor;
      if (!editor) return;
      const selected = editor.getSelection();
      const start = editor.posToOffset(editor.getCursor('from'));
      editor.replaceSelection('==' + selected + '==');
      if (!selected) editor.setCursor(editor.offsetToPos(start + 2));
    });
    add('QA', t("Mark as question"), () => native?.editor.replaceSelection('==//todo Q: =='));
    return {
      element: host,
      focus: () => { if (active) { native?.editor.focus(); focus(); } },
      resize,
      setReadOnly: value => { if (native) native.cm.contentDOM.contentEditable = String(!value); },
      suggestionActive: () => !!native?.editorSuggest.isShowingSuggestion(),
      dispose,
    };
  } catch (error) { dispose(); throw error; }
}
