# Phase 4A — Guide Visual System Implementation

Date: 2026-07-12  
Branch: `ui-professional-upgrade`

## Stage boundary

- The Penpot design-system stage is complete and remains recorded in `docs/PHASE_3_DESIGN_SYSTEM_REPORT.md`.
- This stage implements and validates only the Guides page family.
- The original full Phase 4 page designs are not all complete.
- City, Itinerary, Store, Tools, Travel Essentials, and other page families were not implemented in this stage.
- No Production deployment was executed.
- **Implemented without a complete approved Penpot page frame.** The code used approved foundations, components, and the A+B visual direction, but no complete Guides List or Guide Article approved frame existed when implementation began.

## Penpot evidence

- File: `First China Trip Kit — UI System 2.0`
- File ID: `86907e95-1cb8-8122-8008-509791f8cc74`
- Link: https://design.penpot.app/#/workspace?team-id=bd542ff8-ca96-8077-8008-5094e141a278&file-id=86907e95-1cb8-8122-8008-509791f8cc74&page-id=a6412e37-8bb7-80fe-8008-5099c0a498ba

| Requested design evidence | Penpot result |
| --- | --- |
| Guides List desktop Frame ID | **Unavailable — no complete frame exists** |
| Guides List mobile Frame ID | **Unavailable — no complete frame exists** |
| Guide Article desktop Frame ID | **Unavailable — no complete frame exists** |
| Guide Article mobile Frame ID | **Unavailable — no complete approved page frame exists** |
| `05 Guides` Page | `a6412e37-8bb7-80fe-8008-5099c0a2365d`; reserved and empty when inspected |
| `09 Mobile` Page | `a6412e37-8bb7-80fe-8008-5099c0a47a9c` |
| `10 Approved Designs` Page | `a6412e37-8bb7-80fe-8008-5099c0a498ba`; contains the approved homepage A+B direction, not a Guide page |
| Guide Article / Mobile TOC Closed | `a6412e37-8bb7-80fe-8008-50a9f3b4e025` |
| Guide Article / Mobile TOC Open | `a6412e37-8bb7-80fe-8008-50a9f406a4d4` |

Related Penpot component IDs:

| Component | ID |
| --- | --- |
| Table of Contents | `a6412e37-8bb7-80fe-8008-509c4d6e18a9` |
| Accordion | `a6412e37-8bb7-80fe-8008-509c12186719` |
| Article Metadata | `a6412e37-8bb7-80fe-8008-509c4d39c8d0` |
| Quick Answer | `a6412e37-8bb7-80fe-8008-509c4d4bb9e9` |
| Inline Image | `a6412e37-8bb7-80fe-8008-509c4d78ef5e` |
| Image Caption | `a6412e37-8bb7-80fe-8008-509c4d83a1da` |
| Related Guides | `a6412e37-8bb7-80fe-8008-509c82c1cf8c` |

The new mobile TOC frames specify default-collapsed `On this page`, open/closed state, current-section styling, touch selection with automatic close, keyboard Enter/Space/Escape behavior, focus return, document-flow placement, and no sticky overlay. They are design evidence only; mobile TOC code remains unimplemented by stage boundary.

Penpot exports:

- `docs/screenshots/phase4a-guides/penpot-mobile-toc-closed.png`
- `docs/screenshots/phase4a-guides/penpot-mobile-toc-open.png`

## Implementation evidence

- Desktop sticky contents now updates `aria-current="location"` while scrolling.
- Native hash links support click, keyboard activation, URL hash history, and browser back.
- Unicode section IDs use normalized letters and numbers rather than stripping non-English characters.
- Section `scroll-margin` keeps headings below the 65px sticky header; browser evidence measured target top at 112px.
- A global Skip to content link, semantic notice/table labeling, Chinese language tags, image alt checks, heading-order checks, CTA accessible-name checks, and a computed contrast check were added.
- The 14-Guide image set now rejects duplicate inline files and reuse of the hero file as an inline visual.

Guide data and visual detail: `docs/PHASE_4A_GUIDE_DATA_MATRIX.md`  
SEO results: `docs/PHASE_4A_GUIDE_SEO_AUDIT.md`

