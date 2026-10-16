# Nyrix codebase index and current design diagnosis

Reviewed: 16 October 2026. Scope: current local source, configuration, routes, and public asset filenames.

**Historical baseline:** the diagnosis below records the pre-revamp implementation. Revamp code has since been added; consult refreshed `SOURCE_INVENTORY.md`, `conversation.md` and `REVAMP_QA.md` for the current implementation and verification status. The original counts/findings below are retained as baseline evidence.

## Reading this index

This is a navigable static codebase index, not an embedding/vector database. The full file/import/route inventory is in [SOURCE_INVENTORY.md](SOURCE_INVENTORY.md); machine-readable data is in [codebase-index.json](codebase-index.json). Refresh both with `python scripts/index_codebase.py` using a working Python interpreter. The indexer reads source text; it does not import application modules or run the old replacement scripts. Its regex import scan is a lightweight aid, not a complete JavaScript parser.

38 source files, 4,198 source lines, 9 explicit routes, 55 public files, and 46 agents in the gallery data were indexed. Counts exclude installed skills, Git internals, package-lock contents, and unrelated private documents.

Live Nyrix browser inspection was declined by the browser access gate. No alternate method was used to access that origin. This assessment therefore describes the local code, not verified pixels, production behavior, or deployment parity. No application code was changed, and no app build/browser QA was run.

## 1. Entry points and ownership

| Concern | Files | What they own |
| --- | --- | --- |
| App bootstrap | `src/index.js` | React root, StrictMode, BrowserRouter, global CSS. |
| Route composition | `src/App.js` | Shared Header/ScrollToTop and nine route trees. Footer is added separately in each route. |
| Shared navigation | `src/components/Header.js` | Fixed header, scroll styling, mobile toggle, primarily homepage-section navigation. |
| Shared footer | `src/components/Footer.js` | Company/services/legal lists, LinkedIn, email reveal/copy, copyright, compliance badges. |
| Global styling | `src/index.css`, `src/App.css` | Tailwind directives, body style, scrollbar, legacy utilities, faint fixed radial-gradient backdrop. |
| Design configuration | `tailwind.config.js` | Nyrix purple/slate/light colors, shared font stacks, glow/card shadows. |
| Shared inner-page styling | `src/components/ServicePage.css` | Service/case-study hero, section, card, process, deliverable, and CTA classes. |
| HTML shell/integrations | `public/index.html` | Font loading, basic metadata, Cookiebot, Google Analytics, retained Calendly assets. |
| Build/package setup | `package.json`, `postcss.config.js` | Create React App scripts, React/Router, Tailwind/PostCSS, Framer Motion/Lucide. |

## 2. Current routes

| Route | Main content | Revamp implication |
| --- | --- | --- |
| `/` | Hero, About, Products, Services, Agents, CaseStudies, Contact | Currently carries almost all top-level content. Convert to a concise entry point. |
| `/agents` | AgentsGallery | Existing searchable/filterable catalog; preserve useful data and give it an appropriate navigation home. |
| `/ai-mvp-development` | AiMvpDevelopment | Existing service detail and process; retain URL unless an intentional redirect is planned. |
| `/ai-enablement-advisory` | AiEnablementAdvisory | Existing AI advisory offering. |
| `/business-transformation` | BusinessTransformation | Existing integration/modernization offering. |
| `/ai-strategy-governance` | AiStrategyGovernance | Existing governance offering; claims need approved wording. |
| `/privacy-policy` | PrivacyPolicy | Existing legal page with separate legacy CSS. |
| `/case-studies/cleanroom-ems` | CaseStudyEMS | Detailed environmental monitoring work; potential enterprise proof after approval. |
| `/case-studies/teachmeback` | CaseStudyTeachMeBack | Detailed learning-platform work; preserve while evaluating homepage relevance. |

There are no explicit routes for company/team/advisors, a products overview, solutions overview, case-study index, publications, podcasts, or contact. There is no wildcard/not-found route in the current route tree. React Router is already present; multipage information architecture does not require a framework migration.

