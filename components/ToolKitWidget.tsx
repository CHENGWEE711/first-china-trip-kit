"use client";

import { useMemo, useState } from "react";

type ToolType = "visa" | "duration" | "apps" | "route";

type ToolKitWidgetProps = {
  type: ToolType;
};

const visaChecks = [
  "My passport nationality is on the current official eligibility list.",
  "I have a confirmed onward ticket to a third country or region.",
  "My entry and exit ports match the policy I plan to use.",
  "My hotel cities stay inside the permitted travel area.",
  "I will verify official requirements before booking non-refundable travel.",
];

const appChecks = [
  "Alipay installed and card added",
  "WeChat installed and payment attempted if available",
  "Map app tested with Chinese hotel address",
  "Translation app downloaded with offline Chinese",
  "Ride-hailing option tested",
  "Train confirmations saved as screenshots",
  "Hotel address saved in Chinese",
  "Power bank packed",
];

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
  const score = checked.length;
  const result =
    score === visaChecks.length
      ? "Good planning shape. Still verify official rules for your nationality, ports, onward ticket, and permitted stay area before booking."
      : score >= 3
        ? "Close, but do not rely on visa-free transit yet. The missing items are exactly the ones that can change eligibility."
        : "Use this as a planning prompt only. Start with official requirements before building the route.";

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="grid gap-3">
        {visaChecks.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-md bg-sand p-3 text-base text-ink/72">
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, item]
                    : current.filter((candidate) => candidate !== item),
                )
              }
              className="mt-1 h-4 w-4 accent-[#B43D35]"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="mt-5 rounded-md bg-ink p-4 text-white">
        <p className="text-sm font-bold uppercase text-clay">Planning result</p>
        <p className="mt-2 text-base text-white/78">{result}</p>
      </div>
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
  const remaining = appChecks.length - checked.length;

  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <div className="grid gap-3 md:grid-cols-2">
        {appChecks.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-md bg-sand p-3 text-base text-ink/72">
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, item]
                    : current.filter((candidate) => candidate !== item),
                )
              }
              className="mt-1 h-4 w-4 accent-[#B43D35]"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <p className="mt-5 rounded-md bg-ink p-4 text-base text-white/78">
        {remaining === 0
          ? "Your app setup looks ready for a first arrival day."
          : `${remaining} item${remaining === 1 ? "" : "s"} left before your app setup feels first-day ready.`}
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
