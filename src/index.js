import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// A direct slash/case variant can serve the canonical snapshot; match its route
// before hydration while retaining the visitor's query and fragment.
const { pathname, search, hash } = window.location;
const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').toLowerCase() || '/';
if (normalizedPath !== pathname) {
  window.history.replaceState(window.history.state, '', `${normalizedPath}${search}${hash}`);
}

const container = document.getElementById('root');
const application = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Keep useful static route content in place while its interactive code is attached.
if (container.dataset.prerendered === 'true') {
  ReactDOM.hydrateRoot(container, application);
} else {
  ReactDOM.createRoot(container).render(application);
}
