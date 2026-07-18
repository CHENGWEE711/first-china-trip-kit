# V3 Phase 3 — China Visa-Free Transit Hub Report

Report date: 2026-07-19  
Project: First China Trip Kit  
Route: `/visa-free-transit`  
Branch: `feat/v3-phase3-visa-free-transit-hub`  
Starting Git SHA: `2ad8f7e845370f5c38382acb463353d25ba5ddad`  
Final implementation Git SHA: `9eb028e94797ee7340ef612a0fb5796236cdcfb4`  
Preview: <https://china-travel-10j9sjcu1-chengwee711-4164s-projects.vercel.app>  
Preview access: Vercel SSO protected  
Production deployment: **Not performed**

## Delivery status

Phase 3 development, automated validation, browser QA, responsive screenshots and the protected Vercel Preview are complete. The implementation remains isolated from Production and does not start Phase 4.

The Hub combines policy selection, a five-step route checker, time-window education, a searchable 65-port explorer, permitted-area guidance, document preparation, arrival steps, policy-safe starter routes, common mistakes, FAQs, official sources and an update log. The existing long-form Guide remains at `/guides/china-240-hour-visa-free-transit-guide` with its own URL and canonical.

Policy snapshot used by the implementation:

| Field | Value |
| --- | --- |
| Policy version / effective baseline | `2025-11-05` |
| Last verified | `2026-07-18` |
| Next manual review due | `2026-08-18` |
| Transit window | 240 hours |
| Eligible nationalities | 55 |
| Eligible ports | 65 |
| Province-level regions represented | 24 |
| Unilateral 30-day visa-free countries | 50 |
| Minimum published passport/travel-document validity | 3 months |
| Policy clock | From 00:00 on the day following entry |

All checker results remain educational. Final handling is determined by immigration inspection officers at the port of entry.

## Page structure

The page is implemented as a product and action Hub rather than a long-form blog:

1. Hero with route-checker and eligible-port actions, current policy counts, last-check date, source access and non-legal-advice notice.
2. “Which Policy Fits Your Trip?” comparison for 30-day visa-free entry, 240-hour visa-free transit, 24-hour direct transit and manual/visa review.
3. Five-step interactive eligibility checker.
4. A → Mainland China → B route explanation with valid and invalid basic examples.
5. “How the 240 Hours Are Counted” education and China Standard Time calculator.
6. Searchable and filterable 65 Eligible Ports Explorer.
7. Permitted stay areas, with entry port, stay area and exit route kept distinct.
8. Printable, copyable, locally saveable and downloadable documents checklist.
9. Eight-step arrival process linked only to the official NIA Arrival Card channel.
10. Three-, five- and up-to-ten-day starter ideas bound to permitted-area IDs.
11. Common mistakes.
12. Fifteen cautious, search-oriented FAQs.
13. Official sources, policy update history, last-check date and change log.

## New and modified files

### Core Hub and interactive components

- `app/visa-free-transit/page.tsx`
- `components/visa/TransitEligibilityChecker.tsx`
- `components/visa/TransitTimeCalculator.tsx`
- `components/visa/EligiblePortsExplorer.tsx`
- `components/visa/VisaDocumentsChecklist.tsx`
- `components/visa/VisaHubAnalytics.tsx`
- `components/visa/VisaActionLink.tsx`
- `components/visa/VisaPolicyChoiceLink.tsx`
- `lib/visa/evaluate-transit-eligibility.ts`
- `lib/visa/analytics.ts`

### Versioned policy data

- `data/visa/policy-meta.ts`
- `data/visa/transit-eligible-countries.ts`
- `data/visa/unilateral-visa-free-countries.ts`
- `data/visa/transit-ports.ts`
- `data/visa/permitted-stay-areas.ts`
- `data/visa/official-sources.ts`
- `data/visa/checker-rules.ts`
- `data/visa/country-region-options.ts`
- `data/visa/port-search-aliases.ts`
- `data/visa/index.ts`
- `content/visa-policy-changelog.ts`

### Site integration and existing-content updates

- `app/page.tsx`
- `app/payments-and-apps/page.tsx`
- `app/sitemap.ts`
- `app/store/page.tsx`
- `app/tools/page.tsx`
- `app/tools/[slug]/page.tsx`
- `app/travel-essentials/page.tsx`
- `app/city-kits/[slug]/page.tsx`
- `app/itinerary-kits/[slug]/page.tsx`
- `components/Footer.tsx`
- `components/StartHerePath.tsx`
- `components/ToolKitWidget.tsx`
- `data/guide-detail-content.ts`
- `data/guides.ts`
- `data/itinerary-guide-content.ts`
- `data/kits.ts`
- `lib/site.ts`
- `app/globals.css`

