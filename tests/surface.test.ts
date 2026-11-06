import * as i18n from '../src/i18n';
i18n.setLanguage('uk');
import { test, type TestContext } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { MapSurface } from '../src/surface';
import { addNode, addParent, copyBranch, editNode, moveNode, parseMap, pasteBranch, toggleTask } from '../src/core';
import type { MapSurfaceOptions, MapViewState, NodeAction } from '../src/types';

function fixture(t: TestContext, source: string, render?: MapSurfaceOptions['renderMarkdown']) {
  const dom = new JSDOM('<div id="host"></div>', { pretendToBeVisual: true });
  const host = dom.window.document.getElementById('host')!;
  const frames = new Map<number, FrameRequestCallback>();
  let sequence = 0;
  let resize: () => void = () => {};
  dom.window.requestAnimationFrame = callback => { frames.set(++sequence, callback); return sequence; };
  dom.window.cancelAnimationFrame = id => { frames.delete(id); };
  Object.defineProperty(dom.window, 'ResizeObserver', { value: class {
    constructor(callback: () => void) { resize = callback; }
    observe() {}
    disconnect() {}
  } });
  let doc = parseMap(source);
  const actions: { action: NodeAction; id: string | null }[] = [];
  const states: MapViewState[] = [];
  const options: MapSurfaceOptions = {
    onAction: (action, id) => actions.push({ action, id }),
    onState: state => states.push(state),
    renderMarkdown: render ?? ((text, element) => { element.textContent = text; }),
  };
  const surface = new MapSurface(host, options);
  surface.update(doc);
  const viewport = host.querySelector<HTMLDivElement>('.tvm-surface')!;
  const flush = () => { const pending = [...frames.values()]; frames.clear(); for (const callback of pending) callback(0); };
  const id = (text: string) => { const node = doc.nodes.find(node => node.text === text); assert.ok(node, `Missing ${text}`); return node.id; };
  const element = (text: string) => { const result = [...host.querySelectorAll<HTMLElement>('.tvm-node')].find(el => el.dataset.nodeId === id(text)); assert.ok(result, `Hidden ${text}`); return result; };
  t.after(() => { surface.destroy(); dom.window.close(); });
  return {
    dom, host, viewport, surface, options, actions, states, frames, id, element, flush,
    get doc() { return doc; },
    update(source: string, state?: MapViewState) { doc = parseMap(source, doc); surface.update(doc, state); },
    resize() { resize(); flush(); },
    key(key: string, modifiers: KeyboardEventInit = {}) {
      const event = new dom.window.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...modifiers });
      viewport.dispatchEvent(event);
      return event;
    },
    visible() { return [...host.querySelectorAll<HTMLElement>('.tvm-node')].map(el => doc.byId.get(el.dataset.nodeId!)!.text); },
    pointer(type: string, target: Element, pointerId: number, x: number, y: number) {
      const event = new dom.window.MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: x, clientY: y });
      Object.defineProperties(event, { pointerType: { value: 'touch' }, pointerId: { value: pointerId } });
      target.dispatchEvent(event);
    },
  };
}

test('inline draft survives external refresh, layout changes and failed save; Escape never writes', async t => {
  const f = fixture(t, '- Root\n  - Child\n');
  const id = f.id('Child');
  let saves = 0;
  f.surface.beginEdit(id, 'Child', async () => { saves++; throw new Error('Synthetic write failure'); });
  const input = f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;
  input.value = 'unsaved draft';
  f.surface.setLayout('outline'); f.surface.refreshLayout();
  input.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(saves, 1); assert.equal(input.value, 'unsaved draft'); assert.ok(input.isConnected);
  assert.match(f.host.querySelector('.tvm-inline-error')!.textContent!, /Synthetic/);
  f.update('- Root\n  - External change\n');
  assert.equal(f.host.querySelector('.tvm-inline-input'), input);
  assert.equal(input.value, 'unsaved draft');
  f.key('Escape');
  assert.equal(f.surface.isEditing(), true);
  f.host.querySelector<HTMLButtonElement>('.tvm-inline-discard')!.click();
  assert.equal(f.surface.isEditing(), false);
  assert.deepEqual(f.visible(), ['Root', 'External change']);
  assert.equal(saves, 1);
});

test('new child, sibling and parent remain temporary until Enter and restore source on Escape', async t => {
  const f = fixture(t, '- Root\n  - Child\n');
  for (const relation of ['child', 'sibling', 'parent'] as const) {
    const original = f.doc, id = f.id('Child');
    const transform = (text: string) => relation === 'parent' ? addParent(original, id, text) : addNode(original, id, relation, text);
    const draft = parseMap(transform('temporary'), original);
    const draftId = draft.nodes.find(node => node.text === 'temporary')!.id;
    let saves = 0;
    f.surface.beginEdit(draftId, '', async text => { saves++; f.update(transform(text)); return f.id(text); }, undefined, draft);
    assert.equal(f.doc.source, original.source);
    assert.equal(f.surface.getState().selected, original.roots[0], 'Persisted state must not reference a draft ID');
    const input = f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;
    input.value = 'New ' + relation;
    if (relation === 'parent') {
      input.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
      assert.equal(f.surface.isEditing(), true);
      f.host.querySelector<HTMLButtonElement>('.tvm-inline-discard')!.click();
      assert.equal(f.doc.source, original.source); assert.equal(saves, 0);
    } else {
      input.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 0));
      assert.equal(saves, 1); assert.equal(f.surface.isEditing(), false);
      assert.equal(f.surface.getState().selected, f.id('New ' + relation));
    }
    f.update('- Root\n  - Child\n', { collapsed: [], selected: null, focusRoot: null, camera: { x: 36, y: 36, scale: 1 } });
    f.surface.reveal(f.doc.roots[0]);
  }
});

