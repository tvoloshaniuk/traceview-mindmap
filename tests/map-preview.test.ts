/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {parseMap} from '../src/core';
import {renderMapPreview} from '../src/map-preview';

test('map previews bound visible branches and turn nested embeds into safe relative links', () => {
  const dom = new JSDOM('<div></div>'), host = dom.window.document.querySelector('div')!;
  const source = '- <script>never execute</script> ![[Nested.mindmap|Nested]]\n' + Array.from({length: 40}, (_, i) => '- item ' + i).join('\n');
  const resolved: string[] = [];
  renderMapPreview(host, parseMap(source), 'Map.mindmap', value => {resolved.push(value);return 'folder/' + value;});
  assert.equal(host.querySelectorAll('.tvm-embedded-map-branch').length,24);
  assert.equal(host.querySelector('script'),null);
  assert.equal(host.querySelector('a')?.dataset.href,'folder/Nested.mindmap');
  assert.equal(host.querySelector('a')?.textContent,'Nested');
  assert.deepEqual(resolved,['Nested.mindmap']);
  assert.equal(host.querySelectorAll('.tvm-embedded-map').length,1);
  assert.equal(host.lastElementChild?.lastElementChild?.textContent,'…');
  dom.window.close();
});

test('map preview depth is bounded and omitted deep nodes retain a full-map link', () => {
  const dom = new JSDOM('<div></div>'), host = dom.window.document.querySelector('div')!;
  const source = Array.from({length:10}, (_, i) => '\t'.repeat(i) + '- level ' + i).join('\n');
  renderMapPreview(host,parseMap(source),'Deep.mindmap',()=>null);
  assert.equal(host.querySelectorAll('.tvm-embedded-map-branch').length,4);
  assert.equal(host.querySelector('a')?.dataset.href,'Deep.mindmap');
  dom.window.close();
});
