import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render as renderTest, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import NyrixGPT from './NyrixGPT';
import { readNyrixGPTResponse } from './NyrixGPT';
import { TextEncoder, TextDecoder } from 'util';

const originalFetch = global.fetch;
Object.defineProperty(window, 'crypto', { value: require('crypto').webcrypto, configurable: true });
const answer = {
  ok: true, answer: 'Start with the workflow and the decision it supports.',
  citations: [{ id: 'delivery', title: 'How Nyrix works', url: '/what-we-do' }],
  actions: [], blueprint: null,
};
const response = (body = answer, ok = true) => Promise.resolve({ ok, headers: { get: () => 'application/json' }, json: async () => body });
function render(ui) { return renderTest(<MemoryRouter>{ui}</MemoryRouter>); }
function open(props = {}) {
  render(<NyrixGPT context={{ path: '/products/kinlu', title: 'KINLU' }} {...props} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ask NyrixGPT' }));
  return screen.getByRole('dialog', { name: 'NyrixGPT' });
}
function send(text = 'How could KINLU support inventory planning?') {
  fireEvent.change(screen.getByLabelText('Message NyrixGPT'), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
}
beforeEach(() => {
  global.fetch = jest.fn(); sessionStorage.clear();
  window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  global.TextDecoder = TextDecoder;
});
afterEach(() => { global.fetch = originalFetch; jest.restoreAllMocks(); });

it('starts closed without an API request, traps focus, and restores the trigger on Escape', () => {
  render(<NyrixGPT />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
  const trigger = screen.getByRole('button', { name: 'Ask NyrixGPT' });
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'NyrixGPT' });
  const close = within(dialog).getByRole('button', { name: 'Close NyrixGPT' });
  act(() => close.focus());
  fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
  expect(dialog).toContainElement(document.activeElement);
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it('sends real context and bounded history, then renders plain text and safe cited links', async () => {
  global.fetch.mockImplementation(() => response());
  open(); send();
  expect(await screen.findByText(answer.answer)).toBeInTheDocument();
  const [url, options] = global.fetch.mock.calls[0];
  expect(url).toBe('/api/nyrixgpt');
  expect(JSON.parse(options.body)).toMatchObject({ message: 'How could KINLU support inventory planning?', context: { path: '/products/kinlu' }, history: [] });
  expect(options.signal).toBeInstanceOf(AbortSignal);
  expect(screen.getByRole('link', { name: 'How Nyrix works' })).toHaveAttribute('href', '/what-we-do');
});

it('uses context suggestions as editable input without silently sending a request', () => {
  open({ suggestions: [{ label: 'Explore inventory planning', prompt: 'Which workflow could we improve first?' }] });
  fireEvent.click(screen.getByRole('button', { name: 'Explore inventory planning' }));
  expect(screen.getByLabelText('Message NyrixGPT')).toHaveValue('Which workflow could we improve first?');
  expect(global.fetch).not.toHaveBeenCalled();
});

it('executes a validated autonomous navigation selected for a direct request', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true, message: 'Opening Our team.' });
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId: 'team', actions: [{ id: 'team' }] }));
  open({ onAction }); send('Could you take me to the people behind Nyrix?');
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('team', expect.objectContaining({ confirmed: false })));
});

it('never automatically books or executes unlisted destinations', async () => {
  const onAction = jest.fn();
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId: 'booking', actions: [{ id: 'booking' }] }));
  open({ onAction }); send('Book me a call');
  await screen.findByText(answer.answer);
  expect(onAction).not.toHaveBeenCalled();
});

it('keeps input and an honest error on unavailability, and retries the same logical request', async () => {
  global.fetch.mockImplementationOnce(() => response({ ok: false, code: 'unconfigured', error: 'NyrixGPT is unavailable right now.' }, false)).mockImplementationOnce(() => response());
  open(); send('My planning question');
  expect(await screen.findByRole('alert')).toHaveTextContent('NyrixGPT is unavailable right now.');
  expect(screen.queryByText(answer.answer)).not.toBeInTheDocument();
  expect(screen.getByLabelText('Message NyrixGPT')).toHaveValue('My planning question');
  fireEvent.click(screen.getByRole('button', { name: 'Retry response' }));
  await screen.findByText(answer.answer);
  const payloads = global.fetch.mock.calls.map(([, o]) => JSON.parse(o.body));
  expect(payloads[1].requestId).toBe(payloads[0].requestId);
  expect(screen.getAllByText('My planning question', { selector: '.nyrixgpt-message-text' })).toHaveLength(1);
});

it('aborts an in-flight request and ignores a late result after cancellation', async () => {
  let done;
  global.fetch.mockImplementation(() => new Promise(resolve => { done = resolve; }));
  open(); send();
  const options = global.fetch.mock.calls[0][1];
  fireEvent.click(screen.getByRole('button', { name: 'Stop response' }));
  expect(options.signal.aborted).toBe(true);
  await act(async () => { done(await response()); });
  expect(screen.queryByText(answer.answer)).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Response stopped');
});

