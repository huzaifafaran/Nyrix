import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = ['HOME', 'ABOUT', 'VEEKO', 'SERVICES', 'AGENTS', 'DEMO'];

  const handleNavClick = (item) => {
    if (item === 'DEMO') {
      navigate('/');
      setTimeout(() => scrollToSection('contact'), 50);
    } else if (item === 'HOME') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item === 'AGENTS') {
      navigate('/agents');
      setIsMobileMenuOpen(false);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(item.toLowerCase()), 50);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between transition-all duration-500 rounded-2xl px-6 py-3 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-card border border-nyrix-glassBorder' 
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('HOME')}
            className="flex items-center outline-none"
          >
            <img 
              src="/logo icon no-bg.png" 
              alt="Nyrix Logo" 
              className="h-10 w-auto object-contain"
            />

          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => handleNavClick(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium text-[13px] tracking-wider transition-colors ${
                  item === 'DEMO' 
                    ? 'bg-nyrix-dark text-white hover:bg-nyrix-purple hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                    : 'text-nyrix-dark/80 hover:text-nyrix-purple hover:bg-nyrix-purple/5'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-nyrix-dark/80 hover:text-nyrix-purple transition-colors outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-nyrix-glassBorder shadow-intense rounded-2xl p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-left px-4 py-3 rounded-xl font-medium text-sm tracking-wide transition-colors ${
                    item === 'DEMO'
                      ? 'bg-nyrix-dark text-white'
                      : 'text-nyrix-dark/80 hover:text-nyrix-purple hover:bg-nyrix-purple/5'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;