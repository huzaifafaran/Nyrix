import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, Mail, User, TrendingUp, ChevronDown, ChevronUp,
  Zap, AlertTriangle, RefreshCw
} from 'lucide-react';
import './Agents.css';

const Agents = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedCard, setExpandedCard] = useState(null);
  const [visibleAgents, setVisibleAgents] = useState(2);

  const agents = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'CMO Agent',
      subtitle: 'Viral Content Creation & Marketing',
      shortDescription: 'Create viral-worthy content that drives engagement and grows your audience.',
      fullDescription: 'The CMO Agent is your creative marketing powerhouse that never runs out of ideas. It researches viral trends, generates engaging content, creates compelling visuals, and drafts posts optimized for maximum engagement across all social platforms. From TikTok trends to LinkedIn thought leadership, it ensures your content strategy stays ahead of the curve.',
      features: [
        'Viral trend research and predictive analysis',
        'Multi-platform content creation and optimization',
        'AI-generated visuals and design assets',
        'Engagement prediction and A/B testing automation',
        'Brand voice consistency across all channels'
      ],
      color: '#7c3aed'
    },
    {
      id: 2,
      icon: User,
      title: 'Personal AI Assistant',
      subtitle: 'Your Complete Digital Life Manager',
      shortDescription: 'Your intelligent digital companion that manages every aspect of your professional life.',
      fullDescription: 'Meet your personal AI assistant that orchestrates your entire digital ecosystem. From calendar optimization and email automation to project coordination and research tasks, this agent acts as your intelligent digital companion. It learns your preferences, anticipates your needs, and ensures nothing falls through the cracks while you focus on what matters most.',
      features: [
        'Smart calendar management with conflict resolution',
        'Email automation and communication orchestration',
        'Research and information synthesis',
        'Project management tool integration (ClickUp, Notion, etc.)',
        'Intelligent task prioritization and workflow optimization'
      ],
      color: '#8b5cf6'
    },
    {
      id: 3,
      icon: Search,
      title: 'Research Agent',
      subtitle: 'Intelligent Research & Data Collection',
      shortDescription: 'Transform raw data into actionable insights with AI-powered research automation.',
      fullDescription: 'Our Research Agent is your intelligent research companion that never sleeps. It leverages cutting-edge APIs including Serp API, Apify, and Perplexity to gather comprehensive data from across the web, analyze market trends, and deliver detailed reports with proper citations. From competitive analysis to market intelligence, it handles the heavy lifting so you can focus on strategic decisions.',
      features: [
        'Multi-source data collection via Serp API, Apify, Perplexity',
        'Intelligent web scraping with anti-detection capabilities',
        'Real-time trend analysis and market intelligence',
        'Automated report generation with citations and sources',
        'Custom research workflows and data visualization'
      ],
      color: '#6d28d9'
    },
    {
      id: 4,
      icon: Mail,
      title: 'Email Agent',
      subtitle: 'Smart Email Management & Communication',
      shortDescription: 'Revolutionize your email workflow with AI that reads, writes, and manages communications.',
      fullDescription: 'The Email Agent transforms how you handle email communication. It intelligently reads and analyzes incoming emails, drafts contextually appropriate responses, and manages your entire email workflow. With natural language understanding and professional tone management, it handles complex email threads, scheduling, and follow-ups while maintaining your unique communication style.',
      features: [
        'Intelligent email analysis and sentiment detection',
        'Context-aware response drafting with tone matching',
        'Automated email scheduling and follow-up management',
        'Smart thread organization and priority classification',
        'Multi-language support and spam detection'
      ],
      color: '#a78bfa'
    },
    {
      id: 5,
      icon: AlertTriangle,
      title: 'AI Fatigue Agent',
      subtitle: 'Your Always-On Watchdog for Ad Health & Performance',
      shortDescription: 'Prevent ad burnout and optimize performance with 24/7 intelligent monitoring.',
      fullDescription: 'Stop losing money on underperforming ads. The AI Fatigue Agent is your vigilant watchdog that monitors your campaigns 24/7, detecting burnout, overspending, and performance drops before they impact your ROI. It provides instant alerts with actionable insights and automatically implements optimizations to keep your campaigns healthy and profitable.',
      features: [
        'Real-time monitoring across Meta Ads, Google Ads, and Film & Media',
        'AI-powered fatigue detection and performance prediction',
        'Instant alerts with human-readable diagnosis',
        'Automated optimization and budget reallocation',
        'Predictive analytics to prevent future issues'
      ],
      color: '#5b21b6'
    },
    {
      id: 6,
      icon: RefreshCw,
      title: 'Churn Propensity Visualizer Agent',
      subtitle: 'Predict. Prevent. Prosper.',
      shortDescription: 'Identify at-risk customers and automate retention strategies before they churn.',
      fullDescription: 'Turn customer retention into a science. The Churn Propensity Visualizer Agent uses advanced predictive models to identify customers at risk of leaving before they churn. It automatically triggers personalized retention campaigns, offers targeted incentives, and provides real-time insights into customer health. Stop losing customers and start growing lifetime value.',
      features: [
        'Advanced churn prediction using machine learning models',
        'Real-time customer behavior analysis and scoring',
        'Automated retention campaign orchestration',
        'Personalized incentive and loyalty program management',
        'Continuous learning and predictive accuracy improvement'
      ],
      color: '#9333ea'
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };

  const visibleAgentsList = agents.slice(0, visibleAgents);

  return (
    <section id="agents" className="relative py-24 bg-white overflow-hidden">
      {/* No Background */}

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          ref={ref}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-8 border-b border-black/10 pb-4 inline-block">
            Our AI Agents
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-nyrix-dark mb-8 tracking-tighter uppercase">
            Intelligent Agents.
          </h2>
          <p className="text-xl text-nyrix-dark/70 font-medium leading-relaxed max-w-3xl mx-auto">
            Explore examples of our specialized AI agents and discover how we can build custom solutions tailored to your unique business needs.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {visibleAgentsList.map((agent) => (
            <div
              key={agent.id}
              className={`border-t border-black/10 py-10 transition-all duration-300`}
            >
              <div 
                className="flex items-start sm:items-center gap-8 cursor-pointer"
                onClick={() => toggleCard(agent.id)}
              >
                <div 
                  className="w-16 h-16 shrink-0 flex items-center justify-center text-nyrix-purple"
                >
                  <agent.icon size={40} strokeWidth={1} />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-display font-black text-nyrix-dark tracking-tighter mb-2">{agent.title}</h3>
                    <p className="text-[11px] font-bold tracking-[0.25em] text-nyrix-purple uppercase mb-4">{agent.subtitle}</p>
                    <p className="text-nyrix-dark/70 font-medium text-[16px]">{agent.shortDescription}</p>
                  </div>
                  
                  <button className="shrink-0 flex items-center justify-center text-nyrix-dark/50 hover:text-nyrix-purple transition-colors">
                    <motion.div
                      animate={{ rotate: expandedCard === agent.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedCard === agent.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 mt-8 border-t border-black/5">
                      <p className="text-nyrix-dark/80 text-lg font-medium leading-relaxed mb-10 pl-24">
                        {agent.fullDescription}
                      </p>
                      
                      <div className="pl-24 mb-10">
                        <h4 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-nyrix-dark/80 uppercase mb-8">
                          <Zap size={16} className="text-nyrix-purple" />
                          Key Capabilities
                        </h4>
                        <ul className="space-y-4">
                          {agent.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-4 text-[16px] font-medium text-nyrix-dark/70">
                              <span className="text-nyrix-purple font-mono">{"//"}</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pl-24">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleScheduleCall(); }}
                          className="w-full sm:w-auto px-10 py-5 bg-nyrix-dark text-white font-bold tracking-widest uppercase text-[13px] transition-all hover:bg-black outline-none flex flex-row items-center justify-center gap-2"
                        >
                          Request Demo For {agent.title}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center gap-6">
          {visibleAgents < agents.length && (
            <button
              onClick={() => setVisibleAgents(prev => Math.min(prev + 2, agents.length))}
              className="px-10 py-5 bg-transparent border-b-2 border-black font-bold text-[13px] tracking-widest uppercase text-nyrix-dark hover:border-nyrix-purple hover:text-nyrix-purple transition-all flex items-center gap-2"
            >
              Show More <ChevronDown size={16} />
            </button>
          )}
          {visibleAgents > 2 && (
            <button
              onClick={() => setVisibleAgents(prev => Math.max(prev - 2, 2))}
              className="px-10 py-5 bg-transparent border-b-2 border-black font-bold text-[13px] tracking-widest uppercase text-nyrix-dark hover:border-nyrix-purple hover:text-nyrix-purple transition-all flex items-center gap-2"
            >
              Show Less <ChevronUp size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Agents;
