import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const target = path.join(root, 'release', manifest.id);
const files = ['main.js', 'manifest.json', 'styles.css'];
// Validate the entire installation before creating or copying a release directory.
const buffers = await Promise.all(files.map(file => readFile(path.join(root, file))));
if (buffers[0].length < 1000 || !buffers[0].includes(Buffer.from('module.exports'))) throw new Error('main.js is missing or is not a compiled CommonJS plugin. Run npm run build first.');
await mkdir(target, { recursive: true });
for (const file of files) await copyFile(path.join(root, file), path.join(target, file));
await writeFile(path.join(root, 'release', 'SHA256SUMS.txt'), files.map((file, index) => `${createHash('sha256').update(buffers[index]).digest('hex')}  ${manifest.id}/${file}`).join('\n') + '\n');
console.log(`Release verified: ${files.join(', ')}`);
