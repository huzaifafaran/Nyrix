import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Copy, Check } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
    ],
    services: [
      { name: 'AI Agents', href: '#agents' },
      { name: 'Automation', href: '#agents' },
      { name: 'Analytics', href: '#services' },
      { name: 'Consulting', href: '#services' },
    ],

    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/nyrixco/', label: 'LinkedIn' },
  ];

  const handleEmailClick = () => {
    setShowEmail(!showEmail);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@nyrix.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-glow"></div>
      </div>

      <div className="container">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="footer-main" variants={itemVariants}>
            <div className="footer-brand">
              <div className="brand-logo">
                <img 
                  src="/logo.png" 
                  alt="Nyrix Logo" 
                  className="logo-icon"
                />
              </div>
              <p className="brand-description">
                Transforming businesses through intelligent AI solutions and cutting-edge automation. 
                Building the future of work, one algorithm at a time.
              </p>
              
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
                
                <motion.button
                  className="social-link email-toggle"
                  aria-label="Email"
                  onClick={handleEmailClick}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail />
                </motion.button>
              </div>
              
              <motion.div
                className="email-expandable"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: showEmail ? 1 : 0, 
                  height: showEmail ? 'auto' : 0 
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="email-content">
                  <span className="email-address">hello@nyrix.co</span>
                  <motion.button
                    className="copy-button"
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Copy email"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <div className="footer-links">
              <div className="links-section">
                <h4 className="links-title">Company</h4>
                <ul className="links-list">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="footer-link"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-section">
                <h4 className="links-title">Services</h4>
                <ul className="links-list">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="footer-link"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-section">
                <h4 className="links-title">Legal</h4>
                <ul className="links-list">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="footer-link"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>


        </motion.div>

        <motion.div
          className="footer-bottom"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Nyrix. All rights reserved. Built with passion for innovation.
            </p>
            <div className="footer-badges">
              <span className="badge">Enterprise Ready</span>
              <span className="badge">SOC 2 Compliant</span>
              <span className="badge">GDPR Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 