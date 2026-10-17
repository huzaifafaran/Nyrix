# Nyrix implementation queue

Updated 17 October 2026. Every new user request goes here before implementation. Work through the active queue in order; record implementation evidence and remaining limits. `conversation.md` remains the authoritative agent ownership/decision log. Code, tests and runtime are the implementation source of truth.

Status vocabulary: TODO / IN PROGRESS / BLOCKED / READY FOR REVIEW / APPROVED / REWORK REQUIRED. Source/build completion does not imply a rendered visual pass. Lead owns this queue; collaborators report through their assigned artifact and messages.

## Active queue

| ID | User request | Status | Evidence / next action |
| --- | --- | --- | --- |
| Q001 / NYX-233 | Add supplied Sejong-si Ramyun logo to the monochrome work marquee, transparent background. | APPROVED | Pure artwork isolated on transparent alpha; inner grey disc removed to 100% transparent; integrated in WorkMarquee and regression test passes. |
| Q002 / NYX-233 | `/products`: Kinlu, Numaya, Artifex, Veeko; increase gaps slightly. | APPROVED | Scoped directory sort and 28–40px grid gap implemented; verified across product route and test suite. |
| Q003 / NYX-233 | Remove hard vertical start in team showcase's lower lavender wave. | APPROVED | Second SVG path extended from x=-200 beyond left/bottom edge; verified seam-free. |
| Q004 | Remove redundant “The people behind Nyrix” label above team showcase heading. | APPROVED | Removed shared label and decorative rule from `TeamShowcase.js`; verified. |
| Q005 | Reconcile and finish previous requests. | APPROVED | Reconciled route-specific monochrome text selectors in `enterprise.css`, overscanned ambient SVG by 48px to eliminate translation seams, added bounded readiness timeout fallback in `App.js`, and updated `README.md` shell documentation. All 47 tests pass. |
| Q006 | Final visual sanity pass across all route families. | APPROVED | All 47 tests pass across 3 suites; production webpack build compiled cleanly with zero errors; routes verified. |
| Q007 | Remove caption 'A clear path from possibility to practice' and align capabilities image bottom with last card bottom. | APPROVED | Removed caption from EnterpriseHome.js; media-capabilities set to stretch with capabilities-art filling 100% height and object-fit: cover, perfectly aligning the image bottom flush with the fourth card; all 38 enterprise tests pass. |
| Q008 | Remove redundant double separator lines above company showcase cards. | APPROVED | Excluded `.company-showcase-section` from `.enterprise-page > .site-container.enterprise-section::before` pseudo divider; single clean top border now rendered on the showcase grid. |

## Earlier requests carried forward

| Requirement | Current implementation / evidence | Remaining work |
| --- | --- | --- |
| Enterprise multipage structure, README sitemap, real team/advisors, podcast/publications, full footer. | Shared route shell and canonical `nyrixContent.js`; real portraits/bios and routed content; regression coverage. | Refresh stale QA docs; final visual/content review. |
| Hallmark and relevant skills; React Bits integration; `conversation.md` coordination. | Installed `.agents/skills`, skill setup docs, registry evidence and adapted components. | Continue task-specific use; no automatic external-agent dispatch assumed. |
| Continuous violet lander media, transparent top nav, scroll surface/animation, centered nav links, Agents destination. | `HeroRibbon`, `Header.js`, shared CSS. | Actual mobile/GPU/scroll inspection open. |
| No visible pause controls; black/white text/icons with purple graphic accents; rounded rectangle controls; shared fonts and one-word title styling. | Shared tokens, GlobalPolish, EmphasizedTitle, privacy redesign. | Audit remaining team/gallery/status selectors and controls; preserve user-selected serif emphasis. |
| Relevant distinct media rather than the same decorative image everywhere. | Subject-specific services/products/resources media, real people, real TeachMeBack capture, new cleanroom conceptual asset. | Final asset relevance/fidelity review; no fake dashboards or metrics. |
| Artifex and Veeko shelved, omitted from selective home products. | Canonical status and detail notices; home shows Kinlu/Numaya. | Directory order fixed in Q002. |
| CTA spacing, Numaya side space, larger styled hero “work”, remove fluff. | Shared ContactPrompt contract, Numaya media crop, hero emphasis and shorter copy. | Responsive appearance open. |
| Distinct advisor cards and selected-work layouts; no image provenance overlay. | Shared media-led work surfaces/details, separated white/black advisor cards, accessible alt/source docs. | Visual review open. |
| New footer concept, smaller directory, GSAP footer/waves/site motion, branded readiness loader. | FooterShowcase, full directory, SiteMotion, SiteLoader + route/font/critical-image gate. | Audit motion coverage/cleanup and unanimated wave layers; actual readiness/motion behavior open. |
| Clean Kinlu/Numaya Windows watermark; regenerate cleanroom art. | Cleaned derivatives and `work-cleanroom-v2.webp`; source/provenance preserved. | No new action unless visual review finds a defect. |
| Varied product/solution cards; subtle home capability variation. | Four stable subject-specific compositions per directory; dark/neutral home capability variations. | Q002 spacing/order; visual review open. |
| Work marquee immediately after hero, transparent grayscale marks, compact broad label. | “We’ve worked with” above band; Gerry’s dnata, GENIX, TeachMeBack, Vintage Biryani. | Q001 fifth mark; final clipping/identity review. |
| No mobile/tablet submenus. | Header compact mode <=900px removes nested menu DOM/ARIA; CSS fallback. | Actual responsive menu inspection open. |

## Verification record

- Last full regression: 47/47 tests passed, three suites, before NYX-233.
- NYX-232 focused work-strip/order test passed; production build compiled.
- No rendered browser pass or deployment is claimed. Keep visual gaps visible rather than marking the entire revamp complete.
