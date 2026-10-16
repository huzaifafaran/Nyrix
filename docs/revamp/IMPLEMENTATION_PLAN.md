# Nyrix enterprise revamp: engineering delivery plan

Prepared: 16 October 2026. Coordination: root `conversation.md`.

This plan is a technical sequencing decision. The final visual direction, business positioning, and missing people/publishing content remain open. It does not record a completed revamp or authorize deployment.

## 1. Architecture and scope

Retain React 18, React Router 6, Tailwind 3, existing CSS, and the current motion library. Use additive routes and reusable page/content patterns rather than a framework migration. Preserve the nine existing route URLs and meaningful content initially. Existing untracked skills/research/index files are prior work, not disposable build output.

Mandatory outcomes: clean minimal enterprise presentation; concise homepage; dedicated company, team, advisor, podcast and publication spaces; comprehensive footer on every public page; no parallax; factual approved content; extensive Hallmark use with one consistent shared system.

Proposals: labels such as Solutions, Our Work and Insights; exact additional URLs below; exact page compositions and tokens. Do not represent these as stakeholder-approved designs.

The lead owns route composition, global styling/tokens, shared navigation/footer, cross-module interfaces, content publication decisions, and final integration. The collaborator owns only explicitly assigned isolated files. Current checkout synchronization is shared and immediate; no cherry-picking is required for this milestone. Use an isolated worktree if a future assignment requires conflicting dependency/environment changes.

## 2. Current-state evidence

- Nine explicit route trees exist in `src/App.js`; Header and ScrollToTop are shared, while Footer is repeated in each route element.
- Most primary navigation returns to homepage sections, despite existing service/case-study detail routes.
- Products and homepage agent previews hold inline data; the agent library separately uses `agentsData.js`.
- Current scheduling actions open an external Google Calendar URL; there is no application contact-submission backend to migrate.
- Read `CODEBASE_INDEX.md` and the independently reviewed `IMPLEMENTATION_READINESS.md` for evidence and limitations. Production browser access was previously declined; do not bypass that origin boundary.
- No application build, end-to-end test, or installed dependency state should be inferred from installed agent skills.
- Independent readiness checks found Node v24.19.0, matching manifest/lock root declarations (lockfile v3), no `node_modules`, no npm/npx on PATH, and no source test-file candidates. Locked versions include React 18.3.1, Router 6.30.1 and CRA 5.0.1; these are not installed-version claims. Establish package-manager availability and build compatibility before coding validation.
- `public/index.html` has an analytics config call before its later default-consent call and duplicate initialization paths. This is a scoped investigation candidate; Cookiebot/runtime effects must be observed before describing it as a demonstrated tracking defect.

## 3. Working route contract

| Destination | Proposed route | Ownership / compatibility |
| --- | --- | --- |
| Home | `/` | Lead composes a short homepage; retain URL. |
| Company | `/company` | Additive; company story links to real team/advisors. |
| Team / Advisors | `/company/team`, `/company/advisors` | Additive; approved identities/content only. |
| Solutions overview | `/solutions` | Additive; links to existing four service URLs. |
| Products overview / details | `/products`, `/products/:slug` | Additive; only approved entries become public pages. |
| Work index | `/case-studies` | Additive; preserve two existing detail URLs. |
| Insights / Articles / Podcasts | `/resources`, `/resources/articles`, `/resources/podcasts` | Additive hubs; detail routes added as content exists. |
| Contact | `/contact` | Additive; accurately describe the scheduling destination unless a form is separately implemented. |
| Agent library / Privacy | `/agents`, `/privacy-policy` | Retain. |
| Unknown path | `*` | Lead adds a useful not-found view; no false detail fallback. |

Header candidate: Solutions, Products, Our Work, Company, Insights, Contact action. Final ordering follows confirmed positioning. Footer includes real offerings, Company/Team/Advisors, Resources/Articles/Podcasts/Work, Contact, approved legal pages and verified social destinations.

Use actual Router links for page destinations, anchors for real current-page sections, and ordinary anchors for external links. Do not use timeout-driven homepage scrolling for dedicated pages. Decide a single shared-shell location for Header/Footer before wiring new pages, so a route renders exactly one of each. Keep global scroll restoration behavior deliberate.

