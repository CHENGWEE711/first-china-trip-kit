"use client";

import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  CircleHelp,
  CircleX,
  Clock3,
  ExternalLink,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import {
  COUNTRY_REGION_OPTIONS,
  PERMITTED_STAY_AREA_GROUPS,
  TRANSIT_ELIGIBLE_COUNTRIES,
  TRANSIT_PORTS,
  TRANSIT_PORT_SEARCH_CODES,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_POLICY_META,
} from "@/data/visa";
import {
  analyticsResultCategory,
  trackVisaEvent,
} from "@/lib/visa/analytics";
import {
  evaluateTransitEligibility,
  type CheckerOutcome,
  type TransitCheckerInput,
  type TransitCheckerResult,
} from "@/lib/visa/evaluate-transit-eligibility";
import type { VisaPolicyContext } from "@/components/visa/VisaPolicyChoiceLink";

type PassportType = TransitCheckerInput["passportType"];
type PassportValidity = TransitCheckerInput["passportValidity"];
type JourneyType = TransitCheckerInput["journeyType"];
type Purpose = TransitCheckerInput["purpose"];
type ExplicitBooleanChoice = "yes" | "no" | "unknown";

type CheckerDraft = {
  nationalityIso2: string;
  passportType: PassportType | "";
  passportValidity: PassportValidity | "";
  immediateOriginRegionId: string;
  immediateOnwardRegionId: string;
  multipleMainlandEntries: ExplicitBooleanChoice | "";
  onwardTicketConfirmed: ExplicitBooleanChoice | "";
  onwardWithin240Hours: ExplicitBooleanChoice | "";
  journeyType: JourneyType | "";
  plannedStayHours: string;
  entryPortId: string | null;
  exitPortId: string | null;
  plannedStayAreaGroupId: string;
  stayingWithinPermittedArea: ExplicitBooleanChoice | "";
  manualReviewRequested: ExplicitBooleanChoice | "";
  purpose: Purpose | "";
};

type FieldErrors = Partial<Record<keyof CheckerDraft, string>>;

const INITIAL_DRAFT: CheckerDraft = {
  nationalityIso2: "",
  passportType: "",
  passportValidity: "",
  immediateOriginRegionId: "",
  immediateOnwardRegionId: "",
  multipleMainlandEntries: "",
  onwardTicketConfirmed: "",
  onwardWithin240Hours: "",
  journeyType: "",
  plannedStayHours: "",
  entryPortId: null,
  exitPortId: null,
  plannedStayAreaGroupId: "",
  stayingWithinPermittedArea: "",
  manualReviewRequested: "",
  purpose: "",
};

const steps = [
  { number: 1, shortLabel: "Passport", title: "Passport" },
  { number: 2, shortLabel: "Route", title: "Immediate route" },
  { number: 3, shortLabel: "Ticket", title: "Onward ticket" },
  { number: 4, shortLabel: "Port", title: "Entry port" },
  { number: 5, shortLabel: "Stay", title: "Stay area and purpose" },
] as const;

const inputClassName =
  "min-h-12 w-full rounded-md border border-ink/20 bg-paper px-3 py-2 text-base text-ink placeholder:text-ink/42 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25";

const outcomeContent: Record<
  CheckerOutcome,
  {
    eyebrow: string;
    title: string;
    summary: string;
    icon: typeof ShieldCheck;
    accentClassName: string;
  }
> = {
  "likely-unilateral-visa-free": {
    eyebrow: "A different entry policy may fit better",
    title: "You may not need the 240-hour transit policy",
    summary:
      "Based on the details entered, China's current 30-day visa-free entry policy may be the more relevant route.",
    icon: ShieldCheck,
    accentClassName: "border-jade bg-mist text-jade",
  },
  "likely-240-hour-transit": {
    eyebrow: "Main conditions appear aligned",
    title: "Your route appears to meet the main 240-hour transit conditions",
    summary:
      "Review every condition below and keep the supporting itinerary available for the airline and immigration inspection.",
    icon: CircleCheckBig,
    accentClassName: "border-jade bg-mist text-jade",
  },
  "likely-24-hour-direct-transit": {
    eyebrow: "A shorter transit rule may be relevant",
    title: "The 24-hour direct transit route may fit this connection",
    summary:
      "This does not mean free movement into the city. Leaving the port's restricted area can require a temporary entry permit.",
    icon: Clock3,
    accentClassName: "border-jade bg-mist text-jade",
  },
  "manual-review": {
    eyebrow: "Confirmation needed",
    title: "This itinerary needs confirmation from the airline or immigration authorities.",
    summary:
      "Confirm the exact operating segments and documents with the airline or immigration authority at the entry port before relying on this policy.",
    icon: CircleHelp,
    accentClassName: "border-amber-700/35 bg-amber-50 text-amber-800",
  },
  "not-eligible-from-answers": {
    eyebrow: "A different entry route is needed",
    title: "The current answers do not match the main 240-hour conditions",
    summary:
      "Use the stated reasons to adjust the itinerary or check a regular visa, direct-transit rule, or another visa-free arrangement.",
    icon: CircleX,
    accentClassName: "border-ember/30 bg-red-50 text-ember",
  },
};

