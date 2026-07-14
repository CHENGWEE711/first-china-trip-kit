"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu(returnFocus = true) {
    setOpen(false);
    if (returnFocus) window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-ink/10 bg-paper/95">
      <div className="editorial-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-ink" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/brand/first-china-trip-kit-logo.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0"
          />
          <span className="text-base sm:text-lg">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`border-b-2 px-3 py-[21px] text-sm font-semibold transition ${active ? "border-ember text-ink" : "border-transparent text-ink/66 hover:border-ink/20 hover:text-ink"}`}>{item.label}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#free-checklist" className="hidden min-h-11 items-center rounded-md bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:bg-ember-hover xl:inline-flex">Get the Free Checklist</Link>
          <button ref={menuButtonRef} type="button" className="grid h-11 w-11 place-items-center rounded-md border border-ink/15 text-ink transition hover:border-ember/40 hover:text-ember focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => open ? closeMenu() : setOpen(true)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? (
        <>
          <button type="button" aria-label="Close navigation menu overlay" onClick={() => closeMenu()} className="fixed inset-x-0 bottom-0 top-16 z-30 bg-ink/45 lg:hidden" />
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink/10 bg-paper px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 shadow-editorial lg:hidden">
          <div className="editorial-container grid gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} onClick={() => closeMenu()} aria-current={active ? "page" : undefined} className={`rounded-md px-4 py-3 text-base font-semibold ${active ? "bg-mist text-jade" : "text-ink/72 hover:bg-sand hover:text-ink"}`}>{item.label}</Link>;
            })}
            <Link href="/#free-checklist" onClick={() => closeMenu()} className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 font-semibold text-white hover:bg-ember-hover">Get the Free Checklist</Link>
          </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
