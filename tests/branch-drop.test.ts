/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseMap,moveBranches,canDropBranches} from '../src/core';

const source='---\r\ntitle: Synthetic\r\n---\r\n- Root\r\n  - A [[Ghost|Alias]] ^a\r\n    - Leaf\r\n  - B\r\n  - Target\r\n    - Existing\r\n  - Keep ^keep';
const doc=parseMap(source),id=(name:string)=>doc.nodes.find(n=>n.text.startsWith(name))!.id;
for(const position of ['before','after','child'] as const)test(`group drop ${position} keeps order, descendants, CRLF, links and block IDs`,()=>{
 const next=moveBranches(doc,[id('B'),id('Leaf'),id('A')],id('Target'),position);
 const parsed=parseMap(next),find=(name:string)=>parsed.nodes.find(n=>n.text.startsWith(name))!;
 assert.equal(next.match(/Leaf/g)?.length,1);assert.ok(next.startsWith('---\r\ntitle: Synthetic\r\n---\r\n'));assert.ok(next.endsWith('  - Keep ^keep'));assert.ok(next.includes('[[Ghost|Alias]] ^a'));assert.equal(/[^\r]\n/.test(next),false);
 assert.ok(find('A').line<find('B').line);assert.equal(find('Leaf').parentId,find('A').id);
 if(position==='child'){assert.equal(find('A').parentId,find('Target').id);assert.equal(find('B').parentId,find('Target').id);assert.ok(find('Existing').line<find('A').line);}
 else {assert.equal(find('A').parentId,find('Target').parentId);assert.equal(find('B').parentId,find('Target').parentId);assert.ok(position==='before'?find('B').line<find('Target').line:find('Existing').line<find('A').line);}
});
test('moves reject cycles, mixed Markdown and unsupported content atomically',()=>{
 assert.equal(canDropBranches(doc,[id('A')],id('Leaf'),'after'),false);assert.throws(()=>moveBranches(doc,[id('A')],id('Leaf'),'child'));
 const rich=parseMap('- Safe\n- Complex\n  paragraph\n- Target\n');assert.throws(()=>moveBranches(rich,rich.roots.slice(0,2),rich.roots[2],'child'),/paragraph/);
 const mixed=parseMap('# Heading\n- Bullet\n# Target\n');assert.equal(canDropBranches(mixed,mixed.roots.slice(0,2),mixed.roots[2],'child'),false);
});
test('moving to an earlier target and heading siblings preserves hierarchy and EOF newline',()=>{
 const d=parseMap('- Target\n- A\n- B\n');assert.equal(moveBranches(d,d.roots.slice(1),d.roots[0],'before'),'- A\n- B\n- Target\n');
 const h=parseMap('# Root\n## A\n### Leaf\n## B\n## Target\n');const a=h.nodes.find(n=>n.text==='A')!,target=h.nodes.find(n=>n.text==='Target')!;
 assert.equal(moveBranches(h,[a.id],target.id,'child'),'# Root\n## B\n## Target\n### A\n#### Leaf\n');
});
