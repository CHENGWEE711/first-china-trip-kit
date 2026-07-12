"use client";

import Image from "next/image";
import { Check, Copy, Download, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const shareUrl = "https://www.firstchinatripkit.com/store";
const shareImageUrl = "/share/china-first-trip-checklist-share-card.png";
const shareImageName = "first-china-trip-checklist-share-card.png";
const shareText =
  "Get the free China First-Trip Visitor Checklist for payment, apps, internet, transport, hotel addresses, and emergency phrases.";

type Status = "idle" | "copied" | "shared" | "error";

export function ChecklistShareCard() {
  const [status, setStatus] = useState<Status>("idle");

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("copied");
      trackEvent("checklist_share_link_copied", { source: "thank-you" });
    } catch {
      setStatus("error");
    }
  }

  async function shareChecklist() {
    try {
      if (!navigator.share) {
        await copyShareLink();
        return;
      }

      const response = await fetch(shareImageUrl);
      const blob = await response.blob();
      const file = new File([blob], shareImageName, { type: "image/png" });
      const canShareFile = navigator.canShare?.({ files: [file] });

      if (canShareFile) {
        await navigator.share({
          files: [file],
          title: "Free China First-Trip Visitor Checklist",
          text: `${shareText} ${shareUrl}`,
        });
      } else {
        await navigator.share({
          title: "Free China First-Trip Visitor Checklist",
          text: shareText,
          url: shareUrl,
        });
      }

      setStatus("shared");
      trackEvent("checklist_share_clicked", {
        source: "thank-you",
        shared_image: Boolean(canShareFile),
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setStatus("error");
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  return (
    <section className="bg-paper px-4 py-12">
      <div className="mx-auto grid max-w-5xl gap-7 rounded-lg border border-ink/10 bg-sand p-5 shadow-soft md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-7">
        <a
          href={shareImageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border border-ink/10 bg-paper focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
          aria-label="Open the China First-Trip Visitor Checklist share card"
        >
          <Image
            src={shareImageUrl}
            alt="Share card for the free China First-Trip Visitor Checklist with a QR code and firstchinatripkit.com website address"
            width={1080}
            height={1350}
            className="h-auto w-full"
            sizes="(max-width: 767px) calc(100vw - 72px), 360px"
          />
        </a>

        <div className="min-w-0 self-center">
          <p className="text-sm font-bold uppercase text-ember">Share the free checklist</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">
            Help another first-time visitor prepare
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/68">
            Send this ready-made card to a friend or travel group. It includes the
            official website address and a QR code that opens the free checklist page.
          </p>
          <p className="mt-3 break-all text-sm font-semibold text-jade">
            www.firstchinatripkit.com/store
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={shareChecklist}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ember px-4 py-3 text-base font-semibold text-white transition hover:bg-ember-hover focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
            >
              <Share2 aria-hidden="true" size={18} />
              Share checklist
            </button>
            <a
              href={shareImageUrl}
              download={shareImageName}
              onClick={() =>
                trackEvent("checklist_share_image_downloaded", { source: "thank-you" })
              }
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-4 py-3 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
            >
              <Download aria-hidden="true" size={18} />
              Download share card
            </a>
            <button
              type="button"
              onClick={copyShareLink}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-ink/12 bg-paper px-4 py-3 text-base font-semibold text-ink transition hover:border-ember/35 hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2"
            >
              {status === "copied" ? (
                <Check aria-hidden="true" size={18} />
              ) : (
                <Copy aria-hidden="true" size={18} />
              )}
              {status === "copied" ? "Link copied" : "Copy link"}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("checklist_share_clicked", {
                  source: "thank-you",
                  channel: "whatsapp",
                })
              }
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-jade/25 bg-paper px-4 py-3 text-base font-semibold text-jade transition hover:border-jade/55 focus:outline-none focus:ring-2 focus:ring-jade focus:ring-offset-2"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Share on WhatsApp
            </a>
          </div>

          <p aria-live="polite" className="mt-3 min-h-6 text-sm text-ink/58">
            {status === "shared" ? "Share options opened." : null}
            {status === "error"
              ? "Sharing is unavailable in this browser. Download the card or copy the link instead."
              : null}
          </p>
        </div>
      </div>
    </section>
  );
}