it('does not persist conversation text, blueprint details, or sensitive input by default', async () => {
  global.fetch.mockImplementation(() => response());
  open(); send('Contact me at private@example.com about a confidential workflow');
  await screen.findByText(answer.answer);
  const stored = Object.keys(sessionStorage).map(k => sessionStorage.getItem(k)).join(' ');
  expect(stored).not.toContain('private@example.com');
  expect(stored).not.toContain('confidential');
  expect(localStorage.length).toBe(0);
});

it('keeps the desktop page interactive and makes only the phone drawer modal', () => {
  window.matchMedia.mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  const outside = document.createElement('button'); outside.textContent = 'Website action'; document.body.append(outside);
  open();
  expect(screen.getByRole('dialog', { name: 'NyrixGPT' })).not.toHaveAttribute('aria-modal', 'true');
  expect(outside.inert).not.toBe(true);
  act(() => outside.focus()); expect(outside).toHaveFocus();
  outside.remove();
});

it('offers real allowlisted website shortcuts when the service is unavailable', async () => {
  global.fetch.mockImplementation(() => response({ ok: false, code: 'disabled', error: 'NyrixGPT is unavailable.' }, false));
  open(); send();
  await screen.findByRole('alert');
  expect(screen.getByRole('link', { name: 'Contact Nyrix' })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('link', { name: 'Explore products' })).toHaveAttribute('href', '/products');
});

it('requires deliberate booking confirmation and never claims an unsuccessful action completed', async () => {
  const action = { id: 'booking', type: 'booking', label: 'Book a conversation', requiresConfirmation: true, description: 'Review the destination before opening the booking page.' };
  const onAction = jest.fn().mockResolvedValue({ ok: false, error: 'Booking is unavailable.' });
  global.fetch.mockImplementation(() => response({ ...answer, actions: [action] }));
  open({ onAction }); send(); await screen.findByText(answer.answer);
  fireEvent.click(screen.getByRole('button', { name: 'Book a conversation' }));
  expect(onAction).not.toHaveBeenCalled();
  expect(screen.getByRole('heading', { name: 'Review before continuing' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Confirm Book a conversation' })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Confirm Book a conversation' }));
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('booking', expect.objectContaining({ confirmed: true })));
  expect(await screen.findByRole('alert')).toHaveTextContent('Booking is unavailable.');
  expect(screen.getByRole('status')).not.toHaveTextContent('completed');
});

it('automates only host-resolved explicit navigation that also appears in final validated actions', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true, message: 'Opened Careers.' });
  const resolveNavigation = jest.fn(() => 'careers');
  global.fetch.mockImplementation(() => response({ ...answer, actions: [{ id: 'careers', type: 'navigate', label: 'Explore Careers' }] }));
  open({ onAction, resolveNavigation }); send('Open Careers');
  await screen.findByText(answer.answer);
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('careers', expect.objectContaining({ confirmed: false })));
});

it('renders every proposed blueprint field and keeps nested pilot edits in the working draft', async () => {
  const blueprint = { problem: 'Slow planning', industry: 'Food and beverage', workflow: 'Inventory planning', bottleneck: 'Manual checks', outcome: 'Quicker review', proposedAiWorkflow: ['Combine planning inputs'], relevantCapabilities: ['Decision sciences'], dataAndIntegrations: ['Stock records'], pilot: { scope: 'One workflow', steps: ['Review data'], humanReview: 'Planner approval' }, measures: ['Agree a baseline'], assumptions: ['Records available'], questions: ['Which location?'], guardrails: ['Human approval'] };
  global.fetch.mockImplementation(() => response({ ...answer, blueprint }));
  open(); send(); await screen.findByText(answer.answer);
  fireEvent.click(screen.getByRole('tab', { name: 'Blueprint' }));
  expect(screen.getByLabelText('Current bottleneck')).toHaveValue('Manual checks');
  expect(screen.getByLabelText('Proposed success criteria')).toHaveValue('Agree a baseline');
  expect(screen.getByLabelText('Human review')).toHaveValue('Planner approval');
  fireEvent.change(screen.getByLabelText('Pilot scope'), { target: { value: 'Two locations' } });
  expect(screen.getByLabelText('Pilot scope')).toHaveValue('Two locations');
  expect(screen.getByText('A working draft to review with the Nyrix team.')).toBeInTheDocument();
});

it('gives workspace tabs arrow-key navigation and a single selected tab stop', () => {
  open(); const conversation = screen.getByRole('tab', { name: 'Conversation' });
  fireEvent.keyDown(conversation, { key: 'ArrowRight' });
  const blueprint = screen.getByRole('tab', { name: 'Blueprint' });
  expect(blueprint).toHaveAttribute('aria-selected', 'true'); expect(blueprint).toHaveFocus();
  expect(conversation).toHaveAttribute('tabindex', '-1');
});

