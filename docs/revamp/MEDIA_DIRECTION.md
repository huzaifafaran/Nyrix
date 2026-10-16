<!-- Hallmark · pre-emit critique: P5 H5 E4 S4 R5 V4. Brief reviewed; generated outputs have not been inspected. -->

# Nyrix media direction

Task: NYX-206. Direction reviewed by lead, 16 October 2026. Assets remain proposed; this brief does not claim media has been generated or visually approved.

Use media to explain Nyrix's work and show its people. Keep the existing light enterprise system: white `#ffffff`, pale lavender `#f5f3f9`, dark ink `#201a2c`, restrained purple `#7045ba`. Purple should occupy roughly 5% or less of the frame. The site supplies headings and captions in HTML; generated images contain no words or logos.

## What earns space first

1. Actual product captures: a representative workflow or useful output from Kinlu, Artifex or Numaya, supplied by the product owner. Use an authorized demo account; remove personal data, credentials and customer identifiers. Do not invent screens or fabricate output to fill a screenshot.
2. Real team photography and TNQ episode artwork: preserve identity and source attribution. A higher resolution Sarim portrait and approved advisor photos are more useful than generated people. Do not generate substitute faces.
3. One conceptual hero visual, then one supporting visual if the page needs it. These explain data, decisions and workflows; they are not evidence of product functionality or customer results. Label them as conceptual where the context could be mistaken for a product capture.

Do not add both conceptual assets to every page. Keep the homepage selective. The existing semantic SVG hero is a valid fallback; replace it only if the new asset explains the same idea more clearly at mobile size. For exact diagrams, hand-authored SVG is preferable to a raster generator.

## Static A — Data becomes a decision

**Placement:** homepage hero's media column; replaces the current diagram only after comparison. One composition, no text overlay. Maintain the page's separate HTML explanation.

**Output:** 1600 × 1200 px, 4:3, opaque white background. Keep essential shapes in the central 75% so a tighter mobile crop remains intelligible. Request one final image and one simplified variant with fewer input marks.

**Copy-ready prompt:**

> Create an original editorial illustration for Nyrix, an enterprise company working with predictive insights and intelligent workflows. Show an intelligible left-to-right transformation: several short, neatly aligned rows of small rectangular data marks enter a narrow rectangular processing junction; two clearly separated fine-line paths emerge on the right, each ending in a simple square action marker. The paths communicate selecting a useful course of action from structured inputs. Use flat precise geometry, careful spacing, one consistent line weight, and a quiet asymmetrical composition with generous white space. Background #ffffff, secondary surfaces #f5f3f9, lines #201a2c, one selected route in #7045ba occupying less than five percent of the canvas. Crisp matte finish, no perspective, no depth effects. No text, numbers, icons, interface chrome or logos. This is a conceptual illustration, not a screenshot. Landscape 4:3, sharp at small sizes, restrained and appropriate beside enterprise typography.

## Static B — A workflow with a human checkpoint

**Placement:** `/solutions` or an individual relevant offering, beside an explanation of automation and review. Use once; do not imply that every product exposes this exact workflow.

**Output:** 1600 × 1000 px, 8:5, opaque pale lavender background. Central subject with 12% safe margins. Provide a small thumbnail preview before final export.

**Copy-ready prompt:**

> Create an original minimal editorial schematic for an enterprise intelligent-workflow page. Depict three simple horizontal stages: an incoming stack of thin rectangular sheets, a compact branching junction, and two orderly outgoing document stacks. At the branching junction, a small square checkpoint interrupts the otherwise continuous connector, suggesting a deliberate review before work continues. Keep the flow legible without labels. Use a sparse two-dimensional composition, consistent fine dark lines, squared corners with only a slight radius, and precise alignment. Flat background #f5f3f9, sheet surfaces #ffffff, ink #201a2c, a single short connector in #7045ba. No texture, shadows, gradients, glow, perspective, floating objects, human figures or icons. No text, numbers, logos, dashboards or fabricated metrics. Landscape 8:5. This is a conceptual explanation of workflow structure, not a rendered product interface.

