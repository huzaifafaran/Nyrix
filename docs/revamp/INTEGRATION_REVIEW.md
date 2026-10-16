# Active integration review — NYX-202 ownership conflict

Reviewed: 16 October 2026. Historical conflict review; superseded by the ownership resolution in `conversation.md`. The integrated pages now use `src/content/nyrixContent.js`; the conflicting external `enterprise.js` is preserved and unintegrated. The findings below describe the earlier conflicting version, not the current route tree. Current verification is recorded in `REVAMP_QA.md`.

This is a read-only source review of the current shared checkout, not a build or runtime pass. Another writer replaced the internal collaborator's initial modules. Do not restore either version over ongoing edits without coordinated ownership. Findings should be rechecked after the external writer's next change.

## Compatibility findings

| Priority | Current source evidence | Required correction |
| --- | --- | --- |
| P1 | `EnterprisePages.js:24–29` imports `linkedInUrl`, `companyInfo` and `contentGapNotices`; these exports are absent from the current `src/content/enterprise.js`. | Agree the data contract, then align imports/exports before route integration. |
| P1 | Company page dereferences `companyInfo.summary`, `.mission`, `.disciplines`; multiple pages dereference missing `contentGapNotices`. | Supply factual approved data or remove unsupported dereferences; do not fill gaps with invented content. |
| P1 | Solutions expects `service.focusAreas.map` and `service.timeframe`; current service records contain id/title/description/href only. | Match the agreed schema or render only available fields. |
| P1 | Products filters `status === 'live'`; data labels all three products `status: 'Product'`. | Use a shared explicit status contract so valid products are not silently hidden. |
| P1 | Work expects `cs.metrics.map` and `cs.techStack.map`; current case-study summaries have neither array. | Align schemas and guard optional fields without fabricating metrics. |

## Content and design findings

- Current foreign module includes unsupported strict-compliance/zero-data-loss wording and invented planned whitepapers/podcast themes. Remove invented publication records and qualify claims against real evidence before review approval.
- Team/advisor names and roles are now directly supplied by the user and should replace empty profile states once one content writer owns integration.
- Public research found four TNQ episode listings. Episode 4 is a scheduled premiere according to retrieved video metadata, so distinguish listed/upcoming from already playable content. Use the research evidence document rather than guessing release state.
- Hard-coded colors/type sizes and repeated heavy uppercase treatments in the new CSS do not implement the agreed calm shared-token direction. Resolve the shared design contract before replacing the shell.

## Integration gate

One explicit application writer must own the affected modules. Align named exports, schemas, link destinations and factual content first. Then run build and meaningful direct-route/browser checks, including solutions, product lists/details, work index, people pages and episode status. A successful old homepage build would not validate new unintegrated page modules.

Current App.js still uses the previous route tree at inspection time; the new modules have not been shown to work in the application.
