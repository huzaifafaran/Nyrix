import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Cog, BarChart3, Activity } from 'lucide-react';
import './ServicePage.css';

const BusinessTransformation = () => {
  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const services = [
    { icon: RefreshCw, title: 'Legacy System Modernization', desc: 'Breathing new life into older software by adding intelligent layers and modern API integrations.' },
    { icon: Cog, title: 'Workflow Automation', desc: 'Identifying repetitive, high-friction tasks and automating them with intelligent agents that learn and adapt.' },
    { icon: BarChart3, title: 'Predictive Analytics Integration', desc: 'Moving from reactive to proactive by leveraging your data to forecast trends, demand, and risks.' },
    { icon: Activity, title: 'Operational Intelligence Layers', desc: 'Building custom dashboards and decision-support systems that provide real-time, actionable insights.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <span className="sp-hero-badge">Transformation</span>
            <h1>Business Transformation.</h1>
            <p className="sp-hero-sub">
              Modernizing legacy for the future. We don't just add AI on top — we weave it into the fabric of your organization to unlock unprecedented efficiency.
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
            <h2 className="sp-section-title">Deep AI Integration</h2>
            <p className="sp-section-sub">Revolutionize how your business operates from the inside out.</p>
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
            <h2>Ready to modernize your business?</h2>
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

export default BusinessTransformation;
