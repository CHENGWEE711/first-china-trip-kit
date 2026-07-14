# First China Trip Kit — Itinerary Image Verification Audit (Phase B)

Generated: 2026-07-14T11:31:14.073Z  
Repository: `CHENGWEE711/first-china-trip-kit`  
Audit branch: `audit/full-site-content-image-upgrade`  
Production baseline: `bf41908596635695cd85a24cef6c7d6f6d71db0e`  
Production URL: http://127.0.0.1:3000

> Scope lock: this verification covers only the four Phase B itinerary kits and their related 240-hour policy references. Guide, city, homepage, Store and global-design findings remain outside this phase.

## Executive result

| Metric | Result |
| --- | ---: |
| Build surfaces represented | 57 (55 routes + 2 API endpoints) |
| Page-image occurrences | 349 |
| Public image assets | 116 |
| Referenced / unused assets | 100 / 16 |
| Missing referenced image files | 0 |
| File-reference duplicate groups | 50 |
| Exact-content duplicate groups with different filenames | 0 |
| Perceptual near-duplicate groups | 14 |
| Hero assets below 2000px | 0 |
| Card/body/daily assets below 1400px | 6 |
| Assets above 700KB | 0 |
| Site images with incomplete license records | 0 |
| First-party assets lacking a formal provenance record | 0 |
| Broken internal links | 0 |
| Indexable routes missing from sitemap | 0 |

## Highest-priority findings

1. **PASS — all 26 priority daily slots have explicit semantic mappings.** Mismatches: 0; partial matches: 0. The modulo image loop is gone.
2. **PASS — the four itinerary identities are independent.** Card and Hero sources are unique across the Phase B routes, with separate visual cues for Beijing, Beijing + Xi'an, the eastern-China trio, and airport-led 240-hour transit.
3. **PASS — 240-hour policy provenance is current.** Both the itinerary and related Guide use current NIA Chinese/English sources checked on 2026-07-14, show the verification date, and retain explicit airline/NIA confirmation language.
4. **PASS — Phase B image thresholds are enforced by tests.** Target Heroes are at least 2000px wide; target Card/Daily assets are at least 1400px wide; all are WebP and no larger than 700KB.
5. **OUTSIDE SCOPE — existing city and cross-site findings remain unchanged.** Generic Hangzhou/Guangzhou/Shenzhen imagery, global duplicate groups, and first-party provenance gaps belong to later phases.

## Priority itinerary daily-image audit

Status totals: **0 mismatch**, **0 partial**, **26 matched**.

| Itinerary | Day | Day title | Current image | Match | Reason | Action |
| --- | ---: | --- | --- | --- | --- | --- |
| 4-days-in-beijing | 1 | Arrival, Temple of Heaven, and Easy Dinner | `/images/cities/details/beijing-hutong-street.webp` | yes | Arrival and hutong option uses a Beijing hutong street scene. | Keep candidate |
| 4-days-in-beijing | 2 | Forbidden City, Jingshan, and Central Beijing | `/images/cities/beijing-forbidden-city-courtyard.webp` | yes | Forbidden City and Jingshan day uses the Forbidden City courtyard. | Keep candidate |
| 4-days-in-beijing | 3 | Great Wall Day | `/images/itineraries/classic-china/day-3-great-wall.webp` | yes | Great Wall day uses a Great Wall mountain scene. | Keep candidate |
| 4-days-in-beijing | 4 | Summer Palace, Hutongs, or Museum Buffer | `/images/itineraries/4-days-beijing/day-4-summer-palace.webp` | yes | Flexible Summer Palace day uses the Summer Palace. | Keep candidate |
| 5-days-beijing-and-xian | 1 | Arrive in Beijing | `/images/cities/details/beijing-hutong-market.webp` | yes | Arrival and hutong option uses a Beijing hutong market scene. | Keep candidate |
| 5-days-beijing-and-xian | 2 | Forbidden City Core Day | `/images/cities/beijing-forbidden-city-courtyard.webp` | yes | Forbidden City core day uses the Forbidden City courtyard. | Keep candidate |
| 5-days-beijing-and-xian | 3 | Great Wall | `/images/itineraries/classic-china/day-3-great-wall.webp` | yes | Mutianyu day uses a Great Wall mountain scene. | Keep candidate |
| 5-days-beijing-and-xian | 4 | Transfer to Xi'an and City Wall | `/images/guides/high-speed-train-china.webp` | yes | Beijing-to-Xi'an transfer day uses a Chinese high-speed train. | Keep candidate |
| 5-days-beijing-and-xian | 5 | Terracotta Warriors | `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp` | yes | Terracotta Warriors day uses a wide excavation-pit view. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 1 | Arrive in Shanghai | `/images/cities/shanghai-bund-skyline.webp` | yes | Shanghai arrival and Bund day uses the Shanghai skyline. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 2 | Classic Shanghai | `/images/itineraries/eastern-china/yu-garden-shanghai.webp` | yes | Old City and Yu Garden day uses Yu Garden. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 3 | Shanghai Modern Culture | `/images/guides/shanghai-three-days-street.webp` | yes | Shanghai culture and neighborhood day uses a Shanghai street scene. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 4 | Train to Hangzhou | `/images/guides/high-speed-train-china.webp` | yes | Shanghai-to-Hangzhou transfer day uses a Chinese high-speed train. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 5 | Tea Fields and Temples | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | yes | Lingyin and Longjing day uses Longjing tea fields. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 6 | Train to Suzhou | `/images/cities/suzhou-lingering-garden.webp` | yes | Hangzhou-to-Suzhou transfer and garden day uses a Suzhou garden. | Keep candidate |
| 7-days-shanghai-hangzhou-suzhou | 7 | Suzhou Gardens and Return | `/images/travel/china-railway-station-interior.webp` | yes | Return-to-Shanghai day uses a modern railway station. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 1 | Arrive in Shanghai | `/images/guides/americans-china-airport-arrivals.webp` | yes | Shanghai arrival day uses an international airport arrivals scene. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 2 | Shanghai Essentials | `/images/cities/shanghai-bund-skyline.webp` | yes | Shanghai essentials day uses the Shanghai skyline. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 3 | French Concession and Local Life | `/images/guides/shanghai-three-days-street.webp` | yes | French Concession day uses a Shanghai street scene. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 4 | Train to Hangzhou | `/images/guides/high-speed-train-china.webp` | yes | Train-to-Hangzhou day uses a Chinese high-speed train. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 5 | Hangzhou Tea and Temples | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | yes | Lingyin and Longjing day uses Longjing tea fields. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 6 | Hangzhou Slow Morning, Return to Shanghai | `/images/itineraries/240-hour-transit/day-6-west-lake.webp` | yes | West Lake and return-to-Shanghai day uses a West Lake panorama. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 7 | Suzhou Day Trip | `/images/cities/details/suzhou-canal-lanterns.webp` | yes | Suzhou day trip uses a Suzhou canal scene. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 8 | Shanghai Modern Day | `/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp` | yes | Modern Shanghai day uses the Pudong skyline. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 9 | Buffer and Optional Water Town | `/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp` | yes | Water-town buffer day uses Zhujiajiao. | Keep candidate |
| 240-hour-visa-free-china-itinerary | 10 | Depart to Third Country or Region | `/images/itineraries/classic-china/day-10-airport-departure.webp` | yes | Departure day uses a modern airport departure hall. | Keep candidate |

## Duplicate image groups

### Same-file references across multiple pages

