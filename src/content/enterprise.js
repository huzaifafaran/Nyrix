/**
 * Nyrix Enterprise Content Repository
 * Factual data grounded in existing repository sources, verified public records, and user-confirmed stakeholder details.
 * Adheres to Architectural Decision D04: No fabricated individuals, metrics, or logos.
 */

export const bookingUrl = 'https://calendar.app.google/mhjiQ9t9g5Ge322s6';
export const contactEmail = 'hello@nyrix.co';
export const linkedInUrl = 'https://www.linkedin.com/company/nyrixco/';
export const podcastChannelUrl = 'https://www.youtube.com/@NyrixAI';
export const youtubeChannelUrl = podcastChannelUrl;

export const companyInfo = {
  name: 'Nyrix',
  tagline: 'Enterprise Decision Sciences & Agentic Systems',
  mission: 'Advancing enterprise operational intelligence by combining systems engineering with agentic decision-making.',
  summary: 'Nyrix designs, builds, and deploys bespoke operational intelligence engines, production-grade AI agents, and enterprise telemetry systems. We help organizations transition from reactive dashboards to proactive, automated decision workflows.',
  disciplines: [
    {
      title: 'Agentic Decision Systems',
      description: 'Autonomous workflows that analyze, triage, and execute complex operational tasks with human-in-the-loop oversight.'
    },
    {
      title: 'Predictive Decision Sciences',
      description: 'Statistical validation, churn prevention, and machine learning models trained on business data to forecast high-stakes outcomes.'
    },
    {
      title: 'Industrial & Regulated Telemetry',
      description: 'High-reliability, sub-second telemetry and monitoring systems compliant with rigorous industry regulations including ISO and GMP.'
    },
    {
      title: 'Production Full-Stack AI',
      description: 'End-to-end delivery spanning LLM orchestration, vector databases, custom microservices, and responsive client interfaces.'
    }
  ]
};

// User-confirmed core team members (no invented bios or stock photos)
export const team = [
  {
    name: 'Sarim bin Tahir',
    role: 'Co-founder & Chief Executive Officer',
    focus: 'Executive Leadership, Strategic Operations & Enterprise Growth',
    bio: 'Co-founder and CEO of Nyrix, leading strategic operations, enterprise relationships, and applied AI initiatives.',
    profileUrl: 'https://www.linkedin.com/in/sarimsyed',
    initials: 'ST'
  },
  {
    name: 'Huzaifa Faran',
    role: 'Co-founder & Solutions Architect',
    focus: 'Enterprise Systems Architecture, Full-Stack AI & Industrial Telemetry',
    bio: 'Co-founder and Solutions Architect at Nyrix. Host of The Next Question podcast, focusing on enterprise architecture and applied AI systems.',
    profileUrl: 'https://pk.linkedin.com/in/huzaifa-faran',
    initials: 'HF'
  },
  {
    name: 'M. Ehtesham ul Hassan Malik',
    role: 'Lead Machine Learning Engineer',
    focus: 'Predictive Modeling, Automated ML Pipelines & Agentic Workflows',
    bio: 'Lead Machine Learning Engineer at Nyrix and co-host of early TNQ conversations, working in machine learning engineering and market-ready MVP development.',
    profileUrl: 'https://www.linkedin.com/in/m-ehtesham-ul-hassan-malik',
    photo: 'https://ehtesham-malik-portfolio.vercel.app/static/media/profile.f282b647ec7d32f540dc.jpeg',
    initials: 'EM'
  }
];

export const teamMembers = team;

// User-confirmed advisory board members
export const advisors = [
  {
    name: 'Shams ul Islam',
    role: 'Advisory Board Member',
    domain: 'Enterprise Technology & Strategic Governance',
    bio: 'Advisory board member providing counsel on enterprise technology and strategic governance.',
    initials: 'SI'
  },
  {
    name: 'Mashhoodurrehman',
    role: 'Advisory Board Member',
    domain: 'Technical Leadership & Systems Architecture',
    bio: 'Advisory board member providing technical guidance on architecture and systems engineering.',
    initials: 'MR'
  }
];

