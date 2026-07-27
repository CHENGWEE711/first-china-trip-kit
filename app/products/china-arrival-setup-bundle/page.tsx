import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Download, FileText, ShieldCheck } from "lucide-react";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { ProductActionButton } from "@/components/ProductActionButton";
import { ProductPageView } from "@/components/ProductPageView";
import { products } from "@/data/products";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { payhipUrls } from "@/lib/payhip";

const path = "/products/china-arrival-setup-bundle";
const bundle = products.find((product) => product.id === "china-arrival-setup-bundle");

export const metadata: Metadata = buildMetadata({
  title: "China Arrival Setup Bundle - $19 | First China Trip Kit",
  description: "A printable China arrival-day bundle with entry, payment, apps, transport, hotel-address and emergency-backup checklists for first-time visitors.",
  path,
  image: "/products/previews/china-arrival-setup-bundle-preview-1.png",
  imageAlt: "Preview page from the China Arrival Setup Bundle PDF",
  imageWidth: 1191,
  imageHeight: 1684,
});

const comparison = [
  ["Preparation depth", "Quick before-you-fly list", "Payments and apps focus", "Complete arrival-day system"],
  ["PDF format", "Yes", "Yes", "Yes - 3 printable sections"],
  ["Payment troubleshooting", "Basic reminders", "Detailed", "Included with arrival decision plan"],
  ["Hotel and transport backup", "Basic", "Hotel card", "Hotel, pickup and fallback plan"],
  ["Price", "$0", "$7", "$19"],
];

