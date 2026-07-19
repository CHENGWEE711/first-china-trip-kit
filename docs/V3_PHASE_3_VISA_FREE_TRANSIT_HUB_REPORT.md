# V3 Phase 3 — China Visa-Free Transit Hub Report

Report date: 2026-07-19  
Project: First China Trip Kit  
Core route: `/visa-free-transit`
Feature branch: `feat/v3-phase3-visa-free-transit-hub`
Starting Git SHA: `2ad8f7e845370f5c38382acb463353d25ba5ddad`  
Implementation Git SHA: `aba49dc0e95579ac521b62d9f84d01b60daa3f9b`
Preview evidence Git SHA: `be3a77b5994c52a250d8b79def5b3b333d58881f`
Preview URL: `https://china-travel-f1gmbc1r3-chengwee711-4164s-projects.vercel.app`
Preview deployment ID: `dpl_5dFGSwqm1kLqVtUDFS64oz8kWL7r`
Preview target/status: `preview` / `Ready`
Production deployment: **Not performed; no Production alias was changed**

## Delivery status

The Phase 3 implementation is aligned to the July 19 policy-data contract on the feature branch. The complete validation matrix passed, a fresh protected Preview reached `Ready`, and all seven required evidence captures were generated from that deployment and visually reviewed. No Production deployment or Production alias change is included in this phase.

The Hub is a policy-led route-screening and action center, not a replacement for the existing detailed Guide. It combines policy selection, a five-step route screener, a searchable 65-port explorer, permitted-area checks, a transit-time education tool, document and arrival preparation, cautious route ideas, FAQs, official sources, and an update log.

The completed acceptance state is:

> V3 Phase 3 implementation is complete on the feature branch and ready for independent review. Production has not been deployed.

## Policy snapshot and version contract

The single version source is `data/visa-policy/version.ts`:

| Field | Value |
| --- | --- |
| Policy version ID | `2026-07-19-v1` |
| Public verification date | `2026-07-19` |
| Public verification copy | `Policy information verified: July 19, 2026` |
| 55-country transit list effective from | `2025-06-12` |
| 65-port list effective from | `2025-11-05` |
| Unilateral visa-free list as of | `2026-02-17` |
| Transit window | 240 hours |
| Eligible transit nationalities | 55 |
| Eligible transit ports | 65 |
| Province-level regions represented | 24 |
| Unilateral 30-day countries | 50 |
| Published minimum document validity | 3 months |
| Policy clock | From 00:00 on the day after entry |

The three effective/as-of dates are intentionally separate. The July 19 verification date records the website's manual policy check and must not overwrite the legal effective date of the country list, the port-list effective date, or the unilateral-list publication date.

All screening output is educational. It does not say that a traveler is approved, guaranteed eligible, or guaranteed entry. Final handling remains with the operating airline and immigration inspection officers at the port of entry.

## Page and interaction structure

The Hub follows this product flow:

1. Hero with the current verification date, policy counts, `Check My Route`, detailed-Guide access, official-source access, and a clear non-legal-advice notice.
2. Three policy choices: 30-day unilateral visa-free entry, 240-hour visa-free transit, and 24-hour direct transit.
3. Five-step route screener at the stable anchor `/visa-free-transit#route-check`.
4. A → Mainland China → B explanation using the immediate inbound and outbound segments.
5. Educational 240-hour time calculator using Asia/Shanghai and the next-day 00:00 rule.
6. Searchable and filterable 65-port explorer.
7. Entry-port, permitted-area, and exit-route explanation.
8. Documents checklist and official Arrival Card link.
9. Arrival process.
10. Policy-area-bound 3-, 5-, and up-to-10-day starter ideas.
11. Common mistakes, FAQs, official sources, and policy update history.

### Five-step route screener

The steps are deliberately ordered as follows:

1. **Document** — nationality, document type, remaining validity, expected entry date, and purpose.
2. **Route** — immediate origin and immediate onward country or region.
3. **Entry port** — one of the verified 65 ports.
4. **Permitted stay area** — an area linked to the selected port.
5. **Onward travel** — confirmed ticket, timing, and journey-type details.