## Before and after screenshots

The before server used commit `6338ae6` (`9e6cd06^`). The after server used the Phase 4A working tree. Every PNG has the exact pixel dimensions in its filename.

| Route | Before 1440×1000 | Before 390×844 | After 1440×1000 | After 390×844 |
| --- | --- | --- | --- | --- |
| `/guides` | `before/guides-before-1440x1000.png` | `before/guides-before-390x844.png` | `after/guides-after-1440x1000.png` | `after/guides-after-390x844.png` |
| Payment Guide | `before/guide-payment-before-1440x1000.png` | `before/guide-payment-before-390x844.png` | `after/guide-payment-after-1440x1000.png` | `after/guide-payment-after-390x844.png` |
| Apps Guide | `before/guide-apps-before-1440x1000.png` | `before/guide-apps-before-390x844.png` | `after/guide-apps-after-1440x1000.png` | `after/guide-apps-after-390x844.png` |
| 240-hour Guide | `before/guide-visa-free-240-hour-before-1440x1000.png` | `before/guide-visa-free-240-hour-before-390x844.png` | `after/guide-visa-free-240-hour-after-1440x1000.png` | `after/guide-visa-free-240-hour-after-390x844.png` |

Base folder: `docs/screenshots/phase4a-guides/`.

## Sticky contents verification

Test: `tests/guides/table-of-contents.spec.ts`

| Requirement | Result |
| --- | --- |
| Click jumps to the correct section | PASS |
| URL hash updates | PASS |
| Browser back restores the previous hash | PASS |
| Current section highlights on scroll | PASS |
| Header does not cover the heading | PASS — 112px target top vs 65px header bottom |
| Keyboard operation and visible focus | PASS |
| No duplicate DOM IDs across 14 Guides | PASS |
| Stable non-English anchors | PASS — Chinese and accented Latin cases tested |

## Fourteen-Guide visual verification

- `tests/guides/content-visuals.spec.ts` passed all 14 routes.
- Every article rendered one visible hero and three visible inline figures inside `<article>`.
- Inline figures must have non-empty alt text and insertion metadata.
- The three inline files must be distinct and must not reuse the hero file.
- Related Guide cards are outside `<article>` and are not counted.
- Image credit, caption, insertion point, CTA, Related Guides, reading time, and uniqueness evidence is recorded in the data matrix.
- Forbidden logic search returned no `image || defaultImage`, `categoryImage`, `foodFallback`, or `guideFallback` matches.

## Accessibility verification

Test: `tests/guides/accessibility.spec.ts`

| Check | Result |
| --- | --- |
| Sticky contents focus style | PASS |
| Skip to content | PASS |
| Notice semantics | PASS — `role="note"` when a notice exists |
| Chinese phrase language | PASS — `zh-Hans` and `zh-Latn` |
| Image alt | PASS |
| Table accessible title | PASS |
| Heading order | PASS |
| CTA accessible names | PASS |
| Quick Answer contrast | PASS — computed ratio ≥ 4.5:1 |
| Keyboard navigation | PASS |

No axe dependency was added.

## Playwright smoke test disclosure

Common assertions for every smoke row: document status below 400; exactly one H1; no horizontal overflow; visible main-content images load; no error-level console or page exceptions.

