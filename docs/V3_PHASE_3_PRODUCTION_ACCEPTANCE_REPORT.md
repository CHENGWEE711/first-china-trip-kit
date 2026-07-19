# First China Trip Kit V3 Phase 3 Production Acceptance Report

## 1. Acceptance status

**Status: PASS**

V3 Phase 3 has been merged into main, deployed to Production and passed formal-domain acceptance.

This release is limited to the China Visa-Free Transit Hub and its required policy data, entry points, SEO, analytics, tests, and release evidence. Phase 4 was not started.

## 2. Git and release identity

| Item | Value |
| --- | --- |
| Starting `main` SHA | `2ad8f7e845370f5c38382acb463353d25ba5ddad` |
| Feature branch | `feat/v3-phase3-visa-free-transit-hub` |
| Feature branch final SHA | `f5b4ec006356048b9591f52f0714d9f8d9d09617` |
| Merge SHA on `main` | `4c9ae8e2ef286e460b53ea5d359a4e58476f402d` |
| Deployed application SHA | `5f8a3d4fb9cf699d272780a4e3dd4e737dd28db7` |
| Merge method | Local `--no-ff` merge, then normal push to `origin/main` |
| Force push | Not used |

The connected GitHub review connector returned HTTP 403 when a pull request was attempted. The release instruction explicitly allowed a local no-fast-forward fallback, so the reviewed feature head was merged locally with a dedicated merge commit. The branch remains available on `origin`.

The complete Phase 3 change inventory is recorded in [V3_PHASE_3_CHANGED_FILES.txt](./V3_PHASE_3_CHANGED_FILES.txt). Scope inspection found no Phase 4 social landing system, AI planner, account system, paid visa advice, or automated policy scraper. Existing Visa Guide and Eligibility Checker routes and canonicals were preserved.

## 3. Production deployment

| Item | Value |
| --- | --- |
| Vercel project | `china-travel-kit` |
| Production deployment URL | `https://china-travel-m3v11r0j5-chengwee711-4164s-projects.vercel.app` |
| Deployment ID | `dpl_3Yn4Ja1CudhwHZUhAoB1MxxDKxuF` |
| Target | `production` |
| Status | `Ready` |
| Created | July 19, 2026 at 13:08:55 Asia/Shanghai |
| Primary alias | `https://www.firstchinatripkit.com` |
| Apex alias | `https://firstchinatripkit.com` |
| Apex behavior | HTTP 301 to the `www` canonical domain |

`vercel inspect --wait` returned `Ready`. `vercel alias ls` and deployment inspection both showed the `www` and apex domains on this deployment. No new Vercel project, domain, or environment variable was created or changed.

### Production-only defect found and fixed

The first Production deployment exposed a real console defect that Preview and static checks had not surfaced: Next.js prefetched the downloadable checklist link as an RSC route and requested `/china-first-time-visitor-checklist.pdf?_rsc=...`, which returned 404.

The release was not accepted in that state. The checklist control was changed from a Next.js `Link` to a native download anchor. A regression test named `Phase 3 checklist downloads bypass Next route prefetching` was added. The correction was committed as `5f8a3d4fb9cf699d272780a4e3dd4e737dd28db7`, pushed to `main`, redeployed, and the complete formal-domain capture was rerun successfully.

## 4. Formal-domain HTTP acceptance

All required `www` routes returned HTTP 200:

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/visa-free-transit` | 200 |
| `/tools/visa-free-eligibility-checker` | 200 |
| `/guides/china-240-hour-visa-free-transit-guide` | 200 |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | 200 |
| `/payments-and-apps` | 200 |
| `/start-here` | 200 |
| `/travel-essentials` | 200 |
| `/store` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/china-first-time-visitor-checklist.pdf` | 200 |

`https://firstchinatripkit.com/` returned HTTP 301 to `https://www.firstchinatripkit.com/`.

No-cache response artifacts are stored in [production-verification/v3-phase3](./production-verification/v3-phase3/).

### Captured response headers

| Header | Visa Hub | Homepage |
| --- | --- | --- |
| HTTP status | `200` | `200` |
| `age` | `816` | `737` |
| `cache-control` | `public, max-age=0, must-revalidate` | `public, max-age=0, must-revalidate` |
| `x-vercel-cache` | `HIT` | `HIT` |
| `x-vercel-id` | `hnd1::jcz52-1784438792194-fcff14eeed56` | `hnd1::8mxvm-1784438794050-87a168658f54` |
| `etag` | `19e56b07900e9ac11650cb554ba81441` | `c2e71023cd398cc209a49ce392220a45` |

Evidence:

