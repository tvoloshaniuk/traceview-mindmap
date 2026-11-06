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
  assert.equal(dom.window.document.activeElement,editor.host.querySelector('.tvm-inline-discard'));
  key('Escape',true); key('Enter',true); assert.equal(cancels,0);
  key('Escape'); assert.equal(editor.host.querySelector('[role=alertdialog]'),null);
  assert.equal(dom.window.document.activeElement,editor.input); assert.equal(editor.input.selectionStart,2); assert.equal(editor.input.selectionEnd,7);
  editor.cancel(); editor.host.querySelector<HTMLButtonElement>('.tvm-inline-keep')!.focus(); key('Enter');
  assert.equal(cancels,0); assert.equal(editor.input.value,'[[Ghost|Alias]]');
  editor.host.querySelector<HTMLButtonElement>('[aria-label="Скасувати (Escape)"]')!.click(); key('Enter');
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
