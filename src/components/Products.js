import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  Brain, 
  Cpu, 
  Zap, 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Bot 
} from 'lucide-react';
import './Products.css';

const productsData = [
  {
    id: 'kinlu',
    name: 'KINLU',
    tagline: 'Automated ML & Predictive Analytics Engine',
    badge: 'Live Product',
    isLive: true,
    link: 'https://kinlu.ai/',
    linkText: 'Visit Kinlu.ai',
    description: 'Think of Kinlu as your dedicated, automated data science team. It generates production-ready machine learning models from your raw data to handle churn prediction, customer lifetime value, and marketing intent, giving you clear enterprise intelligence without the operational complexity.',
    features: [
      {
        icon: AlertTriangle,
        title: 'Autonomous ML Models',
        description: 'Generates production-ready machine learning models straight from your raw data, with no data science team needed.'
      },
      {
        icon: BarChart3,
        title: 'Predictive Analytics',
        description: 'Easily predicts customer churn, lifetime value, and marketing intent so you can make proactive moves.'
      },
      {
        icon: FileText,
        title: 'Seamless Integrations',
        description: 'Ingests data automatically from Shopify, Meta Ads, and CSV files to build a clean, unified view of your business.'
      },
      {
        icon: CheckCircle2,
        title: 'Actionable Decision Support',
        description: 'Delivers clear probabilistic insights and statistical validation so you can make big decisions with total confidence.'
      }
    ]
  },
  {
    id: 'artifex',
    name: 'ARTIFEX',
    tagline: 'AI Product Photography & Marketing Creative Platform',
    badge: 'Live Product',
    isLive: true,
    link: 'http://useartifex.co/',
    linkText: 'Visit Artifex',
    description: 'Artifex transforms raw product photos into stunning, professional marketing posters in just 1 to 2 minutes. Simply upload your product, pick a category, and Artifex crafts 3 distinct campaign-ready posters for you, with no designer, photoshoot, or prompt engineering required.',
    features: [
      {
        icon: Sparkles,
        title: '3-Step Creative Magic',
        description: 'Upload your product photo, pick your category, and get 3 studio-grade marketing poster options delivered in under 2 minutes.'
      },
      {
        icon: Cpu,
        title: 'Product-Specific Intelligence',
        description: 'Understands your specific product category from fashion and beauty to electronics, setting perfect lighting and styling while preserving your actual product.'
      },
      {
        icon: Layers,
        title: 'Clean Visuals Without AI Text',
        description: 'Focuses purely on high-end commercial imagery without messy AI typography or fake logos, making your visuals ready for immediate campaign use.'
      },
      {
        icon: Brain,
        title: 'Commercial Credit Engine',
        description: 'Built with complete SaaS infrastructure including user accounts, credit management, generation history, and instant creative retries.'
      }
    ]
  },
  {
    id: 'numaya',
    name: 'NUMAYA',
    tagline: 'AI Marketing, Creative Studio & Social Operations Platform',
    badge: 'Live Product',
    isLive: true,
    link: 'http://numaya.io/',
    linkText: 'Visit Numaya',
    description: 'Numaya is an all-in-one AI social marketing engine designed for restaurants and growing businesses. Powered by OMNIA, its conversational command center, Numaya takes care of brand strategy, dish-level creative design, social publishing, community inbox management, and Meta Ads.',
    features: [
      {
        icon: Brain,
        title: 'OMNIA AI Command Center',
        description: 'Your conversational assistant for planning content, running bulk campaigns, discovering strategy, and scheduling posts.'
      },
      {
        icon: Sparkles,
        title: 'Dish-Intelligent Creative Studio',
        description: 'Creates stunning food and campaign graphics while keeping your actual dish identity and real logo intact.'
      },
      {
        icon: Bot,
        title: 'Automated Social & Inbox Suite',
        description: 'Handles Facebook and Instagram publishing, smart calendar scheduling, verified analytics, and safe comment replies with human review.'
      },
      {
        icon: Zap,
        title: 'Meta Ads & Campaign Engine',
        description: 'Drafts complete Meta ad campaigns directly from simple prompts, backed by built-in policy checks and real performance tracking.'
      }
    ]
  },
  {
    id: 'veeko',
    name: 'VEEKO',
    tagline: 'AI Powered Shopify Intelligence & Fraud Detection',
    badge: 'Project Shelved',
    statusLabel: 'Shelved',
    disabledText: 'Project Shelved',
    isLive: false,
    link: '#',
    linkText: 'Learn More',
    description: 'Veeko was built as an AI powered store assistant and risk analysis platform for Shopify merchants. It protects online stores with real time order fraud scoring, provides instant 24/7 answers about revenue and customers, and delivers comprehensive daily operational insights.',
    features: [
      {
        icon: AlertTriangle,
        title: 'Smart Risk & Fraud Analysis',
        description: 'Automatically flags high risk orders in real time using AI scoring and custom thresholds to protect store revenue from fraudulent transactions.'
      },
      {
        icon: Bot,
        title: 'Veeko 24/7 AI Store Assistant',
        description: 'Acts as an intelligent store companion that delivers instant answers about monthly revenue, order tracking, inventory, and customer trends.'
      },
      {
        icon: BarChart3,
        title: 'Analytics & Visual Dashboards',
        description: 'Transforms raw store metrics into clear, interactive charts and dashboard views to give you immediate performance visibility.'
      },
      {
        icon: FileText,
        title: 'Daily Operational Reports',
        description: 'Generates automated daily summary reports with AI recommendations and actionable optimization tips to help grow your business.'
      }
    ]
  }
];

