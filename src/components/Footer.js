import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/nyrixco/', label: 'LinkedIn' },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@nyrix.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer className="relative bg-[#0f172a] pt-24 pb-12 overflow-hidden text-slate-300">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-nyrix-purple/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nyrix-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo icon no-bg.png" alt="Nyrix Logo" className="h-8 w-auto brightness-0 invert opacity-90" />
              <span className="ml-3 font-display font-bold tracking-tight text-xl text-white">NYRIX</span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mb-8">
              Transforming businesses through intelligent AI solutions and cutting-edge automation. 
              Building the future of work, one algorithm at a time.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-nyrix-purple hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
              <div className="relative">
                <button 
                  onClick={() => setShowEmail(!showEmail)}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-nyrix-purple hover:text-white transition-all duration-300"
                >
                  <Mail size={18} />
                </button>
                <AnimatePresence>
                  {showEmail && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 bg-slate-800 border border-slate-700 p-2 rounded-xl flex items-center gap-3 shadow-xl"
                    >
                      <span className="text-sm font-medium text-white px-2 whitespace-nowrap">hello@nyrix.co</span>
                      <button onClick={handleCopyEmail} className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-[15px] font-medium">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-[15px] font-medium">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-slate-400 hover:text-white transition-colors text-[15px] font-medium">{link.name}</Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-[15px] font-medium">{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} NYRIX. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Enterprise Ready', 'SOC 2 Compliant', 'GDPR Ready'].map(badge => (
              <span key={badge} className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-400">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;