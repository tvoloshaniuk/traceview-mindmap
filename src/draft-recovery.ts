/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import type { App } from 'obsidian';
import type { NodeAction } from './types';

export interface LocalDraft {
  key: string;
  path: string;
  nodeId: string;
  original: string;
  action: NodeAction;
  text: string;
}

// Store the index separately: typing updates only the active draft.
export class DraftRecovery {
  private prefix = 'traceview-mindmap:drafts:';
  constructor(private app: App) {}
  private keys(): string[] { return this.app.loadLocalStorage(this.prefix) ?? []; }
  list(): LocalDraft[] {
    return this.keys().map(key => this.app.loadLocalStorage(this.prefix + key)).filter(Boolean);
  }
  save(draft: LocalDraft): void {
    const keys = this.keys();
    if (!keys.includes(draft.key)) this.app.saveLocalStorage(this.prefix, [...keys, draft.key]);
    this.app.saveLocalStorage(this.prefix + draft.key, draft);
  }
  remove(key: string): void {
    this.app.saveLocalStorage(this.prefix + key, null);
    this.app.saveLocalStorage(this.prefix, this.keys().filter(item => item !== key));
  }
}
