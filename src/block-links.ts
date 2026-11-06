/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
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
