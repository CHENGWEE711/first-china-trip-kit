import type { Metadata } from "next";
import { CityCard } from "@/components/CityCard";
import { PageIntro } from "@/components/PageIntro";
import { cities } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China City Guides for First-Time Visitors | First China Trip Kit",
  description:
    "Browse practical English city guides for Shanghai, Beijing, Xi'an, Chengdu, Hangzhou, Suzhou, Guangzhou, and Shenzhen.",
  path: "/cities",
});

export default function CitiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="City guides"
        title="China city guides for first-time foreign visitors"
        description="Compare the best cities for history, food, modern culture, scenic walks, high-speed rail add-ons, and easy first-trip logistics."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </>
  );
}
