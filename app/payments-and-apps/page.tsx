import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CloudOff,
  CreditCard,
  LayoutGrid,
  Route,
  Smartphone,
  WalletCards,
  Wifi,
} from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import {
  BackupPlan,
  GuidePreview,
  InteractiveChecklist,
  InternetDecisionTree,
  PaymentHubView,
  PaymentReadinessChecker,
} from "@/components/PaymentHubInteractive";
import { ProductActionButton } from "@/components/ProductActionButton";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TrackedLink } from "@/components/TrackedLink";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "China Payments & Essential Apps Hub | First Trip Setup",
  description:
    "Set up China payments, essential apps, internet, arrival-day backups and a practical readiness score before your first trip.",
  path: "/payments-and-apps",
  image: "/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp",
  imageAlt: "Traveler presenting a smartphone QR code at a checkout terminal",
  imageWidth: 2400,
  imageHeight: 1600,
});

const quickStartSteps = [
  {
    number: "01",
    title: "Payments",
    time: "5 min",
    body: "Build four payment layers and check what is still missing.",
    href: "#payments",
    icon: WalletCards,
  },
  {
    number: "02",
    title: "Apps",
    time: "4 min",
    body: "Install the smallest useful stack in the right order.",
    href: "#apps",
    icon: LayoutGrid,
  },
  {
    number: "03",
    title: "Internet",
    time: "3 min",
    body: "Choose a starting option for your phone and trip length.",
    href: "#internet",
    icon: Wifi,
  },
  {
    number: "04",
    title: "Offline Backup",
    time: "3 min",
    body: "Save the details that still work when your phone does not.",
    href: "#backup-plan",
    icon: CloudOff,
  },
] as const;

const paymentLayers = [
  {
    label: "Primary Wallet",
    icon: Smartphone,
    accent: "bg-ember text-white",
    width: "lg:w-[58%]",
    when: "Everyday QR payments after a low-value first-day test.",
    why: "It covers the payment flow used by many taxis, cafes, shops, and restaurants.",
    mistake: "Installing at the airport or linking only one card.",
  },
  {
    label: "Backup Wallet",
    icon: WalletCards,
    accent: "bg-[#d77d62] text-white",
    width: "lg:w-[72%]",
    when: "When the primary wallet, merchant flow, or linked card fails.",
    why: "A second wallet creates another route without stopping the day.",
    mistake: "Assuming setup will be identical for every account and phone number.",
  },
  {
    label: "Physical Card",
    icon: CreditCard,
    accent: "bg-[#c9b78e] text-ink",
    width: "lg:w-[86%]",
    when: "Hotels, deposits, larger purchases, and card-friendly merchants.",
    why: "It remains useful outside the wallet and for some pre-authorizations.",
    mistake: "Expecting direct card acceptance at every local merchant.",
  },
  {
    label: "Emergency Cash",
    icon: Banknote,
    accent: "bg-[#718d78] text-white",
    width: "lg:w-full",
    when: "Weak data, low battery, failed verification, or a late arrival.",
    why: "Small RMB notes work without an app, login, or phone signal.",
    mistake: "Carrying no cash at all—or carrying more than you need.",
  },
] as const;

const appTiers = [
  {
    title: "Must Have",
    tone: "text-ember border-ember/55",
    body: "Install and test these before departure.",
    items: [
      ["Alipay", "Primary mobile payment and useful travel mini-program access.", "Before you fly", "Recommended"],
      ["WeChat", "Messaging, mini programs, and a backup wallet when setup works.", "Before you fly", "Recommended"],
      ["Map + translation", "Navigation, Chinese place names, camera translation, and offline language help.", "Before you fly", "Yes"],
      ["Data plan", "eSIM, roaming, or SIM access for payment, maps, and login prompts.", "Before you fly", "Yes"],
    ],
  },
  {
    title: "Good to Have",
    tone: "text-[#8a6728] border-[#8a6728]/45",
    body: "Add these when your route needs them.",
    items: [
      ["Train support", "Booking access, confirmations, station names, and schedule checks.", "Before a rail day", "Route-dependent"],
      ["Ride-hailing", "Airport, late-night, rainy-day, and difficult-to-reach transfers.", "Before arrival", "Useful"],
      ["Airline + hotel", "Keep bookings, contact details, and change alerts accessible.", "After booking", "Useful"],
    ],
  },
  {
    title: "Optional",
    tone: "text-jade border-jade/45",
    body: "Wait until you know you need them.",
    items: [
      ["Local food discovery", "Extra restaurant discovery after payment and translation are stable.", "After arrival", "Optional"],
      ["Local metro tools", "Useful in some cities when the main map or wallet transport tool is not enough.", "City by city", "Optional"],
      ["Attraction mini programs", "Booking support for specific sights, sometimes with Chinese-only friction.", "When required", "Optional"],
    ],
  },
] as const;

