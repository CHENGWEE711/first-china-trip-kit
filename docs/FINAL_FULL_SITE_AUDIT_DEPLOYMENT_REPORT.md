# First China Trip Kit — Final Full-Site Audit and Deployment Report

Generated: 2026-07-14  
Repository: `CHENGWEE711/first-china-trip-kit`  
Release branch: `audit/full-site-content-image-upgrade`  
Pull request: `#1 — Full-site content, image and UX quality upgrade`  
Production baseline before this release: `bf41908596635695cd85a24cef6c7d6f6d71db0e`

## Executive result

**Preview acceptance: PASS. Production release: authorized only after the final report-only head is Ready.**

Stages A–E close the full-site audit from inventory through image/content remediation, commercial regression, Preview verification and production release gates. No new Vercel project was created, and no domain or environment variable was changed or deleted.

## Scope and change totals

| Metric | Final result |
| --- | ---: |
| Changed page templates | 15 |
| Canonical route instances represented by those templates | 40+ |
| Build surfaces | 57 (55 HTML/metadata + 2 API) |
| Canonical sitemap URLs | 49 |
| Public Guides reviewed/upgraded | 14/14 |
| Current destinations differentiated | 8/8 |
| Published itinerary kits covered | 7/7 |
| Priority itinerary daily images matched | 26/26 |
| New optimized visual files/derivatives across B–D | 54 |
| Final in-place high-resolution replacements | 6 |
| Confirmed unused image files deleted | 7 |
| Final public image assets | 116 |
| Legacy routes converted to single-hop 301 | 17 |

The 54 new optimized files are 15 itinerary images, 28 Guide Hero/Card derivatives and 11 city/home visuals. Phase C deleted two obsolete Guide files, Phase D deleted five superseded unused files, and Phase E replaced six low-width files in place from exact licensed originals.

## What changed

### Itineraries

- Four priority itineraries now map every day explicitly instead of cycling a short image list.
- Card/Hero identities distinguish Beijing, Beijing + Xi'an, Shanghai/Hangzhou/Suzhou and airport-led 240-hour transit at a glance.
- The full seven-kit list now emits one canonical `ItemList` matching visible order and images.
- Guide-versus-itinerary intent is explicit for the 240-hour and Shanghai pairs.

### Guides

- All 14 Guides have separate semantic 2400×1600 Heroes and 1800×1200 Cards.
- Payment, app, visa and rail content uses traceable real photography rather than generic scenery or fabricated app screens.
- Inline imagery fell from 42 slots to 27 intentional matches; final mismatch/partial counts are zero.
- Payment, apps, eSIM, rail and transit language is cautious, dated and linked to primary sources.

### Cities and public pages

- All eight cities have unique Heroes, Cards and city-specific attraction/life/food/transport roles.
- Homepage first-screen copy now identifies payments, apps, entry and first-day logistics as the core problem solved.
- Start Here is an eight-step action path with browser-only progress.
- Store, four Tools, Contact and Newsletter expose working behavior or an honest unavailable state.
- The 17 legacy city/itinerary routes no longer appear in the sitemap or structured data.

## Final image decision

The six Stage D threshold exceptions were not visibly blurred; the audit failure came from portrait short-edge dimensions. Each was re-exported from its exact Unsplash original at a genuine 1600px short edge. No interpolation or AI upscaling was used.

Final image audit:

- 349 rendered image occurrences.
- 100 referenced local assets and 16 intentionally retained external/metadata assets.
- 0 missing files.
- 0 exact-content duplicate groups.
- 0 Hero assets under 2000px.
- 0 Card/body/daily assets under 1400px.
- 0 source assets above 700KB.
- 0 incomplete license or first-party provenance records.
- 0 visible broken images in local and authenticated Preview checks.

The 16 externally retained assets are individually documented in `PHASE_E_EXTERNAL_ASSET_RETENTION_AUDIT.md`.

## Content and policy freshness

- The 240-hour transit snapshot is 55 eligible nationalities, 65 ports and 24 provincial-level regions, with the third-country/region ticket rule and no guaranteed-entry claim.
- Payment guidance keeps mobile payment, bank card and cash as a layered backup, without promising universal acceptance.
- Rail guidance uses current 12306 passport/identity instructions.
- All visa-sensitive surfaces keep a visible rules-can-change disclaimer and last-verified date.
- Official NIA, China Government, 12306, provider, embassy and transport links returned successful responses during the audit.

## SEO and redirect result

- 49 canonical sitemap URLs, each represented by a 200 route in local release testing.
- 17/17 legacy routes return one 301 hop locally; Vercel Preview's anonymous SSO layer returns its own 302 before application routing, so authenticated Preview and local application tests were used separately.
- 0 broken internal links and 0 indexable routes missing from the sitemap.
- Titles, descriptions, canonicals and H1s are unique/complete in the audited canonical set.
- 404 and conversion thank-you pages remain out of search results.
- Homepage, Guide, destination, itinerary, breadcrumb, FAQ, ItemList and Product structured data is present where appropriate.

