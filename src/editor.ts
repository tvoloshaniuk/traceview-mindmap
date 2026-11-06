/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { getLocale, t } from './i18n';
import { App, FuzzySuggestModal, SuggestModal, Modal, Notice, TFile, Setting, parseFrontMatterAliases } from 'obsidian';
import { buildLinkTargets, searchLinkTargets, type LinkTarget } from './link-search';

function primaryEnter(modal: Modal, submit: () => void, multiline = false): void {
  modal.scope.register([], 'Enter', event => {
    if (event.isComposing || event.defaultPrevented) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('button') || (multiline && target?.closest('textarea'))) return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) submit();
    return false;
  });
}

export class MapPicker extends FuzzySuggestModal<TFile> {
  constructor(app: App, private matches: (file: TFile) => boolean, private choose: (file: TFile) => void) { super(app); this.setPlaceholder(t("Find a map…")); }
  getItems(): TFile[] { return this.app.vault.getMarkdownFiles().filter(file => this.matches(file)); }
  getItemText(file: TFile): string { return file.path.replace(/\.md$/, ''); }
  onChooseItem(file: TFile): void { this.choose(file); }
}

export class LinkPicker extends SuggestModal<LinkTarget> {
  private targets: LinkTarget[];
  constructor(app: App, private sourcePath: string, private choose: (link: string) => void, private afterClose: () => void = () => {}) {
    super(app);
    this.limit = 80;
    this.setPlaceholder(t("Note name, alias or new link…"));
    this.setInstructions([{ command: '↑↓', purpose: t("select") }, { command: 'Enter', purpose: t("insert link") }, { command: 'Esc', purpose: t("return to node") }]);
    const files = this.app.vault.getFiles().map(file => ({
      path: file.path,
      basename: file.extension === 'md' ? file.basename : file.name,
      aliases: parseFrontMatterAliases(this.app.metadataCache.getFileCache(file)?.frontmatter) ?? []
    }));
    const unresolved: Record<string, number> = Object.create(null);
    for (const links of Object.values(this.app.metadataCache.unresolvedLinks ?? {})) {
      for (const [target, count] of Object.entries(links)) unresolved[target] = (unresolved[target] ?? 0) + count;
    }
    this.targets = buildLinkTargets(files, unresolved);
  }
  getSuggestions(query: string): LinkTarget[] { return searchLinkTargets(this.targets, query, this.limit); }
  renderSuggestion(target: LinkTarget, el: HTMLElement): void {
    el.addClass('tvm-link-suggestion');
    const title = el.createDiv('tvm-link-title');
    title.createSpan({ text: target.label });
    if (target.kind !== 'file') title.createSpan({ cls: 'tvm-link-badge', text: target.kind === 'ghost' ? t("file not created yet") : t("new link") });
    const detail = target.kind === 'file' ? target.path + (target.alias ? ' · alias' : '')
      : target.kind === 'ghost' ? t("{path} · References: {count}", { path: target.path, count: target.references ?? 1 })
      : t("Insert a link without creating a file");
    el.createDiv({ cls: 'tvm-link-path', text: detail });
  }
  onChooseSuggestion(target: LinkTarget): void {
    if (target.kind === 'file') {
      const file = this.app.vault.getAbstractFileByPath(target.path);
      if (!(file instanceof TFile)) { new Notice(t("The file changed or was deleted. Search again.")); return; }
      this.choose(this.app.fileManager.generateMarkdownLink(file, this.sourcePath, '', target.alias));
    } else this.choose(`[[${target.path}]]`);
  }
  onClose(): void { super.onClose(); window.setTimeout(this.afterClose, 0); }
}

