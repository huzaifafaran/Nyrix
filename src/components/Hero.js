import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
    return false;
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-nyrix-light">
      {/* No Background Decor */}

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <div className="mb-8">
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
              BEYOND INSIGHT, INTO FORESIGHT
            </div>
          </div>

          {/* Heading */}
          <h1 
            className="text-6xl md:text-8xl lg:text-[7rem] font-display font-black tracking-tighter text-nyrix-dark leading-[0.95] mb-8 uppercase"
          >
            Anticipate the future with <br className="hidden md:block" />
            AI Decision Sciences.
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-nyrix-dark/70 font-medium leading-relaxed max-w-2xl mx-auto mb-12"
          >
            We build enterprise AI systems that transform how businesses make choices. 
            Stop reacting and start predicting with intelligent agents that continuously adapt to keep you ahead.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full sm:w-auto">
            <button
              onClick={handleScheduleCall}
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-nyrix-dark text-white font-bold text-[13px] tracking-widest uppercase overflow-hidden transition-all hover:bg-black outline-none w-full sm:w-auto"
            >
              <span className="relative z-10">Schedule Demo</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-b-2 border-black text-nyrix-dark font-bold text-[13px] tracking-widest uppercase transition-all hover:border-nyrix-purple hover:text-nyrix-purple outline-none w-full sm:w-auto"
            >
              <span>Explore Platform</span>
            </button>
          </div>

          {/* Value Props */}
          <div className="mt-20 flex flex-wrap justify-center gap-x-4 gap-y-4 text-[13px] font-mono tracking-widest text-nyrix-dark/40 uppercase">
            {['Enterprise Grade', 'Predictive Intelligence', 'Seamless Integration'].join(' // ')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;