test('double press and drag moves only to a valid target; cancel and descendants never move', t => {
  const f = fixture(t, '- Root\n  - Source\n    - Descendant\n  - Target\n');
  const moved: string[][] = []; f.options.onReparent = (id, target) => moved.push([id, target]);
  let hit: Element = f.element('Target');
  f.dom.window.document.elementFromPoint = () => hit;
  const pointer = (type: string, target: Element, x: number) => {
    const event = new f.dom.window.MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: x, clientY: 100 });
    Object.defineProperties(event, { pointerId: { value: 1 }, pointerType: { value: 'mouse' } }); target.dispatchEvent(event);
  };
  const start = () => {
    pointer('pointerdown', f.element('Source'), 100); pointer('pointerup', f.element('Source'), 100);
    pointer('pointerdown', f.element('Source'), 100); pointer('pointermove', f.viewport, 200);
  };
  start();
  assert.ok(f.element('Target').classList.contains('is-drop-target')); assert.equal(moved.length, 0);
  pointer('pointerup', f.viewport, 200);
  assert.deepEqual(moved, [[f.id('Source'), f.id('Target')]]);
  hit = f.element('Descendant'); start(); pointer('pointerup', f.viewport, 200);
  assert.equal(moved.length, 1);
  hit = f.element('Target'); start(); pointer('pointercancel', f.viewport, 200);
  assert.equal(moved.length, 1);
  assert.equal(f.viewport.classList.contains('is-dragging'), false);
});

test('Delete repeats do not remove more branches; editing keeps Delete as text editing', t => {
  const f = fixture(t, '- Root\n  - Child\n');
  f.key('Delete'); f.key('Delete', { repeat: true });
  assert.equal(f.actions.filter(action => action.action === 'delete').length, 1);
  f.surface.beginEdit(f.id('Root'), 'Root', async () => undefined);
  f.key('Delete'); f.surface.runHotkey('delete');
  assert.equal(f.actions.filter(action => action.action === 'delete').length, 1);
});

test('arrow navigation follows the selected node into view on a long branch', t => {
  const f = fixture(t, '- root\n' + Array.from({ length: 24 }, (_, i) => `  - task ${i + 1}\n`).join(''));
  assert.equal(f.surface.getState().selected, f.id('root'));
  assert.equal(f.key('ArrowRight').defaultPrevented, true);
  assert.equal(f.surface.getState().selected, f.id('task 1'));
  f.key('ArrowDown');
  assert.equal(f.surface.getState().selected, f.id('task 2'));
  f.key('ArrowUp');
  assert.equal(f.surface.getState().selected, f.id('task 1'));
  f.key('ArrowLeft');
  assert.equal(f.surface.getState().selected, f.id('root'));
  f.key('End');
  assert.equal(f.surface.getState().selected, f.id('task 24'));
  const camera = f.surface.getState().camera;
  assert.ok(camera.y < 0);
  const [, x, y] = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(f.element('task 24').style.transform)!;
  assert.ok(Number(x) * camera.scale + camera.x >= 44);
  assert.ok(Number(x) * camera.scale + camera.x + 328 * camera.scale <= 756);
  assert.ok(Number(y) * camera.scale + camera.y >= 44);
  assert.ok(Number(y) * camera.scale + camera.y + 45 * camera.scale <= 556);
  assert.equal(f.viewport.getAttribute('aria-activedescendant'), f.element('task 24').id);
  f.key('Home');
  assert.equal(f.surface.getState().selected, f.id('root'));
});

test('Space and horizontal arrows fold without losing nested collapse state', t => {
  const f = fixture(t, '- root\n  - child\n    - grandchild\n');
  f.surface.reveal(f.id('child'));
  f.key(' ');
  assert.deepEqual(f.visible(), ['root', 'child']);
  f.key('ArrowLeft');
  assert.equal(f.surface.getState().selected, f.id('root'));
  f.key(' ');
  assert.deepEqual(f.visible(), ['root']);
  f.key('ArrowRight');
  assert.deepEqual(f.visible(), ['root', 'child']);
  f.key('ArrowRight');
  assert.equal(f.surface.getState().selected, f.id('child'));
  f.key('ArrowRight');
  assert.deepEqual(f.visible(), ['root', 'child', 'grandchild']);
  assert.equal(f.surface.getState().selected, f.id('child'));
  f.key('ArrowRight');
  assert.equal(f.surface.getState().selected, f.id('grandchild'));
  assert.equal(f.actions.length, 0);
});

