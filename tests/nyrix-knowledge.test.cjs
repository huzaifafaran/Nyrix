const test = require('node:test');
const assert = require('node:assert/strict');

test('founder questions retrieve both public co-founder profiles', () => {
  const k = require('../api/_nyrixgpt-knowledge.cjs');
  for (const query of ['whos the cofounder of nyrix', 'who founded Nyrix', 'who are the co-founders of Nyrix']) {
    const result = k.retrievePublicContext({ query, maxChars: 6000 });
    assert.ok(result.sources.some(s => s.title === 'Sarim bin Tahir'), query);
    assert.ok(result.sources.some(s => s.title === 'Huzaifa Faran'), query);
  }
});

test('retrieval grounds voice questions in public source pages', () => {
  const k = require('../api/_nyrixgpt-knowledge.cjs');
  const result = k.retrievePublicContext({ query: 'Urdu customer calls voice', maxChars: 6000 });
  assert.ok(result.text.includes('KINLU Voice'));
  assert.ok(result.sources.some(s => s.path === '/products/kinlu-voice'));
  assert.equal(k.resolveAction('not-a-route'), null);
  assert.equal(k.resolveAction('case_genix').path, '/case-studies/cleanroom-ems');
});

test('all public actions resolve only to known internal routes', () => {
  const k = require('../api/_nyrixgpt-knowledge.cjs');
  const sitemap = require('node:fs').readFileSync(require('node:path').join(__dirname, '../public/sitemap.xml'), 'utf8');
  const paths = [...sitemap.matchAll(/<loc>https:\/\/nyrix\.co([^<]*)<\/loc>/g)].map(match => match[1]);
  for (const id of k.allowedActionIds) {
    const action = k.resolveAction(id);
    assert.match(action.path, /^\/(?!\/)/);
    assert.doesNotMatch(action.path, /[<>\\]/);
    assert.ok(paths.includes(action.path.split('#')[0]), `${id} must resolve to a sitemap route`);
  }
});