These changes add discoverable Hub entry points from the homepage, Header navigation, Start Here, Footer, the Payments Hub, Store, tools, the detailed Visa Guide, relevant itinerary/city surfaces and the sitemap. They do not remove or rename the existing Guide or itinerary URLs.

### Tests, design notes and evidence

- `tests/phase3-visa-policy.test.mjs`
- `tests/policy/visa-policy-regression.test.ts`
- `tests/visa-hub/functional.spec.ts`
- `tests/visa-hub/responsive-accessibility.spec.ts`
- `tests/visa-hub/seo-policy.spec.ts`
- Existing affected regression/visual expectations were updated for the added navigation item and internal links.
- `docs/V3_PHASE_3_PRE_IMPLEMENTATION_AUDIT.md`
- `docs/design/v3-phase3/VISUAL_SPEC.md`
- `docs/screenshots/v3-phase3/`

## Policy data and source validation

Only National Immigration Administration of China and Ministry of Foreign Affairs sources are used for policy facts. The data registry contains 11 official endpoints; all 11 returned HTTP 200 during the independent reachability check. Nine curated source records are shown to visitors, while the additional endpoints support Chinese-language/current-announcement cross-checks.

The official endpoint set covers:

- the current 55-nationality, 65-port announcement and Chinese counterpart;
- English and Chinese transit-policy interpretations;
- the 2026-02-17 unilateral visa-free list;
- the MFA unilateral visa-free FAQ and mutual-exemption list;
- Indonesia’s inclusion notice;
- the December 2024 base 240-hour announcement;
- the official NIA Arrival Card channel; and
- the NIA 12367 service reference.

### Dataset checks

**Check A — automated dataset validation**

- 55 eligible-country ISO codes, all unique.
- 65 ports, with 65 unique IDs and unique official English names.
- 65 official Chinese port names present.
- Port modes: 47 airport, 13 seaport, 2 road, 2 rail and 1 ferry.
- 47 IATA aliases are stored separately for search convenience and are not used as eligibility logic.
- 24 permitted-area groups/province-level regions.
- Zero orphan port-to-area references and zero unmapped ports.
- 50 unilateral 30-day visa-free country records.
- Every policy source record has a verified HTTPS URL and last-verified date.
- Runtime/test assertions guard the 55-country and 65-port counts and uniqueness.

**Check B — independent source/manual audit**

The port names, counts, modes and permitted-area relationships were independently reviewed against the official NIA announcement/appendix and the official source registry. The 11 official endpoints were separately rechecked and returned 11/11 HTTP 200. There is intentionally no claim that the automated test alone proves the manual comparison: the repository does not contain a second, separate line-by-line official-appendix fixture. Future policy reviews should repeat both the source comparison and automated validation rather than changing only the headline counts.

The implementation does not treat the separate NIA list of ports capable of issuing Mainland Travel Permits for Taiwan residents as 240-hour visa-free transit ports.

## Eligibility checker

`lib/visa/evaluate-transit-eligibility.ts` is a pure, side-effect-free evaluator. It does not depend on component state, call an external API, use AI, persist inputs or output “approved.” The UI collects only the fields needed to screen the route and does not ask for a name, passport number, birth date, phone, email, ticket number or detailed hotel address.

The outcome priority is:

1. possible 30-day unilateral visa-free entry;
2. possible 240-hour visa-free transit;
3. possible 24-hour direct transit;
4. manual review; and
5. not eligible from the supplied answers.

The 240-hour branch checks nationality, ordinary/supported travel document, published validity threshold, immediate inbound and outbound country or region, confirmed onward travel, the 240-hour window, eligible entry port, permitted stay area and permitted purpose. It returns individual reasons, warnings, safe next actions, policy version and last-verified date.

Unclear through flights, technical stops, complex segments, unknown answers, special documents and uncertain port/area mappings return manual review. Work, study and journalism do not receive a likely-eligible result. The 24-hour branch explains that remaining in the restricted port area is different from receiving temporary entry permission and never presents the policy as free city access.

Positive results say that the route “appears to meet the main conditions.” They also state:

> Final approval is made by immigration inspection officers at the port of entry.

Complex routes must be confirmed with the operating airline and immigration authorities, including China Immigration Service Hotline `+86 12367`.

## SEO and information architecture

