import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { Container } from "@/components/Container";
import { LandingBreadcrumb } from "@/components/landing/LandingBreadcrumb";
import { LandingTrackedLink } from "@/components/landing/LandingTrackedLink";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingHero({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const { hero, landingName } = definition;

  return (
    <section className="border-b border-ink/12 bg-paper" data-testid="landing-hero">
      <Container
        size="wide"
        className="grid gap-8 py-8 md:py-12 lg:min-h-[650px] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:py-16"
      >
        <div className="max-w-2xl">
          <LandingBreadcrumb definition={definition} />
          <h1 className="text-[43px] leading-[1.03] text-ink sm:text-5xl md:text-6xl lg:text-[64px]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/68 md:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <LandingTrackedLink
              action={hero.primaryAction}
              landingName={landingName}
              className={buttonClassName("primary", "sm:min-w-48")}
              testId="landing-primary-cta"
            >
              <span>{hero.primaryAction.label}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </LandingTrackedLink>
            <LandingTrackedLink
              action={hero.secondaryAction}
              landingName={landingName}
              className={buttonClassName("secondary", "border-transparent bg-transparent shadow-none sm:min-w-44")}
              testId="landing-secondary-cta"
            >
              {hero.secondaryAction.download ? <Download aria-hidden="true" size={17} /> : null}
              <span>{hero.secondaryAction.label}</span>
            </LandingTrackedLink>
          </div>
        </div>

        <figure>
          <div className="relative aspect-[4/3] overflow-hidden bg-mist lg:min-h-[520px] lg:aspect-auto">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: hero.image.position || "center" }}
            />
          </div>
          {hero.image.caption ? (
            <figcaption className="mt-2 text-xs leading-relaxed text-ink/70">
              {hero.image.caption}
            </figcaption>
          ) : null}
        </figure>
      </Container>
    </section>
  );
}
