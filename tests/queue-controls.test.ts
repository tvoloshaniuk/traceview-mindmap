/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMap } from '../src/core';
import { queueLabel, queueMapMatcher, queueFolderPrefix, queueCounts, queueMetric, compareQueueMaps } from '../src/queue-controls';

test('queue marker settings are independent and preserve step numbers, dates and links', () => {
  const text = '[ ] #step 1.1) [[Programming|#step alias]] ![[image.png]]';
  assert.equal(queueLabel(text), text);
  assert.equal(queueLabel(text, false, true), '#step 1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel(text, true, false), '[ ] 1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel(text, false, false), '1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel('[ ] #step до [[2026-10-14]] Deadline', false, false), 'до [[2026-10-14]] Deadline');
  for (const text of ['[[Ghost]] #step', '`#step`', '#steps other tag', 'Explain [ ] and #step']) assert.equal(queueLabel(text, false, false), text);
});

test('queue map filters support paths, text, glob and explicit regular expressions', () => {
  assert.equal(queueMapMatcher('')('Folder/Plan.md'), true);
  assert.equal(queueMapMatcher('plan')('Folder/PLAN.md'), true);
  assert.equal(queueMapMatcher('Folder/Plan.md')('Other/Plan.md'), false);
  assert.equal(queueMapMatcher('*.mindmap.md')('Folder/Plan.mindmap.md'), true);
  assert.equal(queueMapMatcher('/^Folder\\/.*Plan/')('Folder/MyPlan.md'), true);
  assert.equal(queueMapMatcher('/^Folder\\//')('Other/Plan.md'), false);
  assert.throws(() => queueMapMatcher('/[/'));
});

test('folder filters include descendants without matching similarly named or nested unrelated folders', () => {
  const matches=queueMapMatcher('Plans/');
  assert.equal(matches('Plans/One.md'),true);assert.equal(matches('plans/Sub/Two.md'),true);
  assert.equal(matches('Plans2/Other.md'),false);assert.equal(matches('Other/Plans/Three.md'),false);
  assert.equal(queueFolderPrefix(' Plans/Sub/ '),'Plans/Sub/');
  assert.equal(queueFolderPrefix('/Plans/'),undefined);assert.equal(queueFolderPrefix('Plans/*'),undefined);
});


test('planning metrics count excluded branches consistently and rank the selected metric', () => {
  const counts=queueCounts(parseMap('- [ ] #step 1) Open\n- [x] #step 2) Done\n- [ ] #step до [[2026-12-01]] Due\n- ❌ Excluded\n\t- [ ] #step 3) Hidden\n- [[QA ❓]] Question'),['❌']);
  assert.equal(counts.open,2);assert.equal(counts.total,3);assert.equal(counts.datesOpen,1);assert.equal(counts.questions,1);
  assert.deepEqual(queueMetric(counts,'open-total'),{text:'2/3',value:2});
  assert.deepEqual(queueMetric(counts,'closed-total'),{text:'1/3',value:1});
  assert.deepEqual(queueMetric(counts,'total'),{text:'3',value:3});
  assert.deepEqual(queueMetric(counts,'open','dates'),{text:'1',value:1});
  const a={path:'A',basename:'A',score:2},b={path:'B',basename:'B',score:5};
  assert.ok(compareQueueMaps(a,b,'asc')<0);assert.ok(compareQueueMaps(a,b,'desc')>0);
  assert.ok(compareQueueMaps(a,b,'none')<0);assert.ok(compareQueueMaps({path:'Missing',basename:'Missing'},b,'desc')>0);
});