## 3. Content and component map

| Module | Content / behavior | Reuse decision |
| --- | --- | --- |
| `Hero.js` | Near-full-height centered headline, generic value tags, scheduling CTA; “Explore Platform” scrolls to services. | Rewrite hierarchy and align the CTA label with its destination. |
| `About.js` | Mission, four values, headline metrics. No real team profiles/portraits. | Move long company material to Company; replace broad values with specific approved substance. |
| `Products.js` | Local four-product array and animated tabs. Kinlu, Artifex, Numaya marked live; Veeko marked shelved. | Extract reusable product data and build proper product pages/previews. These statuses are source labels, not independently verified availability. |
| `Services.js` | Four service summaries with real existing routes. | Useful offering taxonomy; change navigation semantics and page presentation. |
| `Agents.js` | Separate six-item homepage agent array and expand/collapse details. | Reconcile with gallery data to avoid duplicate descriptions/statuses. |
| `agentsData.js` | 46 catalog entries, categories, tags, descriptions, image paths, colors/gradients. | Preserve as a content asset; curate business-relevant examples rather than exposing every agent on the homepage. |
| `AgentsGallery.js` | Search, category filter, featured selected agent, horizontal rows, demo action. | Keep useful catalog behavior; review interaction/accessibility during implementation. |
| `CaseStudies.js` | Two case-study previews with technology labels and claimed metrics. | Give proof more prominence and a dedicated index; verify claims before publishing. |
| `CaseStudyEMS.js`, `CaseStudyTeachMeBack.js` | Long-form project explanations using shared inner-page styling. | Stronger evidence material than generic “enterprise ready” labels; collect real screenshots and approved outcomes. |
| Four service detail modules | Structured service descriptions, cards, timelines/deliverables where applicable, scheduling CTA. | Preserve content intent; adapt to a calmer shared enterprise template. |
| `Contact.js` | Scheduling introduction, CTA, three benefits. | This is a Google Calendar handoff, not an application contact form/backend submission. |
| `PrivacyPolicy.js` / `.css` | Policy sections with older CSS variable names. | Reconcile visual tokens and confirm approved text. |
| `ScrollToTop.js` | Resets position when pathname changes. | Existing shared behavior to retain as appropriate. |

## 4. Styling philosophy actually expressed in code

My diagnosis: **a light, assertive AI product/service studio presented as a conversion-focused landing page, with some enterprise language and editorial spacing.** This is an interpretation of the implementation, not a claim about who designed it.

- Palette: light lavender `#f8f7fc`, purple `#7c3aed`, slate `#0f172a`, white sections, darker case-study/footer sections.
- Typography: Plus Jakarta Sans for both display/body with Inter fallback; heavy, tightly tracked, often uppercase headings. The hero reaches `7rem` on large screens.
- Structure: centered headline/description/action clusters recur across homepage sections and service pages. Long section padding and thin dividers add some restraint already.
- Decoration: the current hero explicitly omits background decor. Some glass, glow, blur, rounded panels, and faint background gradients remain elsewhere. The README's “exotic”/particle-heavy description is not a reliable account of the current component tree.
- Motion: repeated fade-up entrances, scroll-triggered reveals, animated tab transitions, hover/tap scaling, and smooth scrolling. No parallax implementation or reduced-motion handling was found in the scanned source.
- Conversion: repeated scheduling actions lead to the same Google Calendar URL; the global navigation commonly routes back to homepage anchors.
- Identity: agent catalog images, product features, quick-MVP messaging, and demo CTAs dominate. The organization itself has little dedicated space for people or published thinking.

The agency impression comes mainly from content priorities, buying journey, and repeated promotional presentation. Purple, React, and a bold headline are not inherently incompatible with an enterprise site.

## 5. Hallmark-informed visual critique

These are taste findings inferred from source. Severity indicates redesign priority, not a security assessment or proof that the page was AI-generated. Project requirements override Hallmark's generic objections to standard enterprise navigation/footer patterns.

