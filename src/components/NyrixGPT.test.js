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

it('renders assistant CommonMark and GFM as semantic, safe elements', async () => {
  const markdown = '## Approach\n\n**Bold** and *italic* and ~~old~~.\n\n- First\n- Second\n\n1. One\n2. Two\n\n> A quote\n\n`inline code`\n\n```js\nconst x = 1;\n```\n\n| Stage | Owner |\n| --- | --- |\n| Pilot | Team |\n\n- [x] Checked\n\n[Team](/company/team)\n\n[unsafe](javascript:alert(1))\n\n<img src=x onerror=alert(1)>\n\n![remote](https://example.com/tracker.png)';
  global.fetch.mockImplementation(() => response({ ...answer, answer: markdown }));
  const dialog = open(); send('Explain the approach');
  expect(await within(dialog).findByRole('heading', { name: 'Approach' })).toBeInTheDocument();
  expect(within(dialog).getByText('Bold').tagName).toBe('STRONG');
  expect(within(dialog).getByText('italic').tagName).toBe('EM');
  expect(within(dialog).getByText('old').tagName).toBe('DEL');
  expect(within(dialog).getByRole('table')).toBeInTheDocument();
  expect(within(dialog).getByRole('checkbox')).toBeDisabled();
  expect(within(dialog).getByRole('link', { name: 'Team' })).toHaveAttribute('href','/company/team');
  expect(dialog.querySelector('a[href^="javascript:"]')).toBeNull();
  expect(dialog.querySelector('img')).toBeNull();
  expect(dialog.querySelector('script')).toBeNull();
  expect(dialog.querySelector('blockquote')).toHaveTextContent('A quote');
  expect(dialog.querySelector('pre code')).toHaveTextContent('const x = 1;');
});

it('keeps visitor text literal and supports footnotes and nested lists', async () => {
  global.fetch.mockImplementation(() => response({ ...answer, answer:'Note[^1].\n\n- Outer\n  - Inner\n\n[^1]: Supporting detail.' }));
  const dialog = open(); send('Please show **my literal text**');
  await within(dialog).findByText('Supporting detail.', { exact:false });
  expect(within(dialog).getByText('Please show **my literal text**')).toBeInTheDocument();
  expect(dialog.querySelector('li ul li')).toHaveTextContent('Inner');
  expect(within(dialog).getByRole('link', {name:'1'})).toHaveAttribute('href','#1');
});

it('formats streamed assistant text before the final response replaces it', async () => {
  let release; let step = 0;
  const encoder = new TextEncoder();
  global.fetch.mockResolvedValue({ok:true,headers:{get:()=> 'text/event-stream'},body:{getReader:()=>({read:()=>{
    step += 1;
    if (step === 1) return Promise.resolve({done:false,value:encoder.encode('event: delta\ndata: {"delta":"A **useful** answer"}\n\n')});
    if (step === 2) return new Promise(resolve => { release=resolve; });
    return Promise.resolve({done:true});
  },releaseLock:()=>{}})}});
  const dialog=open();send('Stream a response');
  expect((await within(dialog).findByText('useful')).tagName).toBe('STRONG');
  await act(async()=>{release({done:false,value:encoder.encode(`event: final\ndata: ${JSON.stringify({...answer,answer:'A **final** answer'})}\n\n`)});});
  expect((await within(dialog).findByText('final')).tagName).toBe('STRONG');
  expect(within(dialog).queryByText('useful')).not.toBeInTheDocument();
});

it('does not display an unfinished bold delimiter while a response streams', async () => {
  let release; let step = 0; const encoder = new TextEncoder();
  global.fetch.mockResolvedValue({ok:true,headers:{get:()=> 'text/event-stream'},body:{getReader:()=>({read:()=>{
    step += 1;
    if (step === 1) return Promise.resolve({done:false,value:encoder.encode('event: delta\ndata: {"delta":"A **useful"}\n\n')});
    if (step === 2) return new Promise(resolve => { release=resolve; });
    return Promise.resolve({done:true});
  },releaseLock:()=>{}})}});
  const dialog=open();send('Stream a response');
  expect(await within(dialog).findByText('A useful')).toBeInTheDocument();
  expect(dialog).not.toHaveTextContent('**useful');
  await act(async()=>{release({done:false,value:encoder.encode(`event: final\ndata: ${JSON.stringify({...answer,answer:'A **useful** answer'})}\n\n`)});});
  expect((await within(dialog).findByText('useful')).tagName).toBe('STRONG');
});

