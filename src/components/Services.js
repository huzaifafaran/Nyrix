import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Rocket, Compass, RefreshCw, Shield, ArrowRight } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const services = [
    {
      icon: Rocket,
      title: 'AI MVP Development',
      tagline: 'Concept to product in 14 days',
      description: 'We build and launch functional, production-ready AI products at lightning speed — so you can test, iterate, and scale faster.',
      route: '/ai-mvp-development',
      className: 'md:col-span-2 lg:col-span-1',
    },
    {
      icon: Compass,
      title: 'AI Enablement & Advisory',
      tagline: 'Strategic guidance for the AI-first era',
      description: 'Navigate the complex AI landscape with expert advisory — identifying high-impact opportunities while minimizing risk.',
      route: '/ai-enablement-advisory',
      className: 'md:col-span-1',
    },
    {
      icon: RefreshCw,
      title: 'Business Transformation',
      tagline: 'Modernizing legacy for the future',
      description: 'Deep integration of AI to revolutionize how your business operates — woven into the fabric of your organization.',
      route: '/business-transformation',
      className: 'md:col-span-1',
    },
    {
      icon: Shield,
      title: 'AI Strategy & Governance',
      tagline: 'Secure, ethical, and high-ROI AI',
      description: 'Frameworks to manage risk, maintain compliance, and ensure your AI investments deliver measurable results.',
      route: '/ai-strategy-governance',
      className: 'md:col-span-2 lg:col-span-1',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="services" className="relative py-24 bg-nyrix-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-nyrix-glassBorder bg-white/50 backdrop-blur-md mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-nyrix-purpleBright">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-nyrix-dark mb-6 tracking-tight uppercase">
            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-nyrix-purple to-[#4f46e5]">AI Solutions</span>
          </h2>
          <p className="text-lg text-nyrix-dark/60 font-medium leading-relaxed">
            From rapid prototyping to enterprise transformation and governance. We build intelligent systems that scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => navigate(service.route)}
              className={`group relative flex flex-col p-8 sm:p-10 bg-white rounded-[2rem] border border-nyrix-glassBorder shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-card cursor-pointer overflow-hidden ${service.className || ''}`}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-nyrix-purple/0 via-transparent to-nyrix-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-nyrix-purple/5 border border-nyrix-purple/10 rounded-2xl flex items-center justify-center mb-8 text-nyrix-purpleBright group-hover:scale-110 group-hover:bg-nyrix-purple/10 transition-all duration-500">
                  <service.icon size={26} strokeWidth={1.5} />
                </div>
                
                <div className="mb-6 flex-grow">
                  <span className="inline-block text-xs font-bold tracking-wider uppercase text-nyrix-purple/60 mb-3">
                    {service.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-nyrix-dark mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-nyrix-dark/60 font-medium leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-nyrix-dark/50 group-hover:text-nyrix-purple transition-colors mt-auto pt-4 border-t border-nyrix-glassBorder/50">
                  <span>Explore Offering</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;