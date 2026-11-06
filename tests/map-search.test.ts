import {test} from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';import {MapSearch} from '../src/map-search';
test('search arrows only select, Enter navigates and Escape keeps the query and same input',()=>{
 const dom=new JSDOM('<div></div>');const visited:string[]=[];const search=new MapSearch(dom.window.document.querySelector('div')!,{search:q=>q?[{id:'a',text:'Alpha'},{id:'b',text:'Beta'}]:[],reveal:id=>visited.push(id),focusMap(){}});
 search.show();const input=search.input;input.value='query';input.dispatchEvent(new dom.window.Event('input'));input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));assert.equal(visited.length,0);assert.equal(search.overlay.querySelector('[aria-selected=true]')?.textContent,'Beta');
 input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.deepEqual(visited,['b']);assert.equal(search.overlay.hidden,true);assert.equal(input.value,'query');search.show();assert.equal(search.input,input);
 input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(input.value,'query');search.show();assert.equal(input.value,'query');dom.window.close();
});
