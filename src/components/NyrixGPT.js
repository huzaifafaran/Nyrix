import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import actionRegistry from '../content/nyrixGptActions.json';
import { bookingUrl } from '../content/nyrixContent';
import './NyrixGPT.css';

const SESSION_KEY = 'nyrixgpt.session.v1';
const MAX_MESSAGE = 2000;
const REGISTERED_PATHS = new Set(Object.values(actionRegistry).map(action => action.path));
const REGISTERED_PAGES = new Set([...REGISTERED_PATHS].map(path => path.split('#')[0]));
const BLUEPRINT_FIELDS = [
  ['problem', 'Decision to improve'], ['industry', 'Industry'], ['workflow', 'Workflow'],
  ['bottleneck', 'Current bottleneck'], ['outcome', 'Intended outcome'],
  ['proposedAiWorkflow', 'Proposed AI workflow'], ['relevantCapabilities', 'Relevant capabilities'],
  ['dataAndIntegrations', 'Data and integrations'], ['pilot.scope', 'Pilot scope'],
  ['pilot.steps', 'Pilot steps'], ['pilot.humanReview', 'Human review'],
  ['measures', 'Proposed success criteria'], ['assumptions', 'Assumptions'],
  ['questions', 'Open questions'], ['guardrails', 'Guardrails'],
];
const LIST_FIELDS = new Set(['proposedAiWorkflow', 'relevantCapabilities', 'dataAndIntegrations', 'pilot.steps', 'measures', 'assumptions', 'questions', 'guardrails']);

function newId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const bytes = window.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map(n => n.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function sessionId() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (saved && /^[a-f0-9-]{36}$/i.test(saved.id)) return saved.id;
  } catch (_) { /* Storage may be unavailable; the in-memory session still works. */ }
  const id = newId();
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, version: 1 })); } catch (_) { /* No transcript is stored. */ }
  return id;
}

function safeUrl(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null;
  return (value.includes('#') ? REGISTERED_PATHS.has(value) : REGISTERED_PAGES.has(value)) ? value : null;
}

function boundedHistory(messages, maxCharacters = 6000, maxMessages = 6) {
  const result = [];
  let size = 0;
  for (const item of messages.filter(m => m.content && ['user', 'assistant'].includes(m.role)).slice(-maxMessages).reverse()) {
    const content = item.content.slice(0, maxCharacters - size);
    if (content) result.unshift({ role: item.role, content });
    size += content.length;
    if (size >= maxCharacters) break;
  }
  return result;
}

function failure(payload, fallback = 'NyrixGPT could not respond. Please try again.') {
  const error = new Error(typeof payload?.error === 'string' ? payload.error.slice(0, 500) : fallback);
  error.code = payload?.code;
  error.retryAfter = Number(payload?.retryAfter) || null;
  return error;
}

// SSE is rendered only as actual received answer text. Actions and citations require a final validated event.
export async function readNyrixGPTResponse(response, onDelta) {
  const type = response.headers?.get('content-type') || '';
  if (!response.ok || !type.includes('text/event-stream')) {
    const data = await response.json();
    if (!response.ok || data?.ok !== true) throw failure(data);
    return data;
  }
  if (!response.body?.getReader) throw failure(null, 'Streaming is unavailable in this browser. Please try again.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let pending = '';
  let final = null;
  const parse = block => {
    let event = 'message';
    const data = [];
    block.split('\n').forEach(line => {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
    });
    if (!data.length) return;
    let value;
    try { value = JSON.parse(data.join('\n')); } catch (_) { throw failure(null, 'The response was interrupted. Please retry.'); }
    if (event === 'error') throw failure(value);
    if (event === 'delta' && typeof value.delta === 'string') onDelta(value.delta);
    if (event === 'final') {
      if (value?.ok !== true) throw failure(value);
      final = value;
    }
  };
  try {
    while (true) {
      const { done, value } = await reader.read();
      pending = (pending + decoder.decode(value || new Uint8Array(), { stream: !done })).replace(/\r\n/g, '\n');
      if (pending.length > 120000) throw failure(null, 'The response exceeded the display limit. Please ask a shorter question.');
      let boundary;
      while ((boundary = pending.indexOf('\n\n')) !== -1) { parse(pending.slice(0, boundary)); pending = pending.slice(boundary + 2); }
      if (done) break;
    }
    if (pending.trim()) parse(pending);
    if (!final) throw failure(null, 'The response was interrupted. Please retry.');
    return final;
  } finally { reader.releaseLock?.(); }
}

function ChatIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5.5 4V6A1.5 1.5 0 0 1 5 4.5Z" /><path d="M8 9h8M8 12h5" /></svg>;
}

