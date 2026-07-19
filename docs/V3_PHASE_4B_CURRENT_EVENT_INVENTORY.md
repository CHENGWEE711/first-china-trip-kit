# V3 Phase 4B — Current Event Inventory

Status: architecture audit only

Repository baseline: `66ed82edcf3eca9a39a1f7b6894572394f75a019`

Audit date: 2026-07-19 (Asia/Shanghai)

Production property: `https://www.firstchinatripkit.com`

## 1. Purpose and boundaries

This document records what the application emits today. It does not treat a
click as a sale, does not infer missing provider outcomes, and does not authorize
Phase 4B implementation. Paths and line numbers may move after implementation;
file names identify the audited source of truth.

The inventory separates four tiers:

1. **Engagement** — page, CTA, guide or tool interaction.
2. **Lead** — a successful Newsletter submission or successful resource delivery.
3. **Commercial intent** — a click toward a paid Guide or affiliate provider.
4. **Verified outcome** — a provider-confirmed order, refund, approved affiliate
   conversion, commission or revenue.

The current site has usable Tier 1 signals, partial Tier 2 signals, Tier 3 click
signals, and no connected Tier 4 source of truth.

## 2. Shared analytics infrastructure

| Area | Current implementation | Production behavior | Audit result |
| --- | --- | --- | --- |
| Event dispatcher | `lib/analytics.ts` | Calls `window.gtag`, otherwise pushes to `dataLayer` | Accepts arbitrary names and parameters; no global schema, sanitizer, event ID or deduplication |
| GA4 loader | `components/GoogleAnalytics.tsx` | Loads only when `NEXT_PUBLIC_GA_ID` exists and `VERCEL_ENV=production` | Production gate exists; consent gate does not |
| GA4 SPA page view | `components/GoogleAnalyticsPageView.tsx` | Sends an explicit `page_view` on path changes | Full location can contain query values; GA Admin history settings must be checked for duplicate page views |
| Metricool loader | `components/MetricoolAnalytics.tsx` | Loads only in Vercel Production | Independent page tracker; no bridge to the custom event contract and no consent gate |
| Global mounting | `app/layout.tsx` | Mounts GA4, Metricool and attribution capture | One integration point exists, but all three start without an explicit consent decision |
| Landing sanitizer | `lib/landing/analytics.ts` | Restricts Landing event names and four parameters | Good local pattern; incomplete source taxonomy and disconnected from stored attribution |
| Visa sanitizer | `lib/visa/analytics.ts` | Restricts Visa names and four non-sensitive parameters | Strongest current privacy pattern; event aliases still cause duplicate business actions |
| Generic links | `components/TrackedLink.tsx`, `components/ProductActionButton.tsx`, `components/AffiliateLink.tsx` | Can attach caller-defined values and complete destination URLs | Needs one global allowlist; full URLs can expose query or affiliate tokens |

The dispatcher itself is environment-agnostic. Local and Preview pages normally
have no GA loader, but debug/data-layer behavior can still occur. Future code
must reject non-Production destinations centrally rather than relying only on
the loader being absent.

## 3. Landing events

The three current Landing definitions are in `data/landings.ts`, and the shared
event contract is in `lib/landing/analytics.ts`.

| Current event | Current trigger | Current parameters | Tier | Issue |
| --- | --- | --- | --- | --- |
| `landing_view` | `components/landing/LandingAnalytics.tsx` on mount | `landing_name`, `traffic_source`, `interaction_type` | Engagement | Per-mount, not a deduplicated Landing session; traffic source reads the current URL only |
| `landing_hub_clicked` | Hero, content, Hub preview or footer links configured with that name | `landing_name`, `traffic_source`, `cta_name`, `interaction_type` | Engagement | Primary CTA and later Hub links share one name; position is inferred from `cta_name` |
| `landing_cta_clicked` | Checklist anchor, Start Here, Guide and related-content links | Same four fields | Engagement | Primary and secondary actions are not canonical event names |
| `landing_newsletter_signup` | Landing Newsletter API returns success | Same four fields | Lead proxy | Same business action is `newsletter_subscribed` outside Landings; browser event is not the server record |
| `landing_checklist_download` | Declared in the allowlist | None found | None | Dead event; it does not represent delivery |

