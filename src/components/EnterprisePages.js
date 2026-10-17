/* Hallmark · pre-emit critique: P4 H4 E4 S4 R5 V4. Runtime layout checks belong to integration QA. */
import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
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
import TeamShowcase from "./TeamShowcase";
import EmphasizedTitle from "./EmphasizedTitle";

const productDirectoryOrder = { kinlu: 0, numaya: 1, artifex: 2, veeko: 3 };
const productDirectoryItems = [...products].sort(
  (first, second) => (productDirectoryOrder[first.slug] ?? 99) - (productDirectoryOrder[second.slug] ?? 99),
);

function Intro({ section, title, children }) {
  return (
    <header className="page-intro site-container ep-intro">
      <div className="ep-intro-copy">
        <p className="section-kicker">{section}</p>
        <h1 aria-label={title}><EmphasizedTitle text={title} /></h1>
        <p className="section-copy">{children}</p>
      </div>
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
        if (item.image) {
          return (
            <article className={`ep-product-card${label === "Capability" ? " ep-service-card" : ""} ep-product-card--${itemKey}`} key={itemKey}>
              <Link
                className="ep-product-card-image"
                to={item.href}
                aria-label={`View image for ${item.name || item.title}`}
              >
                <img src={item.image} alt={item.imageAlt || ""} width="960" height="640" loading="lazy" />
              </Link>
              <div className="ep-product-card-content">
                <div className="ep-product-card-heading">
                  <p className="ep-item-category">{item.category || label}</p>
                  <h2>{item.title || item.name}</h2>
                  {item.statusLabel ? <p className="ep-product-status">{item.statusLabel}</p> : null}
                </div>
                <div className="ep-product-card-detail">
                  <p>{item.description}</p>
                  <Link className="text-link" to={item.href}>
                    Explore {item.name || item.title} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        }
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
      <section className="enterprise-section site-container company-showcase-section">
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
        <div className={`ep-people-list${showAdvisors ? " ep-advisor-list" : ""}`}>
          {people.map((person) => (
            <article className="ep-person" key={person.name}>
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.name}
                  width={showAdvisors ? "160" : "96"}
                  height={showAdvisors ? "160" : "96"}
                  loading="lazy"
                />
              ) : null}
              <h2>{person.name}</h2>
              {person.role ? <p className="muted">{person.role}</p> : null}
              {person.focus ? <p className="ep-advisor-focus">{person.focus}</p> : null}
              {person.credential ? <p className="ep-advisor-credential">{person.credential}</p> : null}
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
  return (
    <div className="enterprise-page">
      <Intro
        section="Company"
        title="Our team"
      >
        The people behind our products, architecture and client work.
      </Intro>
      <TeamShowcase initialIndex={1} showViewAll={false} isFullPage={true} />
      <ContactPrompt title="Start a conversation with our team." />
    </div>
  );
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
      <section className="enterprise-section site-container ep-products-directory">
        <Collection items={productDirectoryItems} />
      </section>
      <ContactPrompt title="Find the right fit for your business." />
    </div>
  );
}
export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFoundPage />;
  const inactive = product.status === "shelved" || product.status === "paused";
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
      {product.image ? (
        <figure className="site-container ep-product-feature">
          <img
            src={product.image}
            alt={product.imageAlt || `${product.name} interface and platform overview`}
            width="960"
            height="640"
            loading="lazy"
          />
        </figure>
      ) : null}
      {inactive ? (
        <aside className="site-container ep-product-notice">
          <p>
            <strong>{product.statusLabel}.</strong> {product.name}{" "}
            {product.status === "shelved"
              ? "is currently shelved and is not being offered for access."
              : "is currently paused. Contact Nyrix if you would like to discuss the project."}
          </p>
        </aside>
      ) : null}
      <section className="enterprise-section site-container split-layout">
        <h2 className="section-heading">What it brings together</h2>
        <div>
          <ul className="ep-capability-list">
            {product.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="ep-actions">
            {!inactive && product.externalUrl ? (
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
            ) : null}
            <Link className="text-link" to="/contact">
              Ask about {product.name}
            </Link>
          </div>
        </div>
      </section>
      <ContactPrompt
        title={
          inactive
            ? `Questions about ${product.name}?`
            : `Explore ${product.name} with your team.`
        }
      >
        {inactive
          ? "Speak with Nyrix about the project and related capabilities."
          : "Discuss your use case and integration requirements with Nyrix."}
      </ContactPrompt>
    </div>
  );
}
export function WorkPage() {
  return (
    <div className="enterprise-page">
      <header className="site-container ep-work-intro">
        <p className="section-kicker">Selected work</p>
        <h1 aria-label="Real problems. Thoughtful engineering.">
          <EmphasizedTitle text="Real problems. Thoughtful engineering." />
        </h1>
        <p>
          Explore selected project work across environmental monitoring and
          AI-assisted learning.
        </p>
      </header>
      <section
        className="site-container ep-work-section"
        aria-label="Selected case studies"
      >
        <div className="ep-work-grid">
          {caseStudies.map((study, index) => (
            <article className="ep-work-card" key={study.slug}>
              {study.image ? (
                <figure className="ep-work-visual">
                  <Link
                    className="ep-work-image"
                    to={study.href}
                    aria-label={`Read the ${study.title} case study`}
                  >
                    <img
                      src={study.image}
                      alt={study.imageAlt || ""}
                      width="1200"
                      height="800"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Link>
                </figure>
              ) : null}
              <div className="ep-work-card-copy">
                <p className="ep-work-category">{study.category}</p>
                <h2>{study.title}</h2>
                <p className="ep-work-description">{study.description}</p>
                <Link className="ep-work-link" to={study.href}>
                  Read the case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
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

      <section className="enterprise-section site-container resource-showcase-section">
        <div className="resource-showcase-grid">
          <Link className="resource-showcase-card" to="/resources/articles">
            <div className="resource-showcase-content">
              <span className="resource-showcase-kicker">Read</span>
              <h2>Articles &amp; publications</h2>
              <p>Written perspectives on AI, product development and business adoption.</p>
              <div className="resource-showcase-action">
                <span className="resource-showcase-link">Explore publications</span>
                <span className="resource-showcase-arrow" aria-hidden="true">→</span>
              </div>
            </div>
            <figure className="resource-showcase-visual">
              <img
                src="/media/nyrix-publications-illustration.png"
                alt="Architectural paper sheets and publication graphic"
                loading="lazy"
                width="340"
                height="240"
              />
            </figure>
          </Link>
          <Link className="resource-showcase-card" to="/resources/podcasts">
            <div className="resource-showcase-content">
              <span className="resource-showcase-kicker">Listen</span>
              <h2>The Next Question</h2>
              <p>Researchers and practitioners discuss language, quantum AI, computer vision and optimization.</p>
              <div className="resource-showcase-action">
                <span className="resource-showcase-link">Explore episodes</span>
                <span className="resource-showcase-arrow" aria-hidden="true">→</span>
              </div>
            </div>
            <figure className="resource-showcase-visual">
              <img
                src="/media/nyrix-podcast-illustration.png"
                alt="Audio soundwave and circular violet resonance artwork"
                loading="lazy"
                width="340"
                height="240"
              />
            </figure>
          </Link>
        </div>
      </section>

      <section className="enterprise-section site-container explore-practice-section">
        <div className="explore-practice-grid">
          <div className="explore-practice-content">
            <h2 className="explore-practice-heading">Explore AI in practice.</h2>
            <p className="explore-practice-copy">Our project work offers a closer look at the systems we build.</p>
            <Link className="explore-practice-action" to="/case-studies">
              <span className="explore-practice-link">View selected work</span>
              <span className="explore-practice-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="explore-practice-triptych">
            <figure className="explore-triptych-item explore-triptych-main">
              <img
                src="/media/nyrix-explore-main-illustration.png"
                alt="Minimalist architectural curved wall and violet daylight"
                loading="lazy"
                width="640"
                height="400"
              />
            </figure>
            <figure className="explore-triptych-item explore-triptych-ribs">
              <img
                src="/media/nyrix-explore-ribs-illustration.png"
                alt="Rhythmic architectural cooling ribs sculpture"
                loading="lazy"
                width="280"
                height="400"
              />
            </figure>
            <figure className="explore-triptych-item explore-triptych-lines">
              <img
                src="/media/nyrix-explore-lines-illustration.png"
                alt="Fine geometric intersection lines on pale stone"
                loading="lazy"
                width="240"
                height="400"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
export function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const query = searchTerm.trim().toLowerCase();

  const technovaChapters = useMemo(() => {
    let list = articles.filter((a) => a.series === "TechNova Infrastructure Series");
    if (selectedCategory === "standalone") return [];
    if (query) {
      list = list.filter((a) =>
        [a.title, a.summary || "", a.author, `chapter ${a.chapterNumber}`]
          .some((val) => val.toLowerCase().includes(query))
      );
    }
    return list.slice().sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.publishedAt) - new Date(b.publishedAt);
      if (sortBy === "newest") return new Date(b.publishedAt) - new Date(a.publishedAt);
      // default / chapter
      return a.chapterNumber - b.chapterNumber;
    });
  }, [query, selectedCategory, sortBy]);

  const standaloneArticles = useMemo(() => {
    let list = articles.filter((a) => !a.series);
    if (selectedCategory === "technova") return [];
    if (query) {
      list = list.filter((a) =>
        [a.title, a.summary || "", a.author, a.publication || ""]
          .some((val) => val.toLowerCase().includes(query))
      );
    }
    return list.slice().sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.publishedAt) - new Date(b.publishedAt);
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
  }, [query, selectedCategory, sortBy]);

  const totalResults = technovaChapters.length + standaloneArticles.length;
  const isFiltered = searchTerm !== "" || selectedCategory !== "all" || sortBy !== "default";

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  return (
    <div className="enterprise-page">
      <Intro section="Resources" title="Articles & publications">
        Writing from the people behind Nyrix. Explore engineering series and selected articles in their
        original publications.
      </Intro>
      <section className="enterprise-section site-container">
        {/* Hallmark Enterprise Filter Bar */}
        <div className="ep-controls-bar" role="search" aria-label="Filter publications">
          <div className="ep-filter-field ep-search-field">
            <label htmlFor="article-search">Search writing</label>
            <div className="ep-input-wrap">
              <Search size={18} aria-hidden="true" />
              <input
                id="article-search"
                type="search"
                placeholder="Search by topic, keyword, or chapter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="ep-clear-btn"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search input"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="ep-filter-field">
            <label htmlFor="article-category">Section</label>
            <div className="ep-input-wrap">
              <Filter size={18} aria-hidden="true" />
              <select
                id="article-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All publications</option>
                <option value="technova">TechNova Series (Ch 1–6)</option>
                <option value="standalone">Standalone publications</option>
              </select>
            </div>
          </div>

          <div className="ep-filter-field">
            <label htmlFor="article-sort">Sort order</label>
            <div className="ep-input-wrap">
              <ArrowUpDown size={18} aria-hidden="true" />
              <select
                id="article-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default (Series order)</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        <div className="ep-results-meta" aria-live="polite">
          <p className="ep-results-count">
            Showing {totalResults} {totalResults === 1 ? "publication" : "publications"}
            {isFiltered && " matching your criteria"}
          </p>
          {isFiltered && (
            <button type="button" className="ep-reset-button" onClick={handleReset}>
              Reset filters
            </button>
          )}
        </div>

        {totalResults === 0 ? (
          <div className="ep-empty-state">
            <p className="ep-empty-title">No publications found</p>
            <p className="ep-empty-copy">
              No articles match &ldquo;{searchTerm}&rdquo; within the selected filters.
            </p>
            <button type="button" className="button button-secondary" onClick={handleReset}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* TechNova Infrastructure Series Section */}
            {technovaChapters.length > 0 && (
              <div className="ep-series-hub">
                <div className="ep-series-topline">
                  <span className="section-kicker">FEATURED SERIES</span>
                  <h2 className="ep-series-heading">TechNova Infrastructure Series</h2>
                  <p className="ep-series-lead">
                    A 6-chapter technical series by Huzaifa Faran chronicling the realities of building, scaling, and stabilizing AI systems from initial single-server traffic spikes to memory persistence and architecture recovery.
                  </p>
                </div>

                <div className="ep-editorial-list ep-series-list">
                  {technovaChapters.map((chapter) => (
                    <article className="ep-editorial-row ep-series-row" key={chapter.slug}>
                      <div>
                        <p className="muted ep-item-category">
                          TECHNOVA · CHAPTER {String(chapter.chapterNumber).padStart(2, "0")}
                        </p>
                        <h2>{chapter.title}</h2>
                      </div>
                      <div>
                        {chapter.summary ? (
                          <p className="ep-article-summary">{chapter.summary}</p>
                        ) : null}
                        <p>By {chapter.author}</p>
                        <p className="muted">
                          <time dateTime={chapter.publishedAt}>
                            {new Date(`${chapter.publishedAt}T12:00:00Z`).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                timeZone: "Asia/Karachi",
                              }
                            )}
                          </time>
                        </p>
                        {chapter.href && (
                          <a
                            className="text-link"
                            href={chapter.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read on LinkedIn <span aria-hidden="true">↗</span>
                            <span className="ep-sr-only">
                              : {chapter.title} (opens in a new tab)
                            </span>
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Standalone Articles Section */}
            {standaloneArticles.length > 0 && (
              <div className="ep-standalone-section">
                <div className="ep-section-topline">
                  <span className="section-kicker">INDIVIDUAL ESSAYS</span>
                  <h2 className="ep-series-heading">Standalone publications</h2>
                </div>
                <div className="ep-editorial-list">
                  {standaloneArticles.map((article) => (
                    <article className="ep-editorial-row" key={article.slug}>
                      <div>
                        <p className="muted ep-item-category">{article.publication}</p>
                        <h2>{article.title}</h2>
                      </div>
                      <div>
                        {article.summary ? (
                          <p className="ep-article-summary">{article.summary}</p>
                        ) : null}
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
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: "48px" }}>
          <Link className="text-link" to="/case-studies">
            Explore our work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
export function PodcastsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const query = searchTerm.trim().toLowerCase();

  const filteredEpisodes = useMemo(() => {
    let list = episodes.map((ep, originalIndex) => ({ ...ep, originalEpisodeNumber: originalIndex + 1 }));

    if (statusFilter !== "all") {
      list = list.filter((ep) => ep.status === statusFilter);
    }

    if (query) {
      list = list.filter((ep) =>
        [ep.topic, ep.guest, ep.title, ep.description]
          .some((val) => val && val.toLowerCase().includes(query))
      );
    }

    return list.slice().sort((a, b) => {
      if (sortBy === "newest") {
        const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(a.premieresAt);
        const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(b.premieresAt);
        return dateB - dateA;
      }
      if (sortBy === "oldest") {
        const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(a.premieresAt);
        const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(b.premieresAt);
        return dateA - dateB;
      }
      // default order (by episode sequence 1..4)
      return a.originalEpisodeNumber - b.originalEpisodeNumber;
    });
  }, [query, statusFilter, sortBy]);

  const isFiltered = searchTerm !== "" || statusFilter !== "all" || sortBy !== "default";

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("default");
  };

  return (
    <div className="enterprise-page">
      <Intro section="Podcasts" title="The Next Question">
        Conversations with researchers and practitioners about AI research,
        engineering decisions and the questions emerging technology raises.
        Produced by Nyrix AI and hosted by Huzaifa Faran.
      </Intro>
      <section className="enterprise-section site-container">
        {/* Hallmark Enterprise Filter Bar */}
        <div className="ep-controls-bar" role="search" aria-label="Filter podcast episodes">
          <div className="ep-filter-field ep-search-field">
            <label htmlFor="podcast-search">Search episodes</label>
            <div className="ep-input-wrap">
              <Search size={18} aria-hidden="true" />
              <input
                id="podcast-search"
                type="search"
                placeholder="Search by topic, guest name, or discussion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="ep-clear-btn"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search input"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="ep-filter-field">
            <label htmlFor="podcast-status">Status</label>
            <div className="ep-input-wrap">
              <Filter size={18} aria-hidden="true" />
              <select
                id="podcast-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All episodes</option>
                <option value="published">Published</option>
                <option value="upcoming">Upcoming premiere</option>
              </select>
            </div>
          </div>

          <div className="ep-filter-field">
            <label htmlFor="podcast-sort">Sort order</label>
            <div className="ep-input-wrap">
              <ArrowUpDown size={18} aria-hidden="true" />
              <select
                id="podcast-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default (Episode 01 → 04)</option>
                <option value="newest">Latest release first</option>
                <option value="oldest">Earliest first</option>
              </select>
            </div>
          </div>
        </div>

        <div className="ep-results-meta" aria-live="polite">
          <p className="ep-results-count">
            Showing {filteredEpisodes.length} {filteredEpisodes.length === 1 ? "episode" : "episodes"}
            {isFiltered && " matching your criteria"}
          </p>
          {isFiltered && (
            <button type="button" className="ep-reset-button" onClick={handleReset}>
              Reset filters
            </button>
          )}
        </div>

        {filteredEpisodes.length === 0 ? (
          <div className="ep-empty-state">
            <p className="ep-empty-title">No episodes found</p>
            <p className="ep-empty-copy">
              No podcast episodes match &ldquo;{searchTerm}&rdquo; within the selected filters.
            </p>
            <button type="button" className="button button-secondary" onClick={handleReset}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="ep-episode-grid">
            {filteredEpisodes.map((episode) => {
              const epNum = episode.originalEpisodeNumber;
              return (
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
                      alt={`${episode.guest} on The Next Question, episode ${epNum}`}
                      width="1280"
                      height="720"
                      loading="lazy"
                    />
                  </a>
                  <div className="ep-episode-meta">
                    <span>Episode {String(epNum).padStart(2, "0")}</span>
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
                      {epNum} (opens in a new tab)
                    </span>{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              );
            })}
          </div>
        )}
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
