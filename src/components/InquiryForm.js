/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4. Inherits Nyrix controls and typography. */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const enquiryEmail = "hello@nyrix.co";
const fieldNames = ["name", "email", "organisation", "decision"];
// eslint-disable-next-line no-control-regex -- Reject control characters in single-line form values.
const singleLineControls = /[\u0000-\u001f\u007f]/;
const emailPattern = /^[^\s@<>"(),;:\\]+@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function validate(values) {
  const errors = {};
  if (values.name.length < 2 || values.name.length > 150 || singleLineControls.test(values.name)) errors.name = "Enter your name using 2 to 150 characters.";
  if (values.email.length > 254 || !emailPattern.test(values.email) || values.email.split("@")[0].length > 64 || values.email.startsWith(".") || values.email.includes("..") || values.email.includes(".@")) errors.email = "Enter a valid email address.";
  if (values.organisation.length < 2 || values.organisation.length > 200 || singleLineControls.test(values.organisation)) errors.organisation = "Enter your organisation using 2 to 200 characters.";
  // eslint-disable-next-line no-control-regex -- Reject unsafe control characters while allowing message line breaks and tabs.
  if (values.decision.length < 10 || values.decision.length > 3000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(values.decision)) errors.decision = "Describe the decision or workflow using 10 to 3,000 characters.";
  return errors;
}

function newRequestId() {
  return window.crypto?.randomUUID?.() || `enquiry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function InquiryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const pendingRef = useRef(false);
  const requestIdRef = useRef(null);
  const controllerRef = useRef(null);
  const sending = status === "sending";

  useEffect(() => {
    const draft = location.state?.nyrixInquiryDraft;
    if (typeof draft !== 'string' || !draft || !formRef.current) return;
    const field = formRef.current.elements.namedItem('decision');
    if (field && !field.value) field.value = draft.slice(0, 3000);
    navigate(`${location.pathname}${location.search}${location.hash}`, { replace: true, state: null });
  }, [location, navigate]);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    if (status !== "error") return;
    const firstError = fieldNames.find((field) => errors[field]);
    if (firstError) formRef.current?.elements.namedItem(firstError)?.focus();
    else errorRef.current?.focus();
  }, [status, errors]);

  function change() {
    if (pendingRef.current) return;
    setStatus("idle");
    setMessage("");
    setErrors({});
    requestIdRef.current = null;
  }

  async function submit(event) {
    event.preventDefault();
    if (pendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(fieldNames.map((field) => [field, String(data.get(field) || "").trim()]));
    const validation = validate(values);
    if (Object.keys(validation).length) {
      setErrors(validation);
      setMessage("Please check the highlighted fields.");
      setStatus("error");
      return;
    }
    pendingRef.current = true;
    setErrors({});
    setMessage("");
    setStatus("sending");
    requestIdRef.current ||= newRequestId();
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, website: String(data.get("website") || ""), requestId: requestIdRef.current }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true || typeof result?.id !== "string" || !result.id.trim()) {
        setErrors(Object.fromEntries(fieldNames.filter((name) => typeof result?.fields?.[name] === "string").map((name) => [name, result.fields[name]])));
        setMessage(typeof result?.error === "string" ? result.error : "We couldn’t send your enquiry. Your details have been kept. Please try again or email us directly.");
        setStatus("error");
        return;
      }
      form.reset();
      requestIdRef.current = null;
      setMessage("Your enquiry has been submitted. Thank you.");
      setStatus("success");
    } catch (error) {
      setMessage(error.name === "AbortError"
        ? "Sending took too long. Your details have been kept. Please try again or email us directly."
        : "We couldn’t send your enquiry. Your details have been kept. Please try again or email us directly.");
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      controllerRef.current = null;
      pendingRef.current = false;
    }
  }

  const errorProps = (name) => ({ "aria-invalid": errors[name] ? "true" : undefined, "aria-describedby": errors[name] ? `enquiry-${name}-error` : undefined });
  const fieldError = (name) => errors[name] ? <span id={`enquiry-${name}-error`}>{errors[name]}</span> : null;
  return (
    <section className="enterprise-section site-container" aria-labelledby="enquiry-title">
      <div className="revamp-enquiry">
        <div>
          <p className="section-kicker">Get in touch</p>
          <h2 className="section-heading" id="enquiry-title">Tell us how to<br />reach you.</h2>
          <p className="section-copy">Share your contact details and a little context. Our team can follow up with you.</p>
          <p className="revamp-form-note">Send your enquiry directly to Nyrix. You can also email <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>.</p>
        </div>
        <noscript><p className="revamp-form-note">To send an enquiry without JavaScript, <a href={`mailto:${enquiryEmail}`}>email the Nyrix team directly</a>.</p></noscript>
        <form method="post" ref={formRef} onSubmit={submit} onChange={change} noValidate aria-busy={sending}>
          <div className="revamp-form-fields">
            <label htmlFor="enquiry-name"><span id="enquiry-name-label">Your name</span><input id="enquiry-name" name="name" aria-labelledby="enquiry-name-label" autoComplete="name" required minLength={2} maxLength={150} disabled={sending} {...errorProps("name")} />{fieldError("name")}</label>
            <label htmlFor="enquiry-email"><span id="enquiry-email-label">Work email</span><input id="enquiry-email" name="email" type="email" aria-labelledby="enquiry-email-label" autoComplete="email" spellCheck={false} required maxLength={254} disabled={sending} {...errorProps("email")} />{fieldError("email")}</label>
          </div>
          <label htmlFor="enquiry-organisation"><span id="enquiry-organisation-label">Organisation</span><input id="enquiry-organisation" name="organisation" aria-labelledby="enquiry-organisation-label" autoComplete="organization" required minLength={2} maxLength={200} disabled={sending} {...errorProps("organisation")} />{fieldError("organisation")}</label>
          <label htmlFor="enquiry-decision"><span id="enquiry-decision-label">What decision or workflow would you like to improve?</span><textarea id="enquiry-decision" name="decision" aria-labelledby="enquiry-decision-label" rows={5} required minLength={10} maxLength={3000} disabled={sending} {...errorProps("decision")} />{fieldError("decision")}</label>
          <div hidden aria-hidden="true"><label htmlFor="enquiry-website">Website<input id="enquiry-website" name="website" type="text" autoComplete="off" tabIndex={-1} maxLength={200} /></label></div>
          <div className="revamp-form-actions"><button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : status === "error" ? "Try again" : "Send enquiry"}{!sending && <span aria-hidden="true">↗</span>}</button><a className="text-link" href={`mailto:${enquiryEmail}`}>Email us directly</a></div>
          {status === "error" && <div className="revamp-draft" role="alert" ref={errorRef} tabIndex={-1}><p>{message}</p></div>}
          {status === "success" && <div className="revamp-draft" role="status" aria-live="polite"><p>{message}</p></div>}
          <p className="revamp-form-note">Please leave out sensitive customer data. <a href="/privacy-policy">Privacy policy</a></p>
        </form>
      </div>
    </section>
  );
}
