/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dictionaries, getLocale, isLanguageSetting, LANGUAGES, resolveLanguage, setLanguage, t, type Language } from '../src/i18n';
import { HOTKEY_DEFINITIONS } from '../src/hotkeys';
import { parseMap, setDated, getSteps } from '../src/core';

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();

test('all language catalogs cover every message and preserve interpolation parameters', () => {
  const keys = Object.keys(dictionaries.en).sort();
  assert.equal(Object.keys(LANGUAGES).length, 11);
  for (const [language, dictionary] of Object.entries(dictionaries)) {
    assert.deepEqual(Object.keys(dictionary).sort(), keys, language);
    for (const key of keys) {
      const message = key as keyof typeof dictionaries.en;
      const value = dictionary[message]!;
      assert.ok(value.trim(), `${language}: ${key}`);
      assert.deepEqual(placeholders(value), placeholders(key), `${language}: ${key}`);
    }
  }
});

test('automatic language normalizes regions and unsupported languages fall back to English', () => {
  for (const [code, expected] of [['uk-UA', 'uk'], ['ru-RU', 'ru'], ['zh', 'zh-CN'], ['zh_TW', 'zh-CN'], ['pt', 'pt-BR'], ['ja-JP', 'ja'], ['en-GB', 'en'], ['ar', 'en'], ['constructor', 'en']]) {
    assert.equal(resolveLanguage(code), expected);
  }
  for (const value of ['auto', ...Object.keys(LANGUAGES)]) assert.equal(isLanguageSetting(value), true);
  for (const value of [undefined, 1, 'constructor', 'unknown']) assert.equal(isLanguageSetting(value), false);
  setLanguage('auto', 'ja-JP');
  assert.equal(getLocale(), 'ja');
  assert.equal(t('Save'), '保存');
  setLanguage('uk', 'en');
  assert.equal(t('Save'), 'Зберегти');
  const label = HOTKEY_DEFINITIONS.find(definition => definition.id === 'copy')!;
  assert.equal(label.label, 'Копіювати гілку');
  setLanguage('en');
  assert.equal(label.label, 'Copy branch');
});

test('interpolation is literal, missing translations fall back, and locale preserves stored step syntax', () => {
  const original = dictionaries.ja.Save;
  try {
    setLanguage('ja');
    delete dictionaries.ja.Save;
    assert.equal(t('Save'), 'Save');
    assert.equal(t('Saved {path}', { path: '$&/{name}/[file].md' }), '保存しました: $&/{name}/[file].md');
  } finally { dictionaries.ja.Save = original; }
  const source = '- Root\n  - [ ] #step 1) [[Ghost|Alias]] ^stable-id\n';
  const doc = parseMap(source);
  for (const language of Object.keys(LANGUAGES) as Language[]) {
    setLanguage(language);
    const updated = setDated(doc, doc.nodes[1].id, '2026-11-06');
    assert.ok(updated.includes('[[Ghost|Alias]] ^stable-id'));
    assert.equal(getSteps(parseMap(updated))[0].date, '2026-11-06');
  }
  setLanguage('en');
});
