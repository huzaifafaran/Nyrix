import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="relative py-32 bg-nyrix-light overflow-hidden">
      {/* No Background Decor */}
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          ref={ref}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
            Ready to Transform?
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
            Let's Build Something Amazing.
          </h2>
          
          <p className="text-xl text-nyrix-dark/70 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
            Ready to unlock the full potential of your business with AI-powered decision sciences? 
            Let's have a conversation about how we can transform your operations and drive real results.
          </p>
          
          <button
            onClick={handleScheduleCall}
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-nyrix-dark text-white font-bold tracking-widest uppercase text-[13px] transition-all hover:bg-black outline-none mb-24"
          >
            <span className="relative z-10">Schedule Demo</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {[
            { icon: Calendar, title: 'Schedule a Demo', subtitle: '30-minute discovery call', desc: 'See how AI can transform your business' },
            { icon: Clock, title: 'Quick Setup', subtitle: 'Get started in days, not months', desc: 'No lengthy implementation cycles' },
            { icon: MessageSquare, title: 'Expert Guidance', subtitle: 'AI specialists at your service', desc: 'Dedicated support throughout your journey' }
          ].map((benefit, i) => (
            <div
              key={i}
              className="group border-t border-black/10 pt-10 text-left flex flex-col items-start"
            >
              <div className="mb-6 text-nyrix-purple">
                <benefit.icon size={32} strokeWidth={1} />
              </div>
              <h4 className="text-2xl font-black font-display text-nyrix-dark tracking-tight mb-2">{benefit.title}</h4>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-4">{benefit.subtitle}</p>
              <span className="text-[16px] font-medium text-nyrix-dark/70 leading-relaxed">{benefit.desc}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;