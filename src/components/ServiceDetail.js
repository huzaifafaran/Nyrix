import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./ServicePage.css";
import EmphasizedTitle from "./EmphasizedTitle";

/* Hallmark · pre-emit critique: P4 H4 E4 S4 R5 V3 */
export default function ServiceDetail({ page }) {
  return (
    <article className="sp-service">
      <section className="sp-intro" aria-labelledby="sp-title">
        <div className="site-container sp-intro-grid">
          <div className="sp-intro-copy">
            <Link className="sp-back" to="/solutions">← All solutions</Link>
            <p className="sp-index">Solutions / {page.index}</p>
            <h1 id="sp-title"><EmphasizedTitle text={page.headline} /></h1>
            <p className="sp-lead">{page.lead}</p>
            <Link className="sp-primary-link" to="/contact">
              Talk to our team <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <figure className="sp-intro-media">
            <img src={page.media} alt={page.mediaAlt} width="960" height="640" fetchpriority="high" />
            <figcaption>{page.title}</figcaption>
          </figure>
        </div>
      </section>

      <section className="sp-context" aria-labelledby="sp-context-title">
        <div className="site-container sp-context-grid">
          <p className="sp-section-label">The opportunity</p>
          <div>
            <h2 id="sp-context-title">{page.fitTitle}</h2>
            <p>{page.fit}</p>
          </div>
        </div>
      </section>

      <section className="sp-approach" aria-labelledby="sp-approach-title">
        <div className="site-container">
          <div className="sp-approach-head">
            <p className="sp-section-label">How we approach it</p>
            <h2 id="sp-approach-title">{page.workTitle}</h2>
          </div>
          <div className="sp-approach-list">
            {page.work.map((item, index) => (
              <div className="sp-approach-row" key={item.title}>
                <span className="sp-row-index" aria-hidden="true">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-contact" aria-labelledby="sp-contact-title">
        <div className="site-container sp-contact-inner">
          <div>
            <h2 id="sp-contact-title">{page.closing}</h2>
            <p>{page.closingCopy}</p>
          </div>
          <Link className="sp-primary-link sp-primary-link-light" to="/contact">
            Start a conversation <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </article>
  );
}
