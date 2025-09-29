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
    category: 'Personal Assistant',
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
    imageHero: '/sair th.jpg',
    imageThumb: '/sair th.jpg'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'CMO Agent',
    subtitle: 'AI-Powered Marketing & Content Automation',
    category: 'Marketing & Content',
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
    category: 'Analytics & Data',
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
    imageHero: '/SalesIQ AI The Conversational Data Analyst.jpeg',
    imageThumb: '/SalesIQ AI The Conversational Data Analyst.jpeg'
  },
  {
    id: 4,
    icon: Search,
    title: 'The Market Whisperer',
    subtitle: 'Your Price Drop Recorder',
    category: 'Research & Intelligence',
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
    imageHero: '/market-whisperer.jpg',
    imageThumb: '/market-whisperer.jpg'
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Growth Oracle',
    subtitle: 'The Keyword Spike Capitalizer',
    category: 'Research & Intelligence',
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
    imageHero: '/growth oracle.jpeg',
    imageThumb: '/growth oracle.jpeg'
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'CertiGuard AI',
    subtitle: 'Your Proactive SSL/TLS Monitor',
    category: 'Security & Monitoring',
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
    imageHero: '/certiguard-ai.jpeg',
    imageThumb: '/certiguard-ai.jpeg'
  },
  {
    id: 7,
    icon: Search,
    title: 'Verity Scout',
    subtitle: 'Your AI Landing Page Analyst',
    category: 'Analytics & Data',
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
    imageHero: '/verity-scout.jpg',
    imageThumb: '/verity-scout.jpg'
  },
  {
    id: 8,
    icon: Calendar,
    title: 'CliniCall',
    subtitle: 'The AI Appointment Assistant',
    category: 'Healthcare & Scheduling',
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
    imageHero: '/clinicall.jpeg',
    imageThumb: '/clinicall.jpeg'
  },
  {
    id: 9,
    icon: BarChart3,
    title: 'FinSense',
    subtitle: 'Your AI Financial Analyst',
    category: 'Analytics & Data',
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
    imageHero: '/finsense.jpg',
    imageThumb: '/finsense.jpg'
  },

  {
    id: 10,
    icon: FileText,
    title: 'Personalized Writing Agent',
    subtitle: 'AI Content Generator',
    category: 'Marketing & Content',
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
    imageHero: '/personalized-writing agent.jpg',
    imageThumb: '/personalized-writing agent.jpg'
  },
  {
    id: 11,
    icon: Globe,
    title: 'YouTube Summarizer',
    subtitle: 'AI-Powered Video to Text Insights',
    category: 'Marketing & Content',
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
    imageHero: '/youtube-summarizer.jpeg',
    imageThumb: '/youtube-summarizer.jpeg'
  },
  {
    id: 12,
    icon: Mail,
    title: 'Gmail AI Auto-Responder',
    subtitle: 'Smart Email Draft Generator',
    category: 'Communication',
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
    imageHero: '/email auto responder draft.jpeg',
    imageThumb: '/email auto responder draft.jpeg'
  },
  {
    id: 13,
    icon: Mail,
    title: 'MailMaster',
    subtitle: 'Smart Email Organization & Categorization',
    category: 'Communication',
    shortDescription: 'Automatically organizes your Gmail inbox by intelligently labeling and categorizing emails based on content, sender, and context.',
    fullDescription: 'MailMaster transforms your email chaos into organized efficiency. It reads incoming emails, analyzes their content and context, then automatically applies appropriate labels and moves them to relevant folders. From client communications to newsletters, receipts to urgent requests, it keeps your inbox perfectly organized without any manual effort.',
    features: [
      'Intelligent Content Analysis: Reads and understands email content, sender patterns, and context to determine appropriate categorization',
      'Automatic Label Application: Creates and applies custom labels based on email type (client, personal, business, receipts, etc.)',
      'Smart Folder Organization: Moves emails to designated folders based on priority, sender, or content type',
      'Learning Capabilities: Adapts to your email patterns and preferences over time for increasingly accurate organization',
      'Bulk Processing: Organizes existing emails in your inbox and maintains organization for all future emails'
    ],
    gradient: 'linear-gradient(135deg, #EA4335 0%, #FBBC04 100%)',
    color: '#EA4335',
    imageHero: '/gmail auto labeler.jpeg',
    imageThumb: '/gmail auto labeler.jpeg'
  },
  {
    id: 14,
    icon: User,
    title: 'LeadConnect',
    subtitle: 'Transform Engagement into Business Opportunities',
    category: 'Marketing & Content',
    shortDescription: 'Converts LinkedIn comment interactions into qualified leads by analyzing engagement patterns and initiating meaningful business conversations.',
    fullDescription: 'LeadConnect turns every LinkedIn comment into a potential business opportunity. This agent monitors your LinkedIn posts, analyzes comment engagement, identifies high-value prospects, and automatically initiates personalized outreach. It transforms passive social media engagement into active lead generation by connecting with prospects who show genuine interest in your content.',
    features: [
      'Comment Monitoring: Tracks comments on your LinkedIn posts to identify potential leads',
      'Lead Identification: Analyzes comment engagement to find users interested in your content',
      'Lead Conversion: Transforms comment interactions into qualified business opportunities'
    ],
    gradient: 'linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)',
    color: '#0077B5',
    imageHero: '/linkdin-commnts to leads.jpeg',
    imageThumb: '/linkdin-commnts to leads.jpeg'
  },
  {
    id: 15,
    icon: FileText,
    title: 'VideoScript',
    subtitle: 'AI-Powered Video Description Generation',
    category: 'Marketing & Content',
    shortDescription: 'Automatically generates comprehensive, SEO-optimized descriptions for YouTube videos based on content analysis and trending keywords.',
    fullDescription: 'VideoScript eliminates the tedious task of writing YouTube descriptions. This agent analyzes your video content, extracts key topics, identifies relevant trending keywords, and generates compelling, SEO-optimized descriptions. It includes timestamps, relevant hashtags, call-to-actions, and links while maintaining your brand voice and maximizing discoverability.',
    features: [
      'Auto Description Generation: Automatically creates YouTube video descriptions',
      'Content Analysis: Analyzes video content to generate relevant descriptions',
      'SEO Optimization: Includes keywords and tags to improve video discoverability'
    ],
    gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    color: '#FF0000',
    imageHero: '/youtub auto description writer.jpeg',
    imageThumb: '/youtub auto description writer.jpeg'
  },
  {
    id: 16,
    icon: BarChart3,
    title: 'DataViz',
    subtitle: 'Natural Language Google Sheets Interface',
    category: 'Analytics & Data',
    shortDescription: 'Talk to your Google Sheets data using natural language. Ask questions, generate insights, and manipulate data through conversational AI.',
    fullDescription: 'DataViz transforms your Google Sheets into an intelligent data assistant. Simply ask questions in plain English like "Show me sales trends for last quarter" or "What are the top 5 performing products?" The agent understands your data structure, interprets your requests, and provides instant answers with visualizations and insights. No complex formulas or coding required.',
    features: [
      'Natural Language Queries: Ask questions about your Google Sheets data in plain English',
      'Data Interpretation: Understands your spreadsheet structure and data types',
      'Query Execution: Performs calculations and analysis based on your questions'
    ],
    gradient: 'linear-gradient(135deg, #0F9D58 0%, #137333 100%)',
    color: '#0F9D58',
    imageHero: '/data-query.jpeg',
    imageThumb: '/data-query.jpeg'
  },
  {
    id: 17,
    icon: FileText,
    title: 'InvoiceBot',
    subtitle: 'Intelligent Document Processing & Data Extraction',
    category: 'Document Processing',
    shortDescription: 'Upload invoices and automatically extract, transcribe, and organize all relevant data into structured formats for easy processing.',
    fullDescription: 'InvoiceBot streamlines your invoice processing workflow with intelligent document capture. Simply upload invoice images or PDFs, and the agent automatically extracts all relevant information including vendor details, line items, amounts, dates, and payment terms. It converts unstructured invoice data into organized, searchable formats while maintaining accuracy and reducing manual data entry errors.',
    features: [
      'Invoice Upload: Upload invoice images and PDFs for processing',
      'OCR Transcription: Automatically reads and transcribes text from invoices',
      'Data Extraction: Extracts key information like amounts, dates, and vendor details'
    ],
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    color: '#FF6B35',
    imageHero: '/invoice-capture.jpeg',
    imageThumb: '/invoice-capture.jpeg'
  },
  {
    id: 18,
    icon: FileText,
    title: 'ProposalCraft',
    subtitle: 'AI-Powered Freelance Proposal Generator',
    category: 'Business Development',
    shortDescription: 'Generate compelling proposals, cover letters, and visual diagrams for Upwork projects to increase your win rate and land more clients.',
    fullDescription: 'ProposalCraft masters the art of winning Upwork proposals with AI-powered assistance. This agent analyzes project requirements, crafts personalized proposals that highlight your expertise, generates professional cover letters, and even creates Mermaid diagrams to visualize project approaches. It adapts to different project types and client preferences to maximize your proposal success rate.',
    features: [
      'Proposal Generation: Creates compelling proposals for Upwork projects',
      'Cover Letter Creation: Generates professional cover letters',
      'Mermaid Diagrams: Creates visual diagrams within the app to illustrate project approaches'
    ],
    gradient: 'linear-gradient(135deg, #6FCF97 0%, #2F80ED 100%)',
    color: '#6FCF97',
    imageHero: '/proposal-craft.jpeg',
    imageThumb: '/proposal-craft.jpeg'
  },
  {
    id: 19,
    icon: FileText,
    title: 'LegalGuard',
    subtitle: 'Intelligent Contract Review & Analysis',
    category: 'Legal & Compliance',
    shortDescription: 'Review contracts, identify potential issues, and provide legal insights using AI-powered analysis to protect your business interests.',
    fullDescription: 'LegalGuard helps you navigate complex legal documents with confidence. This agent reviews contracts, terms of service, and legal agreements to identify potential risks, highlight important clauses, and provide plain-language explanations of legal terms. It helps you understand what you\'re signing while flagging potential issues that may require professional legal review.',
    features: [
      'Contract Review: Analyzes contracts and legal documents for potential issues',
      'Issue Identification: Flags problematic clauses and potential risks',
      'Legal Analysis: Provides insights on contract terms and implications'
    ],
    gradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
    color: '#8B4513',
    imageHero: '/legal-agent.jpeg',
    imageThumb: '/legal-agent.jpeg'
  }
];

export default agents;


