import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => (
  <article className="privacy-policy">
    <div className="site-container">
      <header className="privacy-header">
        <Link className="privacy-back" to="/"><span aria-hidden="true">←</span> Back to home</Link>
        <h1>Privacy <span>Policy</span></h1>
      </header>

      <div className="privacy-content">
        <section className="policy-section">
          <h2>Our approach to privacy</h2>
          <p>Last updated: <time dateTime="2026-11-18">18 November 2026</time></p>
          <p>This notice explains how NYRIX AI (PRIVATE) LIMITED (“Nyrix”, “we”, “us” and “our”) handles information when you visit nyrix.co, contact us, use NyrixGPT or follow links from this website. It covers this website; a separate agreement or notice may apply to a client project or product.</p>
          <p>Office address: 4th Floor, Mega Mall, Plot #118/9, Block 18, Gulistan-e-Johar, Karachi 75290, Pakistan.</p>
          <p>For a privacy request or a question about this notice, email <a href="mailto:hello@nyrix.co">hello@nyrix.co</a>.</p>
        </section>

        <section className="policy-section">
          <h2>Information we receive</h2>
          <ul>
            <li><strong>Enquiries and correspondence.</strong> If you contact us, we receive the information you choose to share. The website enquiry form asks for your name, work email, organisation and a description of the decision or workflow you want to improve. Emails and career enquiries can also include a resume, portfolio or other attachments you send.</li>
            <li><strong>NyrixGPT.</strong> If you use the assistant, we process the messages you enter and the recent conversation context and current page sent with your request. If you choose to prepare an enquiry from a blueprint, you can review and edit it before sending.</li>
            <li><strong>Technical and usage information.</strong> Our hosting and service providers may receive information such as your IP address, browser or device details, requested pages, timestamps and error information when they deliver and protect the website. NyrixGPT also uses a random session identifier and hashed network and session signals to limit abuse and monitor aggregate usage and cost.</li>
            <li><strong>Optional statistics.</strong> If you agree to statistics cookies, Google Analytics receives website usage information. See the cookie section below for your choices.</li>
          </ul>
          <p>Please do not put passwords, sensitive personal information or confidential customer records in an enquiry or NyrixGPT message.</p>
        </section>

        <section className="policy-section">
          <h2>How we use information</h2>
          <p>We use information to respond to enquiries and applications, arrange conversations you request, provide NyrixGPT responses, operate and improve the website, maintain security, prevent abuse and meet applicable legal obligations. We use optional analytics to understand site usage only when you agree.</p>
          <p>Where applicable privacy laws require a legal basis, the basis depends on the activity: for example, your consent for optional statistics, steps taken at your request before entering an agreement, or our legitimate interests in responding, securing and operating the website. You may withdraw consent for optional statistics at any time.</p>
        </section>

        <section className="policy-section" id="cookies">
          <h2>Cookies and similar technologies</h2>
          <p>Optional Google Analytics statistics stay off until you explicitly accept them. Our first-party cookie controls let you accept, reject or choose statistics separately. Reopen Cookie preferences in the footer to change or withdraw your choice.</p>
          <p>We remember your versioned choice in this browser’s local storage and a necessary same-site cookie for up to 180 days. If the choice cannot be saved, optional statistics remain off. Withdrawing disables further analytics collection and removes accessible Google Analytics cookies where possible; it cannot recall data already transmitted. You can also manage stored data through your browser.</p>
          <p>NyrixGPT uses browser session storage for a random session identifier used for service limits; it does not save your conversation there by default. Other essential browser storage may be used to make requested website features work.</p>
        </section>

        <section className="policy-section">
          <h2>NyrixGPT and AI processing</h2>
          <p>Messages you voluntarily enter in NyrixGPT are sent to the configured AI provider to answer your request. The current provider is OpenAI. Relevant recent conversation context and the current page are also sent so the assistant can respond. NyrixGPT is an AI assistant, and its answers can be inaccurate; check important information before relying on it.</p>
          <p>Nyrix does not store chat transcripts by default. The conversation is designed to remain in the page’s memory while you use it, and a reload clears the in-page conversation. A small, time-limited cache is restricted to predefined public questions without conversation history. If you choose to prepare an enquiry, its draft is shown to you for review; it is not sent until you submit it.</p>
          <p>OpenAI’s published documentation says its default abuse-monitoring logs may contain prompts and responses and may be retained for up to 30 days, with exceptions. Provider terms and account settings can affect handling; see <a href="https://developers.openai.com/api/docs/guides/your-data">OpenAI’s data controls</a> for details. Do not enter sensitive or confidential information.</p>
        </section>

        <section className="policy-section">
          <h2>When information is shared</h2>
          <p>We share information with providers that help operate the website and respond to your requests:</p>
          <ul>
            <li><strong>Vercel</strong> hosts the website and runs its server-side functions. Website enquiries are sent through <strong>Resend</strong> to the Nyrix team.</li>
            <li><strong>OpenAI</strong> processes NyrixGPT requests; <strong>Neon</strong> hosts the assistant’s usage and rate-limit ledger. The ledger is designed to store hashed identifiers and operational measurements rather than raw chat transcripts.</li>
            <li><strong>Google Analytics</strong> processes optional site statistics if you consent. If you choose a booking link, the booking flow is provided by Google; links to LinkedIn, YouTube and other external services take you to those services, which have their own privacy practices.</li>
          </ul>
          <p>We may also disclose information where required by law, to protect rights or safety, or in connection with a business transaction, as permitted by applicable law.</p>
        </section>

        <section className="policy-section">
          <h2>How long information is kept</h2>
          <p>For enquiries, resumes and related correspondence, we may retain information for up to eight years after our last relevant communication, depending on the purpose and applicable law. We review whether it remains necessary and delete or anonymise it sooner when it is no longer needed. Particular records may need to be retained longer where required for legal obligations, disputes or an ongoing relationship. Retention in provider systems and backups may differ.</p>
          <p>NyrixGPT’s usage ledger is configured for scheduled cleanup: individual request records are generally eligible for removal after two days; daily and monthly counters expire after their accounting windows, and aggregate metrics and alert records are generally eligible for removal after 35 days. Cleanup can be delayed if scheduled maintenance does not run. Provider logs, email systems and backups have their own retention practices.</p>
        </section>

        <section className="policy-section">
          <h2>Security and international processing</h2>
          <p>We use safeguards appropriate to this website, including HTTPS, server-side credentials, access controls and usage limits. No online system can be guaranteed completely secure.</p>
          <p>Our providers may process information in countries other than your own, including the United States, Singapore and other locations where they operate. When applicable law requires a transfer mechanism or other safeguards, their suitability depends on the transfer and the arrangements in place.</p>
        </section>

        <section className="policy-section">
          <h2>Your choices and rights</h2>
          <p>Depending on where you are and the law that applies, you may have rights to request access to, correction, deletion, restriction or a copy of your information, object to certain processing, or withdraw consent. You may also have the right to complain to a data protection authority. These rights can be subject to exceptions and verification requirements.</p>
          <p>To make a privacy request, contact <a href="mailto:hello@nyrix.co">hello@nyrix.co</a>. We may need enough information to understand and verify your request. Because NyrixGPT does not store chat transcripts by default, we may not be able to identify or retrieve a past conversation.</p>
        </section>

        <section className="policy-section">
          <h2>Children and changes to this notice</h2>
          <p>This website is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child has sent us personal information, please contact us.</p>
          <p>We may update this notice as our practices change. We will publish the revised version here and update the date above.</p>
        </section>
      </div>
    </div>
  </article>
);

export default PrivacyPolicy;

