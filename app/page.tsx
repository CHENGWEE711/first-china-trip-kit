import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";
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
import { cityImages, editorialImages } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit | Practical China Travel Guide for First-Time Visitors",
  description: "Plan your first China trip with practical help for payments, apps, transport, destinations, itineraries, and arrival-day backups.",
  path: "/",
  image: editorialImages.hero.src,
  imageAlt: editorialImages.hero.alt,
});

const helpCards = [
  {
    title: "Prepare Your Phone & Payments",
    description: "Set up payments, mobile data and the essential apps before arrival day.",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
    image: editorialImages.payments,
  },
  {
    title: "Choose Your First City",
    description: "Compare four strong first-city choices by pace, atmosphere and practical fit.",
    href: "/city-kits",
    image: cityImages.shanghai,
  },
  {
    title: "Build Your China Itinerary",
    description: "Use realistic routes, transport guidance and day-by-day planning kits.",
    href: "/itinerary-kits",
    image: editorialImages.transport,
  },
] as const;

const destinationCopy: Record<string, string> = {
  shanghai: "Modern China, skyline views and a straightforward first arrival.",
  beijing: "Imperial history, the Great Wall and China's landmark capital.",
  xian: "Ancient history, street food and an easy compact add-on.",
  chengdu: "Pandas, Sichuan food and a calmer city rhythm.",
};

const featuredGuideSlugs = [
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "china-240-hour-visa-free-transit-guide",
] as const;

const trustItems = [
  "China-based practical guidance",
  "Updated regularly",
  "Official-source checks",
  "Made for first-time visitors",
] as const;

const quickLinks = [
  { label: "Choose a city", href: "/city-kits" },
  { label: "Build a route", href: "/itinerary-kits" },
  { label: "Set up payments", href: "/guides/how-to-pay-in-china-as-a-foreigner" },
] as const;

