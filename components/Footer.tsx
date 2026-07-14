import Link from "next/link";
import { Container } from "@/components/Container";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { footerLegalItems, siteConfig } from "@/lib/site";

const planLinks = [
  { href: "/start-here", label: "Start Here" },
  { href: "/city-kits", label: "Destinations" },
  { href: "/itinerary-kits", label: "Plan Your Trip" },
  { href: "/store", label: "Store" },
];

const learnLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/travel-essentials", label: "Travel Essentials" },
  { href: "/tools", label: "Tools" },
  { href: "/#free-checklist", label: "Free Checklist" },
];

const companyLinks = footerLegalItems.filter((item) => ["/about", "/contact"].includes(item.href));
const legalLinks = [
  ...footerLegalItems.filter((item) => !["/about", "/contact"].includes(item.href)),
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{title}</p>
      <nav aria-label={`${title} links`} className="mt-4 grid gap-2.5 text-sm">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="w-fit text-white/72 transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function LegalFooterColumn() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Legal</p>
      <nav aria-label="Legal links" className="mt-4 grid gap-2.5 text-sm">
        {legalLinks.map((item) => (
          <Link key={item.href} href={item.href} className="w-fit text-white/72 transition hover:text-white">
            {item.label}
          </Link>
        ))}
        <Link href="/affiliate-disclosure" className="w-fit text-white/72 transition hover:text-white">
          Affiliate Disclosure
        </Link>
      </nav>
    </div>
  );
}

export function Footer() {
  const coffeeTipEnabled = Boolean(process.env.NEXT_PUBLIC_COFFEE_TIP_URL);

  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,0.72fr)] lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-editorial text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Clear, practical planning for a first independent trip to China.
          </p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 inline-flex text-sm text-white/72 underline decoration-white/25 underline-offset-4 hover:text-white">
            {siteConfig.contactEmail}
          </a>
          <div className="mt-5 max-w-xs">
            <WhatsAppLink placement="footer" sourcePage="site_footer" variant="footer" />
          </div>
          {coffeeTipEnabled ? (
            <div className="mt-4"><CoffeeTipLink source="footer" variant="subtle">Buy us a coffee</CoffeeTipLink></div>
          ) : null}
        </div>
        <FooterColumn title="Plan" links={planLinks} />
        <FooterColumn title="Learn" links={learnLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <LegalFooterColumn />
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 First China Trip Kit. All rights reserved.</p>
          <p>Travel requirements change. Verify official sources before booking.</p>
        </Container>
      </div>
    </footer>
  );
}
