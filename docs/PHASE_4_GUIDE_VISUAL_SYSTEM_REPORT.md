# Phase 4 — Guide Visual System Report

Date: 2026-07-12  
Branch: `ui-professional-upgrade`  
Starting commit: `6338ae6355bdf2116fa0b3e22b5248e9576a92ea`

## Scope

Phase 4 implements the first approved production-code unit from the Penpot design direction: the Guide image model and Guide article visual system. City, itinerary, store, tools, and remaining page-family redesigns are intentionally outside this phase.

## Existing foundation verified

- 14 Guide records already use explicit `featuredImage`, `heroImage`, and `inlineImages` data.
- Every Guide has at least three inline images.
- Guide cards and Related Guides resolve the target Guide's own featured image; there is no category fallback.
- Image credits and source records exist in `data/image-credits.json` and `docs/IMAGE_SOURCES.md`.
- The image audit covers Guide, destination, and itinerary records and local files.

## Changes completed

### Editorial article hierarchy

- Rebuilt the Guide header around the approved A+B direction: editorial serif title, restrained category label, clear summary, metadata divider, and a full-width image-led hero.
- Increased responsive title scale while keeping the 390 px layout within the viewport.
- Kept one H1 per page and preserved the existing article content, metadata, SEO, CTAs, analytics, FAQs, and product logic.

### Reading experience

- Added a desktop sticky table of contents with numbered anchor links.
- Added stable section anchors for quick answer, audience, feature sections, steps, mistakes, troubleshooting, backup plan, useful phrases, and first-day checklist.
- Replaced equal-weight card stacking with an open editorial reading flow using rules, spacing, and a 760 px reading column.
- Restyled Quick Answer as a high-contrast jade utility panel and Important Notice as a restrained red callout.
- Restyled practical items and Chinese phrase blocks to reduce template-like card repetition.
- Preserved three inline editorial images and their captions in the article flow.

### Code quality

- Moved the Next.js image import to the normal import section.
- Kept the component server-rendered; no client-side bundle or runtime state was added.
- Reused the existing design tokens and image data model rather than introducing a parallel system.

## Verification results

| Check | Result | Evidence |
| --- | --- | --- |
| ESLint | PASS | `npm run lint` |
| TypeScript | PASS | `npm run typecheck` |
| Unit/integration tests | PASS | 13/13 |
| Playwright smoke | PASS | 18/18 across desktop and mobile projects |
| Production build | PASS | Next.js compiled and generated 74 pages |
| Image usage audit | PASS | 33 unique local images, 0 errors, 0 warnings |
| Desktop browser QA | PASS | 1440 × 1000; 1 H1, sticky contents visible, 0 broken images, no horizontal overflow |
| Mobile browser QA | PASS | 390 × 844; 1 H1, single-column flow, 0 broken images, no horizontal overflow |
| Key Guide route QA | PASS | Payment, Apps, and 240-hour visa-free guides each render Quick Answer and 4 article figures |
| Browser console | PASS | No error-level console messages on the representative Guide page |

## Manual visual review

- First visual focus is now the article topic and hero image, not a collection of same-weight modules.
- The desktop contents rail improves scanability without narrowing the 760 px reading column.
- The mobile order remains title, summary, metadata, hero, then utility content; no sidebar content interrupts the flow.
- Warm white, charcoal, restrained red, and ink green match the approved Penpot foundations.
- Commercial CTAs remain below the useful article content and retain their existing availability guards.

## Known limitations and incomplete items

- Phase 4 does not redesign city, destination, itinerary, store, tools, travel essentials, homepage, header, or footer page families.
- Only the representative Guide routes were manually inspected in the in-app browser; all 14 Guide routes were compiled statically and remain covered by shared-template and image-data validation.
- The desktop table of contents is intentionally hidden below the large breakpoint; a mobile accordion contents component is not part of this phase.
- No production deployment was performed.

## Acceptance decision

Phase 4 is ready for user acceptance. Do not begin the next phase until acceptance is explicitly given.
