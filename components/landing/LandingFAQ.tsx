import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import type { LandingPageDefinition } from "@/data/landings";

export function LandingFAQ({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  return (
    <Section variant="warm" containerSize="reading">
      <div data-testid="landing-faq">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
        Quick questions
      </p>
      <h2 className="mt-3 text-3xl leading-tight text-ink md:text-4xl">
        What first-time visitors ask
      </h2>
      <div className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
        {definition.faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-left text-lg font-semibold leading-snug text-ink">
              <span>{faq.question}</span>
              <Plus
                aria-hidden="true"
                className="shrink-0 text-ember transition group-open:rotate-45"
                size={19}
              />
            </summary>
            <p className="max-w-2xl pb-2 pt-3 text-base leading-relaxed text-ink/65">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
      </div>
    </Section>
  );
}
