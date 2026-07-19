# V3 Phase 3 — Pre-Implementation Audit

Audit date: 2026-07-18  
Project: First China Trip Kit  
Planned route: `/visa-free-transit`  
Starting Git SHA: `2ad8f7e845370f5c38382acb463353d25ba5ddad`  
Starting branch: `main`  
Implementation branch: `feat/v3-phase3-visa-free-transit-hub`

## Baseline status

- `main` was clean before the Phase 3 branch was created.
- `npm install` completed with no dependency changes and no reported vulnerabilities.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed: 54/54 tests, 0 failures, 0 skips.
- `npm run build` passed and generated 58 static/dynamic routes.
- The production homepage and `/payments-and-apps` both returned HTTP 200 with cache bypass headers.
- The production Payments & Essential Apps Hub still exposed its H1, readiness tool and arrival-day content, confirming the Phase 2 surface remained online before Phase 3 work began.

## Existing visa and transit content

| Surface | Current route or file | Audit result |
| --- | --- | --- |
| Detailed 240-hour Guide | `/guides/china-240-hour-visa-free-transit-guide` | Keep the URL and canonical. This remains the long-form explanation page. |
| Existing planning checker | `/tools/visa-free-eligibility-checker` | Implemented by the `visa` branch of `components/ToolKitWidget.tsx`. It is a five-item planning checklist, not a route evaluator. Keep the URL; add a clear path to the new Hub. |
| Existing transit itinerary | `/itinerary-kits/240-hour-visa-free-china-itinerary` | Keep as itinerary inspiration. It must continue to warn users to verify the exact route and permitted area. |
| Guide policy copy | `data/guide-detail-content.ts` | Already uses 55 nationalities, 65 ports, 24 province-level regions and the next-day 00:00 timing rule, last verified 2026-07-13. Update the verification date and connect it to the Hub without changing the Guide URL. |
| Itinerary policy copy | `data/itinerary-guide-content.ts` | Already uses cautious language, official links and the next-day 00:00 rule. |

The new Hub and existing Guide have different intent:

- `/visa-free-transit`: interactive product Hub, policy selection, route screening, ports, permitted areas and next actions.
- `/guides/china-240-hour-visa-free-transit-guide`: long-form policy explanation and planning context.

## Existing entry points to update

- Homepage task `Can I Enter Visa-Free?` currently points to `/tools/visa-free-eligibility-checker`.
- Homepage `Before You Fly` Visa action currently points to the old tool.
- Homepage `Visa-Free Stopover` experience currently points to the transit itinerary.
- `data/kits.ts` currently sends the `Visa & Entry Kit` to the transit itinerary.
- The Header has no visa-specific Hub entry. Its current primary navigation is Start Here, Payments & Apps, Destinations, Plan Your Trip, Guides and Store.
- The Footer Learn column currently has Payments & Apps, Guides, Travel Essentials, Tools and Free Checklist, but no visa Hub.
- Start Here currently includes a visa warning and path steps but no product-Hub route.
- Payment Hub needs a contextual `Before you arrive` cross-link to the visa Hub.
- The detailed Visa Guide and transit itinerary need a visible return-to-Hub action.

## Sitemap and SEO baseline

- `app/sitemap.ts` does not yet include `/visa-free-transit`.
- The existing Guide is generated from `data/guides.ts` and retains its own canonical through the Guide route.
- `app/robots.ts` allows public routes; no existing rule blocks the planned Hub.
- The Hub must add an independent canonical, title, description, Open Graph/Twitter metadata, WebPage, BreadcrumbList and FAQPage schema.

## Analytics baseline

- GA4 events are sent through the shared `trackEvent` helper in `lib/analytics.ts`.
- The existing old checker emits `visa_free_checker_completed` and includes a result title and checked count.
- Phase 2 events are encapsulated in `PaymentHubInteractive.tsx` and tracked links.
- No Phase 3 event names exist yet.
- Phase 3 must not send nationality, exact route, passport type, dates, free text or other user input to analytics. Only `result_category`, `step_number`, `interaction_type` and `policy_version` are permitted.

## Image baseline

Existing real, locally hosted and credited assets suitable for reuse include:

- `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/hero.webp`
- `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp`
- `/images/guides/visa-free-transit-airport.webp`
- `/images/guides/americans-china-airport-arrivals.webp`
- `/images/itineraries/240-hour-transit/hero-pudong-airport.webp`
- `/images/itineraries/240-hour-transit/card-passport-luggage.webp`
- `/images/travel/china-high-speed-rail-platform.webp`

All are represented in `data/image-credits.json`. The new Hub will reuse real licensed photography and will not use AI-generated travel photos, fabricated visa stamps, government marks or food images.

## Legacy policy wording audit

The required current-scope search returned zero matches for:

- `72-hour`
- `144-hour`
- `54 countries`
- `60 ports`
- `72/144`
- `six days`
- `transit visa free for 6 days`

Historical source titles may still mention superseded 72/144-hour policies inside external official links, but no current visitor-facing copy in `app`, `components`, `lib`, `data` or `public` presents those figures as the active policy.

## Official policy source audit

Only the following official authorities will be used as policy facts:

1. National Immigration Administration current announcement and appendices: <https://en.nia.gov.cn/n147413/c187308/content.html>
2. NIA Visa-Free Transit Policies interpretation: <https://en.nia.gov.cn/n147418/n147463/c183412/content.html>
3. NIA unilateral visa-free country list, compiled as of 2026-02-17: <https://www.nia.gov.cn/n741440/n741577/c1731154/content.html>
4. NIA unilateral visa-free list/interpretation in English: <https://en.nia.gov.cn/n147418/n147463/c183390/content.html>
5. Ministry of Foreign Affairs unilateral visa-free FAQ: <https://www.mfa.gov.cn/wjbzwfwpt/kzx/tzgg/202511/t20251110_11749824.html>
6. NIA official Arrival Card channel: <https://s.nia.gov.cn/ArrivalCardFillingPC/>
7. NIA Indonesia inclusion notice: <https://en.nia.gov.cn/n147418/n147468/c182992/content.html>
8. NIA 12367 service reference: <https://en.nia.gov.cn/n147418/n147468/c194788/content.html>

The 65-port and permitted-area table is the image appendix at:

<https://en.nia.gov.cn/n147413/c187308/part/189828.png>

The later long text list on the same announcement page concerns ports that can issue single-entry Mainland Travel Permits for Taiwan residents. It must not be used as the 240-hour transit port dataset.

## Verified current data baseline

- Current data version effective date: 2025-11-05.
- Project verification date: 2026-07-18.
- 240-hour eligible nationalities: 55.
- Eligible ports: 65.
- Province-level regions represented: 24.
- Minimum published international travel document validity: 3 months.
- The 240-hour period is calculated from 00:00 on the day after entry.
- Five Guangdong ports took effect on 2025-11-05, increasing the port count from 60 to 65.
- Indonesia took effect on 2025-06-12, increasing the nationality count from 54 to 55.
- The current 2026-02-17 unilateral 30-day visa-free list contains 50 countries and applies to ordinary passport holders for the specified purposes.
- Final handling remains with immigration inspection authorities at the port of entry.

## Phase boundary

This branch will only implement Phase 3. It will not add the Phase 4 social landing system, mass destination pages, an AI planner, user accounts, paid visa advice, unattended policy scraping or Production deployment.
