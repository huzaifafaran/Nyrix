import React from "react";
import ServiceDetail from "./ServiceDetail";

const page = {
  index: "04",
  title: "AI strategy & governance",
  headline: "Give AI decisions clear ownership.",
  lead: "An AI initiative needs more than a model. It needs a defined purpose, accountable people and a way to examine its output and risks as the work changes.",
  media: "/media/service-ai-governance.webp",
  mediaAlt: "Conceptual layered decision boundaries and a carefully routed violet signal",
  fitTitle: "A structure for decisions",
  fit: "Governance becomes useful when teams can explain what a system is for, who reviews its results and when a person should step in.",
  workTitle: "Put responsibility into the design",
  work: [
    { title: "Set the purpose", detail: "Define the decision, users and limits of the proposed AI system." },
    { title: "Assign oversight", detail: "Clarify who approves changes, reviews results and handles exceptions." },
    { title: "Plan for review", detail: "Decide what to observe over time so the system can be questioned and adjusted." },
  ],
  closing: "Need a clearer AI decision framework?",
  closingCopy: "Tell us what you are planning and which questions your team needs to resolve.",
};

export default function AiStrategyGovernance() {
  return <ServiceDetail page={page} />;
}