| Severity | Hallmark tell | Evidence | Correction |
| --- | --- | --- | --- |
| Critical | Full-viewport centered hero, near-match | `Hero.js:18–46`: 90vh centered hero with very large uppercase headline and promotional subhead. | Use a content-sized, more informative opening with clear audience/value and a real proof/image element if available. |
| Major | Centered everything | Hero, About heading, Products heading, Services heading, Contact opening, and shared `.sp-hero`. | Keep a coherent alignment system; use left-aligned reading and deliberate layouts suited to each content type. |
| Major | Eyebrow on every section | Repeated uppercase, tracked labels above almost every major heading. | Use labels only where they add navigation/context; let headings carry hierarchy. |
| Major | Animate-on-scroll on everything | Repeated `fadeUp`, `whileInView`, and `useInView` patterns across most content components. | Make content immediately readable; use motion for useful state changes and limited emphasis. |
| Major | Glassmorphism without purpose | Header blur, product showcase glass/blur, footer decorative glow. | Prefer solid surfaces; retain overlays only where translucency improves context. |
| Minor | Inconsistent visual system | Tailwind utility-first pages coexist with old variable-driven privacy styles and scattered hard-coded values. | Consolidate semantic tokens and shared page/component templates. |

Count: **1 critical · 4 major · 1 minor**. A comprehensive column footer is specifically required and is not counted as an anti-pattern here. A single well-chosen type family is also acceptable; changing fonts merely to satisfy a generic skill rule would not solve the structural issue.

## 6. Enterprise credibility gaps to resolve

- Header destinations are mostly section-scroll buttons (`Header.js:29–46`); products and company do not yet have overview destinations.
- Footer looks grouped but is incomplete: one Company link, no resource/podcast/advisor links, several current-page anchors, and policy placeholders (`Footer.js:12–29`).
- “SOC 2 Compliant” and other trust labels appear in `Footer.js:143`; About includes “50+” agents and “35%” cost reduction. No corroborating evidence was supplied in this task. Treat these as unverified existing claims, not proven falsehoods.
- “Explore Platform” goes to Services (`Hero.js:61–66`), which blurs the distinction between products and consulting.
- Real people, team portraits, advisor records, article entries, and podcast episodes are not modeled in the current route/content structure. Public filenames are mostly agent illustrations; filenames alone cannot establish photo suitability or publication permission.
- The repository contains archived files under `public/New folder/`. Public-directory files may be included in build output; review their intended publication before launch. Archives were not extracted for this index.

## 7. Technical housekeeping for the eventual revamp

- `Kinlu.js` and its CSS are not reachable from the current entry import graph; Products already contains a Kinlu entry. Review before reusing or removing anything.
- `Services.css` is not imported by Services. Most other tiny CSS companions are comments while the actual styling lives in JSX utilities.
- `replace_calendly.js` and `replace_veeko.js` are historical source-mutation helpers, not runtime modules. Do not execute them during the revamp.
- Privacy CSS references variables such as `--primary-dark` and `--text-primary` with no definitions found in the scanned source. Confirm runtime appearance and reconcile tokens.
- `public/index.html` retains Calendly assets while visible CTAs open Google Calendar. Review that integration rather than blindly carrying unused assets forward.
- Existing metadata is primarily one shared HTML-shell title/description. Dedicated page metadata/indexability needs a scoped follow-up during implementation; no production SEO performance claim is made here.
- No fetch/axios-backed contact flow was found. Do not represent the scheduling handoff as an internally implemented lead-processing system.

## 8. Reuse strategy

Keep the current stack, URL continuity, meaningful offering content, case-study material, reusable catalog data, and useful brand recognition. Rework the information architecture, shell, content hierarchy, photography, typography treatment, and shared templates. Add real people and publication models before filling their spaces with UI.

Read [INSPIRATION_RESEARCH.md](INSPIRATION_RESEARCH.md) for reference links, comparison, and the recommended sequence.
