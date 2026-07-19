"use client";

import { CalendarClock, Clock3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { VISA_POLICY_META } from "@/data/visa";
import { trackVisaEvent } from "@/lib/visa/analytics";

type Calculation = {
  clockStart: Date;
  deadline: Date;
  departure: Date;
  entry: Date;
  plannedHours: number;
  withinWindow: boolean;
};

function parseChinaDateTime(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour - 8, minute));
}

function policyClockStart(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1, -8, 0));
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Shanghai",
});

export function TransitTimeCalculator() {
  const [entryValue, setEntryValue] = useState("");
  const [departureValue, setDepartureValue] = useState("");
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    const entry = parseChinaDateTime(entryValue);
    const departure = parseChinaDateTime(departureValue);
    const clockStart = policyClockStart(entryValue);

    if (!entry || !departure || !clockStart) {
      setError("Enter both dates and times in China Standard Time.");
      setCalculation(null);
      return;
    }

    if (departure.getTime() <= entry.getTime()) {
      setError("Your planned departure must be after your arrival.");
      setCalculation(null);
      return;
    }

    const deadline = new Date(
      clockStart.getTime() + VISA_POLICY_META.transitDurationHours * 60 * 60 * 1000,
    );
    const plannedHours = (departure.getTime() - entry.getTime()) / (60 * 60 * 1000);

    setError("");
    setCalculation({
      clockStart,
      deadline,
      departure,
      entry,
      plannedHours,
      withinWindow: departure.getTime() <= deadline.getTime(),
    });
    trackVisaEvent("visa_time_calculator_used", {
      interaction_type: "calculate",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }

  return (
    <div className="border border-ink/12 bg-paper p-5 shadow-soft sm:p-7" data-testid="visa-time-calculator">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-mist text-jade">
          <CalendarClock aria-hidden="true" size={22} />
        </span>
        <div>
          <h3 className="text-2xl leading-tight text-ink">Check a theoretical time window</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            Enter both times in China Standard Time (Asia/Shanghai, UTC+8). Nothing is sent or saved.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="visa-entry-time">
          Planned entry date and time
          <input
            id="visa-entry-time"
            type="datetime-local"
            value={entryValue}
            onChange={(event) => setEntryValue(event.target.value)}
            className="min-h-12 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base font-normal text-ink focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="visa-departure-time">
          Planned departure date and time
          <input
            id="visa-departure-time"
            type="datetime-local"
            value={departureValue}
            onChange={(event) => setDepartureValue(event.target.value)}
            className="min-h-12 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base font-normal text-ink focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </label>
      </div>

      {error ? (
        <p id="visa-time-error" role="alert" className="mt-4 text-sm font-semibold text-ember">
          {error}
        </p>
      ) : null}

      <Button className="mt-5 w-full sm:w-auto" onClick={calculate}>
        <Clock3 aria-hidden="true" size={18} />
        Calculate the planning window
      </Button>

      {calculation ? (
        <div className="mt-6 border-t border-ink/12 pt-6" aria-live="polite" data-testid="visa-time-result">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Planning result</p>
          <h4 className="mt-2 text-2xl text-ink">
            {calculation.withinWindow
              ? "Your dates fall inside the theoretical 240-hour window"
              : "Your planned departure falls outside the theoretical window"}
          </h4>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div className="border-l-2 border-ember pl-3">
              <dt className="font-semibold text-ink/58">Entry time</dt>
              <dd className="mt-1 text-base text-ink">{formatter.format(calculation.entry)} CST</dd>
            </div>
            <div className="border-l-2 border-jade pl-3">
              <dt className="font-semibold text-ink/58">Policy clock starts</dt>
              <dd className="mt-1 text-base text-ink">{formatter.format(calculation.clockStart)} CST</dd>
            </div>
            <div className="border-l-2 border-ink/35 pl-3">
              <dt className="font-semibold text-ink/58">Planned time in China</dt>
              <dd className="mt-1 text-base text-ink">{calculation.plannedHours.toFixed(1)} hours</dd>
            </div>
            <div className="border-l-2 border-ink/35 pl-3">
              <dt className="font-semibold text-ink/58">Theoretical window ends</dt>
              <dd className="mt-1 text-base text-ink">{formatter.format(calculation.deadline)} CST</dd>
            </div>
          </dl>
          <p className="mt-5 border border-ink/12 bg-sand p-4 text-sm leading-relaxed text-ink/72">
            Use the departure deadline shown on your temporary entry permit. This calculator does not replace the decision of immigration officers.
          </p>
        </div>
      ) : null}
    </div>
  );
}