| Test | Route | Project / viewport | `toHaveScreenshot()` | Scope |
| --- | --- | --- | --- | --- |
| `/ renders without critical browser errors` | `/` | Desktop 1440×900 | No | Load + common assertions |
| `/start-here renders without critical browser errors` | `/start-here` | Desktop 1440×900 | No | Load + common assertions |
| `/city-kits renders without critical browser errors` | `/city-kits` | Desktop 1440×900 | No | Load + common assertions |
| `/itinerary-kits renders without critical browser errors` | `/itinerary-kits` | Desktop 1440×900 | No | Load + common assertions |
| `/guides renders without critical browser errors` | `/guides` | Desktop 1440×900 | No | Load + common assertions |
| `/travel-essentials renders without critical browser errors` | `/travel-essentials` | Desktop 1440×900 | No | Load + common assertions |
| `/tools renders without critical browser errors` | `/tools` | Desktop 1440×900 | No | Load + common assertions |
| `/store renders without critical browser errors` | `/store` | Desktop 1440×900 | No | Load + common assertions |
| `/about renders without critical browser errors` | `/about` | Desktop 1440×900 | No | Load + common assertions |
| `/ renders without critical browser errors` | `/` | Mobile 390×664 | No | Load + common assertions |
| `/start-here renders without critical browser errors` | `/start-here` | Mobile 390×664 | No | Load + common assertions |
| `/city-kits renders without critical browser errors` | `/city-kits` | Mobile 390×664 | No | Load + common assertions |
| `/itinerary-kits renders without critical browser errors` | `/itinerary-kits` | Mobile 390×664 | No | Load + common assertions |
| `/guides renders without critical browser errors` | `/guides` | Mobile 390×664 | No | Load + common assertions |
| `/travel-essentials renders without critical browser errors` | `/travel-essentials` | Mobile 390×664 | No | Load + common assertions |
| `/tools renders without critical browser errors` | `/tools` | Mobile 390×664 | No | Load + common assertions |
| `/store renders without critical browser errors` | `/store` | Mobile 390×664 | No | Load + common assertions |
| `/about renders without critical browser errors` | `/about` | Mobile 390×664 | No | Load + common assertions |

- Screenshot difference threshold: **Not applicable**.
- Approved visual-regression baseline location: **None**.
- The Phase 4A PNGs are evidence captures, not `toHaveScreenshot()` baselines.
- **Smoke tests passed; visual regression baseline not yet approved.**

## Git evidence for `9e6cd06`

- Full SHA: `9e6cd06144cad803998a3f1d7cac962b863b71ef`
- `git show --stat --oneline`: 3 files changed, 147 insertions, 28 deletions.
- Name-only diff: `components/GuideTemplate.tsx`, `docs/IMAGE_USAGE_AUDIT.md`, `docs/PHASE_4_GUIDE_VISUAL_SYSTEM_REPORT.md`.
- Production page code changed: **Yes**, shared Guide template only.
- Design/documentation changed: **Documentation yes**; the Git commit did not contain Penpot binary content. Penpot was updated externally in Phase 4A.
- `package.json` diff: empty; dependencies changed: **No**.
- Branch upstream: none. `git ls-remote --heads origin ui-professional-upgrade` returned no branch.
- Push status: `9e6cd06` exists locally only and was not pushed.
- Worktree before Phase 4A evidence work: clean. Final handoff worktree is verified after the Phase 4A evidence commit.

## Command verification summary

| Command | Raw result summary |
| --- | --- |
| `npm run lint` | Exit 0; `eslint .`; no warnings or errors printed |
| `npm run typecheck` | Exit 0; `tsc --noEmit`; no diagnostics printed |
| `npm run test` | Exit 0; TAP 13/13 passed, 0 failed, 0 skipped; 151ms |
| `npm run build` | Exit 0; compiled in 2.1s; TypeScript 3.0s; 74 static pages generated in 410ms |
| `npx playwright test` | Exit 0; 161 passed, 143 intentionally skipped, 0 failed; 57.9s |
| `node scripts/audit-image-usage.mjs` | Exit 0; 33 unique local images; 0 errors; 0 warnings |

The 143 Playwright skips are deliberate project de-duplication: 35 Guide desktop-only semantic/SEO/TOC tests skip the mobile project, and the 108-test Phase 2 audit already supplies its own six viewports and therefore runs once in the desktop project. Both desktop and mobile smoke projects still run all nine smoke routes.

## Incomplete items and final status

- Complete approved Penpot Guides List desktop/mobile frames: missing.
- Complete approved Penpot Guide Article desktop/mobile frames: missing.
- Mobile `On this page` accordion: designed in Penpot, not implemented in code.
- Approved `toHaveScreenshot()` visual regression baseline: missing.
- City, Itinerary, Store, other page-family implementation: not started here.
- Production deployment: not performed.

Because complete approved Guide page frames and an approved visual-regression baseline are still missing, the only permitted conclusion is:

**阶段4A Guide视觉系统代码实施有条件通过**
