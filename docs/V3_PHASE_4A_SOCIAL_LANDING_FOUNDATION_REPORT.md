# First China Trip Kit V3 Phase 4A — Social Landing Foundation Report

## Status

V3 Phase 4A development and Preview validation are complete. The implementation is awaiting formal acceptance. No Production deployment, Production alias change, domain change, or Phase 5 work was performed.

## Git and deployment evidence

| Item | Result |
| --- | --- |
| Starting SHA | `a10fbd3a71eb3a87e48bf092c0026b49f1f6cdcb` |
| Implementation SHA | `a686275` |
| Branch | `feat/v3-phase4a-social-landing-foundation` |
| Vercel project | `china-travel-kit` |
| Deployment ID | `dpl_AfY5hAFVMnuRC47BCw6mGuLagSTH` |
| Deployment target | Preview |
| Deployment state | Ready |
| Preview URL | <https://china-travel-78kpbahca-chengwee711-4164s-projects.vercel.app> |
| Vercel inspector | <https://vercel.com/chengwee711-4164s-projects/china-travel-kit/AfY5hAFVMnuRC47BCw6mGuLagSTH> |
| Production aliases | Still mapped to the prior Production deployment `china-travel-f2ystxn38-chengwee711-4164s-projects.vercel.app` |

The Preview remains protected by the existing Vercel Authentication setting. A team-authorized Vercel login is required to review it. The automated browser matrix used a temporary, Preview-domain-only cookie; no credential, cookie, storage-state file, or bypass secret is present in Git.

## Scope delivered

Exactly three Landing routes were created:

| Route | Purpose | Primary CTA | Secondary CTA |
| --- | --- | --- | --- |
| `/landing/pay-in-china` | Move payment-intent traffic into the Payments & Essential Apps Hub | Open Payments Hub | Download Checklist, routed through the Checklist Landing |
| `/landing/china-visa-free` | Move transit-intent traffic into the Visa-Free Transit Hub | Check My Route | Read Visa Guide |
| `/landing/china-checklist` | Generate checklist Newsletter subscribers | Download Free Checklist | Explore Start Here |

The dynamic Landing route is statically generated only for these three approved slugs. `dynamicParams = false` makes an unapproved Landing slug return 404.

No destination expansion, Phase 5 module, AI planner, account, community, membership, automatic policy scraper, or Production release was introduced.

## Reusable Landing system

The shared page composes these reusable components:

- `LandingHero`
- `LandingBreadcrumb`
- `LandingQuickAnswer`
- `LandingBenefitGrid`
- `LandingTrustSection`
- `LandingPrimaryCTA`
- `LandingHubPreview`
- `LandingFAQ`
- `LandingRelatedContent`
- `LandingNewsletter`
- `LandingFooterCTA`
- `LandingTrackedLink`
- `LandingAnalytics`

Content and CTA configuration live in `data/landings.ts`. The UI uses the existing Source Serif 4, Inter, warm paper, ember red, sage, ink, spacing, button, Header, Footer, Guide-image, and responsive systems from Phases 1–3.

## Funnel behavior

The locked funnel is preserved:

`Traffic → Landing → Product Hub → Checklist Landing → Newsletter → Thank-you download → Paid Guide`

The payment Landing no longer links directly to the PDF. Its “Download Checklist” action enters `/landing/china-checklist#free-checklist`, where focus moves to the Newsletter section. The actual free PDF remains available after successful signup on the existing thank-you flow.

Internal links do not add UTM parameters. Incoming `utm_source` is reduced to an approved traffic-source category for analytics; campaign names, content values, user input, and destination details are not emitted.

## SEO

Each Landing has:

- a unique title and description;
- a self-referencing canonical on `https://www.firstchinatripkit.com`;
- independent Open Graph and Twitter Card metadata;
- one H1;
- `WebPage` JSON-LD;
- `BreadcrumbList` JSON-LD;
- a breadcrumb in the rendered UI.

The three Landing URLs are generated from the shared data source into `sitemap.xml`. `robots.txt` does not block `/landing`. Existing Hub and Guide canonicals are unchanged, so the Landing pages do not replace their search intent.

## Analytics and privacy

The shared runtime sanitizer accepts only these events:

- `landing_view`
- `landing_cta_clicked`
- `landing_checklist_download`
- `landing_hub_clicked`
- `landing_newsletter_signup`

It accepts only these parameter keys:

- `landing_name`
- `traffic_source`
- `cta_name`
- `interaction_type`

The tests confirm that email, country, location, passport, destination URL, campaign name, and user input are not sent. `landing_view` is deduplicated per Landing name, so a future client-side transition between Landing pages will still record the new Landing.

GA and Metricool now load only in Vercel Production. This prevents Preview/local traffic from polluting Production analytics and avoids Preview-domain cookie errors. Preview analytics were verified with a browser recorder that captures the exact sanitized event payloads without sending live analytics traffic.

## Accessibility and responsive behavior

- Keyboard access, visible focus, native FAQ disclosure behavior, and reduced-motion behavior were verified.
- The Visa Landing CTA moves focus to `H2#route-check-heading` after cross-page hash navigation.
- The Checklist CTA moves focus into `#free-checklist`.
- Newsletter validation sets `aria-invalid` and connects its error text through `aria-describedby`.
- The text honeypot remains useful for spam filtering but is excluded from the accessibility tree with `aria-hidden`, `inert`, zero dimensions, and `tabIndex=-1`.
- Breadcrumb and image-caption contrast were increased from `ink/55` to `ink/70`.
- Primary controls clear the 44px target-size check.
- 390px and 320px tests found no horizontal overflow.

