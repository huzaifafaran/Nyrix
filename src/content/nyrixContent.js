import { enterpriseProducts, deliveryStages } from "./enterpriseOfferContent";
// Verified source register: docs/revamp/PEOPLE_PODCAST_SOURCES.md.
export const bookingUrl = "https://calendar.app.google/mhjiQ9t9g5Ge322s6";
export const contactEmail = "hello@nyrix.co";
export const podcastChannelUrl = "https://www.youtube.com/@NyrixAI";
export const linkedInUrl = "https://www.linkedin.com/company/nyrixai";
export const team = [
  {
    name: "Sarim bin Tahir",
    role: "Co-founder & CEO",
    photo: "/people/sarim-bin-tahir-2026.png",
    profileUrl: "https://www.linkedin.com/in/sarimsyed",
    bio: "Leads Nyrix's product vision and enterprise AI strategy, turning emerging technology into dependable business infrastructure.",
  },
  {
    name: "Huzaifa Faran",
    role: "Co-founder & Solutions Architect",
    photo: "/people/huzaifa-faran-2026.jpeg",
    profileUrl: "https://pk.linkedin.com/in/huzaifa-faran",
    bio: "Builds scalable AI solutions that turn business problems into real-world impact and hosts The Next Question.",
  },
  {
    name: "M. Ehtesham ul Hassan Malik",
    role: "Lead ML Engineer",
    photo: "/people/ehtesham-malik-2026.png",
    profileUrl: "https://www.linkedin.com/in/m-ehtesham-ul-hassan-malik",
    bio: "Designs machine learning architectures, multimodal models and real-time inference systems for production deployment.",
  },
  {
    name: "Aijaz Usman",
    role: "Accounts and Finance Head",
    photo: "/people/aijaz-usman.jpg",
    profileUrl: "https://www.linkedin.com/in/aijaz-usman-5538327/",
    bio: "Leads accounts and finance at Nyrix, bringing a background in HR consulting and executive recruitment.",
  },
];
export const advisors = [
  {
    name: "Shamsul Islam",
    role: "Advisor",
    photo: "/people/advisor-shamsul-islam.webp",
    focus: "Corporate governance & strategic finance",
    credential: "Former Chairman, Pakistan Petroleum Limited",
    profileUrl: "https://www.linkedin.com/in/shamsul-islam-23819621/",
    bio: "Shamsul Islam is a corporate executive and board leader with experience spanning governance, strategic finance, infrastructure investment and industrial development. He served as Chairman of Pakistan Petroleum Limited. His background brings a board-level perspective on corporate strategy, project finance and the governance of complex organizations.",
  },
  {
    name: "Shaikh Mashhood Rahman",
    role: "Advisor",
    photo: "/people/advisor-mashhood-rahman.webp",
    focus: "Technology & digital transformation",
    credential: "CIO experience: Bank of Khyber & Dubai Islamic Bank Pakistan",
    profileUrl: "https://www.linkedin.com/in/mashhoodrahman/",
    bio: "Shaikh Mashhood Rahman is a technology executive with extensive experience in IT leadership, enterprise technology and banking transformation. He has served as Chief Information Officer at Bank of Khyber and Dubai Islamic Bank Pakistan, alongside senior technology roles in financial institutions. His expertise spans technology strategy, enterprise architecture, IT governance and digital transformation.",
  },
];
export const articles = [
  {
    slug: "technova-chapter-6-memory",
    series: "TechNova Infrastructure Series",
    chapterNumber: 6,
    title: "Chapter 6: Memory",
    author: "Huzaifa Faran",
    publishedAt: "2026-06-15",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-6-memory-huzaifa-faran-1p6ff",
    summary: "The database metrics are open on your second monitor and the number that keeps catching your eye is not the error rate. Scaling memory and persistence.",
  },
  {
    slug: "technova-chapter-5-the-receptionist",
    series: "TechNova Infrastructure Series",
    chapterNumber: 5,
    title: "Chapter 5: The Receptionist",
    author: "Huzaifa Faran",
    publishedAt: "2026-04-15",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-5-receptionist-huzaifa-faran-sboyf",
    summary: "A user has sent four hundred requests in three minutes. Routing, rate limiting and load orchestration in production architecture.",
  },
  {
    slug: "technova-chapter-4-the-blind-entrance",
    series: "TechNova Infrastructure Series",
    chapterNumber: 4,
    title: "Chapter 4: The Blind Entrance",
    author: "Huzaifa Faran",
    publishedAt: "2026-03-20",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-4-blind-entrance-huzaifa-faran-vev3f/",
    summary: "The metrics dashboard is still open on your screen and the number keeps climbing steadily. Managing API gateways and inbound traffic spikes.",
  },
  {
    slug: "technova-chapter-3-the-room-and-the-apartment",
    series: "TechNova Infrastructure Series",
    chapterNumber: 3,
    title: "Chapter 3: The Room and The Apartment",
    author: "Huzaifa Faran",
    publishedAt: "2026-02-18",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-3-room-apartment-huzaifa-faran-paeqf/",
    summary: "Resource allocation, isolation, and process scheduling when operating machine learning backends under continuous load.",
  },
  {
    slug: "technova-chapter-2-the-open-door",
    series: "TechNova Infrastructure Series",
    chapterNumber: 2,
    title: "Chapter 2: The Open Door",
    author: "Huzaifa Faran",
    publishedAt: "2026-01-25",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-2-open-door-huzaifa-faran-yl62f/",
    summary: "Keeping systems alive: how traffic moves, requests are dispatched, and resilient error recovery is structured.",
  },
  {
    slug: "technova-chapter-1-one-server-hundred-thousand-users",
    series: "TechNova Infrastructure Series",
    chapterNumber: 1,
    title: "Chapter 1: One Server. A Hundred Thousand Users.",
    author: "Huzaifa Faran",
    publishedAt: "2025-12-10",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/chapter-1-one-server-hundred-thousand-users-2-am-huzaifa-faran-cmyif/",
    summary: "Your first night at an AI startup when unexpected scale hits single-server infrastructure at 2 AM.",
  },
  {
    slug: "from-startup-speed-to-enterprise-reality-lessons-from-contour-software",
    title: "From Startup Speed to Enterprise Reality: Lessons from Contour Software",
    author: "Huzaifa Faran",
    publishedAt: "2025-11-05",
    publication: "LinkedIn",
    href: "https://www.linkedin.com/pulse/from-startup-speed-enterprise-reality-lessons-contour-huzaifa-faran-dfgtf/",
    summary: "Lessons from leading an industrial visit to Contour Software on how large corporate software houses manage scale, governance and delivery.",
  },
];
export const services = deliveryStages;
export const products = enterpriseProducts;
export { enterpriseCases as caseStudies } from "./enterpriseOfferContent";
export const episodes = [
  {
    id: "8qhTF7WyKdI",
    title:
      "Dr. Muhammad Yaseen Khan: AI Meets Linguistics | The Next Question E01",
    guest: "Dr. Muhammad Yaseen Khan",
    topic: "AI meets linguistics",
    description:
      "Urdu, Roman Urdu and cultural context reveal the challenges of language understanding.",
    url: "https://www.youtube.com/watch?v=8qhTF7WyKdI",
    thumbnail: "https://i.ytimg.com/vi/8qhTF7WyKdI/maxresdefault.jpg",
    status: "published",
    publishedAt: "2026-08-31",
    duration: "49:42",
  },
  {
    id: "V7bxqYvpbEE",
    title: "Ms Sumaiyah Zahid: Quantum AI | The Next Question E02",
    guest: "Ms Sumaiyah Zahid",
    topic: "Quantum AI",
    description:
      "Quantum machine learning, data encoding and the practical value of quantum approaches.",
    url: "https://www.youtube.com/watch?v=V7bxqYvpbEE",
    thumbnail: "https://i.ytimg.com/vi/V7bxqYvpbEE/maxresdefault.jpg",
    status: "published",
    publishedAt: "2026-09-06",
    duration: "38:23",
  },
  {
    id: "YolIb0eBbNE",
    title:
      "Prof. Dr. Najeed Ahmed Khan: Computer Vision | The Next Question E03",
    guest: "Prof. Dr. Najeed Ahmed Khan",
    topic: "Computer vision",
    description:
      "Object detection and multimodal AI meet the constraints of real deployment.",
    url: "https://www.youtube.com/watch?v=YolIb0eBbNE",
    thumbnail: "https://i.ytimg.com/vi/YolIb0eBbNE/maxresdefault.jpg",
    status: "published",
    publishedAt: "2026-09-14",
    duration: "53:08",
  },
  {
    id: "hvQRJaG7l-U",
    title:
      "How Does AI Learn to Optimize? | Evolutionary Algorithms Explained | Dr. Usman Amjad | TNQ E04",
    guest: "Dr. Usman Amjad",
    topic: "Evolutionary algorithms",
    description:
      "How AI searches large solution spaces while balancing quality, computing effort and time.",
    url: "https://www.youtube.com/watch?v=hvQRJaG7l-U",
    thumbnail: "https://i.ytimg.com/vi/hvQRJaG7l-U/maxresdefault.jpg",
    status: "listed",
    publishedAt: null,
    premieresAt: "2026-10-17T15:00:00Z",
    duration: "46:01",
  },
];
export const podcastEpisodes = episodes;