Origin and onward destinations use controlled country/region options rather than free text. Hong Kong, Macao, and Taiwan remain distinct controlled region values so the evaluator can compare immediate segments consistently.

Document choices distinguish an ordinary passport, another valid international travel document, a temporary/emergency document, and an uncertain answer. A supported non-ordinary international travel document is not automatically rejected from 240-hour screening; temporary, emergency, special, or uncertain documents are routed to official manual verification when the published facts are insufficient.

## Policy datasets

### Transit countries

- The transit-country dataset contains 55 unique ISO 3166-1 alpha-2 values.
- Indonesia has an explicit `effectiveFrom: "2025-06-12"` record.
- The displayed number is derived from the dataset and guarded by validation rather than treated as a free-standing marketing constant.

### Eligible ports and official appendix rows

- The port dataset contains 65 unique IDs and 65 unique official English names.
- Every port stores `appendixRow`, covering the integer sequence 1 through 65 exactly once.
- Explorer cards expose the official-data row so a reviewer can trace an entry back to the NIA appendix.
- Every port references one or more known permitted-area group IDs.
- Port eligibility is never inferred from the existence of international service.
- The separate NIA list of ports that can issue travel documents for Taiwan residents is not used as a 240-hour transit-port source.

### Permitted areas

- Permitted areas are stored separately from ports.
- Selecting an eligible port does not imply nationwide travel.
- The evaluator checks that the selected permitted-area group is linked to the selected port.
- Missing, uncertain, or contradictory mappings return a cautious issue/manual-verification category instead of expanding the policy by inference.

### Unilateral 30-day entry and future dates

The unilateral dataset contains 50 records and uses the expected entry date entered by the traveler:

- Brunei: `validUntil: null`.
- Russia: `validUntil: "2027-12-31"`.
- The other 48 records: `validUntil: "2026-12-31"`.

The screener does not present a policy as current for an arrival date outside its published period. It first tests whether the unilateral record covers the expected entry date, then continues through the other relevant transit checks. When the entered date requires a refreshed official policy check, the result can use `policy_date_needs_verification`; it does not silently assume an extension.

## Official policy sources

Policy facts are limited to National Immigration Administration of China and Ministry of Foreign Affairs sources. Visitor-facing source entries identify the authority, source title, publication/effective context, supported facts, and original URL.

The source set covers:

- the current 55-nationality and 65-port announcement and official appendix;
- the 240-hour and 24-hour transit interpretations;
- Indonesia's June 12, 2025 inclusion;
- the February 17, 2026 unilateral list;
- the MFA expiry-period clarification;
- the official Arrival Card channel; and
- the NIA `12367` service reference.

Official-source links and their visitor-facing interactions were covered by the final browser checks. External government-page availability remains outside the application's control; the local source registry is not treated as a substitute for periodic manual review of those pages.

## Route evaluator

`evaluateVisaRoute` in `lib/visa-transit/evaluate-route.ts` is the public, version-aware entry point. It passes the verified build-time dataset to the pure evaluator in `lib/visa/evaluate-transit-eligibility.ts` and rejects a mismatched policy version rather than silently screening against a different snapshot.

The evaluator is deterministic and side-effect free. It does not call an external API, use AI, depend on component state, store inputs, or return an approval.

The logic covers:

- expected-entry-date screening for unilateral policies;
- controlled normalization of country and region values;
- the third-country/region route rule using immediate segments;
- document validity and supported document types;
- 55-country transit eligibility;
- confirmed onward travel and the 240-hour window;
- verified entry-port eligibility;
- selected port-to-permitted-area compatibility;
- purpose restrictions;
- through flights, technical stops, and incomplete information; and
- 24-hour direct-transit guidance as an informational alternative only, without issuing a final 24-hour approval result.

### Granular result categories

The UI receives a human-readable outcome plus a granular `resultCategory` for transparent explanations and privacy-safe analytics:

