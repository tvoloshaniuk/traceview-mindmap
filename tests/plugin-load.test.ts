/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { parseMap } from '../src/core';
import { JSDOM } from 'jsdom';
import ts from 'typescript';

interface Command { id: string; name: string; checkCallback?: (checking: boolean) => boolean; }
interface View { getViewType(): string; getState?(): Record<string, unknown>; }

async function loadBundle(savedSettings: unknown, window?: JSDOM['window'], localSourcePaths: string[] = [], storage?: Map<string, unknown>) {
  const notices: string[] = [];
  const clipboard = {text:'', async writeText(text:string) { this.text=text; }, async readText() {return this.text;} };
  const commands: Command[] = [];
  const views = new Map<string, (leaf: unknown) => View>();
  const events: string[] = [];
  const registeredEvents: unknown[] = [];
  const settingsTabs: unknown[] = [];
  const ribbons: string[] = [];
  const app = {
    loadLocalStorage: (key: string) => storage ? storage.get(key) : localSourcePaths,
    saveLocalStorage: (key: string, value: unknown) => { if (storage) storage.set(key, value); else localSourcePaths = value as string[]; },
    workspace: {
      on(name: string, callback: unknown) { events.push(`workspace:${name}`); return { name, callback }; },
      getActiveViewOfType() { return null; }
    },
    vault: {
      on(name: string, callback: unknown) { events.push(`vault:${name}`); return { name, callback }; }
    }
  };
  type MockApp = typeof app;
  class Plugin {
    constructor(public app: MockApp) {}
    async loadData() { return savedSettings; }
    async saveData(_data: unknown) {}
    registerView(type: string, factory: (leaf: unknown) => View) { views.set(type, factory); }
    addCommand(command: Command) { commands.push(command); }
    addSettingTab(tab: unknown) { settingsTabs.push(tab); }
    addRibbonIcon(icon: string) { ribbons.push(icon); }
    registerEvent(event: unknown) { registeredEvents.push(event); }
    register(_cleanup: () => void) {}
    registerHoverLinkSource() {}
  }
  class ItemView {
    app: MockApp;
    constructor(public leaf: { app: MockApp }) { this.app = leaf.app; }
  }
  class TFile { extension = 'md'; constructor(public path: string) {} }
  class FileView extends ItemView {
    nativeRenames = 0;
    async onRename(file: TFile) { if (file === this.file) this.nativeRenames++; }
    file: TFile | null = null;
    async setState(state: { file?: string }) {
      if (this.file?.path === state.file) return;
      if (this.file) await (this as any).onUnloadFile(this.file);
      this.file = state.file ? new TFile(state.file) : null;
      if (this.file) await (this as any).onLoadFile(this.file);
    }
  }
  const obsidian = {
    getLanguage: () => 'uk',
    Plugin, ItemView, FileView, EditableFileView: class extends FileView {async onOpen() {} onPaneMenu() {}}, Editor: class {}, Notice: class { constructor(text:string) {notices.push(text);} },
    Scope: class { register() {} },
    Component: class { addChild(child:any) {return child;} removeChild(child:any) {child.unload();} unload() {} },
    MarkdownRenderer: {render:async(_app:any,text:string,el:HTMLElement)=>{el.textContent=text;}},
    PluginSettingTab: class {},
    FuzzySuggestModal: class {},
    SuggestModal: class {},
    Modal: class {},
    MarkdownView: class {},
    Platform: { isWin: true },
    TFile,
    parseLinktext: (link: string) => { const split = link.indexOf('#'); return {path:split<0?link:link.slice(0,split),subpath:split<0?'':link.slice(split)}; }
  };
  const module = { exports: {} as { default?: new (app: MockApp) => Plugin & { onload(): Promise<void>; settings: Record<string, boolean> } } };
  const filename = resolve('main.js');
  runInNewContext(readFileSync(filename, 'utf8'), {
    module, window, navigator: {clipboard},
    exports: module.exports,
    require(name: string) {
      assert.equal(name, 'obsidian', 'The mobile bundle must not import Node-only modules');
      return obsidian;
    }
  }, { filename });
  assert.equal(typeof module.exports.default, 'function', 'main.js must export the Obsidian plugin class');
  const plugin = new module.exports.default!(app);
  await plugin.onload();
  return { plugin, commands, views, events, registeredEvents, settingsTabs, ribbons, app, FileView, TFile, clipboard, notices, MarkdownView: obsidian.MarkdownView };
}

