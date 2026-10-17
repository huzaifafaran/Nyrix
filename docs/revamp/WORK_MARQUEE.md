<!-- Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 -->
# Work strip media record

Current revision NYX-232: the label is “We’ve worked with”, a small sentence-case heading separated above the moving band. The user explicitly asked for inclusive wording covering proofs of concept and other work, and confirmed Vintage Biryani as another organization to include. Its mark comes from the supplied poster and is saved as `public/media/logo-vintage-biryani-transparent.png`; extraction prompt, alpha checks and fidelity limits are in [VINTAGE_BIRYANI_LOGO.md](VINTAGE_BIRYANI_LOGO.md). All four marks are displayed in grayscale. This revision supersedes the heading recorded below.

17 October 2026. The three marks came from images the user supplied in this chat: Gerry’s dnata (`codex-clipboard-73e73a3d...png`), TeachMeBack (`codex-clipboard-9e68b86c...png`) and GENIX (`codex-clipboard-c804815d...png`). Original copies are kept as `public/media/logo-gerrys-dnata.png`, `logo-teachmeback.png`, and `logo-genix.png`. Gerry’s dnata was explicitly named by the user as work to include. GENIX and TeachMeBack are also tied to the existing case-study records. The heading reads “Selected collaborations and projects.” It does not claim endorsement, client count, or product usage.

The Gerry’s dnata and GENIX source images had opaque white backgrounds. Built-in ImageGen edited each to an alpha-transparent derivative used by the strip: `public/media/logo-gerrys-dnata-transparent.png` and `public/media/logo-genix-transparent.png`. TeachMeBack was already transparent. The visible near-black/gray rendering comes from CSS grayscale/brightness, leaving the stored color marks available for comparison. Generated cutouts should receive a brand-fidelity check before publication because generative isolation can subtly alter lettering.

ImageGen edit prompts:

- Gerry’s dnata: “Remove only the white background to a genuine fully transparent alpha channel. Preserve the exact Gerry’s script lettering and the dnata lettering, spacing, shapes, and color; do not redraw, retype, reinterpret, or add anything. Keep crisp logo edges and no white matte or rectangle.”
- GENIX: “Remove only the white background to a genuine fully transparent alpha channel. Preserve the precise original black letterforms, stylized X, red circular dot, red underline strokes, proportions and spacing. Do not redraw, retype, reinterpret or add anything. Crisp clean transparent alpha edge, no white matte or rectangle.”

Both outputs were inspected and their corner alpha pixels verified as transparent. Browser visual QA of the moving strip is still open because localhost browser access was denied earlier in this task.
