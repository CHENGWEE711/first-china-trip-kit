# Phase E Commercial and Analytics Audit

Generated: 2026-07-14

## Configuration inventory

- Supabase public URL, anonymous key and server service role are configured for **Production and Preview** in the existing `china-travel-kit` Vercel project.
- Brevo API key is configured for **Production and Preview**; list IDs are configured separately for both environments.
- The free-checklist Payhip URL and paid Payment & Apps Guide URL are configured for **Production only**.
- No environment variable, domain or Vercel project was created or modified in Phase E.

## Functional result

| Surface | Local configured-stub test | Preview expectation | Production validation |
| --- | --- | --- | --- |
| Contact | Success, failure, validation and duplicate-submit prevention pass | Real API available | One controlled test message only if required |
| Newsletter | Success, duplicate and privacy behavior pass | Real API available | Invalid/duplicate-safe check; no disposable subscription left behind |
| Free checklist | Download/fallback path pass | Honest unavailable/fallback if Payhip-only value absent | Existing Payhip target checked without completing checkout |
| Paid guide | Checkout-link state and honest unavailable state pass | Honest unavailable because Preview variable is intentionally absent | Existing Payhip target checked without completing purchase |

Preview cannot directly exercise the two production-only Payhip URLs. This is an environment-scope limitation, not a missing production configuration. The code path is covered by configured tests, Preview must show an honest safe state, and the actual production URLs are checked read-only before merge and again after deployment.

## Analytics

Required event wiring is present for CTA, checklist, checkout, contact, newsletter and tool actions. The visa-free checker now emits `visa_free_checker_completed` once only after all five checks are complete; partial interactions no longer generate duplicate completion events. Automated tests assert one event and no email/message payload leakage.

