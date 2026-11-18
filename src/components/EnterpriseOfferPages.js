/* Hallmark · design-system: design.md · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import EmphasizedTitle from "./EmphasizedTitle";
import {
  deliveryStages,
  solutionDomains,
  enterpriseProducts,
  enterpriseCases,
} from "../content/enterpriseOfferContent";
import "./EnterpriseOfferPages.css";

function OfferLink({ to, children, className = "", ...props }) {
  return <Link to={to} className={`offer-link ${className}`} {...props}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}

function OfferImage({ item, priority = false, className = "" }) {
  return (
    <figure className={`offer-media ${className}`}>
      <img
        src={item.image}
        srcSet={item.imageSmall ? `${item.imageSmall} 768w, ${item.image} ${item.imageWidth}w` : undefined}
        alt={item.imageAlt || ""}
        width={item.imageWidth || 1152}
        height={item.imageHeight || 928}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        sizes="(max-width: 760px) calc(100vw - 40px), 52vw"
      />
    </figure>
  );
}

function OfferHero({ eyebrow, title, description, image, children, className = "" }) {
  return (
    <header className={`site-container offer-hero ${image ? "offer-hero--split" : ""} ${className}`}>
      <div className="offer-hero-copy">
        {eyebrow ? <p className="offer-kicker">{eyebrow}</p> : null}
        <h1 aria-label={title}><EmphasizedTitle text={title} /></h1>
        <p className="offer-lede">{description}</p>
        {children}
      </div>
      {image ? <OfferImage item={image} priority /> : null}
    </header>
  );
}

function OfferContact({ title = "Bring us the decision that matters.", description = "Tell us about the decision, workflow or customer experience you want to improve." }) {
  return (
    <section className="site-container offer-contact">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="button button-primary" to="/contact">Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}

function OfferBreadcrumb({ parent, label, current }) {
  return (
    <nav className="site-container offer-breadcrumb" aria-label="Breadcrumb">
      <Link to={parent}>{label}</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span>
    </nav>
  );
}

function OfferNotFound({ type }) {
  const product = type === "product";
  return (
    <div className="offer-page">
      <OfferHero title="This page could not be found." description={`Explore our ${product ? "products" : "case studies"} to find a useful starting point.`}>
        <OfferLink to={product ? "/products" : "/case-studies"}>Back to {product ? "products" : "case studies"}</OfferLink>
      </OfferHero>
    </div>
  );
}

export function WhatWeDoPage() {
  return (
    <div className="offer-page offer-delivery-page">
      <OfferHero
        eyebrow="What we do"
        title="From a business question to a working system."
        description="We combine strategic thinking, machine learning and software engineering to turn business strategy into intelligent systems."
        image={{ image: "/media/enterprise/positioning-glass.webp", imageAlt: "Frosted glass layers illustrating the progression from a business question to a working system.", imageWidth: 1152, imageHeight: 928 }}
      >
        <a className="offer-link" href="#decision-framing">How we work <ArrowDown size={16} aria-hidden="true" /></a>
      </OfferHero>
      <div className="site-container offer-stages">
        {deliveryStages.map((stage, index) => (
          <section className="offer-stage" id={stage.id} key={stage.id} aria-labelledby={`stage-${stage.id}`}>
            <div className="offer-stage-heading"><span className="offer-step-number" aria-hidden="true">0{index + 1}</span><h2 id={`stage-${stage.id}`}>{stage.title}</h2></div>
            <div><p>{stage.description}</p><p className="offer-stage-detail">{stage.detail}</p></div>
          </section>
        ))}
      </div>
      <section className="site-container offer-connection">
        <div><h2>Beyond the pilot.<br />Into the work.</h2><p>We connect strategy, engineering, productisation and governance to move AI into dependable enterprise operations.</p></div>
        <div className="offer-connection-links"><OfferLink to="/solutions">Explore our solutions</OfferLink><OfferLink to="/industries">Find your industry</OfferLink></div>
      </section>
      <OfferContact />
    </div>
  );
}

export function EnterpriseSolutionsPage() {
  return (
    <div className="offer-page offer-solutions-page">
      <OfferHero
        eyebrow="Solutions"
        title="Intelligence for the decisions ahead."
        description="Seven domains. A shared foundation in decision sciences, machine learning and enterprise engineering."
        image={{ image: "/media/enterprise/solutions-strip.webp", imageAlt: "A narrow architectural signal field connecting distinct intelligence domains.", imageWidth: 512, imageHeight: 2064 }}
        className="offer-hero--rail"
      >
        <OfferLink to="/what-we-do">See how we work</OfferLink>
      </OfferHero>
      <nav className="site-container offer-domain-nav" aria-label="Solution domains">
        {solutionDomains.map((domain) => <a href={`#${domain.id}`} key={domain.id}>{domain.title.replace(" Intelligence", "")}<ArrowDown size={13} aria-hidden="true" /></a>)}
      </nav>
      <div className="site-container offer-domains">
        {solutionDomains.map((domain) => (
          <section className="offer-domain" id={domain.id} key={domain.id} aria-labelledby={`domain-${domain.id}`}>
            <div><h2 id={`domain-${domain.id}`}>{domain.title}</h2><OfferLink to={domain.industry.href}>{domain.industry.label}</OfferLink></div>
            <div><h3>{domain.question}</h3><p>{domain.description}</p><OfferLink to="/contact">Discuss {domain.title.replace(" Intelligence", "").toLowerCase()}</OfferLink></div>
          </section>
        ))}
      </div>
      <section className="offer-foundation">
        <div className="site-container offer-foundation-inner">
          <h2>One foundation.<br />Different decisions.</h2>
          <div><p>Every domain is delivered on the KINLU foundation and governed by the same data, security and decision-ownership model.</p><OfferLink to="/products/kinlu">Explore KINLU</OfferLink></div>
        </div>
      </section>
      <OfferContact />
    </div>
  );
}

export function EnterpriseProductsPage() {
  return (
    <div className="offer-page offer-products-page">
      <OfferHero eyebrow="Products" title="Two products. One intelligence foundation." description="Predictive intelligence and natural conversations, connected to the systems and decisions in your business." />
      <div className="site-container offer-product-list">
        {enterpriseProducts.map((product) => (
          <article className={`offer-product-entry offer-product-entry--${product.slug}`} key={product.slug}>
            <div className="offer-entry-copy">
              <p className="offer-kicker">{product.category}</p>
              <h2>{product.name}</h2>
              <p className="offer-entry-headline">{product.headline}</p>
              <p>{product.description}</p>
              <OfferLink to={product.href}>Explore {product.name}</OfferLink>
            </div>
            <OfferImage item={product} />
          </article>
        ))}
      </div>
      <section className="site-container offer-connection">
        <div><h2>Built around your existing systems.</h2><p>Discuss the data, infrastructure and operating requirements behind your use case.</p></div>
        <OfferLink to="/what-we-do#governance">Our approach to governance</OfferLink>
      </section>
      <OfferContact />
    </div>
  );
}

export function EnterpriseProductPage() {
  const { slug } = useParams();
  const product = enterpriseProducts.find((item) => item.slug === slug);
  if (!product) return <OfferNotFound type="product" />;
  const voice = product.slug === "kinlu-voice";
  const other = enterpriseProducts.find((item) => item.slug !== slug);
  return (
    <div className={`offer-page offer-product-detail offer-product-detail--${slug}`}>
      <OfferBreadcrumb parent="/products" label="Products" current={product.name} />
      <OfferHero title={product.headline} description={product.description} image={product}>
        <div className="offer-actions"><Link className="button button-primary" to="/contact">Discuss {product.name}<ArrowUpRight size={16} aria-hidden="true" /></Link><a href="#product-capabilities" className="offer-link">{voice ? "Explore capabilities" : "How it works"}<ArrowDown size={16} aria-hidden="true" /></a></div>
      </OfferHero>
      <section className="site-container offer-product-capabilities" id="product-capabilities" aria-labelledby="product-capabilities-title">
        <div className="offer-section-heading"><h2 id="product-capabilities-title">{voice ? "More than voice automation." : "From intent to live prediction."}</h2><p>{voice ? "KINLU Voice connects conversations to KINLU’s predictive engine, turning interactions into actionable insight." : "KINLU understands the intent behind a business question, then builds, trains and hosts the model."}</p></div>
        {voice ? (
          <div className="offer-capability-grid">{product.capabilities.map((capability) => <div className="offer-capability" key={capability.title}><h3>{capability.title}</h3><p>{capability.description}</p></div>)}</div>
        ) : (
          <ol className="offer-product-steps">{product.steps.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        )}
      </section>
      <section className="offer-integration">
        <div className="site-container offer-integration-inner">
          <h2>{voice ? "Your infrastructure. Your approved environment." : "Intelligence, connected to the work."}</h2>
          <div><p>{product.integration}</p>{!voice ? <p>The predictive intelligence engine behind business workflows, products and contact-centre experiences.</p> : null}<OfferLink to={voice ? "/what-we-do#governance" : "/solutions"}>{voice ? "Explore our operating approach" : "Explore solution domains"}</OfferLink></div>
        </div>
      </section>
      {voice ? (
        <section className="site-container offer-proof-link"><p className="offer-kicker">Proof of concept</p><h2>Private voice intelligence,<br />tested inside a bank.</h2><p>A leading local bank. Name withheld. A focused proof of concept for KINLU Voice.</p><OfferLink to="/case-studies/private-bank-voice-poc">Read the bank proof of concept</OfferLink></section>
      ) : null}
      <section className="site-container offer-related-product">
        <OfferImage item={other} />
        <div><p className="offer-kicker">{voice ? "The predictive foundation" : "Connect prediction and conversation"}</p><h2>{other.name}</h2><p>{voice ? "KINLU brings the model-building and predictive layer behind the conversation." : "Bring KINLU’s predictive intelligence into natural Urdu and English customer interactions."}</p><OfferLink to={other.href}>Explore {other.name}</OfferLink><OfferLink to={product.industry.href}>{product.industry.label}</OfferLink></div>
      </section>
      <OfferContact title={`Where could ${product.name} fit?`} />
    </div>
  );
}

export function EnterpriseWorkPage() {
  return (
    <div className="offer-page offer-work-page">
      <OfferHero eyebrow="Case studies" title="Built around decisions that matter." description="Enterprise AI and operational systems, with the problem, implementation and scope made clear." />
      <div className="site-container offer-case-list">
        {enterpriseCases.map((study) => (
          <article className={`offer-case-entry offer-case-entry--${study.slug}`} key={study.slug}>
            <OfferImage item={study} />
            <div className="offer-entry-copy"><p className="offer-kicker">{study.status}</p><h2>{study.title}</h2><p>{study.description}</p><OfferLink to={study.href}>{study.readLabel}</OfferLink></div>
          </article>
        ))}
      </div>
      <OfferContact />
    </div>
  );
}

export function EnterpriseCasePage() {
  const { slug } = useParams();
  const study = enterpriseCases.find((item) => item.slug === slug);
  if (!study) return <OfferNotFound type="case" />;
  const poc = study.status === "Proof of concept";
  return (
    <div className={`offer-page offer-case-detail offer-case-detail--${slug}`}>
      <OfferBreadcrumb parent="/case-studies" label="Case studies" current={study.breadcrumbLabel} />
      <OfferHero eyebrow={study.status} title={study.title} description={study.description} image={study}>
        <p className="offer-client-label">{study.clientLabel}</p>
        <OfferLink to={study.industry.href}>{study.industry.label}</OfferLink>
      </OfferHero>
      {poc ? <aside className="site-container offer-case-status" aria-label="Case status"><strong>Proof of concept</strong><p>Client name withheld at the bank’s request.</p></aside> : null}
      <section className="site-container offer-case-context"><h2>{poc ? "The focus" : "The challenge"}</h2><p>{study.challenge}</p></section>
      <section className="site-container offer-case-built" aria-labelledby="case-built-title">
        <h2 id="case-built-title">{poc ? "The proof of concept" : "What was built"}</h2>
        <div>{study.built.map((item) => <div className="offer-case-detail-row" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
      </section>
      <section className="offer-integration"><div className="site-container offer-integration-inner"><h2>{study.integrationTitle}</h2><div><p>{study.integrationDescription}</p><OfferLink to={study.relatedProduct.href}>{study.relatedProduct.label}</OfferLink>{poc ? <OfferLink to="/products/kinlu">Explore the predictive foundation</OfferLink> : null}</div></div></section>
      <OfferContact title="What decision could work better?" />
    </div>
  );
}
