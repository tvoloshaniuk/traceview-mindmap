import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMap, editNode, addNode, addParent, deleteNode, moveNode, reparentNode, copyBranch, pasteBranch, toggleTask, setStep, setDated, setQuestion, getSteps, compareSteps, renumberSteps } from '../src/core';
import type { MapDocument } from '../src/types';

const node = (doc: MapDocument, text: string) => {
  const result = doc.nodes.find(item => item.text === text);
  assert.ok(result, `Missing node: ${text}`);
  return result;
};

const sample = '---\r\ntags: mindmap\r\nmindmap-plugin: basic\r\n---\r\n\r\n# /\r\n\r\n## Мета [[Вектор|життя]]\r\n- ▶️ Наступна дія\r\n    - [ ] #step 2a) купити [[беруші]] ^mark-abc-def\r\n- 🔥 Живе зараз\r\n\t- [x] #step до [[2026-09-25]] 3) приват банк\r\n\t- [ ] #step ) без вигаданого порядку\r\n- 🧊 Заморожено / колись\r\n    - [ ] #step 7) старе\r\n';

test('real heading, tab, four-space and vector formats retain exact source', () => {
  const doc = parseMap(sample);
  assert.equal(doc.source, sample);
  assert.equal(doc.eol, '\r\n');
  assert.equal(doc.roots.length, 1);
  assert.equal(doc.nodes.length, 8);
  assert.equal(doc.byId.get(doc.roots[0])?.text, 'Мета [[Вектор|життя]]');
  assert.equal(doc.nodes[0].line, 7);
  assert.equal(doc.nodes[0].endLine, 14);
  assert.equal(node(doc, '▶️ Наступна дія').endLine, 9);
  assert.equal(node(doc, '[ ] #step 2a) купити [[беруші]]').blockId, 'mark-abc-def');
  for (const item of doc.nodes) assert.equal(editNode(doc, item.id, item.text), sample);
  assert.deepEqual(parseMap(sample, doc).nodes.map(item => item.id), doc.nodes.map(item => item.id));
});

test('edits splice only the label and preserve mixed endings, indentation and anchors', () => {
  const source = '\uFEFF---\r\ntags: mindmap\n---\r\n# /\n- root\r\n\t+ old text   ^ordinary-id  \n  - tail';
  const doc = parseMap(source), target = node(doc, 'old text');
  assert.equal(editNode(doc, target.id, 'new $text <T>'), source.replace('old text', 'new $text <T>'));
  assert.equal(editNode(doc, target.id, 'new text ^ordinary-id'), source.replace('old text', 'new text'));
  assert.throws(() => editNode(doc, target.id, 'two\nlines'), /one line/);
});

test('code fences, pseudo-root, YAML, rules, and quoted lists are not nodes', () => {
  const source = '---\n- yaml\n---\n# /\n- root\n  ```md\n  - not a node\n  ## neither\n  ```\n  - actual\n---\n> - quoted\n- ```js\n  - code again\n  ```\n- end\n';
  const doc = parseMap(source);
  assert.deepEqual(doc.nodes.map(item => item.text), ['root', 'actual', 'end']);
  assert.equal(editNode(doc, node(doc, 'root').id, 'changed'), source.replace('- root', '- changed'));
  assert.throws(() => deleteNode(doc, node(doc, 'root').id), /code block/);
  assert.throws(() => moveNode(doc, node(doc, 'root').id, 'down'), /code block/);
});

test('bullet-looking fence content cannot close the fence and expose code as nodes', () => {
  const doc = parseMap('- root\n  ````md\n  - ````\n  - still code\n  ```\n  - also code\n  ````\n- actual\n');
  assert.deepEqual(doc.nodes.map(item => item.text), ['root', 'actual']);
});

test('multiple real headings build their own bullet hierarchies', () => {
  const doc = parseMap('# /\n## one\n- a\n  - b\n### subsection\n- c\n## two\n- d\n');
  assert.deepEqual(doc.roots.map(id => doc.byId.get(id)?.text), ['one', 'two']);
  assert.equal(node(doc, 'a').parentId, node(doc, 'one').id);
  assert.equal(node(doc, 'subsection').parentId, node(doc, 'one').id);
  assert.equal(node(doc, 'c').parentId, node(doc, 'subsection').id);
  assert.equal(node(doc, 'one').endLine, 5);
  assert.equal(node(doc, 'two').endLine, 7);
});