// User-confirmed podcast series details (The Next Question / TNQ)
export const podcastSeries = {
  title: 'The Next Question (TNQ)',
  description: 'Conversations with researchers and practitioners about AI research, engineering decisions, and the practical questions emerging technology raises. Produced by Nyrix AI; hosted by Huzaifa Faran.',
  channelUrl: podcastChannelUrl,
  playlistUrl: 'https://www.youtube.com/playlist?list=PLaA1vw1Wt2PA',
  host: 'Huzaifa Faran',
  producer: 'Nyrix AI'
};

// Verified public episodes from YouTube metadata and official announcements
export const episodes = [
  {
    id: 'e01',
    episode: '01',
    title: 'Dr. Muhammad Yaseen Khan: AI Meets Linguistics',
    topic: 'AI Meets Linguistics',
    guest: 'Dr. Muhammad Yaseen Khan',
    url: 'https://www.youtube.com/watch?v=8qhTF7WyKdI',
    duration: '49:42',
    thumbnail: 'https://i.ytimg.com/vi/8qhTF7WyKdI/maxresdefault.jpg',
    artwork: 'https://i.ytimg.com/vi/8qhTF7WyKdI/maxresdefault.jpg',
    status: 'released',
    publishedAt: '2026-08-31',
    description: 'Urdu, Roman Urdu and cultural context expose the challenges of language understanding, including sarcasm, emotional meaning and limited training data.',
    isUpcoming: false
  },
  {
    id: 'e02',
    episode: '02',
    title: 'Ms Sumaiyah Zahid: Quantum AI',
    topic: 'Quantum AI',
    guest: 'Ms Sumaiyah Zahid',
    url: 'https://www.youtube.com/watch?v=V7bxqYvpbEE',
    duration: '38:23',
    thumbnail: 'https://i.ytimg.com/vi/V7bxqYvpbEE/maxresdefault.jpg',
    artwork: 'https://i.ytimg.com/vi/V7bxqYvpbEE/maxresdefault.jpg',
    status: 'released',
    publishedAt: '2026-09-06',
    description: 'Quantum machine learning, data encoding and comparisons with classical methods frame a discussion of when quantum approaches may provide practical value.',
    isUpcoming: false
  },
  {
    id: 'e03',
    episode: '03',
    title: 'Prof. Dr. Najeed Ahmed Khan: Computer Vision',
    topic: 'Computer Vision',
    guest: 'Prof. Dr. Najeed Ahmed Khan',
    url: 'https://www.youtube.com/watch?v=YolIb0eBbNE',
    duration: '53:08',
    thumbnail: 'https://i.ytimg.com/vi/YolIb0eBbNE/maxresdefault.jpg',
    artwork: 'https://i.ytimg.com/vi/YolIb0eBbNE/maxresdefault.jpg',
    status: 'released',
    publishedAt: '2026-09-14',
    description: 'Object detection and multimodal AI meet real deployment constraints, including local data, bias and the gap between accuracy scores and dependable operation.',
    isUpcoming: false
  },
  {
    id: 'e04',
    episode: '04',
    title: 'How Does AI Learn to Optimize? Evolutionary Algorithms Explained',
    topic: 'Evolutionary Algorithms & Optimization',
    guest: 'Dr. Usman Amjad',
    url: 'https://www.youtube.com/watch?v=hvQRJaG7l-U',
    duration: '46:01',
    thumbnail: 'https://i.ytimg.com/vi/hvQRJaG7l-U/maxresdefault.jpg',
    artwork: 'https://i.ytimg.com/vi/hvQRJaG7l-U/maxresdefault.jpg',
    status: 'upcoming',
    premieresAt: '2026-10-17T15:00:00Z',
    premiereLabel: 'Premieres 17 October 2026 at 8:00 pm PKT',
    description: 'Evolutionary algorithms and optimization explore how AI searches large solution spaces while balancing solution quality, computing effort and time.',
    isUpcoming: true
  }
];

