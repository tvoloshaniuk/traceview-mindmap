/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMap } from '../src/core';
import { addressNode, onlyAddedBlockIds, removeNodeAddress, nodeBacklinks } from '../src/block-links';

test('addresses preserve CRLF, children, aliases and existing IDs; duplicates are rejected', () => {
  const source='---\r\ntags: mindmap\r\n---\r\n- Root\r\n  - [[Ghost|Alias]]\r\n    - Child ^child-id\r\n';
  const doc=parseMap(source),node=doc.nodes.find(n=>n.text==='[[Ghost|Alias]]')!;
  const result=addressNode(doc,node.id,'tvm-test');assert.equal(result.source,source.replace('[[Ghost|Alias]]','[[Ghost|Alias]] ^tvm-test'));
  const next=parseMap(result.source);assert.equal(addressNode(next,next.nodes.find(n=>n.blockId==='tvm-test')!.id,'unused').source,result.source);
  assert.throws(()=>addressNode(doc,node.id,'child-id'));
  const duplicate=parseMap('- A ^same\n- B ^same\n');assert.throws(()=>addressNode(duplicate,duplicate.nodes[0].id,'new-id'),/duplicated/);
});

test('draft rebase permits only newly appended addresses; user edits and removed or changed IDs conflict', () => {
  const source='- Root\n  - Child\n  - Existing ^existing\n',before=parseMap(source);
  assert.equal(onlyAddedBlockIds(before,parseMap(source.replace('Root','Root ^new-root').replace('Child','Child ^new-child'))),true);
  for(const altered of [source.replace('Child','Different ^new'),source.replace('^existing','^changed'),source.replace(' ^existing',''),source+'- Extra\n',source.replace('  - Child','    - Child ^new')])assert.equal(onlyAddedBlockIds(before,parseMap(altered)),false);
});

test('removing a block address changes only its suffix and preserves source endings and descendant addresses', () => {
  for (const eol of ['\n', '\r\n', '\r']) {
    const source = ['---','title: Example','---','- [[Note|Alias]] with ^inline text ^target  ','  - Child ^child','- Other ^other'].join(eol);
    const doc = parseMap(source), node = doc.nodes.find(node => node.blockId === 'target')!;
    assert.equal(removeNodeAddress(doc, node.id), source.replace(' ^target  ', ''));
    const child = doc.nodes.find(node => node.blockId === 'child')!;
    assert.equal(removeNodeAddress(doc, child.id), source.replace(' ^child', ''));
  }
});

test('node backlinks use cached candidates, resolve relative targets and include local links and embeds once per line', () => {
  const target = {path:'Folder/Target.md', extension:'md'};
  const source = {path:'Other/Source.md', extension:'md'};
  const unrelated = {path:'Other/Target.md', extension:'md'};
  const files = new Map([target, source, unrelated].map(file => [file.path, file]));
  const ref = (link:string, line:number) => ({link, position:{start:{line}}});
  const reads:string[] = [];
  const app:any = {
    vault:{getFileByPath:(path:string) => files.get(path)},
    metadataCache:{
      resolvedLinks:{[source.path]:{[target.path]:4}, [unrelated.path]:{Elsewhere:1}},
      getFileCache(file:any) {
        reads.push(file.path);
        return file === target ? {links:[ref('#^id',2)]} : {links:[ref('../Folder/Target#^id',7),ref('Target#^id',8),ref('../Folder/Target#^other',9)],embeds:[ref('../Folder/Target#^id',7)]};
      },
      getFirstLinkpathDest:(link:string) => link.startsWith('../') ? target : unrelated,
    },
  };
  const result = nodeBacklinks(app,target as any,'id');
  assert.deepEqual(result.map(ref => [ref.file.path,ref.line]), [[target.path,2],[source.path,7]]);
  assert.deepEqual(reads, [target.path, source.path]);
});
