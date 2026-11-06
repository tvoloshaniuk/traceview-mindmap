/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const audit = JSON.parse(await readFile('release/build-audit.json', 'utf8'));
const bundle = await readFile('main.js');
assert.equal(createHash('sha256').update(bundle).digest('hex'), audit.bundleSha256, 'Build metadata is stale. Run npm run build.');
const inputs = Object.keys(audit.metafile.inputs);
assert.ok(inputs.length > 0);
assert.ok(inputs.every(file => file.startsWith('src/') && !file.includes('node_modules/')), 'Review newly bundled third-party source and its notices.');
const external = [...new Set(Object.values(audit.metafile.outputs).flatMap(output => output.imports.filter(item => item.external).map(item => item.path)))];
assert.deepEqual(external, ['obsidian'], 'Review new runtime dependencies and their licenses.');
for (const file of ['LICENSE', 'OBSIDIAN-HOST-PERMISSION.md', 'THIRD-PARTY-NOTICES.md']) {
  const text = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n').trim();
  assert.ok(text.length > 100 && bundle.toString('utf8').includes(text), `Missing bundled notice: ${file}`);
}
const gpl = (await readFile('LICENSE', 'utf8')).replace(/\r\n/g, '\n');
assert.equal(createHash('sha256').update(gpl).digest('hex'), 'fb981668c18a279e285fc4d83fba1e836cc84dd4daa73c9697d3cfd2d8aca6e0', 'Review changes to the standard GPLv3 license text.');
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const declaredLicenses = {};
for (const [name, entry] of Object.entries(lock.packages)) {
  if (!name) continue;
  assert.ok(entry.license, `Review missing license metadata: ${name}`);
  declaredLicenses[entry.license] = (declaredLicenses[entry.license] ?? 0) + 1;
}
console.log(JSON.stringify({ sourceInputs: inputs.length, external, declaredLicenses, noticesEmbedded: true }, null, 2));
