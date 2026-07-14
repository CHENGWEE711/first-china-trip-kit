# Phase D public-page and destination baseline

Generated: 2026-07-14 (Asia/Shanghai)  
Branch: `audit/full-site-content-image-upgrade`  
Baseline commit: `cd48ce85a6080e24c279fd3a89e3d085f940e0ee`

## Scope and method

This pre-change snapshot covers the homepage, Start Here, destination listing, eight live destination pages, Travel Essentials, Tools and four tool detail pages, Store, checklist/download flows, About, Contact, Newsletter surfaces, thank-you pages, policy pages, Header/Footer, sitemap, robots and legacy city/itinerary routes. Approved Guide and Itinerary content is treated as out of scope except where shared navigation, cards, metadata, or routing affect it.

Evidence sources: current route source, the latest successful build/image audit, local image metadata, `data/image-credits.json`, and rendered-page checks. No production page or asset was changed before this baseline was recorded.

## Executive baseline

| Acceptance area | Baseline | Risk | Phase D action |
| --- | --- | --- | --- |
| City distinction | 8/8 city cards reuse the same file as their Hero; several body images are generic or wrong-topic | High | Give every city a unique Card and Hero, plus city-specific attraction/life, food and transport semantics |
| Homepage first screen | States “practical guidance” but the primary action jumps to a newsletter block; the planning promise is not expressed as a compact problem-to-path system | Medium | Reframe hero around five first-trip problems and a clear Start Here path |
| Start Here | Seven readable steps, but not a stateful/actionable sequence and missing a final “ready to travel” check | Medium | Convert to an eight-step preparation path with clear outcomes and return actions |
| Store | Free and paid products exist, but the page is long and can hide the decision; paid CTA disappears if the production URL is absent | High | Make the free-vs-$7 decision visible above the fold and expose an honest unavailable state |
| Tools | Four client-side tools have inputs and calculated results | Low–Medium | Add clearer empty/result semantics, copy actions, privacy note and keyboard/status QA |
| Contact | Validates input and never fakes success; depends on configured Supabase credentials | Medium | Keep honest failure, improve channel/status clarity, verify production configuration without changing it |
| Newsletter | Validates input and reports unavailable/partial-delivery states honestly | Medium | Keep honest states; verify checklist fallback and production delivery status |
| SEO legacy | 17 indexable `/cities*` and `/itineraries*` routes are omitted from sitemap but still return pages | Critical | Permanently redirect each to the canonical kit route; retain only 200 canonical URLs in sitemap |
| Public image provenance | Existing city assets have complete external credits; first-party brand/product files need clearer provenance grouping | Medium | Extend the public asset manifest for every new/replaced asset |
| Performance | 19 Hero occurrences use assets under 2000px and one asset is oversized site-wide; city assets are 101–669 KB | Medium | Use responsive 2000–2400px WebP sources, target <=700 KB, preserve CLS <0.1 |

## Live destination image baseline

All eight city Hero files are traceable in `data/image-credits.json`. “Card = Hero” is the principal differentiation failure.

| City | Current Card | Current Hero | Card = Hero | Dimensions / size | Baseline semantic issues | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Shanghai | `/images/cities/shanghai-bund-skyline.webp` | same | Yes | 2000×1333 / 327 KB | City is recognizable, but one file carries Card, Hero, Body and itinerary use | Add a distinct street/life Card; keep or replace skyline Hero based on crop QA; use Shanghai-only body scenes |
| Beijing | `/images/cities/beijing-forbidden-city-courtyard.webp` | same | Yes | 2000×1326 / 281 KB | Recognizable Hero; generic station transport and repeated courtyard use | Separate hutong/life Card from imperial Hero; add Beijing transport context |
| Xi'an | `/images/cities/xian-city-wall-sunset.webp` | same | Yes | 2000×1362 / 212 KB | Night-market file is used as both food and attraction support | Use Terracotta/City Wall distinction across Hero/Card; reserve market for food/life |
| Chengdu | `/images/cities/chengdu-panda-base.webp` | same | Yes | 2000×1333 / 301 KB | Panda dominates identity; the street/transport file does double duty | Keep panda for one role only; add teahouse or streetscape Card and true transport context |
| Hangzhou | `/images/cities/hangzhou-west-lake.webp` | same | Yes | 1333×2000 / 128 KB | Portrait source has Hero crop risk; airport-phone and generic restaurant-phone imagery are mismatched | Replace with landscape lake Hero, distinct tea-village/life Card and Hangzhou-specific body scenes |
| Suzhou | `/images/cities/suzhou-lingering-garden.webp` | same | Yes | 1800×1200 / 370 KB | Under 2000px Hero; transport remains generic | Separate garden Hero and canal Card; add Suzhou rail/canal semantics |
| Guangzhou | `/images/cities/guangzhou-canton-tower.webp` | same | Yes | 1432×2000 / 317 KB | Portrait source has strong Hero crop risk; generic dumplings/station imagery weakens Cantonese identity | Replace Hero with landscape river/skyline; Card with old-town/food-life scene; add correct South station/metro context |
| Shenzhen | `/images/cities/shenzhen-skyline.webp` | same | Yes | 1333×2000 / 306 KB | Portrait source has strong Hero crop risk; generic restaurant/airport-phone imagery is mismatched | Replace with landscape modern-city Hero; use design/park/tech Card and Shenzhen transport context |

