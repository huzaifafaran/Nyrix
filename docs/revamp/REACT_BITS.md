# React Bits source integration

Reviewed 17 October 2026. This is selective source reuse inside the existing React 18 application, without new runtime packages or global MCP configuration.

## Components and integration contracts

- `src/components/reactbits/BlurText.js`: default export `BlurText({ text, className })`. Renders an inline span suitable inside a real h2. Adapted from [official BlurText registry](https://reactbits.dev/r/BlurText-JS-CSS.json): retains word decomposition, screen-reader text and once-only IntersectionObserver triggering. Replaced `motion/react` with the installed `framer-motion`; removed blur, transforms, replay, looping and interaction options. Only a short opacity reveal is retained. Text is visible before observer execution and when IntersectionObserver is unavailable. Reduced motion bypasses the effect; CSS additionally forces full opacity. The historical upstream component name does not imply blur remains enabled.
- `src/components/reactbits/SpotlightCard.js`: default export `SpotlightCard({ children, className })`. Div wrapper preserving child links and keyboard focus. Adapted from [official SpotlightCard registry](https://reactbits.dev/r/SpotlightCard-JS-CSS.json): retains relative pointer-coordinate calculation and radial light construction. Simplified to local pointer updates and a 10% accent highlight; removed window listeners, proximity tracking, animation loop, flare, grain and alternate themes. CSS gates visibility to fine-pointer hover and disables it for reduced motion. Decorative layer does not intercept input. Use only for selected work, not every collection.
- Both import scoped `reactbits.css`; the existing `--color-accent` token supplies artwork color. Text colors, card spacing, border and typography remain owned by the integrating component.

## License

The official repository's current license is **MIT + Commons Clause License Condition v1.0**, copyright 2026 David Haz. It permits modification and use as part of an application or website, including commercial use, but restricts selling/sublicensing/redistributing the components themselves. This is not plain MIT. Full upstream notice is retained in `src/components/reactbits/LICENSE.react-bits.txt`.

Source: [official repository license endpoint](https://api.github.com/repos/DavidHDev/react-bits/license). Registry JSON was inspected as inert source, not executed or installed automatically. These are deliberately modified derivatives, not unchanged upstream components.

## Verification scope

Lead integration/build/regression results belong in conversation.md. Source review checks show no new dependency, global listener, perpetual animation loop or fake product content. Browser rendering and hover appearance require actual permitted browser review and are not claimed by this document.