- `unilateral_30_day_may_apply`
- `transit_240_conditions_appear_to_fit`
- `policy_date_needs_verification`
- `needs_more_information`
- `nationality_not_in_transit_list`
- `third_country_route_issue`
- `document_validity_issue`
- `entry_port_issue`
- `permitted_area_issue`
- `onward_travel_issue`
- `manual_official_verification_required`

Each rendered result is structured around:

- the screening category and cautious headline;
- matched conditions and items requiring attention;
- documents to prepare;
- official verification guidance;
- recommended next actions; and
- a `Start Again` action.

Positive transit wording is limited to conditions that “appear to fit.” Complex segments, uncertain details, unsupported activities, special documents, or ambiguous policy dates do not receive a definitive positive result. The 24-hour direct-transit card is an informational fallback and never produces an approval-style final result.

## Old tool and site-wide entry points

The legacy tool remains available at `/tools/visa-free-eligibility-checker` with its own page and self-referencing canonical. It is not deleted, renamed, redirected, or canonicalized to the Hub. Its escalation action is:

> Check your full route and entry port

and leads to `/visa-free-transit#route-check`.

Site-wide Visa-Free Transit entry points are wired to the Hub from the homepage, Header/Plan navigation, Start Here, Footer, Payments & Essential Apps Hub, the detailed Visa Guide, relevant itinerary surfaces, and the sitemap. The long Guide retains its own route and canonical because it serves explanatory search intent rather than the Hub's screening intent.

Automated and protected-Preview verification confirmed the principal entry points and the three distinct canonicals. The Hub, detailed Guide, and legacy tool remain discoverable without collapsing their separate search intent.

## SEO and structured data

The intended Hub contract is:

- canonical: `https://www.firstchinatripkit.com/visa-free-transit`;
- unique H1;
- independent title and description;
- Open Graph and Twitter metadata;
- `WebPage`, `BreadcrumbList`, `FAQPage`, and an accurately described educational `WebApplication` schema;
- `dateModified` derived from the verified policy metadata;
- `isBasedOn` links to official sources;
- sitemap inclusion and robots allowance; and
- no shared canonical with the detailed Guide or legacy tool.

The page does not claim `GovernmentService` status, ratings, legal expertise, approval authority, or guaranteed entry.

Final protected-Preview inspection confirmed one H1, the self-referencing Hub canonical, Open Graph and Twitter metadata, two JSON-LD blocks, the July 19 verification date, the interactive screener, and the 65-port explorer. The sitemap includes the Hub and `robots.txt` permits it.

## Analytics and privacy

Phase 3 adds the following eight primary events through the existing analytics wrapper:

- `visa_hub_view`
- `visa_policy_option_selected`
- `visa_route_screen_started`
- `visa_route_screen_step_viewed`
- `visa_route_screen_completed`
- `visa_result_action_clicked`
- `visa_port_search_used`
- `visa_official_source_clicked`

The sanitizer permits only these four parameter names:

- `result_category`
- `step_number`
- `interaction_type`
- `policy_version`

It must not send nationality, document type, document validity, expected entry date, exact origin/onward destination, selected port or area, itinerary duration, free text, or any personally identifying value. The screener does not ask for or store a name, passport number, birth date, phone, email, booking reference, or hotel address.

Legacy Phase 3 event names may remain for backward-compatible measurement where already used, but the eight events above are the acceptance contract for the revised route-screening flow. The final regression suite confirmed that sensitive screener fields are not emitted and that only the four allowlisted parameter names can pass through the sanitizer.

## Accessibility, responsive behavior, and performance

The implementation is designed so that:

- every form control has an associated label and linked error message;
- all five steps, Back/Next actions, `Start Again`, search, filters, and accordions are keyboard operable;
- the result heading receives focus after completion;
- status is not communicated by color alone;
- native selects remain usable on iOS Safari;
- Escape and explicit controls can clear port search;
- reduced-motion preferences are respected;
- the 390 px viewport has no horizontal overflow;
- the evaluator runs locally against static build-time data;
- no map SDK, external policy API, heavyweight state manager, or AI runtime is loaded; and
- the port explorer and responsive images avoid unnecessary initial-page work.