Baseline counts:

- Live cities: 8
- Unique Hero files: 8/8
- Unique Card files: 8/8
- Cities with Card identical to Hero: 8/8
- City Hero files at least 2000 px wide: 4/8
- City Hero files with automatic wide-crop risk: 3/8 (Hangzhou, Guangzhou, Shenzhen)
- Destination mappings with at least one clearly generic or wrong-topic body image: 8/8
- Existing city image credits complete: 16/16 files currently under `/images/cities`

## Public page baseline

| Route / surface | Current status | Commercial or functional path | Mobile/readability risk | Phase D disposition |
| --- | --- | --- | --- | --- |
| `/` | 200, canonical, sitemap | Checklist jump, Start Here, paid-guide CTA | 72px desktop heading compresses well, but primary CTA intent is split | Upgrade Hero promise, route ladder and destination differentiation |
| `/start-here` | 200, canonical, sitemap | Checklist CTA and paid-guide CTA | Long vertical sequence; images hidden at smaller desktop widths | Build an eight-step action path with explicit completion outcomes |
| `/city-kits` | 200, canonical, sitemap | Destination selection | Four-column cards become visually repetitive because Card=Hero | Distinct Cards, practical filters/labels, clearer city comparison |
| `/city-kits/[8 slugs]` | 200, canonical, sitemap | Related Guides and Itineraries | Dense card rhythm and repeated/mismatched images | Improve page hierarchy, unique Hero/body imagery and metadata image |
| `/travel-essentials` | 200, canonical, sitemap | Links to key preparation Guides | Card/list repetition | Align with Start Here decision path; no Guide copy rewrite |
| `/tools` | 200, canonical, sitemap | Four working tool routes | Preview/result meaning can be unclear before interaction | Add state, copy and accessibility cues |
| `/tools/[4 slugs]` | 200, canonical, sitemap | Client-side calculation/checklist | Results are visible from the start in some tools; no copy affordance | Clarify empty/result/reset/copy and privacy semantics |
| `/store` | 200, canonical, sitemap | Free local PDF or Payhip; $7 Payhip when configured | Very long page and free/paid choice can be buried | Compact decision-first Hero; retain honest purchase availability |
| `/thank-you` | 200, not in sitemap | Direct checklist PDF | Email query parameter is unnecessary exposure | Remove email from URL handoff and keep direct download |
| `/payment-apps-guide/thank-you` | 200, not in sitemap | Post-purchase support/download information | Must not expose paid file publicly | Verify no public paid asset and mark noindex |
| `/contact` | 200, canonical, sitemap | Supabase form, email, optional WhatsApp | Long form is usable but status/channel expectations are low on page | Improve status/help copy; preserve real failure states |
| Newsletter surfaces | Embedded | Supabase/Brevo/Mailchimp/Resend or honest 503 | White-on-dark form is readable; redirect carries email query | Remove query email, preserve consent and failure reporting |
| `/about` + policies | 200, canonical, sitemap | Trust/legal support | Mostly text; low visual hierarchy | Standardize public-page template and dates/source language |
| 404 | Next default/custom state to verify | Recovery navigation | Needs explicit useful exits | Add/verify branded recovery links |
| Header/Footer | Shared | Primary discovery and contact | Header omits Tools; footer includes Tools | Make primary and support navigation consistent, preserve mobile focus handling |

## Functionality baseline

- Free checklist: a real local PDF fallback exists at `/china-first-time-visitor-checklist.pdf`; optional Payhip support link is environment-driven.
- Paid guide: checkout is intentionally environment-driven. When no URL is configured locally, the CTA disappears; this is honest but not self-explanatory.
- Contact: client and server validation exist, honeypot exists, and the server returns 503 rather than false success when storage is not configured.
- Newsletter: client/server validation, honeypot, UTM capture and multiple providers exist. It returns honest unavailable, duplicate, saved-without-delivery and active-delivery states.
- Tools: all four tools run in the browser and do not submit passport or trip inputs to the server. The apps checklist is stored locally.

## Baseline audit metrics inherited from the current successful image audit

| Metric | Value |
| --- | ---: |
| Build surfaces | 74 |
| Successful rendered routes | 71 |
| Image occurrences | 499 |
| Unique referenced local assets | 51 |
| Reference duplicate groups | 43 |
| Perceptual near-duplicate groups | 14 |
| Hero occurrences under 2000px | 19 |
| Content occurrences under 1400px | 7 |
| Missing files | 2 |
| Broken internal links | 0 |
| Indexable routes missing from sitemap | 17 |

The two missing-file findings and five page issues are carried forward to the final audit for closure rather than silently excluded.

## Baseline conclusion

Stage D is not primarily a “more photos” problem. It is a role-assignment, route-governance and action-path problem: city assets must have distinct Card/Hero/body jobs; public pages must expose honest working outcomes; and legacy routes must resolve decisively to one canonical URL. The upgrade will preserve the approved Guide/Itinerary content and existing Vercel/environment setup.