- [Visa Hub headers](./production-verification/v3-phase3/visa-hub.headers.txt)
- [Visa Hub HTML](./production-verification/v3-phase3/visa-hub.html)
- [Homepage headers](./production-verification/v3-phase3/homepage.headers.txt)
- [Homepage HTML](./production-verification/v3-phase3/homepage.html)
- [Production sitemap](./production-verification/v3-phase3/sitemap.xml)
- [Production robots](./production-verification/v3-phase3/robots.txt)

## 5. Policy data acceptance

Policy metadata on the accepted release:

| Field | Accepted value |
| --- | --- |
| Policy version | `2026-07-19-v1` |
| Verified at | `2026-07-19` |
| Transit country effective date | `2025-06-12` |
| Transit port effective date | `2025-11-05` |
| Unilateral list as of | `2026-02-17` |
| Transit nationalities | 55 |
| Eligible ports | 65 |
| Province-level permitted regions | 24 |
| Unilateral visa-free countries | 50 |
| Published minimum document validity | 3 months |
| Published 240-hour count | From 00:00 on the day after entry |

The policy validator passed with exactly `55 / 65 / 24 / 50`. Automated assertions also check uniqueness, official-source presence, effective dates, and the final-decision disclaimer.

An independent pre-merge policy review found that the earlier checker implementation incorrectly limited a traveller to the entry port's local region. The implementation was corrected to support the official cross-region permitted-area relationships and was revalidated with a Shanghai Pudong entry plus a Jiangsu permitted-area plan. The correction is the feature branch final commit `f5b4ec0`.

Active public copy contains no current `72-hour`, `144-hour`, `54 countries`, `60 ports`, `six days`, or similar superseded wording. The Hub does not promise approval or guaranteed entry. Positive results use cautious planning language and state that immigration inspection authorities make the final decision.

## 6. Formal-domain interactive outcomes

Four required Production paths were completed against the formal domain without personal data:

| Path | Result | Production assertion |
| --- | --- | --- |
| 30-day unilateral arrangement | `likely-unilateral-visa-free` | Says the 30-day arrangement may be more relevant; no guarantee |
| Main 240-hour conditions align | `likely-240-hour-transit` | Shows matched conditions, `appears to match` language, and final-decision warning |
| A → Mainland China → A | `not-eligible-from-answers` | Identifies the third-country route issue; no approval language |
| Complex/uncertain journey | `manual-review` | Directs the visitor to official policy, airline, entry port, and `+86 12367` |

The accepted 240-hour result confirmed:

- nationality appears on the current list;
- published passport-validity minimum is met;
- immediate origin and onward destination differ;
- confirmed onward travel is within 240 hours;
- the selected port is in the official dataset;
- the planned stay is within a linked permitted area;
- the stated purpose appears permitted;
- the result is not approval or a guarantee of entry.

The 65-port explorer successfully searched `PVG` and returned the one matching official record. The time calculator, FAQ, checklist, source links, Back/Next/restart controls, keyboard path, and result focus behavior were also exercised.

## 7. SEO, sitemap, robots, and internal discovery

The Production Hub passed the following checks:

