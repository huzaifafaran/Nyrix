import React from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "../content/nyrixContent";
import EmphasizedTitle from "./EmphasizedTitle";
import "./CaseStudyDetail.css";

const narratives = {
  "cleanroom-ems": {
    heading: "Environmental data, made useful.",
    context:
      "Cleanroom teams need environmental readings in a form they can inspect while managing daily operations. This project connects monitoring data from Genix pharmaceutical cleanrooms to a web interface designed around that work.",
    work: [
      {
        title: "Environmental data",
        description:
          "Bring readings from the cleanroom environment into a single monitoring application.",
      },
      {
        title: "Operational view",
        description:
          "Present telemetry in a browser interface so the information is easier to review in context.",
      },
      {
        title: "Built for the setting",
        description:
          "Shape the interface around the needs of a pharmaceutical cleanroom rather than a generic analytics dashboard.",
      },
    ],
    close:
      "The work illustrates how operational data can become a focused interface for the people who use it.",
  },
  teachmeback: {
    heading: "Learning by explaining.",
    context:
      "TeachMeBack explores a different way to study: the learner explains a subject to an AI student, Emma. The public experience introduces note upload, questions from Emma and active recall as the core learning flow.",
    work: [
      {
        title: "Bring your notes",
        description:
          "The public experience invites learners to start with material they are already studying.",
      },
      {
        title: "Explain it to Emma",
        description:
          "The learner takes the teacher's role, putting an idea into their own words.",
      },
      {
        title: "Keep the conversation going",
        description:
          "Questions make the exchange active and give the learner another way to revisit the subject.",
      },
    ],
    close:
      "The project turns a simple learning premise into an approachable product experience.",
  },
};

export default function CaseStudyDetail({ slug }) {
  const study = caseStudies.find((item) => item.slug === slug);
  const narrative = narratives[slug];

  if (!study || !narrative) return null;

  return (
    <article className="cs-detail">
      <header className="cs-detail-head site-container">
        <Link className="cs-back" to="/case-studies">
          <span aria-hidden="true">←</span> All work
        </Link>
        <div className="cs-detail-title-row">
          <div>
            <p className="cs-eyebrow">{study.category}</p>
            <h1><EmphasizedTitle text={study.title} /></h1>
          </div>
          <p className="cs-detail-deck">{study.description}</p>
        </div>
      </header>

      <figure className="cs-detail-figure site-container">
        <img
          src={study.image}
          alt={study.imageAlt}
          width="1600"
          height="1067"
          fetchpriority="high"
        />
      </figure>

      <section className="cs-detail-context site-container" aria-labelledby="cs-context-title">
        <p className="cs-eyebrow">The project</p>
        <div className="cs-detail-context-copy">
          <h2 id="cs-context-title">{narrative.heading}</h2>
          <p>{narrative.context}</p>
        </div>
      </section>

      <section className="cs-detail-work" aria-labelledby="cs-work-title">
        <div className="site-container">
          <div className="cs-detail-work-head">
            <p className="cs-eyebrow">The work</p>
            <h2 id="cs-work-title">What the experience brings together.</h2>
          </div>
          <ol className="cs-detail-steps">
            {narrative.work.map((item, index) => (
              <li key={item.title}>
                <span className="cs-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <aside className="cs-detail-close site-container">
        <p>{narrative.close}</p>
        <div className="cs-detail-actions">
          <Link to="/case-studies">
            More work <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/contact">
            Talk to our team <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </aside>
    </article>
  );
}
