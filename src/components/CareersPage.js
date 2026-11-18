/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import EmphasizedTitle from "./EmphasizedTitle";
import "./CareersPage.css";

const careersEmail = "huzaifa@nyrix.co";
const introductionUrl = `mailto:${careersEmail}?subject=${encodeURIComponent("Careers at Nyrix — expression of interest")}`;

// These describe existing work, rather than advertised vacancies.
const disciplines = [
  {
    title: "Machine learning & data",
    description: "From customer signals to predictive models that support better decisions.",
    example: "Explore Kinlu",
    href: "/products/kinlu",
  },
  {
    title: "Software & systems",
    description: "Connect models, interfaces and live data with the work happening on the ground.",
    example: "See our enterprise work",
    href: "/case-studies/gerrys-dnata",
  },
  {
    title: "Product & experience",
    description: "Turn complex technology into tools people can use in their everyday work.",
    example: "Discover KINLU Voice",
    href: "/products/kinlu-voice",
  },
];

export default function CareersPage() {
  return (
    <div className="careers-page">
      <section className="careers-hero" aria-labelledby="careers-title">
        <div className="site-container">
          <nav className="careers-breadcrumb" aria-label="Breadcrumb">
            <Link to="/company">Company</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Careers</span>
          </nav>
          <div className="careers-hero-grid">
            <div className="careers-hero-copy">
              <h1 id="careers-title" aria-label="Your next chapter in applied AI.">
                Your next<br />
                <EmphasizedTitle text="chapter" word="chapter" /><br />
                in applied AI.
              </h1>
              <p className="careers-lede">
                Bring your craft to the models, products and decisions we work on at Nyrix.
              </p>
              <div className="careers-actions">
                <a className="button button-primary" href="#introduce-yourself">
                  Introduce yourself <ArrowDown size={16} aria-hidden="true" />
                </a>
                <Link className="text-link" to="/company/team">
                  Meet the team <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className="careers-hero-art">
              <img
                src="/media/careers-structure-1536.webp"
                srcSet="/media/careers-structure-768.webp 768w, /media/careers-structure-1536.webp 1536w"
                sizes="(max-width: 760px) calc(100vw - 40px), 55vw"
                alt="An open sculpture of interlocking violet glass planes, each contributing to a shared structure."
                width="1536"
                height="1024"
                fetchpriority="high"
              />
            </figure>
          </div>
          <div className="careers-hero-note">
            <span>General expressions of interest</span>
            <a href="#careers-work">Explore the work <ArrowDown size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="site-container careers-work careers-section" id="careers-work" aria-labelledby="careers-work-title">
        <div className="careers-work-intro">
          <p className="section-kicker">The work brings us together</p>
          <h2 id="careers-work-title">Good questions need different disciplines.</h2>
          <p>
            Nyrix works across machine learning, software engineering and AI strategy.
            The connection is a practical problem worth solving.
          </p>
          <Link className="text-link" to="/case-studies">
            Explore our work <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="careers-disciplines">
          {disciplines.map((discipline) => (
            <article className="careers-discipline" key={discipline.title}>
              <h3>{discipline.title}</h3>
              <p>{discipline.description}</p>
              <Link className="text-link" to={discipline.href}>
                {discipline.example} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container careers-section careers-interest" id="introduce-yourself" aria-labelledby="careers-interest-title">
        <div className="careers-interest-copy">
          <p className="section-kicker">General expressions of interest</p>
          <h2 id="careers-interest-title">Start with<br />an introduction.</h2>
          <p>
            Tell us what you do, what you’d like to work on and share something you’ve made.
          </p>
        </div>
        <div className="careers-email-panel">
          <div>
            <p className="careers-email-label">Say hello to Huzaifa</p>
            <a className="careers-email-address" href={introductionUrl}>
              {careersEmail}<ArrowUpRight size={26} aria-hidden="true" />
            </a>
          </div>
          <div className="careers-email-details">
            <p>Send a short note with:</p>
            <ul>
              <li>Your resume or a link to your portfolio</li>
              <li>A project you’re proud of</li>
              <li>The kind of work you’d like to do</li>
            </ul>
          </div>
          <a className="button button-primary" href={introductionUrl}>
            Email your introduction <ArrowRight size={17} aria-hidden="true" />
          </a>
          <p className="careers-email-hint">Opens your email app. Add your resume or portfolio link.</p>
        </div>
      </section>
    </div>
  );
}
