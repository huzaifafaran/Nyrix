# Nyrix — media-led enterprise design system

Revision NYX-209, 16 October 2026. User rejected the earlier generic lavender/diagram direction. This replaces that direction; stakeholder approval of the new rendering remains pending.

- White editorial introduction, compact navigation, large original campaign artwork, media-led capabilities, selected work and dedicated people/resource pages. No parallax.
- Display: IBM Plex Sans, normal roman 400–500. Body/navigation: Inter 400–500. Instrument Serif is a limited third-font accent for one emphasized headline word per major route, following the user's chosen hero motif. Headings use deliberate line breaks and restrained tracking; footer directory remains readable at 14px.
- Shared semantic tokens in enterprise.css: white, neutral soft gray #f5f5f7, ink #202027, purple #7045ba, dark #18171d. Purple anchors the material artwork and selected interactions, rather than tinting entire pages.
- Two inspected generated brand artworks: machined charcoal/violet architectural folds (hero/footer crop), white paper folds threaded by a violet path (capabilities). These are conceptual campaign assets, not product photographs, screenshots or proof of company facilities.
- Assets: public/media responsive 768/1536 WebP variants, explicit dimensions, hero high fetch priority, support/footer lazy loaded. Original generation masters preserved under Codex generated_images. See docs/revamp/MEDIA_GENERATION.md.
- No fake product screens, generated people, fabricated metrics, drawn hero network or decorative footer node diagram. Actual team portraits, TNQ artwork and public articles retained.
- Shared comprehensive footer and real route navigation across pages. Agents gallery uses shared tokens, real records, labeled filters, semantic controls, visible previous/next actions and reduced-motion-aware scrolling.
- Optional Veo motion is a future asset delivery; no video generated or integrated yet. Keep media static until a suitable loop exists; no CSS parallax used as a substitute.
- Build/DOM regression evidence is independent from visual approval. Browser access has been declined, so desktop/mobile screenshot QA is still open.

## Reference lander revision — NYX-212, 17 October 2026

The user supplied an explicit Nyrix hero reference and requested its design language, retaining current content/navigation. This supersedes the earlier separate white intro/dark hero media block: continuous pale canvas, compact nav, left-biased Inter headline, dark pill CTA, quiet gray supporting copy and a large flowing violet ribbon at right/bottom. Existing inner-page token system and comprehensive footer remain coherent. See docs/revamp/LANDER_STUDY.md for evidence/limits.

Original generated violet ribbon media is integrated via HeroRibbon with a time-varying GPU deformation, not a static panning image. Pause control, reduced-motion/save-data fallback, missing-WebGL fallback and offscreen/hidden suspension are required. No parallax. Screenshot font identification and unobserved motion are not claimed. Supplied footer video is being finalized separately under NYX-213.

## Button Geometry & Curvature Standard (17 October 2026)

- **Consistent Rounded Rectangles**: All interactive buttons, action controls, CTAs, navigation triggers, and inputs across all pages follow a unified rounded-rectangle geometry.
- **Tokens**:
  - Buttons / Controls / Toggles: `var(--radius-small)` = `8px` (no sharp square boxes `0px` and no oversized full-capsule/circular pills `999px` on text buttons).
  - Cards / Panels / Containers: `var(--radius-card)` = `12px`.
  - Icon Badges / Small status tags: `6px` to `8px`.
  - Profile photos / Monograms: preserved circular (`50%`) exclusively for human headshots/avatars.


## Decorative Background Continuity & Seamless Transitions

- **No Accidental Container Boundaries**: Decorative elements must never reveal accidental container boundaries, rectangular bounding boxes, or harsh clipping artifacts.
- **Organic & Natural Terminations**: Background waves, curves, subtle gradients, and abstract atmospheric shapes must terminate organically or fade naturally into surrounding surfaces (via continuous SVG bezier geometry, alpha-fade masks, or matching surface backgrounds).
- **No Unintended Hard Cuts**: No unintended hard vertical or horizontal cuts in decorative background layers across any section or component.
- **Deliberate Section Transitions**: Adjacent sections must have visually deliberate transitions. Shared ambient wave surfaces must gracefully blend into adjacent section background tones before reaching boundary edges.
- **Restraint & Palette Consistency**: Decorative backgrounds should remain subtle, lightweight, and strictly consistent with Nyrix's existing white-and-lavender design language.
- **No Concealment Hacks**: Avoid heavy blurs, glowing borders, excessive gradients, or unnecessary decorative clutter just to mask or conceal underlying seams. Fix underlying positioning, geometry, masking, and stacking contexts directly.
- **Varied Treatments with Cohesion**: Use varied treatments across sections (multi-peak ripples, organic S-curves, sweeping ambient ribbons) while maintaining a cohesive, unified visual identity.
- **Cross-Breakpoint Continuity**: Check background continuity and visual flow across desktop, tablet, and mobile breakpoints (320px, 375px, 414px, 768px, 1024px, 1440px).
- **Zero-Tolerance Quality Standard**: Treat visible decorative seams, accidental clipping, and container boundaries as visual defects during all current and future UI development.