- exactly one H1;
- independent title and meta description;
- self canonical: `https://www.firstchinatripkit.com/visa-free-transit`;
- complete Open Graph and Twitter Card data;
- `WebPage`, `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD;
- 20 FAQ schema entries;
- `dateModified: 2026-07-19`;
- `isBasedOn` links to official NIA sources;
- no `GovernmentService` schema;
- no `noindex` or blocking `X-Robots-Tag`;
- one Hub entry in the Production sitemap;
- `robots.txt` allows `/` and points to the canonical sitemap.

The Hub, legacy checker, and detailed Guide retain three distinct canonicals. The detailed Guide URL and canonical were not changed.

Formal-domain discovery links to `/visa-free-transit` were verified from:

- Homepage primary `Can I Enter Visa-Free?` task;
- Homepage `Before You Fly` section;
- Header navigation;
- Footer;
- Start Here;
- Travel Essentials / Visa & Entry;
- Payments & Essential Apps Hub;
- detailed 240-hour Visa Guide;
- 240-hour itinerary;
- legacy Eligibility Checker;
- Store.

Phase 1 Homepage 3.0 and Phase 2 Payments & Essential Apps Hub remained online and passed their regression checks.

## 8. GA4 production and privacy acceptance

The formal-domain acceptance flow observed actual Google Analytics `/g/collect` requests for all required events:

1. `visa_hub_view`
2. `visa_policy_option_selected`
3. `visa_route_screen_started`
4. `visa_route_screen_step_viewed`
5. `visa_route_screen_completed`
6. `visa_result_action_clicked`
7. `visa_port_search_used`
8. `visa_official_source_clicked`

The capture records only event names and custom-parameter key names. It does not save client IDs, raw request URLs, parameter values, or user-entered itinerary values.

Only these custom parameter keys were accepted:

```text
result_category
step_number
interaction_type
policy_version
```

No nationality, origin, onward destination, passport type, entry date, port, permitted area, travel purpose, free text, or other user input was found in the Phase 3 analytics payloads. Runtime sanitizer tests and the Production network capture both passed.

During acceptance, an unrealistically fast automation initially filled the complete five-step checker and immediately triggered search and external-link events. The browser's analytics batching left the last events in `dataLayer` without forming all expected network hits. The acceptance runner was corrected to use a realistic 1.5-second interaction cadence for its GA-only flow; it then produced all required `/g/collect` requests. Assertions were not relaxed. The Playwright analytics test was also changed to observe `dataLayer.push`, which works both locally and when the formal site's real Google Tag replaces `window.gtag`.

## 9. Validation results

| Gate | Final result |
| --- | --- |
| `npm install` | PASS; 0 vulnerabilities at the release gate |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 57/57, 0 failed, 0 skipped |
| `npm run build` | PASS — 59 static/dynamic routes generated |
| Full Playwright after merge and app fix | PASS — 942 passed, 930 existing project-conditional skips, 0 failed |
| Formal-domain Phase 3 Playwright | PASS — 32/32 across desktop and mobile |
| Policy validator | PASS — 55 countries, 65 ports, 24 regions, 50 unilateral countries |
| Image audit | PASS — 91 local assets, 0 errors, 2 warnings |
| Formal capture | PASS — 10 screenshots, 4 outcomes, 8 required GA4 events |
| Secret scan | PASS — current tree 0 findings; Git history 0 findings for common credential/private-key patterns |

No `.skip` was added, no existing test was removed, and no visual-difference threshold was relaxed. The repository is public. Only `.env.example` is tracked; it contains blanks or placeholders. No real `.env` file, private key, common API token, or credential pattern was found in the current tree or Git history scans.

## 10. Production visual evidence

All images below were captured from `https://www.firstchinatripkit.com`, not from Preview:

- [Visa Hub — 1440px](./screenshots/v3-phase3-production/visa-hub-1440.png)
- [Visa Hub — 390px](./screenshots/v3-phase3-production/visa-hub-390.png)
- [Route checker step](./screenshots/v3-phase3-production/visa-screener-route-step.png)
- [Unilateral result](./screenshots/v3-phase3-production/visa-result-unilateral.png)
- [240-hour result](./screenshots/v3-phase3-production/visa-result-transit-240.png)
- [Route issue result](./screenshots/v3-phase3-production/visa-result-route-issue.png)
- [Manual review result](./screenshots/v3-phase3-production/visa-result-manual-review.png)
- [Eligible ports explorer](./screenshots/v3-phase3-production/visa-port-explorer.png)
- [Homepage Visa entry — 1440px](./screenshots/v3-phase3-production/homepage-visa-entry-1440.png)
- [Homepage Visa entry — 390px](./screenshots/v3-phase3-production/homepage-visa-entry-390.png)

The capture asserts HTTP 200, correct page identity, no console errors, no page errors, no broken images, no horizontal overflow, and non-empty screenshot files. Manual review confirmed that the result disclaimer and CTA hierarchy remain readable at 390px.

## 11. Known non-blocking limits

1. The image audit reports two unused legacy homepage assets:
   - `/images/home/phase-d/first-trip-phone-metro-hero.webp`
   - `/images/home/phase-d/first-trip-phone-metro-og.webp`
   They are not rendered by Phase 3 and do not affect performance or correctness.
2. Seven compatibility analytics aliases remain alongside the new Phase 3 event contract. They contain only approved non-sensitive fields but may create additional GA4 event-name noise until a later analytics cleanup.
3. The legacy Eligibility Checker handoff CTA is client-rendered and appears after hydration. It was verified after normal hydration; an assertion made exactly at `DOMContentLoaded` can be too early.
4. The detailed Guide and itinerary do not repeat the complete three-month validity threshold in every section. They link back to the current Hub, which carries the verified policy contract and official sources.
5. The checker remains a planning aid, not an official eligibility or admission decision. Visitors are directed to the operating airline, the entry-port immigration authority, official NIA sources, and `+86 12367` for itinerary-specific confirmation.

None of these items blocks the accepted Production release.

## 12. Rollback and stage boundary

The no-fast-forward merge commit preserves an explicit rollback boundary at `4c9ae8e2ef286e460b53ea5d359a4e58476f402d`. The application correction is isolated in `5f8a3d4fb9cf699d272780a4e3dd4e737dd28db7`. Existing Vercel project, aliases, and environment variables were not changed.

Phase 4 social landing pages, hotspot city batches, AI planning, accounts, paid visa advice, and automatic policy ingestion were not started. Work stops at this acceptance report and awaits the next instruction.
