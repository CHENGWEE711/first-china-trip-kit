# V3 Phase 4B — Data Source Matrix

Status: architecture audit only

Repository baseline: `66ed82edcf3eca9a39a1f7b6894572394f75a019`

Audit date: 2026-07-19 (Asia/Shanghai)

## 1. Classification vocabulary

Every source is labelled with one or more of the task's required states:

- **Available now** — this audit could read real, non-placeholder data.
- **Available through connected UI only** — the account or collection is known,
  but no approved programmatic reporting path is connected here.
- **Requires API credentials** — a provider API could be used, but this project
  does not currently have approved reporting credentials.
- **Requires manual export** — the near-term supported ingestion is a provider
  export reviewed by an operator.
- **Requires paid plan** — the intended connector is plan-dependent.
- **Delayed** — provider reporting is not real-time.
- **Partially available** — only part of the required funnel truth is present.
- **Not available** — no active integration or usable data was found.
- **Unverified** — configuration or access could not be proved without account
  access or an explicit provider test.

No secret values, subscriber details, customer details or social-account tokens
were read into this document.

## 2. Executive matrix

| Source | Real availability now | What is genuinely available | What is not yet available | Freshness / caveat | Recommended Phase 4B role |
| --- | --- | --- | --- | --- | --- |
| GA4 | **Collection available now; reporting UI/API/Admin access unverified; API credentials unverified; delayed/partial** | Production loader/config is present; prior Production evidence confirms collection; browser page and custom events can be sent | This audit has no verified GA4 Reporting UI/Data API access, property-admin view, custom-dimension verification, bot/internal filters or dependable transaction source | Standard GA reporting has processing delay; property settings can change interpretation | Intended primary traffic and website-event source after access and event cleanup are verified; GA4 Explorations first, Looker Studio second |
| Metricool | **Available now via connected connector; delayed** | Real Website and social data for Website, Instagram, Threads, Bluesky, Pinterest, TikTok, YouTube and Twitch; account timezone is Asia/Shanghai | Metricool is not the source of Newsletter, Payhip order or affiliate commission truth; Looker Studio/API entitlement is unverified | Latest periods can be incomplete; Website evolution and source totals use different definitions/windows and must be reconciled | Social-performance system and campaign operating view; separate from the website funnel denominator |
| Newsletter / Supabase / Brevo | **Partially available; write integration available; reporting UI/API unverified** | Server route, Supabase persistence and Brevo delivery attempt; source/placement/lead-magnet/UTM values can be sent to Brevo | Unified reporting connector, verified email delivery/open/click dataset, normalized campaign fields and a server-to-GA completion bridge | Application success may mean saved in Supabase even when Brevo delivery is unavailable | The approved API success can trigger a consented client completion; provider/storage totals are manual operational reconciliation only when access is verified and never expose email to GA/Looker |
| Payhip | **Partially available; public product/checkout page available; provider order-report/export access unverified; verified outcomes require webhook or reviewed export** | Public product/checkout links and site-side outbound click intent | Checkout reached, confirmed order, refund, revenue and current provider-report access are not connected or verified in this audit | Site click is immediate; orders/refunds depend on provider events or reviewed export | Keep click as Tier 3; add an authenticated (where supported), idempotent and reconciled provider outcome source only in a later approved subphase |
| Affiliate providers | **Partially available; current click only; provider outcomes unverified / manual export likely** | Site-side affiliate outbound click; Production Klook URL is configured | Network conversion, approved commission, paid commission, attribution window and reporting API are not connected | Network outcome can be delayed and revised | Tier 3 click in GA4; use reviewed provider CSV/API only when access is proven |
| Google Search Console | **Unverified; available through UI only if property is actually verified; API requires credentials** | Repository contains a priority-URL plan and production pages are indexable | No connected API/export and no repository evidence that the exact domain property is verified for this operator | Search data is delayed and privacy-thresholded | Search acquisition/landing-quality context, not conversion source of truth |
| Vercel Analytics / Speed Insights | **Not available** | Vercel deployment/hosting exists | Analytics packages/scripts and an enabled reporting dataset were not found | Not applicable | Do not include in the initial dashboard; revisit only if explicitly enabled |
| Existing application events | **Available now; partially reliable** | GA-compatible page, Landing, Hub, Newsletter-success, checklist, paid-Guide intent and affiliate-intent events | Global schema, consent gate, dedupe, canonical names and verified commerce outcomes | Immediate client signal; ad blockers and script failures create loss | Primary implementation surface after canonical migration and data-quality controls |
| Existing exported reports | **Partially available** | `docs/marketing/china-first-trip-launch/utm-links.csv` and a weekly report template | No filled historical GA4/commerce export or verified revenue ledger was found | Static and operator-maintained | Seed naming migration and QA only; never treat the blank template as actual performance data |

