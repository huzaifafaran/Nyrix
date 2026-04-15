import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-nyrix-light">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-nyrix-purple/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-nyrix-purpleBright/10 blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] w-[100%] h-[100%] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nyrix-glassBorder bg-white/50 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-nyrix-purpleBright" />
              <span className="text-xs font-bold tracking-widest uppercase text-nyrix-dark/80 pt-0.5">
                BEYOND INSIGHT, INTO FORESIGHT
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold tracking-tight text-nyrix-dark leading-[1.05] mb-6 uppercase"
          >
            Anticipate the future with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyrix-purple to-[#4f46e5]">AI Decision Sciences</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-nyrix-dark/60 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
          >
            We build enterprise AI systems that transform how businesses make choices. 
            Stop reacting and start predicting with intelligent agents that continuously adapt to keep you ahead.
          </motion.p>

          {/* CTA Group */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
            <button
              onClick={handleScheduleCall}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-nyrix-dark text-white rounded-2xl font-semibold text-[15px] overflow-hidden transition-all hover:bg-black hover:scale-[1.02] hover:shadow-intense outline-none w-full sm:w-auto"
            >
              <span className="relative z-10 pt-0.5">Schedule Demo</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-md border border-nyrix-glassBorder text-nyrix-dark rounded-2xl font-semibold text-[15px] transition-all hover:bg-white hover:border-nyrix-purple/30 hover:scale-[1.02] outline-none w-full sm:w-auto"
            >
              <span className="pt-0.5">Explore Platform</span>
            </button>
          </motion.div>

          {/* Value Props */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-nyrix-dark/50">
            {['Enterprise Grade', 'Predictive Intelligence', 'Seamless Integration'].map((prop, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-nyrix-purple/70" />
                <span>{prop}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;