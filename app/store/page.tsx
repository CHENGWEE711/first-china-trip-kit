import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageIntro } from "@/components/PageIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit Travel Kits | Printable China Planning Guides",
  description:
    "Browse upcoming First China Trip Kit digital products, including Shanghai planning kits, classic China itineraries, and payment setup guides.",
  path: "/store",
});

export default function StorePage() {
  return (
    <>
      <PageIntro
        eyebrow="Store"
        title="Printable China Travel Kits"
        description="Upcoming digital kits for travelers who want checklists, routes, Chinese addresses, booking reminders, and payment setup help in a compact format."
      />
      <section id="early-access" className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-clay">First kit opening soon</p>
            <h2 className="text-3xl font-bold leading-tight">Get notified when this opens</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              The China Payment & Apps Setup Guide is the first planned paid kit.
              Join the newsletter for early access, the launch note, practical
              pre-trip updates, and the free China First-Time Visitor Checklist.
            </p>
          </div>
          <NewsletterForm source="store-notify" compact />
        </div>
      </section>
      <section className="bg-paper px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-ink/10 bg-sand p-5 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-ember">Planning help</p>
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Want a route reviewed before you book?
            </h2>
            <p className="mt-2 max-w-2xl text-base text-ink/68">
              Trip planning calls are not open yet, but you can register interest
              and send your route questions now.
            </p>
          </div>
          <div className="md:shrink-0">
            <ButtonLink href="/contact?service=planning-call">
              Book a China Trip Planning Call
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="bg-mist px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft md:col-span-2">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Free sample</p>
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Start with the free first-time visitor checklist
            </h2>
            <p className="mt-3 text-base text-ink/68">
              The paid Travel Kits are still being prepared, but the free PDF
              checklist is available now and shows the practical style these kits
              will use: documents, payment, apps, hotel addresses, transport,
              food, and emergency phrases.
            </p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <a
              href="/china-first-time-visitor-checklist.pdf"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
            >
              Download free sample
            </a>
            <p className="mt-3 text-sm text-ink/58">
              The sample is free and opens as a PDF.
            </p>
          </div>
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
