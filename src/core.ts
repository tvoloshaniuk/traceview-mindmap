/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { DropPosition, MapDocument, MapNode, Step } from './types';

interface LineInfo { start: number; end: number; after: number; text: string }

function sourceLines(source: string): LineInfo[] {
  const result: LineInfo[] = [];
  const endings = /\r\n|\n|\r/g;
  let start = 0;
  for (const match of source.matchAll(endings)) {
    const end = match.index!;
    result.push({ start, end, after: end + match[0].length, text: source.slice(start, end) });
    start = end + match[0].length;
  }
  result.push({ start, end: source.length, after: source.length, text: source.slice(start) });
  return result;
}

function width(indent: string): number {
  let columns = 0;
  for (const ch of indent) columns += ch === '\t' ? 4 - columns % 4 : 1;
  return columns;
}

function anchor(text: string): { text: string; suffix: string; blockId?: string } {
  const match = /([ \t]+\^([A-Za-z0-9][A-Za-z0-9-]*)[ \t]*)$/.exec(text);
  return match ? { text: text.slice(0, match.index), suffix: match[1], blockId: match[2] }
    : { text, suffix: '' };
}

function identity(text: string): string {
  return text.replace(/^\[[^\]]\]\s*/, '')
    .replace(/^#step\s+(?:\d+(?:\.\d+)*[a-z]*\)|\))\s*/i, '#step ')
    .replace(/\s+/g, ' ').trim();
}

function hash(value: string): string {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}

/** Read an outline without normalizing or rewriting any source bytes. */
export function parseMap(source: string, previous?: MapDocument): MapDocument {
  const lines = sourceLines(source).map(line => line.text);
  const doc: MapDocument = { source, lines, eol: /\r\n|\n|\r/.exec(source)?.[0] ?? '\n', nodes: [], roots: [], byId: new Map() };
  const headings: { node: MapNode; level: number }[] = [];
  const bullets: MapNode[] = [];
  const parents = new Map<MapNode, MapNode | null>();
  let frontmatter = lines[0]?.replace(/^\uFEFF/, '') === '---';
  let fence: { marker: string; length: number } | null = null;
  for (let line = 0; line < lines.length; line++) {
    const raw = lines[line];
    if (frontmatter) {
      if (line > 0 && /^(?:---|\.\.\.)[ \t]*$/.test(raw)) frontmatter = false;
      continue;
    }
    const fenceMatch = /^[ \t]*(?:(?:[-+*]|\d+[.)])[ \t]+)?(`{3,}|~{3,})(.*)$/.exec(raw);
    if (fence) {
      const closing = /^[ \t]*(`{3,}|~{3,})[ \t]*$/.exec(raw);
      if (closing && closing[1][0] === fence.marker && closing[1].length >= fence.length) fence = null;
      continue;
    }
    if (fenceMatch) { fence = { marker: fenceMatch[1][0], length: fenceMatch[1].length }; continue; }
    const heading = /^( {0,3})(#{1,6})([ \t]+)(.*)$/.exec(raw);
    const bullet = /^([ \t]*)([-+*]|\d+[.)])([ \t]+)(.*)$/.exec(raw);
    let node: MapNode;
    let parent: MapNode | null;
    if (heading) {
      bullets.length = 0;
      const level = heading[2].length;
      while (headings.length && headings[headings.length - 1].level >= level) headings.pop();
      if (level === 1 && /^\/[ \t]*(?:#+[ \t]*)?$/.test(heading[4])) { headings.length = 0; continue; }
      const content = anchor(heading[4]);
      node = { id: '', text: content.text, blockId: content.blockId, line, endLine: line, indent: level, kind: 'heading', prefix: heading[1] + heading[2] + heading[3], parentId: null, children: [] };
      parent = headings[headings.length - 1]?.node ?? null;
      headings.push({ node, level });
    } else if (bullet && !/^([ \t]*)([-*_])(?:[ \t]*\2){2,}[ \t]*$/.test(raw)) {
      const indent = width(bullet[1]);
      while (bullets.length && bullets[bullets.length - 1].indent >= indent) bullets.pop();
      const content = anchor(bullet[4]);
      node = { id: '', text: content.text, blockId: content.blockId, line, endLine: line, indent, kind: 'bullet', prefix: bullet[1] + bullet[2] + bullet[3], parentId: null, children: [] };
      parent = bullets[bullets.length - 1] ?? headings[headings.length - 1]?.node ?? null;
      bullets.push(node);
    } else continue;
    parents.set(node, parent);
    doc.nodes.push(node);
  }
  const blocks = new Map<string, number>();
  for (const node of doc.nodes) if (node.blockId) blocks.set(node.blockId, (blocks.get(node.blockId) ?? 0) + 1);
  const occurrence = new Map<string, number>();
  for (const node of doc.nodes) {
    const parent = parents.get(node)!;
    const key = `${parent?.id ?? '/'}|${identity(node.text)}`;
    const count = (occurrence.get(key) ?? 0) + 1;
    occurrence.set(key, count);
    let id = node.blockId && blocks.get(node.blockId) === 1 ? `block:${node.blockId}` : `node:${hash(key)}:${count}`;
    while (doc.byId.has(id)) id += '_';
    node.id = id;
    node.parentId = parent?.id ?? null;
    if (parent) parent.children.push(id); else doc.roots.push(id);
    doc.byId.set(id, node);
  }
  const open: MapNode[] = [];
  for (const node of doc.nodes) {
    while (open.length && open[open.length - 1].id !== node.parentId) {
      const done = open.pop()!;
      done.endLine = node.line - 1;
      while (done.endLine > done.line && !lines[done.endLine].trim()) done.endLine--;
    }
    open.push(node);
  }
  for (const done of open) {
    done.endLine = lines.length - 1;
    while (done.endLine > done.line && !lines[done.endLine].trim()) done.endLine--;
  }
  if (previous) reconcileIds(previous, doc);
  return doc;
}

