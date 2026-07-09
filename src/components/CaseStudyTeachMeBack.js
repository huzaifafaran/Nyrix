import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, MessageCircle, Trophy, Upload, Target, Star, Play } from 'lucide-react';
import './ServicePage.css';

const CaseStudyTeachMeBack = () => {
  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const features = [
    { icon: Brain, title: 'The Protégé Effect', desc: 'When users prepare to teach, their brain automatically organizes information into logical structures, securing long-term retention.' },
    { icon: MessageCircle, title: 'Adaptive Inquiry', desc: 'Emma (the AI student) challenges users with targeted follow-up questions, forcing active retrieval of key details.' },
    { icon: Trophy, title: 'Reward Loops', desc: 'Unlock achievements, maintain study streaks, and watch subject metrics climb through gamified progression.' },
    { icon: Upload, title: 'Multi-format Parsing', desc: 'Users can drop PDFs, DOCX, or TXT notes directly into the workspace for instant curriculum generation.' },
    { icon: Target, title: 'Active Recall Engine', desc: 'Instead of passive reading, the system forces users to synthesize what they know, uncovering gaps in real-time.' },
    { icon: Star, title: 'Subject Mastery Tracking', desc: 'Gain XP, protect active streaks, and track subject-level understanding comprehensively.' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* Hero */}
      <section className="sp-hero border-b border-nyrix-glassBorder/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-nyrix-purple/20 pb-4 inline-block">
              Case Study: Brady Mickle
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
              TeachMeBack AI
            </h1>
            <p className="sp-hero-sub">
              An innovative AI-powered learning platform where users master subjects faster through active recall by teaching an AI student named Emma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Overview</h2>
            <p className="sp-section-sub">Turning static study notes into an interactive, gamified learning partnership.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto text-lg text-nyrix-dark/80 leading-relaxed space-y-6">
            <p>
              Built for Brady Mickle, <strong>TeachMeBack AI</strong> leverages the power of the Protégé Effect. Passive reading often creates the illusion of competence. TeachMeBack forces users to synthesize what they know by explaining concepts to an adaptive AI persona.
            </p>
            <p>
              The platform processes uploaded notes and initiates an interactive session where the user becomes the teacher. The AI asks clarifying questions, guiding the user to uncover their knowledge gaps while rewarding them with a gamified progression system.
            </p>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="sp-section">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">The Process</h2>
            <p className="sp-section-sub">Three simple moves to master any subject.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <motion.div className="text-left border-t border-black/10 pt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <div className="text-nyrix-purple mb-6 font-display text-4xl font-black">01</div>
              <h3 className="text-2xl font-bold mb-3 text-nyrix-dark">Upload Notes</h3>
              <p className="text-nyrix-dark/70">Drop PDFs, documents, or markdown notes directly into the workspace.</p>
            </motion.div>

            <motion.div className="text-left border-t border-black/10 pt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="text-[#06b6d4] mb-6 font-display text-4xl font-black">02</div>
              <h3 className="text-2xl font-bold mb-3 text-nyrix-dark">Teach Emma</h3>
              <p className="text-nyrix-dark/70">Explain the concepts in your own words. Emma will ask clarifying questions.</p>
            </motion.div>

            <motion.div className="text-left border-t border-black/10 pt-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
              <div className="text-emerald-600 mb-6 font-display text-4xl font-black">03</div>
              <h3 className="text-2xl font-bold mb-3 text-nyrix-dark">Gain Mastery</h3>
              <p className="text-nyrix-dark/70">Gain XP, protect your active streak, and track subject-level understanding.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="sp-section alt">
        <div className="container">
          <motion.div className="sp-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="sp-section-title">Key Features</h2>
            <p className="sp-section-sub">Cognitive science integrated seamlessly into software.</p>
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
                  <h4 className="font-bold text-nyrix-purple">Flipping the AI Paradigm</h4>
                  <p>Instead of an AI that spoon-feeds answers to a student, this system makes the AI the student. This forces the human user to engage in deep cognitive processing, drastically improving retention.</p>
                </div>
                <div>
                  <h4 className="font-bold text-nyrix-purple">Intelligent Parsing</h4>
                  <p>Seamlessly digests unstructured study materials across multiple formats (PDF, DOCX) and structures them into a coherent curriculum for the AI persona to query against.</p>
                </div>
                <div>
                  <h4 className="font-bold text-nyrix-purple">Gamified Learning</h4>
                  <p>Incorporates streaks, XP progression, and mastery levels to keep users consistently engaged and motivated to return to their studies.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="pt-8 border-t border-black/10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-bold mb-6 text-nyrix-dark">Portfolio Summary</h2>
              <p className="text-nyrix-dark/80 leading-relaxed mb-6">
                TeachMeBack AI is a revolutionary educational platform built for Brady Mickle that leverages the Protégé Effect. By allowing users to teach their study materials to an AI persona, the platform drives deep active recall and higher long-term retention compared to traditional study methods.
              </p>
              <p className="text-nyrix-dark/80 leading-relaxed">
                The application highlights our expertise in orchestrating Large Language Models, document processing pipelines, and building engaging, gamified user interfaces tailored to educational use cases.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sp-bottom-cta">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2>Ready to build your next big idea?</h2>
            <p>From complex AI agents to sleek SaaS products, we deliver.</p>
            <motion.button className="sp-hero-cta" onClick={handleScheduleCall} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Schedule a Discovery Call <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyTeachMeBack;
