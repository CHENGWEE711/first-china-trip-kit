"use client";

import { AlertTriangle, CheckCircle2, ExternalLink, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { appTrademarkDisclaimer } from "@/data/app-recommendations";

type ToolType = "visa" | "duration" | "apps" | "route";

type ToolKitWidgetProps = {
  type: ToolType;
};

const visaChecks = [
  {
    id: "passport",
    label: "My passport nationality is on the current official eligibility list",
  },
  {
    id: "ticket",
    label: "I have a confirmed onward ticket to a third country or region",
  },
  {
    id: "ports",
    label: "My entry and exit ports match the policy",
  },
  {
    id: "area",
    label: "My hotel cities stay inside the permitted travel area",
  },
  {
    id: "official",
    label: "I will verify official requirements before booking",
  },
];

const appChecks = [
  {
    id: "alipay",
    title: "Alipay installed and card added",
    category: "Payment",
    detail: "Open the app, confirm you can log in, and add at least one international card if supported.",
  },
  {
    id: "wechat",
    title: "WeChat installed and payment attempted if available",
    category: "Payment backup",
    detail: "Use it as a backup wallet and mini-program tool, but do not make it your only payment plan.",
  },
  {
    id: "map",
    title: "Map app tested with Chinese hotel address",
    category: "Maps",
    detail: "Search your hotel by Chinese name or address and save the location before arrival.",
  },
  {
    id: "translation",
    title: "Translation app downloaded with offline Chinese",
    category: "Translation",
    detail: "Download offline Chinese and test camera translation for menus and signs.",
  },
  {
    id: "ride",
    title: "Ride-hailing option tested",
    category: "Ride-hailing",
    detail: "Check whether DiDi or a ride-hailing mini program can find your hotel and pickup area.",
  },
  {
    id: "train",
    title: "Train confirmations saved as screenshots",
    category: "Train",
    detail: "Save train number, station, passport-linked booking, carriage, seat, and time offline.",
  },
  {
    id: "hotel",
    title: "Hotel address saved in Chinese",
    category: "Offline backup",
    detail: "Keep the hotel name, Chinese address, phone number, and nearest landmark in one note.",
  },
  {
    id: "battery",
    title: "Power bank packed",
    category: "Phone survival",
    detail: "Your phone runs payment, maps, translation, tickets, and hotel addresses on day one.",
  },
];
const appChecklistStorageKey = "first-china-trip-kit-essential-apps";

export function ToolKitWidget({ type }: ToolKitWidgetProps) {
  if (type === "visa") {
    return <VisaTool />;
  }

  if (type === "duration") {
    return <DurationTool />;
  }

  if (type === "apps") {
    return <AppsTool />;
  }

  return <RouteTool />;
}

function VisaTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const missing = visaChecks.filter((item) => !checked.includes(item.id));
  const criticalMissing = visaChecks.filter(
    (item) => item.id !== "official" && !checked.includes(item.id),
  );
  const score = checked.length;
  const hasOfficialVerification = checked.includes("official");
  const result =
    score === visaChecks.length
      ? {
          title: "Likely worth checking official eligibility",
          tone: "bg-jade text-white",
          nextStep: "Compare your exact route with official immigration and airline information before purchase.",
          body:
            "Your planning shape has the core pieces. Do not book solely from this result: confirm your nationality, ports, onward ticket, and permitted stay area with official sources before paying for travel.",
        }
      : !hasOfficialVerification || score <= 2
        ? {
            title: "Do not rely on visa-free transit yet",
            tone: "bg-ink text-white",
            nextStep: "Start with official eligibility, then confirm your ticket route, ports, and permitted travel area.",
            body:
              "You do not have enough confirmed information to rely on visa-free transit. This route may still work later, but it is not ready to book around yet.",
          }
        : criticalMissing.length > 0
        ? {
            title: "High risk — verify before booking",
            tone: "bg-ember text-white",
            nextStep: "Resolve every missing item before booking flights, hotels, trains, or non-refundable plans.",
            body:
              "Some important pieces are still missing. Visa-free transit rules are route-specific, so verify the missing items before booking flights, hotels, or trains.",
          }
        : {
            title: "High risk — verify before booking",
            tone: "bg-ember text-white",
            nextStep: "Official verification is still required before you treat this as a workable route.",
            body:
              "The main route pieces appear present, but you still need a final official check. Do not rely on a third-party summary alone.",
          };

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="mb-5 flex gap-3 rounded-md border border-ember/25 bg-sand p-4">
        <AlertTriangle aria-hidden="true" className="mt-1 shrink-0 text-ember" size={22} />
        <div>
          <p className="text-base font-bold text-ink">
            This is not legal or immigration advice. Always verify official requirements before booking.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/68">
            Use this checker to organize what to verify. Your actual eligibility
            depends on official rules, your passport, ports, onward ticket, route,
            and permitted stay area.
          </p>
        </div>
      </div>
      <div className="grid gap-3">
        {visaChecks.map((item) => (
          <label key={item.id} className="flex items-start gap-3 rounded-md bg-sand p-3 text-base text-ink/72">
            <input
              type="checkbox"
              checked={checked.includes(item.id)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, item.id]
                    : current.filter((candidate) => candidate !== item.id),
                )
              }
              className="mt-1 h-4 w-4 accent-[#B43D35]"
            />
            <span>
              <span className="block font-bold text-ink">{item.label}</span>
            </span>
          </label>
        ))}
      </div>
      <div className={`mt-5 rounded-md p-4 ${result.tone}`}>
        <p className="text-sm font-bold uppercase opacity-80">Planning result</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{result.title}</h2>
        <p className="mt-2 text-base opacity-85">{result.body}</p>
        <div className="mt-4 rounded-md bg-white/12 p-3">
          <p className="text-sm font-bold uppercase opacity-80">Official verification reminder</p>
          <p className="mt-2 text-sm opacity-85">{result.nextStep}</p>
        </div>
        {missing.length > 0 ? (
          <div className="mt-4 rounded-md bg-white/12 p-3">
            <p className="text-sm font-bold uppercase opacity-80">Still missing</p>
            <ul className="mt-2 grid gap-1 text-sm opacity-85">
              {missing.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <section className="mt-5 rounded-md border border-ink/10 bg-paper p-4">
        <h2 className="text-xl font-bold leading-tight text-ink">Official resources</h2>
        <div className="mt-3 grid gap-3">
          {[
            {
              label: "China National Immigration Administration",
              href: "https://en.nia.gov.cn/",
            },
            {
              label: "Chinese embassy or consulate information",
              href: "https://www.mfa.gov.cn/eng/",
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-ember hover:text-[#982F28]"
            >
              {link.label}
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function DurationTool() {
  const [cityCount, setCityCount] = useState("2");
  const [pace, setPace] = useState("balanced");

  const recommendation = useMemo(() => {
    const cities = Number(cityCount);
    const base = cities === 1 ? 3 : cities === 2 ? 6 : cities === 3 ? 9 : 12;
    const adjustment = pace === "slow" ? 2 : pace === "fast" ? -1 : 0;
    const days = Math.max(3, base + adjustment);
    return `${days}-${days + 2} days is a realistic first-trip range for this shape. Add more buffer if you have long flights, children, heavy luggage, or holiday travel dates.`;
  }, [cityCount, pace]);

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-base font-semibold text-ink">
          Number of city bases
          <select
            value={cityCount}
            onChange={(event) => setCityCount(event.target.value)}
            className="min-h-11 rounded-md border border-ink/12 bg-paper px-3 py-2 text-base font-normal text-ink"
          >
            <option value="1">1 city</option>
            <option value="2">2 cities</option>
            <option value="3">3 cities</option>
            <option value="4">4 cities</option>
          </select>
        </label>
        <label className="grid gap-2 text-base font-semibold text-ink">
          Travel pace
          <select
            value={pace}
            onChange={(event) => setPace(event.target.value)}
            className="min-h-11 rounded-md border border-ink/12 bg-paper px-3 py-2 text-base font-normal text-ink"
          >
            <option value="balanced">Balanced</option>
            <option value="slow">Slower with buffer</option>
            <option value="fast">Fast and efficient</option>
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-md bg-sand p-4">
        <p className="text-sm font-bold uppercase text-ember">Suggested duration</p>
        <p className="mt-2 text-base text-ink/72">{recommendation}</p>
      </div>
    </div>
  );
}

function AppsTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const [hasLoadedStoredChecks, setHasLoadedStoredChecks] = useState(false);
  const readyCount = checked.length;
  const totalCount = appChecks.length;
  const progressPercent = Math.round((readyCount / totalCount) * 100);
  const result =
    readyCount >= 7
      ? {
          title: "First-day ready",
          body: "Your app setup covers the essentials for payment, navigation, translation, transport, and offline backup.",
          tone: "bg-jade text-white",
        }
      : readyCount >= 4
        ? {
            title: "Almost ready",
            body: "You have the basics started. Finish the missing items before you rely on your phone for arrival day.",
            tone: "bg-ember text-white",
          }
        : {
            title: "Not ready yet",
            body: "Set up the core apps before you fly. Arrival halls, taxi queues, and train stations are stressful places to troubleshoot logins.",
            tone: "bg-ink text-white",
          };

  function toggleItem(id: string, nextChecked: boolean) {
    setChecked((current) =>
      nextChecked ? [...current, id] : current.filter((candidate) => candidate !== id),
    );
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const storedValue = window.localStorage.getItem(appChecklistStorageKey);
        const validIds = new Set(appChecks.map((item) => item.id));

        if (storedValue) {
          const parsedValue = JSON.parse(storedValue);

          if (Array.isArray(parsedValue)) {
            setChecked(
              parsedValue.filter(
                (candidate): candidate is string =>
                  typeof candidate === "string" && validIds.has(candidate),
              ),
            );
          }
        }
      } catch {
        window.localStorage.removeItem(appChecklistStorageKey);
      } finally {
        setHasLoadedStoredChecks(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredChecks) {
      return;
    }

    window.localStorage.setItem(appChecklistStorageKey, JSON.stringify(checked));
  }, [checked, hasLoadedStoredChecks]);

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="mb-5 rounded-md bg-sand p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-ember">Progress</p>
            <h2 className="mt-1 text-2xl font-bold leading-tight text-ink">
              {readyCount}/{totalCount} ready
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setChecked([])}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-4 py-2 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
          >
            <RotateCcw aria-hidden="true" size={17} />
            Reset
          </button>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-paper">
          <div
            className="h-full rounded-full bg-ember transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {appChecks.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/10 bg-sand p-4 text-base text-ink/72 transition hover:border-ember/30"
          >
            <input
              type="checkbox"
              aria-label={item.title}
              checked={checked.includes(item.id)}
              onChange={(event) =>
                toggleItem(item.id, event.target.checked)
              }
              className="mt-1 h-5 w-5 shrink-0 accent-[#B43D35]"
            />
            <span className="min-w-0">
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase text-ember">
                {checked.includes(item.id) ? <CheckCircle2 aria-hidden="true" size={16} /> : null}
                {item.category}
              </span>
              <span className="mt-1 block text-lg font-bold leading-tight text-ink">
                {item.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/62">
                {item.detail}
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className={`mt-5 rounded-md p-4 ${result.tone}`}>
        <p className="text-sm font-bold uppercase opacity-80">Checklist result</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{result.title}</h2>
        <p className="mt-2 text-base opacity-85">{result.body}</p>
      </div>

      <p className="mt-5 rounded-md border border-ink/10 bg-paper p-4 text-sm leading-relaxed text-ink/58">
        {appTrademarkDisclaimer}
      </p>
    </div>
  );
}

function RouteTool() {
  const [interest, setInterest] = useState("classic");

  const result = {
    classic:
      "Choose Beijing + Xi'an + Shanghai if this is your one big first China trip.",
    city:
      "Choose Shanghai + Hangzhou + Suzhou if you want modern China, easy trains, food, and scenic short hops.",
    history:
      "Choose Beijing + Xi'an if imperial history, the Great Wall, and the Terracotta Warriors matter most.",
    food:
      "Choose Chengdu + Xi'an, or Shanghai with a food-heavy city plan, if eating well is the main trip goal.",
  }[interest];

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <label className="grid gap-2 text-base font-semibold text-ink">
        What do you care about most?
        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          className="min-h-11 rounded-md border border-ink/12 bg-paper px-3 py-2 text-base font-normal text-ink"
        >
          <option value="classic">Classic first China highlights</option>
          <option value="city">Easy modern city trip</option>
          <option value="history">History and ancient sites</option>
          <option value="food">Food and slower neighborhoods</option>
        </select>
      </label>
      <div className="mt-5 rounded-md bg-sand p-4">
        <p className="text-sm font-bold uppercase text-ember">Route direction</p>
        <p className="mt-2 text-base text-ink/72">{result}</p>
      </div>
    </div>
  );
}