function reconcileIds(previous: MapDocument, next: MapDocument): void {
  const matched = new Map<MapNode, string>();
  const used = new Set<string>();
  const oldByLine = new Map(previous.nodes.map(node => [node.line, node]));
  let prefix = 0;
  while (prefix < previous.lines.length && prefix < next.lines.length && previous.lines[prefix] === next.lines[prefix]) prefix++;
  let suffix = 0;
  while (suffix < previous.lines.length - prefix && suffix < next.lines.length - prefix && previous.lines[previous.lines.length - 1 - suffix] === next.lines[next.lines.length - 1 - suffix]) suffix++;
  const oldBranches = new Map<string, MapNode[]>(), newBranches = new Map<string, MapNode[]>();
  for (const [doc, groups] of [[previous, oldBranches], [next, newBranches]] as const) for (const node of doc.nodes) {
    if (doc === previous ? used.has(node.id) : matched.has(node)) continue;
    const key = doc.lines.slice(node.line, node.endLine + 1).join('\n');
    groups.set(key, [...(groups.get(key) ?? []), node]);
  }
  for (const [key, nodes] of newBranches) {
    if (matched.has(nodes[0])) continue;
    const old = oldBranches.get(key);
    if (nodes.length === 1 && old?.length === 1) for (const node of next.nodes) {
      if (node.line < nodes[0].line || node.line > nodes[0].endLine || matched.has(node)) continue;
      const prior = oldByLine.get(old[0].line + node.line - nodes[0].line);
      if (prior && !used.has(prior.id)) { matched.set(node, prior.id); used.add(prior.id); }
    }
  }
  for (const node of next.nodes) {
    if (matched.has(node)) continue;
    const oldLine = node.line < prefix ? node.line : node.line >= next.lines.length - suffix ? node.line + previous.lines.length - next.lines.length : -1;
    const old = oldByLine.get(oldLine);
    if (old && old.kind === node.kind && !used.has(old.id)) { matched.set(node, old.id); used.add(old.id); }
  }
  for (const node of next.nodes) if (!matched.has(node) && !used.has(node.id) && previous.byId.has(node.id)) { matched.set(node, node.id); used.add(node.id); }
  const oldByText = new Map<string, MapNode[]>();
  const newByText = new Map<string, MapNode[]>();
  for (const node of previous.nodes) if (!used.has(node.id)) {
    const key = `${node.kind}|${identity(node.text)}`;
    oldByText.set(key, [...(oldByText.get(key) ?? []), node]);
  }
  for (const node of next.nodes) if (!matched.has(node)) {
    const key = `${node.kind}|${identity(node.text)}`;
    newByText.set(key, [...(newByText.get(key) ?? []), node]);
  }
  for (const [key, nodes] of newByText) {
    const old = oldByText.get(key);
    if (nodes.length === 1 && old?.length === 1 && !nodes[0].blockId && !old[0].blockId) {
      matched.set(nodes[0], old[0].id); used.add(old[0].id);
    }
  }
  if (previous.nodes.length === next.nodes.length) for (let index = 0; index < next.nodes.length; index++) {
    const node = next.nodes[index], old = previous.nodes[index];
    if (!matched.has(node) && !used.has(old.id) && !node.blockId && !old.blockId && node.line === old.line && node.kind === old.kind && node.prefix === old.prefix && node.children.length === old.children.length) {
      matched.set(node, old.id); used.add(old.id);
    }
  }
  for (const node of next.nodes) {
    const oldId = matched.get(node), old = oldId ? previous.byId.get(oldId) : undefined;
    if (!old || node.children.length !== old.children.length) continue;
    const pairs = node.children.map((id, index) => [next.byId.get(id)!, previous.byId.get(old.children[index])!] as const);
    if (!pairs.every(([child, prior]) => child.kind === prior.kind && identity(child.text) === identity(prior.text) && child.blockId === prior.blockId &&
      (matched.has(child) ? matched.get(child) === prior.id : !used.has(prior.id)))) continue;
    for (const [child, prior] of pairs) {
      matched.set(child, prior.id);
      used.add(prior.id);
    }
  }
  const remap = new Map<string, string>();
  const reserved = new Set(matched.values());
  for (const node of next.nodes) {
    let id = matched.get(node) ?? node.id;
    if (!matched.has(node)) while (reserved.has(id)) id += '_';
    reserved.add(id); remap.set(node.id, id);
  }
  next.byId.clear();
  for (const node of next.nodes) {
    node.id = remap.get(node.id)!;
    node.parentId = node.parentId ? remap.get(node.parentId)! : null;
    node.children = node.children.map(id => remap.get(id)!);
    next.byId.set(node.id, node);
  }
  next.roots = next.roots.map(id => remap.get(id)!);
}

