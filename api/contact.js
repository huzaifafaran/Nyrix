"use strict";
const { createHash, randomUUID } = require("node:crypto");

const MAX_BYTES = 16 * 1024;
const RECIPIENT = "hello@nyrix.co";
const WINDOW_MS = 10 * 60 * 1000;
const SINGLE_LINE_CONTROLS = /[\u0000-\u001f\u007f]/;
const EMAIL = /^[^\s@<>"(),;:\\]+@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const FIELDS = ["name", "email", "organisation", "decision", "website", "requestId"];

function httpError(status, message) { return Object.assign(new Error(message), { status }); }
function header(req, name) { return typeof req.headers?.[name] === "string" ? req.headers[name] : ""; }
function respond(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(body));
}
function validEmail(value) {
  return typeof value === "string" && value.length <= 254 && EMAIL.test(value) && value.split("@")[0].length <= 64 && !value.startsWith(".") && !value.includes("..") && !value.includes(".@");
}
function validFrom(value) {
  if (typeof value !== "string" || SINGLE_LINE_CONTROLS.test(value) || value.length > 320) return false;
  const address = value.trim().match(/^(?:[^<>]{1,80}\s*)?<([^<>]+)>$/);
  return validEmail(address ? address[1].trim() : value.trim());
}
function sameOrigin(req, allowedOrigins) {
  const origin = header(req, "origin");
  if (!origin || origin === "null") return false;
  try {
    const parsed = new URL(origin);
    if (parsed.origin !== origin || !["http:", "https:"].includes(parsed.protocol)) return false;
    const host = header(req, "host");
    if (!host || /[\s/\\]/.test(host)) return false;
    const hostname = new URL(`http://${host}`).hostname;
    const loopback = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
    const expected = new URL(`${loopback ? "http" : "https"}://${host}`).origin;
    return origin === expected || allowedOrigins.includes(origin);
  } catch { return false; }
}

async function readBody(req) {
  const length = header(req, "content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BYTES)) throw httpError(413, "Your enquiry is too large. Please shorten it and try again.");
  let raw;
  if (req.body !== undefined) {
    raw = typeof req.body === "string" || Buffer.isBuffer(req.body) ? req.body : JSON.stringify(req.body);
  } else {
    raw = await new Promise((resolve, reject) => {
      const chunks = [];
      let size = 0;
      const finish = (error, body) => {
        clearTimeout(timeout);
        req.removeListener("data", onData); req.removeListener("end", onEnd); req.removeListener("error", onError); req.removeListener("aborted", onAbort);
        if (error) { req.resume?.(); reject(error); } else resolve(body);
      };
      const onData = (chunk) => {
        const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += bytes.length;
        if (size > MAX_BYTES) finish(httpError(413, "Your enquiry is too large. Please shorten it and try again."));
        else chunks.push(bytes);
      };
      const onEnd = () => finish(null, Buffer.concat(chunks));
      const onError = () => finish(httpError(400, "We couldn’t read your enquiry. Please try again."));
      const onAbort = () => finish(httpError(400, "The enquiry was interrupted. Please try again."));
      const timeout = setTimeout(() => finish(httpError(408, "The enquiry took too long to arrive. Please try again.")), 10000);
      timeout.unref?.();
      req.on("data", onData); req.once("end", onEnd); req.once("error", onError); req.once("aborted", onAbort);
    });
  }
  if (raw === undefined || Buffer.byteLength(raw) > MAX_BYTES) throw httpError(413, "Your enquiry is too large. Please shorten it and try again.");
  try { return JSON.parse(raw.toString()); }
  catch { throw httpError(400, "We couldn’t read your enquiry. Please try again."); }
}

function validate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some((key) => !FIELDS.includes(key))) return { error: "Please use the enquiry form and check the details." };
  const errors = {};
  const values = {};
  for (const key of ["name", "email", "organisation", "decision"]) values[key] = typeof body[key] === "string" ? body[key].trim() : "";
  if (values.name.length < 2 || values.name.length > 150 || SINGLE_LINE_CONTROLS.test(values.name)) errors.name = "Enter your name using 2 to 150 characters.";
  if (!validEmail(values.email)) errors.email = "Enter a valid email address.";
  if (values.organisation.length < 2 || values.organisation.length > 200 || SINGLE_LINE_CONTROLS.test(values.organisation)) errors.organisation = "Enter your organisation using 2 to 200 characters.";
  if (values.decision.length < 10 || values.decision.length > 3000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(values.decision)) errors.decision = "Describe the decision or workflow using 10 to 3,000 characters.";
  if (body.website !== undefined && (typeof body.website !== "string" || body.website.trim())) return { error: "We couldn’t accept this enquiry. Please email us directly." };
  if (body.requestId !== undefined && (typeof body.requestId !== "string" || !/^[a-z0-9_-]{8,100}$/i.test(body.requestId))) return { error: "Please refresh the form and try again." };
  if (Object.keys(errors).length) return { error: "Please check the highlighted fields.", fields: errors };
  values.decision = values.decision.replace(/\r\n?/g, "\n");
  return { values, requestId: body.requestId || randomUUID() };
}

