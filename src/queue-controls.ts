/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { compileMapPatterns } from './map-patterns';
import { t } from './i18n';
import type { MapDocument } from './types';

export function queueExclusions(value: string): string[] {
  return value.split(/\r?\n/).map(term => term.trim().toLocaleLowerCase()).filter(Boolean);
}

export function excludedQueueNodes(doc: MapDocument, terms: readonly string[]): Set<string> {
  const excluded = new Set<string>();
  if (!terms.length) return excluded;
  for (const node of doc.nodes) {
    if ((node.parentId && excluded.has(node.parentId)) || terms.some(term => node.text.toLocaleLowerCase().includes(term))) {
      excluded.add(node.id);
    }
  }
  return excluded;
}
/** Presentation only: consume the same leading markers as the step parser. */
export function queueLabel(text: string, showTask = true, showStep = true): string {
  const match = /^(\[[^\]]\][ \t]*)?(#step(?:[ \t]+|$))?(.*)$/i.exec(text)!;
  const label = (showTask ? match[1] ?? '' : '') + (showStep ? match[2] ?? '' : '') + match[3];
  return label.trim() || text;
}

export function queueFolderPrefix(filter: string): string | undefined {
  const query = filter.trim();
  return query.endsWith('/') && !query.startsWith('/') && !/[?*]/.test(query) ? query : undefined;
}

export function queueMapMatcher(filter: string): (path: string) => boolean {
  const query = filter.trim();
  if (!query) return () => true;
  if (query.startsWith('/') && query.endsWith('/') && query.length > 1) {
    const expression = new RegExp(query.slice(1, -1), 'i');
    return path => expression.test(path);
  }
  if (query.includes('*') || query.includes('?')) return compileMapPatterns({ patternMode: 'glob', mapPatterns: query });
  const folder = queueFolderPrefix(query)?.toLocaleLowerCase();
  if (folder) return path => path.toLocaleLowerCase().startsWith(folder);
  return path => path.toLocaleLowerCase().includes(query.toLocaleLowerCase());
}

interface MapChoice { path: string; basename: string; folder?: boolean; }
let nextFilterId = 0;

export function attachMapFilter(parent: HTMLElement, getMaps: () => MapChoice[], onSelect: (path: string) => void, getFolderPaths?: () => string[]): { set: (value: string) => void } {
  const host = parent.createDiv('tvm-map-filter');
  const input = host.createEl('input', { type: 'text', attr: { role: 'combobox', 'aria-label': t("Map filter"), 'aria-autocomplete': 'list', 'aria-expanded': 'false', autocomplete: 'off', placeholder: t("All maps") } });
  const list = host.createDiv('tvm-map-options');
  list.id = `tvm-map-options-${++nextFilterId}`;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', t("Maps"));
  input.setAttribute('aria-controls', list.id);
  list.hidden = true;
  let selected: MapChoice = { path: '', basename: t("All maps") };
  let choices: MapChoice[] = [];
  let active = -1;
  let edited = false;
  const close = () => {
    list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant');
    input.value = selected.path ? selected.basename : '';
  };
  const choose = (choice: MapChoice) => { selected = choice; edited = false; close(); onSelect(choice.path); };
  const highlight = () => {
    Array.from(list.children).forEach((element, index) => element.setAttribute('aria-selected', String(index === active)));
    const option = list.children[active] as HTMLElement | undefined;
    if (option) { input.setAttribute('aria-activedescendant', option.id); option.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  };
  const draw = () => {
    const query = input.value.trim().toLocaleLowerCase();
    const maps = getMaps(), folders = new Set<string>();
    for (const path of getFolderPaths?.() ?? maps.map(map => map.path)) {
      const parts = path.split('/');
      for (let level = 1; level < parts.length; level++) folders.add(parts.slice(0, level).join('/') + '/');
    }
    choices = [{ path: '', basename: t("All maps") }, ...[...folders].sort().map(path => ({path, basename: path, folder: true})), ...[...maps].sort((a, b) => a.path.localeCompare(b.path))]
      .filter(choice => !choice.path || `${choice.basename} ${choice.path}`.toLocaleLowerCase().includes(query)).slice(0, 100);
    list.empty(); active = -1;
    for (const [index, choice] of choices.entries()) {
      const option = list.createDiv('tvm-map-option');
      option.id = `${list.id}-${index}`; option.setAttribute('role', 'option'); option.setAttribute('aria-selected', 'false');
      option.createDiv({ text: (choice.folder ? '📁 ' : '') + choice.basename });
      if (choice.path && !choice.folder) option.createDiv({ cls: 'tvm-map-option-path', text: choice.path });
      // Keep keyboard focus in the input; touch scrolling remains native.
      option.onmousedown = event => event.preventDefault();
      option.onclick = () => choose(choice);
    }
    if (query && choices.length === 1) list.createDiv({ cls: 'tvm-map-option-path tvm-map-no-results', text: t("No maps match this search.") });
    list.hidden = false; input.setAttribute('aria-expanded', 'true'); input.removeAttribute('aria-activedescendant');
  };
  input.onfocus = () => { edited = false; input.value = ''; draw(); };
  input.onclick = () => { if (list.hidden) { input.value = ''; draw(); } };
  input.oninput = () => { edited = true; draw(); };
  input.onkeydown = event => {
    if (event.key === 'Escape' && !list.hidden) { event.preventDefault(); event.stopPropagation(); close(); }
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); if (list.hidden) { input.value = ''; draw(); }
      active = active < 0 ? (event.key === 'ArrowDown' ? 0 : choices.length - 1) : (active + (event.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
      highlight();
    } else if (event.key === 'Enter' && !list.hidden) {
      event.preventDefault();
      if (active >= 0) choose(choices[active]);
      else { const value = input.value.trim(); choose({ path: value, basename: value }); }
    }
  };
  input.onblur = () => {
    if (edited) { const value = input.value.trim(); choose({ path: value, basename: value }); }
    else close();
  };
  return { set(value) {
    selected = getMaps().find(map => map.path === value) ?? { path: value, basename: value };
    edited = false;
    close();
  } };
}
