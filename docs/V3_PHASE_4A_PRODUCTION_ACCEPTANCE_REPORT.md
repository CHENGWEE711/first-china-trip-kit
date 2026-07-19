# First China Trip Kit V3 Phase 4A — Production Acceptance Report

## 1. Acceptance status

**PASS — V3 Phase 4A has been merged into `main`, deployed to Production, and passed formal-domain acceptance.**

Acceptance completed on `2026-07-19` in `Asia/Shanghai`. This release contains only the approved Phase 4A Social Landing Foundation. Phase 4B and Phase 5 were not started.

## 2. Git and merge record

| Item | Result |
| --- | --- |
| Pre-Phase-4A `main` SHA | `a10fbd3a71eb3a87e48bf092c0026b49f1f6cdcb` |
| Feature branch | `feat/v3-phase4a-social-landing-foundation` |
| Feature branch final SHA | `2ea22f8e7ebe8b917e8fac6cb5543aa1d22eebb2` |
| `main` merge SHA | `a74abdcc18eeaeb387901836f25eeade64f19cae` |
| Production application SHA | `a74abdcc18eeaeb387901836f25eeade64f19cae` |
| Production hotfix SHA | None |
| Merge method | Local `--no-ff` merge, then normal push to `origin/main` |
| Merge commit title | `feat(landing): release V3 phase 4A social landing foundation` |
| Force push | Not used |

The preferred GitHub Pull Request flow was attempted first. The connected GitHub integration returned HTTP `403 Resource not accessible by integration` when creating the PR, so the instruction's authorized local `--no-ff` fallback was used.

The feature branch and remote matched at the final SHA before merge. `origin/main` remained at the audited baseline until the merge. The working tree was clean before the merge, before the `main` push, and before Production deployment.

This report, saved HTTP evidence, and formal-domain screenshots are committed in a documentation-only follow-up after application acceptance. That follow-up changes no runtime source. Its Git SHA and resulting Git-integrated deployment are recorded in the final handoff so the application SHA above remains an unambiguous rollback boundary.

## 3. Final Preview gate

| Item | Result |
| --- | --- |
| Preview URL | <https://china-travel-c3jkld07b-chengwee711-4164s-projects.vercel.app> |
| Deployment ID | `dpl_GqbZUWYE8KzV6LobvgDtiHy5o6Ws` |
| Deployment commit | `2ea22f8e7ebe8b917e8fac6cb5543aa1d22eebb2` |
| Target | Preview |
| Status | Ready |
| Created | `2026-07-19 18:24:36 CST` |

The protected Preview kept the existing Vercel Authentication configuration. No protection setting was disabled, and no cookie, storage state, JWT, or bypass secret was committed.

Preview acceptance results:

- Three approved Landing routes returned HTTP 200.
- `/landing/not-approved` returned HTTP 404.
- `sitemap.xml` and `robots.txt` returned HTTP 200.
- Each Landing had one H1, independent metadata, self canonical, Open Graph, Twitter Card, `WebPage`, `BreadcrumbList`, `FAQPage`, and a visible breadcrumb.
- Application HTML did not include `noindex`. Vercel's protected Preview correctly supplied its platform-level `x-robots-tag: noindex`; Production does not.
- Payment-to-Checklist focus reached `#free-checklist`.
- Visa-to-route-checker focus reached `H2#route-check-heading`.
- No direct PDF link was exposed on the three Landing pages.

## 4. Vercel Production deployment

| Item | Result |
| --- | --- |
| Vercel project | `china-travel-kit` |
| Production deployment URL | <https://china-travel-q5gre9chr-chengwee711-4164s-projects.vercel.app> |
| Deployment ID | `dpl_7VzuzmL9oGW6EmR6G6ny1J5ibnuJ` |
| Target | Production |
| State | Ready |
| Created | `2026-07-19 18:39:34 CST` |
| Deployment Git ref | `main` |
| Deployment Git SHA | `a74abdcc18eeaeb387901836f25eeade64f19cae` |
| Automatic deployment | Yes, triggered by the existing Git integration after `main` was pushed |
| Manual `vercel deploy --prod` | Not needed |

Vercel's authenticated deployment API reports the exact accepted merge SHA. No new Vercel project, duplicate deployment workflow, domain, DNS, environment variable, or Analytics configuration was created or changed.

## 5. Production aliases and apex redirect

The accepted deployment owns the existing aliases:

- <https://www.firstchinatripkit.com>
- <https://firstchinatripkit.com>
- <https://china-travel-kit.vercel.app>
- `china-travel-kit-git-main-chengwee711-4164s-projects.vercel.app`
- `china-travel-kit-chengwee711-4164s-projects.vercel.app`

