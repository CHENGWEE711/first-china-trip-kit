# Phase 5 — Global Design System & Homepage Implementation

## 1. Stage scope

Phase 5 implements the Penpot design foundations in code, introduces the shared Header, Mobile Navigation, Button, Container, Section, image, Newsletter and Footer patterns, and rebuilds the homepage. It does not redesign the Guide, City, Itinerary, Store or Tools page families. Changes outside the homepage are limited to shared component adoption and semantic token replacement required to prevent two competing style systems.

No Production deployment, Vercel production command, remote push or Production-branch change was performed.

- Project: `/Users/chengwee/Documents/20260704_中国旅游攻略`
- Branch: `ui-professional-upgrade`
- Stage 5 start commit: `2a35e239dde101b951410c04cdfe7291c1b2c9e6`
- Stage 5 end commit: this report is included in the Stage 5 commit; the immutable SHA is recorded by the post-commit `git rev-parse HEAD` output and the delivery summary because a Git object cannot embed its own final SHA.
- Intended commit message: `Implement global design system and homepage`
- Commit scope: 56 files changed, comprising 35 modified files and 21 newly tracked files; 1,069 insertions and 275 deletions.
- Dependency changes: none (`package.json` and `package-lock.json` unchanged).
- Post-commit worktree: clean.
- Remote state: local commit only; no push was performed.

## 2. Penpot basis

- File: `First China Trip Kit — UI System 2.0`
- File link: https://design.penpot.app/#/workspace?team-id=bd542ff8-ca96-8077-8008-5094e141a278&file-id=86907e95-1cb8-8122-8008-509791f8cc74&page-id=a6412e37-8bb7-80fe-8008-5099c0a498ba
- Foundations page: `a6412e37-8bb7-80fe-8008-5099c0a01110`
- Approved Designs page: `a6412e37-8bb7-80fe-8008-5099c0a498ba`
- Homepage desktop frame (`Approved Hero / Desktop`): `a6412e37-8bb7-80fe-8008-50a0867e2db8`
- Homepage mobile frame (`Approved Hero / Mobile 390`): `a6412e37-8bb7-80fe-8008-50a0b791f30f`
- Approved Homepage group: `a6412e37-8bb7-80fe-8008-50a0866d7ef3`

Component IDs read through Penpot MCP:

| Component | Penpot ID |
| --- | --- |
| Header | `a6412e37-8bb7-80fe-8008-509cc83e8786` |
| Mobile Navigation | `a6412e37-8bb7-80fe-8008-509cc881dc52` |
| Button variants | `a6412e37-8bb7-80fe-8008-509bd07fddc5` |
| Primary Button | `a6412e37-8bb7-80fe-8008-509cd95cc783` |
| Secondary Button | `a6412e37-8bb7-80fe-8008-509cd9658507` |
| Hero | `a6412e37-8bb7-80fe-8008-509cc8aeb9a6` |
| Section Heading | `a6412e37-8bb7-80fe-8008-509c820760df` |
| Destination Card | `a6412e37-8bb7-80fe-8008-509c823cb211` |
| Guide Card | `a6412e37-8bb7-80fe-8008-509c822599f2` |
| Product Preview | `a6412e37-8bb7-80fe-8008-509c8280462d` |
| Newsletter | `a6412e37-8bb7-80fe-8008-509cc8d60944` |
| Footer | `a6412e37-8bb7-80fe-8008-509cc90053fe` |

Token groups:

- Colors: `a6412e37-8bb7-80fe-8008-5099f00714d8` (15 tokens)
- Dimensions: `a6412e37-8bb7-80fe-8008-5099fe6b6769` (18 tokens)
- Typography: `a6412e37-8bb7-80fe-8008-509a1407d821` (12 tokens)
- Total read and reconciled: 45 tokens

The two approved frames are hero-focused rather than complete full-page frames. The hero composition follows those approved frames; remaining homepage sections use the read Penpot components, Foundations and the explicit Phase 5 content specification. This boundary is recorded rather than presenting the written sections as complete Penpot page frames.

## 3. Code changes

### Foundations and tokens

- `app/globals.css` is the single CSS-variable source for semantic colors, approved spacing, radii, shadows and container widths.
- `tailwind.config.ts` maps Tailwind names to those variables; duplicate hard-coded red, warm-background and legacy `clay` usages were normalized to semantic tokens.
- Source Serif 4 and Inter are locally served by `next/font` through `app/fonts.ts`, with Chinese fallback families retained.
- Main, reading and wide containers are 1240px, 760px and 1440px. Approved spacing values are 4, 8, 12, 16, 24, 32, 48, 64, 80, 96 and 120.
- The pre-implementation audit is in `docs/PHASE_5_STYLE_SYSTEM_AUDIT.md`.

### Shared components

- Added `Button`, `Container`, `Section` and `EditorialImage` primitives.
- Reworked Header into a 64px responsive navigation with a distinct desktop CTA.
- Reworked Mobile Navigation with ARIA state, full-viewport overlay, scroll lock, Escape handling and focus return. QA found and fixed a zero-height overlay caused by a backdrop-filter containing block.
- Reworked Footer into Brand, Plan, Learn, Company and Legal groups while keeping real contact and affiliate-disclosure destinations.
- Newsletter markup and status presentation were updated without changing its request endpoint or payload logic.
- Generated Playwright artifacts are ignored by ESLint and Git; approved baselines remain tracked.

### Homepage

