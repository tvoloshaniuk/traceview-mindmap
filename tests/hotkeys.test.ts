/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { captureHotkey, matchesHotkey, resolveHotkey, validateHotkeys } from '../src/hotkeys';

const key = (overrides: Partial<KeyboardEvent> = {}) => ({ key: 'с', code: 'KeyC', ctrlKey: true, metaKey: false, altKey: false, shiftKey: false, isComposing: false, getModifierState: () => false, ...overrides });

test('physical keys work with Ukrainian labels and custom capture', () => {
  assert.equal(resolveHotkey(key()), 'copy');
  assert.equal(resolveHotkey(key({key:'ч',code:'KeyX'})), 'cut');
  assert.equal(resolveHotkey(key({key:'ч',code:'KeyX'}),{cut:''}), null);
  assert.equal(resolveHotkey(key({code:'KeyQ',ctrlKey:false,altKey:true}),{cut:'Alt+KeyQ'}), 'cut');
  assert.equal(resolveHotkey(key({ key: 'м', code: 'KeyV' })), 'paste');
  assert.equal(captureHotkey(key({ shiftKey: true })), 'Ctrl+Shift+KeyC');
  assert.equal(resolveHotkey(key(), { copy: '' }), null);
  assert.equal(resolveHotkey(key({ key: 'й', code: 'KeyQ', ctrlKey: false, altKey: true }), { copy: 'Alt+KeyQ' }), 'copy');
  assert.equal(resolveHotkey(key({ key: '!', code: 'Digit1', ctrlKey: false, altKey: true, shiftKey: true })), 'depth-1');
});

test('bindings reject extra modifiers, composing input, and AltGr', () => {
  assert.equal(matchesHotkey(key({ metaKey: true }), 'Mod+KeyC'), false);
  assert.equal(matchesHotkey(key({ altKey: true }), 'Mod+KeyC'), false);
  assert.equal(resolveHotkey(key({ isComposing: true })), null);
  assert.equal(resolveHotkey(key({ getModifierState: value => value === 'AltGraph' })), null);
  assert.equal(captureHotkey(key({ key: 'Control', code: 'ControlLeft' })), null);
  assert.equal(matchesHotkey(key({ ctrlKey: false, metaKey: true }), 'Mod+KeyC'), true);
});

test('binding validation accepts disabled and multiple shortcuts but rejects malformed modifiers', () => {
  assert.equal(validateHotkeys(''), null);
  assert.equal(validateHotkeys('Ctrl+KeyC, Meta+KeyC'), null);
  assert.equal(validateHotkeys('Alt+Shift+Digit1'), null);
  for (const binding of ['Ctrl+', 'Ctrl++KeyC', 'Bogus+KeyC', 'Mod+Ctrl+KeyC', 'Ctrl+Control+KeyC']) assert.ok(validateHotkeys(binding), binding);
  assert.equal(matchesHotkey(key(), 'Bogus+KeyC'), false);
});
