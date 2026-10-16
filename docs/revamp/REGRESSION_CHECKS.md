# Enterprise regression checks

Task NYX-204. Date: 16 October 2026. Status: READY FOR REVIEW after rework.

## Executed result and file identity

Final command:

```powershell
$env:CI='true'
node node_modules/react-scripts/scripts/test.js --watchAll=false --runInBand
```

Result: **1 suite passed, 25 tests passed, 0 snapshots, exit code 0.** Reported runner time 6.775 seconds.

SHA256 of `src/enterprise.test.js` after this run:

```text
28C9D624501549A6F7AD34CF6450AB03ED914177B0ADC2446613FE6D00034FA2
```

Before replacement the overwritten test version was preserved at `C:/Users/cg/AppData/Local/Temp/nyrix-tests-before-rework-4488e4b5053b4bc2afb10ddb881bc929.js`. The earlier 23-test result applied to an earlier file version; lead found a separate 13-test overwrite with failures. This final result applies specifically to the hash above.

## Coverage

React Testing Library and MemoryRouter wrap the real App. Assertions are scoped to main content or the specific primary/footer navigation to avoid duplicate link-name ambiguity.

- Direct entry to 13 enterprise routes, all three product detail pages included; expected headings, single main/footer/navigation and footer privacy link.
- Unknown product fallback and return-home destination.
- Three exact team names/roles and two confirmed advisors.
- Actual supplied local portrait `src` for each team member.
- Two authored publications with original LinkedIn destinations, author attribution and safe external-link attributes.
- Three published podcast watch actions versus E04 upcoming premiere, its exact source URL, timestamp and channel link. Premiere action query excludes the separate artwork link.
- Menu toggle expanded state, Escape focus restoration, close on navigation.
- Company, resource index and article work links open the case-study index.
- Legacy homepage contact fragment navigates to the dedicated contact page.

No snapshots, class-string assertions or application edits. Final source whitespace check passed. Existing ReactDOMTestUtils.act deprecation and React Router future-flag warnings remain visible; no warnings are hidden.

## Limits

DOM integration tests do not establish responsive layout, CSS menu visibility, image load success, external destination reachability, video playback or backend booking success. Portrait checks assert the intended rendered assets, not visual identity or file decoding. Browser QA/build remain separate lead gates. Other application files were not changed in this rework.

## NYX-206 follow-up

Agents primary navigation and visible gallery H1 added. Lead reran suite: 26 tests passed, 6.846 seconds, exit 0; production build also passed. Test source SHA256: `82C672F926828F21CF2E1DF3D24711A741D560FF3B1BFAD6CE3F36FA4CBCDE1E`. New check actually navigates from the header to the lazy-loaded agent library and confirms menu closure and active link state. Earlier 25-test hash/result above remains historical. Browser limits still apply.
