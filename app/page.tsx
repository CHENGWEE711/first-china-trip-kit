import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Map,
  Plane,
  Smartphone,
  TrainFront,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { CityCard } from "@/components/CityCard";
import { ItineraryCard } from "@/components/ItineraryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { itineraries } from "@/data/itineraries";

const quickLinks = [
  {
    title: "How to Pay in China",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
    description: "Mobile wallets, cards, cash backups, and first-day payment setup.",
    icon: CreditCard,
  },
  {
    title: "Best China Travel Apps",
    href: "/guides/best-apps-for-traveling-in-china",
    description: "Maps, translation, trains, ride-hailing, payments, and food discovery.",
    icon: Smartphone,
  },
  {
    title: "3 Days in Shanghai",
    href: "/itineraries/3-days-in-shanghai",
    description: "A simple first itinerary with The Bund, local food, and neighborhood walks.",
    icon: Map,
  },
  {
    title: "240-Hour Visa-Free Route",
    href: "/itineraries/240-hour-visa-free-china-itinerary",
    description: "A Shanghai-based route idea for eligible transit visitors.",
    icon: Plane,
  },
];

export default function HomePage() {
  const featuredCities = cities.slice(0, 4);
  const featuredItineraries = itineraries.slice(0, 3);
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[72svh] overflow-hidden bg-ink text-white">
        <Image
          src="/china-travel-hero.png"
          alt="China travel planning table with train, map, phone, and city elements"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,42,40,0.86),rgba(47,42,40,0.52)_48%,rgba(47,42,40,0.10))]" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-1 text-sm font-semibold text-white/86">
              <TrainFront aria-hidden="true" size={16} />
              First-time China travel made practical
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Plan Your First Trip to China with Confidence
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/82">
              Practical city guides, payment tips, transport help, food
              recommendations, and ready-to-use itineraries for foreign visitors.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/itineraries">Start Planning</ButtonLink>
              <ButtonLink href="/cities" variant="secondary">
                Browse City Guides
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <Icon aria-hidden="true" className="text-ember" size={24} />
                <h2 className="mt-4 text-xl font-bold leading-tight text-ink">{item.title}</h2>
                <p className="mt-2 text-base text-ink/66">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-sand px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="City guides"
            title="Start with China's easiest first-trip cities"
            description="Choose a city based on pace, food, transport, history, and the kind of first impression you want."
            actionHref="/cities"
            actionLabel="View all cities"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Popular routes"
            title="Ready-to-use China itineraries"
            description="Pick a route by trip length, then adjust the pace around your flights, interests, and comfort level."
            actionHref="/itineraries"
            actionLabel="Browse routes"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featuredItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Travel essentials"
            title="Solve the details that usually slow travelers down"
            description="Payment, train stations, apps, packing, and useful phrases are easier when you prepare them before arrival."
            actionHref="/travel-essentials"
            actionLabel="Open essentials"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ember/35"
              >
                <p className="text-sm font-bold uppercase text-ember">{guide.category}</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-ink">{guide.title}</h3>
                <p className="mt-3 text-base text-ink/68">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ChecklistCTA />
      <NewsletterSignup />
    </>
  );
}