it('starts a real curated tour step, supports Next/Skip and restores the launcher on Exit', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true });
  const tours = [{ id: 'overview', title: 'The Nyrix approach', steps: [{ id: 'one', title: 'Start with the decision', body: 'Review our approach.', actionId: 'tour-step-one' }, { id: 'two', title: 'Explore a product', body: 'Review a product.', actionId: 'tour-step-two' }, { id: 'three', title: 'Talk to the team', body: 'Review the contact page.' }] }];
  open({ tours, onAction }); fireEvent.click(screen.getByRole('button', { name: 'Take a tour: The Nyrix approach' }));
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('tour-step-one', expect.objectContaining({ tourId: 'overview' })));
  expect(await screen.findByRole('region', { name: 'Start with the decision' })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await screen.findByRole('heading', { name: 'Explore a product' });
  fireEvent.click(screen.getByRole('button', { name: 'Skip' }));
  await screen.findByRole('heading', { name: 'Talk to the team' });
  expect(onAction).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole('button', { name: 'Exit tour' }));
  expect(screen.queryByRole('region', { name: 'Talk to the team' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Ask NyrixGPT' })).toHaveFocus();
});

it('decodes split SSE events and UTF-8 text while keeping actions confined to the final event', async () => {
  const encoded = new TextEncoder().encode(`event: delta\r\ndata: {"delta":"Décision"}\r\n\r\nevent: final\r\ndata: ${JSON.stringify(answer)}\r\n\r\n`);
  const chunks = [encoded.slice(0, 21), encoded.slice(21, 22), encoded.slice(22, 46), encoded.slice(46)];
  const onDelta = jest.fn();
  const result = await readNyrixGPTResponse({ ok: true, headers: { get: () => 'text/event-stream' }, body: { getReader: () => ({ read: async () => chunks.length ? { done: false, value: chunks.shift() } : { done: true }, releaseLock: jest.fn() }) } }, onDelta);
  expect(onDelta).toHaveBeenCalledWith('Décision'); expect(result).toEqual(answer);
});

it('renders no portal in the server snapshot or first hydration render', () => {
  expect(renderToString(<NyrixGPT />)).toBe('');
});

it('rejects external, protocol-relative, unknown and unregistered fragment citations', async () => {
  global.fetch.mockImplementation(() => response({ ...answer, citations: [
    ...answer.citations,
    { id: 'bad1', title: 'External', url: 'https://example.com' },
    { id: 'bad2', title: 'Protocol relative', url: '//example.com' },
    { id: 'bad3', title: 'Unknown page', url: '/made-up-page' },
    { id: 'bad4', title: 'Unknown fragment', url: '/what-we-do#made-up' },
    { id: 'good', title: 'Governance', url: '/what-we-do#governance' },
  ], actions: [{ id: 'unknown_action', label: 'Untrusted action' }, { id: 'constructor', label: 'Inherited action' }] }));
  open(); send(); await screen.findByText(answer.answer);
  expect(screen.getByRole('link', { name: 'Governance' })).toHaveAttribute('href', '/what-we-do#governance');
  expect(screen.queryByRole('link', { name: 'External' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Unknown fragment' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Untrusted action' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Inherited action' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'How Nyrix works' }));
  expect(screen.getByRole('dialog', { name: 'NyrixGPT' })).toBeInTheDocument();
  expect(screen.getByText(answer.answer)).toBeInTheDocument();
});

it('offers host-owned return navigation only when a previous same-site location exists', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true, message: 'Returned to the previous page.' });
  open({ canReturn: true, onAction });
  fireEvent.click(screen.getByRole('button', { name: 'Return to previous page' }));
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('return_previous', expect.objectContaining({ confirmed: false })));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Close NyrixGPT' })).toHaveFocus());
});

it('routes normal citation clicks through the trusted registry while preserving modified link behavior', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true });
  global.fetch.mockImplementation(() => response());
  open({ onAction }); send(); await screen.findByText(answer.answer);
  const link = screen.getByRole('link', { name: 'How Nyrix works' });
  fireEvent.click(link, { ctrlKey: true }); expect(onAction).not.toHaveBeenCalled();
  fireEvent.click(link);
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('services', expect.objectContaining({ confirmed: false })));
});

it('sends the current edited blueprint as labelled user context for refinement within existing history limits', async () => {
  global.fetch.mockImplementation(() => response({ ...answer, blueprint: { problem: 'Slow planning', pilot: { scope: 'One location' } } }));
  open(); send('Create a project blueprint'); await screen.findByText(answer.answer);
  fireEvent.click(screen.getByRole('tab', { name: 'Blueprint' }));
  fireEvent.change(screen.getByLabelText('Pilot scope'), { target: { value: 'Two visitor-edited locations' } });
  send('Refine this blueprint');
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  const payload = JSON.parse(global.fetch.mock.calls[1][1].body);
  expect(payload.history.length).toBeLessThanOrEqual(6);
  expect(payload.history.reduce((n, m) => n + m.content.length, 0)).toBeLessThanOrEqual(6000);
  expect(payload.history.at(-1)).toMatchObject({ role: 'user' });
  expect(payload.history.at(-1).content).toContain('Visitor-edited project blueprint');
  expect(payload.history.at(-1).content).toContain('Two visitor-edited locations');
  expect(Object.keys(payload).sort()).toEqual(['context', 'history', 'message', 'requestId', 'sessionId']);
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Response ready.'));
});
