# V3 Phase 4B — Current Event Inventory

Status: architecture audit only; no runtime implementation is claimed

Audited branch / HEAD: `feat/v3-phase4b-growth-platform-architecture` / `9854a02154f6aa7246ac1ab2f454e6d8b4f3d0c1`

Accepted application baseline beneath the architecture-only commits: `66ed82edcf3eca9a39a1f7b6894572394f75a019`

Audit date: 2026-07-20 (Asia/Shanghai)

Production property: `https://www.firstchinatripkit.com`

## 1. Purpose, method and reading rules

This inventory records the events the application can emit **today**, based on
the real call sites, helpers and provider flow in the repository. It does not
treat a click as a sale, a public thank-you page as an order, a browser success
event as email delivery, or an affiliate click as commission.

Every event record below includes:

1. event name;
2. file and trigger;
3. business meaning;
4. current parameters;
5. current source of truth;
6. funnel tier;
7. deduplication behavior;
8. Production-only behavior;
9. PII/query risk;
10. keep, rename or retire decision; and
11. canonical replacement.

The four funnel tiers are:

- **Engagement** — a page, CTA, Guide or tool interaction;
- **Lead** — an application-confirmed Newsletter submission or a genuinely
  successful resource delivery;
- **Intent** — a click toward a paid Guide, support product or affiliate;
- **Verified** — a provider-confirmed order, refund, approved affiliate
  conversion, commission or revenue.

There is no current Tier 4 event source.

### 1.1 Table shorthand

- **Client** means a browser action observed by the site's JavaScript. It is not
  independent proof that the destination, download or provider action succeeded.
- **API-gated client** means the browser emits only after the Newsletter API
  returns success. The API response is the success gate; the analytics event is
  still sent from the client.
- **Sink-only Production gate** means the event producer itself has no host or
  environment guard. The repository loads the real GA4 destination only when
  `VERCEL_ENV=production`; Metricool is also loaded only in Production but has
  no custom-event bridge. Local and Preview normally have no live GA4/Metricool
  sink, yet the producer can still log or push to an injected `dataLayer`.
- **Campaign envelope (future)** means `traffic_source`, `traffic_medium`, plus
  valid `campaign_name`, `content_group`, **`publish_id`**, and optional
  `campaign_term`. For a managed publication, `publish_id` is required and comes
  from `utm_id`. This envelope is a Phase 4B target contract, **not current
  behavior**. Current code does not read, store or submit `utm_id`.

## 2. Shared infrastructure findings

