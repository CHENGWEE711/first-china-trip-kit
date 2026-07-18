"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  RotateCcw,
  Share2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const READINESS_STORAGE_KEY = "fctk:payment-readiness:v1";
const CHECKLIST_STORAGE_KEY = "fctk:payment-hub-checklist:v1";

const readinessItems = [
  {
    id: "wallet",
    label: "Primary wallet",
    detail: "Alipay installed, verified as far as possible, and ready for a first-day test.",
    weight: 25,
  },
  {
    id: "card",
    label: "Physical card",
    detail: "A Visa or Mastercard is accessible for hotels and card-friendly merchants.",
    weight: 20,
  },
  {
    id: "bank",
    label: "Bank access",
    detail: "You can receive security prompts and check overseas transaction controls.",
    weight: 15,
  },
  {
    id: "backup",
    label: "Second payment route",
    detail: "A second wallet or a card from another bank is ready if the first route fails.",
    weight: 25,
  },
  {
    id: "cash",
    label: "Emergency cash",
    detail: "A small amount of RMB is planned for weak data, low battery, or a failed app.",
    weight: 15,
  },
] as const;

type ReadinessId = (typeof readinessItems)[number]["id"];

function readStringArray(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function writeStringArray(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The tool still works when storage is unavailable in private browsing.
  }
}

export function PaymentHubView() {
  useEffect(() => {
    trackEvent("payment_hub_view", { source_page: "/payments-and-apps" });
  }, []);

  return null;
}

