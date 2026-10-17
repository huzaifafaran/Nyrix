# Nyrix — Enterprise Platform & Decision Sciences

Clean, modern, and minimal enterprise website for **Nyrix** (`nyrix.co`). Built with React 18, React Router 6, Tailwind CSS, and a unified enterprise design system.

---

## 🗺️ Complete Site Architecture & Sitemap

Nyrix uses dedicated top-level and nested multi-page routing. Every public route shares a single cohesive shell (Header, Accessibility Skip-Link, Scroll Restoration, and Comprehensive Shared Enterprise Footer).

### Visual Hierarchy

```text
Nyrix Platform (/)
├── Solutions (/solutions)
│   ├── AI MVP Development (/ai-mvp-development)
│   ├── AI Enablement & Advisory (/ai-enablement-advisory)
│   ├── Business Transformation (/business-transformation)
│   └── AI Strategy & Governance (/ai-strategy-governance)
├── Products (/products)
│   ├── Kinlu (/products/kinlu) — Predictive Analytics
│   ├── Artifex (/products/artifex) — Product Photography AI · Shelved
│   ├── Numaya (/products/numaya) — Social Marketing Automation
│   └── Veeko (/products/veeko) — Ecommerce intelligence · Shelved
├── Our Work & Case Studies (/case-studies)
│   ├── Cleanroom Environmental Monitoring (/case-studies/cleanroom-ems)
│   └── TeachMeBack AI (/case-studies/teachmeback)
├── Company (/company)
│   ├── Team (/company/team) — Verified founders & ML leadership
│   └── Advisors (/company/advisors) — Industry advisors
├── Insights & Resources (/resources)
│   ├── Articles & Publications (/resources/articles) — Published chapters & articles
│   └── The Next Question Podcast (/resources/podcasts) — Video episodes & upcoming premieres
├── Agents Library (/agents) — Searchable AI agent directory
├── Contact (/contact) — Direct inquiries & Google Calendar booking
└── Legal
    └── Privacy Policy (/privacy-policy)
```

---

## 📑 Route Directory & Technical Specification

| Route Path | Page Component | Category | Description | Primary Data Source |
|---|---|---|---|---|
| `/` | `EnterpriseHome` | Homepage | Enterprise overview, media-led hero, capabilities, featured work, and insights. | `nyrixContent.js` |
| `/solutions` | `SolutionsPage` | Solutions | Practical path for enterprise AI initiatives, advisory, and transformation. | `services` |
| `/ai-mvp-development` | `AiMvpDevelopment` | Services Detail | Rapid scoping, prototyping, and user evaluation of AI workflows. | Legacy Service |
| `/ai-enablement-advisory` | `AiEnablementAdvisory` | Services Detail | Organizational readiness, capability building, and AI adoption strategy. | Legacy Service |
| `/business-transformation` | `BusinessTransformation` | Services Detail | Integrating AI systems into operational workflows and enterprise tech stacks. | Legacy Service |
| `/ai-strategy-governance` | `AiStrategyGovernance` | Services Detail | Decision ownership, risk management, and compliance for AI deployments. | Legacy Service |
| `/products` | `ProductsPage` | Products Hub | Overview of Nyrix's AI platforms for decisions, creative work, and marketing. | `products` |
| `/products/kinlu` | `ProductPage` (`:slug`) | Product Detail | Automated machine learning for customer churn, lifetime value, and intent. | `products` (`slug: kinlu`) |
| `/products/artifex` | `ProductPage` (`:slug`) | Product Detail | Creative generative AI platform turning product photos into marketing visuals. | `products` (`slug: artifex`) |
| `/products/numaya` | `ProductPage` (`:slug`) | Product Detail | Marketing automation for restaurants & businesses via OMNIA planning. | `products` (`slug: numaya`) |
| `/products/veeko` | `ProductPage` (`:slug`) | Product Detail | Shelved Shopify store-assistant and order-risk concept. | `products` (`slug: veeko`) |
| `/case-studies` | `WorkPage` | Case Studies Hub | Index of real applied AI systems built for specific industrial & educational problems. | `caseStudies` |
| `/case-studies/cleanroom-ems` | `CaseStudyEMS` | Case Study Detail | Telemetry & environmental monitoring web platform for Genix cleanrooms. | Legacy Case Study |
| `/case-studies/teachmeback` | `CaseStudyTeachMeBack` | Case Study Detail | Active recall learning system where learners teach an AI student. | Legacy Case Study |
| `/company` | `CompanyPage` | Company | Company overview, mission, work philosophy, and links to team/advisors. | `nyrixContent.js` |
| `/company/team` | `TeamPage` | People | Verified profiles for Sarim bin Tahir (CEO), Huzaifa Faran, and M. Ehtesham. | `team` |
| `/company/advisors` | `AdvisorsPage` | People | Confirmed industry advisors: Shams ul Islam and Mashhoodurrehman. | `advisors` |
| `/resources` | `ResourcesPage` | Insights Hub | Nyrix thinking, articles, research, and podcast series directory. | `nyrixContent.js` |
| `/resources/articles` | `ArticlesPage` | Publications | Published articles and LinkedIn thought leadership (e.g. Chapter 6: Memory). | `articles` |
| `/resources/podcasts` | `PodcastsPage` | Media / Podcasts | *The Next Question* (TNQ) podcast episodes (E01–E03 published, E04 premiere). | `episodes` |
| `/agents` | `AgentsGallery` | Product / Tools | Interactive, searchable, and category-filtered library of AI agents. | `agentsData.js` |
| `/contact` | `ContactPage` | Engagement | Inquiries, email touchpoint (`hello@nyrix.co`), and Google Calendar scheduler. | `bookingUrl` |
| `/privacy-policy` | `PrivacyPolicy` | Legal | Data privacy, cookies, and regulatory compliance disclosures. | `PrivacyPolicy.js` |
| `*` | `NotFoundPage` | System | 404 handler with intuitive breadcrumb and return to home navigation. | `EnterprisePages.js` |