## Commercial and analytics result

- Production Payhip products are public: free/PWYW checklist (`$0` accepted; `$5` suggested) and the `US$7.00` 18-page Payment & Apps Guide.
- Store copy now explains the optional Payhip tip instead of surprising a visitor arriving from a “free” CTA.
- Payhip links add source/medium/campaign plus placement-specific content UTM values; internal links stay clean.
- One controlled Preview Contact submission reached the configured backend and returned a real saved state.
- Newsletter configuration exists for Preview and Production. No irreversible test subscriber was left behind; validation, duplicate, privacy-safe URL and success/failure behavior is covered by configured integration tests.
- CTA, download, checkout, contact, newsletter and tool analytics events are wired; visa-tool completion now fires once only at true completion.

## Security and privacy result

- Public repository current tree and full Git history: 0 high-confidence secret matches.
- Tracked environment files: one safe `.env.example`; sensitive values are empty.
- `.vercel`, local environment and build output remain ignored.
- 392 dependency packages audited; 0 known vulnerabilities.
- Public static source maps: 0.
- Contact/Newsletter use server validation, bounded fields, honeypots, loading states and generic errors.
- Security headers cover nosniff, strict-origin referrer policy, frame restriction and disabled camera/microphone/geolocation.
- CSP remains a non-blocking follow-up to introduce in report-only mode before enforcement.

## Test and build record

| Gate | Result |
| --- | --- |
| `npm install` | Pass; 392 packages, 0 vulnerabilities |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm test` | Pass; 45/45 after final Payhip/UTM fixes |
| `npm run build` | Pass; Next.js 16.2.10, 57 surfaces |
| Full local Playwright matrix | 468 passed, 0 failed; Chromium/WebKit/Firefox at desktop, 390px and 320px |
| Final focused local gate | 24 passed, 0 failed |
| Authenticated Preview representative routes | 10/10 pass |
| Authenticated Preview 320px checks | 3/3 pass |
| Preview Contact live submission | Pass |
| Preview Store unavailable state | Pass |

The anonymous external Playwright run was intentionally not counted as an application failure: the protected Preview alias redirects unauthenticated requests to Vercel SSO and introduced Vercel login timeouts/console output. An authenticated Chrome session verified the actual application with one H1, correct canonical, no missing alt, no visible broken image and no horizontal overflow on every sampled route. Cross-engine behavior was already covered against the identical production build locally.

## Performance

Local production-mode measurement across 13 representative routes:

| Metric | Final |
| --- | ---: |
| LCP p75 | 48ms |
| TTFB p75 | 5ms |
| CLS p75 / max | 0 / 0.0001 |
| Max long-task proxy | 0ms |
| Max loaded image response | 215,620 bytes |
| Max JS response | 176,093 bytes |
| Max DOM nodes | 858 |
| Broken / unused loaded images | 0 / 0 |

These are controlled local lab timings, not public Core Web Vitals. They are used for before/after regression detection. Vercel native Speed Insights is not enabled, so no field percentile is invented.

## Preview acceptance and release sequence

The existing Vercel project `china-travel-kit` generated a Ready Preview for each application commit. The stable protected branch alias is:

`https://china-travel-kit-git-audit-fu-753e09-chengwee711-4164s-projects.vercel.app`

The application build through `8d662ff91c82d994d919a62fb615f7caed2ff2f4` contains the final functional changes. This report is the only subsequent content change. The final report head must also show Vercel `Ready` before PR #1 is merged.

Production uses the existing domains only:

- `https://www.firstchinatripkit.com`
- `https://firstchinatripkit.com`

No new Vercel project, domain or environment was created or changed. The GitHub merge SHA, production deployment status and final public HTTP/SEO verification are recorded in the release handoff after merge because they do not exist until the Preview gate has passed.

## Rollback

If a production-only defect appears:

1. Redeploy the last known-good production deployment for baseline `bf41908596635695cd85a24cef6c7d6f6d71db0e` in the existing Vercel project, or revert the PR merge through a new reviewed PR.
2. Do not change DNS, domains or environment variables as a first response.
3. Confirm both domains, `sitemap.xml`, `robots.txt`, Contact and Store after rollback.

## Non-blocking follow-ups

- Introduce CSP in report-only mode, observe GA/Metricool/Vercel/Payhip requirements, then enforce.
- Consider enabling Vercel Speed Insights for real-user Core Web Vitals if the Hobby/plan decision allows it.
- If direct Payhip checks are desired on Preview, copy the two public Payhip URLs into Preview through a separately approved environment change. Production is already configured; the current Preview unavailable state is honest and tested.
- Run a newsletter delivery test only when a removable test address or Brevo cleanup access is available.

