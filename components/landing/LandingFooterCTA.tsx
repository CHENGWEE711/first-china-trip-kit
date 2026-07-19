import { ArrowRight } from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { LandingTrackedLink } from "@/components/landing/LandingTrackedLink";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingFooterCTA({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const { footerCta, landingName } = definition;

  return (
    <Section spacing="compact" className="bg-ember text-white">
      <div
        className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"
        data-testid="landing-footer-cta"
      >
        <div>
          <h2 className="text-3xl leading-tight text-white md:text-4xl">{footerCta.title}</h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/78">
            {footerCta.description}
          </p>
        </div>
        <LandingTrackedLink
          action={footerCta.action}
          landingName={landingName}
          className={buttonClassName(
            "secondary",
            "w-full border-white bg-white text-ink hover:border-white hover:bg-paper hover:text-ink md:w-auto md:min-w-48",
          )}
        >
          <span>{footerCta.action.label}</span>
          <ArrowRight aria-hidden="true" size={18} />
        </LandingTrackedLink>
      </div>
    </Section>
  );
}
