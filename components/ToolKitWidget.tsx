"use client";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appTrademarkDisclaimer } from "@/data/app-recommendations";
import { trackEvent } from "@/lib/analytics";

type ToolType = "visa" | "duration" | "apps" | "route";

type ToolKitWidgetProps = {
  type: ToolType;
};

const visaChecks = [
  {
    id: "passport",
    label: "My passport nationality is on the current official eligibility list.",
    description:
      "Eligibility depends on your passport nationality and current official rules.",
  },
  {
    id: "ticket",
    label: "I have a confirmed onward ticket to a third country or region.",
    description:
      "Your route should be Country/Region A -> China -> Country/Region B.",
  },
  {
    id: "ports",
    label: "My entry and exit ports match the policy.",
    description:
      "Not every airport, train station, or seaport is covered.",
  },
  {
    id: "area",
    label: "My hotel cities stay inside the permitted travel area.",
    description:
      "Do not leave the allowed region for your entry port.",
  },
  {
    id: "official",
    label: "I will verify official requirements before booking.",
    description:
      "This tool is only a planning helper.",
  },
];

const visaResultStates = [
  {
    title: "Likely worth checking official eligibility",
    description: "All planning inputs are present, but official verification is still required.",
  },
  {
    title: "High risk — verify before booking",
    description: "One or more route-specific items are missing or unclear.",
  },
  {
    title: "Do not rely on visa-free transit yet",
    description: "There is not enough confirmed information to plan around visa-free transit.",
  },
];

const appChecks = [
  {
    id: "alipay",
    title: "Alipay",
    chineseName: "支付宝",
    category: "Payment",
    whyItMatters: "Your main QR payment app for many first-day situations.",
  },
  {
    id: "wechat",
    title: "WeChat",
    chineseName: "微信",
    category: "Communication + payment backup",
    whyItMatters:
      "Useful for messaging, local contacts, mini programs, and payment backup.",
  },
  {
    id: "translation",
    title: "Translation app",
    chineseName: "",
    category: "Language",
    whyItMatters:
      "Helps with menus, taxis, hotel questions, and emergency phrases.",
  },
  {
    id: "map",
    title: "Map app",
    chineseName: "",
    category: "Navigation",
    whyItMatters:
      "Useful for hotel locations, metro stations, and walking routes.",
  },
  {
    id: "internet",
    title: "eSIM or roaming",
    chineseName: "",
    category: "Internet",
    whyItMatters:
      "Payment, maps, translation, and taxis depend on mobile data.",
  },
  {
    id: "booking",
    title: "Trip.com or train booking support",
    chineseName: "",
    category: "Travel booking",
    whyItMatters:
      "Helpful for hotels, trains, and English-language booking support.",
  },
  {
    id: "screenshots",
    title: "Offline screenshot folder",
    chineseName: "",
    category: "Offline backup",
    whyItMatters:
      "Save hotel addresses, tickets, passport copy, and emergency phrases.",
  },
  {
    id: "battery",
    title: "Power bank",
    chineseName: "",
    category: "Hardware backup",
    whyItMatters:
      "If your phone dies, payment and maps disappear.",
  },
];
const appChecklistStorageKey = "first-china-trip-kit-essential-apps";

const tripDurationOptions = [
  {
    id: "1-3",
    label: "1-3 days",
    result: "Choose one city base. Shanghai or Beijing is easiest.",
  },
  {
    id: "4-5",
    label: "4-5 days",
    result:
      "Choose one city plus one day trip, or Beijing + Xi'an if you move fast.",
  },
  {
    id: "6-8",
    label: "6-8 days",
    result:
      "Choose two to three cities, such as Shanghai + Hangzhou + Suzhou or Beijing + Xi'an.",
  },
  {
    id: "9-12",
    label: "9-12 days",
    result:
      "Classic first-time route possible, such as Shanghai + Beijing + Xi'an + Chengdu.",
  },
  {
    id: "13-plus",
    label: "13+ days",
    result:
      "Add slower travel, food cities, nature destinations, or a southern China route.",
  },
];

const routeStyleOptions = [
  {
    id: "easy-landing",
    label: "First-time easy landing",
    result: "Shanghai + Suzhou + Hangzhou",
  },
  {
    id: "classic-history",
    label: "Classic history",
    result: "Beijing + Xi'an",
  },
  {
    id: "food-focused",
    label: "Food-focused",
    result: "Chengdu + Guangzhou or Chengdu + Chongqing",
  },
  {
    id: "modern-city",
    label: "Modern city trip",
    result: "Shanghai + Shenzhen + Guangzhou",
  },
  {
    id: "short-transit",
    label: "Short transit route",
    result: "Shanghai base with day trips",
  },
];

