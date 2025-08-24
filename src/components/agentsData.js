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
  RefreshCw,
  Bot
} from 'lucide-react';

export const agents = [
  {
    id: 1,
    icon: Bot,
    title: 'Sair',
    subtitle: 'Personal AI Assistant',
    shortDescription: 'I designed and developed Sair, an AI-powered personal assistant that automates daily workflows.',
    fullDescription: 'Sair integrates directly with Google Calendar, Gmail, and ClickUp, while also providing its own lightweight project/task board for quick organization. Beyond scheduling and task management, Sair can conduct structured research, generate reports, and send emails.',
    features: [
      'Calendar & Meetings: Automatically schedules meetings, checks availability, sends invites, and avoids conflicts',
      'Email Automation: Drafts professional emails in your tone, handles threads, and supports approval rules for safe sending',
      'Task & Project Management: Creates and manages projects in ClickUp, while maintaining its own internal project/task board for quick organization',
      'AI Research Agent: Conducts thorough research on any topic, and generates executive-ready summaries'
    ],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    color: '#8B5CF6',
    imageHero: '/sair th.png',
    imageThumb: '/sair th.png'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'CMO Agent',
    subtitle: 'AI-Powered Marketing & Content Automation',
    shortDescription: 'I designed and built the CMO Agent, an AI-driven marketing assistant that automates content creation and publishing.',
    fullDescription: 'The agent researches trending topics across platforms, generates tailored posts for LinkedIn, Instagram, and Twitter, creates branded visuals, and schedules content automatically. By combining research, copywriting, design, and publishing into one workflow, it delivers consistent, high-quality marketing output without manual effort.',
    features: [
      'Trend & Virality Research: Scans platforms (LinkedIn, Instagram, Twitter/X, TikTok, news, Google Trends) and identifies trending topics in your niche',
      'Content Strategy & Generation: Creates content with posts, visuals, and hashtags, or researches trending subjects automatically',
      'Platform-Specific Optimization: Differentiates tone and format by platform (LinkedIn professional, Instagram visual-first, Twitter viral threads)',
      'Creative Assets Generation: Generates post visuals including memes, infographics, branded graphics, and reels ideas with consistent brand style',
      ],
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    color: '#FF6B35',
    imageHero: '/cmo.jpg',
    imageThumb: '/cmo.jpg'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'SalesIQ AI',
    subtitle: 'The Conversational Data Analyst',
    shortDescription: 'Introducing SalesIQ AI, the innovative AI Data Analysis Chatbot designed to make data accessible to everyone, regardless of their technical expertise.',
    fullDescription: 'By connecting directly to your datasets, this powerful tool transforms complex data into clear, actionable insights through a simple, conversational interface.',
    features: [
      'Real-time Statistical Analysis: Get instant answers to your data questions',
      'Plain Language Answers: Understand your data without needing to write code or complex queries',
      'Conversational Interaction: Interact with your data in a natural, chat-based way',
      'Instant Insights: Generate summaries and meaningful insights from raw data instantly',
      'Reduced Complexity: Eliminate the need for complex BI tools and manual data analysis'
    ],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
    imageHero: '/SalesIQ AI The Conversational Data Analyst.png',
    imageThumb: '/SalesIQ AI The Conversational Data Analyst.png'
  },
  {
    id: 4,
    icon: Search,
    title: 'The Market Whisperer',
    subtitle: 'Your Price Drop Recorder',
    shortDescription: 'Meet The Market Whisperer, your ultimate companion for monitoring e-commerce prices.',
    fullDescription: 'This intelligent agent tracks products across multiple websites, creating a detailed history of price fluctuations so you never miss a deal. Whether you are a business monitoring competitor pricing or a consumer looking for the perfect time to buy, The Market Whisperer automates the hard work, ensuring you make smarter purchasing decisions and achieve significant cost savings.',
    features: [
      'Real-time Price Tracking: Monitors product prices across a wide range of e-commerce sites',
      'Historical Price Data: Maintains a comprehensive history of price fluctuations to identify trends',
      'Customizable Price Drop Alerts: Notifies you instantly when a product reaches your desired price threshold',
      'Competitive Intelligence: Provides businesses with real-time insights into competitor pricing strategies',
      'Automated Savings: Eliminates the need for manual price checking, saving you time and money'
    ],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
    imageHero: '/market-whisperer.png',
    imageThumb: '/market-whisperer.png'
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Growth Oracle',
    subtitle: 'The Keyword Spike Capitalizer',
    shortDescription: 'Introducing Growth Oracle, the AI-powered tool that gives you a competitive edge by identifying emerging trends as they happen.',
    fullDescription: 'This intelligent agent continuously monitors search engines and social media platforms to detect sudden, high-volume keyword spikes. By providing you with real-time, actionable insights, Growth Oracle empowers you to create relevant content, optimize your SEO, and refine your ad targeting, allowing you to capitalize on trending topics before the competition.',
    features: [
      'Real-time Trend Detection: Identifies sudden keyword surges across search and social platforms',
      'Early Mover Advantage: Helps you capitalize on new trends before they become mainstream',
      'Actionable Insights: Provides data to inform SEO, ad targeting, and content strategy',
      'Noise Reduction: Automatically filters out irrelevant data to highlight only meaningful trends',
      'Visibility and Growth: Boosts website traffic, conversions, and overall brand visibility'
    ],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
    imageHero: '/growth oracle.png',
    imageThumb: '/growth oracle.png'
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'CertiGuard AI',
    subtitle: 'Your Proactive SSL/TLS Monitor',
    shortDescription: 'Introducing CertiGuard AI, the guardian of your domain\'s security and trust.',
    fullDescription: 'This agent continuously scans your web infrastructure to monitor the validity of all your SSL/TLS certificates. It proactively detects upcoming expirations, misconfigurations, and potential vulnerabilities, sending you timely alerts to prevent downtime, security breaches, and loss of trust. With CertiGuard AI, you can ensure continuous compliance, maintain secure connections, and protect your business from costly disruptions and cyber threats.',
    features: [
      'Continuous Domain Scanning: Monitors all SSL/TLS certificates across your domains 24/7',
      'Proactive Expiration Alerts: Notifies you well in advance of a certificate\'s expiration date',
      'Vulnerability Detection: Identifies misconfigurations and security vulnerabilities in certificates',
      'Downtime Prevention: Helps you avoid service outages and security risks caused by expired certificates',
      'Compliance and Trust: Ensures you meet security standards and build user confidence through secure connections'
    ],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
    imageHero: '/certiguard-ai.png',
    imageThumb: '/certiguard-ai.png'
  },
  {
    id: 7,
    icon: Search,
    title: 'Verity Scout',
    subtitle: 'Your AI Landing Page Analyst',
    shortDescription: 'Introducing Verity Scout, the AI-powered landing page analyzer that gives you the unfiltered truth about your online presence.',
    fullDescription: 'This agent meticulously analyzes your landing pages and provides honest, personalized recommendations to boost your conversion rates and user engagement. Verity Scout acts as your no-nonsense consultant, identifying weaknesses in your design, content, and calls-to-action to help you transform your landing page into a powerful lead-generating machine.',
    features: [
      'AI-Powered Landing Page Analysis: Scans and evaluates your landing page for effectiveness and user experience',
      'Actionable Recommendations: Provides personalized insights to improve headlines, CTAs, and content',
      'Conversion Rate Optimization (CRO): Offers strategies to turn more visitors into leads and customers',
      'Audience Engagement Insights: Helps you create a more compelling and lively experience for visitors',
      'Competitive Edge: Gives you the data and direction needed to outperform your competitors\' websites'
    ],
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    color: '#ff6b6b',
    imageHero: '/verity-scout.png',
    imageThumb: '/verity-scout.png'
  },
  {
    id: 8,
    icon: Calendar,
    title: 'CliniCall',
    subtitle: 'The AI Appointment Assistant',
    shortDescription: 'Meet CliniCall, the intelligent AI agent designed to streamline your practice\'s scheduling.',
    fullDescription: 'With its real-time Google Calendar integration, CliniCall takes the hassle out of booking appointments by automatically finding and offering available time slots. It handles everything from finding the perfect time to logging patient details for seamless record-keeping. CliniCall ensures a smooth, conversational booking experience for your patients and a more efficient workflow for your practice.',
    features: [
      'Real-time Calendar Integration: Checks availability directly with Google Calendar',
      'Intelligent Slot Matching: Automatically offers alternative appointment times',
      'Automated Booking: Books confirmed appointments directly onto your practice calendar',
      'Patient Data Logging: Gathers and logs patient information to Google Sheets',
      'Contextual Conversation: Maintains natural, fluid dialogue throughout the booking process'
    ],
    gradient: 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)',
    color: '#2ed573',
    imageHero: '/clinicall.png',
    imageThumb: '/clinicall.png'
  },
  {
    id: 9,
    icon: BarChart3,
    title: 'FinSense',
    subtitle: 'Your AI Financial Analyst',
    shortDescription: 'Meet FinSense, the AI agent designed to make financial analysis accessible and engaging.',
    fullDescription: 'FinSense specializes in discussing a wide range of financial topics, from market trends to investment concepts, with a professional yet friendly approach. By leveraging its technical analysis tools, it can provide you with detailed insights into stock performance and help you understand complex financial data, all without the jargon. FinSense is your partner in building financial knowledge and making sense of the market.',
    features: [
      'Conversational Financial Analysis: Discusses financial markets, stocks, and investments in a professional and friendly tone',
      'Technical Analysis Tool: Uses tools to analyze stock performance and generate graphs',
      'Simplified Explanations: Breaks down complex financial concepts into easy-to-understand terms',
      'Market Insights: Provides clear insights derived from charts and market data',
      'No-Advice Policy: Educates and informs without offering explicit financial advice or recommendations'
    ],
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
    color: '#00c6ff',
    imageHero: '/finsense.png',
    imageThumb: '/finsense.png'
  },

  {
    id: 10,
    icon: FileText,
    title: 'Personalized Writing Agent',
    subtitle: 'AI Content Generator',
    shortDescription: 'An AI-powered writing assistant that learns your unique writing style from sample text and generates new content in the same voice, tone, and flow.',
    fullDescription: 'Whether it\'s casual, professional, literary, or even in the style of a favorite author, the agent adapts perfectly. It analyzes vocabulary, tone, rhythm, and sentence structure to create a personalized writing style profile, then generates original content while staying consistent with the selected style.',
    features: [
      'Writing Style Extraction: Analyzes example text to create personalized writing style profiles based on vocabulary, tone, rhythm, and sentence structure',
      'Content Generation: Creates original content in multiple formats including articles, stories, professional emails, social media posts, academic writing, and persuasive essays',
      'Style Adaptation: Perfectly mimics any writing style from casual to professional, literary to "Paulo Coelho-style" writing',
      'Customization Options: Adjustable word count targets, platform-specific tone optimization, and "Preview Style" option to see writing traits before generating',
      'Brand Consistency: Ensures consistent brand or personal voice across blogs, emails, and social media while saving time and keeping writing authentic'
    ],
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: '#10B981',
    imageHero: '/personalized-writing agent.png',
    imageThumb: '/personalized-writing agent.png'
  },
  {
    id: 11,
    icon: Globe,
    title: 'YouTube Summarizer',
    subtitle: 'AI-Powered Video to Text Insights',
    shortDescription: 'An AI tool that transforms any YouTube video into a structured, actionable summary.',
    fullDescription: 'Users can choose different summary modes depending on their need — from quick executive recaps to detailed study plans. The tool understands video context and structure, adapting its output format to match the content type and user\'s specific requirements.',
    features: [
      'Smart Summarization: Paste any YouTube link to generate instant summaries with context-aware understanding of video structure (tips, tutorials, lectures)',
      'Multiple Output Modes: Executive Summary for busy professionals, Study Guide for students, Action Plan for tutorials, Academic Paper with references, Social Media highlights',
      'Context-Aware Formatting: Extracts exactly 5 tips from "5 Tips" videos, creates study notes from lectures, generates actionable checklists from tutorials',
      'Time-Saving Intelligence: Saves hours of watching by delivering key takeaways instantly in the most relevant format for your context',
      'Universal Application: Perfect for researchers, content creators, entrepreneurs, and learners across all industries and use cases'
    ],
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    color: '#EF4444',
    imageHero: '/youtube-summarizer.jpg',
    imageThumb: '/youtube-summarizer.jpg'
  },
  {
    id: 12,
    icon: Mail,
    title: 'Gmail AI Auto-Responder',
    subtitle: 'Smart Email Draft Generator',
    shortDescription: 'An AI-powered assistant that reads every incoming Gmail message, analyzes the sender\'s intent and tone, and generates a ready-to-send draft.',
    fullDescription: 'The user simply reviews the draft and clicks Send—saving hours of email time each week. The system understands sender intent, context, and urgency, then creates professional, polite, or casual drafts based on context with multiple reply variations when needed.',
    features: [
      'Smart Email Reading: Reads every incoming email in Gmail automatically, understanding sender intent, context, and urgency',
      'AI Draft Generation: Creates professional, polite, or casual drafts based on context with proper grammar, clarity, and consistency',
      'Customization Controls: Users can edit and finalize replies before sending with configurable tone (Professional/Friendly/Formal/Casual)',
      'Auto-Inclusions: Automatically includes signatures, disclaimers, or branding as configured by the user',
      'Productivity Enhancement: Speeds up repetitive responses like meeting confirmations and follow-ups, learns from user-approved drafts to improve over time, and provides a one-click send experience'
    ],
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    color: '#3B82F6',
    imageHero: '/email auto responder draft.jpg',
    imageThumb: '/email auto responder draft.jpg'
  }
];

export default agents;


