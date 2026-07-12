# Phase 1 — Plugin and Test Tooling Setup Report

Date: 2026-07-12  
Project: `/Users/chengwee/Documents/20260704_中国旅游攻略`  
Branch: `ui-professional-upgrade`  
Baseline commit before Phase 1: `ef1c8bbdad62453dff5fffade24ab9dda0acb66c`

## Scope and outcome

Phase 1 configured and verified the Figma and Playwright toolchain. No website UI was changed. The official Figma integration was already installed and authorized, so no reinstall or session restart was required. Playwright was added to the project and its Chromium desktop/mobile smoke suite passes all 18 cases.

## Installed Codex plugin inventory

The table below is based on plugin manifests actually present under `~/.codex/plugins/cache`. Capability names are the permissions declared by each manifest; `Not enumerated` means the manifest did not expose a capability list and is not an inferred permission.

| Installed plugin | Version | Publisher | Manifest-requested capabilities |
| --- | --- | --- | --- |
| Browser | 26.707.41301 | OpenAI | Interactive, Read, Write |
| Chrome | 26.707.41301 (`latest` cache alias also present) | OpenAI | Interactive, Read |
| Computer Use | 1.0.1000366 | OpenAI | Not enumerated; plugin description covers Mac app control and screen/page inspection |
| Sites | 0.1.27 | OpenAI | Interactive, Write |
| Visualize | 1.0.11 | OpenAI | Interactive, Read, Write |
| Build Web Apps | 0.1.2 | OpenAI | Interactive, Read, Write |
| Build Web Data Visualization | 0.1.21 | OpenAI | Interactive, Read, Write |
| Figma | 2.0.14 | Figma | Interactive, Read, Write; OAuth connection to `https://mcp.figma.com/mcp` |
| Canva | 9.0.0 | Canva Pty Ltd. | Not enumerated |
| GitHub | 0.1.8-2841cf9749ae | OpenAI | Interactive, Write |
| Gmail | 0.1.5 | OpenAI | Interactive, Write |
| OpenAI Templates | 0.1.0 | OpenAI | Interactive, Write |
| Documents | 26.709.11516 | OpenAI | Interactive, Write |
| PDF | 26.709.11516 | OpenAI | Interactive, Write |
| Presentations | 26.709.11516 | OpenAI | Interactive, Write |
| Spreadsheets | 26.709.11516 | OpenAI | Interactive, Write |
| Template Creator | 26.709.11516 | OpenAI | Interactive, Write |
| `app-69d73fc8aa5c8191bec1583760b130c7` | 1.0.0 | Metricool Software S.L. | Not enumerated |

Relevant tooling found:

- Figma design integration: official Figma plugin, installed and authorized.
- Frontend/Web App development: official OpenAI Build Web Apps plugin is genuinely present.
- Browser and UI testing: official OpenAI Browser plugin and Chrome plugin are present; Browser was used to load the local capture URL.
- UI test runner: no standalone Codex UI-testing plugin was found; project-level Playwright now supplies this capability.
- Accessibility testing: no standalone accessibility-testing plugin was found. The directory `tests/accessibility/` is prepared, but no unverified third-party plugin was installed.

No unknown-source plugin was installed during this phase.

## Figma installation and authorization

