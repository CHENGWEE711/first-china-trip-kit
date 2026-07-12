import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCityBySlug } from "@/data/cities";
import { cityImages } from "@/data/images";
import { cityKitMeta, cityKitSlugs } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Destinations for First-Time Visitors | First China Trip Kit",
  description: "Compare practical China destination guides for Shanghai, Beijing, Xi'an, Chengdu, Hangzhou, Suzhou, Guangzhou, and Shenzhen.",
  path: "/city-kits",
});

const tags: Record<string, string[]> = {
  shanghai: ["Modern China", "Easy First Stop"], beijing: ["History", "Classic China"], xian: ["Ancient History", "Food"], chengdu: ["Food", "Relaxed Pace"], hangzhou: ["Nature", "Culture"], suzhou: ["Gardens", "Easy Day Trip"], guangzhou: ["Food", "South China"], shenzhen: ["Modern China", "Easy Connections"],
};

export default function CityKitsPage() {
  const kitCities = cityKitSlugs.flatMap((slug) => { const city = getCityBySlug(slug); return city ? [city] : []; });
  return (
    <>
      <header className="editorial-section bg-paper">
        <div className="editorial-container"><p className="text-sm font-bold uppercase tracking-widest text-ember">Destinations</p><h1 className="mt-3 max-w-4xl text-5xl leading-[1.08] md:text-6xl">Choose your first China city with less guesswork</h1><p className="mt-6 max-w-3xl text-lg text-ink/65">Compare atmosphere, travel pace, transport friction, hotel areas, food, and useful Chinese addresses before you build a route.</p></div>
      </header>
      <section className="editorial-section">
        <div className="editorial-container grid gap-x-6 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
          {kitCities.map((city) => { const image = cityImages[city.slug]; const meta = cityKitMeta[city.slug]; return (
            <article key={city.id} className="group">
              <Link href={`/city-kits/${city.slug}`} className="block overflow-hidden rounded-lg"><div className="relative aspect-[4/3]"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" style={{ objectPosition: image.position }} className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div></Link>
              <div className="mt-4 flex flex-wrap gap-2">{tags[city.slug].slice(0,2).map((tag) => <span key={tag} className="rounded-md bg-mist px-2.5 py-1 text-xs font-bold text-jade">{tag}</span>)}</div>
              <h2 className="mt-3 text-3xl leading-tight">{city.cityName} <span className="text-lg text-ink/45">{city.chineseName}</span></h2>
              <p className="mt-2 text-sm font-bold text-ember">{city.recommendedDays} · {meta.difficultyLevel}</p>
              <p className="mt-3 line-clamp-3 text-base text-ink/65">{city.intro}</p>
              <Link href={`/city-kits/${city.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-ink transition group-hover:text-ember">Open destination guide <ArrowRight aria-hidden="true" size={18} /></Link>
            </article>
          ); })}
        </div>
      </section>
    </>
  );
}
