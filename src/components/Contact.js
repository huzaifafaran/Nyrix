import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="contact" className="relative py-32 bg-nyrix-light overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.04)_0,transparent_100%)]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          ref={ref}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-nyrix-glassBorder bg-white/50 backdrop-blur-md mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-nyrix-purpleBright">
              Ready to Transform?
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-nyrix-dark mb-6 tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyrix-purple to-[#4f46e5]">Amazing</span>
          </h2>
          
          <p className="text-lg text-nyrix-dark/60 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Ready to unlock the full potential of your business with AI-powered decision sciences? 
            Let's have a conversation about how we can transform your operations and drive real results.
          </p>
          
          <button
            onClick={handleScheduleCall}
            className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-nyrix-dark text-white rounded-[1.25rem] font-bold text-base tracking-wide overflow-hidden transition-all hover:bg-black hover:scale-[1.02] hover:shadow-intense outline-none mb-20"
          >
            <span className="relative z-10 pt-0.5">Schedule Demo</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {[
            { icon: Calendar, title: 'Schedule a Demo', subtitle: '30-minute discovery call', desc: 'See how AI can transform your business' },
            { icon: Clock, title: 'Quick Setup', subtitle: 'Get started in days, not months', desc: 'No lengthy implementation cycles' },
            { icon: MessageSquare, title: 'Expert Guidance', subtitle: 'AI specialists at your service', desc: 'Dedicated support throughout your journey' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group p-8 bg-white border border-nyrix-glassBorder rounded-3xl hover:border-nyrix-purple/30 hover:shadow-card transition-all text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-nyrix-purple/5 border border-nyrix-purple/10 flex items-center justify-center text-nyrix-purpleBright mb-6 group-hover:scale-110 group-hover:bg-nyrix-purple/10 transition-transform">
                <benefit.icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold text-nyrix-dark tracking-tight mb-2">{benefit.title}</h4>
              <p className="text-sm font-bold tracking-wider uppercase text-nyrix-purple/60 mb-3">{benefit.subtitle}</p>
              <span className="text-[15px] font-medium text-nyrix-dark/60 leading-relaxed">{benefit.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;