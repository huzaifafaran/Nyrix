import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, MessageSquare, BarChart3, FileText } from 'lucide-react';
import './Veeko.css';

const Veeko = () => {
  const features = [
    {
      icon: <AlertTriangle className="feature-icon" />,
      title: 'HIGH RISK ORDER FLAGGING',
      description: 'Automatically identifies and flags potentially problematic orders using advanced risk assessment algorithms, helping you prevent fraud and reduce chargebacks.'
    },
    {
      icon: <MessageSquare className="feature-icon" />,
      title: 'BUILT-IN STORE ASSISTANT',
      description: 'AI-powered assistant that answers customer queries, provides product recommendations, and handles support requests in real-time, 24/7.'
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: 'GRAPHICAL ANALYTICS DASHBOARD',
      description: 'Comprehensive visual analytics with interactive charts, real-time metrics, and customizable dashboards to track performance and trends.'
    },
    {
      icon: <FileText className="feature-icon" />,
      title: 'DETAILED DAILY OPS REPORT',
      description: 'Automated daily operations reports with insights on sales, inventory, customer behavior, and actionable recommendations for optimization.'
    }
  ];

  return (
    <section className="veeko" id="veeko">
      <div className="container">
        <motion.div
          className="veeko-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="veeko-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="veeko-badge">
              <span>OUR PRODUCT</span>
            </div>
            <h2 className="veeko-title">
              VEEKO
            </h2>
            <p className="veeko-subtitle">
              Our product blends intelligent workflows, agentic automation, and predictive logic into one integrated engine, giving founders and operators the clarity to grow, without getting stuck in ops.
            </p>
          </motion.div>

          <motion.div
            className="veeko-features"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="feature-icon-container">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="veeko-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://veeko.io"
              target="_blank"
              rel="noopener noreferrer"
              className="veeko-btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>VISIT VEEKO</span>
              <ArrowRight className="btn-icon" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Veeko;
