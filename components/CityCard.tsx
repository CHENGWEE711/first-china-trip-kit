import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import type { City } from "@/data/cities";

type CityCardProps = {
  city: City;
};

export function CityCard({ city }: CityCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-soft">
      <Link href={`/city-kits/${city.slug}`} className="group relative block aspect-[4/3] overflow-hidden">
        <Image src={city.cardImage.src} alt={city.cardImage.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-ink">{city.cityName}</h3>
          <p className="mt-1 text-base font-semibold text-ember">{city.chineseName}</p>
        </div>
        <span className="rounded-md bg-mist px-2.5 py-1 text-sm font-semibold text-jade">
          {city.province}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-ink/70">
        <p className="flex items-center gap-2">
          <Clock aria-hidden="true" size={16} />
          {city.recommendedDays}
        </p>
        <p className="flex items-center gap-2">
          <Users aria-hidden="true" size={16} />
          {city.bestFor.slice(0, 3).join(", ")}
        </p>
        <p className="flex items-center gap-2">
          <MapPin aria-hidden="true" size={16} />
          {city.topAttractions[0]}
        </p>
      </div>
      <p className="mt-4 flex-1 text-base text-ink/68">{city.intro}</p>
      <Link
        href={`/city-kits/${city.slug}`}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
      >
        Open city kit
      </Link>
      </div>
    </article>
  );
}
