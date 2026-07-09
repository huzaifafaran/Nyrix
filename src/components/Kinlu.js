import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, MessageSquare, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import './Kinlu.css';

const Kinlu = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Autonomous ML Models',
      description: 'Generates production-ready machine learning models directly from your data without requiring a data science team.'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'Handles complex tasks like churn prediction, customer lifetime value analysis, and identifying marketing intent with high accuracy.'
    },
    {
      icon: FileText,
      title: 'Seamless Integrations',
      description: 'Natively ingests data from sources like Shopify, Meta Ads, and direct CSV uploads to build a unified data landscape.'
    },
    {
      icon: CheckCircle2,
      title: 'Actionable Decision Support',
      description: 'Provides probabilistic insights, feature importance analysis, and statistical validation to drive confident, data-driven decisions.'
    }
  ];

  return (
    <section className="relative py-24 bg-nyrix-light overflow-hidden" id="kinlu">
      {/* No Decorative Blur */}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
            Featured Product
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
            KINLU.
          </h2>
          <p className="text-lg text-nyrix-dark/70 font-medium leading-relaxed mb-12">
            Your automated data science team. Kinlu generates production-ready machine learning models to handle churn prediction, LTV analysis, and marketing intent—empowering you with enterprise-grade business intelligence.
          </p>
          <motion.a
            href="https://kinlu.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-nyrix-dark text-white font-bold tracking-widest uppercase text-[13px] transition-all hover:bg-black outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Visit Kinlu</span>
            <ArrowRight size={16} className="translate-y-[1px]" />
          </motion.a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border-t border-black/10 pt-10 flex flex-col items-start"
            >
              <div className="mb-6 text-nyrix-purple">
                <feature.icon size={32} strokeWidth={1} />
              </div>
              
              <h3 className="text-2xl font-display font-black text-nyrix-dark mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-nyrix-dark/70 font-medium leading-relaxed text-[16px]">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Kinlu;