export default function NyrixGPT({ context = { path: '/' }, tours = [], onAction, resolveNavigation, canReturn = false }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tab, setTab] = useState('conversation');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [partial, setPartial] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [blueprint, setBlueprint] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [tour, setTour] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const root = useRef(null);
  const panel = useRef(null);
  const trigger = useRef(null);
  const composer = useRef(null);
  const lastMessage = useRef(null);
  const session = useRef(null);
  const currentRequest = useRef(null);
  const lastRequest = useRef(null);
  const active = useRef(false);

  useEffect(() => { setMounted(true); active.current = true; return () => { active.current = false; currentRequest.current?.controller.abort(); }; }, []);
  useEffect(() => {
    const media = window.matchMedia?.('(max-width: 900px)');
    if (!media) return undefined;
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const returnTrigger = trigger.current;
    const overflow = document.body.style.overflow;
    if (mobile) document.body.style.overflow = 'hidden';
    const siblings = mobile ? [...document.body.children].filter(el => el !== root.current && !['SCRIPT', 'STYLE'].includes(el.tagName)) : [];
    const previous = siblings.map(el => ({ el, inert: el.inert }));
    previous.forEach(({ el }) => { el.inert = true; });
    panel.current?.querySelector('button')?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous.forEach(({ el, inert }) => { el.inert = inert; });
      returnTrigger?.focus();
    };
  }, [open, mobile]);
  useEffect(() => { if (open && messages.length) lastMessage.current?.scrollIntoView?.({ block: 'nearest' }); }, [messages, open]);
  useEffect(() => {
    if (!error) return;
    const notice = panel.current?.querySelector('.nyrixgpt-error');
    notice?.scrollIntoView?.({ block: 'nearest' });
  }, [error]);

  const stop = () => {
    currentRequest.current?.controller.abort();
    currentRequest.current = null;
    setBusy(false); setPartial(''); setStatus('Response stopped. You can retry when ready.');
  };
  const send = async retry => {
    if (busy) return;
    const text = retry ? lastRequest.current?.message : draft.trim();
    if (!text || text.length > MAX_MESSAGE) { setError({ message: 'Enter a question of up to 2,000 characters.' }); composer.current?.focus(); return; }
    if (!retry && confirmation && /^(?:yes|yeah|yep|sure|confirm|go ahead|proceed|haan|han|ji|theek hai|kar do|krdo|jee|جی|ہاں|हाँ|जी)(?:[,.! ]+(?:please|go ahead|proceed|send it|open it|kar do|krdo|bhej do|please do))*[.! ]*$/i.test(text)) {
      setMessages(previous => [...previous, { id: newId(), role: 'user', content: text }]); setDraft('');
      await executeAction(confirmation, true); return;
    }
    if (!retry && confirmation && /^(?:no|nah|cancel|stop|nahi|nhi|nahin|mat karo|नहीं|نہیں)[.! ]*$/i.test(text)) {
      setMessages(previous => [...previous, { id: newId(), role: 'user', content: text }, { id: newId(), role: 'assistant', content: confirmation.type === 'submit_inquiry' ? 'Okay, I will not send the enquiry.' : 'Okay, I will not open it.' }]); setConfirmation(null); setDraft(''); return;
    }
    if (!retry && confirmation) setConfirmation(null);
    if (!retry && tour && /^(?:next|continue|agla|aage|اگلا|आगे|skip|exit|exit tour|stop tour|end tour)[.! ]*$/i.test(text)) {
      setMessages(previous => [...previous, { id: newId(), role: 'user', content: text }]); setDraft('');
      if (/^(?:exit|stop|end)/i.test(text)) { setTour(null); setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: 'Tour ended. What would you like to explore next?' }]); }
      else await tourMove(stepIndex + 1, !/^skip/i.test(text));
      return;
    }
    if (!window.crypto?.getRandomValues) { setError({ message: 'A secure browser connection is required. Please reload the website over HTTPS.' }); return; }
    session.current = session.current || sessionId();
    let history = boundedHistory(messages);
    if (blueprint && (tab === 'blueprint' || /\b(?:blueprint|draft|refine|revise|update|edit|change|adjust|expand|shorten|pilot|guardrails?|assumptions?|criteria)\b/i.test(text))) {
      const snapshot = JSON.stringify(blueprint);
      const draftContext = `Visitor-edited project blueprint (working draft, not verified facts):\n${snapshot.slice(0, 4000)}${snapshot.length > 4000 ? '\n[Draft truncated; ask about missing details.]' : ''}`;
      history = [...boundedHistory(messages, 6000 - draftContext.length, 5), { role: 'user', content: draftContext }];
    }
    const payload = retry ? lastRequest.current : { message: text, history, context: { path: context.path || '/' }, sessionId: session.current, requestId: newId() };
    lastRequest.current = payload;
    if (!retry) setMessages(previous => [...previous, { id: payload.requestId, role: 'user', content: text }]);
    const controller = new AbortController();
    const request = { controller };
    currentRequest.current = request;
    setBusy(true); setError(null); setPartial(''); setStatus('Preparing a response…');
    try {
      const response = await fetch('/api/nyrixgpt', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream, application/json' }, body: JSON.stringify(payload), signal: controller.signal, credentials: 'same-origin' });
      let streamSize = 0;
      const result = await readNyrixGPTResponse(response, delta => {
        streamSize += delta.length;
        if (streamSize > 24000) { controller.abort(); throw failure(null, 'The response exceeded the display limit. Please ask a shorter question.'); }
        if (active.current && currentRequest.current === request) { setPartial(previous => previous + delta); setStatus('Receiving response…'); }
      });
      if (controller.signal.aborted || !active.current || currentRequest.current !== request) return;
      if (typeof result.answer !== 'string' || !result.answer.trim() || result.answer.length > 24000) throw failure(null, 'NyrixGPT returned an incomplete response. Please retry.');
      const citations = (Array.isArray(result.citations) ? result.citations : []).filter(c => c && typeof c.title === 'string' && safeUrl(c.url)).slice(0, 8);
      const actions = (Array.isArray(result.actions) ? result.actions : []).filter(a => a && typeof a.id === 'string' && Object.prototype.hasOwnProperty.call(actionRegistry, a.id)).slice(0, 5).map(action => ({ ...action, ...actionRegistry[action.id] }));
      setMessages(previous => [...previous, { id: `${payload.requestId}-answer`, role: 'assistant', content: result.answer, citations, actions }]);
      if (result.blueprint && typeof result.blueprint === 'object') setBlueprint(result.blueprint);
      setDraft(''); setPartial(''); setStatus('Response ready.');
      const directId = result.autoActionId || resolveNavigation?.(text, actions);
      const directAction = actions.find(action => action.id === directId && ['navigate','booking','prepare_inquiry','submit_inquiry','start_tour','return','tour_next','tour_skip','tour_exit','copy_blueprint','download_blueprint'].includes(action.type));
      if (directAction) await executeAction({ ...directAction, inquiryDraft: result.inquiryDraft }, false, result.blueprint || blueprint, [...messages.filter(item => item.role === 'user').map(item => item.content), text]);
    } catch (reason) {
      if (!active.current || currentRequest.current !== request || controller.signal.aborted) return;
      setPartial(''); setError({ message: reason.message || 'NyrixGPT could not respond. Please retry.', retryAfter: reason.retryAfter }); setStatus('');
    } finally {
      if (active.current && currentRequest.current === request) { currentRequest.current = null; setBusy(false); }
    }
  };
  const close = () => { stop(); setConfirmation(null); setOpen(false); };
  const keyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); if (confirmation) setConfirmation(null); else close(); return; }
    if (event.key !== 'Tab' || !mobile) return;
    const nodes = [...panel.current.querySelectorAll('button:not([disabled]),a[href],textarea,input,select,[tabindex="0"]')].filter(el => !el.hidden && !el.closest('[hidden]'));
    const first = nodes[0]; const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const executeAction = async (action, confirmed = false, blueprintOverride = blueprint, conversationOverride = messages.filter(item => item.role === 'user').map(item => item.content)) => {
    if (actionBusy) return;
    if (action.type === 'submit_inquiry') {
      const values = action.inquiryDraft;
      const userText = conversationOverride.join('\n').toLocaleLowerCase();
      const valid = values && ['name','email','organisation','decision'].every(key => typeof values[key] === 'string' && values[key].trim()) && ['name','email','organisation'].every(key => userText.includes(values[key].trim().toLocaleLowerCase())) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && values.decision.trim().length >= 10;
      if (!confirmed && !valid) { setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: 'To prepare your enquiry, please share your name, work email, organisation and a short description of the problem.' }]); return; }
      if (!confirmed) {
        setConfirmation({ ...action, inquiryDraft: values, requestId: newId() });
        setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: `Please review before I send this to hello@nyrix.co:\nName: ${values.name}\nEmail: ${values.email}\nOrganisation: ${values.organisation}\nMessage: ${values.decision}\n\nMay I send it? Please confirm or say no.` }]); return;
      }
      setActionBusy(true); setError(null); setStatus('Sending your enquiry…');
      const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch('/api/contact', { method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json',Accept:'application/json'}, signal:controller.signal, body:JSON.stringify({ ...values, website:'', requestId:action.requestId }) });
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.ok !== true || typeof result.id !== 'string' || !result.id.trim()) throw new Error(result?.error || 'The enquiry could not be sent. Please try again.');
        setConfirmation(null); setStatus('Enquiry sent.'); setMessages(previous => [...previous, { id:newId(), role:'assistant', content:'Your enquiry has been submitted. Thank you.' }]);
      } catch (reason) { setError({ message: reason.name === 'AbortError' ? 'Delivery could not be confirmed. Say yes to retry the same request, or no to cancel.' : (reason.message || 'The enquiry could not be sent. Say yes to retry or no to cancel.') }); setStatus(''); }
      finally { clearTimeout(timeout); setActionBusy(false); }
      return;
    }
    if (!confirmed && (action.requiresConfirmation || /submit|send|book/i.test(action.type || ''))) {
      setConfirmation(action);
      setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: `Would you like me to open the booking page at ${bookingUrl}? No appointment will be made yet. Please confirm or say no.` }]);
      return;
    }
    if (action.type === 'start_tour' && action.tourId) {
      const selected = tours.find(item => item.id === action.tourId && item.steps?.length);
      if (selected) { await startTour(selected); setConfirmation(null); return; }
    }
    if (['tour_next','tour_skip','tour_exit'].includes(action.type)) {
      if (!tour) { setError({ message: 'There is no active tour. Ask me to show you around first.' }); return; }
      if (action.type === 'tour_exit') { setTour(null); setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: 'Tour ended. What would you like to explore next?' }]); }
      else await tourMove(stepIndex + 1, action.type !== 'tour_skip');
      return;
    }
    if (['copy_blueprint','download_blueprint'].includes(action.type)) {
      if (!blueprintOverride) { setError({ message: 'There is no blueprint yet. Ask me to create one first.' }); return; }
      try {
        if (action.type === 'copy_blueprint') await navigator.clipboard.writeText(JSON.stringify(blueprintOverride, null, 2));
        else { const url = URL.createObjectURL(new Blob([JSON.stringify(blueprintOverride, null, 2)], {type:'application/json'})); const link = document.createElement('a'); link.href = url; link.download = 'nyrix-project-blueprint.json'; link.click(); URL.revokeObjectURL(url); }
        setMessages(previous => [...previous, { id:newId(), role:'assistant', content:action.type === 'copy_blueprint' ? 'Blueprint copied.' : 'Your browser was asked to download the blueprint.' }]);
      } catch (_) { setError({ message:'Your browser could not complete that action. Please try again.' }); }
      return;
    }
    if (!onAction) { setError({ message: 'This action is unavailable. Please use the website navigation.' }); return; }
    setActionBusy(true); setStatus(''); setError(null);
    try {
      const result = await onAction(action.id, { confirmed, blueprint: blueprintOverride, conversation: conversationOverride.slice(-3), context });
      if (result?.ok !== true) throw new Error(result?.error || 'The action was not completed. Please try again.');
      setStatus(result.message || 'Action completed.'); setConfirmation(null);
      setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: result.message || 'Action completed.' }]);
      if (action.id === 'return_previous') panel.current?.querySelector('[aria-label="Close NyrixGPT"]')?.focus();
    } catch (reason) { setError({ message: reason.message || 'The action was not completed.' }); }
    finally { setActionBusy(false); }
  };
  const websiteClick = (event, path) => {
    if (!onAction || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const registered = Object.entries(actionRegistry).find(([, action]) => action.path === path && action.type === 'navigate');
    if (!registered) return;
    event.preventDefault();
    executeAction({ id: registered[0], ...registered[1] });
  };
  const tourMove = async (next, navigate = true) => {
    if (!tour || actionBusy) return;
    const step = tour.steps[next];
    if (!step) { setTour(null); setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: 'Tour finished. What would you like to explore next?' }]); return; }
    if (navigate && step.actionId) {
      setActionBusy(true);
      try { const result = await onAction?.(step.actionId, { confirmed: false, context, tourId: tour.id }); if (result?.ok !== true) throw new Error(result?.error || 'This tour step is unavailable.'); }
      catch (reason) { setError({ message: reason.message }); setActionBusy(false); return; }
      setActionBusy(false);
    }
    setError(null); setStepIndex(next); setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: `${step.title}. ${step.body || step.description || ''} Say next, skip or exit tour.` }]);
  };
  const startTour = async selected => {
    if (actionBusy) return;
    setError(null);
    if (selected.steps[0]?.actionId) {
      setActionBusy(true);
      try { const result = await onAction?.(selected.steps[0].actionId, { confirmed: false, context, tourId: selected.id }); if (result?.ok !== true) throw new Error(result?.error || 'This tour step is unavailable.'); }
      catch (reason) { setError({ message: reason.message }); setActionBusy(false); return; }
      setActionBusy(false);
    }
    setTour(selected); setStepIndex(0); const first = selected.steps[0]; setMessages(previous => [...previous, { id: newId(), role: 'assistant', content: `${first.title}. ${first.body || first.description || ''} Say next, skip or exit tour.` }]);
  };
  const workspaceKeys = (event, name) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'conversation' : event.key === 'End' ? 'blueprint' : name === 'conversation' ? 'blueprint' : 'conversation';
    setTab(next); panel.current?.querySelector(`#nyrixgpt-tab-${next}`)?.focus();
  };
  const reset = () => {
    stop(); setMessages([]); setDraft(''); setBlueprint(null); setError(null); setStatus('Conversation cleared.'); setConfirmation(null); lastRequest.current = null; session.current = null;
    try { sessionStorage.removeItem(SESSION_KEY); } catch (_) { /* Storage is optional. */ }
    composer.current?.focus();
  };
  if (!mounted) return null;
  return createPortal(<div className="nyrixgpt-root" ref={root}>
    <button type="button" className="nyrixgpt-trigger" ref={trigger} hidden={open} aria-label="Ask NyrixGPT" aria-haspopup="dialog" aria-expanded={open} aria-controls="nyrixgpt-panel" onClick={() => { setOpen(true); setStatus(''); }}><ChatIcon /><span>Ask NyrixGPT</span></button>
    {open && <div className="nyrixgpt-overlay">
      {mobile && <div className="nyrixgpt-backdrop" aria-hidden="true" onClick={close} />}
      <section id="nyrixgpt-panel" className="nyrixgpt-panel" role="dialog" aria-modal={mobile ? 'true' : undefined} aria-labelledby="nyrixgpt-title" aria-describedby="nyrixgpt-description" ref={panel} onKeyDown={keyDown}>
        <header className="nyrixgpt-header"><div><h2 id="nyrixgpt-title">NyrixGPT</h2><p id="nyrixgpt-description">A guide to Nyrix. A starting point for your next decision.</p></div><div className="nyrixgpt-header-controls">{canReturn && <button type="button" className="nyrixgpt-icon-button" aria-label="Return to previous page" title="Return to previous page" disabled={busy || actionBusy} onClick={() => executeAction({ id: 'return_previous', type: 'navigate', label: 'Return to previous page' })}>←</button>}<button type="button" className="nyrixgpt-icon-button" aria-label="Close NyrixGPT" onClick={close}>×</button></div></header>
        <div className="nyrixgpt-tabs" role="tablist" aria-label="NyrixGPT workspace">
          {['conversation', 'blueprint'].map(name => <button key={name} type="button" role="tab" id={`nyrixgpt-tab-${name}`} aria-label={name === 'conversation' ? 'Conversation' : 'Blueprint'} aria-selected={tab === name} tabIndex={tab === name ? 0 : -1} aria-controls={`nyrixgpt-${name}`} onKeyDown={event => workspaceKeys(event, name)} onClick={() => setTab(name)}>{name === 'conversation' ? 'Conversation' : 'Blueprint'}{name === 'blueprint' && blueprint && <span className="nyrixgpt-dot" aria-hidden="true" />}</button>)}
          <button type="button" className="nyrixgpt-clear" onClick={reset} disabled={busy || actionBusy}>Clear</button>
        </div>
        <div className="nyrixgpt-content">
          <div role="tabpanel" id="nyrixgpt-conversation" aria-labelledby="nyrixgpt-tab-conversation" hidden={tab !== 'conversation'}>
            {!messages.length && <div className="nyrixgpt-welcome"><p className="nyrixgpt-context">{context.title ? `Exploring ${context.title}` : 'Where would you like to begin?'}</p><h3>A clearer<br />next step.</h3><p>Ask about our work, describe a problem, or tell me where you would like to go.</p></div>}
            <div role="log" aria-label="Conversation" aria-live="off" className="nyrixgpt-messages">
              {messages.map(message => <article className={`nyrixgpt-message nyrixgpt-message--${message.role}`} key={message.id}><h3>{message.role === 'user' ? 'You' : 'NyrixGPT'}</h3><p className="nyrixgpt-message-text">{message.content}</p>{message.citations?.length > 0 && <nav className="nyrixgpt-sources" aria-label="Sources"><h4>Sources</h4>{message.citations.map((citation, i) => <Link to={safeUrl(citation.url)} onClick={event => websiteClick(event, citation.url)} key={`${citation.id}-${i}`}>{citation.title}<span aria-hidden="true">↗</span></Link>)}</nav>}</article>)}
              {partial && <article className="nyrixgpt-message nyrixgpt-message--assistant" aria-label="Response in progress"><h3>NyrixGPT</h3><p className="nyrixgpt-message-text">{partial}</p><p className="nyrixgpt-small">Response in progress</p></article>}
              <div ref={lastMessage} />
            </div>
          </div>
          <div role="tabpanel" id="nyrixgpt-blueprint" aria-labelledby="nyrixgpt-tab-blueprint" hidden={tab !== 'blueprint'} className="nyrixgpt-blueprint">
            <h3>Your project blueprint</h3><p>A working draft to review with the Nyrix team.</p>
            {blueprint ? <><div className="nyrixgpt-blueprint-fields">{BLUEPRINT_FIELDS.map(([key, label]) => { const [parent, child] = key.split('.'); const field = child ? blueprint[parent]?.[child] : blueprint[key]; const id = `nyrixgpt-blueprint-${key.replace('.', '-')}`; return <div key={key}><label htmlFor={id}>{label}</label><textarea id={id} rows={LIST_FIELDS.has(key) ? 3 : 2} maxLength={2000} value={Array.isArray(field) ? field.join('\n') : typeof field === 'string' ? field : ''} onChange={event => { const value = LIST_FIELDS.has(key) ? event.target.value.split('\n') : event.target.value; setBlueprint(previous => child ? { ...previous, [parent]: { ...previous[parent], [child]: value } } : { ...previous, [key]: value }); }} /></div>; })}</div></> : <div className="nyrixgpt-blueprint-empty"><p>Tell us the decision, workflow and constraints in the conversation. Ask NyrixGPT to outline a project blueprint.</p></div>}
          </div>
          {error && <div className="nyrixgpt-error" role="alert"><p>{error.message}</p>{error.retryAfter && <p>Try again in {error.retryAfter} seconds.</p>}{lastRequest.current && !busy && <button type="button" className="nyrixgpt-secondary" onClick={() => send(true)}>Retry response</button>}<nav aria-label="Continue on the website" className="nyrixgpt-fallback"><Link to="/what-we-do" onClick={event => websiteClick(event, '/what-we-do')}>Explore our approach</Link><Link to="/products" onClick={event => websiteClick(event, '/products')}>Explore products</Link><Link to="/contact" onClick={event => websiteClick(event, '/contact')}>Contact Nyrix</Link></nav></div>}
          <p className="nyrixgpt-status" role="status">{status}</p>
        </div>
        <form className="nyrixgpt-composer" onSubmit={event => { event.preventDefault(); setTab('conversation'); send(false); }}>
          <label className="nyrixgpt-sr-only" htmlFor="nyrixgpt-message">Message NyrixGPT</label><textarea id="nyrixgpt-message" ref={composer} placeholder="What are you working on?" rows="2" maxLength={MAX_MESSAGE} value={draft} readOnly={busy} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); if (!busy) { setTab('conversation'); send(false); } } }} />
          <div className="nyrixgpt-composer-bottom"><span>{draft.length > 1600 ? `${draft.length.toLocaleString()} / 2,000` : 'Shift + Enter for a new line'}</span>{busy ? <button type="button" className="nyrixgpt-primary" onClick={stop}>Stop response</button> : <button type="submit" className="nyrixgpt-primary" disabled={!draft.trim() || actionBusy}>Send message<span aria-hidden="true">↑</span></button>}</div>
          <p className="nyrixgpt-privacy">AI can be wrong. Check the sources. Messages are sent to the AI provider; this browser does not save the conversation. Avoid sensitive information.</p>
        </form>
      </section>
    </div>}
  </div>, document.body);
}
