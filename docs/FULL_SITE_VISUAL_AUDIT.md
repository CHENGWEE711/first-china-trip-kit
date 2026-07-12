# Full-site visual audit

Completed: 2026-07-12

## Scope completed

- Guide index and all 14 guide detail pages
- Destination index and all 8 city-kit detail pages
- Itinerary index and all 7 itinerary-kit detail pages
- Start Here, Travel Essentials, Tools and all 4 tool pages
- Store and About regression checks
- Related Guides and itinerary cards
- Affiliate/product empty-state cleanup
- Image credits, source documentation and automated usage audit

The homepage design was preserved except where shared components now receive the corrected content-owned images.

## Guide featured-image map

| Guide | Featured image |
| --- | --- |
| How to Pay in China as a Foreigner | `/images/travel/phone-scanning-qr.webp` |
| Best Apps for Traveling in China | `/images/guides/best-apps-metro-phone.webp` |
| How to Book High-Speed Trains in China | `/images/guides/high-speed-train-china.webp` |
| How to Use Alipay and WeChat Pay in China | `/images/guides/alipay-cafe-qr.webp` |
| China Travel Packing List | `/images/guides/china-packing-essentials.webp` |
| Basic Chinese Phrases for Travelers | `/images/guides/chinese-phrases-restaurant-phone.webp` |
| China eSIM Guide for Tourists | `/images/guides/china-esim-airport-phone.webp` |
| How to Order Food in China | `/images/guides/order-food-shanghai-stall.webp` |
| Can Americans Travel to China in 2026 | `/images/guides/americans-china-airport-arrivals.webp` |
| China 240-Hour Visa-Free Transit Guide | `/images/guides/visa-free-transit-airport.webp` |
| How to Use Alipay in China as a Tourist | `/images/travel/phone-qr-code.webp` |
| How to Use WeChat Pay in China as a Foreigner | `/images/guides/wechat-cafe-phone.webp` |
| 3 Days in Shanghai for First-Time Visitors | `/images/guides/shanghai-three-days-street.webp` |
| China Travel Checklist Before You Fly | `/images/guides/china-preflight-checklist.webp` |

Every guide has an explicit `featuredImage`, `heroImage`, and three `inlineImages`. Related Guides reads the target guide's own `featuredImage`; category fallback imagery was removed.

## Destination image map

| City | Hero / card | Body scenes |
| --- | --- | --- |
| Shanghai | Bund skyline | Shanghai street, skyline, food stall, railway station |
| Beijing | Forbidden City | Hutong street, Forbidden City, hutong market, railway station |
| Xi'an | City Wall | City Wall, night market, food stall, high-speed rail |
| Chengdu | Panda base | Panda base, Chengdu street, food vendor, delivery/transport scene |
| Hangzhou | West Lake | West Lake, arrival-phone scene, restaurant communication, rail |
| Suzhou | Lingering Garden | Canal, market street, street food, rail |
| Guangzhou | Canton Tower | Skyline, metro-phone scene, restaurant food, station |
| Shenzhen | Skyline | Skyline, metro-phone scene, restaurant communication, airport arrival |

City pages now use image/text alternation for city character, attractions, food, and stay/transport instead of a continuous stack of equal-weight white cards.

## Itinerary image map

| Route | Card / hero direction | Route images |
| --- | --- | --- |
| 3 Days in Shanghai | Bund / Shanghai street | Bund, food, neighborhood |
| 3 Days in Beijing | Hutong / Forbidden City | Hutong, market, imperial Beijing |
| 4 Days in Beijing | Forbidden City / hutong market | Palace, hutong, market |
| 5 Days Beijing and Xi'an | Xi'an Wall / Beijing hutong | Beijing, hutong, Xi'an, night market |
| 7 Days Shanghai Hangzhou Suzhou | West Lake / Suzhou canal | Shanghai, Hangzhou, Suzhou canal and market |
| 10 Days Classic China | High-speed rail | Beijing, Xi'an, night market, Shanghai, Hangzhou, rail |
| 240-Hour Visa-Free China | Boarding pass / airport | Shanghai, Hangzhou, Suzhou, rail |

Itinerary cards have independent covers. Detail pages have photographic heroes, a city-node route overview, images within the day timeline, and a transport visual. The unavailable PDF block was removed.

## Other page changes

- Start Here: all seven steps now use a matching visa, payment, app, internet, rail/hotel, city or route image.
- Travel Essentials: added three image-led entry points for Before You Fly, Arrival Day and Daily Travel; the nine topic groups retain concise reminders and mistakes.
- Tools: all four cards now show representative inputs, an output preview, use context, time estimate and Open Tool action.
- Store: retains five real PDF-page previews with click-to-enlarge behavior; unavailable purchase actions do not render.
- About: existing brand/travel photography retained.

## Sources and removed duplication

- New photography was downloaded from Pexels; existing verified photography remains from Unsplash.
- All source detail pages, photographers and license checks are in `data/image-credits.json` and summarized in `docs/IMAGE_SOURCES.md`.
- Files are local WebP assets; there are no image hotlinks.
- The old Shanghai shengjian image that had been reused for unrelated payment/app content was removed from the asset library.
- Category-based guide image fallback logic was deleted.

## Hidden incomplete modules

- Removed visitor-facing affiliate configuration messages and disabled affiliate buttons.
- Unconfigured affiliate cards now return `null`.
- Unavailable product actions now return `null`; waitlist/technical fallback buttons were removed.
- Removed itinerary “Download PDF Kit”, “being prepared”, and future-PDF messaging.
- Removed remaining “coming soon” route copy.

## Verification

- `npm install`: PASS, 0 vulnerabilities
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS, 13/13
- `npm run build`: PASS, 74 routes generated
- `node scripts/audit-image-usage.mjs`: PASS, 33 unique local images, 0 errors, 0 warnings
- Automated browser pass: 42 requested pages at 1440 px and 390 px, no overflow, broken images, disabled actions, or technical-status text
- Breakpoint pass: 8 representative high-content pages × 375, 390, 430, 768, 1024 and 1440 px, no horizontal overflow or broken images
- Visual spot checks: guide grid, Shanghai city hero, and 10-day itinerary hero at desktop/mobile sizes

Detailed audit output: `docs/IMAGE_USAGE_AUDIT.md`.
