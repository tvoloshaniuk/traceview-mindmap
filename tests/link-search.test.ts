import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLinkTargets, normalizeLinkQuery, searchLinkTargets, type FileLinkInput } from '../src/link-search';

const file = (path: string, aliases: string[] = []): FileLinkInput => ({
  path, basename: path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, ''), aliases,
});

test('Programming note ranks before thousands of matching folder paths', () => {
  const files = Array.from({ length: 1500 }, (_, i) => file(`repo/Programming/topic-${i}.md`));
  files.push(file('System 5(1).0/Programming.md'), file('System 5(1).0/programming language.md'));
  const targets = buildLinkTargets(files, {});
  const result = searchLinkTargets(targets, 'Programming');
  assert.equal(result.length, 80);
  assert.equal(result[0].path, 'System 5(1).0/Programming.md');
  assert.equal(result[1].label, 'programming language');
  assert.ok(result.every(target => target.kind !== 'new'));
  assert.equal(searchLinkTargets(targets, 'Programmin')[0].label, 'Programming');
});

test('aliases and Unicode search retain original spelling and destination', () => {
  const targets = buildLinkTargets([file('Система/Навчання.md', ['Освіта', 'навчання', 'Освіта'])], {});
  assert.equal(targets.length, 2);
  assert.equal(searchLinkTargets(targets, 'НАВЧАННЯ')[0].path, 'Система/Навчання.md');
  assert.deepEqual(searchLinkTargets(targets, 'освіта')[0], {
    kind: 'file', path: 'Система/Навчання.md', label: 'Освіта', alias: 'Освіта',
  });
  assert.equal(searchLinkTargets(targets, 'нвчнн')[0].label, 'Навчання');
});

test('same note names from separate folders remain distinct', () => {
  const targets = buildLinkTargets([file('b/Programming.md'), file('a/Programming.md')], {});
  const result = searchLinkTargets(targets, 'Programming');
  assert.deepEqual(result.map(target => target.path), ['a/Programming.md', 'b/Programming.md']);
});

test('unresolved links are searchable, deduplicated and count references', () => {
  const targets = buildLinkTargets([], { 'steam programming games fest': 2, 'Steam Programming Games Fest': 3, 'Plans/future.mindmap#Next': 1 });
  const result = searchLinkTargets(targets, 'steam programming games fest');
  assert.deepEqual(result, [{ kind: 'ghost', path: 'steam programming games fest', label: 'steam programming games fest', references: 5 }]);
  assert.equal(targets[1].path, 'Plans/future.mindmap#Next');
  assert.equal(searchLinkTargets(targets, 'future.mindmap#Next')[0].kind, 'ghost');
});

test('already resolved paths, titles, sections and aliases do not become ghosts', () => {
  const targets = buildLinkTargets([file('Folder/Programming.md', ['Coding'])], {
    Programming: 1, 'programming.md': 1, 'Folder/Programming': 1,
    'Folder/Programming.md#Basics': 1, CODING: 1, 'Programming#Basics': 1,
    'Different/Programming': 1,
  });
  assert.deepEqual(targets.filter(target => target.kind === 'ghost').map(target => target.path), ['Different/Programming']);
});

test('new target remains available among partial matches without creating files', () => {
  const targets = buildLinkTargets([file('Programming.md'), file('Program notes.md')], {});
  const result = searchLinkTargets(targets, '  Program  ', 2);
  assert.equal(result.length, 2);
  assert.deepEqual(result[1], { kind: 'new', path: 'Program', label: 'Program' });
  assert.deepEqual(searchLinkTargets(targets, 'Never existed'), [{ kind: 'new', path: 'Never existed', label: 'Never existed' }]);
  assert.equal(searchLinkTargets(targets, 'Programming.md').some(target => target.kind === 'new'), false);
  assert.equal(searchLinkTargets(targets, '', 1)[0].kind, 'file');
  assert.deepEqual(searchLinkTargets(targets, 'New', 0), []);
});

test('surrounding wiki brackets normalize while invalid link text cannot produce a new target', () => {
  assert.equal(normalizeLinkQuery('  [[  Моя карта.mindmap#Крок  ]]  '), 'Моя карта.mindmap#Крок');
  assert.deepEqual(searchLinkTargets([], ' [[ Future.mindmap ]] '), [{ kind: 'new', path: 'Future.mindmap', label: 'Future.mindmap' }]);
  for (const query of ['', ' ', '[]', '[[unfinished', 'bad|alias', 'bad\nname', 'bad\rname', 'bad\u0000name']) {
    assert.deepEqual(searchLinkTargets([], query), [], query);
  }
  assert.deepEqual(buildLinkTargets([], { 'bad|alias': 1, '[[unfinished': 1, '#section only': 1 }), []);
});
