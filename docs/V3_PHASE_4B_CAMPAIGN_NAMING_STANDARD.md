# V3 Phase 4B — Campaign Naming Standard

Status: architecture standard only; no posts are created or scheduled

Repository baseline: `66ed82edcf3eca9a39a1f7b6894572394f75a019`

Canonical site: `https://www.firstchinatripkit.com`

## 1. Objective

This standard makes a Metricool post, a Landing session and a downstream funnel
action joinable without storing personal data. It replaces the current mix of
`social`, `video`, `organic_social`, `organic_video` and `organic` with one
controlled vocabulary for all new links.

The five standard fields are:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

No `fctk_campaign` field is needed initially. The standard UTMs are sufficient,
widely supported and easier to inspect. A private provider conversion record may
carry its own immutable provider ID, but that ID does not belong in a public URL.

## 2. Approved Landing routes

Campaign links may point only to these approved Phase 4A acquisition pages:

| Landing name | Canonical path | Primary intent |
| --- | --- | --- |
| `pay_in_china` | `/landing/pay-in-china` | Payment and essential-app preparation |
| `china_visa_free` | `/landing/china-visa-free` | Visa-free transit route screening |
| `china_checklist` | `/landing/china-checklist` | First-trip checklist acquisition |

The future URL builder must reject unknown Landing names, absolute destinations
outside `www.firstchinatripkit.com`, non-HTTPS URLs, fragments used as a fake
Landing, and credentials/ports in the authority. It may normalize the apex
domain to `www.firstchinatripkit.com` only when that redirect is intentionally
approved and tested.

Internal navigation must never add UTMs. Specific Guide links inside the site
remain clean; attribution survives through the approved session context instead.

## 3. Character and length rules

| Field | Required | Maximum | Allowed format | Invalid handling |
| --- | --- | --- | --- | --- |
| `utm_source` | Yes | 32 | Controlled lowercase ASCII token | Reject |
| `utm_medium` | Yes | 32 | Controlled lowercase ASCII token | Reject |
| `utm_campaign` | Yes | 64 | `a-z`, `0-9`, underscore | Reject |
| `utm_content` | Yes for managed social | 64 | `a-z`, `0-9`, underscore | Reject |
| `utm_term` | Only for an approved manual paid-search keyword group | 64 | `a-z`, `0-9`, underscore | Reject |

Normalization is deterministic:

1. Unicode-normalize input, trim edges and lowercase it.
2. Transliterate only an explicitly supported operator label; generated public
   values themselves must be ASCII.
3. Convert one or more spaces/hyphens to one underscore.
4. Collapse repeated underscores and remove leading/trailing underscores.
5. Reject an empty result, an over-length result or characters outside
   `[a-z0-9_]`.
6. Reject values resembling an email, URL, phone number, social handle, customer
   identifier, visa answer, route/date or free-form caption.

The builder must return a validation result with field-level errors; it must not
silently map an operator typo to `other`.

## 4. Source taxonomy

### Operator-authored sources

| Source | Use |
| --- | --- |
| `google` | Google manual paid-search links use `cpc`; ordinary organic search is not manually tagged, and linked Google Ads should prefer its approved auto-tagging design |
| `bing` | Bing manual paid-search links use `cpc`; ordinary organic search is not manually tagged |
| `tiktok` | TikTok posts, profile or video descriptions |
| `instagram` | Instagram bio, Story or post links |
| `threads` | Threads posts/profile links |
| `bluesky` | Bluesky posts/profile links |
| `pinterest` | Pinterest Pins and profile links |
| `reddit` | Approved Reddit post/comment/profile links |
| `quora` | Approved Quora answer/profile links |
| `youtube` | YouTube description, pinned comment or channel links |
| `twitch` | Twitch panel, profile or stream-description links |
| `facebook` | Future approved Facebook organic/paid links, if used |
| `newsletter` | First China Trip Kit email links |

### Reporting-only sources

`direct`, `referral` and `other` are classifier outputs, not values an operator
normally writes into a campaign URL. A referral should preserve only an approved
or normalized referring hostname category in private reporting; never store the
full referrer path or query. Unknown authored platforms are rejected by the URL
builder until the allowlist is intentionally updated.

