import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Bot, Cog } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['AI Agents', 'Automation', 'Innovation', 'Excellence'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
    { Icon: Bot, delay: 0, x: 100, y: 50 },
    { Icon: Zap, delay: 1, x: -80, y: 80 },
    { Icon: Cog, delay: 2, x: 120, y: -60 },
    { Icon: Sparkles, delay: 1.5, x: -100, y: -40 },
  ];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Sparkles className="badge-icon" />
              <span>Transforming Business Intelligence</span>
            </motion.div>

            <h1 className="hero-title">
              <span className="title-main">Unleash the Power of</span>
              <motion.span
                className="title-dynamic gradient-text"
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.span>
              <span className="title-main">with Nyrix</span>
            </h1>

            <motion.p 
              className="hero-subtitle"
              variants={itemVariants}
            >
              We craft bespoke AI agents and cutting-edge automation solutions that 
              revolutionize how businesses operate. From intelligent workflows to 
              predictive analytics, we transform your vision into reality.
            </motion.p>

            <motion.div 
              className="hero-cta"
              variants={itemVariants}
            >
              <motion.button
                className="cta-primary btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Transformation</span>
                <ArrowRight className="cta-icon" />
              </motion.button>

              <motion.button
                className="cta-secondary btn-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-stats"
              variants={itemVariants}
            >
              {[
                { number: '500+', label: 'AI Agents Deployed' },
                { number: '99.9%', label: 'Uptime Guarantee' },
                { number: '50%', label: 'Average Cost Reduction' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="stat-number gradient-text">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" variants={itemVariants}>
            <div className="visual-container">
              <motion.div
                className="central-orb"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="orb-core"></div>
                <div className="orb-ring"></div>
                <div className="orb-ring-outer"></div>
              </motion.div>

              {floatingIcons.map(({ Icon, delay, x, y }, index) => (
                <motion.div
                  key={index}
                  className="floating-icon"
                  style={{ '--x': `${x}px`, '--y': `${y}px` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    delay: delay,
                    duration: 0.8,
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <Icon />
                </motion.div>
              ))}

              <div className="connecting-lines">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="line"
                    style={{ '--rotation': `${i * 45}deg` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ delay: 2 + i * 0.1, duration: 0.8 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="scroll-icon" />
        </motion.div>
        <span>Discover More</span>
      </motion.div>
    </section>
  );
};

export default Hero; 