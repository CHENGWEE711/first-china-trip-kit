import { MailCheck } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Section } from "@/components/Section";

export function NewsletterSignup() {
  return (
    <Section id="newsletter" variant="dark" spacing="compact">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-mist">
            <MailCheck aria-hidden="true" size={16} />
            Newsletter
          </p>
          <h2 className="max-w-xl text-3xl leading-tight md:text-4xl">
            Get the Free China First Trip Checklist
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/72">
            A practical pre-trip checklist for visa, payment, apps, internet,
            transport, and packing.
          </p>
        </div>
        <NewsletterForm source="newsletter-section" />
      </div>
    </Section>
  );
}
