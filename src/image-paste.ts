/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { App } from 'obsidian';

const extensions: Record<string, string> = { 'image/png':'png', 'image/x-png':'png', 'image/jpeg':'jpg', 'image/gif':'gif', 'image/webp':'webp', 'image/bmp':'bmp', 'image/avif':'avif', 'image/svg+xml':'svg' };
function extension(file: File): string | undefined {
  return extensions[file.type.toLowerCase()] ?? (!file.type ? /\.(png|jpe?g|gif|webp|bmp|avif|svg)$/i.exec(file.name)?.[1].toLowerCase() : undefined);
}

export async function saveClipboardImage(app: App, sourcePath: string, image: File): Promise<string> {
  const ext = extension(image);
  if (!ext) throw new Error(t("This image format is not supported."));
  const bytes = await image.arrayBuffer();
  if (!bytes.byteLength) throw new Error(t("The clipboard image is empty."));
  const now = new Date();
  const stamp = [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()].map(value => String(value).padStart(2,'0')).join('');
  const name = `Pasted image ${stamp}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const path = await app.fileManager.getAvailablePathForAttachment(name, sourcePath);
    try {
      const file = await app.vault.createBinary(path, bytes);
      const link = app.fileManager.generateMarkdownLink(file, sourcePath);
      return link.startsWith('!') ? link : `!${link}`;
    } catch (error) {
      // A sync or second paste can claim an available name before createBinary.
      if (attempt === 2 || !app.vault.getAbstractFileByPath(path)) throw error;
    }
  }
  throw new Error(t("Could not save the attachment."));
}

export function attachImagePaste(input: HTMLTextAreaElement, options: {
  save: (image: File) => Promise<string>;
  status: (text: string) => void;
  report: (error: string) => void;
}): () => void {
  let active = true, busy = false;
  const paste = (event: ClipboardEvent) => {
    if (event.defaultPrevented || !active) return;
    const data = event.clipboardData;
    if (!data) return;
    const items = Array.from(data.items ?? []).filter(item => item.kind === 'file').map(item => item.getAsFile()).filter((file): file is File => !!file);
    const images = (items.length ? items : Array.from(data.files ?? [])).filter(file => extension(file));
    if (!images.length) return;
    event.preventDefault(); event.stopPropagation();
    if (busy || input.readOnly) return;
    busy = true; input.readOnly = true; input.setAttribute('aria-busy','true');
    let start = input.selectionStart, end = input.selectionEnd;
    options.status(t("Saving image…"));
    void (async () => {
      try {
        for (let index = 0; index < images.length; index++) {
          if (!active) return;
          const embed = await options.save(images[index]);
          if (!active) { options.report(t("Attachment saved, but the editor is already closed: {link}", { link: embed })); return; }
          input.setRangeText((index ? ' ' : '') + embed, start, end, 'end');
          start = end = input.selectionEnd;
          input.dispatchEvent(new input.ownerDocument.defaultView!.Event('input', {bubbles:true}));
        }
        options.status('');
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (active) options.status(message);
        options.report(message);
      } finally {
        busy = false;
        if (active) { input.readOnly = false; input.removeAttribute('aria-busy'); input.focus({preventScroll:true}); }
      }
    })();
  };
  input.addEventListener('paste', paste);
  return () => { active = false; input.removeEventListener('paste', paste); };
}