test('Alt+Shift+digits change descendant depth only inside the selected branch', t => {
  const f = fixture(t, '- root\n  - branch\n    - one\n      - two\n        - three\n          - four\n            - five\n              - six\n  - other\n    - outside\n');
  f.surface.reveal(f.id('branch'));
  for (const [key, descendants] of [['0', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['9', 6]] as const) {
    assert.equal(f.key(key, { altKey: true, shiftKey: true, code: 'Digit' + key }).defaultPrevented, true);
    assert.equal(f.visible().length, 4 + descendants);
    assert.equal(f.surface.getState().selected, f.id('branch'));
    assert.ok(f.visible().includes('outside'));
  }
  f.key('0', { altKey: true, shiftKey: true });
  f.key('ArrowRight');
  assert.deepEqual(f.visible(), ['root', 'branch', 'one', 'other', 'outside']);
  assert.equal(f.element('one').getAttribute('aria-expanded'), 'false');
});

test('sibling movement hotkeys preserve the moved branch and node selection', t => {
  const f = fixture(t, '- root\n  - first\n  - middle\n    - detail\n  - last\n');
  const selected = f.id('middle');
  f.surface.reveal(selected);
  f.key('ArrowUp', { ctrlKey: true, shiftKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'move-up', id: selected });
  f.update(moveNode(f.doc, selected, 'up'));
  assert.equal(f.doc.source, '- root\n  - middle\n    - detail\n  - first\n  - last\n');
  assert.equal(f.surface.getState().selected, selected);
  f.key('ArrowDown', { ctrlKey: true, shiftKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'move-down', id: selected });
  f.update(moveNode(f.doc, selected, 'down'));
  assert.equal(f.doc.source, '- root\n  - first\n  - middle\n    - detail\n  - last\n');
});

test('Enter inserts immediately after the selected branch and Tab requests its child', t => {
  const f = fixture(t, '- root\n  - first\n    - detail\n  - last\n');
  f.surface.reveal(f.id('first'));
  f.key('Enter');
  assert.deepEqual(f.actions.pop(), { action: 'add-sibling', id: f.id('first') });
  f.update(addNode(f.doc, f.id('first'), 'sibling', 'new sibling'));
  assert.equal(f.doc.source, '- root\n  - first\n    - detail\n  - new sibling\n  - last\n');
  f.key('Tab');
  assert.deepEqual(f.actions.pop(), { action: 'add-child', id: f.id('first') });
  f.update(addNode(f.doc, f.id('first'), 'child', 'new child'));
  assert.equal(f.doc.byId.get(f.id('new child'))?.parentId, f.id('first'));
  f.key('Tab', { shiftKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'outdent', id: f.id('first') });
});

test('copy and paste hotkeys use the selected branch with child paste semantics', t => {
  const f = fixture(t, '- root\n  - first\n    - detail\n  - last\n');
  const first = f.id('first');
  f.surface.reveal(first);
  f.key('c', { ctrlKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'copy', id: first });
  const clipboard = copyBranch(f.doc, first);
  assert.equal(clipboard, '  - first\n    - detail\n');
  f.key('v', { ctrlKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'paste', id: first });
  f.update(pasteBranch(f.doc, first, clipboard, 'child'));
  assert.equal(f.doc.source, '- root\n  - first\n    - detail\n    - first\n      - detail\n  - last\n');
});

test('search includes hidden descendants; revealing a result unfolds only its ancestors', t => {
  const f = fixture(t, '- root\n  - branch\n    - Zebra target\n    - apple target\n  - other\n    - other hidden\n');
  f.surface.setDepth(1);
  const results = f.surface.search('TARGET', true);
  assert.deepEqual(results.map(node => node.text), ['apple target', 'Zebra target']);
  assert.deepEqual(f.visible(), ['root']);
  f.surface.reveal(results[0].id);
  assert.deepEqual(f.visible(), ['root', 'branch', 'Zebra target', 'apple target', 'other']);
  assert.ok(f.surface.getState().collapsed.includes(f.id('other')));
  assert.equal(f.surface.getState().selected, f.id('apple target'));
  assert.equal(f.element('apple target').classList.contains('is-search-match'), true);
  assert.equal(f.dom.window.document.activeElement, f.viewport);
  f.surface.search('');
  assert.equal(f.host.querySelector('.is-search-match'), null);
});

test('folds and camera survive source updates and a complete destroy/recreate cycle', t => {
  const f = fixture(t, '- root\n  - branch\n    - hidden\n  - sibling\n');
  f.surface.reveal(f.id('branch'));
  f.key(' ');
  f.viewport.dispatchEvent(new f.dom.window.WheelEvent('wheel', { deltaX: 113, deltaY: 72, bubbles: true, cancelable: true }));
  const saved = JSON.parse(JSON.stringify(f.surface.getState())) as MapViewState;
  f.update(editNode(f.doc, f.id('sibling'), 'changed sibling'));
  f.flush(); f.resize();
  assert.deepEqual(f.surface.getState(), saved);
  assert.deepEqual(f.visible(), ['root', 'branch', 'changed sibling']);
  f.surface.destroy();
  const restored = new MapSurface(f.host, f.options);
  t.after(() => restored.destroy());
  restored.update(parseMap(f.doc.source), saved);
  f.flush(); f.resize();
  assert.deepEqual(restored.getState(), saved);
  assert.equal(f.host.querySelectorAll('.tvm-node').length, 3);
  const world = f.host.querySelector<HTMLElement>('.tvm-world')!;
  assert.equal(world.style.zoom, String(saved.camera.scale));
  assert.equal(world.style.left, `${saved.camera.x / saved.camera.scale}px`);
  assert.equal(world.style.top, `${saved.camera.y / saved.camera.scale}px`);
});

test('task labels get explicit checkboxes while Markdown rendering receives the label', t => {
  const rendered: string[] = [];
  const f = fixture(t, '- root\n  - [ ] #step 1) [[Task]]\n  - [x] done\n', (text, el) => { rendered.push(text); el.textContent = text; });
  assert.deepEqual(rendered, ['root', '#step 1) [[Task]]', 'done']);
  const checkbox = f.element('[ ] #step 1) [[Task]]').querySelector<HTMLInputElement>('input[type="checkbox"]')!;
  assert.ok(checkbox);
  assert.equal(checkbox.checked, false);
  assert.equal(f.element('[x] done').querySelector<HTMLInputElement>('input')!.checked, true);
  checkbox.click();
  const taskId = f.id('[ ] #step 1) [[Task]]');
  assert.deepEqual(f.actions.pop(), { action: 'toggle-task', id: taskId });
  assert.equal(checkbox.checked, false, 'source remains authoritative until the action is saved');
  f.update(toggleTask(f.doc, taskId));
  assert.equal(f.element('[x] #step 1) [[Task]]').querySelector<HTMLInputElement>('input')!.checked, true);
  assert.equal(f.element('[x] #step 1) [[Task]]').classList.contains('is-complete'), true);
});

test('keyboard actions do not intercept editing inside embedded inputs', t => {
  const f = fixture(t, '- root\n');
  const input = f.dom.window.document.createElement('textarea');
  f.viewport.append(input);
  const event = new f.dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
  input.dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
  assert.equal(f.actions.length, 0);
});

test('touch taps retain their node target; dragging captures the pointer and pans', t => {
  const f = fixture(t, '- root\n  - child\n');
  const captured: number[] = [];
  f.viewport.setPointerCapture = id => { captured.push(id); };
  f.viewport.hasPointerCapture = () => false;
  const child = f.element('child');
  f.pointer('pointerdown', child, 1, 100, 120);
  assert.deepEqual(captured, [], 'a tap must not be captured by the viewport');
  f.pointer('pointerup', child, 1, 100, 120);
  child.click();
  assert.equal(f.surface.getState().selected, f.id('child'));
  const camera = { ...f.surface.getState().camera };
  f.pointer('pointerdown', child, 2, 100, 120);
  f.pointer('pointermove', child, 2, 140, 180);
  assert.deepEqual(captured, [2]);
  f.pointer('pointerup', child, 2, 140, 180);
  assert.deepEqual(f.surface.getState().camera, { ...camera, x: camera.x + 40, y: camera.y + 60 });
  assert.equal(f.viewport.classList.contains('is-panning'), false);
});

test('touch pinch zoom keeps its world anchor and saves after release', t => {
  const f = fixture(t, '- root\n');
  f.viewport.setPointerCapture = () => {};
  f.viewport.hasPointerCapture = () => false;
  f.pointer('pointerdown', f.viewport, 1, 100, 100);
  f.pointer('pointerdown', f.viewport, 2, 200, 100);
  f.pointer('pointermove', f.viewport, 2, 300, 100);
  assert.equal(f.surface.getState().camera.scale, 2);
  const camera = f.surface.getState().camera;
  assert.equal((200 - camera.x) / camera.scale, 150 - 36);
  assert.equal((100 - camera.y) / camera.scale, 100 - 36);
  f.pointer('pointerup', f.viewport, 2, 300, 100);
  assert.deepEqual(f.states.at(-1)?.camera, camera);
});

test('context menu offers child and sibling paste and Escape restores map focus', t => {
  const f = fixture(t, '- root\n  - child\n');
  f.element('child').dispatchEvent(new f.dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 80, clientY: 80 }));
  const menu = f.host.querySelector<HTMLElement>('[role="menu"]')!;
  assert.ok(menu);
  const paste = [...menu.querySelectorAll('button')].find(button => button.textContent?.startsWith('Вставити після вузла'))!;
  paste.click();
  assert.deepEqual(f.actions.pop(), { action: 'paste-after', id: f.id('child') });
  assert.equal(f.host.querySelector('[role="menu"]'), null);
  f.element('child').dispatchEvent(new f.dom.window.MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
  f.dom.window.document.activeElement!.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert.equal(f.host.querySelector('[role="menu"]'), null);
  assert.equal(f.dom.window.document.activeElement, f.viewport);
});

