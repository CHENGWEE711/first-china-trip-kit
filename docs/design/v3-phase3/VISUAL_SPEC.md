# V3 Phase 3 Visa-Free Transit Hub — Visual Specification

Status: implementation baseline  
Date: 2026-07-18

## Reference surfaces

Phase 3 extends the already accepted Phase 1 and Phase 2 visual system. The primary references are:

- `docs/screenshots/v3-phase1/after/homepage-1440.png`
- `docs/screenshots/v3-phase1/after/homepage-390.png`
- `docs/design/v3-phase2/payment-hub-top-concept.png`
- `docs/design/v3-phase2/payment-hub-core-tools-concept.png`
- `docs/screenshots/v3-phase2-production/payment-hub-1440.png`
- `docs/screenshots/v3-phase2-production/payment-hub-390.png`

Two attempts to generate an additional Phase 3 concept through the approved Image Generation workflow failed with the same upstream network error. No alternative AI-generated travel imagery or unapproved CLI workflow is used. This specification therefore treats the accepted Phase 1/2 concepts as the binding visual reference.

## Design direction

- Tone: calm, practical, trustworthy and official-source-led without resembling a government service.
- Title type: Source Serif 4 through the existing editorial font token.
- Body and controls: Inter through the existing sans-serif token.
- Accent: existing warm ember red for primary action and active structure.
- Primary text/surface contrast: existing dark ink and paper.
- Supporting colors: existing sand, mist and jade. Result meaning is always repeated with an icon, title and text.
- Shape: existing small 6–8px radii; no giant rounded containers.
- Depth: hairline borders and restrained shadows only.
- No gradients, flag walls, passport-data imagery, seals, fake entry stamps or large alarm-red blocks.

## Container and page rhythm

- Reuse the existing Header, Footer and wide editorial container.
- Hero: two-column desktop composition with a text/action column and one real licensed airport/transit photograph. Mobile becomes image first, then text, without overlaying text on the photograph.
- Use open editorial bands with alternating paper, sand/mist and one dark ink section. Do not stack thirteen identical cards.
- Alternate section anatomy: split hero, four-choice open rail, focused checker, route diagram, calculator split, searchable list, permitted-area flow, checklist, timeline, image-led route strips, open accordion and source log.
- Desktop content maximum follows the existing `editorial-container`; form-reading width is narrower inside that container.

## Signature component families

1. **Policy choice rail** — four choices separated by fine rules, with one icon and a short eligibility summary.
2. **Five-step checker** — compact step progress, large native controls, one question group at a time, fixed Back/Continue action row and a separate result region.
3. **Route sequence** — A → Mainland China → B shown as a horizontal line on desktop and vertical sequence on mobile.
4. **Port explorer list** — search and native filter controls followed by accessible disclosure rows/cards; no map dependency.
5. **Arrival timeline** — dark ink band with eight numbered stages; collapses vertically on mobile.

## Hero copy lock

Allowed above-the-fold visible copy:

- `Can You Visit China Visa-Free During a Transit?`
- `Check your route, passport, entry port and onward ticket against China's current 240-hour visa-free transit rules.`
- `Check my route`
- `See the 65 eligible ports`
- `Last policy check: July 18, 2026`
- `Official sources used`
- A short educational/non-legal-advice statement.
- Current quick facts: up to 240 hours, 55 eligible nationalities, 65 eligible ports, 24 province-level regions.

No eyebrow, decorative badge, approval claim or third hero action may be introduced.

## Form and accessibility rules

- Minimum interactive height: 44px; target 48px for primary checker controls.
- Every control has a persistent visible label and associated error/help text.
- Prefer native `select`, radio and checkbox controls for iOS reliability and keyboard access.
- Focus-visible ring uses the existing ember token and offset.
- Result mount moves programmatic focus to the result heading.
- The step indicator exposes text and `aria-current`; color is supplementary.
- Accordions use native `details/summary` or correct button/region ARIA.
- Reduced-motion users receive no animated scrolling or long transitions.

## Photography plan

Only existing local, traceable photography is used:

- Hero: Pudong airport from the existing 240-hour itinerary visual set.
- Arrival/process: existing international airport arrivals visual.
- Route/transport: existing high-speed rail and licensed city/itinerary photographs.
- The 240-hour Guide food imagery is never reused because none exists in the current Guide visual set and food is not semantically appropriate.

All new image references must be added to the existing image data/provenance system and rendered with `next/image`, explicit dimensions and responsive `sizes`.

## Responsive continuation

- 1440px: two-column hero, four-column policy rail, checker with side progress rail, two-column calculator, filter/list explorer, horizontal route/timeline where legible.
- 390px: single column; no horizontal scrolling; policy choices and port rows become disclosures; checker actions stack only when necessary; all route arrows become a vertical sequence; long official port names wrap naturally.
- Mobile text minimums follow existing site tokens; no 10–11px utility copy except nonessential metadata.

## Fidelity QA points

Final browser screenshots must be compared with the accepted Phase 1/2 references for at least:

1. Header/container alignment.
2. Source Serif/Inter type hierarchy.
3. Exact paper/ink/ember/jade palette use.
4. Hero image crop and absence of overlay tint.
5. Control radii, border weight and focus treatment.
6. Section rhythm without repetitive card walls.
7. 390px control sizing, wrapping and horizontal overflow.
