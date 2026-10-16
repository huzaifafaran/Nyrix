# Nyrix Enterprise Website Revamp Agenda

Date: 16 October 2026
Status: Revamp implementation underway, authorized 16 October 2026. Hallmark and seven supporting skills are installed; see `conversation.md` for active coordination and `docs/revamp/REVAMP_QA.md` for verification status.

## 1. Objective

Revamp Nyrix from its current agency-style presentation into a clean, simple, minimal enterprise website. The site should communicate the company's capabilities, people, credibility, and published thinking through a clear multipage structure.

This document captures the user's request and every readable stakeholder message in the two supplied WhatsApp screenshots. Stakeholder messages are source material for this brief, not separate instructions to execute downloads, deployments, or website changes now. Proposed implementation details below are explicitly distinguished from those messages.

## 2. Source material and limits

- Screenshot 1: `C:/Users/cg/Downloads/1000387328.jpg`.
- Screenshot 2: `C:/Users/cg/Downloads/1000387329.jpg`.
- Stakeholder reference: [Afiniti](https://www.afiniti.com/).
- Screenshot 1 shows a forwarded file named `Screenshot 2026-10-16 at 4.29.58 PM.png` (3.4 MB). Its full contents were not supplied separately and cannot be inferred from the file card.
- Screenshot 2 includes a small embedded footer reference. Its overall structure is visible; tiny individual labels should not be treated as a complete transcription.
- The screenshots overlap. Repeated messages are recorded once below. Any cropped message without readable content is excluded.
- Scope of this agenda is the Nyrix repository provided. Additional sites, if any, need a separate inventory.

## 3. Stakeholder message register

The following records the visible messages in reading order, with their practical implications.

| ID | Message / source detail | Requirement or implication |
| --- | --- | --- |
| S01 | `https://www.afiniti.com/` | Review Afiniti as the supplied enterprise reference. |
| S02 | Forwarded PNG file card described above | There is another referenced visual, but its full contents are unavailable here. |
| S03 | "If you have better, go for it." | Better design directions are welcome; Afiniti is inspiration rather than a compulsory copy. |
| S04 | "Idea is to make clean, enterprise-style site." | Enterprise positioning and visual restraint are central objectives. |
| S05 | "Where team pictures can have space, advisor space, podcast space, our content that we write or publish" | Provide deliberate space for team photography, advisors, podcasts, and authored/published content. |
| S06 | "This was the reference, that this afiniti" | Afiniti is the named reference for the brief. |
| S07 | "They have changed their site a lot, before it was one classy site." | The stakeholder preferred an earlier version. Today's website is not an exact representation of that earlier design. |
| S08 | "But go through it" | Review the reference before choosing the new structure. |
| S09 | "you will get an idea about the structure" | Learn from its information architecture and organization. |
| S10 | "And it shouldn't be parallax or everythin on home page." | Avoid parallax. Distribute full content across dedicated pages instead of putting everything on the homepage. |
| S11 | "Keep it simple and minimal" | Apply simplicity to layout, navigation, typography, and interaction. |
| S12 | Footer image plus: "An all in one footer like this is also, a non-negotiable for the enterprise design" | A comprehensive, grouped enterprise footer is mandatory. |

## 4. Direct user requirements

- Read both screenshots thoroughly and create a Markdown agenda for the revamp.
- Treat the current agency-style appearance as the starting problem and enterprise presentation as the destination.
- **We will use `/hallmark` extensively throughout the revamp. If it is not already downloaded/installed, we will download/install it before using it.**
- This request produces planning documentation. It does not require implementing the revamp in this turn.

## 5. Mandatory design and content requirements

- [ ] Establish a clean, enterprise-style visual direction.
- [ ] Keep the experience simple and minimal.
- [ ] Use a genuine multipage structure with meaningful page destinations.
- [ ] Avoid parallax effects.
- [ ] Keep the homepage selective; use previews linking to full pages.
- [ ] Provide proper space for real team photography and profiles.
- [ ] Provide a distinct advisor area.
- [ ] Provide a podcast area.
- [ ] Provide an area for content Nyrix writes or publishes.
- [ ] Deliver a comprehensive footer across the site.
- [ ] Use Afiniti for structural inspiration while allowing a better original direction.
- [ ] Use `/hallmark` extensively, with availability/setup handled before design execution.

## 6. Current repository observations

These are observations from source files, not a visual audit of the deployed site.

- `src/App.js` renders Hero, About, Products, Services, Agents, Case Studies, Contact, and Footer together on the homepage.
- Separate routes already exist for the agents gallery, four service detail pages, two case studies, and the privacy policy. Build on that foundation rather than assuming the site has no routing.
- `src/components/Header.js` sends most navigation items back to homepage sections using programmatic scrolling. Replace this pattern where dedicated enterprise pages are introduced.
- `src/components/Footer.js` already contains grouped links, but several are homepage fragments or legal placeholders. Expand and reconcile it with the final sitemap.
- The README emphasizes animation, glass effects, gradients, and agency/service presentation. Reconcile documentation with the implemented enterprise direction after the revamp; do not assume every README claim reflects the current UI.
- Existing React, React Router, Tailwind, and Framer Motion dependencies provide an implementation starting point. A framework migration is not a stakeholder requirement.

## 7. Afiniti reference review

The current [Afiniti homepage](https://www.afiniti.com/) was reviewed on 16 October 2026. It organizes navigation around company information, products, industries, testimonials, and resources, with a prominent demo action. Its footer groups products, company, guides, and resources, followed by contact and legal links.

Apply the organizational principle to Nyrix: clear company information, clearly explained offerings, accessible resources, and a footer that acts as a site directory. These observations concern current page content and structure; they do not establish the exact appearance of the older version mentioned by the stakeholder.

Do not copy Afiniti's product names, sector claims, metrics, or content. Footer labels must reflect Nyrix's actual pages. A dark footer is a visual option from the reference, not an explicit mandatory color requirement.

## 8. Proposed information architecture

This sitemap is a recommendation for discussion, not a stakeholder-specified list of exact routes.

| Area | Proposed pages | Purpose |
| --- | --- | --- |
| Home | `/` | Concise company introduction, selected offerings, proof, people/content previews, and contact action. |
| Company | `/company`, `/company/team`, `/company/advisors` | Company story, real team photos and profiles, separate advisor presentation. |
| Products | `/products`, individual product pages where justified | Explain actual products and who they help. |
| Solutions / Services | `/solutions`, existing service pages retained or deliberately mapped | Explain capabilities, business problems, delivery approach, and outcomes. Final label depends on the actual business offering. |
| Case Studies | `/case-studies`, existing detail pages | Present approved evidence and project outcomes. |
| Resources | `/resources`, `/resources/articles`, article detail pages | Organize original articles and externally published work. |
| Podcasts | `/resources/podcasts`, episode detail pages | Give podcasts a dedicated discoverable home. |
| Contact | `/contact` | Dedicated enterprise inquiry/demo destination. |
| Legal | Existing `/privacy-policy`; other approved policy pages as needed | Provide real policy destinations without placeholder links. |

Suggested header: Company, Products, Solutions, Case Studies, Resources, and a Contact / Book a Demo action. Team and Advisors belong under Company; Podcasts belongs under Resources. Simplify the final navigation if some categories lack sufficient content.

### Homepage outline

1. Clear headline explaining what Nyrix does and for whom, with one primary action.
2. Brief company/capabilities introduction.
3. Selected product and solution previews linking to detail pages.
4. Approved evidence or featured case studies.
5. Small team/advisor preview linking to the dedicated spaces.
6. Selected article/podcast previews linking to the resource library.
7. Short contact invitation and the full enterprise footer.

Keep previews brief. Full biographies, the complete offering catalog, articles, and episode content belong on their respective pages.

## 9. Enterprise visual direction

The following are implementation recommendations derived from the requested clean, minimal style:

- Use consistent grids, generous spacing, restrained colors, readable type, and a clear heading hierarchy.
- Use authentic company and team imagery with consistent crops and image quality.
- Replace decorative effects that compete with content or reinforce an agency landing-page appearance.
- Reserve subtle motion for useful feedback and navigation; respect reduced-motion preferences. No parallax.
- Keep copy specific, factual, and oriented toward enterprise buyer questions.
- Use approved evidence only. Do not invent client logos, certifications, security guarantees, testimonials, or performance statistics.
- Design desktop, tablet, and mobile layouts together; preserve simple navigation on small screens.

## 10. Mandatory footer specification

Create a shared footer that serves as a complete, organized directory on every public page.

Proposed groups:

- **Brand:** Nyrix identity and a short factual description.
- **Offerings:** real product and solution/service destinations.
- **Company:** About, Team, Advisors, and other approved company pages.
- **Resources:** Articles/Publications, Podcasts, and Case Studies.
- **Contact:** contact page, approved business email, and verified social links.
- **Legal strip:** privacy policy, any other published policies, and copyright.

Acceptance requirements:

- [ ] All important sections can be reached from the footer.
- [ ] Links point to real destinations and work from nested pages.
- [ ] No empty links, nonexistent policy anchors, or invented compliance pages.
- [ ] Clear grouping and hierarchy match the all-in-one reference principle.
- [ ] Mobile layout remains readable and keyboard accessible.
- [ ] Shared styling and content remain consistent across routes.

## 11. Content and asset collection

| Content | Required inputs |
| --- | --- |
| Company | Approved positioning, description, business focus, and contact details. |
| Team | Approved names, roles, bios, photos, display order, and permission to publish. |
| Advisors | Names, roles/expertise, bios, portraits, and approved affiliations. |
| Podcasts | Series/episode titles, descriptions, guests, dates, artwork, audio/video links, and transcripts where available. |
| Articles/publications | Titles, authors, dates, summaries, body copy or external publication URLs, and thumbnails. |
| Products/solutions | Actual offering names, intended audience, capabilities, business value, and suitable calls to action. |
| Proof | Approved case studies, attributable results, testimonials, and authorized logos. |
| Legal | Approved policies and any required updates to reflect the actual site. |

Recommend reusable templates/data models for people, articles, episodes, offerings, and case studies. Choose a CMS or repository-managed content approach based on publishing needs; a CMS has not been mandated.

## 12. `/hallmark` workflow commitment

**Use `/hallmark` extensively throughout the revamp. If it is missing, download/install it before the design work begins.**

1. Check the project and active environment for the intended `/hallmark` command, skill, or package.
2. If absent, identify the correct trusted source and follow its documented download/install steps. The exact package/source is not established by the screenshots or user message; do not guess a similarly named dependency.
3. Read its instructions and establish the supported workflow.
4. Use it across design exploration, enterprise layout refinement, reusable page/component work, and visual review wherever its actual capabilities support those tasks.
5. Record the source/version, setup steps, and usage notes so the workflow is reproducible.
6. Evaluate its output against this brief: minimal, multipage, no parallax, dedicated people/content spaces, and comprehensive footer.

Setup completed on 16 October 2026: the official Hallmark skill and references were downloaded from `Nutlope/hallmark` into `.agents/skills/hallmark/`. Seven supporting skills were also installed. See `SKILLS_SETUP.md` for sources and `AGENTS.md` for task routing. Website redesign work and extensive Hallmark usage remain implementation tasks.

## 13. Execution agenda

| Phase | Actions | Reviewable output |
| --- | --- | --- |
| 1. Discovery and setup | Audit routes, UI, links, assets, copy, existing content, and `/hallmark` availability; complete its setup if missing. | Current-state inventory, confirmed tool setup, and content gaps. |
| 2. Structure and positioning | Finalize navigation, sitemap, buyer-facing messaging, URL preservation/redirect plan, and content ownership. | Sitemap, content outline, and route mapping. |
| 3. Design direction | Use `/hallmark` extensively to establish type, colors, spacing, imagery, homepage, inner-page templates, and footer. | Reviewable desktop/mobile designs and reusable design rules. |
| 4. Build | Implement shared shell, dedicated pages, content templates, people sections, resource/podcast areas, and contact flow. | Functional enterprise site in a review environment. |
| 5. Content integration | Add approved real content and assets; remove placeholders and unsupported claims. | Publication-ready pages with verified destinations. |
| 6. Verification | Review responsive layouts, accessibility, reduced motion, links, forms, media, performance, metadata, redirects, and direct route loading. | QA checklist and resolved defects. |
| 7. Launch preparation | Obtain stakeholder review, document editing instructions, prepare release and rollback steps. | Approved release candidate and launch checklist. |

No deadline or fixed effort estimate was supplied; sequence work around content readiness and review milestones.

## 14. Decisions to resolve before implementation

- Confirm the intended `/hallmark` source if it cannot be identified locally.
- Confirm whether the older Afiniti design or separately forwarded PNG is available if closer visual matching is desired. Existing screenshots are sufficient for this planning brief.
- Confirm the exact business positioning and whether navigation should say Products, Solutions, Services, or a combination.
- Confirm the people and publishing assets ready for launch and who maintains them.
- Confirm the primary conversion action and actual form/scheduling destination.
- Confirm brand constraints, publishing workflow, timeline, and stakeholder review owner.
- Confirm whether additional websites are included beyond this Nyrix repository.

## 15. Completion criteria

- [ ] The website presents Nyrix as a credible enterprise company with a coherent visual system.
- [ ] A visitor can understand the company and its offerings without navigating a long all-content homepage.
- [ ] Dedicated team, advisor, podcast, and publication spaces exist and are discoverable.
- [ ] No parallax is present; interaction remains restrained and usable.
- [ ] The comprehensive footer works on every page and matches the final sitemap.
- [ ] Existing valuable pages/URLs are preserved or intentionally redirected.
- [ ] Published content and claims are approved and factual.
- [ ] Responsive, accessibility, navigation, form, and route-loading checks pass.
- [ ] `/hallmark` has been used extensively and its setup/usage is documented.

## 16. Immediate next actions

1. Review this agenda against the stakeholder screenshots.
2. Inventory existing content and collect missing team, advisor, podcast, and publication material.
3. Read the installed Hallmark skill and apply the task routing in `AGENTS.md` (download/setup is complete).
4. Finalize sitemap and content priorities.
5. Produce the enterprise homepage, inner-page, and footer design direction before implementation.

## 17. Discovery completed

On 16 October 2026, the current source was indexed and enterprise references were researched across live company sites, Dribbble, Behance, and Pinterest. This establishes a research baseline, not an approved design or a completed production visual audit.

- [Codebase map and design diagnosis](docs/revamp/CODEBASE_INDEX.md)
- [Generated source, route, and asset inventory](docs/revamp/SOURCE_INVENTORY.md)
- [Inspiration research and recommended approach](docs/revamp/INSPIRATION_RESEARCH.md)
- [Machine-readable index](docs/revamp/codebase-index.json)

The recommended reference combination is Quantexa, Thoughtworks, Faculty, and Afiniti, adapted to Nyrix's actual content and enterprise brief. See the research report for evidence limits and working recommendations.