test('distributed main.js evaluates and enables with the Obsidian API', async () => {
  const loaded = await loadBundle(null);
  assert.equal(loaded.plugin.settings.autoOpen, false);
  assert.equal(loaded.plugin.settings.hideFrozen, true);
  assert.deepEqual([...loaded.views.keys()], ['traceview-mindmap-map', 'traceview-mindmap-queue']);
  const ids = loaded.commands.map(command => command.id);
  assert.equal(new Set(ids).size, ids.length, 'Command IDs must be unique');
  for (const id of ['open-map', 'find-map', 'new-map', 'open-queue', 'add-child', 'add-sibling', 'add-parent', 'paste-after', 'cut-branch', 'undo', 'redo']) {
    assert.ok(ids.includes(id), `Missing command: ${id}`);
  }
  for (const command of loaded.commands) {
    if (command.checkCallback) assert.equal(command.checkCallback(true), false);
  }
  assert.equal(loaded.settingsTabs.length, 1);
  assert.deepEqual(loaded.ribbons, ['git-fork']);
  assert.deepEqual(loaded.events.sort(), [
    'vault:create', 'vault:delete', 'vault:modify', 'vault:rename', 'workspace:active-leaf-change', 'workspace:editor-menu', 'workspace:file-menu', 'workspace:file-open', 'workspace:layout-change'
  ]);
  assert.equal(loaded.registeredEvents.length, loaded.events.length);
  for (const [type, factory] of loaded.views) {
    assert.equal(factory({ app: loaded.app }).getViewType(), type);
  }
});

test('map view exposes its file and replaces the same leaf for source/map links; modifiers use a new tab', async () => {
  const loaded = await loadBundle(null);
  const app = loaded.app as any, plugin = loaded.plugin as any;
  const calls: {leaf:string;state:any}[] = [];
  const leaf: any = { app, setViewState: async (state: any) => { calls.push({leaf:'current',state}); } };
  const view = loaded.views.get('traceview-mindmap-map')!(leaf) as any; leaf.view = view;
  assert.equal(view instanceof loaded.FileView, true);
  await view.setState({file:'First.mindmap.md'},{});
  assert.equal(view.file.path,'First.mindmap.md'); assert.equal(view.path,'First.mindmap.md');
  await view.setState({file:'Second.mindmap.md'},{});
  assert.equal(view.file.path,'Second.mindmap.md'); assert.equal(view.path,'Second.mindmap.md');
  const tab: any = {view:{},setViewState:async(state:any)=>{calls.push({leaf:'new',state});}};
  const map = new loaded.TFile('Target.mindmap.md'), note = new loaded.TFile('Note.md');
  app.workspace.getLeaf = () => tab;
  app.workspace.revealLeaf = async () => {};
  app.workspace.getLeavesOfType = () => [leaf];
  app.metadataCache = { getFirstLinkpathDest:(path:string)=>path==='Target'?map:note,getFileCache:()=>({}) };
  await plugin.openMapLink('Target',view,{ctrlKey:false,metaKey:false,button:0});
  await plugin.openMapLink('Target',view,{ctrlKey:true,shiftKey:false,metaKey:false,button:0});
  await plugin.openMapLink('Target',view,{ctrlKey:true,shiftKey:true,metaKey:false,button:0});
  await plugin.openMapLink('Note',view,{ctrlKey:false,metaKey:false,button:0});
  await plugin.source(view.file,0,leaf);
  assert.deepEqual(calls.map(call=>[call.leaf,call.state.type]),[
    ['current','traceview-mindmap-map'],['new','traceview-mindmap-map'],['new','traceview-mindmap-map'],['current','markdown'],['current','markdown']
  ]);
});

