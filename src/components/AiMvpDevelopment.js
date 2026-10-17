import React from "react";
import ServiceDetail from "./ServiceDetail";

const page = {
  index: "01",
  title: "AI MVP development",
  headline: "Make the first version useful.",
  lead: "Start with one business decision or workflow. We define the data it needs, build a working AI system around it, and put it in front of the people who will use it.",
  media: "/media/service-ai-mvp.webp",
  mediaAlt: "Conceptual modular forms assembling into a working AI prototype",
  fitTitle: "A focused starting point",
  fit: "Use an MVP when the opportunity is clear but the right interaction, data path or model behavior still needs to be tested in practice.",
  workTitle: "From question to working system",
  work: [
    { title: "Frame the use case", detail: "Agree on the user, the decision to support and what a useful first version needs to do." },
    { title: "Connect the essentials", detail: "Bring together the relevant data, model behavior and application flow without building around assumptions." },
    { title: "Put it to use", detail: "Test the workflow with its intended users and use what they learn to guide the next iteration." },
  ],
  closing: "Have a specific AI workflow in mind?",
  closingCopy: "Tell us what your team needs to do and where the current process gets stuck.",
};

export default function AiMvpDevelopment() {
  return <ServiceDetail page={page} />;
}