test('block IDs are preferred but duplicate anchors and identical sibling labels stay unique', () => {
  const source = '- root\n  - repeated ^same\n  - repeated ^same\n  - unique ^ordinary\n  - repeated\n';
  const doc = parseMap(source);
  assert.equal(new Set(doc.nodes.map(item => item.id)).size, doc.nodes.length);
  assert.equal(node(doc, 'unique').id, 'block:ordinary');
  assert.ok(doc.nodes.filter(item => item.blockId === 'same').every(item => item.id.startsWith('node:')));
  assert.equal(doc.source, source);
});

test('IDs survive task toggles and renumbering, and reconcile through label edits', () => {
  const source = '- root\n  - [ ] #step 2a) first\n  - [x] #step 9) second\n';
  const doc = parseMap(source);
  const toggled = parseMap(toggleTask(doc, doc.nodes[1].id));
  assert.deepEqual(toggled.nodes.map(item => item.id), doc.nodes.map(item => item.id));
  const renumbered = parseMap(renumberSteps(doc));
  assert.deepEqual(renumbered.nodes.map(item => item.id), doc.nodes.map(item => item.id));
  const edited = parseMap(editNode(doc, doc.nodes[1].id, 'different words'), doc);
  assert.equal(edited.nodes[1].id, doc.nodes[1].id);
  assert.equal(edited.byId.get(doc.nodes[0].id)?.children[0], doc.nodes[1].id);
});

test('renaming a node to an existing sibling label cannot steal that sibling identity', () => {
  const source = '- root\n  - first\n    - leaf\n  - second\n    - leaf\n';
  const doc = parseMap(source), changed = parseMap(editNode(doc, node(doc, 'first').id, 'second'), doc);
  assert.deepEqual(changed.nodes.map(item => item.id), doc.nodes.map(item => item.id));
  assert.equal(new Set(changed.nodes.map(item => item.id)).size, changed.nodes.length);
});

test('duplicate-label branches with different contents retain identities when swapped', () => {
  const source = '- root\n  - repeated\n    - first leaf\n  - repeated\n    - second leaf\n';
  const doc = parseMap(source), first = doc.nodes[1], second = doc.nodes[3];
  const moved = parseMap(moveNode(doc, first.id, 'down'), doc);
  assert.equal(moved.nodes[1].id, second.id);
  assert.equal(moved.nodes[3].id, first.id);
  assert.equal(node(moved, 'first leaf').parentId, first.id);
  assert.equal(node(moved, 'second leaf').parentId, second.id);
});

test('structural edits reject opaque branches and labels that would hide the outline', () => {
  const opaque = parseMap('- root\n  ```\n  - inside code');
  assert.throws(() => addNode(opaque, opaque.nodes[0].id, 'child', 'new'), /code block/);
  assert.throws(() => addNode(opaque, opaque.nodes[0].id, 'sibling', 'new'), /code block/);
  assert.throws(() => pasteBranch(opaque, opaque.nodes[0].id, '- new\n'), /code block/);
  const doc = parseMap('- root\n  - safe\n');
  for (const label of ['```', '```javascript', '~~~', '--']) {
    assert.throws(() => editNode(doc, doc.nodes[0].id, label), /code fence or horizontal rule/);
    assert.throws(() => addNode(doc, doc.nodes[0].id, 'child', label), /code fence or horizontal rule/);
  }
  assert.equal(editNode(doc, doc.nodes[1].id, '\\```'), '- root\n  - \\```\n');
});

test('adding children and siblings inherits local indent and preserves end-of-file style', () => {
  const source = '- root\r\n    - first\r\n    - last';
  const doc = parseMap(source);
  assert.equal(addNode(doc, node(doc, 'first').id, 'child', 'nested'), '- root\r\n    - first\r\n        - nested\r\n    - last');
  assert.equal(addNode(doc, node(doc, 'last').id, 'sibling', 'added'), source + '\r\n    - added');
  assert.equal(addNode(doc, node(doc, 'root').id, 'child', 'added'), source + '\r\n    - added');
  assert.equal(addNode(parseMap('- root\n'), parseMap('- root\n').nodes[0].id, 'child', 'new'), '- root\n  - new\n');
});