Current Landing source logic accepts a limited set and reduces unsupported
sources to `other`. It only reads `utm_source` from the active URL. If a visitor
lands on a UTM-tagged homepage and then follows an internal link to a Landing,
the Landing event is currently classified as `direct` despite the sessionStorage
record.

## 4. Newsletter events and completion meaning

### Current flow

```text
Form submit
→ read stored UTM values
→ POST /api/newsletter
→ Supabase and/or Brevo service attempt
→ HTTP success
→ browser success event
→ /thank-you
```

| Current event | Trigger | Tier | Important meaning |
| --- | --- | --- | --- |
| `landing_newsletter_signup` | Successful response for a Landing form | Lead proxy | At least the application accepted the subscription flow; not proof of email delivery |
| `newsletter_subscribed` | Successful response for non-Landing forms | Lead proxy | Same business action under a second name |

There is no `newsletter_started` event. Failed validation, network failure and
provider failure therefore cannot be measured as a stable started-to-completed
funnel.

The API returns `provider` and `delivery_status`, but the client does not use
them. The service can return success after Supabase stores the address even when
Brevo is unavailable or delivery is not configured. Accordingly, the current
browser event means **submission accepted/saved**, not **welcome email delivered**.

Supabase currently stores email and source page. Brevo receives source, UTM,
placement, lead magnet and a server-created consent timestamp. Inputs have
length checks but no shared campaign taxonomy. Email and provider data must
never be copied into GA4.

## 5. Checklist events and delivery gaps

| Current event | Trigger | Tier | Audit result |
| --- | --- | --- | --- |
| `checklist_download_clicked` | Actual PDF link in `ChecklistDownloadWithTip`, and also a Guide link that merely opens `/thank-you` | Engagement | Same name is used both before and at the download link; not a delivery completion |
| `checklist_opened` | Header link | Engagement | Separate alias for entry into the flow |
| `landing_checklist_download` | Declared only | None | Never emitted |
| `interactive_checklist_started` | First Payment Hub checklist interaction | Engagement | Valid tool-start signal |
| `interactive_checklist_completed` | All Payment Hub items checked | Engagement/lead-adjacent | Completion of an on-page tool, not proof of PDF delivery |
| `visa_checklist_saved` | Visa save, copy, print or download actions; also a checker link to the checklist section | Engagement | Four actions and one navigation action collapse into a misleading “saved” name |

`/thank-you` is public and can be opened directly. The Payment Hub's completed
checklist exposes a PDF link without a dedicated delivery event. Browser click
events also cannot prove that a file finished downloading. The future canonical
`checklist_delivery_completed` event must be emitted only after the application
has reached an explicitly defined successful delivery state; until then the
metric must be reported as unavailable, not estimated from thank-you page views.

## 6. Payment & Apps Hub events

| Current event | Trigger / parameters | Tier | Duplication or quality note |
| --- | --- | --- | --- |
| `payment_hub_view` | Hub interactive component mount; `source_page` | Engagement | Does not carry canonical Landing/session attribution |
| `payment_step_clicked` | Quick-start step; URL, UTM, `step`, `placement` | Engagement | Sends full destination URL and legacy parameter names |
| `payment_readiness_started` | First checker use; `source_page` | Engagement | Useful concept |
| `payment_readiness_completed` | Every Check action; score and missing count | Engagement | No completion dedupe; numeric values need an approved contract before dashboard use |
| `offline_backup_opened` | Backup scenario opened | Engagement | Per-scenario mount dedupe exists; `scenario` is outside a global dictionary |
| `interactive_checklist_started` | First checklist interaction | Engagement | Useful concept |
| `interactive_checklist_completed` | All items complete | Engagement/lead-adjacent | On-page completion only |
| `guide_preview_opened` | Paid Guide preview opened | Engagement | Useful product-intent precursor, not checkout intent |
| `guide_purchase_options_clicked` | Internal product-options link when checkout is unavailable | Engagement | Not a paid checkout click |

## 7. Visa Hub events

Visa parameters are already restricted to `result_category`, `step_number`,
`interaction_type` and `policy_version`. Sensitive answers such as nationality,
passport type, dates, route and selected port are intentionally excluded.

