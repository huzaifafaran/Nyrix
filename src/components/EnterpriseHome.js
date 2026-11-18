/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 · existing Nyrix enterprise theme. */
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroRibbon from "./HeroRibbon";
import WorkMarquee from "./WorkMarquee";
import BlurText from "./reactbits/BlurText";
import SpotlightCard from "./reactbits/SpotlightCard";
import { deliveryStages, enterpriseProducts, solutionDomains, enterpriseCases } from "../content/enterpriseOfferContent";
import { industries } from "../content/industryContent";

export default function EnterpriseHome() {
  return <>
    <section className="ribbon-hero" aria-labelledby="home-title">
      <HeroRibbon />
      <div className="site-container ribbon-hero-content">
        <div className="ribbon-hero-copy">
          <h1 id="home-title">Intelligence,<br /><span>put to <em className="hero-work">work.</em></span></h1>
          <p>Enterprise AI and Decision Sciences for faster, smarter, and more confident business decisions.</p>
          <p className="revamp-hero-support">Bring us the decision that matters. We start with the business problem, then build the intelligence to solve it.</p>
          <div className="ribbon-hero-actions">
            <Link className="button button-primary" to="/what-we-do">Explore our capabilities <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="ribbon-secondary-link" to="/contact">Start a conversation</Link>
          </div>
        </div>
        <div className="ribbon-hero-footnote"><Link to="/case-studies">Intelligence in practice <ArrowRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>
    <WorkMarquee />
    <section className="enterprise-section">
      <div className="site-container">
        <div className="intro-split">
          <div><span className="section-kicker">What we do</span><h2 className="section-heading"><BlurText text="From a useful question to a working AI system." /></h2></div>
          <p className="section-copy">We combine strategic thinking, machine learning and software engineering to turn business strategy into intelligent systems.</p>
        </div>
        <div className="media-capabilities">
          <figure className="capabilities-art"><img src="/media/enterprise/positioning-glass.webp" width="1152" height="928" alt="" loading="lazy" /></figure>
          <div className="capability-list">{deliveryStages.map((stage, index) => <Link key={stage.id} to={stage.href || `/what-we-do#${stage.id}`} className="capability-item"><span className="revamp-index" aria-hidden="true">0{index + 1}</span><div><h3>{stage.title}</h3><p>{stage.description}</p></div><ArrowRight size={18} aria-hidden="true" /></Link>)}</div>
        </div>
      </div>
    </section>
    <section className="enterprise-section home-product-section">
      <div className="site-container">
        <div className="section-topline"><div><span className="section-kicker">Our products</span><h2 className="section-heading">Intelligence, ready for the work.</h2></div><Link className="text-link" to="/products">Explore products <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="home-product-showcase-list">{enterpriseProducts.map(product => <article className={`home-product-showcase-card revamp-product-${product.slug}`} key={product.slug}>
          <div className="home-product-showcase-copy"><span className="home-product-showcase-kicker">{product.category || "Enterprise AI"}</span><h3 className="home-product-showcase-title">{product.name}</h3><p className="home-product-showcase-desc">{product.headline || product.description}</p><Link className="home-product-showcase-btn" to={product.href}><span>Explore {product.name}</span><span className="home-product-showcase-btn-arrow" aria-hidden="true">→</span></Link></div>
          <figure className="home-product-showcase-visual"><img src={product.image} alt="" loading="lazy" width={product.imageWidth} height={product.imageHeight} /></figure>
        </article>)}</div>
      </div>
    </section>
    <section className="enterprise-section revamp-solutions-preview">
      <div className="site-container revamp-solution-split">
        <div><span className="section-kicker">Solutions</span><h2 className="section-heading">Better decisions.<br />Across the business.</h2><p className="section-copy">Seven decision domains. One foundation of predictive intelligence.</p><Link className="text-link" to="/solutions">Explore our solutions <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="revamp-domain-list">{solutionDomains.map((domain,index) => <Link to={domain.href || `/solutions#${domain.id}`} key={domain.id}><span className="revamp-index" aria-hidden="true">0{index+1}</span><span>{domain.title}</span><ArrowRight size={16} aria-hidden="true" /></Link>)}</div>
      </div>
    </section>
    <section className="enterprise-section section-soft" aria-labelledby="home-industries-title">
      <div className="site-container">
        <div className="section-topline"><div><span className="section-kicker">Industries</span><h2 id="home-industries-title" className="section-heading">Built around your industry's decisions.</h2></div><Link className="text-link" to="/industries">Explore industries <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <figure className="revamp-industry-band"><img src="/media/enterprise/industries-band.webp" alt="" width="2064" height="512" loading="lazy" /></figure>
        <div className="revamp-industry-links">{industries.map(industry => <Link key={industry.slug} to={industry.href}>{industry.title}<ArrowRight size={15} aria-hidden="true" /></Link>)}</div>
      </div>
    </section>
    <section className="enterprise-section home-work-section">
      <div className="site-container">
        <div className="section-topline"><div><span className="section-kicker">Selected work</span><h2 className="section-heading">Intelligence in practice.</h2></div><Link className="text-link" to="/case-studies">View case studies <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="work-grid">{enterpriseCases.filter(study => study.featured !== false).map(study => <SpotlightCard key={study.slug} className="work-card"><Link to={study.href} className="work-card-link"><figure className="home-work-visual"><img src={study.image} alt="" width="1024" height="1024" loading="lazy" /></figure><div className="home-work-copy"><span className="work-meta">{study.status || study.category}</span><h3>{study.title}</h3><p>{study.description}</p><span className="text-link">Read the case study <ArrowRight size={16} aria-hidden="true" /></span></div></Link></SpotlightCard>)}</div>
      </div>
    </section>
    <section className="enterprise-section site-container revamp-trust">
      <div><span className="section-kicker">People & research</span><h2 className="section-heading">Research depth.<br />Applied enterprise thinking.</h2><p className="section-copy">Researchers, engineers and advisors working together on the decisions that matter.</p><div className="revamp-trust-links"><Link className="text-link" to="/company/team">Meet the team <ArrowRight size={16} aria-hidden="true" /></Link><Link className="text-link" to="/company/advisors">Our advisors <ArrowRight size={16} aria-hidden="true" /></Link><Link className="text-link" to="/company/research">Explore R&D <ArrowRight size={16} aria-hidden="true" /></Link></div></div>
      <figure><img src="/media/enterprise/rd-research-architecture.webp" alt="" width="1152" height="928" loading="lazy" /></figure>
    </section>
    <section className="enterprise-section site-container revamp-resource-line"><span className="section-kicker">Ideas in conversation</span><Link to="/resources/podcasts">The Next Question: researchers and practitioners on what comes next.<ArrowRight size={18} aria-hidden="true" /></Link></section>
    <section className="contact-band"><div className="site-container contact-band-inner"><div><h2>Bring us the decision that matters.</h2><p>Tell us about the decision, workflow or customer experience you want to improve.</p></div><Link className="button button-primary" to="/contact">Start a conversation <ArrowRight size={17} aria-hidden="true" /></Link></div></section>
  </>;
}