test('heading child and sibling additions keep intended parent', () => {
  const source = '# /\n## root\n### a\n- leaf\n';
  const doc = parseMap(source);
  const changed = parseMap(addNode(doc, node(doc, 'root').id, 'child', 'b'));
  assert.equal(node(changed, 'b').kind, 'heading');
  assert.equal(node(changed, 'b').parentId, node(changed, 'root').id);
  const sibling = parseMap(addNode(doc, node(doc, 'root').id, 'sibling', 'other'));
  assert.equal(node(sibling, 'other').parentId, null);
  const simple = parseMap('## root\n- leaf\n');
  assert.equal(node(parseMap(addNode(simple, simple.nodes[0].id, 'child', 'second')), 'second').parentId, simple.nodes[0].id);
});

test('adding a parent wraps the complete branch and preserves unrelated bytes, anchors and mixed endings', () => {
  const source = '---\r\ntags: mindmap\n---\r\n- root ^root\r\n\t+ chosen ^chosen\n\t\t- leaf [[Note#^block]] ^leaf\r\n\t+ sibling ^keep';
  const doc = parseMap(source);
  const next = addParent(doc, node(doc, 'chosen').id, 'new parent');
  assert.equal(next, source.replace('\t+ chosen ^chosen\n\t\t- leaf [[Note#^block]] ^leaf', '\t+ new parent\r\n\t\t+ chosen ^chosen\n\t\t\t- leaf [[Note#^block]] ^leaf'));
  const wrapped = parseMap(next, doc);
  assert.equal(node(wrapped, 'chosen').parentId, node(wrapped, 'new parent').id);
  assert.equal(node(wrapped, 'leaf [[Note#^block]]').parentId, node(wrapped, 'chosen').id);
  for (const item of doc.nodes) assert.equal(node(wrapped, item.text).id, item.id);
  assert.equal(node(wrapped, 'sibling').parentId, node(wrapped, 'root').id);
  assert.equal(addParent(parseMap('- last'), parseMap('- last').nodes[0].id, 'wrapper'), '- wrapper\n  - last');
});

test('adding a heading parent preserves bullet children and refuses unsafe structure or excess heading depth', () => {
  const source = '## chosen\r\n- leaf\n### nested\r\n- other\n## untouched';
  const doc = parseMap(source);
  assert.equal(addParent(doc, node(doc, 'chosen').id, 'wrapper'), '## wrapper\r\n### chosen\r\n- leaf\n#### nested\r\n- other\n## untouched');
  const deep = parseMap('##### chosen\n###### child\n');
  assert.throws(() => addParent(deep, deep.nodes[0].id, 'wrapper'), /six heading levels/);
  const opaque = parseMap('- chosen\n  paragraph\n');
  assert.throws(() => addParent(opaque, opaque.nodes[0].id, 'wrapper'), /code block/);
  const root = parseMap('# chosen\n');
  assert.throws(() => addParent(root, root.nodes[0].id, '/'), /parent node/);
  assert.throws(() => addParent(root, root.nodes[0].id, 'two\nlines'), /one line/);
});

test('duplicate descendants keep their identities when their parent branch is wrapped', () => {
  const doc = parseMap('- root\n  - branch\n    - repeated\n      - leaf\n    - repeated\n      - leaf\n  - other\n');
  const next = parseMap(addParent(doc, node(doc, 'branch').id, 'wrapper'), doc);
  assert.deepEqual(next.nodes.filter(item => item.text !== 'wrapper').map(item => item.id), doc.nodes.map(item => item.id));
});

test('deleting removes only the requested branch and retains unrelated blank lines', () => {
  const source = '# /\n- root\n  - first\n    - nested\n\n  - last\n';
  const doc = parseMap(source);
  assert.equal(deleteNode(doc, node(doc, 'first').id), '# /\n- root\n\n  - last\n');
  assert.equal(deleteNode(doc, node(doc, 'last').id), '# /\n- root\n  - first\n    - nested\n\n');
});

test('up and down move complete nested branches with their anchors', () => {
  const source = '- root\n  - first ^a\n    - child ^b\n\n  - second ^c\n';
  const doc = parseMap(source);
  const expected = '- root\n  - second ^c\n\n  - first ^a\n    - child ^b\n';
  assert.equal(moveNode(doc, node(doc, 'first').id, 'down'), expected);
  assert.equal(moveNode(doc, node(doc, 'second').id, 'up'), expected);
  assert.equal(moveNode(doc, node(doc, 'first').id, 'up'), source);
  assert.equal(moveNode(doc, node(doc, 'second').id, 'down'), source);
});

