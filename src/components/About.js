import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Target, Lightbulb } from 'lucide-react';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: Award },
    { number: '50+', label: 'Expert Team Members', icon: Users },
    { number: '99.9%', label: 'Client Satisfaction', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Lightbulb },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI, constantly exploring new technologies and methodologies.',
      color: 'var(--accent-purple)',
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We measure our impact by the tangible results we deliver to your business.',
      color: 'var(--accent-cyan)',
    },
    {
      title: 'Ethical AI',
      description: 'We believe in responsible AI development that respects privacy, promotes fairness, and benefits society.',
      color: 'var(--accent-pink)',
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service.',
      color: 'var(--accent-orange)',
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
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <span className="section-badge">About Nyrix</span>
          <h2 className="section-title">
            Pioneering the <span className="gradient-text">AI Revolution</span>
          </h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-story"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="story-text" variants={itemVariants}>
              <h3>Our Story</h3>
              <p>
                Founded by a team of AI researchers and industry veterans, Nyrix emerged from a 
                simple yet powerful vision: to make artificial intelligence accessible and 
                transformative for businesses of all sizes.
              </p>
              <p>
                We've spent years perfecting our craft, building solutions that don't just 
                automate tasks but fundamentally reimagine how work gets done. Our approach 
                combines cutting-edge research with practical business acumen.
              </p>
            </motion.div>

            <motion.div className="story-visual" variants={itemVariants}>
              <div className="visual-element">
                <div className="floating-shapes">
                  {Array.from({ length: 6 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="shape"
                      style={{ '--delay': `${i * 0.5}s` }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-stats"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card glass-effect"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-content">
                  <span className="stat-number gradient-text">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="about-values"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 className="values-title" variants={itemVariants}>
              Our Core Values
            </motion.h3>
            
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div 
                    className="value-accent" 
                    style={{ backgroundColor: value.color }}
                  ></div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 