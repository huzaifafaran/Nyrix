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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
            Our Services
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
            Intelligent AI Solutions.
          </h2>
          <p className="text-lg text-nyrix-dark/60 font-medium leading-relaxed">
            From rapid prototyping to enterprise transformation and governance. We build intelligent systems that scale.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.route)}
              className={`group relative flex flex-col pt-10 border-t border-black/10 cursor-pointer ${service.className || ''}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 text-nyrix-purple">
                  <service.icon size={36} strokeWidth={1} />
                </div>
                
                <div className="mb-8 flex-grow">
                  <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-dark/50 mb-4">
                    {service.tagline}
                  </span>
                  <h3 className="text-3xl font-display font-black text-nyrix-dark mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-nyrix-dark/70 font-medium leading-relaxed text-[16px]">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-nyrix-dark/40 group-hover:text-nyrix-purple transition-colors mt-auto pt-6 border-t border-transparent group-hover:border-black/5">
                  <span>Explore Offering</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;