# V3 Phase 4B — Data Source Matrix

Status: architecture audit only; no Production integration was added

Accepted Phase 4A baseline: `66ed82edcf3eca9a39a1f7b6894572394f75a019`

Repository HEAD inspected: `9854a02154f6aa7246ac1ab2f454e6d8b4f3d0c1`

Audit date: 2026-07-20 (Asia/Shanghai)

## 1. Evidence and classification rules

This matrix records what the repository, Production HTML, connected tools and
existing project reports actually proved. A provider's documented capability is
not treated as proof that this account has the required plan, credentials or
reporting access.

Required availability labels:

- **Available now** — real, non-placeholder data was readable in this audit.
- **Available through connected UI only** — an account or collection may be
  usable in its provider UI, but no approved programmatic reporting path is
  connected here.
- **Requires API credentials** — the provider documents an API, but approved
  reporting credentials were not verified for this project.
- **Requires manual export** — the near-term safe input is a reviewed provider
  export.
- **Requires paid plan** — the intended connector is provider-plan dependent.
- **Delayed** — the source is not guaranteed to be real-time or its newest rows
  can still change.
- **Partially available** — only part of the business state is proved.
- **Not available** — no active integration or usable dataset was found.
- **Unverified** — current account configuration, entitlement, history or
  outcome cannot be proved with the access available to this audit.

Privacy boundary:

- No secrets, email addresses, customer data, account labels, social account
  identifiers, brand identifiers, Planner record identifiers or post copy are
  reproduced here.
- Connected-tool identifiers may be retained only in a private Campaign
  Registry after their stability and purpose are verified.
- `0` is never substituted for an unavailable outcome. The reporting label is
  **Unavailable — integration not verified**.

## 2. Executive availability summary

| Source | Audited availability | Current safe role | Explicitly unavailable or unverified |
| --- | --- | --- | --- |
| GA4 | **Partially available; collection available now; reporting UI/API/Admin access unverified; delayed** | Website session and canonical event reporting after cleanup | Property settings, report history, custom definitions, filters and commerce outcomes |
| Metricool | **Available now through the connected connector; delayed; paid connector entitlement unverified** | Publishing status and platform-specific social/Website reporting | Newsletter, Payhip and affiliate outcome truth; universal social-click metric; API/Looker entitlement |
| Newsletter application + Supabase | **Partially available; write path available now; reporting read path unverified** | Accepted/saved lead operational state | Welcome-message delivery, open/click and a privacy-safe aggregate reporting feed |
| Brevo | **Partially available for provider write attempts; reporting UI/API unverified** | Contact sync/delivery status when the exact provider response is retained | Verified historical contact/campaign report access and welcome-message delivery truth |
| Payhip | **Partially available for outbound click only; provider outcomes unavailable** | Tier 3 paid-Guide click intent | Checkout reached, confirmed order, refund, revenue and payout settlement |
| Affiliate providers | **Partially available for outbound click only; provider outcomes unavailable** | Tier 3 affiliate click intent | Network conversion, approved commission and paid commission |
| Google Search Console | **Unverified; UI only if the property is verified; API requires credentials** | Organic search discovery when access is confirmed | Property ownership, API/export access and exact history |
| Vercel Web Analytics / Speed Insights | **Not available in the audited application** | None in the first dashboard | Enabled collection, current report access, plan/retention entitlement |
| Existing application events | **Available now; partially reliable** | Engagement, lead-intent and commercial-intent implementation surface | Global consent, canonical schema, dedupe and verified commercial outcomes |
| Existing reports / exports | **Partially available; static/manual** | Naming migration and QA evidence | Filled historical funnel, orders, refunds, revenue or affiliate outcomes |

## 3. Required source records

Each record below states every required field explicitly.

### 3.1 Google Analytics 4