test('moving the final line without a newline never concatenates two nodes', () => {
  const source = '- first\r\n- second';
  const doc = parseMap(source);
  const moved = moveNode(doc, doc.nodes[1].id, 'up');
  assert.equal(moved, '- second\r\n- first');
  assert.equal(parseMap(moved).nodes.length, 2);
});

test('indent and outdent move whole subtrees and reattach after parent subtree', () => {
  const source = '- root\n  - first\n  - second\n    - nested\n  - third\n- tail\n';
  const doc = parseMap(source);
  const indented = parseMap(moveNode(doc, node(doc, 'second').id, 'indent'), doc);
  assert.equal(node(indented, 'second').parentId, node(indented, 'first').id);
  assert.equal(node(indented, 'nested').parentId, node(indented, 'second').id);
  assert.equal(node(indented, 'second').id, node(doc, 'second').id);
  assert.equal(moveNode(doc, node(doc, 'second').id, 'outdent'), '- root\n  - first\n  - third\n- second\n  - nested\n- tail\n');
});

test('tab-indented subtree moves preserve nested tabs and raw contents', () => {
  const source = '- root\n\t- first\n\t- second\n\t\t- nested <Java<T>>\n';
  const doc = parseMap(source);
  assert.equal(moveNode(doc, node(doc, 'second').id, 'indent'), '- root\n\t- first\n\t\t- second\n\t\t\t- nested <Java<T>>\n');
});

test('heading moves adjust descendant heading levels without rewriting bullets', () => {
  const source = '# /\n## first\n- a\n## second\n### nested\n- b\n## third\n';
  const doc = parseMap(source);
  const indented = parseMap(moveNode(doc, node(doc, 'second').id, 'indent'));
  assert.equal(node(indented, 'second').indent, 3);
  assert.equal(node(indented, 'nested').indent, 4);
  assert.equal(node(indented, 'b').prefix, '- ');
  const back = parseMap(moveNode(indented, node(indented, 'second').id, 'outdent'));
  assert.deepEqual(back.roots.map(id => back.byId.get(id)?.text), ['first', 'second', 'third']);
});

test('copy preserves originals and paste strips only copied anchors while keeping the subtree', () => {
  const source = '- root\r\n    - branch ^mark-a\r\n        - [[linked#^target]] ^other\r\n    - destination ^keep\r\n';
  const doc = parseMap(source);
  const copied = copyBranch(doc, node(doc, 'branch').id);
  assert.equal(copied, '    - branch ^mark-a\r\n        - [[linked#^target]] ^other\r\n');
  const pasted = pasteBranch(doc, node(doc, 'destination').id, copied);
  assert.equal(pasted, source + '    - branch\r\n        - [[linked#^target]]\r\n');
  assert.equal(parseMap(pasted).nodes.filter(item => item.blockId === 'mark-a').length, 1);
});

test('heading branch paste preserves headings and child bullets', () => {
  const doc = parseMap('## first ^a\n- leaf ^b\n## second ^c\n');
  const result = parseMap(pasteBranch(doc, node(doc, 'second').id, copyBranch(doc, node(doc, 'first').id)));
  assert.equal(result.roots.length, 3);
  assert.equal(result.nodes[result.nodes.length - 1].text, 'leaf');
  assert.equal(result.nodes[result.nodes.length - 1].blockId, undefined);
});

test('paste as children handles multiple mixed-indent branches and preserves CRLF and missing final newline', () => {
  const source = '- root\r\n  - target\r\n  \t- existing ^keep\r\n  - untouched';
  const doc = parseMap(source), target = node(doc, 'target');
  const clipboard = '\t- first ^copy\n\t\t- leaf [[Other#^keep]] ^copy-leaf\n\t- second\n';
  const pasted = pasteBranch(doc, target.id, clipboard, 'child');
  assert.equal(pasted, '- root\r\n  - target\r\n  \t- existing ^keep\r\n  \t- first\r\n  \t\t- leaf [[Other#^keep]]\r\n  \t- second\r\n  - untouched');
  const next = parseMap(pasted, doc);
  assert.deepEqual(node(next, 'target').children.map(id => next.byId.get(id)?.text), ['existing', 'first', 'second']);
  assert.equal(node(next, 'leaf [[Other#^keep]]').parentId, node(next, 'first').id);
  assert.equal(node(next, 'untouched').id, node(doc, 'untouched').id);
  const final = parseMap('- target');
  assert.equal(pasteBranch(final, final.nodes[0].id, 'plain label', 'child'), '- target\n  - plain label');
  assert.equal(pasteBranch(final, final.nodes[0].id, '- branch\n  - leaf\n', 'child'), '- target\n  - branch\n    - leaf');
});

