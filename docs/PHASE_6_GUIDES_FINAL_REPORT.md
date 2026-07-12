# Phase 6 — Guides System Integration & Finalization

Date: 2026-07-12

Branch: `ui-professional-upgrade`

Starting commit: `ae37fb1166a46637d8fee75bc7070150a50f7aec`

## Scope

This phase integrated `/guides` and all 14 Guide articles with the Phase 5 visual system. No City, Itinerary, Store or Tools page-family redesign was performed. No Production deployment was executed.

## Implementation delivered

- Rebuilt the Guides list hierarchy around a clear hero, one payment-focused featured Guide, crawlable topic navigation, all 14 Guide records, newsletter and shared footer.
- Reused the Phase 5 color, type, spacing, radius, shadow, `Container`, `Section`, Header, Footer and Newsletter systems.
- Added semantic visible breadcrumbs and Guide-specific social hero metadata.
- Implemented the Penpot-designed mobile `On this page` accordion: collapsed by default, ARIA connected, touch/keyboard operable, auto-closes after selection, closes on Escape and restores focus.
- Preserved the desktop sticky TOC with hash history, active-section state, header-safe offsets, stable Unicode IDs and unique DOM IDs.
- Retained one explicit hero and three real in-article visuals on every Guide.
- Verified 2–3 valid related Guides per article, with no self-links, duplicate targets or fallback images.

## Design evidence and fidelity ledger

The implementation follows the approved A+B direction: premium editorial typography plus utility-first clarity. Complete approved Guide page frames still do not exist; implementation therefore remains `Implemented without a complete approved Penpot page frame`.

| Reference | Rendered result | Resolution |
| --- | --- | --- |
| Warm white, charcoal, restrained red and ink green | Same Phase 5 tokens used across list and articles | Matched |
| Editorial serif headings + sans body | Global two-family typography retained | Matched |
| A editorial confidence | Featured Guide and spacious article hierarchy | Matched |
| B utility clarity | Topic navigation, Quick Answer and TOC states | Matched |
| Penpot mobile TOC closed/open frames | Default collapsed accordion and open current-section state | Matched |
| No sticky mobile obstruction | TOC stays in document flow | Matched |

## Visual regression and screenshots

Approved `toHaveScreenshot()` baselines now exist for Guides list, payment Guide and apps Guide at 1440 and 390. Threshold: `maxDiffPixelRatio: 0.015`; animations disabled; full-page captures; images are loaded before comparison.

Baseline folders:

- `tests/visual/approved/guides-list.spec.ts/`
- `tests/visual/approved/guide-article.spec.ts/`

Evidence folders:

- `docs/screenshots/phase6-guides/before/`
- `docs/screenshots/phase6-guides/after/`

Evidence includes list before/after, payment/apps desktop/mobile, mobile TOC closed/open, desktop active section and Related Guides.

## Verification summary

| Command | Result summary |
| --- | --- |
| `npm run lint` | Exit 0; ESLint printed no errors or warnings |
| `npm run typecheck` | Exit 0; TypeScript printed no diagnostics |
| `npm run test` | Exit 0; TAP 13 passed, 0 failed, 0 skipped |
| `npm run build` | Exit 0; Next.js 16.2.10 compiled in 2.9s; TypeScript 3.2s; 74/74 static pages generated |
| `npx playwright test --update-snapshots` | Exit 0; 211 passed, 159 intentional project de-duplication skips, 0 failed; 370 collected |
| `node scripts/audit-image-usage.mjs` | Exit 0; 37 unique local images; 0 errors; 0 warnings |

The 159 skips are deliberate: desktop-only all-route semantic/SEO/image audits do not rerun in the mobile project, the Phase 2 six-viewport audit runs once, and explicit visual/evidence captures run once. Both desktop and mobile still run shared smoke tests; mobile-specific TOC tests run in the mobile project.

## Supporting reports

- Implementation audit: `docs/PHASE_6_GUIDE_IMPLEMENTATION_AUDIT.md`
- Guide data: `docs/PHASE_6_GUIDE_DATA_MATRIX.md`
- SEO: `docs/PHASE_6_GUIDE_SEO_AUDIT.md`
- Images: `docs/IMAGE_USAGE_AUDIT.md`

## Remaining items

- Complete approved Penpot desktop/mobile Guide list and article frames still do not exist.
- A separate historical `publishedAt` field is not yet present; `updatedAt` currently supplies both Article dates.
- Production deployment was intentionally not performed.
- City, Itinerary, Store and other page-family redesign work was intentionally not started.

## Final status

**阶段6 Guides系统整合与最终验收完成，等待验收，未执行生产部署**
