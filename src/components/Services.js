import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Cog, Brain, Zap, Users, BarChart3 } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Bot,
      title: 'Custom AI Agents',
      description: 'Intelligent agents that understand your business context and automate complex decision-making processes.',
      features: ['Natural Language Processing', '24/7 Autonomous Operation', 'Learning & Adaptation', 'Multi-Platform Integration'],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    },
    {
      icon: Cog,
      title: 'Workflow Automation',
      description: 'Streamline your operations with sophisticated automation that eliminates repetitive tasks and accelerates productivity.',
      features: ['Process Optimization', 'Cross-System Integration', 'Real-time Monitoring', 'Scalable Architecture'],
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)',
    },
    {
      icon: Brain,
      title: 'Intelligent Analytics',
      description: 'Transform raw data into actionable insights with AI-powered analytics that predict trends and optimize performance.',
      features: ['Predictive Modeling', 'Real-time Dashboards', 'Custom Reports', 'Data Visualization'],
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Get your AI solutions up and running quickly with our streamlined deployment process and expert support.',
      features: ['Quick Setup', 'Cloud Integration', 'Expert Support', 'Minimal Downtime'],
      gradient: 'linear-gradient(135deg, #f97316 0%, #8b5cf6 100%)',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Enhance team productivity with AI-driven collaboration tools that facilitate seamless communication and project management.',
      features: ['Smart Scheduling', 'Automated Reporting', 'Team Analytics', 'Integration Hub'],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    },
    {
      icon: BarChart3,
      title: 'Performance Optimization',
      description: 'Continuously improve your business performance with AI that identifies bottlenecks and suggests optimizations.',
      features: ['Performance Metrics', 'Optimization Suggestions', 'Trend Analysis', 'ROI Tracking'],
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #f97316 100%)',
    },
  ];

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
    hidden: { opacity: 0, y: 50 },
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
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <span className="section-badge">Our Expertise</span>
          <h2 className="section-title">
            Transformative <span className="gradient-text">AI Solutions</span>
          </h2>
          <p className="section-subtitle">
            We deliver cutting-edge AI agents and automation solutions that revolutionize 
            how businesses operate, making complex processes simple and efficient.
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card glass-effect hover-lift"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="service-header">
                <div 
                  className="service-icon"
                  style={{ background: service.gradient }}
                >
                  <service.icon />
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="service-feature">
                    <span className="feature-dot"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                className="service-cta"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 