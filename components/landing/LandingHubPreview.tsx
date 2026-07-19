import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { LandingTrackedLink } from "@/components/landing/LandingTrackedLink";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingHubPreview({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const { hubPreview, landingName } = definition;

  return (
    <section className="bg-paper py-12 md:py-20" data-testid="landing-hub-preview">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
              Next step
            </p>
            <h2 className="mt-3 text-3xl leading-tight text-ink md:text-4xl">
              {hubPreview.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              {hubPreview.description}
            </p>
            <LandingTrackedLink
              action={hubPreview.action}
              landingName={landingName}
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ember transition hover:text-ember-hover"
            >
              <span>{hubPreview.action.label}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </LandingTrackedLink>
          </div>
          <ol className="border-y border-ink/15">
            {hubPreview.items.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-3 border-b border-ink/12 py-6 last:border-b-0 sm:grid-cols-[72px_1fr] sm:gap-5"
              >
                <span className="font-editorial text-4xl text-jade/75" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl leading-tight text-ink">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/62">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
