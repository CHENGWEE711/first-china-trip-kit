# Phase D public pages and destination upgrade report

Generated: 2026-07-14 (Asia/Shanghai)  
Repository: `CHENGWEE711/first-china-trip-kit`  
Branch: `audit/full-site-content-image-upgrade`  
Starting SHA: `cd48ce85a6080e24c279fd3a89e3d085f940e0ee`  
Final branch SHA: recorded after the report commit and push

## Executive result

Phase D is complete and remains isolated on the audit branch. It was not merged to `main`, no Vercel deployment was triggered, no domain or environment variable was changed, and Stage E was not started.

The four core acceptance outcomes are met:

- The eight current destinations have visually distinct Heroes and Cards; Card/Hero overlap fell from 8/8 cities to 0/8.
- The homepage first screen now states that the site solves payment, apps, entry and first-day logistics for a first independent China trip.
- Start Here is an exact eight-step action path with browser-only progress, not another sales article.
- Store, four Tools, Contact and Newsletter expose real results or honest unavailable states. Legacy route families now resolve by 301 and leave no sitemap tail.

## Change totals

| Metric | Result |
| --- | ---: |
| Directly affected public route instances | 19 |
| Current live cities | 8 |
| City Hero replacements | 6 |
| Homepage Hero replacements | 1 |
| City Card replacements | 8 |
| City body-image mapping adjustments | 18 |
| New locally optimized visual assets | 11 |
| Confirmed unused images deleted | 5 |
| First-party brand/marketing provenance records completed | 23 |
| Legacy compatibility routes converted to 301 | 17 |
| Sitemap canonical URLs after cleanup | 49 |

The 19 route instances are the homepage, Start Here, destination list, eight city details, Store, Tools index, four Tool details, Contact and 404. Shared Header, Footer, Newsletter, Contact and product components also affect their normal consumer pages.

## Destination imagery and content

### Before and after

| Measure | Baseline | Final |
| --- | ---: | ---: |
| City Card equal to its Hero | 8/8 | 0/8 |
| Unique city Hero sources | 8/8 | 8/8 |
| Unique city Card sources | 8/8 | 8/8 |
| City Heroes at least 2000px wide | 4/8 | 8/8 |
| City Cards at least 1400px wide | 8/8 | 8/8 |
| City Hero/Card over 700KB | 0 | 0 |
| Destination mappings with obvious generic/wrong-topic imagery | 8/8 | 0/8 |
| Full-audit missing referenced files | 2 | 0 |
| Full-audit Hero assets under 2000px | 19 | 0 |
| Full-audit oversized assets | 1 | 0 |
| Full-audit incomplete site-image license records | present | 0 |

City-role changes:

- Shanghai: Bund skyline Hero, street-life Card and Yu Garden/body separation.
- Beijing: Temple of Heaven Hero, hutong Card, Forbidden City and Summer Palace body scenes.
- Xi'an: Bell Tower Hero, Terracotta Army Card and excavation-pit attraction support.
- Chengdu: panda Hero, lived-in street Card, Sichuan food and transport roles separated.
- Hangzhou: West Lake Hero, Longjing tea Card and lake/tea body identity.
- Suzhou: Pingjiang canal Hero, classical-garden Card and canal/garden/food separation.
- Guangzhou: Pearl River Hero, heritage-street Card, Cantonese dim sum and documented Huadiwan metro imagery.
- Shenzhen: bay skyline Hero, modern-architecture Card, Chaoshan hot pot and documented Shenzhen Metro imagery.

No Guilin or Zhangjiajie route exists in the current repository data. Phase D did not invent unpublished cities or slugs.

### Duplicate and unused imagery

The acceptance-level duplicate defect was the city role collision, not all intentional cross-link reuse. City Card=Hero collisions fell from 8 to 0. The full-audit reference-group count is not directly comparable because the final audit covers a different route universe after 17 legacy pages were removed and tracks more licensed assets; intentional Guide, itinerary and product CTA reuse remains.

Five fully unreferenced, superseded files were deleted. The remaining 16 files classified as unused by rendered HTML are retained because they are externally used brand avatars, social publishing assets, Payhip covers, QR/share files or metadata imagery.

## Homepage