- **reference-1** — `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp`: 21 occurrences / 21 pages. Pages: /, /city-kits/beijing, /city-kits/chengdu, /city-kits/guangzhou, /city-kits/hangzhou, /city-kits/shanghai, /city-kits/shenzhen, /city-kits/suzhou … (+13)
- **reference-2** — `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp`: 19 occurrences / 19 pages. Pages: /, /city-kits/beijing, /city-kits/chengdu, /city-kits/guangzhou, /city-kits/hangzhou, /city-kits/shanghai, /city-kits/shenzhen, /city-kits/suzhou … (+11)
- **reference-3** — `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp`: 13 occurrences / 13 pages. Pages: /city-kits/beijing, /city-kits/chengdu, /city-kits/guangzhou, /city-kits/hangzhou, /city-kits/shanghai, /city-kits/shenzhen, /city-kits/suzhou, /city-kits/xian … (+5)
- **reference-4** — `/images/itineraries/classic-china/day-3-great-wall.webp`: 17 occurrences / 10 pages. Pages: /city-kits/chengdu, /city-kits/guangzhou, /city-kits/hangzhou, /city-kits/shanghai, /city-kits/shenzhen, /city-kits/xian, /itinerary-kits, /itinerary-kits/10-days-classic-china-itinerary … (+2)
- **reference-5** — `/images/travel/china-high-speed-rail-platform.webp`: 7 occurrences / 7 pages. Pages: /about, /city-kits/chengdu, /city-kits/hangzhou, /city-kits/suzhou, /city-kits/xian, /guides/how-to-book-high-speed-trains-in-china, /travel-essentials
- **reference-6** — `/products/previews/payment-apps-guide-store-cover.png`: 8 occurrences / 7 pages (likely reasonable first-party reuse). Pages: /, /guides/china-food-ordering-guide, /guides/how-to-use-alipay-and-wechat-pay-in-china, /itinerary-kits/240-hour-visa-free-china-itinerary, /itinerary-kits/3-days-in-shanghai, /itinerary-kits/4-days-in-beijing, /store
- **reference-7** — `/images/cities/details/beijing-hutong-street.webp`: 8 occurrences / 6 pages. Pages: /, /city-kits, /city-kits/beijing, /itinerary-kits, /itinerary-kits/3-days-in-beijing, /itinerary-kits/4-days-in-beijing
- **reference-8** — `/images/cities/shanghai-bund-skyline.webp`: 8 occurrences / 6 pages. Pages: /city-kits/shanghai, /guides/3-days-in-shanghai-for-first-time-visitors, /itinerary-kits, /itinerary-kits/240-hour-visa-free-china-itinerary, /itinerary-kits/3-days-in-shanghai, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-9** — `/images/guides/shanghai-three-days-street.webp`: 8 occurrences / 6 pages. Pages: /, /city-kits, /city-kits/shanghai, /itinerary-kits/240-hour-visa-free-china-itinerary, /itinerary-kits/3-days-in-shanghai, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-10** — `/images/itineraries/240-hour-transit/card-passport-luggage.webp`: 11 occurrences / 6 pages. Pages: /city-kits/chengdu, /city-kits/guangzhou, /city-kits/hangzhou, /city-kits/shenzhen, /city-kits/suzhou, /itinerary-kits
- **reference-11** — `/images/travel/china-railway-station-interior.webp`: 6 occurrences / 6 pages. Pages: /city-kits/beijing, /city-kits/shanghai, /guides/3-days-in-shanghai-for-first-time-visitors, /guides/best-apps-for-traveling-in-china, /guides/how-to-book-high-speed-trains-in-china, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-12** — `/images/guides/high-speed-train-china.webp`: 8 occurrences / 5 pages. Pages: /guides/china-240-hour-visa-free-transit-guide, /itinerary-kits/10-days-classic-china-itinerary, /itinerary-kits/240-hour-visa-free-china-itinerary, /itinerary-kits/5-days-beijing-and-xian, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-13** — `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp`: 7 occurrences / 5 pages. Pages: /, /city-kits, /city-kits/beijing, /city-kits/xian, /itinerary-kits
- **reference-14** — `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp`: 8 occurrences / 5 pages. Pages: /city-kits, /city-kits/hangzhou, /city-kits/shanghai, /city-kits/suzhou, /itinerary-kits
- **reference-15** — `/images/cities/beijing-forbidden-city-courtyard.webp`: 6 occurrences / 4 pages. Pages: /city-kits/beijing, /itinerary-kits/3-days-in-beijing, /itinerary-kits/4-days-in-beijing, /itinerary-kits/5-days-beijing-and-xian
- **reference-16** — `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp`: 4 occurrences / 4 pages. Pages: /, /guides, /guides/3-days-in-shanghai-for-first-time-visitors, /guides/can-americans-travel-to-china-in-2026
- **reference-17** — `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp`: 4 occurrences / 4 pages. Pages: /guides, /guides/can-americans-travel-to-china-in-2026, /guides/china-240-hour-visa-free-transit-guide, /guides/how-to-book-high-speed-trains-in-china
- **reference-18** — `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp`: 4 occurrences / 4 pages. Pages: /guides, /guides/how-to-pay-in-china-as-a-foreigner, /guides/how-to-use-alipay-and-wechat-pay-in-china, /guides/how-to-use-wechat-pay-in-china-as-a-foreigner
- **reference-19** — `/images/itineraries/eastern-china/longjing-tea-fields.webp`: 5 occurrences / 4 pages. Pages: /city-kits, /city-kits/hangzhou, /itinerary-kits/240-hour-visa-free-china-itinerary, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-20** — `/images/travel/phone-scanning-qr.webp`: 4 occurrences / 4 pages. Pages: /guides/china-food-ordering-guide, /guides/how-to-use-alipay-and-wechat-pay-in-china, /guides/how-to-use-alipay-in-china-as-a-tourist, /guides/how-to-use-wechat-pay-in-china-as-a-foreigner
- **reference-21** — `/images/cities/details/beijing-hutong-market.webp`: 3 occurrences / 3 pages. Pages: /city-kits/beijing, /itinerary-kits/3-days-in-beijing, /itinerary-kits/5-days-beijing-and-xian
- **reference-22** — `/images/cities/details/chengdu-street-transport.webp`: 3 occurrences / 3 pages. Pages: /, /city-kits, /city-kits/chengdu
- **reference-23** — `/images/guides/china-preflight-checklist.webp`: 3 occurrences / 3 pages. Pages: /guides/can-americans-travel-to-china-in-2026, /guides/china-240-hour-visa-free-transit-guide, /guides/china-travel-packing-list
- **reference-24** — `/images/guides/order-food-shanghai-stall.webp`: 3 occurrences / 3 pages. Pages: /city-kits/shanghai, /guides/3-days-in-shanghai-for-first-time-visitors, /itinerary-kits/3-days-in-shanghai
- **reference-25** — `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp`: 3 occurrences / 3 pages. Pages: /guides, /guides/china-food-ordering-guide, /guides/china-travel-checklist-before-you-fly
- **reference-26** — `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp`: 3 occurrences / 3 pages. Pages: /guides, /guides/best-apps-for-traveling-in-china, /guides/china-travel-checklist-before-you-fly
- **reference-27** — `/images/guides/phase-c/china-travel-packing-list/card.webp`: 3 occurrences / 3 pages. Pages: /guides, /guides/basic-chinese-phrases-for-travelers, /guides/china-esim-guide-for-tourists
- **reference-28** — `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp`: 3 occurrences / 3 pages. Pages: /guides, /guides/how-to-use-alipay-and-wechat-pay-in-china, /guides/how-to-use-alipay-in-china-as-a-tourist
- **reference-29** — `/images/travel/phone-qr-code.webp`: 3 occurrences / 3 pages. Pages: /guides/best-apps-for-traveling-in-china, /guides/how-to-use-alipay-and-wechat-pay-in-china, /guides/how-to-use-wechat-pay-in-china-as-a-foreigner
- **reference-30** — `/images/cities/details/suzhou-canal-lanterns.webp`: 2 occurrences / 2 pages. Pages: /city-kits/suzhou, /itinerary-kits/240-hour-visa-free-china-itinerary
- **reference-31** — `/images/cities/phase-d/guangzhou-heritage-street-card.webp`: 2 occurrences / 2 pages. Pages: /city-kits, /city-kits/guangzhou
- **reference-32** — `/images/cities/phase-d/shenzhen-modern-architecture-card.webp`: 2 occurrences / 2 pages. Pages: /city-kits, /city-kits/shenzhen
- **reference-33** — `/images/cities/suzhou-lingering-garden.webp`: 2 occurrences / 2 pages. Pages: /city-kits/suzhou, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-34** — `/images/cities/xian-city-wall-sunset.webp`: 2 occurrences / 2 pages. Pages: /city-kits/xian, /itinerary-kits/10-days-classic-china-itinerary
- **reference-35** — `/images/guides/americans-china-airport-arrivals.webp`: 2 occurrences / 2 pages. Pages: /guides/china-travel-checklist-before-you-fly, /itinerary-kits/240-hour-visa-free-china-itinerary
- **reference-36** — `/images/guides/china-esim-airport-phone.webp`: 2 occurrences / 2 pages. Pages: /guides/best-apps-for-traveling-in-china, /travel-essentials
- **reference-37** — `/images/guides/china-packing-essentials.webp`: 2 occurrences / 2 pages. Pages: /guides/china-travel-checklist-before-you-fly, /travel-essentials
- **reference-38** — `/images/guides/payment-guide-backup-kit.webp`: 2 occurrences / 2 pages. Pages: /guides/china-travel-packing-list, /guides/how-to-pay-in-china-as-a-foreigner
- **reference-39** — `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/card.webp`: 2 occurrences / 2 pages. Pages: /guides, /guides/china-240-hour-visa-free-transit-guide
- **reference-40** — `/images/guides/phase-c/can-americans-travel-to-china-in-2026/card.webp`: 2 occurrences / 2 pages. Pages: /guides, /guides/china-240-hour-visa-free-transit-guide
- **reference-41** — `/images/itineraries/240-hour-transit/day-6-west-lake.webp`: 2 occurrences / 2 pages. Pages: /city-kits/hangzhou, /itinerary-kits/240-hour-visa-free-china-itinerary
- **reference-42** — `/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp`: 3 occurrences / 2 pages. Pages: /city-kits/beijing, /itinerary-kits
- **reference-43** — `/images/itineraries/4-days-beijing/day-4-summer-palace.webp`: 2 occurrences / 2 pages. Pages: /city-kits/beijing, /itinerary-kits/4-days-in-beijing
- **reference-44** — `/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp`: 2 occurrences / 2 pages. Pages: /city-kits/beijing, /itinerary-kits/4-days-in-beijing
- **reference-45** — `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp`: 2 occurrences / 2 pages. Pages: /city-kits/xian, /itinerary-kits/5-days-beijing-and-xian
- **reference-46** — `/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp`: 2 occurrences / 2 pages. Pages: /city-kits/xian, /itinerary-kits/5-days-beijing-and-xian
- **reference-47** — `/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp`: 2 occurrences / 2 pages. Pages: /city-kits/hangzhou, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-48** — `/images/itineraries/classic-china/day-10-airport-departure.webp`: 2 occurrences / 2 pages. Pages: /itinerary-kits/10-days-classic-china-itinerary, /itinerary-kits/240-hour-visa-free-china-itinerary
- **reference-49** — `/images/itineraries/eastern-china/yu-garden-shanghai.webp`: 2 occurrences / 2 pages. Pages: /city-kits/shanghai, /itinerary-kits/7-days-shanghai-hangzhou-suzhou
- **reference-50** — `/products/previews/payment-apps-guide-decision-tree.png`: 2 occurrences / 2 pages (likely reasonable first-party reuse). Pages: /, /store

### Exact-content duplicates with different filenames

- None detected.

### Perceptual near-duplicates

The following are algorithmic candidates, not automatic replacement decisions. Brand, icon, product, marketing and share assets are excluded from perceptual grouping.

