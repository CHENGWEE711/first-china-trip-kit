import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ChecklistDownloadWithTip } from "@/components/ChecklistDownloadWithTip";
import { ChecklistShareCard } from "@/components/ChecklistShareCard";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { PageIntro } from "@/components/PageIntro";
import { PayhipChecklistLink } from "@/components/PayhipChecklistLink";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { buildMetadata } from "@/lib/seo";
import { hasWhatsAppContact } from "@/lib/whatsapp";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Thank You | China First-Time Visitor Checklist",
    description:
      "Download or review the China First-Time Visitor Checklist from First China Trip Kit.",
    path: "/thank-you",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

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

const nextSteps = [
  {
    title: "Set up payment before you fly",
    href: "/payments-and-apps#payments",
  },
  {
    title: "Prepare essential apps",
    href: "/payments-and-apps#apps",
  },
  {
    title: "Choose your first city base",
    href: "/city-kits",
  },
  {
    title: "Build your first route",
    href: "/itinerary-kits",
  },
];

export default function ThankYouPage() {
  const coffeeTipEnabled = Boolean(process.env.NEXT_PUBLIC_COFFEE_TIP_URL);
  const payhipChecklistEnabled = Boolean(process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL);
  const whatsappEnabled = hasWhatsAppContact();

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
              This is a printable 3-page checklist you can review before
              flying and keep on your phone for arrival day. It focuses on the
              details that usually slow first-time visitors down: payment, apps,
              Chinese hotel addresses, transport, food, and emergency phrases.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <ChecklistDownloadWithTip source="thank-you" />
              {coffeeTipEnabled ? (
                <CoffeeTipLink source="thank-you" className="w-full sm:w-fit">
                  Buy us a coffee
                </CoffeeTipLink>
              ) : null}
              <p className="text-sm text-ink/58">
                Includes arrival-day checks, payment backups, app setup, hotel
                address notes, train reminders, and emergency phrases in
                English, Chinese characters, and pinyin.
              </p>
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
      {payhipChecklistEnabled ? (
        <section className="bg-paper px-4 pb-12">
          <div className="mx-auto max-w-5xl rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Optional support</p>
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Want to support this free guide?
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
              The checklist is free. If it saved you time, you can choose $0 or
              pay what you want on Payhip. Your support helps us keep First China
              Trip Kit updated for future travelers.
            </p>
            <div className="mt-5">
              <PayhipChecklistLink source="thank-you-support" className="w-full sm:w-fit" />
            </div>
          </div>
        </section>
      ) : null}
      <ChecklistShareCard />
      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Next steps</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Turn the checklist into a trip plan
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {nextSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="group rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <p className="text-sm font-bold uppercase text-ember">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-base font-semibold text-ember group-hover:text-ember-hover">
                  Open guide
                </p>
              </Link>
            ))}
          </div>
          {whatsappEnabled ? (
            <div className="mt-6 rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              <h2 className="text-2xl font-bold leading-tight text-ink">
                Have a checklist question?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/68">
                Send your passport country, travel month, trip length, cities
                considered, and main question.
              </p>
              <WhatsAppLink
                placement="checklist_thank_you"
                sourcePage="/thank-you"
                className="mt-5 w-full sm:w-fit"
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
