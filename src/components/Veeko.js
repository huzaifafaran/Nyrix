import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, MessageSquare, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import './Veeko.css';

const Veeko = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'High Risk Order Flagging',
      description: 'Automatically identifies and flags potentially problematic orders using advanced risk assessment algorithms, helping you prevent fraud and reduce chargebacks.'
    },
    {
      icon: MessageSquare,
      title: 'Store Intelligence Assistant',
      description: 'AI-powered assistant for merchants to ask natural-language questions about revenue, profits, top customers, inventory levels, and other business metrics.'
    },
    {
      icon: BarChart3,
      title: 'Graphical Analytics Dashboard',
      description: 'Comprehensive visual analytics with interactive charts, real-time metrics, and customizable dashboards to track performance and trends effortlessly.'
    },
    {
      icon: FileText,
      title: 'Daily Operations Reports',
      description: 'Automated daily operations reports with insights on sales, inventory, customer behavior, and highly actionable recommendations for operational optimization.'
    }
  ];

  return (
    <section className="relative py-24 bg-nyrix-light overflow-hidden" id="veeko">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-nyrix-purple/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-nyrix-glassBorder bg-white/50 backdrop-blur-md mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-nyrix-purpleBright">
              Featured Product
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-nyrix-dark mb-6 tracking-tight">
            VEEKO
          </h2>
          <p className="text-lg text-nyrix-dark/60 font-medium leading-relaxed mb-8">
            A comprehensive e-commerce operations platform that combines fraud prevention, AI-powered business intelligence, real-time analytics, and automated reporting to give founders complete visibility and operational control.
          </p>
          <motion.a
            href="https://veeko.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nyrix-dark text-white rounded-2xl font-bold tracking-wide transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-intense outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Visit Veeko</span>
            <ArrowRight size={18} className="translate-y-[1px]" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group p-8 sm:p-10 bg-white border border-nyrix-glassBorder rounded-[2rem] hover:border-nyrix-purple/30 hover:shadow-card transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nyrix-purple to-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 bg-nyrix-light rounded-2xl border border-nyrix-glassBorder flex items-center justify-center text-nyrix-purpleBright mb-8 group-hover:scale-110 group-hover:bg-nyrix-purple/5 transition-all duration-500">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-nyrix-dark mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-nyrix-dark/60 font-medium leading-relaxed text-[15px]">
                {feature.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[13px] font-bold text-nyrix-dark/40 uppercase tracking-widest group-hover:text-nyrix-purple transition-colors">
                <CheckCircle2 size={16} />
                <span>Included feature</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Veeko;
