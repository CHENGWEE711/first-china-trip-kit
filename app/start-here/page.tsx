import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Download, MapPinned, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PageIntro } from "@/components/PageIntro";
import { essentialKits, firstTripChecklist, toolKits } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Start Here for Your First China Trip | First China Trip Kit",
  description:
    "Start planning your first China trip with a practical checklist for visa, payment, apps, internet, transport, Chinese addresses, city kits, itinerary kits, and tools.",
  path: "/start-here",
});

export default function StartHerePage() {
  return (
    <>
      <PageIntro
        eyebrow="Start Here"
        title="Plan your first China trip in the right order"
        description="Do not start with a long list of attractions. Start with the systems that make the trip work: entry, payment, internet, apps, Chinese addresses, transport, and a realistic route."
      />

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-lg border border-ink/10 bg-sand p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-ember">
              <BadgeCheck aria-hidden="true" size={18} />
              First-trip checklist
            </p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Six things to prepare before you fly
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              If these are ready, your first arrival day is much calmer.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {firstTripChecklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"
              >
                <BadgeCheck aria-hidden="true" className="mt-0.5 text-ember" size={18} />
                <p className="text-base font-semibold leading-relaxed text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Step 1</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Open the Essential Kits first
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {essentialKits.map((kit) => (
              <Link
                key={kit.title}
                href={kit.href}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <Wrench aria-hidden="true" className="text-ember" size={22} />
                <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">
                  {kit.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{kit.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <MapPinned aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Step 2: choose a City Kit
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Pick your first base by recommended days, difficulty, hotel areas,
              food, and Chinese address support.
            </p>
            <div className="mt-5">
              <ButtonLink href="/city-kits" variant="ghost">Browse City Kits</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <MapPinned aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Step 3: choose an Itinerary Kit
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Use a route kit as your first draft, then adjust train times,
              hotels, meals, and rest buffers.
            </p>
            <div className="mt-5">
              <ButtonLink href="/itinerary-kits" variant="ghost">Browse Itinerary Kits</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <Download aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Step 4: keep a checklist
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Download the free PDF checklist and keep the essentials visible
              while you book flights, hotels, trains, and apps.
            </p>
            <div className="mt-5">
              <ButtonLink href="/thank-you" variant="ghost">Get Free Checklist</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Step 5</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Use tools before you commit
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {toolKits.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <h3 className="text-xl font-bold leading-tight text-ink">{tool.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{tool.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ChecklistCTA />
      <NewsletterSignup />
    </>
  );
}
