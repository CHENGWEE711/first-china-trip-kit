import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { editorialImages } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "About First China Trip Kit",
  description:
    "First China Trip Kit helps foreign visitors plan their first China trip with clear English city guides, itineraries, payment tips, transport help, and useful phrases.",
  path: "/about",
});

const principles = [
  "We write for first-time visitors, not China insiders.",
  "We focus on practical decisions: where to stay, how to pay, how to move, what to eat, and what to avoid.",
  "Our routes leave room for jet lag, station transfers, weather, and real travel delays.",
  "We explain China-specific systems in plain English without making the country feel intimidating.",
];

const trustPoints = [
  "We separate practical planning guidance from official requirements, especially for visas, transit rules, transport policies, and payments.",
  "We write routes around real travel friction: jet lag, station transfers, weather, phone setup, payment failures, and hotel address problems.",
  "We prioritize first-time visitor questions over insider shorthand, so pages explain why a decision matters before asking you to book anything.",
  "We keep official-resource links visible on policy-sensitive pages and encourage travelers to verify requirements before making non-refundable plans.",
];

const credibilityBlocks = [
  {
    title: "Built from a China-based perspective",
    body:
      "First China Trip Kit is written around the practical friction travelers meet on the ground in China: mobile payment, Chinese addresses, railway stations, hotel registration, QR menus, local apps, and first-day arrival stress.",
  },
  {
    title: "How we research and update guides",
    body:
      "We update pages by combining first-time visitor questions, route logic, local logistics, and official-source checks for topics where rules can change. Pages show a last updated date when they are published as guides.",
  },
  {
    title: "Correction policy",
    body:
      "If a reader spots outdated, confusing, or incorrect information, we review the issue and update the relevant page when the correction improves trip planning or safety. We prefer clear fixes over quiet edits.",
  },
  {
    title: "Official-source-first policy",
    body:
      "For visa, payment, train, and booking information, we treat official or provider sources as the first verification layer. Our pages explain planning decisions, but travelers should verify current requirements before booking.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="editorial-section bg-paper">
        <div className="editorial-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">About</p>
            <h1 className="mt-3 text-5xl leading-[1.06] md:text-6xl">China travel advice built around the moments that feel unfamiliar</h1>
            <p className="mt-6 max-w-2xl text-lg text-ink/65">We help first-time visitors make practical decisions about payment, apps, transport, cities, food and realistic daily pacing.</p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg"><Image src={editorialImages.transport.src} alt={editorialImages.transport.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div>
        </div>
      </header>
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-3xl font-bold leading-tight text-ink">What we promise travelers</h2>
            <p className="mt-4 text-base text-ink/70">
              China can be one of the most rewarding first trips in Asia, but the
              planning details feel different from many other destinations. Mobile
              payment, train stations, local apps, Chinese addresses, and ticket
              reservations can create friction before travelers even choose what
              they want to see.
            </p>
            <p className="mt-4 text-base text-ink/70">
              First China Trip Kit is designed as a calm English planning layer:
              enough context to make good decisions, enough structure to build a
              route, and enough practical detail to avoid common first-day stress.
            </p>
            <div className="mt-6">
              <ButtonLink href="/itinerary-kits">Browse itinerary kits</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4">
            {principles.map((principle) => (
              <article key={principle} className="rounded-lg border border-ink/10 bg-sand p-5">
                <p className="text-lg font-semibold leading-relaxed text-ink">{principle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Why trust us</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Practical advice, with official checks where they matter
            </h2>
            <p className="mt-3 text-base text-ink/68">
              First China Trip Kit is not a visa office, travel agency, or legal
              adviser. It is a planning layer built to help first-time visitors
              ask better questions, avoid common mistakes, and verify the details
              that can change before booking.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {trustPoints.map((point) => (
              <article key={point} className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <p className="text-base leading-relaxed text-ink/72">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Editorial standards</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              How we keep the kit useful and trustworthy
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {credibilityBlocks.map((block) => (
              <article key={block.title} className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <h3 className="text-2xl font-bold leading-tight text-ink">{block.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/70">{block.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-ink/10 bg-sand p-5">
            <p className="text-sm font-bold uppercase text-ember">Contact</p>
            <p className="mt-2 text-base leading-relaxed text-ink/70">
              For questions, corrections, or partnerships, contact{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-semibold text-ember hover:text-[#982F28]"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
