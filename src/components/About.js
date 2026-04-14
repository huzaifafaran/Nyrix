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
    { number: '10+', label: 'INDUSTRIES SERVED', icon: Target },
    { number: '35%', label: 'AVG COST REDUCTION', icon: Lightbulb },
    { number: 'End-to-End', label: 'DELIVERY MODEL', icon: Users },
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          ref={ref}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-nyrix-glassBorder bg-nyrix-light mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-nyrix-purpleBright">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-nyrix-dark mb-6 tracking-tight">
            Advancing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyrix-purple to-[#4f46e5]">Future</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-bold tracking-wider text-nyrix-purple uppercase mb-4">Our Mission</h3>
              <p className="text-lg text-nyrix-dark/70 leading-relaxed font-medium">
                At Nyrix, we are advancing the future of Decision Sciences by harnessing 
                operational intelligence with agentic decision-making. We build bespoke 
                AI-powered operational intelligence engines that revolutionize how businesses 
                operate, from e-commerce to enterprise-level challenges. By transforming 
                intelligent workflows and predictive analytics into practical solutions, 
                we empower you to unleash the full potential of automation and turn your 
                strategic vision into reality.
              </p>
            </motion.div>
          </motion.div>

          {/* Visual element */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative h-[300px] sm:h-[400px] w-full bg-nyrix-light rounded-[2.5rem] border border-nyrix-glassBorder overflow-hidden flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-nyrix-purple/20 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-nyrix-purple/30 flex items-center justify-center animate-spin-slow">
                <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-full border border-nyrix-purple/40 bg-nyrix-purple/5 backdrop-blur-sm shadow-glow" />
              </div>
              <motion.div 
                className="absolute w-4 h-4 bg-nyrix-purple rounded-full shadow-intense"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ originX: 4, originY: 4 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-nyrix-light border border-nyrix-glassBorder p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-nyrix-glassBorder flex items-center justify-center text-nyrix-purpleBright mb-4">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <span className="text-3xl font-display font-black text-nyrix-dark mb-1">{stat.number}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-nyrix-dark/50">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h3 className="text-2xl font-bold text-nyrix-dark tracking-tight">Core Values</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 bg-white border border-nyrix-glassBorder rounded-3xl hover:border-nyrix-purple/30 hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-2 h-2 rounded-full bg-nyrix-purple" />
                  <h4 className="text-[15px] font-bold tracking-wide text-nyrix-dark">{value.title}</h4>
                </div>
                <p className="text-sm font-medium text-nyrix-dark/60 leading-relaxed ml-6">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;