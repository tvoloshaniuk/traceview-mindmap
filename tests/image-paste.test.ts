import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {attachImagePaste, saveClipboardImage} from '../src/image-paste';
import {InlineEditor} from '../src/inline';

const image = () => new File([new Uint8Array([137,80,78,71])], 'clipboard.png', {type:'image/png'});
const tick = () => new Promise(resolve=>setTimeout(resolve,0));
function paste(dom:JSDOM, input:HTMLTextAreaElement, files:File[], text='') {
  const event=new dom.window.Event('paste',{bubbles:true,cancelable:true});
  Object.defineProperty(event,'clipboardData',{value:{items:files.map(file=>({kind:'file',getAsFile:()=>file})),files,getData:()=>text}});
  input.dispatchEvent(event);return event;
}

test('attachment follows native folder settings, retains binary bytes and retries a name claimed by sync',async()=>{
  const paths:string[]=[],written:{path:string;bytes:number[]}[]=[];
  let attempt=0;
  const app:any={
    fileManager:{
      getAvailablePathForAttachment:async(name:string,source:string)=>{assert.equal(source,'Folder/Map.mindmap.md');assert.match(name,/\.png$/);const path=`Attachments/image-${++attempt}.png`;paths.push(path);return path;},
      generateMarkdownLink:(file:any,source:string)=>{assert.equal(source,'Folder/Map.mindmap.md');return `[[${file.path}]]`;}
    },
    vault:{createBinary:async(path:string,bytes:ArrayBuffer)=>{if(attempt===1)throw new Error('Already exists');written.push({path,bytes:[...new Uint8Array(bytes)]});return {path};},getAbstractFileByPath:()=>({})}
  };
  assert.equal(await saveClipboardImage(app,'Folder/Map.mindmap.md',image()),'![[Attachments/image-2.png]]');
  assert.equal(paths.length,2);assert.deepEqual(written,[{path:'Attachments/image-2.png',bytes:[137,80,78,71]}]);
});

test('image paste replaces the captured selection and cannot save the node before its upload finishes',async()=>{
  const dom=new JSDOM('<body></body>',{pretendToBeVisual:true});
  let resolve!:(link:string)=>void, saves=0;
  const notices:string[]=[];
  const editor=new InlineEditor(dom.window.document,'left REPLACE right',{
    save:async()=>{saves++;},cancel(){},resize(){},
    mount:input=>attachImagePaste(input,{save:()=>new Promise(done=>{resolve=done;}),status(){},report:text=>notices.push(text)})
  });
  try{
    dom.window.document.body.append(editor.host);editor.input.setSelectionRange(5,12);
    const event=paste(dom,editor.input,[image()],'ignored\ntext');
    assert.equal(event.defaultPrevented,true);assert.equal(editor.input.readOnly,true);
    editor.input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert.equal(saves,0);
    resolve('![[Attachments/image.png]]');await tick();
    assert.equal(editor.input.value,'left ![[Attachments/image.png]] right');assert.equal(editor.input.readOnly,false);
    assert.equal(editor.input.selectionStart,'left ![[Attachments/image.png]]'.length);assert.equal(notices.length,0);
    editor.input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));await tick();assert.equal(saves,1);
  }finally{editor.dispose();dom.window.close();}
});

test('failed image paste retains the draft; ordinary text is untouched; closed editors never receive late results',async()=>{
  const dom=new JSDOM('<textarea>draft</textarea>');
  const input=dom.window.document.querySelector('textarea')!;
  const errors:string[]=[];
  let detach=attachImagePaste(input,{save:async()=>{throw new Error('Disk full');},status(){},report:text=>errors.push(text)});
  try{
    assert.equal(paste(dom,input,[],'plain text').defaultPrevented,false);
    paste(dom,input,[image()]);await tick();
    assert.equal(input.value,'draft');assert.equal(input.readOnly,false);assert.deepEqual(errors,['Disk full']);
    detach();let resolve!:(link:string)=>void;
    detach=attachImagePaste(input,{save:()=>new Promise(done=>{resolve=done;}),status(){},report:text=>errors.push(text)});
    paste(dom,input,[image()]);detach();resolve('![[Saved.png]]');await tick();
    assert.equal(input.value,'draft');assert.match(errors[1],/Saved.png/);
  }finally{detach();dom.window.close();}
});
