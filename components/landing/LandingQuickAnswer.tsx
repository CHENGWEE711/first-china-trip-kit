import { Check } from "lucide-react";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingQuickAnswer({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const { quickAnswer } = definition;

  return (
    <Section variant="warm" spacing="compact" containerSize="reading">
      <div className="border-l-2 border-ember pl-5 md:pl-7" data-testid="landing-quick-answer">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
          Quick answer
        </p>
        <h2 className="mt-3 text-3xl leading-tight text-ink md:text-4xl">
          {quickAnswer.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/68 md:text-lg">
          {quickAnswer.body}
        </p>
        <ul className="mt-6 grid gap-3">
          {quickAnswer.checks.map((check) => (
            <li key={check} className="flex gap-3 text-base leading-relaxed text-ink/72">
              <Check aria-hidden="true" className="mt-1 shrink-0 text-jade" size={18} />
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