The final Playwright and protected-Preview checks covered keyboard operation, focus behavior, labelled controls, responsive layout, and horizontal overflow at 1440 px and 390 px. The screenshot run reported zero console errors and zero page errors. No client hydration error was observed. Exact field LCP, CLS, and INP values still require representative Production telemetry and are not claimed here.

## Build-gated policy validation

`scripts/validate-visa-policy-data.mjs` is the independent policy-data validator. The package `prebuild` hook runs the validator before the normal checklist-PDF generation, so a policy-data contract failure blocks the application build.

The validator is expected to fail on any of the following:

- policy version/date mismatch;
- country count or duplicate ISO code;
- missing Indonesia effective date;
- port count, duplicate ID/name, or invalid appendix-row sequence;
- unknown port-to-area references;
- incorrect province-level-region coverage;
- missing official source URL or verification metadata;
- incorrect unilateral record count or expiry contract; or
- missing required Guangdong port effective dates.

The validator passed both as a direct command and through the build-gated `prebuild` hook. Its final summary was 55 transit countries, 65 eligible ports, 24 province-level regions, and 50 unilateral visa-free records.

## Test and verification matrix

Dependency installation completed successfully with zero reported vulnerabilities. The required final commands were then run without suppressing failures:

```text
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test
node scripts/validate-visa-policy-data.mjs
node scripts/audit-image-usage.mjs
```

| Validation | Final result |
| --- | --- |
| `npm install` | **Passed** — dependencies installed; 0 vulnerabilities |
| Lint | **Passed** |
| TypeScript | **Passed** |
| Unit tests | **Passed** — 56/56 |
| Production build with validator prebuild gate | **Passed** — 59 pages built; policy validator ran during `prebuild` |
| Full Playwright suite | **Passed** — 936 passed, 930 project-conditional skips, 0 failed in 8.6 minutes |
| `tests/visa-policy-data.test.ts` | **Passed** as part of the full suite |
| `tests/visa-route-evaluator.test.ts` | **Passed** as part of the full suite |
| Policy validator direct run | **Passed** — 55 countries, 65 ports, 24 regions, 50 unilateral records |
| Image usage audit | **Passed** — 91 unique images; 2 non-blocking unused legacy-image warnings |
| Preview browser QA at 1440 px and 390 px | **Passed** — all required flows and evidence captures completed; 0 console/page errors |

Required route-evaluator coverage includes typical 240-hour routes, the A → Mainland China → A route issue, nationalities outside the transit list, document validity, ineligible ports, port/area mismatch, missing onward travel, unilateral priority, expired future-date handling, incomplete information, Hong Kong/Macao/Taiwan normalization, other valid international travel documents, 24-hour direct transit, and the absence of guaranteed/approved wording.

The 930 Playwright skips are the suite's existing project-conditional selections. No new `.skip` was added, no test was deleted, no assertion was weakened, and no visual threshold was increased to obtain this result. Final interaction evidence was collected from the protected Preview rather than substituting localhost. Preview was not represented as Production.

The image audit's two warnings concern unused legacy files only: the former `first-trip-phone-metro` Hero and Open Graph images. They are not used by the final Hub and did not fail the audit.

## Preview deployment and browser QA

Preview URL: `https://china-travel-f1gmbc1r3-chengwee711-4164s-projects.vercel.app`
Deployment ID: `dpl_5dFGSwqm1kLqVtUDFS64oz8kWL7r`
Target/status: `preview` / `Ready`
Access state: protected Preview
Production URL/alias changes: **None; no Production deployment was run**

The fresh Preview was created from implementation commit `aba49dc0e95579ac521b62d9f84d01b60daa3f9b` after required validation passed. Nine key routes and public assets returned HTTP 200:

- `/`
- `/visa-free-transit`
- `/tools/visa-free-eligibility-checker`
- `/guides/china-240-hour-visa-free-transit-guide`
- `/itinerary-kits/240-hour-visa-free-china-itinerary`
- `/payments-and-apps`
- `/start-here`
- `/sitemap.xml`
- `/robots.txt`

