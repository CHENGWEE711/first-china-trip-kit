import type { Metadata } from "next";
import { GuideCard } from "@/components/GuideCard";
import { PageIntro } from "@/components/PageIntro";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Blog and Practical Guides | First China Trip Kit",
  description:
    "Read practical China travel articles about payment, apps, high-speed trains, internet, food ordering, packing, and basic Chinese phrases.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Blog"
        title="Practical China travel guides"
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
