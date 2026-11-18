/* Hallmark: preserve the existing monochrome marquee language. */
import React, { useEffect, useState } from "react";
import "./WorkMarquee.css";

const technologies = [
  { name: "Agentic AI & Autonomous Systems" },
  { name: "Multi-Agent Orchestration" },
  { name: "Computer Vision" },
  { name: "Visual Quality Assurance & Defect Detection" },
  { name: "Industrial Visual Inspection" },
  { name: "Multimodal AI & Reasoning" },
  { name: "Real-Time Video Analytics" },
  { name: "Object Detection, Segmentation & Tracking" },
  { name: "Document AI & Intelligent Information Extraction" },
  { name: "Speech AI & Real-Time Voice Intelligence" },
  { name: "Conversational Intelligence" },
  { name: "Enterprise Retrieval-Augmented Generation" },
  { name: "Knowledge Graphs & GraphRAG" },
  { name: "Predictive Analytics & Decision Intelligence" },
  { name: "Conversational AutoML" },
  { name: "Time-Series Forecasting" },
  { name: "Anomaly Detection & Early Warning Systems" },
  { name: "Predictive Maintenance" },
  { name: "Recommendation & Personalisation Engines" },
  { name: "Customer Intelligence & Behavioural Modelling" },
  { name: "Process Mining & Conformance Intelligence" },
  { name: "Causal Inference & Uplift Modelling" },
  { name: "Prescriptive Analytics & Decision Optimisation" },
  { name: "Simulation & Scenario Modelling" },
  { name: "Geospatial AI & Remote Sensing" },
  { name: "Synthetic Data Generation" },
  { name: "Model Fine-Tuning & Domain Adaptation" },
  { name: "Edge AI & On-Premises Inference" },
  { name: "AI Evaluation, Reliability & Observability" },
  { name: "MLOps & Production AI Infrastructure" }
];