| Area | Real implementation | Current Production behavior | Audit conclusion |
| --- | --- | --- | --- |
| Generic dispatcher | `lib/analytics.ts:12-26` | Calls `window.gtag`; otherwise pushes to an existing `dataLayer`; optional debug log | Arbitrary event names and parameters are accepted. There is no global allowlist, consent check, Production-host check, event ID or dedupe. |
| GA4 loader | `components/GoogleAnalytics.tsx:3-29` | Renders only when a GA ID exists and `VERCEL_ENV=production` | Loader is Production-only, but there is **no consent gate**. `gtag('config')` can create the initial page view before consent. |
| SPA page view | `components/GoogleAnalyticsPageView.tsx:7-24` | Emits on pathname changes | Sends full `window.location.href`; query data can enter analytics. GA account-side history tracking must be checked for duplicates. |
| Metricool loader | `components/MetricoolAnalytics.tsx:6-38` | Renders only in Vercel Production | No consent gate and no mapping from the site's custom events to Metricool events. It is an independent tracker, not a second current event destination. |
| Global mount | `app/layout.tsx:56-69` | Attribution capture, GA4 and Metricool mount globally | One integration point exists, but storage and trackers begin without an explicit consent decision. |
| Landing sanitizer | `lib/landing/analytics.ts:6-145` | Four allowlisted fields and a closed event union | Good local pattern, but attribution reads the active URL only and ignores stored session attribution. |
| Visa sanitizer | `lib/visa/analytics.ts:6-170` | Four allowlisted non-sensitive fields | Strong privacy pattern, but aliases double- or triple-send the same user action. |
| UTM capture | `lib/utm.ts:1-80`, `components/AttributionCapture.tsx:6-11` | Writes a four-field object to `sessionStorage` | Supports only `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. There is no `utm_term`, `utm_id`, `publish_id`, timestamp, TTL, first/latest split or consent gate. |
| Newsletter API | `app/api/newsletter/route.ts:4-92` | Can execute in any deployed environment with provider configuration | Accepts the same four UTM fields only. It has no `utm_id`/`publish_id` field and sends no analytics event from the server. |
| Generic tracked links | `components/TrackedLink.tsx:29-34` | Producer ungated; GA sink Production-only | Adds complete `destination_url`, raw stored four-field UTMs and arbitrary caller parameters. |
| Product links | `components/ProductActionButton.tsx:38-75` | Producer ungated; GA sink Production-only | Adds a complete Payhip destination URL, raw stored inbound UTMs and caller fields; can loop over two event names for one click. |
| Affiliate links | `components/AffiliateLink.tsx:51-89` | Producer ungated; GA sink Production-only | Adds complete current-page and destination URLs; Klook sends two differently shaped events for one click. |

## 3. Page, Homepage and Landing events

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `page_view` | `components/GoogleAnalyticsPageView.tsx:7-24`; client-side pathname change | SPA route view | `page_location` = full browser URL, `page_path`, `page_title` | Client navigation; initial page view is also implicit in GA config | Engagement | Previous-path ref suppresses an identical consecutive pathname; no cross-loader/account dedupe | Sink-only Production gate | **High**: full location can include query, tokens or raw UTM | Keep infrastructure event; sanitize | Sanitized `page_view` with canonical host + pathname only and future campaign envelope including `publish_id`; one initial/SPA view |
| `hero_primary_cta_clicked` | `app/page.tsx:258-269`; Homepage Hero CTA | Start Here intent from Hero | `destination_url`, raw four UTMs, `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium: arbitrary stored UTM; destination field is unnecessary | Keep as non-growth product analytics or map only when it is a declared Landing CTA | No automatic growth replacement; registered product event with allowlisted categorical fields |
| `homepage_task_clicked` | `app/page.tsx:270-281,324-333`; Hero secondary CTA and task cards | Homepage task selection | `destination_url`, raw four UTMs, `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep product analytics; exclude from Landing KPI unless route is an approved Landing | Registered task event; future campaign envelope including `publish_id` if retained |
| `homepage_popular_content_clicked` | `app/page.tsx:357-365`; popular-content card click | Guide/content interest | Same generic URL/raw-UTM fields + `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep outside canonical growth funnel | Registered content event; no funnel replacement |
| `homepage_trending_clicked` | `app/page.tsx:399-405`; city card click | Destination interest | Same generic fields + `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep outside canonical growth funnel | Registered content event; no funnel replacement |
| `homepage_before_fly_clicked` | `app/page.tsx:461-468`; preparation module link | Pre-flight module interest | Same generic fields + `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep outside canonical growth funnel | Registered product event; no funnel replacement |
| `homepage_experience_clicked` | `app/page.tsx:486-493`; experience card click | Experience interest | Same generic fields + `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep outside canonical growth funnel | Registered content event; no funnel replacement |
| `homepage_product_preview_clicked` | `app/page.tsx:509-516,582-591`; product visual or preview CTA | Paid Guide preview interest | Same generic fields + `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep as product-preview engagement | Registered `guide_preview_opened`-style event; not `paid_guide_clicked` until outbound checkout activation |
| `landing_view` | `components/landing/LandingAnalytics.tsx:13-21`; Landing component mount | Approved Landing visibly mounted | `landing_name`, current-URL-only `traffic_source`, `interaction_type=view` | Client render | Engagement | Ref once per component mount/landing name; remount and new lifecycle can repeat | Sink-only Production gate | Low: Landing sanitizer allowlists categorical values | **Keep and migrate** | `landing_view` + future campaign envelope including `publish_id`; source from consented session context; KPI deduped by session |
| `landing_hub_clicked` | `components/landing/LandingTrackedLink.tsx:30-46` with mappings in `data/landings.ts`; Hero, Hub preview, content or footer | A Landing link was activated, often toward its Hub | `landing_name`, current-URL-only `traffic_source`, `cta_name`, `interaction_type` | Client click | Engagement | None | Sink-only Production gate | Low | **Rename by declared CTA role**; do not count together with canonical alias | `landing_primary_cta_clicked` or `landing_secondary_cta_clicked` + future campaign envelope including `publish_id` |
| `landing_cta_clicked` | Same shared link; checklist anchor, Start Here, Guide and related links | Generic Landing CTA activation | Same four allowlisted Landing fields | Client click | Engagement | None | Sink-only Production gate | Low | **Rename by declared CTA role** | `landing_primary_cta_clicked` or `landing_secondary_cta_clicked` + future campaign envelope including `publish_id` |
| `landing_newsletter_signup` | `components/NewsletterForm.tsx:92-98`; successful API response on a Landing form | Application accepted/saved a Landing Newsletter submission | `landing_name`, current-URL-only `traffic_source`, `cta_name=submit_checklist_signup`, `interaction_type=success` | API-gated client; server/provider detail is not emitted | Lead (application-success proxy) | No analytics idempotency; one event per successful response | Sink-only Production gate; API can run outside Production | Low in event; it is disconnected from stored attribution | **Rename**; do not interpret as email delivery | `newsletter_completed` + future campaign envelope including `publish_id`; server-approved success gate, no email/provider status in GA |
| `landing_checklist_download` | Declared only in `lib/landing/analytics.ts:9`; no emitter found | Intended Landing checklist download | No live parameters | No current source | None | N/A | N/A | Low | **Retire declaration after compatibility review**; never backfill | `checklist_delivery_completed` only after a genuine defined delivery state; future envelope includes `publish_id` |

Landing attribution currently calls `resolveLandingTrafficSource(window.location.search)`.
It does **not** read `fctk_utm_attribution`. A user who enters through a tagged
Homepage and navigates internally to a Landing is therefore recorded as
`direct` by Landing events even though a four-field sessionStorage record exists.

## 4. Newsletter, contact and Checklist events

### 4.1 Current Newsletter truth boundary

```text
Form submit
→ four raw UTM fields copied from sessionStorage
→ POST /api/newsletter
→ Supabase and/or Brevo service attempt
→ HTTP success
→ one of two browser success aliases
→ public /thank-you route
```

