/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { MapDocument, MapNode, MapViewState } from './types';
import { MIN_SCALE, MAX_SCALE } from './types';
import { parseMap } from './core';

export const DEFAULT_STATE: MapViewState = { collapsed: [], selected: null, focusRoot: null, camera: { x: 48, y: 48, scale: 1 } };

export function parseState(value: string | null): MapViewState | undefined {
  if (!value) return undefined;
  try {
    const data = JSON.parse(value);
    if (!data || !Array.isArray(data.collapsed) || !data.camera) return undefined;
    const { x, y, scale } = data.camera;
    if (![x, y, scale].every(v => typeof v === 'number' && Number.isFinite(v))) return undefined;
    return {
      collapsed: data.collapsed.filter((id: unknown) => typeof id === 'string').slice(0, 20000),
      selected: typeof data.selected === 'string' ? data.selected : null,
      focusRoot: typeof data.focusRoot === 'string' ? data.focusRoot : null,
      camera: { x, y, scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale)) }
    };
  } catch { return undefined; }
}

export function guardedChange(current: string, expected: string, next: string): string {
  if (current !== expected) throw new Error(t("The note changed in another window or device. The map was refreshed. Retry on the latest text."));
  return next;
}

interface NodeReference { id: string; text: string; parent: string; kind: string; }
function label(node: MapNode): string {
  return node.text.replace(/^\[[^\]]\]\s*/, '').replace(/^#step\s+(?:\d+(?:\.\d+)*[a-z]*\)|\))\s*/i, '#step ').replace(/\s+/g, ' ').trim();
}

/** Persist canonical identities, not the temporary identities reconciled during this session. */
export function serializeViewState(doc: MapDocument, state: MapViewState): string {
  const canonical = parseMap(doc.source);
  const byLine = new Map(canonical.nodes.map(node => [node.line, node]));
  const refs: NodeReference[] = [];
  const translate = (id: string | null): string | null => {
    if (!id) return null;
    const current = doc.byId.get(id);
    const node = current && byLine.get(current.line);
    if (!node) return null;
    if (!refs.some(ref => ref.id === node.id)) refs.push({ id: node.id, text: label(node), parent: node.parentId ? label(canonical.byId.get(node.parentId)!) : '', kind: node.kind });
    return node.id;
  };
  const saved: MapViewState = { ...state, collapsed: state.collapsed.map(translate).filter((id): id is string => id !== null), selected: translate(state.selected), focusRoot: translate(state.focusRoot) };
  return JSON.stringify({ ...saved, refs });
}

export function restoreViewState(doc: MapDocument, value: string | null): MapViewState | undefined {
  const saved = parseState(value);
  if (!saved) return undefined;
  let refs: NodeReference[] = [];
  try { const parsed = JSON.parse(value!); if (Array.isArray(parsed.refs)) refs = parsed.refs.filter((ref: NodeReference) => ref && typeof ref.id === 'string' && typeof ref.text === 'string' && typeof ref.parent === 'string'); } catch { /* Invalid state is ignored by parseState. */ }
  const translate = (id: string | null): string | null => {
    if (!id) return null;
    if (doc.byId.has(id)) return id;
    const ref = refs.find(ref => ref.id === id);
    if (!ref) return null;
    const matches = doc.nodes.filter(node => node.kind === ref.kind && label(node) === ref.text);
    if (matches.length === 1) return matches[0].id;
    const sameParent = matches.filter(node => (node.parentId ? label(doc.byId.get(node.parentId)!) : '') === ref.parent);
    return sameParent.length === 1 ? sameParent[0].id : null;
  };
  return { ...saved, collapsed: saved.collapsed.map(translate).filter((id): id is string => id !== null), selected: translate(saved.selected), focusRoot: translate(saved.focusRoot) };
}

export class History {
  private undoEntries: { before: string; after: string }[] = [];
  private redoEntries: { before: string; after: string }[] = [];
  can(direction: 'undo' | 'redo', current: string): boolean {
    try { return this.peek(direction, current) !== null; } catch { return false; }
  }
  push(before: string, after: string): void {
    if (before === after) return;
    this.undoEntries.push({ before, after });
    while (this.undoEntries.length > 30 || (this.undoEntries.length > 1 && this.undoEntries.reduce((n, e) => n + e.before.length + e.after.length, 0) > 8_000_000)) this.undoEntries.shift();
    this.redoEntries = [];
  }
  peek(direction: 'undo' | 'redo', current: string): string | null {
    const entries = direction === 'undo' ? this.undoEntries : this.redoEntries;
    const item = entries[entries.length - 1];
    if (!item) return null;
    const expected = direction === 'undo' ? item.after : item.before;
    if (current !== expected) throw new Error(t("History stopped because the text changed externally. Undo will preserve those changes."));
    return direction === 'undo' ? item.before : item.after;
  }
  commit(direction: 'undo' | 'redo'): void {
    const from = direction === 'undo' ? this.undoEntries : this.redoEntries;
    const to = direction === 'undo' ? this.redoEntries : this.undoEntries;
    const item = from.pop();
    if (item) to.push(item);
  }
}
