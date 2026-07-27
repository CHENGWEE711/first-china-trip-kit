# Phase 5 event dictionary and verification evidence

All Phase 5 events are client-side GA4 intent or interaction events unless the
source of truth says otherwise. No event may include passport number, card
number, email, free text, full current URL, full affiliate URL or payment token.
`order` is never inferred from a thank-you page or outbound Payhip click.

| Event | Trigger condition | Allowed parameters | Test / acceptance evidence |
| --- | --- | --- | --- |
| `newsletter_subscribed` | Newsletter API returns success | `source_page`, `placement`, `lead_magnet`, approved UTM fields | Existing newsletter Playwright flow stubs `gtag` and asserts one success event. |
| `checklist_download_clicked` | User clicks the local checklist download | `source_page`, `placement` | Existing checklist/download browser tests record the event. |
| `readiness_checker_started` | First answer is selected in the new checker | `source_page`, `question_count` | `tests/phase5/arrival-readiness.spec.ts` captures `gtag`. |
| `readiness_checker_completed` | All 12 answers are selected | `source_page`, `score`, `result_status`, `unresolved_count` | Browser test completes all 12 answers and asserts exactly one event. |
| `readiness_result_email_submitted` | Checker email API returns success | `source_page`, `score`, `result_status`, `unresolved_count` | Browser test stubs the API and asserts successful capture. |
| `payment_guide_viewed` | Store product view mounts | `source_page`, `product_id`, `placement` | `ProductPageView` accepts only the two approved view-event names; the existing Store test exercises the mounted page. |
| `payment_guide_buy_clicked` | Verified Payhip payment-guide CTA click | `source_page`, `placement`, `product_id`, `product`, `price`, `destination_type` | Existing product CTA wiring plus source contract test; validate with a verified Payhip test URL in preview before release. |
| `arrival_bundle_viewed` | Bundle landing page mounts | `source_page`, `product_id`, `placement` | `tests/phase5/arrival-readiness.spec.ts` captures the page-view dispatch. |
| `arrival_bundle_buy_clicked` | Verified Bundle Payhip CTA click | `source_page`, `placement`, `product_id`, `product`, `price`, `destination_type` | `tests/phase5-growth-contract.test.mjs` verifies the guarded Payhip wiring and event name; validate a real test checkout URL in preview before release. |
| `affiliate_link_clicked` | Enabled affiliate outbound CTA is clicked | `partner_name`, `destination_type`, `offer_type`, `offer_name`, `source_page`, `placement`, `campaign` | Affiliate component unit/source test verifies the canonical event and absence of destination URL payloads. |
| `whatsapp_contact_clicked` | Configured WhatsApp CTA is clicked | `source_page`, `placement` | Existing component/browser tests stub `gtag`. |
| `itinerary_review_started` | First focus inside custom-itinerary contact form | `source_page`, `placement` | `tests/phase5/arrival-readiness.spec.ts` focuses and submits a stubbed custom-itinerary form. |
| `itinerary_review_submitted` | Custom-itinerary form API returns success | `source_page`, `placement`, `preferred_reply_method` | `tests/phase5/arrival-readiness.spec.ts` asserts exactly one successful dispatch without form PII. |

## GA4 DebugView procedure

1. Deploy only to a non-production preview with `NEXT_PUBLIC_ANALYTICS_DEBUG=true`
   and an approved GA4 DebugView-capable test configuration.
2. Use a clean browser profile, complete each listed acceptance flow once, and
   save timestamped DebugView screenshots together with network/event payload
   screenshots in the release evidence folder.
3. Confirm score and status fields contain only the allowed aggregate values.
4. Confirm no email, passport, card, destination URL, query string or free-text
   answer appears in DebugView.
5. Record Payhip clicks as `product_click` intent. Add a separate idempotent
   `order_completed` implementation only after a verified provider order source
   (webhook or export) is approved.

## Current test environment note

The repository's local tests use an equivalent `window.dataLayer` capture sink
that works both when the Preview GA tag is enabled and when GA is intentionally
absent. That proves dispatch names, trigger timing and allowed payload shape;
actual GA4 DebugView proof still requires the deployment procedure above.
