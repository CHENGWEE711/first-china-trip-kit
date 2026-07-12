# Phase 4A — Guide SEO Audit

Date: 2026-07-12  
Test: `tests/guides/seo-regression.spec.ts`  
Result: **14/14 Guide routes passed** in the `chromium-desktop` project.

## Assertions applied to every Guide

- Exactly one visible H1.
- Non-empty document title.
- Non-empty meta description.
- Canonical URL ends in the current Guide route.
- Open Graph title, description, and absolute image URL exist.
- JSON-LD exists and contains an `Article` object.
- Article `headline` exists and `dateModified` uses `YYYY-MM-DD`.
- Quick Answer and the main SEO body remain visible.
- Every in-article hash link resolves to a real DOM ID and is not treated as another page.

## Route matrix

| Route | H1 | Title | Description | Canonical | OG title/description/image | JSON-LD Article/date | SEO body | Hash links |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/guides/how-to-pay-in-china-as-a-foreigner` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/best-apps-for-traveling-in-china` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/how-to-book-high-speed-trains-in-china` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/how-to-use-alipay-and-wechat-pay-in-china` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/china-travel-packing-list` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/basic-chinese-phrases-for-travelers` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/china-esim-guide-for-tourists` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/china-food-ordering-guide` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/can-americans-travel-to-china-in-2026` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/china-240-hour-visa-free-transit-guide` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/how-to-use-alipay-in-china-as-a-tourist` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/how-to-use-wechat-pay-in-china-as-a-foreigner` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/3-days-in-shanghai-for-first-time-visitors` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/guides/china-travel-checklist-before-you-fly` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

## Notes

- The audit verifies that an Open Graph image exists; it does not approve a per-Guide social sharing composition.
- `dateModified` is the Article date field currently emitted. A separate `datePublished` field is not present in the existing data model.
- This is an SEO regression test, not a search ranking guarantee.
