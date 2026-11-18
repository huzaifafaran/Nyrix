/* Hallmark · inherited Nyrix enterprise system · P5 H4 E4 S5 R5 V4.
 * Sector-specific imagery and editorial decision rows; shared shell remains lead-owned. */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronRight } from "lucide-react";
import EmphasizedTitle from "./EmphasizedTitle";
import { industries, industryIntroduction, researchIntroduction, researchThemes } from "../content/industryContent";
import "./IndustryResearchPages.css";

function Breadcrumb({ company = false, current }) {
  return (
    <nav className="ir-breadcrumb" aria-label="Breadcrumb">
      <Link to={company ? "/company" : "/industries"}>{company ? "Company" : "Industries"}</Link>
      {current ? <><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">{current}</span></> : null}
    </nav>
  );
}

function Conversation({ industry = false }) {
  return (
    <section className="site-container ir-conversation" aria-labelledby="ir-conversation-title">
      <div>
        <h2 id="ir-conversation-title">{industry ? "Bring us the decision that matters in your industry." : "Bring us the decision that matters."}</h2>
        <p>We start with the business problem, then build the intelligence to solve it.</p>
      </div>
      <Link className="button button-primary" to="/contact">Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}

export function IndustriesPage() {
  return (
    <div className="enterprise-page ir-page ir-industries-page">
      <header className="site-container ir-hub-intro">
        <p className="section-kicker">Industries</p>
        <h1 aria-label={industryIntroduction.headline}><EmphasizedTitle text={industryIntroduction.headline} word="decisions" /></h1>
        <p className="ir-lede">{industryIntroduction.description}</p>
      </header>
      <figure className="site-container ir-panorama">
        <img src="/media/enterprise/industries-band.webp" alt="Seven glass planes connected by a violet signal path." width="2064" height="512" fetchpriority="high" />
      </figure>
      <section className="site-container ir-directory" aria-labelledby="ir-directory-title">
        <div className="ir-section-intro">
          <h2 id="ir-directory-title">Explore industries</h2>
          <p>Different operating realities. A shared foundation in decision sciences.</p>
        </div>
        <div className="ir-industry-grid">
          {industries.map((industry) => (
            <article className={`ir-industry-card ir-industry-card--${industry.slug}`} key={industry.slug}>
              <figure className="ir-card-visual">
                <img src={industry.image} alt="" width={industry.imageWidth} height={industry.imageHeight} loading="lazy" />
              </figure>
              <div className="ir-card-copy">
                <h3>{industry.title}</h3>
                <p>{industry.summary}</p>
                <Link className="text-link" to={industry.href} aria-label={`Explore ${industry.title}`}>Explore sector <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Conversation />
    </div>
  );
}

function IndustryNotFound() {
  return (
    <div className="enterprise-page ir-page">
      <header className="site-container ir-hub-intro ir-not-found">
        <p className="section-kicker">Industries</p>
        <h1>This industry could not be found.</h1>
        <p className="ir-lede">Explore the sectors we work across, or speak with us about your business question.</p>
        <Link to="/industries" className="button button-primary">Explore industries <ArrowRight size={16} aria-hidden="true" /></Link>
      </header>
    </div>
  );
}

export function IndustryPage() {
  const { slug } = useParams();
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return <IndustryNotFound />;
  const relatedGroups = [
    { title: "Products", links: industry.productLinks },
    { title: "Solutions", links: industry.solutionLinks },
    { title: "How we work", links: industry.deliveryLinks },
  ].filter((group) => group.links.length > 0);

  return (
    <div className={`enterprise-page ir-page ir-sector-page ir-sector-page--${industry.slug}`}>
      <header className="site-container ir-sector-hero">
        <div className="ir-sector-intro">
          <Breadcrumb current={industry.title} />
          <h1 aria-label={industry.headline}><EmphasizedTitle text={industry.headline} /></h1>
          <p className="ir-lede">{industry.description}</p>
          <a className="text-link" href="#decision-areas">Explore the decisions <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <figure className="ir-sector-visual">
          <img src={industry.image} alt={industry.imageAlt} width={industry.imageWidth} height={industry.imageHeight} fetchpriority="high" />
        </figure>
      </header>
      <section className="site-container ir-decision-section" id="decision-areas" aria-labelledby="ir-decisions-title">
        <div className="ir-section-intro">
          <h2 id="ir-decisions-title">Where intelligence helps</h2>
          <p>Practical decision areas for {industry.title.toLowerCase()} teams.</p>
        </div>
        <div className="ir-decision-list">
          {industry.decisionAreas.map((area) => (
            <article className="ir-decision-row" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ir-outcomes" aria-labelledby="ir-outcomes-title">
        <div className="site-container ir-outcomes-inner">
          <h2 id="ir-outcomes-title">Designed to support</h2>
          <ul>{industry.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </div>
      </section>
      <section className="site-container ir-related" aria-labelledby="ir-related-title">
        <h2 id="ir-related-title">The intelligence behind the work.</h2>
        <div className="ir-related-groups">
          {relatedGroups.map((group) => (
            <div className="ir-related-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.links.map((link) => <li key={link.href}><Link className="text-link" to={link.href}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></Link></li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <Conversation industry />
    </div>
  );
}

export function ResearchPage() {
  return (
    <div className="enterprise-page ir-page ir-research-page">
      <header className="site-container ir-research-hero">
        <div className="ir-research-intro">
          <Breadcrumb company current="Research & development" />
          <h1 aria-label={researchIntroduction.headline}><EmphasizedTitle text={researchIntroduction.headline} word="depth" /></h1>
          <p className="ir-lede">{researchIntroduction.description}</p>
          <Link to="/what-we-do" className="text-link">Explore our approach <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <figure className="ir-research-visual">
          <img src={researchIntroduction.image} alt="Layered glass research architecture with interconnected violet pathways." width="1152" height="928" fetchpriority="high" />
        </figure>
      </header>
      <section className="site-container ir-research-themes" aria-labelledby="ir-research-themes-title">
        <div className="ir-section-intro">
          <h2 id="ir-research-themes-title">Research, connected to delivery.</h2>
          <p>Enterprise constraints inform the methods, models and engineering.</p>
        </div>
        <div className="ir-research-theme-list">
          {researchThemes.map((theme) => (
            <article className="ir-decision-row" key={theme.title}>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </article>
          ))}
        </div>
        <Link to="/company/team" className="text-link ir-team-link">Meet the team <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
      <Conversation />
    </div>
  );
}
