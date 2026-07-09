import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Brain } from 'lucide-react';

const CaseStudies = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const caseStudies = [
    {
      icon: Activity,
      title: 'Genix Cleanroom Environmental Monitoring System',
      tagline: 'Enterprise Real-Time EMS built for Genix',
      description: 'An enterprise-grade, real-time Environmental Monitoring System designed for Genix\'s pharmaceutical cleanroom environments. Bridges modern web technologies with legacy industrial monitoring systems to ensure GMP and ISO compliance.',
      techStack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'Socket.IO', 'MySQL'],
      route: '/case-studies/cleanroom-ems',
      metrics: [
        { label: 'Real-Time', value: 'Telemetry' },
        { label: 'Latency', value: '<1s' }
      ]
    },
    {
      icon: Brain,
      title: 'TeachMeBack AI',
      tagline: 'Learn Faster By Teaching AI',
      description: 'An innovative AI-powered learning platform built for Brady Mickle where users master subjects faster through active recall by teaching an AI student named Emma.',
      techStack: ['React', 'TypeScript', 'LLM Orchestration', 'Document Parsing'],
      route: '/case-studies/teachmeback',
      metrics: [
        { label: 'Protégé Effect', value: 'Active' },
        { label: 'Learning', value: 'Gamified' }
      ]
    }
  ];

  const containerFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="case-studies" className="relative py-32 bg-nyrix-dark overflow-hidden border-t border-nyrix-glassBorder/10">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purpleLight mb-8 border-b border-nyrix-purpleLight/10 pb-4 inline-block">
            Case Studies
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-purple-50 mb-8 tracking-tighter uppercase">
            Proven Impact.
          </h2>
          <p className="text-lg text-nyrix-purpleLight/70 font-medium leading-relaxed">
            Real-world applications of our AI and automation solutions, delivering measurable compliance, efficiency, and scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerFade}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col"
        >
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row gap-12 py-20 border-b border-nyrix-glassBorder/30 last:border-b-0"
            >
              <div className="flex-1 relative z-10">
                <div className="mb-6 text-nyrix-purpleBright">
                  <study.icon size={36} strokeWidth={1} />
                </div>
                
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-nyrix-purpleLight/80 mb-3">
                  {study.tagline}
                </span>
                <h3 className="text-3xl font-display font-bold text-purple-50 mb-4 tracking-tight">
                  {study.title}
                </h3>
                <p className="text-nyrix-purpleLight/80 font-medium leading-relaxed text-[16px] mb-8">
                  {study.description}
                </p>

                <div className="text-[13px] font-mono tracking-wide text-nyrix-purpleLight/50 mb-8 md:mb-0">
                  {study.techStack.join(' // ')}
                </div>
              </div>

              <div className="md:w-72 flex flex-col justify-center gap-8 relative z-10 md:pl-12">
                {study.metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-purple-50 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold tracking-widest text-nyrix-purpleLight/60 uppercase">
                      {metric.label}
                    </div>
                  </div>
                ))}
                <div 
                  className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold tracking-wide text-nyrix-purpleLight group-hover:text-nyrix-purpleBright transition-colors cursor-pointer w-max"
                  onClick={() => navigate(study.route)}
                >
                  <span>Explore Case Study</span>
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

export default CaseStudies;
