import React from "react";
import { Link } from "react-router-dom";
import HeroRibbon from "./HeroRibbon";
import WorkMarquee from "./WorkMarquee";
import BlurText from "./reactbits/BlurText";
import SpotlightCard from "./reactbits/SpotlightCard";
import {
  ArrowRight,
  Brain,
  Compass,
  Workflow,
  ShieldCheck,
} from "lucide-react";
import {
  services,
  caseStudies,
  episodes,
} from "../content/nyrixContent";

const icons = [Brain, Compass, Workflow, ShieldCheck];

export default function EnterpriseHome() {
  const featuredEpisode = episodes.find(
    (episode) => episode.status === "published",
  );
  return (
    <>
      <section className="ribbon-hero" aria-labelledby="home-title">
        <HeroRibbon />
        <div className="site-container ribbon-hero-content">
          <div className="ribbon-hero-copy">
            <h1 id="home-title">
              Intelligence,
              <br />
              <span>
                put to <em className="hero-work">work.</em>
              </span>
            </h1>
            <p>
              AI systems, predictive models and intelligent workflows. Designed
              around your business. Engineered for the work ahead.
            </p>
            <div className="ribbon-hero-actions">
              <Link className="button button-primary" to="/contact">
                Talk to our team <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="ribbon-secondary-link" to="/solutions">
                Explore our solutions
              </Link>
            </div>
          </div>
          <div className="ribbon-hero-footnote">
            <Link to="/case-studies">
              See our work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <WorkMarquee />
      <section className="enterprise-section">
        <div className="site-container">
          <div className="intro-split">
            <div>
              <span className="section-kicker">What we do</span>
              <h2 className="section-heading">
                <BlurText text="From a useful question to a working AI system." />
              </h2>
            </div>
            <p className="section-copy">
              AI becomes useful when it fits the way your business works. We
              bring strategy, machine learning and software engineering together
              to identify the right problem and build a practical solution.
            </p>
          </div>
          <div className="media-capabilities">
            <figure className="capabilities-art">
              <img
                src="/media/nyrix-connected-work-1536.webp"
                srcSet="/media/nyrix-connected-work-768.webp 768w, /media/nyrix-connected-work-1536.webp 1536w"
                sizes="(max-width: 768px) 100vw, 42vw"
                width="1536"
                height="1024"
                alt=""
                loading="lazy"
              />
            </figure>
            <div className="capability-list">
              {services.map((service, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <Link
                    key={service.id}
                    to={service.href}
                    className="capability-item"
                  >
                    <span className="capability-icon">
                      <Icon size={23} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <ArrowRight className="capability-arrow" size={17} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="enterprise-section home-product-section">
        <div className="site-container">
          <div className="section-topline">
            <div>
              <span className="section-kicker">OUR PRODUCTS</span>
              <h2 className="section-heading">
                Focused tools for everyday complexity.
              </h2>
            </div>
            <Link className="text-link" to="/products">
              Explore products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home-product-showcase-list">
            {/* Kinlu Showcase Card */}
            <article className="home-product-showcase-card kinlu-showcase-card">
              <div className="home-product-showcase-copy">
                <span className="home-product-showcase-kicker">KINLU</span>
                <h3 className="home-product-showcase-title">Kinlu</h3>
                <span className="home-product-showcase-sub">PREDICTIVE ANALYTICS</span>
                <p className="home-product-showcase-desc">
                  An automated machine learning platform focused on customer churn, lifetime value and marketing intent.
                </p>
                <Link className="home-product-showcase-btn" to="/products/kinlu">
                  <span>Learn more</span>
                  <span className="home-product-showcase-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
              <figure className="home-product-showcase-visual">
                <img
                  src="/media/kinlu-website-clean.png"
                  alt="Kinlu machine learning platform interface featuring predictive customer models and analytics dashboard"
                  loading="lazy"
                  width="1100"
                  height="640"
                />
              </figure>
            </article>

            {/* Numaya Showcase Card */}
            <article className="home-product-showcase-card numaya-showcase-card">
              <div className="home-product-showcase-copy">
                <span className="home-product-showcase-kicker">NUMAYA</span>
                <h3 className="home-product-showcase-title">Numaya</h3>
                <span className="home-product-showcase-sub">SOCIAL MARKETING</span>
                <p className="home-product-showcase-desc">
                  A marketing platform for restaurants and growing businesses, bringing creative, publishing and social operations together.
                </p>
                <Link className="home-product-showcase-btn" to="/products/numaya">
                  <span>Learn more</span>
                  <span className="home-product-showcase-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
              <figure className="home-product-showcase-visual">
                <img
                  src="/media/numaya-website-clean.png"
                  alt="Numaya brand growth platform interface showing social media marketing campaigns and AI creative assets"
                  loading="lazy"
                  width="1100"
                  height="640"
                />
              </figure>
            </article>
          </div>
        </div>
      </section>
      <section className="enterprise-section section-soft home-work-section">
        {/* Background organic ribbon curve echoing the team section pedigree */}
        <div className="section-ambient-bg" aria-hidden="true">
          <svg viewBox="0 0 1440 500" fill="none" preserveAspectRatio="none">
            <path
              d="M-80 320 C 320 220, 700 380, 1100 260 C 1320 200, 1480 240, 1600 220 L 1600 500 L -80 500 Z"
              fill="#f6f3fb"
              opacity="0.85"
            />
            <path
              d="M 500 180 C 800 290, 1150 140, 1550 250"
              stroke="#e5dfef"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>
        <div className="site-container">
          <div className="section-topline">
            <div>
              <span className="section-kicker">Selected work</span>
              <h2 className="section-heading">
                Real problems. Thoughtful engineering.
              </h2>
            </div>
            <Link className="text-link" to="/case-studies">
              View our work <ArrowRight size={16} />
            </Link>
          </div>
          <div className="work-grid">
            {caseStudies.map((study) => (
              <SpotlightCard key={study.slug} className="work-card">
                <Link to={study.href} className="work-card-link">
                  <figure className="home-work-visual">
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      width="1200"
                      height="800"
                      loading="lazy"
                    />
                  </figure>
                  <div className="home-work-copy">
                    <span className="work-meta">{study.category}</span>
                    <h3>{study.title}</h3>
                    <p>{study.description}</p>
                    <span className="text-link">
                      Read the case study <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
      <section className="enterprise-section site-container home-people-section">
        <div className="section-topline">
          <div>
            <span className="section-kicker">People &amp; perspective</span>
            <h2 className="section-heading">
              Grounded in curiosity. Guided by experience.
            </h2>
          </div>
          <Link className="text-link" to="/company">
            About our company <ArrowRight size={16} />
          </Link>
        </div>
        <div className="company-showcase-grid">
          <Link className="company-showcase-card" to="/company/team">
            <div className="company-showcase-content">
              <span className="section-kicker">Core Leadership &amp; Engineering</span>
              <h2>The team</h2>
              <p>Meet the engineers and architects behind Nyrix and our applied AI work.</p>
              <div className="company-showcase-action">
                <span className="company-showcase-link">Meet the full team</span>
                <span className="company-showcase-arrow" aria-hidden="true">→</span>
              </div>
            </div>
            <figure className="company-showcase-visual">
              <img
                src="/media/nyrix-team-illustration.png"
                alt="Glass sheets illustration representing Nyrix engineering leadership"
                loading="lazy"
                width="340"
                height="340"
              />
            </figure>
          </Link>
          <Link className="company-showcase-card" to="/company/advisors">
            <div className="company-showcase-content">
              <span className="section-kicker">External Perspective</span>
              <h2>Advisors</h2>
              <p>The institutional leaders and industry executives who bring perspective to Nyrix.</p>
              <div className="company-showcase-action">
                <span className="company-showcase-link">Meet our advisors</span>
                <span className="company-showcase-arrow" aria-hidden="true">→</span>
              </div>
            </div>
            <figure className="company-showcase-visual">
              <img
                src="/media/nyrix-advisors-illustration.png"
                alt="Architectural curved glass sculpture representing Nyrix advisory board"
                loading="lazy"
                width="340"
                height="340"
              />
            </figure>
          </Link>
        </div>
      </section>
      {featuredEpisode ? (
        <section className="enterprise-section home-podcast-section">
          <div className="section-ambient-bg" aria-hidden="true">
            <svg viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
              <path
                d="M -100 120 C 350 260, 850 80, 1600 200 L 1600 450 L -100 450 Z"
                fill="#f8f5fc"
                opacity="0.65"
              />
            </svg>
          </div>
          <div className="site-container">
            <div className="podcast-showcase-card">
              <div className="podcast-showcase-copy">
                <span className="section-kicker">THE NEXT QUESTION</span>
                <h2 className="podcast-showcase-heading">
                  Conversations that go beyond the headline.
                </h2>
                <p className="podcast-showcase-description">
                  Researchers and practitioners discuss the questions behind AI, language, quantum computing and more.
                </p>
                <Link className="podcast-showcase-link" to="/resources/podcasts">
                  <span>Explore the episodes</span>
                  <span className="podcast-showcase-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
              <figure className="podcast-showcase-visual">
                <img
                  src="/media/nyrix-next-question-illustration.png"
                  alt="Minimalist layered translucent video player panels and play control illustration"
                  loading="lazy"
                  width="720"
                  height="450"
                />
              </figure>
            </div>
          </div>
        </section>
      ) : null}
      <section className="contact-band">
        <div className="site-container contact-band-inner">
          <div>
            <h2>What could work better in your business?</h2>
            <p>
              Let's start with the problem. We'll explore where AI can help.
            </p>
          </div>
          <Link className="button button-primary" to="/contact">
            Start a conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
