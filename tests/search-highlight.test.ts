/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {highlightSearchText, highlightRenderedSearch, nativeSearchHighlighter} from '../src/search-highlight';

test('result highlighting treats queries literally and preserves text safely', () => {
  const dom=new JSDOM('<div></div>'),el=dom.window.document.querySelector('div')!;
  const text='a+b <script> A+B';highlightSearchText(el,text,'a+b');
  assert.equal(el.textContent,text);assert.deepEqual([...el.querySelectorAll('mark')].map(mark=>mark.textContent),['a+b','A+B']);assert.equal(el.querySelector('script'),null);
  highlightSearchText(el,text,'');assert.equal(el.querySelector('mark'),null);assert.equal(el.textContent,text);dom.window.close();
});

test('rendered list search preserves Markdown links and formatting', () => {
  const dom=new JSDOM('<div><p><a href="Target">Alias</a> <strong>Alias</strong></p></div>'),el=dom.window.document.querySelector('div')!;
  const link=el.querySelector('a');highlightRenderedSearch(el,'alias');
  assert.equal(el.querySelectorAll('mark').length,2);assert.equal(el.querySelector('a'),link);assert.equal(link!.getAttribute('href'),'Target');
  assert.equal(el.textContent,'Alias Alias');assert.equal(el.querySelectorAll('strong').length,1);dom.window.close();
});

test('native highlights span tokens without DOM writes and keep other editors intact on cleanup', () => {
  const dom=new JSDOM('<div id="one"><div class="cm-content"><div class="cm-line">Al<strong>pha</strong> Alpha</div></div></div><div id="two"><div class="cm-content">Alpha</div></div>',{pretendToBeVisual:true});
  const win=dom.window as any,registry=new Map<string,{ranges:Range[]}>();
  Object.defineProperty(win,'CSS',{value:{highlights:registry}});win.Highlight=class {ranges:Range[];constructor(...ranges:Range[]){this.ranges=ranges;}};
  let paint:FrameRequestCallback|undefined;win.requestAnimationFrame=(callback:FrameRequestCallback)=>{paint=callback;return 1;};win.cancelAnimationFrame=()=>{paint=undefined;};
  const flush=()=>{const callback=paint;paint=undefined;callback?.(0);};
  const first=win.document.querySelector('#one'),second=win.document.querySelector('#two'),before=first.innerHTML;
  const a=nativeSearchHighlighter(first),b=nativeSearchHighlighter(second);
  a.setQuery('Alpha');flush();assert.deepEqual(registry.get('traceview-search')!.ranges.map(range=>range.toString()),['Alpha','Alpha']);assert.equal(first.innerHTML,before);
  b.setQuery('Alpha');flush();assert.equal(registry.get('traceview-search')!.ranges.length,3);
  a.dispose();assert.equal(registry.get('traceview-search')!.ranges.length,1);b.setQuery('');assert.equal(registry.has('traceview-search'),false);
  b.dispose();dom.window.close();
});