test('a restored map waits for layout readiness without blocking workspace restoration', async () => {
  const loaded = await loadBundle(null);
  const app = loaded.app as any;
  const ready: (() => void)[] = [];
  app.workspace.layoutReady = false;
  app.workspace.onLayoutReady = (callback: () => void) => ready.push(callback);
  const view = loaded.views.get('traceview-mindmap-map')!({ app }) as any;
  const file = new loaded.TFile('Restored.mindmap.md');
  let reads = 0;
  let renders = 0;
  app.vault.getAbstractFileByPath = () => file;
  app.vault.read = async () => { reads++; return '- Root\n'; };
  view.surface = { setLayout() {}, update() { renders++; }, getState: () => ({
    collapsed: [], selected: null, focusRoot: null, camera: { x: 0, y: 0, scale: 1 }
  }) };
  await view.onLoadFile(file);
  await view.reload();
  assert.equal(ready.length, 1);
  assert.equal(reads, 0);
  assert.equal(renders, 0);
  app.workspace.layoutReady = true;
  ready[0]();
  await new Promise<void>(resolve => setImmediate(resolve));
  assert.equal(reads, 1);
  assert.equal(renders, 1);
});

test('a large restored map waits for explicit activation and keeps its saved view', async () => {
  const loaded = await loadBundle(null);
  const app = loaded.app as any;
  const view = loaded.views.get('traceview-mindmap-map')!({ app }) as any;
  const source = '- Root ^root\n' + Array.from({ length: 410 }, (_, index) => `  - Child ${index}\n`).join('')
    + '  - Folded ^folded\n    - Hidden\n';
  const saved = { collapsed: ['block:folded'], selected: 'block:root', focusRoot: null, camera: { x: 80, y: -550, scale: 0.8 } };
  app.loadLocalStorage = () => JSON.stringify(saved);
  app.vault.getAbstractFileByPath = () => view.file;
  app.vault.read = async () => source;
  const renders: unknown[] = [];
  view.surface = { isEditing: () => false, setLayout() {}, update(_doc: unknown, state: unknown) { renders.push(state); }, getState: () => saved };
  view.startupGate = { hidden: true };
  await view.setState({ file: 'Restored.mindmap.md' }, {});
  assert.equal(view.startupGate.hidden, false);
  await view.reload();
  view.persist();
  assert.equal(renders.length, 0);
  await view.setState({ file: 'Restored.mindmap.md', openNow: true }, {});
  assert.equal(view.startupGate.hidden, true);
  assert.equal(renders.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(renders[0])), saved);
  assert.deepEqual(JSON.parse(JSON.stringify(view.getState())), { file: 'Restored.mindmap.md' });
});

test('enabling the distributed plugin preserves saved settings', async () => {
  const { plugin } = await loadBundle({ autoOpen: true, hideFrozen: false, hotkeys: { copy: 'Alt+KeyC', paste: '', undo: 9 } });
  assert.equal(plugin.settings.autoOpen, true);
  assert.equal(plugin.settings.hideFrozen, false);
  assert.deepEqual(JSON.parse(JSON.stringify(plugin.settings.hotkeys)), { copy: 'Alt+KeyC', paste: '' });
});

async function cutFixture() {
  const loaded = await loadBundle(null), app = loaded.app as any;
  const original = '---\ntags: mindmap\n---\n- Root\n  - Source [[Ghost|Alias]]\n    - Descendant\n  - Target\n';
  let source = original;
  const file = new loaded.TFile('Cut.mindmap.md');
  app.workspace.getLeavesOfType = () => [];
  app.vault.getAbstractFileByPath = () => file;
  app.vault.process = async (_file:any, transform:(value:string)=>string) => {source=transform(source);};
  const view = loaded.views.get('traceview-mindmap-map')!({app}) as any;
  view.path=file.path; view.doc=parseMap(source);
  view.reload=async()=>{view.doc=parseMap(source,view.doc);};
  return {...loaded, view, original, source:()=>source, external:(value:string)=>{source=value;}, id:(text:string)=>view.doc.nodes.find((node:any)=>node.text.startsWith(text))!.id};
}

