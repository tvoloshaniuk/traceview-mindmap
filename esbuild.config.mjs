/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const files = ['LICENSE', 'OBSIDIAN-HOST-PERMISSION.md', 'THIRD-PARTY-NOTICES.md'];
const notices = await Promise.all(files.map(async file => (await readFile(file, 'utf8')).replace(/\r\n/g, '\n').trim()));
const licensing = [
  'TraceView Mindmap — Copyright (C) 2026 tvoloshaniuk',
  'GPL-3.0-only with the Obsidian Host Additional Permission below.',
  'Corresponding Source: the source repository and source archive accompanying this release.',
  ...notices,
].join('\n\n');
if (licensing.includes('*/')) throw new Error('Licensing text cannot terminate the JavaScript banner.');

const result = await build({
  entryPoints: ['src/main.ts'], outfile: 'main.js', bundle: true,
  external: ['obsidian'], format: 'cjs', target: 'es2020', platform: 'browser',
  sourcemap: false, metafile: true, legalComments: 'none', banner: { js: `/*!\n${licensing}\n*/` },
});
await mkdir('release', { recursive: true });
await writeFile('release/build-audit.json', JSON.stringify({
  bundleSha256: createHash('sha256').update(await readFile('main.js')).digest('hex'),
  metafile: result.metafile,
}, null, 2) + '\n');
