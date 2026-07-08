import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductActionButton } from "@/components/ProductActionButton";
import { ProductCard } from "@/components/ProductCard";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { products } from "@/data/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Printable China Travel Kits | First China Trip Kit Store",
  description:
    "Download the free China First Trip Checklist and get the $7 Payment & Apps Setup Guide for printable cards, setup checklists, and troubleshooting tables.",
  path: "/store",
});

const insideGuideCards = [
  "Alipay setup checklist",
  "WeChat Pay backup checklist",
  "Payment failure decision tree",
  "Essential app stack",
  "Taxi and checkout phrase cards",
  "First-day test plan",
];

export default function StorePage() {
  const paymentGuide = products.find((product) => product.id === "china-payment-apps-setup-guide");
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const checklistPayhipUrl = process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL || "";
  const productSchema = paymentGuide ? productJsonLd(paymentGuide, "/store") : null;

  return (
    <>
      {productSchema ? <SEOJsonLd data={productSchema} /> : null}
      <section className="bg-sand px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-ember">Store</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-ink md:text-5xl">
              Printable China Travel Kits
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/72">
              Start with the free checklist, then get the $7 Payment & Apps Setup
              Guide if you want printable cards, setup checklists, and
              troubleshooting tables for your first days in China.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductActionButton
                canBuy
                className="mt-0 w-full sm:w-auto"
                eventName={checklistPayhipUrl ? "payhip_checklist_clicked" : "checklist_download_clicked"}
                href={checklistPayhipUrl || "/thank-you"}
                isExternal={Boolean(checklistPayhipUrl)}
                label="Download Free Checklist"
                productId="china-first-trip-checklist"
              />
              <ProductActionButton
                canBuy={Boolean(paymentGuideBuyUrl)}
                className="mt-0 border border-ink/12 bg-paper text-ink hover:border-ember/35 hover:bg-paper hover:text-ember"
                href={paymentGuideBuyUrl || "/store#upcoming-travel-kits"}
                isExternal={Boolean(paymentGuideBuyUrl)}
                label={
                  paymentGuideBuyUrl
                    ? "Buy Payment & Apps Guide — $7"
                    : "Join Payment & Apps Waitlist"
                }
                productId="china-payment-apps-setup-guide"
              />
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <p className="mb-2 text-sm font-bold uppercase text-ember">First paid kit</p>
            <h2 className="text-2xl font-bold leading-tight text-ink">
              China Payment & Apps Setup Guide
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Built for anxious first-time travelers who want printable backup
              cards before relying on Alipay, WeChat Pay, maps, translation,
              ride-hailing, and train bookings.
            </p>
            <div className="mt-5 rounded-md border border-dashed border-ember/35 bg-sand p-4">
              <p className="text-sm font-bold uppercase text-ember">PDF preview coming soon</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/62">
                Preview cards will show sample checklists, phrase cards, and
                decision tables before purchase.
              </p>
            </div>
          </div>
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Inside the guide</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              What the $7 setup guide is designed to solve
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {insideGuideCards.map((card) => (
              <div key={card} className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <h3 className="text-xl font-bold leading-tight text-ink">{card}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">
                  A printable, offline-friendly section you can review before
                  flying and keep available during your first days in China.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="early-access" className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-clay">Product updates</p>
            <h2 className="text-3xl font-bold leading-tight">Get kit updates by email</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              Join the newsletter for the free checklist, Payhip product updates,
              future city kits, and practical pre-trip notes.
            </p>
          </div>
          <NewsletterForm source="store-notify" compact />
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold leading-tight text-ink">
            Digital delivery and refund notes
          </h2>
          <p className="mt-3 text-base text-ink/68">
            Digital kits are delivered through Payhip after purchase. Because these
            are downloadable digital planning files, refunds may be limited after
            download. If you purchased the wrong file or cannot access your guide,
            contact{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-ember">
              {siteConfig.contactEmail}
            </a>{" "}
            and we will review the issue.
          </p>
          <p className="mt-3 text-base text-ink/68">
            Read the{" "}
            <Link href="/refund-policy" className="font-semibold text-ember">
              Digital Delivery and Refund Policy
            </Link>
            .
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
