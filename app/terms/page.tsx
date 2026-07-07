import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";

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
            The site does not provide legal, immigration, medical, financial, or
            security advice. Content is for practical trip planning only.
          </p>
          <h2>Digital products</h2>
          <p>
            Store products are planned digital downloads. When paid products launch,
            checkout, refunds, and delivery terms will be provided at purchase.
          </p>
          <h2>Use of content</h2>
          <p>
            You may use the site for personal trip planning. Reproducing the
            content for commercial use requires permission.
          </p>
        </div>
      </section>
    </>
  );
}
