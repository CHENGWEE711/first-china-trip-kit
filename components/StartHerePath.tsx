"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  Languages,
  MapPinned,
  Route,
  ShieldCheck,
  Signal,
  Smartphone,
  TrainFront,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    id: "entry",
    title: "Check entry rules",
    body: "Confirm your passport eligibility, exact ports, permitted travel area and onward route before paying for non-refundable travel.",
    href: "/visa-free-transit",
    label: "Check the visa-free transit Hub",
    icon: ShieldCheck,
  },
  {
    id: "payment",
    title: "Set up payment",
    body: "Prepare one QR payment method, a second payment route, a physical card and a small RMB cash backup.",
    href: "/payments-and-apps#payments",
    label: "Prepare payments",
    icon: BadgeDollarSign,
  },
  {
    id: "apps",
    title: "Install essential apps",
    body: "Keep the stack small: payment, translation, maps, transport support and offline screenshots.",
    href: "/payments-and-apps#apps",
    label: "Build your app stack",
    icon: Smartphone,
  },
  {
    id: "internet",
    title: "Prepare internet access",
    body: "Choose roaming, eSIM or a local SIM, then test the setup and save what you need if mobile data fails.",
    href: "/payments-and-apps#internet",
    label: "Plan mobile data",
    icon: Signal,
  },
  {
    id: "transport",
    title: "Plan trains and transport",
    body: "Confirm the exact airport or station, understand passport boarding and leave enough time for city transfers.",
    href: "/guides/how-to-book-high-speed-trains-in-china",
    label: "Understand train travel",
    icon: TrainFront,
  },
  {
    id: "language",
    title: "Save addresses and Chinese phrases",
    body: "Keep your hotel name, Chinese address, phone number and a few taxi, payment and help phrases offline.",
    href: "/guides/basic-chinese-phrases-for-travelers",
    label: "Save practical phrases",
    icon: Languages,
  },
  {
    id: "checklist",
    title: "Download the checklist",
    body: "Use the printable list for a final pass across documents, phone setup, payment backups and arrival details.",
    href: "/payments-and-apps#interactive-checklist",
    label: "Open the free checklist",
    icon: Check,
  },
  {
    id: "route",
    title: "Choose a city or itinerary",
    body: "Only after the practical setup is clear, choose cities that fit your days, interests and transfer tolerance.",
    href: "/city-kits",
    label: "Compare destinations",
    secondaryHref: "/itinerary-kits",
    secondaryLabel: "Browse realistic routes",
    icon: MapPinned,
  },
] as const;

const storageKey = "first-china-trip-kit-start-here-progress";

export function StartHerePath() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  useEffect(() => {
    let saved: string[] = [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "[]") as unknown;
      if (Array.isArray(parsed)) {
        saved = parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      saved = [];
    }

    const timer = window.setTimeout(() => {
      setCompleted(saved);
      setHasLoadedProgress(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggle(id: string, checked: boolean) {
    setCompleted((current) => {
      const next = checked
        ? Array.from(new Set([...current, id]))
        : current.filter((item) => item !== id);
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const progress = Math.round((completed.length / steps.length) * 100);

  return (
    <div data-progress-ready={hasLoadedProgress ? "true" : "false"}>
      <div className="sticky top-16 z-20 border-y border-ink/10 bg-paper px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ember">Your progress</p>
            <p className="mt-1 text-lg font-semibold text-ink">{completed.length} of {steps.length} preparation steps marked complete</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="h-2 overflow-hidden bg-sand" aria-hidden="true"><div className="h-full bg-jade transition-[width]" style={{ width: `${progress}%` }} /></div>
            <p className="mt-1 text-right text-xs font-semibold text-ink/55">{progress}%</p>
          </div>
        </div>
      </div>

      <ol className="mx-auto max-w-5xl px-4 py-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = completed.includes(step.id);
          return (
            <li key={step.id} id={step.id === "route" ? "choose-your-cities" : undefined} className="scroll-mt-40 border-b border-ink/12 py-8 first:pt-0 last:border-b-0">
              <article className="grid gap-5 md:grid-cols-[4.5rem_1fr_auto] md:items-start">
                <div className="flex items-center gap-3 md:block">
                  <p className="text-sm font-bold text-ember">0{index + 1}</p>
                  <Icon aria-hidden="true" className="mt-0 text-jade md:mt-4" size={27} />
                </div>
                <div>
                  <h2 className="text-3xl leading-tight text-ink">{step.title}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/68">{step.body}</p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                    <Link href={step.href} className="inline-flex min-h-11 items-center gap-2 font-bold text-ember">{step.label}<ArrowRight aria-hidden="true" size={17} /></Link>
                    {"secondaryHref" in step ? <Link href={step.secondaryHref} className="inline-flex min-h-11 items-center gap-2 font-semibold text-jade">{step.secondaryLabel}<Route aria-hidden="true" size={17} /></Link> : null}
                  </div>
                </div>
                <label className={`flex min-h-11 items-center gap-2 border px-3 py-2 text-sm font-semibold transition ${hasLoadedProgress ? "cursor-pointer" : "cursor-wait opacity-65"} ${isComplete ? "border-jade bg-mist text-jade" : "border-ink/15 bg-paper text-ink/62"}`}>
                  <input
                    type="checkbox"
                    checked={isComplete}
                    disabled={!hasLoadedProgress}
                    onChange={(event) => toggle(step.id, event.target.checked)}
                    className="h-5 w-5 accent-jade"
                  />
                  {!hasLoadedProgress ? "Loading progress" : isComplete ? "Completed" : "Mark complete"}
                </label>
              </article>
            </li>
          );
        })}
      </ol>
      <p className="mx-auto max-w-5xl px-4 pb-12 text-sm leading-relaxed text-ink/55">Progress is saved only in this browser. No passport, route or checklist answers are sent to First China Trip Kit.</p>
    </div>
  );
}
