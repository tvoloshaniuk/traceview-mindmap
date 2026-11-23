/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { App, FuzzySuggestModal, Notice, TFile, TFolder, Vault } from 'obsidian';
import { t } from './i18n';

interface Templater {
  fuzzy_suggester: { getItems(): TFile[]; getItemText(file: TFile): string };
  templater: { append_template_to_active_file(file: TFile): Promise<void> };
}
interface CoreTemplates {
  options: { folder?: string };
  insertTemplate(file: TFile): Promise<void>;
}

export interface NodeTemplate {
  label: string;
  insert(): Promise<void>;
}

// Both providers need an active file editor. List their templates here so cancelling
// the picker never opens a Markdown tab or changes the map selection.
export class NodeTemplatePicker extends FuzzySuggestModal<NodeTemplate> {
  private items: NodeTemplate[];
  constructor(app: App, private choose: (item: NodeTemplate) => Promise<void>) {
    super(app);
    this.setPlaceholder(t("Insert template at selected node…"));
    this.items = this.listTemplates();
    if (!this.items.length) this.emptyStateText = t("Enable Templater or Templates and configure a template folder.");
  }

  private listTemplates(): NodeTemplate[] {
    const host = this.app as App & {
      plugins?: { getPlugin(id: string): Templater | null };
      internalPlugins?: { getEnabledPluginById(id: string): CoreTemplates | null };
    };
    const items: NodeTemplate[] = [];
    const tp = host.plugins?.getPlugin('templater-obsidian');
    if (tp?.fuzzy_suggester?.getItems && tp.templater?.append_template_to_active_file) {
      for (const file of tp.fuzzy_suggester.getItems()) items.push({
        label: tp.fuzzy_suggester.getItemText(file) + ' · Templater',
        insert: () => tp.templater.append_template_to_active_file(file)
      });
    }
    const core = host.internalPlugins?.getEnabledPluginById('templates');
    const folder = core?.options?.folder && this.app.vault.getAbstractFileByPath(core.options.folder);
    if (core?.insertTemplate && folder instanceof TFolder && !folder.isRoot()) {
      Vault.recurseChildren(folder, file => {
        if (file instanceof TFile && file.extension === 'md') items.push({
          label: file.path.slice(folder.path.length + 1, -3) + ' · Templates',
          insert: () => core.insertTemplate(file)
        });
      });
    }
    return items;
  }

  getItems(): NodeTemplate[] { return this.items; }
  getItemText(item: NodeTemplate): string { return item.label; }
  onChooseItem(item: NodeTemplate): void {
    void this.choose(item).catch(error => new Notice(error instanceof Error ? error.message : String(error), 8000));
  }
}
