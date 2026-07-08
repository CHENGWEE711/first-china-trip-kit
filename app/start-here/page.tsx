import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  ClipboardCheck,
  Download,
  HelpCircle,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { FAQSection } from "@/components/FAQSection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PageIntro } from "@/components/PageIntro";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { firstTripChecklist } from "@/data/kits";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Start Here: China First Trip Preparation Checklist for Foreign Visitors",
  description:
    "Plan your first trip to China with a practical step-by-step preparation hub covering visa checks, payment, apps, eSIM, trains, hotels, Chinese addresses, and free checklist download.",
  path: "/start-here",
});

const preparationSteps = [
  {
    step: "Step 1",
    title: "Check your visa or visa-free eligibility",
    body:
      "Before planning cities, hotels, or trains, confirm how you can enter China. You may need a regular tourist visa, unilateral visa-free entry, mutual visa exemption, 24-hour transit, 240-hour visa-free transit, or another entry arrangement based on nationality and route.",
    reminders: [
      "If using 240-hour visa-free transit, verify passport nationality, third-country or region routing, confirmed onward ticket, entry port, exit port, and permitted travel area.",
      "Do not book non-refundable flights until your entry path is clear.",
    ],
    links: [
      {
        label: "China 240-Hour Visa-Free Transit Guide",
        href: "/guides/china-240-hour-visa-free-transit-guide",
      },
      {
        label: "Use Visa-Free Eligibility Checker",
        href: "/tools/visa-free-eligibility-checker",
      },
    ],
  },
  {
    step: "Step 2",
    title: "Set up payment before you fly",
    body:
      "China is mobile-payment friendly, but first-time visitors should prepare more than one option. Treat payment setup as a pre-trip task, then test a small purchase on day one.",
    reminders: [
      "Prepare Alipay, WeChat or WeChat Pay if available, a physical Visa or Mastercard, and small RMB cash.",
      "Card linking and identity verification may vary, so keep a backup.",
    ],
    links: [
      {
        label: "How to Pay in China as a Foreigner",
        href: "/guides/how-to-pay-in-china-as-a-foreigner",
      },
      {
        label: "How to Use Alipay in China as a Tourist",
        href: "/guides/how-to-use-alipay-in-china-as-a-tourist",
      },
      {
        label: "How to Use WeChat Pay in China as a Foreigner",
        href: "/guides/how-to-use-wechat-pay-in-china-as-a-foreigner",
      },
    ],
  },
  {
    step: "Step 3",
    title: "Install essential apps",
    body:
      "Do not download every app you see online. Prepare a small first-day app stack for payment, communication, translation, maps, data, train support, and offline screenshots.",
    reminders: [
      "Must-have before arrival: Alipay, WeChat, translation, map, eSIM or roaming app, train booking support, and an offline screenshot folder.",
      "Useful after arrival: DiDi, Amap, 12306, Dianping or Meituan if you are comfortable with more local tools.",
    ],
    links: [
      {
        label: "Best Apps for Traveling in China",
        href: "/guides/best-apps-for-traveling-in-china",
      },
      {
        label: "Use Essential Apps Checklist",
        href: "/tools/essential-apps-checklist",
      },
    ],
  },
  {
    step: "Step 4",
    title: "Prepare internet access and offline backups",
    body:
      "Your payment, maps, translation, ride-hailing, hotel contact, and train details all depend on mobile data. Choose roaming, eSIM, local SIM, or portable Wi-Fi before arrival.",
    reminders: [
      "Save your hotel address in Chinese, passport copy, emergency phrases, train tickets, booking confirmations, and payment backup notes offline.",
      "Do not assume airport Wi-Fi will solve your first transfer after you leave the terminal.",
    ],
    links: [
      {
        label: "China eSIM Guide for Tourists",
        href: "/guides/china-esim-guide-for-tourists",
      },
    ],
  },
  {
    step: "Step 5",
    title: "Book trains and hotels carefully",
    body:
      "For trains, always check the exact station name. For hotels, save the English name, Chinese name, Chinese address, phone number, nearest metro station, and check-in time.",
    reminders: [
      "Shanghai Hongqiao Railway Station and Shanghai Railway Station are not interchangeable.",
      "Use the same passport for booking and travel day, and save train details as screenshots.",
    ],
    links: [
      {
        label: "How to Book High-Speed Trains in China",
        href: "/guides/how-to-book-high-speed-trains-in-china",
      },
    ],
  },
  {
    step: "Step 6",
    title: "Choose your first city base",
    body:
      "Your first China city should make arrival, payment setup, food, transport, and hotel returns easier. Shanghai is often the softest landing; Beijing is best for classic history; Chengdu is great for food and slower neighborhoods.",
    reminders: [
      "Save useful Chinese addresses before leaving the hotel each day.",
      "Choose fewer cities if your trip is short or jet lag will be heavy.",
    ],
    links: [
      {
        label: "Browse City Kits",
        href: "/city-kits",
      },
    ],
  },
  {
    step: "Step 7",
    title: "Build a realistic route and keep a checklist",
    body:
      "Use an itinerary kit as your first draft, then add rest buffers, station transfers, rainy-day backups, food plans, and booking reminders. A printable checklist keeps the practical details visible while you prepare.",
    reminders: [
      "For a first trip, 7-10 days is a good starting point. If you only have 3-5 days, choose one city base.",
      "Ask a question before booking if your route depends on visa-free transit, tight train transfers, or several city changes.",
    ],
    links: [
      {
        label: "Browse Itinerary Kits",
        href: "/itinerary-kits",
      },
      {
        label: "Ask a China Trip Question",
        href: "/contact",
      },
      {
        label: "View Upcoming Travel Kits",
        href: "/store",
      },
    ],
  },
];

