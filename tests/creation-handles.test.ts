import {test} from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';import {CreationHandles} from '../src/creation-handles';import {parseMap,addNode,addParent,editNode} from '../src/core';
test('directional handles only create after an axial pull and cancel sideways or interrupted gestures',()=>{
 const dom=new JSDOM('<div></div>');const host=dom.window.document.querySelector('div')!;const actions:string[]=[];const handles=new CreationHandles(host,(action,id)=>actions.push(action+':'+id));handles.place(host,'root');
 const pointer=(kind:string,el:Element,x:number,y:number)=>{const e=new dom.window.MouseEvent(kind,{bubbles:true,cancelable:true,clientX:x,clientY:y,button:0});Object.defineProperty(e,'pointerId',{value:1});el.dispatchEvent(e);};
 for(const [action,x,y] of [['add-child',40,0],['add-parent',-40,0],['add-sibling',0,40],['add-sibling-before',0,-40]] as const){const button=handles.host.querySelector(`[data-create-action=${action}]`)!;pointer('pointerdown',button,0,0);pointer('pointermove',button,x,y);pointer('pointerup',button,x,y);}
 assert.deepEqual(actions,['add-child:root','add-parent:root','add-sibling:root','add-sibling-before:root']);
 const button=handles.host.querySelector('[data-create-action=add-child]')!;pointer('pointerdown',button,0,0);pointer('pointermove',button,40,60);pointer('pointerup',button,40,60);pointer('pointerdown',button,0,0);pointer('pointermove',button,40,0);pointer('pointercancel',button,40,0);assert.equal(actions.length,4);handles.destroy();dom.window.close();
});
test('creation before a branch preserves that branch and rejects structural Markdown markers',()=>{
 const source='---\r\ntitle: Test\r\n---\r\n- Root\r\n  - A [[Ghost|Alias]] ^a\r\n    - Leaf';const doc=parseMap(source),a=doc.nodes.find(n=>n.text.startsWith('A '))!;
 assert.equal(addNode(doc,a.id,'before','New'),source.replace('  - A','  - New\r\n  - A'));
 const unsafe=parseMap('- Root\n  - A\n'), unsafeId=unsafe.nodes[1].id;
 for(const label of ['```js','~~~','---','\u0000','Bad\u2028label','Bad\nlabel'])for(const action of [()=>addNode(unsafe,unsafeId,'child',label),()=>addParent(unsafe,unsafeId,label),()=>editNode(unsafe,unsafeId,label)])assert.throws(action);
 for(const label of ['# Heading-looking text','- Nested-looking text','[[Ghost|Alias]]','[ ] #step 1) Task','![[Image.png]]']){const next=parseMap(addNode(doc,a.id,'child',label));assert.equal(next.nodes.length,doc.nodes.length+1);}
});
