import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import FooterShowcase from "./FooterShowcase";

const groups = [
  {
    title: "Solutions",
    links: [
      ["AI MVP development", "/ai-mvp-development"],
      ["AI enablement & advisory", "/ai-enablement-advisory"],
      ["Business transformation", "/business-transformation"],
      ["AI strategy & governance", "/ai-strategy-governance"],
    ],
  },
  {
    title: "Products",
    links: [
      ["Kinlu", "/products/kinlu"],
      ["Artifex", "/products/artifex"],
      ["Numaya", "/products/numaya"],
      ["Veeko", "/products/veeko"],
      ["Agent library", "/agents"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Nyrix", "/company"],
      ["Our team", "/company/team"],
      ["Our advisors", "/company/advisors"],
      ["Our work", "/case-studies"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Insights",
    links: [
      ["All insights", "/resources"],
      ["Articles & publications", "/resources/articles"],
      ["The Next Question", "/resources/podcasts"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <FooterShowcase />
      <div className="site-container footer-directory">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="site-brand" aria-label="Nyrix home">
              <img src="/logo icon no-bg.png" alt="" width="42" height="42" />
              <span className="site-wordmark">nyrix.</span>
            </Link>
            <p className="footer-brand-copy">
              Decision sciences, AI systems and intelligent workflows for the
              way your business works.
            </p>
          </div>
          {groups.map((group) => (
            <nav
              className="footer-column"
              aria-label={`Footer ${group.title}`}
              key={group.title}
            >
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, path]) => (
                  <li key={path}>
                    <Link to={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-contact">
          <p>
            Have a question?{" "}
            <a href="mailto:hello@nyrix.co">
              hello@nyrix.co{" "}
              <ArrowUpRight size={12} style={{ display: "inline" }} />
            </a>
          </p>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/nyrixai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nyrix on LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://www.youtube.com/@NyrixAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nyrix AI on YouTube"
            >
              <Youtube size={17} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nyrix. All rights reserved.</span>
          <Link to="/privacy-policy">Privacy policy</Link>
          <span>Beyond insight. Into foresight.</span>
        </div>
      </div>
    </footer>
  );
}
