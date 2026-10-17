import React from "react";

const meaningfulWord = {
  "Applied AI, built around real work.": "work",
  "Our team": "team",
  "Our advisors": "advisors",
  "A practical path for your AI initiative.": "practical",
  "AI for decisions, creative work and marketing.": "decisions",
  "Real problems. Thoughtful engineering.": "engineering",
  "Thinking from Nyrix.": "Thinking",
  "Articles & publications": "publications",
  "The Next Question": "Question",
  "Tell us what you’re working on.": "working",
  "This page could not be found.": "found",
  "Make the first version useful.": "useful",
  "Find where AI belongs in the work.": "work",
  "Connect intelligence to operations.": "operations",
  "Give AI decisions clear ownership.": "ownership",
  "Cleanroom environmental monitoring": "monitoring",
  "TeachMeBack AI": "TeachMeBack",
  "Agent library": "library",
};

/** One deliberate editorial accent while preserving the heading's plain-text name. */
export default function EmphasizedTitle({ text, word }) {
  if (typeof text !== "string") return text;
  const focus = word || meaningfulWord[text] || text.match(/[\p{L}\p{N}]+(?=[^\p{L}\p{N}]*$)/u)?.[0];
  if (!focus) return text;
  const index = text.toLocaleLowerCase().lastIndexOf(focus.toLocaleLowerCase());
  if (index < 0) return text;
  return <>{text.slice(0, index)}<em className="nyrix-title-accent">{text.slice(index, index + focus.length)}</em>{text.slice(index + focus.length)}</>;
}