Protected-Preview QA exercised the five-step screener and captured unilateral, 240-hour, and third-country-route-issue results. It also verified the controlled route step, port search and appendix-row display, desktop and mobile layouts, and reported zero console errors and zero page errors. The Hub inspection confirmed one H1, a self-referencing canonical, Open Graph and Twitter metadata, two JSON-LD blocks, the July 19 verification date, the checker, and all 65 ports. The sitemap includes the Hub and `robots.txt` allows it.

## Required screenshot evidence

All seven files below were captured from the fresh protected Preview after final validation and visually reviewed:

| Evidence | Required file | Status |
| --- | --- | --- |
| Hub overview, desktop | [`visa-hub-1440.png`](screenshots/v3-phase3/visa-hub-1440.png) | **Captured and reviewed** |
| Hub overview, mobile | [`visa-hub-390.png`](screenshots/v3-phase3/visa-hub-390.png) | **Captured and reviewed** |
| Controlled route step | [`visa-screener-route-step.png`](screenshots/v3-phase3/visa-screener-route-step.png) | **Captured and reviewed** |
| Unilateral result | [`visa-result-unilateral.png`](screenshots/v3-phase3/visa-result-unilateral.png) | **Captured and reviewed** |
| 240-hour transit result | [`visa-result-transit-240.png`](screenshots/v3-phase3/visa-result-transit-240.png) | **Captured and reviewed** |
| Third-country route issue | [`visa-result-route-issue.png`](screenshots/v3-phase3/visa-result-route-issue.png) | **Captured and reviewed** |
| Expanded port explorer with appendix row | [`visa-port-explorer.png`](screenshots/v3-phase3/visa-port-explorer.png) | **Captured and reviewed** |

The captures show the current July 19 copy and interactions, contain no browser-extension overlays, and were checked for cropping, horizontal overflow, unreadable labels, and misleading result emphasis.

## Known risks and acceptance gates

1. **Policy data remains manually maintained.** The version file centralizes dates, and the validator catches internal inconsistency, but it cannot replace a new manual official-source review after policy changes.
2. **Future-date screening is bounded by published periods.** A result that requires policy re-verification must remain cautious and cannot assume that a temporary unilateral arrangement will be extended.
3. **Port-area mapping remains a policy boundary.** An eligible port does not imply nationwide travel; uncertain combinations must be referred to the airline, the entry port, or `+86 12367`.
4. **Complex tickets remain manual-review candidates.** Through flights, technical stops, multiple Mainland entries, ambiguous operating segments, and uncertain ticket arrangements must not receive guaranteed conclusions.
5. **The 24-hour route is informational only.** It is presented as an official-verification alternative and does not produce a final 24-hour approval result in the screener.
6. **Core Web Vitals require field evidence.** Static architecture and responsive Preview checks support the performance targets, but exact LCP/CLS/INP values are not claimed without representative Production telemetry.
7. **Preview access is protected.** Independent reviewers need authorized Preview access; protection was not disabled for this phase.
8. **Production is untouched.** The completed work stops at the validated feature branch and protected Preview. No Production deployment or alias change occurred, and Phase 4 has not begun.

## Items for independent review

- Confirm the three distinct policy dates and the public July 19 verification copy.
- Compare all 65 port names, appendix rows, effective dates, and permitted-area relationships with the official NIA appendix.
- Review the 50 unilateral records and date-expiry behavior, especially Brunei and Russia.
- Complete one unilateral, one 240-hour, one third-country route issue, and one manual-verification path; also confirm that 24-hour direct transit remains an informational alternative rather than a final approval result.
- Confirm that an “other valid international travel document” is not automatically denied and that temporary/emergency uncertainty is handled cautiously.
- Verify the old tool's independent canonical and its Hub escalation action.
- Inspect all site-wide entry points, SEO metadata, structured data, and sitemap inclusion.
- Confirm that analytics emits only the eight contract events with the four allowed parameter names.
- Review all seven fresh Preview screenshots at their intended viewports.
- Confirm that no Production deployment or alias change occurred.

## Final status

**V3 Phase 3 implementation is complete on the feature branch and ready for independent review. Production has not been deployed.**