| Required field | Audited value |
| --- | --- |
| **Data source** | Google Analytics 4 browser collection configured through `components/GoogleAnalytics.tsx`, SPA page views through `components/GoogleAnalyticsPageView.tsx`, and custom events through `lib/analytics.ts`. |
| **Available now** | **Partially available; collection available now; reporting UI/API/Admin access unverified; API credentials unverified; delayed.** Production HTML contains the GA loader. This proves loading, not report correctness. |
| **Access method** | Current: Production browser sends data to GA4. Future reporting: GA4 UI/Explorations, Looker Studio connector, or GA4 Data API after access is approved. |
| **Authentication** | Browser collection uses the public Measurement ID. Reporting requires an authorized Google user/service credential with property access; none was verified in this audit. |
| **Plan limitation** | GA4 standard reporting limits, cardinality/thresholding and connector quotas can apply. BigQuery export is a separate architectural choice, not a Phase 4B prerequisite. The account/property tier is unverified. |
| **Data granularity** | Page-view and event rows with session/user dimensions as GA4 processes them. Current custom-event parameters are not globally allowlisted. |
| **Data delay** | **Delayed.** Standard reports and derived fields can update after collection; freshest data may be incomplete. No project-specific latency SLA was verified. |
| **Historical coverage** | Production collection exists, but the first collection date, retention setting and queryable history were not accessible. **Unverified.** |
| **Reliable join key** | For every new managed publication, GA4 Campaign ID populated from public `utm_id` must equal the private registry `publishId`; normalized source, medium, campaign, content and Landing remain validation dimensions. Historical links without `utm_id` are aggregate-only legacy. No cross-provider transaction key or customer identity join exists. |
| **PII exposure** | Target is categorical, non-PII data. Current page-view code sends a full page location and some custom events can send full destination URLs/stored UTMs, creating query-string and high-cardinality exposure risk. Email and visa/itinerary answers must never be sent. |
| **Source of truth** | After canonical event, consent and dedupe controls: website sessions, Landing progression and client-observable engagement. It is **not** source of truth for Newsletter delivery, Payhip orders/refunds/revenue or affiliate commission. |
| **Phase 4B use** | Website funnel denominator and canonical Tier 1–3 events in GA4 Explorations/Looker Studio. Keep legacy aliases separate and labelled non-comparable. |
| **Future integration** | Verify property/Admin access, custom definitions, reporting identity, unwanted referrals, internal-traffic filtering and retention; introduce a global event allowlist/sanitizer/dedupe contract before dashboarding. |
| **Blocker** | No verified reporting/Admin access; consent/CMP behavior unresolved; current event aliases and unrestricted parameters can duplicate or leak high-cardinality URL data. |

Evidence notes:

- GA4 and Metricool load in Production before an explicit consent decision in
  the current implementation.
- GA4's Production-only loader excludes Preview/local collection at the loader
  boundary, but the generic event producer itself has no environment guard.
- No provider-confirmed `purchase` feed exists in the repository.

### 3.2 Metricool

| Required field | Audited value |
| --- | --- |
| **Data source** | The connected Metricool brand, configured for `Asia/Shanghai`, with Website plus Instagram, Threads, Bluesky, Pinterest, TikTok, YouTube and Twitch connections. |
| **Available now** | **Available now through the connected connector; delayed.** Real Planner records, Website metrics and platform-specific social fields were readable. Current Planner records also showed account-limit and some platform-publishing errors. |
| **Access method** | Current connected-tool read access and Metricool UI. Future reporting may use Metricool's Looker Studio connector/API token only if the account entitlement is confirmed. |
| **Authentication** | Current connection is authenticated by the connected account/tool and network authorizations. Direct API/Looker use requires a Metricool access token; no token is recorded here. |
| **Plan limitation** | The connector currently reports an account usage limit in Planner. Metricool documents its Looker Studio connector for Advanced/Custom plans. Exact current plan, reset rule and API entitlement are **unverified**. |
| **Data granularity** | Planner item/status; Website day/page/source; and network-specific account/post/video/pin fields. Available fields differ by platform and must not be coerced into one universal schema. |
| **Data delay** | **Delayed.** Latest platform/provider periods can be incomplete and definitions vary. No exact freshness SLA was verified for this account. |
| **Historical coverage** | Real July 2026 records and current reporting windows were readable. Maximum retrievable history and retention by network are **unverified**. |
| **Reliable join key** | The private registry maps one public-safe `publishId` to at most one private `metricoolPostId` after scheduling. Planner ID/UUID and native platform post/video/pin ID are provider-key candidates whose stability must be validated and never exposed. TikTok's audited catalog did not expose a native post ID, so the private Planner mapping is especially important; do not fall back to caption/time heuristics. |
| **PII exposure** | Account, brand, Planner and post identifiers are operationally sensitive. Keep them in a private registry. Do not export captions, audience identifiers or private messages into the growth dashboard. |
| **Source of truth** | Publishing status and Metricool-reported platform performance for the specific network/field. It is not the source of website lead, order, refund, revenue or commission truth. |
| **Phase 4B use** | Separate social-performance and publishing-quality view; compare platform reach/engagement/outbound clicks only where that platform exposes them. New managed publications join privately to GA4 through `metricoolPostId` → registry `publishId` → GA4 Campaign ID (`utm_id`); pre-contract posts remain campaign/content aggregate legacy. |
| **Future integration** | Adopt generated UTM links and a private publish registry; verify Looker/API entitlement; reconcile timezone, native IDs and platform definitions before Looker blending. |
| **Blocker** | Current Planner account-limit errors; exact plan/API entitlement unknown; legacy scheduled links largely use `utm_medium=social` or `video` and lack `utm_id`; click metrics are not universally available. |

Audited capability boundary:

