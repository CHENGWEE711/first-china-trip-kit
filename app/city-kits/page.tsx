import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { getCityBySlug } from "@/data/cities";
import { cityKitMeta, cityKitSlugs } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China City Kits for First-Time Visitors | First China Trip Kit",
  description:
    "Browse practical China City Kits for Shanghai, Beijing, Xi'an, Chengdu, Hangzhou, Suzhou, Guangzhou, and Shenzhen with days, hotel areas, difficulty, attractions, food, and Chinese address support.",
  path: "/city-kits",
});

const kitCities = cityKitSlugs.flatMap((slug) => {
  const city = getCityBySlug(slug);
  return city ? [city] : [];
});

export default function CityKitsPage() {
  return (
    <>
      <PageIntro
        eyebrow="City Kits"
        title="Practical city kits for your first China trip"
        description="Choose a city by travel difficulty, recommended days, food, transport, hotel areas, and useful Chinese addresses."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {kitCities.map((city) => {
            const meta = cityKitMeta[city.slug];
            return (
              <article
                key={city.id}
                className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold leading-tight text-ink">
                      {meta.kitTitle}
                    </h2>
                    <p className="mt-1 text-base font-semibold text-ember">
                      {city.cityName} · {city.chineseName}
                    </p>
                  </div>
                  <span className="rounded-md bg-mist px-2.5 py-1 text-sm font-semibold text-jade">
                    {meta.difficultyLevel}
                  </span>
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-ink/68">
                  {city.intro}
                </p>
                <div className="mt-5 grid gap-3 text-base text-ink/70">
                  <p>
                    <strong className="text-ink">Recommended days:</strong>{" "}
                    {city.recommendedDays}
                  </p>
                  <p>
                    <strong className="text-ink">Best for:</strong>{" "}
                    {city.bestFor.slice(0, 4).join(", ")}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin aria-hidden="true" className="mt-1 text-ember" size={17} />
                    <span>{city.topAttractions.slice(0, 3).join(", ")}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <BadgeCheck aria-hidden="true" className="mt-1 text-ember" size={17} />
                    <span>{meta.chineseAddressSupport}</span>
                  </p>
                </div>
                <Link
                  href={`/city-kits/${city.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
                >
                  Open City Kit
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
