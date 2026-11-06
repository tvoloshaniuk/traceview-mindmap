import * as i18n from '../src/i18n';
i18n.setLanguage('uk');
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { JSDOM } from 'jsdom';
import * as search from '../src/link-search';

function environment() {
  const dom = new JSDOM('<!doctype html><body></body>', { pretendToBeVisual: true });
  const win = dom.window;
  const prototype = win.HTMLElement.prototype as any;
  prototype.addClass = function (name: string) { this.classList.add(name); };
  prototype.setText = function (text: string) { this.textContent = text; };
  prototype.empty = function () { this.replaceChildren(); };
  prototype.createEl = function (tag: string, options: any = {}) {
    const el = win.document.createElement(tag);
    if (options.text) el.textContent = options.text;
    if (options.cls) el.className = options.cls;
    if (options.type) el.setAttribute('type', options.type);
    for (const [key, value] of Object.entries(options.attr ?? {})) el.setAttribute(key, String(value));
    this.append(el);
    return el;
  };
  prototype.createDiv = function (options: any) { return this.createEl('div', typeof options === 'string' ? { cls: options } : options); };
  prototype.createSpan = function (options: any) { return this.createEl('span', typeof options === 'string' ? { cls: options } : options); };
  class TFile {
    name: string; basename: string; extension = 'md';
    constructor(public path: string, public aliases: string[] = []) {
      this.name = path.split('/').pop()!;
      this.basename = this.name.replace(/\.md$/, '');
    }
  }
  const files = [new TFile('Topics/Programming/Other.md'), new TFile('System/Programming.md', ['Coding'])];
  const generated: unknown[][] = [];
  const app = {
    vault: { getFiles: () => files, getAbstractFileByPath: (path: string) => files.find(file => file.path === path) },
    metadataCache: {
      getFileCache: (file: TFile) => ({ frontmatter: { aliases: file.aliases } }),
      unresolvedLinks: { 'Inbox.md': { 'Ghost Topic': 2 }, 'Other.md': { 'Ghost Topic': 3 } }
    },
    fileManager: { generateMarkdownLink: (...args: any[]) => { generated.push(args); return `[[${args[0].basename}${args[3] ? `|${args[3]}` : ''}]]`; } }
  };
  let lastPicker: any;
  class Modal {
    scope = { register: (_modifiers: unknown, _key: unknown, handler: (event: KeyboardEvent) => unknown) => { this.enter = handler; } };
    enter?: (event: KeyboardEvent) => unknown;
    modalEl = win.document.createElement('div');
    titleEl = win.document.createElement('div');
    contentEl = win.document.createElement('div');
    constructor(public app: any) { this.modalEl.append(this.titleEl, this.contentEl); }
    open() { win.document.body.append(this.modalEl); (this as any).onOpen?.(); }
    close() { this.onClose(); this.modalEl.remove(); }
    onClose() {}
  }
  class SuggestModal extends Modal {
    limit = 80;
    constructor(app: any) { super(app); lastPicker = this; }
    setPlaceholder() {}
    setInstructions() {}
  }
  class Setting {
    constructor(private el: HTMLElement) {}
    addButton(callback: (button: any) => void) {
      const buttonEl = win.document.createElement('button');
      this.el.append(buttonEl);
      const button = { buttonEl, setButtonText(text: string) { buttonEl.textContent = text; return this; }, setCta() { return this; }, setWarning() { return this; }, onClick(handler: () => void) { buttonEl.onclick = handler; return this; } };
      callback(button); return this;
    }
  }
  const exports: any = {};
  const compiled = ts.transpileModule(readFileSync('src/editor.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  runInNewContext(compiled, {
    exports, window: win, setTimeout: win.setTimeout.bind(win),
    require: (name: string) => name === './link-search' ? search : name === './i18n' ? i18n : {
      Modal, SuggestModal, FuzzySuggestModal: SuggestModal, TFile, Setting,
      Notice: class {}, parseFrontMatterAliases: (frontmatter: any) => frontmatter?.aliases ?? null
    }
  });
  return { dom, win, app, exports, generated, picker: () => lastPicker };
}

