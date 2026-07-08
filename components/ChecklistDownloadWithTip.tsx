"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { PayhipChecklistLink } from "@/components/PayhipChecklistLink";
import { trackEvent } from "@/lib/analytics";

const coffeeTipUrl = process.env.NEXT_PUBLIC_COFFEE_TIP_URL || "";
const payhipChecklistUrl = process.env.NEXT_PUBLIC_PAYHIP_CHECKLIST_URL || "";
const storageKey = "first-china-trip-kit-coffee-tip-last-shown";
const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

type ChecklistDownloadWithTipProps = {
  href?: string;
  label?: string;
  source?: string;
};

export function ChecklistDownloadWithTip({
  href = "/china-first-time-visitor-checklist.pdf",
  label = "Download PDF Checklist",
  source = "thank-you",
}: ChecklistDownloadWithTipProps) {
  const [showTip, setShowTip] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function canShowTip() {
    if (!coffeeTipUrl && !payhipChecklistUrl) {
      return false;
    }

    try {
      const lastShown = Number(window.localStorage.getItem(storageKey) || "0");
      return !lastShown || Date.now() - lastShown > sevenDaysMs;
    } catch {
      return true;
    }
  }

  function markTipShown() {
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // localStorage can be unavailable in private browser contexts.
    }
  }

  function handleDownloadClick() {
    trackEvent("checklist_download_clicked", { source });

    if (!canShowTip()) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      markTipShown();
      setShowTip(true);
      trackEvent("coffee_tip_popup_shown", { source });
    }, 2400);
  }

  function closeTip() {
    markTipShown();
    setShowTip(false);
    trackEvent("coffee_tip_popup_closed", { source });
  }

  const supportMessage =
    coffeeTipUrl && payhipChecklistUrl
      ? "The checklist is free. If it saved you time, you can buy us a coffee or support the guide on Payhip to help keep First China Trip Kit updated."
      : coffeeTipUrl
        ? "The checklist is free. If it saved you time, you can buy us a coffee to help keep First China Trip Kit updated."
        : "The checklist is free. If it saved you time, you can support the guide on Payhip to help keep First China Trip Kit updated.";

  return (
    <>
      <a
        href={href}
        download
        onClick={handleDownloadClick}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 text-base font-semibold text-white transition hover:bg-[#982F28] sm:w-auto"
      >
        <Download aria-hidden="true" size={18} />
        {label}
      </a>

      {showTip && (coffeeTipUrl || payhipChecklistUrl) ? (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg border border-ink/10 bg-paper p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold leading-tight text-ink">Was this guide helpful?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/68">{supportMessage}</p>
            </div>
            <button
              type="button"
              onClick={closeTip}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-ink/10 text-ink/62 transition hover:border-ember/35 hover:text-ember"
              aria-label="Close coffee tip message"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {coffeeTipUrl ? (
              <CoffeeTipLink source={`${source}-popup`} className="w-full sm:w-auto">
                Buy us a coffee
              </CoffeeTipLink>
            ) : null}
            {payhipChecklistUrl ? (
              <PayhipChecklistLink
                source={`${source}-popup`}
                variant="ghost"
                className="w-full sm:w-auto"
              >
                Support on Payhip
              </PayhipChecklistLink>
            ) : null}
            <button
              type="button"
              onClick={closeTip}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-ink/12 bg-paper px-4 py-2 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember sm:w-auto"
            >
              Maybe later
            </button>
          </div>
          <p className="mt-3 text-xs text-ink/50">No pressure. The guide stays free.</p>
        </div>
      ) : null}
    </>
  );
}
