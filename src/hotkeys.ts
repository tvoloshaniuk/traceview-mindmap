/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { t } from './i18n';
import type { NodeAction } from './types';

export type HotkeyAction = NodeAction | 'parent' | 'child' | 'previous' | 'next' | 'first' | 'last' | 'fold'
  | 'select-previous' | 'select-next' | 'select-parent' | 'select-child' | 'select-all' | 'collapse-all' | 'collapse-branch' | 'expand-branch' | 'depth-0' | 'depth-1' | 'depth-2' | 'depth-3' | 'depth-4' | 'depth-5' | 'depth-all' | 'fit' | 'find';
export interface HotkeyDefinition { id: HotkeyAction; label: string; defaults: string[] }

export const HOTKEY_DEFINITIONS: HotkeyDefinition[] = [
  { id: 'select-previous', get label() { return t("Extend selection up"); }, defaults: ['Shift+ArrowUp'] },
  { id: 'select-next', get label() { return t("Extend selection down"); }, defaults: ['Shift+ArrowDown'] },
  { id: 'select-parent', get label() { return t("Extend selection to parent"); }, defaults: ['Shift+ArrowLeft'] },
  { id: 'select-child', get label() { return t("Extend selection to child"); }, defaults: ['Shift+ArrowRight'] },
  { id: 'select-all', get label() { return t("Select all visible nodes"); }, defaults: ['Mod+KeyA'] },
  { id: 'cut', get label() { return t("Cut branch"); }, defaults: ['Mod+KeyX'] },
  { id: 'copy-node-link', get label() { return t("Copy link to node"); }, defaults: [] },
  { id: 'copy', get label() { return t("Copy branch"); }, defaults: ['Mod+KeyC'] },
  { id: 'paste', get label() { return t("Paste as child branch"); }, defaults: ['Mod+KeyV'] },
  { id: 'paste-after', get label() { return t("Paste branch after node"); }, defaults: [] },
  { id: 'undo', get label() { return t("Undo"); }, defaults: ['Mod+KeyZ'] },
  { id: 'redo', get label() { return t("Redo"); }, defaults: ['Mod+Shift+KeyZ', 'Mod+KeyY'] },
  { id: 'edit', get label() { return t("Edit node"); }, defaults: ['F2'] },
  { id: 'add-child', get label() { return t("Add child node"); }, defaults: ['Tab'] },
  { id: 'add-parent', get label() { return t("Add parent node"); }, defaults: ['Mod+Tab'] },
  { id: 'add-sibling-before', get label() { return t("Add sibling above"); }, defaults: [] },
  { id: 'add-sibling', get label() { return t("Add sibling node"); }, defaults: ['Enter'] },
  { id: 'delete', get label() { return t("Delete branch"); }, defaults: ['Delete'] },
  { id: 'move-up', get label() { return t("Move branch up"); }, defaults: ['Mod+Shift+ArrowUp'] },
  { id: 'move-down', get label() { return t("Move branch down"); }, defaults: ['Mod+Shift+ArrowDown'] },
  { id: 'indent', get label() { return t("Make child of previous node"); }, defaults: [] },
  { id: 'outdent', get label() { return t("Move up one level"); }, defaults: ['Shift+Tab'] },
  { id: 'toggle-task', get label() { return t("Toggle completion"); }, defaults: ['Mod+Enter'] },
  { id: 'make-step', get label() { return t("Make numbered step"); }, defaults: [] },
  { id: 'make-dated', get label() { return t("Set date"); }, defaults: [] },
  { id: 'make-question', get label() { return t("Mark as question"); }, defaults: [] },
  { id: 'source', get label() { return t("Open source Markdown"); }, defaults: [] },
  { id: 'parent', get label() { return t("Select parent node"); }, defaults: ['ArrowLeft'] },
  { id: 'child', get label() { return t("Select child node"); }, defaults: ['ArrowRight'] },
  { id: 'previous', get label() { return t("Select previous sibling"); }, defaults: ['ArrowUp'] },
  { id: 'next', get label() { return t("Select next sibling"); }, defaults: ['ArrowDown'] },
  { id: 'first', get label() { return t("Select first node"); }, defaults: ['Home'] },
  { id: 'last', get label() { return t("Select last node"); }, defaults: ['End'] },
  { id: 'fold', get label() { return t("Collapse / expand node"); }, defaults: ['Space'] },
  { id: 'collapse-all', get label() { return t("Collapse all roots"); }, defaults: [] },
  { id: 'collapse-branch', get label() { return t("Collapse selected branch"); }, defaults: ['Mod+Alt+ArrowLeft'] },
  { id: 'expand-branch', get label() { return t("Expand selected branch"); }, defaults: ['Mod+Alt+ArrowRight'] },
  { id: 'depth-0', get label() { return t("Selected node only"); }, defaults: ['Alt+Shift+Digit0'] },
  { id: 'depth-1', get label() { return t("Show one child level"); }, defaults: ['Alt+Shift+Digit1'] },
  { id: 'depth-2', get label() { return t("Show two child levels"); }, defaults: ['Alt+Shift+Digit2'] },
  { id: 'depth-3', get label() { return t("Show three child levels"); }, defaults: ['Alt+Shift+Digit3'] },
  { id: 'depth-4', get label() { return t("Show four child levels"); }, defaults: ['Alt+Shift+Digit4'] },
  { id: 'depth-5', get label() { return t("Show five child levels"); }, defaults: ['Alt+Shift+Digit5'] },
  { id: 'depth-all', get label() { return t("Expand all child levels"); }, defaults: ['Alt+Shift+Digit9'] },
  { id: 'find', get label() { return t("Find in map"); }, defaults: ['Mod+KeyF'] },
  { id: 'fit', get label() { return t("Fit map"); }, defaults: [] },
];

