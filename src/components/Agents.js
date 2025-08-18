import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Mail, 
  User, 
  TrendingUp, 
  Activity, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Calendar,
  FileText,
  BarChart3,
  Zap,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import './Agents.css';

const Agents = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: '#fa709a'
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
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe'
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
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
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
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb'
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
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      color: '#ff6b6b'
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
      gradient: 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)',
      color: '#2ed573'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const showMoreAgents = () => {
    setVisibleAgents(prev => Math.min(prev + 2, agents.length));
  };

  const showLessAgents = () => {
    setVisibleAgents(prev => Math.max(prev - 2, 2));
  };

  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call'
      });
    }
  };

  const visibleAgentsList = agents.slice(0, visibleAgents);
  const hasMoreAgents = visibleAgents < agents.length;
  const hasLessAgents = visibleAgents > 2;

  return (
    <section id="agents" className="agents section">
      <div className="agents-background">
        <div className="agents-pattern"></div>
      </div>

      <div className="container">
        <motion.div
          className="agents-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
                     <span className="section-badge">Our AI Agents</span>
           <h2 className="section-title">
             Intelligent <span className="gradient-text">AI Solutions</span>
           </h2>
           <p className="section-subtitle">
             Explore examples of our specialized AI agents and discover how we can build custom solutions tailored to your unique business needs.
           </p>
        </motion.div>

                 <motion.div
           className="agents-grid"
           variants={containerVariants}
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
         >
           {visibleAgentsList.map((agent) => (
            <motion.div
              key={agent.id}
              className={`agent-card ${expandedCard === agent.id ? 'expanded' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="agent-header" onClick={() => toggleCard(agent.id)}>
                <div className="agent-icon" style={{ background: agent.gradient }}>
                  <agent.icon />
                </div>
                <div className="agent-info">
                  <h3 className="agent-title">{agent.title}</h3>
                  <p className="agent-subtitle">{agent.subtitle}</p>
                  <p className="agent-description">{agent.shortDescription}</p>
                </div>
                <motion.button
                  className="expand-button"
                  animate={{ rotate: expandedCard === agent.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedCard === agent.id ? <ChevronUp /> : <ChevronDown />}
                </motion.button>
              </div>

              <AnimatePresence>
                {expandedCard === agent.id && (
                  <motion.div
                    className="agent-expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="expanded-content">
                      <p className="full-description">{agent.fullDescription}</p>
                      
                      <div className="features-section">
                        <h4 className="features-title">
                          <Zap className="features-icon" />
                          Key Capabilities
                        </h4>
                        <ul className="features-list">
                          {agent.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <span className="feature-dot" style={{ backgroundColor: agent.color }}></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                                             <motion.button
                         className="demo-button"
                         style={{ background: agent.gradient }}
                         onClick={handleScheduleCall}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                       >
                         <span>Request Demo</span>
                         <ChevronDown className="demo-icon" />
                       </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
                         </motion.div>
           ))}
                   </motion.div>

          <motion.div
            className="show-more-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
           {hasMoreAgents && (
             <motion.button
               className="show-more-button"
               onClick={showMoreAgents}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <span>Show More Agents</span>
               <ChevronDown className="show-more-icon" />
             </motion.button>
           )}
           
           {hasLessAgents && (
             <motion.button
               className="show-less-button"
               onClick={showLessAgents}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <span>Show Less</span>
               <ChevronUp className="show-less-icon" />
             </motion.button>
           )}
          </motion.div>
        </div>
      </section>
    );
  };

export default Agents;
