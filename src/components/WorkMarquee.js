/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import React from "react";
import "./WorkMarquee.css";

const marks = [
  { name: "Gerry's dnata", image: "/media/logo-gerrys-dnata-transparent.png", className: "work-mark-gerrys" },
  { name: "GENIX", image: "/media/logo-genix-transparent.png", className: "work-mark-genix" },
  { name: "TeachMeBack", image: "/media/logo-teachmeback.png", className: "work-mark-teachmeback" },
  { name: "Vintage Biryani", image: "/media/logo-vintage-biryani-transparent.png", className: "work-mark-vintage" },
  { name: "Sejong-si Ramyun", image: "/media/logo-sejongsi-ramyun-transparent.png", className: "work-mark-sejong" },
];

function MarkGroup({ decorative = false }) {
  return (
    <div className="work-marquee-group" aria-hidden={decorative || undefined}>
      {[...marks, ...marks, ...marks].map((mark, index) => (
        <span className={`work-marquee-mark ${mark.className}`} key={`${mark.name}-${index}`} aria-hidden={index >= marks.length || undefined}>
          <img src={mark.image} alt="" loading="lazy" />
          {mark.className === "work-mark-teachmeback" ? <span>{mark.name}</span> : <span className="sr-only">{mark.name}</span>}
        </span>
      ))}
    </div>
  );
}

export default function WorkMarquee() {
  return (
    <section className="work-marquee-section" aria-labelledby="work-marquee-title">
      <div className="site-container work-marquee-caption">
        <span aria-hidden="true" />
        <h2 id="work-marquee-title">We’ve worked with</h2>
        <span aria-hidden="true" />
      </div>
      <div className="work-marquee">
        <div className="work-marquee-viewport">
          <div className="work-marquee-belt">
            <MarkGroup />
            <MarkGroup decorative />
          </div>
        </div>
      </div>
    </section>
  );
}
