/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { getLocale, t } from './i18n';
import type { MapDocument } from './types';

interface ExportNode {
  text: string;
  parent: number | null;
  children: number[];
  depth: number;
}

function escape(value: string): string {
  return value.replace(/[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\u{10000}-\u{10ffff}]/gu, '\ufffd')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Iterative traversal also tolerates detached nodes and malformed cyclic inputs.
function outline(doc: MapDocument): ExportNode[] {
  const nodes: ExportNode[] = [];
  const seen = new Set<string>();
  const pending = [...doc.roots, ...doc.nodes.map(node => node.id)].reverse().map(id => ({ id, parent: null as number | null, depth: 0 }));
  while (pending.length) {
    const item = pending.pop()!;
    const node = doc.byId.get(item.id);
    if (!node || seen.has(node.id)) continue;
    seen.add(node.id);
    const index = nodes.length;
    nodes.push({ text: node.text, parent: item.parent, children: [], depth: item.depth });
    if (item.parent !== null) nodes[item.parent].children.push(index);
    for (let child = node.children.length - 1; child >= 0; child--) pending.push({ id: node.children[child], parent: index, depth: item.depth + 1 });
  }
  return nodes;
}

/** A self-contained, script-free outline. All branches start expanded. */
export function exportHtml(doc: MapDocument, title: string): string {
  const nodes = outline(doc);
  const output = [
    '<!doctype html>', `<html lang="${getLocale()}"><head><meta charset="utf-8">`,
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; base-uri \'none\'; form-action \'none\'">',
    `<title>${escape(title)}</title>`,
    '<style> :root{color-scheme:light dark;font-family:system-ui,sans-serif}body{margin:0;padding:32px;background:#f5f7fc;color:#172033}header{max-width:80ch;margin-bottom:28px}h1{margin:0 0 8px;font-size:1.8rem;overflow-wrap:anywhere}p{color:#536177;line-height:1.5}.outline{padding:0;list-style:none}.outline ul{list-style:none;margin:12px 0 0 16px;padding:0 0 0 28px;border-left:2px solid #b6c4da}.outline li{position:relative;margin:12px 0}.outline ul>li::before{content:"";position:absolute;left:-28px;top:20px;width:27px;border-top:2px solid #b6c4da}.label{display:inline-block;max-width:70ch;padding:10px 14px;border:1px solid #b6c4da;border-radius:10px;background:#fff;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.45;vertical-align:top}summary{cursor:pointer;max-width:max-content}summary>.label{vertical-align:middle}summary::marker{color:#4975c8}main{overflow:auto;padding:0 0 24px}@media(prefers-color-scheme:dark){body{background:#151b28;color:#e7edf9}p{color:#aebbd1}.label{background:#222c3e;border-color:#50607b}.outline ul{border-color:#50607b}.outline ul>li::before{border-color:#50607b}}@media print{body{background:white;color:black;padding:8px}.label{background:white;color:black}summary::marker{color:black}}</style>',
    `</head><body><header><h1>${escape(title)}</h1><p>${escape(t("Full map · {count} nodes · Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.", { count: nodes.length }))}</p></header><main>`,
  ];
  if (!nodes.length) output.push(`<p>${escape(t("This map contains no outline nodes."))}</p>`);
  else {
    output.push('<ul class="outline">');
    const tasks: ({ node: number } | { close: string })[] = nodes.map((node, index) => node.parent === null ? index : -1).filter(index => index >= 0).reverse().map(node => ({ node }));
    while (tasks.length) {
      const task = tasks.pop()!;
      if ('close' in task) { output.push(task.close); continue; }
      const node = nodes[task.node];
      if (!node.children.length) output.push(`<li><span class="label">${escape(node.text)}</span></li>`);
      else {
        output.push(`<li><details open><summary><span class="label">${escape(node.text)}</span></summary><ul>`);
        tasks.push({ close: '</ul></details></li>' });
        for (let child = node.children.length - 1; child >= 0; child--) tasks.push({ node: node.children[child] });
      }
    }
    output.push('</ul>');
  }
  output.push('</main></body></html>');
  return output.join('\n');
}

const NODE_WIDTH = 320;
const COLUMN_GAP = 72;
const ROW_GAP = 18;
const PADDING = 32;
const LINE_HEIGHT = 20;

function characterWidth(character: string): number {
  if (/\s/u.test(character)) return 5;
  if (/[ilI.,'`!|:;]/u.test(character)) return 5;
  if (/[MW@#%&]/u.test(character)) return 13;
  if (/\p{Mark}|\u200d|\ufe0f/u.test(character)) return 0;
  const point = character.codePointAt(0)!;
  return point > 0x2e7f ? 16 : 9;
}

function wrap(text: string, maxWidth = NODE_WIDTH - 32): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r\n|\n|\r/)) {
    const characters = [...paragraph];
    if (!characters.length) { lines.push(''); continue; }
    let start = 0;
    while (start < characters.length) {
      let end = start, width = 0, space = -1;
      while (end < characters.length && (width + characterWidth(characters[end]) <= maxWidth || end === start)) {
        width += characterWidth(characters[end]);
        if (/\s/u.test(characters[end])) space = end;
        end++;
      }
      if (end < characters.length && space > start + (end - start) / 2) end = space + 1;
      lines.push(characters.slice(start, end).join(''));
      start = end;
    }
  }
  return lines;
}

/** All nodes are exported, independently of the live map's collapse state. */
export function exportSvg(doc: MapDocument, title: string): string {
  const nodes = outline(doc);
  const titleLines = wrap(title, (600 - PADDING * 2) * 14 / 20);
  const headerHeight = 72 + titleLines.length * 28;
  const lines = nodes.map(node => wrap(node.text));
  const heights = lines.map(label => Math.max(48, label.length * LINE_HEIGHT + 24));
  const branchHeights = [...heights];
  for (let index = nodes.length - 1; index >= 0; index--) {
    const children = nodes[index].children;
    branchHeights[index] = Math.max(heights[index], children.reduce((total, child) => total + branchHeights[child], 0) + Math.max(0, children.length - 1) * ROW_GAP);
  }
  const tops = new Array<number>(nodes.length);
  const positions: { x: number; y: number }[] = [];
  let nextRootY = headerHeight, width = 600, height = headerHeight + 60;
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.parent === null) { tops[index] = nextRootY; nextRootY += branchHeights[index] + ROW_GAP * 2; }
    const x = PADDING + node.depth * (NODE_WIDTH + COLUMN_GAP);
    const y = tops[index] + (branchHeights[index] - heights[index]) / 2;
    positions.push({ x, y });
    width = Math.max(width, x + NODE_WIDTH + PADDING);
    height = Math.max(height, y + heights[index] + PADDING);
    const childrenHeight = node.children.reduce((total, child) => total + branchHeights[child], 0) + Math.max(0, node.children.length - 1) * ROW_GAP;
    let childY = tops[index] + (branchHeights[index] - childrenHeight) / 2;
    for (const child of node.children) { tops[child] = childY; childY += branchHeights[child] + ROW_GAP; }
  }
  const output = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="map-title map-description">`,
    `<title id="map-title">${escape(title)}</title>`,
    `<desc id="map-description">Full map, ${nodes.length} nodes. Read-only export with all branches expanded. Labels retain their Markdown text.</desc>`,
    `<rect width="${width}" height="${height}" fill="#f5f7fc"/>`,
    `<text xml:space="preserve" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#172033">${titleLines.map((line, index) => `<tspan x="${PADDING}" y="${40 + index * 28}">${escape(line)}</tspan>`).join('')}</text>`,
    `<text x="${PADDING}" y="${40 + titleLines.length * 28}" font-family="system-ui,sans-serif" font-size="13" fill="#536177">Full map · ${nodes.length} nodes · read-only export</text>`,
    '<g fill="none" stroke="#9baecc" stroke-width="2">',
  ];
  for (let index = 0; index < nodes.length; index++) {
    const parent = nodes[index].parent;
    if (parent === null) continue;
    const x1 = positions[parent].x + NODE_WIDTH, y1 = positions[parent].y + heights[parent] / 2;
    const x2 = positions[index].x, y2 = positions[index].y + heights[index] / 2;
    output.push(`<path d="M ${x1} ${y1} C ${x1 + COLUMN_GAP / 2} ${y1}, ${x2 - COLUMN_GAP / 2} ${y2}, ${x2} ${y2}"/>`);
  }
  output.push('</g>');
  for (let index = 0; index < nodes.length; index++) {
    const { x, y } = positions[index];
    output.push(`<g class="map-node"><title>${escape(nodes[index].text)}</title><rect x="${x}" y="${y}" width="${NODE_WIDTH}" height="${heights[index]}" rx="10" fill="#fff" stroke="#9baecc"/><text xml:space="preserve" font-family="system-ui,sans-serif" font-size="14" fill="#172033">`);
    for (let line = 0; line < lines[index].length; line++) output.push(`<tspan x="${x + 16}" y="${y + 27 + line * LINE_HEIGHT}">${escape(lines[index][line])}</tspan>`);
    output.push('</text></g>');
  }
  if (!nodes.length) output.push(`<text x="${PADDING}" y="${headerHeight + 16}" font-family="system-ui,sans-serif" font-size="14" fill="#536177">This map contains no outline nodes.</text>`);
  output.push('</svg>');
  return output.join('\n');
}
