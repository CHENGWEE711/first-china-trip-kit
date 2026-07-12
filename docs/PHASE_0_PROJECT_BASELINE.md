# Phase 0 — Project Baseline

Baseline date: 2026-07-12 (Asia/Shanghai)

## 1. Project location and structure

- Absolute project path: `/Users/chengwee/Documents/20260704_中国旅游攻略`
- Existing project confirmed; no duplicate project was created.
- Routing structure: Next.js App Router under `app/`.
- Present: `package.json`, `next.config.mjs`, `app/`, `public/`, `docs/`, `.git/`.
- Not present: `pages/`, `vercel.json`.
- Local Vercel link: `.vercel/project.json`.

## 2. Technical stack

Versions below are the installed versions reported by the dependency tree, not estimates.

| Area | Baseline |
| --- | --- |
| Next.js | 16.2.10, App Router, Turbopack production build |
| React | 19.2.7 |
| React DOM | 19.2.7 |
| TypeScript | 5.9.3, strict mode, no emit |
| Tailwind CSS | 3.4.19 |
| Node.js used locally | 22.16.0 |
| Package manager | npm 10.9.2 |
| Lockfile | `package-lock.json`, lockfileVersion 3 |
| UI component library | No full component framework; local React components plus `lucide-react` 0.468.0 for icons |
| Linting | ESLint 9 with `eslint-config-next` |
| Tests | Node.js built-in test runner over `tests/*.test.mjs` |
| Image handling | `next/image`; local WebP/PNG assets under `public/`; explicit responsive `sizes`; image usage/credit audit script |
| Deployment | Vercel Next.js preset; default install command; `npm run build`; no npm production-deploy script |
| Build pre-step | `prebuild` runs `scripts/generate-checklist-pdf.mjs` |

The package manifest uses `latest` ranges for Next.js and React, while the lockfile currently resolves the exact versions shown above.

## 3. Git baseline and recovery point

### State found at the start of Phase 0

- Starting branch: `main`
- Starting commit: `b03e6b541323b418157a8b75bdee4023091a21f6`
- Remote: `origin` → `git@github.com-first-china-trip-kit:CHENGWEE711/first-china-trip-kit.git`
- The working tree contained the completed but uncommitted full-site visual upgrade from the preceding task.
- Changes covered Guide, destination, itinerary, tools/store/essentials UI, explicit image data, local image assets, source documentation, image auditing, and affiliate empty-state tests.
- These changes were inspected and preserved; none were discarded or overwritten.

### Safety actions completed

1. Created recovery branch: `codex/pre-ui-professional-checkpoint`.
2. Committed the pre-existing work as:
   - `664036cd8c9b25ba6e02f074d3cdd0be33b5d7ae`
   - `Checkpoint full-site visual upgrade before professional UI phase`
3. Created and switched to the requested working branch: `ui-professional-upgrade`.
4. Created tag: `ui-before-professional-upgrade` at commit `664036cd8c9b25ba6e02f074d3cdd0be33b5d7ae`.
5. `main` was not advanced; it remains at the original starting commit.

Baseline code commit before this report: `664036cd8c9b25ba6e02f074d3cdd0be33b5d7ae`.

## 4. Vercel association and production state

- Global Vercel CLI: not installed.
- Verification method: official Vercel CLI 55.0.0 run temporarily through `npx`.
- Authenticated Vercel user: `chengwee711-4164`.
- Scope: `chengwee711-4164s-projects`.
- Linked Vercel project: `china-travel-kit`.
- Project ID: `prj_agfyHSZac1ue9VG8nEoCROi6IxCt`.
- Vercel framework preset: Next.js.
- Vercel Node.js setting: 24.x.
- Git provider: GitHub.
- Git repository: `CHENGWEE711/first-china-trip-kit`.
- Production branch: `main`.
- Production domain: `https://www.firstchinatripkit.com`.
- Root domain: `https://firstchinatripkit.com`.
- Root-domain check: HTTP 301 to `https://www.firstchinatripkit.com/`.
- `www` check: HTTP 200.
- Current production deployment:
  - Deployment ID: `dpl_E48oQgWuVB4HDbqxu1w37SuUBUK7`
  - Deployment URL: `https://china-travel-mwaxjy9pk-chengwee711-4164s-projects.vercel.app`
  - Target: Production
  - Status: Ready
  - Created: 2026-07-12 11:59:37 +08:00
- Both root and `www` domains are aliased to that deployment.
- No production deployment was executed during Phase 0.

`vercel domains inspect` reports that the third-party registrar nameservers differ from Vercel's optional intended nameservers. This is informational: the domain is on the Vercel Edge Network, the project association is present, the root redirect works, and the `www` production site returns 200.

The first non-explicit `vercel link --yes` attempt tried to derive a project name from the Chinese directory name and failed validation. Linking was then completed successfully with explicit project and scope arguments. The refreshed local environment file is ignored by Git.

## 5. Build and test baseline

Commands were executed in the project root in the requested order.

| Command | Result |
| --- | --- |
| `npm install` | PASS — up to date, 388 packages audited, 0 vulnerabilities |
| `npm run lint` | PASS — no warnings or errors |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 13/13 tests |
| `npm run build` | PASS — compiled, typechecked and generated 74 routes |

The build detected `.env.local` from the refreshed Vercel link and completed successfully. The production build itself was local only.

## 6. Known baseline issues and constraints

1. `package.json` uses `latest` dependency ranges for Next.js, React and React DOM. The lockfile currently stabilizes exact versions, but a deliberate dependency policy should be considered before future fresh-lock upgrades.
2. Local Node.js is 22.16.0 while the Vercel project is configured for Node.js 24.x. The current build passes locally; aligning runtime versions can be considered in a later approved phase.
3. No global Vercel CLI is installed. Phase 0 verification succeeded with the temporary official CLI.
4. The repository has no `vercel.json`; deployment behavior currently comes from the linked Vercel project, Next.js configuration and Vercel defaults.
5. The registrar uses third-party nameservers rather than Vercel nameservers. Live DNS and redirects are currently healthy.

No baseline error blocks UI work.

## 7. Phase 0 acceptance

- Project directory confirmed: PASS
- Technical stack verified from files and installed dependencies: PASS
- Existing changes preserved in a recoverable commit and branch: PASS
- `ui-professional-upgrade` branch created and checked out: PASS
- `ui-before-professional-upgrade` tag created: PASS
- Vercel project and production state confirmed: PASS
- Root-domain redirect and `www` response verified: PASS
- Lint, typecheck, tests and production build: PASS
- Phase report created: PASS

**Phase 0 status: COMPLETE. The project is eligible to enter Phase 1, but Phase 1 has not been started.**
