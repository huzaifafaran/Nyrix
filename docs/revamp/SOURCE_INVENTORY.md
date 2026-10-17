# Generated source inventory

Generated: 2026-10-17

Static filesystem/import inspection; no module execution, runtime crawl, or vector index.

62 source files; 10799 source lines; 21 routes; 80 public files.

## Route composition

| Route | App.js line | Components |
| --- | --- | --- |
| `/` | 103 | EnterpriseHome |
| `/company` | 104 | CompanyPage |
| `/company/team` | 105 | TeamPage |
| `/company/advisors` | 106 | AdvisorsPage |
| `/solutions` | 107 | SolutionsPage |
| `/products` | 108 | ProductsPage |
| `/products/:slug` | 109 | ProductPage |
| `/case-studies` | 110 | WorkPage |
| `/resources` | 111 | ResourcesPage |
| `/resources/articles` | 112 | ArticlesPage |
| `/resources/podcasts` | 113 | PodcastsPage |
| `/contact` | 114 | ContactPage |
| `/agents` | 115 | Legacy → AgentsGallery |
| `/ai-mvp-development` | 123 | Legacy → AiMvpDevelopment |
| `/ai-enablement-advisory` | 131 | Legacy → AiEnablementAdvisory |
| `/business-transformation` | 139 | Legacy → BusinessTransformation |
| `/ai-strategy-governance` | 147 | Legacy → AiStrategyGovernance |
| `/privacy-policy` | 155 | Legacy → PrivacyPolicy |
| `/case-studies/cleanroom-ems` | 163 | Legacy → CaseStudyEMS |
| `/case-studies/teachmeback` | 171 | Legacy → CaseStudyTeachMeBack |
| `*` | 179 | NotFoundPage |

Shared shell ownership is defined in App.js; component dependencies include static and literal dynamic imports.

## Source files

