import { MailCheck } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingNewsletter({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  if (!definition.newsletter) return null;

  return (
    <Section variant="dark" spacing="compact">
      <div
        id="free-checklist"
        tabIndex={-1}
        className="scroll-mt-24 grid gap-8 focus:outline-none md:grid-cols-[1.05fr_0.95fr] md:items-center"
      >
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-mist">
            <MailCheck aria-hidden="true" size={16} />
            Free checklist
          </p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight text-white md:text-4xl">
            {definition.newsletter.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/68">
            {definition.newsletter.description}
          </p>
        </div>
        <NewsletterForm
          source="landing-china-checklist"
          analyticsVariant="landing"
          landingName={definition.landingName}
          submitLabel="Download free checklist"
        />
      </div>
    </Section>
  );
}