export default function ChinaArrivalSetupBundlePage() {
  if (!bundle) throw new Error("Missing China Arrival Setup Bundle product data.");
  const buyUrl = payhipUrls.arrivalBundle;
  const canBuy = Boolean(buyUrl);

  return (
    <>
      <SEOJsonLd data={[productJsonLd(bundle, path), breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Store", path: "/store" },
        { name: bundle.title, path },
      ])]} />
      <ProductPageView eventName="arrival_bundle_viewed" productId={bundle.id} placement="bundle_landing" />
      <section className="bg-sand px-4 py-14 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-ink/58"><Link href="/" className="hover:text-ember">Home</Link><span aria-hidden="true" className="mx-2">/</span><Link href="/store" className="hover:text-ember">Store</Link></nav>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-ember">Printable arrival-day plan</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-5xl">China Arrival Setup Bundle</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">A calm, printable system for the moments before and after landing: documents, payment and app backups, airport-to-hotel transport, Chinese hotel details and an offline emergency plan.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {canBuy ? <ProductActionButton canBuy href={buyUrl} isExternal label="Buy securely on Payhip - $19" eventName="arrival_bundle_buy_clicked" productId={bundle.id} placement="bundle_hero" price="19" /> : <a href="#bundle-preview" className="inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-ember-hover">Preview the Bundle</a>}
              <Link href="/tools/china-arrival-readiness-checker" className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/15 bg-paper px-5 py-3 text-base font-semibold text-ink transition hover:border-ember hover:text-ember">Try the free readiness checker</Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/58">{canBuy ? "Instant digital delivery is handled by Payhip after purchase." : "Payhip checkout will appear here when the verified product link is configured. The complete sample preview is available now."}</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper p-3 shadow-soft">
            <Image src="/products/previews/china-arrival-setup-bundle-preview-1.png" alt="China Arrival Setup Bundle command sheet preview" width={1191} height={1684} priority sizes="(min-width: 1024px) 44vw, 100vw" className="h-auto w-full rounded-md" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div><p className="text-sm font-bold uppercase tracking-wide text-ember">The problem it solves</p><h2 className="mt-2 text-3xl font-bold leading-tight text-ink">Do not solve every first-day problem at once.</h2><p className="mt-4 text-base leading-relaxed text-ink/68">The bundle turns common arrival friction into a simple order: prove your entry path, get connected, use a saved hotel address, reach the hotel, then make a small test payment. It is designed as an offline companion, not a substitute for official advice.</p></div>
        <ul className="grid gap-3 sm:grid-cols-2">{bundle.includes.map((item) => <li key={item} className="flex gap-3 border-l-2 border-jade/45 bg-mist/50 px-4 py-4 text-base leading-relaxed text-ink/75"><Check aria-hidden="true" className="mt-0.5 shrink-0 text-jade" size={19} />{item}</li>)}</ul>
      </div></section>

      <section id="bundle-preview" className="bg-mist px-4 py-12"><div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div><p className="text-sm font-bold uppercase tracking-wide text-ember">Real PDF preview</p><h2 className="mt-2 text-3xl font-bold leading-tight text-ink">See the command sheet before you buy.</h2><p className="mt-4 text-base leading-relaxed text-ink/68">The preview is a real PDF page, not a mockup. It shows the first section of the printable arrival-day command sheet and the scope of the full bundle.</p><a href="/products/previews/china-arrival-setup-bundle-preview.pdf" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-ember underline underline-offset-4 hover:text-ember-hover"><FileText aria-hidden="true" size={18} />Open the real PDF preview</a></div>
        <a href="/products/previews/china-arrival-setup-bundle-preview.pdf" target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-lg border border-ink/10 bg-paper p-3 shadow-soft transition hover:border-ember/35"><Image src="/products/previews/china-arrival-setup-bundle-preview-1.png" alt="First page preview for the China Arrival Setup Bundle PDF" width={1191} height={1684} sizes="(min-width: 1024px) 52vw, 100vw" className="h-auto w-full rounded-md" /></a>
      </div></section>

      <section className="px-4 py-12"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-wide text-ember">Choose the right level</p><h2 className="mt-2 text-3xl font-bold leading-tight text-ink">Free checklist, $7 guide or $19 arrival bundle</h2><div className="mt-6 overflow-x-auto rounded-lg border border-ink/10"><table className="min-w-[720px] w-full text-left text-sm"><thead className="bg-ink text-white"><tr>{["Feature", "Free checklist", "Payment & Apps Guide", "Arrival Setup Bundle"].map((heading) => <th key={heading} scope="col" className="px-4 py-3 font-bold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-ink/10">{comparison.map((row) => <tr key={row[0]} className="bg-paper even:bg-sand/50">{row.map((cell, index) => <td key={cell} className={`px-4 py-3 leading-relaxed ${index === 0 ? "font-semibold text-ink" : "text-ink/70"}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>

      <section className="bg-paper px-4 py-12"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2"><div className="rounded-lg border border-jade/30 bg-mist p-5"><h2 className="text-2xl font-bold leading-tight text-ink">This is for you if...</h2><ul className="mt-4 grid gap-3 text-base leading-relaxed text-ink/72"><li>You are visiting China for the first time and want a printed arrival plan.</li><li>You prefer backups for payment, phone data, transport and hotel details.</li><li>You want a calm sequence after an international flight, not more browser tabs.</li></ul></div><div className="rounded-lg border border-ink/10 bg-sand p-5"><h2 className="text-2xl font-bold leading-tight text-ink">This is not for you if...</h2><ul className="mt-4 grid gap-3 text-base leading-relaxed text-ink/72"><li>You need a visa decision, immigration representation or a payment-provider guarantee.</li><li>You have already tested your apps, payment, data and arrival logistics and only need a quick reminder.</li><li>You expect physical shipping - this is an instant digital PDF product.</li></ul></div></div></section>

      <section className="bg-ink px-4 py-12 text-white"><div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1fr_auto] md:items-center"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-mist"><ShieldCheck aria-hidden="true" size={18} />Delivery, refund and disclaimer</p><h2 className="mt-2 text-3xl font-bold leading-tight">A digital planning tool, delivered immediately.</h2><p className="mt-3 text-base leading-relaxed text-white/72">Payhip provides the digital download after purchase. Please review the preview first: because downloadable files can be accessed immediately, refunds may be limited after download. This product is general travel-planning information only; always verify current entry, payment, carrier and transport requirements with the relevant official source.</p></div>{canBuy ? <ProductActionButton canBuy href={buyUrl} isExternal label="Buy on Payhip - $19" eventName="arrival_bundle_buy_clicked" productId={bundle.id} placement="bundle_footer" price="19" /> : <a href="/products/china-arrival-setup-bundle.pdf" download className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-base font-semibold text-white hover:bg-white/10"><Download aria-hidden="true" size={18} />View included PDF</a>}</div></section>
    </>
  );
}