| File | Lines | Reachable from entry | Local dependencies |
| --- | --- | --- | --- |
| `src/App.css` | 20 | Yes | — |
| `src/App.js` | 187 | Yes | `src/components/Header.js`, `src/components/Footer.js`, `src/components/ScrollToTop.js`, `src/components/EnterpriseHome.js`, `src/components/EnterprisePages.js`, `src/App.css`, `src/components/enterprise.css`, `src/components/AgentsGallery.js`, `src/components/AiMvpDevelopment.js`, `src/components/AiEnablementAdvisory.js`, `src/components/BusinessTransformation.js`, `src/components/AiStrategyGovernance.js`, `src/components/PrivacyPolicy.js`, `src/components/CaseStudyEMS.js`, `src/components/CaseStudyTeachMeBack.js` |
| `src/components/About.css` | 1 | No | — |
| `src/components/About.js` | 140 | No | `src/components/About.css` |
| `src/components/Agents.css` | 1 | No | — |
| `src/components/Agents.js` | 254 | No | `src/components/Agents.css` |
| `src/components/agentsData.js` | 971 | Yes | — |
| `src/components/AgentsGallery.css` | 310 | Yes | — |
| `src/components/AgentsGallery.js` | 236 | Yes | `src/components/AgentsGallery.css`, `src/components/agentsData.js` |
| `src/components/AiEnablementAdvisory.js` | 25 | Yes | `src/components/ServiceDetail.js` |
| `src/components/AiMvpDevelopment.js` | 25 | Yes | `src/components/ServiceDetail.js` |
| `src/components/AiStrategyGovernance.js` | 25 | Yes | `src/components/ServiceDetail.js` |
| `src/components/BusinessTransformation.js` | 25 | Yes | `src/components/ServiceDetail.js` |
| `src/components/CaseStudies.js` | 123 | No | — |
| `src/components/CaseStudyDetail.css` | 198 | Yes | — |
| `src/components/CaseStudyDetail.js` | 129 | Yes | `src/content/nyrixContent.js`, `src/components/CaseStudyDetail.css` |
| `src/components/CaseStudyEMS.js` | 6 | Yes | `src/components/CaseStudyDetail.js` |
| `src/components/CaseStudyTeachMeBack.js` | 6 | Yes | `src/components/CaseStudyDetail.js` |
| `src/components/Contact.css` | 1 | No | — |
| `src/components/Contact.js` | 82 | No | `src/components/Contact.css` |
| `src/components/enterprise.css` | 1806 | Yes | — |
| `src/components/EnterpriseHome.js` | 257 | Yes | `src/components/HeroRibbon.js`, `src/components/TeamShowcase.js`, `src/components/reactbits/BlurText.js`, `src/components/reactbits/SpotlightCard.js`, `src/content/nyrixContent.js` |
| `src/components/EnterpriseIcons.js` | 125 | Yes | — |
| `src/components/EnterprisePages.css` | 778 | Yes | — |
| `src/components/EnterprisePages.js` | 748 | Yes | `src/content/nyrixContent.js`, `src/components/EnterprisePages.css`, `src/components/EnterpriseIcons.js`, `src/components/TeamShowcase.js` |
| `src/components/Footer.css` | 1 | No | — |
| `src/components/Footer.js` | 114 | Yes | `src/components/FooterBackground.js` |
| `src/components/FooterBackground.css` | 10 | Yes | — |
| `src/components/FooterBackground.js` | 84 | Yes | `src/components/FooterBackground.css` |
| `src/components/FooterBackground.test.js` | 160 | No | `src/components/FooterBackground.js` |
| `src/components/Header.css` | 1 | No | — |
| `src/components/Header.js` | 96 | Yes | — |
| `src/components/Hero.css` | 1 | No | — |
| `src/components/Hero.js` | 80 | No | `src/components/Hero.css` |
| `src/components/HeroRibbon.css` | 403 | Yes | — |
| `src/components/HeroRibbon.js` | 202 | Yes | `src/components/HeroRibbon.css` |
| `src/components/Kinlu.css` | 1 | No | — |
| `src/components/Kinlu.js` | 94 | No | `src/components/Kinlu.css` |
| `src/components/PrivacyPolicy.css` | 147 | Yes | — |
| `src/components/PrivacyPolicy.js` | 126 | Yes | `src/components/PrivacyPolicy.css` |
| `src/components/Products.css` | 1 | No | — |
| `src/components/Products.js` | 305 | No | `src/components/Products.css` |
| `src/components/reactbits/BlurText.js` | 54 | Yes | `src/components/reactbits/reactbits.css` |
| `src/components/reactbits/LICENSE.react-bits.txt` | 25 | No | — |
| `src/components/reactbits/reactbits.css` | 67 | Yes | — |
| `src/components/reactbits/SpotlightCard.js` | 29 | Yes | `src/components/reactbits/reactbits.css` |
| `src/components/reactbits/upstream/SpotlightCard.css` | 51 | No | — |
| `src/components/reactbits/upstream/SpotlightCard.jsx` | 288 | No | — |
| `src/components/ScrollToTop.js` | 32 | Yes | — |
| `src/components/ServiceDetail.js` | 69 | Yes | `src/components/ServicePage.css` |
| `src/components/ServicePage.css` | 239 | Yes | — |
| `src/components/Services.css` | 1 | No | — |
| `src/components/Services.js` | 114 | No | — |
| `src/components/TeamShowcase.css` | 390 | Yes | — |
| `src/components/TeamShowcase.js` | 212 | Yes | `src/content/nyrixContent.js`, `src/components/TeamShowcase.css` |
| `src/content/enterprise.js` | 323 | No | — |
| `src/content/nyrixContent.js` | 257 | Yes | — |
| `src/enterprise.test.js` | 214 | No | `src/App.js` |
| `src/index.css` | 43 | Yes | — |
| `src/index.js` | 14 | Yes | `src/index.css`, `src/App.js` |
| `src/replace_calendly.js` | 43 | No | — |
| `src/replace_veeko.js` | 29 | No | — |

Reachability follows static imports only. Unreachable files are candidates for review, not automatic deletion.

## Agent catalog

Entries: 46

- Personal Assistant: 2
- Marketing: 7
- Analytics: 8
- Research: 5
- Security: 3
- Healthcare: 2
- Communication: 4
- Sales: 2
- Document Processing: 1
- Business Development: 1
- Legal & Compliance: 1
- Finance: 2
- Health: 1
- Travel: 1
- Fashion: 1
- Creative: 1
- Human Resources: 3
- Automation: 1

## Public file inventory

Paths and sizes only; archived files are not extracted.

