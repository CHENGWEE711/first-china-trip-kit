# Phase D image and public-page audit

Generated: 2026-07-14 (Asia/Shanghai)  
Branch: `audit/full-site-content-image-upgrade`

## Result

**PASS — 0 Phase D errors, 0 Phase D warnings.**

The audit covers the homepage, Start Here, destination list, eight current city pages, Store, Tools, shared public support surfaces, metadata imagery, legacy routing and sitemap behavior.

| Check | Result |
| --- | ---: |
| Current cities | 8 |
| Complete explicit city visual sets | 8/8 |
| Unique city Hero sources | 8/8 |
| Unique city Card sources | 8/8 |
| City Card equal to its Hero | 0/8 |
| Hero files at least 2000px wide | 8/8 |
| Card files at least 1400px wide | 8/8 |
| Hero/Card assets above 700KB | 0 |
| Obvious city-image mismatches | 0 |
| Missing referenced image files | 0 |
| Oversized public images | 0 |
| Incomplete site-image license records | 0 |
| First-party assets without provenance | 0 |
| Broken internal links | 0 |
| Indexable canonical routes missing from sitemap | 0 |
| Desktop/mobile broken images, overflow or console errors | 0 |

## Semantic closure

- Every city uses a separate Hero and Card.
- Guangzhou now uses its own Pearl River Hero, heritage-street Card, Cantonese dim-sum image and Huadiwan metro image.
- Shenzhen now uses its own bay Hero, modern-architecture Card, Chaoshan hot-pot image and documented Shenzhen Metro image.
- Suzhou uses a canal Hero and garden Card, while Hangzhou is separated through West Lake and Longjing tea imagery.
- Homepage Hero and Open Graph image are independent of city and Guide Hero assets.
- Homepage destination and Guide cards use the target page's real Card data; no fallback image map remains.

## Asset cleanup

Five confirmed, unreferenced replacements were deleted:

- `/images/cities/details/suzhou-market-street.webp`
- `/images/cities/guangzhou-canton-tower.webp`
- `/images/cities/hangzhou-west-lake.webp`
- `/images/essentials/chinese-dumplings-restaurant.webp`
- `/images/guides/best-apps-metro-phone.webp`

The full-site audit still labels 16 files as unused by rendered website HTML. They are intentionally retained because they are externally used brand avatars, social publishing assets, Payhip covers, QR/share files, or metadata images that the renderer does not classify as body-image occurrences.

## Evidence

- Static suite: 38/38 passed, including 14 Phase D checks.
- Browser suite: 10 passed, 2 intentionally skipped in the redundant mobile project.
- Full audit: `docs/phase-d-audit/PHASE_B_ITINERARY_IMAGE_AUDIT.json`.
- Visual evidence: `docs/screenshots/phase-d/`.

The inherited full-site audit still reports one non-image advisory: `/itinerary-kits` lacks list-page JSON-LD. That approved Phase B page is outside Stage D, so it is recorded for later work rather than changed here.
