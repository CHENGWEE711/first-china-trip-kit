import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure | First China Trip Kit",
  description:
    "Learn how affiliate links support First China Trip Kit and how we keep travel recommendations practical, independent, and transparent.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <>
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Affiliate Disclosure", path: "/affiliate-disclosure" },
        ])}
      />
      <PageIntro
        eyebrow="Transparency"
        title="Affiliate Disclosure"
        description="How partner links may support this independent first-trip planning site without changing the price you pay."
      />
      <section className="px-4 py-12">
        <div className="content-prose mx-auto max-w-4xl rounded-lg border border-ink/10 bg-paper p-6 shadow-soft">
          <h2>How affiliate links work</h2>
          <p>
            Some pages may contain affiliate links. If you use one of these links and
            make a purchase, First China Trip Kit may earn a commission. This does not
            add an extra charge to your purchase.
          </p>

          <h2>How we choose recommendations</h2>
          <p>
            We organize recommendations around practical first-trip needs such as mobile
            data, accommodation, tours, airport transfers, and travel insurance. A
            commission rate does not determine the order of our editorial guidance.
          </p>

          <h2>Independent travel information</h2>
          <p>
            A commercial relationship does not change our commitment to clear, independent
            information. We explain limitations, encourage backup plans, and point readers
            toward official or primary sources when policies or eligibility matter.
          </p>

          <h2>Your responsibility before booking</h2>
          <p>
            Provider availability, prices, coverage, cancellation terms, app support, and
            travel requirements may change. Check the provider&apos;s current terms and verify
            that a product fits your own route before paying.
          </p>

          <h2>Questions or corrections</h2>
          <p>
            Tell us if a recommendation is unclear, outdated, or no longer useful through
            our <Link href="/contact">contact form</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

