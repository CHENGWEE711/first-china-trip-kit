# First China Trip Kit — Phase 5 acceptance report

Date: 2026-07-27<br>
Scope: first traffic-growth and commercial-conversion validation (60-day phase)<br>
Repository state: implementation complete locally; no merge to `main`, preview deploy, or production deploy performed.

## Delivered work

| Work package | Delivered evidence |
| --- | --- |
| A — measurement | [Phase 5 event dictionary](./PHASE_5_EVENT_DICTIONARY.md) documents all 13 required events, trigger timing, allowed parameters and validation route. The checker and itinerary browser flows use a local `gtag` capture and prove event names/timing/payload boundaries. Affiliate instrumentation sends no destination URL. |
| B — free tool | `/tools/china-arrival-readiness-checker` has 12 questions covering entry, payment, apps, data, transport, hotel details and contingencies. It returns a 0–100 score, red/yellow/green risks, guide links and a personalised task list. Answers remain in browser memory; only email, UTM attribution and lead-magnet metadata go to the newsletter endpoint. |
| C — growth content | Nine distinct high-intent guides are published: three payments, three apps and three 240-hour transit topics. Each has direct opening guidance, steps, failure handling, linked official sources, 2026-07-27 verification date, internal links and the readiness-checker CTA. |
| D — product ladder | `/products/china-arrival-setup-bundle` offers the $19 China Arrival Setup Bundle, its real preview PDF, comparison, suitability, immediate-delivery wording, refund note, disclaimer and guarded Payhip CTA. The generated full PDF and preview are in `public/products/`. |
| E — lifecycle email | [Brevo Phase 5 sequence](./brevo-welcome-funnel.md) contains the day 0, 2, 4, 7 and 10 journey with controlled UTM links. |
| F — dashboard | `/growth-dashboard` is an internal `noindex` weekly dashboard with acquisition, search, funnel, leads, product intent, verified orders, affiliates, week-over-week logic and safe empty states. Its import/reconciliation rules are in the [data contract](./PHASE_5_GROWTH_DASHBOARD_DATA_CONTRACT.md). |

## Quality evidence

| Check | Result |
| --- | --- |
| Unit and contract tests | `npm test`: 67 passed, 0 failed. |
| Type safety | `npm run typecheck`: passed. |
| Lint | `npm run lint`: passed. |
| Production build | `npm run build`: passed; 74 routes generated. The prebuild visa data validation also passed (2026-07-19-v1, 55 transit countries, 65 ports, 24 permitted regions). |
| New browser suite | `tests/phase5/arrival-readiness.spec.ts` on the production build: 7 passed. Covers score flow, email capture, event dispatch without PII, bundle view, custom-itinerary events, canonical/schema/sitemap, and 390/768/1440/1920 widths. |
| Existing regression suite | `tests/phase-e/final-regression.spec.ts` on Chromium: 7 passed. Includes public-route integrity, redirects, every sitemap URL canonical-200 check, forms, commercial state and existing analytics. Sitemap expectation is updated from 53 to 64 URLs to cover the authorized new pages. |
| Manual browser verification | In-app browser checked the new tool at 390px: 12 choices present, selection updates progress, no horizontal overflow. |
| PDF visual QA | The three-page bundle PDF was rendered and inspected; preview page is readable with no visible clipping. |
| Lighthouse, local production build | Readiness checker: Performance 96, Accessibility 100, Best Practices 96, SEO 100. Bundle: 94, 100, 96, 100 respectively. |

## SEO and safety acceptance

- New public routes have canonical metadata, Open Graph metadata, JSON-LD and visible breadcrumbs; public URLs are in the sitemap. The internal dashboard is intentionally `noindex` and absent from the sitemap.
- The readiness tool has no passport-number or card-number field and emits only aggregate score/status/count values. Email and free text are excluded from analytics event payloads.
- Policy, payment, transit and transport content points to the State Council, National Immigration Administration or China Railway sources and shows its verification date plus a re-check disclaimer.
- Existing URLs were preserved. No bulk low-quality content generation or site-wide redesign was performed.

## External release gates still requiring approval/configuration

These are deliberately not marked as complete because the necessary external authority or production deployment has not been provided:

1. Configure `NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL` with the verified Payhip $19 checkout URL, then execute the guarded checkout-click test in a preview environment. Do not infer paid orders from clicks.
2. Configure the five-email automation in Brevo using the supplied sequence and UTM links; verify send timing and unsubscribe/compliance settings in the account.
3. Deploy only to an approved non-production preview, run each event once with GA4 DebugView, and save the screenshots/payload evidence specified in the event dictionary. The local `gtag` capture is equivalent dispatch evidence, not production DebugView evidence.
4. Import reconciled GA4, Search Console, Payhip and affiliate data into the dashboard. It currently correctly displays `Awaiting data` rather than invented metrics.
5. Approve a verified Payhip order export or webhook before implementing an `order_completed` event/source of truth.

## Deployment status

No deployment was made and `main` was not modified. Release remains pending the five gates above and explicit confirmation.