export function attachNodeTools(app: App, sourcePath: string, input: HTMLTextAreaElement, toolbar: HTMLElement): () => void {
  let active = true;
  let picker: LinkPicker | undefined;
  const changed = () => input.dispatchEvent(new input.ownerDocument.defaultView!.Event('input', { bubbles: true }));
  const link = (start = input.selectionStart, end = input.selectionEnd) => {
    if (picker || !active || input.readOnly) return;
    picker = new LinkPicker(app, sourcePath, text => {
      if (active && !input.readOnly) { input.setRangeText(text, start, end, 'end'); changed(); }
    }, () => { picker = undefined; if (active && input.isConnected) input.focus({ preventScroll: true }); });
    picker.open();
  };
  const complete = () => {
    const end = input.selectionStart;
    if (end === input.selectionEnd && input.value.slice(end - 2, end) === '[[') link(end - 2, end + (input.value.slice(end, end + 2) === ']]' ? 2 : 0));
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.isComposing || input.readOnly) return;
    if (event.key === '[' && input.selectionStart === input.selectionEnd && input.value[input.selectionStart - 1] === '[') {
      event.preventDefault(); event.stopPropagation(); input.setRangeText('[', input.selectionStart, input.selectionEnd, 'end'); complete(); changed();
    }
    if ((event.ctrlKey || event.metaKey) && (event.code === 'KeyK' || event.key.toLowerCase() === 'k')) { event.preventDefault(); event.stopPropagation(); link(); }
  };
  const onInput = (event: Event) => { if (!(event as InputEvent).isComposing) complete(); };
  input.addEventListener('keydown', keydown); input.addEventListener('input', onInput);
  const add = (label: string, title: string, action: () => void) => {
    const button = toolbar.ownerDocument.createElement('button'); button.type = 'button';
    button.textContent = label; button.title = title; button.setAttribute('aria-label', title);
    button.onclick = action; toolbar.append(button);
  };
  const insert = (text: string, back = 0) => {
    if (input.readOnly) return;
    input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
    input.selectionStart = input.selectionEnd = input.selectionEnd - back; input.focus(); changed();
  };
  add('[[…]]', t("Link (Ctrl+K)"), () => link());
  add('==', t("Highlight text"), () => {
    const selected = input.value.slice(input.selectionStart, input.selectionEnd); insert(`==${selected}==`, selected ? 0 : 2);
  });
  add('QA', t("Mark as question"), () => insert('==//todo Q: ==', 2));
  return () => { active = false; input.removeEventListener('keydown', keydown); input.removeEventListener('input', onInput); picker?.close(); };
}

export class DateDialog extends Modal {
  private saving = false;
  constructor(app: App, private initial: string, private saveDate: (value: string) => Promise<void>) { super(app); }
  onOpen(): void {
    this.titleEl.setText(t("Step deadline"));
    const input = this.contentEl.createEl('input', { type: 'date', attr: { 'aria-label': t("Date") } });
    input.value = this.initial === '?' ? '' : this.initial;
    const label = this.contentEl.createEl('label', { cls: 'tvm-date-unknown' });
    const unknown = label.createEl('input', { type: 'checkbox' }); unknown.checked = this.initial === '?';
    label.append(t(" Unknown deadline (?)"));
    const calendar = this.contentEl.createDiv('tvm-calendar');
    let month = input.value ? new Date(`${input.value}T12:00:00`) : new Date();
    month = new Date(month.getFullYear(), month.getMonth(), 1);
    const dateText = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const draw = () => {
      calendar.empty();
      const header = calendar.createDiv('tvm-calendar-header');
      const move = (offset: number) => { month = new Date(month.getFullYear(), month.getMonth() + offset, 1); draw(); };
      header.createEl('button', { text: '‹', attr: { type: 'button', 'aria-label': t("Previous month") } }).onclick = () => move(-1);
      header.createSpan({ text: month.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' }) });
      header.createEl('button', { text: '›', attr: { type: 'button', 'aria-label': t("Next month") } }).onclick = () => move(1);
      const grid = calendar.createDiv('tvm-calendar-grid');
      for (const day of [t("Mon"), t("Tue"), t("Wed"), t("Thu"), t("Fri"), t("Sat"), t("Sun")]) grid.createSpan({ text: day });
      for (let blank = 0; blank < (month.getDay() + 6) % 7; blank++) grid.createSpan();
      const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= days; day++) {
        const value = dateText(new Date(month.getFullYear(), month.getMonth(), day));
        const button = grid.createEl('button', { text: String(day), attr: { type: 'button', 'aria-label': value, 'aria-pressed': String(!unknown.checked && input.value === value) } });
        button.classList.toggle('is-selected', !unknown.checked && input.value === value);
        button.onclick = () => { input.value = value; unknown.checked = false; draw(); input.focus(); };
      }
    };
    input.onchange = () => { unknown.checked = false; if (input.value) { const date = new Date(`${input.value}T12:00:00`); month = new Date(date.getFullYear(), date.getMonth(), 1); } draw(); };
    unknown.onchange = draw;
    const submit = async () => {
      if (this.saving) return;
      this.saving = true;
      try { await this.saveDate(unknown.checked ? '?' : input.value); this.close(); }
      catch (error) { new Notice(error instanceof Error ? error.message : String(error)); }
      finally { this.saving = false; }
    };
    new Setting(this.contentEl).addButton(button => button.setButtonText(t("Cancel")).onClick(() => this.close())).addButton(button => button.setButtonText(t("Save")).setCta().onClick(() => { void submit(); }));
    primaryEnter(this, () => { void submit(); });
    draw(); input.focus();
  }
}

export class TextDialog extends Modal {
  private unmount?: () => void;
  private input!: HTMLTextAreaElement;
  private saving = false;
  constructor(app: App, private title: string, private initial: string, private saveText: (text: string) => Promise<void>, private sourcePath = '', private nodeEditor: boolean | 'single-line' = true) { super(app); }
  onOpen(): void {
    this.titleEl.setText(this.title);
    this.contentEl.addClass('tvm-editor');
    this.input = this.contentEl.createEl('textarea', { attr: { 'aria-label': this.title, rows: '5', spellcheck: 'true' } });
    const singleLine = (text: string) => text.replace(/[\r\n\u2028\u2029]+/g, ' ');
    this.input.value = this.nodeEditor ? singleLine(this.initial) : this.initial;
    const insert = (value: string, back = 0) => {
      this.input.setRangeText(value, this.input.selectionStart, this.input.selectionEnd, 'end');
      this.input.selectionStart = this.input.selectionEnd = this.input.selectionEnd - back;
      this.input.focus();
    };
    if (this.nodeEditor) {
      this.input.addEventListener('beforeinput', event => {
        if (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak') event.preventDefault();
      });
      const normalize = () => {
        const before = this.input.value;
        const start = singleLine(before.slice(0, this.input.selectionStart)).length;
        const end = singleLine(before.slice(0, this.input.selectionEnd)).length;
        if (before !== singleLine(before)) {
          this.input.value = singleLine(before);
          this.input.setSelectionRange(start, end);
        }
      };
      this.input.addEventListener('input', event => { if (!(event as InputEvent).isComposing) normalize(); });
      this.input.addEventListener('compositionend', normalize);
      this.input.addEventListener('paste', event => {
        const text = event.clipboardData?.getData('text/plain');
        if (text === undefined || !/[\r\n\u2028\u2029]/.test(text)) return;
        event.preventDefault();
        this.input.setRangeText(singleLine(text), this.input.selectionStart, this.input.selectionEnd, 'end');
      });
    }
    if (this.nodeEditor === true) this.unmount = attachNodeTools(this.app, this.sourcePath, this.input, this.contentEl.createDiv('tvm-editor-tools'));
    const note = this.contentEl.createEl('p', { text: this.nodeEditor ? t("Enter to save, Esc to cancel.") : t("Ctrl+Enter to confirm, Esc to cancel.") });
    note.addClass('setting-item-description');
    new Setting(this.contentEl).addButton(button => button.setButtonText(t("Cancel")).onClick(() => this.close())).addButton(button => button.setButtonText(t("Save")).setCta().onClick(() => { void this.submit(); }));
    primaryEnter(this, () => { void this.submit(); }, !this.nodeEditor);
    this.input.addEventListener('keydown', event => {
      if (event.isComposing || event.defaultPrevented) return;
      if (this.nodeEditor && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat && !event.shiftKey && !event.altKey) void this.submit();
      } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); event.stopPropagation(); if (!event.repeat) void this.submit(); }
    });
    setTimeout(() => { this.input.focus(); this.input.selectionStart = this.input.selectionEnd = this.input.value.length; }, 30);
  }
  private async submit(): Promise<void> {
    if (this.saving) return;
    this.saving = true;
    try { await this.saveText(this.nodeEditor ? this.input.value.replace(/[\r\n\u2028\u2029]+/g, ' ') : this.input.value); this.close(); }
    catch (error) { new Notice(error instanceof Error ? error.message : String(error), 8000); }
    finally { this.saving = false; }
  }
  onClose(): void { this.unmount?.(); this.contentEl.empty(); }
}

