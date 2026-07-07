import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact First China Trip Kit",
  description:
    "Contact First China Trip Kit for China travel planning questions, partnerships, corrections, and digital guide feedback.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Contact First China Trip Kit"
        description="Send feedback, correction notes, partnership ideas, or questions about printable planning kits."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <Mail aria-hidden="true" className="text-ember" size={26} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">Email</h2>
            <p className="mt-3 text-base text-ink/68">
              For now, direct email is the simplest way to reach the site team.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-base font-semibold text-white"
            >
              {siteConfig.contactEmail}
            </a>
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
      </section>
    </>
  );
}