| Business action | Current events | Audit result |
| --- | --- | --- |
| Hub view | `visa_hub_view` | Keep only if it answers a Hub-entry question or derive from page view |
| Checker start | `visa_checker_started` + `visa_route_screen_started` | Same action is double-sent |
| Step navigation | `visa_checker_step_completed` | Back is also labelled step completed, differentiated only by `interaction_type=back` |
| Checker result | `visa_checker_completed` + `visa_route_screen_completed` + `visa_checker_result_viewed` | One result creates three events |
| Result CTA | `visa_result_action_clicked` plus target-specific events such as `visa_to_payment_hub_clicked`, `visa_guide_clicked`, `visa_12367_clicked` | Generic and specific event can both fire for one click |
| Official source | `visa_policy_source_clicked` + `visa_official_source_clicked` | Port source click can double-fire |
| Port search | `visa_port_explorer_used` + `visa_port_search_used` | Explorer sends both; checker search can emit on every input change |
| Port selection | `visa_port_selected` | Keep as a product-interaction event only if used operationally |
| Time tool | `visa_time_calculator_used` | Useful engagement signal; never an eligibility outcome |
| Arrival Card / hotline | `visa_official_arrival_card_clicked`, `visa_12367_clicked` | Useful outbound actions with safe categorical parameters |

This local sanitizer is the model for global privacy controls, but the alias
events must be consolidated before using Visa engagement as a KPI.

## 8. Paid Guide events

The same outbound checkout intent is currently represented by four names:

| Current event | Typical location | Tier | Issue |
| --- | --- | --- | --- |
| `payment_apps_guide_buy_clicked` | Store and shared Payhip button | Commercial intent | Closest current generic product click |
| `payment_guide_buy_clicked` | Homepage | Commercial intent | Often sent with `payment_apps_guide_buy_clicked` |
| `guide_buy_clicked` | Payment Hub | Commercial intent | Often sent with `payment_apps_guide_buy_clicked` |
| `guide_paid_cta_clicked` | Guide | Commercial intent | Often sent with `payment_apps_guide_buy_clicked` |
| `product_success_page_viewed` | Public paid-Guide thank-you route | Unverified proxy | Public/no order token; must not be counted as a purchase |

`ProductActionButton` also appends outbound Payhip UTMs representing the site's
checkout source. Those outbound values are useful for Payhip reporting but are
not a substitute for the visitor's inbound campaign context.

No Payhip webhook, order import or verified transaction event is connected.
There is no current source for confirmed order, refund or verified revenue.

## 9. Affiliate events

| Current event | Parameters | Tier | Issue |
| --- | --- | --- | --- |
| `affiliate_click` | Partner, category, campaign, label, position, page and destination URLs | Commercial intent | Complete URLs may contain query values; no inbound attribution context |
| `affiliate_klook_clicked` | Klook-specific partner, source, placement, destination and offer fields | Commercial intent | Same Klook click can also emit `affiliate_click`; second naming/parameter system |

Provider links are rendered only when enabled and valid, which is a good
fail-closed behavior. However, the site has no connected network conversion,
approved commission or paid commission data. Affiliate click-through must be
labelled **intent**, never conversion or revenue.

## 10. Complete literal event namespace found

The table below consolidates literal event names found in `trackEvent`, Landing
and Visa calls, event-name props, and product-event arrays. It separates CTA
parameter values such as `open_checklist_signup` from actual event names.
Dynamic caller-defined names remain a risk because the generic dispatcher has no
closed type at runtime.

