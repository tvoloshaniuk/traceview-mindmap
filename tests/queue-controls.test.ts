import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queueLabel } from '../src/queue-controls';

test('queue marker settings are independent and preserve step numbers, dates and links', () => {
  const text = '[ ] #step 1.1) [[Programming|#step alias]] ![[image.png]]';
  assert.equal(queueLabel(text), text);
  assert.equal(queueLabel(text, false, true), '#step 1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel(text, true, false), '[ ] 1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel(text, false, false), '1.1) [[Programming|#step alias]] ![[image.png]]');
  assert.equal(queueLabel('[ ] #step до [[2026-10-14]] Deadline', false, false), 'до [[2026-10-14]] Deadline');
  for (const text of ['[[Ghost]] #step', '`#step`', '#steps other tag', 'Explain [ ] and #step']) assert.equal(queueLabel(text, false, false), text);
});
