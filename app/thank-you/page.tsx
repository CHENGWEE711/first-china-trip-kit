import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank You | China First-Time Visitor Checklist",
  description:
    "Download or review the China First-Time Visitor Checklist from First China Trip Kit.",
  path: "/thank-you",
});

const checklist = [
  "Before you fly: documents, visa or transit eligibility, and offline confirmations.",
  "Arrival day: airport transfer, hotel check-in, phone data, and first payment test.",
  "Payment: Alipay, WeChat Pay backup, cash, and hotel card usage.",
  "Apps: maps, translation, ride-hailing, train support, and offline screenshots.",
  "Hotel address: Chinese address, phone number, and nearest landmark.",
  "Transport: station names, passport checks, metro, taxi, and ride-hailing notes.",
  "Food: menu translation, first meals, and simple ordering phrases.",
  "Emergency phrases: short Mandarin lines for help, hospitals, taxis, and payment.",
];

export default function ThankYouPage() {
  return (
    <>
      <PageIntro
        eyebrow="Thank you"
        title="China First-Time Visitor Checklist"
        description="Use this quick checklist before your arrival day to avoid the most common first-trip friction points."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-2xl font-bold leading-tight text-ink">What is inside the PDF</h2>
            <p className="mt-3 text-base text-ink/68">
              This is a printable, two-page checklist you can review before
              flying and keep on your phone for arrival day. It focuses on the
              details that usually slow first-time visitors down: payment, apps,
              Chinese hotel addresses, transport, food, and emergency phrases.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href="/china-first-time-visitor-checklist.pdf"
                download
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-base font-semibold text-white transition hover:bg-[#982F28]"
              >
                Download PDF checklist
              </a>
              <ButtonLink href="/travel-essentials" variant="ghost">
                Open travel essentials
              </ButtonLink>
            </div>
          </section>
          <section className="rounded-lg border border-ink/10 bg-sand p-5">
            <h2 className="text-2xl font-bold leading-tight text-ink">Preview</h2>
            <ul className="mt-5 grid gap-3 text-base text-ink/70">
              {checklist.map((item) => (
                <li key={item} className="border-l-2 border-ember/35 pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          </div>
      </section>
    </>
  );
}