`https://firstchinatripkit.com/` returns HTTP 301 to `https://www.firstchinatripkit.com/`.

## 6. Formal-domain HTTP acceptance

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/landing/pay-in-china` | 200 |
| `/landing/china-visa-free` | 200 |
| `/landing/china-checklist` | 200 |
| `/landing/not-approved` | 404 |
| `/payments-and-apps` | 200 |
| `/visa-free-transit` | 200 |
| `/start-here` | 200 |
| `/thank-you` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/china-first-time-visitor-checklist.pdf` | 200 |
| Apex `/` | 301 to www |

Both cURL and Playwright request contexts independently confirmed the three approved 200 responses and the unapproved 404 response.

## 7. No-cache and cache-header evidence

Formal-domain responses were saved with `Cache-Control: no-cache` and `Pragma: no-cache` under [`production-verification/v3-phase4a/`](production-verification/v3-phase4a/).

| Resource | HTTP | Age | Cache-Control | Vercel cache | ETag |
| --- | ---: | ---: | --- | --- | --- |
| Pay Landing | 200 | 28 | `public, max-age=0, must-revalidate` | HIT | `W/"c081113287ceaad480997bda52d7ed7b"` |
| Visa Landing | 200 | 28 | `public, max-age=0, must-revalidate` | HIT | `W/"19a919f33c85fe66eb510fac4ab56290"` |
| Checklist Landing | 200 | 28 | `public, max-age=0, must-revalidate` | HIT | `W/"b03d6a6c7717715e1495e202b68cf7b1"` |
| Sitemap | 200 | 20 | `public, max-age=0, must-revalidate` | HIT | `W/"aa5c20bc102af79c86d4c228db3758aa"` |
| Robots | 200 | 20 | `public, max-age=0, must-revalidate` | HIT | `"cfeafca7945ee94b2637eff0bc9963b8"` |

The saved header files also contain the exact `x-vercel-id` values. Production responses do not contain the Preview-only `x-robots-tag: noindex` header.

## 8. Landing Production state and SEO

| Landing | H1 | Canonical | Structured data | Result |
| --- | ---: | --- | --- | --- |
| Pay in China | 1 | `https://www.firstchinatripkit.com/landing/pay-in-china` | `WebPage`, `BreadcrumbList`, `FAQPage` | Pass |
| China Visa-Free | 1 | `https://www.firstchinatripkit.com/landing/china-visa-free` | `WebPage`, `BreadcrumbList`, `FAQPage` | Pass |
| China Checklist | 1 | `https://www.firstchinatripkit.com/landing/china-checklist` | `WebPage`, `BreadcrumbList`, `FAQPage` | Pass |

Each page has its own title, description, self canonical, Open Graph metadata, Twitter Card metadata, and visible breadcrumb. None contains a `noindex` meta tag. The Landing canonicals do not replace the Payments Hub, Visa Hub, or detailed Visa Guide canonicals.

## 9. Sitemap and robots

- `/landing/pay-in-china`: exactly one sitemap occurrence.
- `/landing/china-visa-free`: exactly one sitemap occurrence.
- `/landing/china-checklist`: exactly one sitemap occurrence.
- No fourth Landing appears in the sitemap.
- `robots.txt` contains `Allow: /` and does not block `/landing`.
- `dynamicParams = false` and the slug allowlist keep unapproved Landing URLs at 404.

## 10. Formal-domain funnel and CTA acceptance

| Path | Verified result |
| --- | --- |
| Pay Landing → Open Payments Hub | Reached `/payments-and-apps`; H1 `Set Up China Before You Land` |
| Pay Landing → Download Checklist | Reached `/landing/china-checklist#free-checklist`; focus moved to `#free-checklist`; no PDF opened |
| Visa Landing → Check My Route | Reached `/visa-free-transit#route-check`; focus moved to `H2#route-check-heading` |
| Visa Landing → Read Visa Guide | Reached `/guides/china-240-hour-visa-free-transit-guide`; detailed Guide identity preserved |
| Checklist Landing → Download Free Checklist | Focus moved to `#free-checklist`; Newsletter form visible; no direct PDF link |
| Checklist Landing → Explore Start Here | Reached `/start-here`; H1 `Eight steps before your first China trip` |

All internal Landing links remained free of UTM parameters.

## 11. Newsletter Production safety and acceptance

The Phase 4A change did not alter the existing Newsletter API or Brevo service implementation.

Production-safe verification included:

- A real formal-domain POST with an invalid email returned HTTP 400 and `Please enter a valid email address.` without contacting a subscriber provider.
- A honeypot POST returned HTTP 400 and `Subscription could not be completed.` without creating a contact.
- The live Production page completed the success client flow in all six Playwright projects using a request interception, reached `/thank-you`, exposed the download flow only after success, and did not send the synthetic test email to an external provider.
- A live-page failure simulation returned HTTP 503. The URL remained on `#free-checklist`, `aria-invalid="true"` was set, `aria-describedby` pointed to the visible alert, the completion event count remained zero, and no PDF link appeared.
- The honeypot remains outside the keyboard order and accessibility tree while still being rejected by the server.

**Production Newsletter endpoint and client flow verified, but no permanent subscriber was created during acceptance.**

No customer email, personal email, or third-party address was used.

## 12. Production Analytics and privacy

Production-only behavior was independently verified in a clean Chromium session:

- One GA loader and one GA initialization script.
- One Metricool initialization script and one Metricool external loader.
- `window.gtag` is a function.
- `window.beTracker.t` is a function.
- No Console or page errors.
- Preview and localhost omit both Production trackers.

The UTM acceptance URL used `utm_source=tiktok`, `utm_medium=organic`, `utm_campaign=phase4a_acceptance`, and `utm_content=test_control`.

Actual Production `dataLayer` results:

| Event | Count | Allowed payload |
| --- | ---: | --- |
| `landing_view` | 1 | `landing_name=pay_in_china`, `traffic_source=tiktok`, `interaction_type=view` |
| `landing_hub_clicked` | 1 | `landing_name=pay_in_china`, `traffic_source=tiktok`, `cta_name=open_payments_hub`, `interaction_type=click` |

The event payloads contained no raw campaign, raw content, email, passport, destination URL, query string, form value, or user-entered text. Internal links contained no appended UTM values. Newsletter completion was emitted only after a successful response; the simulated Production failure emitted zero completion events.

The Landing analytics sanitizer is a positive allowlist for event names, parameter names, and values. It does not rely on a blacklist.

## 13. Accessibility, focus, and responsive acceptance

- Payment-to-Checklist focus: `#free-checklist`.
- Visa-to-checker focus: `H2#route-check-heading`.
- Newsletter failure text is associated with the input by `aria-describedby` and `aria-invalid`.
- Keyboard CTA and FAQ behavior passed.
- 1440px, 390px, and 320px routes have zero horizontal overflow.
- All screenshot runs reported zero broken images, zero pending images, zero Console errors, and zero page errors.
- Mobile copy, CTA labels, Newsletter controls, FAQ, related cards, and Footer remain readable and are not clipped or covered.

## 14. Formal-domain screenshots

All screenshots were generated from `https://www.firstchinatripkit.com` after scrolling through the page and waiting for every lazy image to finish loading.

| Evidence | File |
| --- | --- |
| Pay 1440 | [`pay-in-china-1440.png`](screenshots/v3-phase4a-production/pay-in-china-1440.png) |
| Pay 390 | [`pay-in-china-390.png`](screenshots/v3-phase4a-production/pay-in-china-390.png) |
| Pay 320 | [`pay-in-china-320.png`](screenshots/v3-phase4a-production/pay-in-china-320.png) |
| Visa 1440 | [`china-visa-free-1440.png`](screenshots/v3-phase4a-production/china-visa-free-1440.png) |
| Visa 390 | [`china-visa-free-390.png`](screenshots/v3-phase4a-production/china-visa-free-390.png) |
| Visa 320 | [`china-visa-free-320.png`](screenshots/v3-phase4a-production/china-visa-free-320.png) |
| Checklist 1440 | [`china-checklist-1440.png`](screenshots/v3-phase4a-production/china-checklist-1440.png) |
| Checklist 390 | [`china-checklist-390.png`](screenshots/v3-phase4a-production/china-checklist-390.png) |
| Checklist 320 | [`china-checklist-320.png`](screenshots/v3-phase4a-production/china-checklist-320.png) |
| Checklist focus | [`checklist-newsletter-focus.png`](screenshots/v3-phase4a-production/checklist-newsletter-focus.png) |
| Visa checker focus | [`visa-route-focus.png`](screenshots/v3-phase4a-production/visa-route-focus.png) |

## 15. Test and build results

### Feature branch final gate