| Connection | Fields observed or catalogued | Safe interpretation | Important limitation |
| --- | --- | --- | --- |
| Website | Page Views, Visits, Visitors; page URL/views; source/sessions | Metricool Website context | Do not silently use as the GA4 Landing-session denominator; dataset definitions/windows require reconciliation |
| Instagram | Post ID/URL, organic reach/interactions/views; some paid click/spend fields | Post performance; paid fields only when explicitly labelled | Paid clicks are not a generic organic outbound-click metric |
| Threads | Post ID/URL, views, likes, replies, reposts, shares | Post engagement | No universal outbound-click field was proved |
| Bluesky | Post ID/URL, likes, replies, reposts, quotes | Post engagement | No outbound-click field was observed |
| Pinterest | Pin ID/URL, impressions, pin clicks, outbound clicks | Pin and outbound-click performance | Platform-specific definition; do not generalize to other networks |
| TikTok | Video URL, views/reach/engagement/watch metrics | Video performance | Audited catalog did not expose a post ID or outbound-click field |
| YouTube | Video ID/URL, views/watch/likes/comments/shares; platform-estimated creator revenue fields | Video performance; YouTube creator monetization only | YouTube estimated revenue is not Payhip sales or affiliate revenue |
| Twitch | Connection confirmed | Connected-channel availability | Detailed reporting field coverage was not independently validated in this audit |

Metricool records and current publishing state are intentionally described only
in aggregate. Actual Planner identifiers, post copy and account labels remain in
the private operating environment.

### 3.3 Newsletter application and Supabase

| Required field | Audited value |
| --- | --- |
| **Data source** | `app/api/newsletter/route.ts`, Newsletter service logic and configured Supabase table(s) used for operational subscriber persistence. |
| **Available now** | **Partially available.** The server write path and application result states exist; current table/report read access and real aggregate counts were not verified. |
| **Access method** | Website POST to the Newsletter API; server-side Supabase client for persistence. Future aggregate reporting requires approved server-side query/export. |
| **Authentication** | API endpoint is public with validation/honeypot controls. Supabase uses server-side credentials/environment variables; values were not inspected or recorded. |
| **Plan limitation** | Supabase project quotas/retention and Brevo limits may apply, but current account tiers and remaining quotas are **unverified**. |
| **Data granularity** | One operational subscriber record/request result. The audited Supabase path stores email, source, status and created time; it does not persist the complete campaign tuple. |
| **Data delay** | Write result is near-request-time; dashboard aggregates would be query/export-time and are not connected. Provider delivery is a separate delayed state. |
| **Historical coverage** | Existing subscriber history may exist, but row count, start date, retention and completeness were not read. **Unverified.** |
| **Reliable join key** | Server request/subscription ID would be preferable but is not currently established. Email may deduplicate operational contacts but must not be exported as an analytics join key. Aggregate campaign/date/source is the safe reporting join after storage is normalized. |
| **PII exposure** | Email is direct PII and must remain server-side with minimum retention/access. Never send it to GA4, Metricool, a URL, client storage or a public dashboard. Source strings must be allowlisted to avoid free-text leakage. |
| **Source of truth** | Supabase can be source of truth for an address saved by the application only when exact success semantics and table access are verified. It is not truth for Brevo delivery/open/click. |
| **Phase 4B use** | Define a server-confirmed Newsletter completion state and use privacy-safe aggregates to reconcile GA4 lead events. Do not session-join subscriber PII. |
| **Future integration** | Add a canonical result enum and server request/event ID, normalize campaign fields, retain only necessary operational data, and expose private aggregate counts only after access control/retention approval. |
| **Blocker** | Current client treats any HTTP `ok` as success even when Brevo delivery is `failed` or `not_configured`; report read access, retention and canonical completion semantics are unverified. |

Newsletter state ladder:

| State | Current proof | Safe reporting label |
| --- | --- | --- |
| Form started | No canonical start event across all placements | **Unavailable — canonical event not implemented** |
| API validation accepted | Route accepted the request | Operational request state, not a lead by itself |
| Subscriber saved in Supabase | Server result can distinguish storage success | Lead completion only after the exact contract is approved |
| Contact accepted by Brevo | Provider call result | Provider sync state, separate from storage |
| Welcome message delivered | No verified delivery feed | **Unavailable — integration not verified** |
| Email opened/clicked | No approved reporting connector | **Unavailable — integration not verified** |

### 3.4 Brevo

