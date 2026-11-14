/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
import {JSDOM} from 'jsdom';
import {singleLine} from '../src/inline';
import * as i18n from '../src/i18n';

test('native draft takes command ownership on focus and reacquires it without stacking scopes',()=>{
 const dom=new JSDOM('<textarea>Before selected after</textarea><div id="tools"></div>');
 try {
  const document=dom.window.document,input=document.querySelector('textarea')!;
  const scopes:unknown[]=[];
  const previousEditor={id:'previous'},previousMode={sourceMode:true};
  const app:any={scope:{},workspace:{activeEditor:{editor:previousEditor}},keymap:{pushScope:(scope:unknown)=>scopes.push(scope),popScope:(scope:unknown)=>{const index=scopes.indexOf(scope);if(index>=0)scopes.splice(index,1);}}};
  const owner:any={app,file:{path:'Note.md'},editor:previousEditor,editMode:previousMode,addChild:()=>{},removeChild:()=>{}};
  class Native {
   editor:any;cm:any;editorSuggest={isShowingSuggestion:()=>false,close:()=>{}};
   value='';
   constructor(_app:any,host:HTMLElement){const content=document.createElement('div');host.append(content);this.cm={contentDOM:content};this.editor={focus:()=>{},setCursor:()=>{}};}
   set(text:string){this.value=text;} get(){return this.value;} destroy(){} onResize(){} buildLocalExtensions(){return [];} onUpdate(){}
  }
  const source=ts.transpileModule(readFileSync('src/native-editor.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports:any={};
  runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:i18n});
  const driver=exports.mountNativeEditor(owner,input,document.querySelector('#tools'),{handleKeydown:()=>false},Native);
  driver.focus();
  assert.equal(app.workspace.activeEditor,owner,'Formatting commands must target the focused native draft');
  assert.equal(scopes.length,1);
  app.workspace.activeEditor={editor:previousEditor};
  owner.editMode.cm.contentDOM.dispatchEvent(new dom.window.FocusEvent('focusin',{bubbles:true}));
  assert.equal(app.workspace.activeEditor,owner,'Returning from another window must restore command ownership');
  assert.equal(scopes.length,1,'Focus must not duplicate the keyboard scope');
  driver.dispose();
  assert.equal(scopes.length,0);assert.equal(owner.editor,previousEditor);assert.equal(owner.editMode,previousMode);assert.equal(app.workspace.activeEditor,null);
  driver.focus();assert.equal(app.workspace.activeEditor,null,'Disposed drafts must not retake commands');
 } finally {dom.window.close();}
});
