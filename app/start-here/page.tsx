import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, BedDouble, MapPinned, Route, ShieldCheck, Signal, Smartphone } from "lucide-react";
import { ProductActionButton } from "@/components/ProductActionButton";
import { editorialImages } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Start Here: Plan Your First China Trip Step by Step",
  description: "A clear seven-step China trip preparation path covering entry rules, payments, apps, internet, hotels, cities, and realistic itineraries.",
  path: "/start-here",
});

const steps = [
  { title: "Check your visa or transit eligibility", body: "Confirm your passport rules, route and permitted travel area before making non-refundable bookings.", href: "/tools/visa-free-eligibility-checker", label: "Check what to verify", icon: ShieldCheck },
  { title: "Set up payments", body: "Prepare Alipay, a second payment option, a physical card and a small RMB cash backup.", href: "/guides/how-to-pay-in-china-as-a-foreigner", label: "Prepare payments", icon: BadgeDollarSign, image: editorialImages.payments },
  { title: "Install essential apps", body: "Keep the first-day stack small: payment, translation, maps, mobile data, train support and offline screenshots.", href: "/tools/essential-apps-checklist", label: "Build your app stack", icon: Smartphone },
  { title: "Arrange internet access", body: "Choose roaming, eSIM or a local SIM, then save key details for moments when mobile data fails.", href: "/guides/china-esim-guide-for-tourists", label: "Plan mobile data", icon: Signal },
  { title: "Save hotel and transport details", body: "Keep your hotel name, Chinese address, phone number, station name and booking confirmations offline.", href: "/guides/how-to-book-high-speed-trains-in-china", label: "Understand train travel", icon: BedDouble, image: editorialImages.transport },
  { title: "Choose your cities", body: "Start with one strong base, then add cities only when transfers fit your available days and energy.", href: "/city-kits", label: "Compare destinations", icon: MapPinned },
  { title: "Build your itinerary", body: "Use realistic daily pacing with room for jet lag, station transfers, weather and booking windows.", href: "/itinerary-kits", label: "Browse itinerary kits", icon: Route },
];

export default function StartHerePage() {
  const buyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  return (
    <>
      <header className="editorial-section bg-paper"><div className="editorial-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-ember">Start here</p><h1 className="mt-3 text-5xl leading-[1.06] md:text-6xl">Seven steps before your first China trip</h1><p className="mt-6 max-w-2xl text-lg text-ink/65">Work through the decisions in order. You do not need every app or every booking today; you need a dependable arrival plan.</p></div><div className="relative aspect-[3/2] overflow-hidden rounded-lg"><Image src={editorialImages.station.src} alt={editorialImages.station.alt} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" /></div></div></header>
      <section className="editorial-section"><div className="editorial-container max-w-5xl"><div className="relative grid gap-8 before:absolute before:bottom-6 before:left-6 before:top-6 before:hidden before:w-px before:bg-ink/15 md:before:block">
        {steps.map((step, index) => { const Icon = step.icon; return <article key={step.title} className="relative grid gap-5 border-b border-ink/12 pb-8 md:grid-cols-[3rem_1fr] md:border-0 md:pb-0"><div className="z-10 grid h-12 w-12 place-items-center rounded-full bg-jade text-white"><Icon aria-hidden="true" size={21} /></div><div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-widest text-ember">Step {index + 1}</p><h2 className="mt-2 text-3xl leading-tight">{step.title}</h2><p className="mt-3 max-w-2xl text-ink/65">{step.body}</p><Link href={step.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-ember">{step.label}<ArrowRight aria-hidden="true" size={17} /></Link></div>{step.image ? <div className="relative hidden h-36 w-56 overflow-hidden rounded-lg lg:block"><Image src={step.image.src} alt={step.image.alt} fill sizes="224px" className="object-cover" /></div> : null}</div></article>; })}
      </div></div></section>
      <section className="bg-jade py-14 text-white"><div className="editorial-container flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-4xl text-white">Take the plan offline</h2><p className="mt-3 max-w-2xl text-white/72">Download the free checklist for quick preparation, or use the printable setup guide for payment and app troubleshooting.</p></div><div className="flex flex-col gap-3 sm:flex-row"><ProductActionButton canBuy href="/thank-you" label="Download the Free Checklist" productId="china-first-trip-checklist" eventName="checklist_download_clicked" placement="start_here_bottom" /><ProductActionButton canBuy={Boolean(buyUrl)} href={buyUrl || "/store#inside-the-guide"} isExternal={Boolean(buyUrl)} label={buyUrl ? "Get the $7 Setup Guide" : "See the $7 Setup Guide"} productId="china-payment-apps-setup-guide" placement="start_here_bottom" className="border border-white/35 !bg-transparent hover:!bg-white hover:!text-ink" /></div></div></section>
    </>
  );
}
