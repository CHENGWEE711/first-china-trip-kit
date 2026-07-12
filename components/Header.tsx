"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Globe2, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
      <div className="editorial-container flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-ink" aria-label={`${siteConfig.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ember text-white shadow-sm">
            <Globe2 aria-hidden="true" size={20} />
          </span>
          <span className="text-base sm:text-lg">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`border-b-2 px-3 py-5 text-sm font-semibold transition ${active ? "border-ember text-ink" : "border-transparent text-ink/66 hover:border-ink/20 hover:text-ink"}`}>{item.label}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#free-checklist" className="hidden min-h-10 items-center rounded-md bg-ember px-4 py-2 text-sm font-bold text-white transition hover:bg-[#963028] sm:inline-flex">Get the Free Checklist</Link>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-md border border-ink/15 text-ink lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-ink/10 bg-paper px-4 pb-5 pt-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`rounded-md px-4 py-3 text-base font-semibold ${active ? "bg-mist text-jade" : "text-ink/72 hover:bg-sand hover:text-ink"}`}>{item.label}</Link>;
            })}
            <Link href="/#free-checklist" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 font-bold text-white sm:hidden">Get the Free Checklist</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
