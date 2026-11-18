import BrandWordmark from "./BrandWordmark";
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import FooterShowcase from "./FooterShowcase";

const groups = [
  { title: "What we do", links: [["Our approach", "/what-we-do"], ["AI strategy", "/what-we-do#decision-framing"], ["AI enablement", "/what-we-do#ai-enablement"], ["Engineering", "/what-we-do#productisation"], ["Governance", "/what-we-do#governance"]] },
  { title: "Products & solutions", links: [["KINLU", "/products/kinlu"], ["KINLU Voice", "/products/kinlu-voice"], ["Decision domains", "/solutions"], ["Industries", "/industries"], ["Case studies", "/case-studies"]] },
  { title: "Company", links: [["About Nyrix", "/company"], ["Our team", "/company/team"], ["Our advisors", "/company/advisors"], ["R&D wing", "/company/research"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { title: "Explore", links: [["All insights", "/resources"], ["Articles", "/resources/articles"], ["The Next Question", "/resources/podcasts"], ["Agent library", "/agents"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <FooterShowcase />
      <div className="site-container footer-directory">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="site-brand" aria-label="Nyrix home">
              <BrandWordmark className="site-wordmark" decorative />
            </Link>
            <p className="footer-brand-copy">
              Decision sciences and applied AI for the
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
          <span>© {new Date().getFullYear()} NYRIX AI (PRIVATE) LIMITED. All rights reserved.</span>
          <Link to="/privacy-policy">Privacy policy</Link>
          <button type="button" className="footer-consent-button" onClick={(event) => window.NyrixConsent?.open(event.currentTarget)}>Cookie preferences</button>
          <span>Beyond insight. Into foresight.</span>
        </div>
      </div>
    </footer>
  );
}
