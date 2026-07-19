import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductActionButton } from "@/components/ProductActionButton";
import { ProductCard } from "@/components/ProductCard";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { products } from "@/data/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { hasWhatsAppContact } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Printable China Travel Kits | First China Trip Kit Store",
  description:
    "Download the free China First Trip Checklist and get the $7 Payment & Apps Setup Guide for printable cards, setup checklists, and troubleshooting tables.",
  path: "/store",
  image: "/share/china-first-trip-checklist-share-og.png",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt:
    "Free China First-Trip Visitor Checklist poster with a QR code linking to First China Trip Kit",
});

const freeVsPaidRows = [
  {
    feature: "Pre-flight checklist",
    free: "Yes",
    paid: "Yes",
  },
  {
    feature: "Arrival day checklist",
    free: "Yes",
    paid: "Yes",
  },
  {
    feature: "Alipay setup details",
    free: "Basic reminder",
    paid: "Detailed checklist",
  },
  {
    feature: "WeChat Pay backup plan",
    free: "Basic reminder",
    paid: "Detailed checklist",
  },
  {
    feature: "Payment failure troubleshooting",
    free: "No",
    paid: "Yes",
  },
  {
    feature: "Essential app stack",
    free: "Basic list",
    paid: "Detailed app table",
  },
  {
    feature: "Chinese payment phrases",
    free: "Basic",
    paid: "Expanded phrase cards",
  },
  {
    feature: "Printable offline cards",
    free: "Limited",
    paid: "Yes",
  },
  {
    feature: "Decision tree",
    free: "No",
    paid: "Yes",
  },
  {
    feature: "Best for",
    free: "Quick prep",
    paid: "Anxious first-time travelers",
  },
];

const insideGuideCards = [
  {
    title: "Alipay setup checklist",
    description:
      "Prepare your passport, card, phone number, bank app, and first-day test plan.",
  },
  {
    title: "WeChat Pay backup checklist",
    description:
      "Understand where WeChat is useful and what to do if payment setup does not work.",
  },
  {
    title: "Payment failure decision tree",
    description:
      "Know what to try when your card cannot be added, a QR payment fails, or you lose internet access.",
  },
  {
    title: "Essential China app stack",
    description:
      "See which apps to install before arrival and which ones can wait until later.",
  },
  {
    title: "Taxi and checkout phrase cards",
    description:
      "Show simple Chinese phrases when paying, taking taxis, or asking for help.",
  },
  {
    title: "First-day test plan",
    description:
      "Use a small convenience store purchase to test your payment setup before relying on it.",
  },
];

const paymentGuideFitBullets = [
  "You are worried about Alipay or WeChat Pay setup.",
  "You want printable backup cards.",
  "You want a first-day payment test plan.",
  "You do not want to troubleshoot apps at the airport.",
  "You want a simple offline reference you can save or print before flying.",
];

const paymentGuideNotNeededBullets = [
  "You already have China payment apps tested.",
  "You are comfortable using Chinese apps.",
  "You only need a quick free checklist.",
  "You are traveling with a local guide who handles payments and transport for you.",
];

const paidGuideValueBullets = [
  "More detailed than the free checklist",
  "Designed for first-day problems",
  "Works as an offline backup",
  "Printable cards for taxis, hotels, and checkout counters",
  "Helps you prepare before you arrive tired or jet-lagged",
];

const whatYouGetCards = [
  {
    title: "Printable PDF",
    description:
      "A clean travel kit PDF you can save offline or print before your trip.",
  },
  {
    title: "Setup checklists",
    description:
      "Prepare Alipay, WeChat, maps, translation, internet, and backup payment options.",
  },
  {
    title: "Troubleshooting tables",
    description:
      "Know what to try if your card fails, SMS does not arrive, or QR payment does not work.",
  },
  {
    title: "Phrase cards",
    description:
      "Use simple Chinese phrases for payment, taxis, hotels, and help.",
  },
  {
    title: "Offline backup cards",
    description:
      "Save key hotel, payment, and emergency details in one place.",
  },
];

const previewCards = [
  {
    title: "Cover",
    src: "/products/previews/payment-apps-guide-cover.png",
    alt: "Cover preview for the China Payment and Apps Setup Guide",
  },
  {
    title: "Payment decision tree",
    src: "/products/previews/payment-apps-guide-decision-tree.png",
    alt: "Payment backup decision tree preview from the setup guide",
  },
  {
    title: "Essential app stack",
    src: "/products/previews/payment-apps-guide-app-stack.png",
    alt: "Essential China app stack preview from the setup guide",
  },
  {
    title: "Payment phrase cards",
    src: "/products/previews/payment-apps-guide-phrase-card.png",
    alt: "Useful Chinese payment phrase card preview from the setup guide",
  },
  {
    title: "Hotel address card",
    src: "/products/previews/payment-apps-guide-hotel-card.png",
    alt: "Hotel address card preview from the setup guide",
  },
];

