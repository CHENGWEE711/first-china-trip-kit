import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit Store | Printable China Travel Planning Guides",
  description:
    "Browse upcoming First China Trip Kit digital products, including Shanghai planning kits, classic China itineraries, and payment setup guides.",
  path: "/store",
});

export default function StorePage() {
  return (
    <>
      <PageIntro
        eyebrow="Store"
        title="Printable China travel planning kits"
        description="Digital products are being prepared for travelers who want checklists, routes, Chinese addresses, booking reminders, and payment setup help in a compact format."
      />
      <section className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-clay">First kit opening soon</p>
            <h2 className="text-3xl font-bold leading-tight">Get notified when this opens</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              The China Payment & Apps Setup Guide is the first planned paid kit.
              Join the newsletter for the launch note and practical pre-trip updates.
            </p>
          </div>
          <NewsletterForm source="store-notify" compact />
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold leading-tight text-ink">Digital checkout is being prepared</h2>
          <p className="mt-3 text-base text-ink/68">
            The first kits will open as downloadable PDFs with clear delivery,
            update, and refund notes before purchase. For now, the product cards
            show what is planned so travelers can see what is coming next.
          </p>
        </div>
      </section>
    </>
  );
}