export const podcastEpisodes = episodes;

export const services = [
  {
    id: 'ai-mvp-development',
    title: 'AI MVP Development',
    tagline: 'Concept to functional product in 14 days',
    description: 'We build and launch production-ready AI products at high velocity, enabling enterprise teams to validate hypotheses and scale with reliable architecture.',
    href: '/ai-mvp-development',
    timeframe: '14 Days Delivery',
    focusAreas: ['Full-stack AI integration', 'LLM orchestration', 'Production-ready code', 'Cloud deployment support']
  },
  {
    id: 'ai-enablement-advisory',
    title: 'AI Enablement & Advisory',
    tagline: 'Strategic architecture for the AI-first enterprise',
    description: 'Navigate complex AI technology choices with senior architectural guidance. We identify high-impact automation opportunities while mitigating integration and data risks.',
    href: '/ai-enablement-advisory',
    timeframe: 'Strategic Partnership',
    focusAreas: ['Opportunity assessment', 'Technical risk mitigation', 'Architecture roadmapping', 'Team enablement']
  },
  {
    id: 'business-transformation',
    title: 'Business Transformation',
    tagline: 'Modernizing legacy operations for autonomous scale',
    description: 'Deep integration of intelligent workflows directly into the operational fabric of your organization, eliminating bottlenecks and unifying fragmented data.',
    href: '/business-transformation',
    timeframe: 'Enterprise Rollout',
    focusAreas: ['Legacy system modernization', 'Workflow automation', 'Data pipeline unification', 'Operational scalability']
  },
  {
    id: 'ai-strategy-governance',
    title: 'AI Strategy & Governance',
    tagline: 'Secure, ethical, and verifiable AI architectures',
    description: 'Robust operational frameworks to manage safety, auditability, model monitoring, and compliance across enterprise AI deployments.',
    href: '/ai-strategy-governance',
    timeframe: 'Continuous Oversight',
    focusAreas: ['Compliance frameworks', 'Audit trails & observability', 'Risk mitigation protocols', 'Performance validation']
  }
];

export const products = [
  {
    slug: 'kinlu',
    name: 'KINLU',
    category: 'Automated ML & Predictive Analytics Engine',
    description: 'Automated data science engine that generates production-ready machine learning models from raw transactional data to forecast churn, lifetime value, and customer behavior.',
    href: '/products/kinlu',
    externalUrl: 'https://kinlu.ai/',
    status: 'live',
    statusLabel: 'Active Product',
    capabilities: [
      'Automated machine learning model generation without dedicated data science overhead',
      'Predictive analytics for customer churn, lifetime value, and purchase intent',
      'Native ingestion pipelines for e-commerce platforms, ad networks, and flat data files',
      'Actionable probabilistic scoring and statistical confidence intervals'
    ]
  },
  {
    slug: 'artifex',
    name: 'ARTIFEX',
    category: 'Commercial Creative & Visual Generation Platform',
    description: 'Studio-grade marketing visual generator that transforms raw product photography into high-resolution, campaign-ready creative assets in minutes.',
    href: '/products/artifex',
    externalUrl: 'http://useartifex.co/',
    status: 'live',
    statusLabel: 'Active Product',
    capabilities: [
      'Rapid campaign poster generation from single product photographs',
      'Product-specific lighting, background, and perspective adaptation',
      'Clean commercial aesthetics without synthetic artifacting or corrupted text',
      'Multi-tenant team infrastructure with creative history and credit management'
    ]
  },
  {
    slug: 'numaya',
    name: 'NUMAYA',
    category: 'Operational Marketing & Social Command Platform',
    description: 'Intelligent marketing platform powered by OMNIA command center, providing multi-channel campaign orchestration, asset generation, and community management.',
    href: '/products/numaya',
    externalUrl: 'http://numaya.io/',
    status: 'live',
    statusLabel: 'Active Product',
    capabilities: [
      'OMNIA conversational command center for campaign strategy and scheduling',
      'Dish- and product-intelligent creative studio preserving physical brand attributes',
      'Unified social publishing and direct customer inbox workflows',
      'Performance attribution and campaign optimization analytics'
    ]
  },
  {
    slug: 'veeko',
    name: 'VEEKO',
    category: 'Experimental Interactive Agent',
    description: 'Early conversational agent prototype developed for exploratory interactive workflows.',
    href: '/products/veeko',
    externalUrl: null,
    status: 'shelved',
    statusLabel: 'Project Shelved',
    capabilities: ['Historical prototype retained for internal R&D']
  }
];

