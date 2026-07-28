import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, FileText, MapPinned, ShieldCheck, Smartphone, WalletCards, Wifi } from "lucide-react";
import { ProductActionButton } from "@/components/ProductActionButton";
import { ProductLadderComparison } from "@/components/ProductLadderComparison";
import { ProductPageView } from "@/components/ProductPageView";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { products } from "@/data/products";
import { payhipUrls } from "@/lib/payhip";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";

const path = "/products/china-arrival-setup-bundle";
const bundle = products.find((product) => product.id === "china-arrival-setup-bundle");
const bundleInclusion = "includes the complete $7 Payment & Apps Guide";

export const metadata: Metadata = buildMetadata({
  title: "China Arrival Setup Bundle - $19 | First China Trip Kit",
  description: "A seven-file pre-arrival setup system for first-time China visitors: payments, internet, addresses, airport transfer, first-day plan and offline cards.",
  path,
  image: "/products/previews/arrival-bundle-v2-setup-routes.png",
  imageAlt: "15, 30 and 60 minute China arrival setup routes",
  imageWidth: 1191,
  imageHeight: 1684,
});

const outcomes = [
  [WalletCards, "A payment backup plan"],
  [Smartphone, "Essential apps installed"],
  [Wifi, "An internet option selected"],
  [MapPinned, "Your hotel address saved in Chinese"],
  [MapPinned, "Your airport-to-hotel route planned"],
  [FileText, "Offline emergency cards saved"],
  [FileText, "A personal Arrival Sheet completed"],
  [Clock3, "A first-24-hours plan ready"],
] as const;

const files = [
  ["00", "Read Me First", "15, 30 and 60 minute setup routes, file map and important limitations."],
  ["01", "China Arrival Setup Guide", "30-page pre-arrival sequence for network, address, transport, first-day planning and fallbacks."],
  ["02", "Payment & Apps Setup Guide", "The complete current $7 guide - included in full, not a shortened version."],
  ["03", "Mobile Quick Cards", "10 large bilingual cards for an address, transport, payment, internet and help."],
  ["04", "My China Arrival Sheet", "A fillable local PDF for your own route, contact and backup plan."],
  ["05", "Troubleshooting Decision Trees", "Five visual flows for payment, ride, hotel, internet and station problems."],
  ["06", "Offline Checklist and Sources", "Time-ordered checklists, update notes and a primary-source review log."],
] as const;

const previews = [
  ["15 / 30 / 60 minute routes", "/products/previews/arrival-bundle-v2-setup-routes.png", "Three time-based pre-arrival setup routes from the Bundle"],
  ["Payment failure flow", "/products/previews/arrival-bundle-v2-payment-tree.png", "Payment troubleshooting decision tree preview"],
  ["Mobile address card", "/products/previews/arrival-bundle-v2-address-card.png", "Bilingual mobile hotel address card preview"],
  ["First 24 hours", "/products/previews/arrival-bundle-v2-first-24-hours.png", "First 24 hours after landing timeline preview"],
  ["Fillable Arrival Sheet", "/products/previews/arrival-bundle-v2-arrival-sheet.png", "Fillable China Arrival Sheet preview"],
] as const;

