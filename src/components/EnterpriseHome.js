import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Compass,
  Workflow,
  ShieldCheck,
  Play,
} from "lucide-react";
import {
  services,
  products,
  caseStudies,
  team,
  episodes,
} from "../content/nyrixContent";

const icons = [Brain, Compass, Workflow, ShieldCheck];

export default function EnterpriseHome() {
  const featuredEpisode = episodes.find(
    (episode) => episode.status === "published",
  );
  return (
    <>
      <section className="media-hero" aria-labelledby="home-title">
        <div className="site-container">
          <div className="media-hero-intro">
            <div>
              <p className="media-eyebrow">Nyrix / Decision sciences</p>
              <h1 id="home-title">
                Intelligence,
                <br />
                put to work.
              </h1>
            </div>
            <div className="media-hero-summary">
              <p>
                AI systems, predictive models and intelligent workflows.
                Designed around your business. Engineered for the work ahead.
              </p>
              <Link className="button button-primary" to="/contact">
                Talk to our team <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="brand-landscape">
            <img
              src="/media/nyrix-clarity-1536.webp"
              srcSet="/media/nyrix-clarity-768.webp 768w, /media/nyrix-clarity-1536.webp 1536w"
              sizes="(max-width: 768px) 100vw, 92vw"
              width="1536"
              height="1024"
              alt=""
              fetchpriority="high"
            />
            <div className="brand-landscape-copy">
              <span>From complexity</span>
              <strong>to clarity.</strong>
            </div>
            <Link to="/solutions" className="landscape-link">
              Explore our solutions <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="media-hero-index">
            <span>Strategy. Engineering. Applied intelligence.</span>
            <Link to="/case-studies">
              See our work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="enterprise-section">
        <div className="site-container">
          <div className="intro-split">
            <div>
              <span className="section-kicker">What we do</span>
              <h2 className="section-heading">
                From a useful question to a working AI system.
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
              <figcaption>
                A clear path from possibility to practice.
              </figcaption>
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
      <section className="enterprise-section section-soft">
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
              <Link key={study.slug} to={study.href} className="work-card">
                <span className="work-meta">{study.category}</span>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <span className="text-link">
                  Read the case study <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="enterprise-section">
        <div className="site-container">
          <div className="section-topline">
            <div>
              <span className="section-kicker">Our products</span>
              <h2 className="section-heading">
                Focused tools for everyday complexity.
              </h2>
            </div>
            <Link className="text-link" to="/products">
              Explore products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <Link
                key={product.slug}
                to={product.href}
                className="product-row"
              >
                <span className="product-name">{product.name}</span>
                <div>
                  <div className="product-category">{product.category}</div>
                  <p>{product.description}</p>
                </div>
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="enterprise-section section-soft">
        <div className="site-container company-feature">
          <div>
            <span className="section-kicker">The people behind Nyrix</span>
            <h2 className="section-heading">
              Engineering grounded in curiosity.
            </h2>
            <p className="section-copy">
              We work across AI strategy, solutions architecture and machine
              learning. Get to know the team building Nyrix and the advisors
              supporting our journey.
            </p>
            <Link className="text-link" to="/company">
              Meet Nyrix <ArrowRight size={16} />
            </Link>
          </div>
          <div className="people-preview">
            {team.map((person) => (
              <div className="person-preview" key={person.name}>
                {person.photo ? (
                  <img
                    className="person-photo"
                    src={person.photo}
                    alt=""
                    width="45"
                    height="45"
                    loading="lazy"
                  />
                ) : (
                  <span className="person-monogram" aria-hidden="true">
                    {person.name
                      .split(" ")
                      .filter((word) => word.length > 1)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </span>
                )}
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
            <Link className="text-link" to="/company/advisors">
              Meet our advisors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      {featuredEpisode ? (
        <section className="enterprise-section">
          <div className="site-container podcast-feature">
            <a
              className="podcast-artwork"
              href={featuredEpisode.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={featuredEpisode.thumbnail}
                alt={`${featuredEpisode.title} episode artwork`}
                loading="lazy"
                width="1280"
                height="720"
              />
              <span className="podcast-badge">
                <Play size={14} /> Watch on YouTube
              </span>
            </a>
            <div>
              <span className="section-kicker">The Next Question</span>
              <h2 className="section-heading">
                Conversations that go beyond the headline.
              </h2>
              <p className="section-copy">
                Researchers and practitioners join us to explore the questions
                behind AI, from language and quantum computing to computer
                vision.
              </p>
              <Link className="text-link" to="/resources/podcasts">
                Explore the episodes <ArrowRight size={16} />
              </Link>
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