| Domain / trigger family | Literal current event names | Parameter source and quality |
| --- | --- | --- |
| Page and Homepage links | `page_view`, `hero_primary_cta_clicked`, `homepage_task_clicked`, `homepage_popular_content_clicked`, `homepage_trending_clicked`, `homepage_before_fly_clicked`, `homepage_experience_clicked`, `homepage_product_preview_clicked` | `GoogleAnalyticsPageView`, `TrackedLink` and Homepage call-site objects; arbitrary generic parameters and sometimes complete location |
| Landing render and links | `landing_view`, `landing_hub_clicked`, `landing_cta_clicked` | Landing allowlist: `landing_name`, `traffic_source`, `cta_name`, `interaction_type` |
| Newsletter and contact | `landing_newsletter_signup`, `newsletter_subscribed`, `contact_form_started`, `contact_form_submitted`, `whatsapp_contact_clicked` | Newsletter call site attaches stored raw UTMs; contact/WhatsApp use generic parameters |
| Checklist/share/tip | `checklist_opened`, `checklist_download_clicked`, `payhip_checklist_clicked`, `checklist_share_clicked`, `checklist_share_image_downloaded`, `checklist_share_link_copied`, `coffee_tip_popup_shown`, `coffee_tip_popup_closed`, `coffee_tip_clicked`, `essential_apps_checklist_completed` | Multiple components and generic parameter objects; action meaning differs by component |
| Payment Hub | `payment_hub_view`, `payment_step_clicked`, `payment_readiness_started`, `payment_readiness_completed`, `offline_backup_opened`, `interactive_checklist_started`, `interactive_checklist_completed`, `guide_preview_opened`, `guide_purchase_options_clicked` | Hub component/call-site values; no global allowlist, and some URLs/scores/scenarios are attached |
| Paid Guide / Store | `payment_apps_guide_buy_clicked`, `payment_guide_buy_clicked`, `guide_buy_clicked`, `guide_paid_cta_clicked`, `store_inside_guide_clicked`, `guide_contact_clicked`, `product_success_page_viewed`, `store_waitlist_clicked` | Product button/generic links; product button can loop over two names and attach full destination/raw UTM. `store_waitlist_clicked` is configured in a path where the component currently returns null, so no live trigger was established |
| Affiliate | `affiliate_click`, `affiliate_klook_clicked` | Generic and Klook-specific parameter dictionaries; one Klook click can emit both |
| Visa Hub/checker/tools | `visa_hub_view`, `visa_policy_option_selected`, `visa_checker_started`, `visa_route_screen_started`, `visa_route_screen_step_viewed`, `visa_checker_step_completed`, `visa_checker_completed`, `visa_route_screen_completed`, `visa_checker_result_viewed`, `visa_result_action_clicked`, `visa_free_checker_completed`, `visa_policy_source_clicked`, `visa_official_source_clicked`, `visa_port_explorer_used`, `visa_port_search_used`, `visa_port_selected`, `visa_time_calculator_used`, `visa_checklist_saved`, `visa_to_payment_hub_clicked`, `visa_guide_clicked`, `visa_official_arrival_card_clicked`, `visa_12367_clicked` | Visa allowlist limits values to `result_category`, `step_number`, `interaction_type`, `policy_version`; names still include compatibility aliases and per-keystroke search behavior |

The declared Landing event `landing_checklist_download` appears in its local
allowlist but has no emitter and is therefore documented in Section 3 as a dead
event rather than a live literal call.

These names are not automatically promoted to the canonical growth funnel. In
4B.1 each is marked retain, derive, rename or retire; only the small contract in
the main architecture report becomes a KPI source.

Homepage, Contact, Share, Payment and Visa tool events remain non-growth product
analytics during migration. Before a future global fail-closed adapter is turned
on, each retained domain event must register an explicit local event/parameter
schema; otherwise it is dropped in Preview and blocks the cutover. No generic
caller-defined passthrough is permitted, and these events do not enter growth
KPI formulas merely because they remain observable.

## 11. Current parameter inconsistencies

| Concept | Current variants |
| --- | --- |
| Traffic/source context | `traffic_source`, `utm_source`, `source`, `source_page` |
| Placement | `placement`, `link_position`, `section` |
| Destination | `destination_url`, `destination` |
| Product | `product`, `product_id`, `item_name` |
| CTA | `cta_name`, `link_label` |
| Campaign | `utm_campaign`, `affiliate_campaign` |
| Step | `step`, `step_number` |
| Page | `page_path`, `source_page`, `page_location` |

The future contract uses one field per concept and drops complete URLs, query
strings and arbitrary caller-defined parameters.

## 12. Current UTM and attribution behavior

`lib/utm.ts` currently supports `utm_source`, `utm_medium`, `utm_campaign` and
`utm_content`; it does not support `utm_term`.

- `components/AttributionCapture.tsx` runs on the first layout mount.
- Any URL containing at least one UTM replaces the whole sessionStorage record.
- Missing fields in the new URL become blank.
- Values are trimmed only; there is no lowercase/ASCII conversion, allowlist,
  schema version, timestamp or expiry.
- The storage is scoped to a top-level browsing context in the common case, but
  a tab opened with an opener can receive an initial copy and browser restore can
  preserve it. The current code has no clone/restore guard.