| Item | Result |
| --- | --- |
| Official plugin found | Yes — Figma 2.0.14, publisher Figma, repository declared as `openai/plugins` |
| Installed | Yes — already installed before Phase 1 |
| Authorized | Yes — `whoami` returned the active WEE CHENG account and team |
| Manual authorization required | No |
| Codex restart required | No; all required tools were exposed and callable in the current session |
| Test file | [First China Trip Kit — Phase 1 Capability Test](https://www.figma.com/design/ech0DCD4SHlWHo7rNkVEXk) |

## Figma capability verification

Every `Available` status below is based on an actual successful tool call, not tool discovery alone.

| Capability | Status | Verification evidence |
| --- | --- | --- |
| Read a Figma file | Available | Read page metadata from file `ech0DCD4SHlWHo7rNkVEXk`, page node `0:1` |
| Create a Figma file | Available | Created the Phase 1 capability test file |
| Create a Frame | Available | Created frame node `1:4` |
| Write text and layers | Available | Created text node `1:5` inside the frame |
| Read components | Available | Created component node `1:6`, then read it back as a component/symbol in metadata |
| Read Variables | Available | Created collection `VariableCollectionId:1:2` and variable `VariableID:1:3`; read `Color/Accent = #b53b33` from the bound component |
| Get design context | Available | Retrieved generated React/Tailwind context and a rendered preview for frame `1:4` |
| Capture a webpage to Figma | Available | Captured the local homepage into node `2:2`; the temporary capture script was removed immediately afterward |
| Get a Figma node link | Available | Frame: `https://www.figma.com/design/ech0DCD4SHlWHo7rNkVEXk?node-id=1-4`; capture: `https://www.figma.com/design/ech0DCD4SHlWHo7rNkVEXk?node-id=2-2` |

Unavailable Figma capabilities: none among the requested checks.  
Capabilities requiring manual authorization: none in this session.

## Playwright setup

| Item | Result |
| --- | --- |
| Package manager | npm only |
| Before installation | `npm ls @playwright/test` returned empty; `npx playwright --version` resolved 1.61.1 temporarily |
| Installed package | `@playwright/test@1.61.1` as a development dependency |
| Browser installed | Chromium via `npx playwright install chromium` |
| Configuration | `playwright.config.ts` |
| Report | List + HTML (`playwright-report/`, ignored by Git) |
| Failure artifacts | Screenshot only on failure, trace retained on failure, video retained on failure |
| Projects | Chromium desktop at 1440×900 and Chromium mobile using the iPhone 13 device profile |
| Local server | `npm run dev` at `http://localhost:3000`, 60-second startup limit |
| Test timeout | 30 seconds; expectation timeout 5 seconds; navigation timeout 15 seconds; action timeout 10 seconds |

Prepared test directories:

- `tests/visual/`
- `tests/responsive/`
- `tests/accessibility/`
- `tests/live/`

## Smoke test coverage and result

Test file: `tests/live/smoke.spec.ts`

Routes covered:

- `/`
- `/start-here`
- `/city-kits`
- `/itinerary-kits`
- `/guides`
- `/travel-essentials`
- `/tools`
- `/store`
- `/about`

Checks run on every route:

- Document response exists and status is below 400.
- Exactly one H1 is present.
- The document has no horizontal overflow.
- Visible, above-the-fold main-content images complete with a non-zero natural width.
- No browser console error or uncaught page error is emitted.

Run history:

1. Initial run: 18 failed. Desktop cases exposed a `127.0.0.1` versus `localhost` Next.js HMR origin mismatch; mobile cases exposed the iPhone preset's default WebKit selection. Configuration was corrected to use localhost and Chromium explicitly.
2. Second run: 11 passed, 7 failed. The test was requesting every lazy image across long pages concurrently, which exceeded the requested “main images” scope and caused image-optimization timeouts. The check was narrowed to visible above-the-fold main images.
3. Final required run: **18 passed, 0 failed** in 8.6 seconds (9 routes × 2 Chromium projects).

Additional verification:

- `npm run lint`: passed.
- `npm run typecheck`: passed after explicitly narrowing queried DOM elements to `HTMLImageElement` in the test.
- `npm test`: 13 passed, 0 failed.

## Known issues and unavailable plugins

- Next.js development output reports non-fatal LCP suggestions for several above-the-fold images that do not declare eager loading. They did not fail the smoke suite; no UI or image behavior was changed in this phase.
- The test process prints a non-fatal `NO_COLOR`/`FORCE_COLOR` environment warning.
- No standalone official accessibility-testing plugin was present in the installed directory. No third-party substitute was installed because its source and permissions were not established. Accessibility test implementation remains future work; only its directory was prepared.
- No standalone Codex UI-testing plugin was present. This is not blocking because Playwright 1.61.1 is installed and verified locally.
- No plugin installation failed. Figma and the relevant official OpenAI plugins were already installed.

## Phase 1 acceptance

- Figma connection: verified.
- Playwright installed: yes.
- Base test configuration runnable: yes.
- Smoke test has a real result: 18 passed, 0 failed.
- Phase report generated: yes.
- Website UI changed: no.

**Phase 1 acceptance status: PASS. The project is eligible to enter Phase 2 only after the user authorizes the next stage.**
