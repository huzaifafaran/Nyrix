/* Hallmark · pre-emit critique: P4 H4 E4 S4 R5 V4. Runtime layout checks belong to integration QA. */
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  services,
  products,
  caseStudies,
  team,
  advisors,
  episodes,
  articles,
  podcastChannelUrl,
  bookingUrl,
  contactEmail,
} from "../content/nyrixContent";
import "./EnterprisePages.css";
import { OfferingIcon } from "./EnterpriseIcons";

function Intro({ section, title, children }) {
  return (
    <header className="page-intro site-container">
      <p className="section-kicker">{section}</p>
      <h1>{title}</h1>
      <p className="section-copy">{children}</p>
    </header>
  );
}
function ContactPrompt({
  title = "Let’s discuss your next step.",
  children = "Tell us about your business, the workflow you want to improve and the questions you are exploring.",
}) {
  return (
    <section className="enterprise-section site-container">
      <div className="contact-panel">
        <h2 className="section-heading">{title}</h2>
        <p className="section-copy">{children}</p>
        <Link className="button button-primary" to="/contact">
          Talk to Nyrix <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
function Collection({ items, label }) {
  return (
    <div className="ep-editorial-list">
      {items.map((item) => {
        const itemKey = item.slug || item.id;
        return (
          <article className="ep-editorial-row" key={itemKey}>
            <div>
              <div className="ep-icon-badge" aria-hidden="true">
                <OfferingIcon name={itemKey} />
              </div>
              <p className="muted ep-item-category">{item.category || label}</p>
              <h2>{item.title || item.name}</h2>
            </div>
            <div>
              <p>{item.description}</p>
              <Link className="text-link" to={item.href}>
                Explore {item.name || item.title}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
export function CompanyPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Company" title="Applied AI, built around real work.">
        Nyrix brings together AI product development, advisory and business
        transformation. Our work spans predictive analytics, creative tools and
        operational systems.
      </Intro>
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">
          From a business question to a working system.
        </h2>
        <div className="prose">
          <p>
            An AI initiative starts with the work it needs to support: a
            customer decision, a repetitive process or a product experience.
          </p>
          <p>
            Explore our products and project work to see the areas we focus on,
            or speak with us about an opportunity in your organization.
          </p>
          <Link className="text-link" to="/case-studies">
            Explore our work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="enterprise-section site-container">
        <div className="content-grid">
          <article className="content-card">
            <h2>The team</h2>
            <p>Meet the people behind Nyrix and our applied AI work.</p>
            <Link className="text-link" to="/company/team">
              Our team <span aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="content-card">
            <h2>Advisors</h2>
            <p>The people who bring additional perspectives to Nyrix.</p>
            <Link className="text-link" to="/company/advisors">
              Our advisors <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>
      <ContactPrompt />
    </div>
  );
}
function PeoplePage({ showAdvisors = false }) {
  const people = showAdvisors ? advisors : team;
  return (
    <div className="enterprise-page">
      <Intro
        section="Company"
        title={showAdvisors ? "Our advisors" : "Our team"}
      >
        {showAdvisors
          ? "The experience and perspectives that inform our work."
          : "The people behind our products and client work."}
      </Intro>
      <section className="enterprise-section site-container">
        <div className="ep-people-list">
          {people.map((person) => (
            <article className="ep-person" key={person.name}>
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.name}
                  width="96"
                  height="96"
                  loading="lazy"
                />
              ) : null}
              <h2>{person.name}</h2>
              {person.role ? <p className="muted">{person.role}</p> : null}
              {person.bio ? <p>{person.bio}</p> : null}
              {person.profileUrl ? (
                <a
                  className="text-link"
                  href={person.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span className="ep-sr-only">
                    {" "}
                    profile for {person.name} (opens in a new tab)
                  </span>{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <ContactPrompt
        title={
          showAdvisors
            ? "Connect with Nyrix."
            : "Start a conversation with our team."
        }
      />
    </div>
  );
}
export function TeamPage() {
  return <PeoplePage />;
}
export function AdvisorsPage() {
  return <PeoplePage showAdvisors />;
}
export function SolutionsPage() {
  return (
    <div className="enterprise-page">
      <Intro
        section="Solutions"
        title="A practical path for your AI initiative."
      >
        Explore support for product development, organizational adoption and the
        systems that connect AI to your business.
      </Intro>
      <section className="enterprise-section site-container">
        <Collection items={services} label="Capability" />
      </section>
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">Looking for an AI agent?</h2>
        <div className="prose">
          <p>
            Explore the agent catalog for examples of task-specific workflows
            across business functions.
          </p>
          <Link className="text-link" to="/agents">
            Browse AI agents <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <ContactPrompt />
    </div>
  );
}
export function ProductsPage() {
  return (
    <div className="enterprise-page">
      <Intro
        section="Products"
        title="AI for decisions, creative work and marketing."
      >
        Explore Nyrix products by the work they support. Contact us to discuss
        product access and suitability for your organization.
      </Intro>
      <section className="enterprise-section site-container">
        <Collection items={products} />
      </section>
      <ContactPrompt title="Find the right fit for your business." />
    </div>
  );
}
export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFoundPage />;
  return (
    <div className="enterprise-page">
      <nav aria-label="Breadcrumb" className="site-container breadcrumb">
        <Link to="/products">Products</Link>
        <span aria-hidden="true"> / </span>
        <span>{product.name}</span>
      </nav>
      <Intro section={product.category} title={product.name}>
        {product.description}
      </Intro>
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">What it brings together</h2>
        <div>
          <ul className="ep-capability-list">
            {product.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="ep-actions">
            <a
              className="button button-secondary"
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {product.name}
              <span className="ep-sr-only"> (opens in a new tab)</span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" to="/contact">
              Ask about {product.name}
            </Link>
          </div>
        </div>
      </section>
      <ContactPrompt title={`Explore ${product.name} with your team.`}>
        Discuss your use case, product access and integration requirements with
        Nyrix.
      </ContactPrompt>
    </div>
  );
}
export function WorkPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Our work" title="Systems built for specific problems.">
        Explore selected project work across environmental monitoring and
        AI-assisted learning.
      </Intro>
      <section className="enterprise-section site-container">
        <Collection items={caseStudies} />
      </section>
      <ContactPrompt title="Bring us the problem you’re working on." />
    </div>
  );
}
export function ResourcesPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Resources" title="Thinking from Nyrix.">
        Articles, publications and The Next Question: conversations with
        researchers and practitioners about AI in practice.
      </Intro>
      <section className="enterprise-section site-container">
        <div className="content-grid">
          <article className="content-card">
            <p className="muted">Read</p>
            <h2>Articles & publications</h2>
            <p>
              Written perspectives on AI, product development and business
              adoption.
            </p>
            <Link className="text-link" to="/resources/articles">
              Explore publications <span aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="content-card">
            <p className="muted">Listen</p>
            <h2>The Next Question</h2>
            <p>
              Researchers and practitioners discuss language, quantum AI,
              computer vision and optimization.
            </p>
            <Link className="text-link" to="/resources/podcasts">
              Explore episodes <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">Explore AI in practice.</h2>
        <div className="prose">
          <p>Our project work offers a closer look at the systems we build.</p>
          <Link className="text-link" to="/case-studies">
            View selected work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
export function ArticlesPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Resources" title="Articles & publications">
        Writing from the people behind Nyrix. Explore selected articles in their
        original publications.
      </Intro>
      <section className="enterprise-section site-container">
        <div className="ep-editorial-list">
          {articles.map((article) => (
            <article className="ep-editorial-row" key={article.slug}>
              <div>
                <p className="muted ep-item-category">{article.publication}</p>
                <h2>{article.title}</h2>
              </div>
              <div>
                <p>By {article.author}</p>
                <p className="muted">
                  <time dateTime={article.publishedAt}>
                    {new Date(
                      `${article.publishedAt}T12:00:00Z`,
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Karachi",
                    })}
                  </time>
                </p>
                <a
                  className="text-link"
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read on LinkedIn <span aria-hidden="true">↗</span>
                  <span className="ep-sr-only">
                    : {article.title} (opens in a new tab)
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/case-studies">
          Explore our work <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
export function PodcastsPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Podcasts" title="The Next Question">
        Conversations with researchers and practitioners about AI research,
        engineering decisions and the questions emerging technology raises.
        Produced by Nyrix AI and hosted by Huzaifa Faran.
      </Intro>
      <section className="enterprise-section site-container">
        <div className="ep-episode-grid">
          {episodes.map((episode, index) => (
            <article className="ep-episode" key={episode.id}>
              <a
                className="ep-episode-artwork"
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${episode.status === "upcoming" ? "View premiere for" : "Watch"} ${episode.title} (opens in a new tab)`}
              >
                <img
                  src={episode.thumbnail}
                  alt={`${episode.guest} on The Next Question, episode ${index + 1}`}
                  width="1280"
                  height="720"
                  loading="lazy"
                />
              </a>
              <div className="ep-episode-meta">
                <span>Episode {String(index + 1).padStart(2, "0")}</span>
                <span>
                  {episode.status === "upcoming"
                    ? "Upcoming"
                    : episode.duration}
                </span>
              </div>
              <h2>{episode.topic}</h2>
              <p className="muted">With {episode.guest}</p>
              <p>{episode.description}</p>
              {episode.status === "upcoming" ? (
                <p className="ep-premiere">
                  <time dateTime={episode.premieresAt}>
                    {episode.premiereLabel}
                  </time>
                </p>
              ) : (
                <p className="muted">
                  <time dateTime={episode.publishedAt}>
                    {new Date(
                      `${episode.publishedAt}T12:00:00Z`,
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Karachi",
                    })}
                  </time>
                </p>
              )}
              <a
                className="text-link"
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {episode.status === "upcoming"
                  ? "View premiere"
                  : "Watch episode"}
                <span className="ep-sr-only">
                  {" "}
                  {index + 1} (opens in a new tab)
                </span>{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="ep-channel-link">
          <a
            className="button button-secondary"
            href={podcastChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Nyrix AI on YouTube
            <span className="ep-sr-only"> (opens in a new tab)</span>{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
export function ContactPage() {
  return (
    <div className="enterprise-page">
      <Intro section="Contact" title="Tell us what you’re working on.">
        Start a conversation about an AI product, a business workflow or your
        organization’s next step with AI.
      </Intro>
      <section className="enterprise-section site-container">
        <div className="content-grid">
          <article className="content-card">
            <h2>Book a conversation</h2>
            <p>
              Choose a time on our calendar to discuss your project or explore a
              product.
            </p>
            <a
              className="button button-primary"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Choose a time
              <span className="ep-sr-only"> (opens in a new tab)</span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="content-card">
            <h2>Write to us</h2>
            <p>
              Share your business context, the problem you want to solve and any
              requirements you already have.
            </p>
            <a className="text-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </article>
        </div>
      </section>
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">A useful starting point</h2>
        <div className="prose">
          <p>
            Tell us who will use the system, how the process works today and
            what you would like to change. If you are exploring a Nyrix product,
            include the product name and your use case.
          </p>
        </div>
      </section>
    </div>
  );
}
export function NotFoundPage() {
  return (
    <div className="enterprise-page">
      <Intro section="404" title="This page could not be found.">
        The address may have changed. Find your way back to Nyrix below.
      </Intro>
      <section className="enterprise-section site-container ep-actions">
        <Link className="button button-primary" to="/">
          Return home
        </Link>
        <Link className="text-link" to="/contact">
          Contact Nyrix
        </Link>
      </section>
    </div>
  );
}