test('child paste supports heading subtrees and simple heading parents while rejecting ambiguous mixtures', () => {
  const doc = parseMap('## target\n- existing\n## tail\n'), target = node(doc, 'target');
  const pasted = parseMap(pasteBranch(doc, target.id, '## added\n### nested\n- leaf\n', 'child'));
  assert.equal(node(pasted, 'added').parentId, node(pasted, 'target').id);
  assert.equal(node(pasted, 'nested').indent, 4);
  const bullets = parseMap(pasteBranch(doc, target.id, '- added\n  - leaf\n', 'child'));
  assert.equal(node(bullets, 'added').parentId, node(bullets, 'target').id);
  assert.throws(() => pasteBranch(pasted, node(pasted, 'target').id, '- wrong parent\n', 'child'), /subheading/);
  assert.throws(() => pasteBranch(doc, target.id, '- bullet\n## heading\n', 'child'), /subheading/);
  assert.throws(() => pasteBranch(doc, node(doc, 'existing').id, '# heading\n', 'child'), /heading cannot become a bullet/);
});

test('opaque clipboard Markdown is rejected before anything is changed', () => {
  const doc = parseMap('- destination\n');
  assert.throws(() => pasteBranch(doc, doc.nodes[0].id, '---\ntags: mindmap\n---\n- root\n'), /outside the outline/);
  assert.throws(() => pasteBranch(doc, doc.nodes[0].id, '- root\n  continuation\n'), /code block/);
  assert.equal(pasteBranch(doc, doc.nodes[0].id, 'plain label'), '- destination\n- plain label\n');
});

test('steps distinguish order, dated legacy forms, unknown dates, bare markers, and frozen ancestors', () => {
  const doc = parseMap('- root\n  - [ ] #step 0a) first\n  - [x] #step ) free\n  - [ ] #step до [[2026-09-25]] 3) date first\n  - [ ] #step 7) до [[2026-10-01]] old\n  - [ ] #step ) до [[2026-11-01]] another\n  - [ ] #step до 2026-12-01) plain date\n  - [ ] #step до ? unknown\n  - 🧊 Заморожено / колись\n    - [ ] #step 9) ice\n');
  const steps = getSteps(doc);
  assert.equal(steps.length, 8);
  assert.deepEqual(steps.map(step => step.date), [null, null, '2026-09-25', '2026-10-01', '2026-11-01', '2026-12-01', null, null]);
  assert.equal(steps[0].number, 0);
  assert.equal(steps[0].suffix, 'a');
  assert.equal(steps[1].completed, true);
  assert.equal(steps[2].number, 3);
  assert.equal(steps[6].unknownDate, true);
  assert.equal(steps[7].frozen, true);
});

test('renumber changes numbers only in natural execution order without touching dates or bare tasks', () => {
  const source = '- root\r\n  - [ ] #step 2a) later ^b\r\n  - [ ] #step 0a) prep\r\n  - [ ] #step 2) middle\r\n  - [ ] #step 0) first\r\n  - [ ] #step 1) start\r\n  - [ ] #step ) independent\r\n  - [ ] #step 7) до [[2026-10-01]] legacy dated\r\n';
  const doc = parseMap(source);
  const result = renumberSteps(doc);
  assert.equal(result, source.replace('#step 2a)', '#step 5)').replace('#step 0a)', '#step 2)').replace('#step 2) middle', '#step 4) middle').replace('#step 0)', '#step 1)').replace('#step 1) start', '#step 3) start'));
  assert.deepEqual(parseMap(result).nodes.map(item => item.line), doc.nodes.map(item => item.line));
  assert.equal(renumberSteps(parseMap(result)), result);
});