| File | Bytes |
| --- | --- |
| `public/ad churn agent.jpeg` | 59232 |
| `public/ad fatigu agent.jpg` | 556045 |
| `public/ai websit analyzer and personalized recommnedation.jpeg` | 63288 |
| `public/alex- the diary manager.jpeg` | 52914 |
| `public/auto monitoring of url and downtime alert.jpg` | 565021 |
| `public/business analyst-lead-gen agent.jpeg` | 57852 |
| `public/certiguard-ai.jpeg` | 111297 |
| `public/clinicall.jpeg` | 112882 |
| `public/cmo.jpg` | 380811 |
| `public/crypto-alert.jpeg` | 62060 |
| `public/data-query.jpeg` | 55786 |
| `public/deep-researcher.jpg` | 538172 |
| `public/email auto responder draft.jpeg` | 44826 |
| `public/expense tracker.jpeg` | 57844 |
| `public/finsense.jpg` | 431697 |
| `public/fitness agent.jpeg` | 58896 |
| `public/flux1-dev_a-futuristic-neon-poster-in-a-dark (13).jpeg` | 66946 |
| `public/followup-genie.jpeg` | 51184 |
| `public/gmail auto labeler.jpeg` | 40530 |
| `public/growth oracle.jpeg` | 55598 |
| `public/index.html` | 3642 |
| `public/interview agent fritz.jpeg` | 52374 |
| `public/invoice-capture.jpeg` | 55524 |
| `public/isthisascam.jpeg` | 56442 |
| `public/legal-agent.jpeg` | 48056 |
| `public/linkdin-commnts to leads.jpeg` | 63188 |
| `public/logo icon no-bg.png` | 509388 |
| `public/logo.png` | 352392 |
| `public/looks-lab-artistic-style-filter.jpeg` | 71900 |
| `public/lookslab virtual-try-on.jpeg` | 52244 |
| `public/manifest.json` | 396 |
| `public/market-whisperer.jpg` | 532691 |
| `public/media/nyrix-clarity-1536.webp` | 149392 |
| `public/media/nyrix-clarity-768.webp` | 49958 |
| `public/media/nyrix-connected-work-1536.webp` | 96456 |
| `public/media/nyrix-connected-work-768.webp` | 27144 |
| `public/media/nyrix-footer-poster.webp` | 8922 |
| `public/media/nyrix-footer.mp4` | 1198098 |
| `public/media/nyrix-violet-ribbon-1900.webp` | 42978 |
| `public/media/nyrix-violet-ribbon-950.webp` | 16812 |
| `public/media/product-artifex.webp` | 19832 |
| `public/media/product-kinlu.webp` | 39922 |
| `public/media/product-numaya.webp` | 56112 |
| `public/media/product-veeko.webp` | 27762 |
| `public/media/service-ai-enablement.webp` | 39296 |
| `public/media/service-ai-governance.webp` | 69384 |
| `public/media/service-ai-mvp.webp` | 61324 |
| `public/media/service-business-transformation.webp` | 38776 |
| `public/media/work-cleanroom.webp` | 51762 |
| `public/media/work-teachmeback.webp` | 37290 |
| `public/n8n backup agent.jpeg` | 63268 |
| `public/New folder/Black White Minimal Real Estate Business Email Signature.png` | 80692 |
| `public/New folder/CMO.zip` | 27285 |
| `public/New folder/Nyrix Agents.zip` | 721040 |
| `public/New folder/Sair.zip` | 26795 |
| `public/newsletter agent.jpeg` | 60920 |
| `public/people/advisor-mashhood-rahman.webp` | 33038 |
| `public/people/advisor-shamsul-islam.webp` | 7888 |
| `public/people/ehtesham-malik.webp` | 25872 |
| `public/people/huzaifa-faran.webp` | 9640 |
| `public/people/sarim-bin-tahir.webp` | 2002 |
| `public/personalized-writing agent.jpg` | 465729 |
| `public/pharmacy stock keeper and reporter.jpeg` | 52546 |
| `public/product-to-ad-poster.jpeg` | 57774 |
| `public/proposal-craft.jpeg` | 59332 |
| `public/prsonalized yt strategist.jpeg` | 49878 |
| `public/reddithound.jpeg` | 58176 |
| `public/resume builder.jpeg` | 50208 |
| `public/resume screener.jpeg` | 61624 |
| `public/robots.txt` | 62 |
| `public/sa.jpg` | 466091 |
| `public/sair th.jpg` | 152053 |
| `public/SalesIQ AI The Conversational Data Analyst.jpeg` | 67608 |
| `public/scrap recent news about company and dcide meeting tone.jpeg` | 53860 |
| `public/sitemap.xml` | 4287 |
| `public/travel agent.jpeg` | 59000 |
| `public/twitter-sentiment-analysis.jpeg` | 57780 |
| `public/your-outlook-manager.jpeg` | 59788 |
| `public/youtub auto description writer.jpeg` | 49508 |
| `public/youtube-summarizer.jpeg` | 56682 |