## Mandatory media and spacing direction — user correction, 17 October 2026

- Each distinct page subject must have relevant original generated campaign media or real approved source media. Never repeat the hero ribbon/paper artwork as generic filler across unrelated subpages. A subject's own artwork may appear as a preview and on its matching detail page. Shared palette/material/light creates coherence; repeating the same picture does not.
- Text is strictly black on light backgrounds and white on dark backgrounds (`#000000` / `#ffffff`), with NO exceptions, even on hover effects. Hover interactions may invert colors, adjust background fills, scale, or shift opacity, but text itself must NEVER turn purple, blue, or any other accent color.
- Copy economy & conciseness: Use the absolute minimum text necessary to communicate the message clearly. No multi-line paragraph clutter inside navigation menus, cards, or UI controls.
- Purple is reserved exclusively for media artwork, organic background ribbons/curves, borders, and graphic underlines/indicators.
- One shared ContactPrompt spacing contract across dedicated pages: heading margin-bottom18px, copy line-height1.7, button margin-top28px (24pxmobile), panel padding28–48px. Avoid relying on browser paragraph margins. Homepage section rhythm36pxmobile/40–68pxdesktop; no large blank spacer sections.
- Header links centered independently of brand/contact. Top header is transparent over the hero; after24pxscroll a surface slides/fades down, with stable navigation geometry. No visible motion controls by explicit user request; automatic reduced-motion/save-data/offscreen/hidden safeguards remain.
- Homepage features current offerings Kinlu/Numaya only; Artifex/Veeko remain discoverable in product directory as Shelved, without launch/access CTA.
- React Bits registry is configured locally in components.json; actual shadcn MCP initialize/tools-list/search/view calls succeeded through read-only stdio session. Evidence: docs/revamp/react-bits-mcp-results.json. No persistent global client connection or restart is implied.

## Footer correction — NYX-229, 17 October 2026

- The user rejected the circuitry-film overlay behind the directory. The footer now has two distinct zones: a short, full-width dark-glass invitation with GSAP entrance/quiet ambient motion, then the complete link/contact/legal directory on a solid dark surface. The old footage is not mounted.
- Preserve every existing destination and line of content in the directory. Keep white text and violet accents, and compress vertical spacing so the footer does not become an empty second page.
- The new dark-glass aperture is a conceptual campaign image, made specifically for the footer. It is not a photo of a Nyrix facility or product. GSAP is scoped to the footer component, pauses ambient animation offscreen/hidden, and leaves static content visible under reduced motion/save data.
- Kinlu and Numaya homepage previews use separately cleaned copies of public-site screenshots, with the Windows activation text removed; original captures remain in public/media for provenance.

## Motion, directories and work strip — NYX-230/231, 17 October 2026

- Homepage sequence: hero, monochrome work strip, “What we do”, current products, selected work, people, podcast, contact. A compact sentence-case “We’ve worked with” label sits separately above the moving strip between short neutral rules. It covers the user-confirmed breadth of engagements, including proofs of concept, without implying production deployment or endorsement. Gerry’s dnata, GENIX, TeachMeBack and Vintage Biryani use supplied marks rendered gray/near-black on white; extracted transparent assets retain provenance records.
- Product and solutions directories use four stable, subject-specific card compositions rather than an identical repeated row. Dark cards always use white text; light cards use black text. Distinct product/service imagery remains tied to its actual subject.
- The homepage capability list has one restrained dark inversion and one neutral surface variation. UI icons there are black on light and white on dark, never purple.
- GSAP gently animates footer invitation, footer directory entrance, visible ambient SVGs/card waves and selected card entrances. Decoration suspends offscreen/hidden and is static for reduced-motion or save-data users. No parallax and no visible motion control.
- Compact navigation at 900px and below contains only the six primary destinations and contact, without nested submenus. Desktop keeps the documented hierarchy.
- The branded loader covers the app until document, fonts, lazy route and above-fold images are ready, then exits before exposing interaction. Browser-level loading and responsive appearance remain to be checked in an authorized visual session.
