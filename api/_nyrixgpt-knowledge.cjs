const entries = require('./_nyrixgpt-knowledge.json');
const registry = require('../src/content/nyrixGptActions.json');
const allowedActionIds = Object.freeze(Object.keys(registry));
function resolveAction(id) {
  if (typeof id !== 'string' || !Object.hasOwn(registry, id)) return null;
  return { id, ...registry[id] };
}
function retrievePublicContext({ query = '', maxChars = 8000 } = {}) {
  const terms = [...new Set(String(query).toLowerCase().match(/[a-z0-9]{3,}/g) || [])];
  const asksAboutFounders = /\b(?:co[\s-]*)?found(?:er(?:s)?|ed|ing)\b/i.test(String(query));
  const ranked = entries.map((entry, index) => {
    const title = entry.title.toLowerCase(), text = entry.text.toLowerCase();
    const founderMatch = asksAboutFounders && entry.id.startsWith('team_') && /\bco[\s-]*founder\b/i.test(entry.text);
    return { entry, index, score: terms.reduce((n, term) => n + (title.includes(term) ? 4 : 0) + (text.includes(term) ? 1 : 0), 0) + (founderMatch ? 20 : 0) };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
  const sources = [], chunks = []; let size = 0;
  for (const { entry } of ranked) {
    const chunk = `[${entry.id}] ${entry.title}: ${entry.text}`;
    const needed = chunk.length + (chunks.length ? 2 : 0);
    if (size + needed > Math.max(0, Math.min(maxChars, 12000))) continue;
    chunks.push(chunk); sources.push({ id: entry.id, title: entry.title, path: entry.path, url: entry.path }); size += needed;
    if (sources.length >= 8) break;
  }
  return { text: chunks.join('\n\n'), sources };
}
function semanticCatalog() {
  return entries.map(({id, title, text}) => ({id, title, summary: text.slice(0, 75)}));
}
function semanticEvidenceUpperBytes() {
  const sizes = entries.map(({id, title, path, text}) => {
    const chunk = `[${id}] ${title}: ${text}`;
    const source = {id, title, url:path};
    return Buffer.byteLength(JSON.stringify(JSON.stringify(chunk))) + Buffer.byteLength(JSON.stringify(JSON.stringify(source))) + 16;
  }).sort((a, b) => b - a);
  return sizes.slice(0, 8).reduce((sum, size) => sum + size, 1024);
}
function contextForIds(ids, maxChars = 8000) {
  const lookup = new Map(entries.map(entry => [entry.id, entry]));
  const sources = [], chunks = []; let size = 0;
  for (const id of [...new Set(ids)].slice(0, 8)) {
    const entry = lookup.get(id); if (!entry) continue;
    const chunk = `[${entry.id}] ${entry.title}: ${entry.text}`;
    const needed = chunk.length + (chunks.length ? 2 : 0);
    if (size + needed > Math.max(0, Math.min(maxChars, 12000))) continue;
    chunks.push(chunk); sources.push({id: entry.id, title: entry.title, path: entry.path, url: entry.path}); size += needed;
  }
  return {text: chunks.join('\n\n'), sources};
}
module.exports = { allowedActionIds, resolveAction, retrievePublicContext, semanticCatalog, semanticEvidenceUpperBytes, contextForIds };