| Required field | Audited value |
| --- | --- |
| **Data source** | Brevo Contacts write integration used by the Newsletter service; Brevo campaign/contact reporting is a documented provider capability but was not queried. |
| **Available now** | **Partially available for write attempts; reporting UI/API unverified; delayed.** Environment-variable names and server code prove integration capability, not provider report access or delivery. |
| **Access method** | Current: server-side Contacts API calls. Possible future: connected Brevo UI, reviewed export or read-only API queries after approval. |
| **Authentication** | Server-side Brevo API key and list ID environment variables are configured by name. Secret values were not read. Reporting would require an approved key with appropriate access. |
| **Plan limitation** | Contact/campaign/automation quotas and report history can vary by Brevo plan/endpoint. Exact current plan and entitlements are **unverified**. |
| **Data granularity** | Contact/list membership and, if separately queried, campaign-level delivery/open/click statistics. These are different datasets and should not be conflated. |
| **Data delay** | Contact API response is request-time. Delivery/open/click statistics are provider-processed and **delayed**; newest values can change. |
| **Historical coverage** | Not read. Official campaign endpoints have endpoint-specific windows; project-specific history and automation reporting coverage remain **unverified**. |
| **Reliable join key** | Provider contact ID is operationally stable but PII-adjacent and must stay private. Campaign ID plus normalized campaign/date can support aggregate reporting; no verified cross-system key currently exists. |
| **PII exposure** | Contacts API returns email and can return attributes. Never ingest contact-level email/attributes into GA4, Metricool or Looker. Prefer campaign/list aggregates with minimum fields. |
| **Source of truth** | Brevo response/report is source for provider acceptance and provider-reported delivery/open/click, once access is verified. It is not source for website sessions or Payhip/affiliate outcomes. |
| **Phase 4B use** | Initially operational reconciliation only. Add aggregate Newsletter/provider health after a read path, consent basis and metric definitions are approved. |
| **Future integration** | Validate an aggregate, read-only reporting path; map campaign IDs to the private Campaign Registry; document Apple MPP/open limitations; keep contact data outside the dashboard. |
| **Blocker** | Reporting credentials/UI access, automation identity, delivery definition, current plan and history are unverified; application success currently does not guarantee Brevo delivery. |

### 3.5 Payhip

| Required field | Audited value |
| --- | --- |
| **Data source** | Production Payhip product/checkout URLs, client-side product CTA events and the public website success page; no provider order dataset is connected. |
| **Available now** | **Partially available for checkout click only.** Checkout reached, confirmed order, refund, verified revenue and payout settlement are **not available**. |
| **Access method** | Current: public outbound link and website client event. Future: authenticated provider webhook where supported and validated, or reviewed Payhip export/UI reconciliation. |
| **Authentication** | Public product links need no report authentication. Order/refund reporting requires provider account/webhook/export access; none was available in this audit. |
| **Plan limitation** | Webhook/report/export availability, fields and retention must be confirmed against the actual account. Exact plan and current provider reporting entitlement are **unverified**. |
| **Data granularity** | Current: one client click. Future: provider order/refund event or export row with product, currency, amount, status and provider ID; payout is a separate settlement record. |
| **Data delay** | Click is immediate but lossy. Orders/refunds/payouts are provider-timed and can be delayed/revised. No project-specific SLA was verified. |
| **Historical coverage** | Website click history may exist in GA4, but exact range is unverified. Provider order/refund/export history was not accessed. |
| **Reliable join key** | Provider order/event ID for verified outcomes, with idempotency and reconciliation. UTM/campaign values are supporting attribution only. A thank-you URL or browser event is not an order key. |
| **PII exposure** | Provider order payloads may contain customer email/name. Future ingestion must drop or isolate PII and store only the minimum transaction fields needed for reconciliation. Do not send order/customer IDs to public analytics unless formally approved and non-identifying. |
| **Source of truth** | Payhip provider-confirmed order/refund records, once connected, are truth for gross charged sales and refunds. Provider payout records are separately authoritative for settled cash. Current website events are click-intent only. |
| **Phase 4B use** | Report canonical `paid_guide_clicked` as Tier 3 intent. All Tier 4 cells remain unavailable until provider evidence is integrated. |
| **Future integration** | Evaluate authenticated/idempotent `paid` and `refunded` webhook handling or a reviewed export; validate product/currency/amount; reconcile events to provider totals; keep fees/tax/payout separate. |
| **Blocker** | No order/report/webhook access, no provider event store and no refund/revenue reconciliation. The public success page is reachable without verified transaction context. |

Strict Payhip outcome ladder:

| State | Availability now | Conversion tier | Required truth |
| --- | --- | --- | --- |
| Checkout click | Available as a client event; aliases can duplicate | Tier 3 — commercial intent | Canonical deduplicated `paid_guide_clicked` |
| Checkout page reached | **Unavailable — integration not verified** | Operational/intent only | Payhip-side report or approved cross-domain/provider event |
| Confirmed order | **Unavailable — integration not verified** | Tier 4 — verified outcome | Provider `paid` event or reviewed provider order export |
| Refund | **Unavailable — integration not verified** | Tier 4 adjustment | Provider `refunded` event or reviewed refund export |
| Gross charged revenue | **Unavailable — integration not verified** | Tier 4 | Provider-confirmed paid amounts by currency |
| Net sales after refunds | **Unavailable — integration not verified** | Tier 4 | Confirmed paid amounts minus explicit confirmed refunds; definitions documented |
| Payout settlement | **Unavailable — integration not verified** | Cash settlement, separate from sales | Provider payout statement including fees/tax/currency treatment |

