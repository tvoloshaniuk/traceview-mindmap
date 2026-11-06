/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import * as i18n from '../src/i18n';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
import {JSDOM} from 'jsdom';
import {singleLine} from '../src/inline';

test('standard Editor text commands insert at the caret, preserve a single line and support undo', () => {
  const dom=new JSDOM('<textarea></textarea>');
  try {
    const exports:any={};
    const source=ts.transpileModule(readFileSync('src/input-editor.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
    runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Editor:class{}}:name==='./i18n'?i18n:{singleLine}});
    const input=dom.window.document.querySelector('textarea')!;input.value='before after';
    const editor=new exports.InputEditor(input);
    editor.setSelection({line:0,ch:7});
    // Same Editor contract used by date/time insertion commands; no command-specific interception.
    const insertDate=(editor:any)=>editor.replaceSelection('2026-10-03 ');
    insertDate(editor);assert.equal(input.value,'before 2026-10-03 after');
    editor.undo();assert.equal(input.value,'before after');editor.redo();assert.equal(input.value,'before 2026-10-03 after');
    editor.setSelection({line:0,ch:0},{line:0,ch:6});editor.replaceSelection('one\ntwo');
    assert.equal(input.value,'one two 2026-10-03 after');
    editor.transaction({changes:[{from:{line:0,ch:0},to:{line:0,ch:7},text:'new'}],selection:{from:{line:0,ch:3}}});
    assert.equal(input.value,'new 2026-10-03 after');assert.equal(editor.getCursor().ch,3);
    editor.dispose();editor.replaceSelection('wrong');assert.equal(input.value,'new 2026-10-03 after');
  } finally {dom.window.close();}
});