function createContactHandler({ env = process.env, fetchImpl = globalThis.fetch, now = Date.now, allowedOrigins = [] } = {}) {
  // Per-instance abuse guard only. Never retain enquiry content; serverless instances do not share counters.
  const attempts = new Map();
  function throttle(req) {
    const forwarded = env.VERCEL === "1" ? header(req, "x-forwarded-for").split(",")[0].trim() : "";
    const key = (forwarded || req.socket?.remoteAddress || "unknown").slice(0,100);
    const time = now();
    for (const [id, entry] of attempts) if (entry.until <= time) attempts.delete(id);
    if (!attempts.has(key) && attempts.size >= 1000) attempts.delete(attempts.keys().next().value);
    const entry = attempts.get(key) || { count: 0, until: time + WINDOW_MS };
    entry.count += 1; attempts.set(key, entry);
    return entry.count > 5 ? Math.max(1, Math.ceil((entry.until - time) / 1000)) : 0;
  }
  return async function contact(req, res) {
    if (req.method !== "POST") { res.setHeader("Allow", "POST"); return respond(res, 405, { ok: false, error: "Use the enquiry form to send a message." }); }
    if (!sameOrigin(req, allowedOrigins)) return respond(res, 403, { ok: false, error: "Please send your enquiry from the Nyrix website." });
    if (!/^application\/json(?:\s*;|$)/i.test(header(req, "content-type"))) return respond(res, 415, { ok: false, error: "Please use the enquiry form to send your message." });
    let parsed;
    try { parsed = await readBody(req); }
    catch (error) { return respond(res, error.status || 400, { ok: false, error: error.status ? error.message : "We couldn’t read your enquiry. Please try again." }); }
    const result = validate(parsed);
    if (result.error) return respond(res, 422, { ok: false, error: result.error, ...(result.fields ? { fields: result.fields } : {}) });
    if (!env.RESEND_API_KEY || !validFrom(env.CONTACT_FROM_EMAIL) || typeof fetchImpl !== "function") return respond(res, 503, { ok: false, error: `Sending is temporarily unavailable. Please email ${RECIPIENT} directly.` });
    const retryAfter = throttle(req);
    if (retryAfter) { res.setHeader("Retry-After", String(retryAfter)); return respond(res, 429, { ok: false, error: "Too many enquiries were sent recently. Please wait a few minutes or email us directly." }); }
    const { values } = result;
    const idempotency = createHash("sha256").update(JSON.stringify({ requestId: result.requestId, ...values })).digest("hex");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    timeout.unref?.();
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `nyrix-enquiry/${idempotency}` },
        body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: [RECIPIENT], reply_to: values.email, subject: "Enterprise enquiry — Nyrix", text: `Name: ${values.name}\nWork email: ${values.email}\nOrganisation: ${values.organisation}\n\nThe decision or workflow:\n${values.decision}` }),
        signal: controller.signal,
      });
      const accepted = await response.json().catch(() => null);
      if (!response.ok || typeof accepted?.id !== "string" || !/^[a-z0-9_-]{1,128}$/i.test(accepted.id)) return respond(res, 502, { ok: false, error: "We couldn’t send your enquiry. Your details have been kept. Please try again or email us directly." });
      return respond(res, 200, { ok: true, id: accepted.id });
    } catch (error) {
      return respond(res, error.name === "AbortError" || error.name === "TimeoutError" ? 504 : 502, { ok: false, error: "We couldn’t confirm your enquiry was sent. Your details have been kept. Please try again or email us directly." });
    } finally { clearTimeout(timeout); }
  };
}

module.exports = createContactHandler();
module.exports.createContactHandler = createContactHandler;