### 3.6 Affiliate providers

| Required field | Audited value |
| --- | --- |
| **Data source** | Website affiliate-link configuration and client outbound-click events for potential Airalo, Klook, Booking and SafetyWing links; repository operator notes about application status. |
| **Available now** | **Partially available for affiliate click only.** A Production Klook link was observed. Network conversion, approved commission and paid commission are **not available**. Other provider readiness is not proved by configuration names. |
| **Access method** | Current: website outbound event. Future: each network's authenticated dashboard/API or operator-reviewed export. |
| **Authentication** | Public tracking URLs do not grant reporting access. Provider dashboard/API credentials were not connected or inspected. |
| **Plan limitation** | Provider program approval, attribution window, minimum payout, reporting/export and API access vary by network. Current terms/entitlements are **unverified**. |
| **Data granularity** | Current: one browser click. Future: network conversion/commission record with provider conversion ID, status, currency and event/approval/payment dates. |
| **Data delay** | Click is immediate but lossy. Network conversion and commission states are **delayed** and can move from pending to approved/rejected/paid. |
| **Historical coverage** | Website click range is unverified in GA4. No network conversion/commission export history was found. |
| **Reliable join key** | Provider conversion/transaction ID is required for outcome dedupe. Campaign/sub-ID can support aggregate attribution if the network preserves it. Click count, destination URL and cookies are not verified outcome keys. |
| **PII exposure** | Affiliate reports can contain booking/order/customer details. Import only minimum non-PII outcome fields. Current click events include full destination URLs and affiliate query identifiers, which should be normalized/redacted. |
| **Source of truth** | Provider network report/API/export is truth for network-recorded conversion, approved commission and paid commission. Website event is truth only that the browser attempted a click. |
| **Phase 4B use** | Canonical Tier 3 `affiliate_link_clicked`, deduplicated across current aliases. Tier 4 remains unavailable until a provider feed is reviewed and approved. |
| **Future integration** | Define one adapter/export schema per approved network; capture non-PII campaign/sub-ID; preserve pending/approved/rejected/paid states and original currency; reconcile every import. |
| **Blocker** | Provider reporting access, program approval for every configured network, attribution windows, conversion IDs, status definitions and payout records are unverified. Repository status notes are operator-reported, not provider outcome evidence. |

Strict affiliate outcome ladder:

| State | Availability now | Conversion tier | Required truth |
| --- | --- | --- | --- |
| Affiliate click | Available; current Klook aliases can double-fire | Tier 3 — commercial intent | One canonical deduplicated outbound click |
| Network-recorded conversion | **Unavailable — integration not verified** | Tier 4 candidate | Provider report/API/export with stable conversion ID |
| Pending commission | **Unavailable — integration not verified** | Pending outcome, not revenue | Provider status and amount/currency |
| Approved commission | **Unavailable — integration not verified** | Tier 4 verified outcome | Provider approval status/date and amount/currency |
| Rejected/reversed commission | **Unavailable — integration not verified** | Tier 4 adjustment | Provider rejection/reversal record |
| Paid commission | **Unavailable — integration not verified** | Tier 4 cash outcome | Provider payout record/date/currency |

### 3.7 Google Search Console

| Required field | Audited value |
| --- | --- |
| **Data source** | Google Search Console property for the Production domain, if verified. The repository contains an SEO priority-URL document, not a Search Console dataset. |
| **Available now** | **Unverified; available through connected UI only if property ownership exists; API requires credentials.** No usable export/API connection was found. |
| **Access method** | Search Console UI, Looker Studio connector, reviewed export or Search Console Search Analytics API after property access is confirmed. |
| **Authentication** | Authorized Google account/OAuth or service credential with access to the exact URL-prefix/domain property. None was verified in this audit. |
| **Plan limitation** | API load/query quotas apply; results can be privacy-filtered and the API does not guarantee every row. This is a provider limitation rather than a paid-plan assumption. |
| **Data granularity** | Aggregate date/query/page/country/device/search-appearance rows with clicks, impressions, CTR and position. Do not attempt person/session identity joins. |
| **Data delay** | **Delayed.** Recent/fresh rows can be incomplete and later change. Exact property-specific freshness was not tested. |
| **Historical coverage** | Property creation/verification date and available report history are **unverified**. |
| **Reliable join key** | Canonical page path plus date and aggregate campaign-independent dimensions. Search query is a dimension, not a user key. |
| **PII exposure** | Search Console is aggregate and privacy-filtered, but queries can still be sensitive or low-volume. Keep access private and do not combine into user profiles. |
| **Source of truth** | Google-reported organic search impressions/clicks for the verified property, once connected. It is not website conversion/order attribution truth. |
| **Phase 4B use** | Search acquisition and Landing discovery context; compare aggregate organic landing quality with GA4 without forcing row-level joins. |
| **Future integration** | Confirm exact property ownership; start with UI/Looker; use API only if recurring reporting needs justify credentials and quota handling. |
| **Blocker** | Property ownership and history unverified; live meta/DNS observations did not prove a Google verification record, but absence of one observed mechanism is not sufficient to declare the property absent. |

