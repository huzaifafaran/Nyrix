import React from "react";
import ServiceDetail from "./ServiceDetail";

const page = {
  index: "02",
  title: "AI enablement & advisory",
  headline: "Find where AI belongs in the work.",
  lead: "Useful adoption starts with the way your teams already operate. We examine the work, the available data and the constraints, then shape a practical path for introducing AI.",
  media: "/media/service-ai-enablement.webp",
  mediaAlt: "Conceptual layers of knowledge and human decision making linked by a violet path",
  fitTitle: "Before the tool comes the task",
  fit: "This work is for organizations weighing several AI ideas, building internal capability or deciding what to pursue first.",
  workTitle: "A grounded adoption path",
  work: [
    { title: "Understand the current work", detail: "Map the processes, handoffs and decisions where better information or automation could help." },
    { title: "Assess what is ready", detail: "Look at data access, system constraints and the people who will own the work after launch." },
    { title: "Choose a first move", detail: "Prioritize a manageable use case and define how the team will evaluate it." },
  ],
  closing: "Deciding where to begin?",
  closingCopy: "Share the opportunities on your table. We can help turn them into a focused next step.",
};

export default function AiEnablementAdvisory() {
  return <ServiceDetail page={page} />;
}
