import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AffiliateDisclosureNote } from "@/components/AffiliateDisclosureNote";
import { PageIntro } from "@/components/PageIntro";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { affiliatePartnerOrder, getAffiliatePartner } from "@/config/affiliate";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Essential China Travel Tools | First China Trip Kit",
  description:
    "Compare practical China travel tools for eSIMs, hotels, tours, tickets, airport transfers, and travel insurance before your first trip.",
  path: "/travel-tools",
});

const content = {
  airalo: {
    title: "Internet & eSIM",
    description:
      "Install and prepare mobile data before arrival so maps, translation, payment apps, and hotel messages are easier to access after landing.",
    label: "Check China eSIM Plans",
  },
  booking: {
    title: "Hotels in China",
    description:
      "Compare accommodation in Beijing, Shanghai, Xi'an, Chengdu, Guangzhou, Shenzhen, and other stops on your route.",
    label: "Find Hotels in China",
  },
  klook: {
    title: "Tours, Tickets & Airport Transfers",
    description:
      "Compare attraction tickets, day tours, theme parks, and airport transfers after checking dates, meeting points, and cancellation terms.",
    label: "Browse Tours & Tickets",
  },
  safetywing: {
    title: "Travel Insurance",
    description:
      "Review insurance options before departure and read the coverage, exclusions, destination rules, and claims process for your own trip.",
    label: "View Travel Insurance Options",
  },
};

export default function TravelToolsPage() {
  const hasEnabledPartner = affiliatePartnerOrder.some(
    (partner) => getAffiliatePartner(partner).enabled,
  );

  return (
    <>
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Essential China Travel Tools", path: "/travel-tools" },
        ])}
      />
      <PageIntro
        eyebrow="Trip preparation"
        title="Essential China Travel Tools"
        description="Trusted tool categories to help first-time visitors stay connected, book hotels, arrange tours, and prepare for a smoother trip to China."
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 rounded-lg border border-ink/10 bg-sand p-5">
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Compare the details before you book
            </h2>
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-ink/68">
              A useful travel tool still needs to match your passport, device, dates,
              route, budget, and coverage needs. Read provider terms and keep offline
              backups for your hotel address, tickets, mobile data, and payment methods.
            </p>
            {hasEnabledPartner ? (
              <AffiliateDisclosureNote className="mt-4 max-w-4xl" />
            ) : null}
          </div>

          {hasEnabledPartner ? <div className="grid gap-5 md:grid-cols-2">
            {affiliatePartnerOrder.map((partner) => {
              const item = content[partner];
              const config = getAffiliatePartner(partner);
              return (
                <AffiliateCard
                  key={partner}
                  anchorId={config.anchorId}
                  partner={partner}
                  title={item.title}
                  description={item.description}
                  label={item.label}
                  placement="travel_tools_directory"
                  sourcePage="/travel-tools"
                />
              );
            })}
          </div> : null}

          <div className="mt-10 rounded-lg border border-ink/10 bg-mist p-5">
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Need the preparation steps first?
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
              Start with the practical guides before comparing providers. They explain what
              to prepare, what can fail, and which details to save offline.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/guides/china-esim-guide-for-tourists"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-center font-semibold text-white hover:bg-ember-hover"
              >
                Read the China eSIM Guide
              </Link>
              <Link
                href="/city-kits"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 bg-paper px-5 py-3 text-center font-semibold text-ink hover:border-ember/35 hover:text-ember"
              >
                Browse City Kits
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