test('picker finds filenames and aliases, inserts source-aware links and creates no ghost files', () => {
  const env = environment();
  try {
    const inserted: string[] = [];
    const picker = new env.exports.LinkPicker(env.app, 'Map.mindmap.md', (link: string) => inserted.push(link));
    const programming = picker.getSuggestions('Programming')[0];
    assert.equal(programming.path, 'System/Programming.md');
    picker.onChooseSuggestion(programming);
    picker.onChooseSuggestion(picker.getSuggestions('CODING')[0]);
    const ghost = picker.getSuggestions('Ghost Topic')[0];
    assert.equal(ghost.references, 5);
    picker.onChooseSuggestion(ghost);
    picker.onChooseSuggestion(picker.getSuggestions('Future Topic')[0]);
    assert.deepEqual(inserted, ['[[Programming]]', '[[Programming|Coding]]', '[[Ghost Topic]]', '[[Future Topic]]']);
    assert.equal(env.generated.length, 2);
    assert.equal(env.generated[1][1], 'Map.mindmap.md');
    assert.equal(env.generated[1][3], 'Coding');
    const row = env.win.document.createElement('div');
    picker.renderSuggestion(ghost, row);
    assert.equal(row.querySelector('.tvm-link-title > span')?.textContent, 'Ghost Topic');
    assert.match(row.querySelector('.tvm-link-path')?.textContent ?? '', /5/);
    assert.equal(env.app.vault.getFiles().length, 2);
  } finally { env.dom.window.close(); }
});

test('Enter confirms single-line text and date; held Enter and IME do not submit', async () => {
  const env = environment();
  try {
    const saved: string[] = [];
    for (const mode of [true, 'single-line']) {
      const dialog = new env.exports.TextDialog(env.app, 'Edit', '2026-10-03', async (text: string) => { saved.push(text); }, '', mode);
      dialog.open();
      const input = dialog.contentEl.querySelector('textarea');
      input.dispatchEvent(new env.win.KeyboardEvent('keydown', { key: 'Enter', repeat: true, bubbles: true, cancelable: true }));
      input.dispatchEvent(new env.win.KeyboardEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true, cancelable: true }));
      assert.equal(saved.length, mode === true ? 0 : 1);
      input.dispatchEvent(new env.win.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 0));
      assert.equal(dialog.modalEl.isConnected, false);
    }
    assert.deepEqual(saved, ['2026-10-03', '2026-10-03']);
    const branch = new env.exports.TextDialog(env.app, 'Branch', '- first\n- second', async () => { throw new Error('Unexpected submit'); }, '', false);
    branch.open();
    const input = branch.contentEl.querySelector('textarea');
    const enter = new env.win.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    input.dispatchEvent(enter);
    branch.enter(enter);
    assert.equal(enter.defaultPrevented, false);
    assert.equal(branch.modalEl.isConnected, true);
  } finally { env.dom.window.close(); }
});

test('delete confirmation focuses primary action, ignores repeats and prevents double submission', async () => {
  const env = environment();
  try {
    let complete!: () => void;
    let calls = 0;
    const dialog = new env.exports.ConfirmDialog(env.app, 'Delete?', 'A synthetic branch', async () => {
      calls++;
      await new Promise<void>(resolve => { complete = resolve; });
    });
    dialog.open();
    const primary = dialog.contentEl.querySelectorAll('button')[1];
    assert.equal(env.win.document.activeElement, primary);
    const held = new env.win.KeyboardEvent('keydown', { key: 'Enter', repeat: true, cancelable: true });
    primary.dispatchEvent(held);
    assert.equal(held.defaultPrevented, true);
    dialog.enter(new env.win.KeyboardEvent('keydown', { key: 'Enter', repeat: true, cancelable: true }));
    assert.equal(calls, 0);
    const enter = new env.win.KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    dialog.enter(enter);
    primary.click();
    assert.equal(enter.defaultPrevented, true);
    assert.equal(calls, 1);
    complete();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(dialog.modalEl.isConnected, false);
  } finally { env.dom.window.close(); }
});

