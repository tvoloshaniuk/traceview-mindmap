/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import * as i18n from '../src/i18n';
i18n.setLanguage('uk');
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {InlineEditor} from '../src/inline';

test('changed drafts require explicit discard; Escape/repeats and Continue preserve text and selection', () => {
  const dom = new JSDOM('<body></body>', {pretendToBeVisual:true});
  let cancels=0, saves=0;
  const editor = new InlineEditor(dom.window.document,'Original',{save:async()=>{saves++;},cancel:()=>{cancels++;editor.dispose();},resize:()=>{}});
  dom.window.document.body.append(editor.host);
  const key=(key:string,repeat=false)=>dom.window.document.activeElement!.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key,repeat,bubbles:true,cancelable:true}));
  editor.input.value='[[Ghost|Alias]]'; editor.input.setSelectionRange(2,7); editor.focus();
  key('Escape'); assert.ok(editor.host.querySelector('[role=alertdialog]')); assert.equal(cancels,0);
  assert.equal(dom.window.document.activeElement,editor.host.querySelector('.tvm-inline-keep'));
  key('Escape',true); key('Enter',true); assert.equal(cancels,0);
  key('Escape'); assert.equal(editor.host.querySelector('[role=alertdialog]'),null);
  assert.equal(dom.window.document.activeElement,editor.input); assert.equal(editor.input.selectionStart,2); assert.equal(editor.input.selectionEnd,7);
  key('Escape'); key('Enter');
  assert.equal(cancels,0); assert.equal(editor.input.value,'[[Ghost|Alias]]');
  editor.host.querySelector<HTMLButtonElement>('[aria-label="Скасувати (Escape)"]')!.click();
  editor.host.querySelector<HTMLButtonElement>('.tvm-inline-discard')!.focus(); key('Enter');
  assert.equal(cancels,1); assert.equal(saves,0); dom.window.close();
});

test('unchanged or reverted drafts cancel directly, but a pending image needs confirmation', () => {
  const dom = new JSDOM('<body></body>'); let cancels=0;
  const editor = new InlineEditor(dom.window.document,'Original',{save:async()=>{},cancel:()=>{cancels++;},resize:()=>{}});
  dom.window.document.body.append(editor.host);
  editor.input.value='Changed'; editor.input.value='Original'; editor.cancel(); assert.equal(cancels,1);
  editor.input.setAttribute('aria-busy','true'); editor.cancel(); assert.equal(cancels,1);
  assert.ok(editor.host.querySelector('[role=alertdialog]'));
  editor.dispose(); dom.window.close();
});

test('node text field is named by a hidden localized label, not a tooltip attribute; button tooltips remain', () => {
  const dom = new JSDOM('<body></body>'); const document = dom.window.document;
  const options = {save:async()=>{},cancel:()=>{},resize:()=>{}};
  const editor = new InlineEditor(document,'Original',options), other = new InlineEditor(document,'Other',options);
  document.body.append(editor.host, other.host);
  // Obsidian builds hover tooltips from aria-label; browsers build them from title.
  assert.equal(editor.input.closest('[aria-label], [title]'), null);
  const label = document.getElementById(editor.input.getAttribute('aria-labelledby')!)!;
  assert.equal(label.textContent, 'Текст вузла'); assert.equal(label.hidden, true); assert.ok(editor.host.contains(label));
  assert.notEqual(other.input.getAttribute('aria-labelledby'), label.id, 'Each draft needs its own label id');
  assert.equal(document.getElementById(other.input.getAttribute('aria-labelledby')!)!.textContent, 'Текст вузла');
  for (const name of ['Зберегти (Enter)', 'Скасувати (Escape)']) {
    assert.equal(editor.host.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)?.title, name);
  }
  editor.dispose(); other.dispose(); dom.window.close();
});


test('multiline drafts preserve paragraphs, allow Enter, and save only on explicit confirmation', async () => {
  const dom = new JSDOM('<body></body>');
  const saved: string[] = [];
  const editor = new InlineEditor(dom.window.document, 'First\r\n\r\nSecond', {
    multiline: true, allowEmpty: true, save: async text => { saved.push(text); }, cancel: () => {}, resize: () => {},
  });
  dom.window.document.body.append(editor.host);
  assert.equal(editor.input.value, 'First\n\nSecond');
  const key = (modifiers: KeyboardEventInit = {}) => new dom.window.KeyboardEvent('keydown', {key:'Enter', bubbles:true, cancelable:true, ...modifiers});
  const enter = key(); editor.input.dispatchEvent(enter);
  assert.equal(enter.defaultPrevented, false); assert.equal(saved.length, 0);
  const newline = new dom.window.InputEvent('beforeinput', {inputType:'insertParagraph', bubbles:true, cancelable:true});
  editor.input.dispatchEvent(newline); assert.equal(newline.defaultPrevented, false);
  editor.input.value += '\n- [ ] Task'; editor.input.dispatchEvent(new dom.window.Event('input'));
  editor.input.dispatchEvent(key({ctrlKey:true})); await Promise.resolve();
  assert.deepEqual(saved, ['First\n\nSecond\n- [ ] Task']);
  editor.input.value = ''; await editor.submit(); assert.equal(saved[1], '');
  editor.dispose(); dom.window.close();
});

test('multiline prompt takes precedence over sibling creation only inside a single-line editor', () => {
  const dom=new JSDOM('<body></body>');let prompts=0,siblings=0;
  const options={save:async()=>{},cancel:()=>{},resize:()=>{},createAbove:()=>{siblings++;return true;}};
  const editor=new InlineEditor(dom.window.document,'Draft',options);editor.requestMultiline=()=>{prompts++;};
  const key=(repeat=false)=>new dom.window.KeyboardEvent('keydown',{key:'Enter',shiftKey:true,repeat,bubbles:true,cancelable:true});
  editor.handleKeydown(key());editor.handleKeydown(key(true));assert.equal(prompts,1);assert.equal(siblings,0);
  const multiline=new InlineEditor(dom.window.document,'Paragraph',{...options,multiline:true});multiline.requestMultiline=()=>{prompts++;};
  assert.equal(multiline.handleKeydown(key()),false);assert.equal(prompts,1);assert.equal(siblings,0);
  editor.dispose();multiline.dispose();dom.window.close();
});
