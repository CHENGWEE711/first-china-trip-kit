import { MailCheck } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterSignup() {
  return (
    <section className="bg-ink px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-white/84">
            <MailCheck aria-hidden="true" size={16} />
            Newsletter
          </p>
          <h2 className="text-3xl font-bold leading-tight">
            Get practical China trip updates before you fly.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/72">
            Get the free China First-Time Visitor Checklist and practical planning notes.
          </p>
        </div>
        <NewsletterForm source="newsletter-section" />
      </div>
    </section>
  );
}
