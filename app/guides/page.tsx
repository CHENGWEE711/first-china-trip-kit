import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Section } from "@/components/Section";
import { guides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Blog and Practical Guides | First China Trip Kit",
  description:
    "Read practical China travel articles about payment, apps, high-speed trains, internet, food ordering, packing, and basic Chinese phrases.",
  path: "/guides",
});

type GuidesPageProps = { searchParams: Promise<{ topic?: string }> };

const topicSlug = (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const { topic } = await searchParams;
  const featuredGuide = guides.find((guide) => guide.slug === "how-to-pay-in-china-as-a-foreigner")!;
  const topics = [...new Set(guides.map((guide) => guide.category))];
  const activeTopic = topics.find((candidate) => topicSlug(candidate) === topic);
  const remainingGuides = guides.filter(
    (guide) => guide.slug !== featuredGuide.slug && (!activeTopic || guide.category === activeTopic),
  );
  return (
    <>
      <PageIntro
        eyebrow="Blog"
        title="Practical China travel guides"
        description="Clear English answers to the questions that foreign visitors usually ask before their first China trip."
      />
      <Section variant="warm" spacing="compact">
        <nav aria-label="Guide topics" className="flex flex-wrap gap-2">
          <Link href="/guides#all-guides" aria-current={!activeTopic ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${!activeTopic ? "bg-ink text-white" : "border border-ink/15 bg-paper text-ink/70"}`}>All guides</Link>
          {topics.map((topic) => (
            <Link key={topic} href={`/guides?topic=${topicSlug(topic)}#all-guides`} aria-current={activeTopic === topic ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold hover:border-ember hover:text-ember ${activeTopic === topic ? "bg-ink text-white" : "border border-ink/15 bg-paper text-ink/70"}`}>{topic}</Link>
          ))}
        </nav>
      </Section>
      <Section variant="light" className="pt-12 md:pt-16">
        <p className="text-sm font-bold uppercase tracking-widest text-ember">Featured guide</p>
        <div className="mt-5 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <GuideCard guide={featuredGuide} />
          <div className="rounded-lg bg-mist p-6 md:p-8">
            <h2 className="text-3xl leading-tight text-ink">Start with the setup that unlocks your first day</h2>
            <p className="mt-4 text-ink/68">Payments are the foundation for taxis, meals, metro rides and bookings. This guide gives first-time visitors a tested setup order and practical backups.</p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-ink/70">
              <li>Mobile wallet setup</li><li>Cash and card backups</li><li>Failure troubleshooting</li>
            </ul>
          </div>
        </div>
      </Section>
      <section id="all-guides" className="px-4 py-12 md:py-20">
        <Container>
          <div className="mb-8 max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-ember">{activeTopic || "All practical guides"}</p><h2 className="mt-3 text-4xl text-ink">{activeTopic ? `${activeTopic} guides` : "Plan every part of your first China trip"}</h2></div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {remainingGuides.map((guide) => (
            <div key={guide.id}>
            <GuideCard key={guide.id} guide={guide} />
            </div>
          ))}</div>
        </Container>
      </section>
      <NewsletterSignup />
    </>
  );
}
