/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import { Editor, type EditorPosition, type EditorSelection, type EditorSelectionOrCaret, type EditorRange, type EditorTransaction, type EditorCommandName } from 'obsidian';
import { singleLine } from './inline';

/** Public Editor bridge for commands that operate on text, cursor and selection.
 * It deliberately does not pretend to be MarkdownView or CodeMirror. */
export class InputEditor extends Editor {
  private past: string[] = [];
  private future: string[] = [];
  private previous: string;
  private restoring = false;
  private alive = true;
  private changed = () => {
    const value = this.getValue();
    if (!this.restoring && value !== this.previous) { this.past.push(this.previous); if (this.past.length > 50) this.past.shift(); this.future = []; }
    this.previous = value;
  };
  constructor(private input: HTMLTextAreaElement) { super(); this.previous = input.value; input.addEventListener('input', this.changed); }
  dispose(): void { this.alive = false; this.input.removeEventListener('input', this.changed); }
  refresh(): void {}
  getValue(): string { return singleLine(this.input.value); }
  setValue(text: string): void { this.replaceRange(text, {line:0,ch:0}, {line:0,ch:this.input.value.length}); }
  getLine(line: number): string { return line === 0 ? this.getValue() : ''; }
  lineCount(): number { return 1; }
  lastLine(): number { return 0; }
  getSelection(): string { return this.getValue().slice(this.input.selectionStart, this.input.selectionEnd); }
  getRange(from: EditorPosition, to: EditorPosition): string { return this.getValue().slice(this.posToOffset(from), this.posToOffset(to)); }
  replaceSelection(text: string): void { this.replaceRange(text, this.getCursor('from'), this.getCursor('to')); }
  replaceRange(text: string, from: EditorPosition, to = from): void {
    if (!this.alive || this.input.readOnly) return;
    const start = this.posToOffset(from), end = this.posToOffset(to);
    this.input.setRangeText(singleLine(text), Math.min(start,end), Math.max(start,end), 'end'); this.notify();
  }
  getCursor(side: 'from' | 'to' | 'head' | 'anchor' = 'head'): EditorPosition {
    const backward = this.input.selectionDirection === 'backward';
    const start = side === 'from' || (side === 'head' && backward) || (side === 'anchor' && !backward);
    return { line:0, ch:start ? this.input.selectionStart : this.input.selectionEnd };
  }
  listSelections(): EditorSelection[] { return [{anchor:this.getCursor('anchor'),head:this.getCursor('head')}]; }
  setSelection(anchor: EditorPosition, head = anchor): void {
    const a=this.posToOffset(anchor), h=this.posToOffset(head); this.input.setSelectionRange(Math.min(a,h),Math.max(a,h),h<a?'backward':'forward');
  }
  setSelections(ranges: EditorSelectionOrCaret[], main = 0): void {
    if (ranges.length > 1) throw new Error(t("Multiple cursors are available in source Markdown."));
    if (ranges[main]) this.setSelection(ranges[main].anchor,ranges[main].head);
  }
  focus(): void { if (this.alive) this.input.focus({preventScroll:true}); }
  blur(): void { this.input.blur(); }
  hasFocus(): boolean { return this.input.ownerDocument.activeElement === this.input; }
  getScrollInfo(): {top:number;left:number} { return {top:this.input.scrollTop,left:this.input.scrollLeft}; }
  scrollTo(x?: number | null,y?: number | null): void { if(x!=null)this.input.scrollLeft=x;if(y!=null)this.input.scrollTop=y; }
  scrollIntoView(_range: EditorRange): void { this.focus(); }
  undo(): void { this.restore(this.past,this.future); }
  redo(): void { this.restore(this.future,this.past); }
  private restore(from: string[], to: string[]): void {
    if (!this.alive || this.input.readOnly || !from.length) return;
    this.restoring=true;to.push(this.getValue());this.input.value=from.pop()!;this.notify();this.restoring=false;
  }
  exec(command: EditorCommandName): void {
    const cursor=this.getCursor();
    if(command==='goStart')this.setSelection({line:0,ch:0});
    else if(command==='goEnd')this.setSelection({line:0,ch:this.getValue().length});
    else if(command==='goLeft'||command==='goRight')this.setSelection({line:0,ch:cursor.ch+(command==='goLeft'?-1:1)});
    else if(command==='newlineAndIndent') return;
    else throw new Error(t("This command requires the source Markdown editor."));
  }
  transaction(tx: EditorTransaction): void {
    if (tx.selections && tx.selections.length > 1) throw new Error(t("Multiple cursors are available in source Markdown."));
    if (tx.replaceSelection !== undefined) this.replaceSelection(tx.replaceSelection);
    if (tx.changes) {
      let value=this.getValue();
      const changes=tx.changes.map(change=>({from:this.posToOffset(change.from),to:this.posToOffset(change.to??change.from),text:singleLine(change.text)})).sort((a,b)=>b.from-a.from);
      for(const change of changes)value=value.slice(0,change.from)+change.text+value.slice(change.to);
      this.setValue(value);
    }
    const selection=tx.selections?.[0]??tx.selection;if(selection)this.setSelection(selection.from,selection.to);
  }
  wordAt(pos: EditorPosition): EditorRange | null {
    const value=this.getValue(), offset=this.posToOffset(pos);let from=offset,to=offset;
    while(from>0&&!/\s/.test(value[from-1]))from--;while(to<value.length&&!/\s/.test(value[to]))to++;
    return from===to?null:{from:{line:0,ch:from},to:{line:0,ch:to}};
  }
  posToOffset(pos: EditorPosition): number { return pos.line>0?this.getValue().length:Math.max(0,Math.min(this.getValue().length,pos.ch)); }
  offsetToPos(offset: number): EditorPosition { return {line:0,ch:Math.max(0,Math.min(this.getValue().length,offset))}; }
  private notify(): void { this.input.dispatchEvent(new this.input.ownerDocument.defaultView!.Event('input',{bubbles:true})); }
}
