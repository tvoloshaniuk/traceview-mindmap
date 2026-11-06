/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compileMapPatterns, PatternError } from '../src/map-patterns';

test('glob rules match names or vault-relative paths, including Unicode and zero-directory **', () => {
  const matches = compileMapPatterns({ patternMode: 'glob', mapPatterns: '*.mindmap.md\n🎯*.md\nPlans/**/task?.md\nA/[literal]+.md' });
  for (const path of ['Tree.mindmap.md', 'Folder/Tree.MINDMAP.MD', 'Projects/🎯 Мета.md', 'Plans/task1.md', 'Plans/2026/Deep/task2.md', 'A/[literal]+.md']) assert.equal(matches(path), true, path);
  for (const path of ['Tree.md', 'Plans/task12.md', 'Else/Plans/task1.md', 'A/literal.md', 'File.mindmap.md.sync-conflict-2026.md', '🎯task.png']) assert.equal(matches(path), false, path);
  assert.equal(matches('Plans\\task1.md'), true);
  const direct = compileMapPatterns({ patternMode: 'glob', mapPatterns: 'Plans/*.md' });
  assert.equal(direct('Plans/One.md'), true);
  assert.equal(direct('Plans/Sub/One.md'), false);
  assert.equal(compileMapPatterns({ patternMode: 'glob', mapPatterns: '**/*.md' })('Root.md'), true);
});

test('regex matches paths repeatedly without state and reports the original invalid line', () => {
  const matches = compileMapPatterns({ patternMode: 'regex', mapPatterns: '^Projects/.*\\.md$\n(^|/)🎯' });
  for (let iteration = 0; iteration < 3; iteration++) {
    assert.equal(matches('Projects/Tree.md'), true);
    assert.equal(matches('Folder/🎯 Goal.md'), true);
    assert.equal(matches('Else/Tree.md'), false);
  }
  assert.throws(() => compileMapPatterns({ patternMode: 'regex', mapPatterns: '^ok\n\n[' }), error => error instanceof PatternError && error.line === 3);
});

test('explicit map properties work with empty patterns, while conflicts and attachments remain excluded', () => {
  const matches = compileMapPatterns({ patternMode: 'glob', mapPatterns: ' \n' });
  assert.equal(matches('Plain.md'), false);
  assert.equal(matches('Plain.md', { mindmap: true }), true);
  assert.equal(matches('Plain.md', { 'mindmap-plugin': 'basic' }), true);
  assert.equal(matches('Plain.md', { mindmap: 'false' }), false);
  assert.equal(matches('Image.png', { mindmap: true }), false);
  assert.equal(matches('Note.sync-conflict-1.md', { mindmap: true }), false);
});