export default function HomePage() {
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const featuredCities = cities.filter((city) => ["shanghai", "beijing", "xian", "chengdu"].includes(city.slug));
  const featuredGuides = featuredGuideSlugs.flatMap((slug) => guides.filter((guide) => guide.slug === slug));
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

      <section id="home-hero" data-testid="home-hero" className="bg-paper">
        <Container size="wide" className="grid min-h-[640px] lg:grid-cols-[minmax(0,1.04fr)_minmax(520px,0.96fr)]">
          <div className="order-2 flex flex-col justify-center px-2 py-12 sm:px-6 md:px-10 lg:order-1 lg:px-16 lg:py-16 xl:px-20">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">Your first trip to China, made clear</p>
            <h1 className="mt-6 max-w-3xl text-5xl leading-[1.04] text-ink md:text-6xl lg:text-[72px]">
              Your First Trip to China, Made Simple
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/68 md:text-xl">
              Practical guidance for payments, apps, transport, cities and itineraries — built for first-time international visitors.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductActionButton
                canBuy
                href="#free-checklist"
                label="Get the Free Checklist"
                productId="china-first-trip-checklist"
                eventName="checklist_download_clicked"
                placement="home_hero"
              />
              <ButtonLink href="/start-here" variant="secondary" className="sm:w-fit">Start Planning</ButtonLink>
            </div>
            <nav aria-label="Quick planning links" className="mt-10 grid gap-2 border-t border-ink/10 pt-5 sm:grid-cols-3 sm:border-0 sm:pt-0">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="group flex min-h-12 items-center justify-between border-b border-ink/10 py-3 text-sm font-semibold text-jade sm:min-h-24 sm:flex-col sm:items-start sm:justify-center sm:border-0 sm:bg-mist sm:px-4">
                  <span>{item.label}</span>
                  <ArrowRight aria-hidden="true" size={16} className="text-ember transition group-hover:translate-x-1" />
                </Link>
              ))}
            </nav>
          </div>
          <EditorialImage
            src={editorialImages.hero.src}
            alt={editorialImages.hero.alt}
            aspect="hero"
            sizes="(min-width: 1024px) 48vw, 100vw"
            loading="eager"
            fetchPriority="high"
            objectPosition={editorialImages.hero.position || "center 48%"}
            wrapperClassName="order-1 lg:order-2"
          />
        </Container>
      </section>

      <section aria-label="Why travelers use First China Trip Kit" className="border-y border-ink/10 bg-surface">
        <Container className="grid grid-cols-2 py-3 lg:grid-cols-4 lg:py-0">
          {trustItems.map((item, index) => (
            <div key={item} className="flex items-start gap-2 border-ink/10 px-2 py-3 text-xs font-semibold leading-snug text-ink/72 sm:px-4 lg:min-h-16 lg:items-center lg:justify-center lg:border-r lg:text-sm lg:last:border-r-0">
              {index === 2 ? <ShieldCheck aria-hidden="true" size={17} className="shrink-0 text-jade" /> : <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-jade" />}
              <span>{item}</span>
            </div>
          ))}
        </Container>
      </section>

      <Section id="home-help" variant="warm">
        <SectionHeader eyebrow="Start with the practical problem" title="What do you need help with?" />
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Link href={helpCards[0].href} className="group relative min-h-[520px] overflow-hidden rounded-lg bg-ink text-white">
            <EditorialImage src={helpCards[0].image.src} alt={helpCards[0].image.alt} aspect="portrait" sizes="(min-width: 1024px) 50vw, 100vw" wrapperClassName="absolute inset-0" imageClassName="transition duration-500 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="max-w-md text-3xl leading-tight text-white md:text-4xl">{helpCards[0].title}</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-white/75">{helpCards[0].description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Open the payment guide <ArrowRight aria-hidden="true" size={17} /></span>
            </div>
          </Link>
          <div className="grid gap-6">
            {helpCards.slice(1).map((card) => (
              <Link key={card.href} href={card.href} className="group grid min-h-[248px] overflow-hidden rounded-lg border border-ink/10 bg-paper sm:grid-cols-[0.9fr_1.1fr]">
                <EditorialImage src={card.image.src} alt={card.image.alt} aspect="card" sizes="(min-width: 1024px) 22vw, 100vw" wrapperClassName="min-h-52 sm:min-h-full" imageClassName="transition duration-500 group-hover:scale-[1.025]" />
                <div className="flex flex-col justify-center p-6">
                  <h3 className="text-3xl leading-tight text-ink">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/65">{card.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ember">Start here <ArrowRight aria-hidden="true" size={17} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section id="home-destinations" variant="light">
        <SectionHeader eyebrow="Featured destinations" title="Four strong first-city choices" actionHref="/city-kits" actionLabel="Explore all destinations" />
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {featuredCities.map((city) => {
            const image = cityImages[city.slug];
            return (
              <article key={city.id}>
                <Link href={`/city-kits/${city.slug}`} className="group block overflow-hidden rounded-lg">
                  <EditorialImage src={image.src} alt={image.alt} aspect="card" sizes="(min-width: 768px) 50vw, 100vw" objectPosition={image.position} imageClassName="transition duration-500 group-hover:scale-[1.025]" />
                </Link>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl text-ink">{city.cityName}</h3>
                    <p className="mt-2 max-w-lg text-base text-ink/65">{destinationCopy[city.slug]}</p>
                    <Link href={`/city-kits/${city.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember">Explore {city.cityName} <ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-jade">{city.recommendedDays}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

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
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mist">Printable travel guide · $7</p>
          <h2 className="mt-4 text-4xl leading-tight text-white md:text-5xl">China Payment &amp; Apps Setup Guide</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72">A calm, offline-ready guide for the systems most likely to cause first-day friction.</p>
          <ul className="mt-8 grid gap-4">
            {["Set up Alipay and WeChat Pay", "Install the essential China travel apps", "Save practical backup steps for arrival day"].map((item) => (
              <li key={item} className="flex items-start gap-3"><BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-mist" size={20} /><span>{item}</span></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ProductActionButton canBuy={Boolean(paymentGuideBuyUrl)} href={paymentGuideBuyUrl} isExternal label="Get the $7 Setup Guide" productId="china-payment-apps-setup-guide" placement="home_product" />
            <Link href="/store#inside-the-guide" className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">See What&apos;s Inside</Link>
          </div>
        </div>
      </Section>

      <Section id="home-guides" variant="warm">
        <SectionHeader eyebrow="Featured guides" title="Read these before your flight" actionHref="/guides" actionLabel="View all guides" />
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
        </div>
      </Section>

      <div id="free-checklist"><NewsletterSignup /></div>
    </>
  );
}
