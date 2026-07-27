# Phase 5.1 Preview Integration & Pre-Deployment Gate

**Project:** First China Trip Kit<br>
**Report date:** 2026-07-27<br>
**Decision:** **Do not deploy to production. Do not merge to `main`.**

This report records only observed evidence. No Preview URL, payment, email,
Brevo contact, or GA4 DebugView evidence has been invented.

## 1. Revision and deployment identity

| Item | Evidence |
| --- | --- |
| Branch | `feat/v3-phase4b-growth-platform-architecture` |
| Current `HEAD` SHA | `82ea316ef88371a7a68c4cc7e52a96f14b51f891` |
| Phase 5 / 5.1 state | Local working-tree changes are intentionally uncommitted. The `HEAD` SHA above is **not** a deployable Phase 5.1 commit. No user-owned changes were committed. |
| Vercel project | Linked locally as `china-travel-kit` (project metadata only). |
| Preview Deployment | **Not created.** |
| Preview URL | Not available. |
| Deployment ID | Not available. |
| Vercel build log | Not available because no deployment was created. |

### Deployment blocker

The locally available Vercel credential was rejected by the Vercel CLI as an
invalid CLI token. No Vercel, Payhip, Brevo, or GA4 connector is available in
this workspace. Creating an attributable Preview deployment therefore cannot
be completed safely from this environment.

## 2. Preview safeguards and environment-variable inventory

The implementation adds Preview-only indexing and analytics controls:

- `VERCEL_ENV=preview` makes page metadata `noindex, nofollow`.
- Preview `robots.txt` returns `User-Agent: *` and `Disallow: /`.
- Preview responses add `X-Robots-Tag: noindex, nofollow, noarchive`.
- GA loads in Preview only when `NEXT_PUBLIC_ANALYTICS_DEBUG=true`; the GA
  config includes `debug_mode: true` in that state.
- Canonical URLs remain the approved production canonical URLs. They were not
  changed to a Preview hostname.

Required or supported Preview variable names (values intentionally omitted):

```text
VERCEL_ENV
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_ANALYTICS_DEBUG
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL
NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL
NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL
BREVO_API_KEY
BREVO_LIST_ID
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_NEWSLETTER_TABLE
SUPABASE_CONTACT_TABLE
NEXT_PUBLIC_WHATSAPP_URL
```

The tested local Preview build used only a non-secret GA test identifier. A
second build with GA and all three Payhip variables absent also completed,
confirming safe missing-variable fallback.

## 3. Local Preview evidence

| Check | Result |
| --- | --- |
| `VERCEL_ENV=preview` production build | Passed; 74 application routes generated. |
| Tool-page response header | `X-Robots-Tag: noindex, nofollow, noarchive` observed. |
| `/robots.txt` | `Disallow: /` observed. |
| Readiness-page robots meta | `noindex, nofollow` observed. |
| Canonical | `https://www.firstchinatripkit.com/tools/china-arrival-readiness-checker` observed; production canonical unchanged. |
| Sitemap | Contains the tool and Bundle routes; does not contain `/growth-dashboard`. |
| Browser smoke at 390px | No horizontal overflow, 24 readiness action buttons, no action below 44px, no console warning/error. |

This is local Preview-mode evidence only. It is not evidence of an externally
reachable Vercel Preview deployment.

## 4. Payhip end-to-end gate

The three requested public configuration names are implemented, with legacy
fallbacks retained for compatibility:

| Product | Configuration | Code / local contract result | Live Payhip result |
| --- | --- | --- | --- |
| Free checklist | `NEXT_PUBLIC_PAYHIP_FREE_CHECKLIST_URL` | CTA and canonical `checklist_download_clicked` event are wired. | Blocked: no verified Preview URL. |
| $7 payment guide | `NEXT_PUBLIC_PAYHIP_PAYMENT_GUIDE_URL` | CTA and `payment_guide_buy_clicked` are wired. | Blocked: no verified Preview URL. |
| $19 Arrival Setup Bundle | `NEXT_PUBLIC_PAYHIP_ARRIVAL_BUNDLE_URL` | Bundle CTA and `arrival_bundle_buy_clicked` are wired; local real PDF preview exists. | Blocked: no verified Preview URL. |

The following required Payhip evidence is **not available**: CTA destination,
product name, price, description, cover, product separation, checkout,
successful test order, success page, delivery email, PDF download through
Payhip, and inventory state. No payment was attempted. A real paid checkout
requires explicit action-time authorization before it can be placed.