- **near-1** — `/images/cities/phase-d/guangzhou-pearl-river-hero.webp`, `/images/cities/phase-d/shenzhen-bay-hero.webp`, `/images/itineraries/240-hour-transit/day-6-west-lake.webp`; manual confirmation required.
- **near-2** — `/images/cities/shenzhen-skyline.webp`, `/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp`; manual confirmation required.
- **near-3** — `/images/cities/xian-city-wall-sunset.webp`, `/images/guides/phase-c/china-food-ordering-guide/card.webp`; manual confirmation required.
- **near-4** — `/images/guides/alipay-cafe-qr.webp`, `/images/guides/phase-c/how-to-use-alipay-and-wechat-pay-in-china/hero.webp`; manual confirmation required.
- **near-5** — `/images/guides/americans-china-airport-arrivals.webp`, `/images/guides/phase-c/can-americans-travel-to-china-in-2026/hero.webp`; manual confirmation required.
- **near-6** — `/images/guides/china-esim-airport-phone.webp`, `/images/guides/phase-c/china-esim-guide-for-tourists/hero.webp`; manual confirmation required.
- **near-7** — `/images/guides/china-packing-essentials.webp`, `/images/guides/phase-c/china-travel-packing-list/hero.webp`; manual confirmation required.
- **near-8** — `/images/guides/china-preflight-checklist.webp`, `/images/guides/phase-c/china-travel-checklist-before-you-fly/hero.webp`; manual confirmation required.
- **near-9** — `/images/guides/chinese-phrases-restaurant-phone.webp`, `/images/guides/phase-c/basic-chinese-phrases-for-travelers/hero.webp`; manual confirmation required.
- **near-10** — `/images/guides/high-speed-train-china.webp`, `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/hero.webp`; manual confirmation required.
- **near-11** — `/images/guides/order-food-shanghai-stall.webp`, `/images/guides/phase-c/china-food-ordering-guide/hero.webp`; manual confirmation required.
- **near-12** — `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/hero.webp`, `/images/guides/shanghai-three-days-street.webp`; manual confirmation required.
- **near-13** — `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/hero.webp`, `/images/guides/visa-free-transit-airport.webp`; manual confirmation required.
- **near-14** — `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/hero.webp`, `/images/travel/phone-qr-code.webp`; manual confirmation required.

## Image quality and licensing

### Hero assets below 2000px

- None.

### Body/card/daily assets below 1400px

- `/images/cities/shenzhen-skyline.webp` — 1333×2000, roles: Body; Replace/re-export if visibly soft.
- `/images/itineraries/classic-china/day-1-beijing-hutong.webp` — 1106×1600, roles: Daily; Replace/re-export if visibly soft.
- `/images/itineraries/classic-china/day-5-terracotta-warriors.webp` — 1200×1600, roles: Daily; Replace/re-export if visibly soft.
- `/images/itineraries/classic-china/day-6-shanghai-bund.webp` — 1067×1600, roles: Daily; Replace/re-export if visibly soft.
- `/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp` — 1067×1600, roles: Daily; Replace/re-export if visibly soft.
- `/images/itineraries/classic-china/day-9-shanghai-museum.webp` — 1067×1600, roles: Daily; Replace/re-export if visibly soft.

### Oversized assets

- None.

### Copyright/provenance gaps

- None.

## Next Image implementation findings

- **PASS** `app/itinerary-kits/[slug]/page.tsx` — The hero keeps priority without a redundant explicit eager-loading prop and applies the configured object position.
- **PASS** `app/itinerary-kits/[slug]/page.tsx` — The modulo fallback was removed; all four priority itineraries provide one explicit, unique image for every day and daily images load lazily.
- **PASS** `app/itinerary-kits/[slug]/page.tsx` — Hero, card, daily, and route rendering applies per-image object-position values for responsive crop control.
- **MEDIUM** `components/GuideTemplate.tsx` — Guide images use sizes="(min-width: 1200px) 1100px, 100vw" for all inline figures. This is safe but can over-request on smaller desktop article columns; tune after measuring rendered widths.

## Content and policy audit

- **PASS** /guides/china-240-hour-visa-free-transit-guide — The related Guide now links to current Chinese and English NIA notices, records July 13, 2026 as the verification date, states the current 55-country/65-port/24-region snapshot, and includes the required rules-can-change disclaimer. Official source: https://en.nia.gov.cn/n147418/n147468/c187308/content.html
- **PASS** /itinerary-kits/240-hour-visa-free-china-itinerary — The itinerary links to current Chinese and English NIA sources, displays a July 13, 2026 verification date, explains the third-country/region and permitted-area conditions, and contains no guaranteed-entry language. Official source: https://en.nia.gov.cn/n147418/n147468/c187308/content.html
- **MEDIUM** /guides/can-americans-travel-to-china-in-2026 — The page is date-sensitive and cautious, but uses a broad embassy homepage rather than a dated visa-policy detail page; verification provenance should be more specific.

- No active 144-hour wording was found in the application content. The only 144-hour reference found in the official-source corpus is historical context.
- No "guaranteed visa" or "guaranteed entry" claim was found.
- 34 repeated paragraph groups were detected across rendered pages; see JSON for exact text and routes. Many are template-level CTA/disclaimer blocks, but editorial duplicates require review.

## SEO, accessibility and link audit

- Broken internal links: 0.
- Indexable routes missing from sitemap: none.
- Sitemap-only unknown routes: none.
- Page-level title, description, canonical, H1, OG, Twitter Card, JSON-LD and image-alt checks are listed below and serialized in JSON.
- Sampled keyboard/navigation flow passed: homepage primary navigation reached `/itinerary-kits`; active navigation state updated and no console errors appeared.

## Rendered browser evidence

- `/itinerary-kits` @ 1440x900: All four Phase B card images loaded at equal rendered dimensions, use distinct sources and subjects, and the page has no horizontal overflow.
- `/itinerary-kits/4-days-in-beijing` @ 1440x900: All four daily images loaded with unique sources and correct hutong, Forbidden City, Great Wall, and Summer Palace semantics; no broken images, console errors, or horizontal overflow.
- `/itinerary-kits/240-hour-visa-free-china-itinerary` @ 390x844: All ten daily images loaded lazily with unique sources; no broken images, console errors, or horizontal overflow. Moving the mobile policy notice below the Hero reduced Hero height from 1,047.5px to 701.5px and restored the airport seating subject.

This is a risk-signal audit, not a full Lighthouse run. LCP/CLS/INP must be measured again after replacements because new source dimensions and crops will change the result.

## Route coverage

| Route | Type | HTTP | Title | H1 | Images | JSON-LD | Issues |
| --- | --- | ---: | --- | ---: | ---: | --- | --- |
| `/` | homepage | 200 | First China Trip Kit \| Payments, Apps & Practical China Trip Planning | 1 | 11 | WebSite, Organization | — |
| `/_global-error` | system | 500 | 500: This page couldn’t load | 1 | 0 | — | — |
| `/_not-found` | system | 404 | Page Not Found \| First China Trip Kit | 1 | 1 | — | — |
| `/about` | static | 200 | About First China Trip Kit | 1 | 2 | — | — |
| `/affiliate-disclosure` | policy | 200 | Affiliate Disclosure \| First China Trip Kit | 1 | 1 | BreadcrumbList | — |
| `/api/contact` | api | N/A | /api/contact | 0 | 0 | — | — |
| `/api/newsletter` | api | N/A | /api/newsletter | 0 | 0 | — | — |
| `/city-kits` | destination-list | 200 | China Destinations for First-Time Visitors \| First China Trip Kit | 1 | 9 | ItemList | — |
| `/city-kits/beijing` | destination | 200 | Beijing First Trip Kit \| First China Trip Kit | 1 | 15 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/chengdu` | destination | 200 | Chengdu First Trip Kit \| First China Trip Kit | 1 | 13 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/guangzhou` | destination | 200 | Guangzhou First Trip Kit \| First China Trip Kit | 1 | 13 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/hangzhou` | destination | 200 | Hangzhou First Trip Kit \| First China Trip Kit | 1 | 15 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/shanghai` | destination | 200 | Shanghai First Trip Kit \| First China Trip Kit | 1 | 15 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/shenzhen` | destination | 200 | Shenzhen First Trip Kit \| First China Trip Kit | 1 | 13 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/suzhou` | destination | 200 | Suzhou First Trip Kit \| First China Trip Kit | 1 | 13 | TravelGuide, TouristDestination, FAQPage | — |
| `/city-kits/xian` | destination | 200 | Xi'an First Trip Kit \| First China Trip Kit | 1 | 13 | TravelGuide, TouristDestination, FAQPage | — |
| `/contact` | static | 200 | Ask a China Trip Question \| First China Trip Kit | 1 | 1 | — | — |
| `/custom-itinerary` | static | 200 | Custom China Itinerary Request \| First China Trip Kit | 1 | 1 | — | — |
| `/guides` | guide-list | 200 | China Travel Blog and Practical Guides \| First China Trip Kit | 1 | 15 | — | — |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | 200 | 3 Days in Shanghai for First-Time Visitors \| First China Trip Kit | 1 | 8 | Article, FAQPage, BreadcrumbList | — |
| `/guides/basic-chinese-phrases-for-travelers` | guide | 200 | Basic Chinese Phrases for Travelers | 1 | 5 | Article, FAQPage, BreadcrumbList | — |
| `/guides/best-apps-for-traveling-in-china` | guide | 200 | Best Apps for Traveling in China: Payment, Maps, Translation, Trains and Taxis | 1 | 8 | Article, FAQPage, BreadcrumbList | — |
| `/guides/can-americans-travel-to-china-in-2026` | guide | 200 | Can Americans Travel to China in 2026? \| First China Trip Kit | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | 200 | China 240-Hour Visa-Free Transit Guide for First-Time Visitors | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/china-esim-guide-for-tourists` | guide | 200 | China eSIM Guide for Tourists | 1 | 5 | Article, FAQPage, BreadcrumbList | — |
| `/guides/china-food-ordering-guide` | guide | 200 | How to Order Food in China as a First-Time Visitor | 1 | 8 | Article, FAQPage, BreadcrumbList | — |
| `/guides/china-travel-checklist-before-you-fly` | guide | 200 | China Travel Checklist Before You Fly \| First China Trip Kit | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/china-travel-packing-list` | guide | 200 | China Travel Packing List for First-Time Visitors | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | 200 | How to Book High-Speed Trains in China as a Foreigner | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | 200 | How to Pay in China as a Foreigner: Alipay, WeChat Pay, Cards and Cash | 1 | 8 | Article, FAQPage, BreadcrumbList | — |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | 200 | How to Use Alipay and WeChat Pay in China | 1 | 8 | Article, FAQPage, BreadcrumbList | — |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | 200 | How to Use Alipay in China as a Tourist \| First China Trip Kit | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | 200 | How to Use WeChat Pay in China as a Foreigner | 1 | 7 | Article, FAQPage, BreadcrumbList | — |
| `/itinerary-kits` | itinerary-list | 200 | China Itinerary Kits by Trip Length \| First China Trip Kit | 1 | 8 | — | missing-json-ld |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | 200 | 10 Days Classic China Itinerary Kit \| First China Trip Kit | 1 | 13 | Article, TravelGuide, TouristTrip, ItemList | — |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | 200 | 240-Hour Visa-Free China Itinerary Kit \| First China Trip Kit | 1 | 14 | Article, TravelGuide, TouristTrip, ItemList, FAQPage | — |
| `/itinerary-kits/3-days-in-beijing` | itinerary | 200 | 3 Days in Beijing Kit \| First China Trip Kit | 1 | 6 | Article, TravelGuide, TouristTrip, ItemList | — |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | 200 | 3 Days in Shanghai Kit \| First China Trip Kit | 1 | 7 | Article, TravelGuide, TouristTrip, ItemList, FAQPage | — |
| `/itinerary-kits/4-days-in-beijing` | itinerary | 200 | 4 Days in Beijing Kit \| First China Trip Kit | 1 | 8 | Article, TravelGuide, TouristTrip, ItemList, FAQPage | — |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | 200 | 5 Days Beijing and Xi'an Kit \| First China Trip Kit | 1 | 8 | Article, TravelGuide, TouristTrip, ItemList | — |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | 200 | 7 Days Shanghai Hangzhou Suzhou Kit \| First China Trip Kit | 1 | 10 | Article, TravelGuide, TouristTrip, ItemList | — |
| `/payment-apps-guide/thank-you` | conversion | 200 | Payment & Apps Setup Guide Thank You \| First China Trip Kit | 1 | 1 | — | — |
| `/privacy` | policy | 200 | Privacy Policy \| First China Trip Kit | 1 | 1 | — | — |
| `/refund-policy` | policy | 200 | Digital Delivery and Refund Policy \| First China Trip Kit | 1 | 1 | — | — |
| `/robots.txt` | metadata | 200 | /robots.txt | 0 | 0 | — | — |
| `/sitemap.xml` | metadata | 200 | /sitemap.xml | 0 | 0 | — | — |
| `/start-here` | static | 200 | Start Here: Your 8-Step First China Trip Plan | 1 | 1 | — | — |
| `/store` | static | 200 | Printable China Travel Kits \| First China Trip Kit Store | 1 | 8 | Product | — |
| `/terms` | policy | 200 | Terms of Use \| First China Trip Kit | 1 | 1 | — | — |
| `/thank-you` | conversion | 200 | Thank You \| China First-Time Visitor Checklist | 1 | 2 | — | — |
| `/tools` | tool-list | 200 | China Travel Planning Tools \| First China Trip Kit | 1 | 1 | — | — |
| `/tools/china-trip-duration-planner` | tool | 200 | China Trip Duration Planner \| First China Trip Kit | 1 | 1 | — | — |
| `/tools/city-route-picker` | tool | 200 | City Route Picker \| First China Trip Kit | 1 | 1 | — | — |
| `/tools/essential-apps-checklist` | tool | 200 | Essential Apps Checklist \| First China Trip Kit | 1 | 1 | — | — |
| `/tools/visa-free-eligibility-checker` | tool | 200 | Visa-Free Eligibility Checker \| First China Trip Kit | 1 | 1 | — | — |
| `/travel-essentials` | static | 200 | China Travel Essentials for Foreign Visitors \| First China Trip Kit | 1 | 4 | — | — |
| `/travel-tools` | static | 200 | Essential China Travel Tools \| First China Trip Kit | 1 | 1 | BreadcrumbList | — |

