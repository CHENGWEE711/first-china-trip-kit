import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, BookOpen, CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductActionButton } from "@/components/ProductActionButton";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { cityImages, editorialImages } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit | Practical China Travel Guide for First-Time Visitors",
  description: "Plan your first China trip with practical help for payments, apps, transport, destinations, itineraries, and arrival-day backups.",
  path: "/",
});

const helpCards = [
  { title: "Prepare Your Phone & Payments", description: "Set up the essential apps, payment methods and internet access before you arrive.", href: "/guides/how-to-pay-in-china-as-a-foreigner", image: editorialImages.payments },
  { title: "Choose Your First City", description: "Compare the best cities for history, food, modern life and first-time travel.", href: "/city-kits", image: cityImages.shanghai },
  { title: "Build Your China Itinerary", description: "Use practical routes, transport guidance and realistic daily plans.", href: "/itinerary-kits", image: editorialImages.transport },
];

const destinationCopy: Record<string, string> = {
  shanghai: "Best for modern China, skyline views and an easy first arrival.",
  beijing: "Best for imperial history, the Great Wall and classic landmarks.",
  xian: "Best for ancient history, street food and a compact add-on.",
  chengdu: "Best for pandas, Sichuan food and a slower city rhythm.",
};

const featuredGuideSlugs = [
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "china-240-hour-visa-free-transit-guide",
];

