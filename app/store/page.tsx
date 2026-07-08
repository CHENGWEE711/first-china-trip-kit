import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit Travel Kits | Printable China Planning Guides",
  description:
    "Browse upcoming First China Trip Kit digital products, including Shanghai planning kits, classic China itineraries, and payment setup guides.",
  path: "/store",
});

export default function StorePage() {
  const paymentGuideIsOpen = Boolean(process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL);

  return (
    <>
      <PageIntro
        eyebrow="Store"
        title="Printable China Travel Kits"
        description="Free and low-cost digital kits for first-time China travelers who want checklists, payment setup help, Chinese address cards, routes, and practical offline notes."
      />
      <section id="early-access" className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-clay">
              {paymentGuideIsOpen ? "First kit now available" : "First kit waitlist"}
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              China Payment & Apps Setup Guide
            </h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              {paymentGuideIsOpen
                ? "The $7 setup guide is ready on Payhip. You can also use the free checklist first, then come back for printable setup cards and troubleshooting tables."
                : "Join the list for the $7 setup guide, Shanghai kit, and future route packs. The free checklist remains available while paid kits open."}
            </p>
          </div>
          <NewsletterForm source="store-notify" compact />
        </div>
      </section>
      <section id="upcoming-travel-kits" className="px-4 py-12">
        <div className="mx-auto mb-7 max-w-7xl">
          <p className="mb-2 text-sm font-bold uppercase text-ember">Digital products</p>
          <h2 className="text-3xl font-bold leading-tight text-ink">
            Start free, then add the setup pack you need
          </h2>
          <p className="mt-3 max-w-3xl text-base text-ink/68">
            Products open through Payhip when a public product link is configured.
            If a paid product is not open yet, the store shows a waitlist instead
            of a placeholder checkout link.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold leading-tight text-ink">
            Digital delivery and refund notes
          </h2>
          <p className="mt-3 text-base text-ink/68">
            Digital kits are delivered through Payhip after purchase.
            Because these are downloadable digital planning files, refunds may be
            limited after download. If you purchased the wrong file or cannot access
            your guide, contact{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-ember">
              {siteConfig.contactEmail}
            </a>{" "}
            and we will review the issue.
          </p>
          <h2 className="mt-9 text-3xl font-bold leading-tight text-ink">
            Important travel disclaimer
          </h2>
          <p className="mt-3 text-base text-ink/68">
            First China Trip Kit provides travel planning information only. We do
            not provide legal, immigration, visa, financial, or official government
            advice. Visa rules, payment app support, transport policies, and attraction
            booking requirements may change. Always verify current official requirements
            before booking or traveling.
          </p>
        </div>
      </section>
    </>
  );
}
