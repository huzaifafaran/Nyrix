import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MessageSquare, ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="contact" className="contact section">
      <div className="contact-background">
        <div className="contact-pattern"></div>
        <div className="floating-elements">
          <motion.div className="floating-sparkle" animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Sparkles size={20} />
          </motion.div>
          <motion.div className="floating-zap" animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
            <Zap size={16} />
          </motion.div>
          <motion.div className="floating-star" animate={{ y: [-5, 15, -5], rotate: [0, 360, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <Star size={18} />
          </motion.div>
        </div>
      </div>

      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <motion.span 
            className="section-badge"
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ready to Transform?
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let's <span className="gradient-text">Build Something Amazing</span>
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to unlock the full potential of your business with AI-powered decision sciences? 
            Let's have a conversation about how we can transform your operations and drive real results.
          </motion.p>
          
          <motion.button
            onClick={handleScheduleCall}
            className="cta-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span>Schedule Demo</span>
            <ArrowRight className="cta-icon" />
          </motion.button>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-benefits"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="benefit-icon">
                <Calendar />
              </div>
              <div className="benefit-content">
                <h4 className="benefit-title">Schedule a Demo</h4>
                <p className="benefit-subtitle">30-minute discovery call</p>
                <span className="benefit-description">See how AI can transform your business</span>
              </div>
            </motion.div>

            <motion.div
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="benefit-icon">
                <Clock />
              </div>
              <div className="benefit-content">
                <h4 className="benefit-title">Quick Setup</h4>
                <p className="benefit-subtitle">Get started in days, not months</p>
                <span className="benefit-description">No lengthy implementation cycles</span>
              </div>
            </motion.div>

            <motion.div
              className="benefit-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="benefit-icon">
                <MessageSquare />
              </div>
              <div className="benefit-content">
                <h4 className="benefit-title">Expert Guidance</h4>
                <p className="benefit-subtitle">AI specialists at your service</p>
                <span className="benefit-description">Dedicated support throughout your journey</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 