import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, TrendingUp, DollarSign, Monitor, Bot, Code, Cloud } from 'lucide-react';
import './ServicePage.css';

const AiMvpDevelopment = () => {
  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' });
    }
  };

  const whyCards = [
    { icon: Zap, title: 'Speed Without Compromise', desc: 'We use a battle-tested framework to deliver high-quality code at lightning speed, ensuring your idea hits the market while it\'s still fresh.' },
    { icon: Layers, title: 'Full-Stack AI Integration', desc: 'From LLM orchestration and vector databases to intuitive frontends, we handle the entire technical stack for your AI solution.' },
    { icon: TrendingUp, title: 'Scalable Architecture', desc: 'Built on modern stacks that grow with your business. This isn\'t just a throwaway prototype; it\'s a foundation for your future.' },
    { icon: DollarSign, title: 'Fixed-Price, Fixed-Timeline', desc: 'No hidden costs, no scope creep. We commit to a 14-day delivery window and a transparent pricing model.' },
  ];

  const timeline = [
    { step: 1, title: 'Discovery', desc: 'Day 1–2: Scoping and technical architecture mapping.' },
    { step: 2, title: 'AI Core', desc: 'Day 3–5: LLM setup and data pipeline integration.' },
    { step: 3, title: 'UX/UI Build', desc: 'Day 6–10: Building a sleek, responsive frontend.' },
    { step: 4, title: 'Testing', desc: 'Day 11–13: Rigorous QA and performance tuning.' },
    { step: 5, title: 'Launch', desc: 'Day 14: Your functional AI MVP is live.' },
  ];

  const deliverables = [
    { icon: Monitor, title: 'Functional Web/Mobile App', desc: 'A fully interactive product ready for real users.' },
    { icon: Bot, title: 'AI Engine Integration', desc: 'Custom-tuned LLM or agentic workflows tailored to your use case.' },
    { icon: Code, title: 'Production-Ready Codebase', desc: 'Clean, documented, and ready for your team to take over.' },
    { icon: Cloud, title: 'Deployment Support', desc: 'We help you get it live on your preferred cloud provider.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-glow" />
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <span className="sp-hero-badge">AI MVP Development</span>
            <h1>From Concept to <span className="accent">AI MVP</span> in Under 2 Weeks</h1>
            <p className="sp-hero-sub">
              Stop waiting months for a prototype. We build and launch functional, production-ready AI products in just 14 days — so you can test, iterate, and scale faster.
            </p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Build My MVP Now <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Nyrix */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Why Choose Nyrix for Your MVP?</h2>
            <p className="sp-section-sub">We combine speed with enterprise-grade quality.</p>
          </motion.div>
          <div className="sp-cards">
            {whyCards.map((card, i) => (
              <motion.div key={i} className="sp-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="sp-card-icon"><card.icon /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 14-Day Roadmap */}
      <section className="sp-section">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">The 14-Day Roadmap</h2>
            <p className="sp-section-sub">A transparent, high-velocity process from start to finish.</p>
          </motion.div>
          <div className="sp-timeline">
            {timeline.map((step, i) => (
              <motion.div key={i} className="sp-timeline-step" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.12, duration: 0.5 }}>
                <div className="sp-step-number">{step.step}</div>
                <div className="sp-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">What You Get</h2>
            <p className="sp-section-sub">A complete package that lets you start collecting user feedback immediately.</p>
          </motion.div>
          <div className="sp-deliverables">
            {deliverables.map((d, i) => (
              <motion.div key={i} className="sp-deliverable" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="sp-deliverable-icon"><d.icon /></div>
                <div>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="sp-stats">
            <div className="sp-stat"><div className="sp-stat-value">14 Days</div><div className="sp-stat-label">MVP Ready</div></div>
            <div className="sp-stat"><div className="sp-stat-value">Production</div><div className="sp-stat-label">Grade Quality</div></div>
            <div className="sp-stat"><div className="sp-stat-value">Fixed</div><div className="sp-stat-label">Price & Timeline</div></div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sp-bottom-cta">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2>Ready to see your idea in action?</h2>
            <p>Don't let your vision sit on a whiteboard. Let's build it together.</p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Schedule a Discovery Call <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiMvpDevelopment;
