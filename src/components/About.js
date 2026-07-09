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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
            About Us
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
            Advancing the Future.
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-24 border-t border-black/10 pt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start"
          >
            <div className="w-full md:w-1/4 shrink-0">
              <h3 className="text-[11px] font-bold tracking-[0.25em] text-nyrix-purple uppercase">Our Mission</h3>
            </div>
            <div className="w-full md:w-3/4 text-left">
              <p className="text-2xl md:text-3xl text-nyrix-dark font-medium leading-[1.4] tracking-tight mb-6">
                At Nyrix, we are advancing the future of Decision Sciences by harnessing 
                operational intelligence with agentic decision-making. We build bespoke 
                AI-powered operational intelligence engines that revolutionize how businesses 
                operate, from e-commerce to enterprise-level challenges.
              </p>
              <p className="text-xl text-nyrix-dark/70 font-medium leading-[1.6]">
                By transforming intelligent workflows and predictive analytics into practical solutions, 
                we empower you to unleash the full potential of automation and turn your 
                strategic vision into reality.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-10 border-t border-black/10 flex flex-col items-start"
            >
              <div className="mb-6 text-nyrix-purple">
                <stat.icon size={32} strokeWidth={1} />
              </div>
              <span className="text-4xl font-display font-black text-nyrix-dark mb-2 tracking-tighter">{stat.number}</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-nyrix-dark/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="text-left mb-12 border-b border-black/10 pb-4">
            <h3 className="text-sm font-bold tracking-[0.25em] text-nyrix-purple uppercase">Core Values</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="pl-6 border-l-2 border-nyrix-dark"
              >
                <h4 className="text-2xl font-black font-display tracking-tight text-nyrix-dark mb-3">{value.title}</h4>
                <p className="text-lg font-medium text-nyrix-dark/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;