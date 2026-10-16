# Revamp skill setup

Installed: 16 October 2026. Scope: this repository, `.agents/skills/`.

Eight complete skill directories were downloaded with the bundled Codex skill-installer from the upstream GitHub `main` branches. Supporting files present in each selected skill directory were included. No third-party installation script was executed. Application dependencies were not changed.

## Selected skills and rationale

| Directory | Upstream source | Why it helps this revamp |
| --- | --- | --- |
| `hallmark` | [Nutlope/hallmark](https://github.com/Nutlope/hallmark/tree/main/skills/hallmark) | Primary visual audit, reference study, redesign, shared tokens, and design critique. |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Supports intentional typography, layout, imagery, and restrained visual craft. |
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | React performance and rendering guidance; apply the subset relevant to this client-rendered app. Frontmatter name: `vercel-react-best-practices`. |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Interface, accessibility, focus, forms, and interaction review. Fetches current upstream guidelines when used. |
| `webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | Browser verification, screenshots, interaction checks, and server helper scripts. |
| `site-architecture` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/main/skills/site-architecture) | Directly supports moving from homepage sections to coherent page hierarchy, navigation, and internal links. |
| `copywriting` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting) | Refines positioning, page copy, headings, and calls to action for enterprise buyers. |
| `seo-audit` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/main/skills/seo-audit) | Protects discoverability while routes/content change and supports technical/on-page review. |

Selection is based on the upstream skill contents and the Nyrix brief, not popularity counts. The existing `.agent/skills/` collection already has some overlapping skills; it was left intact. The fresh `.agents/skills/` set is the canonical selection for this revamp and is routed by root `AGENTS.md`.

## Usage

- Skills should be discoverable on the next turn. Root `AGENTS.md` also points to their exact files so future agents can load them directly.
- Hallmark is an agent instruction skill, not a website library or standalone CLI. Read `.agents/skills/hallmark/SKILL.md` or invoke `$hallmark` where supported; `/hallmark` is the user's shorthand.
- Hallmark supports default design, `audit`, `redesign`, and `study` modes. This setup did not run a redesign or choose a visual theme.
- Keep one coherent enterprise design across Nyrix. Stakeholder requirements override stylistic variation suggestions.
- Do not load all eight skills at once. Use the task-to-skill table in `AGENTS.md`.
- Helper scripts and browser tooling require their own runtime/dependencies. Downloading skills does not install Playwright browsers, npm packages, external services, or CMS integrations.

## Verification performed

All eight skill entrypoints exist with `name` and `description` metadata, every task-routing skill path in `AGENTS.md` resolves, Hallmark's references are present, and the browser-testing server helper is present. Markdown whitespace checks passed. The bundled semantic skill validator could not run because the bundled Python runtime lacks PyYAML; the structural checks above were used instead. No website build or browser QA was needed or performed for this setup-only change.

## Updating the snapshots

The downloaded files are local snapshots from moving `main` branches, not a promise that future upstream versions are identical. Preserve this working snapshot in version control if reproducibility is needed. Review upstream changes before refreshing; the installer refuses to overwrite an existing skill directory, so do not delete local copies blindly to update them.

No extra deployment, database, paid-service, mobile-app, or broad marketing-automation skills were added: those do not solve the current enterprise website brief. Existing UI/UX search skills remain available if a later task needs that specific capability.