### 3.8 Vercel Web Analytics and Speed Insights

| Required field | Audited value |
| --- | --- |
| **Data source** | Vercel Web Analytics and Vercel Speed Insights are possible provider datasets, separate from Vercel deployment/hosting logs. |
| **Available now** | **Not available in the audited application.** No `@vercel/analytics`/`@vercel/speed-insights` dependency or live collection script was found. Current dashboard state could not be re-queried because the Vercel CLI is unavailable in this shell. |
| **Access method** | If later enabled: Vercel project dashboard and supported export/API capability. Hosting/deployment access alone is not analytics access. |
| **Authentication** | Authorized Vercel project/team account. No reporting credential/session was used in this audit. |
| **Plan limitation** | Vercel documents plan-dependent event quotas, reporting windows and paid enhancements. Exact current project plan/entitlement was not freshly verified. |
| **Data granularity** | Potential Web Analytics visitor/page/referrer/custom event aggregates and Speed Insights Web Vital datapoints. No project rows are currently available. |
| **Data delay** | **Not applicable while disabled.** If enabled, provider processing/sampling/retention rules apply. |
| **Historical coverage** | None proved for this project; collection cannot be assumed retroactive. |
| **Reliable join key** | Canonical route/date aggregate if enabled. Vercel visitor hashes must not be used to create a cross-provider identity. |
| **PII exposure** | Provider describes privacy-oriented analytics, but route/URL and custom-event fields still require redaction. Never send email, transaction details or visa/itinerary answers. |
| **Source of truth** | None for Phase 4B. If enabled later, Speed Insights could be source for Vercel-reported field performance, not conversions/revenue. |
| **Phase 4B use** | Exclude from the initial dashboard to avoid a duplicate analytics SDK and denominator. Continue current performance audits separately. |
| **Future integration** | Revisit only if GA4 cannot answer an approved need or independent field-performance monitoring is required; document cost, retention, environment filters and consent behavior first. |
| **Blocker** | Collection is not installed/observed; current dashboard enablement and plan are unverified; adding it now would duplicate analytics without a demonstrated Phase 4B need. |

### 3.9 Existing application events

| Required field | Audited value |
| --- | --- |
| **Data source** | `lib/analytics.ts` and component/page trigger sites for Landing, Hub, Newsletter, checklist, paid-Guide, affiliate, Visa and other interactions. |
| **Available now** | **Available now; partially reliable.** Client events can be emitted in Production, but the global producer accepts arbitrary names/parameters and current aliases can double-count. |
| **Access method** | Browser event producer to GA4/dataLayer; code inventory in the repository. Some page-specific helpers already add local allowlists, but there is no single global contract. |
| **Authentication** | No client authentication; collection depends on the configured public analytics loader. Reporting authentication is the GA4 requirement described above. |
| **Plan limitation** | No application plan dependency. Downstream GA4 dimension/cardinality limits and browser blocking apply. |
| **Data granularity** | One client interaction/event. There is no global `event_id`, session-scoped dedupe key or server-confirmed outcome contract. |
| **Data delay** | Emission is immediate but lossy; report availability is delayed by the destination. Ad blockers, navigation and script failure can drop events. |
| **Historical coverage** | Legacy events may exist in GA4, but exact range/counts are unverified. Renamed aliases are not automatically comparable to future canonical events. |
| **Reliable join key** | Future canonical event name + approved Landing/campaign tuple + session context; add a scoped dedupe token for state-changing events. Current alias names and full URLs are not reliable joins. |
| **PII exposure** | Current generic API can accept arbitrary values; some events/page views include full URLs and raw stored UTMs. Introduce an allowlist that rejects email, free text, social IDs, customer IDs, nationality, passport/route/port answers and query strings. |
| **Source of truth** | Observable browser engagement and Tier 3 intent after canonicalization. Client success alone is not source of truth for saved lead, delivered checklist, order, refund, revenue or commission. |
| **Phase 4B use** | Migrate to the canonical event taxonomy, one action/one name, derived KPIs where possible, Production-only collection and explicit consent behavior. |
| **Future integration** | Central event registry, parameter dictionary, sanitizer, environment/consent gate, dedupe rule, server event/result bridge for approved lead states, schema tests and data-quality reporting. |
| **Blocker** | Duplicate aliases, unrestricted parameters, no global consent/dedupe/environment contract, and no verified provider outcomes. |

Implementation observations that affect reliability:

- The global `AttributionCapture` writes campaign context to `sessionStorage`
  before an explicit consent choice and currently stores only source, medium,
  campaign and content.
- There is no `utm_term`, `utm_id`, first-known/latest distinction or internal
  campaign registry.
