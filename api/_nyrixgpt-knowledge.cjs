const entries = require('./_nyrixgpt-knowledge.json');
const registry = require('../src/content/nyrixGptActions.json');
const allowedActionIds = Object.freeze(Object.keys(registry));
function resolveAction(id) {
  if (typeof id !== 'string' || !Object.hasOwn(registry, id)) return null;
  return { id, ...registry[id] };
}
function retrievePublicContext({ query = '', maxChars = 8000 } = {}) {
  const terms = [...new Set(String(query).toLowerCase().match(/[a-z0-9]{3,}/g) || [])];
  const ranked = entries.map((entry, index) => {
    const title = entry.title.toLowerCase(), text = entry.text.toLowerCase();
    return { entry, index, score: terms.reduce((n, term) => n + (title.includes(term) ? 4 : 0) + (text.includes(term) ? 1 : 0), 0) };
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
module.exports = { allowedActionIds, resolveAction, retrievePublicContext };

