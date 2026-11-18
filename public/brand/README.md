# Nyrix text-only wordmark

The existing `nyrix.` lettering, converted to vector outlines from IBM Plex Sans SemiBold (600). Tracking preserves the website's −1.5px setting at a 29px type size. These exports add no symbol or monogram.

- `nyrix-wordmark-black.svg` / `.png`: black lettering, transparent background.
- `nyrix-wordmark-white.svg` / `.png`: white lettering, transparent background.
- `nyrix-wordmark.svg`: vector master inheriting `currentColor` when embedded inline.
- `nyrix-app-icon.svg`: complete lettering on a white platform canvas.
- `nyrix-app-icon-maskable.svg`: complete lettering within the maskable safe area.
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-64.png`: browser-size exports.

All SVG lettering uses paths and needs no font download. Preserve its aspect ratio and use black on light or white on dark.

Typeface source: [IBM/plex](https://github.com/IBM/plex), commit `bc6a7e4b37634eb79785d59781893db63ee3edcb`, `packages/plex-sans/fonts/complete/otf/IBMPlexSans-SemiBold.otf`. The original font's SIL Open Font License is retained in `IBM-Plex-OFL.txt`. These lettering documents do not redistribute a modified font or claim affiliation with IBM.