## 3. GA4

### Evidence

- `components/GoogleAnalytics.tsx` loads the configured Measurement ID only in
  Vercel Production.
- `components/GoogleAnalyticsPageView.tsx` sends SPA page views.
- `lib/analytics.ts` sends custom events through `gtag` or `dataLayer`.
- Production environment configuration includes the public GA ID, but values are
  intentionally not reproduced.
- Prior release evidence observed Production collection requests. This proves
  collection, not the correctness of property settings or reports.

### Missing verification

- No connected GA4 Data API/Reporting API credentials were available.
- Admin settings such as Enhanced Measurement history tracking, internal-traffic
  filters, unwanted referrals, cross-domain configuration and custom definitions
  could not be verified.
- Current documentation describes a future Payhip `purchase` event, but the
  repository has no provider-confirmed purchase feed. It must not be assumed to
  exist in reporting.

### Recommended contract

Use GA4 as the smallest first-party website measurement destination after the
canonical event migration. Use session dimensions and approved event-scoped
dimensions; do not create a custom visitor ID. If historical querying later
requires it, evaluate the official GA4 Data API or daily BigQuery export, but do
not make BigQuery a Phase 4B starting dependency.

Official references:

- [GA4 reporting identity and data differences](https://support.google.com/analytics/answer/13644080?hl=en)
- [GA4 BigQuery Export](https://support.google.com/analytics/answer/9823238?hl=en-EN)
- [GA4 data freshness](https://support.google.com/analytics/answer/9317657?hl=en)

## 4. Metricool

### Evidence

The connected brand is readable and uses `Asia/Shanghai`. For the current-week
audit window `2026-07-12` through `2026-07-19`, real, non-empty Website daily
evolution fields (page views, visits, visitors), page-by-URL fields and
session-by-source fields were returned; the latest complete row was dated
`2026-07-18`. Social-account/post results were also returned for the current
Website and seven connected social networks: Instagram, Threads, Bluesky,
Pinterest, TikTok, YouTube and Twitch.

Metricool Website evolution, pages and sources should not be combined blindly.
An audited longer window produced materially different Visits and source-session
totals, which can arise from different dimensions, freshness or definitions.
Metricool therefore must not silently become the denominator for the GA4 Landing
funnel.

### Recommended contract

- Keep Metricool as the publishing and social-performance operating system.
- Use the campaign naming standard and generated links in Metricool posts.
- Read social impressions/reach/engagement in a separate dashboard section.
- Join to website performance only on controlled campaign/content identifiers,
  at an aggregate level.
- Reconcile timezone and reporting windows before comparing with GA4.
- Do not rebuild social scheduling.

Metricool's official Looker Studio connector requires an API token and is
available only on eligible Advanced/Custom plans. The current account's exact
entitlement was not verified, so the initial architecture must work without it.

Official references:

- [Metricool API token and Looker Studio availability](https://help.metricool.com/what-is-looker-studio-and-where-to-find-the-api-key-token-tx5lj)
- [Metricool Looker Studio FAQ](https://help.metricool.com/looker-studio-frequently-asked-questions-and-common-errors-8db39)

## 5. Newsletter, Supabase and Brevo

### Evidence

The Newsletter API accepts a subscription, attempts storage/provider delivery,
and returns provider/delivery status. Production and Preview have server-side
Newsletter integration variables configured; values were not inspected or
recorded. Supabase stores email and source page, while Brevo can receive campaign
context, placement, lead magnet and a server-side consent timestamp.

This audit did not create or inspect a real subscriber. Phase 4A acceptance also
avoided creating a permanent contact, so current contact counts, list delivery
and welcome automation remain unverified. There is also documentation/runtime
drift: the existing activation checklist describes updating an existing Brevo
contact, while the audited service currently uses `updateEnabled: false`. That
must be reconciled before treating duplicate/returning subscriber behavior as a
stable lead fact.

### Truth boundaries

| State | Current evidence | Safe reporting label |
| --- | --- | --- |
| Form started | No canonical event | Unavailable |
| API validation accepted | HTTP request reaches route | Operational only |
| Address saved | Supabase result can establish this | Newsletter completion, if the exact server outcome is defined |
| Contact sent to Brevo | Provider call result | Provider sync status |
| Welcome email delivered | Not connected as a reporting fact | Unavailable |
| Email opened/clicked | No approved provider reporting connector | Unavailable / provider UI only |

The future browser event must carry only categorical campaign context. The
server may retain the minimum operational subscriber record under the project's
approved retention policy. Subscriber email must never be sent to GA4,
Metricool or a public dashboard.

## 6. Payhip outcome ladder

| Payhip state | Current availability | Tier | Source of truth required |
| --- | --- | --- | --- |
| Checkout click | Available as website client event, with aliases | Tier 3 — intent | Canonical `paid_guide_clicked` after dedupe |
| Checkout page reached | Not verified | Operational/intent | Payhip-side analytics or approved cross-domain event; click alone is insufficient |
| Confirmed order | Not available | Tier 4 | Provider `paid` webhook or reviewed provider export |
| Refund | Not available | Tier 4 adjustment | Provider `refunded` webhook or reviewed provider export |
| Gross charged sales / refunds / net sales | Not available | Tier 4 | Provider-confirmed paid amounts and explicit refunds by currency; this is not payout settlement |

Payhip documents `paid` and `refunded` webhook events. A future webhook must
verify authenticity using the provider-supported mechanism available at
implementation time, validate the product, use provider event/order IDs for
idempotency, store no unnecessary customer PII, and reconcile against provider
exports. The public thank-you page is not transaction proof. Provider fees, tax,
currency conversion and payout settlement remain separate and unavailable until
their exact source fields are verified.

Official reference: [Payhip webhooks](https://help.payhip.com/article/115-webhooks)

## 7. Affiliate outcome ladder

| Affiliate state | Current availability | Tier | Reporting rule |
| --- | --- | --- | --- |
| Affiliate click | Available, but Klook aliases can double-count | Tier 3 — intent | One canonical outbound click per interaction |
| Network-recorded conversion | Unverified | Tier 4 candidate | Import only from the provider's report/API with a stable conversion ID |
| Approved commission | Unverified | Tier 4 | Report separately from pending conversion |
| Paid commission | Unverified | Tier 4 cash outcome | Report separately with provider payout date/currency |

Near term, use a reviewed manual CSV only if the provider offers no approved
API or current credentials. Do not infer conversion from the return URL, cookie,
thank-you page or click count. Record provider attribution windows and status
changes so pending, approved, rejected and paid amounts are never merged.

## 8. Google Search Console

The repository contains `docs/search-console-priority-urls.md`, but no verified
Search Console API integration or export. A live verification meta tag was not
observed; domain-property verification can also use DNS, so that absence does
not prove the property is unverified. Account UI access is therefore required to
confirm ownership and coverage.

If available, Search Console should provide query/page/impression/click context
for search acquisition. It should not be joined to individuals or treated as an
order attribution source.

## 9. Vercel and environment configuration

Vercel remains the deployment platform. Production environment variable names
confirm GA4, Newsletter/Supabase, Payhip and Klook application configuration,
but no values are documented here. Vercel Analytics and Speed Insights packages
or live scripts were not found, so they are **not available** as data sources.

The future internal reporting surface, if ever created, must use private
authentication and server-only credentials. It must not be bundled into public
Landing pages.

## 10. Existing exports and historical baseline

- `docs/marketing/china-first-trip-launch/utm-links.csv` contains campaign URLs
  using legacy `social`/`video` media.
- `docs/marketing/china-first-trip-launch/weekly-report-template.csv` is a blank
  reporting structure, not performance evidence.
- Existing Phase reports contain release evidence and isolated Production checks,
  not a normalized historical funnel dataset.
- Real Metricool data is readable, but must be reconciled with GA4 definitions
  before becoming a comparison baseline.

The first implementation should establish two weeks of clean, canonical data
before interpreting an experiment or trend. Historical alias events may be
shown separately as “legacy — not comparable.”

## 11. Recommended source-of-truth hierarchy

| Business question | Primary source | Secondary / reconciliation source | Never substitute |
| --- | --- | --- | --- |
| Landing sessions and website funnel | GA4 after canonical cleanup | Manually reconciled Newsletter provider/storage total when access is verified; not session-joinable | Metricool website page views |
| Social reach and post engagement | Metricool | Native platform UI where needed | GA4 Landing views |
| Newsletter accepted/saved | Newsletter server result | Supabase/Brevo operational status | Client success event alone |
| Checklist delivered | Future explicit application delivery state | Server delivery log if one is introduced | Thank-you page view or CTA click |
| Paid Guide intent | Canonical website click | Payhip outbound UTM report | Public success-page view |
| Payhip orders/refunds/revenue | Future provider webhook/export | Manual provider reconciliation | Checkout clicks |
| Affiliate intent | Canonical website click | Provider outbound link log if available | Page view |
| Affiliate conversion/commission | Provider report/API/export | Future reviewed private aggregate only after a verified import exists | Affiliate clicks |
| Organic search discovery | Search Console | GA4 organic Landing sessions | Rank-tracker estimates |

## 12. Recommended first dashboard boundary

Start with **GA4 Explorations + Looker Studio** for website traffic and canonical
events, and a separate Metricool social-performance view. This is the smallest
system that can answer the current questions without building a product the
business does not need.

Move to a hybrid source only when at least one verified commerce feed exists:

```text
GA4 / Looker Studio website funnel
+ Metricool aggregate social performance
+ private, minimal, no-PII verified conversion table or reviewed CSV
```

Do not create a custom database or dashboard merely to compensate for data that
providers do not yet make available.

## 13. Access and implementation blockers

1. Confirm GA4 property access, Enhanced Measurement, custom definitions,
   internal-traffic filters, reporting identity and Looker Studio permissions.
2. Confirm whether the current Metricool plan includes its Looker Studio/API
   connector; the architecture must still operate if it does not.
3. Approve the exact Newsletter server completion definition and retention.
4. Decide whether a Payhip webhook or reviewed manual export is permitted, and
   validate provider authenticity/idempotency before storing any transaction.
5. Obtain affiliate network reporting access and attribution-window definitions
   before reporting conversions or commission.
6. Confirm the Search Console domain property in the connected account.
7. Resolve consent/CMP and final privacy-copy requirements before EU/UK rollout.

Until those conditions are met, dashboard cells for verified purchase, revenue,
affiliate conversion and commission must display **Unavailable — integration not
verified**, never zero and never an estimate.
