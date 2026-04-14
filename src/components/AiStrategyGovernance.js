import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Scale, Lock, TrendingUp } from 'lucide-react';
import './ServicePage.css';

const AiStrategyGovernance = () => {
  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' });
    }
  };

  const services = [
    { icon: Shield, title: 'Risk Mitigation Frameworks', desc: 'Identifying and neutralizing potential security vulnerabilities and operational risks associated with AI deployment.' },
    { icon: Scale, title: 'Ethical AI Guidelines', desc: 'Establishing clear principles for bias detection, transparency, and accountability in your AI systems.' },
    { icon: Lock, title: 'Data Privacy Compliance', desc: 'Ensuring all AI initiatives adhere to global standards like GDPR, SOC 2, and industry-specific regulations.' },
    { icon: TrendingUp, title: 'Performance Monitoring', desc: 'Implementing robust tracking to measure ROI, accuracy, and the ongoing health of your AI models.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-glow" />
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <span className="sp-hero-badge">Governance</span>
            <h1>AI Strategy <span className="accent">& Governance</span></h1>
            <p className="sp-hero-sub">
              Secure, ethical, and high-ROI AI. We provide the frameworks necessary to manage risk, maintain compliance, and ensure your AI investments deliver measurable results.
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
            <h2 className="sp-section-title">Sustainable AI at Scale</h2>
            <p className="sp-section-sub">Ensuring your transition to AI is safe, compliant, and delivers ROI.</p>
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
            <h2>Ready to govern AI with confidence?</h2>
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

export default AiStrategyGovernance;
