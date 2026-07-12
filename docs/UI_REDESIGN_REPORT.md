# First China Trip Kit UI redesign report

Date: 2026-07-12

## Direction

The visual system was moved from a dense travel-tool demo toward a premium editorial travel guide: real destination photography, a restrained warm-red and deep-green palette, serif display headings, fewer repeated cards, wider spacing, and clearer conversion paths.

## Completed scope

1. Audited the existing Next.js routes, shared components, commercial links, analytics, SEO and image usage before editing.
2. Added a shared color, typography, spacing, focus and reading-width system in `app/globals.css` and Tailwind tokens.
3. Rebuilt the global header with five primary destinations, an active state, one checklist CTA and a keyboard-accessible mobile menu.
4. Kept one global Header and Footer and preserved the existing contact, newsletter, WhatsApp, affiliate and legal links.
5. Rebuilt the home hero around real travel photography and two clear actions.
6. Reduced the home page to seven editorial sections: hero, trust strip, three planning paths, four destinations, one paid guide, three guides and newsletter.
7. Replaced the previous synthetic hero collage with licensed local photography.
8. Added 12 locally stored WebP travel images from verified Unsplash detail pages.
9. Added machine-readable image credits and a human-readable source register.
10. Rebuilt the destination index around consistent, image-led cards and two concise tags per city.
11. Added full-width photographic heroes and a practical information strip to every destination page, with priority treatment for Shanghai, Beijing, Xi'an and Chengdu.
12. Preserved city SEO content, FAQs, official resources, Chinese addresses, related itineraries and guide CTAs.
13. Rebuilt Start Here as a seven-step preparation timeline with focused next actions and supporting transport imagery.
14. Limited the Store product grid to products marked available; existing real previews, comparison tables, delivery notes and purchase fallbacks remain intact.
15. Added a real travel image and clearer editorial promise to About without testimonials or unverifiable claims.
16. Upgraded shared guide cards to image-led editorial cards using accurate alt text and Next Image.
17. Simplified the newsletter treatment while keeping its API, consent copy, success redirect and analytics unchanged.
18. Updated the default Open Graph image to a real local travel photograph without changing canonical URLs or route structure.
19. Verified lint, type checking, production build, test suite, image loading, mobile menu behavior and horizontal overflow on key pages.

## Photography and licensing

- Source platform: Unsplash only for this pass.
- All selected detail pages explicitly showed “Free to use under the Unsplash License.”
- No Unsplash+ images, sponsored results, hotlinks, AI images or app logos were used.
- Files are stored under `public/images/cities`, `public/images/travel` and `public/images/essentials`.
- Full records: `data/image-credits.json` and `docs/IMAGE_SOURCES.md`.

## Preserved functionality

- Existing public URLs and redirects
- Canonical, Open Graph, Twitter, sitemap, robots and JSON-LD logic
- Payhip environment-variable fallbacks and external-link safety
- Newsletter and contact APIs
- GA4, Metricool and event tracking
- WhatsApp and Klook integrations
- Product PDF and product preview images

## Responsive review

Checked the homepage and Store at 375, 390, 430, 768, 1024, 1280 and 1440px in a production build. The destination index, Shanghai destination page, Start Here and About were also reviewed at 390px. Every reviewed page reported matching `scrollWidth` and `clientWidth`, with no broken images. The mobile menu exposes its expanded state with ARIA and can be closed by selecting a destination.

## Validation

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm test`: 13/13 passed
- `npm run build`: passed; 74 pages generated
- Broken images in browser review: none
- Horizontal overflow in key mobile pages: none