export const caseStudies = [
  {
    slug: 'cleanroom-ems',
    title: 'Genix Cleanroom Environmental Monitoring System',
    category: 'Industrial IoT & Environmental Compliance',
    description: 'Real-time Environmental Monitoring System engineered for Genix pharmaceutical cleanroom facilities, bridging modern telemetry networks with legacy industrial controllers to support ISO and GMP auditability.',
    href: '/case-studies/cleanroom-ems',
    client: 'Genix Cleanroom Facilities',
    techStack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'Socket.IO', 'MySQL'],
    metrics: [
      { label: 'Data Telemetry', value: 'Sub-second' },
      { label: 'Compliance Focus', value: 'GMP & ISO' }
    ]
  },
  {
    slug: 'teachmeback',
    title: 'TeachMeBack AI Learning Platform',
    category: 'EdTech & Agentic Dialogue Systems',
    description: 'Active-recall educational platform built for Brady Mickle, enabling students to reinforce subject mastery through the protégé effect by teaching a synthetic student agent named Emma.',
    href: '/case-studies/teachmeback',
    client: 'Brady Mickle',
    techStack: ['React', 'TypeScript', 'LLM Orchestration', 'Document Parsing'],
    metrics: [
      { label: 'Learning Model', value: 'Protégé Effect' },
      { label: 'Interaction Type', value: 'Multi-turn Dialogue' }
    ]
  }
];

export const contentGapNotices = {
  team: {
    title: 'Leadership & Engineering Team',
    status: 'Confirmed leadership profiles; portraits pending photo release',
    description: 'Nyrix is co-founded by Sarim bin Tahir and Huzaifa Faran, with ML engineering led by M. Ehtesham ul Hassan Malik. Official high-resolution executive portraits will be integrated upon verified photo delivery.',
    actionLabel: 'Contact Leadership Directly',
    actionHref: '/contact'
  },
  advisors: {
    title: 'Advisory Board',
    status: 'Confirmed board members; formal bios pending publication',
    description: 'Our advisory council includes Shams ul Islam and Mashhoodurrehman, providing counsel across enterprise systems and strategic technology governance.',
    actionLabel: 'Inquire About Our Advisory Network',
    actionHref: '/contact'
  },
  articles: {
    title: 'Publications & Technical Briefs',
    status: 'Editorial series in preparation',
    description: 'We are preparing whitepapers and technical deep-dives covering real-time telemetry architectures, agentic decision frameworks, and the economics of private AI deployments.',
    actionLabel: 'Subscribe for Technical Updates',
    actionHref: '/contact'
  },
  podcasts: {
    title: 'The Next Question (TNQ)',
    status: 'Confirmed YouTube series with 4 documented episodes',
    description: 'The Next Question (TNQ) explores production AI engineering and operational decision sciences. Episodes 1–3 are published and playable; Episode 4 premieres 17 October 2026.',
    actionLabel: 'Visit YouTube Channel',
    actionHref: podcastChannelUrl
  }
};
