// Only public, explicitly selected fields from the website content are exported.
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const root = path.resolve(__dirname, '..');
const old = require.extensions['.js'];
require.extensions['.js'] = function(mod, filename) {
  if (!filename.startsWith(path.join(root, 'src', 'content') + path.sep) && filename !== path.join(root, 'src', 'components', 'agentsData.js')) return old(mod, filename);
  const code = babel.transformFileSync(filename, { presets: [['@babel/preset-env', { targets: { node: 'current' } }]], babelrc: false, configFile: false }).code;
  mod._compile(code, filename);
};
const offer = require('../src/content/enterpriseOfferContent.js');
const industry = require('../src/content/industryContent.js');
const people = require('../src/content/nyrixContent.js');
const agents = require('../src/components/agentsData.js');
const entries = [];
function add(id, title, url, text) { if (title && url && text) entries.push({ id, title, path: url, text }); }
offer.deliveryStages.forEach(x => add(`service_${x.id}`, x.title, x.href, `${x.description} ${x.detail}`));
offer.solutionDomains.forEach(x => add(`solution_${x.id}`, x.title, x.href, `${x.question} ${x.description}`));
offer.enterpriseProducts.forEach(x => add(`product_${x.id}`, x.title, x.href, `${x.description} ${x.integration}`));
offer.enterpriseCases.forEach(x => add(`case_${x.id}`, x.title, x.href, `${x.status}. ${x.description} ${x.challenge}`));
industry.industries.forEach(x => add(`industry_${x.slug}`, x.title, x.href, `${x.description} ${x.summary}`));
people.team.forEach((x, i) => add(`team_${i}`, x.name, '/company/team', `${x.role}. ${x.bio}`));
people.advisors.forEach((x, i) => add(`advisor_${i}`, x.name, '/company/advisors', `${x.role}. ${x.focus}. ${x.bio}`));
people.articles.forEach((x, i) => add(`article_${i}`, x.title, '/resources/articles', `${x.author}. ${x.summary}`));
agents.agents.forEach(x => add(`agent_${x.id}`, x.title, '/agents', `${x.subtitle}. ${x.shortDescription}`));
// Only the literal list rendered by the public technology marquee is indexed.
const marquee = fs.readFileSync(path.join(root, 'src/components/WorkMarquee.js'), 'utf8');
const technologyBlock = marquee.match(/const technologies = \[([\s\S]*?)\];/);
if (!technologyBlock) throw new Error('Public technology list is missing');
const technologies = [...technologyBlock[1].matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
if (!technologies.length) throw new Error('Public technology list is empty');
technologies.forEach((name, i) => add(`technology_${i}`, name, '/#work-marquee-title', `Nyrix lists ${name} among the technologies it works with.`));
add('research', 'Research and development', '/company/research', industry.researchIntroduction.description);
add('contact', 'Contact Nyrix', '/contact', `Contact the team at ${people.contactEmail}; the contact form is available on this page.`);
add('careers', 'Careers', '/careers#introduce-yourself', 'Send a general expression of interest, resume or portfolio to huzaifa@nyrix.co.');
add('podcast', 'The Next Question', '/resources/podcasts', 'Conversations with researchers and practitioners about AI in practice.');
fs.writeFileSync(path.join(root, 'api/_nyrixgpt-knowledge.json'), JSON.stringify(entries, null, 2) + '\n');

