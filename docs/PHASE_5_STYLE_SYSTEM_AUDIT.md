# Phase 5 — Style System Audit

Date: 2026-07-12  
Starting commit: `2a35e239dde101b951410c04cdfe7291c1b2c9e6`

## Current system

| Area | Existing source | Finding |
| --- | --- | --- |
| Colors | `app/globals.css` variables plus hex values in `tailwind.config.ts` and component classes | The same brand colors are maintained in CSS and Tailwind separately. Hard-coded hover red `#982F28` appears 18 times; additional red and pale-red variants also exist. |
| Fonts | Plain CSS stack | Body requests `Inter` by family name without loading it. Editorial headings use Georgia/Cambria rather than approved Source Serif 4. |
| Spacing | Tailwind default scale plus `editorial-section` clamp | Existing pages use many default values such as 20px (`p-5`). No semantic section/gutter primitive exists. |
| Radius | Tailwind defaults | `rounded-md` and `rounded-lg` are common, but their values are not explicitly mapped to Penpot Radius tokens. |
| Shadow | Tailwind `shadow-soft` plus framework defaults | `shadow-soft` is hard-coded in Tailwind; several components also use `shadow-sm` or `shadow-2xl`. |
| Containers | `editorial-container` plus repeated `max-w-5xl`, `max-w-6xl`, and `max-w-7xl` | Main width is 1200px, but many page families define local widths independently. |
| Components | Local React components | Header, ButtonLink, Newsletter and Footer exist. There is no shared Section, Container, semantic Button, or Editorial Image primitive. |

## Penpot source of truth

The Penpot library contains three token sets and 45 active tokens:

- Colors: 15 tokens, set ID `a6412e37-8bb7-80fe-8008-5099f00714d8`.
- Dimensions: 18 tokens, set ID `a6412e37-8bb7-80fe-8008-5099fe6b6769`.
- Typography: 12 tokens, set ID `a6412e37-8bb7-80fe-8008-509a1407d821`.

Approved values include warm `#F7F5F0`, light `#FCFBF8`, dark `#18211D`, text `#1D2320` / `#5F6862`, red `#B53A32` / `#963028`, green `#244C3D` / `#E7EEE9`, border `#DDDCD5`, radii 4/8/16px, main width 1180–1240px, reading width 720–780px, Source Serif 4 and Inter.

## Duplicate and conflict findings

- CSS and Tailwind currently duplicate the same seven core colors under different names.
- `#982F28` approximates but does not equal the approved red-hover token `#963028`.
- `#F0B3A7`, `#D66A4F`, and `#B43D35` are legacy accents without matching Penpot core-color tokens.
- Georgia is acting as a second editorial system in place of Source Serif 4.
- `max-w-7xl` (1280px) exceeds the approved 1240px container maximum.

## Phase 5 consolidation plan

1. Make CSS custom properties the base source for colors, type, radii, spacing, containers and shadows.
2. Map Tailwind semantic names to those variables with alpha support; remove duplicate hex values from Tailwind.
3. Load only Source Serif 4 and Inter through Next.js font loading, with Chinese system fallbacks.
4. Add shared Container, Section, Button and Editorial Image primitives.
5. Refactor Header, mobile navigation, Newsletter, Footer and homepage to use the shared system.
6. Preserve legacy page markup in other page families during this stage; only repair regressions caused by public-component changes.

The consolidation does not attempt a mechanical full-site rewrite of every existing Tailwind spacing class. That would exceed the stage boundary and risk modifying Guide, City, Itinerary, Store and Tools page families.
