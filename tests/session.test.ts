import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guardedChange, History, parseState, serializeViewState, restoreViewState } from '../src/session';
import { parseMap, editNode } from '../src/core';

test('stale edits cannot overwrite incoming Syncthing content', () => {
  assert.throws(() => guardedChange('new phone edit', 'old desktop content', 'desktop change'));
  assert.equal(guardedChange('old', 'old', 'new'), 'new');
});
test('undo and redo only work against their exact source revision', () => {
  const history = new History();
  history.push('a', 'b');
  assert.equal(history.can('undo', 'b'), true);
  assert.equal(history.can('undo', 'external'), false);
  assert.throws(() => history.peek('undo', 'external'));
  assert.equal(history.peek('undo', 'b'), 'a');
  history.commit('undo');
  assert.equal(history.peek('redo', 'a'), 'b');
  history.commit('redo');
  history.push('b', 'c');
  assert.equal(history.peek('redo', 'c'), null);
});

test('saved folds survive external decimal renumbering and ancestor rename', () => {
  const doc = parseMap('- Root\n  - [ ] #step 1.1) Task\n    - Child\n');
  const saved = serializeViewState(doc, { collapsed: [doc.nodes[1].id], selected: doc.nodes[1].id, focusRoot: null, camera: { x: 0, y: 0, scale: 1 } });
  const changed = parseMap('- Renamed\n  - [ ] #step 2) Task\n    - Child\n');
  const restored = restoreViewState(changed, saved)!;
  assert.deepEqual(restored.collapsed, [changed.nodes[1].id]);
  assert.equal(restored.selected, changed.nodes[1].id);
});
test('malformed saved state cannot poison layout', () => {
  assert.equal(parseState('{broken'), undefined);
  assert.equal(parseState('{"collapsed":[],"camera":{"x":0,"y":0,"scale":"bad"}}'), undefined);
  assert.deepEqual(parseState('{"collapsed":["x",4],"camera":{"x":0,"y":0,"scale":99}}')?.collapsed, ['x']);
  assert.equal(parseState('{"collapsed":[],"camera":{"x":0,"y":0,"scale":99}}')?.camera.scale, 32);
  assert.equal(parseState('{"collapsed":[],"camera":{"x":0,"y":0,"scale":16}}')?.camera.scale, 16);
});

test('renamed ancestors preserve folded descendants after full close and reopen', () => {
  const original = parseMap('- Root\n  - Branch\n    - Leaf\n');
  const renamed = parseMap(editNode(original, original.roots[0], 'Renamed root'), original);
  const state = { collapsed: [renamed.nodes[1].id], selected: renamed.nodes[1].id, focusRoot: null, camera: { x: -111, y: 27, scale: 0.8 } };
  const saved = serializeViewState(renamed, state);
  const fresh = parseMap(renamed.source);
  const restored = restoreViewState(fresh, saved)!;
  assert.deepEqual(restored.collapsed, [fresh.nodes[1].id]);
  assert.equal(restored.selected, fresh.nodes[1].id);
  assert.deepEqual(restored.camera, state.camera);
});

test('external ancestor rename while closed restores unique folded branch labels', () => {
  const original = parseMap('- Root\n  - Branch\n    - Leaf\n');
  const saved = serializeViewState(original, { collapsed: [original.nodes[1].id], selected: original.nodes[1].id, focusRoot: null, camera: { x: 5, y: 8, scale: 1 } });
  const fresh = parseMap('- Different root\n  - Inserted sibling\n  - Branch\n    - Leaf\n');
  assert.deepEqual(restoreViewState(fresh, saved)!.collapsed, [fresh.nodes[2].id]);
});
