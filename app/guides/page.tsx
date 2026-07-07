import type { Metadata } from "next";
import { GuideCard } from "@/components/GuideCard";
import { PageIntro } from "@/components/PageIntro";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Guides and Practical Articles | First China Trip Kit",
  description:
    "Read practical China travel guides about payment, apps, high-speed trains, Alipay, WeChat Pay, packing, and basic Chinese phrases.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Guides"
        title="Practical China travel articles"
        description="Clear English answers to the questions that foreign visitors usually ask before their first China trip."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>
    </>
  );
}