- A new inbound UTM tuple overwrites the stored tuple rather than applying a
  documented attribution policy.
- Newsletter client success follows HTTP `ok`, not the provider delivery state.
- Payhip and affiliate click handlers can emit canonical-looking events plus
  aliases for the same physical click.

### 3.10 Existing reports and exports

| Required field | Audited value |
| --- | --- |
| **Data source** | Repository CSVs and documents, notably the `china-first-trip-launch` UTM-link registry, blank weekly report template, release reports, GA4 review notes and technical audit JSON files. |
| **Available now** | **Partially available; static/manual.** Campaign link rows and templates exist. No filled historical funnel/commerce export was found. |
| **Access method** | Version-controlled repository files. Future reviewed provider exports should be stored privately unless proven safe for the repository. |
| **Authentication** | Repository access. This does not grant GA4, Brevo, Payhip, affiliate, GSC or Vercel reporting access. |
| **Plan limitation** | None for local files. Provider export availability may be plan-dependent and remains source-specific. |
| **Data granularity** | Link-level URL/UTM QA rows; blank weekly-report columns; release-level verification evidence; image/performance technical audits. |
| **Data delay** | Manual and static; freshness depends on operator update and commit time. Not suitable for live reporting. |
| **Historical coverage** | Campaign setup evidence exists, but performance columns are blank. No normalized historical GA4 sessions, Payhip orders/refunds/revenue or affiliate outcomes were found. |
| **Reliable join key** | Existing `utm_content` is a candidate content key, but old links use broad `utm_medium=social`/`video` and no `utm_id`. A private campaign/publish registry is required before dependable cross-source joins. |
| **PII exposure** | No subscriber/customer values should be committed. Repository artifacts must remain aggregate/non-PII and must not contain secret tokens or private provider IDs. |
| **Source of truth** | Source of truth only for the versioned URL/naming plan and release QA at the recorded date. Not source of truth for performance, conversions or revenue. |
| **Phase 4B use** | Seed naming migration, URL validation and legacy-label mapping. Mark all blank performance/outcome fields unavailable, not zero. |
| **Future integration** | Replace ad hoc files with a private Campaign Registry and controlled reviewed import process; retain public docs only for taxonomy/examples. |
| **Blocker** | No populated results; legacy medium taxonomy; missing internal/publish IDs; release reports are point-in-time evidence rather than ongoing growth datasets. |

## 4. Cross-source join contract

No safe row-level user join currently exists or is needed. Phase 4B permits one
non-person publication-level join for new managed links; Newsletter and provider
outcomes remain aggregate or separately reconciled until an approved stable,
non-PII provider key exists.

| Join purpose | Minimum fields | Reliability | Rule |
| --- | --- | --- | --- |
| Social publication → campaign registry | Private `metricoolPostId` or validated native post ID → one registry `publishId` | Candidate until provider-ID stability and one-to-one uniqueness are verified | `publishId` is public-safe; Metricool/native identifiers remain private; never infer from caption/source/time |
| Campaign registry → GA4 | Exact registry `publishId` = public `utm_id` = GA4 Campaign ID; source/medium/campaign/content/Landing validate the tuple | Publication-level for new managed links after registry validation | Missing/duplicate IDs are invalid or legacy; do not fabricate them |
| GA4 → Newsletter aggregate | Date/timezone, Landing, normalized campaign tuple, approved server completion label | Reconciliation only | Never join on email/contact ID |
| GA4 → Payhip aggregate | Campaign tuple plus provider order attribution where available | Currently unavailable for outcomes | Click does not create an order join |
| GA4 → affiliate aggregate | Campaign/sub-ID preserved by provider | Currently unavailable for outcomes | Provider conversion ID deduplicates outcomes |
| GSC → GA4 | Canonical Landing path + date | Aggregate directional comparison | Do not expect Search Console clicks to equal GA4 sessions |

The frozen Campaign Naming Standard defines the proposed private registry
record. The minimum contract, including private lineage needed for deterministic
repost/correction reconstruction, is:

```text
campaignId
publishId
publicationKind
parentPublishId
supersedesPublishId
landing
source
medium
content
term
metricoolPostId (private)
status
scheduledAt
publishedAt
publicPostUrl
operatorNotes (private, optional)
```

Only `publishId` may appear publicly as `utm_id`. Do not store captions, account
handles, subscriber details, order-customer data or visa/travel answers in the
registry, and never ship live private registry records in a browser bundle or
public source artifact.

## 5. Source-of-truth hierarchy