test('destroy detaches listeners and ignores asynchronous render completions', async t => {
  const pending: (() => void)[] = [];
  const f = fixture(t, '- root\n', (_text, _el) => new Promise<void>(resolve => pending.push(resolve)));
  f.surface.destroy();
  f.key('Enter');
  for (const resolve of pending) resolve();
  await Promise.resolve();
  f.flush();
  assert.equal(f.host.children.length, 0);
  assert.equal(f.actions.length, 0);
  assert.equal(f.frames.size, 0);
});

test('internal links use the vault handler and external links retain native behavior', t => {
  const f = fixture(t, '- root\n');
  const opened: string[] = [];
  f.options.onOpenLink = link => { opened.push(link); };
  for (const [href, internal] of [['Note#section', true], ['https://example.test', false], ['mailto:user@example.test', false]] as const) {
    const anchor = f.dom.window.document.createElement('a');
    anchor.href = href;
    if (internal) { anchor.className = 'internal-link'; anchor.dataset.href = href; }
    f.element('root').append(anchor);
    const event = new f.dom.window.MouseEvent('click', { bubbles: true, cancelable: true });
    anchor.dispatchEvent(event);
    assert.equal(event.defaultPrevented, internal);
  }
  assert.deepEqual(opened, ['Note#section']);
});

