/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { team } from "../content/nyrixContent";
import "./TeamShowcase.css";

export default function TeamShowcase({ initialIndex = 1, showViewAll = true, isFullPage = false }) {
  // Default to index 1 (Huzaifa Faran) as featured in the reference, or 0
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 && initialIndex < team.length ? initialIndex : 0
  );
  const [direction, setDirection] = useState(1);

  const currentMember = team[currentIndex] || team[0];
  const totalCount = team.length;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
  };

  const selectMember = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <section className="team-showcase" aria-label="Team spotlight">
      {/* Background organic ribbon curve & soft paper tone */}
      <div className="team-showcase-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            d="M-200 240 C 250 300, 500 120, 850 210 C 1150 290, 1350 160, 1640 220 L 1640 680 L -200 680 Z"
            fill="#f7f5fb"
            opacity="0.9"
          />
          <path
            d="M -200 640 C 100 640, 250 330, 500 360 C 800 450, 1100 300, 1640 460 L 1640 680 L -200 680 Z"
            fill="#eeebf7"
            opacity="0.75"
          />
          <path
            d="M-100 180 Q 250 110, 650 270 T 1400 200"
            stroke="#e2dcf0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="team-showcase-foreground-accent" aria-hidden="true" />

      <div className="site-container team-showcase-container">
        {/* Left Column: Heading */}
        <div className="team-showcase-left">
          <h2 className="team-showcase-heading">
            Engineering grounded in <em>curiosity.</em>
          </h2>
          <p className="team-showcase-copy">
            A small team building practical AI systems for real businesses.
          </p>
          {showViewAll && (
            <div style={{ marginTop: "28px" }}>
              <Link className="text-link" to="/company/team">
                Meet the full team <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Center Column: Featured Portrait Card and Interactive Avatar Dock */}
        <div className="team-showcase-center">
          <div className="team-portrait-card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={currentMember.name}
                src={currentMember.photo}
                alt=""
                aria-hidden="true"
                width="390"
                height="430"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* Interactive thumb dock with layout animation */}
          <div className="team-dock" role="tablist" aria-label="Team members">
            {team.map((member, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={member.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View profile for ${member.name}`}
                  className={`team-dock-btn ${isActive ? "active" : ""}`}
                  onClick={() => selectMember(idx)}
                >
                  <div className="team-dock-avatar" aria-hidden="true">
                    <img
                      src={member.photo}
                      alt=""
                      width="44"
                      height="44"
                      loading="lazy"
                    />
                  </div>
                  {isActive && (
                    <motion.div
                      className="team-dock-info"
                      initial={{ opacity: 0, width: 0, x: -8 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: 8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="team-dock-name">{member.name}</span>
                      <span className="team-dock-role">{member.role.split(" & ")[0]}</span>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Counter, Navigation Arrows, and Member Details */}
        <div className="team-showcase-right">
          <div className="team-showcase-header">
            <div className="team-counter">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="team-counter-muted">
                {" "}
                / {String(totalCount).padStart(2, "0")}
              </span>
            </div>
            <div className="team-arrows">
              <button
                type="button"
                className="team-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous team member"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                className="team-arrow-btn active-arrow"
                onClick={handleNext}
                aria-label="Next team member"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="team-details-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentMember.name}
                initial={{ opacity: 0, y: direction * 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="team-member-name" aria-live="polite">
                  {currentMember.name}
                </div>
                <p className="team-member-role">{currentMember.role.toUpperCase()}</p>
                <div className="team-member-divider" aria-hidden="true" />
                <p className="team-member-bio">{currentMember.bio}</p>

                <div className="team-member-links">
                  {currentMember.profileUrl && (
                    <a
                      className="text-link"
                      href={currentMember.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn profile <ArrowRight size={15} />
                    </a>
                  )}
                  <Link className="text-link" to="/company/advisors">
                    Meet our advisors <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Semantic accessible directory for full page view */}
      {isFullPage && (
        <div className="ep-sr-only" aria-hidden="false">
          {team.map((person) => (
            <article key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              <img src={person.photo} alt={person.name} />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

