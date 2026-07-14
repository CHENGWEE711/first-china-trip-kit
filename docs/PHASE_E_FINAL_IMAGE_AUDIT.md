# First China Trip Kit — Phase E Final Image Audit

Generated: 2026-07-14  
Repository: `CHENGWEE711/first-china-trip-kit`  
Branch: `audit/full-site-content-image-upgrade`  
Machine-readable record: `docs/PHASE_E_FINAL_IMAGE_AUDIT.json`

## Result

**PASS.** The final rendered-site audit found no missing image, threshold failure, oversized asset, exact-content duplicate, incomplete license record, first-party provenance gap or itinerary-day mismatch.

| Metric | Final |
| --- | ---: |
| Build surfaces represented | 57 (55 HTML/metadata + 2 API) |
| Rendered image occurrences | 349 |
| Public image assets | 116 |
| Referenced / externally retained | 100 / 16 |
| Missing referenced files | 0 |
| Exact-content duplicate groups | 0 |
| Perceptual review candidates | 14 |
| Hero assets below 2000px | 0 |
| Card/body/daily assets below 1400px | 0 |
| Assets above 700KB | 0 |
| Incomplete site-image licenses | 0 |
| First-party assets without provenance | 0 |
| Priority itinerary daily matches | 26/26 |
| Broken internal links | 0 |
| Indexable routes missing from sitemap | 0 |

## The six Stage D threshold exceptions

The six files were not visibly blurred. They were portrait originals exported at 1600px on the long edge, so their short edge fell below the audit's 1400px numeric rule even though the rendered crops were clear. Phase E re-exported each file from the exact licensed Unsplash original at a genuine 1600px short edge; no interpolation or AI upscaling was used.

| File | Final dimensions | Final size | Decision |
| --- | ---: | ---: | --- |
| `/images/cities/shenzhen-skyline.webp` | 1600×2400 | 474KB | Keep; exact-source high-resolution export |
| `/images/itineraries/classic-china/day-1-beijing-hutong.webp` | 1600×2315 | 584KB | Keep; exact-source high-resolution export |
| `/images/itineraries/classic-china/day-5-terracotta-warriors.webp` | 1600×2133 | 60KB | Keep; source is naturally low-complexity but visually sharp |
| `/images/itineraries/classic-china/day-6-shanghai-bund.webp` | 1600×2400 | 240KB | Keep; exact-source high-resolution export |
| `/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp` | 1600×2400 | 680KB | Keep; below the 700KB ceiling |
| `/images/itineraries/classic-china/day-9-shanghai-museum.webp` | 1600×2400 | 370KB | Keep; exact-source high-resolution export |

Pixel comparison against the downloaded originals produced low RMSE values (1.45–6.06), consistent with normal WebP encoding rather than synthetic enlargement. All four previously incomplete Classic China source records now point to exact Unsplash photo pages and were reverified on 2026-07-14.

## Duplicate interpretation

The 50 same-file reference groups are intentional component-level reuse: Guide cards on related surfaces, shared locations across itineraries, and product CTAs. They are not duplicate files. The audit found zero identical-content files under different names.

The 14 perceptual candidates are a manual-review signal. Each pair/group was retained because the files depict different cities, roles, crops or editorial contexts; no candidate is an accidental copy or semantic mismatch.

## Loading and performance

- Above-the-fold itinerary cards are eager only for the first three visible cards; the remainder stay lazy.
- Hero images keep explicit responsive `sizes`, stable aspect-ratio containers and priority loading.
- Guide and daily body images remain lazy and use responsive Next Image derivatives.
- Final local production measurement: LCP p75 48ms, CLS p75 0, max CLS 0.0001, max loaded image response 215,620 bytes, zero broken or unused loaded images.
- Source files are capped at 700KB; source dimensions are not sent directly when a smaller responsive derivative is sufficient.

## Asset retention

Sixteen assets do not appear as `<img>` elements in rendered HTML but are retained for external or metadata use. Their individual decisions are documented in `docs/PHASE_E_EXTERNAL_ASSET_RETENTION_AUDIT.md`. No externally used brand, Metricool, Payhip, QR, share or Open Graph asset was deleted.

