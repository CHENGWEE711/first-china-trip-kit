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

## Real-environment evidence

- Preview Contact submitted one clearly marked QA message using the public project address. The button entered a disabled `Saving...` state, the backend returned `Thanks! Your China trip question has been saved.`, fields reset and the button changed to `Message saved`.
- The newsletter endpoint and Brevo/Supabase variables are present for Preview and Production. No real newsletter address was added because this audit cannot remove a test subscriber afterward; invalid/duplicate/privacy behavior remains covered by deterministic integration tests. This limitation is explicit rather than reported as a live subscription success.
- Production Store currently points to public Payhip products `PyGn5` and `Gu2XB`. Browser checks confirmed `China First Trip Checklist` and `China Payment & Apps Setup Guide` load from the First China Trip Kit Payhip shop.
- The free checklist is Pay-What-You-Want: `$0` is accepted, while Payhip displays a `$5` suggested value by default. Store copy now tells visitors to enter `$0` for a free download or leave an optional tip.
- The paid guide is listed at `US$7.00`, describes an 18-page PDF, exposes a real preview and includes delivery/support/disclaimer copy. No cart, checkout, payment or purchase was completed.
- All outbound Payhip product links now add `utm_source=firstchinatripkit`, `utm_medium=website`, `utm_campaign=china_first_trip_launch` and a placement-specific `utm_content`. Internal links remain untagged.

## Analytics

Required event wiring is present for CTA, checklist, checkout, contact, newsletter and tool actions. The visa-free checker now emits `visa_free_checker_completed` once only after all five checks are complete; partial interactions no longer generate duplicate completion events. Automated tests assert one event and no email/message payload leakage.

Vercel's native Web Analytics and Speed Insights are not enabled on the Hobby project. Existing GA and Metricool configuration remains unchanged; Metricool is intentionally production-only, and no duplicate loader is present.

