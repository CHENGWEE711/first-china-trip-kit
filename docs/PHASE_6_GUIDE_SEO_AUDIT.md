# Phase 6 — Guide SEO Audit

Date: 2026-07-12

Test: `tests/guides/seo-regression.spec.ts`

## Result

**PASS — 14/14 Guide routes retained required SEO signals.**

Every Guide was requested over HTTP and returned below 400. The test verifies exactly one H1, a non-empty title and meta description, a self-referencing canonical URL, Open Graph title/description/image, Twitter title/description/image, Article JSON-LD, Breadcrumb JSON-LD, `datePublished`, `dateModified`, visible Quick Answer and article body, and valid in-page anchors.

## Phase 6 improvements

- Social previews now use each Guide's explicit hero image rather than the site-wide default.
- Article JSON-LD now exposes both published and modified dates from the maintained Guide date.
- Breadcrumb UI and Breadcrumb JSON-LD agree on Home → Guides → Article.
- Topic filtering uses crawlable server-rendered `/guides?topic=…` URLs and never hides Guide content only in client state.
- No key SEO article content was moved behind the mobile TOC; the accordion controls navigation links only.

## Route matrix

All 14 routes listed in `tests/guides/guide-routes.ts` passed the same assertions. Legacy redirects remain in place for the two historic slugs. No invalid article hash links were found.

## Residual note

The site currently uses the maintained `updatedAt` value as the initial `datePublished` value because a separate historical publication date is not present in the Guide schema. This is explicit and valid, but can be split later if editorial publication history is added.
