import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";

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

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="First China Trip Kit helps first-time visitors plan with confidence"
        description="The site turns China trip planning into clear city choices, realistic routes, payment preparation, transport notes, food ideas, and practical phrases."
      />
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
              <ButtonLink href="/itineraries">Browse itineraries</ButtonLink>
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
    </>
  );
}
