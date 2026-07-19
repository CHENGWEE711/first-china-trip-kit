import { ArrowRight } from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { LandingTrackedLink } from "@/components/landing/LandingTrackedLink";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingPrimaryCTA({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const { primaryCta, landingName } = definition;
  return (
    <Section variant="dark" spacing="compact">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl leading-tight text-white md:text-4xl">{primaryCta.title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/68">
            {primaryCta.description}
          </p>
        </div>
        <LandingTrackedLink
          action={primaryCta.action}
          landingName={landingName}
          className={buttonClassName("primary", "w-full md:w-auto md:min-w-48")}
        >
          <span>{primaryCta.action.label}</span>
          <ArrowRight aria-hidden="true" size={18} />
        </LandingTrackedLink>
      </div>
    </Section>
  );
}