test('unchanged Markdown is reused and components are released on edit, file switch and close', t => {
  let renders = 0, releases = 0;
  const f = fixture(t, '- root\n  - child\n', (text, el) => { renders++; el.textContent = text; });
  f.options.releaseMarkdown = () => { releases++; };
  f.key(' ');
  f.key(' ');
  f.surface.reveal(f.id('child'));
  assert.equal(renders, 2);
  f.update(editNode(f.doc, f.id('child'), 'changed'));
  assert.equal(renders, 3); assert.equal(releases, 1);
  f.options.getRenderKey = () => 'other file'; f.update(f.doc.source);
  assert.equal(renders, 5); assert.equal(releases, 3);
  f.surface.destroy(); assert.equal(releases, 5);
});

test('large branch Markdown renders in batches and folded nodes leave the queue', async t => {
  const complete: (() => void)[] = [];
  const source = '- root\n' + Array.from({ length: 30 }, (_, index) => `  - child ${index}\n`).join('');
  const f = fixture(t, source, () => new Promise<void>(resolve => complete.push(resolve)));
  assert.equal(complete.length, 8);
  f.flush();
  assert.equal(complete.length, 8);
  f.key(' ');
  for (const resolve of complete.splice(0)) resolve();
  await new Promise<void>(resolve => setImmediate(resolve));
  f.flush();
  assert.equal(complete.length, 0);
  f.key(' ');
  assert.equal(complete.length, 8);
  f.surface.destroy();
  for (const resolve of complete.splice(0)) resolve();
  await new Promise<void>(resolve => setImmediate(resolve));
  f.flush();
  assert.equal(complete.length, 0);
});

test('large content loads behind a status message and measures the settled map once', t => {
  const source = '- Root\n' + Array.from({ length: 144 }, (_, index) => `  - Child ${index}\n`).join('');
  const f = fixture(t, source);
  const surface = f.surface as unknown as { layout(): void };
  const originalLayout = surface.layout.bind(surface);
  let layouts = 0;
  surface.layout = () => { layouts++; originalLayout(); };
  const loading = f.host.querySelector<HTMLElement>('.tvm-loading-map')!;
  assert.equal(loading.hidden, false);
  for (let frame = 0; frame < 5; frame++) f.flush();
  assert.equal(layouts, 0);
  assert.equal(loading.hidden, false);
  for (let frame = 0; frame < 20; frame++) f.flush();
  assert.equal(layouts, 1);
  assert.equal(loading.hidden, true);
  assert.equal(f.visible().length, 145);
});

