import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseMap,copyBranches,deleteNodes,changeNodes,setStep,pasteBranch} from '../src/core';

test('overlapping branches are copied and deleted once; unrelated bytes and CRLF survive',()=>{
 const source='---\r\ntitle: Synthetic\r\n---\r\n- Root\r\n  - A [[Ghost|Alias]]\r\n    - Child\r\n  - B\r\n    - Other\r\n  - Keep ^block\r\n';
 const doc=parseMap(source); const ids=doc.nodes.filter(n=>/^(A |Child|Other)/.test(n.text)).map(n=>n.id);
 const copied=copyBranches(doc,ids); assert.equal(copied,'- A [[Ghost|Alias]]\r\n  - Child\r\n- Other\r\n');
 assert.equal(deleteNodes(doc,ids),source.replace('  - A [[Ghost|Alias]]\r\n    - Child\r\n','').replace('    - Other\r\n',''));
 const pasted=pasteBranch(doc,doc.roots[0],copied,'child');assert.match(pasted,/  - A \[\[Ghost\|Alias\]\]\r\n    - Child\r\n  - Other/);
 const changed=changeNodes(doc,ids,setStep);assert.match(changed,/#step 1\) A/);assert.match(changed,/#step 2\) Child/);assert.match(changed,/#step 3\) Other/);assert.ok(changed.endsWith('  - Keep ^block\r\n'));
});

test('batch deletion rejects any unsupported branch before producing a partial change',()=>{
 const doc=parseMap('- Safe\n- Complex\n  paragraph\n');assert.throws(()=>deleteNodes(doc,doc.roots),/paragraph/);assert.equal(doc.source,'- Safe\n- Complex\n  paragraph\n');
});