- Independent canonical: `https://www.firstchinatripkit.com/visa-free-transit`.
- One H1 and one main landmark in the rendered page.
- Metadata title and description derive the year/counts from policy metadata rather than duplicated UI constants.
- Open Graph and Twitter Card metadata are present.
- JSON-LD includes `WebPage`, `BreadcrumbList`, `FAQPage` and an accurate educational `WebApplication`; it does not claim `GovernmentService` status, ratings or legal expertise.
- `dateModified` comes from `lastVerifiedAt`; `isBasedOn` points to official policy sources.
- `/visa-free-transit` is included in the sitemap and is not blocked by robots or marked `noindex`.
- The existing 240-hour Guide retains its own route and canonical.
- The old planning checker remains available but points to the new Hub for route screening and is excluded from competing search intent.
- Current visitor-facing content does not present 72 hours, 144 hours, 54 countries or 60 ports as the active policy; dated changelog entries preserve necessary historical context.

## Analytics and privacy

The implementation uses the existing GA4 helper through a dedicated Phase 3 wrapper. Added events are:

- `visa_hub_view`
- `visa_checker_started`
- `visa_checker_step_completed`
- `visa_checker_completed`
- `visa_checker_result_viewed`
- `visa_policy_source_clicked`
- `visa_port_explorer_used`
- `visa_port_selected`
- `visa_time_calculator_used`
- `visa_checklist_saved`
- `visa_to_payment_hub_clicked`
- `visa_guide_clicked`
- `visa_official_arrival_card_clicked`
- `visa_12367_clicked`

The sanitizer permits only `result_category`, `step_number`, `interaction_type` and `policy_version`. Nationality, exact origin/destination, passport details, dates, itinerary values and user-entered text are not sent to GA4. Checker inputs are not stored. Checklist persistence stores only non-sensitive checklist item IDs locally in the browser.

## Accessibility and mobile behavior

- Every checker control has a visible or programmatically associated label.
- Validation messages are associated with their inputs and announced.
- Back, Next, restart, result actions, port search/filtering, accordions and the time calculator are keyboard operable.
- Result rendering moves focus to the result heading.
- Result meaning uses icon, heading and text, not color alone.
- Accordions expose appropriate ARIA state.
- Touch targets and native/select behavior remain usable on narrow mobile viewports.
- Reduced-motion preferences are respected by the shared site styles.
- Browser QA found no horizontal overflow at 390 px and no application console errors.

## Performance

- The policy evaluator is local and synchronous; there is no runtime policy API or AI request.
- Policy datasets are static TypeScript data evaluated at build time.
- The port explorer is loaded on demand rather than in the initial Hub bundle.
- No map SDK, large country library, heavyweight state manager or new client data layer was introduced.
- Real local photographs use Next Image with responsive sizing.
- The page built as a static route and browser QA found no hydration or application console errors.

The architecture is designed to support the stated LCP, CLS and INP targets, but exact Core Web Vitals have **not** been claimed as achieved. They still require Preview field measurement or Production real-user monitoring under representative devices, networks and cache conditions.

## Images and provenance

The Hub reuses existing locally hosted, credited, licensed real travel photographs for airports, China arrival/transit and city contexts. Next Image serves the assets; no remote hotlink or fabricated government imagery was added.

Image generation was attempted during visual development, but the ImageGen service failed upstream. No AI-generated travel photograph was introduced. Existing licensed real imagery was reused instead.

The image audit passed with 91 unique images, 2 warnings and 0 errors. The two warnings concern existing unused homepage assets; they are not broken, duplicate or uncredited Phase 3 images.

## Verification results

| Validation | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | 56/56 passed, 0 failures |
| `npm run build` | Passed; Hub generated as a static route |
| Full Playwright suite | 780 passed, 930 skipped, 0 failed in 7.6 minutes |
| Phase 3 Playwright coverage | 186/186 passed |
| Policy/data regression | Passed: 55 countries, 65 ports, 24 regions, 240-hour wording, three-month validity, next-day 00:00 rule and final-decision disclaimer |
| Image audit | Passed: 91 unique images, 2 warnings, 0 errors |

No `.skip` was added for Phase 3. The full-suite skipped cases are existing applicability skips across the project’s browser/configuration matrix; Phase 3’s required policy, functional, responsive, accessibility and SEO scenarios passed.

Phase 3 Playwright coverage includes:

- policy/data tests: 114/114;
- Hub functional flows: 36/36;
- responsive/accessibility checks: 18/18; and
- SEO/policy checks: 18/18.

## Protected Preview and browser QA

Preview URL: <https://china-travel-10j9sjcu1-chengwee711-4164s-projects.vercel.app>

The deployment is a **Preview**, protected by Vercel SSO. An authenticated/bypass Preview request returned HTTP 200 for `/visa-free-transit`. Anonymous access may show Vercel authentication by design; Preview protection was not disabled.

Verified on the rendered Preview:

- unique H1 and main landmark;
- self-referencing canonical and expected JSON-LD;
- no horizontal overflow at 1440 px or 390 px;
- US ordinary-passport route Japan → Shanghai/PVG → Singapore, confirmed within 72 hours, Shanghai stay and tourism purpose returned `likely-240-hour-transit` with itemized reasons;
- Japan → Shanghai → Japan returned `not-eligible-from-answers`;
- a through-flight scenario returned `manual-review`;
- result focus moved to the result heading;
- the 30-day unilateral priority branch passed automated browser coverage;
- the port explorer found and expanded Shanghai/PVG with the correct source and route-check action;
- the time calculator converted an August 1 arrival and August 5 departure to a 96-hour planned stay, showed the August 2 00:00 policy start and retained the temporary-entry-permit disclaimer;
- application-scoped console errors: 0.

No Production deployment was run and no Production alias was changed.

## Screenshots

| Evidence | Viewport | File |
| --- | --- | --- |
| Hub overview | 1440 × 900 | [`visa-hub-1440.png`](screenshots/v3-phase3/visa-hub-1440.png) |
| Hub overview | 390 × 844 | [`visa-hub-390.png`](screenshots/v3-phase3/visa-hub-390.png) |
| Checker start | 1440 × 900 | [`checker-start-1440.png`](screenshots/v3-phase3/checker-start-1440.png) |
| Likely 240-hour result | 1440 × 900 | [`checker-result-eligible-1440.png`](screenshots/v3-phase3/checker-result-eligible-1440.png) |
| Not-eligible result | 1440 × 900 | [`checker-result-ineligible-1440.png`](screenshots/v3-phase3/checker-result-ineligible-1440.png) |
| Manual-review result | 390 × 844 | [`checker-result-review-390.png`](screenshots/v3-phase3/checker-result-review-390.png) |
| Ports explorer | 1440 × 900 | [`ports-explorer-1440.png`](screenshots/v3-phase3/ports-explorer-1440.png) |
| Time calculator | 390 × 844 | [`time-calculator-390.png`](screenshots/v3-phase3/time-calculator-390.png) |

The captures use the authenticated Preview deployment and contain no browser-extension overlays.

## Visual fidelity ledger

| Area | Outcome |
| --- | --- |
| Hierarchy | Product-Hub flow is distinct from the long Guide: policy choice and checker lead, sources and update history close the page. |
| Typography | Existing Source Serif 4 headings and Inter body typography are retained. |
| Color | Existing warm red, cream and dark-gray brand system is retained; warning/result meaning is not color-only. |
| Imagery | Real, locally credited arrival, airport and China travel imagery is used; no generic food image or AI photograph is used for policy content. |
| Spacing/layout | Existing containers, spacing rhythm, rounded corners and open editorial sections continue Phase 1/2 conventions. |
| Interaction | Checker, explorer, calculator, checklist and accordions remain keyboard/touch usable and responsive at 390 px. |

## Known risks and operational follow-up

1. **Policy data is static and manually maintained.** The next review is due `2026-08-18`. The build emits a non-blocking overdue warning after the review threshold; it does not silently remove the page or auto-ingest unreviewed policy data.
2. **Border handling is authoritative.** Checker output is not approval, legal advice or guaranteed entry. Final handling remains with immigration inspection officers.
3. **Complex itineraries need manual review.** Through flights, technical stops, multiple mainland entries, unclear ticketing and uncertain port/area mappings intentionally avoid a positive result.
4. **Check B is a human/source audit, not a second machine fixture.** A future reviewer must repeat the official appendix comparison; the current repository does not contain a separate line-by-line copy of the official image appendix.
5. **Core Web Vitals need field evidence.** Static build and responsive browser checks passed, but exact LCP/CLS/INP require RUM or representative Preview measurement.
6. **Preview access is protected.** Reviewers must use the authorized Vercel account; protection has not been weakened to make the Preview public.
7. **Two image-audit warnings remain outside Phase 3.** They concern existing unused homepage assets and do not block this Hub.
8. **Production is untouched.** The user must accept the protected Preview before any Production deployment is considered.

## Items for user acceptance

- Review the five checker outcomes and the cautious result wording.
- Spot-check port and permitted-area presentation against the official NIA appendix.
- Confirm that the mobile sequence is understandable without relying on a map.
- Review the 3-, 5- and up-to-10-day starter ideas for appropriate, non-guaranteed wording.
- Confirm the official sources/update-log presentation and the planned monthly policy-review workflow.
- Approve the protected Preview before any Production action.

## Final status

**V3阶段3开发与Preview验证已完成，等待正式验收。**
