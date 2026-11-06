export interface LinkTarget {
  kind: 'file' | 'ghost' | 'new';
  path: string;
  label: string;
  alias?: string;
  references?: number;
}

export interface FileLinkInput {
  path: string;
  basename: string;
  aliases: string[];
}

export function normalizeLinkQuery(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith('[[') && trimmed.endsWith(']]')
    ? trimmed.slice(2, -2).trim()
    : trimmed;
}

const fold = (value: string): string => value.normalize('NFC').toLowerCase();
const withoutMarkdownExtension = (value: string): string => value.replace(/\.md(?=#|$)/i, '');
const identity = (value: string): string => fold(withoutMarkdownExtension(value));
const filePart = (value: string): string => value.split('#', 1)[0];
const titleOf = (path: string): string => withoutMarkdownExtension(path.slice(path.lastIndexOf('/') + 1));
const isLinkTarget = (value: string): boolean => value.length > 0 && !/[\r\n\u0000-\u001f\u007f|\[\]]/.test(value);

export function buildLinkTargets(files: FileLinkInput[], unresolved: Record<string, number>): LinkTarget[] {
  const targets: LinkTarget[] = [];
  const resolved = new Set<string>();
  const fileEntries = new Set<string>();
  for (const file of files) {
    resolved.add(identity(file.path));
    resolved.add(identity(file.basename));
    const labels = [file.basename, ...file.aliases.map(alias => alias.trim()).filter(Boolean)];
    for (let index = 0; index < labels.length; index++) {
      const label = labels[index];
      resolved.add(identity(label));
      const key = `${fold(file.path)}\u0000${fold(label)}`;
      if (fileEntries.has(key)) continue;
      fileEntries.add(key);
      targets.push({ kind: 'file', path: file.path, label, ...(index > 0 ? { alias: label } : {}) });
    }
  }

  const ghosts = new Map<string, LinkTarget>();
  for (const [rawPath, count] of Object.entries(unresolved)) {
    const path = normalizeLinkQuery(rawPath);
    if (!isLinkTarget(path) || !filePart(path) || resolved.has(identity(filePart(path)))) continue;
    const key = identity(path);
    const existing = ghosts.get(key);
    const references = Number.isFinite(count) && count > 0 ? count : 0;
    if (existing) existing.references = (existing.references ?? 0) + references;
    else ghosts.set(key, { kind: 'ghost', path, label: titleOf(path), references });
  }
  return [...targets, ...ghosts.values()];
}

function subsequenceCost(text: string, query: string): number | undefined {
  let position = 0;
  let first = -1;
  for (const character of query) {
    const found = text.indexOf(character, position);
    if (found < 0) return undefined;
    if (first < 0) first = found;
    position = found + character.length;
  }
  return position - first - query.length + first;
}

function rank(target: LinkTarget, query: string): number | undefined {
  const title = identity(target.label);
  const path = identity(target.path);
  if (!query) return target.kind === 'file' ? 0 : 1;
  if (title === query || path === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  if (subsequenceCost(title, query) !== undefined) return 3;
  if (path.startsWith(query)) return 4;
  if (path.includes(query)) return 5;
  if (subsequenceCost(path, query) !== undefined) return 6;
  return undefined;
}

export function searchLinkTargets(targets: LinkTarget[], rawQuery: string, limit = 80): LinkTarget[] {
  const queryText = normalizeLinkQuery(rawQuery);
  const query = identity(queryText);
  const maxResults = Math.max(0, Math.floor(limit));
  if (!maxResults) return [];
  const ranked = targets.flatMap(target => {
    const score = rank(target, query);
    return score === undefined ? [] : [{ target, score }];
  });
  ranked.sort((a, b) => a.score - b.score
    || (a.target.kind === 'file' ? 0 : 1) - (b.target.kind === 'file' ? 0 : 1)
    || Number(!!a.target.alias) - Number(!!b.target.alias)
    || (a.score === 3 ? (subsequenceCost(identity(a.target.label), query) ?? 0) - (subsequenceCost(identity(b.target.label), query) ?? 0) : 0)
    || a.target.label.length - b.target.label.length
    || a.target.label.localeCompare(b.target.label)
    || a.target.path.localeCompare(b.target.path));
  const hasExact = ranked.some(({ score }) => score === 0);
  const offerNew = isLinkTarget(queryText) && !hasExact;
  const result = ranked.slice(0, offerNew ? maxResults - 1 : maxResults).map(({ target }) => target);
  if (offerNew) result.push({ kind: 'new', path: queryText, label: queryText });
  return result;
}