---

## 🎨 Design System & Typography Tokens

The site adheres to a shared, minimal enterprise design language:

- **Display Typography (`h1`, `h2`, `h3`, `h4`, wordmark)**: `"IBM Plex Sans", sans-serif`
- **Body & Interface Typography (paragraphs, labels, navigation, buttons)**: `"Inter", sans-serif`
- **Core Palette**:
  - Paper / Backgrounds: `#ffffff` (soft: `#f5f5f7`, muted: `#eeebf4`)
  - Ink / Text: black (`#000000`); white on dark surfaces
  - Accent Purple: `#7045ba` (dark: `#593194`)
  - Dark / Footer: `#18171d` with subtle border `#453a56`
- **Motion & Accessibility**:
  - Video and SVG animations strictly respect `prefers-reduced-motion: reduce`.
  - Background motion controls omitted at user request; automatic preference/offscreen/hidden policies remain.
  - Full keyboard accessibility with visible focus rings (`:focus-visible`).

---

## 💻 Developer Quick Start

### Prerequisites
- **Node.js**: v18+ (tested on Node v24 LTS)
- **npm**: v9+

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm start
# -> Local URL: http://localhost:3000

# 3. Run automated regression test suite
npm test -- --watchAll=false

# 4. Generate production build
npm run build
```

---

## 🌐 SEO & Indexing Files

- **`public/sitemap.xml`**: Standard XML sitemap containing all 23 canonical public routes with priority and change frequencies.
- **`public/robots.txt`**: Standard robots instructions directing web crawlers to `https://nyrix.co/sitemap.xml`.
- **Dynamic Head Metadata**: Handled route-by-route via `PageMetadata` in `src/App.js`.
## Current design and source notes

Reference lander uses Inter with enlarged Instrument Serif italic emphasis on “work”; black/white text and purple media/design accents. Homepage narrative: business proposition → capabilities → actual work → product portfolio with honest lifecycle labels → real people → published conversations → contact. Distinct generated product campaign artwork is conceptual, not a product screenshot or claimed output. React Bits source adaptations and license are recorded in `docs/revamp/REACT_BITS.md`; no live MCP server connection is implied. Current ownership and executed QA: `conversation.md`.
