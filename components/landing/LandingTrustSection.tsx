import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingTrustSection({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  return (
    <Section variant="warm" spacing="compact">
      <div
        className="grid gap-4 md:grid-cols-3"
        aria-label="Trust signals"
        data-testid="landing-trust"
      >
        {definition.trustSignals.map((signal) => (
          <p key={signal} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-ink/70">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-jade" size={19} />
            <span>{signal}</span>
          </p>
        ))}
      </div>
    </Section>
  );
}