Preserve current paths unless a specific change has a redirect mapping. Legacy `/#about`, `/#products`, `/#services`, `/#case-studies`, and `/#contact` need retained anchors or an intentional client-side hash mapping; server redirects cannot inspect URL fragments. Verify mappings from direct loads and nested pages.

## 4. Shared implementation contracts

These interfaces are proposed before implementation and owned by the lead. Avoid adding a CMS, state library, UI kit, or backend just to represent small static datasets.

- **Page modules:** default-export plain React components, consume shared tokens, own their content layout only, and omit Header/Footer. Routing and shell composition belong to the lead.
- **Navigation:** one shared data definition for intended published destinations; do not independently duplicate paths/labels in multiple components. External destinations explicitly identify their type.
- **Product records:** stable `slug`, name, short description, status, optional verified external URL, approved features and suitable imagery. A shelved product is not a live enterprise offering by default.
- **People records:** stable ID, name, role, approved biography, optional approved portrait/alt text, optional approved profile URL. Separate team/advisor arrays may share a record shape. Do not invent fields to fill empty cards.
- **Articles:** slug, title, author reference/name, publication date, summary, body or external source, optional image. Clearly distinguish original and externally published content.
- **Episodes:** slug, title, description, host/guest references, publication date, playable source/link, optional duration/artwork/transcript. Unknown durations stay unknown.
- **Case studies:** preserve source intent and URL; identify problem, delivered work, evidence and approved outcomes. Client identity, logos and metrics need publication approval/evidence.
- **Publication state:** keep incomplete records out of published lists. Missing data is recorded in a review/content inventory, not disguised as real public people or episodes. Do not emit broken card links.
- **Design:** one semantic token system for color, typography, spacing and state. Shared components use that system. Hallmark refinement must not rotate the site's theme or invent proof.
- **Interaction:** visible keyboard focus, meaningful elements, mobile-accessible controls, reduced-motion support; contact outcomes described truthfully.

## 5. Execution packages and ownership

These are queued packages, not active collaborator assignments. Activate them with individual Task Assignment entries in `conversation.md`, exact owned files, and acceptance criteria before coding. Use one collaborator with substantial bounded assignments; the lead works on a disjoint package in parallel.

| Package | Owner | Scope and exclusive files | Depends on | Acceptance gate |
| --- | --- | --- | --- | --- |
| NYX-101 Baseline environment | Collaborator | Establish locked dependency installation/build/test commands; proposed report/check files only. Dependency edits require lead decision first. | Readiness findings | Reproducible supported runtime, recorded installation/build results, failures investigated. |
| NYX-101B Consent initialization investigation | Collaborator | `public/index.html` only if runtime evidence justifies a correction; lead explicitly assigns its ownership. | NYX-101; authorized local browser/network review | Document actual no-decision/accept/decline/returning behavior; preserve configured services; avoid duplicate initialization or unsupported consent-category grants; build passes after any edit. |
| NYX-102 Content inventory/contracts | Collaborator | New dedicated content inventory and, after contract confirmation, new `src/content/` modules only. | Positioning/content evidence; can parallel lead design work | Real source attribution, explicit missing material, stable schemas, no fabricated entries or app imports changed. |
| NYX-103 Design and shell | Lead | Hallmark direction, representative layouts, `tailwind.config.js`, global styles, Header/Footer and shared navigation definitions. | Baseline and existing brand/brief | One coherent system, usable responsive navigation, complete actual footer destinations, no parallax. |
| NYX-104 Company/people module | Collaborator | New isolated Company/Team/Advisors modules; consumes frozen content/token contracts. | NYX-102 and NYX-103 contracts | Correct data handling, real available identities/portraits, accessible layouts, no duplicated shell or routing changes. |
| NYX-105 Route and homepage integration | Lead | `src/App.js`, shared route/hash behavior, concise homepage, dedicated overview composition. | NYX-103; integrate NYX-104 when reviewed | Existing URLs retained; dedicated pages reachable; one shell; no homepage section timeouts. |
| NYX-106 Work/product templates | Collaborator | Specifically assigned new templates or existing case-study/product modules, excluding route/global files. | Content/token contract; lead names files | Approved copy/evidence, reusable content layouts, valid product status and links; no unsupported claims. |
| NYX-107 Publishing templates | Collaborator | New resource/article/episode modules and assigned content files only. | Approved publication data and shared system | Distinguish internal/external content; valid media/links; accessible text/transcript handling; honest empty/content-gap treatment. |
| NYX-108 Final integration and QA | Lead; collaborator runs bounded independent checks | Lead fixes integration; collaborator owns assigned QA report/tests only | All required pages/content integrated | Build, routes, navigation, browser, responsive, content, accessibility and scoped SEO gates below satisfied. |

