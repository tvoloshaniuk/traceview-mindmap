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
import {nativeSearchHighlighter} from '../src/search-highlight';
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
  runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:name==='./search-highlight'?{nativeSearchHighlighter}:i18n});
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
  runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:name==='./search-highlight'?{nativeSearchHighlighter}:i18n});
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

test('native resize waits for the editor update, coalesces requests and closes stale suggestion ranges', () => {
  const dom = new JSDOM('<textarea>abc</textarea><div id="tools"></div>');
  try {
    const document = dom.window.document, input = document.querySelector('textarea')!;
    const frames = new Map<number, FrameRequestCallback>();
    let serial = 0, updating = false, resizes = 0, closes = 0;
    dom.window.requestAnimationFrame = callback => {frames.set(++serial, callback); return serial;};
    dom.window.cancelAnimationFrame = id => {frames.delete(id);};
    const app:any = {scope:{},workspace:{},keymap:{pushScope(){},popScope(){}}};
    const owner:any = {app,file:{path:'Note.md'},addChild(){},removeChild(){}};
    class Native {
      editor:any; cm:any; value = '';
      editorSuggest:any = {isShowingSuggestion:()=>true, close:()=>{closes++;this.editorSuggest.currentSuggest.context=null;}};
      constructor(_app:any,host:HTMLElement) {
        const content=document.createElement('div');host.append(content);this.cm={contentDOM:content};
        this.editor={focus(){},setCursor(){},lineCount:()=>1,getLine:()=>this.value};
      }
      set(value:string){this.value=value;} get(){return this.value;} destroy(){} buildLocalExtensions(){return [];} onUpdate(){}
      onResize(){
        assert.equal(updating,false,'Layout must not reenter a running editor update');
        const context=this.editorSuggest.currentSuggest?.context;
        if(context && context.end.ch > this.value.length) throw new RangeError('Invalid document position');
        resizes++;
      }
    }
    const source=ts.transpileModule(readFileSync('src/native-editor.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
    const exports:any={};
    runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:name==='./search-highlight'?{nativeSearchHighlighter}:i18n});
    const driver=exports.mountNativeEditor(owner,input,document.querySelector('#tools'),{handleKeydown:()=>false},Native);
    const native=owner.editMode;
    native.editorSuggest.currentSuggest={context:{editor:native.editor,start:{line:0,ch:0},end:{line:0,ch:4}}};
    updating=true;driver.resize();driver.resize();assert.equal(resizes,0);assert.equal(frames.size,1);updating=false;
    const flush=()=>{const pending=[...frames.values()];frames.clear();for(const frame of pending)frame(0);};
    flush();
    assert.equal(closes,1);assert.equal(resizes,1);
    native.editorSuggest.currentSuggest.context={editor:native.editor,start:{line:0,ch:0},end:{line:0,ch:3}};
    driver.resize();flush();assert.equal(closes,1);assert.equal(resizes,2);
    driver.resize();driver.dispose();assert.equal(frames.size,0);flush();assert.equal(resizes,2);
  } finally {dom.window.close();}
});


test('native multiline transactions preserve paragraphs while ordinary node drafts remain single line', () => {
  const dom = new JSDOM('<body></body>');
  try {
    const document = dom.window.document;
    const app:any = {scope:{},workspace:{},keymap:{pushScope(){},popScope(){}}};
    class Native {
      editor:any; cm:any; value=''; editorSuggest={isShowingSuggestion:()=>false,close(){}};
      constructor(_app:any,host:HTMLElement) {
        const content=document.createElement('div');host.append(content);
        this.cm={contentDOM:content,state:{constructor:{transactionFilter:{of:(filter:unknown)=>filter}}}};
        this.editor={focus(){},setCursor(){},offsetToPos:()=>({line:0,ch:0})};
      }
      set(value:string){this.value=value;} get(){return this.value;} destroy(){} onResize(){} onUpdate(){} buildLocalExtensions(){return [];}
    }
    const source=ts.transpileModule(readFileSync('src/native-editor.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
    const exports:any={};
    runInNewContext(source,{exports,require:(name:string)=>name==='obsidian'?{Scope:class {register(){}},MarkdownView:class {}}:name==='./inline'?{singleLine}:name==='./search-highlight'?{nativeSearchHighlighter}:i18n});
    for (const multiline of [false,true]) {
      const input=document.createElement('textarea'),tools=document.createElement('div'); document.body.append(input,tools);
      const owner:any={app,file:{path:'Note.md'},addChild(){},removeChild(){}};
      const driver=exports.mountNativeEditor(owner,input,tools,{multiline,handleKeydown:()=>false},Native);
      const filter=owner.editMode.buildLocalExtensions()[0];
      const transaction={docChanged:true,newDoc:{toString:()=> 'First\n\nSecond'},startState:{doc:{length:0}},newSelection:{main:{anchor:13,head:13}}};
      const result=filter(transaction);
      if(multiline)assert.equal(result,transaction);else assert.equal(result.changes.insert,'First Second');
      input.readOnly=true;assert.equal(filter(transaction).length,0,'Saving locks both editor modes');
      driver.dispose();input.remove();tools.remove();
    }
  } finally {dom.window.close();}
});