export class ConfirmDialog extends Modal {
  private saving = false;
  constructor(app: App, private title: string, private detail: string, private confirm: () => Promise<void>, private options: { label?: string; focusConfirm?: boolean } = {}) { super(app); }
  onOpen(): void {
    this.titleEl.setText(this.title);
    this.contentEl.createEl('p', { text: this.detail });
    new Setting(this.contentEl).addButton(button => {
      button.setButtonText(t("Cancel")).onClick(() => this.close());
      if (this.options.focusConfirm === false) {
        button.buttonEl.focus();
        window.setTimeout(() => { if (button.buttonEl.isConnected) button.buttonEl.focus(); }, 0);
      }
    }).addButton(button => {
      button.setButtonText(this.options.label ?? t("Delete branch")).setWarning().onClick(() => { void this.submit(); });
      if (this.options.focusConfirm !== false) {
        button.buttonEl.focus();
        window.setTimeout(() => { if (button.buttonEl.isConnected) button.buttonEl.focus(); }, 0);
      }
      button.buttonEl.addEventListener('keydown', event => { if (event.key === 'Enter' && event.repeat) event.preventDefault(); });
    });
    if (this.options.focusConfirm !== false) primaryEnter(this, () => { void this.submit(); });
  }
  private async submit(): Promise<void> {
    if (this.saving) return;
    this.saving = true;
    try { await this.confirm(); this.close(); }
    catch (error) { new Notice(String(error)); }
    finally { this.saving = false; }
  }
}