// Helper component for icon fallback
function CheckCircle2(props) {
  return <Sparkles {...props} />;
}

const Products = () => {
  const [activeTab, setActiveTab] = useState('kinlu');

  const activeProduct = productsData.find((p) => p.id === activeTab) || productsData[0];

  return (
    <section className="relative py-16 md:py-24 bg-nyrix-light overflow-hidden" id="products">
      {/* Anchor for legacy Kinlu link */}
      <div id="kinlu" className="absolute top-0 left-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-4 sm:mb-8 border-b border-black/10 pb-3 sm:pb-4 inline-block">
            Proprietary Products
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-nyrix-dark mb-4 sm:mb-6 tracking-tighter uppercase leading-tight">
            OUR PRODUCTS.
          </h2>
          <p className="text-base md:text-lg text-nyrix-dark/70 font-medium leading-relaxed px-2 sm:px-0">
            Explore the intelligent platforms built by Nyrix to automate workflows, transform complex data analytics, and power next-generation business capabilities.
          </p>
        </motion.div>

        {/* Product Navigation Tabs (Mobile Responsive & Touch Optimized) */}
        <motion.div 
          role="tablist"
          aria-label="Products navigation"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {productsData.map((product) => {
            const isActive = activeTab === product.id;
            return (
              <button
                key={product.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`product-panel-${product.id}`}
                onClick={() => setActiveTab(product.id)}
                className={`relative py-3.5 px-4 sm:py-5 sm:px-6 rounded-xl text-left transition-all duration-300 border outline-none min-h-[72px] sm:min-h-[90px] flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-nyrix-purple ${
                  isActive
                    ? 'bg-nyrix-dark text-white border-nyrix-dark shadow-md sm:shadow-lg scale-[1.01] sm:scale-[1.02]'
                    : 'bg-white/70 text-nyrix-dark/80 border-black/10 hover:border-nyrix-purple/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-base sm:text-xl font-display font-black tracking-tight ${isActive ? 'text-white' : 'text-nyrix-dark'}`}>
                    {product.name}
                  </span>
                  <span className={`text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 sm:px-2 rounded shrink-0 ${
                    isActive ? 'bg-white/20 text-white/90' : 'bg-black/5 text-nyrix-dark/50'
                  }`}>
                    {product.isLive ? 'Live' : (product.statusLabel || 'Soon')}
                  </span>
                </div>
                <p className={`text-[11px] sm:text-[12px] font-medium line-clamp-1 ${isActive ? 'text-white/70' : 'text-nyrix-dark/60'}`}>
                  {product.tagline}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* Active Product Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            id={`product-panel-${activeProduct.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm border border-black/10 rounded-2xl p-5 sm:p-8 md:p-12 shadow-card"
          >
            {/* Active Product Intro */}
            <div className="max-w-3xl mb-10 md:mb-16">
              <div className="mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-semibold text-nyrix-purple tracking-wider uppercase">
                  {activeProduct.tagline}
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-nyrix-dark mb-4 sm:mb-6 tracking-tight uppercase leading-none">
                {activeProduct.name}.
              </h3>

              <p className="text-base sm:text-lg text-nyrix-dark/75 font-medium leading-relaxed mb-6 sm:mb-8">
                {activeProduct.description}
              </p>

              {activeProduct.isLive ? (
                <motion.a
                  href={activeProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-nyrix-dark text-white font-bold tracking-widest uppercase text-xs sm:text-[13px] transition-all hover:bg-nyrix-purple rounded-xl outline-none shadow-md focus-visible:ring-2 focus-visible:ring-nyrix-purple"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{activeProduct.linkText}</span>
                  <ExternalLink size={16} className="translate-y-[-1px] shrink-0" />
                </motion.a>
              ) : (
                <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-nyrix-dark/5 border border-black/10 text-nyrix-dark/60 font-bold tracking-widest uppercase text-xs rounded-xl">
                  <span>{activeProduct.disabledText || 'Project Shelved'}</span>
                </div>
              )}
            </div>

            {/* Active Product Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 border-t border-black/10 pt-8 sm:pt-12">
              {activeProduct.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-start bg-nyrix-light/50 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-none border-black/5"
                  >
                    <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-nyrix-purple/10 text-nyrix-purple rounded-xl group-hover:bg-nyrix-purple group-hover:text-white transition-colors duration-300 shrink-0">
                      <IconComponent size={22} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-display font-black text-nyrix-dark mb-1.5 sm:mb-2 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-nyrix-dark/70 font-medium leading-relaxed text-sm sm:text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;
