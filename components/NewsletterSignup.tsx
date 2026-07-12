import { MailCheck } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterSignup() {
  return (
    <section id="newsletter" className="bg-ink px-4 py-14 text-white">
      <div className="editorial-container grid gap-7 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#F0B3A7]">
            <MailCheck aria-hidden="true" size={16} />
            Newsletter
          </p>
          <h2 className="text-4xl leading-tight">
            Get the Free China First Trip Checklist
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/72">
            A practical pre-trip checklist for visa, payment, apps, internet,
            transport, and packing.
          </p>
        </div>
        <NewsletterForm source="newsletter-section" />
      </div>
    </section>
  );
}