// Original geometric symbols, drawn for Nyrix's monochrome technology strip.
const iconPaths = [
  "M16 3v5M10 10l6-3 6 3v9l-6 4-6-4z M13 15h6 M16 12v6 M6 23l4-3 M26 23l-4-3",
  "M16 4v7 M7 21l7-8 M25 21l-7-8 M13 11h6v5h-6z M4 21h6v6H4z M22 21h6v6h-6z",
  "M3 16c3-6 8-9 13-9s10 3 13 9c-3 6-8 9-13 9S6 22 3 16z M16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4 5h5 M23 27h5",
  "M5 11V5h6 M21 5h6v6 M27 21v6h-6 M11 27H5v-6 M10 16l4 4 8-9",
  "M4 25h24 M7 25V13l6-4v6l6-4v14 M22 25V8h5v17 M10 19h1 M15 19h1 M24 12h1",
  "M8 7h7v7H8z M18 8h7v7h-7z M13 19h7v7h-7z M15 10h3 M12 14l3 5 M22 15l-4 4",
  "M4 8h18v16H4z M22 13l6-4v14l-6-4 M8 19l3-4 3 2 4-5",
  "M5 5h7 M5 5v7 M27 5h-7 M27 5v7 M5 27h7 M5 27v-7 M27 27h-7 M27 27v-7 M11 10h9l3 5-4 7h-8l-3-6z",
  "M8 4h12l5 5v19H8z M20 4v6h5 M12 15h9 M12 19h6 M12 23h4 M22 22l4 4",
  "M5 15v2 M9 11v10 M13 7v18 M17 12v8 M21 9v14 M25 13v6 M28 15v2",
  "M5 6h18v13H12l-5 4v-4H5z M10 12h2 M15 12h2 M20 12h1 M24 13h3v11h-5l-3 3v-3h-4",
  "M5 6h12v19H5z M8 10h6 M8 14h6 M8 18h4 M21 9h6v6h-6z M17 16h5 M22 20l5 4 M22 20l-1 6",
  "M16 3l3 3-3 3-3-3z M6 13l3 3-3 3-3-3z M26 13l3 3-3 3-3-3z M16 23l3 3-3 3-3-3z M13 8l-5 6 M19 8l5 6 M9 18l5 6 M23 18l-5 6",
  "M5 25V7 M5 25h23 M9 20l5-6 4 3 7-9 M21 8h4v4 M9 25v-3 M14 25v-5 M19 25v-4 M24 25v-9",
  "M5 6h22v16H15l-5 4v-4H5z M10 13h3l2-4 3 8 2-4h2",
  "M4 24h24 M6 21l4-5 4 2 4-8 4 3 M22 13l4-5 M22 8h4v4 M25 20v5",
  "M16 4l12 21H4z M16 11v7 M16 21v1 M7 7l2 2 M25 7l-2 2",
  "M7 5l4 4-2 3-4-4 M9 12l13 13 3-3-13-13 M20 7a6 6 0 0 1 7-2l-4 4 1 3 3 1 4-4a6 6 0 0 1-7 7",
  "M16 4l2 7 7 2-7 2-2 7-2-7-7-2 7-2z M25 19l1 3 3 1-3 1-1 3-1-3-3-1 3-1z M7 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z",
  "M10 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M22 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M3 26c0-5 3-8 7-8s7 3 7 8 M17 19c5-3 12 0 12 7",
  "M4 6h7v7H4z M21 19h7v7h-7z M21 6h7v7h-7z M11 9h10 M24 13v6 M7 13v8h14 M17 18l4 3-4 3",
  "M6 5v22 M6 11h7l4-4h8 M6 18h7l4 5h8 M22 4l3 3-3 3 M22 20l3 3-3 3",
  "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24z M16 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M16 16l9-9 M21 7h4v4",
  "M16 4l11 6-11 6-11-6z M5 15l11 6 11-6 M5 20l11 6 11-6 M16 10v11",
  "M5 8l7-3 8 3 7-3v19l-7 3-8-3-7 3z M12 5v19 M20 8v19 M17 13l2 2-2 2-2-2z",
  "M6 8c0-3 20-3 20 0s-20 3-20 0z M6 8v12c0 3 20 3 20 0V8 M6 14c0 3 20 3 20 0 M16 19v9 M12 24h8",
  "M5 8h22 M10 5v6 M5 16h22 M21 13v6 M5 24h22 M14 21v6",
  "M9 9h14v14H9z M13 13h6v6h-6z M12 4v5 M20 4v5 M12 23v5 M20 23v5 M4 12h5 M4 20h5 M23 12h5 M23 20h5",
  "M4 17h5l3-7 4 13 3-9 2 3h7 M6 6h20v20H6z",
  "M6 5h20v7H6z M6 13h20v7H6z M6 21h20v7H6z M10 8h1 M10 16h1 M10 24h1 M17 8h6 M17 16h6 M17 24h6"
];

function TechnologyIcon({ index }) {
  return <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={iconPaths[index]} /></svg>;
}

function MarkGroup({ items, decorative = false }) {
  return <div className="work-marquee-group" aria-hidden={decorative || undefined}>
    {items.map(({ name, index }) => <span className="work-marquee-mark technology-mark" key={name}>
      <TechnologyIcon index={index} />
      <span>{name}</span>
    </span>)}
  </div>;
}

export default function WorkMarquee() {
  // Keep the server and first client render identical; vary the starting item after hydration.
  const [start, setStart] = useState(0);
  useEffect(() => { setStart(Math.floor(Math.random() * technologies.length)); }, []);
  const items = technologies.map((item, index) => ({ ...item, index }));
  const rotated = [...items.slice(start), ...items.slice(0, start)];
  return <section className="work-marquee-section" aria-labelledby="work-marquee-title">
    <div className="site-container work-marquee-caption"><span aria-hidden="true" /><h2 id="work-marquee-title">The Nyrix Spectrum</h2><span aria-hidden="true" /></div>
    <div className="work-marquee"><div className="work-marquee-viewport" tabIndex={0} aria-label="The Nyrix Spectrum; scroll to explore"><div className="work-marquee-belt"><MarkGroup items={rotated} /><MarkGroup items={rotated} decorative /></div></div></div>
  </section>;
}
