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

test('native draft shares the textarea label instead of a tooltip attribute; unlabelled drafts keep a name',()=>{
 const dom=new JSDOM('<div id="labelled"><span id="node-label" hidden>Node text</span><textarea aria-labelledby="node-label"></textarea><div class="tools"></div></div><div id="bare"><textarea></textarea><div class="tools"></div></div>');
 try {
  const document=dom.window.document;
  const app:any={scope:{},workspace:{activeEditor:null},keymap:{pushScope:()=>{},popScope:()=>{}}};
  class Native {
   editor:any;cm:any;editorSuggest={isShowingSuggestion:()=>false,close:()=>{}};
   value='';
   constructor(_app:any,host:HTMLElement){const content=document.createElement('div');host.append(content);this.cm={contentDOM:content};this.editor={focus:()=>{},setCursor:()=>{}};}
   set(text:string){this.value=text;} get(){return this.value;} destroy(){} onResize(){} buildLocalExtensions(){return [];} onUpdate(){}
  }
  const source=ts.transpileModule(readFileSync('src/native-editor.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports:any={};
  runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:i18n});
  const mount=(id:string)=>{
   const root=document.getElementById(id)!,owner:any={app,file:{path:'Note.md'},addChild:()=>{},removeChild:()=>{}};
   const driver=exports.mountNativeEditor(owner,root.querySelector('textarea'),root.querySelector('.tools'),{handleKeydown:()=>false},Native);
   return {root,driver,content:owner.editMode.cm.contentDOM as HTMLElement};
  };
  const labelled=mount('labelled');
  // Obsidian builds hover tooltips from the nearest aria-label; browsers build them from title.
  assert.equal(labelled.content.closest('[aria-label], [title]'),null);
  assert.equal(labelled.content.getAttribute('aria-labelledby'),'node-label');
  const link=i18n.t("Native Obsidian link");
  assert.equal(labelled.root.querySelector<HTMLButtonElement>(`.tools button[aria-label="${link}"]`)?.title,link,'Formatting buttons keep their tooltips');
  const bare=mount('bare');
  assert.equal(bare.content.getAttribute('aria-label'),i18n.t("Node text"),'A draft without a label element must still be named');
  labelled.driver.dispose();bare.driver.dispose();
 } finally {dom.window.close();}
});