const routeIdeas = [
  {
    title: "Easiest first trip",
    route: "Shanghai + Suzhou + Hangzhou",
    body:
      "Best for a soft landing, easy trains, modern city life, classical gardens, and short high-speed rail hops.",
    href: "/itinerary-kits/7-days-shanghai-hangzhou-suzhou",
  },
  {
    title: "Classic culture trip",
    route: "Beijing + Xi'an",
    body:
      "Best for the Great Wall, Forbidden City, Terracotta Warriors, and classic China highlights.",
    href: "/itinerary-kits/5-days-beijing-and-xian",
  },
  {
    title: "Visa-free transit style",
    route: "Shanghai base with day trips",
    body:
      "Best for travelers using a short transit window and wanting simpler logistics to verify before booking.",
    href: "/guides/china-240-hour-visa-free-transit-guide",
  },
];

const startHereFaqs = [
  {
    question: "How many days do I need for my first trip to China?",
    answer:
      "For a first trip, 7-10 days is a good starting point. If you only have 3-5 days, choose one city base and avoid rushing between regions.",
  },
  {
    question: "Which city is best for a first China trip?",
    answer:
      "Shanghai is one of the easiest first cities, Beijing is best for history, Chengdu is great for food and a slower pace, and Xi'an is excellent for culture.",
  },
  {
    question: "Can I travel in China without speaking Chinese?",
    answer:
      "Yes, especially in major cities, but you should prepare translation apps, Chinese addresses, payment apps, mobile data, and screenshots.",
  },
  {
    question: "What should I prepare before flying to China?",
    answer:
      "Prepare entry documents, payment, apps, internet, hotel addresses in Chinese, transport confirmations, a backup payment method, and emergency phrases.",
  },
];

const startHereJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Start Here: China First Trip Preparation Checklist for Foreign Visitors",
    description:
      "A practical step-by-step preparation hub for first-time China visitors covering entry, payment, apps, internet, trains, hotel addresses, route planning, and checklist download.",
    url: absoluteUrl("/start-here"),
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  },
  faqJsonLd(startHereFaqs, "/start-here"),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Start Here", path: "/start-here" },
  ]),
].filter(Boolean) as Record<string, unknown>[];

export default function StartHerePage() {
  return (
    <>
      <SEOJsonLd data={startHereJsonLd} />
      <PageIntro
        eyebrow="Start Here"
        title="Start Here: Prepare for Your First Trip to China"
        description="China is exciting, fast, convenient, and sometimes confusing for first-time visitors. Start with the practical systems that make the trip work: entry, payment, apps, internet, hotels, trains, Chinese addresses, and a realistic route."
      />

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-lg border border-ink/10 bg-sand p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-ember">
              <ClipboardCheck aria-hidden="true" size={18} />
              First-trip checklist
            </p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Prepare these before you fly
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              If these are ready, your first arrival day is much calmer.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/thank-you">Get Free Checklist</ButtonLink>
              <ButtonLink href="/city-kits" variant="ghost">
                Browse City Kits
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {firstTripChecklist.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"
              >
                <BadgeCheck aria-hidden="true" className="mt-0.5 text-ember" size={18} />
                <p className="text-base font-semibold leading-relaxed text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Seven-step system</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Plan the practical basics in the right order
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Do this before you build a long attraction list. The goal is a first day where payment,
              maps, data, hotel addresses, and transport already work.
            </p>
          </div>
          <div className="grid gap-5">
            {preparationSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
              >
                <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <p className="text-sm font-bold uppercase text-ember">{step.step}</p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink/70">{step.body}</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="rounded-md bg-sand p-4">
                      <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-ember">
                        <ShieldCheck aria-hidden="true" size={16} />
                        Core reminders
                      </p>
                      <ul className="grid gap-2 text-base text-ink/70">
                        {step.reminders.map((reminder) => (
                          <li key={reminder} className="border-l-2 border-ember/35 pl-3">
                            {reminder}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex min-h-10 items-center justify-center rounded-md border border-ink/12 bg-paper px-3 py-2 text-sm font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">First route ideas</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Keep the first route realistic
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {routeIdeas.map((idea) => (
              <Link
                key={idea.title}
                href={idea.href}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <MapPinned aria-hidden="true" className="text-ember" size={24} />
                <p className="mt-4 text-sm font-bold uppercase text-ink/45">{idea.title}</p>
                <h3 className="mt-2 text-2xl font-bold leading-tight text-ink">{idea.route}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/68">{idea.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <Download aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Download the free checklist
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Use the printable 3-page checklist for documents, payment, apps, internet,
              hotel address cards, transport, packing, food, and emergency phrases.
            </p>
            <div className="mt-5">
              <ButtonLink href="/thank-you" variant="ghost">
                Get the Free China First Trip Checklist
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <HelpCircle aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Ask before you book
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Send your travel month, passport country, trip length, and cities if you
              are unsure about entry rules, route pacing, payment setup, or trains.
            </p>
            <div className="mt-5">
              <ButtonLink href="/contact" variant="ghost">
                Ask a China Trip Question
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <MapPinned aria-hidden="true" className="text-ember" size={24} />
            <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
              Use a kit, not a blank page
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              Start with city kits, itinerary kits, and upcoming paid travel kits,
              then adjust for jet lag, weather, station transfers, and real delays.
            </p>
            <div className="mt-5">
              <ButtonLink href="/store" variant="ghost">
                View Upcoming Travel Kits
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={startHereFaqs} />
      <ChecklistCTA />
      <NewsletterSignup />
    </>
  );
}
