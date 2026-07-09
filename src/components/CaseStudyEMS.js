import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, Globe, Shield, Activity, Zap, Cpu, Map, AlertTriangle } from 'lucide-react';
import './ServicePage.css';

const CaseStudyEMS = () => {
  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const techStackFrontend = ['React with Vite', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Socket.IO Client', 'Recharts', 'jsPDF', 'html2canvas'];
  const techStackBackend = ['NestJS', 'TypeScript', 'Prisma', 'MySQL', 'PostgreSQL / SQLite', 'Socket.IO WebSockets'];

  const features = [
    { icon: Activity, title: 'Real-Time Telemetry', desc: 'Direct connection with legacy industrial MySQL database to extract live physical sensor tags, streamed to frontend via WebSockets.' },
    { icon: Globe, title: 'Modern Dashboard', desc: 'Dark-mode first monitoring interface designed for high contrast and fast readability for facility operators.' },
    { icon: Map, title: 'Interactive Floor Plan', desc: 'Dynamic cleanroom zones reflecting status colors (Green, Amber, Red, Grey) for instant visual understanding of facility-wide compliance.' },
    { icon: Shield, title: 'Advanced Alarm Logic', desc: 'Strict state hierarchy determining room health based on hardware conditions, communication failures, and threshold breaches.' },
    { icon: AlertTriangle, title: 'Stale Data Detection', desc: 'Automatically detects when physical sensors stop transmitting fresh values, warning operators of silent hardware failures.' },
    { icon: Cpu, title: 'Operator Display', desc: 'A dedicated Sterile Area Board for large-screen display inside or outside cleanroom areas for high-visibility.' },
    { icon: Database, title: 'Resilient Configuration', desc: 'In-memory configuration fallback ensures the monitoring interface remains operational even during partial backend database failures.' },
    { icon: Code, title: 'Role-Based Access Control', desc: 'Secure RBAC for separating responsibilities like managing users, updating thresholds, and acknowledging alarms.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero border-b border-nyrix-glassBorder/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-nyrix-purple/20 pb-4 inline-block">
              Case Study: Genix
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
              Genix Cleanroom Monitoring System
            </h1>
            <p className="sp-hero-sub">
              An enterprise-grade, real-time Environmental Monitoring System designed specifically for Genix pharmaceutical cleanroom environments to support GMP and ISO compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Overview</h2>
            <p className="sp-section-sub">Bridging modern web technologies with legacy industrial monitoring systems.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto text-lg text-nyrix-dark/80 leading-relaxed space-y-6">
            <p>
              The Cleanroom EMS reads live sensor data from an industrial MySQL database, processes raw SCADA-style hardware tags, applies strict alarm and state logic, and streams cleanroom health updates to a high-performance React dashboard in real time.
            </p>
            <p>
              The platform is built for facility operators, supervisors, and administrators who need a reliable, high-visibility monitoring system for pharmaceutical manufacturing environments.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="sp-section">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Tech Stack</h2>
            <p className="sp-section-sub">Built with a scalable, modern technology stack.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.div className="text-left border-t border-black/10 pt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-nyrix-purple">
                  <Globe size={32} />
                </div>
                <h3 className="text-2xl font-bold">Frontend</h3>
              </div>
              <ul className="space-y-3">
                {techStackFrontend.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-nyrix-dark/70 font-mono text-[13px]">
                    <Zap size={14} className="text-nyrix-purpleBright" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="text-left border-t border-black/10 pt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-nyrix-purple">
                  <Database size={32} />
                </div>
                <h3 className="text-2xl font-bold">Backend</h3>
              </div>
              <ul className="space-y-3">
                {techStackBackend.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-nyrix-dark/70 font-mono text-[13px]">
                    <Zap size={14} className="text-nyrix-purpleBright" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Key Features</h2>
            <p className="sp-section-sub">Comprehensive tools designed for industrial compliance.</p>
          </motion.div>
          <div className="sp-cards">
            {features.map((feature, i) => (
              <motion.div key={i} className="sp-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="sp-card-icon"><feature.icon /></div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standout & Summary */}
      <section className="sp-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-bold mb-6 text-nyrix-dark">What Makes This Stand Out</h2>
              <div className="space-y-6 text-nyrix-dark/80">
                <div>
                  <h4 className="font-bold text-nyrix-purple">Bridging IT and OT</h4>
                  <p>Connects modern software architecture with operational technology by integrating React, NestJS, and WebSockets with legacy SCADA-style tags.</p>
                </div>
                <div>
                  <h4 className="font-bold text-nyrix-purple">Mission-Critical</h4>
                  <p>Unlike a generic dashboard, this supports pharmaceutical manufacturing compliance where real-time accuracy directly impacts production quality.</p>
                </div>
                <div>
                  <h4 className="font-bold text-nyrix-purple">Production-Ready Resilience</h4>
                  <p>Designed to keep functioning even when production environments have partial database schema issues via an in-memory fallback mechanism.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="pt-8 border-t border-black/10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-bold mb-6 text-nyrix-dark">Portfolio Summary</h2>
              <p className="text-nyrix-dark/80 leading-relaxed mb-6">
                The Genix Cleanroom EMS is a real-time, compliance-focused monitoring platform built for pharmaceutical cleanrooms. It combines industrial data ingestion, live telemetry streaming, advanced alarm logic, interactive visualization, role-based access control, and browser-based reporting into a single enterprise-grade system.
              </p>
              <p className="text-nyrix-dark/80 leading-relaxed">
                The project demonstrates strong capability in full-stack architecture, real-time systems, industrial software integration, mission-critical dashboard design, and production resilience engineering.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sp-bottom-cta">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2>Ready to build a resilient system?</h2>
            <p>Let's modernize your industrial operations with enterprise-grade software.</p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Schedule a Discovery Call <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyEMS;