export default function StorePage() {
  const paymentGuide = products.find((product) => product.id === "china-payment-apps-setup-guide");
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const checklistPayhipUrl = process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL || "";
  const whatsappEnabled = hasWhatsAppContact();
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
                placement="store_hero"
                productId="china-first-trip-checklist"
              />
              {paymentGuideBuyUrl ? (
                <ProductActionButton
                  canBuy
                  className="mt-0 border border-ink/12 !bg-paper !text-ink hover:border-ember/35 hover:!bg-paper hover:!text-ember"
                  href={paymentGuideBuyUrl}
                  isExternal
                  label="Buy Payment & Apps Guide — $7"
                  placement="store_hero"
                  productId="china-payment-apps-setup-guide"
                />
              ) : (
                <Link
                  href="#preview-pages"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-center text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember sm:w-auto"
                >
                  Preview the $7 guide
                </Link>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:gap-5">
              <Link
                href="/payments-and-apps"
                className="inline-flex min-h-11 items-center font-semibold text-ember underline decoration-ember/30 underline-offset-4 transition hover:decoration-ember"
              >
                Start with the free Payments & Apps Hub →
              </Link>
              <Link
                href="/visa-free-transit"
                className="inline-flex min-h-11 items-center font-semibold text-jade underline decoration-jade/30 underline-offset-4 transition hover:text-ember"
              >
                Check a visa-free transit route →
              </Link>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-ink/58 sm:grid-cols-2">
              <p className="rounded-md border border-ink/10 bg-paper px-3 py-2">
                {checklistPayhipUrl
                  ? "Download the checklist for free, or optionally support future updates through Payhip."
                  : "The free checklist is available as an immediate local download."}
              </p>
              <p className="rounded-md border border-ink/10 bg-paper px-3 py-2">
                {paymentGuideBuyUrl
                  ? "Secure Payhip checkout for digital delivery."
                  : "Paid checkout is temporarily unavailable; previews remain open."}
              </p>
              <p className="rounded-md border border-ink/10 bg-paper px-3 py-2">
                Printable offline cards for arrival day.
              </p>
              <p className="rounded-md border border-ink/10 bg-paper px-3 py-2">
                No visa, payment, or booking guarantees.
              </p>
              <p className="rounded-md border border-ink/10 bg-paper px-3 py-2">
                Support contact: {siteConfig.contactEmail}
              </p>
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
            <div className="mt-5 overflow-hidden rounded-lg border border-ink/10 bg-sand shadow-soft">
              <Image
                src="/products/previews/payment-apps-guide-store-cover.png"
                alt="Product cover for the China Payment and Apps Setup Guide"
                width={1200}
                height={800}
                priority
                loading="eager"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="h-auto w-full"
              />
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
            Secure checkout and instant digital delivery through Payhip. Start with
            the free checklist, then choose the printable setup guide if you need
            deeper troubleshooting and offline backup cards.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {products.filter((product) => product.status === "available").map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Paid guide value</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Why this guide is paid
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              The free checklist is designed for quick preparation. The paid setup
              guide adds printable cards, troubleshooting tables, app setup checklists,
              and offline backup pages you can save before your flight.
            </p>
          </div>
          <div className="grid gap-3">
            {paidGuideValueBullets.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"
              >
                <p className="text-base font-semibold leading-relaxed text-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Product contents</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              What you get
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whatYouGetCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
              >
                <h3 className="text-xl font-bold leading-tight text-ink">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-ink/10 bg-mist p-5 shadow-soft">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Good fit</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              This guide is for you if
            </h2>
            <ul className="mt-5 grid gap-3 text-base leading-relaxed text-ink/70">
              {paymentGuideFitBullets.map((item) => (
                <li key={item} className="rounded-md border border-ink/10 bg-paper p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
            <p className="mb-2 text-sm font-bold uppercase text-ink/45">Maybe skip it</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              You may not need it if
            </h2>
            <ul className="mt-5 grid gap-3 text-base leading-relaxed text-ink/70">
              {paymentGuideNotNeededBullets.map((item) => (
                <li key={item} className="rounded-md border border-ink/10 bg-paper p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="free-vs-paid" className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Compare</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Free checklist vs. paid setup guide
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft">
            <div className="hidden grid-cols-[1.1fr_0.9fr_1fr] gap-4 border-b border-ink/10 bg-ink px-5 py-4 text-sm font-bold uppercase text-white md:grid">
              <span>Feature</span>
              <span>Free Checklist</span>
              <span>Payment & Apps Setup Guide</span>
            </div>
            <div className="divide-y divide-ink/10">
              {freeVsPaidRows.map((row) => (
                <div
                  key={row.feature}
                  className="grid gap-3 px-5 py-4 text-base text-ink/70 md:grid-cols-[1.1fr_0.9fr_1fr] md:gap-4"
                >
                  <div>
                    <p className="text-xs font-bold uppercase text-ink/42 md:hidden">Feature</p>
                    <p className="font-semibold text-ink">{row.feature}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-ink/42 md:hidden">
                      Free Checklist
                    </p>
                    <p>{row.free}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-ink/42 md:hidden">
                      Payment & Apps Setup Guide
                    </p>
                    <p>{row.paid}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Before you buy</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Read the free setup guides first
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              The paid PDF is a printable setup pack. These free guides explain the
              same travel-planning principles online before you decide whether the
              offline cards and tables are useful for your trip.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "How to Pay in China as a Foreigner",
                href: "/guides/how-to-pay-in-china-as-a-foreigner",
                body: "Understand Alipay, WeChat Pay, cards, cash, QR flows, and first-day payment testing.",
              },
              {
                title: "Best Apps for Traveling in China",
                href: "/guides/best-apps-for-traveling-in-china",
                body: "Build a practical app stack for payment, maps, translation, ride-hailing, trains, and backups.",
              },
              {
                title: "How to Use Alipay in China as a Tourist",
                href: "/guides/how-to-use-alipay-in-china-as-a-tourist",
                body: "Prepare card linking, QR payment habits, first purchase tests, and backup options.",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft transition hover:border-ember/35"
              >
                <h3 className="text-xl font-bold leading-tight text-ink">{link.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{link.body}</p>
                <p className="mt-5 text-base font-semibold text-ember">Read guide</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="inside-the-guide" className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Inside the guide</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Inside the Payment & Apps Setup Guide
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {insideGuideCards.map((card) => (
              <div key={card.title} className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <h3 className="text-xl font-bold leading-tight text-ink">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preview-pages" className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Preview</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Preview the guide
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              See sample pages from the printable setup guide before you buy.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {previewCards.map((card) => (
              <a
                key={card.src}
                className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft"
                href={card.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={900}
                  height={1164}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <div className="border-t border-ink/10 p-4">
                  <h3 className="text-base font-bold leading-tight text-ink">{card.title}</h3>
                  <p className="mt-1 text-sm text-ink/58">Open larger preview</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Ready to prepare your first-day payment setup?
            </h2>
            {paymentGuideBuyUrl ? (
              <ProductActionButton
                canBuy
                className="mt-5"
                href={paymentGuideBuyUrl}
                isExternal
                label="Buy Payment & Apps Guide — $7"
                placement="store_preview"
                productId="china-payment-apps-setup-guide"
              />
            ) : (
              <div className="mt-5 rounded-md border border-ember/25 bg-sand p-4" role="status">
                <p className="font-bold text-ink">Secure checkout is temporarily unavailable.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/68">
                  The preview pages are real and available above. Contact support
                  if you would like a notification when Payhip checkout returns.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-ember hover:text-ember-hover"
                >
                  Contact support
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="product-updates" className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-mist">Product updates</p>
            <h2 className="text-3xl font-bold leading-tight">Want future travel kits?</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              Join the list for new city kits, route packs, and China travel updates.
            </p>
          </div>
          <NewsletterForm source="store-notify" compact />
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Digital delivery and refund notes
            </h2>
            <p className="mt-3 text-base text-ink/68">
              Digital kits are delivered through Payhip after purchase. {" "}
              Because these are downloadable digital planning files, refunds may be
              limited after download. If you purchased the wrong file or cannot access your guide,
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
          {whatsappEnabled ? (
            <aside className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
              <h2 className="text-2xl font-bold leading-tight text-ink">
                Need help choosing a guide?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/68">
                Message us on WhatsApp with your travel month, trip length, and
                the problem you are trying to solve.
              </p>
              <WhatsAppLink
                placement="store_support"
                sourcePage="/store"
                className="mt-5 w-full sm:w-fit"
              />
              <p className="mt-4 text-sm leading-relaxed text-ink/58">
                WhatsApp is for general trip-planning and digital-product support
                questions. We do not provide legal, immigration, visa, financial,
                or official government advice.
              </p>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
