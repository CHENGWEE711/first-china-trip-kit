"use client";

import Link from "next/link";
import { type FormEvent, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleAlert, Download, Mail, ShieldCheck } from "lucide-react";
import {
  arrivalReadinessQuestions,
  getArrivalReadinessResult,
  type ReadinessRisk,
} from "@/lib/arrival-readiness";
import { trackEvent } from "@/lib/analytics";
import { captureUtmAttribution } from "@/lib/utm";
import { postWithTimeout } from "@/lib/client-request";

type FormStatus = "idle" | "loading" | "success" | "error";

const riskPresentation: Record<ReadinessRisk, { title: string; className: string; Icon: typeof AlertTriangle }> = {
  red: { title: "Resolve before you travel", className: "border-ember/35 bg-[#f9e7e3]", Icon: AlertTriangle },
  yellow: { title: "Plan before departure", className: "border-[#c8972c]/40 bg-[#fff7df]", Icon: CircleAlert },
  green: { title: "Already prepared", className: "border-jade/35 bg-mist", Icon: CheckCircle2 },
};

function resultLabel(score: number) {
  if (score >= 85) return "You have a strong arrival plan.";
  if (score >= 60) return "Your arrival plan is taking shape.";
  return "Focus on the red items before departure.";
}

export function ArrivalReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<FormStatus>("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const hasTrackedStart = useRef(false);
  const hasTrackedCompletion = useRef(false);
  const complete = Object.keys(answers).length === arrivalReadinessQuestions.length;
  const result = useMemo(() => getArrivalReadinessResult(answers), [answers]);
  const bundleModules = useMemo(() => {
    const missing = new Set(result.todos.map((item) => item.id));
    const modules: string[] = [];
    if (missing.has("primary-payment") || missing.has("payment-backup")) modules.push("Payment & Apps Setup Guide plus the payment decision tree");
    if (missing.has("data-plan") || missing.has("arrival-apps") || missing.has("arrival-power")) modules.push("internet setup plan plus the No Mobile Internet flowchart");
    if (missing.has("hotel-address")) modules.push("Mobile Address Card plus the fillable Arrival Sheet");
    if (missing.has("airport-transfer") || missing.has("train-details")) modules.push("airport-or-station-to-hotel setup plus the station confusion flowchart");
    if (missing.has("first-day-test") || missing.has("emergency-plan")) modules.push("first-24-hours timeline plus offline quick cards");
    return modules;
  }, [result.todos]);

  function setAnswer(questionId: string, value: boolean) {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("readiness_checker_started", {
        source_page: "/tools/china-arrival-readiness-checker",
        question_count: arrivalReadinessQuestions.length,
      });
    }

    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);

    if (Object.keys(nextAnswers).length === arrivalReadinessQuestions.length && !hasTrackedCompletion.current) {
      hasTrackedCompletion.current = true;
      const completed = getArrivalReadinessResult(nextAnswers);
      trackEvent("readiness_checker_completed", {
        source_page: "/tools/china-arrival-readiness-checker",
        score: completed.score,
        result_status: completed.status,
        unresolved_count: completed.todos.length,
      });
    }
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailStatus("error");
      setEmailMessage("Enter a valid email address to receive optional travel updates.");
      return;
    }

    setEmailStatus("loading");
    setEmailMessage("");
    const attribution = captureUtmAttribution();
    try {
      const response = await postWithTimeout("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          source_page: "/tools/china-arrival-readiness-checker",
          landing_page: "/tools/china-arrival-readiness-checker",
          placement: "readiness-result-email",
          lead_source: "readiness_checker",
          lead_magnet: "China Arrival Readiness Result + PDF Checklist",
          readiness_score: result.score,
          readiness_risk_level: result.status,
          ...attribution,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setEmailStatus("error");
        setEmailMessage(data.message || "We could not save your email. Please try again.");
        return;
      }
      setEmailStatus("success");
      setEmailMessage("Your arrival checklist remains on this page. Download your PDF checklist now. Optional travel updates may be sent when available.");
      trackEvent("readiness_result_email_submitted", {
        source_page: "/tools/china-arrival-readiness-checker",
        score: result.score,
        result_status: result.status,
        unresolved_count: result.todos.length,
      });
    } catch {
      setEmailStatus("error");
      setEmailMessage("We could not reach the email service. Please try again shortly.");
    }
  }

  return (
    <div data-testid="arrival-readiness-checker" className="grid gap-8">
      <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft md:p-7">
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-ink">Answer 12 arrival-plan checks</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/68">
              Select the option that is true today. The checker keeps answers in this page only and never asks for passport numbers, card numbers or other sensitive details.
            </p>
          </div>
          <p className="shrink-0 rounded-md bg-sand px-3 py-2 text-sm font-bold text-ink/65">
            {Object.keys(answers).length} of {arrivalReadinessQuestions.length} answered
          </p>
        </div>

        <fieldset className="mt-6 grid gap-4">
          <legend className="sr-only">China arrival readiness questions</legend>
          {arrivalReadinessQuestions.map((question, index) => {
            const answer = answers[question.id];
            return (
              <div key={question.id} className="rounded-lg border border-ink/10 bg-sand/60 p-4 md:p-5">
                <div className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white" aria-hidden="true">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-ember">{question.category}</p>
                    <p className="mt-1 text-base font-bold leading-relaxed text-ink">{question.question}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/62">{question.help}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        aria-pressed={answer === true}
                        onClick={() => setAnswer(question.id, true)}
                        className={`min-h-11 rounded-md border px-4 py-2 text-left text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${answer === true ? "border-jade bg-jade text-white" : "border-ink/15 bg-paper text-ink hover:border-jade"}`}
                      >
                        Yes, this is ready
                      </button>
                      <button
                        type="button"
                        aria-pressed={answer === false}
                        onClick={() => setAnswer(question.id, false)}
                        className={`min-h-11 rounded-md border px-4 py-2 text-left text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${answer === false ? "border-ember bg-ember text-white" : "border-ink/15 bg-paper text-ink hover:border-ember"}`}
                      >
                        Not ready yet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </fieldset>
      </section>

      {complete ? (
        <section aria-live="polite" data-testid="arrival-readiness-result" className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft md:p-7">
          <div className="grid gap-6 border-b border-ink/10 pb-6 md:grid-cols-[180px_1fr] md:items-center">
            <div className="grid aspect-square max-w-[180px] place-items-center rounded-full border-8 border-jade/30 bg-mist text-center">
              <p className="text-5xl font-bold leading-none text-jade">{result.score}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-ink/58">out of 100</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-ember">Your basic result</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">{resultLabel(result.score)}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/68">
                {result.completedCount} of {result.totalCount} preparation checks are ready. Your next tasks are based only on the choices above; this is planning guidance, not an immigration, payment or transport guarantee.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {(["red", "yellow", "green"] as ReadinessRisk[]).map((risk) => {
              const presentation = riskPresentation[risk];
              const Icon = presentation.Icon;
              const items = risk === "green" ? result.risks.green.slice(0, 3) : result.risks[risk];
              if (items.length === 0) return null;
              return (
                <section key={risk} className={`rounded-lg border p-4 ${presentation.className}`}>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-ink"><Icon aria-hidden="true" size={20} />{presentation.title}</h3>
                  <ul className="mt-3 grid gap-3">
                    {items.map((item) => (
                      <li key={item.id} className="border-l-2 border-current/30 pl-3 text-sm leading-relaxed text-ink/76">
                        <span className="font-semibold text-ink">{item.question}</span>
                        {risk !== "green" ? <Link href={item.guide.href} className="mt-1 block font-semibold text-ember underline underline-offset-4 hover:text-ember-hover">{item.guide.label}</Link> : null}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {bundleModules.length > 0 ? (
            <section className="mt-6 rounded-lg border border-jade/30 bg-mist p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-jade">Targeted Bundle modules</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-ink">Your result shows gaps the Bundle is built to close.</h3>
              <p className="mt-2 text-base leading-relaxed text-ink/68">The $19 Bundle includes the complete $7 Payment &amp; Apps Guide plus the offline tools for these areas. It is a planning aid, not a payment, entry or transport guarantee.</p>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-ink/74">
                {bundleModules.map((module) => <li key={module} className="border-l-2 border-jade/45 pl-3">{module}</li>)}
              </ul>
              <Link href="/products/china-arrival-setup-bundle" className="mt-5 inline-flex min-h-11 items-center font-semibold text-ember underline underline-offset-4 hover:text-ember-hover">Explore the Arrival Setup Bundle</Link>
            </section>
          ) : null}

          <section className="mt-6 rounded-lg bg-ink p-5 text-white">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-mist"><Mail aria-hidden="true" size={18} />Save your result for optional travel updates</p>
                <h3 className="mt-2 text-2xl font-bold leading-tight">Download your complete checklist and keep your result</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/72">Your full result stays on this page. Save your email for optional China travel updates when they are available, then download a PDF copy below. We only send your email and attribution to the mailing service, never your answers.</p>
              </div>
              <ShieldCheck aria-hidden="true" className="hidden text-mist md:block" size={48} />
            </div>
            <form onSubmit={submitEmail} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="arrival-readiness-email">Email address</label>
              <input id="arrival-readiness-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} autoComplete="email" placeholder="you@example.com" className="min-h-11 rounded-md border border-white/20 bg-white px-4 text-base text-ink outline-none focus:border-mist" disabled={emailStatus === "loading" || emailStatus === "success"} />
              <button type="submit" disabled={emailStatus === "loading" || emailStatus === "success"} className="min-h-11 rounded-md bg-ember px-5 py-3 text-base font-bold text-white transition hover:bg-ember-hover disabled:cursor-not-allowed disabled:opacity-60">
                {emailStatus === "loading" ? "Saving..." : emailStatus === "success" ? "Checklist unlocked" : "Save my email"}
              </button>
            </form>
            {emailMessage ? <p role={emailStatus === "error" ? "alert" : "status"} className={`mt-3 text-sm ${emailStatus === "error" ? "text-[#ffb3aa]" : "text-mist"}`}>{emailMessage}</p> : null}
            {emailStatus === "success" ? (
              <a href="/china-first-time-visitor-checklist.pdf" download className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/25 px-4 py-2 text-base font-semibold text-white hover:bg-white/10"><Download aria-hidden="true" size={18} />Download the free PDF checklist</a>
            ) : null}
          </section>
        </section>
      ) : null}
    </div>
  );
}
