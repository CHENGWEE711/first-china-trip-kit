import { FileCheck2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

type ChecklistCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ChecklistCTA({
  eyebrow = "Free PDF checklist",
  title = "Download the China First-Time Visitor Checklist",
  description = "A compact PDF covering pre-flight documents, arrival day, payment, apps, hotel addresses, transport, food, and emergency phrases.",
}: ChecklistCTAProps) {
  return (
    <section className="bg-ink px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm font-bold uppercase text-clay">
            <FileCheck2 aria-hidden="true" size={16} />
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight">{title}</h2>
          <p className="mt-3 max-w-2xl text-base text-white/72">{description}</p>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/8 p-5">
          <p className="text-base font-semibold text-white">
            Use it before you fly and again on arrival day.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-white/70">
            <li>Documents and hotel address ready offline</li>
            <li>Payment, apps, internet, and transport checked</li>
            <li>Food basics and emergency phrases in one place</li>
          </ul>
          <div className="mt-5">
            <ButtonLink href="/thank-you" variant="secondary">
              Get the checklist
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