const guideImages = [editorialImages.payments, editorialImages.station, cityImages.shanghai];

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export default function HomePage() {
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const featuredCities = cities.filter((city) => ["shanghai", "beijing", "xian", "chengdu"].includes(city.slug));
  const featuredGuides = featuredGuideSlugs.flatMap((slug) => guides.filter((guide) => guide.slug === slug));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={editorialImages.hero.src} alt={editorialImages.hero.alt} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,33,29,0.94)_0%,rgba(24,33,29,0.83)_42%,rgba(24,33,29,0.28)_76%,rgba(24,33,29,0.12)_100%)]" />
        <div className="editorial-container relative flex min-h-[620px] items-center py-16 md:min-h-[680px]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#F0B3A7]">Practical guidance for first-time visitors</p>
            <h1 className="max-w-3xl text-[2.65rem] leading-[1.04] text-white sm:text-5xl lg:text-6xl">Your First Trip to China, Made Simple</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/82 md:text-xl">Practical guidance for payments, apps, transport, cities and itineraries — built for first-time international visitors.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ProductActionButton canBuy href="#free-checklist" label="Get the Free Checklist" productId="china-first-trip-checklist" eventName="checklist_download_clicked" placement="home_hero" />
              <Link href="/start-here" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/55 bg-white/10 px-5 py-2 font-bold text-white transition hover:bg-white hover:text-ink">Start Planning</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Why travelers use First China Trip Kit" className="border-b border-ink/10 bg-paper">
        <div className="editorial-container grid divide-y divide-ink/10 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {["China-based practical guidance", "Updated regularly", "Official-source checks", "Made for first-time visitors"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-ink/72 sm:first:pl-0 lg:justify-center">
              {index === 2 ? <ShieldCheck aria-hidden="true" size={18} className="text-jade" /> : <CheckCircle2 aria-hidden="true" size={18} className="text-jade" />}{item}
            </div>
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Start with the practical problem</p>
          <h2 className="mt-3 max-w-2xl text-4xl leading-tight text-ink md:text-5xl">What do you need help with?</h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {helpCards.map((card) => (
              <Link key={card.title} href={card.href} className="group relative min-h-[420px] overflow-hidden rounded-lg bg-ink text-white">
                <Image src={card.image.src} alt={card.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-3xl leading-tight text-white">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/78">{card.description}</p>
                  <span className="mt-5 inline-flex items-center font-bold text-white">Explore this guide <span aria-hidden="true" className="ml-2">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section bg-paper">
        <div className="editorial-container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="text-sm font-bold uppercase tracking-widest text-ember">Featured destinations</p><h2 className="mt-3 text-4xl leading-tight md:text-5xl">Four strong first-city choices</h2></div>
            <Link href="/city-kits" className="font-bold text-ember hover:text-[#963028]">Explore All Destinations →</Link>
          </div>
          <div className="mt-9 grid gap-x-5 gap-y-9 md:grid-cols-2">
            {featuredCities.map((city) => {
              const image = cityImages[city.slug];
              return <article key={city.id}>
                <Link href={`/city-kits/${city.slug}`} className="group block overflow-hidden rounded-lg"><div className="relative aspect-[3/2]"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: image.position }} className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div></Link>
                <div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="text-3xl">{city.cityName}</h3><p className="mt-2 max-w-lg text-base text-ink/65">{destinationCopy[city.slug]}</p></div><p className="shrink-0 text-sm font-bold text-jade">{city.recommendedDays}</p></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="editorial-section bg-jade text-white">
        <div className="editorial-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[430px]">
            <div className="absolute left-0 top-8 w-[70%] overflow-hidden rounded-lg border border-white/15 bg-paper p-2 shadow-2xl"><Image src="/products/previews/payment-apps-guide-store-cover.png" alt="Cover of the China Payment and Apps Setup Guide" width={1200} height={800} className="h-auto w-full" /></div>
            <div className="absolute bottom-0 right-0 w-[48%] overflow-hidden rounded-lg border-4 border-paper bg-paper shadow-2xl"><Image src="/products/previews/payment-apps-guide-decision-tree.png" alt="Payment backup decision tree preview" width={1200} height={1600} className="h-auto w-full" /></div>
          </div>
          <div><p className="text-sm font-bold uppercase tracking-widest text-[#F0B3A7]">Printable travel kit · $7</p><h2 className="mt-3 text-4xl leading-tight text-white md:text-5xl">Set Up China Before You Land</h2><p className="mt-5 max-w-xl text-lg text-white/75">A calm, offline-ready setup pack for the systems most likely to cause first-day friction.</p>
            <ul className="mt-7 grid gap-3">{["Set up Alipay and WeChat Pay", "Install the essential China travel apps", "Save practical backup steps for arrival day"].map((item) => <li key={item} className="flex items-start gap-3"><BadgeCheck aria-hidden="true" className="mt-1 text-[#F0B3A7]" size={20} /><span>{item}</span></li>)}</ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ProductActionButton canBuy={Boolean(paymentGuideBuyUrl)} href={paymentGuideBuyUrl || "/store#inside-the-guide"} isExternal={Boolean(paymentGuideBuyUrl)} label={paymentGuideBuyUrl ? "Get the $7 Setup Guide" : "View the $7 Setup Guide"} productId="china-payment-apps-setup-guide" placement="home_product" /><Link href="/store#inside-the-guide" className="inline-flex min-h-11 items-center justify-center px-4 font-bold text-white underline decoration-white/35 underline-offset-4">See What’s Inside</Link></div>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-ember">Popular guides</p><h2 className="mt-3 text-4xl leading-tight md:text-5xl">Read before your flight</h2></div><Link href="/guides" className="font-bold text-ember">View All Guides →</Link></div>
          <div className="mt-9 grid gap-7 lg:grid-cols-3">
            {featuredGuides.map((guide, index) => <article key={guide.id} className="border-b border-ink/15 pb-6"><Link href={`/guides/${guide.slug}`} className="group block"><div className="relative aspect-[3/2] overflow-hidden rounded-lg"><Image src={guideImages[index].src} alt={guideImages[index].alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div><p className="mt-5 text-xs font-bold uppercase tracking-widest text-ember">{guide.category}</p><h3 className="mt-2 text-2xl leading-tight">{guide.title}</h3><p className="mt-3 text-base text-ink/65">{guide.summary}</p><p className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/48"><span className="inline-flex items-center gap-1"><CalendarDays aria-hidden="true" size={15} />{formattedDate(guide.updatedAt)}</span><span className="inline-flex items-center gap-1"><BookOpen aria-hidden="true" size={15} />6 min read</span></p></Link></article>)}
          </div>
        </div>
      </section>

      <div id="free-checklist"><NewsletterSignup /></div>
    </>
  );
}