test('outline and table layouts retain folding, selection and editing shortcuts', t => {
  const f = fixture(t, '- root\n  - first\n    - hidden\n  - last\n');
  f.surface.reveal(f.id('first'));
  f.key(' ');
  const folded = f.surface.getState().collapsed;
  f.surface.setLayout('outline');
  assert.equal(f.viewport.dataset.layout, 'outline');
  assert.equal(f.host.querySelectorAll('.tvm-edges path').length, 0);
  assert.match(f.element('first').style.transform, /^translate\(28px,/);
  assert.match(f.element('last').style.transform, /^translate\(28px,/);
  assert.deepEqual(f.surface.getState().collapsed, folded);
  assert.equal(f.surface.getState().selected, f.id('first'));
  f.key('Enter');
  assert.deepEqual(f.actions.pop(), { action: 'add-sibling', id: f.id('first') });
  f.surface.setLayout('table');
  assert.equal(f.viewport.dataset.layout, 'table');
  assert.equal(f.host.querySelectorAll('.tvm-edges path').length, 0);
  assert.equal(f.element('root').style.height, '90px');
  assert.equal(f.element('first').style.transform, 'translate(328px, 0px)');
  assert.equal(f.element('last').style.transform, 'translate(328px, 45px)');
  f.update(editNode(f.doc, f.id('last'), 'edited last'));
  assert.equal(f.viewport.dataset.layout, 'table');
  assert.deepEqual(f.surface.getState().collapsed, folded);
  f.surface.setLayout('map');
  assert.equal(f.element('root').style.height, '');
  assert.equal(f.host.querySelectorAll('.tvm-edges path').length, 2);
});

test('vertical arrows stay among siblings and Left moves to parent without folding', t => {
  const f = fixture(t, '- root\n  - first\n    - detail\n  - last\n');
  f.surface.reveal(f.id('first'));
  f.key('ArrowDown');
  assert.equal(f.surface.getState().selected, f.id('last'));
  f.key('ArrowUp');
  assert.equal(f.surface.getState().selected, f.id('first'));
  f.key('ArrowLeft');
  assert.equal(f.surface.getState().selected, f.id('root'));
  assert.deepEqual(f.surface.getState().collapsed, []);
  f.options.getCollapseOnLeft = () => true;
  f.key('ArrowLeft');
  assert.equal(f.surface.getState().selected, f.id('root'));
  assert.deepEqual(f.visible(), ['root']);
});

test('physical shortcuts can be reassigned and do not run twice or inside editors', t => {
  const f = fixture(t, '- root\n');
  f.options.getHotkeys = () => ({ copy: 'Alt+KeyQ', paste: '' });
  assert.equal(f.key('с', { code: 'KeyC', ctrlKey: true }).defaultPrevented, false);
  assert.equal(f.key('й', { code: 'KeyQ', altKey: true }).defaultPrevented, true);
  assert.deepEqual(f.actions.pop(), { action: 'copy', id: f.id('root') });
  assert.equal(f.key('м', { code: 'KeyV', ctrlKey: true }).defaultPrevented, false);
  const event = new f.dom.window.KeyboardEvent('keydown', { key: 'й', code: 'KeyQ', altKey: true, cancelable: true });
  event.preventDefault();
  assert.equal(f.surface.handleKeydown(event), false);
  const editable = f.dom.window.document.createElement('div');
  editable.setAttribute('contenteditable', '');
  const span = editable.appendChild(f.dom.window.document.createElement('span'));
  f.viewport.append(editable);
  const typing = new f.dom.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
  span.dispatchEvent(typing);
  assert.equal(typing.defaultPrevented, false);
  assert.equal(f.actions.length, 0);
  f.key('Tab', { ctrlKey: true });
  assert.deepEqual(f.actions.pop(), { action: 'add-parent', id: f.id('root') });
  f.key('ч', {code:'KeyX',ctrlKey:true});
  assert.deepEqual(f.actions.pop(), {action:'cut',id:f.id('root')});
  f.key('ч', {code:'KeyX',ctrlKey:true,repeat:true}); assert.equal(f.actions.length,0);
  f.surface.beginEdit(f.id('root'),'root',async()=>undefined);
  const input=f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;
  const cut=new f.dom.window.KeyboardEvent('keydown',{key:'ч',code:'KeyX',ctrlKey:true,bubbles:true,cancelable:true});
  input.dispatchEvent(cut); assert.equal(cut.defaultPrevented,false); assert.equal(f.actions.length,0);
});

test('clicking empty space clears selection and a source refresh preserves that choice', t => {
  const f = fixture(t, '- root\n  - child\n');
  f.surface.reveal(f.id('child'));
  f.viewport.click();
  assert.equal(f.surface.getState().selected, null);
  assert.equal(f.host.querySelector('.is-selected'), null);
  f.update(editNode(f.doc, f.id('child'), 'changed'));
  assert.equal(f.surface.getState().selected, null);
  f.key('ArrowRight');
  assert.equal(f.surface.getState().selected, f.id('root'));
});

test('high zoom survives restore and wheel zoom slows as scale grows', t => {
  const f = fixture(t, '- root\n  - child\n');
  const zoom = (scale: number) => {
    f.surface.update(f.doc, { ...f.surface.getState(), camera: { x: 20, y: 30, scale } });
    assert.equal(f.surface.getState().camera.scale, scale);
    const event = new f.dom.window.WheelEvent('wheel', { ctrlKey: true, deltaY: -80, clientX: 200, clientY: 100, cancelable: true });
    f.viewport.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true);
    const camera = f.surface.getState().camera;
    assert.ok(Math.abs((200 - camera.x) / camera.scale - 180 / scale) < 1e-8);
    return camera.scale / scale;
  };
  const normal = zoom(1), large = zoom(8);
  assert.ok(large > 1 && large < normal);
  assert.equal(zoom(32), 1);
});

 test('multi-selection extends and shrinks a range, toggles nodes and survives redraw', t => {
  const f=fixture(t,'- Root\n  - A\n  - B\n  - C\n');
  f.element('A').click(); f.key('ArrowDown',{shiftKey:true}); f.key('ArrowDown',{shiftKey:true});
  assert.deepEqual(f.surface.getSelection(),[f.id('A'),f.id('B'),f.id('C')]);
  f.key('ArrowUp',{shiftKey:true});assert.deepEqual(f.surface.getSelection(),[f.id('A'),f.id('B')]);
  f.element('C').dispatchEvent(new f.dom.window.MouseEvent('click',{bubbles:true,ctrlKey:true}));
  f.update(f.doc.source); assert.equal(f.surface.getSelection().length,3);
  f.element('B').dispatchEvent(new f.dom.window.MouseEvent('contextmenu',{bubbles:true,cancelable:true}));
  assert.equal(f.surface.getSelection().length,3);
  f.key('Escape');assert.equal(f.surface.getSelection().length,0);
  f.surface.toggleSelectionMode(); f.element('A').click(); f.element('C').click(); f.element('A').click();
  assert.deepEqual(f.surface.getSelection(),[f.id('C')]);
  f.key('a',{ctrlKey:true,code:'KeyA'});assert.equal(f.surface.getSelection().length,4);
});

test('touch selection rectangle uses screen geometry without panning and cancel restores selection', t => {
  const f=fixture(t,'- Root\n  - A\n  - B\n');
  for (const [index,name] of ['Root','A','B'].entries()) f.element(name).getBoundingClientRect=()=>({left:100,top:100+index*100,right:180,bottom:150+index*100,width:80,height:50,x:100,y:100+index*100,toJSON(){}});
  f.surface.toggleSelectionMode();const camera=f.surface.getState().camera;
  f.pointer('pointerdown',f.viewport,1,80,190);f.pointer('pointermove',f.viewport,1,190,360);f.pointer('pointerup',f.viewport,1,190,360);
  assert.deepEqual(f.surface.getSelection(),[f.id('A'),f.id('B')]);assert.deepEqual(f.surface.getState().camera,camera);
  f.pointer('pointerdown',f.viewport,2,80,90);f.pointer('pointermove',f.viewport,2,190,160);f.pointer('pointercancel',f.viewport,2,190,160);
  assert.deepEqual(f.surface.getSelection(),[f.id('A'),f.id('B')]);assert.equal(f.host.querySelector('.tvm-selection-box'),null);
});

test('touch hold starts group drag after delay; early motion, release and second finger cancel it', async t=>{
 const f=fixture(t,'- Root\n  - A\n  - B\n  - Target\n');const drops:any[]=[];
 f.options.onMoveBranches=(ids,target,position)=>drops.push({ids,target,position});
 const target=f.element('Target');target.getBoundingClientRect=()=>({x:100,y:100,left:100,top:100,right:200,bottom:200,width:100,height:100,toJSON(){}});
 f.dom.window.document.elementFromPoint=()=>target;
 f.element('A').click();f.element('B').dispatchEvent(new f.dom.window.MouseEvent('click',{bubbles:true,ctrlKey:true}));
 f.pointer('pointerdown',f.element('A'),1,10,10);f.pointer('pointermove',f.viewport,1,20,10);await new Promise(r=>setTimeout(r,480));
 assert.equal(f.viewport.classList.contains('is-dragging'),false);f.pointer('pointerup',f.viewport,1,20,10);
 f.pointer('pointerdown',f.element('A'),2,10,10);await new Promise(r=>setTimeout(r,480));assert.equal(f.viewport.classList.contains('is-dragging'),true);
 f.pointer('pointermove',f.viewport,2,150,110);assert.equal(target.dataset.dropPosition,'before');
 f.pointer('pointerup',f.viewport,2,150,110);assert.deepEqual(drops,[{ids:[f.id('A'),f.id('B')],target:f.id('Target'),position:'before'}]);
 f.pointer('pointerdown',f.element('A'),3,10,10);f.pointer('pointerup',f.element('A'),3,10,10);await new Promise(r=>setTimeout(r,480));assert.equal(f.viewport.classList.contains('is-dragging'),false);
 f.pointer('pointerdown',f.element('A'),4,10,10);f.pointer('pointerdown',f.viewport,5,20,20);await new Promise(r=>setTimeout(r,480));assert.equal(f.viewport.classList.contains('is-dragging'),false);
});

test('blank click cancels unchanged existing and new drafts but retains changed or busy drafts', t=>{
 const f=fixture(t,'- Root\n  - Child\n');let writes=0;
 f.surface.beginEdit(f.id('Root'),'Root',async()=>{writes++;return undefined;});f.viewport.click();assert.equal(f.surface.isEditing(),false);
 const original=f.doc;const draft=parseMap(addNode(original,f.id('Child'),'child','Temporary'),original);const id=draft.nodes.find(n=>n.text==='Temporary')!.id;
 f.surface.beginEdit(id,'',async()=>{writes++;return undefined;},undefined,draft);f.viewport.click();assert.equal(f.surface.isEditing(),false);assert.equal(f.host.textContent?.includes('Temporary'),false);
 f.surface.beginEdit(f.id('Child'),'Child',async()=>{writes++;return undefined;});const input=f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;
 input.value='Changed';f.viewport.click();assert.equal(f.surface.isEditing(),true);assert.equal(input.value,'Changed');assert.equal(f.host.querySelector('[role=alertdialog]'),null);
 input.value='Child';input.setAttribute('aria-busy','true');f.viewport.click();assert.equal(f.surface.isEditing(),true);assert.equal(writes,0);
});

test('editor follows the visible viewport when keyboard opens before any input and detaches on destroy', t=>{
 const f=fixture(t,'- Root\n  - Child\n');const visual=new f.dom.window.EventTarget();Object.assign(visual,{width:800,height:600,offsetLeft:0,offsetTop:0});
 Object.defineProperty(f.dom.window,'visualViewport',{value:visual,configurable:true});
 // The fixture was created before this mock: a window resize exercises the same listener.
 f.surface.beginEdit(f.id('Child'),'Child',async()=>undefined);f.flush();
 Object.assign(visual,{height:230,offsetTop:70});f.dom.window.dispatchEvent(new f.dom.window.Event('resize'));f.flush();
 const camera=f.surface.getState().camera;const [,x,y]=/translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(f.element('Child').style.transform)!;
 const top=Number(y)*camera.scale+camera.y;assert.ok(top>=82);assert.ok(top+45*camera.scale<=288);
 const input=f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;assert.equal(input.value,'Child');assert.ok(parseFloat(input.style.maxHeight)<230);
 f.surface.destroy();f.dom.window.dispatchEvent(new f.dom.window.Event('resize'));assert.equal(f.host.children.length,0);
});

test('pan and pinch while editing keep the same draft and typing follows it again', t=>{
 const f=fixture(t,'- Root\n  - Child\n');f.surface.beginEdit(f.id('Child'),'Child',async()=>undefined);f.flush();
 const input=f.host.querySelector<HTMLTextAreaElement>('.tvm-inline-input')!;input.value='Unsaved';
 const before=f.surface.getState().camera;f.pointer('pointerdown',f.viewport,1,100,100);f.pointer('pointermove',f.viewport,1,1000,1000);f.pointer('pointerup',f.viewport,1,1000,1000);
 assert.ok(f.surface.getState().camera.x>before.x+500);f.viewport.click();assert.equal(f.surface.isEditing(),true);assert.equal(input.value,'Unsaved');
 f.pointer('pointerdown',f.viewport,2,100,100);f.pointer('pointerdown',f.viewport,3,200,100);f.pointer('pointermove',f.viewport,3,250,100);f.pointer('pointerup',f.viewport,3,250,100);f.pointer('pointerup',f.viewport,2,100,100);
 assert.ok(f.surface.getState().camera.scale>before.scale);assert.equal(f.host.querySelector('.tvm-inline-input'),input);
 input.dispatchEvent(new f.dom.window.Event('input',{bubbles:true}));f.flush();const camera=f.surface.getState().camera;assert.ok(camera.x<900);assert.equal(input.value,'Unsaved');
});

test('global root collapse covers every root and restores only roots on one-level expansion', t=>{
 const f=fixture(t,'- First\n  - Child A\n    - Leaf A\n- Second\n  - Child B\n');f.surface.runHotkey('collapse-all');assert.deepEqual(f.visible(),['First','Second']);
 f.key('ArrowRight');assert.deepEqual(f.visible(),['First','Child A','Second']);assert.ok(f.surface.getState().collapsed.includes(f.id('Child A')));
 f.surface.setDepth(Infinity);assert.equal(f.visible().length,5);
});

test('Escape and a second finger cancel creation preview without adding a node', t=>{
 const f=fixture(t,'- Root\n');const port=f.host.querySelector('[data-create-action=add-child]')!;
 f.pointer('pointerdown',port,1,0,0);f.pointer('pointermove',port,1,40,0);assert.ok(f.host.querySelector('.tvm-create-preview > path')?.getAttribute('d'));
 assert.equal(f.key('Escape').defaultPrevented,true);f.pointer('pointerup',port,1,40,0);assert.equal(f.actions.length,0);
 f.pointer('pointerdown',port,2,0,0);f.pointer('pointermove',port,2,40,0);f.pointer('pointerdown',f.viewport,3,60,0);f.pointer('pointerup',port,2,40,0);assert.equal(f.actions.length,0);
});

test('block navigation opens only ancestors and preserves target, sibling and nested fold state', t => {
  const f=fixture(t,'- Root ^root\n  - Parent ^parent\n    - Target ^target\n      - Target child\n    - Closed sibling ^closed\n      - Sibling child\n  - Open sibling ^open\n    - Open child\n');
  const collapsed=['block:root','block:parent','block:target','block:closed'];
  f.surface.update(f.doc,{collapsed,selected:'block:root',focusRoot:null,camera:{x:48,y:48,scale:1}});
  f.surface.reveal('block:target');f.flush();
  assert.deepEqual(f.surface.getState().collapsed.sort(),['block:closed','block:target']);
  assert.equal(f.surface.getState().selected,'block:target');
  assert.ok(f.visible().includes('Target'));assert.ok(f.visible().includes('Open child'));
  assert.ok(!f.visible().includes('Target child'));assert.ok(!f.visible().includes('Sibling child'));
  const state=f.surface.getState();f.surface.update(f.doc,state);f.surface.reveal('block:target');
  assert.deepEqual(f.surface.getState().collapsed.sort(),state.collapsed.sort());
});


test('safe camera path survives repeated reverse wheel motion without changing folds or source', t => {
  const f = fixture(t, '- Root\n  - Child\n');
  f.options.useTransformPan = () => false;
  f.flush();
  const before = f.surface.getState();
  for (let i = 0; i < 20; i++) {
    for (const sign of [1, -1]) f.viewport.dispatchEvent(new f.dom.window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaX: sign * 180, deltaY: sign * 220 }));
  }
  assert.deepEqual(f.surface.getState(), before);
  assert.equal(f.frames.size, 1, 'wheel bursts share one pending paint');
  f.flush();
  f.viewport.dispatchEvent(new f.dom.window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaX: 70, deltaY: -90 }));
  const latest = f.surface.getState().camera;
  f.flush();
  const world = f.host.querySelector<HTMLElement>('.tvm-world')!;
  assert.equal(world.style.left, `${latest.x / latest.scale}px`);
  assert.equal(world.style.top, `${latest.y / latest.scale}px`);
  const edges = f.host.querySelector<SVGSVGElement>('.tvm-edges')!;
  assert.equal(edges.parentElement, f.viewport);
  assert.equal(edges.getAttribute('height'), null);
  Object.defineProperties(f.viewport, { clientWidth: { value: 360 }, clientHeight: { value: 240 } });
  f.resize();
  assert.deepEqual(edges.getAttribute('viewBox')?.split(' ').map(Number), [
    -latest.x / latest.scale, -latest.y / latest.scale, 360 / latest.scale, 240 / latest.scale,
  ]);
  assert.equal(f.doc.source, '- Root\n  - Child\n');
  assert.equal(f.host.querySelector<HTMLElement>('.tvm-world')!.style.transform, '');
  assert.equal(f.host.querySelector<HTMLElement>('.tvm-world')!.style.willChange, '');
});