Before each parallel wave, pin exact file ownership in the log. A module that needs a shared component requests a lead contract/change rather than editing that shared file. Lead reviews worker code and the executed checks before integration/approval. Browser checks should inspect actual behavior; do not create tests that only reproduce implementation structure.

## 6. Milestones and quality gates

### M0 — Coordination and implementation readiness (current)

Deliver `conversation.md`, an independent readiness report, this plan, confirmed file ownership and review evidence. Review source/tool availability and document unavailable build/runtime checks. This does not require changing the site or installing app dependencies.

### M1 — Representative enterprise implementation

First coding wave: baseline environment plus approved content inventory, shared design/shell, homepage, Company/Team, a solution detail and one real case study. Include an actual comprehensive footer and a route plan for the full site. A partial demo must be labeled partial; it does not meet final podcast/advisor/publication requirements.

Acceptance: coherent desktop/mobile representative pages; current URLs retain intended behavior; all visible links resolve; truthful content; useful primary action; no parallax; affected build/browser checks pass. Verify team content readiness early so missing portraits/biographies do not appear as a surprise late dependency.

### M2 — Full content and page coverage

Finish product/solution indexes, advisors, agent-library fit, work index, resource/article/podcast pages, contact and policy styling. Use actual approved content, or clearly record remaining publication blockers. Finish all mandatory spaces before claiming the revamp complete.

### M3 — Final release candidate

- Run a reproducible dependency installation with the lockfile and record any runtime/peer-resolution concerns.
- Run `npm run build` with the repository's existing CRA tooling; investigate warnings relevant to changed work. There is no separate lint/typecheck script declared in the manifest; report the checks actually available rather than claiming them.
- Run available meaningful automated checks; explicitly distinguish no matching tests from passing tests. Avoid interactive/watch-mode hangs.
- Verify retained and added routes by direct loading and navigation, nested-page header/footer behavior, hash compatibility, not-found handling, external links, and contact scheduling behavior.
- Inspect relevant layouts at 320, 375, 414, 768 px and desktop. Check overflow, reading hierarchy, image quality, keyboard focus/menu behavior and reduced motion.
- Confirm real people/advisors, working published article/episode content, product status, approved case-study evidence, and all mandatory footer destinations. Review unsupported existing metrics/certification wording before republishing.
- Check actual rendered metadata/indexability and canonical/robots/sitemap/redirect behavior where applicable. Hosting fallback behavior must be checked in the intended environment before launch; local source alone does not verify it.
- Record Hallmark critique and interface-review outcomes, unresolved concerns and corrective work in the coordination log.
- Lead approves only after inspecting collaborator deliverables and independent verification. Deployment remains a separate authorized action.

## 7. Dependencies and stopping conditions

Missing team/advisor biographies, portraits, articles, episode media, or claim substantiation blocks publication of those items, not unrelated architecture work. Proceed with data/template design and available approved material while recording concrete gaps. Ask only for consequential missing decisions that cannot be inferred from the brief.

Missing app dependencies/tooling blocks runtime/build claims until setup is completed; it does not prevent source analysis and isolated planning. Previous production-browser refusal is not permission to use another route to that origin. Use an authorized local review environment for subsequent implementation QA where available.

Do not remove production modules, archives or policies merely because they look unused. Review purpose and publication scope first. Investigate failures and seek a narrow correction; avoid speculative dependency/framework churn.

## 8. Active task tracking

Only root `conversation.md` determines active assignments and status. This plan supplies queue structure and interface expectations. Consult the final M0 review there for baseline verification, readiness findings and the next executable package.