export function ToolKitWidget({ type }: ToolKitWidgetProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isReady) {
    return (
      <div
        className="rounded-lg border border-ink/10 bg-paper p-5 text-base text-ink/62 shadow-soft"
        data-tool-ready="false"
        aria-busy="true"
        aria-live="polite"
      >
        Loading the planning tool…
      </div>
    );
  }

  const tool = type === "visa"
    ? <VisaTool />
    : type === "duration"
      ? <DurationTool />
      : type === "apps"
        ? <AppsTool />
        : <RouteTool />;

  return <div data-tool-ready="true">{tool}</div>;
}

function CopyResultButton({ value }: { value: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyResult() {
    try {
      await window.navigator.clipboard.writeText(value);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={copyResult}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-current/25 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
      >
        {copyState === "copied" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
        {copyState === "copied" ? "Result copied" : "Copy result"}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copyState === "copied"
          ? "Result copied to clipboard."
          : copyState === "error"
            ? "Could not copy the result. Please select the text manually."
            : ""}
      </p>
    </div>
  );
}

function VisaTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const completionTrackedRef = useRef(false);
  const missing = visaChecks.filter((item) => !checked.includes(item.id));
  const score = checked.length;
  const progressPercent = Math.round((score / visaChecks.length) * 100);
  const result =
    score === 0
      ? {
          title: "Start with the five route checks",
          tone: "bg-sand text-ink",
          nextStep: "Select only the items you have verified, then compare the result with official sources.",
          body:
            "Nothing is selected yet. This checker does not decide eligibility; it helps you see which route facts still need official verification.",
        }
      : score === visaChecks.length
      ? {
          title: "Likely worth checking official eligibility",
          tone: "bg-jade text-white",
          nextStep: "Compare your exact route with official immigration and airline information before purchase.",
          body:
            "Your planning shape has the core pieces. Do not book solely from this result: confirm your nationality, ports, onward ticket, and permitted stay area with official sources before paying for travel.",
        }
      : score <= 2
        ? {
            title: "Do not rely on visa-free transit yet",
            tone: "bg-ink text-white",
            nextStep: "Start with official eligibility, then confirm your ticket route, ports, and permitted travel area.",
            body:
              "You do not have enough confirmed information to rely on visa-free transit. This route may still work later, but it is not ready to book around yet.",
          }
        : {
            title: "High risk — verify before booking",
            tone: "bg-ember text-white",
            nextStep: "Resolve every missing item before booking flights, hotels, trains, or non-refundable plans.",
            body:
              "Some important pieces are still missing. Visa-free transit rules are route-specific, so verify the missing items before booking flights, hotels, or trains.",
          };

  useEffect(() => {
    if (score !== visaChecks.length || completionTrackedRef.current) {
      return;
    }

    completionTrackedRef.current = true;
    trackEvent("visa_free_checker_completed", {
      source_page: "/tools/visa-free-eligibility-checker",
      tool: "visa-free-eligibility-checker",
      checked_count: score,
      result: result.title,
    });
  }, [result.title, score]);

  function toggleVisaCheck(id: string, nextChecked: boolean) {
    setChecked((current) =>
      nextChecked ? [...current, id] : current.filter((candidate) => candidate !== id),
    );
  }

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
      <div className="mb-5 rounded-md bg-sand p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-ember">Planning checks</p>
            <h2 className="mt-1 text-2xl font-bold leading-tight text-ink">
              {score}/{visaChecks.length} confirmed
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setChecked([])}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-4 py-2 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
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
      <fieldset className="grid gap-3">
        <legend className="sr-only">Visa-free transit planning checks</legend>
        {visaChecks.map((item) => (
          <label
            key={item.id}
            htmlFor={`visa-${item.id}`}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-base text-ink/72 transition hover:border-ember/30 focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 ${
              checked.includes(item.id)
                ? "border-ember/35 bg-mist"
                : "border-ink/10 bg-sand"
            }`}
          >
            <input
              id={`visa-${item.id}`}
              type="checkbox"
              checked={checked.includes(item.id)}
              onChange={(event) => toggleVisaCheck(item.id, event.target.checked)}
              aria-describedby={`visa-${item.id}-description`}
              className="mt-1 h-5 w-5 shrink-0 accent-ember focus:outline-none"
            />
            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2 font-bold text-ink">
                {item.label}
                {checked.includes(item.id) ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 text-xs font-bold uppercase text-ember">
                    <CheckCircle2 aria-hidden="true" size={14} />
                    Selected
                  </span>
                ) : null}
              </span>
              <span
                id={`visa-${item.id}-description`}
                className="mt-1 block text-sm leading-relaxed text-ink/62"
              >
                {item.description}
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className={`mt-5 rounded-md p-4 ${result.tone}`} role="status" aria-live="polite">
        <p className="text-sm font-bold uppercase opacity-80">Planning result</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{result.title}</h2>
        <p className="mt-2 text-base opacity-85">{result.body}</p>
        <p className="mt-3 rounded-md bg-white/12 p-3 text-sm font-semibold opacity-90">
          This is not legal or immigration advice. Always verify official requirements before booking.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {visaResultStates.map((state) => (
            <div
              key={state.title}
              className="rounded-md bg-white/12 p-3 text-sm"
              aria-current={state.title === result.title ? "true" : undefined}
            >
              <p className="font-bold leading-snug">{state.title}</p>
              <p className="mt-1 opacity-80">{state.description}</p>
            </div>
          ))}
        </div>
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
        <CopyResultButton
          value={`${result.title}\n${result.body}\nNext: ${result.nextStep}`}
        />
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
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-ember hover:text-ember-hover"
            >
              {link.label}
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          ))}
        </div>
      </section>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/visa-free-transit#route-check"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-4 py-2 text-center text-base font-semibold text-white transition hover:bg-ember-hover sm:w-auto"
        >
          Check your full route and entry port
        </Link>
        <Link
          href="/guides/china-240-hour-visa-free-transit-guide"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-center text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember sm:w-auto"
        >
          Read the detailed 240-hour Guide
        </Link>
      </div>
    </div>
  );
}

function DurationTool() {
  const [selectedDuration, setSelectedDuration] = useState("");
  const selectedOption =
    tripDurationOptions.find((option) => option.id === selectedDuration) || null;

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <fieldset className="grid gap-3">
        <legend className="text-lg font-bold leading-tight text-ink">
          How many days do you have?
        </legend>
        <p className="text-sm leading-relaxed text-ink/62">
          Choose the closest total trip length, including arrival and departure days.
        </p>
        <div className="mt-2 grid gap-3">
          {tripDurationOptions.map((option) => (
            <label
              key={option.id}
              htmlFor={`duration-${option.id}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:border-ember/30 focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 ${
                selectedDuration === option.id
                  ? "border-ember/35 bg-mist"
                  : "border-ink/10 bg-sand"
              }`}
            >
              <input
                id={`duration-${option.id}`}
                type="radio"
                name="trip-duration"
                value={option.id}
                checked={selectedDuration === option.id}
                onChange={(event) => setSelectedDuration(event.target.value)}
                aria-describedby={`duration-${option.id}-description`}
                className="mt-1 h-5 w-5 shrink-0 accent-ember focus:outline-none"
              />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2 text-lg font-bold leading-tight text-ink">
                  {option.label}
                  {selectedDuration === option.id ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 text-xs font-bold uppercase text-ember">
                      <CheckCircle2 aria-hidden="true" size={14} />
                      Selected
                    </span>
                  ) : null}
                </span>
                <span
                  id={`duration-${option.id}-description`}
                  className="mt-1 block text-sm leading-relaxed text-ink/62"
                >
                  {option.result}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 rounded-md bg-sand p-4" role="status" aria-live="polite">
        <p className="text-sm font-bold uppercase text-ember">Recommended route type</p>
        {selectedOption ? (
          <>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">
              {selectedOption.label}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink/72">
              {selectedOption.result}
            </p>
            <CopyResultButton
              value={`${selectedOption.label}\n${selectedOption.result}`}
            />
          </>
        ) : (
          <p className="mt-2 text-base leading-relaxed text-ink/72">
            Choose a trip length above to see a route recommendation.
          </p>
        )}
      </div>
    </div>
  );
}

function AppsTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const [hasLoadedStoredChecks, setHasLoadedStoredChecks] = useState(false);
  const hasTrackedCompletionRef = useRef(false);
  const readyCount = checked.length;
  const totalCount = appChecks.length;
  const progressPercent = Math.round((readyCount / totalCount) * 100);
  const result =
    readyCount === 0
      ? {
          title: "Start with one setup item",
          body: "Nothing is selected yet. Work through the list before departure; your progress is saved only in this browser.",
          tone: "bg-sand text-ink",
        }
      : readyCount >= 7
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

  useEffect(() => {
    if (!hasLoadedStoredChecks || readyCount < 7 || hasTrackedCompletionRef.current) {
      return;
    }

    hasTrackedCompletionRef.current = true;
    trackEvent("essential_apps_checklist_completed", {
      source_page: "/tools/essential-apps-checklist",
      tool: "essential-apps-checklist",
      ready_count: readyCount,
      total_count: totalCount,
      result: result.title,
    });
  }, [hasLoadedStoredChecks, readyCount, result.title, totalCount]);

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
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-4 py-2 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
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

      <fieldset className="grid gap-3">
        <legend className="sr-only">Essential China app setup checklist</legend>
        {appChecks.map((item) => (
          <label
            key={item.id}
            htmlFor={`app-${item.id}`}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-base text-ink/72 transition hover:border-ember/30 focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 ${
              checked.includes(item.id)
                ? "border-ember/35 bg-mist"
                : "border-ink/10 bg-sand"
            }`}
          >
            <input
              id={`app-${item.id}`}
              type="checkbox"
              checked={checked.includes(item.id)}
              onChange={(event) =>
                toggleItem(item.id, event.target.checked)
              }
              aria-describedby={`app-${item.id}-description`}
              className="mt-1 h-5 w-5 shrink-0 accent-ember focus:outline-none"
            />
            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase text-ember">
                {item.category}
                {checked.includes(item.id) ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 text-xs font-bold uppercase text-ember">
                    <CheckCircle2 aria-hidden="true" size={14} />
                    Selected
                  </span>
                ) : null}
              </span>
              <span className="mt-1 block text-lg font-bold leading-tight text-ink">
                {item.title}
                {item.chineseName ? (
                  <span className="ml-2 text-base font-semibold text-ink/52">
                    {item.chineseName}
                  </span>
                ) : null}
              </span>
              <span
                id={`app-${item.id}-description`}
                className="mt-1 block text-sm leading-relaxed text-ink/62"
              >
                <span className="font-semibold text-ink/70">Why it matters: </span>
                {item.whyItMatters}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className={`mt-5 rounded-md p-4 ${result.tone}`} role="status" aria-live="polite">
        <p className="text-sm font-bold uppercase opacity-80">Checklist result</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{result.title}</h2>
        <p className="mt-2 text-base opacity-85">{result.body}</p>
        <CopyResultButton
          value={`${result.title}\n${result.body}\nProgress: ${readyCount}/${totalCount}`}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/guides/best-apps-for-traveling-in-china"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-center text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
        >
          Read the full Apps Guide
        </Link>
        <Link
          href="/store#inside-the-guide"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-center text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember"
        >
          Get the printable setup guide
        </Link>
      </div>

      <p className="mt-5 rounded-md border border-ink/10 bg-paper p-4 text-sm leading-relaxed text-ink/58">
        {appTrademarkDisclaimer}
      </p>
    </div>
  );
}

