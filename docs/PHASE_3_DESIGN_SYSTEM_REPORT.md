# Phase 3 — Design System Report

Date: 2026-07-12  
Status: **PASSED — completed in Penpot after Figma Starter limits blocked further work**

## Design files

### Primary editable source — Penpot

- Name: `First China Trip Kit — UI System 2.0`
- Project: `First China Trip Kit`
- File ID: `86907e95-1cb8-8122-8008-509791f8cc74`
- URL: https://design.penpot.app/#/workspace?team-id=bd542ff8-ca96-8077-8008-5094e141a278&file-id=86907e95-1cb8-8122-8008-509791f8cc74&page-id=a6412e37-8bb7-80fe-8008-5099c0a498ba
- Penpot version validated: `2.17.0`
- Automation: official local Penpot MCP connected through the approved Penpot MCP plugin.

### Archived Figma source

- Name: `First China Trip Kit — UI System 2.0`
- URL: https://www.figma.com/design/Xh52hXMXvSmgnbwvbf19uI
- File key: `Xh52hXMXvSmgnbwvbf19uI`
- Status: retained as an archive of the initial Foundations work.
- Migration reason: Figma Starter allowed only three Pages in this workflow and limited MCP usage to six calls per month. The limits blocked components, page imports, and visual directions without a paid upgrade.

No Figma content was deleted during the migration.

## Page structure

All ten requested Penpot Pages exist:

1. `01 Current Website`
2. `02 Foundations`
3. `03 Components`
4. `04 Homepage`
5. `05 Guides`
6. `06 Destinations`
7. `07 Itineraries`
8. `08 Store`
9. `09 Mobile`
10. `10 Approved Designs`

## Current website reference import

`01 Current Website` contains all 18 Phase 2 priority pages in desktop and mobile form:

- 36 screenshots in total.
- Desktop source width: `1440px`.
- Mobile source width: `390px`.
- Every pair is labelled with page name, viewport, capture date, and a `P2-01` through `P2-18` issue reference.
- Eight source PNGs exceeded Penpot's practical import dimension. Temporary proportional copies were reduced to a maximum source dimension of 10,000px before import; the original Phase 2 files were not changed.

## Design Tokens

Three active Penpot Token Sets contain 45 tokens.

### Colors — 15 tokens

- `Background.Warm` — `#F7F5F0`
- `Background.Light` — `#FCFBF8`
- `Background.Dark` — `#18211D`
- `Surface.White` — `#FFFFFF`
- `Text.Primary` — `#1D2320`
- `Text.Secondary` — `#5F6862`
- `Text.Inverse` — `#FCFBF8`
- `Brand.Red` — `#B53A32`
- `Brand.Red-Hover` — `#963028`
- `Brand.Green` — `#244C3D`
- `Brand.Green-Light` — `#E7EEE9`
- `Border.Soft` — `#DDDCD5`
- `Status.Success` — `#2F6B4F`
- `Status.Warning` — `#A56A1F`
- `Status.Error` — `#B33A32`

### Dimensions — 18 tokens