- A later Direct page in the same tab does not overwrite the stored record.
- There is no first-known/latest-qualifying split, referral classification,
  internal-host exclusion, bot rule or internal-team filter.
- Landing events ignore the stored record and inspect only the current URL.
- Existing documentation and live assets use conflicting media: `social`,
  `video`, `organic_social`, `organic_video` and `organic`.

The existing sessionStorage key therefore represents “latest partial UTM seen
in this browsing context, subject to browser clone/restore behavior,” not a
reliable first-touch or session attribution record.

## 13. Consent, storage and privacy behavior

- GA4 and Metricool load on Production before an explicit consent choice.
- GA4 creates first-party analytics cookies in a fresh Production browser.
- Attribution writes `fctk_utm_attribution` to sessionStorage without a consent
  decision.
- GA4/Metricool page requests can include the full current location, including
  UTM query values.
- Payment and Visa tools also use localStorage for functional state.
- The Newsletter relies on submit-adjacent consent copy, not a separate checkbox.
- The current Privacy Policy describes GA4, Newsletter, Payhip and external
  services, but not Metricool, attribution/experiment storage, retention,
  consent categories or analytics opt-out.

Before EU/UK measurement rollout, Phase 4B needs a consent-management decision,
default-denied analytics behavior where required, and a legal review of final
copy. This is a technical risk assessment, not legal advice.

## 14. Canonical migration map

| Canonical future event | Current names or evidence | Migration treatment |
| --- | --- | --- |
| `landing_view` | `landing_view` | Retain name; emit once per visible page lifecycle with canonical attribution, then deduplicate KPI by GA4 session |
| `landing_primary_cta_clicked` | `landing_hub_clicked`, `landing_cta_clicked` + CTA config | Emit only for the designated primary CTA; dedupe per interaction |
| `landing_secondary_cta_clicked` | `landing_hub_clicked`, `landing_cta_clicked` + CTA config | Emit only for the designated secondary CTA |
| `hub_view_from_landing` | Landing view plus sanitized Hub `page_view` | Derive in reporting for the same session; do not emit a new browser event and do not infer from click alone |
| `newsletter_started` | No current equivalent | Emit once when a user first meaningfully begins the form, not on page load; classify as Tier 1 Engagement |
| `newsletter_completed` | `landing_newsletter_signup`, `newsletter_subscribed` | Canonical successful application-side submission after approved API success; provider status remains operational and is not an event parameter; never put email in analytics |
| `checklist_delivery_completed` | Mixed checklist aliases | Add only when a real successful delivery state is defined; do not backfill from `/thank-you` views |
| `paid_guide_clicked` | Four paid Guide click names | Replace aliases; one event per outbound intent click |
| `affiliate_link_clicked` | `affiliate_click`, `affiliate_klook_clicked` | Replace both; one event per outbound affiliate click |
| `experiment_exposure` | None | Future only; once per session and experiment after variant is visibly rendered |
| `experiment_conversion` | None | Future only; one allowed primary/guardrail action tied to an exposure |

If a compatibility window is required, dual-send for at most one release and
exclude legacy aliases from the new KPI definitions. Do not sum canonical and
legacy names. Record an alias retirement date and remove them after dashboard
validation.

## 15. Current measurement capability

| Funnel stage | Current status | Safe statement |
| --- | --- | --- |
| Traffic | Partial | GA4 and Metricool collect Production traffic, but Landing-session and source definitions need reconciliation |
| Engagement | Available with quality issues | Many interactions are visible; aliases and repeat triggers can overcount |
| Lead | Partial | Newsletter submission success is observable under two names; Checklist delivery is not reliable |
| Commercial intent | Available with duplication | Paid Guide and affiliate outbound clicks exist; one click can create aliases |
| Verified commercial outcome | Not available | No provider-confirmed order, refund, affiliate conversion, commission or revenue source is connected |

## 16. Inventory conclusion

The existing implementation is a useful instrumentation base, especially its
Production-only loaders and the Visa/Landing local sanitizers. It is not yet a
stable business event contract. Phase 4B should first centralize allowlisting,
normalization, environment gating and deduplication; migrate the small canonical
funnel set; then validate a clean two-week baseline before any experiment or
revenue dashboard claim.
