import React from "react";
import ServiceDetail from "./ServiceDetail";

const page = {
  index: "03",
  title: "Business transformation",
  headline: "Connect intelligence to operations.",
  lead: "The value of an AI system depends on where it enters the work. We design integrations and workflows that connect existing systems, teams and decisions.",
  media: "/media/service-business-transformation.webp",
  mediaAlt: "Conceptual operational layers connected by a continuous violet signal",
  fitTitle: "Work across the seams",
  fit: "Transformation matters when information is scattered across tools or when important decisions depend on slow, manual handoffs.",
  workTitle: "Design around real operations",
  work: [
    { title: "See the whole workflow", detail: "Trace how information moves between systems and where people need clearer signals." },
    { title: "Build the connections", detail: "Integrate data and software into a workflow that fits the operating environment." },
    { title: "Make change usable", detail: "Give teams a way to review outputs, intervene where needed and learn from use." },
  ],
  closing: "Where does your workflow break down?",
  closingCopy: "Walk us through the process you want to improve and the systems it touches.",
};

export default function BusinessTransformation() {
  return <ServiceDetail page={page} />;
}
