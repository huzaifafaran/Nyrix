/* Nyrix first-party preferences. Optional measurement uses explicit, versioned consent. */
(function () {
  'use strict';
  if (window.NyrixConsent) return;
  var VERSION = 1;
  var KEY = 'nyrix.consent.v1';
  var COOKIE = 'nyrix_consent_v1';
  var ID = 'G-9RVE61MDWE';
  var AGE = 180 * 86400000;
  var state = null;
  var initialized = false;
  var requested = false;
  var expiryTimer;
  var root, banner, overlay, dialog, statistics, message;
  var previousFocus, inertNodes = [];
  var opened = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window['ga-disable-' + ID] = true;
  function consentValues(enabled) {
    return { analytics_storage: enabled ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', functionality_storage: 'denied', personalization_storage: 'denied', security_storage: 'granted' };
  }
  window.gtag('consent', 'default', consentValues(false));

  function cookieValue(name) {
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i += 1) {
      var value = parts[i].trim();
      if (value.indexOf(name + '=') === 0) return decodeURIComponent(value.slice(name.length + 1));
    }
    return null;
  }
  function valid(record) {
    var now = Date.now();
    return record && record.version === VERSION && typeof record.statistics === 'boolean'
      && Number.isFinite(record.decidedAt) && Number.isFinite(record.expiresAt)
      && record.decidedAt <= now + 60000 && record.expiresAt > now
      && record.expiresAt > record.decidedAt && record.expiresAt <= record.decidedAt + AGE;
  }
  function readChoice() {
    try {
      var stored = window.localStorage.getItem(KEY);
      if (!stored) return null;
      if (cookieValue(COOKIE) !== stored) { clearChoice(); return null; }
      var record = JSON.parse(stored);
      if (valid(record)) return record;
      clearChoice();
      return null;
    } catch (_) { return null; }
  }
  function cookieSuffix() { return '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); }
  function clearChoice() {
    try { window.localStorage.removeItem(KEY); } catch (_) { /* Storage may be blocked. */ }
    try { document.cookie = COOKIE + '=; Max-Age=0' + cookieSuffix(); } catch (_) { /* Fail closed in memory as well. */ }
  }
  function saveChoice(enabled) {
    var now = Date.now();
    var record = { version: VERSION, statistics: enabled, decidedAt: now, expiresAt: now + AGE };
    try {
      var value = JSON.stringify(record);
      window.localStorage.setItem(KEY, value);
      document.cookie = COOKIE + '=' + encodeURIComponent(value) + '; Max-Age=' + (AGE / 1000) + cookieSuffix();
      if (window.localStorage.getItem(KEY) !== value || cookieValue(COOKIE) !== value) throw new Error('Choice storage unavailable');
      return record;
    } catch (_) { clearChoice(); return null; }
  }
  function clearAnalyticsCookies() {
    try {
      var domains = [''];
      var host = location.hostname.split('.');
      for (var i = 0; i < host.length - 1; i += 1) {
        var domain = host.slice(i).join('.');
        domains.push('; Domain=' + domain, '; Domain=.' + domain);
      }
      var paths = ['/'];
      var pieces = location.pathname.split('/').filter(Boolean);
      for (var n = 1; n <= pieces.length; n += 1) {
        var current = '/' + pieces.slice(0, n).join('/');
        paths.push(current, current + '/');
      }
      document.cookie.split(';').forEach(function (entry) {
        var name = entry.split('=')[0].trim();
        if (!/^_(?:ga(?:_|$)|gid$|gat(?:_|$)|gac_)/.test(name)) return;
        domains.forEach(function (domain) {
          paths.forEach(function (path) { document.cookie = name + '=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=' + path + domain + '; SameSite=Lax'; });
        });
      });
    } catch (_) { /* JavaScript cannot remove inaccessible or HttpOnly cookies. */ }
  }
  function loadAnalytics() {
    if (requested) return;
    requested = true;
    if (!initialized) {
      initialized = true;
      window.gtag('js', new Date());
      window.gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    }
    var tag = document.createElement('script');
    tag.id = 'nyrix-statistics-tag';
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    tag.onload = function () { if (!state || !state.statistics) clearAnalyticsCookies(); };
    tag.onerror = function () { requested = false; tag.remove(); };
    document.head.appendChild(tag);
  }
  function apply(record) {
    window.clearTimeout(expiryTimer);
    state = record;
    var enabled = !!record && record.statistics === true;
    window['ga-disable-' + ID] = !enabled;
    window.gtag('consent', 'update', consentValues(enabled));
    if (enabled) loadAnalytics();
    else clearAnalyticsCookies();
    if (record) expiryTimer = window.setTimeout(refresh, Math.min(record.expiresAt - Date.now() + 1, 2147483647));
    if (statistics) statistics.checked = enabled;
    updateBanner();
    window.dispatchEvent(new CustomEvent('NyrixConsentChange', { detail: { version: VERSION, statistics: enabled, saved: !!record } }));
  }
  function updateBanner() {
    if (!banner) return;
    banner.hidden = !!state || opened;
    document.body.classList.toggle('nyrix-consent-banner-visible', !banner.hidden);
    document.body.style.setProperty('--nyrix-consent-offset', (banner.hidden ? 0 : banner.offsetHeight + 40) + 'px');
  }
  function closePreferences() {
    if (!opened) return;
    opened = false;
    overlay.hidden = true;
    document.body.classList.remove('nyrix-consent-dialog-open');
    inertNodes.forEach(function (entry) { entry.node.inert = entry.previous; });
    inertNodes = [];
    updateBanner();
    if (previousFocus && previousFocus.isConnected && !previousFocus.closest('[hidden]')) previousFocus.focus({ preventScroll: true });
  }
  function openPreferences(invoker) {
    if (!root || opened) return;
    apply(readChoice());
    previousFocus = invoker && typeof invoker.focus === 'function' ? invoker : document.activeElement;
    opened = true;
    overlay.hidden = false;
    message.textContent = '';
    document.body.classList.add('nyrix-consent-dialog-open');
    Array.prototype.forEach.call(document.body.children, function (node) {
      if (node === root || /^(?:SCRIPT|STYLE|LINK)$/.test(node.tagName)) return;
      inertNodes.push({ node: node, previous: !!node.inert });
      node.inert = true;
    });
    updateBanner();
    dialog.querySelector('[data-consent-action="close"]').focus();
  }
  function choose(enabled) {
    // Withdrawal takes effect before any persistence operation can fail.
    if (!enabled) apply(null);
    var record = saveChoice(enabled);
    apply(record);
    if (!record) {
      var error = 'We couldn’t save your choice in this browser. Optional statistics stay off.';
      root.querySelectorAll('[data-consent-message]').forEach(function (node) { node.textContent = error; });
      return;
    }
    root.querySelectorAll('[data-consent-message]').forEach(function (node) { node.textContent = ''; });
    closePreferences();
  }
  function mount() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'nyrix-consent-root';
    root.innerHTML = '<section class="nyrix-consent-banner" aria-label="Cookie choices" hidden>'
      + '<div><h2>Your privacy, your choice.</h2><p>Optional statistics help us understand site use. They stay off until you agree. <a href="/privacy-policy#cookies">Privacy details</a></p><p class="nyrix-consent-message" data-consent-message role="status"></p></div>'
      + '<div class="nyrix-consent-actions"><button type="button" data-consent-action="reject">Reject all</button><button type="button" data-consent-action="accept">Accept all</button><button type="button" data-consent-action="preferences">Preferences</button></div></section>'
      + '<div class="nyrix-consent-overlay" hidden><section class="nyrix-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="nyrix-consent-title" aria-describedby="nyrix-consent-description" tabindex="-1">'
      + '<div class="nyrix-consent-heading"><h2 id="nyrix-consent-title">Cookie preferences</h2><button type="button" data-consent-action="close" aria-label="Close cookie preferences">Close</button></div>'
      + '<p id="nyrix-consent-description">Choose whether to allow optional statistics. You can change this at any time from the footer.</p>'
      + '<div class="nyrix-consent-category"><div><h3>Necessary</h3><p>Essential site functions and remembering your choice.</p></div><span>Always on</span></div>'
      + '<label class="nyrix-consent-category" for="nyrix-consent-statistics"><span><strong>Optional statistics</strong><span>Google Analytics helps us understand page use. It is not needed to use the website.</span></span><input id="nyrix-consent-statistics" type="checkbox"></label>'
      + '<p>Your choice is stored on this device for up to 180 days. <a href="/privacy-policy#cookies">Read the privacy details</a>.</p><p class="nyrix-consent-message" data-consent-message role="status"></p>'
      + '<div class="nyrix-consent-actions"><button type="button" data-consent-action="reject">Reject all</button><button type="button" data-consent-action="accept">Accept all</button><button type="button" data-consent-action="save">Save preferences</button></div></section></div>';
    document.body.appendChild(root);
    banner = root.querySelector('.nyrix-consent-banner');
    overlay = root.querySelector('.nyrix-consent-overlay');
    dialog = root.querySelector('[role="dialog"]');
    statistics = root.querySelector('#nyrix-consent-statistics');
    message = dialog.querySelector('[data-consent-message]');
    root.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent-action]');
      if (!button) { if (event.target === overlay) closePreferences(); return; }
      var action = button.getAttribute('data-consent-action');
      if (action === 'preferences') openPreferences(button);
      if (action === 'close') closePreferences();
      if (action === 'accept') choose(true);
      if (action === 'reject') choose(false);
      if (action === 'save') choose(statistics.checked === true);
    });
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { event.preventDefault(); closePreferences(); return; }
      if (event.key !== 'Tab') return;
      var controls = dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled)');
      var first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    if (window.ResizeObserver) new ResizeObserver(updateBanner).observe(banner);
    window.addEventListener('resize', updateBanner);
    updateBanner();
  }
  window.NyrixConsent = { version: VERSION, open: openPreferences, getState: function () { return { version: VERSION, statistics: !!state && state.statistics === true, saved: !!state, expiresAt: state ? state.expiresAt : null }; } };
  function refresh() { apply(readChoice()); }
  window.addEventListener('storage', function (event) { if (!event.key || event.key === KEY) refresh(); });
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) refresh(); });
  refresh();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
}());
