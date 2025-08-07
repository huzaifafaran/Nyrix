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
           { number: '50+', label: 'AI AGENTS DEPLOYED', icon: Award },
           { number: '99.5%', label: 'UPTIME GUARANTEE', icon: Target },
           { number: '35%', label: 'COST REDUCTION', icon: Lightbulb },
           { number: '24/7', label: 'SUPPORT AVAILABLE', icon: Users },
         ];

  const values = [
    {
      title: 'INNOVATION',
      description: 'Pushing boundaries with cutting-edge AI technology and methodologies.',
    },
    {
      title: 'EXCELLENCE',
      description: 'Maintaining highest standards in code quality and customer service.',
    },
    {
      title: 'EFFICIENCY',
      description: 'Delivering solutions that fundamentally transform business operations.',
    },
    {
      title: 'RELIABILITY',
      description: 'Building robust systems that businesses can depend on.',
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
          <span className="section-badge">ABOUT</span>
                           <h2 className="section-title">
                   ADVANCING THE <span className="accent-text">FUTURE</span>
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
                     <h3>OUR MISSION</h3>
                     <p>
                       At Nyrix, we are pioneering the future of Decision Sciences by harnessing 
                       operational intelligence with agentic decision-making. We build bespoke 
                       AI-powered operational intelligence engines that revolutionize how businesses 
                       operate, from e-commerce to enterprise-level challenges. By transforming 
                       intelligent workflows and predictive analytics into practical solutions, 
                       we empower you to unleash the full potential of automation and turn your 
                       strategic vision into reality.
                     </p>
                   </motion.div>

            <motion.div className="story-visual" variants={itemVariants}>
              <div className="visual-element">
                <div className="floating-shapes">
                  {Array.from({ length: 4 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="shape"
                      style={{ '--delay': `${i * 0.5}s` }}
                      animate={{
                        y: [0, -15, 0],
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
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stat.number}</span>
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
              CORE VALUES
            </motion.h3>
            
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
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