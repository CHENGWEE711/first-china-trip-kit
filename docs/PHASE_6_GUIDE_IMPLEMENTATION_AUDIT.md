# Phase 6 — Guide Implementation Audit

Date: 2026-07-12

Starting commit: `ae37fb1166a46637d8fee75bc7070150a50f7aec`

## Scope and design basis

This phase is limited to the Guides list, the 14 Guide articles, and shared components used by them. City, Itinerary, Store, Tools and Production deployment are outside scope.

The implementation uses the completed Penpot foundations and component library in `First China Trip Kit — UI System 2.0`. Complete approved Guides list/article page frames still do not exist; therefore this remains **Implemented without a complete approved Penpot page frame**. Approved mobile TOC evidence exists in `09 Mobile`: closed frame `a6412e37-8bb7-80fe-8008-50a9f3b4e025`, open frame `a6412e37-8bb7-80fe-8008-50a9f406a4d4`.

## Starting-state findings

| Area | Existing strength | Gap found | Phase 6 action |
| --- | --- | --- | --- |
| Global tokens | Phase 5 colors, type, spacing, radius and shadow variables existed | Guide pages mixed direct width/padding patterns with shared primitives | Reuse `Container`, `Section`, token colors and established typography |
| Guides list | All 14 records and unique featured images rendered | No featured editorial story or topic navigation/filter | Add payment featured story and server-rendered topic routes |
| Article shell | H1, summary, metadata, hero, quick answer, desktop TOC, body and related content existed | Breadcrumb and mobile TOC missing | Add semantic breadcrumb and Penpot-aligned mobile accordion |
| Desktop TOC | Hash, back behavior, active state and stable Unicode IDs already tested | Needed preservation through integration | Retain sticky implementation and expand regression evidence |
| Mobile TOC | Penpot closed/open states existed | No production component | Implement default-collapsed accordion, auto-close, Escape and ARIA state |
| Visual data | 14 heroes and 42 inline visuals configured | Required final matrix and all-route verification | Regenerate Phase 6 data matrix and rerun DOM/image audits |
| SEO | Canonical, OG and Article/Breadcrumb JSON-LD existed | Article metadata used default social image and lacked `datePublished` | Use each Guide hero and add published date evidence |
| Visual regression | Homepage had approved screenshots | No approved Guide `toHaveScreenshot()` baselines | Add list/payment/apps desktop and mobile baselines |
| Accessibility | Skip link, language tags and base semantics existed | No Phase 6 accessibility suite path | Add focused list/article semantics and mobile keyboard tests |

## Legacy-pattern search

Guide files were inspected for hard-coded legacy colors, random max widths, image fallback logic and duplicate IDs. No normal Guide data path uses `image || defaultImage`, `categoryImage`, `foodFallback`, or `guideFallback`. The remaining direct layout classes represent the established Phase 5 token aliases (`ink`, `ember`, `sand`, `paper`, `mist`, `jade`) rather than legacy hex colors.
