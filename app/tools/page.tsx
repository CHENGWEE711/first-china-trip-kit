import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Map, Plane, Smartphone } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { toolKits } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Planning Tools | First China Trip Kit",
  description:
    "Use simple China trip planning tools for visa-free transit checks, trip duration planning, essential apps, and first-route picking.",
  path: "/tools",
});

const toolIcons = {
  visa: Plane,
  duration: CalendarDays,
  apps: Smartphone,
  route: Map,
};

const previews: Record<string, { inputs: string[]; result: string }> = {
  "visa-free-eligibility-checker": { inputs: ["Passport country", "Arrival city", "Onward destination", "Stay length"], result: "Verify permitted port, onward ticket and travel area" },
  "china-trip-duration-planner": { inputs: ["Shanghai · 3 days", "Beijing · 4 days", "+ travel buffers"], result: "Suggested trip: 9–10 days" },
  "essential-apps-checklist": { inputs: ["✓ Payment", "✓ Maps", "□ Offline translation", "□ Ticket screenshots"], result: "2 arrival-day backups still needed" },
  "city-route-picker": { inputs: ["Food", "History", "Easy transport", "7 available days"], result: "Shanghai → Beijing" },
};

export default function ToolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tools"
        title="Simple tools for first-time China planning"
        description="Choose an input, get a clear next step, and copy the result. These working tools run in your browser without an account or sensitive personal data."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {toolKits.map((tool) => {
            const Icon = toolIcons[tool.type];
            const preview = previews[tool.slug];

            return (
              <Link
                key={tool.slug}
                href={tool.type === "visa" ? "/visa-free-transit" : `/tools/${tool.slug}`}
                className="group flex h-full min-w-0 flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md bg-sand text-ember">
                  <Icon aria-hidden="true" size={23} />
                </span>
                <h2 className="mt-4 text-xl font-bold leading-tight text-ink">
                  {tool.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink/68">
                  {tool.summary}
                </p>
                <div className="mt-4 rounded-lg border border-ink/10 bg-sand p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/42">Example input</p>
                  <div className="mt-2 grid gap-1.5">{preview.inputs.map((input) => <span key={input} className="rounded border border-ink/8 bg-paper px-2.5 py-2 text-xs font-semibold text-ink/65">{input}</span>)}</div>
                  <div className="mt-3 rounded-md bg-jade px-3 py-2.5 text-sm font-semibold text-white">{preview.result}</div>
                </div>
                <div className="mt-4 rounded-md bg-mist p-3">
                  <p className="text-xs font-bold uppercase text-ink/45">Best for</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/68">
                    {tool.bestFor}
                  </p>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink/42">
                  Runs in your browser · no sign-in · about 1 minute
                </p>
                <span className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-4 py-2 text-center text-base font-semibold text-white transition group-hover:bg-ember-hover">Open working tool</span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
