import { 
  Search, 
  Mail, 
  User, 
  TrendingUp, 
  Clock as Activity, 
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

export const agents = [
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
    color: '#fa709a',
    imageHero: 'https://picsum.photos/seed/cmo-agent/1200/600',
    imageThumb: 'https://picsum.photos/seed/cmo-agent/400/240'
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
    color: '#4facfe',
    imageHero: 'https://picsum.photos/seed/personal-assistant/1200/600',
    imageThumb: 'https://picsum.photos/seed/personal-assistant/400/240'
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
    color: '#667eea',
    imageHero: 'https://picsum.photos/seed/research-agent/1200/600',
    imageThumb: 'https://picsum.photos/seed/research-agent/400/240'
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
    color: '#f093fb',
    imageHero: 'https://picsum.photos/seed/email-agent/1200/600',
    imageThumb: 'https://picsum.photos/seed/email-agent/400/240'
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
    color: '#ff6b6b',
    imageHero: 'https://picsum.photos/seed/ai-fatigue/1200/600',
    imageThumb: 'https://picsum.photos/seed/ai-fatigue/400/240'
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
    color: '#2ed573',
    imageHero: 'https://picsum.photos/seed/churn-visualizer/1200/600',
    imageThumb: 'https://picsum.photos/seed/churn-visualizer/400/240'
  }
];

export default agents;


