/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
export interface InlineDriver {
  element: HTMLElement;
  focus: () => void;
  resize: () => void;
  setReadOnly: (value: boolean) => void;
  suggestionActive: () => boolean;
  dispose: () => void;
}

export interface InlineOptions {
  multiline?: boolean;
  emptyFallback?: string;
  allowEmpty?: boolean;
  createAbove?: (event: KeyboardEvent) => boolean;
  save: (text: string) => Promise<void>;
  cancel: () => void;
  resize: () => void;
  mount?: (input: HTMLTextAreaElement, tools: HTMLElement, inline: InlineEditor) => (() => void) | InlineDriver;
}

export const singleLine = (text: string): string => text.replace(/[\r\n\u2028\u2029]+/g, ' ');
let nextLabelId = 0;

/** The draft lives in this element, never in the Markdown document. */
export class InlineEditor {
  requestMultiline?: () => void;
  readonly host: HTMLDivElement;
  readonly input: HTMLTextAreaElement;
  get multiline(): boolean { return !!this.options.multiline; }
  private normalize(text: string): string { return this.multiline ? text.replace(/\r\n?/g, "\n") : singleLine(text); }
  private error: HTMLDivElement;
  private saving = false;
  private disposed = false;
  private unmount?: () => void;
  private driver?: InlineDriver;
  private initial: string;
  private confirmation?: HTMLDivElement;
  constructor(document: Document, initial: string, private options: InlineOptions) {
    this.host = document.createElement('div');
    this.host.className = 'tvm-inline-editor';
    this.input = document.createElement('textarea');
    this.input.className = 'tvm-inline-input';
    this.input.rows = this.multiline ? 5 : 1;
    // Obsidian shows every aria-label as a hover tooltip, so name the field through a hidden label instead.
    const label = document.createElement('span');
    label.id = 'tvm-node-text-label-' + (++nextLabelId); label.hidden = true; label.textContent = t("Node text");
    this.input.setAttribute('aria-labelledby', label.id);
    this.input.setAttribute('enterkeyhint', this.multiline ? 'enter' : 'done');
    this.initial = this.normalize(initial);
    this.input.value = this.initial;
    this.host.append(this.input, label);
    const tools = document.createElement('div');
    tools.className = 'tvm-inline-tools';
    this.host.append(tools);
    const mounted = options.mount?.(this.input, tools, this);
    if (typeof mounted === 'function') this.unmount = mounted;
    else if (mounted) { this.driver = mounted; this.unmount = () => mounted.dispose(); }
    const button = (label: string, title: string, action: () => void) => {
      const el = document.createElement('button'); el.type = 'button';
      el.textContent = label; el.title = title; el.setAttribute('aria-label', title);
      el.onclick = action; tools.append(el); return el;
    };
    button('✓', t(this.multiline ? "Save (Ctrl/Cmd+Enter)" : "Save (Enter)"), () => { void this.submit(); }).classList.add('mod-cta');
    button('×', t("Cancel (Escape)"), () => this.cancel());
    this.error = document.createElement('div');
    this.error.className = 'tvm-inline-error'; this.error.setAttribute('role', 'alert');
    this.host.append(this.error);
    this.input.addEventListener('beforeinput', event => {
      if (!this.multiline && (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak')) event.preventDefault();
    });
    const normalize = () => {
      this.dismissConfirmation();
      const value = this.input.value;
      const start = this.normalize(value.slice(0, this.input.selectionStart)).length;
      const end = this.normalize(value.slice(0, this.input.selectionEnd)).length;
      if (value !== this.normalize(value)) { this.input.value = this.normalize(value); this.input.setSelectionRange(start, end); }
      this.resize();
    };
    this.input.addEventListener('input', event => { if (!(event as InputEvent).isComposing) normalize(); });
    this.input.addEventListener('compositionend', normalize);
    this.input.addEventListener('paste', event => {
      if (event.defaultPrevented || this.input.readOnly || this.multiline) return;
      const text = event.clipboardData?.getData('text/plain');
      if (text === undefined || !/[\r\n\u2028\u2029]/.test(text)) return;
      event.preventDefault();
      this.input.setRangeText(singleLine(text), this.input.selectionStart, this.input.selectionEnd, 'end');
      this.input.dispatchEvent(new document.defaultView!.Event('input', { bubbles: true }));
    });
    this.host.addEventListener('keydown', event => this.handleKeydown(event));
  }
  handleKeydown(event: KeyboardEvent): boolean {
    if (event.defaultPrevented || event.isComposing || this.driver?.suggestionActive()) return false;
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) {
        if (this.confirmation) this.dismissConfirmation(); else this.cancel();
      }
      return true;
    }
    if (this.confirmation && event.key === 'Enter') {
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat && !event.shiftKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        if (target?.closest('.tvm-inline-keep')) this.dismissConfirmation();
        else if (target?.closest('.tvm-inline-discard')) this.options.cancel();
        else this.focus();
      }
      return true;
    }
    if (event.key !== 'Enter' || (event.target as HTMLElement | null)?.closest('button')) return false;
    if (this.multiline && !(event.ctrlKey || event.metaKey)) return false;
    if (!this.multiline && event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey && this.requestMultiline) {
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) this.requestMultiline();
      return true;
    }
    if (!this.multiline && event.shiftKey && this.options.createAbove?.(event)) {
      event.preventDefault(); event.stopPropagation();
      return true;
    }
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat && !event.shiftKey && !event.altKey) void this.submit();
    return true;
  }
  focus(): void {
    const confirmation = this.confirmation?.querySelector<HTMLButtonElement>('.tvm-inline-keep');
    if (confirmation) confirmation.focus({ preventScroll: true });
    else if (this.driver) this.driver.focus();
    else this.input.focus({ preventScroll: true });
  }
  fitHeight(node: HTMLElement, available: number): void {
    const field = this.driver?.element ?? this.input;
    const surroundingHeight = node.offsetHeight - field.offsetHeight;
    field.style.maxHeight = Math.max(26, Math.floor(available - surroundingHeight)) + 'px';
  }
  resize(): void {
    if (this.driver) this.driver.resize();
    else { this.input.style.height = 'auto'; this.input.style.height = `${Math.max(26, this.input.scrollHeight)}px`; }
    this.options.resize();
  }
  reportError(error: unknown): void {
    this.error.textContent = error instanceof Error ? error.message : String(error); this.resize(); this.focus();
  }
  cancelIfUnchanged(): boolean {
    if (this.saving || this.disposed || this.input.readOnly || this.input.getAttribute('aria-busy') === 'true' || this.normalize(this.input.value) !== this.initial) return false;
    this.options.cancel(); return true;
  }
  cancel(): void {
    if (this.saving || this.disposed) return;
    if (this.confirmation) { this.focus(); return; }
    if (this.normalize(this.input.value) === this.initial && this.input.getAttribute('aria-busy') !== 'true') {
      this.options.cancel(); return;
    }
    const document = this.host.ownerDocument;
    const confirmation = document.createElement('div');
    confirmation.className = 'tvm-inline-confirm';
    confirmation.setAttribute('role', 'alertdialog');
    const warning = t("Close the editor and discard your changes?");
    confirmation.setAttribute('aria-label', warning);
    const text = document.createElement('p'); text.textContent = warning; confirmation.append(text);
    const keep = document.createElement('button'); keep.type = 'button'; keep.className = 'tvm-inline-keep';
    keep.textContent = t("Continue editing"); keep.onclick = () => this.dismissConfirmation();
    const discard = document.createElement('button'); discard.type = 'button'; discard.className = 'tvm-inline-discard mod-warning';
    discard.textContent = t("Discard changes"); discard.onclick = () => this.options.cancel();
    confirmation.append(keep, discard);
    this.confirmation = confirmation; this.host.append(confirmation); this.resize(); this.focus();
  }
  private dismissConfirmation(): void {
    if (!this.confirmation) return;
    this.confirmation.remove(); this.confirmation = undefined;
    this.resize(); this.focus();
  }
  dispose(): void { this.disposed = true; this.unmount?.(); this.host.remove(); }
  async submit(): Promise<void> {
    if (this.saving || this.disposed || this.input.readOnly || this.confirmation) return;
    const input = this.normalize(this.input.value);
    const text = input.trim() ? input : this.options.emptyFallback ?? '';
    if (!text.trim() && !this.options.allowEmpty) { this.error.textContent = t("A node cannot be empty."); this.resize(); return; }
    this.saving = true; this.input.readOnly = true; this.driver?.setReadOnly(true); this.error.textContent = '';
    for (const button of this.host.querySelectorAll('button')) button.disabled = true;
    try { await this.options.save(text); }
    catch (error) {
      if (!this.disposed) { this.error.textContent = error instanceof Error ? error.message : String(error); this.resize(); this.focus(); }
    } finally {
      this.saving = false; this.input.readOnly = false; if (!this.disposed) this.driver?.setReadOnly(false);
      for (const button of this.host.querySelectorAll('button')) button.disabled = false;
    }
  }
}
