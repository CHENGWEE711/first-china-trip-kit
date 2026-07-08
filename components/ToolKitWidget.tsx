"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

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
