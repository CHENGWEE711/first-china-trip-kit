import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ClipboardCheck,
  MapPinned,
  Sparkles,
  Wrench,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import { itineraries } from "@/data/itineraries";
import {
  cityKitMeta,
  cityKitSlugs,
  essentialKits,
  firstTripChecklist,
  itineraryKitSlugs,
  toolKits,
} from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit | Practical China Travel Kit for First-Time Visitors",
  description:
    "A practical China travel kit for first-time foreign visitors with visa tips, payment setup, city kits, transport help, food ordering, tools, and ready-to-use itineraries.",
  path: "/",
});

export default function HomePage() {
  const featuredCities = cityKitSlugs
    .map((slug) => cities.find((city) => city.slug === slug))
    .filter(Boolean);
  const featuredItineraries = itineraryKitSlugs
    .map((slug) => itineraries.find((itinerary) => itinerary.slug === slug))
    .filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="/china-travel-hero.png"
          alt="Practical China travel planning kit with phone, maps, train, and city notes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,42,40,0.88),rgba(47,42,40,0.58)_52%,rgba(47,42,40,0.16))]" />
        <div className="relative mx-auto grid min-h-[76svh] max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-1 text-sm font-semibold text-white/86">
              <Sparkles aria-hidden="true" size={16} />
              First-time China travel made practical
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Your Practical Travel Kit for Your First Trip to China
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/82">
              Visa tips, payment setup, city guides, transport help, food
              recommendations, and ready-to-use itineraries for foreign visitors.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start-here">Start Planning</ButtonLink>
              <ButtonLink href="#free-checklist" variant="secondary" icon={false}>
                Get Free Checklist
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur-md">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-clay">
              <ClipboardCheck aria-hidden="true" size={18} />
              First-Time China Checklist
            </p>
            <div className="grid gap-3">
              {firstTripChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-md bg-white/10 p-3 text-base text-white/86"
                >
                  <BadgeCheck aria-hidden="true" className="mt-0.5 text-clay" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Essential kits"
            title="Solve the practical parts before you land"
            description="Start with the systems that make a first China trip feel manageable: entry, payment, apps, transport, internet, and food ordering."
            actionHref="/travel-essentials"
            actionLabel="Open essentials"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {essentialKits.map((kit) => (
              <Link
                key={kit.title}
                href={kit.href}
                className="group rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-1 text-sm font-bold text-ember">
                  <Wrench aria-hidden="true" size={15} />
                  Kit
                </p>
                <h2 className="text-2xl font-bold leading-tight text-ink">{kit.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{kit.summary}</p>
                <p className="mt-5 text-base font-semibold text-ember group-hover:text-[#982F28]">
                  Open kit
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="City kits"
            title="Choose a practical first China city base"
            description="Each City Kit combines sights, hotel areas, food, transport friction, and useful Chinese addresses."
            actionHref="/city-kits"
            actionLabel="Browse City Kits"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCities.map((city) => {
              if (!city) return null;
              const meta = cityKitMeta[city.slug];
              return (
                <article
                  key={city.id}
                  className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold leading-tight text-ink">
                        {meta.kitTitle}
                      </h2>
                      <p className="mt-1 text-base font-semibold text-ember">
                        {city.chineseName}
                      </p>
                    </div>
                    <span className="rounded-md bg-mist px-2.5 py-1 text-sm font-semibold text-jade">
                      {meta.difficultyLevel}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-base text-ink/70">
                    <p>
                      <strong className="text-ink">Recommended days:</strong>{" "}
                      {city.recommendedDays}
                    </p>
                    <p>
                      <strong className="text-ink">Best for:</strong>{" "}
                      {city.bestFor.slice(0, 3).join(", ")}
                    </p>
                    <p>
                      <strong className="text-ink">Top attractions:</strong>{" "}
                      {city.topAttractions.slice(0, 3).join(", ")}
                    </p>
                    <p>
                      <strong className="text-ink">Chinese address support:</strong>{" "}
                      {meta.chineseAddressSupport}
                    </p>
                  </div>
                  <Link
                    href={`/city-kits/${city.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
                  >
                    Open City Kit
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Itinerary kits"
            title="Ready-to-use routes with real travel pacing"
            description="Pick a route by trip length, then adjust hotel areas, train times, and food stops around your own travel style."
            actionHref="/itinerary-kits"
            actionLabel="Browse Itinerary Kits"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredItineraries.map((itinerary) => {
              if (!itinerary) return null;
              return (
                <Link
                  key={itinerary.id}
                  href={`/itinerary-kits/${itinerary.slug}`}
                  className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
                >
                  <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-1 text-sm font-bold text-ember">
                    <MapPinned aria-hidden="true" size={15} />
                    {itinerary.durationDays} days
                  </p>
                  <h2 className="text-2xl font-bold leading-tight text-ink">
                    {itinerary.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-ink/55">
                    {itinerary.cities.join(" + ")}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink/68">
                    {itinerary.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Tools"
            title="Simple planning tools for first-time visitors"
            description="Use lightweight checkers and planners before you commit to flights, hotels, and train routes."
            actionHref="/tools"
            actionLabel="Open tools"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {toolKits.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <h2 className="text-xl font-bold leading-tight text-ink">{tool.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{tool.summary}</p>
                <p className="mt-5 text-base font-semibold text-ember">Open tool</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id="free-checklist">
        <NewsletterSignup />
      </div>
    </>
  );
}
