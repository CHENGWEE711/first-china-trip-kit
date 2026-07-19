import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LandingTrackedLink } from "@/components/landing/LandingTrackedLink";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";
import type { Guide } from "@/data/guides";

export function LandingRelatedContent({
  definition,
  guides,
}: {
  definition: LandingPageDefinition;
  guides: Guide[];
}) {
  return (
    <Section variant="light">
      <div data-testid="landing-related-content">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
            Related guides
          </p>
          <h2 className="mt-3 text-3xl leading-tight text-ink md:text-4xl">
            Go deeper when you need the detail
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink/58">
          Landing pages answer quickly. Guides explain the practical edge cases.
        </p>
      </div>
      <div className="mt-9 grid gap-8 md:grid-cols-2">
        {guides.map((guide) => {
          const action = {
            label: `Read ${guide.title}`,
            href: `/guides/${guide.slug}`,
            ctaName: "open_related_guide" as const,
            eventName: "landing_cta_clicked" as const,
          };
          return (
            <article key={guide.slug} className="grid gap-5 border-t border-ink/15 pt-5 sm:grid-cols-[150px_1fr]">
              <div className="relative aspect-[3/2] overflow-hidden bg-mist sm:aspect-square">
                <Image
                  src={guide.featuredImage.src}
                  alt={guide.featuredImage.alt}
                  fill
                  sizes="(min-width: 768px) 150px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: guide.featuredImage.position || "center" }}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">
                  {guide.category}
                </p>
                <h3 className="mt-2 text-2xl leading-tight text-ink">{guide.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/62">
                  {guide.summary}
                </p>
                <LandingTrackedLink
                  action={action}
                  landingName={definition.landingName}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-ember transition hover:text-ember-hover"
                >
                  <span>Read guide</span>
                  <ArrowRight aria-hidden="true" size={17} />
                </LandingTrackedLink>
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </Section>
  );
}
