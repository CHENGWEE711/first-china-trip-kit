"use client";

import {
  ArrowRight,
  CircleHelp,
  PlaneLanding,
  Route,
  ShieldCheck,
} from "lucide-react";

export type VisaPolicyContext =
  | "unilateral-30-day"
  | "transit-240-hour"
  | "direct-transit-24-hour"
  | "manual-review";

const contextIcons = {
  "unilateral-30-day": ShieldCheck,
  "transit-240-hour": Route,
  "direct-transit-24-hour": PlaneLanding,
  "manual-review": CircleHelp,
} as const;

export function VisaPolicyChoiceLink({
  context,
  index,
  title,
  body,
}: {
  context: VisaPolicyContext;
  index: number;
  title: string;
  body: string;
}) {
  const Icon = contextIcons[context];

  return (
    <a
      href="#route-checker"
      onClick={(event) => {
        event.preventDefault();
        window.dispatchEvent(
          new CustomEvent("visa-policy-context-selected", {
            detail: { context },
          }),
        );
        document.getElementById("route-checker")?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }}
      className="group min-h-64 border-b border-ink/12 px-0 py-6 pr-6 md:border-r md:px-6 md:first:pl-0 xl:border-b-0 xl:last:border-r-0 xl:last:pr-0"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ember">0{index + 1}</span>
        <Icon aria-hidden="true" className="text-jade" size={22} />
      </div>
      <h3 className="mt-8 text-2xl leading-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/62">{body}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ember group-hover:text-ember-hover">
        Use the checker <ArrowRight aria-hidden="true" size={16} />
      </span>
    </a>
  );
}
