import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Route,
  ShieldCheck,
  Smartphone,
  TrainFront,
  WalletCards,
  Wifi,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { EditorialImage } from "@/components/EditorialImage";
import { GuideCard } from "@/components/GuideCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductActionButton } from "@/components/ProductActionButton";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { publicPageImages } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit | Payments, Apps & Practical China Trip Planning",
  description:
    "Prepare payments, essential apps, entry checks, transport and realistic routes for your first independent trip to China.",
  path: "/",
  image: "/images/home/phase-d/first-trip-phone-metro-og.webp",
  imageAlt: "First-time traveler using a phone on a Shanghai metro platform",
  imageWidth: 1200,
  imageHeight: 630,
});

const featuredGuideSlugs = [
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "china-240-hour-visa-free-transit-guide",
] as const;

const trustItems = [
  "Built for first-time international visitors",
  "Practical China-based context",
  "Official-source reminders",
  "No guaranteed-entry claims",
] as const;

const problemLinks = [
  {
    title: "Payment",
    body: "Set up a primary QR payment method and keep a real backup plan.",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
    label: "Prepare payments",
    icon: WalletCards,
  },
  {
    title: "Apps & internet",
    body: "Install only the tools you need, then make them useful offline.",
    href: "/guides/best-apps-for-traveling-in-china",
    label: "Build your app stack",
    icon: Smartphone,
  },
  {
    title: "Entry & transit",
    body: "Check your exact passport, ports and onward route before booking.",
    href: "/guides/china-240-hour-visa-free-transit-guide",
    label: "Check entry planning",
    icon: ShieldCheck,
  },
  {
    title: "Trains & routes",
    body: "Choose the correct station and leave enough time between cities.",
    href: "/guides/how-to-book-high-speed-trains-in-china",
    label: "Plan transport",
    icon: TrainFront,
  },
] as const;

const startMilestones = [
  { label: "Check entry rules", icon: ShieldCheck },
  { label: "Prepare phone, payment & internet", icon: Wifi },
  { label: "Choose cities and build a route", icon: Route },
] as const;

const destinationCopy: Record<string, string> = {
  shanghai: "A straightforward first landing with skyline, neighborhoods and easy East China add-ons.",
  beijing: "Imperial landmarks and the Great Wall, with more advance-booking friction.",
  xian: "A compact history stop for the Terracotta Warriors, city walls and night markets.",
  chengdu: "Pandas, tea houses and Sichuan food at a slower city rhythm.",
};

