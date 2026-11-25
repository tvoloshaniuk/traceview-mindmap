/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { MapDocument } from './types';

export function renderMapPreview(container: HTMLElement, doc: MapDocument, target: string, resolve: (value: string) => string | null): void {
  const document = container.ownerDocument;
  const preview = document.createElement('div'); preview.className = 'tvm-embedded-map'; container.append(preview);
  const link = (parent: HTMLElement, href: string, text: string) => {
    const anchor = document.createElement('a'); anchor.className = 'internal-link'; anchor.textContent = text;
    anchor.setAttribute('href', href); anchor.dataset.href = href; parent.append(anchor);
  };
  let remaining = 24, drawn = 0;
  const draw = (parent: HTMLElement, ids: string[], depth: number) => {
    for (const id of ids) {
      if (remaining <= 0) break;
      const node = doc.byId.get(id); if (!node) continue;
      remaining--; drawn++;
      const branch = document.createElement('div'); branch.className = 'tvm-embedded-map-branch'; parent.append(branch);
      const label = document.createElement('div'); label.className = 'tvm-embedded-map-label'; branch.append(label);
      let offset = 0;
      for (const match of node.text.matchAll(/!?\[\[([^\]#|]+(?:#[^\]|]+)?)(?:\|([^\]]+))?\]\]/g)) {
        label.append(node.text.slice(offset, match.index));
        const href = resolve(match[1]);
        if (href) link(label, href, match[2] ?? match[1]); else label.append(match[2] ?? match[1]);
        offset = match.index! + match[0].length;
      }
      label.append(node.text.slice(offset) || (offset ? '' : t("Untitled")));
      if (depth < 3 && node.children.length && remaining > 0) {
        const children = document.createElement('div'); children.className = 'tvm-embedded-map-children'; branch.append(children);
        draw(children, node.children, depth + 1);
      }
    }
  };
  draw(preview, doc.roots, 0);
  if (drawn < doc.nodes.length) link(preview, target, '…');
}
