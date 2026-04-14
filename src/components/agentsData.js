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
  Bot,
  DollarSign,
  MapPin,
  Shield,
  BookOpen,
  Image,
  Camera,
  Palette,
  Pill,
  Inbox,
  Twitter,
  Newspaper
} from 'lucide-react';

export const agents = [
  {
    id: 1,
    icon: Bot,
    title: 'Sair',
    subtitle: 'Personal AI Assistant',
    category: 'Personal Assistant',
    tags: ['Productivity', 'Calendar', 'Email', 'Research', 'Task Management'],
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
    category: 'Marketing',
    tags: ['Social Media', 'Content Creation', 'Trending', 'Visual Design', 'Automation'],
    shortDescription: 'I designed and built the CMO Agent, an AI-driven marketing assistant that automates content creation and publishing.',
    fullDescription: 'The agent researches trending topics across platforms, generates tailored posts for LinkedIn, Instagram, and Twitter, creates branded visuals, and schedules content automatically. By combining research, copywriting, design, and publishing into one workflow, it delivers consistent, high-quality marketing output without manual effort.',
    features: [
      'Trend & Virality Research: Scans platforms (LinkedIn, Instagram, Twitter/X, TikTok, news, Google Trends) and identifies trending topics in your niche',
      'Content Strategy & Generation: Creates content with posts, visuals, and hashtags, or researches trending subjects automatically',
      'Platform-Specific Optimization: Differentiates tone and format by platform (LinkedIn professional, Instagram visual-first, Twitter viral threads)',
      'Creative Assets Generation: Generates post visuals including memes, infographics, branded graphics, and reels ideas with consistent brand style',
      ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    color: '#7c3aed',
    imageHero: '/cmo.jpg',
    imageThumb: '/cmo.jpg'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'SalesIQ AI',
    subtitle: 'The Conversational Data Analyst',
    category: 'Analytics',
    tags: ['Data Analysis', 'Business Intelligence', 'Chatbot', 'Conversational', 'Insights'],
    shortDescription: 'Introducing SalesIQ AI, the innovative AI Data Analysis Chatbot designed to make data accessible to everyone, regardless of their technical expertise.',
    fullDescription: 'By connecting directly to your datasets, this powerful tool transforms complex data into clear, actionable insights through a simple, conversational interface.',
    features: [
      'Real-time Statistical Analysis: Get instant answers to your data questions',
      'Plain Language Answers: Understand your data without needing to write code or complex queries',
      'Conversational Interaction: Interact with your data in a natural, chat-based way',
      'Instant Insights: Generate summaries and meaningful insights from raw data instantly',
      'Reduced Complexity: Eliminate the need for complex BI tools and manual data analysis'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)',
    color: '#8b5cf6',
    imageHero: '/SalesIQ AI The Conversational Data Analyst.jpeg',
    imageThumb: '/SalesIQ AI The Conversational Data Analyst.jpeg'
  },
  {
    id: 4,
    icon: Search,
    title: 'The Market Whisperer',
    subtitle: 'Your Price Drop Recorder',
    category: 'Research',
    tags: ['Price Tracking', 'E-commerce', 'Market Research', 'Price Monitoring', 'Deals'],
    shortDescription: 'Meet The Market Whisperer, your ultimate companion for monitoring e-commerce prices.',
    fullDescription: 'This intelligent agent tracks products across multiple websites, creating a detailed history of price fluctuations so you never miss a deal. Whether you are a business monitoring competitor pricing or a consumer looking for the perfect time to buy, The Market Whisperer automates the hard work, ensuring you make smarter purchasing decisions and achieve significant cost savings.',
    features: [
      'Real-time Price Tracking: Monitors product prices across a wide range of e-commerce sites',
      'Historical Price Data: Maintains a comprehensive history of price fluctuations to identify trends',
      'Customizable Price Drop Alerts: Notifies you instantly when a product reaches your desired price threshold',
      'Competitive Intelligence: Provides businesses with real-time insights into competitor pricing strategies',
      'Automated Savings: Eliminates the need for manual price checking, saving you time and money'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)',
    color: '#6d28d9',
    imageHero: '/market-whisperer.jpg',
    imageThumb: '/market-whisperer.jpg'
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Growth Oracle',
    subtitle: 'The Keyword Spike Capitalizer',
    category: 'Research',
    tags: ['SEO', 'Trend Detection', 'Keyword Research', 'Growth', 'Competitive Analysis'],
    shortDescription: 'Introducing Growth Oracle, the AI-powered tool that gives you a competitive edge by identifying emerging trends as they happen.',
    fullDescription: 'This intelligent agent continuously monitors search engines and social media platforms to detect sudden, high-volume keyword spikes. By providing you with real-time, actionable insights, Growth Oracle empowers you to create relevant content, optimize your SEO, and refine your ad targeting, allowing you to capitalize on trending topics before the competition.',
    features: [
      'Real-time Trend Detection: Identifies sudden keyword surges across search and social platforms',
      'Early Mover Advantage: Helps you capitalize on new trends before they become mainstream',
      'Actionable Insights: Provides data to inform SEO, ad targeting, and content strategy',
      'Noise Reduction: Automatically filters out irrelevant data to highlight only meaningful trends',
      'Visibility and Growth: Boosts website traffic, conversions, and overall brand visibility'
    ],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    color: '#a78bfa',
    imageHero: '/growth oracle.jpeg',
    imageThumb: '/growth oracle.jpeg'
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'CertiGuard AI',
    subtitle: 'Your Proactive SSL/TLS Monitor',
    category: 'Security',
    tags: ['SSL', 'Security', 'Monitoring', 'Certificates', 'Compliance'],
    shortDescription: 'Introducing CertiGuard AI, the guardian of your domain\'s security and trust.',
    fullDescription: 'This agent continuously scans your web infrastructure to monitor the validity of all your SSL/TLS certificates. It proactively detects upcoming expirations, misconfigurations, and potential vulnerabilities, sending you timely alerts to prevent downtime, security breaches, and loss of trust. With CertiGuard AI, you can ensure continuous compliance, maintain secure connections, and protect your business from costly disruptions and cyber threats.',
    features: [
      'Continuous Domain Scanning: Monitors all SSL/TLS certificates across your domains 24/7',
      'Proactive Expiration Alerts: Notifies you well in advance of a certificate\'s expiration date',
      'Vulnerability Detection: Identifies misconfigurations and security vulnerabilities in certificates',
      'Downtime Prevention: Helps you avoid service outages and security risks caused by expired certificates',
      'Compliance and Trust: Ensures you meet security standards and build user confidence through secure connections'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #8b5cf6 100%)',
    color: '#5b21b6',
    imageHero: '/certiguard-ai.jpeg',
    imageThumb: '/certiguard-ai.jpeg'
  },
  {
    id: 7,
    icon: Search,
    title: 'Verity Scout',
    subtitle: 'Your AI Landing Page Analyst',
    category: 'Analytics',
    tags: ['Landing Pages', 'Analytics', 'Conversion', 'Optimization', 'Performance'],
    shortDescription: 'Introducing Verity Scout, the AI-powered landing page analyzer that gives you the unfiltered truth about your online presence.',
    fullDescription: 'This agent meticulously analyzes your landing pages and provides honest, personalized recommendations to boost your conversion rates and user engagement. Verity Scout acts as your no-nonsense consultant, identifying weaknesses in your design, content, and calls-to-action to help you transform your landing page into a powerful lead-generating machine.',
    features: [
      'AI-Powered Landing Page Analysis: Scans and evaluates your landing page for effectiveness and user experience',
      'Actionable Recommendations: Provides personalized insights to improve headlines, CTAs, and content',
      'Conversion Rate Optimization (CRO): Offers strategies to turn more visitors into leads and customers',
      'Audience Engagement Insights: Helps you create a more compelling and lively experience for visitors',
      'Competitive Edge: Gives you the data and direction needed to outperform your competitors\' websites'
    ],
    gradient: 'linear-gradient(135deg, #9333ea 0%, #a78bfa 100%)',
    color: '#9333ea',
    imageHero: '/verity-scout.jpg',
    imageThumb: '/verity-scout.jpg'
  },
  {
    id: 8,
    icon: Calendar,
    title: 'CliniCall',
    subtitle: 'The AI Appointment Assistant',
    category: 'Healthcare',
    tags: ['Healthcare', 'Scheduling', 'Calendar', 'Appointments', 'Practice Management'],
    shortDescription: 'Meet CliniCall, the intelligent AI agent designed to streamline your practice\'s scheduling.',
    fullDescription: 'With its real-time Google Calendar integration, CliniCall takes the hassle out of booking appointments by automatically finding and offering available time slots. It handles everything from finding the perfect time to logging patient details for seamless record-keeping. CliniCall ensures a smooth, conversational booking experience for your patients and a more efficient workflow for your practice.',
    features: [
      'Real-time Calendar Integration: Checks availability directly with Google Calendar',
      'Intelligent Slot Matching: Automatically offers alternative appointment times',
      'Automated Booking: Books confirmed appointments directly onto your practice calendar',
      'Patient Data Logging: Gathers and logs patient information to Google Sheets',
      'Contextual Conversation: Maintains natural, fluid dialogue throughout the booking process'
    ],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    color: '#4c1d95',
    imageHero: '/clinicall.jpeg',
    imageThumb: '/clinicall.jpeg'
  },
  {
    id: 9,
    icon: BarChart3,
    title: 'FinSense',
    subtitle: 'Your AI Financial Analyst',
    category: 'Analytics',
    tags: ['Financial Analysis', 'Trading', 'Market Analysis', 'Investment', 'Charts'],
    shortDescription: 'Meet FinSense, the AI agent designed to make financial analysis accessible and engaging.',
    fullDescription: 'FinSense specializes in discussing a wide range of financial topics, from market trends to investment concepts, with a professional yet friendly approach. By leveraging its technical analysis tools, it can provide you with detailed insights into stock performance and help you understand complex financial data, all without the jargon. FinSense is your partner in building financial knowledge and making sense of the market.',
    features: [
      'Conversational Financial Analysis: Discusses financial markets, stocks, and investments in a professional and friendly tone',
      'Technical Analysis Tool: Uses tools to analyze stock performance and generate graphs',
      'Simplified Explanations: Breaks down complex financial concepts into easy-to-understand terms',
      'Market Insights: Provides clear insights derived from charts and market data',
      'No-Advice Policy: Educates and informs without offering explicit financial advice or recommendations'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    color: '#7c3aed',
    imageHero: '/finsense.jpg',
    imageThumb: '/finsense.jpg'
  },

  {
    id: 10,
    icon: FileText,
    title: 'Personalized Writing Agent',
    subtitle: 'AI Content Generator',
    category: 'Marketing',
    tags: ['Content Writing', 'AI Writing', 'Brand Voice', 'Personalization', 'Style Adaptation'],
    shortDescription: 'An AI-powered writing assistant that learns your unique writing style from sample text and generates new content in the same voice, tone, and flow.',
    fullDescription: 'Whether it\'s casual, professional, literary, or even in the style of a favorite author, the agent adapts perfectly. It analyzes vocabulary, tone, rhythm, and sentence structure to create a personalized writing style profile, then generates original content while staying consistent with the selected style.',
    features: [
      'Writing Style Extraction: Analyzes example text to create personalized writing style profiles based on vocabulary, tone, rhythm, and sentence structure',
      'Content Generation: Creates original content in multiple formats including articles, stories, professional emails, social media posts, academic writing, and persuasive essays',
      'Style Adaptation: Perfectly mimics any writing style from casual to professional, literary to "Paulo Coelho-style" writing',
      'Customization Options: Adjustable word count targets, platform-specific tone optimization, and "Preview Style" option to see writing traits before generating',
      'Brand Consistency: Ensures consistent brand or personal voice across blogs, emails, and social media while saving time and keeping writing authentic'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%)',
    color: '#6d28d9',
    imageHero: '/personalized-writing agent.jpg',
    imageThumb: '/personalized-writing agent.jpg'
  },
  {
    id: 11,
    icon: Globe,
    title: 'YouTube Summarizer',
    subtitle: 'AI-Powered Video to Text Insights',
    category: 'Marketing',
    tags: ['YouTube', 'Video Analysis', 'Summarization', 'Content Extraction', 'AI Processing'],
    shortDescription: 'An AI tool that transforms any YouTube video into a structured, actionable summary.',
    fullDescription: 'Users can choose different summary modes depending on their need — from quick executive recaps to detailed study plans. The tool understands video context and structure, adapting its output format to match the content type and user\'s specific requirements.',
    features: [
      'Smart Summarization: Paste any YouTube link to generate instant summaries with context-aware understanding of video structure (tips, tutorials, lectures)',
      'Multiple Output Modes: Executive Summary for busy professionals, Study Guide for students, Action Plan for tutorials, Academic Paper with references, Social Media highlights',
      'Context-Aware Formatting: Extracts exactly 5 tips from "5 Tips" videos, creates study notes from lectures, generates actionable checklists from tutorials',
      'Time-Saving Intelligence: Saves hours of watching by delivering key takeaways instantly in the most relevant format for your context',
      'Universal Application: Perfect for researchers, content creators, entrepreneurs, and learners across all industries and use cases'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
    color: '#5b21b6',
    imageHero: '/youtube-summarizer.jpeg',
    imageThumb: '/youtube-summarizer.jpeg'
  },
  {
    id: 12,
    icon: Mail,
    title: 'Gmail AI Auto-Responder',
    subtitle: 'Smart Email Draft Generator',
    category: 'Communication',
    tags: ['Gmail', 'Email', 'Auto-Response', 'Email Automation', 'Productivity'],
    shortDescription: 'An AI-powered assistant that reads every incoming Gmail message, analyzes the sender\'s intent and tone, and generates a ready-to-send draft.',
    fullDescription: 'The user simply reviews the draft and clicks Send—saving hours of email time each week. The system understands sender intent, context, and urgency, then creates professional, polite, or casual drafts based on context with multiple reply variations when needed.',
    features: [
      'Smart Email Reading: Reads every incoming email in Gmail automatically, understanding sender intent, context, and urgency',
      'AI Draft Generation: Creates professional, polite, or casual drafts based on context with proper grammar, clarity, and consistency',
      'Customization Controls: Users can edit and finalize replies before sending with configurable tone (Professional/Friendly/Formal/Casual)',
      'Auto-Inclusions: Automatically includes signatures, disclaimers, or branding as configured by the user',
      'Productivity Enhancement: Speeds up repetitive responses like meeting confirmations and follow-ups, learns from user-approved drafts to improve over time, and provides a one-click send experience'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    color: '#8b5cf6',
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
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
    color: '#a78bfa',
    imageHero: '/gmail auto labeler.jpeg',
    imageThumb: '/gmail auto labeler.jpeg'
  },
  {
    id: 14,
    icon: User,
    title: 'LeadConnect',
    subtitle: 'Transform Engagement into Business Opportunities',
    category: 'Sales',
    tags: ['LinkedIn', 'Lead Generation', 'Sales', 'Social Media', 'Conversion'],
    shortDescription: 'Converts LinkedIn comment interactions into qualified leads by analyzing engagement patterns and initiating meaningful business conversations.',
    fullDescription: 'LeadConnect turns every LinkedIn comment into a potential business opportunity. This agent monitors your LinkedIn posts, analyzes comment engagement, identifies high-value prospects, and automatically initiates personalized outreach. It transforms passive social media engagement into active lead generation by connecting with prospects who show genuine interest in your content.',
    features: [
      'Comment Monitoring: Tracks comments on your LinkedIn posts to identify potential leads',
      'Lead Identification: Analyzes comment engagement to find users interested in your content',
      'Lead Conversion: Transforms comment interactions into qualified business opportunities'
    ],
    gradient: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
    color: '#9333ea',
    imageHero: '/linkdin-commnts to leads.jpeg',
    imageThumb: '/linkdin-commnts to leads.jpeg'
  },
  {
    id: 15,
    icon: FileText,
    title: 'VideoScript',
    subtitle: 'AI-Powered Video Description Generation',
    category: 'Marketing',
    tags: ['YouTube', 'SEO', 'Content Writing', 'Video', 'Automation'],
    shortDescription: 'Automatically generates comprehensive, SEO-optimized descriptions for YouTube videos based on content analysis and trending keywords.',
    fullDescription: 'VideoScript eliminates the tedious task of writing YouTube descriptions. This agent analyzes your video content, extracts key topics, identifies relevant trending keywords, and generates compelling, SEO-optimized descriptions. It includes timestamps, relevant hashtags, call-to-actions, and links while maintaining your brand voice and maximizing discoverability.',
    features: [
      'Auto Description Generation: Automatically creates YouTube video descriptions',
      'Content Analysis: Analyzes video content to generate relevant descriptions',
      'SEO Optimization: Includes keywords and tags to improve video discoverability'
    ],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
    color: '#4c1d95',
    imageHero: '/youtub auto description writer.jpeg',
    imageThumb: '/youtub auto description writer.jpeg'
  },
  {
    id: 16,
    icon: BarChart3,
    title: 'DataViz',
    subtitle: 'Natural Language Google Sheets Interface',
    category: 'Analytics',
    tags: ['Google Sheets', 'NLP', 'Data Query', 'Spreadsheets', 'Natural Language'],
    shortDescription: 'Talk to your Google Sheets data using natural language. Ask questions, generate insights, and manipulate data through conversational AI.',
    fullDescription: 'DataViz transforms your Google Sheets into an intelligent data assistant. Simply ask questions in plain English like "Show me sales trends for last quarter" or "What are the top 5 performing products?" The agent understands your data structure, interprets your requests, and provides instant answers with visualizations and insights. No complex formulas or coding required.',
    features: [
      'Natural Language Queries: Ask questions about your Google Sheets data in plain English',
      'Data Interpretation: Understands your spreadsheet structure and data types',
      'Query Execution: Performs calculations and analysis based on your questions'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    color: '#7c3aed',
    imageHero: '/data-query.jpeg',
    imageThumb: '/data-query.jpeg'
  },
  {
    id: 17,
    icon: FileText,
    title: 'InvoiceBot',
    subtitle: 'Intelligent Document Processing & Data Extraction',
    category: 'Document Processing',
    tags: ['Invoices', 'OCR', 'Transcription', 'Document Processing', 'Finance'],
    shortDescription: 'Upload invoices and automatically extract, transcribe, and organize all relevant data into structured formats for easy processing.',
    fullDescription: 'InvoiceBot streamlines your invoice processing workflow with intelligent document capture. Simply upload invoice images or PDFs, and the agent automatically extracts all relevant information including vendor details, line items, amounts, dates, and payment terms. It converts unstructured invoice data into organized, searchable formats while maintaining accuracy and reducing manual data entry errors.',
    features: [
      'Invoice Upload: Upload invoice images and PDFs for processing',
      'OCR Transcription: Automatically reads and transcribes text from invoices',
      'Data Extraction: Extracts key information like amounts, dates, and vendor details'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #c084fc 100%)',
    color: '#6d28d9',
    imageHero: '/invoice-capture.jpeg',
    imageThumb: '/invoice-capture.jpeg'
  },
  {
    id: 18,
    icon: FileText,
    title: 'ProposalCraft',
    subtitle: 'AI-Powered Freelance Proposal Generator',
    category: 'Business Development',
    tags: ['Proposals', 'Upwork', 'Cover Letters', 'Business Writing', 'Freelancing'],
    shortDescription: 'Generate compelling proposals, cover letters, and visual diagrams for Upwork projects to increase your win rate and land more clients.',
    fullDescription: 'ProposalCraft masters the art of winning Upwork proposals with AI-powered assistance. This agent analyzes project requirements, crafts personalized proposals that highlight your expertise, generates professional cover letters, and even creates Mermaid diagrams to visualize project approaches. It adapts to different project types and client preferences to maximize your proposal success rate.',
    features: [
      'Proposal Generation: Creates compelling proposals for Upwork projects',
      'Cover Letter Creation: Generates professional cover letters',
      'Mermaid Diagrams: Creates visual diagrams within the app to illustrate project approaches'
    ],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #5b21b6 100%)',
    color: '#a78bfa',
    imageHero: '/proposal-craft.jpeg',
    imageThumb: '/proposal-craft.jpeg'
  },
  {
    id: 19,
    icon: FileText,
    title: 'LegalGuard',
    subtitle: 'Intelligent Contract Review & Analysis',
    category: 'Legal & Compliance',
    tags: ['Contracts', 'Legal Analysis', 'Compliance', 'Risk Assessment', 'Legal Review'],
    shortDescription: 'Review contracts, identify potential issues, and provide legal insights using AI-powered analysis to protect your business interests.',
    fullDescription: 'LegalGuard helps you navigate complex legal documents with confidence. This agent reviews contracts, terms of service, and legal agreements to identify potential risks, highlight important clauses, and provide plain-language explanations of legal terms. It helps you understand what you\'re signing while flagging potential issues that may require professional legal review.',
    features: [
      'Contract Review: Analyzes contracts and legal documents for potential issues',
      'Issue Identification: Flags problematic clauses and potential risks',
      'Legal Analysis: Provides insights on contract terms and implications'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #a78bfa 100%)',
    color: '#5b21b6',
    imageHero: '/legal-agent.jpeg',
    imageThumb: '/legal-agent.jpeg'
  },
  {
    id: 20,
    icon: DollarSign,
    title: 'ExpenseTracker',
    subtitle: 'Automated Invoice & Revenue Tracking',
    category: 'Finance',
    tags: ['Expenses', 'Invoices', 'Gmail', 'Financial Tracking', 'Automation'],
    shortDescription: 'Automatically tracks invoices and revenue from Gmail, organizing financial documents and maintaining expense records.',
    fullDescription: 'ExpenseTracker monitors your Gmail for invoices and revenue-related emails, automatically extracting and organizing financial information. It categorizes expenses, tracks revenue streams, and maintains detailed financial records without manual data entry.',
    features: [
      'Gmail Integration: Automatically detects and processes invoices and revenue emails',
      'Expense Categorization: Organizes expenses by type, vendor, and purpose',
      'Revenue Tracking: Monitors income streams and financial transactions',
      'Document Organization: Stores and categorizes financial documents',
      'Financial Reporting: Generates expense and revenue summaries'
    ],
    gradient: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
    color: '#9333ea',
    imageHero: '/expense tracker.jpeg',
    imageThumb: '/expense tracker.jpeg'
  },
  {
    id: 21,
    icon: Activity,
    title: 'FitGenie',
    subtitle: 'Personal Fitness & Diet Coach',
    category: 'Health',
    tags: ['Fitness', 'Diet', 'Health', 'Workout', 'Nutrition'],
    shortDescription: 'AI-powered fitness coach that creates personalized diet plans and exercise routines based on your goals and preferences.',
    fullDescription: 'FitGenie is your personal AI fitness coach that designs customized workout plans and nutrition strategies. It tracks your progress, adjusts recommendations based on your performance, and provides motivation to help you achieve your health and fitness goals.',
    features: [
      'Personalized Workouts: Creates custom exercise routines based on your fitness level and goals',
      'Diet Planning: Designs meal plans and nutritional guidance tailored to your preferences',
      'Progress Tracking: Monitors your fitness journey and adjusts recommendations accordingly',
      'Goal Setting: Helps establish realistic fitness targets and milestones',
      'Motivation & Support: Provides encouragement and tips to keep you on track'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    color: '#7c3aed',
    imageHero: '/fitness agent.jpeg',
    imageThumb: '/fitness agent.jpeg'
  },
  {
    id: 22,
    icon: MapPin,
    title: 'TravelMate',
    subtitle: 'AI Travel Planning Assistant',
    category: 'Travel',
    tags: ['Travel', 'Flights', 'Hotels', 'Itinerary', 'Planning'],
    shortDescription: 'Plans complete travel itineraries including flights, hotels, and activities based on your preferences and budget.',
    fullDescription: 'TravelMate handles all aspects of travel planning from flight bookings to hotel reservations and itinerary creation. It researches destinations, compares prices, and creates detailed travel plans that match your preferences, budget, and schedule.',
    features: [
      'Flight Booking: Finds and compares flight options with best prices and routes',
      'Hotel Reservations: Recommends and books accommodations based on your preferences',
      'Itinerary Creation: Plans daily activities, attractions, and dining recommendations',
      'Budget Planning: Helps manage travel expenses and find cost-effective options',
      'Travel Research: Provides destination information, weather, and local insights'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: '#8b5cf6',
    imageHero: '/travel agent.jpeg',
    imageThumb: '/travel agent.jpeg'
  },
  {
    id: 23,
    icon: Search,
    title: 'RedditHound',
    subtitle: 'Reddit Thread Scraper & Q&A Agent',
    category: 'Research',
    tags: ['Reddit', 'Research', 'Community', 'Q&A', 'Thread Analysis'],
    shortDescription: 'Scrapes Reddit threads to answer questions and queries by analyzing community discussions and expert opinions.',
    fullDescription: 'RedditHound searches through Reddit communities to find relevant discussions and expert answers to your questions. It analyzes thread content, upvotes, and user credibility to provide comprehensive answers based on real community insights.',
    features: [
      'Thread Scraping: Searches Reddit for relevant discussions on any topic',
      'Answer Compilation: Aggregates the best responses from multiple threads',
      'Community Insights: Analyzes user opinions and expert recommendations',
      'Credibility Assessment: Evaluates answer quality based on upvotes and user history',
      'Query Processing: Understands complex questions and finds relevant discussions'
    ],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)',
    color: '#4c1d95',
    imageHero: '/reddithound.jpeg',
    imageThumb: '/reddithound.jpeg'
  },
  {
    id: 24,
    icon: Shield,
    title: 'ScamGuard',
    subtitle: 'Website Scam Detection System',
    category: 'Security',
    tags: ['Security', 'Scam Detection', 'Website Analysis', 'Fraud Prevention', 'SSL'],
    shortDescription: 'Analyzes websites to determine if they are scams by checking content, reviews, SSL certificates, and other security parameters.',
    fullDescription: 'ScamGuard performs comprehensive security analysis of websites to identify potential scams and fraudulent sites. It examines SSL certificates, content authenticity, user reviews, domain history, and other security indicators to provide scam risk assessments.',
    features: [
      'SSL Certificate Analysis: Checks website security certificates and encryption',
      'Content Verification: Analyzes website content for authenticity and credibility',
      'Review Analysis: Evaluates user reviews and feedback for scam indicators',
      'Domain History: Investigates domain registration and ownership history',
      'Risk Assessment: Provides scam probability scores and security warnings'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)',
    color: '#6d28d9',
    imageHero: '/isthisascam.jpeg',
    imageThumb: '/isthisascam.jpeg'
  },
  {
    id: 25,
    icon: BookOpen,
    title: 'Alex',
    subtitle: 'Personal Diary & Notes Manager',
    category: 'Personal Assistant',
    tags: ['Notes', 'Diary', 'Password Manager', 'Contacts', 'Organization'],
    shortDescription: 'Keeps your notes, passwords, contacts organized, groups thoughts, and keeps you engaged with your personal information.',
    fullDescription: 'Alex is your personal digital companion that manages all your notes, passwords, contacts, and thoughts. It organizes your information intelligently, provides insights about your patterns, and helps you stay engaged with your personal data through interactive conversations.',
    features: [
      'Note Organization: Stores and categorizes your notes, thoughts, and ideas',
      'Password Management: Securely stores and manages your passwords',
      'Contact Organization: Maintains and organizes your contact information',
      'Thought Grouping: Intelligently groups related thoughts and ideas',
      'Interactive Engagement: Discusses your notes and provides insights'
    ],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    color: '#7C3AED',
    imageHero: '/alex- the diary manager.jpeg',
    imageThumb: '/alex- the diary manager.jpeg'
  },
  {
    id: 26,
    icon: Image,
    title: 'AdCraft',
    subtitle: 'Product to Ad Poster Creator',
    category: 'Marketing',
    tags: ['Ad Creation', 'Visual Design', 'Marketing Materials', 'Product Promotion', 'Creative Design'],
    shortDescription: 'Transforms products into engaging ad posters and marketing materials with compelling visuals and copy.',
    fullDescription: 'AdCraft specializes in converting products into eye-catching ad posters and marketing materials. It creates compelling visuals, writes persuasive copy, and designs professional advertisements that drive engagement and conversions.',
    features: [
      'Visual Design: Creates compelling ad posters and marketing visuals',
      'Copy Writing: Generates persuasive ad copy and marketing messages',
      'Product Showcase: Highlights product features and benefits effectively',
      'Brand Consistency: Maintains brand guidelines across all ad materials',
      'Conversion Optimization: Designs ads focused on driving sales and engagement'
    ],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    color: '#a78bfa',
    imageHero: '/product-to-ad-poster.jpeg',
    imageThumb: '/product-to-ad-poster.jpeg'
  },
  {
    id: 27,
    icon: Camera,
    title: 'StyleLab',
    subtitle: 'Virtual Try-On & Artistic Style Filter',
    category: 'Fashion',
    tags: ['Virtual Try-On', 'Fashion', 'Beauty', 'Image Processing', 'AR Technology'],
    shortDescription: 'Provides virtual try-on experiences and applies artistic style filters to images for fashion and beauty applications.',
    fullDescription: 'StyleLab offers advanced virtual try-on technology and artistic style filters for fashion and beauty applications. It allows users to virtually try on clothes, accessories, and makeup while applying various artistic styles and effects to enhance the experience.',
    features: [
      'Virtual Try-On: Enables virtual fitting of clothes, accessories, and makeup',
      'Style Filters: Applies artistic and creative filters to enhance images',
      'Real-time Processing: Provides instant results for try-on and filter effects',
      'Fashion Recommendations: Suggests styles and combinations based on preferences',
      'Image Enhancement: Improves image quality and applies creative effects'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #c084fc 100%)',
    color: '#5b21b6',
    imageHero: '/lookslab virtual-try-on.jpeg',
    imageThumb: '/lookslab virtual-try-on.jpeg'
  },
  {
    id: 28,
    icon: Palette,
    title: 'ArtFilter',
    subtitle: 'Artistic Style Filter Agent',
    category: 'Creative',
    tags: ['Artistic Filters', 'Image Processing', 'Creative Design', 'Style Transfer', 'Visual Effects'],
    shortDescription: 'Applies various artistic styles and filters to images, transforming them into different artistic interpretations.',
    fullDescription: 'ArtFilter specializes in applying artistic styles and creative filters to images. It can transform photos into various artistic interpretations including paintings, sketches, and other creative styles while maintaining image quality and artistic integrity.',
    features: [
      'Style Transformation: Applies various artistic styles to images',
      'Creative Filters: Offers multiple filter options for artistic effects',
      'Quality Preservation: Maintains image quality during style application',
      'Batch Processing: Processes multiple images with consistent styling',
      'Custom Styles: Allows creation of custom artistic filters'
    ],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)',
    color: '#8B5CF6',
    imageHero: '/looks-lab-artistic-style-filter.jpeg',
    imageThumb: '/looks-lab-artistic-style-filter.jpeg'
  },
  {
    id: 29,
    icon: Pill,
    title: 'PharmaStock',
    subtitle: 'Pharmacy Stock Keeper & Reporter',
    category: 'Healthcare',
    tags: ['Pharmacy', 'Inventory Management', 'Healthcare', 'Stock Tracking', 'Medication Management'],
    shortDescription: 'Manages pharmacy inventory, tracks stock levels, and generates reports on medication availability and usage.',
    fullDescription: 'PharmaStock automates pharmacy inventory management by tracking stock levels, monitoring medication usage, and generating comprehensive reports. It helps pharmacies maintain optimal inventory levels and ensures medication availability.',
    features: [
      'Inventory Tracking: Monitors stock levels for all medications and supplies',
      'Usage Analytics: Tracks medication usage patterns and demand',
      'Stock Alerts: Notifies when inventory levels are low or expired',
      'Report Generation: Creates detailed inventory and usage reports',
      'Expiry Management: Tracks medication expiration dates and manages rotation'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
    color: '#7c3aed',
    imageHero: '/pharmacy stock keeper and reporter.jpeg',
    imageThumb: '/pharmacy stock keeper and reporter.jpeg'
  },
  {
    id: 30,
    icon: Mail,
    title: 'FollowUpGenie',
    subtitle: 'Meeting Follow-Up Email Generator',
    category: 'Communication',
    tags: ['Email', 'Meeting Follow-up', 'Communication', 'Automation', 'Productivity'],
    shortDescription: 'Automatically generates and sends follow-up emails after meetings to all concerned parties.',
    fullDescription: 'FollowUpGenie streamlines post-meeting communication by automatically generating personalized follow-up emails. It creates meeting summaries, action items, and sends them to all relevant participants, ensuring nothing falls through the cracks.',
    features: [
      'Meeting Summaries: Creates comprehensive summaries of meeting discussions',
      'Action Items: Identifies and lists tasks and responsibilities from meetings',
      'Automatic Distribution: Sends follow-up emails to all meeting participants',
      'Personalization: Customizes emails based on each participant\'s role and involvement',
      'Scheduling Integration: Syncs with calendar systems for accurate participant lists'
    ],
    gradient: 'linear-gradient(135deg, #9333ea 0%, #a78bfa 100%)',
    color: '#9333ea',
    imageHero: '/followup-genie.jpeg',
    imageThumb: '/followup-genie.jpeg'
  },
  {
    id: 31,
    icon: TrendingUp,
    title: 'CryptoAlert',
    subtitle: 'Cryptocurrency Updates & Graph System',
    category: 'Finance',
    tags: ['Cryptocurrency', 'Trading', 'Market Updates', 'Graphs', 'Alerts'],
    shortDescription: 'Sends crypto market updates via email with graphs and analysis to keep you informed of market movements.',
    fullDescription: 'CryptoAlert provides real-time cryptocurrency market updates delivered directly to your email. It includes detailed graphs, price analysis, and market insights to help you stay informed about your crypto investments and market trends.',
    features: [
      'Market Updates: Sends regular cryptocurrency price and market updates',
      'Graph Generation: Creates visual charts and graphs for market analysis',
      'Price Alerts: Notifies you of significant price movements and trends',
      'Portfolio Tracking: Monitors your crypto investments and performance',
      'Market Analysis: Provides insights and analysis on market conditions'
    ],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    color: '#4c1d95',
    imageHero: '/crypto-alert.jpeg',
    imageThumb: '/crypto-alert.jpeg'
  },
  {
    id: 32,
    icon: Inbox,
    title: 'OutlookMaster',
    subtitle: 'Your Personal Outlook Manager',
    category: 'Communication',
    tags: ['Outlook', 'Email Management', 'Productivity', 'WhatsApp Alerts', 'Smart Replies', 'Task Automation'],
    shortDescription: 'Enhances your Outlook experience by intelligently organizing emails and boosting productivity with automation and real-time alerts.',
    fullDescription: 'OutlookMaster enhances your Outlook experience by intelligently organizing emails and boosting your productivity. It automates routine tasks, ensures you never miss an important message, and helps you stay in control of your communications and schedule.',
    features: [
      'Email Organization: Automatically sorts, categorizes, and prioritizes incoming emails for you',
      'Task Integration: Converts emails into actionable tasks with follow-up reminders',
      'Productivity Optimization: Reduces manual work by automating replies and updates',
      'WhatsApp Reminders: Sends real-time WhatsApp alerts for important emails or calendar events so you never miss a deadline',
      'Smart Reply Drafting: Suggests and drafts professional, context aware replies to your Outlook emails ready to send in one click'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%)',
    color: '#6d28d9',
    imageHero: '/your-outlook-manager.jpeg',
    imageThumb: '/your-outlook-manager.jpeg'
  },
  {
    id: 33,
    icon: Twitter,
    title: 'TweetSentiment',
    subtitle: 'Twitter Sentiment Analysis Agent',
    category: 'Analytics',
    tags: ['Twitter', 'Sentiment Analysis', 'Social Media Analytics', 'Trend Analysis', 'Public Opinion'],
    shortDescription: 'Analyzes Twitter tweets to determine sentiment, trends, and public opinion on various topics.',
    fullDescription: 'TweetSentiment monitors Twitter conversations to analyze sentiment, track trends, and gauge public opinion. It provides insights into how people feel about brands, products, events, or any topic of interest through comprehensive sentiment analysis.',
    features: [
      'Sentiment Analysis: Determines positive, negative, or neutral sentiment in tweets',
      'Trend Tracking: Identifies trending topics and hashtags',
      'Public Opinion: Gauges public sentiment on brands, products, or events',
      'Real-time Monitoring: Tracks sentiment changes over time',
      'Report Generation: Creates detailed sentiment reports and analytics'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #5b21b6 100%)',
    color: '#8b5cf6',
    imageHero: '/twitter-sentiment-analysis.jpeg',
    imageThumb: '/twitter-sentiment-analysis.jpeg'
  },
  {
    id: 34,
    icon: TrendingUp,
    title: 'LeadAnalyst',
    subtitle: 'Lead Generation & Business Analyst',
    category: 'Sales',
    tags: ['Lead Generation', 'Business Analysis', 'Sales Intelligence', 'Market Research', 'Prospect Research'],
    shortDescription: 'Generates qualified leads and provides business analysis to identify opportunities and market trends.',
    fullDescription: 'LeadAnalyst combines lead generation with business analysis to identify potential customers and market opportunities. It researches prospects, analyzes market trends, and provides actionable insights to drive business growth and sales success.',
    features: [
      'Lead Generation: Identifies and qualifies potential customers',
      'Market Analysis: Analyzes market trends and competitive landscape',
      'Prospect Research: Gathers detailed information about potential leads',
      'Opportunity Identification: Finds new business opportunities and markets',
      'Sales Intelligence: Provides insights to improve sales strategies'
    ],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    color: '#a78bfa',
    imageHero: '/business analyst-lead-gen agent.jpeg',
    imageThumb: '/business analyst-lead-gen agent.jpeg'
  },
  {
    id: 35,
    icon: Newspaper,
    title: 'NewsletterBot',
    subtitle: 'AI Newsletter Creator & Distributor',
    category: 'Marketing',
    tags: ['Newsletter', 'Email Marketing', 'Content Curation', 'Automation', 'Distribution'],
    shortDescription: 'Creates and distributes personalized newsletters with curated content and automated delivery.',
    fullDescription: 'NewsletterBot automates newsletter creation and distribution by curating relevant content, personalizing messages, and managing subscriber lists. It creates engaging newsletters that keep your audience informed and engaged with your brand.',
    features: [
      'Content Curation: Gathers and organizes relevant content for newsletters',
      'Personalization: Customizes newsletters based on subscriber preferences',
      'Automated Distribution: Schedules and sends newsletters automatically',
      'Subscriber Management: Manages mailing lists and subscriber preferences',
      'Performance Tracking: Monitors open rates, clicks, and engagement metrics'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    color: '#7c3aed',
    imageHero: '/newsletter agent.jpeg',
    imageThumb: '/newsletter agent.jpeg'
  },
  {
    id: 36,
    icon: Search,
    title: 'DeepScholar',
    subtitle: 'Comprehensive Research & Academic Writing Agent',
    category: 'Research',
    tags: ['Research', 'Academic Writing', 'Citations', 'Reports', 'Deep Analysis'],
    shortDescription: 'Conducts deep research on any topic and writes comprehensive 5-chapter reports with accurate citations and academic standards.',
    fullDescription: 'DeepScholar is an advanced research agent that performs thorough investigations on complex topics, synthesizes information from multiple sources, and creates detailed academic-style reports. It writes comprehensive 5-chapter documents with proper citations, references, and scholarly analysis.',
    features: [
      'Deep Topic Research: Conducts comprehensive research using multiple authoritative sources',
      '5-Chapter Report Structure: Creates well-organized reports with introduction, methodology, analysis, findings, and conclusions',
      'Accurate Citations: Includes proper citations and references in academic format',
      'Source Verification: Validates information from credible sources and academic databases',
      'Scholarly Analysis: Provides in-depth analysis with critical thinking and evidence-based conclusions'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #8b5cf6 100%)',
    color: '#5b21b6',
    imageHero: '/deep-researcher.jpg',
    imageThumb: '/deep-researcher.jpg'
  },
  {
    id: 37,
    icon: Search,
    title: 'NewsTone',
    subtitle: 'Company News Scraper & Meeting Tone Analyzer',
    category: 'Research',
    tags: ['News Scraping', 'Meeting Preparation', 'Company Analysis', 'Tone Analysis', 'Research'],
    shortDescription: 'Scrapes recent news about companies and determines the appropriate meeting tone based on current events and sentiment.',
    fullDescription: 'NewsTone monitors recent news and developments about companies to help you prepare for meetings with the right tone and context. It analyzes news sentiment and provides recommendations on how to approach conversations based on current company situation.',
    features: [
      'News Scraping: Gathers recent news and updates about target companies',
      'Sentiment Analysis: Analyzes news tone and company situation',
      'Meeting Tone Recommendation: Suggests appropriate meeting approach based on current events'
    ],
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: '#6366F1',
    imageHero: '/scrap recent news about company and dcide meeting tone.jpeg',
    imageThumb: '/scrap recent news about company and dcide meeting tone.jpeg'
  },
  {
    id: 38,
    icon: AlertTriangle,
    title: 'SiteGuard',
    subtitle: 'URL Monitoring & Downtime Alert System',
    category: 'Security',
    tags: ['URL Monitoring', 'Downtime Alerts', 'Website Health', 'Uptime Tracking', 'Monitoring'],
    shortDescription: 'Automatically monitors URLs for downtime and sends alerts when websites go offline or experience issues.',
    fullDescription: 'SiteGuard continuously monitors website URLs and sends immediate alerts when sites go down or experience performance issues. It helps ensure your websites stay online and provides early warning of potential problems.',
    features: [
      'URL Monitoring: Continuously checks website availability and response times',
      'Downtime Alerts: Sends immediate notifications when sites go offline',
      'Performance Tracking: Monitors response times and identifies performance issues'
    ],
    gradient: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)',
    color: '#9333ea',
    imageHero: '/auto monitoring of url and downtime alert.jpg',
    imageThumb: '/auto monitoring of url and downtime alert.jpg'
  },
  {
    id: 39,
    icon: FileText,
    title: 'ResumeScreener',
    subtitle: 'AI Resume Screening & Candidate Evaluation',
    category: 'Human Resources',
    tags: ['Resume Screening', 'HR', 'Candidate Evaluation', 'Recruitment', 'Automation', 'Google Drive', 'AI Analysis'],
    shortDescription: 'Transforms recruitment by instantly analyzing resumes, identifying qualified candidates, and providing evaluation scores for faster, smarter hiring decisions.',
    fullDescription: 'ResumeScreener transforms recruitment by instantly analyzing resumes, identifying qualified candidates, and providing evaluation scores to help hiring teams make faster, smarter decisions. It eliminates manual resume screening, ensuring no top talent slips through the cracks.',
    features: [
      'Automatic Trigger: Activates the moment a new resume or CV is received via email',
      'Resume Analysis: Reads and analyzes resume content, qualifications, and career history',
      'Skill Matching: Compares candidate skills and experience against specific job requirements',
      'Candidate Scoring: Generates objective evaluation scores with clear recommendations',
      'Google Drive Integration: Automatically organizes and stores candidate resumes in a structured Google Drive folder for easy access',
      'Candidate Database: Builds and maintains a searchable record of all applicants for future hiring needs'
    ],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #a78bfa 100%)',
    color: '#4c1d95',
    imageHero: '/resume screener.jpeg',
    imageThumb: '/resume screener.jpeg'
  },
  {
    id: 40,
    icon: FileText,
    title: 'ResumeBuilder',
    subtitle: 'AI-Powered Resume Creation Assistant',
    category: 'Human Resources',
    tags: ['Resume Building', 'HR', 'Job Applications', 'Career Development', 'Document Creation'],
    shortDescription: 'Creates professional resumes tailored to specific job applications and career goals.',
    fullDescription: 'ResumeBuilder helps create compelling resumes by organizing experience, skills, and achievements into professional formats optimized for specific job applications.',
    features: [
      'Resume Creation: Builds professional resumes from provided information',
      'Job Targeting: Tailors resumes to specific job applications',
      'Format Optimization: Creates resumes in professional formats'
    ],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)',
    color: '#a78bfa',
    imageHero: '/resume builder.jpeg',
    imageThumb: '/resume builder.jpeg'
  },
  {
    id: 41,
    icon: TrendingUp,
    title: 'TubeStrategist',
    subtitle: 'Personalized YouTube Growth Strategist',
    category: 'Marketing',
    tags: ['YouTube Strategy', 'Content Strategy', 'Growth', 'Analytics', 'Video Marketing'],
    shortDescription: 'Creates personalized YouTube strategies for content creators to grow their channels and increase engagement.',
    fullDescription: 'TubeStrategist analyzes your YouTube channel and creates customized strategies for content creation, optimization, and growth based on your niche and audience.',
    features: [
      'Channel Analysis: Evaluates current YouTube channel performance',
      'Strategy Development: Creates personalized growth strategies',
      'Content Recommendations: Suggests optimal content types and topics'
    ],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
    color: '#6d28d9',
    imageHero: '/prsonalized yt strategist.jpeg',
    imageThumb: '/prsonalized yt strategist.jpeg'
  },
  {
    id: 42,
    icon: Search,
    title: 'WebAnalyzer',
    subtitle: 'AI Website Analyzer & Personal Recommendations',
    category: 'Analytics',
    tags: ['Website Analysis', 'SEO', 'Performance Analysis', 'Recommendations', 'Web Optimization'],
    shortDescription: 'Analyzes websites and provides personalized recommendations for improvement and optimization.',
    fullDescription: 'WebAnalyzer examines website performance, SEO, design, and user experience to provide actionable recommendations for improvement and optimization.',
    features: [
      'Website Analysis: Examines website performance, SEO, and user experience',
      'Performance Metrics: Analyzes loading speed, mobile responsiveness, and accessibility',
      'Personalized Recommendations: Provides specific suggestions for website improvement'
    ],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    color: '#8B5CF6',
    imageHero: '/ai websit analyzer and personalized recommnedation.jpeg',
    imageThumb: '/ai websit analyzer and personalized recommnedation.jpeg'
  },
  {
    id: 43,
    icon: RefreshCw,
    title: 'BackupBot',
    subtitle: 'n8n Workflow Backup & Recovery Agent',
    category: 'Automation',
    tags: ['n8n', 'Backup', 'Automation', 'Workflow Management', 'Data Recovery'],
    shortDescription: 'Automatically backs up n8n workflows and provides recovery solutions for automation processes.',
    fullDescription: 'BackupBot ensures your n8n workflows are safely backed up and can be quickly restored in case of data loss or system failures.',
    features: [
      'Workflow Backup: Automatically backs up n8n workflows and configurations',
      'Recovery Solutions: Provides quick restoration of backed-up workflows',
      'Automated Scheduling: Schedules regular backups without manual intervention'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)',
    color: '#8b5cf6',
    imageHero: '/n8n backup agent.jpeg',
    imageThumb: '/n8n backup agent.jpeg'
  },
  {
    id: 44,
    icon: User,
    title: 'Fritz',
    subtitle: 'Intelligent Interview Agent',
    category: 'Human Resources',
    tags: ['Interview', 'HR', 'Candidate Assessment', 'Recruitment', 'AI Interview'],
    shortDescription: 'Conducts AI-powered interviews to assess candidates and provide evaluation insights.',
    fullDescription: 'Fritz is an intelligent interview agent that conducts structured interviews with candidates, asks relevant questions, and provides comprehensive evaluation reports.',
    features: [
      'Interview Conduct: Performs structured interviews with candidates',
      'Question Generation: Asks relevant questions based on job requirements',
      'Candidate Assessment: Evaluates responses and provides scoring'
    ],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
    color: '#7c3aed',
    imageHero: '/interview agent fritz.jpeg',
    imageThumb: '/interview agent fritz.jpeg'
  },
  {
    id: 45,
    icon: AlertTriangle,
    title: 'FatigueAgent',
    subtitle: 'Ad Performance Monitor & Fatigue Detector',
    category: 'Analytics',
    tags: ['Ad Monitoring', 'Performance Analysis', 'Fatigue Detection', 'Campaign Optimization', 'Real-time Alerts'],
    shortDescription: 'Monitors ad campaigns 24/7 to detect burnout, overspending, and performance drops before they impact ROI.',
    fullDescription: 'FatigueAgent is your always-on watchdog for ad health and performance. It monitors campaigns across Meta Ads, Google Ads, and Film & Media, detecting burnout and performance issues with instant alerts and automated optimizations.',
    features: [
      'Real-time Monitoring: Monitors campaigns across Meta Ads, Google Ads, and Film & Media',
      'AI-powered Fatigue Detection: Detects burnout and performance prediction',
      'Instant Alerts: Provides human-readable diagnosis with immediate notifications',
      'Automated Optimization: Implements budget reallocation and campaign adjustments',
      'Predictive Analytics: Prevents future issues with advanced forecasting'
    ],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #9333ea 100%)',
    color: '#5b21b6',
    imageHero: '/ad fatigu agent.jpg',
    imageThumb: '/ad fatigu agent.jpg'
  },
  {
    id: 46,
    icon: TrendingUp,
    title: 'ChurnPredictor',
    subtitle: 'Customer Churn Propensity Visualizer',
    category: 'Analytics',
    tags: ['Churn Prediction', 'Customer Retention', 'Predictive Analytics', 'Retention Campaigns', 'Customer Health'],
    shortDescription: 'Identifies at-risk customers and automates retention strategies to prevent churn before it happens.',
    fullDescription: 'ChurnPredictor uses advanced predictive models to identify customers at risk of leaving. It automatically triggers personalized retention campaigns and provides real-time insights into customer health to maximize lifetime value.',
    features: [
      'Advanced Churn Prediction: Uses machine learning models to predict customer churn',
      'Real-time Customer Analysis: Analyzes behavior and provides health scoring',
      'Automated Retention Campaigns: Orchestrates personalized retention strategies',
      'Personalized Incentives: Manages loyalty programs and targeted offers',
      'Continuous Learning: Improves predictive accuracy over time'
    ],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    color: '#7C3AED',
    imageHero: '/ad churn agent.jpeg',
    imageThumb: '/ad churn agent.jpeg'
  }
];

export default agents;