- Approved desktop split hero and mobile image-first hero.
- One primary CTA, one secondary CTA and three quick planning links.
- Four-item trust bar.
- Three visually distinct task entry points.
- Exactly four featured destinations: Shanghai, Beijing, Xi'an and Chengdu.
- Real PDF product preview and three verified product benefits.
- Exactly three Guide records read from the existing Guide dataset, each retaining its own image.
- Shared Newsletter and Footer.
- Existing local, credited photography was reused; no AI image, hotlink or uncredited new asset was introduced, so the image-source ledger required no source change.

## 4. Functional protection

| Area | Result |
| --- | --- |
| Checklist | Hero CTA resolves to `#free-checklist`; the real labelled form is visible; the existing `checklist_download_clicked` hook fires. `/thank-you` remains successful. |
| Payhip | Existing environment-gated purchase logic is unchanged. The local environment has no configured product URL, so the external buy CTA is correctly hidden and no technical placeholder is exposed; `See What's Inside` remains available. |
| Newsletter | Existing endpoint and payload logic are unchanged. Invalid email validation and visible error state were verified without transmitting invalid data. A live successful provider submission was not performed. |
| Contact | Footer `/contact` link and the Contact route remain successful; backend form code is unchanged. |
| WhatsApp | Existing configuration-gated component is retained. With no local URL configured, no blank or false link is rendered. |
| Klook | Affiliate components and destinations were not altered; the existing safe-link unit tests pass. |
| GA4 | Global component remains mounted once and is configuration-gated. No local GA ID is present, so no local script is emitted; the CTA hook was verified with a test stub. |
| Metricool | Global production-only component remains mounted once; the existing unit test confirms one Production-only integration. |
| SEO | Title, description, canonical, Open Graph, Twitter Card, JSON-LD, one H1 and internal links were verified. Sitemap and robots files were not changed. |

No package or lockfile dependency was changed.

## 5. Validation results

Final commands used the project's npm lockfile and real scripts:

| Check | Original result summary |
| --- | --- |
| ESLint | `eslint .` — exit 0, no findings |
| TypeScript | `tsc --noEmit` — exit 0 |
| Project tests | TAP: 13 tests, 13 passed, 0 failed, 0 skipped |
| Build | Next.js 16.2.10: compiled successfully; TypeScript completed; 74 static pages generated; exit 0 |
| Full Playwright | 336 discovered: 193 passed, 143 skipped, 0 failed, duration 1.3m |
| Image audit | `PASS: 33 unique local images audited; 0 warnings.` |

The 143 Playwright skips predate Phase 5 and de-duplicate existing desktop-only Guide semantics/SEO/content audits and the Phase 2 six-viewport audit across projects. Phase 5 added no `skip`, removed no failure, and did not loosen the homepage visual threshold. The new visual threshold is `maxDiffPixelRatio: 0.005`.

## 6. Visual testing and evidence

- `tests/visual/homepage.spec.ts` uses `toHaveScreenshot()` at 1440x1000 and 390x844.
- Approved baselines: `tests/visual/approved/homepage/homepage-1440.png` and `homepage-390.png`.
- Diff output: `tests/visual/diff/homepage/` (ignored generated artifacts).
- Baselines were generated once from the reviewed implementation, then re-run without update: 2/2 passed.
- Responsive tests cover 375x812, 390x844, 430x932, 768x1024, 1024x768 and 1440x1000.
- Stage evidence contains 7 real browser screenshots: 2 before and 5 after/detail images.

Manual Penpot-to-code comparison ledger:

1. Preserved the approved A+B split editorial composition, warm background, serif display hierarchy, restrained red and utility quick links.
2. Replaced the Penpot image placeholder with an existing real Beijing travel photograph, as explicitly required by Phase 5.
3. Used the Phase 5 required final headline and supporting copy rather than the shorter concept text visible in the earlier static Penpot QA export.
4. Preserved the approved mobile image-first order and readable single-column hierarchy; the two required CTAs push quick links below the first 844px viewport.
5. Added the global 64px Header around the approved hero frame; this is sourced from the Penpot Header component and was not part of the isolated static hero export.
6. Desktop container proportions and mobile crop preserve the traveler/Forbidden City subject without horizontal overflow.
7. Full-page sections beyond the hero are implementation from approved components plus the written specification, not falsely labelled as complete approved Penpot page frames.

## 7. Regression check

`tests/live/phase5-regression.spec.ts` checks navigation, one H1, main content, Footer, successful response, console severity and horizontal overflow on both Playwright projects for:

- `/guides`
- `/guides/how-to-pay-in-china-as-a-foreigner`
- `/start-here`
- `/city-kits`
- `/itinerary-kits`
- `/store`
- `/tools`
- `/about`

Result: all eight routes passed on desktop and mobile. These pages received no visual redesign; only semantic token substitutions in a small number of existing classes were allowed where necessary.

## 8. Remaining items

- The Penpot approved desktop/mobile files are hero-focused; a complete full-page approved Penpot frame for every homepage section does not exist.
- Payhip, WhatsApp and GA4 are not configured in the local environment, so their safe hidden/configuration-gated behavior was verified rather than performing live third-party transactions.
- A successful live Newsletter provider submission and Contact backend delivery were not sent during automated QA; local validation and route integrity passed.
- Production appearance and analytics must still be checked after a separately authorized deployment. No deployment was performed in this stage.
- City, Itinerary, Store and Tools page-family visual redesigns remain outside Phase 5.

## 9. Stage conclusion

`阶段5已完成，等待验收，未执行生产部署`