- Replaced the generic destination-led first impression with a real Shanghai metro/phone preparation scene.
- Changed the H1 to “Payments, apps and first-day logistics—sorted before you land.”
- Made Start Here the primary route and the free checklist the secondary route.
- Reduced the path to four practical systems: payment, apps/internet, entry/transit and trains/routes.
- Reused the real Guide and destination Card records instead of maintaining a second fallback image map.
- Kept the free checklist and honest $7 guide distinct, with no fake discount, review, countdown or sales claim.
- Added a branded 1200×630 default OG asset independent from city and Guide Heroes.

## Start Here

Implemented the required sequence exactly:

1. Check entry rules.
2. Set up payment.
3. Install essential apps.
4. Prepare internet access.
5. Plan trains and transport.
6. Save addresses and Chinese phrases.
7. Download the checklist.
8. Choose a city or itinerary.

Progress is stored only in the visitor's browser. The interface waits until saved state is loaded, prevents pre-hydration input loss, states its privacy boundary and includes a focused support exit.

## Store and product path

- Made the free checklist versus $7 setup guide decision visible immediately.
- Kept the paid product visible when checkout is not configured, but labels it “temporarily unavailable” and provides a contact fallback.
- Added real page previews, format/delivery notes and clear value boundaries.
- Preserved the local checklist PDF fallback.
- Kept the paid PDF private and avoided fake reviews, sales numbers, discounts or urgency.
- Optimized the downloadable checklist share card from 1,053,486 bytes to 401,198 bytes.

Local checkout configuration is intentionally absent. The UI therefore shows the honest unavailable state; no environment variable was created or changed.

## Tools

- Four tools remain functional: visa-free planning checklist, trip-duration planner, essential-apps checklist and route picker.
- Added explicit empty states, live result regions and copy-result actions.
- Added privacy wording that inputs stay in the browser and do not request passport numbers, bank details or an account.
- Added a hydration-ready boundary so an immediate first click cannot be lost before the client tool is interactive.
- Preserved the visa-policy disclaimer and official-source links; the checker does not claim eligibility or guaranteed entry.

## Contact and Newsletter

- Contact and Newsletter now disable submission until client handling is ready and retain API POST fallbacks.
- Unconfigured backends return an explicit 503-style unavailable message rather than false success.
- Newsletter success navigation no longer places an email address in the URL.
- Error and success messages use accessible live regions.
- The direct site email remains the honest fallback; no 24/7 or official-support claim was added.

## Navigation and shared public UI

- Header and Footer now use the same public names: Start Here, Destinations, Plan Your Trip, Guides, Tools and Store.
- Tools is present in the main navigation.
- The approved brand SVG is used in Header and public 404 recovery.
- Mobile menu focus returns to the trigger after Escape/close; keyboard and 390px layout tests pass.
- Sticky elements use solid backgrounds and do not hide anchored content.
- Footer labels were normalized without adding extra primary navigation noise.

## Legacy routes, sitemap and SEO

- Deleted duplicate page implementations under `/cities*` and `/itineraries*`.
- All 17 compatibility URLs now make a single-hop 301 to their one-to-one `/city-kits*` or `/itinerary-kits*` target.
- No legacy, redirect, 404 or `noindex` URL appears in sitemap.xml.
- Sitemap contains 49 canonical public URLs; all tested sitemap targets return 200.
- Indexable routes missing from sitemap fell from 17 to 0.
- City list now has ItemList JSON-LD.
- City-detail metadata uses the final Hero image; default OG/Twitter metadata uses the branded homepage OG.
- 404 and conversion pages remain `noindex`; 404 supplies Home, Start Here and Guides recovery paths.
- Internal-link audit reports 0 broken links and no rendered legacy-route navigation.

The full-site audit retains one advisory for `/itinerary-kits` missing list-page JSON-LD. That is an approved Phase B page outside Stage D; it is recorded for later work rather than changed here.

## Brand and asset provenance

All public raster/vector assets have a record in `data/image-credits.json`. The Stage D provenance pass adds or completes 23 first-party records for the approved logo/avatar, product covers/previews, social-launch graphics, share cards and QR asset. New external city and homepage photography records include platform, source page, photographer, license and verification date.

The grouped first-party inventory is in `docs/PHASE_D_PUBLIC_ASSET_PROVENANCE.md`.

## Performance comparison

