# Nyrix — media-led enterprise design system

Revision NYX-209, 16 October 2026. User rejected the earlier generic lavender/diagram direction. This replaces that direction; stakeholder approval of the new rendering remains pending.

- White editorial introduction, compact navigation, large original campaign artwork, media-led capabilities, selected work and dedicated people/resource pages. No parallax.
- Display: IBM Plex Sans, normal roman 400–500. Body/navigation: Inter 400–500. Headings use deliberate line breaks and restrained tracking; footer directory remains readable at 14px.
- Shared semantic tokens in enterprise.css: white, neutral soft gray #f5f5f7, ink #202027, purple #7045ba, dark #18171d. Purple anchors the material artwork and selected interactions, rather than tinting entire pages.
- Two inspected generated brand artworks: machined charcoal/violet architectural folds (hero/footer crop), white paper folds threaded by a violet path (capabilities). These are conceptual campaign assets, not product photographs, screenshots or proof of company facilities.
- Assets: public/media responsive 768/1536 WebP variants, explicit dimensions, hero high fetch priority, support/footer lazy loaded. Original generation masters preserved under Codex generated_images. See docs/revamp/MEDIA_GENERATION.md.
- No fake product screens, generated people, fabricated metrics, drawn hero network or decorative footer node diagram. Actual team portraits, TNQ artwork and public articles retained.
- Shared comprehensive footer and real route navigation across pages. Agents gallery uses shared tokens, real records, labeled filters, semantic controls, visible previous/next actions and reduced-motion-aware scrolling.
- Optional Veo motion is a future asset delivery; no video generated or integrated yet. Keep media static until a suitable loop exists; no CSS parallax used as a substitute.
- Build/DOM regression evidence is independent from visual approval. Browser access has been declined, so desktop/mobile screenshot QA is still open.