export default function HomePage() {
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const featuredCities = cities.filter((city) =>
    ["shanghai", "beijing", "xian", "chengdu"].includes(city.slug),
  );
  const featuredGuides = featuredGuideSlugs.flatMap((slug) =>
    guides.filter((guide) => guide.slug === slug),
  );
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.contactEmail,
    },
  ];

  return (
    <>
      <SEOJsonLd data={homeJsonLd} />

      <section id="home-hero" data-testid="home-hero" className="border-b border-ink/10 bg-paper">
        <Container
          size="wide"
          className="grid lg:min-h-[680px] lg:grid-cols-[minmax(0,1.06fr)_minmax(430px,0.94fr)]"
        >
          <div className="flex flex-col justify-center py-12 pr-0 sm:py-16 lg:py-20 lg:pr-16 xl:pr-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
              Plan your first independent trip to China
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] text-ink md:text-6xl lg:text-[68px]">
              Payments, apps and first-day logistics—sorted before you land.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/68 md:text-xl">
              A practical planning kit for entry checks, mobile payments, internet,
              transport, city choices and realistic first-trip routes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start-here" className="sm:w-fit">
                Start the 8-step plan
              </ButtonLink>
              <ButtonLink href="#free-checklist" variant="secondary" className="sm:w-fit">
                Get the free checklist
              </ButtonLink>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-ink/10 pt-5 text-sm font-semibold text-ink/68 sm:grid-cols-4">
              {["Entry", "Payments", "Apps", "Transport"].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-jade" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <figure className="relative min-h-[430px] overflow-hidden bg-ink lg:min-h-[680px]">
            <Image
              src={publicPageImages.homeHero.src}
              alt={publicPageImages.homeHero.alt}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 46vw, 100vw"
              style={{ objectPosition: publicPageImages.homeHero.position }}
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/86 px-5 py-4 text-sm leading-relaxed text-white/78">
              A real Shanghai metro moment: your phone, payment access and offline
              details need to work after you leave the airport.
            </figcaption>
          </figure>
        </Container>
      </section>

      <section aria-label="Why travelers use First China Trip Kit" className="border-b border-ink/10 bg-surface">
        <Container className="grid grid-cols-2 py-3 lg:grid-cols-4 lg:py-0">
          {trustItems.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-2 border-ink/10 px-2 py-3 text-xs font-semibold leading-snug text-ink/72 sm:px-4 lg:min-h-16 lg:items-center lg:justify-center lg:border-r lg:text-sm lg:last:border-r-0"
            >
              {index === 2 ? (
                <ShieldCheck aria-hidden="true" size={17} className="shrink-0 text-jade" />
              ) : (
                <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-jade" />
              )}
              <span>{item}</span>
            </div>
          ))}
        </Container>
      </section>

      <Section id="home-start" variant="warm" containerClassName="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Start Here</p>
          <h2 className="mt-4 text-4xl leading-tight text-ink md:text-5xl">One path, in the right order</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/68">Avoid opening twenty tabs at once. Work from entry rules to an offline-ready plan, then choose the cities that fit.</p>
          <ButtonLink href="/start-here" className="mt-7 w-full sm:w-fit">Follow the planning path</ButtonLink>
        </div>
        <ol className="grid border-y border-ink/12 md:grid-cols-3 md:divide-x md:divide-ink/12">
          {startMilestones.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="border-b border-ink/12 px-5 py-6 last:border-b-0 md:border-b-0">
                <div className="flex items-center justify-between"><span className="text-sm font-bold text-ember">0{index + 1}</span><Icon aria-hidden="true" size={21} className="text-jade" /></div>
                <p className="mt-8 text-xl font-semibold leading-snug text-ink">{item.label}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="home-problems" variant="light">
        <SectionHeader eyebrow="Solve these before your flight" title="The four systems that cause most first-day friction" />
        <div className="grid border-t border-ink/12 md:grid-cols-2">
          {problemLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={`border-b border-ink/12 py-7 md:px-7 ${index % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"}`}>
                <Icon aria-hidden="true" size={25} className="text-ember" />
                <h3 className="mt-5 text-3xl text-ink">{item.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/65">{item.body}</p>
                <Link href={item.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-ember">{item.label}<ArrowRight aria-hidden="true" size={17} /></Link>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="home-guides" variant="warm">
        <SectionHeader eyebrow="Featured guides" title="Read these before you book around assumptions" actionHref="/guides" actionLabel="View all guides" />
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
        </div>
      </Section>

      <Section id="home-destinations" variant="light">
        <SectionHeader eyebrow="Featured destinations" title="Four very different first-city choices" actionHref="/city-kits" actionLabel="Compare all eight destinations" />
        <div className="grid gap-x-7 gap-y-11 md:grid-cols-2">
          {featuredCities.map((city) => {
            const image = city.cardImage;
            return (
              <article key={city.id}>
                <Link href={`/city-kits/${city.slug}`} className="group block overflow-hidden rounded-lg">
                  <EditorialImage src={image.src} alt={image.alt} aspect="card" sizes="(min-width: 768px) 50vw, 100vw" objectPosition={image.position} imageClassName="transition duration-500 group-hover:scale-[1.025]" />
                </Link>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl text-ink">{city.cityName}</h3>
                    <p className="mt-2 max-w-lg text-base text-ink/65">{destinationCopy[city.slug]}</p>
                    <Link href={`/city-kits/${city.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ember">Explore {city.cityName}<ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-jade">{city.recommendedDays}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <div id="free-checklist" className="scroll-mt-24"><NewsletterSignup /></div>

      <Section id="home-product" variant="dark" containerClassName="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative min-h-[430px]" data-testid="product-preview">
          <div className="absolute left-0 top-8 w-[72%] overflow-hidden rounded-lg border border-white/15 bg-paper p-2 shadow-editorial">
            <Image src="/products/previews/payment-apps-guide-store-cover.png" alt="Cover of the China Payment and Apps Setup Guide" width={1200} height={800} sizes="(min-width: 1024px) 42vw, 72vw" className="h-auto w-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-[48%] overflow-hidden rounded-lg border-4 border-paper bg-paper shadow-editorial">
            <Image src="/products/previews/payment-apps-guide-decision-tree.png" alt="Payment backup decision tree preview" width={1200} height={1600} sizes="(min-width: 1024px) 24vw, 48vw" className="h-auto w-full" />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mist">Optional deeper help · printable PDF · $7</p>
          <h2 className="mt-4 text-4xl leading-tight text-white md:text-5xl">China Payment &amp; Apps Setup Guide</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72">More detailed than the free checklist: setup steps, printable backup cards and a first-day troubleshooting path.</p>
          <ul className="mt-8 grid gap-4">
            {["Payment setup and failure checks", "A deliberately small essential-app stack", "Offline taxi, hotel and checkout backup cards"].map((item) => (
              <li key={item} className="flex items-start gap-3"><BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-mist" size={20} /><span>{item}</span></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ProductActionButton canBuy={Boolean(paymentGuideBuyUrl)} href={paymentGuideBuyUrl} isExternal label="Buy securely on Payhip — $7" productId="china-payment-apps-setup-guide" placement="home_product" />
            <Link href="/store#inside-the-guide" className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">Preview before deciding</Link>
          </div>
          {!paymentGuideBuyUrl ? <p className="mt-4 text-sm text-white/58">Secure checkout is temporarily unavailable. You can still preview the guide and use the free checklist.</p> : null}
        </div>
      </Section>

      <section className="border-t border-ink/10 bg-paper px-4 py-12">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-ember">Need a human next step?</p><h2 className="mt-2 text-3xl text-ink">Ask a focused trip-planning question.</h2><p className="mt-2 max-w-2xl text-ink/65">Tell us your passport country, travel month, trip length and cities considered.</p></div>
          <ButtonLink href="/contact" variant="secondary" className="w-full md:w-fit">Contact First China Trip Kit</ButtonLink>
        </div>
      </section>
    </>
  );
}