test('explicit execution order changes numbers, leaving branches in their original positions', () => {
  const source = '- root\n  - [ ] #step 1) a\n  - [ ] #step 2) b\n  - [ ] #step 3) c\n';
  const doc = parseMap(source);
  const result = renumberSteps(doc, [doc.nodes[3].id, doc.nodes[1].id, doc.nodes[2].id]);
  assert.equal(result, '- root\n  - [ ] #step 2) a\n  - [ ] #step 3) b\n  - [ ] #step 1) c\n');
  assert.throws(() => renumberSteps(doc, [doc.nodes[1].id, doc.nodes[1].id]), /same step twice/);
  assert.throws(() => renumberSteps(doc, ['missing']), /Only numbered/);
});

test('task actions retain checks and anchors, and new dated actions do not invent numbers', () => {
  const source = '- root\n  - [x] done ^keep\n  - [ ] #step 4a) other\n';
  const doc = parseMap(source), target = node(doc, '[x] done');
  assert.equal(setStep(doc, target.id), source.replace('[x] done', '[x] #step 5) done'));
  assert.equal(setDated(doc, target.id, '2026-10-02'), source.replace('[x] done', '[x] #step до [[2026-10-02]] done'));
  assert.equal(setDated(doc, target.id, '?'), source.replace('[x] done', '[x] #step до ? done'));
  assert.equal(toggleTask(doc, target.id), source.replace('[x] done', '[ ] done'));
  assert.equal(setQuestion(doc, target.id), source.replace('[x] done', '==//todo Q: done=='));
  assert.throws(() => setDated(doc, target.id, '2026-02-30'), /does not exist/);
  assert.throws(() => setDated(doc, target.id, 'next month'), /YYYY-MM-DD/);
});

test('changing date formats preserves existing order markers and action text', () => {
  for (const prefix of ['#step 3) до [[2026-01-01]]', '#step до [[2026-01-01]] 3)', '#step ) до 2026-01-01)', '#step до ?']) {
    const doc = parseMap(`- [ ] ${prefix} call bank ^a\n`);
    const expected = prefix.includes('?') ? prefix.replace('?', '[[2026-10-01]]') : prefix.replace('2026-01-01', '2026-10-01');
    assert.equal(setDated(doc, doc.nodes[0].id, '2026-10-01'), `- [ ] ${expected} call bank ^a\n`);
  }
  const doc = parseMap('- 3) plain text\n');
  assert.equal(setQuestion(doc, doc.nodes[0].id), '- ==//todo Q: 3) plain text==\n');
});

test('date edits preserve date-first numbers, aliases, whitespace and unrelated bytes', () => {
  const source = '\uFEFF---\r\ntags: mindmap\n---\r\n# /\r\n\t- [x]\t#step\tдо\t[[2026-01-01|New Year]]\t03a)  call  bank ^keep \n- tail';
  const doc = parseMap(source), target = doc.nodes[0];
  assert.equal(setDated(doc, target.id, '2026-10-02'), source.replace('2026-01-01', '2026-10-02'));
  assert.equal(setDated(doc, target.id, '2026-01-01'), source);
  assert.equal(setDated(doc, target.id, '?'), source.replace('[[2026-01-01|New Year]]', '?'));
  const step = getSteps(doc)[0];
  assert.equal(step.number, 3);
  assert.equal(step.suffix, 'a');
  assert.equal(renumberSteps(doc), source);
  assert.throws(() => renumberSteps(doc, [target.id]), /Only numbered, undated/);
});

