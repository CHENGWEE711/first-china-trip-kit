# Zoho Mail Stage 3 Report: firstchinatripkit.com

Completion date: 2026-07-12 (Asia/Shanghai)

Scope: Zoho mail routing and sender authentication cutover in Namecheap DNS.

## Final Mail Configuration

| Type | Host | Value | Priority | Status |
| --- | --- | --- | --- | --- |
| MX | `@` | `mx.zoho.com` | 10 | Verified by Zoho |
| MX | `@` | `mx2.zoho.com` | 20 | Verified by Zoho |
| MX | `@` | `mx3.zoho.com` | 50 | Verified by Zoho |
| TXT | `@` | `v=spf1 include:zohomail.com ~all` | - | Verified by Zoho |
| TXT | `zmail._domainkey` | Zoho-generated 2048-bit DKIM public key | - | Verified and enabled by Zoho |
| TXT | `_dmarc` | `v=DMARC1; p=none; pct=100; rua=mailto:hello@firstchinatripkit.com` | - | Published and publicly resolvable |

The existing Zoho ownership verification TXT record remains published at the apex.

## Cutover Changes

- Namecheap Mail Settings was changed from **Email Forwarding** to **Custom MX**.
- The old `eforward*.registrar-servers.com` MX set was removed.
- The old Namecheap forwarding SPF include was removed.
- Exactly one SPF policy remains.
- No Google Workspace or other mail-provider MX records remain in the active configuration.

## Preserved Website Records

- `A @ -> 76.76.21.21`
- `A www -> 76.76.21.21`

These Vercel records were not changed.

## Verification Results

- Domain ownership: Verified
- Primary domain: Yes
- MX: Verified by Zoho
- SPF: Verified by Zoho
- DKIM selector: `zmail`
- DKIM: Verified and enabled
- DMARC: Publicly resolvable with monitoring policy `p=none`
- Public DNS check: Google DNS-over-HTTPS returns the Zoho MX, SPF, DKIM, and DMARC records

## Website Baseline After Cutover

| Check | Result |
| --- | --- |
| `https://www.firstchinatripkit.com/` | HTTP 200 |
| `https://firstchinatripkit.com/` | HTTP 301 to `https://www.firstchinatripkit.com/` |
| `https://www.firstchinatripkit.com/sitemap.xml` | HTTP 200 |
| `https://www.firstchinatripkit.com/robots.txt` | HTTP 200 |

## Next Step

The domain is ready for inbound and outbound mail testing with `hello@firstchinatripkit.com`. Some recursive DNS resolvers may retain the previous MX set until their cache expires, so allow up to the published TTL before treating an immediate delivery delay as a configuration failure.
