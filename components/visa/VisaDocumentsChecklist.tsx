"use client";

import { Check, Clipboard, Download, Printer, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VISA_POLICY_META } from "@/data/visa";
import { trackVisaEvent } from "@/lib/visa/analytics";

const STORAGE_KEY = "first-china-trip-kit-visa-documents-v1";

const checklistItems = [
  { id: "travel-document", label: "Valid passport or international travel document", required: true },
  { id: "validity", label: "At least three months of passport validity", required: true },
  { id: "onward-ticket", label: "Confirmed onward ticket within 240 hours", required: true },
  { id: "onward-entry", label: "Proof that you can enter the onward destination", required: true },
  { id: "accommodation", label: "Accommodation details", required: true },
  { id: "permitted-area", label: "Permitted-area plan linked to the selected entry port", required: true },
  { id: "arrival-card", label: "Arrival Card information, if required", required: true },
  { id: "official-policy", label: "Official policy screenshot or saved source link", required: false },
  { id: "backup-visa-plan", label: "Backup visa plan when the route remains uncertain", required: false },
  { id: "offline-itinerary", label: "Printed or offline copies of the itinerary", required: false },
  { id: "insurance", label: "Travel insurance details", required: false, note: "Recommended for trip resilience; not listed as a 240-hour policy condition." },
  { id: "payments", label: "China payment and essential app setup", required: false },
] as const;

export function VisaDocumentsChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as { version?: number; checkedIds?: string[] };
      if (parsed.version === 1 && Array.isArray(parsed.checkedIds)) {
        const validIds = new Set<string>(checklistItems.map((item) => item.id));
        const restoredIds = parsed.checkedIds.filter((id) => validIds.has(id));
        window.requestAnimationFrame(() => {
          if (!cancelled) setCheckedIds(restoredIds);
        });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const progress = Math.round((checkedIds.length / checklistItems.length) * 100);

  function toggle(id: string, selected: boolean) {
    setCheckedIds((current) =>
      selected ? [...current, id] : current.filter((candidate) => candidate !== id),
    );
    setStatus("");
  }

  function saveLocally() {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, checkedIds }),
    );
    setStatus("Checklist saved on this device.");
    trackVisaEvent("visa_checklist_saved", {
      interaction_type: "save",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }

  async function copyChecklist() {
    const text = checklistItems
      .map((item) => `${checkedIds.includes(item.id) ? "✓" : "□"} ${item.label}`)
      .join("\n");
    try {
      await window.navigator.clipboard.writeText(text);
      setStatus("Checklist copied.");
      trackVisaEvent("visa_checklist_saved", {
        interaction_type: "copy",
        policy_version: VISA_POLICY_META.policyVersion,
      });
    } catch {
      setStatus("Copy was unavailable. Select and copy the checklist manually.");
    }
  }

  function printChecklist() {
    trackVisaEvent("visa_checklist_saved", {
      interaction_type: "print",
      policy_version: VISA_POLICY_META.policyVersion,
    });
    window.print();
  }

  return (
    <div data-testid="visa-documents-checklist">
      <div className="flex flex-col gap-3 border-b border-ink/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ember">{checkedIds.length} of {checklistItems.length} prepared</p>
          <p className="mt-1 text-3xl text-ink">{progress}% complete</p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10 sm:max-w-xs" aria-hidden="true">
          <div className="h-full rounded-full bg-jade transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <fieldset className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
        <legend className="sr-only">Transit document preparation checklist</legend>
        {checklistItems.map((item) => (
          <label
            key={item.id}
            htmlFor={`visa-document-${item.id}`}
            className="flex min-h-14 cursor-pointer items-start gap-3 border-b border-ink/10 py-3 text-ink focus-within:ring-2 focus-within:ring-ember focus-within:ring-offset-2"
          >
            <input
              id={`visa-document-${item.id}`}
              type="checkbox"
              checked={checkedIds.includes(item.id)}
              onChange={(event) => toggle(item.id, event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-ember"
            />
            <span>
              <span className="font-semibold leading-snug">{item.label}</span>
              <span className="ml-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink/48">
                {item.required ? "Policy/document check" : "Travel backup"}
              </span>
              {"note" in item ? (
                <span className="mt-1 block text-sm leading-relaxed text-ink/62">{item.note}</span>
              ) : null}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button type="button" onClick={saveLocally} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ember px-4 py-2 text-sm font-semibold text-white hover:bg-ember-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
          <Save aria-hidden="true" size={17} /> Save locally
        </button>
        <button type="button" onClick={copyChecklist} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
          <Clipboard aria-hidden="true" size={17} /> Copy
        </button>
        <button type="button" onClick={printChecklist} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
          <Printer aria-hidden="true" size={17} /> Print
        </button>
        <Link href="/china-first-time-visitor-checklist.pdf" download className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2" onClick={() => trackVisaEvent("visa_checklist_saved", { interaction_type: "download", policy_version: VISA_POLICY_META.policyVersion })}>
          <Download aria-hidden="true" size={17} /> Download the free checklist
        </Link>
      </div>

      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold text-jade">
        {status ? <><Check aria-hidden="true" className="mr-1 inline" size={16} />{status}</> : null}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink/52">
        Local save stores checklist item IDs on this device only. It does not store passport, route or ticket details.
      </p>
    </div>
  );
}
