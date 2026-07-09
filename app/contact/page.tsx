import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Ask a China Trip Question | First China Trip Kit",
  description:
    "Ask First China Trip Kit a China travel planning question, request a correction, or ask about partnerships and future custom itinerary help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Ask a China Trip Question"
        description="Tell us your travel month, passport country, trip length, and the cities you are considering. We use this information to understand your question and suggest the most practical next step."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm source="contact-page" />
          <div className="grid gap-6">
            <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              <Mail aria-hidden="true" className="text-ember" size={26} />
              <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">Email</h2>
              <p className="mt-3 text-base text-ink/68">
                For questions, corrections, or partnerships, contact{" "}
                {siteConfig.contactEmail}.
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center break-all rounded-md bg-ember px-5 py-3 text-center text-base font-semibold text-white sm:w-auto"
              >
                {siteConfig.contactEmail}
              </a>
            </section>
            <section className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
              <MessageCircle aria-hidden="true" className="text-ember" size={26} />
              <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">WhatsApp</h2>
              <p className="mt-3 text-base text-ink/68">
                WhatsApp replies are being prepared. If you prefer WhatsApp, mention
                it in the form and include the best number to contact.
              </p>
            </section>
            <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
              <h2 className="text-2xl font-bold leading-tight">
                Get practical China trip updates before you fly.
              </h2>
              <p className="mt-3 text-base text-white/72">
                Get the free China First-Time Visitor Checklist and practical planning notes.
              </p>
              <div className="mt-5">
                <NewsletterForm source="contact-page" compact />
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Next step</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Not sure where to start?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/start-here",
                title: "Start Here",
                body: "Work through the first-trip preparation sequence.",
              },
              {
                href: "/thank-you",
                title: "Download Free Checklist",
                body: "Get the printable China First Trip Checklist.",
              },
              {
                href: "/city-kits",
                title: "Browse City Kits",
                body: "Choose your first city base and useful Chinese addresses.",
              },
              {
                href: "/store",
                title: "View Travel Kits",
                body: "See printable guides and upcoming route packs.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:border-ember/35"
              >
                <h3 className="text-xl font-bold leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