async function inlineFixture() {
  const dom=new JSDOM('<textarea></textarea><div id="tools"></div>',{pretendToBeVisual:true});
  const loaded=await loadBundle(null,dom.window), app=loaded.app as any;
  const view=loaded.views.get('traceview-mindmap-map')!({app}) as any;
  view.file=new loaded.TFile('Map.mindmap.md'); view.path=view.file.path;
  const input=dom.window.document.querySelector('textarea')!; input.value='Before selected after'; input.setSelectionRange(7,15);
  let updates=0; app.mobileToolbar={update(){updates++;}};
  assert.equal(view.getMode(),'preview');
  const close=view.mountEditor(input,dom.window.document.querySelector('#tools')!,view.path);
  input.focus();
  return {...loaded,dom,app,view,input,close,updates:()=>updates};
}

test('inline editor exposes the native source-mode contract and updates the mobile toolbar through its lifecycle',async()=>{
  const f=await inlineFixture();
  try {
    assert.equal(f.app.workspace.activeEditor,f.view);
    assert.equal(f.app.workspace.activeEditor.getMode(),'source'); assert.equal(f.view.editor.hasFocus(),true);
    const updates=f.updates(); f.input.blur(); assert.ok(f.updates()>updates);
    assert.equal(f.app.workspace.activeEditor.getMode(),'source','File picker blur must keep its captured editor available');
    assert.equal(f.dom.window.document.querySelector('.tvm-inline-preview'),null);
    const editor=f.view.editor; f.close();
    assert.equal(f.view.getMode(),'preview'); assert.equal(f.app.workspace.activeEditor,null);
    editor.replaceSelection('late attachment'); assert.equal(f.input.value,'Before selected after');
    delete f.app.mobileToolbar;
    const close=f.view.mountEditor(f.input,f.dom.window.document.querySelector('#tools')!,f.view.path); close();
  } finally { f.close(); f.dom.window.close(); }
});

test('installed Obsidian attachment command is listed and inserts its native file embed into the draft', {skip:!process.env.OBSIDIAN_TEST_ASAR},async()=>{
  const f=await inlineFixture();
  try {
    const archive=readFileSync(process.env.OBSIDIAN_TEST_ASAR!);
    const header=JSON.parse(archive.subarray(16,16+archive.readUInt32LE(12)).toString()), entry=header.files['app.js'];
    const offset=8+archive.readUInt32LE(4)+Number(entry.offset), source=archive.subarray(offset,offset+entry.size).toString();
    const registryStart=source.indexOf('t.prototype.addCommand=function(e){var t=this;e.mobileOnly');
    const registryEnd=source.indexOf(',t.prototype.removeCommand',registryStart);
    const commandStart=source.indexOf('{id:"editor:attach-file",name:bd.setting.mobileToolbar.optionAttach()');
    const commandEnd=source.indexOf('),n.addCommand({id:"editor:delete-paragraph"',commandStart);
    assert.ok(registryStart>=0 && registryEnd>registryStart && commandStart>=0 && commandEnd>commandStart,'Inspect changed host before adapting extraction');
    const doc=f.dom.window.document;
    (doc.body as any).createEl=(tag:string,options:any)=>{const el=doc.createElement(tag);el.setAttribute('type',options.type);doc.body.append(el);return el;};
    (f.dom.window.Element.prototype as any).detach=function(){this.remove();};
    const saved:any[]=[];
    f.app.workspace.getActiveFile=()=>f.view.file;
    f.app.saveAttachment=async(name:string,ext:string,bytes:ArrayBuffer)=>{saved.push({name,ext,bytes:[...new Uint8Array(bytes)]});return {path:`Attachments/${name}.${ext}`};};
    f.app.fileManager={generateMarkdownLink:(file:any,path:string)=>{assert.equal(path,'Map.mindmap.md');return `[[${file.path}]]`;}};
    const helpers=ts.transpileModule('async function probe(){await 0;}',{compilerOptions:{target:ts.ScriptTarget.ES5}}).outputText;
    const context:any={e:f.app,t:{},window:f.dom.window,activeDocument:doc,rd:{isMobile:true},i5:class{},
      bd:{setting:{mobileToolbar:{optionAttach:()=> 'Insert attachment'}}},
      Al:(name:string)=>name,Ll:(name:string)=>name.slice(0,name.lastIndexOf('.')),Fl:(name:string)=>name.slice(name.lastIndexOf('.')+1),
      setTimeout:f.dom.window.setTimeout.bind(f.dom.window),clearTimeout:f.dom.window.clearTimeout.bind(f.dom.window)};
    Object.assign(context,runInNewContext(helpers+';({y:__awaiter,b:__generator})'));
    const command=runInNewContext('('+source.slice(commandStart,commandEnd)+')',context);
    const addCommand=runInNewContext('('+source.slice(registryStart+'t.prototype.addCommand='.length,registryEnd)+')',context);
    addCommand.call({app:f.app,commands:{},editorCommands:{},trigger(){}},command);
    assert.equal(command.checkCallback(true),true,'Native command must be available in the command palette');
    command.checkCallback(false);
    const picker=doc.querySelector<HTMLInputElement>('input[type=file]'); assert.ok(picker,'Toolbar command must open the native picker');
    const image=new File([new Uint8Array([137,80,78,71])],'photo.png',{type:'image/png'});
    Object.defineProperty(picker,'files',{value:[image]}); picker.dispatchEvent(new f.dom.window.Event('change'));
    await new Promise(resolve=>setTimeout(resolve,20));
    assert.equal(saved.length,1); assert.deepEqual(saved[0],{name:'photo',ext:'png',bytes:[137,80,78,71]});
    assert.equal(f.input.value,'Before ![[Attachments/photo.png]] after');
    f.view.editor.undo(); assert.equal(f.input.value,'Before selected after');
    f.close(); assert.equal(command.checkCallback(true),null,'No native editing command after draft closes');
  } finally {f.close(); f.dom.window.close();}
});