export function PaymentReadinessChecker() {
  const [selected, setSelected] = useState<ReadinessId[]>([]);
  const [copied, setCopied] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const saved = readStringArray(READINESS_STORAGE_KEY).filter((id): id is ReadinessId =>
      readinessItems.some((item) => item.id === id),
    );
    const frame = window.requestAnimationFrame(() => setSelected(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const score = readinessItems.reduce(
    (total, item) => total + (selected.includes(item.id) ? item.weight : 0),
    0,
  );
  const missing = readinessItems.filter((item) => !selected.includes(item.id));
  const summary =
    score === 100
      ? "Your four-layer payment plan is ready for a controlled first-day test."
      : `Still missing: ${missing.map((item) => item.label.toLowerCase()).join(", ")}.`;

  function toggleItem(id: ReadinessId) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("payment_readiness_started", { source_page: "/payments-and-apps" });
    }
    setSelected((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      writeStringArray(READINESS_STORAGE_KEY, next);
      return next;
    });
  }

  function completeCheck() {
    trackEvent("payment_readiness_completed", {
      source_page: "/payments-and-apps",
      score,
      missing_count: missing.length,
    });
  }

  async function shareScore() {
    const text = `My China payment readiness score is ${score}%. ${summary} First China Trip Kit`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "China payment readiness", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // A cancelled share sheet does not need an error state.
    }
  }

  return (
    <div data-testid="payment-readiness-checker" className="grid gap-8">
      <fieldset>
        <legend className="sr-only">Select each payment readiness item you have completed</legend>
        <div className="divide-y divide-ink/12 border-y border-ink/15">
          {readinessItems.map((item) => {
            const checked = selected.includes(item.id);
            return (
              <label
                key={item.id}
                className="grid min-h-20 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 py-4"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(item.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 place-items-center rounded-sm border border-ink/35 bg-paper text-white transition peer-checked:border-jade peer-checked:bg-jade peer-focus-visible:ring-2 peer-focus-visible:ring-ember peer-focus-visible:ring-offset-2"
                >
                  {checked ? <Check size={17} strokeWidth={3} /> : null}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{item.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/60">{item.detail}</span>
                </span>
                <span className="text-sm font-bold text-ink/45">{item.weight}%</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="self-start border-t border-ink/12 pt-8">
        <div
          aria-live="polite"
          className="grid aspect-square max-w-[290px] place-items-center rounded-full border-[14px] border-mist bg-paper shadow-soft"
          style={{
            background: `conic-gradient(rgb(var(--color-brand-green)) ${score}%, rgb(var(--color-brand-green-light)) ${score}% 100%)`,
          }}
        >
          <div className="grid h-[82%] w-[82%] place-items-center rounded-full bg-paper text-center">
            <div>
              <p className="font-editorial text-6xl leading-none text-ink">{score}%</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/48">
                Ready score
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/70">{summary}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <button
            type="button"
            onClick={completeCheck}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember-hover"
          >
            Check my readiness
          </button>
          <button
            type="button"
            onClick={shareScore}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/18 bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:border-ember/45 hover:text-ember"
          >
            {copied ? <Copy size={17} /> : <Share2 size={17} />}
            {copied ? "Score copied" : "Share my score"}
          </button>
        </div>
      </div>
    </div>
  );
}

type Device = "iphone" | "android";
type TripLength = "7" | "30";
type NumberPreference = "keep" | "new";

function SegmentedChoice<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="border-t border-ink/14 pt-4">
      <legend className="text-sm font-bold uppercase tracking-[0.1em] text-ink/48">{legend}</legend>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="grid min-h-11 place-items-center rounded-md border border-ink/15 bg-paper px-3 py-2 text-center text-sm font-semibold text-ink/68 transition peer-checked:border-jade peer-checked:bg-mist peer-checked:text-jade peer-focus-visible:ring-2 peer-focus-visible:ring-ember peer-focus-visible:ring-offset-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function InternetDecisionTree() {
  const [device, setDevice] = useState<Device>("iphone");
  const [tripLength, setTripLength] = useState<TripLength>("7");
  const [numberPreference, setNumberPreference] = useState<NumberPreference>("keep");

  const recommendation = useMemo(() => {
    if (tripLength === "30" && numberPreference === "new") {
      return {
        title: "Compare a local SIM with a 30-day travel plan",
        body: "A local SIM can suit a longer stay when a new number is acceptable. Keep your arrival instructions, hotel address, and first data option offline until the local line is active.",
      };
    }
    if (tripLength === "30") {
      return {
        title: "Use a longer eSIM or roaming plan and keep your home line",
        body: "Compare total data, hotspot rules, renewal cost, and whether your phone can keep the home line active for bank or login messages.",
      };
    }
    if (device === "android") {
      return {
        title: "Use a travel eSIM if your exact Android model supports it",
        body: "Android eSIM support varies by model and country. If your model is not compatible, arrange roaming or a physical SIM and save setup instructions offline.",
      };
    }
    return {
      title: "Use a short travel eSIM and keep your home line available",
      body: "For a one-week trip, a compatible travel eSIM is often the simplest arrival setup. Confirm eSIM support, install before departure, and avoid switching it on too early.",
    };
  }, [device, numberPreference, tripLength]);

  return (
    <div data-testid="internet-decision-tree" className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="grid gap-5">
        <SegmentedChoice
          legend="1 · My phone"
          name="internet-device"
          value={device}
          onChange={setDevice}
          options={[
            { label: "iPhone", value: "iphone" },
            { label: "Android", value: "android" },
          ]}
        />
        <SegmentedChoice
          legend="2 · My trip"
          name="internet-length"
          value={tripLength}
          onChange={setTripLength}
          options={[
            { label: "About 7 days", value: "7" },
            { label: "About 30 days", value: "30" },
          ]}
        />
        <SegmentedChoice
          legend="3 · My number"
          name="internet-number"
          value={numberPreference}
          onChange={setNumberPreference}
          options={[
            { label: "Keep my number", value: "keep" },
            { label: "New number is fine", value: "new" },
          ]}
        />
      </div>
      <div aria-live="polite" className="flex min-h-[330px] flex-col justify-between bg-ink p-7 text-white md:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-mist">Your starting option</p>
          <h3 className="mt-5 text-3xl leading-tight text-white md:text-4xl">{recommendation.title}</h3>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72">{recommendation.body}</p>
        </div>
        <p className="mt-8 border-t border-white/15 pt-5 text-sm leading-relaxed text-white/58">
          Check device compatibility, current provider terms, access to your bank&apos;s security messages,
          and current service rules before buying. A data option does not guarantee access to every service.
        </p>
      </div>
    </div>
  );
}

const backupScenarios = [
  ["Alipay fails", "Use the second wallet or a working physical card for the purchase. Check the bank alert and wallet verification later on stable data."],
  ["WeChat Pay fails", "Keep Alipay as the primary route. Do not repeatedly retry at a busy counter; switch methods and troubleshoot later."],
  ["There is no internet", "Use offline screenshots, Chinese addresses, cash, and a hotel or staffed transport desk. Restore data before moving far from a known location."],
  ["The map will not open", "Show the saved Chinese destination to hotel, station, or taxi staff. Use a screenshot with the place name and phone number."],
  ["You cannot call a ride", "Use a hotel-arranged taxi or an official airport or station taxi queue. Keep the destination written in Chinese."],
  ["You do not speak Chinese", "Show one short translated sentence and the exact address. Avoid long machine-translated explanations."],
  ["Your phone battery is dead", "Use your power bank first. Keep cash, a physical card, and a printed or written hotel address outside the phone."],
  ["Only cash works", "Pay with small RMB notes when possible and confirm the amount before handing over cash. Ask for change at a staffed counter."],
] as const;

export function BackupPlan() {
  const [openItem, setOpenItem] = useState<string | null>(backupScenarios[0][0]);
  const trackedRef = useRef(new Set<string>());

  function toggleScenario(label: string) {
    const opening = openItem !== label;
    setOpenItem(opening ? label : null);
    if (opening && !trackedRef.current.has(label)) {
      trackedRef.current.add(label);
      trackEvent("offline_backup_opened", {
        source_page: "/payments-and-apps",
        scenario: label,
      });
    }
  }

  return (
    <div data-testid="offline-backup-plan" className="divide-y divide-white/14 border-y border-white/18">
      {backupScenarios.map(([label, answer]) => {
        const isOpen = openItem === label;
        return (
          <div key={label}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleScenario(label)}
              className="grid min-h-16 w-full grid-cols-[1fr_auto] items-center gap-5 py-4 text-left text-white transition hover:text-mist"
            >
              <span className="font-editorial text-xl md:text-2xl">What if {label.toLowerCase()}?</span>
              <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {isOpen ? <p className="max-w-3xl pb-5 text-base leading-relaxed text-white/68">{answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

const checklistGroups = [
  {
    title: "Payments",
    items: [
      "Install and open Alipay before departure",
      "Add a primary international card",
      "Prepare a second card or wallet",
      "Plan a small RMB cash backup",
    ],
  },
  {
    title: "Apps",
    items: [
      "Install a translation app and offline Chinese pack",
      "Save one map app and Chinese place names",
      "Prepare train booking or confirmation access",
      "Test ride-hailing access or save a taxi fallback",
    ],
  },
  {
    title: "Internet",
    items: [
      "Confirm phone eSIM or physical SIM compatibility",
      "Choose eSIM, roaming, or local SIM",
      "Keep access to bank security messages",
      "Save activation instructions offline",
    ],
  },
  {
    title: "Offline backup",
    items: [
      "Save the hotel name and address in Chinese",
      "Save passport and booking copies securely offline",
      "Pack a charged power bank and cable",
      "Write one emergency contact outside the phone",
    ],
  },
  {
    title: "First hour",
    items: [
      "Connect before leaving the airport",
      "Test one low-value payment near the hotel",
      "Keep cash and a physical card accessible",
      "Confirm the next transfer before moving on",
    ],
  },
] as const;

const allChecklistItems = checklistGroups.flatMap((group) =>
  group.items.map((label) => ({ id: `${group.title}:${label}`, label, group: group.title })),
);

export function InteractiveChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const saved = readStringArray(CHECKLIST_STORAGE_KEY).filter((id) =>
      allChecklistItems.some((item) => item.id === id),
    );
    completedRef.current = saved.length === allChecklistItems.length;
    const frame = window.requestAnimationFrame(() => setCompleted(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const progress = Math.round((completed.length / allChecklistItems.length) * 100);

  function toggleItem(id: string) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("interactive_checklist_started", { source_page: "/payments-and-apps" });
    }
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      writeStringArray(CHECKLIST_STORAGE_KEY, next);
      if (next.length === allChecklistItems.length && !completedRef.current) {
        completedRef.current = true;
        trackEvent("interactive_checklist_completed", {
          source_page: "/payments-and-apps",
          item_count: allChecklistItems.length,
        });
      }
      if (next.length < allChecklistItems.length) completedRef.current = false;
      return next;
    });
  }

  function resetChecklist() {
    setCompleted([]);
    writeStringArray(CHECKLIST_STORAGE_KEY, []);
    startedRef.current = false;
    completedRef.current = false;
  }

  return (
    <div data-testid="interactive-payment-checklist" className="grid gap-8 lg:grid-cols-[0.36fr_1fr]">
      <div className="self-start lg:sticky lg:top-28">
        <p className="font-editorial text-6xl leading-none text-ink" aria-live="polite">{progress}%</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
          <div className="h-full bg-ember transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/58">
          {completed.length} of {allChecklistItems.length} setup checks complete. Progress stays on this device.
        </p>
        <button
          type="button"
          onClick={resetChecklist}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink/58 hover:text-ember"
        >
          <RotateCcw size={16} /> Reset checklist
        </button>
        {progress === 100 ? (
          <a
            href="/china-first-time-visitor-checklist.pdf"
            download
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-semibold text-white hover:bg-ember-hover"
          >
            <Download size={17} /> Download the free PDF
          </a>
        ) : (
          <p className="mt-5 border-l-2 border-ember/35 pl-3 text-sm leading-relaxed text-ink/60">
            Complete all 20 checks to unlock the printable PDF.
          </p>
        )}
      </div>

      <div className="grid gap-8">
        {checklistGroups.map((group) => (
          <fieldset key={group.title} className="border-t border-ink/15 pt-5">
            <legend className="font-editorial text-2xl text-ink">{group.title}</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.items.map((label) => {
                const id = `${group.title}:${label}`;
                const checked = completed.includes(id);
                return (
                  <label key={id} className="flex min-h-16 cursor-pointer items-start gap-3 bg-paper/70 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-sm border border-ink/30 text-white peer-checked:border-jade peer-checked:bg-jade peer-focus-visible:ring-2 peer-focus-visible:ring-ember peer-focus-visible:ring-offset-2"
                    >
                      {checked ? <Check size={15} strokeWidth={3} /> : null}
                    </span>
                    <span className={`text-sm leading-relaxed ${checked ? "text-ink/48 line-through" : "text-ink/72"}`}>
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}

const previewPages = [
  ["/products/previews/payment-apps-guide-cover.png", "Guide cover and three ways to use the setup guide"],
  ["/products/previews/payment-apps-guide-decision-tree.png", "Payment backup decision tree preview page"],
  ["/products/previews/payment-apps-guide-app-stack.png", "Essential China app stack preview page"],
  ["/products/previews/payment-apps-guide-hotel-card.png", "Printable hotel address card preview page"],
  ["/products/previews/payment-apps-guide-phrase-card.png", "Printable checkout phrase card preview page"],
] as const;

export function GuidePreview() {
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false);

  function togglePreview() {
    const next = !open;
    setOpen(next);
    if (next && !openedRef.current) {
      openedRef.current = true;
      trackEvent("guide_preview_opened", {
        source_page: "/payments-and-apps",
        product_id: "china-payment-apps-setup-guide",
      });
    }
  }

  return (
    <div data-testid="payment-guide-preview">
      <div className="grid grid-cols-3 items-end gap-2 sm:gap-4">
        {previewPages.slice(0, 3).map(([src, alt], index) => (
          <div
            key={src}
            className={`overflow-hidden border border-ink/12 bg-paper shadow-editorial ${index === 1 ? "translate-y-5" : ""}`}
          >
            <Image src={src} alt={alt} width={1241} height={1754} sizes="(min-width: 1024px) 15vw, 28vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={togglePreview}
        aria-expanded={open}
        className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/18 bg-paper px-5 py-3 text-sm font-semibold text-ink hover:border-ember/45 hover:text-ember"
      >
        {open ? "Close full preview" : "Open the 5-page preview"}
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} size={17} />
      </button>
      {open ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewPages.map(([src, alt]) => (
            <figure key={src} className="bg-paper p-3 shadow-soft">
              <Image src={src} alt={alt} width={1241} height={1754} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw" className="h-auto w-full" />
              <figcaption className="px-1 pb-1 pt-3 text-xs leading-relaxed text-ink/55">{alt}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