`lib/services/newsletter.ts` can return success after Supabase accepts the email
even when Brevo delivery is unavailable or not configured. The API exposes
`provider` and `delivery_status` in its response, but the client does not use
those values. The current event therefore means **application-side accepted or
saved**, not **welcome email delivered**. There is no `newsletter_started` event.

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `newsletter_subscribed` | `components/NewsletterForm.tsx:99-106`; successful non-Landing API response | Application accepted/saved a Newsletter submission | `source_page`, `placement`, `lead_magnet`, raw `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | API-gated client | Lead (application-success proxy) | No analytics idempotency; repeat successful requests can repeat | Sink-only Production gate; API can run in Preview if configured | **Medium**: raw operator/user-supplied UTM values can carry unapproved text; email is correctly absent | **Rename** and merge with Landing alias | `newsletter_completed` + future campaign envelope including `publish_id`; provider delivery remains an operational status, not this GA event |
| `contact_form_started` | `components/ContactForm.tsx:28-39`; first form focus | Contact form engagement | `source_page=/contact`, `placement` | Client focus | Engagement | Once per component mount via ref | Sink-only Production gate | Low; no form value is emitted | Keep outside growth funnel | Registered contact event; no funnel replacement |
| `contact_form_submitted` | `components/ContactForm.tsx:82-93`; Contact API returns success | Application accepted a contact request | `source_page`, `placement`, `preferred_reply_method`, `interested_in_custom_itinerary` | API-gated client | Lead, but outside locked growth Newsletter/Checklist KPI | No analytics idempotency | Sink-only Production gate; API may run elsewhere | Low-to-medium categorical profile signal; no email/question is emitted | Keep operational, with explicit schema and retention review | Registered contact success event; no growth replacement |
| `whatsapp_contact_clicked` | `components/WhatsAppLink.tsx:35-42`; enabled WhatsApp link click | Outbound contact intent | `source_page`, `placement` | Client click | Engagement | None | Sink-only Production gate | Low | Keep operational, not a commercial outcome | Registered contact-intent event |
| `checklist_opened` | `components/Header.tsx:79-109`; desktop/mobile Header CTA | User opened the Checklist acquisition flow | `destination_url`, raw four UTMs, `item_name`, `section` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep as entry engagement; never call delivery | Registered checklist-entry event + future campaign envelope including `publish_id` |
| `checklist_download_clicked` | `components/ChecklistDownloadWithTip.tsx:57-64` actual PDF click; `components/GuideTemplate.tsx:422-433` merely opens `/thank-you`; Store can also use it through `ProductActionButton` | Mixed: file activation, thank-you navigation or Store acquisition click | Shape A: `source_page`, `placement`; shape B: complete destination, raw four UTMs, `guide_slug`; shape C: product/destination/raw UTM fields | Client click | Engagement | None | Sink-only Production gate | Medium-high because some call sites add raw UTM/full destination | **Split/rename**; preserve as legacy only during migration | Entry clicks stay engagement; only a real successful state becomes `checklist_delivery_completed` + future campaign envelope including `publish_id` |
| `payhip_checklist_clicked` | `components/PayhipChecklistLink.tsx:28-45` and Store `ProductActionButton`; outbound Payhip Checklist CTA | User clicked toward a free/pay-what-you-want Payhip Checklist | Link component: `source_page`, `placement`, `product`; Product button also sends full destination, product ID/name and raw four UTMs | Client click | Intent (support/download destination), **not delivery or revenue** | None | Sink-only Production gate | Medium-high: parameter shapes differ; Product button includes full Payhip URL/raw UTMs | Keep as intent only or fold into a typed resource-outbound event | Never map to `checklist_delivery_completed`; future envelope including `publish_id` if retained |
| `checklist_share_clicked` | `components/ChecklistShareCard.tsx:53-60,138-145`; native share succeeds or WhatsApp link click | Share intent/action from thank-you page | `source=thank-you`, optional `shared_image` or `channel=whatsapp` | Client API/click | Engagement | None | Sink-only Production gate | Low | Keep outside funnel under one typed share schema | Registered share event; no growth replacement |
| `checklist_share_image_downloaded` | `components/ChecklistShareCard.tsx:114-118`; share-card file click | Share asset download click | `source=thank-you` | Client click | Engagement | None | Sink-only Production gate | Low | Keep outside funnel | Registered share event |
| `checklist_share_link_copied` | `components/ChecklistShareCard.tsx:19-25`; clipboard write succeeds | Share URL copied | `source=thank-you` | Successful client clipboard call | Engagement | None | Sink-only Production gate | Low | Keep outside funnel | Registered share event |
| `coffee_tip_popup_shown` | `components/ChecklistDownloadWithTip.tsx:65-71`; delayed popup after Checklist click | Support prompt displayed | `source` | Client timer/render | Engagement | LocalStorage suppresses for seven days when available; fallback can repeat | Sink-only Production gate | Low | Keep product analytics, not revenue | Registered support-prompt event |
| `coffee_tip_popup_closed` | `components/ChecklistDownloadWithTip.tsx:73-78`; popup close | Support prompt dismissed | `source` | Client click | Engagement | None | Sink-only Production gate | Low | Keep product analytics | Registered support-prompt event |
| `coffee_tip_clicked` | `components/CoffeeTipLink.tsx:38-40`; external support link click | Support/payment intent | `source` | Client click | Intent, not revenue | None | Sink-only Production gate | Low event payload; destination itself has controlled outbound UTM | Keep intent-only with destination type | Typed support-intent event + future campaign envelope including `publish_id`; never verified revenue |
| `essential_apps_checklist_completed` | `components/ToolKitWidget.tsx:635-650`; old Apps tool reaches threshold | On-page Apps readiness tool completion | `source_page`, `tool`, `ready_count`, `total_count`, controlled `result` | Client localStorage-backed tool state | Engagement | Once per component mount via ref; restored state can trigger on a later mount | Sink-only Production gate | Low; result is controlled copy | Keep product analytics, not Checklist acquisition | Registered tool-completed event; no `checklist_delivery_completed` mapping |

Untracked gaps matter as much as aliases: `components/ChecklistCTA.tsx` links
directly to `/thank-you` without an event, the Payment Hub reveals a PDF link
without a delivery event, and `/thank-you` is publicly addressable. A page view
or link click cannot safely be backfilled as delivery.

## 5. Payment & Apps Hub events

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `payment_hub_view` | `components/PaymentHubInteractive.tsx:73-79`; Hub interactive component mounts | Payment Hub rendered | `source_page=/payments-and-apps` | Client render | Engagement | Effect per mount; no session dedupe | Sink-only Production gate | Low | Keep product analytics; Landing progression should be derived | `hub_view_from_landing` is reporting-derived from Landing session + sanitized page view; no new click/view alias; future envelope includes `publish_id` in the source events |
| `payment_step_clicked` | `app/payments-and-apps/page.tsx:328-345,413-431`; Hero/Quick Start links | Payment setup step chosen | Complete `destination_url`, raw four UTMs, `step`, `placement` | Client click | Engagement | None | Sink-only Production gate | Medium-high | Keep under a closed Hub schema; remove raw URLs/UTMs | Registered Hub-step event + future campaign envelope including `publish_id` |
| `payment_readiness_started` | `components/PaymentHubInteractive.tsx:104-110`; first checker toggle | Readiness checker started | `source_page` | Client action | Engagement | Once per component mount via ref; reset only by remount | Sink-only Production gate | Low | Keep product analytics | Registered tool-started event |
| `payment_readiness_completed` | `components/PaymentHubInteractive.tsx:118-126`; every Check button activation | User requested readiness result | `source_page`, `score`, `missing_count` | Client action/local state | Engagement | None; repeated clicks repeat | Sink-only Production gate | Low, but numeric contract is not globally registered | Keep after defining completion and dedupe | Registered tool-completed event; not Lead or Verified |
| `offline_backup_opened` | `components/PaymentHubInteractive.tsx:350-363`; scenario accordion opens | Backup scenario consulted | `source_page`, controlled `scenario` label | Client click | Engagement | Once per scenario per component mount via Set | Sink-only Production gate | Low | Keep product analytics | Registered scenario-open event |
| `interactive_checklist_started` | `components/PaymentHubInteractive.tsx:454-460`; first Hub checklist toggle | On-page setup checklist started | `source_page` | Client action | Engagement | Once per mount until explicit reset | Sink-only Production gate | Low | Keep tool event | Registered checklist-tool start; not Newsletter or file acquisition |
| `interactive_checklist_completed` | `components/PaymentHubInteractive.tsx:463-471`; all Hub items checked | On-page setup checklist reaches 100% | `source_page`, `item_count` | Client/localStorage state | Engagement | Completion ref prevents immediate duplicate, but unchecking or reset re-enables | Sink-only Production gate | Low | Keep as tool completion; do not promote to Lead | Registered checklist-tool completed; never `checklist_delivery_completed` |
| `guide_preview_opened` | `components/PaymentHubInteractive.tsx:562-572`; Guide preview opens | Product preview interest | `source_page`, `product_id` | Client click/render state | Engagement | Once per component mount via ref | Sink-only Production gate | Low | Keep as preview event | Registered product-preview event; future campaign envelope including `publish_id` if used in campaign analysis |
| `guide_purchase_options_clicked` | `app/payments-and-apps/page.tsx:649-657`; internal Store fallback when checkout URL is unavailable | User opens purchase information, not checkout | Complete destination, raw four UTMs, `source_page`, `product_id` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep as fallback engagement; never paid intent | Registered purchase-options event; not `paid_guide_clicked` |

## 6. Paid Guide, Store and Payhip events

`ProductActionButton` creates a controlled outbound Payhip UTM URL for provider
reporting and also copies the visitor's raw stored inbound four-field UTM values
into the GA event. These are two different contexts. Neither proves checkout
reached, order paid, refund status or revenue.

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `payment_apps_guide_buy_clicked` | `components/ProductActionButton.tsx:38-75`; Store default and shared Payhip CTA; also co-emitted on Homepage, Hub and Guides | Outbound $7 Guide checkout intent | `source_page`, complete `destination_url`, `placement`, `product_id`, `product`, `price="7"`, raw four UTMs, caller fields | Client click | Intent | None; often one of two events in the same loop | Sink-only Production gate | **High**: complete destination query plus raw UTM text; price is not revenue | **Rename/consolidate** | `paid_guide_clicked` + `product_id`, `destination_type=payhip`, future campaign envelope including **`publish_id`**; one event per activation |
| `payment_guide_buy_clicked` | `app/page.tsx:594-606`; same Homepage Payhip activation as previous row | Homepage alias for paid Guide intent | Same Product button fields + Homepage `item_name`, `section` | Client click | Intent | **Double-sent** with `payment_apps_guide_buy_clicked` | Sink-only Production gate | High | **Rename and retire alias after one compatibility release** | `paid_guide_clicked` + future campaign envelope including `publish_id` |
| `guide_buy_clicked` | `app/payments-and-apps/page.tsx:637-647`; same Hub Payhip activation | Hub alias for paid Guide intent | Same Product button fields + `hub` | Client click | Intent | **Double-sent** with `payment_apps_guide_buy_clicked` | Sink-only Production gate | High | **Rename and retire alias after compatibility window** | `paid_guide_clicked` + future campaign envelope including `publish_id` |
| `guide_paid_cta_clicked` | `components/GuideTemplate.tsx:352-368`; same Guide-bottom Payhip activation | Guide alias for paid Guide intent | Same Product button fields + `guide_slug` | Client click | Intent | **Double-sent** with `payment_apps_guide_buy_clicked` | Sink-only Production gate | High | **Rename and retire alias after compatibility window** | `paid_guide_clicked` + future campaign envelope including `publish_id` |
| `store_inside_guide_clicked` | `components/GuideTemplate.tsx:369-382`; internal Store preview link | Product-detail interest | Complete destination, raw four UTMs, `source_page`, `guide_slug`, `placement` | Client click | Engagement | None | Sink-only Production gate | Medium | Keep as preview/navigation event | Registered product-detail event; not paid intent |
| `guide_contact_clicked` | `components/GuideTemplate.tsx:401-409`; Guide-to-Contact link | Support/contact interest | Complete destination (including `?source=`), raw four UTMs, `guide_slug` | Client click | Engagement | None | Sink-only Production gate | **High**: destination query is emitted; future query values could expose data | Keep with sanitized destination type/path | Registered contact-intent event without query/full URL |
| `product_success_page_viewed` | `components/ProductSuccessPageView.tsx:6-11`; public product success route mount | Browser viewed a thank-you/success page | `product_id` | Client route render only; no order token or provider confirmation | Engagement (unverified proxy), **not Verified** | Effect per mount; refresh/remount repeats | Sink-only Production gate | Low payload, high semantic overclaim risk | **Retire from purchase/revenue KPIs**; optionally rename as page engagement | No Tier 4 replacement until Payhip order/refund source is connected and idempotent |
| `store_waitlist_clicked` | Literal fallback in `components/ProductActionButton.tsx:38-42` and `GuideTemplate.tsx:354-362`; component returns `null` when `canBuy=false` | Intended unavailable-product waitlist click | No live payload established | No live trigger established | None | N/A | N/A | Low | **Retire dead path after compatibility/code review** | No canonical replacement unless a real waitlist flow is built |

There is no Payhip webhook, order import, provider transaction lookup, refund
feed or verified revenue event in the application. `paid_guide_clicked` remains
Tier 3 even after migration. A future Tier 4 contract must be provider-backed
and idempotent; it must not be inferred from `product_success_page_viewed`.

## 7. Affiliate events

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `affiliate_click` | `components/AffiliateLink.tsx:51-75`; enabled external affiliate CTA | Outbound affiliate intent | `affiliate_partner`, `affiliate_category`, `affiliate_campaign`, `link_label`, `link_position`, full `page_location`, `page_path`, `source_page`, full `destination_url` | Client click | Intent | None | Sink-only Production gate | **High**: current page query and affiliate destination/token can enter GA | **Rename/consolidate** | `affiliate_link_clicked` + `partner_name`, `destination_type=affiliate`, future campaign envelope including **`publish_id`**; no full URL/token |
| `affiliate_klook_clicked` | `components/AffiliateLink.tsx:75-85`; same Klook activation | Klook-specific alias of affiliate intent | `partner`, `source_page`, `placement`, full `destination`, `offer_type`, `offer_name` | Client click | Intent | **Double-sent** with `affiliate_click` for Klook | Sink-only Production gate | **High**: full affiliate destination/token | **Rename and retire alias after compatibility window** | Same single `affiliate_link_clicked` + future campaign envelope including `publish_id` |

Affiliate link rendering fails closed when no valid configured URL exists, which
is correct. There is no network-recorded conversion, approved commission or paid
commission source connected to the site. Neither current event is revenue.

## 8. Visa Hub and standalone tool events

Visa Hub events use the local sanitizer, which permits only
`result_category`, `step_number`, `interaction_type` and `policy_version`.
Nationality, passport type, dates, route, port and free text are not emitted.

| Event | File / trigger | Business meaning | Current parameters | Source of truth | Tier | Dedupe | Production-only? | PII / query risk | Decision | Canonical replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `visa_hub_view` | `components/visa/VisaHubAnalytics.tsx:7-17`; Hub mount | Visa Hub rendered | `interaction_type=open`, `policy_version` | Client render | Engagement | Once per mount via ref | Sink-only Production gate | Low | Keep product analytics; Landing progression is derived separately | Registered Hub view; future campaign envelope including `publish_id` if retained |
| `visa_policy_option_selected` | `components/visa/VisaPolicyChoiceLink.tsx:40-54`; policy card selection | User chose a policy context | `interaction_type=select`, `policy_version`; selected context is intentionally absent | Client click | Engagement | None | Sink-only Production gate | Low | Keep if aggregate interaction is useful | Registered Visa event; no sensitive context parameter |
| `visa_checker_started` | `components/visa/TransitEligibilityChecker.tsx:358-367,413-423,431-446,549-557`; first interaction/context/port or restart | Checker session started/restarted | `interaction_type` is `start` or `restart`; `policy_version` | Client action | Engagement | Start ref suppresses some repeats per mount; restart intentionally repeats | Sink-only Production gate | Low | **Keep one canonical start name** | `visa_checker_started`; retire route-screen alias after compatibility |
| `visa_route_screen_started` | Same call sites and same action as preceding row | Compatibility alias for checker start | Same safe parameters | Client action | Engagement | **Double-sent** with `visa_checker_started` | Sink-only Production gate | Low | **Retire alias after compatibility window** | `visa_checker_started` |
| `visa_route_screen_step_viewed` | `components/visa/TransitEligibilityChecker.tsx:442-446,498-503`; first/next step shown | Checker step became visible | `step_number`; `interaction_type` is `open` or `next`; `policy_version` | Client state transition | Engagement | None; revisits can repeat | Sink-only Production gate | Low | Keep only if step-view analysis is required | Registered step-view event; do not combine with completion |
| `visa_checker_step_completed` | `components/visa/TransitEligibilityChecker.tsx:469-503`; Next **or Back** | Checker step navigation | `step_number`; `interaction_type` is `next` or `back`; `policy_version` | Client action | Engagement | None | Sink-only Production gate | Low | **Fix meaning**: Back is not completion; split or rename to navigation | Canonical step progression only on validated Next; Back stays a navigation event |
| `visa_checker_completed` | `components/visa/TransitEligibilityChecker.tsx:529-546`; result computed | Local rules produced a result | `result_category`, `interaction_type=complete`, `policy_version` | Client pure-rule result | Engagement; not official eligibility | None per calculation; rerun can repeat | Sink-only Production gate | Low | Keep one result-computed event | `visa_checker_completed`; never Tier 4/official approval |
| `visa_route_screen_completed` | Same result action | Compatibility alias for checker completion | Same safe parameters | Client | Engagement | **Double-sent** with checker completion and accompanied by result view | Sink-only Production gate | Low | **Retire alias after compatibility window** | `visa_checker_completed` |
| `visa_checker_result_viewed` | Same result action immediately after computation | Result UI considered opened | `result_category`, `interaction_type=open`, `policy_version` | Client state update call, not visibility observer | Engagement | **Third event** for one result; no actual visibility test | Sink-only Production gate | Low | Keep only if emitted after verified render/visibility; otherwise derive | Prefer rendered-result observation or derive from completion, never sum both |
| `visa_result_action_clicked` | `components/visa/TransitEligibilityChecker.tsx:567-585`; any result CTA | Generic result CTA click | `result_category`, `interaction_type=click`, `policy_version` | Client click | Engagement | None; target-specific alias also fires | Sink-only Production gate | Low | Keep generic OR specific schema, not both | One typed result-action event with allowlisted `destination_type`; future envelope including `publish_id` |
| `visa_free_checker_completed` | `components/ToolKitWidget.tsx:302-315`; older standalone checklist reaches all checks | Old tool completion, not Visa Hub rules result | `source_page`, `tool`, `checked_count`, controlled result title | Client tool state | Engagement | Once per mount via ref | Sink-only Production gate | Low | Keep explicitly as legacy tool analytics or rename; never merge with Hub eligibility | `legacy_visa_checklist_completed` or retire after route usage review |
| `visa_policy_source_clicked` | Hub source link, Port source and result CTA; e.g. `app/visa-free-transit/page.tsx:316`, `EligiblePortsExplorer.tsx:186`, checker `:583` | Official/policy source outbound click | `interaction_type` is `open` or `click`; `policy_version`; sometimes `result_category` | Client click | Engagement | None; several call sites also emit official-source alias | Sink-only Production gate | Low payload; destination is not emitted by Visa sanitizer | **Consolidate** | One `visa_official_source_clicked`-style event, or registered generic outbound source event |
| `visa_official_source_clicked` | `app/visa-free-transit/page.tsx:609`, Port Explorer and checker | Official source outbound click | Same safe Visa fields | Client click | Engagement | **Double-sent** at Port source and external checker result CTA | Sink-only Production gate | Low | Keep one canonical source name; retire duplicate alias | One registered official-source event |
| `visa_port_explorer_used` | `components/visa/EligiblePortsExplorer.tsx:56-67`; search starts, filter/copy/show-more | Port Explorer interaction | `interaction_type` is `search`, `filter`, `copy` or `open`; `policy_version` | Client action | Engagement | Search is triggered when input length becomes 1; can repeat after clearing; no global dedupe | Sink-only Production gate | Low | Keep generic explorer interaction if dashboard needs it | Registered Explorer event; do not also send search alias for same action |
| `visa_port_search_used` | Port Explorer search and checker search (`TransitEligibilityChecker.tsx:1086`) | Port search engagement | `interaction_type=search`, `policy_version` | Client input | Engagement | Explorer sends with generic event; checker can emit on each qualifying input change | Sink-only Production gate | Low; query text correctly absent | Consolidate and debounce/dedupe | One search-used event per search interaction/session, not per keystroke |
| `visa_port_selected` | `components/visa/EligiblePortsExplorer.tsx:79-87`; user sends a port to checker | Port chosen for checker | `interaction_type=select`, `policy_version`; port ID intentionally absent | Client click | Engagement | None | Sink-only Production gate | Low | Keep only as aggregate interaction | Registered Visa event; no selected-port value |
| `visa_time_calculator_used` | `components/visa/TransitTimeCalculator.tsx:75-78`; valid calculation | Time-window calculator used | `interaction_type=calculate`, `policy_version` | Client calculation | Engagement | Every valid Calculate click | Sink-only Production gate | Low; dates/hours/result correctly absent | Keep product analytics | Registered tool-used event |
| `visa_checklist_saved` | `components/visa/VisaDocumentsChecklist.tsx:60-94,146`; save/copy/print/download; checker CTA to checklist section at `TransitEligibilityChecker.tsx:581` | Five different actions, including navigation that saved nothing | `interaction_type` is `save`, `copy`, `print`, `download` or `click`; `policy_version`; sometimes `result_category` | Client action | Engagement | None | Sink-only Production gate | Low | **Split by action meaning**; never Checklist delivery KPI | Registered Visa checklist action(s); only a real approved delivery can become `checklist_delivery_completed` |
| `visa_to_payment_hub_clicked` | Hub footer `app/visa-free-transit/page.tsx:650` and result CTA | Visa-to-Payment Hub cross-navigation | `interaction_type=click`, `policy_version`, optional `result_category` | Client click | Engagement | Result CTA also emits generic result action | Sink-only Production gate | Low | Keep target-specific OR generic, not both | One typed cross-Hub event; future campaign envelope including `publish_id` |
| `visa_guide_clicked` | Hub footer `app/visa-free-transit/page.tsx:651` and result CTA | Detailed Guide navigation | Same safe fields | Client click | Engagement | Result CTA also emits generic result action | Sink-only Production gate | Low | Keep target-specific OR generic, not both | One typed Guide navigation event; future campaign envelope including `publish_id` |
| `visa_official_arrival_card_clicked` | `app/visa-free-transit/page.tsx:517`; official Arrival Card link | Official service outbound click | `interaction_type=open`, `policy_version` | Client click | Engagement | None | Sink-only Production gate | Low | Keep | Registered official-resource event |
| `visa_12367_clicked` | `app/visa-free-transit/page.tsx:602` and result CTA | Immigration hotline contact action | `interaction_type=click`, `policy_version`, optional `result_category` | Client click | Engagement | Result CTA also emits generic result action | Sink-only Production gate | Low | Keep target-specific OR generic, not both | One registered hotline action event |

## 9. Duplicate-send and semantic-confusion register

| One real action | Current emissions | Consequence | Required migration |
| --- | --- | --- | --- |
| Homepage paid Guide click | `payment_apps_guide_buy_clicked` + `payment_guide_buy_clicked` | Two intents from one click | Emit `paid_guide_clicked` once; dual-send legacy aliases for at most one release and exclude them from new KPI |
| Payment Hub paid Guide click | `guide_buy_clicked` + `payment_apps_guide_buy_clicked` | Same duplication | Same migration |
| Guide-bottom paid CTA | `guide_paid_cta_clicked` + `payment_apps_guide_buy_clicked` | Same duplication | Same migration |
| Klook affiliate click | `affiliate_click` + `affiliate_klook_clicked` | Two intents and two parameter dictionaries | Emit `affiliate_link_clicked` once |
| Visa checker begins | `visa_checker_started` + `visa_route_screen_started` | Two starts | Keep `visa_checker_started`; compatibility alias sunsets |
| Visa checker produces result | `visa_checker_completed` + `visa_route_screen_completed` + `visa_checker_result_viewed` | One result can look like three funnel actions | Keep one completion; result view only if a real visibility event is separately required |
| Visa result CTA | `visa_result_action_clicked` + a target-specific Visa event | One CTA produces two actions | Choose one typed event schema; do not sum aliases |
| Visa official source | `visa_policy_source_clicked` + `visa_official_source_clicked` at some call sites | One outbound source click becomes two | Keep one registered source event |
| Port search | `visa_port_explorer_used` + `visa_port_search_used` | One search start becomes two events | Keep one search event plus optional distinct non-search Explorer actions |
| Newsletter application success | `landing_newsletter_signup` **or** `newsletter_subscribed` based on placement | Same lead under two names; neither is delivery | Replace both with `newsletter_completed` after approved API success |
| Checklist acquisition | `checklist_opened`, mixed `checklist_download_clicked`, public thank-you view and untracked direct links | Entry, click and delivery are confused or missing | Keep entry/click as Engagement; add `checklist_delivery_completed` only at a true successful delivery state |

## 10. Raw UTM, full URL and publication-ID audit

### 10.1 What exists today

`lib/utm.ts` and `app/api/newsletter/route.ts` support exactly:

```text
utm_source
utm_medium
utm_campaign
utm_content
```

They do **not** support `utm_term`, `utm_id` or `publish_id`. This is a current
fact. Any target table that mentions `publish_id` describes the future Phase 4B
contract only.

Current capture behavior:

- any URL containing at least one of the four fields replaces the entire
  `sessionStorage` record;
- absent fields in that new URL become blank;
- values are trimmed only, not normalized or allowlisted;
- the JSON read is blindly spread over the empty object;
- there is no schema version, timestamp, expiry, first-known/latest-qualifying
  split, referral classifier or internal-host exclusion;
- a later Direct/internal navigation does not overwrite the stored record;
- Landing events ignore the stored record and use only active-URL `utm_source`;
- Newsletter and generic/product link events propagate the stored raw values;
- outbound Payhip URLs have a separate controlled website-to-Payhip UTM set.

### 10.2 Events currently carrying raw UTM values

| Producer | Affected events | Raw fields | Risk |
| --- | --- | --- | --- |
| `TrackedLink` | Homepage events, `checklist_opened`, Guide/Store navigation events, `payment_step_clicked`, `guide_purchase_options_clicked`, some `checklist_download_clicked` | Four stored UTM fields + complete destination | Operator/user text is emitted without canonical validation; no `utm_id` |
| `NewsletterForm` default branch | `newsletter_subscribed` and Newsletter API/provider payload | Four stored UTM fields | Raw campaign values enter both analytics and provider record; no `utm_id` |
| `ProductActionButton` | Paid Guide aliases and Store product clicks | Four stored inbound UTM fields + full outbound Payhip URL | Inbound attribution and outbound provider campaign are mixed; query may leak |
| Landing helpers | Landing events | **No raw fields**; only current URL source normalized to a local enum | Safer payload, but loses session campaign/medium/content/publication context |
| Visa helpers | Visa events | None | Safe local allowlist |
| AffiliateLink | Affiliate events | No stored UTM fields | It instead emits full current and destination URLs, so query/token risk is higher |

### 10.3 Complete URL/query exposures

| Field | Producer | Current construction | Required target |
| --- | --- | --- | --- |
| `page_location` | `GoogleAnalyticsPageView` | `window.location.href` | Canonical origin + validated pathname only; no query/hash |
| `destination_url` | `TrackedLink` | Caller `href`, including possible query/hash | Allowlisted `destination_type` and, only where essential, sanitized path |
| `destination_url` | `ProductActionButton` | Full Payhip URL with query | `destination_type=payhip`; never token/full URL in event |
| `page_location` | `AffiliateLink` | Full current browser URL | Sanitized path or omit |
| `destination_url` / `destination` | `AffiliateLink` | Full affiliate URL, potentially containing affiliate token | `destination_type=affiliate` + allowlisted partner; omit full URL/token |

### 10.4 Current parameter-name collisions

| Business concept | Current names / shapes | Audit consequence |
| --- | --- | --- |
| Traffic/source context | `traffic_source`, `utm_source`, `source`, `source_page` | Campaign source, component source and page path are not distinguishable by name alone. |
| Placement | `placement`, `link_position`, `section` | The same location concept cannot be grouped without a call-site map. |
| Destination | `destination_url`, `destination`, implicit `href` | Some values are relative paths, others complete third-party URLs with query/token. |
| Product | `product`, `product_id`, `item_name` | ID, display name and Homepage content label are mixed. |
| CTA | `cta_name`, `link_label`, `item_name` | Role and visible copy are not consistently separated. |
| Campaign | `utm_campaign`, `affiliate_campaign`; no `utm_id` / `publish_id` | Visitor campaign and provider campaign can be confused; publication-level reconciliation is unavailable. |
| Step | `step`, `step_number` | String business steps and numeric Visa steps use different schemas. |
| Page | `page_path`, `source_page`, full `page_location` | Sanitized path and raw full URL coexist. |

The future adapter must use one allowlisted logical field per concept and map
the valid campaign envelope—including `publish_id` when a real managed
publication supplied `utm_id`—to destination-native fields. It must not preserve
these variants merely for historical convenience.

## 11. Production, Preview/local and consent audit

### 11.1 Environment truth

- Custom event producers do **not** check Production host or `VERCEL_ENV`.
- The repository's real GA4 loader and independent Metricool loader render only
  in Vercel Production.
- Metricool currently does not receive the site's named custom events through a
  bridge.
- Local/Preview therefore normally do not reach the configured live GA4 or
  Metricool destination, but a debug build, injected `gtag` or pre-existing
  `dataLayer` can still observe producer output.
- Newsletter server handling can run in Preview/local when its provider
  configuration is available. There is no server-side analytics destination or
  explicit Production guard.
- No current adapter guarantees that Preview/local data is rejected. The future
  central adapter must fail closed by approved host and environment; the target
  contract must not be described as already implemented.

### 11.2 Consent truth

- GA4 and Metricool load in Production before an explicit consent decision.
- Attribution writes `fctk_utm_attribution` to sessionStorage without consent.
- There is no Consent Mode/default-denied implementation in these call sites.
- GA4/Metricool requests may receive full current location with query values.
- Payment and Visa tools use localStorage for functional state, independently
  of analytics consent.
- Newsletter has submit-adjacent consent copy, not a separate analytics consent
  gate; email itself is not sent to GA4.

This is a technical privacy finding, not legal advice. Phase 4B needs a consent
and retention decision before EU/UK measurement rollout.

## 12. Canonical migration map

The following is the **future target**, not evidence of current implementation.
For managed publications, the canonical campaign envelope includes
`publish_id` sourced from required `utm_id`. Direct, organic/referral evidence
without a managed publication must not fabricate a publication ID.

| Canonical future event | Current evidence / aliases | Canonical required meaning and key fields | Compatibility migration |
| --- | --- | --- | --- |
| `landing_view` | `landing_view` | Approved Landing visibly rendered; `landing_name`, `traffic_source`, `traffic_medium`; valid `campaign_name`, `content_group`, **`publish_id`**, optional `campaign_term` | Keep name; replace current-URL resolver. Report distinct Landing sessions, not raw views. |
| `landing_primary_cta_clicked` | Role-specific uses of `landing_hub_clicked` / `landing_cta_clicked` | One genuine designated-primary activation; `landing_name`, `cta_name`, `destination_type` + future campaign envelope including **`publish_id`** | If dual-send is required, one release maximum; dashboard uses canonical only. |
| `landing_secondary_cta_clicked` | Remaining role-specific Landing click aliases | One genuine secondary activation; same controlled envelope including **`publish_id`** | Same; do not infer role from historical event name alone. |
| `hub_view_from_landing` | Landing session + sanitized Hub `page_view` | Reporting-derived reach of intended Hub in same measured session; `landing_name`, `destination_type`, sanitized path + joined campaign context including **`publish_id`** when known | Do not emit a new browser event and do not infer progression from click alone. |
| `newsletter_started` | No current event | First meaningful form interaction or first submit attempt; no email/value; future campaign envelope including **`publish_id`** | New event; once per form/session. No historical backfill. |
| `newsletter_completed` | `landing_newsletter_signup`, `newsletter_subscribed` | Approved application-side API success; no email/provider/delivery fields; future campaign envelope including **`publish_id`** | Alias window max one release; do not call this email delivery. |
| `checklist_delivery_completed` | No trustworthy current equivalent | Explicit successful Checklist delivery state; no file URL/token; future campaign envelope including **`publish_id`** | Do not map old clicks, public thank-you views, tool completion or Visa saves. No historical backfill. |
| `paid_guide_clicked` | `payment_apps_guide_buy_clicked`, `payment_guide_buy_clicked`, `guide_buy_clicked`, `guide_paid_cta_clicked` | One outbound activation to verified Payhip destination; `product_id`, `destination_type=payhip` + future campaign envelope including **`publish_id`** | Dual-send max one release; exclude all aliases from new KPI; record retirement date. |
| `affiliate_link_clicked` | `affiliate_click`, `affiliate_klook_clicked` | One enabled affiliate activation; `partner_name`, `destination_type=affiliate` + future campaign envelope including **`publish_id`**; no full URL/token | Same compatibility rule; network remains conversion/revenue truth. |
| `experiment_exposure` | None | Variant actually visible; `experiment_id`, `variant_id`, `landing_name` + future campaign envelope including **`publish_id`** | Future only; no historical backfill. |
| `experiment_conversion` | None | Reporting-derived predeclared outcome for an exposed session | Future only; do not add an extra browser conversion event. |

Historical aliases must not disappear without a controlled transition. For each
renamed event:

1. publish a versioned alias map;
2. if necessary, dual-send for no more than one release;
3. exclude aliases from canonical dashboards during that window;
4. validate canonical counts and duplicate rate;
5. record a retirement date; and
6. remove the alias only after downstream validation.

Never sum the old and new names. Never fabricate historical `publish_id` values
for rows that did not carry a real `utm_id`.

## 13. Current measurement capability

| Funnel stage | Current status | Safe statement |
| --- | --- | --- |
| Traffic | Partial | GA4 and Metricool load in Production, but source definitions, full-query exposure, consent and session attribution require reconciliation. |
| Engagement | Available with quality issues | Many page/tool/click interactions exist; aliases, repeated triggers and inconsistent schemas can overcount. |
| Lead | Partial | Newsletter application success is observable under two names. Checklist delivery is not reliably observable. |
| Commercial intent | Available with duplication | Paid Guide and affiliate clicks exist, but one click can produce multiple aliases. |
| Verified outcome | Not available | No provider-confirmed Payhip order/refund or affiliate conversion/commission/revenue source is connected. |

## 14. Inventory conclusion

The current implementation is a useful instrumentation base, especially the
Landing and Visa local sanitizers. It is not yet a stable growth event contract.
The largest correctness risks are:

1. duplicated paid-Guide, affiliate and Visa actions;
2. Newsletter accepted/saved being confused with delivery;
3. Checklist entry/click/tool state being confused with successful delivery;
4. Payhip and affiliate clicks being confused with purchase or revenue;
5. raw four-field UTMs and full URLs entering generic events;
6. Landing attribution using only the current URL;
7. no current `utm_id` / `publish_id` support;
8. no central Production-only event guard; and
9. GA4, Metricool and session attribution operating without a consent gate.

Phase 4B should first introduce the consent-aware, Production-host-gated,
allowlisted adapter and campaign context; then migrate the small canonical event
set with a bounded compatibility window. Only after a clean baseline should a
dashboard treat these events as funnel KPIs.
