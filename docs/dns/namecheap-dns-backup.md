# Namecheap DNS Backup: firstchinatripkit.com

Audit date: 2026-07-12 (Asia/Shanghai)

Scope: Read-only DNS inventory and website baseline. No DNS records or Namecheap settings were changed.

Sources checked:

- Namecheap Domain and Advanced DNS pages
- Public DNS-over-HTTPS resolution
- Live HTTP checks against the production website
- Vercel production deployment status

## DNS Hosting

| Item | Current value | Assessment |
| --- | --- | --- |
| DNS platform | Namecheap BasicDNS | DNS is hosted by Namecheap |
| Nameserver 1 | `dns1.registrar-servers.com` | Namecheap |
| Nameserver 2 | `dns2.registrar-servers.com` | Namecheap |
| Cloudflare nameservers | None | Cloudflare is not authoritative |
| Vercel nameservers | None | Vercel DNS is not authoritative; Vercel is the website host only |
| DNSSEC | Disabled | No DS record is published |

## Current Host Records

| Type | Host | Value | Priority | TTL | Purpose | Can delete? | Keep? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | - | Automatic / 1800 public TTL | Vercel apex website | No | Yes |
| A | `www` | `76.76.21.21` | - | Automatic / 1800 public TTL | Vercel primary website | No | Yes |

No AAAA, CNAME, CAA, SRV, URL Redirect, or additional host records are configured in Namecheap.

## Current Mail Records

Namecheap Mail Settings is set to **Email Forwarding**. The MX records below are managed by that setting.

| Type | Host | Value | Priority | TTL | Purpose | Can delete? | Keep? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MX | `@` | `eforward1.registrar-servers.com` | 10 | 1800 | Namecheap Email Forwarding | Only during coordinated mail migration | Yes, until Zoho cutover |
| MX | `@` | `eforward2.registrar-servers.com` | 10 | 1800 | Namecheap Email Forwarding | Only during coordinated mail migration | Yes, until Zoho cutover |
| MX | `@` | `eforward3.registrar-servers.com` | 10 | 1800 | Namecheap Email Forwarding | Only during coordinated mail migration | Yes, until Zoho cutover |
| MX | `@` | `eforward4.registrar-servers.com` | 15 | 1800 | Namecheap Email Forwarding | Only during coordinated mail migration | Yes, until Zoho cutover |
| MX | `@` | `eforward5.registrar-servers.com` | 20 | 1800 | Namecheap Email Forwarding | Only during coordinated mail migration | Yes, until Zoho cutover |
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | - | Automatic / 1800 public TTL | SPF for Namecheap forwarding | Replace during Zoho cutover; do not create a second SPF record | Yes, until Zoho cutover |

The Namecheap Domain page reports that no individual Email Redirect or catch-all destination is currently defined. The forwarding MX service is enabled, but no destination mailbox is configured in Namecheap.

## Records Not Present

| Record or service | Status | Notes |
| --- | --- | --- |
| Google Workspace MX | Not present | No Google mail routing conflict |
| Zoho MX | Not present | Zoho mail is not active yet |
| Brevo SMTP MX | Not present | No Brevo mail routing record |
| Google Search Console DNS TXT | Not present | Search Console may use another verification method |
| Brevo domain verification TXT/CNAME | Not present | None shown in Namecheap host records |
| DKIM | Not present | No selector is configured |
| DMARC | Not present | `_dmarc.firstchinatripkit.com` returns NXDOMAIN |
| CAA | Not present | No CAA restriction is configured |
| SRV | Not present | No mail discovery/submission SRV records |
| URL Redirect | Not configured | Apex redirect is handled by Vercel, not Namecheap |
| Dynamic DNS | Disabled | No dynamic DNS records |
| Domain redirect | Not configured | No Namecheap redirect rule |
| Email redirect destinations | Not configured | No forwarder or catch-all entry |

## Conflict Review

- The five MX records are one consistent Namecheap Email Forwarding set, not competing mail providers.
- Exactly one SPF record exists. There is no duplicate SPF conflict.
- No Google Workspace, Zoho, or Brevo SMTP MX records compete with Namecheap forwarding.
- No DKIM selector exists, so there is no duplicate selector.
- No DMARC record exists, so there is no duplicate DMARC policy.
- The two website A records both point to Vercel's `76.76.21.21` endpoint and should be preserved.
- No incorrect CNAME, AAAA, redirect, or SRV record was found that would interfere with the website.

## Website Baseline

| Check | Result |
| --- | --- |
| `https://www.firstchinatripkit.com/` | HTTP 200 |
| `https://firstchinatripkit.com/` | HTTP 301 to `https://www.firstchinatripkit.com/` |
| `https://www.firstchinatripkit.com/sitemap.xml` | HTTP 200, XML |
| `https://www.firstchinatripkit.com/robots.txt` | HTTP 200, includes the production sitemap |
| Vercel target | Production |
| Vercel status | Ready |
| Vercel aliases | Apex, `www`, and project aliases are active |

## Records That Must Be Preserved

1. `A @ -> 76.76.21.21`
2. `A www -> 76.76.21.21`
3. Current Namecheap MX and SPF records until the Zoho mailbox is created and the coordinated mail cutover begins.

## Records Expected to Change During a Future Zoho Cutover

The following records are not obsolete yet, but will likely be replaced together when Zoho is ready:

1. All five `eforward*.registrar-servers.com` MX records
2. The Namecheap forwarding SPF record
3. Namecheap Mail Settings from Email Forwarding to the mail mode required for Zoho records

The exact Zoho verification, MX, SPF, and DKIM values must be copied from the active Zoho Admin Console. They must not be guessed. DMARC should be added only after SPF and DKIM are confirmed.

## Readiness for Zoho Configuration

The domain is clean enough to enter the Zoho preparation stage. Website records are isolated from mail records, and there are no competing mail providers. The safe sequence is:

1. Add and verify the domain in Zoho using the exact TXT value provided by Zoho.
2. Create `hello@firstchinatripkit.com` in Zoho.
3. Obtain the exact MX, SPF, and DKIM records for the assigned Zoho data center.
4. Replace Namecheap forwarding MX/SPF only as one coordinated cutover.
5. Verify inbound and outbound delivery before adding DMARC monitoring.

