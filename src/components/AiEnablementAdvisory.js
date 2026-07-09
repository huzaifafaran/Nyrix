import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck, Map, Settings, Users } from 'lucide-react';
import './ServicePage.css';

const AiEnablementAdvisory = () => {
  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const services = [
    { icon: ClipboardCheck, title: 'AI Readiness Assessment', desc: 'A comprehensive audit of your current data infrastructure, team capabilities, and business processes to determine where AI can provide the most value.' },
    { icon: Map, title: 'Strategic Roadmap Development', desc: 'A step-by-step plan for AI integration, prioritizing quick wins and long-term competitive advantages.' },
    { icon: Settings, title: 'Technology Stack Selection', desc: 'Independent advice on choosing the right LLMs, vector databases, and AI frameworks tailored to your specific needs.' },
    { icon: Users, title: 'Change Management Support', desc: 'Helping your workforce adapt to AI-driven workflows through training and cultural alignment.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <span className="sp-hero-badge">Advisory</span>
            <h1>AI Enablement & Advisory.</h1>
            <p className="sp-hero-sub">
              Strategic guidance for the AI-first era. We help businesses navigate the complex AI landscape, identifying high-impact opportunities while minimizing risk and disruption to current operations.
            </p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Schedule a Consultation <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">How We Guide You</h2>
            <p className="sp-section-sub">From assessment to execution, we're with you every step of the way.</p>
          </motion.div>
          <div className="sp-cards">
            {services.map((s, i) => (
              <motion.div key={i} className="sp-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="sp-card-icon"><s.icon /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sp-bottom-cta">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2>Ready to start your AI journey?</h2>
            <p>Let's discuss how we can help your business thrive in the AI age.</p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Schedule a Consultation <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiEnablementAdvisory;
