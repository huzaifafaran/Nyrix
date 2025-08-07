import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, Globe, Lock, Cpu, TrendingUp } from 'lucide-react';
import './Features.css';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with international security standards.',
      highlight: '99.99% Secure',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized algorithms delivering results faster than traditional solutions.',
      highlight: '10x Faster',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Cloud-native architecture that scales seamlessly across regions.',
      highlight: 'Worldwide',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data stays yours. Complete control over data processing and storage.',
      highlight: 'Zero Trust',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Core',
      description: 'Advanced machine learning models that continuously improve performance.',
      highlight: 'Self-Learning',
    },
    {
      icon: TrendingUp,
      title: 'ROI Guarantee',
      description: 'Measurable results with guaranteed return on investment or money back.',
      highlight: '300% ROI',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="features" className="features section">
      <div className="features-background">
        <div className="features-pattern"></div>
      </div>
      
      <div className="container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <span className="section-badge">Why Choose Nyrix</span>
          <h2 className="section-title">
            Built for the <span className="gradient-text">Future</span>
          </h2>
          <p className="section-subtitle">
            Our platform combines cutting-edge technology with enterprise-grade reliability 
            to deliver unmatched performance and security.
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <div className="feature-highlight">
                  {feature.highlight}
                </div>
              </div>
              
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>

              <div className="feature-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="cta-content">
            <h3>Ready to Transform Your Business?</h3>
            <p>Join hundreds of companies already leveraging Nyrix's AI solutions.</p>
            <motion.button
              className="cta-button btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 