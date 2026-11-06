/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
export type PatternMode = 'glob' | 'regex';
export interface MapRules { patternMode: PatternMode; mapPatterns: string; }
export class PatternError extends Error {
  constructor(public line: number, detail: string) { super(detail); }
}

function globExpression(pattern: string): string {
  let result = '^';
  for (let index = 0; index < pattern.length; index++) {
    const character = pattern[index];
    if (character === '*' && pattern[index + 1] === '*') {
      index++;
      if (pattern[index + 1] === '/') { result += '(?:.*/)?'; index++; }
      else result += '.*';
    } else if (character === '*') result += '[^/]*';
    else if (character === '?') result += '[^/]';
    else result += character.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  return result + '$';
}

export function compileMapPatterns(rules: MapRules): (path: string, frontmatter?: Record<string, unknown>) => boolean {
  const patterns = rules.mapPatterns.split(/\r?\n/).flatMap((raw, index) => {
    const text = raw.trim();
    if (!text) return [];
    const pattern = rules.patternMode === 'glob' ? text.replace(/\\/g, '/') : text;
    try {
      return [{ expression: new RegExp(rules.patternMode === 'glob' ? globExpression(pattern) : pattern, 'i'),
        basename: rules.patternMode === 'glob' && !pattern.includes('/') }];
    } catch (error) { throw new PatternError(index + 1, error instanceof Error ? error.message : String(error)); }
  });
  return (path, frontmatter) => {
    const normalized = path.replace(/\\/g, '/');
    if (!/\.md$/i.test(normalized) || /\.sync-conflict-/i.test(normalized)) return false;
    if (frontmatter?.mindmap === true || frontmatter?.['mindmap-plugin'] === 'basic') return true;
    const basename = normalized.slice(normalized.lastIndexOf('/') + 1);
    return patterns.some(pattern => pattern.expression.test(pattern.basename ? basename : normalized));
  };
}