it('does not show suggested action buttons', () => {
  open({ suggestions: [{ label: 'Explore inventory planning', prompt: 'Which workflow could we improve first?' }] });
  expect(screen.queryByRole('button', { name: 'Explore inventory planning' })).not.toBeInTheDocument();
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

it('reviews the exact enquiry and sends it only after conversational confirmation', async () => {
  const inquiryDraft = { name: 'Test Person', email: 'test@example.com', organisation: 'Test Co', decision: 'We want to improve customer call follow-up.' };
  global.fetch.mockImplementationOnce(() => response({ ...answer, autoActionId: 'submit_inquiry', actions: [{ id: 'submit_inquiry' }], inquiryDraft }))
    .mockImplementationOnce(() => response({ ok: true, id: 'verified-id' }));
  open(); send('Please send an enquiry. I am Test Person, test@example.com, from Test Co. We want to improve customer call follow-up.');
  await screen.findByText(/Please review before I send this to hello@nyrix.co/);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  send('yes'); await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  expect(global.fetch.mock.calls[1][0]).toBe('/api/contact');
  expect(JSON.parse(global.fetch.mock.calls[1][1].body)).toMatchObject(inquiryDraft);
  expect(await screen.findByText(/Your enquiry has been submitted/)).toBeInTheDocument();
});

it('does not send guessed contact details', async () => {
  const inquiryDraft = { name: 'Unknown Person', email: 'invented@example.com', organisation: 'Unknown Co', decision: 'We need help with our workflow.' };
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId: 'submit_inquiry', actions: [{ id: 'submit_inquiry' }], inquiryDraft }));
  open(); send('Please send an enquiry about our workflow');
  await screen.findByText(/please share your name/i);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(screen.queryByText(/May I send it/)).not.toBeInTheDocument();
});

it('honours a declined enquiry without sending', async () => {
  const inquiryDraft = { name: 'Test Person', email: 'test@example.com', organisation: 'Test Co', decision: 'Improve customer call follow-up.' };
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId: 'submit_inquiry', actions: [{ id: 'submit_inquiry' }], inquiryDraft }));
  open(); send('Send an enquiry: Test Person, test@example.com, Test Co. Improve customer call follow-up.');
  await screen.findByText(/May I send it/); send('no');
  await screen.findByText(/I will not send the enquiry/); expect(global.fetch).toHaveBeenCalledTimes(1);
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

it('requires conversational booking confirmation and never claims an unsuccessful action completed', async () => {
  const action = { id: 'booking', type: 'booking', label: 'Book a conversation', requiresConfirmation: true, description: 'Review the destination before opening the booking page.' };
  const onAction = jest.fn().mockResolvedValue({ ok: false, error: 'Booking is unavailable.' });
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId:'booking', actions: [action] }));
  open({ onAction }); send('Please book a call'); await screen.findByText(answer.answer);
  expect(onAction).not.toHaveBeenCalled();
  expect(await screen.findByText(/Would you like me to open the booking page/)).toBeInTheDocument();
  send('Yes, go ahead');
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

it('starts a curated tour and advances through chat commands', async () => {
  const onAction = jest.fn().mockResolvedValue({ ok: true });
  const tours = [{ id: 'founder', title: 'Founder', steps: [{ id: 'one', title: 'Start with the decision', body: 'Review our approach.', actionId: 'tour-step-one' }, { id: 'two', title: 'Explore a product', body: 'Review a product.', actionId: 'tour-step-two' }, { id: 'three', title: 'Talk to the team', body: 'Review the contact page.' }] }];
  global.fetch.mockImplementation(() => response({ ...answer, autoActionId:'tour_founder', actions:[{id:'tour_founder'}] }));
  open({ tours, onAction }); send('Show me around');
  await waitFor(() => expect(onAction).toHaveBeenCalledWith('tour-step-one', expect.objectContaining({ tourId: 'founder' })));
  await screen.findByText(/Start with the decision/);
  send('next'); await screen.findByText(/Explore a product/);
  send('skip'); await screen.findByText(/Talk to the team/);
  expect(onAction).toHaveBeenCalledTimes(2);
  send('exit tour'); await screen.findByText(/Tour ended/);
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