## 5. Brevo implementation and live gate

### Implemented server-side contract

- `BREVO_API_KEY` is server-only; it is not exposed to the browser.
- The newsletter route passes source, UTM, consent, readiness aggregate, and
  landing-page data to the server service.
- Existing Brevo contacts are looked up and updated with list membership and
  attributes instead of being blindly duplicated.
- Provider calls time out after 8 seconds and return safe failure messages.
- The readiness, free-checklist, and optional itinerary-review opt-in map to
  `readiness_checker`, `free_checklist`, and `itinerary_review` respectively.
- No passport, bank-card, WhatsApp message, free-text question, or full email
  is sent to GA4. Server code does not log form bodies or full emails.

| Brevo field | Implementation status |
| --- | --- |
| `EMAIL` | Brevo standard contact email field |
| `FIRSTNAME` | Supported |
| `LEAD_SOURCE` | Supported |
| `LEAD_MAGNET` | Supported |
| `READINESS_SCORE` | Supported as integer 0–100 |
| `READINESS_RISK_LEVEL` | Supported as approved aggregate status |
| `UTM_SOURCE`, `UTM_MEDIUM`, `UTM_CAMPAIGN` | Supported |
| `LANDING_PAGE` | Supported |
| `CONSENT_TIMESTAMP` | Supported |

Local mock HTTP tests passed for new-contact create, existing-contact update,
provider failure, approved attributes, and PII exclusion. No actual Brevo
contact was created because the Preview key, list, and Vercel deployment are
not available.

Brevo automation still needs an actual Preview list, the matching custom
attributes, a verified sender, a reply-to mailbox that receives mail, and the
standard unsubscribe block. The configuration runbook is in
[`docs/brevo-welcome-funnel.md`](docs/brevo-welcome-funnel.md).

## 6. Five-email automation gate

The documented production schedule remains:

1. Immediate — checklist or readiness-result delivery.
2. Day 2 — payment setup.
3. Day 4 — essential apps and internet.
4. Day 7 — itinerary and transport.
5. Day 10 — $19 Arrival Setup Bundle.

Every documented link uses `utm_source=brevo`, `utm_medium=email`,
`utm_campaign=arrival_series_v2`, and a message-specific `utm_content`.

**Live result: blocked.** No Preview automation exists, no controlled inbox was
sent the sequence, and no delivery, unsubscribe, reply-to, or UTM-click
evidence exists. If shortened waits are used in Preview, the production waits
above must be restored before a production authorization.

## 7. GA4 instrumentation and DebugView gate

The full trigger and allowed-parameter dictionary is maintained in
[`docs/PHASE_5_EVENT_DICTIONARY.md`](docs/PHASE_5_EVENT_DICTIONARY.md). All
events use only aggregate or acquisition parameters and exclude the prohibited
PII fields.

| Event(s) | Local equivalent evidence | Actual Preview DebugView |
| --- | --- | --- |
| `readiness_checker_started`, `readiness_checker_completed`, `readiness_result_email_submitted` | Browser test completed all 12 answers and captured each once through `window.dataLayer`; completion parameters were `score: 100`, `result_status: ready`, `unresolved_count: 0`. | Blocked: no Preview. |
| `newsletter_subscribed`, `checklist_download_clicked` | Existing form/download wiring and event dictionary contract pass. | Blocked: no Preview. |
| `payment_guide_viewed`, `payment_guide_buy_clicked` | Product view/CTA contract pass. | Blocked: no Preview and no verified Payhip URL. |
| `arrival_bundle_viewed`, `arrival_bundle_buy_clicked` | Bundle view captured in browser test; buy CTA contract pass. | Blocked: no Preview and no verified Payhip URL. |
| `affiliate_link_clicked`, `whatsapp_contact_clicked` | Existing component/unit contracts verify approved privacy-safe parameter sets. | Blocked: no Preview configuration. |
| `itinerary_review_started`, `itinerary_review_submitted` | Browser test captures one start and one successful stubbed submit without form PII. | Blocked: no Preview. |

The local data-layer capture is equivalent dispatch evidence, not GA4
DebugView proof. There are no DebugView screenshots, no measured duplicate
event result, and no desktop/mobile DebugView result because a deployable
Preview has not been created.

## 8. Form security and reliability evidence

