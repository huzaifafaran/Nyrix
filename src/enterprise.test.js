import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  window.scrollTo = jest.fn();
  // JSDOM has no decoder; playback policy is exercised in FooterBackground.test.js.
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(() => { jest.restoreAllMocks(); });
function visit(path) { render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>); }
function main() { return within(screen.getByRole('main')); }

it.each([
  ['/company', 'Applied AI, built around real work.'],
  ['/company/team', 'Our team'],
  ['/company/advisors', 'Our advisors'],
  ['/solutions', 'A practical path for your AI initiative.'],
  ['/products', 'AI for decisions, creative work and marketing.'],
  ['/products/kinlu', 'Kinlu'],
  ['/products/artifex', 'Artifex'],
  ['/products/numaya', 'Numaya'],
  ['/products/veeko', 'Veeko'],
  ['/case-studies', /^Real problems\.\s*Thoughtful\s*engineering\./],
  ['/case-studies/cleanroom-ems', 'Cleanroom environmental monitoring'],
  ['/case-studies/teachmeback', 'TeachMeBack AI'],
  ['/resources', 'Thinking from Nyrix.'],
  ['/resources/articles', 'Articles & publications'],
  ['/resources/podcasts', 'The Next Question'],
  ['/contact', 'Tell us what you’re working on.'],
])('direct route %s renders its content within one shared shell', async (path, title) => {
  visit(path);
  expect(await main().findByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  expect(screen.getAllByRole('navigation', { name: 'Primary navigation' })).toHaveLength(1);
  expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy-policy');
});

it('shows a useful fallback for an unknown product slug', () => {
  visit('/products/does-not-exist');
  expect(main().getByRole('heading', { level: 1, name: 'This page could not be found.' })).toBeInTheDocument();
  expect(main().getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/');
});

it.each(['artifex', 'veeko'])('shows %s as shelved without a launch action', (slug) => {
  visit(`/products/${slug}`);
  expect(main().getByText('Shelved.')).toBeInTheDocument();
  expect(main().queryByRole('link', { name: /^Visit / })).not.toBeInTheDocument();
  expect(main().getByRole('link', { name: /^Ask about / })).toHaveAttribute('href', '/contact');
});

it('includes both shelved products in the product directory', () => {
  visit('/products');
  expect(main().getAllByText('Shelved')).toHaveLength(2);
  expect(main().getByRole('link', { name: /^Explore Veeko/ })).toHaveAttribute('href', '/products/veeko');
});

it('renders all confirmed team names and their exact roles', () => {
  visit('/company/team');
  for (const [name, role] of [['Sarim bin Tahir', 'Co-founder & CEO'], ['Huzaifa Faran', 'Co-founder & Solutions Architect'], ['M. Ehtesham ul Hassan Malik', 'Lead ML Engineer']]) {
    const card = main().getByRole('heading', { name }).closest('article');
    expect(card).toBeInTheDocument();
    expect(within(card).getByText(role)).toBeInTheDocument();
  }
});

it('uses the supplied portrait assets for the actual team members', () => {
  visit('/company/team');
  for (const [name, source] of [['Sarim bin Tahir', '/people/sarim-bin-tahir.webp'], ['Huzaifa Faran', '/people/huzaifa-faran.webp'], ['M. Ehtesham ul Hassan Malik', '/people/ehtesham-malik.webp']]) {
    expect(main().getByRole('img', { name })).toHaveAttribute('src', source);
  }
});

it('renders the two confirmed advisors', () => {
  visit('/company/advisors');
  expect(main().getByRole('heading', { name: 'Shamsul Islam' })).toBeInTheDocument();
  expect(main().getByRole('heading', { name: 'Shaikh Mashhood Rahman' })).toBeInTheDocument();
  expect(main().getByRole('img', { name: 'Shamsul Islam' })).toHaveAttribute('src', '/people/advisor-shamsul-islam.webp');
  expect(main().getByRole('img', { name: 'Shaikh Mashhood Rahman' })).toHaveAttribute('src', '/people/advisor-mashhood-rahman.webp');
  expect(main().getAllByText('Advisor')).toHaveLength(2);
});

it('links authored articles to their original LinkedIn publications', () => {
  visit('/resources/articles');
  const expected = [
    ['Chapter 6: Memory', 'https://www.linkedin.com/pulse/chapter-6-memory-huzaifa-faran-1p6ff'],
    ['Chapter 5: The Receptionist', 'https://www.linkedin.com/pulse/chapter-5-receptionist-huzaifa-faran-sboyf'],
  ];
  for (const [title, url] of expected) {
    const article = within(main().getByRole('heading', { name: title }).closest('article'));
    expect(article.getByText('By Huzaifa Faran')).toBeInTheDocument();
    const link = article.getByRole('link', { name: /Read on LinkedIn/ });
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

it('distinguishes three published TNQ episodes from the upcoming premiere', () => {
  visit('/resources/podcasts');
  expect(main().getAllByRole('link', { name: /^Watch episode / })).toHaveLength(3);
  const premiere = main().getByRole('link', { name: /^View premiere 4/ });
  expect(premiere).toHaveAttribute('href', 'https://www.youtube.com/watch?v=hvQRJaG7l-U');
  const upcoming = within(premiere.closest('article'));
  expect(upcoming.getByText('Upcoming')).toBeInTheDocument();
  expect(upcoming.getByText('Premieres 17 October, 8pm PKT')).toHaveAttribute('datetime', '2026-10-17T15:00:00Z');
  expect(upcoming.queryByRole('link', { name: /^Watch episode/ })).not.toBeInTheDocument();
  expect(main().getByRole('link', { name: /^Visit Nyrix AI on YouTube/ })).toHaveAttribute('href', 'https://www.youtube.com/@NyrixAI');
});

it('toggles the menu and restores focus to its control on Escape', () => {
  visit('/company');
  const toggle = screen.getByRole('button', { name: 'Menu' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAccessibleName('Close');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  screen.getByRole('navigation', { name: 'Primary navigation' }).querySelector('a').focus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  fireEvent.click(toggle);
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

it('closes the menu after navigating to a different route', async () => {
  visit('/company');
  const toggle = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(toggle);
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Products' }));
  expect(await main().findByRole('heading', { level: 1, name: 'AI for decisions, creative work and marketing.' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
});

it.each([
  ['/company', /^Explore our work/],
  ['/resources', /^View selected work/],
  ['/resources/articles', /^Explore our work/],
])('the work link on %s opens the case-study index', async (path, linkName) => {
  visit(path);
  fireEvent.click(main().getByRole('link', { name: linkName }));
  expect(await main().findByRole('heading', { level: 1, name: /^Real problems\.\s*Thoughtful\s*engineering\./ })).toBeInTheDocument();
});

it('identifies case-study imagery accurately and links both projects', () => {
  visit('/case-studies');
  expect(main().getByRole('img', { name: 'Conceptual filtration layers and glass channels crossed by a violet light trace' })).toHaveAttribute('src', '/media/work-cleanroom-v2.webp');
  expect(main().getByRole('img', { name: 'Public TeachMeBack website showing the active-recall learning concept' })).toHaveAttribute('src', '/media/work-teachmeback.webp');
  expect(main().getByRole('link', { name: 'Read the TeachMeBack AI case study' })).toHaveAttribute('href', '/case-studies/teachmeback');
});

it('keeps the image provenance clear on individual case studies', () => {
  visit('/case-studies/teachmeback');
  expect(main().getByRole('img', { name: 'Public TeachMeBack website showing the active-recall learning concept' })).toBeInTheDocument();
  expect(main().getByRole('link', { name: /All work/ })).toHaveAttribute('href', '/case-studies');
  expect(main().getByRole('link', { name: /Talk to our team/ })).toHaveAttribute('href', '/contact');
});

it('makes the agent library reachable from primary navigation and closes the menu', async () => {
  visit('/company');
  const toggle = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(toggle);
  const agentsLink = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Agents' });
  expect(agentsLink).toHaveAttribute('href', '/agents');
  fireEvent.click(agentsLink);
  expect(await main().findByRole('heading', { level: 1, name: 'Agent library' })).toBeInTheDocument();
  expect(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Agents' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
});

it('lets visitors browse agents and recover from an empty search', async () => {
  visit('/agents');
  const search = await main().findByRole('searchbox', { name: 'Search agents' });
  const originalTitle = main().getByRole('heading', { level: 2 }).textContent;
  fireEvent.click(main().getByRole('button', { name: 'Next agent' }));
  expect(main().getByRole('heading', { level: 2 }).textContent).not.toBe(originalTitle);
  fireEvent.change(search, { target: { value: 'no-such-workflow-72819' } });
  expect(main().getByRole('heading', { name: 'No matching agents' })).toBeInTheDocument();
  fireEvent.click(main().getByRole('button', { name: 'Clear filters' }));
  expect(search).toHaveValue('');
  expect(main().getByRole('button', { name: 'Next agent' })).toBeInTheDocument();
});

it('keeps homepage content and solutions navigation in the reference lander', async () => {
  visit('/');
  expect(main().getByRole('heading', { level: 1, name: /Intelligence,\s*put to work\./ })).toBeInTheDocument();
  fireEvent.click(main().getByRole('link', { name: 'Explore our solutions' }));
  expect(await main().findByRole('heading', { level: 1, name: 'A practical path for your AI initiative.' })).toBeInTheDocument();
});

it('places the work strip after the hero and products before selected work', () => {
  visit('/');
  const mainElement = screen.getByRole('main');
  const hero = mainElement.querySelector('.ribbon-hero');
  const strip = mainElement.querySelector('.work-marquee');
  const introduction = mainElement.querySelector('.intro-split');
  const productsSection = mainElement.querySelector('.home-product-section');
  const workSection = mainElement.querySelector('.home-work-section');
  expect(hero.compareDocumentPosition(strip) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(strip.compareDocumentPosition(introduction) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(productsSection.compareDocumentPosition(workSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(within(strip).getAllByText("Gerry's dnata").length).toBeGreaterThan(0);
  expect(within(strip).getAllByText("Sejong-si Ramyun").length).toBeGreaterThan(0);
});

it('switches navigation surface after scrolling and clears it on return to top', () => {
  window.scrollY = 0;
  visit('/');
  const header = screen.getByRole('banner');
  expect(header).not.toHaveClass('is-scrolled');
  window.scrollY = 80;
  fireEvent.scroll(window);
  expect(header).toHaveClass('is-scrolled');
  window.scrollY = 0;
  fireEvent.scroll(window);
  expect(header).not.toHaveClass('is-scrolled');
  expect(within(header).getByRole('link', { name: 'Agents' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /(?:pause|play).*?(?:animation|motion)/i })).not.toBeInTheDocument();
});

it('preserves the legacy homepage contact fragment as dedicated contact navigation', async () => {
  visit('/#contact');
  expect(await main().findByRole('heading', { level: 1, name: 'Tell us what you’re working on.' })).toBeInTheDocument();
});
