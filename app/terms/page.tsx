import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | First China Trip Kit",
  description:
    "Terms of use for First China Trip Kit travel planning content, digital products, and website information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Terms"
        title="Terms of Use"
        description="The practical terms for using First China Trip Kit travel planning content."
      />
      <section className="px-4 py-12">
        <div className="content-prose mx-auto max-w-4xl rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
          <h2>Travel information</h2>
          <p>
            First China Trip Kit provides general travel planning information. Visa,
            entry, ticketing, transport, safety, and payment details can change.
            Always verify official requirements before booking.
          </p>
          <h2>No professional advice</h2>
          <p>
            The site does not provide legal, immigration, visa, financial, banking,
            medical, or official government advice. Content is for practical trip
            planning only.
          </p>
          <h2>Digital products</h2>
          <p>
            First China Trip Kit sells downloadable digital planning files through
            Payhip. After purchase, customers receive access through Payhip checkout
            or confirmation email. Because these products are downloadable digital
            files, refunds may be limited after download.
          </p>
          <p>
            If you purchased the wrong file or cannot access your guide, contact{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}
            and we will review the issue.
          </p>
          <p>
            You can also review our{" "}
            <Link href="/refund-policy">Digital Delivery and Refund Policy</Link>.
          </p>
          <h2>Payment processing</h2>
          <p>
            Payments are handled by Payhip and its supported payment providers,
            such as PayPal or card payment processors. First China Trip Kit does
            not directly store credit card or payment account details.
          </p>
          <h2>Travel planning disclaimer</h2>
          <p>
            First China Trip Kit provides travel planning information only. We do
            not provide legal, immigration, visa, financial, banking, medical, or
            official government advice. Visa rules, payment app support, transport
            policies, attraction booking requirements, and travel conditions may
            change. Always verify current official requirements before booking or
            traveling.
          </p>
          <h2>No guarantees</h2>
          <p>
            We do not guarantee visa approval, visa-free entry, payment app setup
            success, card acceptance, train ticket availability, attraction entry,
            or any official travel outcome.
          </p>
          <h2>Use of content</h2>
          <p>
            You may use the site for personal trip planning only. Reproducing the
            content for commercial use requires permission.
          </p>
        </div>
      </section>
    </>
  );
}