function explicitBoolean(value: ExplicitBooleanChoice | ""): boolean | null {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
}

function formatPolicyDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function focusWithoutSmoothScroll(
  element: HTMLElement | null,
  block: ScrollLogicalPosition = "start",
) {
  if (!element) return;
  element.scrollIntoView({ behavior: "auto", block });
  element.focus({ preventScroll: true });
}

const contextPrompts: Record<VisaPolicyContext, string> = {
  "unilateral-30-day":
    "30-day entry context selected. The checker will screen the unilateral policy before transit rules, using nationality, ordinary-passport status, purpose and stay length.",
  "transit-240-hour":
    "240-hour transit context selected. Complete every route, ticket, port, area and purpose check before relying on this route.",
  "direct-transit-24-hour":
    "24-hour direct-transit context selected. A 24-hour stay estimate has been prefilled; leaving the restricted port area can still require temporary entry permission.",
  "manual-review":
    "Manual-review context selected. Use this route when a connection, document, activity or permitted area is unclear, then confirm with the airline or +86-12367.",
};

function RadioChoices<T extends string>({
  legend,
  name,
  value,
  options,
  error,
  onChange,
}: {
  legend: string;
  name: string;
  value: T | "";
  options: ReadonlyArray<{ value: T; label: string; detail?: string }>;
  error?: string;
  onChange: (value: T) => void;
}) {
  const errorId = `${name}-error`;

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      data-invalid={error ? "true" : undefined}
    >
      <legend className="text-sm font-semibold text-ink">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
            <span className="block min-h-14 rounded-md border border-ink/18 bg-paper px-4 py-3 text-sm text-ink/72 transition peer-checked:border-jade peer-checked:bg-mist peer-checked:text-jade peer-focus-visible:ring-2 peer-focus-visible:ring-ember peer-focus-visible:ring-offset-2">
              <span className="block font-semibold text-inherit">{option.label}</span>
              {option.detail ? (
                <span className="mt-1 block text-xs leading-relaxed text-ink/56">
                  {option.detail}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm font-semibold text-ember">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function getStepErrors(step: number, draft: CheckerDraft): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 1) {
    if (!draft.nationalityIso2) errors.nationalityIso2 = "Select the passport nationality.";
    if (!draft.passportType) errors.passportType = "Select the passport or travel document type.";
    if (!draft.passportValidity) {
      errors.passportValidity = "Select the remaining passport validity.";
    }
  }

  if (step === 2) {
    if (!draft.immediateOriginRegionId.trim()) {
      errors.immediateOriginRegionId = "Enter the country or region immediately before mainland China.";
    }
    if (!draft.immediateOnwardRegionId.trim()) {
      errors.immediateOnwardRegionId = "Enter the country or region immediately after mainland China.";
    }
    if (!draft.multipleMainlandEntries) {
      errors.multipleMainlandEntries = "Select whether the itinerary enters mainland China more than once.";
    }
  }

  if (step === 3) {
    if (!draft.onwardTicketConfirmed) {
      errors.onwardTicketConfirmed = "Select the current ticket status.";
    }
    if (!draft.onwardWithin240Hours) {
      errors.onwardWithin240Hours = "Select whether departure is within 240 hours.";
    }
    if (!draft.journeyType) errors.journeyType = "Select the connection type.";
    const hours = Number(draft.plannedStayHours);
    if (!draft.plannedStayHours || !Number.isFinite(hours) || hours <= 0) {
      errors.plannedStayHours = "Enter an estimated stay length greater than zero hours.";
    }
  }

  if (step === 4 && !draft.entryPortId) {
    errors.entryPortId = "Select one entry port from the current official list.";
  }

  if (step === 5) {
    if (!draft.plannedStayAreaGroupId) {
      errors.plannedStayAreaGroupId = "Select the main planned stay area or choose the unsure option.";
    }
    if (!draft.stayingWithinPermittedArea) {
      errors.stayingWithinPermittedArea = "Select whether the route remains in the permitted area.";
    }
    if (!draft.manualReviewRequested) {
      errors.manualReviewRequested = "Select whether an individual circumstance needs manual confirmation.";
    }
    if (!draft.purpose) errors.purpose = "Select the main purpose of this stay.";
  }

  return errors;
}

export function TransitEligibilityChecker() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<CheckerDraft>(INITIAL_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [portQuery, setPortQuery] = useState("");
  const [result, setResult] = useState<TransitCheckerResult | null>(null);
  const [policyContext, setPolicyContext] = useState<VisaPolicyContext>("transit-240-hour");
  const startedRef = useRef(false);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const portsById = useMemo(
    () => new Map(TRANSIT_PORTS.map((port) => [port.id, port])),
    [],
  );
  const filteredPorts = useMemo(() => {
    const query = portQuery.trim().toLocaleLowerCase("en");
    if (!query) return TRANSIT_PORTS;
    return TRANSIT_PORTS.filter((port) =>
      [
        port.officialEnglishName,
        port.officialChineseName || "",
        port.city,
        port.provinceLevelRegion,
        port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id] || "",
        port.mode,
      ]
        .join(" ")
        .toLocaleLowerCase("en")
        .includes(query),
    );
  }, [portQuery]);

  useEffect(() => {
    if (!result) return;
    const frame = window.requestAnimationFrame(() => {
      focusWithoutSmoothScroll(resultHeadingRef.current);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [result]);

  useEffect(() => {
    function handlePortSelected(event: Event) {
      const detail = (event as CustomEvent<{ id?: unknown }>).detail;
      if (!detail || typeof detail.id !== "string") return;
      const port = portsById.get(detail.id);
      if (!port) return;

      if (!startedRef.current) {
        startedRef.current = true;
        trackVisaEvent("visa_checker_started", {
          interaction_type: "start",
          policy_version: VISA_POLICY_META.policyVersion,
        });
      }
      setDraft((current) => ({ ...current, entryPortId: port.id }));
      setErrors((current) => ({ ...current, entryPortId: undefined }));
      setPortQuery(port.officialEnglishName);
      setResult(null);
      setStep(4);
      window.requestAnimationFrame(() => focusWithoutSmoothScroll(formTopRef.current));
    }

    window.addEventListener("visa-port-selected", handlePortSelected);
    return () => window.removeEventListener("visa-port-selected", handlePortSelected);
  }, [portsById]);

  useEffect(() => {
    function handlePolicyContextSelected(event: Event) {
      const detail = (event as CustomEvent<{ context?: unknown }>).detail;
      const context = detail?.context;
      if (
        context !== "unilateral-30-day" &&
        context !== "transit-240-hour" &&
        context !== "direct-transit-24-hour" &&
        context !== "manual-review"
      ) {
        return;
      }

      setPolicyContext(context);
      setResult(null);
      setErrors({});
      setStep(1);
      if (context === "direct-transit-24-hour") {
        setDraft((current) => ({
          ...current,
          plannedStayHours: current.plannedStayHours || "24",
          onwardWithin240Hours: current.onwardWithin240Hours || "yes",
        }));
      }
      setDraft((current) => ({
        ...current,
        manualReviewRequested: context === "manual-review" ? "yes" : "",
      }));
      if (!startedRef.current) {
        startedRef.current = true;
        trackVisaEvent("visa_checker_started", {
          interaction_type: "start",
          policy_version: VISA_POLICY_META.policyVersion,
        });
      }
    }

    window.addEventListener("visa-policy-context-selected", handlePolicyContextSelected);
    return () =>
      window.removeEventListener("visa-policy-context-selected", handlePolicyContextSelected);
  }, []);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackVisaEvent("visa_checker_started", {
      interaction_type: "start",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }

  function updateDraft<K extends keyof CheckerDraft>(key: K, value: CheckerDraft[K]) {
    markStarted();
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusFirstError() {
    window.requestAnimationFrame(() => {
      const firstInvalid = document.querySelector<HTMLElement>(
        "[data-testid='transit-eligibility-checker'] [aria-invalid='true'], [data-testid='transit-eligibility-checker'] [data-invalid='true'] input",
      );
      focusWithoutSmoothScroll(firstInvalid, "center");
    });
  }

  function goBack() {
    if (step <= 1) return;
    trackVisaEvent("visa_checker_step_completed", {
      step_number: step,
      interaction_type: "back",
      policy_version: VISA_POLICY_META.policyVersion,
    });
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
    window.requestAnimationFrame(() => focusWithoutSmoothScroll(formTopRef.current));
  }

  function completeStep() {
    const nextErrors = getStepErrors(step, draft);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError();
      return;
    }

    trackVisaEvent("visa_checker_step_completed", {
      step_number: step,
      interaction_type: "next",
      policy_version: VISA_POLICY_META.policyVersion,
    });

    if (step < 5) {
      setErrors({});
      setStep((current) => Math.min(5, current + 1));
      window.requestAnimationFrame(() => focusWithoutSmoothScroll(formTopRef.current));
      return;
    }

    const input: TransitCheckerInput = {
      nationalityIso2: draft.nationalityIso2,
      passportType: draft.passportType || "unknown",
      passportValidity: draft.passportValidity || "unknown",
      immediateOriginRegionId: draft.immediateOriginRegionId,
      immediateOnwardRegionId: draft.immediateOnwardRegionId,
      multipleMainlandEntries: explicitBoolean(draft.multipleMainlandEntries),
      entryPortId: draft.entryPortId,
      exitPortId: draft.exitPortId,
      onwardTicketConfirmed: explicitBoolean(draft.onwardTicketConfirmed),
      onwardWithin240Hours: explicitBoolean(draft.onwardWithin240Hours),
      stayingWithinPermittedArea:
        draft.plannedStayAreaGroupId === "unclear-or-multiple"
          ? null
          : explicitBoolean(draft.stayingWithinPermittedArea),
      journeyType: draft.journeyType || "unknown",
      purpose: draft.purpose || "other",
      plannedStayHours: Number(draft.plannedStayHours),
      manualReviewRequested: explicitBoolean(draft.manualReviewRequested),
    };
    const nextResult = evaluateTransitEligibility(input);
    const resultCategory = analyticsResultCategory(nextResult.outcome);
    setResult(nextResult);
    trackVisaEvent("visa_checker_completed", {
      result_category: resultCategory,
      interaction_type: "complete",
      policy_version: VISA_POLICY_META.policyVersion,
    });
    trackVisaEvent("visa_checker_result_viewed", {
      result_category: resultCategory,
      interaction_type: "open",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }

  function restart() {
    trackVisaEvent("visa_checker_started", {
      interaction_type: "restart",
      policy_version: VISA_POLICY_META.policyVersion,
    });
    startedRef.current = true;
    setDraft(INITIAL_DRAFT);
    setErrors({});
    setPortQuery("");
    setResult(null);
    setStep(1);
    window.requestAnimationFrame(() => focusWithoutSmoothScroll(formTopRef.current));
  }

  function trackResultAction(href: string) {
    const baseParams = {
      interaction_type: "click" as const,
      policy_version: VISA_POLICY_META.policyVersion,
      result_category: result ? analyticsResultCategory(result.outcome) : undefined,
    };
    if (href === "/payments-and-apps") {
      trackVisaEvent("visa_to_payment_hub_clicked", baseParams);
    } else if (href.includes("/guides/")) {
      trackVisaEvent("visa_guide_clicked", baseParams);
    } else if (href.startsWith("tel:")) {
      trackVisaEvent("visa_12367_clicked", baseParams);
    } else if (href.includes("documents-checklist")) {
      trackVisaEvent("visa_checklist_saved", baseParams);
    } else if (href.startsWith("http")) {
      trackVisaEvent("visa_policy_source_clicked", baseParams);
    }
  }

  const selectedPort = draft.entryPortId ? portsById.get(draft.entryPortId) : undefined;
  const selectedExitPort = draft.exitPortId ? portsById.get(draft.exitPortId) : undefined;
  const currentStep = steps[step - 1];

  if (result) {
    const content = outcomeContent[result.outcome];
    const OutcomeIcon = content.icon;
    const ReasonIcon =
      result.outcome === "not-eligible-from-answers"
        ? CircleX
        : result.outcome === "manual-review"
          ? CircleHelp
          : Check;
    const reasonIconClassName =
      result.outcome === "not-eligible-from-answers"
        ? "text-ember"
        : result.outcome === "manual-review"
          ? "text-amber-800"
          : "text-jade";

    return (
      <div
        data-testid="transit-eligibility-checker"
        data-outcome={result.outcome}
        className="border-y border-ink/14 bg-paper py-7 sm:px-2 sm:py-10"
      >
        <div className={`border-l-4 px-5 py-6 sm:px-8 ${content.accentClassName}`}>
          <OutcomeIcon aria-hidden="true" size={34} strokeWidth={1.8} />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em]">{content.eyebrow}</p>
          <h3
            ref={resultHeadingRef}
            tabIndex={-1}
            className="mt-2 max-w-3xl font-editorial text-3xl leading-tight text-ink outline-none sm:text-4xl"
          >
            {content.title}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70">{content.summary}</p>
        </div>

        <div className="grid gap-8 px-5 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.55fr)]">
          <div>
            <h4 className="font-editorial text-2xl text-ink">Why this result appeared</h4>
            <ul className="mt-4 grid gap-3">
              {result.reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-sm leading-relaxed text-ink/76">
                  <ReasonIcon
                    aria-hidden="true"
                    className={`mt-0.5 shrink-0 ${reasonIconClassName}`}
                    size={18}
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border-t border-ink/14 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-ink/55">
              Important limits
            </h4>
            <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-ink/68">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-ink/52">
              Policy version {result.policyVersion} · Last checked {formatPolicyDate(result.lastVerifiedAt)}
            </p>
          </aside>
        </div>

        <div className="mt-8 border-t border-ink/14 px-5 pt-7 sm:px-8">
          <h4 className="font-editorial text-2xl text-ink">Safe next actions</h4>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {result.nextActions.map((action, index) => {
              const external = action.href.startsWith("http") || action.href.startsWith("tel:");
              const className =
                index === 0
                  ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
                  : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/22 bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2";

              if (external) {
                return (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => trackResultAction(action.href)}
                    className={className}
                  >
                    {action.label}
                    {action.href.startsWith("http") ? <ExternalLink aria-hidden="true" size={16} /> : null}
                  </a>
                );
              }

              return (
                <Link
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  onClick={() => trackResultAction(action.href)}
                  className={className}
                >
                  {action.label}
                  <ChevronRight aria-hidden="true" size={16} />
                </Link>
              );
            })}
          </div>
          <Button variant="secondary" onClick={restart} className="mt-6 w-full sm:w-auto">
            <RotateCcw aria-hidden="true" size={17} />
            Check another route
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="transit-eligibility-checker"
      className="border-y border-ink/14 bg-paper py-7 sm:px-2 sm:py-10"
    >
      <div className="px-5 sm:px-8">
        <div
          className="mb-6 border-l-2 border-jade bg-mist px-4 py-3 text-sm leading-relaxed text-ink/70"
          data-policy-context={policyContext}
        >
          {contextPrompts[policyContext]}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ember">
              Route checker · Step {step} of 5
            </p>
            <h3
              ref={formTopRef}
              tabIndex={-1}
              className="mt-2 font-editorial text-3xl text-ink outline-none sm:text-4xl"
            >
              {currentStep.title}
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/58">
            No names, passport numbers, ticket numbers, dates of birth, email addresses, or contact details are requested or stored.
          </p>
        </div>

        <ol aria-label="Eligibility checker progress" className="mt-7 grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((item) => {
            const complete = item.number < step;
            const current = item.number === step;
            return (
              <li key={item.number} aria-current={current ? "step" : undefined}>
                <div
                  className={`h-1.5 rounded-full ${
                    complete || current ? "bg-jade" : "bg-ink/12"
                  }`}
                  aria-hidden="true"
                />
                <span className={`mt-2 hidden text-xs sm:block ${current ? "font-bold text-ink" : "text-ink/48"}`}>
                  {item.shortLabel}
                </span>
                <span className="sr-only">
                  Step {item.number}: {item.shortLabel}{complete ? ", completed" : current ? ", current" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          completeStep();
        }}
        className="mt-8 border-t border-ink/12 px-5 pt-8 sm:px-8"
      >
        {step === 1 ? (
          <div data-testid="checker-step-1" className="grid gap-7">
            <label htmlFor="visa-nationality" className="grid gap-2 text-sm font-semibold text-ink">
              Passport nationality
              <select
                id="visa-nationality"
                value={draft.nationalityIso2}
                onChange={(event) => updateDraft("nationalityIso2", event.target.value)}
                aria-invalid={Boolean(errors.nationalityIso2)}
                aria-describedby={errors.nationalityIso2 ? "visa-nationality-error" : "visa-nationality-help"}
                className={inputClassName}
              >
                <option value="">Select a country or region</option>
                {COUNTRY_REGION_OPTIONS.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <span id="visa-nationality-help" className="font-normal text-ink/55">
                Use the country or region printed as nationality on the travel document.
              </span>
              {errors.nationalityIso2 ? (
                <span id="visa-nationality-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.nationalityIso2}
                </span>
              ) : null}
            </label>

            <RadioChoices
              legend="What type of passport or travel document will you use?"
              name="visa-passport-type"
              value={draft.passportType}
              error={errors.passportType}
              onChange={(value) => updateDraft("passportType", value)}
              options={[
                { value: "ordinary", label: "Ordinary passport" },
                { value: "diplomatic", label: "Diplomatic passport" },
                { value: "service", label: "Service passport" },
                { value: "other", label: "Other travel document" },
                { value: "unknown", label: "Not sure" },
              ]}
            />

            <RadioChoices
              legend="How much passport validity will remain on entry?"
              name="visa-passport-validity"
              value={draft.passportValidity}
              error={errors.passportValidity}
              onChange={(value) => updateDraft("passportValidity", value)}
              options={[
                { value: "under-3-months", label: "Less than 3 months" },
                { value: "3-to-6-months", label: "3–6 months" },
                { value: "over-6-months", label: "More than 6 months" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div data-testid="checker-step-2" className="grid gap-7">
            <div className="border-l-2 border-jade bg-mist px-4 py-3 text-sm leading-relaxed text-ink/72">
              Use the place shown on the flight, train, ship, or ferry segment immediately before and after mainland China—not the first origin or final home destination of the whole trip.
            </div>
            <label htmlFor="visa-immediate-origin" className="grid gap-2 text-sm font-semibold text-ink">
              Where will you arrive from immediately before entering mainland China?
              <input
                id="visa-immediate-origin"
                list="visa-country-region-options"
                value={draft.immediateOriginRegionId}
                onChange={(event) => updateDraft("immediateOriginRegionId", event.target.value)}
                placeholder="Country or region, for example Japan"
                autoComplete="off"
                aria-invalid={Boolean(errors.immediateOriginRegionId)}
                aria-describedby={errors.immediateOriginRegionId ? "visa-immediate-origin-error" : undefined}
                className={inputClassName}
              />
              {errors.immediateOriginRegionId ? (
                <span id="visa-immediate-origin-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.immediateOriginRegionId}
                </span>
              ) : null}
            </label>
            <label htmlFor="visa-immediate-onward" className="grid gap-2 text-sm font-semibold text-ink">
              Where will you travel immediately after leaving mainland China?
              <input
                id="visa-immediate-onward"
                list="visa-country-region-options"
                value={draft.immediateOnwardRegionId}
                onChange={(event) => updateDraft("immediateOnwardRegionId", event.target.value)}
                placeholder="Country or region, for example Singapore"
                autoComplete="off"
                aria-invalid={Boolean(errors.immediateOnwardRegionId)}
                aria-describedby={errors.immediateOnwardRegionId ? "visa-immediate-onward-error" : undefined}
                className={inputClassName}
              />
              {errors.immediateOnwardRegionId ? (
                <span id="visa-immediate-onward-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.immediateOnwardRegionId}
                </span>
              ) : null}
            </label>
            <datalist id="visa-country-region-options">
              {COUNTRY_REGION_OPTIONS.map((country) => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
            <RadioChoices
              legend="Will this itinerary enter mainland China more than once?"
              name="visa-multiple-mainland-entries"
              value={draft.multipleMainlandEntries}
              error={errors.multipleMainlandEntries}
              onChange={(value) => updateDraft("multipleMainlandEntries", value)}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div data-testid="checker-step-3" className="grid gap-7">
            <RadioChoices
              legend="Do you hold onward travel with a confirmed date and seat or confirmed itinerary?"
              name="visa-onward-ticket"
              value={draft.onwardTicketConfirmed}
              error={errors.onwardTicketConfirmed}
              onChange={(value) => updateDraft("onwardTicketConfirmed", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
            <RadioChoices
              legend="Is the confirmed departure scheduled within the 240-hour policy window?"
              name="visa-onward-window"
              value={draft.onwardWithin240Hours}
              error={errors.onwardWithin240Hours}
              onChange={(value) => updateDraft("onwardWithin240Hours", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
            <label htmlFor="visa-planned-stay-hours" className="grid gap-2 text-sm font-semibold text-ink">
              Approximate time between entry and departure, in hours
              <input
                id="visa-planned-stay-hours"
                type="number"
                inputMode="decimal"
                min="0.5"
                step="0.5"
                value={draft.plannedStayHours}
                onChange={(event) => updateDraft("plannedStayHours", event.target.value)}
                placeholder="For example, 96"
                aria-invalid={Boolean(errors.plannedStayHours)}
                aria-describedby={errors.plannedStayHours ? "visa-planned-stay-hours-error" : "visa-planned-stay-hours-help"}
                className={inputClassName}
              />
              <span id="visa-planned-stay-hours-help" className="font-normal text-ink/55">
                This rough duration stays in the browser only and is not sent to analytics.
              </span>
              {errors.plannedStayHours ? (
                <span id="visa-planned-stay-hours-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.plannedStayHours}
                </span>
              ) : null}
            </label>
            <RadioChoices
              legend="Which description best matches the operating journey?"
              name="visa-journey-type"
              value={draft.journeyType}
              error={errors.journeyType}
              onChange={(value) => updateDraft("journeyType", value)}
              options={[
                {
                  value: "connecting",
                  label: "Connection or transfer",
                  detail: "Changing service, re-checking in, or transferring to another transport segment.",
                },
                {
                  value: "through-flight",
                  label: "Same through flight",
                  detail: "The same flight number continues, with the stop or disembarkation rules unclear.",
                },
                {
                  value: "technical-stop",
                  label: "Technical stop",
                  detail: "An operational stop that may change how the immediate segments are assessed.",
                },
                { value: "unknown", label: "Not sure" },
              ]}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div data-testid="checker-step-4" className="grid gap-6">
            <div className="border-l-2 border-jade bg-mist px-4 py-3 text-sm leading-relaxed text-ink/72">
              Only ports in the current {TRANSIT_PORTS.length}-port dataset are available. An international airport is not automatically an eligible port.
            </div>
            <label htmlFor="visa-entry-port-search" className="grid gap-2 text-sm font-semibold text-ink">
              Search by city, airport code, port name, or transport type
              <span className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 text-ink/42" size={18} />
                <input
                  id="visa-entry-port-search"
                  type="search"
                  value={portQuery}
                  onChange={(event) => {
                    const query = event.target.value;
                    setPortQuery(query);
                    if (draft.entryPortId) updateDraft("entryPortId", null);
                    else markStarted();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (filteredPorts.length === 1) {
                        const port = filteredPorts[0];
                        updateDraft("entryPortId", port.id);
                        setPortQuery(port.officialEnglishName);
                      }
                    }
                  }}
                  placeholder="For example, Shanghai, PVG, rail, or ferry"
                  autoComplete="off"
                  aria-controls="visa-entry-port"
                  className={`${inputClassName} pl-10`}
                />
              </span>
            </label>
            <label htmlFor="visa-entry-port" className="grid gap-2 text-sm font-semibold text-ink">
              Official entry port
              <select
                id="visa-entry-port"
                value={draft.entryPortId || ""}
                onChange={(event) => {
                  const value = event.target.value || null;
                  updateDraft("entryPortId", value);
                  if (value) setPortQuery(portsById.get(value)?.officialEnglishName || "");
                }}
                aria-invalid={Boolean(errors.entryPortId)}
                aria-describedby={errors.entryPortId ? "visa-entry-port-error" : "visa-entry-port-help"}
                className={inputClassName}
              >
                <option value="">
                  {filteredPorts.length > 0
                    ? `Select from ${filteredPorts.length} matching port${filteredPorts.length === 1 ? "" : "s"}`
                    : "No matching official ports"}
                </option>
                {filteredPorts.map((port) => (
                  <option key={port.id} value={port.id}>
                    {port.officialEnglishName}
                    {port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id]
                      ? ` · ${port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id]}`
                      : ""}
                    {` — ${port.city}, ${port.provinceLevelRegion} (${port.mode})`}
                  </option>
                ))}
              </select>
              <span id="visa-entry-port-help" className="font-normal text-ink/55">
                Airport, seaport, rail, road, and ferry terminals are labelled by transport type.
              </span>
              {errors.entryPortId ? (
                <span id="visa-entry-port-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.entryPortId}
                </span>
              ) : null}
            </label>
            {selectedPort ? (
              <div role="status" className="border border-jade/22 bg-mist px-4 py-4 text-sm leading-relaxed text-ink/72">
                <p className="font-semibold text-jade">Selected: {selectedPort.officialEnglishName}</p>
                <p className="mt-1">
                  {selectedPort.city}, {selectedPort.provinceLevelRegion} · {selectedPort.mode}
                  {selectedPort.iataCode || TRANSIT_PORT_SEARCH_CODES[selectedPort.id]
                    ? ` · ${selectedPort.iataCode || TRANSIT_PORT_SEARCH_CODES[selectedPort.id]}`
                    : ""}
                </p>
              </div>
            ) : null}
            <label htmlFor="visa-exit-port" className="grid gap-2 text-sm font-semibold text-ink">
              Expected exit port (optional)
              <select
                id="visa-exit-port"
                value={draft.exitPortId || ""}
                onChange={(event) => updateDraft("exitPortId", event.target.value || null)}
                className={inputClassName}
              >
                <option value="">Not selected — confirm later</option>
                {TRANSIT_PORTS.filter((port) => port.canExit).map((port) => (
                  <option key={port.id} value={port.id}>
                    {port.officialEnglishName}
                    {port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id]
                      ? ` · ${port.iataCode || TRANSIT_PORT_SEARCH_CODES[port.id]}`
                      : ""}
                    {` — ${port.city}, ${port.provinceLevelRegion} (${port.mode})`}
                  </option>
                ))}
              </select>
              <span className="font-normal text-ink/55">
                This can differ from the entry port when the exact route and permitted-area rules allow it.
              </span>
            </label>
            {selectedExitPort ? (
              <p className="text-sm leading-relaxed text-ink/62">
                Expected exit: <strong className="text-ink">{selectedExitPort.officialEnglishName}</strong>
              </p>
            ) : null}
          </div>
        ) : null}

        {step === 5 ? (
          <div data-testid="checker-step-5" className="grid gap-7">
            <label htmlFor="visa-planned-stay-area" className="grid gap-2 text-sm font-semibold text-ink">
              Main planned stay area
              <select
                id="visa-planned-stay-area"
                value={draft.plannedStayAreaGroupId}
                onChange={(event) => updateDraft("plannedStayAreaGroupId", event.target.value)}
                aria-invalid={Boolean(errors.plannedStayAreaGroupId)}
                aria-describedby={
                  errors.plannedStayAreaGroupId
                    ? "visa-planned-stay-area-error"
                    : "visa-planned-stay-area-help"
                }
                className={inputClassName}
              >
                <option value="">Select the main area</option>
                {PERMITTED_STAY_AREA_GROUPS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.displayName}
                  </option>
                ))}
                <option value="unclear-or-multiple">Multiple areas or not sure</option>
              </select>
              <span id="visa-planned-stay-area-help" className="font-normal text-ink/55">
                Select the main published area, then confirm every stop against the area linked to the approved route.
              </span>
              {errors.plannedStayAreaGroupId ? (
                <span id="visa-planned-stay-area-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.plannedStayAreaGroupId}
                </span>
              ) : null}
            </label>
            <RadioChoices
              legend="Will the whole stay remain within the permitted area linked to this entry route?"
              name="visa-permitted-area"
              value={draft.stayingWithinPermittedArea}
              error={errors.stayingWithinPermittedArea}
              onChange={(value) => updateDraft("stayingWithinPermittedArea", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
            <RadioChoices
              legend="Does an individual visa, entry, immigration, document, or legal circumstance need manual confirmation?"
              name="visa-individual-review"
              value={draft.manualReviewRequested}
              error={errors.manualReviewRequested}
              onChange={(value) => updateDraft("manualReviewRequested", value)}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes — confirm privately" },
                { value: "unknown", label: "Not sure" },
              ]}
            />
            <label htmlFor="visa-purpose" className="grid gap-2 text-sm font-semibold text-ink">
              Main purpose during the stay
              <select
                id="visa-purpose"
                value={draft.purpose}
                onChange={(event) => updateDraft("purpose", event.target.value as Purpose | "")}
                aria-invalid={Boolean(errors.purpose)}
                aria-describedby={errors.purpose ? "visa-purpose-error" : "visa-purpose-help"}
                className={inputClassName}
              >
                <option value="">Select one purpose</option>
                <option value="tourism">Tourism</option>
                <option value="business">Business</option>
                <option value="visit">Visit</option>
                <option value="family">Visit family</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="journalism">News reporting or journalism</option>
                <option value="other">Other or not sure</option>
              </select>
              <span id="visa-purpose-help" className="font-normal text-ink/55">
                Work, study, and news reporting require a different permission route.
              </span>
              {errors.purpose ? (
                <span id="visa-purpose-error" role="alert" className="text-sm font-semibold text-ember">
                  {errors.purpose}
                </span>
              ) : null}
            </label>
            <div className="border border-ink/14 bg-sand p-4 text-sm leading-relaxed text-ink/66">
              This checker offers cautious planning guidance from policy data version {VISA_POLICY_META.policyVersion}. The final decision is made by immigration inspection officers at the port of entry.
            </div>
          </div>
        ) : null}

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            onClick={goBack}
            disabled={step === 1}
            className="w-full sm:w-auto"
          >
            <ChevronLeft aria-hidden="true" size={18} />
            Back
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            {step === 5 ? "Check this route" : "Continue"}
            <ChevronRight aria-hidden="true" size={18} />
          </Button>
        </div>
      </form>

      <div className="mx-5 mt-7 border-t border-ink/10 pt-5 text-xs leading-relaxed text-ink/50 sm:mx-8">
        Current policy dataset: {TRANSIT_ELIGIBLE_COUNTRIES.length} transit nationalities, {TRANSIT_PORTS.length} eligible ports, and a separately maintained 30-day visa-free list ({UNILATERAL_VISA_FREE_COUNTRIES.length} country records). Last policy check: {formatPolicyDate(VISA_POLICY_META.lastVerifiedAt)}.
      </div>
    </div>
  );
}