export const DEFAULT_HOTKEYS: Record<string, string> = Object.fromEntries(HOTKEY_DEFINITIONS.map(definition => [definition.id, definition.defaults.join(', ')]));

type KeyEvent = Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'isComposing' | 'getModifierState'>;

function codeFor(key: string, code = ''): string {
  if (code && code !== 'Unidentified') return code;
  if (/^[a-z]$/i.test(key)) return `Key${key.toUpperCase()}`;
  if (/^\d$/.test(key)) return `Digit${key}`;
  if (key === ' ' || key === 'Spacebar') return 'Space';
  if (key === 'Esc') return 'Escape';
  return key;
}

export function captureHotkey(event: KeyEvent): string | null {
  if (event.isComposing || event.getModifierState?.('AltGraph')) return null;
  const code = codeFor(event.key, event.code);
  if (!code || /^(?:Control|Shift|Alt|Meta|OS)(?:Left|Right)?$/.test(code)) return null;
  return [event.ctrlKey && 'Ctrl', event.metaKey && 'Meta', event.altKey && 'Alt', event.shiftKey && 'Shift', code].filter(Boolean).join('+');
}

export function validateHotkeys(binding: string): string | null {
  if (!binding.trim()) return null;
  for (const value of binding.split(',')) {
    const parts = value.split('+').map(part => part.trim().toLowerCase());
    const key = parts.pop();
    if (!key || !/^[\w-]+$/.test(key) || /^(?:ctrl|control|alt|shift|meta|cmd|mod)$/.test(key)) return t("Specify a key after the modifiers.");
    const modifiers = parts.map(part => part === 'control' ? 'ctrl' : part === 'cmd' ? 'meta' : part);
    if (modifiers.some(part => !['ctrl', 'alt', 'shift', 'meta', 'mod'].includes(part))) return t("Modifiers: Ctrl, Alt, Shift, Meta or Mod.");
    if (new Set(modifiers).size !== modifiers.length || (modifiers.includes('mod') && (modifiers.includes('ctrl') || modifiers.includes('meta')))) return t("Do not repeat modifiers. Mod already means Ctrl or Cmd.");
  }
  return null;
}

export function matchesHotkey(event: KeyEvent, binding: string): boolean {
  if (event.isComposing || event.getModifierState?.('AltGraph') || validateHotkeys(binding)) return false;
  const parts = binding.split('+').map(part => part.trim()).filter(Boolean);
  const key = parts.pop();
  if (!key) return false;
  const modifiers = new Set(parts.map(part => part.toLowerCase()));
  const mod = modifiers.has('mod');
  if (mod ? event.ctrlKey === event.metaKey : event.ctrlKey !== (modifiers.has('ctrl') || modifiers.has('control'))) return false;
  if (!mod && event.metaKey !== (modifiers.has('meta') || modifiers.has('cmd'))) return false;
  if (event.altKey !== modifiers.has('alt') || event.shiftKey !== modifiers.has('shift')) return false;
  return codeFor(event.key, event.code).toLowerCase() === codeFor(key).toLowerCase();
}

export function resolveHotkey(event: KeyEvent, bindings: Record<string, string> = {}): HotkeyAction | null {
  for (const definition of HOTKEY_DEFINITIONS) {
    const binding = bindings[definition.id] ?? DEFAULT_HOTKEYS[definition.id];
    if (binding.split(',').some(value => matchesHotkey(event, value))) return definition.id;
  }
  return null;
}
