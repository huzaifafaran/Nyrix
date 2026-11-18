import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NyrixGPT from './NyrixGPT';
import actions from '../content/nyrixGptActions.json';
import { bookingUrl } from '../content/nyrixContent';
import './NyrixAssistantHost.css';

export function findAction(id) {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(actions, id) ? { id, ...actions[id] } : null;
}
export function prepareInquiry(blueprint) {
  if (!blueprint || typeof blueprint.problem !== 'string') return '';
  const lines = [`Problem: ${blueprint.problem}`];
  if (typeof blueprint.outcome === 'string' && blueprint.outcome) lines.push(`Desired outcome: ${blueprint.outcome}`);
  if (Array.isArray(blueprint.proposedAiWorkflow)) lines.push(`Proposed workflow: ${blueprint.proposedAiWorkflow.filter(x => typeof x === 'string').join('; ')}`);
  return lines.join('\n\n').slice(0, 3000);
}
export function resolveNavigation(message, available = []) {
  if (typeof message !== 'string' || !Array.isArray(available)) return null;
  const command = message.trim().toLowerCase().match(/^(?:go to|open|take me to|navigate to)\s+(?:the\s+)?(.+?)[.!?]*$/);
  if (!command) return null;
  const target = command[1].replace(/\s+page$/, '').trim();
  const alias = { 'case studies': 'case_studies', 'our team': 'team', team: 'team', insights: 'insights', 'the next question': 'tnq', 'kinlu voice': 'kinlu_voice', kinlu: 'kinlu', contact: 'contact', solutions: 'solutions', products: 'products', 'what we do': 'services', careers: 'careers', 'genix': 'case_genix' };
  const id = alias[target];
  return id && available.some(action => action?.id === id) ? id : null;
}
const tours = [
  { id: 'founder', title: 'Founder', steps: [
    { id: 'work', title: 'Start with your decision', body: 'See how Nyrix frames a business problem before building.', actionId: 'decision_framing' },
    { id: 'proof', title: 'Explore public work', body: 'See examples of work and proofs of concept.', actionId: 'case_studies' },
    { id: 'talk', title: 'Find the right next step', body: 'Share your context when you are ready.', actionId: 'contact' },
  ] },
  { id: 'technology', title: 'Technology lead', steps: [
    { id: 'engineering', title: 'Engineering and integration', body: 'Explore the productisation and engineering approach.', actionId: 'productisation' },
    { id: 'governance', title: 'Governed delivery', body: 'Consider operating controls and ownership.', actionId: 'governance' },
    { id: 'research', title: 'Research in practice', body: 'Meet the research and development work.', actionId: 'research' },
  ] },
  { id: 'marketing', title: 'Marketing lead', steps: [
    { id: 'audience', title: 'Understand your audience', body: 'Explore audience intelligence.', actionId: 'solution_audience' },
    { id: 'marketing', title: 'Find opportunity', body: 'See how marketing opportunity intelligence is framed.', actionId: 'solution_marketing' },
    { id: 'stories', title: 'See public work', body: 'Explore examples from Nyrix.', actionId: 'case_studies' },
  ] },
];
export default function NyrixAssistantHost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [previousLocation, setPreviousLocation] = useState(null);
  const highlightTimer = useRef(null);
  useEffect(() => () => clearTimeout(highlightTimer.current), []);
  const onAction = useCallback(async (id, options = {}) => {
    if (id === 'return_previous') {
      if (!previousLocation) return { ok: false, message: 'There is no previous page to return to.' };
      navigate(previousLocation); setPreviousLocation(null);
      return { ok: true, message: 'Returning to your previous page.' };
    }
    const action = findAction(id);
    if (!action) return { ok: false, message: 'That destination is unavailable.' };
    if (id === 'booking') {
      if (!options.confirmed) return { ok: false, message: 'Please confirm before opening the booking page.' };
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
      return { ok: true, message: 'Your browser was asked to open the booking page. No appointment has been made.' };
    }
    const draft = id === 'prepare_inquiry' ? prepareInquiry(options.blueprint) : '';
    const fragment = action.path.split('#')[1];
    setPreviousLocation(`${location.pathname}${location.search}${location.hash}`);
    navigate(action.path, { state: draft ? { nyrixInquiryDraft: draft } : undefined });
    if (fragment) {
      const started = Date.now();
      const highlight = () => {
        const element = document.getElementById(fragment);
        if (!element && Date.now() - started < 5000) return setTimeout(highlight, 100);
        if (!element) return;
        element.scrollIntoView?.({ behavior: 'auto', block: 'start' });
        element.classList.add('nyrix-assistant-highlight');
        clearTimeout(highlightTimer.current);
        highlightTimer.current = setTimeout(() => element.classList.remove('nyrix-assistant-highlight'), 2200);
      };
      setTimeout(highlight, 100);
    }
    return { ok: true, message: draft ? 'Your draft is ready to review and edit before sending.' : `Opening ${action.label}.` };
  }, [navigate, location, previousLocation]);
  return <NyrixGPT context={{ path: location.pathname, title: typeof document === 'undefined' ? '' : document.title }} onAction={onAction} resolveNavigation={resolveNavigation} canReturn={!!previousLocation} tours={tours} />;
}
