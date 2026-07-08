import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Digital Delivery and Refund Policy | First China Trip Kit",
  description:
    "Learn how First China Trip Kit digital products are delivered through Payhip and how refund requests are reviewed.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Refund policy"
        title="Digital Delivery and Refund Policy"
        description="How digital travel kits are delivered and how access or refund issues are reviewed."
      />
      <section className="px-4 py-12">
        <div className="content-prose mx-auto max-w-4xl rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
          <h2>Digital delivery</h2>
          <p>
            Digital kits are delivered through Payhip after purchase. You should
            receive access through the Payhip checkout flow or confirmation email.
          </p>

          <h2>Refund notes</h2>
          <p>
            Because these are downloadable digital planning files, refunds may be
            limited after download. If you purchased the wrong file, were charged
            incorrectly, or cannot access your guide, contact{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}
            and we will review the issue.
          </p>

          <h2>Travel planning disclaimer</h2>
          <p>
            Our products provide travel planning information only. We do not provide
            legal, immigration, visa, financial, banking, medical, or official
            government advice. Always verify current official requirements before
            booking or traveling.
          </p>

          <h2>Support contact</h2>
          <p>
            For support, email{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