function required(doc: MapDocument, id: string): MapNode {
  const node = doc.byId.get(id);
  if (!node) throw new Error(t("This node no longer exists. Reopen the map and try again."));
  return node;
}

function singleLine(text: string): void {
  if (/[\r\n\u2028\u2029\x00-\x08]/.test(text)) throw new Error(t("A map node must fit on one line. Use a child node or a linked note for more text."));
}

function assertNodeLine(prefix: string, text: string): void {
  const line = prefix + text;
  if (/^[ \t]*(?:(?:[-+*]|\d+[.)])[ \t]+)?(`{3,}|~{3,})/.test(line) || /^([ \t]*)([-*_])(?:[ \t]*\2){2,}[ \t]*$/.test(line)) {
    throw new Error(t("This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view."));
  }
}

export function editNode(doc: MapDocument, id: string, text: string): string {
  singleLine(text);
  const node = required(doc, id);
  if (text === node.text) return doc.source;
  const line = sourceLines(doc.source)[node.line];
  const current = anchor(line.text.slice(node.prefix.length));
  const label = current.blockId ? anchor(text).text : text;
  assertNodeLine(node.prefix, label + current.suffix);
  return doc.source.slice(0, line.start) + node.prefix + label + current.suffix + doc.source.slice(line.end);
}

function indentation(doc: MapDocument, node: MapNode): string {
  return /^[ \t]*/.exec(doc.lines[node.line])![0];
}

function childUnit(doc: MapDocument, node: MapNode): string {
  if (node.kind === 'bullet') {
    const base = indentation(doc, node);
    for (const id of node.children) {
      const child = required(doc, id), indent = indentation(doc, child);
      if (child.kind === 'bullet' && indent.startsWith(base) && indent.length > base.length) return indent.slice(base.length);
    }
    const parent = node.parentId ? required(doc, node.parentId) : null;
    if (parent?.kind === 'bullet') {
      const parentIndent = indentation(doc, parent);
      if (base.startsWith(parentIndent) && base.length > parentIndent.length) return base.slice(parentIndent.length);
    }
  }
  for (const item of doc.nodes) if (item.kind === 'bullet' && item.parentId) {
    const parent = required(doc, item.parentId);
    if (parent.kind !== 'bullet') continue;
    const base = indentation(doc, parent), child = indentation(doc, item);
    if (child.startsWith(base) && child.length > base.length) return child.slice(base.length);
  }
  return '  ';
}

function insertAfter(doc: MapDocument, lineNumber: number, block: string): string {
  const info = sourceLines(doc.source)[lineNumber];
  const hasEnding = info.after > info.end;
  const clean = block.replace(/(?:\r\n|\n|\r)+$/, '');
  return doc.source.slice(0, info.after) + (hasEnding ? '' : doc.eol) + clean + (hasEnding ? doc.eol : '') + doc.source.slice(info.after);
}

export function addNode(doc: MapDocument, id: string, relation: 'child' | 'sibling' | 'before', text: string): string {
  singleLine(text);
  const node = required(doc, id);
  assertStructural(doc, node);
  let prefix: string;
  if (relation === 'sibling' || relation === 'before') prefix = node.prefix;
  else if (node.kind === 'bullet') prefix = indentation(doc, node) + childUnit(doc, node) + '- ';
  else {
    const headingChild = node.children.map(child => required(doc, child)).find(child => child.kind === 'heading');
    prefix = headingChild ? '#'.repeat(node.indent + 1) + ' ' : '- ';
    if (headingChild && node.indent >= 6) throw new Error(t("Markdown supports at most six heading levels. Add a bullet child in source view."));
  }
  assertNodeLine(prefix, text);
  if (relation === 'before') { const start=sourceLines(doc.source)[node.line].start; return doc.source.slice(0,start)+prefix+text+doc.eol+doc.source.slice(start); }
  return insertAfter(doc, node.endLine, prefix + text);
}

export function addParent(doc: MapDocument, id: string, text: string): string {
  singleLine(text);
  const node = required(doc, id);
  assertNodeLine(node.prefix, text);
  const newIndent = node.kind === 'heading' ? node.indent + 1 : indentation(doc, node) + childUnit(doc, node);
  const branch = transformBranch(doc, node, newIndent);
  const bounds = range(doc, node);
  const next = doc.source.slice(0, bounds.start) + node.prefix + text + doc.eol + branch + doc.source.slice(bounds.end);
  const parsed = parseMap(next), parent = parsed.nodes.find(item => item.line === node.line);
  if (!parent || parent.children.length !== 1 || parsed.byId.get(parent.children[0])?.line !== node.line + 1) {
    throw new Error(t("This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view."));
  }
  return next;
}

function assertStructural(doc: MapDocument, node: MapNode): void {
  const nodeLines = new Set(doc.nodes.filter(item => item.line >= node.line && item.line <= node.endLine).map(item => item.line));
  for (let line = node.line; line <= node.endLine; line++) {
    if (doc.lines[line].trim() && !nodeLines.has(line)) throw new Error(t("This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact."));
  }
}

function range(doc: MapDocument, node: MapNode): { start: number; end: number } {
  const lines = sourceLines(doc.source);
  return { start: lines[node.line].start, end: lines[node.endLine].after };
}

export function copyBranch(doc: MapDocument, id: string): string {
  const bounds = range(doc, required(doc, id));
  return doc.source.slice(bounds.start, bounds.end);
}

export function deleteNode(doc: MapDocument, id: string): string {
  const node = required(doc, id);
  assertStructural(doc, node);
  const bounds = range(doc, node);
  return doc.source.slice(0, bounds.start) + doc.source.slice(bounds.end);
}

export function selectedBranches(doc: MapDocument, ids: string[]): MapNode[] {
  const selected = new Set(ids);
  return doc.nodes.filter(node => {
    if (!selected.has(node.id)) return false;
    for (let parent = node.parentId; parent; parent = required(doc, parent).parentId) if (selected.has(parent)) return false;
    return true;
  });
}

export function deleteNodes(doc: MapDocument, ids: string[]): string {
  const branches = selectedBranches(doc, ids);
  for (const node of branches) assertStructural(doc, node);
  let source = doc.source;
  for (const node of branches.reverse()) {
    const bounds = range(doc, node);
    source = source.slice(0, bounds.start) + source.slice(bounds.end);
  }
  return source;
}

export function copyBranches(doc: MapDocument, ids: string[]): string {
  return selectedBranches(doc, ids).map(node => transformBranch(doc, node, node.kind === 'heading' ? 1 : '').replace(/(?:\r\n|\n|\r)+$/, '')).join(doc.eol) + doc.eol;
}

/** Label commands preserve line positions; build one complete change before writing. */
export function changeNodes(doc: MapDocument, ids: string[], change: (doc: MapDocument, id: string) => string): string {
  const selected = new Set(ids);
  let current = doc;
  for (const node of doc.nodes.filter(node => selected.has(node.id))) {
    const target = current.nodes.find(candidate => candidate.line === node.line);
    if (!target) throw new Error(t("The selection changed. Run the command again."));
    current = parseMap(change(current, target.id), current);
  }
  return current.source;
}

function shiftIndent(raw: string, removeColumns: number, newBase: string): string {
  const indent = /^[ \t]*/.exec(raw)![0];
  let at = 0, columns = 0;
  while (at < indent.length && columns < removeColumns) {
    columns += indent[at] === '\t' ? 4 - columns % 4 : 1;
    at++;
  }
  if (columns < removeColumns) throw new Error(t("This branch uses ambiguous indentation. Adjust it in source view before moving it."));
  const shifted = newBase + ' '.repeat(Math.max(0, columns - removeColumns)) + indent.slice(at);
  const expected = width(newBase) + width(indent) - removeColumns;
  const adjusted = width(shifted) === expected ? shifted : newBase + ' '.repeat(width(indent) - removeColumns);
  return adjusted + raw.slice(indent.length);
}

function transformBranch(doc: MapDocument, node: MapNode, newIndent: string | number): string {
  assertStructural(doc, node);
  const info = sourceLines(doc.source);
  let result = '';
  for (let line = node.line; line <= node.endLine; line++) {
    let raw = info[line].text;
    if (raw.trim()) {
      if (node.kind === 'heading') {
        const heading = /^( {0,3})(#{1,6})([ \t]+)/.exec(raw);
        if (heading) {
          const level = heading[2].length + Number(newIndent) - node.indent;
          if (level < 1 || level > 6) throw new Error(t("That move would exceed Markdown’s six heading levels."));
          raw = heading[1] + '#'.repeat(level) + raw.slice(heading[1].length + heading[2].length);
        }
      } else raw = shiftIndent(raw, node.indent, String(newIndent));
    }
    result += raw + doc.source.slice(info[line].end, info[line].after);
  }
  return result;
}

function relocate(doc: MapDocument, node: MapNode, destination: number, block: string): string {
  const bounds = range(doc, node);
  let source = doc.source.slice(0, bounds.start) + doc.source.slice(bounds.end);
  const insertion = destination >= bounds.end ? destination - (bounds.end - bounds.start) : destination;
  if (insertion > 0 && !/[\r\n]$/.test(source.slice(0, insertion))) block = doc.eol + block;
  if (insertion < source.length && !/[\r\n]$/.test(block)) block += doc.eol;
  source = source.slice(0, insertion) + block + source.slice(insertion);
  return source;
}

export function moveNode(doc: MapDocument, id: string, direction: 'up' | 'down' | 'indent' | 'outdent'): string {
  const node = required(doc, id);
  assertStructural(doc, node);
  const parent = node.parentId ? required(doc, node.parentId) : null;
  const siblings = parent?.children ?? doc.roots;
  const index = siblings.indexOf(id);
  if (direction === 'up' || direction === 'down') {
    const siblingId = siblings[index + (direction === 'up' ? -1 : 1)];
    if (!siblingId) return doc.source;
    const sibling = required(doc, siblingId);
    if (sibling.kind !== node.kind || (node.kind === 'heading' && sibling.indent !== node.indent)) throw new Error(t("Moving between a heading and a bullet changes their meaning. Make this structural change in source view."));
    assertStructural(doc, sibling);
    const first = direction === 'up' ? sibling : node;
    const second = direction === 'up' ? node : sibling;
    const a = range(doc, first), b = range(doc, second);
    let firstText = doc.source.slice(a.start, a.end), secondText = doc.source.slice(b.start, b.end);
    const gap = doc.source.slice(a.end, b.start);
    if (!/[\r\n]$/.test(secondText)) secondText += doc.eol;
    if (b.end === doc.source.length && !/[\r\n]$/.test(doc.source)) firstText = firstText.replace(/(?:\r\n|\n|\r)$/, '');
    return doc.source.slice(0, a.start) + secondText + gap + firstText + doc.source.slice(b.end);
  }
  if (direction === 'indent') {
    if (index === 0) return doc.source;
    const target = required(doc, siblings[index - 1]);
    if (target.kind !== node.kind) throw new Error(t("Indenting across mixed heading and bullet nodes is ambiguous. Use source view."));
    const newIndent = node.kind === 'heading' ? target.indent + 1 : indentation(doc, target) + childUnit(doc, target);
    const bounds = range(doc, node);
    return doc.source.slice(0, bounds.start) + transformBranch(doc, node, newIndent) + doc.source.slice(bounds.end);
  }
  if (!parent) return doc.source;
  if (node.kind !== parent.kind) throw new Error(t("A bullet under a heading cannot be outdented without changing Markdown formats. Use source view."));
  const newIndent = node.kind === 'heading' ? parent.indent : indentation(doc, parent);
  return relocate(doc, node, range(doc, parent).end, transformBranch(doc, node, newIndent));
}

export function reparentNode(doc: MapDocument, id: string, targetId: string): string {
  const node = required(doc, id), target = required(doc, targetId);
  for (let ancestor: MapNode | undefined = target; ancestor; ancestor = ancestor.parentId ? doc.byId.get(ancestor.parentId) : undefined) {
    if (ancestor.id === id) throw new Error(t("A branch cannot be moved into itself or one of its descendants."));
  }
  assertStructural(doc, node);
  assertStructural(doc, target);
  let newIndent: string | number;
  if (node.kind === 'heading') {
    if (target.kind !== 'heading') throw new Error(t("A Markdown heading cannot become a bullet child. Change its format in source view first."));
    newIndent = target.indent + 1;
  } else if (target.kind === 'bullet') {
    newIndent = indentation(doc, target) + childUnit(doc, target);
  } else {
    if (target.children.some(child => required(doc, child).kind === 'heading')) {
      throw new Error(t("A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view."));
    }
    const sibling = target.children.map(child => required(doc, child)).find(child => child.id !== id);
    newIndent = sibling ? indentation(doc, sibling) : '';
  }
  if (node.parentId === targetId && target.children[target.children.length - 1] === id) return doc.source;
  const moved = relocate(doc, node, range(doc, target).end, transformBranch(doc, node, newIndent));
  return /[\r\n]$/.test(doc.source) ? moved : moved.replace(/(?:\r\n|\n|\r)$/, '');
}

export function canDropBranches(doc: MapDocument, ids: string[], targetId: string, position: DropPosition): boolean {
  const target = doc.byId.get(targetId), selected = new Set(ids);
  if (!target || !ids.length || ids.some(id => !doc.byId.has(id))) return false;
  for (let node: MapNode | undefined = target; node; node = node.parentId ? doc.byId.get(node.parentId) : undefined) if (selected.has(node.id)) return false;
  const branches = selectedBranches(doc, ids);
  if (position === 'child' && target.kind === 'heading' && branches.some(node => node.kind === 'heading') && branches.some(node => node.kind !== 'heading')) return false;
  return branches.every(node => position === 'child'
    ? node.kind !== 'heading' || target.kind === 'heading'
    : node.kind === target.kind);
}

export function moveBranches(doc: MapDocument, ids: string[], targetId: string, position: DropPosition): string {
  if (!canDropBranches(doc, ids, targetId, position)) throw new Error(t("Cannot move a branch into itself, a descendant or an incompatible Markdown node."));
  const target = required(doc, targetId), branches = selectedBranches(doc, ids);
  assertStructural(doc, target);
  const lines = sourceLines(doc.source);
  const destination = position === 'before' ? lines[target.line].start : range(doc, target).end;
  const bounds = branches.map(node => range(doc, node));
  const blocks = branches.map(node => {
    let indent: string | number;
    if (position !== 'child') indent = node.kind === 'heading' ? target.indent : indentation(doc, target);
    else if (node.kind === 'heading') indent = target.indent + 1;
    else if (target.kind === 'bullet') indent = indentation(doc, target) + childUnit(doc, target);
    else {
      if (target.children.some(id => required(doc, id).kind === 'heading')) throw new Error(t("A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure."));
      const sibling = target.children.map(id => required(doc, id)).find(child => !ids.includes(child.id));
      indent = sibling ? indentation(doc, sibling) : '';
    }
    return transformBranch(doc, node, indent).replace(/(?:\r\n|\n|\r)+$/, '');
  });
  let source = doc.source;
  for (const bound of [...bounds].reverse()) source = source.slice(0, bound.start) + source.slice(bound.end);
  const insertion = destination - bounds.filter(bound => bound.end <= destination).reduce((sum, bound) => sum + bound.end - bound.start, 0);
  let block = blocks.join(doc.eol);
  if (insertion > 0 && !/[\r\n]$/.test(source.slice(0, insertion))) block = doc.eol + block;
  if (insertion < source.length || /[\r\n]$/.test(doc.source)) block += doc.eol;
  const moved = source.slice(0, insertion) + block + source.slice(insertion);
  return /[\r\n]$/.test(doc.source) ? moved : moved.replace(/(?:\r\n|\n|\r)$/, '');
}

export function pasteBranch(doc: MapDocument, id: string, text: string, placement: 'after' | 'child' = 'after'): string {
  if (!text.trim()) return doc.source;
  const target = required(doc, id);
  assertStructural(doc, target);
  if (!/[\r\n]/.test(text) && !/^[ \t]*(?:[-+*]|\d+[.)]|#{1,6})[ \t]/.test(text)) return addNode(doc, id, placement === 'child' ? 'child' : 'sibling', anchor(text).text);
  const incoming = parseMap(text);
  if (!incoming.nodes.length) throw new Error(t("Paste an outline branch, or paste one line as a new node."));
  const roots = incoming.roots.map(root => required(incoming, root));
  const covered = new Set<number>();
  for (const root of roots) {
    assertStructural(incoming, root);
    for (let line = root.line; line <= root.endLine; line++) covered.add(line);
    if (placement === 'after' && root.kind !== target.kind) throw new Error(t("Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format."));
    if (placement === 'child' && root.kind === 'heading' && target.kind !== 'heading') throw new Error(t("A Markdown heading cannot become a bullet child. Change its format in source view first."));
    if (placement === 'child' && root.kind === 'bullet' && target.kind === 'heading' && (target.children.some(child => required(doc, child).kind === 'heading') || roots.some(item => item.kind === 'heading'))) {
      throw new Error(t("A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view."));
    }
  }
  if (incoming.lines.some((line, index) => line.trim() && !covered.has(index))) throw new Error(t("The clipboard contains content outside the outline. Paste it in source view to preserve it."));
  let output = '';
  for (const root of roots) {
    let newIndent: string | number;
    if (placement === 'after') newIndent = target.kind === 'heading' ? target.indent : indentation(doc, target);
    else if (root.kind === 'heading') newIndent = target.indent + 1;
    else if (target.kind === 'bullet') newIndent = indentation(doc, target) + childUnit(doc, target);
    else {
      const sibling = target.children.map(child => required(doc, child)).find(child => child.kind === 'bullet');
      newIndent = sibling ? indentation(doc, sibling) : '';
    }
    const transformed = transformBranch(incoming, root, newIndent);
    const clean = sourceLines(transformed).map(line => anchor(line.text).text).join(doc.eol).replace(/(?:\r\n|\n|\r)+$/, '');
    output += (output ? doc.eol : '') + clean;
  }
  return insertAfter(doc, target.endLine, output);
}

function taskMatch(text: string): RegExpExecArray | null { return /^\[([^\]])\]([ \t]*)/.exec(text); }

export function toggleTask(doc: MapDocument, id: string): string {
  const node = required(doc, id), match = taskMatch(node.text);
  return editNode(doc, id, match ? `[${/[xX]/.test(match[1]) ? ' ' : 'x'}]${node.text.slice(3)}` : '[ ] ' + node.text);
}

interface StepParts {
  number: number | null;
  order: number[];
  suffix: string;
  date: string | null;
  unknownDate: boolean;
  bodyStart: number;
  label: string;
  bareLength: number;
  dateStart: number;
  dateEnd: number;
}

function stepParts(text: string): StepParts | null {
  const match = /^(?:\[[^\]]\][ \t]*)?#step(?:[ \t]+|$)(.*)$/i.exec(text);
  if (!match) return null;
  const tail = match[1];
  const bodyStart = text.length - tail.length;
  const numbered = /^(\d+(?:\.\d+)*)([a-z]*)\)[ \t]*/i.exec(tail);
  const bare = !numbered ? /^\)[ \t]*/.exec(tail) : null;
  const orderLength = numbered?.[0].length ?? bare?.[0].length ?? 0;
  const afterNumber = tail.slice(orderLength);
  const dated = /^до([ \t]+)(\[\[(\d{4}-\d{2}-\d{2})(?:\|[^\]]*)?\]\]|(\d{4}-\d{2}-\d{2})|(\?))(?=\)|[ \t]|$)\)?[ \t]*/i.exec(afterNumber);
  const afterDate = dated ? afterNumber.slice(dated[0].length) : afterNumber;
  const trailingNumber = dated && !numbered && !bare ? /^(\d+(?:\.\d+)*)([a-z]*)\)[ \t]*/i.exec(afterDate) : null;
  const order = numbered ?? trailingNumber;
  const orderParts = order ? order[1].split('.').map(Number) : [];
  const dateStart = dated ? bodyStart + orderLength + 2 + dated[1].length : -1;
  return {
    number: orderParts[0] ?? null,
    order: orderParts,
    suffix: order?.[2]?.toLowerCase() ?? '',
    date: dated ? dated[3] ?? dated[4] ?? null : null,
    unknownDate: !!dated?.[5],
    bodyStart,
    label: trailingNumber ? afterDate.slice(trailingNumber[0].length) : afterDate,
    bareLength: bare?.[0].length ?? 0,
    dateStart,
    dateEnd: dated ? dateStart + dated[2].length : -1,
  };
}

export function getSteps(doc: MapDocument): Step[] {
  const result: Step[] = [];
  for (const node of doc.nodes) {
    const parts = stepParts(node.text);
    if (!parts) continue;
    let frozen = false, ancestor: MapNode | undefined = node;
    while (ancestor) {
      if (/🧊|заморож|frozen/i.test(ancestor.text)) frozen = true;
      ancestor = ancestor.parentId ? doc.byId.get(ancestor.parentId) : undefined;
    }
    result.push({ nodeId: node.id, line: node.line, text: node.text, completed: /^\[[xX]\]/.test(node.text), number: parts.number, order: parts.order, suffix: parts.suffix, date: parts.date, unknownDate: parts.unknownDate, frozen });
  }
  return result;
}

export function compareSteps(a: Step, b: Step): number {
  if (a.number === null || b.number === null) return a.number === b.number ? a.line - b.line : a.number === null ? 1 : -1;
  const left = a.order?.length ? a.order : [a.number], right = b.order?.length ? b.order : [b.number];
  for (let part = 0; part < Math.min(left.length, right.length); part++) {
    if (left[part] !== right[part]) return left[part] - right[part];
  }
  return left.length - right.length || a.suffix.localeCompare(b.suffix, 'en') || a.line - b.line;
}

export function setStep(doc: MapDocument, id: string): string {
  const node = required(doc, id);
  if (stepParts(node.text)) return doc.source;
  const next = Math.max(0, ...getSteps(doc).filter(step => !step.date && !step.unknownDate).map(step => step.number ?? 0)) + 1;
  const check = taskMatch(node.text);
  return editNode(doc, id, `${check ? check[0].slice(0, 3) : '[ ]'} #step ${next}) ${check ? node.text.slice(check[0].length) : node.text}`);
}

function taskLabel(text: string): { checkbox: string; label: string } {
  const check = taskMatch(text);
  const label = stepParts(text)?.label ?? (check ? text.slice(check[0].length) : text);
  return { checkbox: check ? check[0].slice(0, 3) : '[ ]', label };
}

export function setDated(doc: MapDocument, id: string, date: string): string {
  if (date !== '?') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(t("Use a date in YYYY-MM-DD format, or ? for an unknown deadline."));
    const parsed = new Date(date + 'T12:00:00Z');
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) throw new Error(t("That calendar date does not exist."));
  }
  const node = required(doc, id), parts = stepParts(node.text);
  const deadline = date === '?' ? '?' : `[[${date}]]`;
  if (parts?.dateStart !== undefined && parts.dateStart >= 0) {
    const old = node.text.slice(parts.dateStart, parts.dateEnd);
    const replacement = date === '?' ? '?' : old === '?' ? deadline : old.replace(/\d{4}-\d{2}-\d{2}/, date);
    return editNode(doc, id, node.text.slice(0, parts.dateStart) + replacement + node.text.slice(parts.dateEnd));
  }
  if (parts) {
    const prefix = node.text.slice(0, parts.bodyStart);
    const body = node.text.slice(parts.bodyStart + parts.bareLength);
    return editNode(doc, id, `${prefix}${/[ \t]$/.test(prefix) ? '' : ' '}до ${deadline}${body ? ' ' + body : ''}`);
  }
  const check = taskMatch(node.text);
  const prefix = check ? check[0] + (check[2] ? '' : ' ') : '[ ] ';
  const label = check ? node.text.slice(check[0].length) : node.text;
  return editNode(doc, id, `${prefix}#step до ${deadline}${label ? ' ' + label : ''}`);
}