## Performance and images

The pages are SSG and use local policy/content data. No new runtime dependency, map SDK, remote content API, heavy state manager, or duplicated production image was added. The Landing framework is server-first; client JavaScript is limited to analytics, tracked actions, Newsletter behavior, and hash-focus support.

Production imagery reuses three existing, licensed, locally stored Phase C photographs through `next/image`:

- `/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp`
- `/images/guides/phase-c/china-240-hour-visa-free-transit-guide/hero.webp`
- `/images/guides/phase-c/china-travel-checklist-before-you-fly/hero.webp`

The concept images under `docs/screenshots/v3-phase4a/concepts/` were used only as layout references. No generated travel image appears in the public pages.

Image audit result: 91 unique local images, 0 errors, and 2 pre-existing unused-asset warnings.

## Validation results

| Check | Result |
| --- | --- |
| `npm install` | Pass; dependencies already current, 0 vulnerabilities |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm test` | 63 passed, 0 failed, 0 skipped |
| `npm run build` | Pass; 62 generated pages, including 3 SSG Landings |
| Final Preview Playwright | 90 passed, 0 failed, 0 skipped, 6 browser/device projects |
| Phase 4A skip/focus scan | No `.skip`, `.only`, or `.fixme` |
| Image audit | Pass; 91 images, 0 errors, 2 warnings |
| `git diff --check` | Pass |
| Broken internal links | Pass |
| Browser console/page errors | 0 on all three Landings |
| Newsletter flow | Pass with a mocked success response; no live subscriber side effect |

The six final Playwright projects were Chromium desktop, Chromium mobile, Chromium 320px, WebKit desktop, WebKit mobile, and Firefox desktop.

The existing whole-repository Playwright suite also completed successfully earlier in the implementation cycle. Its historical project-conditional skips remain unchanged; none belong to the new Phase 4A suite.

## Preview HTTP evidence

| URL | Result |
| --- | --- |
| `/landing/pay-in-china` | 200; one H1; canonical, OG, Twitter, JSON-LD present |
| `/landing/china-visa-free` | 200; one H1; canonical, OG, Twitter, JSON-LD present |
| `/landing/china-checklist` | 200; one H1; canonical, OG, Twitter, JSON-LD present |
| `/landing/not-approved` | 404 |
| `/sitemap.xml` | 200; exactly three approved Landing URLs |
| `/robots.txt` | 200; `/landing` is allowed |

## Screenshots

| Page | 1440px | 390px |
| --- | --- | --- |
| Pay in China | [Desktop](screenshots/v3-phase4a/preview/pay-in-china-1440.png) | [Mobile](screenshots/v3-phase4a/preview/pay-in-china-390.png) |
| China Visa-Free | [Desktop](screenshots/v3-phase4a/preview/china-visa-free-1440.png) | [Mobile](screenshots/v3-phase4a/preview/china-visa-free-390.png) |
| China Checklist | [Desktop](screenshots/v3-phase4a/preview/china-checklist-1440.png) | [Mobile](screenshots/v3-phase4a/preview/china-checklist-390.png) |

## Concept-to-implementation fidelity ledger

| Reference decision | Implemented result |
| --- | --- |
| Split editorial Hero on desktop | Text/CTA left, real task-specific image right |
| Text-first mobile Hero | Question, answer, and CTA remain first; image follows without overflow |
| Warm cream, paper, ink, ember, sage palette | Existing V3 tokens reused without a duplicate theme |
| Open editorial sections | Borders, whitespace, and numbered rows replace a wall of generic cards |
| One obvious conversion path | Repeated primary CTA points to the same Hub or Checklist action |
| Real travel-task imagery | Licensed local checkout, transit, and document photographs used |
| Short-form answer before depth | Hero copy answers the question immediately; Quick Answer reinforces it |
| Reusable desktop/mobile composition | One data-driven framework renders all three themes and both viewports |

## Independent review

Final independent code review found 0 P0 and 0 P1 issues. It confirmed that no Vercel bypass header or secret is globally attached to Playwright requests, no credential is present in Git, the Preview cookie is domain-limited, and the text honeypot is retained safely.

Final independent UX/accessibility review found 0 P0 and 0 P1 issues. It confirmed correct cross-page focus, readable contrast, one accessible Newsletter textbox, keyboard order, no overflow, no broken image, no console error, and correct funnel routing.

## Known limitations and acceptance items

1. The Preview requires an authorized Vercel login because the existing project-level Preview protection remains enabled.
2. Automated Newsletter validation mocks a successful API response to avoid creating a real subscriber. The existing Production endpoint and Brevo configuration were not changed.
3. Real GA and Metricool network calls are intentionally absent from Preview and are enabled only in Vercel Production.
4. The global ember focus outline is fully clear on the Landing content and primary controls. On the darkest Footer background, a future all-site accessibility pass could adopt a two-color outline for additional contrast margin; this is not a Phase 4A P0/P1 issue.
5. Production Core Web Vitals require real traffic after release; this phase verifies static rendering, responsive image use, no new heavy dependency, no overflow, and no hydration/console error.

Changed-files evidence: [V3_PHASE_4A_CHANGED_FILES.txt](V3_PHASE_4A_CHANGED_FILES.txt)

## Stop condition

Phase 4A is stopped at Preview as required. No Production deployment has been performed, and Phase 5 has not started.