test('cut writes the complete branch before deletion, can paste as child, and Undo restores source', async () => {
  const f=await cutFixture();
  await f.view.action('cut',f.id('Source'));
  assert.equal(f.clipboard.text,'  - Source [[Ghost|Alias]]\n    - Descendant\n');
  assert.doesNotMatch(f.source(),/Source|Descendant/);
  await f.view.action('paste',f.id('Target'));
  assert.match(f.source(),/  - Target\n    - Source \[\[Ghost\|Alias\]\]\n      - Descendant/);
  await f.view.action('undo',null); await f.view.action('undo',null);
  assert.equal(f.source(),f.original);
});

test('denied clipboard or concurrent external edits cannot delete a cut branch; pending cut ignores repeats', async () => {
  const f=await cutFixture();
  f.clipboard.writeText=async()=>{throw new Error('Denied');};
  await f.view.action('cut',f.id('Source')); assert.equal(f.source(),f.original);
  assert.match(f.notices.at(-1)!,/не вирізано/);
  let writes=0, release!:()=>void;
  f.clipboard.writeText=async(text:string)=>{writes++; await new Promise<void>(resolve=>{release=resolve;}); f.clipboard.text=text;};
  const pending=f.view.action('cut',f.id('Source'));
  await f.view.action('cut',f.id('Source')); assert.equal(writes,1);
  f.external(f.original+'  - External\n'); release(); await pending;
  assert.equal(f.source(),f.original+'  - External\n');
  assert.match(f.clipboard.text,/Descendant/);
  await f.view.action('undo',null); assert.equal(f.source(),f.original+'  - External\n');
});

