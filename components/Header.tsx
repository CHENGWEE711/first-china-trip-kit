import Link from "next/link";
import { Globe2 } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ember text-white">
            <Globe2 aria-hidden="true" size={20} />
          </span>
          <span className="text-lg">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-ink/72 transition hover:bg-sand hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
      <nav
        aria-label="Mobile navigation"
        className="grid grid-cols-2 gap-2 border-t border-ink/8 px-4 py-2 sm:grid-cols-3 md:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-11 items-center justify-center rounded-md bg-sand px-3 py-2 text-center text-sm font-semibold text-ink/80"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