| Requirement | Local evidence |
| --- | --- |
| Client and server validation | Client validation plus server routes tested; malformed/unconfigured requests return safe messages. |
| Input limits | Browser limits and server-side per-field checks enforced; a 5,001-character contact question returned `413`. |
| Malicious HTML | Plain-text sanitizer removes tags and control characters; dedicated unit test passed. |
| Anti-spam | Honeypots on newsletter/contact forms; filled newsletter honeypot returned `400`. |
| Duplicate control | Submit buttons disable while requests are pending; Brevo existing-contact mock test updates instead of creating a duplicate. |
| Timeout | Browser requests use 10 seconds; provider requests use 8 seconds. |
| API failure | Unconfigured newsletter and contact API requests returned safe `503` responses. |
| Network interruption | Client catch paths reset the form to a retryable error state; provider mock failure is covered. |
| Refresh safety | Submission state is component-local; no success URL includes email and no automatic resubmit is implemented. |
| Sensitive logs | No `console.log/info/warn/error` in either API route; no full email or form body logging added. |

## 9. SEO, sitemap, and link evidence

- The tool, Bundle, and nine Phase 5 guides use their own metadata, canonical,
  Open Graph data, structured data, breadcrumbs, and internal links.
- The readiness browser suite confirms canonical, JSON-LD, no sensitive input
  names, and sitemap inclusion for the tool and Bundle.
- The growth dashboard remains `noindex, nofollow` and is absent from the
  sitemap.
- Critical browser regression verified 17 legacy redirects and every sitemap
  URL as canonical HTTP 200; no internal link failure was found.
- Preview-mode indexing protection is covered in Section 3.

## 10. Test and quality results

| Gate | Result |
| --- | --- |
| `npm test` | Passed: 70/70. |
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed. |
| Preview-mode production build | Passed. |
| Missing Payhip/GA environment build | Passed. |
| Readiness browser suite | Passed: 7/7, including 390px, 768px, 1440px, 1920px. |
| Existing critical browser regression | Passed: 7/7. |
| API black-box safety checks | Passed: unconfigured `503`, honeypot `400`, overlength `413`. |
| `git diff --check` | Passed. |

### Lighthouse (local Preview-mode build)

| Route | Performance | Accessibility | Best Practices | SEO | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| Readiness Checker | 96 | 100 | 96 | 66 | Preview `noindex` intentionally lowers the SEO category. LCP 2.8s, CLS 0, TBT 40ms. |
| Arrival Setup Bundle | 81 | 100 | 96 | 69 | Preview `noindex` intentionally lowers the SEO category. LCP 5.0s, CLS 0, TBT 40ms. |

These are local lab measurements, not Vercel Preview measurements. The lower
Preview SEO score is expected because the deployment is deliberately blocked
from indexing.

## 11. Known issues and release risks

### P0 — release blockers

1. No Vercel Preview deployment exists because local deployment authentication
   is not valid for the Vercel CLI. Therefore no Preview URL, deployment ID, or
   Vercel build evidence exists.
2. Preview-specific Payhip URLs, Brevo credentials/list/automation, and GA4
   Preview configuration are unavailable. The real integration gates cannot be
   executed.

### P1 — must be closed in the created Preview

1. Payhip product identity, checkout, test order, delivery email, Payhip PDF
   download, and inventory validation.
2. Brevo contact write, duplicate behavior, five live email deliveries,
   unsubscribe, reply-to, and UTM validation with a controlled inbox.
3. GA4 DebugView screenshots and duplicate-event checks for all required
   events on desktop and mobile.

### P2 — follow-up measurement

1. Re-run Lighthouse against the actual Preview after external scripts and
   hosted assets are present; the local Bundle performance score was 81 with a
   5.0s LCP.

## 12. Rollback plan

1. Keep this branch unmerged and do not deploy production.
2. If a future Preview must be withdrawn, remove that Preview deployment in
   Vercel and remove its Preview-only environment assignments; no production
   domain or alias should be changed.
3. Revert only the reviewed Phase 5.1 commit once one exists; do not reset or
   overwrite unrelated working-tree changes.
4. Keep production environment variables unchanged until a separate production
   authorization is given.

## 13. Production recommendation

**Not recommended for production deployment.**

The local implementation and regression gates are green, but the mandatory
external Preview, Payhip, Brevo, and GA4 DebugView gates are not evidenced.
This phase stops here pending human review, valid Preview access, external
configuration, and an explicit production-deployment authorization.
