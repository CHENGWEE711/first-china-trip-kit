import {
  Car,
  Download,
  ExternalLink,
  FolderDown,
  Languages,
  MapPinned,
  QrCode,
  Signal,
  Ticket,
  Train,
  Utensils,
  WalletCards,
} from "lucide-react";
import type { AppIconKey, AppRecommendationGroup } from "@/data/app-recommendations";
import { appTrademarkDisclaimer } from "@/data/app-recommendations";

type AppGuideCardsProps = {
  groups: AppRecommendationGroup[];
};

const iconMap = {
  wallet: WalletCards,
  qr: QrCode,
  map: MapPinned,
  translation: Languages,
  ride: Car,
  train: Train,
  internet: Signal,
  food: Utensils,
  offline: FolderDown,
  ticket: Ticket,
} satisfies Record<AppIconKey, typeof WalletCards>;

const frictionStyles = {
  low: "bg-mist text-jade",
  medium: "bg-sand text-ember",
  high: "bg-ink text-white",
};

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AppGuideCards({ groups }: AppGuideCardsProps) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm font-bold uppercase text-ember">Recommended app stack</p>
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Install the apps by priority, not by hype
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink/68">
          For a first China trip, your app setup should solve real travel
          friction: payment, maps, translation, ride-hailing, train support,
          internet access, food, and offline backups.
        </p>
      </div>

      <div className="mt-7 grid gap-8">
        {groups.map((group) => (
          <section key={group.title}>
            <div className="mb-4 max-w-3xl">
              <h3 className="text-2xl font-bold leading-tight text-ink">{group.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink/68">{group.description}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {group.apps.map((app) => {
                const Icon = iconMap[app.icon];
                const links = [
                  { label: "Official website", href: app.officialLink },
                  { label: "App Store", href: app.appStoreLink },
                  { label: "Google Play", href: app.googlePlayLink },
                ].filter((link) => link.href);

                return (
                  <article
                    key={`${group.title}-${app.appName}`}
                    className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-4 shadow-soft"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sand text-ember">
                        <Icon aria-hidden="true" size={22} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold uppercase text-ink/45">{app.category}</p>
                        <h4 className="mt-1 text-xl font-bold leading-tight text-ink">
                          {app.appName}
                        </h4>
                        {app.chineseName ? (
                          <p className="mt-1 text-base font-semibold text-ember">
                            {app.chineseName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <p className="mt-4 text-base leading-relaxed text-ink/70">{app.bestFor}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-md bg-sand px-3 py-1 text-sm font-bold text-ink/70">
                        Install before arrival: {formatLabel(app.installBeforeArrival)}
                      </span>
                      <span
                        className={`rounded-md px-3 py-1 text-sm font-bold ${frictionStyles[app.foreignerFriction]}`}
                      >
                        Foreigner friction: {formatLabel(app.foreignerFriction)}
                      </span>
                    </div>

                    <div className="mt-4 rounded-md bg-mist p-3">
                      <p className="text-sm font-bold uppercase text-jade">Backup tip</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/68">{app.backupTip}</p>
                    </div>

                    {links.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-3 py-2 text-sm font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
                          >
                            {link.label}
                            <ExternalLink aria-hidden="true" size={14} />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-7 rounded-md border border-ink/10 bg-sand p-4">
        <div className="flex gap-3">
          <Download aria-hidden="true" className="mt-0.5 shrink-0 text-ember" size={20} />
          <p className="text-sm leading-relaxed text-ink/68">{appTrademarkDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}
