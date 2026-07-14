# Phase D legacy route and sitemap audit

Generated: 2026-07-14 (Asia/Shanghai)  
Baseline commit: `cd48ce85a6080e24c279fd3a89e3d085f940e0ee`

## Decision

`/city-kits` and `/itinerary-kits` are the canonical destination and itinerary route families. The older `/cities` and `/itineraries` route families are compatibility URLs only and must permanently redirect to their one-to-one canonical equivalents. They must not render indexable duplicate pages and must not be included in sitemap.xml.

This resolves the current “SEO tail”: 17 old routes return indexable content while being omitted from the sitemap.

## Route matrix

| Legacy URL | Baseline | Canonical target | Required final response | Sitemap |
| --- | --- | --- | --- | --- |
| `/cities` | 200 indexable duplicate list | `/city-kits` | 301 permanent redirect | Exclude |
| `/cities/beijing` | 200 indexable duplicate | `/city-kits/beijing` | 301 permanent redirect | Exclude |
| `/cities/chengdu` | 200 indexable duplicate | `/city-kits/chengdu` | 301 permanent redirect | Exclude |
| `/cities/guangzhou` | 200 indexable duplicate | `/city-kits/guangzhou` | 301 permanent redirect | Exclude |
| `/cities/hangzhou` | 200 indexable duplicate | `/city-kits/hangzhou` | 301 permanent redirect | Exclude |
| `/cities/shanghai` | 200 indexable duplicate | `/city-kits/shanghai` | 301 permanent redirect | Exclude |
| `/cities/shenzhen` | 200 indexable duplicate | `/city-kits/shenzhen` | 301 permanent redirect | Exclude |
| `/cities/suzhou` | 200 indexable duplicate | `/city-kits/suzhou` | 301 permanent redirect | Exclude |
| `/cities/xian` | 200 indexable duplicate | `/city-kits/xian` | 301 permanent redirect | Exclude |
| `/itineraries` | 200 indexable duplicate list | `/itinerary-kits` | 301 permanent redirect | Exclude |
| `/itineraries/10-days-classic-china-itinerary` | 200 indexable duplicate | `/itinerary-kits/10-days-classic-china-itinerary` | 301 permanent redirect | Exclude |
| `/itineraries/240-hour-visa-free-china-itinerary` | 200 indexable duplicate | `/itinerary-kits/240-hour-visa-free-china-itinerary` | 301 permanent redirect | Exclude |
| `/itineraries/3-days-in-beijing` | 200 indexable duplicate | `/itinerary-kits/3-days-in-beijing` | 301 permanent redirect | Exclude |
| `/itineraries/3-days-in-shanghai` | 200 indexable duplicate | `/itinerary-kits/3-days-in-shanghai` | 301 permanent redirect | Exclude |
| `/itineraries/4-days-in-beijing` | 200 indexable duplicate | `/itinerary-kits/4-days-in-beijing` | 301 permanent redirect | Exclude |
| `/itineraries/5-days-beijing-and-xian` | 200 indexable duplicate | `/itinerary-kits/5-days-beijing-and-xian` | 301 permanent redirect | Exclude |
| `/itineraries/7-days-shanghai-hangzhou-suzhou` | 200 indexable duplicate | `/itinerary-kits/7-days-shanghai-hangzhou-suzhou` | 301 permanent redirect | Exclude |

## Additional sitemap decisions

- `/travel-tools` remains the public editorial overview page.
- `/tools` remains the functional tool index. Both have distinct intent and may stay indexable if the final content/metadata remain non-duplicative.
- `/thank-you` and `/payment-apps-guide/thank-you` are conversion/support utilities and should be `noindex, follow`; they are excluded from sitemap.
- API routes, generated PDFs and image assets remain excluded.
- sitemap.xml must contain only final canonical 200 URLs. No redirect URL and no `noindex` URL may appear.
- robots.txt must continue to expose the canonical sitemap and must not use robots blocking as a substitute for redirects or `noindex`.

## Verification gates

The Phase D final audit must prove:

1. Each of the 17 compatibility URLs returns a permanent redirect without a rendered duplicate page.
2. Every redirect target returns 200 and declares a self-canonical URL.
3. sitemap.xml contains all intended public canonical pages and none of the 17 compatibility URLs.
4. No sitemap URL returns 3xx, 4xx or a robots `noindex` directive.
5. Header, Footer, cards, JSON-LD, Open Graph and Twitter metadata use canonical route families.
6. Internal links do not point to `/cities*` or `/itineraries*` after the migration.

## Final verification

Verified against the optimized local production build on 2026-07-14.

| Gate | Final result |
| --- | --- |
| 17 legacy compatibility URLs | PASS — all return a single-hop 301 to the matching canonical kit URL |
| Legacy page source | PASS — duplicate `/cities*` and `/itineraries*` page implementations removed |
| Redirect targets | PASS — every sampled and sitemap target returns 200 |
| Canonical sitemap | PASS — 49 canonical URLs; no legacy, redirect, 404 or `noindex` URL |
| Canonical coverage | PASS — 0 indexable routes missing from sitemap |
| Internal links | PASS — 0 broken internal links and no rendered legacy-route navigation |
| robots.txt | PASS — canonical sitemap declared; no indexable page hidden as a redirect substitute |
| Redirect chain or loop | PASS — none detected |

No legacy URL was added to the sitemap. The canonical public route families remain `/city-kits` and `/itinerary-kits`.
