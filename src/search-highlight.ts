/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
const editors = new WeakMap<Document, Map<HTMLElement, Range[]>>();
const highlightName = 'traceview-search';
const escaped = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function highlightRenderedSearch(element: HTMLElement, query: string): void {
  if (!query.trim()) return;
  const walker = element.ownerDocument.createTreeWalker(element, 4), nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    if (node.parentElement?.closest('script, style, button, .tvm-inline-editor')) continue;
    for (const match of [...node.data.matchAll(new RegExp(escaped(query.trim()), 'giu'))].reverse()) {
      const text = node.splitText(match.index!); text.splitText(match[0].length);
      const mark = element.ownerDocument.createElement('mark'); mark.className = 'tvm-search-match';
      text.replaceWith(mark); mark.append(text);
    }
  }
}

export function highlightSearchText(element: HTMLElement, text: string, query: string): void {
  element.replaceChildren();
  if (!query.trim()) { element.textContent = text; return; }
  let offset = 0;
  for (const match of text.matchAll(new RegExp(escaped(query.trim()), 'giu'))) {
    element.append(text.slice(offset, match.index));
    const mark = element.ownerDocument.createElement('mark');
    mark.className = 'tvm-search-match'; mark.textContent = match[0]; element.append(mark);
    offset = match.index! + match[0].length;
  }
  element.append(text.slice(offset));
}

/** Paint ranges without inserting elements into CodeMirror's managed DOM. */
export function nativeSearchHighlighter(host: HTMLElement): {setQuery(query: string): void; dispose(): void} {
  const doc = host.ownerDocument;
  const win = doc.defaultView as (Window & {MutationObserver: typeof MutationObserver; Highlight?: new (...ranges: Range[]) => unknown; CSS?: {highlights?: {set(key: string, value: unknown): void; delete(key: string): void}}}) | null;
  const registry = win?.CSS?.highlights, Highlight = win?.Highlight;
  if (!win || !registry || !Highlight) return {setQuery() {}, dispose() {}};
  let query = '', frame: number | undefined, disposed = false;
  const active = editors.get(doc) ?? new Map<HTMLElement, Range[]>(); editors.set(doc, active);
  const publish = () => {
    const ranges = [...active.values()].flat();
    if (ranges.length) registry.set(highlightName, new Highlight(...ranges));
    else registry.delete(highlightName);
  };
  const paint = () => {
    frame = undefined;
    if (disposed || !query || !host.isConnected) return;
    const root = host.querySelector('.cm-content') ?? host;
    const walker = doc.createTreeWalker(root, 4);
    const segments: {node: Text; start: number; end: number}[] = [];
    let text = '', previousLine: Element | null = null;
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!node.data || node.parentElement?.closest('button, input, textarea, script, style, .cm-widgetBuffer, [aria-hidden="true"]')) continue;
      const line = node.parentElement?.closest('.cm-line') ?? null;
      if (segments.length && line !== previousLine) text += '\n';
      previousLine = line;
      const start = text.length; text += node.data; segments.push({node, start, end: text.length});
    }
    const ranges: Range[] = [];
    let index = 0;
    for (const match of text.matchAll(new RegExp(escaped(query), 'giu'))) {
      const from = match.index!, to = from + match[0].length;
      while (index < segments.length && segments[index].end <= from) index++;
      let last = index;
      while (last + 1 < segments.length && segments[last].end < to) last++;
      if (!segments[index] || !segments[last]) continue;
      const range = doc.createRange();
      range.setStart(segments[index].node, from - segments[index].start);
      range.setEnd(segments[last].node, to - segments[last].start); ranges.push(range);
    }
    active.set(host, ranges); publish();
  };
  const schedule = () => { if (!disposed && query && frame === undefined) frame = win.requestAnimationFrame(paint); };
  const observer = new win.MutationObserver(schedule);
  return {
    setQuery(value) {
      query = value.trim(); observer.disconnect();
      if (frame !== undefined) { win.cancelAnimationFrame(frame); frame = undefined; }
      if (!query) { active.delete(host); publish(); return; }
      observer.observe(host, {subtree: true, childList: true, characterData: true}); schedule();
    },
    dispose() {
      disposed = true; observer.disconnect();
      if (frame !== undefined) win.cancelAnimationFrame(frame);
      active.delete(host); publish();
    },
  };
}

export function textareaSearchHighlighter(input: HTMLTextAreaElement): {setQuery(query: string): void; dispose(): void} {
  const win = input.ownerDocument.defaultView!;
  const overlay = input.ownerDocument.createElement('div');
  overlay.className = 'tvm-inline-search-overlay'; overlay.setAttribute('aria-hidden', 'true'); overlay.hidden = true;
  input.after(overlay);
  let query = '', frame: number | undefined;
  const paint = () => {
    frame = undefined;
    if (!query || !input.isConnected || input.hidden) return;
    const style = win.getComputedStyle(input);
    for (const key of ['font', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textIndent', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'] as const) overlay.style[key] = style[key];
    const scrollbar = Math.max(0, input.offsetWidth - input.clientWidth - parseFloat(style.borderLeftWidth || '0') - parseFloat(style.borderRightWidth || '0'));
    overlay.style.paddingRight = (parseFloat(style.paddingRight || '0') + scrollbar) + 'px';
    Object.assign(overlay.style, {left: input.offsetLeft + 'px', top: input.offsetTop + 'px', width: input.offsetWidth + 'px', height: input.offsetHeight + 'px'});
    highlightSearchText(overlay, input.value + '\n', query);
    overlay.scrollTop = input.scrollTop; overlay.scrollLeft = input.scrollLeft;
  };
  const schedule = () => { if (query && frame === undefined) frame = win.requestAnimationFrame(paint); };
  const observer = win.ResizeObserver ? new win.ResizeObserver(schedule) : undefined;
  input.addEventListener('input', schedule); input.addEventListener('scroll', schedule);
  return {
    setQuery(value) {
      query = value.trim(); overlay.hidden = !query; observer?.disconnect();
      if (query) { observer?.observe(input); schedule(); }
      else { overlay.replaceChildren(); if (frame !== undefined) { win.cancelAnimationFrame(frame); frame = undefined; } }
    },
    dispose() {
      observer?.disconnect(); input.removeEventListener('input', schedule); input.removeEventListener('scroll', schedule);
      if (frame !== undefined) win.cancelAnimationFrame(frame); overlay.remove();
    },
  };
}
