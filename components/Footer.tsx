import Link from "next/link";
import { Mail } from "lucide-react";
import { footerLegalItems, navItems, siteConfig } from "@/lib/site";

export function Footer() {
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
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-3 inline-flex items-center gap-2 text-white/72 hover:text-white"
          >
            <Mail aria-hidden="true" size={18} />
            {siteConfig.contactEmail}
          </a>
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