const installationOrder = [
  "Confirm phone + bank access",
  "Choose mobile data",
  "Set up Alipay",
  "Try WeChat",
  "Add maps + translation",
  "Add train + ride support",
  "Create an offline folder",
] as const;

const arrivalSteps = [
  ["00 min", "Land", "Keep passport and onward details accessible."],
  ["10 min", "Immigration", "Follow the applicable entry process and official instructions."],
  ["25 min", "Connect", "Activate the planned data route before leaving the terminal."],
  ["35 min", "Payment test", "Open the wallet; make the first purchase only in a controlled setting."],
  ["45 min", "Hotel", "Show the saved Chinese address and confirm the next transfer."],
  ["Later", "Train", "Use the exact station name and saved confirmation."],
  ["Dinner", "Pay", "Use the tested wallet and keep cash or card accessible."],
] as const;

const faqs = [
  {
    question: "Can I use Visa or Mastercard in China?",
    answer:
      "International cards may work at major hotels and some larger merchants, but they are not a reliable everyday payment method at smaller shops, casual restaurants, or in taxis. Link a supported card to a mobile wallet, carry a physical card, and keep a small cash backup.",
  },
  {
    question: "Do I need cash in China?",
    answer:
      "Carry a modest amount of RMB as an emergency layer. Mobile payment is common, but cash helps when data is weak, a wallet needs verification, a linked card is declined, or your phone battery is low.",
  },
  {
    question: "Should I install WeChat or Alipay first?",
    answer:
      "Start with Alipay as the primary travel wallet, then prepare WeChat as a backup when account and card setup are available to you. Current verification and card support can vary, so test before relying on either one.",
  },
  {
    question: "Can I travel in China without Alipay?",
    answer:
      "It is possible, but everyday travel is usually less convenient. Direct card acceptance varies and many local payment flows use QR codes. A physical card, cash, hotel support, and clear Chinese addresses become more important without Alipay.",
  },
  {
    question: "How much RMB cash should I carry?",
    answer:
      "There is no universal amount. Carry a modest arrival-day buffer in smaller notes based on your airport transfer, hotel plan, trip length, and personal risk tolerance; avoid carrying unnecessary cash.",
  },
  {
    question: "Can I set up China payment apps after I land?",
    answer:
      "You can try, but pre-arrival setup is safer. SMS login, identity checks, card linking, bank alerts, and unfamiliar interfaces are harder to solve while tired or standing at a counter.",
  },
  {
    question: "Do I need an eSIM for China?",
    answer:
      "No single data option fits every phone and trip. Compare eSIM compatibility, roaming, physical SIM options, trip length, hotspot needs, and access to your home number for security messages.",
  },
  {
    question: "What should I save offline before China?",
    answer:
      "Save your hotel name and address in Chinese, booking confirmations, passport copy, payment backup steps, important phone numbers, train or flight details, and a few short translated phrases.",
  },
] as const;

