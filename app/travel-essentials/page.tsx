import type { Metadata } from "next";
import {
  Bed,
  CreditCard,
  Languages,
  Plane,
  ShieldCheck,
  Smartphone,
  Soup,
  TrainFront,
  Wifi,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Essentials for Foreign Visitors | First China Trip Kit",
  description:
    "Practical China travel essentials covering visa and entry, payment, transport, internet, hotels, food, safety, travel apps, and basic Chinese.",
  path: "/travel-essentials",
});

const essentials = [
  {
    title: "Visa & Entry",
    icon: Plane,
    description:
      "Start with entry rules before booking flights, hotels, or a multi-city route.",
    reminders: [
      "Check visa or visa-free transit eligibility for your passport.",
      "Save onward ticket and hotel proof offline.",
      "Keep passport details consistent across every booking.",
    ],
    mistake: "Assuming a social media route is valid for your nationality and entry port.",
    href: "/itinerary-kits/240-hour-visa-free-china-itinerary",
  },
  {
    title: "Payment",
    icon: CreditCard,
    description:
      "Most everyday spending is easier when mobile payment is ready before arrival.",
    reminders: [
      "Set up Alipay first and try WeChat Pay as a backup.",
      "Carry a physical card for hotels and deposits.",
      "Keep a small RMB cash backup for arrival day.",
    ],
    mistake: "Expecting foreign cards to work everywhere like they do at home.",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
  },
  {
    title: "Transportation",
    icon: TrainFront,
    description:
      "China transport is efficient, but station names and timing matter more than visitors expect.",
    reminders: [
      "Match the exact railway station name before booking.",
      "Arrive early for passport checks and security.",
      "Use metro systems for predictable city travel.",
    ],
    mistake: "Booking the right city but the wrong station.",
    href: "/guides/how-to-take-high-speed-trains-in-china",
  },
  {
    title: "Internet & SIM",
    icon: Wifi,
    description:
      "Your phone is your map, wallet, translator, ticket folder, and backup plan.",
    reminders: [
      "Choose roaming, eSIM, SIM card, or pocket Wi-Fi before landing.",
      "Download offline translation packs.",
      "Save hotel addresses and ticket screenshots offline.",
    ],
    mistake: "Waiting until the airport arrival hall to solve data access.",
    href: "/guides/china-internet-and-esim-guide",
  },
  {
    title: "Hotels",
    icon: Bed,
    description:
      "A good first hotel makes payment setup, taxis, metro rides, and rest days easier.",
    reminders: [
      "Stay near a useful metro line for your first city.",
      "Save the hotel address and phone number in Chinese.",
      "Confirm the hotel can register foreign passport holders.",
    ],
    mistake: "Choosing a cheaper hotel far from transit and spending the savings on taxis.",
    href: "/city-kits",
  },
  {
    title: "Food",
    icon: Soup,
    description:
      "Food is one of the best parts of China travel, especially when you know how to order simply.",
    reminders: [
      "Keep a translation app ready for menus.",
      "Save a few dietary phrases in Chinese.",
      "Try local breakfast or noodle shops for easy first meals.",
    ],
    mistake: "Only eating near major attraction exits where prices and quality vary more.",
    href: "/guides/china-food-ordering-guide",
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    description:
      "China is generally comfortable for visitors, but normal city habits still matter.",
    reminders: [
      "Keep passport copies separate from the original.",
      "Use official taxis, ride-hailing, metro, or hotel-arranged transfers.",
      "Save emergency contacts and hotel details offline.",
    ],
    mistake: "Keeping every important document and card in the same bag.",
    href: "/guides/china-travel-packing-list",
  },
  {
    title: "Basic Chinese",
    icon: Languages,
    description:
      "A few phrases plus written Chinese addresses make daily interactions much smoother.",
    reminders: [
      "Learn hello, thank you, excuse me, and payment phrases.",
      "Show Chinese addresses instead of relying on pronunciation.",
      "Use short translated sentences for restaurants and taxis.",
    ],
    mistake: "Showing only an English hotel name to a taxi driver.",
    href: "/guides/basic-chinese-phrases-for-travelers",
  },
  {
    title: "Travel Apps",
    icon: Smartphone,
    description:
      "Use a small, tested app setup instead of downloading everything at once.",
    reminders: [
      "Prepare payment, maps, translation, ride-hailing, and train support.",
      "Log in before arrival when possible.",
      "Keep screenshots for train, hotel, and attraction bookings.",
    ],
    mistake: "Installing apps but not testing login, payment, or address search.",
    href: "/guides/best-apps-for-traveling-in-china",
  },
];

export default function TravelEssentialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Travel essentials"
        title="Practical China basics before you land"
        description="The first trip gets easier when payment, transport, internet, hotel addresses, and useful phrases are ready before your arrival day."
      />

      <section className="bg-ink px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-clay">
              Start here if this is your first China trip
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Get the boring details ready before they become travel stress.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-white/72">
            Most first-day problems are practical, not dramatic: payment setup,
            mobile data, station names, Chinese addresses, and food ordering.
            Use these cards as a quick pre-flight checklist, then open the
            deeper guide for anything that affects your route.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {essentials.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
              >
                <Icon aria-hidden="true" className="text-ember" size={26} />
                <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">{item.title}</h2>
                <p className="mt-3 text-base text-ink/68">{item.description}</p>
                <p className="mt-5 text-sm font-bold uppercase text-ink/48">Core reminders</p>
                <ul className="mt-3 grid gap-3 text-base text-ink/70">
                  {item.reminders.map((point) => (
                    <li key={point} className="border-l-2 border-ember/35 pl-3">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-md bg-sand p-4">
                  <p className="text-sm font-bold uppercase text-ember">Common mistake</p>
                  <p className="mt-2 text-base text-ink/70">{item.mistake}</p>
                </div>
                <div className="mt-5">
                  <ButtonLink href={item.href} variant="ghost">
                    Read guide
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
