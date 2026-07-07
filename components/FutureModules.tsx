import { Bot, CreditCard, Download, Languages, Library } from "lucide-react";

const modules = [
  {
    title: "Paid PDF guide",
    description: "A Stripe-ready module for premium city packs and printable checklists.",
    icon: Download,
  },
  {
    title: "AI itinerary generator",
    description: "A planned flow for custom trip length, travel style, budget, and cities.",
    icon: Bot,
  },
  {
    title: "Supabase CMS",
    description: "Data is isolated in local content files so it can later move behind a CMS.",
    icon: Library,
  },
  {
    title: "Multi-language support",
    description: "Locale config is separated for future translated versions of core pages.",
    icon: Languages,
  },
  {
    title: "Stripe integration",
    description: "Checkout fields are ready for paid downloads and guide bundles.",
    icon: CreditCard,
  },
];

export function FutureModules() {
  return (
    <section className="bg-paper px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase text-ember">Prepared for growth</p>
          <h2 className="text-3xl font-bold leading-tight text-ink">Expansion paths are already shaped</h2>
          <p className="mt-3 text-base text-ink/68">
            The first version stays simple, while the code structure leaves clear
            places for subscriptions, paid products, AI planning, localization,
            and CMS migration.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.title} className="rounded-lg border border-ink/10 bg-sand p-4">
                <Icon aria-hidden="true" className="text-ember" size={22} />
                <h3 className="mt-3 text-lg font-bold leading-tight text-ink">{module.title}</h3>
                <p className="mt-2 text-sm text-ink/66">{module.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