**Shared rejection criteria:** no robots, brains, circuit-head silhouettes, neon, luminous orbs, particle clouds, shiny glass tubes, impossible 3D machinery, generic laptop mockups, fake dashboards, decorative charts, stock boardroom scenes, generated faces, made-up customers, claims, seals or certification marks. Remove any accidental glyphs. If the composition is merely decorative, retain the existing SVG instead.

## Optional Veo clip — one quiet workflow cycle

Motion is optional. First approve Static A as a poster. No parallax, scroll-linked camera, scroll hijacking, animated page reveals or video background behind copy. A short, independently controlled illustration is the only proposed use.

**Copy-ready prompt (attach approved Static A as reference):**

> Animate this exact enterprise schematic for a seamless seven-second loop. Lock the camera completely; preserve the composition, shapes, line weights and colors. During the middle of the shot, one small dark rectangular data marker moves slowly along the existing input connector, passes through the central junction, and continues along the existing purple selected route to its square endpoint. The endpoint briefly changes from pale lavender to purple, then returns to the original appearance. Start and end on precisely the supplied static frame with a brief still hold. All other objects remain still. White #ffffff background, pale lavender #f5f3f9, dark ink #201a2c, restrained purple #7045ba. No camera movement, zoom, parallax, cuts, new shapes, morphing, glow, particles, added text, logos or audio. Flat crisp editorial line art. The result must remain understandable as a still image.

**Delivery and integration requirements:**

- Master: 6–8 seconds, 4:3, 24 fps, 1440 × 1080 or higher; no audio track. Export a same-composition PNG poster. Exact dimensions are delivery targets, not assumed generator controls; crop/export after generation if needed.
- Web derivatives: H.264 MP4 and optionally WebM, 960 × 720, target at most 1.5 MB; prefer the poster if acceptable quality cannot fit that budget. Keep an original master outside the public bundle.
- Default to a static poster with an explicit play/pause control. No automatic motion is required. With reduced motion or data saving enabled, use the poster and avoid loading the clip until requested. Pause when offscreen; lazy-load below-fold media and use `preload="none"` for video.
- Reserve aspect ratio to prevent layout shift. All essential explanation stays in HTML. An accompanying conceptual visual may be decorative (`alt=""`) when the adjacent text supplies its meaning; otherwise give a concise description. Do not hide meaningful explanations inside video.

## Antigravity handoff

Send the selected prompt, this palette and an image of the current page to the tool/account you use. Ask it to produce **assets only**, not edit the repository or redesign the site. No credentials or account access need to be shared.

> Generate Static A first and return a preview plus the uncompressed original. Match the supplied palette and the existing page's restrained enterprise aesthetic. Do not create UI screens, people, claims or a new brand system. If raster generation blurs or distorts the lines, return a clean standalone SVG built from explicit vector paths instead, with no embedded scripts, fonts or external resources. Do not modify application code. Include the final dimensions and any generation limitations. Wait for asset review before producing animation.

Return assets with descriptive names such as `nyrix-decision-flow-master.png`, `nyrix-workflow-review-master.png`, and optionally `nyrix-decision-flow-loop.mp4` plus its poster. The implementation lead owns optimization, placement and code integration. Antigravity has not been contacted or dispatched by writing this brief.

## Review before integration

- Can a visitor explain what the composition shows within a few seconds at 320 px? Are connectors unambiguous and free of broken geometry?
- Does it match the existing palette and spacing without competing with the headline? Check both desktop and mobile crops.
- Is it clearly conceptual, with no unverified product, security or performance implications?
- Are original assets preserved, source/model details recorded, and practical usage rights checked for the chosen generator/account?
- Export static web assets as AVIF/WebP where appropriate: target roughly 80–180 KB each, retain crisp lines, and provide explicit dimensions. Prefer SVG for deterministic line diagrams; sanitize external SVG before use.
- Verify actual rendering, image loading, reduced motion, focus and play/pause behavior after integration. This document alone does not verify those behaviors or mark media production complete.