- Spacing: `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `80`, `96`, `120`
- Radius: `Small = 4`, `Medium = 8`, `Large = 16`
- Reading width: `720–780px`
- Main container: `1180–1240px`

### Typography — 12 tokens

- `Display.Desktop`
- `Display.Mobile`
- `Heading.H1`
- `Heading.H2`
- `Heading.H3`
- `Heading.H4`
- `Body.Large`
- `Body.Default`
- `Body.Small`
- `Label`
- `Caption`
- `Button`

## Typography styles

The local library also contains 12 reusable typography styles matching the token ramp.

Only two font families are used:

- Editorial Serif: `Source Serif 4`
- Sans Serif: `Inter`

## Foundations documentation

`02 Foundations` contains:

- 15 token-bound color swatches.
- 12 typography specimens.
- The complete 11-step spacing scale.
- Desktop 12-column, Tablet 8-column, and Mobile 4-column definitions.
- `720–780px` reading-width guidance.
- `1180–1240px` main-container guidance.

Visual QA artifact:

- `docs/screenshots/phase3-penpot-foundations.png`

The first QA pass found clipped Display and H1 specimens. Their cards were enlarged and long samples shortened; the second export passed.

## Components

The Penpot local library contains 28 components: the 27 requested component patterns plus one unified Button variant set.

- Header
- Mobile Navigation
- Button Variants
- Primary Button
- Secondary Button
- Text Link
- Hero
- Section Heading
- Guide Card
- Destination Card
- Itinerary Card
- Article Metadata
- Quick Answer
- Table of Contents
- Inline Image
- Image Caption
- Info Box
- Warning Box
- Comparison Table
- Timeline
- Route Map
- Product Preview
- Newsletter
- Footer
- Form Field
- Modal
- Accordion
- Related Guides

Button Variants contains:

- Properties: `Style`, `State`
- Styles: `Primary`, `Secondary`
- States: `Default`, `Hover`, `Disabled`
- Variant combinations: `6`
- Variant errors: `0`

Components use Penpot Flex Layout, token bindings, typography styles, semantic layer naming, and local library registration.

Visual QA artifact:

- `docs/screenshots/phase3-penpot-components.png`

The first QA pass found an over-tall gallery and a clipped Hero title. Both were corrected before final validation.

## Homepage visual directions

`04 Homepage` contains three equal-size hero studies:

### A — Premium Editorial

- Highest perceived quality.
- Strongest editorial authority and trust.
- Warm background, restrained red, deep green image treatment, and expressive serif hierarchy.

### B — Modern Travel Utility

- Highest information clarity.
- Fastest route to practical planning actions.
- Quick planning links and a visible trip-readiness panel.

### C — China Contemporary

- Most distinctive cultural expression.
- Strong visual identity, but a narrower comfort range for international first-time visitors.
- The red/charcoal/green composition risks drawing more attention to style than to trip-planning utility.

Visual QA artifact:

- `docs/screenshots/phase3-penpot-homepage-directions.png`

The first export exposed horizontal title clipping in all three directions. Titles and supporting copy were changed to fixed-column, auto-height text and re-exported successfully.

## Approved direction

Selected direction:

**A Premium Editorial visual quality + B Modern Travel Utility information clarity.**

Approved design characteristics:

- A's premium serif-led storytelling and calm image balance.
- B's visible planning shortcuts and direct information architecture.
- Warm editorial background with restrained Chinese red.
- Deep charcoal reading color and ink-green utility surfaces.
- Clear primary CTA followed by city, route, and payment entry points.

Approved artifacts:

- Desktop: `docs/screenshots/phase3-penpot-approved-desktop.png`
- Mobile: `docs/screenshots/phase3-penpot-approved-mobile.png`

The approved desktop design is stored in `10 Approved Designs`; the approved 390px mobile design is stored in `09 Mobile`.

## Validation results

- Pages: `10/10`
- Active Token Sets: `3`
- Tokens: `45`
- Typography styles: `12`
- Components: `28`
- Button variant combinations: `6`, with `0` errors
- Current-site screenshots: `36/36`
- Current-site reference labels: `18/18`
- Homepage directions: `3/3`
- Approved desktop design: present
- Approved mobile design: present
- Visual exports inspected: Foundations, Components, Directions, Approved Desktop, Approved Mobile

## Known operational notes

- The official local package reported Penpot MCP `2.15.4` while the web editor reported Penpot `2.17.0`. The plugin displayed a version-warning banner, but read, write, token, component, variant, image import, and export operations all passed real validation.
- Automated future Penpot edits require the local MCP service to be running and the Penpot MCP plugin window to remain connected.
- Photography areas in the direction studies are intentional design placeholders; production image selection belongs to the later implementation phase.
- Pages `05 Guides` through `08 Store` are reserved for later approved page compositions. Their creation was required in this phase; full-page redesign work was not.

## Production code

No production page, component, style, asset, or deployment configuration was modified during Phase 3.

## Acceptance status

- Editable design file accessible: **PASS**
- Ten-page file structure complete: **PASS**
- Foundations complete: **PASS**
- Core components complete: **PASS**
- A/B/C comparison complete: **PASS**
- Main visual direction selected and approved: **PASS**
- Production page code unchanged: **PASS**

**Phase 3 acceptance status: PASSED. The project may enter Phase 4 only after the user accepts this stage report.**