| Business question | Primary source | Reconciliation source | Never substitute |
| --- | --- | --- | --- |
| Landing sessions and website funnel | GA4 after canonical cleanup | Production smoke/QA evidence | Metricool Website page views |
| Social publishing status | Metricool Planner/native platform | Private Campaign Registry | GA4 page views |
| Social reach/engagement | Metricool network-specific field | Native platform UI | A universal invented metric |
| Newsletter address saved | Newsletter server/Supabase result after semantics are approved | Brevo contact sync aggregate | Client `ok` event alone |
| Welcome message delivered/opened/clicked | Brevo provider report after access is verified | Reviewed provider export | Supabase save or browser success |
| Checklist delivered | Future explicit application delivery state | Server delivery log if implemented | CTA click or thank-you view |
| Paid-Guide intent | Canonical website click | GA4 campaign aggregate | Payhip order |
| Payhip order/refund/revenue | Future provider webhook/export | Reviewed provider reconciliation | Checkout click or success-page view |
| Affiliate intent | Canonical website click | GA4 campaign aggregate | Affiliate conversion |
| Affiliate conversion/commission | Provider report/API/export | Reviewed private import | Affiliate click count |
| Organic search discovery | Search Console after property access | GA4 organic Landing sessions | SEO tool estimates |
| Field performance | Existing performance tests; optional Speed Insights later | Production QA | Conversion rate |

## 6. Dashboard decision

The recommended first implementation is **Hybrid-light**:

```text
GA4 Explorations + Looker Studio
  for website sessions and canonical Tier 1–3 events

Metricool separate social-performance view
  through the connected source or official connector if entitlement is verified

Private Campaign Registry
  for campaign/content/publish mapping without captions or account identifiers

Verified outcome layer later
  only through controlled, no-PII provider webhook/export imports
```

Why this boundary is appropriate:

- It answers current traffic, Landing, lead-intent and social questions without
  building a custom analytics product.
- It does not mislabel absent provider data as conversion or revenue.
- It avoids a new public dashboard/database before a verified commerce feed
  exists.
- It can add Payhip, Affiliate and Brevo aggregates later without changing the
  canonical event contract.

Every unconnected Tier 4 field must render:

```text
Unavailable — integration not verified
```

It must never render `0`, an inferred sale, click-based revenue or an estimate.

## 7. Immediate blockers and decisions

1. **GA4 access:** verify property/Admin/reporting access, retention, custom
   definitions, reporting identity, internal traffic and unwanted referrals.
2. **Consent:** decide whether GA4/Metricool/attribution/experiment storage waits
   for consent and align Privacy Policy/cookie controls. This is a technical
   recommendation, not legal advice.
3. **Event quality:** approve one canonical event per action, a global parameter
   allowlist, URL redaction, Production exclusion and dedupe rules.
4. **Metricool limits:** resolve the observed Planner account-limit state and
   verify whether the current account includes API/Looker access.
5. **Campaign joins:** migrate legacy `social`/`video` media to the controlled
   taxonomy and create a private publish registry; do not expose provider IDs in
   public docs.
6. **Newsletter truth:** approve whether completion means Supabase saved, Brevo
   accepted or another explicit state; confirm retention and aggregate report
   access.
7. **Payhip truth:** approve webhook versus reviewed export, then validate
   authenticity, idempotency, product/currency fields and refund reconciliation.
8. **Affiliate truth:** confirm each program's active status, reporting access,
   attribution window, conversion ID, commission statuses and payout currency.
9. **Search Console:** verify the exact Production domain property and access.
10. **Vercel analytics:** leave disabled for the first implementation unless a
    unique approved need and current entitlement are established.

## 8. Official capability references

These links establish provider capability/limitations only; they do not prove
that this project has access.

- [GA4 reporting identity and data differences](https://support.google.com/analytics/answer/13644080?hl=en)
- [GA4 BigQuery Export](https://support.google.com/analytics/answer/9823238?hl=en-EN)
- [GA4 data freshness](https://support.google.com/analytics/answer/9317657?hl=en)
- [Metricool Looker Studio access token and plan availability](https://help.metricool.com/what-is-looker-studio-and-where-to-find-the-api-key-token-tx5lj)
- [Metricool Looker Studio FAQ](https://help.metricool.com/looker-studio-frequently-asked-questions-and-common-errors-8db39)
- [Brevo Contacts API](https://developers.brevo.com/reference/get-contacts)
- [Brevo email campaign report](https://developers.brevo.com/reference/get-email-campaign)
- [Payhip webhooks](https://help.payhip.com/article/115-webhooks)
- [Search Console Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Search Console API usage limits](https://developers.google.com/webmaster-tools/limits)
- [Vercel Web Analytics](https://vercel.com/docs/analytics)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)

## 9. Audit conclusion

The project can measure website engagement and commercial intent after event and
UTM cleanup, and it can use Metricool for social publishing/performance. It
cannot yet report provider-verified Newsletter delivery, Payhip checkout/order/
refund/revenue, affiliate conversion/commission, Search Console performance or
Vercel native analytics from an approved connected dataset.

Phase 4B should therefore proceed with **Hybrid-light**, while leaving verified
commercial outcomes explicitly unavailable until their provider source is
connected, privacy-reviewed and reconciled.
