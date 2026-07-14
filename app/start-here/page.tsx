import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import { StartHerePath } from "@/components/StartHerePath";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Start Here: Your 8-Step First China Trip Plan",
  description:
    "Prepare your first China trip in order: entry rules, payments, apps, internet, transport, Chinese addresses, checklist, then cities and itineraries.",
  path: "/start-here",
});

export default function StartHerePage() {
  return (
    <>
      <header className="border-b border-ink/10 bg-sand px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">Start Here</p>
            <h1 className="mt-3 max-w-4xl text-5xl leading-[1.04] text-ink md:text-6xl">Eight steps before your first China trip</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/68">Work from entry rules to an offline-ready arrival plan. Choose cities only after the systems that support the trip are clear.</p>
          </div>
          <aside className="border-l-2 border-ember pl-5">
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-ink/48"><Clock3 aria-hidden="true" size={18} />About 20–30 minutes to map the gaps</p>
            <p className="mt-4 text-base leading-relaxed text-ink/66">You do not need to finish every setup today. Mark what is ready, open the action you need, then return to this path.</p>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink/58"><ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-jade" size={18} />Entry and transit rules can change. This path helps organize checks; it does not guarantee visa-free transit or entry.</p>
          </aside>
        </div>
      </header>

      <StartHerePath />

      <section className="bg-ink px-4 py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-widest text-mist">Still unsure?</p><h2 className="mt-2 text-3xl text-white">Ask one focused planning question.</h2><p className="mt-3 max-w-2xl text-white/68">Include your passport country, travel month, trip length and cities considered so the next step is practical.</p></div>
          <Link href="/contact" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-bold text-white hover:bg-ember-hover md:w-fit">Contact us<ArrowRight aria-hidden="true" size={17} /></Link>
        </div>
      </section>
    </>
  );
}
