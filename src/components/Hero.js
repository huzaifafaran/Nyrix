import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Bot, Cog, Star } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' 
      });
    }
    return false;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingIcons = [
    { Icon: Bot, delay: 0, x: 120, y: -100 },
    { Icon: Zap, delay: 1, x: 100, y: -50 },
    { Icon: Cog, delay: 2, x: 140, y: 80 },
    { Icon: Sparkles, delay: 1.5, x: -80, y: -80 },
    { Icon: Star, delay: 0.5, x: -100, y: 60 },
  ];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-blur"></div>
        <div className="hero-blur-2"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
              <Sparkles className="badge-icon" />
              <span>Beyond Analytics, Predictive Intelligence.</span>
            </motion.div>

            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            >
              <span className="title-dynamic">NYRIX</span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            >
              Decision Sciences that harness operational intelligence with agentic decision-making, empowering businesses to move beyond traditional analytics and into a new era of proactive, autonomous operations. Our expertise lies in transforming complex data into actionable insights, enabling systems to<br />make intelligent, real-time decisions.
            </motion.p>

            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
            >
              <motion.button
                className="cta-primary btn-primary"
                onClick={handleScheduleCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Schedule Demo</span>
                <ArrowRight className="cta-icon" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual" 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
          >
            <div className="visual-container">
              <motion.div
                className="central-orb"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2, duration: 1.5, ease: 'easeOut' }}
              >
                <motion.div 
                  className="orb-core"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 3.5,
                  }}
                >
                  <Star className="orb-icon" />
                </motion.div>
                <motion.div 
                  className="orb-ring"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.3, duration: 1, ease: 'easeOut' }}
                ></motion.div>
                <motion.div 
                  className="orb-ring-outer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.6, duration: 1, ease: 'easeOut' }}
                ></motion.div>
              </motion.div>

              {floatingIcons.map(({ Icon, delay, x, y }, index) => (
                <motion.div
                  key={index}
                  className="floating-icon"
                  style={{ 
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    delay: 3 + (index * 0.2),
                    duration: 0.8,
                    rotate: { duration: 0.6, ease: 'easeOut' },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 3.8 + (index * 0.2),
                    },
                  }}
                >
                  <Icon />
                </motion.div>
              ))}

              <div className="connecting-lines">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="line"
                    style={{ '--rotation': `${i * 60}deg` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 3.5 + (i * 0.1), duration: 0.8 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 5 }}
        >
          <ArrowRight className="scroll-icon" />
        </motion.div>
        <span>DISCOVER MORE</span>
      </motion.div>
    </section>
  );
};

export default Hero; 