| Check | Result |
| --- | --- |
| `npm install` | Pass; 392 packages audited; 0 vulnerabilities; no dependency change |
| Lint | Pass |
| TypeScript | Pass |
| Unit tests | 63 passed, 0 failed, 0 skipped |
| Build | Pass; 62 generated pages; three approved Landing routes SSG |
| Full Playwright | 1,032 passed, 0 failed, 0 skipped |
| Phase 4A Playwright | 90 passed, 0 failed, 0 skipped |
| Image audit | Pass; 91 images; 0 errors; 2 warnings |
| `git diff --check` | Pass |

### Post-merge `main` gate

| Check | Result |
| --- | --- |
| Lint | Pass |
| TypeScript | Pass |
| Unit tests | 63 passed, 0 failed, 0 skipped |
| Build | Pass; 62 generated pages |
| Full Playwright | 1,032 passed, 0 failed, 0 skipped |
| Phase 4A Playwright | 90 passed, 0 failed, 0 skipped |
| Image audit | Pass; 91 images; 0 errors; 2 warnings |
| `git diff --check` | Pass |

### Production formal-domain Playwright

`PLAYWRIGHT_BASE_URL=https://www.firstchinatripkit.com npx playwright test tests/landing`

- 90 passed.
- 0 failed.
- 0 skipped.
- Chromium desktop, Chromium mobile, Chromium 320px, WebKit desktop, WebKit mobile, and Firefox desktop.
- Real formal-domain pages were used; no mock page was substituted.
- Newsletter success/failure network effects were intercepted only to prevent an external subscriber side effect.
- Supplemental Playwright checks independently confirmed the approved 200 responses, the unapproved 404 response, the safe Newsletter failure state, and zero completion event on failure.

The final 0-skip collection design retains all 1,032 previously executed assertions. Thirty-five historical single-project checks now carry explicit project tags, while the original runtime `test.skip` guards remain as mismatch protection. No assertion, threshold, timeout, retry, or test body was weakened or removed.

## 16. Image audit

The image audit passed with 91 unique local images and zero errors. The two non-blocking warnings are pre-existing unused Homepage assets:

- `/images/home/phase-d/first-trip-phone-metro-hero.webp`
- `/images/home/phase-d/first-trip-phone-metro-og.webp`

Phase 4A reuses three licensed, local Guide photographs and introduces no public AI-generated travel image or unlicensed app logo.

## 17. Independent reviews

- Scope and security audit: P0 0, P1 0, P2 0.
- Preview HTTP/SEO audit: pass.
- Final test-routing review: P0 0, P1 0, P2 0.
- No fourth Landing, Phase 4B module, Phase 5 feature, database, migration, new runtime dependency, credential, auth state, or bypass secret was found.

## 18. Known non-blocking items

1. No permanent Newsletter subscriber was created; this is an intentional safety boundary documented above.
2. The two unused-image warnings are pre-existing and do not affect public rendering.
3. A pre-final WebKit checklist navigation check had one timing-only failure. The isolated rerun, full Phase 4A confirmation, final feature run, post-merge run, and Production run all passed. No assertion was relaxed.
4. Real-traffic Core Web Vitals require field data after release. Synthetic acceptance found no new dependency, hydration error, horizontal overflow, broken image, or Console/page error.

## 19. Rollback boundary

| Boundary | Value |
| --- | --- |
| Pre-Phase-4A `main` | `a10fbd3a71eb3a87e48bf092c0026b49f1f6cdcb` |
| Phase 4A merge | `a74abdcc18eeaeb387901836f25eeade64f19cae` |
| Production hotfix | None |
| Previous Production deployment | `dpl_H2RerHm65hhvrR4tZBSUvfPncFvJ` / `china-travel-f2ystxn38-chengwee711-4164s-projects.vercel.app` |
| Accepted Production deployment | `dpl_7VzuzmL9oGW6EmR6G6ny1J5ibnuJ` / `china-travel-q5gre9chr-chengwee711-4164s-projects.vercel.app` |

If a Production P0 is discovered, `a74abdcc18eeaeb387901836f25eeade64f19cae` is the Phase 4A change boundary to revert. The rollback target is the pre-Phase 4A application SHA `a10fbd3a71eb3a87e48bf092c0026b49f1f6cdcb` or the previous accepted deployment `dpl_H2RerHm65hhvrR4tZBSUvfPncFvJ`, applied through a new revert commit or a Vercel deployment rollback. The rollback must not delete or overwrite Phase 1–3 work.

## 20. Scope stop

Phase 4B was not started. No Phase 4B architecture report, dashboard, attribution engine, A/B system, additional Landing, Phase 5 work, destination expansion, AI planner, account, community, Vercel project, domain, DNS, or environment-variable change was created.

This report completes Phase 4A Production acceptance. Work stops here pending independent review.