test('batch label and cut commands are single undoable changes and clipboard failures preserve all branches',async()=>{
 const f=await cutFixture(); const ids=[f.id('Source'),f.id('Descendant'),f.id('Target')];
 f.view.surface={isEditing:()=>false,getSelection:()=>ids};
 await f.view.action('make-step',ids[0]); assert.match(f.source(),/#step 1\)/);assert.match(f.source(),/#step 3\)/);
 await f.view.action('undo',null);assert.equal(f.source(),f.original);
 const fresh=[f.id('Source'),f.id('Descendant'),f.id('Target')];f.view.surface.getSelection=()=>fresh;
 f.clipboard.writeText=async()=>{throw Error('Denied');};await f.view.action('cut',fresh[0]);assert.equal(f.source(),f.original);
 f.clipboard.writeText=async(text:string)=>{f.clipboard.text=text;};await f.view.action('cut',fresh[0]);
 assert.doesNotMatch(f.source(),/Source|Descendant|Target/);assert.equal(f.clipboard.text.match(/Descendant/g)?.length,1);
 await f.view.action('undo',null);assert.equal(f.source(),f.original);
});

test('moving a selection is one guarded write and one Undo; concurrent source edits are retained',async()=>{
 const f=await cutFixture();let ids=[f.id('Source'),f.id('Descendant')];
 f.view.surface={isEditing:()=>false,revealSelection(){},getSelection:()=>ids};
 await f.view.reparent(ids,f.id('Target'),'after');assert.match(f.source(),/  - Target\n  - Source \[\[Ghost\|Alias\]\]\n    - Descendant/);
 await f.view.action('undo',null);assert.equal(f.source(),f.original);
 ids=[f.id('Source')];f.external(f.original+'  - External\n');await f.view.reparent(ids,f.id('Target'),'child');assert.equal(f.source(),f.original+'  - External\n');
});

test('native file, active-leaf and layout events open maps after saving; explicit source stays source across reload',async()=>{
 const dom=new JSDOM('',{pretendToBeVisual:true});const f=await loadBundle({autoOpen:true},dom.window),app=f.app as any,plugin=f.plugin as any;const calls:string[]=[];let saves=0;
 const leaf:any={view:null,setViewState:async(state:any)=>{calls.push(state.type);if(state.type==='traceview-mindmap-map')leaf.view={};}};
 const markdown:any=new f.MarkdownView();markdown.leaf=leaf;markdown.editor={getValue:()=>'- Root\n',setCursor(){},scrollIntoView(){},focus(){}};markdown.save=async()=>{saves++;};
 app.metadataCache={getFileCache:()=>({})};app.workspace.getMostRecentLeaf=()=>leaf;app.workspace.getLeavesOfType=(type:string)=>type==='markdown'?[leaf]:[];app.workspace.revealLeaf=async()=>{};
 const tick=()=>new Promise(r=>dom.window.setTimeout(r,20));const event=(name:string)=>(f.registeredEvents as any[]).find(e=>e.name===name).callback;
 for(const [i,name] of ['file-open','active-leaf-change','layout-change'].entries()){const file=new f.TFile(`Native${i}.mindmap.md`);markdown.file=file;leaf.view=markdown;event(name)(name==='file-open'?file:leaf);await tick();assert.equal(calls.at(-1),'traceview-mindmap-map');}
 assert.equal(saves,3);
 const file=new f.TFile('Source.mindmap.md');markdown.file=file;leaf.view=markdown;await plugin.source(file,0,leaf);event('layout-change')();await tick();assert.equal(calls.at(-1),'markdown');assert.equal(saves,3);
 const fresh=await loadBundle({autoOpen:true},dom.window,['Source.mindmap.md']);assert.equal((fresh.plugin as any).sourcePreferences.has(file.path),true);
 await plugin.openMap(file,leaf);assert.equal(plugin.sourcePreferences.has(file.path),false);
 let finish!:()=>void;markdown.save=()=>new Promise<void>(r=>{finish=r;});markdown.file=new f.TFile('Race.mindmap.md');leaf.view=markdown;event('file-open')(markdown.file);await new Promise(r=>dom.window.setTimeout(r,5));leaf.view={};const count=calls.length;finish();await tick();assert.equal(calls.length,count,'A save completing after navigation cannot open the old file');dom.window.close();
});

test('cursor command is additional, checks exact node lines, saves and opens the same leaf at that node',async()=>{
 const dom=new JSDOM('',{pretendToBeVisual:true});const f=await loadBundle(null,dom.window);const plugin=f.plugin as any;const view:any=new f.MarkdownView();view.file=new f.TFile('Cursor.mindmap.md');view.leaf={};let saved=0;
 const source='- Root\n  - First\n  - [[Ghost|Alias]]\n';let line=2;view.editor={getValue:()=>source,getCursor:()=>({line,ch:0})};view.save=async()=>{saved++;};const calls:any[]=[];plugin.openMap=async(...args:any[])=>calls.push(args);
 const command=f.commands.find(c=>c.id==='open-node-at-cursor') as any;assert.ok(command);assert.equal(command.editorCheckCallback(true,view.editor,view),true);assert.equal(saved,0);
 command.editorCheckCallback(false,view.editor,view);await new Promise(r=>dom.window.setTimeout(r,5));assert.equal(saved,1);assert.equal(calls[0][1],view.leaf);assert.equal(calls[0][2],parseMap(source).nodes[2].id);
 line=3;assert.equal(command.editorCheckCallback(true,view.editor,view),false);assert.ok(f.commands.find(c=>c.id==='open-map'));dom.window.close();
});


test('vault-wide rename cannot substitute a map or disturb its active draft', async () => {
  const loaded = await loadBundle(null);
  const view = loaded.views.get('traceview-mindmap-map')!({app: loaded.app}) as any;
  const own = new loaded.TFile('Own.mindmap.md');
  view.file = own; view.path = own.path;
  const doc = parseMap('- Own root\n'); view.doc = doc;
  const draft = { text: 'Unsaved thought' }; view.editor = draft;
  let reloads = 0, invalidations = 0;
  view.reload = async () => { reloads++; };
  view.persist = () => {};
  view.refreshTitle = () => {};
  view.surface = { invalidateMarkdown() { invalidations++; } };
  await view.onRename(new loaded.TFile('Unrelated.md'));
  assert.equal(view.path, own.path);
  assert.equal(view.file, own);
  assert.equal(view.doc, doc);
  assert.equal(view.editor, draft);
  assert.equal(reloads, 0);
  assert.equal(invalidations, 0);
  own.path = 'Renamed.mindmap.md';
  await view.onRename(own);
  assert.equal(view.path, own.path);
  assert.equal(view.nativeRenames, 1);
  assert.equal(reloads, 1);
  assert.equal(invalidations, 1);
});


test('language selection uses Obsidian, honors overrides and validates saved settings', async () => {
  const automatic = await loadBundle(null);
  assert.equal((automatic.plugin.settings as any).language, 'auto');
  assert.equal(automatic.commands.find(command => command.id === 'find-map')!.name, 'Знайти карту');
  const english = await loadBundle({ language: 'en' });
  assert.equal(english.commands.find(command => command.id === 'find-map')!.name, 'Find a map');
  const russian = await loadBundle({ language: 'ru' });
  assert.equal(russian.commands.find(command => command.id === 'find-map')!.name, 'Найти карту');
  const invalid = await loadBundle({ language: 'constructor' });
  assert.equal((invalid.plugin.settings as any).language, 'auto');
  assert.equal(invalid.commands.find(command => command.id === 'find-map')!.name, 'Знайти карту');
});

test('map recognition shares persisted rules and keeps the last rules when compilation or saving fails', async () => {
  const loaded = await loadBundle({ patternMode: 'glob', mapPatterns: '🎯*.md' });
  const plugin = loaded.plugin as any, app = loaded.app as any;
  app.metadataCache = { getFileCache: () => ({}) };
  app.workspace.getLeavesOfType = () => [];
  const goal = new loaded.TFile('Folder/🎯 Goal.md'), other = new loaded.TFile('Other.md');
  assert.equal(plugin.isMap(goal), true);
  assert.equal(plugin.isMap(other), false);
  await assert.rejects(plugin.setMapRules({ patternMode: 'regex', mapPatterns: '[' }));
  assert.equal(plugin.isMap(goal), true);
  plugin.saveData = async () => { throw new Error('Storage unavailable'); };
  await assert.rejects(plugin.setMapRules({ patternMode: 'glob', mapPatterns: '*.md' }));
  assert.equal(plugin.isMap(other), false);
  plugin.saveData = async () => {};
  await plugin.setMapRules({ patternMode: 'glob', mapPatterns: '*.md' });
  assert.equal(plugin.isMap(other), true);
});


test('installation import preserves source preferences and device-local folds and camera through normal loading', async () => {
  const previous = 'earlier-map-tool', path = 'Folder/Tree.mindmap.md';
  const source = '- Root ^root\n  - Branch ^branch\n    - Child ^child\n';
  const saved = { collapsed: ['block:branch'], selected: 'block:root', focusRoot: null, camera: { x: 71, y: -210, scale: 0.85 } };
  const storage = new Map<string, unknown>([
    [previous + ':source-preferences', ['Folder/Source.md']],
    [previous + ':v1:' + path, JSON.stringify(saved)],
  ]);
  const loaded = await loadBundle({ previousPluginId: previous }, undefined, [], storage);
  assert.deepEqual([...(storage.get('traceview-mindmap:source-preferences') as string[])], ['Folder/Source.md']);
  assert.ok(loaded.views.has(previous + '-map'));
  assert.ok(loaded.views.has(previous + '-queue'));
  const app = loaded.app as any;
  const view = loaded.views.get(previous + '-map')!({ app }) as any;
  assert.equal(view.getViewType(), 'traceview-mindmap-map');
  app.vault.getAbstractFileByPath = () => view.file;
  app.vault.read = async () => source;
  let restored: any;
  view.surface = { isEditing: () => false, setLayout() {}, update(_doc: unknown, state: unknown) { restored = state; }, getState: () => saved };
  await view.setState({ file: path }, {});
  assert.deepEqual(JSON.parse(JSON.stringify(restored)), saved);
  const currentKey = 'traceview-mindmap:v1:' + path;
  const imported = JSON.parse(storage.get(currentKey) as string);
  assert.deepEqual(imported.camera, saved.camera);
  assert.deepEqual(imported.collapsed, saved.collapsed);
  storage.set(currentKey, JSON.stringify({ ...saved, camera: { x: 5, y: 8, scale: 1 } }));
  assert.equal(JSON.parse(view.readState()).camera.x, 5);
});

test('reset restores preferences only after saving and retains imported state access and local view state', async () => {
  const storage = new Map<string, unknown>([['earlier-map-tool:v1:Tree.md', 'saved-view-state']]);
  const loaded = await loadBundle({ previousPluginId: 'earlier-map-tool', language: 'ja', widthMode: 'column', patternMode: 'glob', mapPatterns: 'Only.md', autoOpen: true, hotkeys: { copy: 'Alt+C' } }, undefined, [], storage);
  const plugin = loaded.plugin as any, app = loaded.app as any;
  app.metadataCache = { getFileCache: () => ({}) };
  let refreshed = 0, queues = 0, saved: any;
  app.workspace.getLeavesOfType = (type: string) => type === 'traceview-mindmap-map'
    ? [{ view: { refreshBindings() { refreshed++; }, surface: { refreshLayout() { refreshed++; } }, refreshRestoreWait() { refreshed++; } } }]
    : [{ view: { scheduleReload() { queues++; } } }];
  const previousSettings = plugin.settings;
  plugin.saveData = async () => { throw new Error('Storage unavailable'); };
  await assert.rejects(plugin.resetSettings());
  assert.equal(plugin.settings, previousSettings);
  assert.equal(plugin.isMap(new loaded.TFile('Only.md')), true);
  assert.equal(refreshed, 0);
  plugin.saveData = async (value: unknown) => { saved = value; };
  await plugin.resetSettings();
  assert.equal(plugin.settings.language, 'auto');
  assert.equal(plugin.settings.autoOpen, false);
  assert.equal(plugin.settings.widthMode, 'fixed');
  assert.equal(plugin.settings.patternMode, 'glob');
  assert.equal(plugin.settings.mapPatterns, '*.mindmap.md\n🎯*.md');
  assert.equal(plugin.settings.previousPluginId, 'earlier-map-tool');
  assert.deepEqual(Object.keys(plugin.settings.hotkeys), []);
  assert.equal(saved, plugin.settings);
  assert.equal(plugin.isMap(new loaded.TFile('Only.md')), false);
  assert.equal(plugin.isMap(new loaded.TFile('Folder/Tree.mindmap.md')), true);
  assert.equal(storage.get('earlier-map-tool:v1:Tree.md'), 'saved-view-state');
  assert.equal(refreshed, 3);
  assert.equal(queues, 1);
});
