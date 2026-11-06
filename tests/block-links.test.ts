import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMap } from '../src/core';
import { addressNode, onlyAddedBlockIds } from '../src/block-links';

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