## Complete public-asset inventory

| File | Dimensions | Size | Format | Pages / uses | Roles | Credit | Duplicate | Flags | Recommended action |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| `/brand/first-china-trip-kit-avatar-1024.png` | 1024×1024 | 33KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/brand/first-china-trip-kit-logo.svg` | 1024×1024 | 1KB | svg | 52 / 52 | Brand | complete | — | — | Keep |
| `/images/cities/beijing-forbidden-city-courtyard.webp` | 2000×1326 | 281KB | webp | 4 / 6 | Body, Daily | complete | reference-15 | — | Keep |
| `/images/cities/chengdu-panda-base.webp` | 2000×1333 | 301KB | webp | 1 / 2 | Body | complete | — | — | Keep |
| `/images/cities/details/beijing-hutong-market.webp` | 1800×1200 | 384KB | webp | 3 / 3 | Body, Daily | complete | reference-21 | — | Keep |
| `/images/cities/details/beijing-hutong-street.webp` | 1800×1200 | 586KB | webp | 6 / 8 | Card, Body, Daily | complete | reference-7 | — | Keep |
| `/images/cities/details/chengdu-food-vendor.webp` | 1800×1200 | 669KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/details/chengdu-street-transport.webp` | 1800×1200 | 317KB | webp | 3 / 3 | Card, Body | complete | reference-22 | — | Keep |
| `/images/cities/details/suzhou-canal-lanterns.webp` | 1800×1200 | 415KB | webp | 2 / 2 | Body, Daily | complete | reference-30 | — | Keep |
| `/images/cities/details/suzhou-street-food.webp` | 1800×1200 | 101KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/details/xian-night-market.webp` | 1800×1200 | 348KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/phase-d/guangzhou-dim-sum.webp` | 1800×1200 | 100KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/phase-d/guangzhou-heritage-street-card.webp` | 1800×1200 | 370KB | webp | 2 / 2 | Card, Body | complete | reference-31 | — | Keep |
| `/images/cities/phase-d/guangzhou-metro.webp` | 1800×1200 | 202KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/phase-d/guangzhou-pearl-river-hero.webp` | 2400×1600 | 401KB | webp | 1 / 2 | Body | complete | near-1 | near-duplicate-review | Manual duplicate review |
| `/images/cities/phase-d/shenzhen-bay-hero.webp` | 2400×1600 | 157KB | webp | 1 / 1 | Body | complete | near-1 | near-duplicate-review | Manual duplicate review |
| `/images/cities/phase-d/shenzhen-chaoshan-hot-pot.webp` | 1800×1200 | 175KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/phase-d/shenzhen-metro.webp` | 1800×1200 | 91KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/phase-d/shenzhen-modern-architecture-card.webp` | 1800×1200 | 147KB | webp | 2 / 2 | Card, Body | complete | reference-32 | — | Keep |
| `/images/cities/phase-d/suzhou-pingjiang-canal-hero.webp` | 2400×1600 | 595KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/cities/shanghai-bund-skyline.webp` | 2000×1333 | 327KB | webp | 6 / 8 | Body, Card, Daily | complete | reference-8 | — | Keep |
| `/images/cities/shenzhen-skyline.webp` | 1333×2000 | 306KB | webp | 1 / 1 | Body | complete | near-2 | content-under-1400px, near-duplicate-review | Replace/re-export if visibly soft |
| `/images/cities/suzhou-lingering-garden.webp` | 1800×1200 | 370KB | webp | 2 / 2 | Body, Daily | complete | reference-33 | — | Keep |
| `/images/cities/xian-city-wall-sunset.webp` | 2000×1362 | 212KB | webp | 2 / 2 | Body, Daily | complete | reference-34, near-3 | near-duplicate-review | Manual duplicate review |
| `/images/guides/alipay-cafe-qr.webp` | 1800×1200 | 57KB | webp | 1 / 1 | Body | complete | near-4 | near-duplicate-review | Manual duplicate review |
| `/images/guides/americans-china-airport-arrivals.webp` | 1800×1200 | 168KB | webp | 2 / 2 | Body, Daily | complete | reference-35, near-5 | near-duplicate-review | Manual duplicate review |
| `/images/guides/china-esim-airport-phone.webp` | 1800×1200 | 88KB | webp | 2 / 2 | Body | complete | reference-36, near-6 | near-duplicate-review | Manual duplicate review |
| `/images/guides/china-packing-essentials.webp` | 1800×1200 | 255KB | webp | 2 / 2 | Body | complete | reference-37, near-7 | near-duplicate-review | Manual duplicate review |
| `/images/guides/china-preflight-checklist.webp` | 1800×1200 | 92KB | webp | 3 / 3 | Body | complete | reference-23, near-8 | near-duplicate-review | Manual duplicate review |
| `/images/guides/chinese-phrases-restaurant-phone.webp` | 1800×1200 | 87KB | webp | 1 / 1 | Body | complete | near-9 | near-duplicate-review | Manual duplicate review |
| `/images/guides/high-speed-train-china.webp` | 1800×1200 | 164KB | webp | 5 / 8 | Body, Daily | complete | reference-12, near-10 | near-duplicate-review | Manual duplicate review |
| `/images/guides/order-food-shanghai-stall.webp` | 1800×1200 | 147KB | webp | 3 / 3 | Body, Daily | complete | reference-24, near-11 | near-duplicate-review | Manual duplicate review |
| `/images/guides/payment-guide-backup-kit.webp` | 2400×1600 | 390KB | webp | 2 / 2 | Body | complete | reference-38 | — | Keep |
| `/images/guides/payment-guide-card-setup.webp` | 2400×1600 | 102KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/guides/payment-guide-merchant-scan.webp` | 2400×1600 | 216KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/card.webp` | 1800×1200 | 307KB | webp | 2 / 2 | Card, Body | complete | reference-39 | — | Keep |
| `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/hero.webp` | 2400×1600 | 424KB | webp | 1 / 1 | Body | complete | near-12 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp` | 1800×1200 | 75KB | webp | 3 / 3 | Card, Body | complete | reference-25 | — | Keep |
| `/images/guides/phase-c/basic-chinese-phrases-for-travelers/hero.webp` | 2400×1600 | 129KB | webp | 1 / 1 | Body | complete | near-9 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | 1800×1200 | 114KB | webp | 19 / 19 | Card, Body | complete | reference-2 | — | Keep |
| `/images/guides/phase-c/best-apps-for-traveling-in-china/hero.webp` | 2400×1600 | 248KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/guides/phase-c/can-americans-travel-to-china-in-2026/card.webp` | 1800×1200 | 137KB | webp | 2 / 2 | Card, Body | complete | reference-40 | — | Keep |
| `/images/guides/phase-c/can-americans-travel-to-china-in-2026/hero.webp` | 2400×1600 | 276KB | webp | 1 / 1 | Body | complete | near-5 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp` | 1800×1200 | 111KB | webp | 4 / 4 | Card, Body | complete | reference-16 | — | Keep |
| `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/hero.webp` | 2400×1600 | 191KB | webp | 1 / 1 | Body | complete | near-13 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp` | 1800×1200 | 63KB | webp | 3 / 3 | Card, Body | complete | reference-26 | — | Keep |
| `/images/guides/phase-c/china-esim-guide-for-tourists/hero.webp` | 2400×1600 | 130KB | webp | 1 / 1 | Body | complete | near-6 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-food-ordering-guide/card.webp` | 1800×1200 | 135KB | webp | 1 / 1 | Card | complete | near-3 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-food-ordering-guide/hero.webp` | 2400×1600 | 219KB | webp | 1 / 1 | Body | complete | near-11 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp` | 1800×1200 | 107KB | webp | 4 / 4 | Card, Body | complete | reference-17 | — | Keep |
| `/images/guides/phase-c/china-travel-checklist-before-you-fly/hero.webp` | 2400×1600 | 171KB | webp | 1 / 1 | Body | complete | near-8 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/china-travel-packing-list/card.webp` | 1800×1200 | 239KB | webp | 3 / 3 | Card, Body | complete | reference-27 | — | Keep |
| `/images/guides/phase-c/china-travel-packing-list/hero.webp` | 2400×1600 | 382KB | webp | 1 / 1 | Body | complete | near-7 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | 1800×1200 | 209KB | webp | 13 / 13 | Body, Card | complete | reference-3 | — | Keep |
| `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/hero.webp` | 2400×1600 | 367KB | webp | 1 / 1 | Body | complete | near-10 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | 1800×1200 | 53KB | webp | 21 / 21 | Card, Body | complete | reference-1 | — | Keep |
| `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp` | 2400×1600 | 73KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/guides/phase-c/how-to-use-alipay-and-wechat-pay-in-china/card.webp` | 1800×1200 | 47KB | webp | 1 / 1 | Card | complete | — | — | Keep |
| `/images/guides/phase-c/how-to-use-alipay-and-wechat-pay-in-china/hero.webp` | 2400×1600 | 89KB | webp | 1 / 1 | Body | complete | near-4 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | 1800×1200 | 120KB | webp | 4 / 4 | Card, Body | complete | reference-18 | — | Keep |
| `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/hero.webp` | 2400×1600 | 219KB | webp | 1 / 1 | Body | complete | near-14 | near-duplicate-review | Manual duplicate review |
| `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp` | 1800×1200 | 251KB | webp | 3 / 3 | Card, Body | complete | reference-28 | — | Keep |
| `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/hero.webp` | 2400×1600 | 486KB | webp | 1 / 1 | Body | complete | — | — | Keep |
| `/images/guides/shanghai-three-days-street.webp` | 1800×1200 | 270KB | webp | 6 / 8 | Card, Body, Daily | complete | reference-9, near-12 | near-duplicate-review | Manual duplicate review |
| `/images/guides/visa-free-transit-airport.webp` | 1800×1200 | 113KB | webp | 1 / 1 | Body | complete | near-13 | near-duplicate-review | Manual duplicate review |
| `/images/home/phase-d/first-trip-phone-metro-hero.webp` | 1600×2000 | 77KB | webp | 1 / 1 | Card | complete | — | — | Keep |
| `/images/home/phase-d/first-trip-phone-metro-og.webp` | 1200×630 | 37KB | webp | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | 1800×1200 | 142KB | webp | 6 / 11 | Body, Card | complete | reference-10 | — | Keep |
| `/images/itineraries/240-hour-transit/day-6-west-lake.webp` | 2000×1125 | 192KB | webp | 2 / 2 | Body, Daily | complete | reference-41, near-1 | near-duplicate-review | Manual duplicate review |
| `/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp` | 2000×1125 | 202KB | webp | 1 / 1 | Daily | complete | near-2 | near-duplicate-review | Manual duplicate review |
| `/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp` | 2000×1125 | 455KB | webp | 1 / 1 | Daily | complete | — | — | Keep |
| `/images/itineraries/240-hour-transit/hero-pudong-airport.webp` | 2400×1600 | 287KB | webp | 1 / 1 | Daily | complete | — | — | Keep |
| `/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp` | 1800×1200 | 421KB | webp | 2 / 3 | Body, Card | complete | reference-42 | — | Keep |
| `/images/itineraries/4-days-beijing/day-4-summer-palace.webp` | 2000×1125 | 546KB | webp | 2 / 2 | Body | complete | reference-43 | — | Keep |
| `/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp` | 2400×1600 | 334KB | webp | 2 / 2 | Body, Daily | complete | reference-44 | — | Keep |
| `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | 1800×1200 | 450KB | webp | 5 / 7 | Card, Body | complete | reference-13 | — | Keep |
| `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp` | 2000×1125 | 545KB | webp | 2 / 2 | Body | complete | reference-45 | — | Keep |
| `/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp` | 2400×1600 | 378KB | webp | 2 / 2 | Body, Daily | complete | reference-46 | — | Keep |
| `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | 1800×1200 | 422KB | webp | 5 / 8 | Card, Body | complete | reference-14 | — | Keep |
| `/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp` | 2400×1600 | 294KB | webp | 2 / 2 | Body, Daily | complete | reference-47 | — | Keep |
| `/images/itineraries/classic-china/day-1-beijing-hutong.webp` | 1106×1600 | 292KB | webp | 1 / 1 | Daily | complete | — | content-under-1400px | Replace/re-export if visibly soft |
| `/images/itineraries/classic-china/day-10-airport-departure.webp` | 2400×1600 | 276KB | webp | 2 / 2 | Body | complete | reference-48 | — | Keep |
| `/images/itineraries/classic-china/day-2-forbidden-city.webp` | 2400×1350 | 253KB | webp | 1 / 1 | Daily | complete | — | — | Keep |
| `/images/itineraries/classic-china/day-3-great-wall.webp` | 2400×1350 | 612KB | webp | 10 / 17 | Body, Card, Daily | complete | reference-4 | — | Keep |
| `/images/itineraries/classic-china/day-5-terracotta-warriors.webp` | 1200×1600 | 41KB | webp | 1 / 1 | Daily | complete | — | content-under-1400px | Replace/re-export if visibly soft |
| `/images/itineraries/classic-china/day-6-shanghai-bund.webp` | 1067×1600 | 138KB | webp | 1 / 1 | Daily | complete | — | content-under-1400px | Replace/re-export if visibly soft |
| `/images/itineraries/classic-china/day-7-yu-garden.webp` | 2399×1600 | 546KB | webp | 1 / 1 | Daily | complete | — | — | Keep |
| `/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp` | 1067×1600 | 432KB | webp | 1 / 1 | Daily | complete | — | content-under-1400px | Replace/re-export if visibly soft |
| `/images/itineraries/classic-china/day-9-shanghai-museum.webp` | 1067×1600 | 210KB | webp | 1 / 1 | Daily | complete | — | content-under-1400px | Replace/re-export if visibly soft |
| `/images/itineraries/eastern-china/longjing-tea-fields.webp` | 2000×1125 | 648KB | webp | 4 / 5 | Card, Body, Daily | complete | reference-19 | — | Keep |
| `/images/itineraries/eastern-china/yu-garden-shanghai.webp` | 2000×1125 | 670KB | webp | 2 / 2 | Body, Daily | complete | reference-49 | — | Keep |
| `/images/travel/china-high-speed-rail-platform.webp` | 2000×1333 | 318KB | webp | 7 / 7 | Body | complete | reference-5 | — | Keep |
| `/images/travel/china-railway-station-interior.webp` | 2000×1333 | 282KB | webp | 6 / 6 | Body | complete | reference-11 | — | Keep |
| `/images/travel/phone-qr-code.webp` | 1800×1200 | 86KB | webp | 3 / 3 | Body | complete | reference-29, near-14 | near-duplicate-review | Manual duplicate review |
| `/images/travel/phone-scanning-qr.webp` | 1800×1200 | 74KB | webp | 4 / 4 | Body | complete | reference-20 | — | Keep |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-01.png` | 1080×1350 | 43KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-02.png` | 1080×1350 | 59KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-03.png` | 1080×1350 | 63KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-04.png` | 1080×1350 | 63KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-05.png` | 1080×1350 | 60KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/instagram-payment-carousel-06.png` | 1080×1350 | 47KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/pinterest-apps-before-arrival.png` | 1000×1500 | 95KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/pinterest-payment-stack.png` | 1000×1500 | 91KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/marketing/china-first-trip-launch/pinterest-transit-five-checks.png` | 1000×1500 | 102KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/products/previews/first-trip-checklist-payhip-cover.png` | 1600×1200 | 83KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/products/previews/payment-apps-guide-app-stack.png` | 1241×1754 | 120KB | png | 1 / 1 | Product | complete | — | — | Keep |
| `/products/previews/payment-apps-guide-cover.png` | 1241×1754 | 119KB | png | 1 / 1 | Product | complete | — | — | Keep |
| `/products/previews/payment-apps-guide-decision-tree.png` | 1241×1754 | 115KB | png | 2 / 2 | CTA, Product | complete | reference-50 | — | Keep |
| `/products/previews/payment-apps-guide-hotel-card.png` | 1241×1754 | 71KB | png | 1 / 1 | Product | complete | — | — | Keep |
| `/products/previews/payment-apps-guide-payhip-cover.png` | 1600×1200 | 91KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/products/previews/payment-apps-guide-phrase-card.png` | 1241×1754 | 110KB | png | 1 / 1 | Product | complete | — | — | Keep |
| `/products/previews/payment-apps-guide-square-cover.png` | 1600×1600 | 100KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/products/previews/payment-apps-guide-store-cover.png` | 1200×800 | 68KB | png | 7 / 8 | CTA, Product | complete | reference-6 | — | Keep |
| `/share/checklist-store-qr.png` | 434×434 | 6KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |
| `/share/china-first-trip-checklist-share-card.png` | 1080×1350 | 392KB | png | 1 / 1 | CTA | complete | — | — | Keep |
| `/share/china-first-trip-checklist-share-og.png` | 1200×630 | 459KB | png | 0 / 0 | unused | complete | — | unused | Review then delete |

## Complete page-image occurrence inventory

| Route | Page type | Purpose | Image | Alt | Dimensions | Size | Page count | Match | Duplicate | Low-res | Crop | Copyright | Action |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- |
| `/` | homepage | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/home/phase-d/first-trip-phone-metro-hero.webp` | Traveler checking a smartphone on a Shanghai metro platform | 1600×2000 | 77KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp` | Boarding pass held against an airport apron and onward aircraft | 1800×1200 | 111KB | 4 | yes | reference-16 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | Card | `/images/cities/details/chengdu-street-transport.webp` | Delivery rider and local shops on a Chengdu street | 1800×1200 | 317KB | 3 | yes | reference-22 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Cover of the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/` | homepage | CTA | `/products/previews/payment-apps-guide-decision-tree.png` | Payment backup decision tree preview | 1241×1754 | 115KB | 2 | yes | reference-50 | no | not-detected-automatic | complete | Keep |
| `/_not-found` | system | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/about` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/about` | static | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/affiliate-disclosure` | policy | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/cities/details/chengdu-street-transport.webp` | Delivery rider and local shops on a Chengdu street | 1800×1200 | 317KB | 3 | yes | reference-22 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | Terraced Longjing tea fields in the hills outside Hangzhou | 2000×1125 | 648KB | 4 | yes | reference-19 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/cities/phase-d/guangzhou-heritage-street-card.webp` | Cyclists and pedestrians moving through a heritage street in Guangzhou | 1800×1200 | 370KB | 2 | yes | reference-31 | no | not-detected-automatic | complete | Keep |
| `/city-kits` | destination-list | Card | `/images/cities/phase-d/shenzhen-modern-architecture-card.webp` | Contemporary waterfront architecture and public lawn in Shenzhen | 1800×1200 | 147KB | 2 | yes | reference-32 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp` | Temple of Heaven in Beijing beneath a wide summer sky | 2400×1600 | 334KB | 2 | yes | reference-44 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/4-days-beijing/day-4-summer-palace.webp` | Longevity Hill and lakeside architecture at Beijing's Summer Palace | 2000×1125 | 546KB | 2 | yes | reference-43 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/cities/details/beijing-hutong-market.webp` | Local market stalls and shoppers in a Beijing hutong | 1800×1200 | 384KB | 3 | yes | reference-21 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/travel/china-railway-station-interior.webp` | Interior platform at a modern railway station in China | 2000×1333 | 282KB | 6 | yes | reference-11 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp` | Forbidden City walls, moat, and corner tower in Beijing | 1800×1200 | 421KB | 2 | yes | reference-42 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp` | Forbidden City walls, moat, and corner tower in Beijing | 1800×1200 | 421KB | 2 | yes | reference-42 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/beijing` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/cities/chengdu-panda-base.webp` | Giant panda eating bamboo at the Chengdu panda base | 2000×1333 | 301KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/cities/chengdu-panda-base.webp` | Giant panda eating bamboo at the Chengdu panda base | 2000×1333 | 301KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/cities/details/chengdu-street-transport.webp` | Delivery rider and local shops on a Chengdu street | 1800×1200 | 317KB | 3 | yes | reference-22 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/cities/details/chengdu-food-vendor.webp` | Street food vendor serving fried snacks in Chengdu | 1800×1200 | 669KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/chengdu` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/cities/phase-d/guangzhou-pearl-river-hero.webp` | Canton Tower and the Pearl River across central Guangzhou | 2400×1600 | 401KB | 1 | yes | near-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/cities/phase-d/guangzhou-pearl-river-hero.webp` | Canton Tower and the Pearl River across central Guangzhou | 2400×1600 | 401KB | 1 | yes | near-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/cities/phase-d/guangzhou-heritage-street-card.webp` | Cyclists and pedestrians moving through a heritage street in Guangzhou | 1800×1200 | 370KB | 2 | yes | reference-31 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/cities/phase-d/guangzhou-dim-sum.webp` | Assorted dim sum served in bamboo steamers for a Cantonese yum cha meal | 1800×1200 | 100KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/cities/phase-d/guangzhou-metro.webp` | Passengers waiting as a train moves through Guangzhou's Huadiwan metro station | 1800×1200 | 202KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/guangzhou` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp` | West Lake and the Hangzhou skyline at sunset | 2400×1600 | 294KB | 2 | yes | reference-47 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/240-hour-transit/day-6-west-lake.webp` | Panoramic West Lake shoreline and hills in Hangzhou | 2000×1125 | 192KB | 2 | yes | reference-41, near-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | Terraced Longjing tea fields in the hills outside Hangzhou | 2000×1125 | 648KB | 4 | yes | reference-19 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | Terraced Longjing tea fields in the hills outside Hangzhou | 2000×1125 | 648KB | 4 | yes | reference-19 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/hangzhou` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/itineraries/eastern-china/yu-garden-shanghai.webp` | Tingtao Tower, stonework, and a pond inside Shanghai's Yu Garden | 2000×1125 | 670KB | 2 | yes | reference-49 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/guides/order-food-shanghai-stall.webp` | Cook preparing food at a street stall in Shanghai | 1800×1200 | 147KB | 3 | yes | reference-24, near-11 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/travel/china-railway-station-interior.webp` | Interior platform at a modern railway station in China | 2000×1333 | 282KB | 6 | yes | reference-11 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shanghai` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/cities/phase-d/shenzhen-bay-hero.webp` | Shenzhen Bay skyline at twilight beneath dramatic clouds | 2400×1600 | 157KB | 1 | yes | near-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/cities/phase-d/shenzhen-modern-architecture-card.webp` | Contemporary waterfront architecture and public lawn in Shenzhen | 1800×1200 | 147KB | 2 | yes | reference-32 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/cities/shenzhen-skyline.webp` | Modern Shenzhen skyline viewed from a green hillside | 1333×2000 | 306KB | 1 | yes | near-2 | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/city-kits/shenzhen` | destination | Body | `/images/cities/phase-d/shenzhen-chaoshan-hot-pot.webp` | Beef and vegetables arranged around a Chaoshan-style hot pot | 1800×1200 | 175KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/cities/phase-d/shenzhen-metro.webp` | Passengers using smartphones inside a Shenzhen Metro train | 1800×1200 | 91KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/shenzhen` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/cities/phase-d/suzhou-pingjiang-canal-hero.webp` | Canal boats, whitewashed houses and red lanterns in Suzhou's old town | 2400×1600 | 595KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/cities/details/suzhou-canal-lanterns.webp` | Traditional houses and red lanterns beside a canal in Suzhou | 1800×1200 | 415KB | 2 | yes | reference-30 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/cities/suzhou-lingering-garden.webp` | Traditional architecture and trees in Suzhou's Lingering Garden | 1800×1200 | 370KB | 2 | yes | reference-33 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/cities/details/suzhou-street-food.webp` | Street food vendor serving customers in a Suzhou alley | 1800×1200 | 101KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/suzhou` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp` | Xi'an Bell Tower illuminated at night in the city center | 2400×1600 | 378KB | 2 | yes | reference-46 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/cities/xian-city-wall-sunset.webp` | Xi'an Ancient City Wall and watchtowers at sunset | 2000×1362 | 212KB | 2 | yes | reference-34, near-3 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp` | Wide view across the Terracotta Army excavation pits near Xi'an | 2000×1125 | 545KB | 2 | yes | reference-45 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/cities/details/xian-night-market.webp` | Food stall at a lively Xi'an night market | 1800×1200 | 348KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/city-kits/xian` | destination | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/contact` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/custom-itinerary` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | yes | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | yes | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | yes | reference-3 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/how-to-use-alipay-and-wechat-pay-in-china/card.webp` | QR payment sign positioned beside a cafe checkout | 1800×1200 | 47KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/china-travel-packing-list/card.webp` | Passport and practical travel items arranged on a map | 1800×1200 | 239KB | 3 | yes | reference-27 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp` | Smartphone held above a restaurant table while ordering | 1800×1200 | 75KB | 3 | yes | reference-25 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp` | Smartphone held beside airport luggage during connectivity setup | 1800×1200 | 63KB | 3 | yes | reference-26 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/china-food-ordering-guide/card.webp` | Chinese street-food cook working beneath a visible menu | 1800×1200 | 135KB | 1 | yes | near-3 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/can-americans-travel-to-china-in-2026/card.webp` | International traveler pulling luggage through an airport terminal | 1800×1200 | 137KB | 2 | yes | reference-40 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp` | Boarding pass held against an airport apron and onward aircraft | 1800×1200 | 111KB | 4 | yes | reference-16 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | Close view of a customer-presented QR payment code | 1800×1200 | 120KB | 4 | yes | reference-18 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp` | Cafe customer holding a phone during a merchant interaction | 1800×1200 | 251KB | 3 | yes | reference-28 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/card.webp` | Historic Shanghai storefronts beneath the modern city skyline | 1800×1200 | 307KB | 2 | yes | reference-39 | no | not-detected-automatic | complete | Keep |
| `/guides` | guide-list | Card | `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp` | Passport and flight documents laid out for a final pre-flight check | 1800×1200 | 107KB | 4 | yes | reference-17 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/hero.webp` | Shanghai street framed by historic storefronts and modern towers | 2400×1600 | 424KB | 1 | review | near-12 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | review | reference-8 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/guides/order-food-shanghai-stall.webp` | Cook preparing food at a street stall in Shanghai | 1800×1200 | 147KB | 3 | review | reference-24, near-11 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/travel/china-railway-station-interior.webp` | Modern railway station platform in China | 2000×1333 | 282KB | 6 | review | reference-11 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | review | reference-3 | no | not-detected-automatic | complete | Keep |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | guide | Body | `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp` | Boarding pass held against an airport apron and onward aircraft | 1800×1200 | 111KB | 4 | review | reference-16 | no | not-detected-automatic | complete | Keep |
| `/guides/basic-chinese-phrases-for-travelers` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/basic-chinese-phrases-for-travelers` | guide | Body | `/images/guides/phase-c/basic-chinese-phrases-for-travelers/hero.webp` | Traveler using a smartphone to understand a restaurant setting | 2400×1600 | 129KB | 1 | review | near-9 | no | not-detected-automatic | complete | Keep |
| `/guides/basic-chinese-phrases-for-travelers` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/basic-chinese-phrases-for-travelers` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/basic-chinese-phrases-for-travelers` | guide | Body | `/images/guides/phase-c/china-travel-packing-list/card.webp` | Passport and practical travel items arranged on a map | 1800×1200 | 239KB | 3 | review | reference-27 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/hero.webp` | Travelers using smartphones while waiting in a metro station | 2400×1600 | 248KB | 1 | review | — | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/guides/china-esim-airport-phone.webp` | Traveler holding a smartphone beside luggage in an airport terminal | 1800×1200 | 88KB | 2 | review | reference-36, near-6 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/travel/phone-qr-code.webp` | Smartphone displaying a QR code for scanning | 1800×1200 | 86KB | 3 | review | reference-29, near-14 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/travel/china-railway-station-interior.webp` | Modern railway station platform in China | 2000×1333 | 282KB | 6 | review | reference-11 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | review | reference-3 | no | not-detected-automatic | complete | Keep |
| `/guides/best-apps-for-traveling-in-china` | guide | Body | `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp` | Smartphone held beside airport luggage during connectivity setup | 1800×1200 | 63KB | 3 | review | reference-26 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/phase-c/can-americans-travel-to-china-in-2026/hero.webp` | International passengers with luggage moving through an airport terminal | 2400×1600 | 276KB | 1 | review | near-5 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/visa-free-transit-airport.webp` | Traveler holding a smartphone and boarding pass beside an airport window | 1800×1200 | 113KB | 1 | review | near-13 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/china-preflight-checklist.webp` | Passport and boarding passes arranged on a laptop before departure | 1800×1200 | 92KB | 3 | review | reference-23, near-8 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/card.webp` | Boarding pass held against an airport apron and onward aircraft | 1800×1200 | 111KB | 4 | review | reference-16 | no | not-detected-automatic | complete | Keep |
| `/guides/can-americans-travel-to-china-in-2026` | guide | Body | `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp` | Passport and flight documents laid out for a final pre-flight check | 1800×1200 | 107KB | 4 | review | reference-17 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/hero.webp` | Traveler holding a boarding pass beside an airport window during an international transit | 2400×1600 | 191KB | 1 | review | near-13 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | review | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/china-preflight-checklist.webp` | Passport and boarding passes arranged on a laptop before departure | 1800×1200 | 92KB | 3 | review | reference-23, near-8 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/phase-c/can-americans-travel-to-china-in-2026/card.webp` | International traveler pulling luggage through an airport terminal | 1800×1200 | 137KB | 2 | review | reference-40 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/phase-c/3-days-in-shanghai-for-first-time-visitors/card.webp` | Historic Shanghai storefronts beneath the modern city skyline | 1800×1200 | 307KB | 2 | review | reference-39 | no | not-detected-automatic | complete | Keep |
| `/guides/china-240-hour-visa-free-transit-guide` | guide | Body | `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp` | Passport and flight documents laid out for a final pre-flight check | 1800×1200 | 107KB | 4 | review | reference-17 | no | not-detected-automatic | complete | Keep |
| `/guides/china-esim-guide-for-tourists` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/china-esim-guide-for-tourists` | guide | Body | `/images/guides/phase-c/china-esim-guide-for-tourists/hero.webp` | Traveler checking a smartphone beside luggage before leaving an airport | 2400×1600 | 130KB | 1 | review | near-6 | no | not-detected-automatic | complete | Keep |
| `/guides/china-esim-guide-for-tourists` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/china-esim-guide-for-tourists` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/china-esim-guide-for-tourists` | guide | Body | `/images/guides/phase-c/china-travel-packing-list/card.webp` | Passport and practical travel items arranged on a map | 1800×1200 | 239KB | 3 | review | reference-27 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/guides/phase-c/china-food-ordering-guide/hero.webp` | Cook preparing food beneath Chinese menu signs at a Shanghai street stall | 2400×1600 | 219KB | 1 | review | near-11 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/guides/chinese-phrases-restaurant-phone.webp` | Diner using a smartphone at a restaurant table | 1800×1200 | 87KB | 1 | review | near-9 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/travel/phone-scanning-qr.webp` | Person scanning a QR code with a smartphone | 1800×1200 | 74KB | 4 | review | reference-20 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | Body | `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp` | Smartphone held above a restaurant table while ordering | 1800×1200 | 75KB | 3 | review | reference-25 | no | not-detected-automatic | complete | Keep |
| `/guides/china-food-ordering-guide` | guide | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/phase-c/china-travel-checklist-before-you-fly/hero.webp` | Passport and boarding passes arranged on a laptop before a flight | 2400×1600 | 171KB | 1 | review | near-8 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/china-packing-essentials.webp` | Passport, tickets, map and compact travel essentials arranged for packing | 1800×1200 | 255KB | 2 | review | reference-37, near-7 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/americans-china-airport-arrivals.webp` | International passengers with luggage inside an airport terminal | 1800×1200 | 168KB | 2 | review | reference-35, near-5 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/phase-c/basic-chinese-phrases-for-travelers/card.webp` | Smartphone held above a restaurant table while ordering | 1800×1200 | 75KB | 3 | review | reference-25 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-checklist-before-you-fly` | guide | Body | `/images/guides/phase-c/china-esim-guide-for-tourists/card.webp` | Smartphone held beside airport luggage during connectivity setup | 1800×1200 | 63KB | 3 | review | reference-26 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/phase-c/china-travel-packing-list/hero.webp` | Passport, tickets, map and compact travel essentials arranged before packing | 2400×1600 | 382KB | 1 | review | near-7 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/china-preflight-checklist.webp` | Passport and boarding passes arranged on a laptop before departure | 1800×1200 | 92KB | 3 | review | reference-23, near-8 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/payment-guide-backup-kit.webp` | Passport, boarding pass and several physical payment cards prepared for travel | 2400×1600 | 390KB | 2 | review | reference-38 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/china-travel-packing-list` | guide | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | review | reference-3 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/hero.webp` | CRH high-speed train at a platform inside a Chinese railway station | 2400×1600 | 367KB | 1 | review | near-10 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/travel/china-railway-station-interior.webp` | Modern railway station platform in China | 2000×1333 | 282KB | 6 | review | reference-11 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | review | reference-5 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-book-high-speed-trains-in-china` | guide | Body | `/images/guides/phase-c/china-travel-checklist-before-you-fly/card.webp` | Passport and flight documents laid out for a final pre-flight check | 1800×1200 | 107KB | 4 | review | reference-17 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp` | Traveler presenting a smartphone QR code at a checkout terminal | 2400×1600 | 73KB | 1 | review | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/payment-guide-merchant-scan.webp` | Customer holding a smartphone over a merchant QR payment terminal | 2400×1600 | 216KB | 1 | review | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/payment-guide-card-setup.webp` | Traveler adding a bank card to a payment app on a smartphone | 2400×1600 | 102KB | 1 | review | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/payment-guide-backup-kit.webp` | Passport, boarding pass and several physical payment cards prepared for travel | 2400×1600 | 390KB | 2 | review | reference-38 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-book-high-speed-trains-in-china/card.webp` | Chinese CRH high-speed train beside a station platform | 1800×1200 | 209KB | 13 | review | reference-3 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | Close view of a customer-presented QR payment code | 1800×1200 | 120KB | 4 | review | reference-18 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/guides/phase-c/how-to-use-alipay-and-wechat-pay-in-china/hero.webp` | Merchant QR payment sign displayed at a cafe counter | 2400×1600 | 89KB | 1 | review | near-4 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/travel/phone-qr-code.webp` | Smartphone displaying a QR code for scanning | 1800×1200 | 86KB | 3 | review | reference-29, near-14 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/travel/phone-scanning-qr.webp` | Person scanning a merchant QR code with a smartphone | 1800×1200 | 74KB | 4 | review | reference-20 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | Close view of a customer-presented QR payment code | 1800×1200 | 120KB | 4 | review | reference-18 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | Body | `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp` | Cafe customer holding a phone during a merchant interaction | 1800×1200 | 251KB | 3 | review | reference-28 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | guide | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/hero.webp` | Smartphone showing a customer QR code for a cashier to scan | 2400×1600 | 219KB | 1 | review | near-14 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/travel/phone-scanning-qr.webp` | Person scanning a QR code with a smartphone | 1800×1200 | 74KB | 4 | review | reference-20 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/guides/alipay-cafe-qr.webp` | QR payment sign displayed at a cafe counter | 1800×1200 | 57KB | 1 | review | near-4 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | guide | Body | `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/card.webp` | Cafe customer holding a phone during a merchant interaction | 1800×1200 | 251KB | 3 | review | reference-28 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-use-wechat-pay-in-china-as-a-foreigner/hero.webp` | Customer using a smartphone while speaking with staff at a cafe counter | 2400×1600 | 486KB | 1 | review | — | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/travel/phone-qr-code.webp` | Smartphone displaying a QR code for scanning | 1800×1200 | 86KB | 3 | review | reference-29, near-14 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/travel/phone-scanning-qr.webp` | Person scanning a merchant QR code with a smartphone | 1800×1200 | 74KB | 4 | review | reference-20 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/card.webp` | Close view of a traveler using a QR payment code at checkout | 1800×1200 | 53KB | 21 | review | reference-1 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/best-apps-for-traveling-in-china/card.webp` | Two travelers checking phones on a metro platform | 1800×1200 | 114KB | 19 | review | reference-2 | no | not-detected-automatic | complete | Keep |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | guide | Body | `/images/guides/phase-c/how-to-use-alipay-in-china-as-a-tourist/card.webp` | Close view of a customer-presented QR payment code | 1800×1200 | 120KB | 4 | review | reference-18 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp` | Forbidden City walls, moat, and corner tower in Beijing | 1800×1200 | 421KB | 2 | yes | reference-42 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp` | Rows of Terracotta Warriors inside the excavation hall near Xi'an | 1800×1200 | 450KB | 5 | yes | reference-13 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp` | Traditional pavilion and landscaped pond in a classical Suzhou garden | 1800×1200 | 422KB | 5 | yes | reference-14 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits` | itinerary-list | Card | `/images/itineraries/240-hour-transit/card-passport-luggage.webp` | Passport, boarding pass, and luggage prepared for an international transit journey | 1800×1200 | 142KB | 6 | yes | reference-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-1-beijing-hutong.webp` | A quiet leafy hutong lane in Beijing with bicycles and local residents | 1106×1600 | 292KB | 1 | yes | — | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-2-forbidden-city.webp` | The central courtyard and imperial halls of Beijing's Forbidden City | 2400×1350 | 253KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/cities/xian-city-wall-sunset.webp` | Xi'an Ancient City Wall and watchtowers at sunset | 2000×1362 | 212KB | 2 | yes | reference-34, near-3 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-5-terracotta-warriors.webp` | A Terracotta Warrior displayed under museum lighting in Xi'an | 1200×1600 | 41KB | 1 | yes | — | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-6-shanghai-bund.webp` | Shanghai's Pudong skyline reflected across the Huangpu River at night | 1067×1600 | 138KB | 1 | yes | — | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-7-yu-garden.webp` | Traditional pavilions and water at Shanghai's Yu Garden | 2399×1600 | 546KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp` | Traditional pavilion and lotus water at West Lake in Hangzhou | 1067×1600 | 432KB | 1 | yes | — | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Daily | `/images/itineraries/classic-china/day-9-shanghai-museum.webp` | The historic clock-tower building of Shanghai History Museum | 1067×1600 | 210KB | 1 | yes | — | yes | not-detected-automatic | complete | Review sharpness; replace/re-export if soft |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Body | `/images/itineraries/classic-china/day-10-airport-departure.webp` | Travelers pulling luggage through a modern airport departure hall | 2400×1600 | 276KB | 2 | yes | reference-48 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/10-days-classic-china-itinerary` | itinerary | Body | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/itineraries/240-hour-transit/hero-pudong-airport.webp` | Modern departure concourse inside Shanghai Pudong International Airport | 2400×1600 | 287KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/guides/americans-china-airport-arrivals.webp` | International passengers with luggage inside an airport terminal | 1800×1200 | 168KB | 2 | yes | reference-35, near-5 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | Terraced Longjing tea fields in the hills outside Hangzhou | 2000×1125 | 648KB | 4 | yes | reference-19 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/itineraries/240-hour-transit/day-6-west-lake.webp` | Panoramic West Lake shoreline and hills in Hangzhou | 2000×1125 | 192KB | 2 | yes | reference-41, near-1 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/cities/details/suzhou-canal-lanterns.webp` | Traditional houses and red lanterns beside a canal in Suzhou | 1800×1200 | 415KB | 2 | yes | reference-30 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp` | Pudong skyline across the Huangpu River in modern Shanghai | 2000×1125 | 202KB | 1 | yes | near-2 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Daily | `/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp` | Canal, stone bridge, and waterside houses in Zhujiajiao water town | 2000×1125 | 455KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Body | `/images/itineraries/classic-china/day-10-airport-departure.webp` | Travelers pulling luggage through a modern airport departure hall | 2400×1600 | 276KB | 2 | yes | reference-48 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | Body | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/240-hour-visa-free-china-itinerary` | itinerary | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Daily | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Daily | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Daily | `/images/cities/details/beijing-hutong-market.webp` | Local market stalls and shoppers in a Beijing hutong | 1800×1200 | 384KB | 3 | yes | reference-21 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Body | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-beijing` | itinerary | Body | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Daily | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Daily | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Daily | `/images/guides/order-food-shanghai-stall.webp` | Cook preparing food at a street stall in Shanghai | 1800×1200 | 147KB | 3 | yes | reference-24, near-11 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Body | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | Body | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/3-days-in-shanghai` | itinerary | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Daily | `/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp` | Temple of Heaven in Beijing beneath a wide summer sky | 2400×1600 | 334KB | 2 | yes | reference-44 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Daily | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Daily | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Daily | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Body | `/images/itineraries/4-days-beijing/day-4-summer-palace.webp` | Longevity Hill and lakeside architecture at Beijing's Summer Palace | 2000×1125 | 546KB | 2 | yes | reference-43 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | Body | `/images/cities/details/beijing-hutong-street.webp` | Pedestrians, scooters and traditional buildings on a Beijing hutong street | 1800×1200 | 586KB | 6 | yes | reference-7 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/4-days-in-beijing` | itinerary | CTA | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Daily | `/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp` | Xi'an Bell Tower illuminated at night in the city center | 2400×1600 | 378KB | 2 | yes | reference-46 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Daily | `/images/cities/details/beijing-hutong-market.webp` | Local market stalls and shoppers in a Beijing hutong | 1800×1200 | 384KB | 3 | yes | reference-21 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Daily | `/images/cities/beijing-forbidden-city-courtyard.webp` | Visitors walking through a courtyard in Beijing's Forbidden City | 2000×1326 | 281KB | 4 | yes | reference-15 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Daily | `/images/itineraries/classic-china/day-3-great-wall.webp` | The Great Wall winding across green mountains outside Beijing | 2400×1350 | 612KB | 10 | yes | reference-4 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Daily | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Body | `/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp` | Wide view across the Terracotta Army excavation pits near Xi'an | 2000×1125 | 545KB | 2 | yes | reference-45 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/5-days-beijing-and-xian` | itinerary | Body | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp` | West Lake and the Hangzhou skyline at sunset | 2400×1600 | 294KB | 2 | yes | reference-47 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/cities/shanghai-bund-skyline.webp` | Shanghai skyline across the Huangpu River near the Bund | 2000×1333 | 327KB | 6 | yes | reference-8 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/itineraries/eastern-china/yu-garden-shanghai.webp` | Tingtao Tower, stonework, and a pond inside Shanghai's Yu Garden | 2000×1125 | 670KB | 2 | yes | reference-49 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/guides/shanghai-three-days-street.webp` | Pedestrians on a Shanghai street framed by traditional shops and modern towers | 1800×1200 | 270KB | 6 | yes | reference-9, near-12 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/itineraries/eastern-china/longjing-tea-fields.webp` | Terraced Longjing tea fields in the hills outside Hangzhou | 2000×1125 | 648KB | 4 | yes | reference-19 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Daily | `/images/cities/suzhou-lingering-garden.webp` | Traditional architecture and trees in Suzhou's Lingering Garden | 1800×1200 | 370KB | 2 | yes | reference-33 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Body | `/images/travel/china-railway-station-interior.webp` | Modern railway station platform in China | 2000×1333 | 282KB | 6 | yes | reference-11 | no | not-detected-automatic | complete | Keep |
| `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | itinerary | Body | `/images/guides/high-speed-train-china.webp` | Chinese high-speed train at a station platform | 1800×1200 | 164KB | 5 | yes | reference-12, near-10 | no | not-detected-automatic | complete | Keep |
| `/payment-apps-guide/thank-you` | conversion | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/privacy` | policy | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/refund-policy` | policy | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/start-here` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/store` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-store-cover.png` | Product cover for the China Payment and Apps Setup Guide | 1200×800 | 68KB | 7 | yes | reference-6 | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-cover.png` | Cover preview for the China Payment and Apps Setup Guide | 1241×1754 | 119KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-decision-tree.png` | Payment backup decision tree preview from the setup guide | 1241×1754 | 115KB | 2 | yes | reference-50 | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-app-stack.png` | Essential China app stack preview from the setup guide | 1241×1754 | 120KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-phrase-card.png` | Useful Chinese payment phrase card preview from the setup guide | 1241×1754 | 110KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/store` | static | Product | `/products/previews/payment-apps-guide-hotel-card.png` | Hotel address card preview from the setup guide | 1241×1754 | 71KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/terms` | policy | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/thank-you` | conversion | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/thank-you` | conversion | CTA | `/share/china-first-trip-checklist-share-card.png` | Share card for the free China First-Trip Visitor Checklist with a QR code and firstchinatripkit.com website address | 1080×1350 | 392KB | 1 | yes | — | no | not-detected-automatic | complete | Keep |
| `/tools` | tool-list | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/tools/china-trip-duration-planner` | tool | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/tools/city-route-picker` | tool | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/tools/essential-apps-checklist` | tool | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/tools/visa-free-eligibility-checker` | tool | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/travel-essentials` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |
| `/travel-essentials` | static | Body | `/images/guides/china-packing-essentials.webp` | Passport, tickets, map and travel essentials arranged before a trip | 1800×1200 | 255KB | 2 | yes | reference-37, near-7 | no | not-detected-automatic | complete | Keep |
| `/travel-essentials` | static | Body | `/images/guides/china-esim-airport-phone.webp` | Traveler holding a smartphone beside luggage in an airport terminal | 1800×1200 | 88KB | 2 | yes | reference-36, near-6 | no | not-detected-automatic | complete | Keep |
| `/travel-essentials` | static | Body | `/images/travel/china-high-speed-rail-platform.webp` | China high-speed train waiting at a modern railway platform | 2000×1333 | 318KB | 7 | yes | reference-5 | no | not-detected-automatic | complete | Keep |
| `/travel-tools` | static | Brand | `/brand/first-china-trip-kit-logo.svg` |  | 1024×1024 | 1KB | 52 | yes | — | no | not-detected-automatic | complete | Keep |

## Remaining work outside Phase B

1. Replace Hangzhou/Guangzhou/Shenzhen generic phone/metro imagery with city-specific scenes in the later city phase.
2. Resolve non-itinerary low-resolution assets only when their scoped phase begins.
3. Review cross-site reference and perceptual duplicate groups without undoing legitimate reuse.
4. Register first-party provenance for product, share, brand and marketing assets in the relevant later phase.
