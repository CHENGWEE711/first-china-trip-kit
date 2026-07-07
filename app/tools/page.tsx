import type { Metadata } from "next";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { toolKits } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Planning Tools | First China Trip Kit",
  description:
    "Use simple China trip planning tools for visa-free transit checks, trip duration planning, essential apps, and first-route picking.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tools"
        title="Simple tools for first-time China planning"
        description="These lightweight tools help you spot planning risks before you book flights, hotels, trains, or paid kits."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {toolKits.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
            >
              <Wrench aria-hidden="true" className="text-ember" size={24} />
              <h2 className="mt-4 text-xl font-bold leading-tight text-ink">{tool.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/68">{tool.summary}</p>
              <p className="mt-5 text-base font-semibold text-ember">Open tool</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