const relatedGuides = [
  {
    label: "Payment",
    title: "How to Pay in China as a Foreigner",
    body: "Set up the four-layer payment plan in more detail.",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
  },
  {
    label: "Apps",
    title: "Best Apps for Traveling in China",
    body: "Choose the smallest useful app stack for your first trip.",
    href: "/guides/best-apps-for-traveling-in-china",
  },
  {
    label: "Internet",
    title: "China eSIM Guide for Tourists",
    body: "Compare connectivity routes and prepare an offline fallback.",
    href: "/guides/china-esim-guide-for-tourists",
  },
  {
    label: "Transport",
    title: "How to Book High-Speed Trains in China",
    body: "Prepare the exact train, station, booking, and arrival flow.",
    href: "/guides/how-to-book-high-speed-trains-in-china",
  },
  {
    label: "Offline backup",
    title: "China Travel Checklist Before You Fly",
    body: "Save the documents, addresses, confirmations, and backups that travel well offline.",
    href: "/guides/china-travel-checklist-before-you-fly",
  },
] as const;

function HubSectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-bold uppercase tracking-[0.15em] ${light ? "text-mist" : "text-ember"}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-4xl leading-[1.08] md:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/68" : "text-ink/65"}`}>{description}</p>
    </div>
  );
}

export default function PaymentsAndAppsPage() {
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const faqSchema = faqJsonLd([...faqs], "/payments-and-apps");
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "China Payments & Essential Apps Hub",
    description: metadata.description,
    url: absoluteUrl("/payments-and-apps"),
    dateModified: "2026-07-18",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
  const clusterSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "China payment and essential apps guide cluster",
    itemListElement: relatedGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(guide.href),
    })),
  };

  return (
    <>
      <SEOJsonLd
        data={[
          pageSchema,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Payments & Essential Apps", path: "/payments-and-apps" },
          ]),
          clusterSchema,
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <PaymentHubView />

      <div>
        <section data-testid="payment-hub-hero" className="border-b border-ink/10 bg-paper">
          <Container size="wide" className="grid lg:min-h-[690px] lg:grid-cols-[minmax(0,0.94fr)_minmax(560px,1.06fr)]">
            <div className="order-2 flex flex-col justify-center py-12 lg:order-1 lg:pr-14 xl:pr-20">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ember">
                China Payments &amp; Essential Apps Hub
              </p>
              <h1 className="mt-5 max-w-2xl text-[45px] leading-[1.02] text-ink sm:text-5xl md:text-6xl lg:text-[68px]">
                Set Up China Before You Land
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/67 md:text-xl">
                Prepare payments, apps, internet, transport and backups before your first trip to China.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="#interactive-checklist"
                  eventName="payment_step_clicked"
                  eventParams={{ step: "free_checklist", placement: "payment_hub_hero" }}
                  className={`${buttonClassName("primary")} w-full sm:w-fit`}
                >
                  Get the Free Checklist
                  <ArrowDown aria-hidden="true" size={18} />
                </TrackedLink>
                <TrackedLink
                  href="#setup-guide"
                  eventName="payment_step_clicked"
                  eventParams={{ step: "setup_guide", placement: "payment_hub_hero" }}
                  className={`${buttonClassName("secondary", "bg-surface")} w-full sm:w-fit`}
                >
                  See the $7 Setup Guide
                  <ArrowDown aria-hidden="true" size={18} />
                </TrackedLink>
              </div>
              <p className="mt-8 border-t border-ink/12 pt-5 text-sm leading-relaxed text-ink/52">
                Payment and app requirements can change. Guidance last verified July 13, 2026;
                confirm current wallet, card issuer, provider, and official requirements before travel.
              </p>
            </div>

            <div className="order-1 -mx-4 grid h-[330px] grid-cols-[1.4fr_1fr_1fr] overflow-hidden sm:-mx-6 sm:h-[460px] sm:grid-cols-3 lg:order-2 lg:mx-0 lg:h-auto">
              <figure className="relative col-span-1 bg-ink">
                <Image
                  src="/images/guides/phase-c/how-to-pay-in-china-as-a-foreigner/hero.webp"
                  alt="Traveler presenting a smartphone QR code at a checkout terminal"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 18vw, 34vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-4 pt-12 text-xs font-bold uppercase tracking-[0.1em] text-white sm:px-4">
                  Pay
                </figcaption>
              </figure>
              <figure className="relative col-span-1 bg-jade">
                <Image
                  src="/images/guides/phase-c/best-apps-for-traveling-in-china/hero.webp"
                  alt="Travelers using smartphones while waiting in a metro station"
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 18vw, 34vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-4 pt-12 text-xs font-bold uppercase tracking-[0.1em] text-white sm:px-4">
                  Connect
                </figcaption>
              </figure>
              <figure className="relative col-span-1 bg-ink">
                <Image
                  src="/images/guides/phase-c/how-to-book-high-speed-trains-in-china/hero.webp"
                  alt="CRH high-speed train at a platform inside a Chinese railway station"
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 18vw, 34vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-4 pt-12 text-xs font-bold uppercase tracking-[0.1em] text-white sm:px-4">
                  Move
                </figcaption>
              </figure>
            </div>
          </Container>
        </section>

        <section id="quick-start" className="scroll-mt-24 border-b border-ink/10 bg-paper px-4 py-14 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 border-b border-ink/14 pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-ember">Quick start</p>
                <h2 className="mt-3 text-4xl text-ink md:text-5xl">15 Minute Setup</h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink/60">
                Start with the job that is blocking you, or follow all four in order. Each step jumps to a working module.
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4">
              {quickStartSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <TrackedLink
                    key={step.title}
                    href={step.href}
                    eventName="payment_step_clicked"
                    eventParams={{ step: step.title.toLowerCase().replace(" ", "_"), placement: "quick_start" }}
                    className="group border-b border-ink/12 py-7 md:px-6 md:first:pl-0 xl:border-b-0 xl:border-r xl:last:border-r-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/38">{step.number}</span>
                      <Icon aria-hidden="true" size={24} className="text-ember" />
                    </div>
                    <h3 className="mt-8 text-2xl text-ink">
                      {step.title} <span className="text-base text-ember">— {step.time}</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">{step.body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-jade">
                      Start step <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </TrackedLink>
                );
              })}
            </div>
          </div>
        </section>

        <section id="payments" className="scroll-mt-24 bg-sand px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="01 · Payments"
              title="Build a payment pyramid—not a single point of failure"
              description="A mobile wallet is useful. A layered plan is reliable. Prepare all four levels before relying on any one of them."
            />
            <div className="mt-12 grid gap-14 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="grid items-start gap-3">
                {paymentLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.label} className={`${layer.width} overflow-hidden border border-ink/10 bg-paper`}>
                      <div className={`flex items-center gap-3 px-5 py-4 ${layer.accent}`}>
                        <Icon aria-hidden="true" size={22} />
                        <h3 className="font-editorial text-xl">{layer.label}</h3>
                      </div>
                      <dl className="grid gap-3 px-5 py-5 text-sm leading-relaxed sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
                        <div>
                          <dt className="font-bold uppercase tracking-[0.08em] text-ink/42">When to use</dt>
                          <dd className="mt-1 text-ink/68">{layer.when}</dd>
                        </div>
                        <div>
                          <dt className="font-bold uppercase tracking-[0.08em] text-ink/42">Why it matters</dt>
                          <dd className="mt-1 text-ink/68">{layer.why}</dd>
                        </div>
                        <div>
                          <dt className="font-bold uppercase tracking-[0.08em] text-ink/42">Common mistake</dt>
                          <dd className="mt-1 text-ink/68">{layer.mistake}</dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
              </div>
              <div id="readiness-checker" className="scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-jade">Interactive tool</p>
                <h3 className="mt-3 text-4xl text-ink">Payment Readiness Score</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/62">
                  Check what is ready. The weighting rewards a working backup—not just another app on the same card.
                </p>
                <div className="mt-8">
                  <PaymentReadinessChecker />
                </div>
              </div>
            </div>
            <aside className="mt-12 border-t border-ink/15 pt-6 text-sm leading-relaxed text-ink/58" aria-label="Official payment sources">
              <span className="font-bold text-ink">Verify current payment rules: </span>
              <a className="underline underline-offset-4 hover:text-ember" href="https://english.www.gov.cn/news/202408/22/content_WS66c71b3ec6d0868f4e8ea2b1.html" target="_blank" rel="noopener noreferrer">China government guidance for overseas visitors</a>
              <span aria-hidden="true"> · </span>
              <a className="underline underline-offset-4 hover:text-ember" href="https://www.alipay.com/" target="_blank" rel="noopener noreferrer">Alipay</a>
              <span aria-hidden="true"> · </span>
              <a className="underline underline-offset-4 hover:text-ember" href="https://pay.weixin.qq.com/" target="_blank" rel="noopener noreferrer">WeChat Pay</a>
              <span aria-hidden="true"> · </span>
              check your own card issuer&apos;s overseas transaction and security rules.
            </aside>
          </div>
        </section>

        <section id="apps" className="scroll-mt-24 bg-paper px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="02 · Apps"
              title="Apps, in the order you actually need them"
              description="Do not fill your phone with every app mentioned online. Prepare the small stack that solves payment, navigation, translation, transport, and recovery."
            />
            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {appTiers.map((tier) => (
                <section key={tier.title} className={`border-t-2 pt-5 ${tier.tone}`}>
                  <h3 className="text-3xl">{tier.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/58">{tier.body}</p>
                  <div className="mt-6 divide-y divide-ink/12">
                    {tier.items.map(([name, purpose, timing, required]) => (
                      <div key={name} className="py-5">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold text-ink">{name}</h4>
                          <span className="shrink-0 text-xs font-bold uppercase text-ink/38">{required}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink/62">{purpose}</p>
                        <p className="mt-3 text-xs font-semibold text-ember">Install: {timing}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <section className="mt-14 border-y border-ink/15 py-8" aria-labelledby="installation-order-title">
              <h3 id="installation-order-title" className="text-2xl text-ink">Recommended Installation Order</h3>
              <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                {installationOrder.map((item, index) => (
                  <li key={item} className="border-l border-ink/15 pl-4">
                    <span className="text-xs font-bold text-ember">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-2 text-sm leading-relaxed text-ink/68">{item}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </section>

        <section id="internet" className="scroll-mt-24 bg-mist px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="03 · Internet"
              title="Choose your internet setup"
              description="Start with your phone, trip length, and whether your home number must remain available. Then verify the exact device and provider terms."
            />
            <div className="mt-12">
              <InternetDecisionTree />
            </div>
          </div>
        </section>

        <section id="arrival-day" className="scroll-mt-24 bg-paper px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="04 · Arrival day"
              title="The First Hour in China"
              description="Do not try to solve every trip problem in the arrivals hall. Connect first, get to a known base, then run a small payment test."
            />
            <div className="mt-12 grid h-[430px] grid-cols-3 overflow-hidden md:h-[520px]">
              <figure className="relative">
                <Image src="/images/guides/americans-china-airport-arrivals.webp" alt="International passengers with luggage inside an airport terminal" fill sizes="33vw" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-5 pt-16 text-sm font-semibold text-white">Arrive with documents accessible</figcaption>
              </figure>
              <figure className="relative">
                <Image src="/images/guides/china-esim-airport-phone.webp" alt="Traveler checking a smartphone beside airport luggage" fill sizes="33vw" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-5 pt-16 text-sm font-semibold text-white">Connect before leaving</figcaption>
              </figure>
              <figure className="relative">
                <Image src="/images/guides/payment-guide-merchant-scan.webp" alt="Customer holding a smartphone over a merchant QR payment terminal" fill sizes="33vw" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-5 pt-16 text-sm font-semibold text-white">Test one small payment</figcaption>
              </figure>
            </div>
            <ol className="mt-10 grid gap-0 border-y border-ink/15 sm:grid-cols-2 lg:grid-cols-7">
              {arrivalSteps.map(([time, title, body], index) => (
                <li key={title} className="relative border-b border-ink/12 px-4 py-5 sm:border-r lg:border-b-0 lg:last:border-r-0">
                  <span className="text-xs font-bold text-ember">{time}</span>
                  <h3 className="mt-2 text-xl text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/58">{body}</p>
                  {index < arrivalSteps.length - 1 ? <ArrowRight aria-hidden="true" size={15} className="absolute right-2 top-6 hidden text-ink/25 lg:block" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="backup-plan" className="scroll-mt-24 bg-ink px-4 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl">
            <HubSectionHeading
              eyebrow="05 · Backup plan"
              title="What if something fails?"
              description="Solve the immediate travel problem with a working fallback. Troubleshoot the app, card, or login later—away from the checkout line, taxi, or station queue."
              light
            />
            <div className="mt-12">
              <BackupPlan />
            </div>
          </div>
        </section>

        <section id="interactive-checklist" className="scroll-mt-24 bg-sand px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="06 · Checklist"
              title="Complete the setup on this page"
              description="Work through 20 small checks. Progress is saved only in this browser; no account, email, or personal travel details are required."
            />
            <div className="mt-12">
              <InteractiveChecklist />
            </div>
          </div>
        </section>

        <section id="setup-guide" className="scroll-mt-24 bg-paper px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-ember">Printable setup guide · $7</p>
              <h2 className="mt-4 text-4xl leading-[1.08] text-ink md:text-5xl">Take the full backup system offline</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/65">
                The China Payment &amp; Apps Setup Guide turns the hub into printable decision trees,
                app tables, Chinese address cards, payment phrases, and arrival-day checks.
              </p>
              <ul className="mt-7 grid gap-3 text-base text-ink/70 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  "Payment setup flow",
                  "Backup decision tree",
                  "Essential app stack",
                  "Hotel address card",
                  "Checkout phrase card",
                  "Phone-friendly offline pages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 aria-hidden="true" size={19} className="mt-1 shrink-0 text-jade" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {paymentGuideBuyUrl ? (
                  <ProductActionButton
                    canBuy
                    href={paymentGuideBuyUrl}
                    isExternal
                    label="Buy securely on Payhip — $7"
                    productId="china-payment-apps-setup-guide"
                    placement="payment_hub_product"
                    eventNames={["guide_buy_clicked", "payment_apps_guide_buy_clicked"]}
                    analyticsParams={{ hub: "payments_and_apps" }}
                  />
                ) : (
                  <TrackedLink
                    href="/store#inside-the-guide"
                    eventName="guide_purchase_options_clicked"
                    eventParams={{ source_page: "/payments-and-apps", product_id: "china-payment-apps-setup-guide" }}
                    className={buttonClassName("primary")}
                  >
                    View purchase options — $7
                    <ArrowRight aria-hidden="true" size={18} />
                  </TrackedLink>
                )}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink/48">
                Secure checkout and instant digital delivery through Payhip. Review
                the preview and current checkout details before purchase.
              </p>
            </div>
            <GuidePreview />
          </div>
        </section>

        <div id="people-always-ask" className="scroll-mt-24 border-t border-ink/10 bg-mist">
          <FAQSection faqs={[...faqs]} title="People Always Ask" />
          <div className="mx-auto max-w-5xl px-4 pb-12 text-sm leading-relaxed text-ink/56">
            Payment app interfaces, supported cards, identity checks, provider terms, and service access can change.
            Recheck official sources and your own bank shortly before departure. No setup can guarantee that every merchant,
            payment, login, or network route will work.
          </div>
        </div>

        <section id="related-guides" className="scroll-mt-24 bg-paper px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <HubSectionHeading
              eyebrow="Keep this setup connected"
              title="Payment & essential apps guide cluster"
              description="Use the Hub as the overview, then open only the focused Guide needed for your next decision."
            />
            <div className="mt-12 divide-y divide-ink/12 border-y border-ink/15">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group grid gap-3 py-6 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-ember">{guide.label}</span>
                  <div>
                    <h3 className="text-2xl text-ink group-hover:text-ember">{guide.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/58">{guide.body}</p>
                  </div>
                  <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-jade">
                    Open Guide <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 grid gap-5 border-l-2 border-jade bg-mist/65 px-5 py-5 text-sm leading-relaxed text-ink/65 md:grid-cols-[1fr_auto] md:items-center">
              <p>
                Wallet-specific next steps: compare the focused <Link className="font-bold text-jade underline-offset-4 hover:underline" href="/guides/how-to-use-alipay-in-china-as-a-tourist">Alipay Guide</Link> and <Link className="font-bold text-jade underline-offset-4 hover:underline" href="/guides/how-to-use-wechat-pay-in-china-as-a-foreigner">WeChat Pay Guide</Link> after completing the payment pyramid.
              </p>
              <Route aria-hidden="true" size={30} className="text-jade" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
