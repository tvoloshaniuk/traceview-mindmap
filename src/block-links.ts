/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import type { App, TFile } from 'obsidian';
import { t } from './i18n';
import type { MapDocument } from './types';

export function addressNode(doc: MapDocument, id: string, blockId: string): { source: string; blockId: string } {
  const node = doc.byId.get(id);
  if (!node || node.kind === 'root') throw new Error(t("A node with its own Markdown line is required."));
  if (node.blockId) {
    if (doc.nodes.filter(candidate => candidate.blockId === node.blockId).length !== 1) throw new Error(t("This block ID is duplicated. Fix it in the source Markdown before copying the address."));
    return { source: doc.source, blockId: node.blockId };
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(blockId) || doc.nodes.some(candidate => candidate.blockId === blockId)) throw new Error(t("A unique block ID is required."));
  const endings = [...doc.source.matchAll(/\r\n|\n|\r/g)];
  const end = endings[node.line]?.index ?? doc.source.length;
  return { source: doc.source.slice(0, end) + ' ^' + blockId + doc.source.slice(end), blockId };
}

/** Rebase only ID additions from native block selection, never user content edits. */
export function onlyAddedBlockIds(before: MapDocument, after: MapDocument): boolean {
  if (before.eol !== after.eol || before.lines.length !== after.lines.length || before.nodes.length !== after.nodes.length) return false;
  const byLine = new Map(before.nodes.map(node => [node.line, node]));
  return before.lines.every((line, index) => {
    if (line === after.lines[index]) return true;
    const old = byLine.get(index), fresh = after.nodes.find(node => node.line === index);
    if (!old || !fresh || old.blockId || !fresh.blockId || old.kind !== fresh.kind || old.prefix !== fresh.prefix || old.text !== fresh.text) return false;
    return after.lines[index] === line + ' ^' + fresh.blockId;
  });
}

export function removeNodeAddress(doc: MapDocument, id: string): string {
  const node = doc.byId.get(id);
  if (!node?.blockId) return doc.source;
  const endings = [...doc.source.matchAll(/\r\n|\n|\r/g)];
  const start = node.line ? endings[node.line - 1].index! + endings[node.line - 1][0].length : 0;
  const end = endings[node.line]?.index ?? doc.source.length;
  const line = doc.source.slice(start, end).replace(/[ \t]+\^[A-Za-z0-9][A-Za-z0-9-]*[ \t]*$/, '');
  return doc.source.slice(0, start) + line + doc.source.slice(end);
}

export function nodeBacklinks(app: App, target: TFile, blockId: string): {file: TFile; line: number}[] {
  const candidates = new Set([target.path]);
  for (const [source, links] of Object.entries(app.metadataCache.resolvedLinks)) {
    if (links[target.path]) candidates.add(source);
  }
  const result: {file: TFile; line: number}[] = [];
  for (const path of candidates) {
    const file = app.vault.getFileByPath(path);
    if (!file || file.extension !== 'md') continue;
    const cache = app.metadataCache.getFileCache(file);
    const lines = new Set<number>();
    for (const ref of [...cache?.links ?? [], ...cache?.embeds ?? []]) {
      const index = ref.link.lastIndexOf('#^');
      if (index < 0 || ref.link.slice(index + 2) !== blockId) continue;
      const destination = ref.link.slice(0, index);
      const resolved = destination ? app.metadataCache.getFirstLinkpathDest(destination, file.path) : file;
      if (resolved?.path === target.path) lines.add(ref.position.start.line);
    }
    for (const line of lines) result.push({file, line});
  }
  return result.sort((a, b) => a.file.path.localeCompare(b.file.path) || a.line - b.line);
}
