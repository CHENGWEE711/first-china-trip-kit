import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Gauge, MapPin } from "lucide-react";
import { getCityBySlug } from "@/data/cities";
import { cityKitMeta, cityKitSlugs } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "China Destinations for First-Time Visitors | First China Trip Kit",
  description: "Compare practical China destination guides for Shanghai, Beijing, Xi'an, Chengdu, Hangzhou, Suzhou, Guangzhou, and Shenzhen.",
  path: "/city-kits",
});

const cityProfiles: Record<string, { identity: string; bestUse: string; watchFor: string }> = {
  shanghai: { identity: "Skyline, neighborhoods & an easy first landing", bestUse: "First arrival or East China base", watchFor: "Airport and rail-station distance" },
  beijing: { identity: "Imperial landmarks & the Great Wall", bestUse: "Classic history-led first trip", watchFor: "Advance attraction booking" },
  xian: { identity: "Terracotta Warriors, city walls & night markets", bestUse: "Compact history add-on", watchFor: "Museum transfer time" },
  chengdu: { identity: "Pandas, tea houses & Sichuan food", bestUse: "A slower food-focused stop", watchFor: "Panda-base start time" },
  hangzhou: { identity: "West Lake, temples & tea hills", bestUse: "Nature break from Shanghai", watchFor: "Weekend lake crowds" },
  suzhou: { identity: "Classical gardens & canal lanes", bestUse: "One-night Jiangnan stop", watchFor: "Correct Suzhou station" },
  guangzhou: { identity: "Cantonese food, heritage streets & the Pearl River", bestUse: "South China food base", watchFor: "Multiple major stations" },
  shenzhen: { identity: "Modern design, parks & bay connections", bestUse: "Hong Kong or business pairing", watchFor: "Border and station choice" },
};

export default function CityKitsPage() {
  const kitCities = cityKitSlugs.flatMap((slug) => { const city = getCityBySlug(slug); return city ? [city] : []; });
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "China destinations for first-time visitors",
    numberOfItems: kitCities.length,
    itemListElement: kitCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.cityName} First Trip Kit`,
      url: absoluteUrl(`/city-kits/${city.slug}`),
      image: absoluteUrl(city.cardImage.src),
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <header className="border-b border-ink/10 bg-paper">
        <div className="editorial-container grid gap-8 py-14 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">Eight distinct first-trip bases</p>
            <h1 className="mt-3 max-w-4xl text-5xl leading-[1.04] md:text-6xl">Choose a China city by the trip you actually want</h1>
          </div>
          <div className="border-l-2 border-ember pl-5">
            <p className="text-lg leading-relaxed text-ink/68">Compare city character, realistic stay length and the one logistics issue to plan before you add a destination to your route.</p>
            <Link href="/start-here#choose-your-cities" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-ember">See when city choice fits the planning sequence <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
      </header>
      <section className="bg-sand px-4 py-5" aria-label="How to compare destinations">
        <div className="mx-auto grid max-w-7xl gap-4 text-sm text-ink/68 md:grid-cols-3">
          <p className="flex items-center gap-3"><MapPin aria-hidden="true" className="text-ember" size={20} /><span><strong className="text-ink">City character</strong><br />What makes the stop worth adding</span></p>
          <p className="flex items-center gap-3"><Clock3 aria-hidden="true" className="text-ember" size={20} /><span><strong className="text-ink">Realistic time</strong><br />A useful first-visit stay range</span></p>
          <p className="flex items-center gap-3"><Gauge aria-hidden="true" className="text-ember" size={20} /><span><strong className="text-ink">Friction check</strong><br />The detail most likely to derail the plan</span></p>
        </div>
      </section>
      <section className="editorial-section" data-testid="destination-grid">
        <div className="editorial-container grid gap-x-7 gap-y-14 md:grid-cols-2">
          {kitCities.map((city, index) => { const image = city.cardImage; const meta = cityKitMeta[city.slug]; const profile = cityProfiles[city.slug]; return (
            <article key={city.id} className="group border-b border-ink/12 pb-9">
              <Link href={`/city-kits/${city.slug}`} className="block overflow-hidden rounded-lg"><div className="relative aspect-[3/2]"><Image src={image.src} alt={image.alt} fill priority={index === 0} loading={index === 0 ? "eager" : "lazy"} sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: image.position }} className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div></Link>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
                <h2 className="text-3xl leading-tight md:text-4xl">{city.cityName} <span className="ml-1 text-lg text-ink/45">{city.chineseName}</span></h2>
                <p className="shrink-0 text-sm font-bold text-ember">{city.recommendedDays}</p>
              </div>
              <p className="mt-4 text-lg font-semibold leading-snug text-ink">{profile.identity}</p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="font-bold uppercase tracking-wide text-ink/45">Best use</dt><dd className="mt-1 text-ink/70">{profile.bestUse}</dd></div>
                <div><dt className="font-bold uppercase tracking-wide text-ink/45">Plan around</dt><dd className="mt-1 text-ink/70">{profile.watchFor}</dd></div>
              </dl>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-jade">{meta.difficultyLevel} first-trip logistics</p>
                <Link href={`/city-kits/${city.slug}`} className="inline-flex min-h-11 items-center gap-2 font-bold text-ink transition group-hover:text-ember">Open {city.cityName} guide <ArrowRight aria-hidden="true" size={18} /></Link>
              </div>
            </article>
          ); })}
        </div>
      </section>
    </>
  );
}