## 5. Medium taxonomy

| Canonical medium | Use |
| --- | --- |
| `organic` | All unpaid social/community/video posts, regardless of media format |
| `paid_social` | Paid social placement |
| `cpc` | Manually tagged paid search; chosen to match GA4's Paid Search rules |
| `email` | Newsletter or lifecycle email |
| `referral` | System-classified external referral; not normally authored |
| `direct` | System-classified direct session; never authored |
| `affiliate` | First China Trip Kit outbound partner tracking, not inbound social posts |
| `other` | Reporting fallback after validation/classification, not an operator shortcut |

`social`, `video`, `organic_social` and `organic_video` are legacy aliases. For
new campaigns, normalize all unpaid posts to `organic`; content format belongs in
`utm_content`, not the medium. Historical data is not rewritten in GA4. A
dashboard migration layer may group the four legacy values into a displayed
`organic` channel while preserving a “legacy_medium” quality flag.

Do not use `search` as a paid-search medium: GA4's default Paid Search rule
expects a paid/cost-per-click pattern, and Google's manual-tagging examples use
`cpc`. Ordinary organic Google/Bing search relies on the referrer/auto
classification and receives no manually authored UTM. For organic social/video,
the reporting semantic layer classifies by the approved source first, then
medium, so a new platform using `organic` cannot silently become Organic Search
merely because Google's maintained source list lags.

Google Ads auto-tagging and `gclid` are a separate acquisition design, not an
extra field in this manual campaign builder. Do not append manual UTMs to an
auto-tagged Google Ads URL or strip/transform `gclid` until GA4 linking, consent,
landing-query handling and reconciliation have received their own review.

Official references:

- [GA4 default channel definitions](https://support.google.com/analytics/answer/9756891?hl=en)
- [GA4 manual tagging and traffic-source dimensions](https://support.google.com/analytics/answer/11242870?hl=en)

Managed Landing URL compatibility is closed:

| Source group | Allowed authored medium |
| --- | --- |
| TikTok, Instagram, Threads, Bluesky, Pinterest, Reddit, Quora, YouTube, Twitch, Facebook | `organic` or `paid_social` |
| Newsletter | `email` |
| Google, Bing | `cpc` only; organic search is not manually tagged |
| Direct, Referral, Other | None; reporting classifiers only |
| Affiliate | None in the inbound Landing builder; outbound partner tracking has a separate provider contract |

Every other source/medium pair is rejected instead of being accepted and fixed
in a dashboard later.

## 6. Campaign naming

Pattern:

```text
{initiative}_{optional_market_or_theme}_{optional_phase}
```

Rules:

- Use a stable campaign for one commercial objective across platforms.
- Do not put platform, content format or individual post number in campaign;
  those belong in source/content.
- Do not encode dates unless the initiative genuinely expires.
- Do not rename a campaign after links have been used.
- A phase suffix such as `_p2` is allowed only when the measurement objective or
  offer changes materially and the phase start is recorded in the campaign
  registry.
- Evergreen content uses an approved stable name such as
  `china_first_trip_evergreen`, not a new monthly campaign.

Current grandfathered campaign:

```text
china_first_trip_launch
```

Keep this exact value for the current launch links. If a future Phase 2 is
approved, register `china_first_trip_launch_p2` before scheduling; never mix the
new name into existing posts retroactively.

## 7. Content identifier naming

Pattern:

```text
{topic}_{format}_{hook_or_angle}_{version}
```

Recommended controlled topic tokens:

```text
payment
apps
visa_transit
checklist
arrival
internet
transport
```

Recommended format tokens:

```text
text
carousel
pin
short
video
story
bio
answer
comment
email
```

Version is two digits (`01`, `02`). The identifier describes the creative, not
the person or account that published it.

Examples:

```text
payment_text_credit_card_hook_01
payment_carousel_backup_layers_01
apps_pin_prepare_eight_tools_01
visa_transit_short_third_country_rule_01
checklist_email_preflight_01
```

Do not copy the full caption into `utm_content`. Do not use usernames, social
post IDs that expose account identity, email addresses or traveller details.

## 8. Optional term convention

`utm_term` is omitted for normal organic posts. Use it only when an approved
manual paid-search campaign needs a controlled keyword group, for example:

```text
first_china_trip
china_payment_apps
visa_free_transit
```

It must not contain a searcher's raw query, audience email, lookalike-list name,
demographic detail or free text. Paid social audience groups stay in the private
campaign registry; they are not exposed through `utm_term`.

## 9. Original, repost and cross-post conventions

| Scenario | Source | Campaign | Content rule |
| --- | --- | --- | --- |
| Original platform post | Actual platform | Stable campaign | New creative ID ending in `_01` |
| Edited repost on same platform | Same platform | Same campaign | Increment version, e.g. `_02` |
| Exact repost on same platform | Same platform | Same campaign | Reuse content ID only if the creative and destination are identical; record the new Metricool publish date separately |
| Cross-post of same creative | Each actual platform | Same campaign | Reuse the semantic content stem; source differentiates platform |
| Platform-specific adaptation | Actual platform | Same campaign | Use a distinct format/angle/version token |
| Paid amplification | Actual platform | Same campaign unless the objective changes | Switch medium to `paid_social`; put a non-personal creative distinction in content and keep audience detail in the private registry |
| Evergreen resurface | Actual platform | Evergreen campaign | Increment version when hook, CTA or destination changes |
| Correction after a bad link | Actual platform | Same campaign | Generate a corrected URL and increment version; never edit raw query values by hand |

Metricool's own post identifier stays in Metricool. Do not expose it in the UTM
unless a later aggregate connector needs a non-personal stable join key and that
field is specifically approved.

## 10. Platform mapping

| Platform | `utm_source` | Unpaid `utm_medium` | Typical Landing |
| --- | --- | --- | --- |
| TikTok | `tiktok` | `organic` | `pay_in_china` or `china_visa_free` |
| Instagram | `instagram` | `organic` | `china_checklist` or `pay_in_china` |
| Threads | `threads` | `organic` | `pay_in_china` |
| Bluesky | `bluesky` | `organic` | `pay_in_china` or `china_visa_free` |
| Pinterest | `pinterest` | `organic` | `china_checklist` |
| YouTube | `youtube` | `organic` | `china_visa_free` |
| Twitch | `twitch` | `organic` | Landing selected by stream topic |
| Reddit | `reddit` | `organic` | `china_visa_free` or `pay_in_china` |
| Quora | `quora` | `organic` | Landing selected by question intent |

## 11. Six Metricool-ready examples

These are architecture examples, not scheduled posts:

### TikTok

```text
https://www.firstchinatripkit.com/landing/pay-in-china?utm_source=tiktok&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=payment_short_credit_card_hook_01
```

### Pinterest

```text
https://www.firstchinatripkit.com/landing/china-checklist?utm_source=pinterest&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=checklist_pin_preflight_01
```

### Instagram

```text
https://www.firstchinatripkit.com/landing/china-checklist?utm_source=instagram&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=checklist_carousel_arrival_ready_01
```

### Threads

```text
https://www.firstchinatripkit.com/landing/pay-in-china?utm_source=threads&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=payment_text_backup_layers_01
```

### Reddit

```text
https://www.firstchinatripkit.com/landing/china-visa-free?utm_source=reddit&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=visa_transit_answer_third_country_01
```

### YouTube

```text
https://www.firstchinatripkit.com/landing/china-visa-free?utm_source=youtube&utm_medium=organic&utm_campaign=china_first_trip_launch&utm_content=visa_transit_short_route_check_01
```

## 12. Future campaign URL contract

Proposed location: `lib/growth/campaign-url.ts`.

```ts
type CampaignUrlInput = {
  landing: "pay_in_china" | "china_visa_free" | "china_checklist";
  source: CampaignSource;
  medium: CampaignMedium;
  campaign: string;
  content: string;
  term?: string;
};

type CampaignUrlResult =
  | { ok: true; url: string; normalized: CampaignUrlInput }
  | { ok: false; errors: Array<{ field: string; code: string }> };
```

Required behavior:

- Resolve Landing names from an internal allowlist, never from arbitrary input.
- Generate HTTPS URLs on the canonical domain.
- Parse existing query parameters and remove all existing `utm_*` values before
  writing exactly one normalized value per approved field.
- Reject unexpected existing query keys unless the Landing explicitly permits
  them; never preserve an email, route or free-text query.
- Use `URL`/`URLSearchParams` encoding, with a deterministic parameter order.
- Return normalized data and field-level errors for operator review.
- Never shorten the link using an unapproved third-party service.
- Log no secrets or user data.

Minimum future tests:

1. Each approved Landing and source/medium combination.
2. Unknown Landing, domain, scheme, port and credentials rejection.
3. Case/space/hyphen normalization.
4. Unicode, empty, over-length and invalid-character rejection.
5. Email, URL, phone-like and free-text PII-pattern rejection.
6. Existing/duplicate UTM removal.
7. Correct encoding and deterministic order.
8. `utm_term` omitted when empty.
9. Internal-link helper refuses to add UTM.
10. Six examples above snapshot to their exact expected URLs.
11. Google/Bing + `cpc` is accepted for manual paid search; Google/Bing +
    `search` is rejected.
12. Approved social/video source + `organic` maps to the source-first organic
    social/video reporting group even if GA4's maintained source list differs.

## 13. Metricool operator workflow

```text
Select approved campaign and Landing
→ assign content ID in campaign registry
→ generate URL with the builder
→ validate the canonical domain, required fields and any optional term
→ paste generated URL into Metricool
→ preview the final platform link
→ run HTTP/canonical/mobile QA
→ schedule in Metricool
→ record publish URL and timestamp
→ review GA4 Landing session and Metricool post data after the freshness window
```

Operators must not hand-edit encoded query strings in Metricool. When one asset
is cross-posted, generate a separate URL for each platform so `utm_source`
remains truthful. A link change creates a new content version and a QA record.

## 14. Pre-scheduling validation checklist

- [ ] Destination is one of the three approved Landing routes.
- [ ] HTTPS and canonical `www` host are present.
- [ ] Source matches the actual publishing platform.
- [ ] Unpaid post uses `organic`; paid social uses `paid_social`.
- [ ] Manually tagged paid search uses `cpc`; ordinary organic search has no
      manually authored campaign URL.
- [ ] `utm_term`, when present, is a registered paid-search keyword group and
      contains no raw query or audience information.
- [ ] Campaign is registered and unchanged.
- [ ] Content ID is unique for a changed creative/CTA/destination.
- [ ] No personal data, full caption, account handle or traveller answer appears.
- [ ] There is one instance of each UTM and no unrelated query parameter.
- [ ] The URL returns HTTP 200 and the canonical remains the clean Landing URL.
- [ ] Mobile page, primary CTA and downstream Hub work.
- [ ] The operator records the Metricool schedule/post reference privately.

## 15. Historical migration

1. Freeze the current CSV as a legacy artifact; do not rewrite already-published
   URLs.
2. Register `social`, `video`, `organic_social` and `organic_video` as legacy
   aliases in the reporting normalization layer.
3. Generate all new links with canonical `organic`, `paid_social`, `cpc` or the
   other approved medium matching the real channel.
4. Add a dashboard data-quality row for legacy-medium share and missing content.
5. Compare old and new periods separately until two weeks of clean data exist.
6. Retire `scripts/build-utm-url.mjs` and the old `lib/utm.ts` builder only after
   the future shared utility passes unit/CLI tests and all operator docs point to
   one implementation.

## 16. Governance ownership

The campaign registry is a reviewed code/data artifact proposed for
`data/growth/campaigns.ts`. Adding a source, medium, campaign or Landing requires
a pull-request review, matching tests and an operator-doc update. Metricool
remains the publisher; this standard governs links only and does not authorize
post scheduling in the architecture phase.