export function setQuestion(doc: MapDocument, id: string): string {
  const node = required(doc, id);
  if (/^(?:==)?\/\/todo\s+Q:/i.test(node.text)) return doc.source;
  return editNode(doc, id, `==//todo Q: ${taskLabel(node.text).label}==`);
}

export function renumberSteps(doc: MapDocument, orderedNodeIds?: string[]): string {
  const numbered = getSteps(doc).filter(step => step.number !== null && !step.date && !step.unknownDate);
  numbered.sort(compareSteps);
  let ordered = numbered;
  if (orderedNodeIds) {
    const available = new Map(numbered.map(step => [step.nodeId, step]));
    const seen = new Set<string>();
    const requested: Step[] = [];
    for (const id of orderedNodeIds) {
      if (seen.has(id)) throw new Error(t("The execution order contains the same step twice."));
      seen.add(id);
      const step = available.get(id);
      if (!step) throw new Error(t("Only numbered, undated steps can be placed in an execution order."));
      requested.push(step);
    }
    ordered = [...requested, ...numbered.filter(step => !seen.has(step.nodeId))];
  }
  const info = sourceLines(doc.source);
  const replacements = ordered.map((step, index) => {
    const node = required(doc, step.nodeId), line = info[node.line];
    const text = line.text.replace(/(#step[ \t]+)\d+(?:\.\d+)*[a-z]*(?=\))/i, (_match, prefix: string) => prefix + (index + 1));
    return { start: line.start, end: line.end, text };
  }).sort((a, b) => b.start - a.start);
  let source = doc.source;
  for (const replacement of replacements) source = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
  return source;
}