export default function ChinaArrivalSetupBundlePage() {
  if (!bundle) throw new Error("Missing China Arrival Setup Bundle product data.");
  const bundleBuyUrl = payhipUrls.arrivalBundle;
  const paymentGuideBuyUrl = payhipUrls.paymentGuide;

  return (
    <>
      <SEOJsonLd data={[productJsonLd(bundle, path), breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Store", path: "/store" },
        { name: bundle.title, path },
      ])]} />
      <ProductPageView eventName="arrival_bundle_viewed" productId={bundle.id} placement="bundle_landing" />

      <section className="bg-sand px-4 py-14 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-ink/58"><Link href="/" className="hover:text-ember">Home</Link><span aria-hidden="true" className="mx-2">/</span><Link href="/store" className="hover:text-ember">Store</Link></nav>
            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-ember">China Arrival Setup Bundle - $19</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-5xl">Arrive in China with payments, internet, addresses and your first ride already sorted.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">A practical pre-arrival setup system for first-time visitors who want fewer surprises after landing.</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/68">This Bundle {bundleInclusion}, then adds a first-day plan, network and address setup, offline cards, a fillable Arrival Sheet and decision-tree fallbacks.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {bundleBuyUrl ? <ProductActionButton canBuy href={bundleBuyUrl} isExternal label="Get the Arrival Setup Bundle - $19" eventName="arrival_bundle_buy_clicked" productId={bundle.id} placement="bundle_hero" price="19" /> : <a href="#bundle-preview" className="inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-ember-hover">See the real previews</a>}
              <Link href="/tools/china-arrival-readiness-checker" className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/15 bg-paper px-5 py-3 text-base font-semibold text-ink transition hover:border-ember hover:text-ember">Try the free readiness checker</Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/58">Instant digital delivery is handled by Payhip after purchase. No payment, network, entry or transport outcome is guaranteed.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper p-3 shadow-soft">
            <Image src="/products/previews/arrival-bundle-v2-setup-routes.png" alt="15, 30 and 60 minute arrival setup routes from the Bundle" width={1191} height={1684} loading="eager" sizes="(min-width: 1024px) 44vw, 100vw" className="h-auto w-full rounded-md" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-ember">What you&apos;ll have ready before you fly</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-ink">A prepared first day, not a pile of general travel reading.</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map(([Icon, text]) => <div key={text} className="flex min-h-24 gap-3 rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"><Icon aria-hidden="true" className="mt-0.5 shrink-0 text-jade" size={21} /><p className="font-semibold leading-relaxed text-ink">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ember">Seven focused files</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">Open the right tool at the right moment.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/68">The Bundle is not a single oversized PDF. Each file has one job, clear ordering and a name that makes sense after purchase.</p>
          </div>
          <ol className="grid gap-3">
            {files.map(([number, title, description]) => <li key={number} className="grid gap-3 rounded-lg border border-ink/10 bg-sand/50 p-4 sm:grid-cols-[3.5rem_1fr]"><span className="grid h-11 w-11 place-items-center rounded-md bg-ink text-sm font-bold text-white">{number}</span><div><h3 className="font-bold text-ink">{title}</h3><p className="mt-1 text-sm leading-relaxed text-ink/68">{description}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section id="bundle-preview" className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wide text-ember">Real inner-page previews</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-ink">See the working tools before you buy.</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">These are genuine Bundle pages: no cover-only mockups and no placeholder screenshots.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {previews.map(([title, src, alt]) => <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft transition hover:border-ember/35"><Image src={src} alt={alt} width={900} height={1164} sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full" /><span className="block border-t border-ink/10 p-4 text-sm font-bold leading-tight text-ink">{title}</span></a>)}
          </div>
          <a href="/products/previews/china-arrival-setup-bundle-preview.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center font-semibold text-ember underline underline-offset-4 hover:text-ember-hover"><FileText aria-hidden="true" className="mr-2" size={18} />Open the real PDF preview - two pages</a>
        </div>
      </section>

      <ProductLadderComparison />

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-lg border border-jade/30 bg-mist p-5 shadow-soft"><p className="text-sm font-bold uppercase tracking-wide text-jade">Good fit</p><h2 className="mt-2 text-3xl font-bold leading-tight text-ink">This is for you if...</h2><ul className="mt-5 grid gap-3 text-base leading-relaxed text-ink/72">{["This is your first China trip.", "You travel independently or do not speak Chinese.", "You are concerned about payments, data or finding the hotel.", "You want the first day planned before a long flight.", "You need offline cards and personal route fields."].map((item) => <li key={item} className="flex gap-2"><Check aria-hidden="true" className="mt-1 shrink-0 text-jade" size={18} />{item}</li>)}</ul></article>
          <article className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft"><p className="text-sm font-bold uppercase tracking-wide text-ink/48">Not the right fit</p><h2 className="mt-2 text-3xl font-bold leading-tight text-ink">Skip the Bundle if...</h2><ul className="mt-5 grid gap-3 text-base leading-relaxed text-ink/72">{["You need detailed sightseeing itineraries or a live travel concierge.", "You want visa or legal advice.", "You already live in China and have your arrival systems in place.", "You only need payment and app setup - choose the $7 Guide instead."].map((item) => <li key={item}>{item}</li>)}</ul>{paymentGuideBuyUrl ? <ProductActionButton canBuy className="mt-6 !bg-ink hover:!bg-ink/85" href={paymentGuideBuyUrl} isExternal label="Get the Payment & Apps Guide - $7" eventName="payment_guide_buy_clicked" productId="china-payment-apps-setup-guide" placement="bundle_downsell" price="7" /> : <Link href="/store#preview-pages" className="mt-6 inline-flex min-h-11 items-center font-semibold text-ember underline underline-offset-4">Preview the $7 Guide</Link>}</article>
        </div>
      </section>

      <section className="bg-ink px-4 py-12 text-white">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1fr_auto] md:items-center"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-mist"><ShieldCheck aria-hidden="true" size={18} />Delivery, refund and limitations</p><h2 className="mt-2 text-3xl font-bold leading-tight">A digital planning tool, delivered immediately.</h2><p className="mt-3 text-base leading-relaxed text-white/72">Payhip provides the seven downloadable files after purchase. Review the real previews first: refunds may be limited after download. This product is general travel-planning information only; always verify current entry, payment, carrier and transport requirements with the relevant official source.</p></div>{bundleBuyUrl ? <ProductActionButton canBuy href={bundleBuyUrl} isExternal label="Get the Arrival Setup Bundle - $19" eventName="arrival_bundle_buy_clicked" productId={bundle.id} placement="bundle_footer" price="19" /> : <a href="#bundle-preview" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10">See the real previews</a>}</div>
      </section>
    </>
  );
}