test('calendar selects a real date or unknown deadline without writing on cancel', async () => {
  const env = environment();
  try {
    const dates: string[] = [];
    const dialog = new env.exports.DateDialog(env.app, '2026-10-03', async (date: string) => { dates.push(date); });
    dialog.open();
    assert.equal(dialog.contentEl.querySelectorAll('.tvm-calendar-grid button').length, 31);
    dialog.contentEl.querySelector('button[aria-label="2026-10-18"]').click();
    assert.equal(dialog.contentEl.querySelector('input[type=date]').value, '2026-10-18');
    dialog.enter(new env.win.KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    const unknown = new env.exports.DateDialog(env.app, '?', async (date: string) => { dates.push(date); });
    unknown.open(); unknown.enter(new env.win.KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.deepEqual(dates, ['2026-10-18', '?']);
    const cancelled = new env.exports.DateDialog(env.app, '?', async () => { dates.push('wrong'); });
    cancelled.open(); cancelled.close(); assert.equal(dates.length, 2);
  } finally { env.dom.window.close(); }
});

test('desktop bracket completion replaces its captured range and existing closing brackets', async () => {
  const env = environment();
  try {
    const dialog = new env.exports.TextDialog(env.app, 'Edit', 'before []] after', async () => {}, 'Map.mindmap.md');
    dialog.open();
    await new Promise(resolve => setTimeout(resolve, 40));
    const input = dialog.contentEl.querySelector('textarea') as HTMLTextAreaElement;
    input.setSelectionRange(8, 8);
    input.dispatchEvent(new env.win.KeyboardEvent('keydown', { key: '[', bubbles: true, cancelable: true }));
    const picker = env.picker();
    // Obsidian is allowed to close a suggestion modal before invoking its selection callback.
    picker.close();
    picker.onChooseSuggestion(picker.getSuggestions('Programming')[0]);
    await new Promise(resolve => setTimeout(resolve, 10));
    assert.equal(input.value, 'before [[Programming]] after');
    assert.equal(env.win.document.activeElement, input);
  } finally { env.dom.window.close(); }
});

test('Android input completion and cancel preserve the draft and restore focus', async () => {
  const env = environment();
  try {
    const dialog = new env.exports.TextDialog(env.app, 'Edit', 'before ', async () => {});
    dialog.open();
    await new Promise(resolve => setTimeout(resolve, 40));
    const input = dialog.contentEl.querySelector('textarea') as HTMLTextAreaElement;
    input.value = 'before [[';
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new env.win.InputEvent('input', { bubbles: true, inputType: 'insertText', data: '[' }));
    const picker = env.picker();
    assert.ok(picker);
    input.dispatchEvent(new env.win.InputEvent('input', { bubbles: true, inputType: 'insertText', data: '[' }));
    assert.equal(env.picker(), picker, 'Only one picker opens for the same trigger');
    picker.close();
    await new Promise(resolve => setTimeout(resolve, 10));
    assert.equal(input.value, 'before [[');
    assert.equal(env.win.document.activeElement, input);
  } finally { env.dom.window.close(); }
});

test('node editing blocks newlines from Enter, paste and mobile input; branch paste stays multiline', () => {
  const env = environment();
  try {
    const node = new env.exports.TextDialog(env.app, 'Edit', 'first\nsecond', async () => {});
    node.open();
    const input = node.contentEl.querySelector('textarea') as HTMLTextAreaElement;
    assert.equal(input.value, 'first second');
    const enter = new env.win.KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true, cancelable: true });
    input.dispatchEvent(enter);
    assert.equal(enter.defaultPrevented, true);
    input.value = 'one\ntwo\u2028three';
    input.dispatchEvent(new env.win.InputEvent('input', { bubbles: true, inputType: 'insertLineBreak' }));
    assert.equal(input.value, 'one two three');
    input.setSelectionRange(0, input.value.length);
    const paste = new env.win.Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(paste, 'clipboardData', { value: { getData: () => 'a\r\nb' } });
    input.dispatchEvent(paste);
    assert.equal(paste.defaultPrevented, true);
    assert.equal(input.value, 'a b');
    const branch = new env.exports.TextDialog(env.app, 'Paste branch', '- A\n  - B', async () => {}, '', false);
    branch.open();
    const branchInput = branch.contentEl.querySelector('textarea') as HTMLTextAreaElement;
    assert.equal(branchInput.value, '- A\n  - B');
    const line = new env.win.InputEvent('beforeinput', { inputType: 'insertLineBreak', cancelable: true });
    branchInput.dispatchEvent(line);
    assert.equal(line.defaultPrevented, false);
  } finally { env.dom.window.close(); }
});