Method: fresh Playwright Chromium context per route, service workers blocked, `networkidle` plus 1.5 seconds stabilization. Baseline is the live production site; final is the optimized local production build. LCP timings are directional because network and host are not identical, so transfer, request, CLS and DOM comparisons are more reliable than treating the two LCP numbers as a deployment prediction.

| Metric across 18 measurements | Baseline | Final |
| --- | ---: | ---: |
| HTTP failures | 0 | 0 |
| LCP P75 (directional lab value) | 996ms | 48ms |
| CLS P75 | 0 | 0 |
| Maximum CLS | 0.0011 | 0.0001 |
| Maximum request count | 72 | 56 |
| Average request count | 43.8 | 40.5 |
| Average initial image transfer | 112KB | 123KB |
| Maximum initial image transfer | 340KB | 454KB |
| Average JS transfer | 178KB | 163KB |
| Maximum JS transfer | 190KB | 172KB |
| Largest individual image response | 127KB | 127KB |
| Maximum DOM nodes | 767 | 714 |
| Separate font-file requests observed | 0 | 0 |

High-resolution destination imagery raises the initial image total on the destination grid (approximately 340KB to 454KB) and on some city pages, but stays bounded through Next image resizing: no individual initial image response exceeds about 127KB. Request count and JS transfer fall, CLS stays far below 0.1, and offscreen images remain lazy-loaded. No new third-party runtime script was introduced.

Raw measurements:

- `docs/PHASE_D_PERFORMANCE_BASELINE.json`
- `docs/PHASE_D_PERFORMANCE_FINAL.json`

## Test and audit results

| Command / check | Result |
| --- | --- |
| `npm install` | PASS — up to date, 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 38/38 |
| `npm run build` | PASS — 57 optimized build surfaces |
| `npm run audit:images` | PASS command; 0 missing files, 0 oversized assets, 0 Hero assets under 2000px, 0 source gaps |
| Phase D scoped image audit | PASS — 0 errors, 0 warnings |
| Playwright desktop/mobile | PASS — 10 passed, 2 intentionally skipped |
| Browser visual/function QA | PASS — no broken images, overflow or console errors |

The full audit has one out-of-scope SEO advisory and six below-1400px content assets inherited from approved itinerary/body content. It does not report a Stage D Hero, Card, missing-file, provenance or semantic mismatch failure.

## Visual evidence

Root: `docs/screenshots/phase-d/`

- `homepage-1440-full.png`, `homepage-390-full.png`
- `start-here-1440-full.png`, `start-here-390-full.png`
- `destinations-1440-full.png`, `destinations-390-full.png`
- `all-city-heroes-comparison.png`, `all-city-cards-comparison.png`
- `store-1440-full.png`, `store-390-full.png`
- `free-checklist-390-full.png`
- `tools-1440-full.png`
- `about-1440-full.png`, `contact-1440-full.png`
- `header-1440.png`, `header-mobile-open-390.png`
- `footer-1440.png`, `footer-390.png`
- `404-1440-full.png`

Manual review confirmed that cities are visually distinct, homepage intent is immediate, Start Here is usable, Store is honest, product previews are legible, mobile crops do not overflow, and the editorial visual system remains restrained.

## Commit list

Commits are intentionally split by audit, destination assets, public experience, routing/provenance and verification. The final report commit becomes the pushed branch head and is reported in the handoff.

1. `3399829` — Audit public pages destination imagery and legacy routes.
2. `0f720bd` — Upgrade destination imagery and city content.
3. `9a0fcf8` — Refine homepage and Start Here experience.
4. `99e3edb` — Upgrade Store tools and public support pages.
5. `6f92734` — Normalize navigation sitemap and legacy routes.
6. `fb33cc7` — Complete public asset provenance records.
7. `fee899d` — Add public page regression tests.
8. `Document phase D results` — current report/final branch-head commit; SHA reported after creation.

## Remaining items

- Production Payhip, Contact and Newsletter service availability depends on existing environment configuration. Stage D did not modify those variables; local unavailable states are honest and tested.
- The full-site audit's `/itinerary-kits` ItemList JSON-LD advisory is outside Stage D and remains for a later approved phase.
- Six below-1400px body/daily assets are inherited from approved itinerary content; there are no Stage D Hero/Card threshold failures.
- Sixteen assets not observed in rendered HTML are retained for external brand, social, Payhip, QR, share or metadata use.
- No production deployment has been performed. Acceptance should occur on this audit branch before any merge decision.
