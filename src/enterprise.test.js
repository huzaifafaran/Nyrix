import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => { window.scrollTo = jest.fn(); });
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
  ['/case-studies', 'Systems built for specific problems.'],
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

it('renders all confirmed team names and their exact roles', () => {
  visit('/company/team');
  for (const [name, role] of [['Sarim bin Tahir', 'Co-founder & CEO'], ['Huzaifa Faran', 'Co-founder & Solutions Architect'], ['M. Ehtesham ul Hassan Malik', 'Lead ML Engineer']]) {
    expect(main().getByRole('heading', { name })).toBeInTheDocument();
    expect(main().getByText(role)).toBeInTheDocument();
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
  expect(main().getByRole('heading', { name: 'Shams ul Islam' })).toBeInTheDocument();
  expect(main().getByRole('heading', { name: 'Mashhoodurrehman' })).toBeInTheDocument();
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
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

it.each([
  ['/company', /^Explore our work/],
  ['/resources', /^View selected work/],
  ['/resources/articles', /^Explore our work/],
])('the work link on %s opens the case-study index', async (path, linkName) => {
  visit(path);
  fireEvent.click(main().getByRole('link', { name: linkName }));
  expect(await main().findByRole('heading', { level: 1, name: 'Systems built for specific problems.' })).toBeInTheDocument();
});

it('makes the agent library reachable from primary navigation and closes the menu', async () => {
  visit('/company');
  const toggle = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(toggle);
  const agentsLink = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Agents' });
  expect(agentsLink).toHaveAttribute('href', '/agents');
  fireEvent.click(agentsLink);
  expect(await main().findByRole('heading', { level: 1, name: 'Agent library' })).toBeInTheDocument();
  expect(agentsLink).toHaveAttribute('aria-current', 'page');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
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

it('preserves the legacy homepage contact fragment as dedicated contact navigation', async () => {
  visit('/#contact');
  expect(await main().findByRole('heading', { level: 1, name: 'Tell us what you’re working on.' })).toBeInTheDocument();
});
