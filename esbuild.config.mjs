import { build } from 'esbuild';
await build({ entryPoints: ['src/main.ts'], outfile: 'main.js', bundle: true, external: ['obsidian'], format: 'cjs', target: 'es2020', platform: 'browser', sourcemap: false });