test('adding dates preserves existing numbers and ordinary numeric prose', () => {
  for (const label of ['3) plain text', '[ ] 3) plain text', '[ ] #step 3) 4) plain text', '[ ] #step ) 3) plain text']) {
    const doc = parseMap(`- ${label} ^id\n`);
    const result = setDated(doc, doc.nodes[0].id, '2026-10-02');
    const expected = label.replace(/^\[ \] /, '').replace(/^#step /, '').replace(/^\) /, '');
    assert.equal(result, `- [ ] #step до [[2026-10-02]] ${expected} ^id\n`);
  }
  const doc = parseMap('- [ ] #step 3) 4) plain text\n- [ ] #step ) 5) plain text\n');
  assert.equal(setQuestion(doc, doc.nodes[0].id), doc.source.replace('[ ] #step 3) 4) plain text', '==//todo Q: 4) plain text=='));
  assert.equal(setQuestion(doc, doc.nodes[1].id), doc.source.replace('[ ] #step ) 5) plain text', '==//todo Q: 5) plain text=='));
});

test('mixed tabs retain relative indentation when moved across a tab stop', () => {
  const source = '- root\n  - first\n  - second\n  \t- child\n      - grandchild\n  - last\n';
  const doc = parseMap(source), moved = parseMap(moveNode(doc, node(doc, 'second').id, 'indent'));
  assert.equal(node(moved, 'second').parentId, node(moved, 'first').id);
  assert.equal(node(moved, 'child').parentId, node(moved, 'second').id);
  assert.equal(node(moved, 'grandchild').parentId, node(moved, 'child').id);
  assert.equal(node(moved, 'last').parentId, node(moved, 'root').id);
});

test('reparenting moves an entire branch to the last child position and preserves mixed endings and anchors', () => {
  const source = '---\r\ntags: mindmap\n---\r\n- first ^a\r\n\t- leaf [[Link]] ^leaf\n- target ^target\r\n    + existing ^keep\r\n- tail\n';
  const doc = parseMap(source);
  const moved = reparentNode(doc, node(doc, 'first').id, node(doc, 'target').id);
  assert.equal(moved, '---\r\ntags: mindmap\n---\r\n- target ^target\r\n    + existing ^keep\r\n    - first ^a\r\n    \t- leaf [[Link]] ^leaf\n- tail\n');
  const result = parseMap(moved, doc);
  assert.equal(node(result, 'first').parentId, node(result, 'target').id);
  assert.equal(node(result, 'leaf [[Link]]').parentId, node(result, 'first').id);
  assert.deepEqual(node(result, 'target').children.map(id => result.byId.get(id)?.text), ['existing', 'first']);
});

test('reparenting supports a preceding target, ancestor target, and same-parent reorder', () => {
  const source = '- root\n  - target\n    - keep\n  - second\n    - nested\n  - last\n';
  const doc = parseMap(source);
  const moved = parseMap(reparentNode(doc, node(doc, 'second').id, node(doc, 'target').id));
  assert.equal(node(moved, 'second').parentId, node(moved, 'target').id);
  assert.deepEqual(node(moved, 'target').children.map(id => moved.byId.get(id)?.text), ['keep', 'second']);
  const back = parseMap(reparentNode(moved, node(moved, 'second').id, node(moved, 'root').id));
  assert.deepEqual(node(back, 'root').children.map(id => back.byId.get(id)?.text), ['target', 'last', 'second']);
  assert.equal(node(back, 'nested').parentId, node(back, 'second').id);
  assert.equal(reparentNode(back, node(back, 'second').id, node(back, 'root').id), back.source);
  const reordered = parseMap(reparentNode(doc, node(doc, 'target').id, node(doc, 'root').id));
  assert.deepEqual(node(reordered, 'root').children.map(id => reordered.byId.get(id)?.text), ['second', 'last', 'target']);
});

test('reparenting preserves missing final newline without joining nodes', () => {
  for (const source of ['- target\r\n- moving', '- moving\r\n- target']) {
    const doc = parseMap(source);
    const moved = reparentNode(doc, node(doc, 'moving').id, node(doc, 'target').id);
    assert.equal(moved, '- target\r\n  - moving');
    assert.equal(parseMap(moved).nodes.length, 2);
  }
});

test('reparenting rejects cycles, opaque branches and ambiguous heading targets before changing source', () => {
  const source = '- root\n  - child\n    - leaf\n- opaque\n  ```\n  data\n  ```\n- other\n';
  const doc = parseMap(source);
  assert.throws(() => reparentNode(doc, node(doc, 'root').id, node(doc, 'root').id), /itself/);
  assert.throws(() => reparentNode(doc, node(doc, 'root').id, node(doc, 'leaf').id), /descendants/);
  assert.throws(() => reparentNode(doc, node(doc, 'opaque').id, node(doc, 'other').id), /code block/);
  assert.throws(() => reparentNode(doc, node(doc, 'other').id, node(doc, 'opaque').id), /code block/);
  assert.equal(doc.source, source);
  const headings = parseMap('## root\n### nested\n- bullet\n## moving\n');
  assert.throws(() => reparentNode(headings, node(headings, 'bullet').id, node(headings, 'root').id), /subheading/);
  assert.throws(() => reparentNode(headings, node(headings, 'moving').id, node(headings, 'bullet').id), /heading cannot become a bullet/);
});

test('heading reparenting adjusts the whole heading subtree and supports a bullet under a simple heading', () => {
  const doc = parseMap('# /\n## target\n### first\n- keep\n## moving\n### nested\n- leaf\n');
  const moved = parseMap(reparentNode(doc, node(doc, 'moving').id, node(doc, 'target').id));
  assert.equal(node(moved, 'moving').indent, 3);
  assert.equal(node(moved, 'nested').indent, 4);
  assert.equal(node(moved, 'moving').parentId, node(moved, 'target').id);
  assert.equal(node(moved, 'leaf').prefix, '- ');
  const bullets = parseMap('## source\n- parent\n  - moving\n    - leaf\n## target\n- keep\n');
  const bulletMove = parseMap(reparentNode(bullets, node(bullets, 'moving').id, node(bullets, 'target').id));
  assert.equal(node(bulletMove, 'moving').parentId, node(bulletMove, 'target').id);
  assert.equal(node(bulletMove, 'leaf').parentId, node(bulletMove, 'moving').id);
  const tooDeep = parseMap('##### deep\n###### deepest\n## moving\n### nested\n');
  assert.throws(() => reparentNode(tooDeep, node(tooDeep, 'moving').id, node(tooDeep, 'deep').id), /six heading levels/);
});

test('decimal step markers are renumbered in tuple order without moving lines or changing dates', () => {
  const source = '- root\r\n  - [ ] #step 2) later ^later\n  - [ ] #step 1.10) ten\r\n  - [ ] #step 1.2a) two a\n  - [x] #step 1.2) two\r\n  - [ ] #step 1.1.1) deep\n  - [ ] #step 1.1) inserted ^inserted\r\n  - [ ] #step 1) first\n  - [ ] #step 2.1) after later\r\n  - [ ] #step ) bare\n  - [ ] #step 4.1) до [[2026-10-01]] dated\r\n  - [ ] #step до ? 5.1) unknown\n';
  const doc = parseMap(source), steps = getSteps(doc);
  const sorted = [...steps].filter(step => step.number !== null && !step.date && !step.unknownDate).sort(compareSteps);
  assert.deepEqual(sorted.map(step => step.text.match(/#step ([^)]*)\)/)?.[1]), ['1', '1.1', '1.1.1', '1.2', '1.2a', '1.10', '2', '2.1']);
  assert.equal(steps[1].number, 1);
  assert.deepEqual(steps[1].order, [1, 10]);
  const result = renumberSteps(doc);
  const expected = source.replace('2) later', '7) later').replace('1.10) ten', '6) ten').replace('1.2a) two a', '5) two a').replace('1.2) two', '4) two').replace('1.1.1) deep', '3) deep').replace('1.1) inserted', '2) inserted').replace('2.1) after later', '8) after later');
  assert.equal(result, expected);
  assert.deepEqual(parseMap(result).nodes.map(item => item.id), doc.nodes.map(item => item.id));
  assert.deepEqual(parseMap(result).nodes.map(item => item.line), doc.nodes.map(item => item.line));
  assert.equal(renumberSteps(parseMap(result)), result);
});

test('1, 1.1, 2 become 1, 2, 3 and new step numbers use the leading integer', () => {
  const doc = parseMap('- [ ] #step 1) first\n- [ ] #step 1.1) inserted\n- [ ] #step 2) later\n- new\n');
  assert.equal(renumberSteps(doc), '- [ ] #step 1) first\n- [ ] #step 2) inserted\n- [ ] #step 3) later\n- new\n');
  const decimals = parseMap('- [ ] #step 2.9) inserted\n- new\n');
  assert.equal(setStep(decimals, node(decimals, 'new').id), '- [ ] #step 2.9) inserted\n- [ ] #step 3) new\n');
});

test('decimal markers survive date edits and are removed with the step marker for question conversion', () => {
  const source = '- [x] #step 1.2a) task ^keep\n';
  const doc = parseMap(source);
  assert.equal(setDated(doc, doc.nodes[0].id, '2026-10-02'), '- [x] #step до [[2026-10-02]] 1.2a) task ^keep\n');
  assert.equal(setQuestion(doc, doc.nodes[0].id), '- ==//todo Q: task== ^keep\n');
  const dated = parseMap('- [ ] #step до [[2026-10-01]] 1.2a) task\n');
  assert.deepEqual(getSteps(dated)[0].order, [1, 2]);
  assert.equal(getSteps(dated)[0].suffix, 'a');
  assert.equal(renumberSteps(dated), dated.source);
});
