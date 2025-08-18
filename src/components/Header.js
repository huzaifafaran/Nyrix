import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img 
              src="/logo icon no-bg.png" 
              alt="N.JEY Logo" 
              className="logo-icon"
            />
          </motion.div>

                         <nav className="nav-desktop">
                   <ul className="nav-links">
                     {['HOME', 'ABOUT', 'VEEKO', 'SERVICES', 'AGENTS', 'DEMO'].map((item) => (
                       <li key={item}>
                         <motion.button
                           className="nav-link"
                           onClick={() => {
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
                           }}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                         >
                           {item}
                         </motion.button>
                       </li>
                     ))}
                   </ul>
                 </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

                   {/* Mobile Menu */}
             <motion.div
               className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
               initial={{ opacity: 0, y: -20 }}
               animate={{ 
                 opacity: isMobileMenuOpen ? 1 : 0, 
                 y: isMobileMenuOpen ? 0 : -20 
               }}
               transition={{ duration: 0.3 }}
             >
               <nav className="mobile-nav">
                 {['HOME', 'ABOUT', 'VEEKO', 'SERVICES', 'AGENTS', 'DEMO'].map((item) => (
                   <motion.button
                     key={item}
                     className="mobile-nav-link"
                     onClick={() => {
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
                     }}
                     whileHover={{ x: 10 }}
                   >
                     {item}
                   </motion.button>
                 ))}
               </nav>
             </motion.div>
    </motion.header>
  );
};

export default Header; 