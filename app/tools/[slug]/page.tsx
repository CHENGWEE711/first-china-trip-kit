import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ToolKitWidget } from "@/components/ToolKitWidget";
import { getToolBySlug, toolKits } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toolKits.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return buildMetadata({
    title: `${tool.title} | First China Trip Kit`,
    description: tool.summary,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-bold uppercase text-ember">Planning tool</p>
          <h1 className="text-4xl font-bold leading-tight text-ink">{tool.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">{tool.summary}</p>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <ToolKitWidget type={tool.type} />
          <p className="mt-5 text-sm leading-relaxed text-ink/56">
            This tool is for planning only. Always verify official requirements,
            booking rules, and current local conditions before paying for travel.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
          >
            Back to tools
          </Link>
        </div>
      </section>
      <ChecklistCTA />
      <NewsletterSignup />
    </>
  );
}