function RouteTool() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const selectedOption =
    routeStyleOptions.find((option) => option.id === selectedStyle) || null;

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <fieldset className="grid gap-3">
        <legend className="text-lg font-bold leading-tight text-ink">
          What travel style fits you best?
        </legend>
        <p className="text-sm leading-relaxed text-ink/62">
          Choose one style to get a simple first-route direction.
        </p>
        <div className="mt-2 grid gap-3">
          {routeStyleOptions.map((option) => (
            <label
              key={option.id}
              htmlFor={`route-${option.id}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:border-ember/30 focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2 ${
                selectedStyle === option.id
                  ? "border-ember/35 bg-mist"
                  : "border-ink/10 bg-sand"
              }`}
            >
              <input
                id={`route-${option.id}`}
                type="radio"
                name="travel-style"
                value={option.id}
                checked={selectedStyle === option.id}
                onChange={(event) => setSelectedStyle(event.target.value)}
                aria-describedby={`route-${option.id}-description`}
                className="mt-1 h-5 w-5 shrink-0 accent-ember focus:outline-none"
              />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2 text-lg font-bold leading-tight text-ink">
                  {option.label}
                  {selectedStyle === option.id ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 text-xs font-bold uppercase text-ember">
                      <CheckCircle2 aria-hidden="true" size={14} />
                      Selected
                    </span>
                  ) : null}
                </span>
                <span
                  id={`route-${option.id}-description`}
                  className="mt-1 block text-sm leading-relaxed text-ink/62"
                >
                  Suggested route: {option.result}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 rounded-md bg-sand p-4" role="status" aria-live="polite">
        <p className="text-sm font-bold uppercase text-ember">Recommended route</p>
        {selectedOption ? (
          <>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">
              {selectedOption.result}
            </h2>
            <p className="mt-2 text-base text-ink/72">
              Based on: {selectedOption.label}
            </p>
            <CopyResultButton
              value={`${selectedOption.result}\nBased on: ${selectedOption.label}`}
            />
          </>
        ) : (
          <p className="mt-2 text-base leading-relaxed text-ink/72">
            Choose a travel style above to see a suggested first route.
          </p>
        )}
      </div>
    </div>
  );
}
