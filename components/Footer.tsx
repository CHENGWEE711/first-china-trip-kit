import Link from "next/link";
import { ClipboardList, Mail, MailCheck } from "lucide-react";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { footerLegalItems, navItems, siteConfig } from "@/lib/site";

const contactEntries = [
  {
    label: "Email",
    href: `mailto:${siteConfig.contactEmail}`,
    description: siteConfig.contactEmail,
    icon: Mail,
  },
  {
    label: "Contact Form",
    href: "/contact",
    description: "Ask a China trip question",
    icon: ClipboardList,
  },
  {
    label: "Newsletter",
    href: "/#free-checklist",
    description: "Get the free checklist",
    icon: MailCheck,
  },
];

export function Footer() {
  const coffeeTipEnabled = Boolean(process.env.NEXT_PUBLIC_COFFEE_TIP_URL);

  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-base text-white/72">
            Practical China travel planning for first-time foreign visitors,
            built around cities, routes, payments, transport, food, and useful
            phrases.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <div className="mt-3 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/72 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <div className="mt-3 grid gap-3">
            {contactEntries.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("mailto:");
              const className =
                "group grid gap-0.5 rounded-md border border-white/10 bg-white/5 p-3 text-white/72 transition hover:border-white/22 hover:bg-white/9 hover:text-white";
              const content = (
                <>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <Icon aria-hidden="true" size={16} />
                    {item.label}
                  </span>
                  <span className="text-sm text-white/55 group-hover:text-white/70">
                    {item.description}
                  </span>
                </>
              );

              return isExternal ? (
                <a key={item.label} href={item.href} className={className}>
                  {content}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
            <WhatsAppLink
              placement="footer"
              sourcePage="site_footer"
              variant="footer"
            />
          </div>
          {coffeeTipEnabled ? (
            <div className="mt-4">
              <CoffeeTipLink source="footer" variant="subtle">
                Buy us a coffee
              </CoffeeTipLink>
            </div>
          ) : null}
          <p className="mt-5 text-sm text-white/52">
            Travel information changes. Always verify official requirements before booking.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {footerLegalItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/60 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/56">
        © 2026 First China Trip Kit. All rights reserved.
      </div>
    </footer>
  );
}
