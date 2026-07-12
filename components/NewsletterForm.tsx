"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { captureUtmAttribution } from "@/lib/utm";

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
};

export function NewsletterForm({ source = "site", compact = false }: NewsletterFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const isSubmitting = status === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const attribution = captureUtmAttribution();
    const sourcePage = window.location.pathname;
    const leadMagnet = "China First Trip Checklist";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("idle");
      setMessage("Please enter a valid email address.");
      return;
    }

    formData.set("source_page", sourcePage);
    formData.set("placement", source);
    formData.set("lead_magnet", leadMagnet);
    Object.entries(attribution).forEach(([key, value]) => formData.set(key, value));

    let response: Response;
    let data: { message?: string } = {};

    try {
      response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });
      data = (await response.json()) as { message?: string };
    } catch {
      setStatus("idle");
      setMessage("Newsletter signup is temporarily unavailable.");
      return;
    }

    if (!response.ok) {
      setStatus("idle");
      setMessage(data.message || "Subscription could not be completed.");
      return;
    }

    setStatus("success");
    setMessage(
      data.message ||
        "Thanks! You're subscribed. Your China First Trip Checklist is ready on the next page.",
    );
    trackEvent("newsletter_subscribed", {
      source_page: sourcePage,
      placement: source,
      lead_magnet: leadMagnet,
      ...attribution,
    });
    form.reset();
    window.setTimeout(() => {
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    }, 350);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "grid gap-3" : "grid gap-3 rounded-lg border border-white/15 bg-white/5 p-4 md:p-6"}
    >
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`newsletter-website-${source}`}>Website</label>
        <input
          id={`newsletter-website-${source}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label htmlFor={`newsletter-email-${source}`} className="text-sm font-semibold text-white/84">
        Email address
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id={`newsletter-email-${source}`}
          name="email"
          type="email"
          required
          maxLength={254}
          aria-label="Email address"
          className="min-h-12 rounded-md border border-white/20 bg-surface px-4 text-base text-ink outline-none focus:border-ember focus:ring-2 focus:ring-ember/25"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 rounded-md bg-ember px-5 text-[15px] font-semibold text-white transition hover:bg-ember-hover disabled:cursor-wait disabled:opacity-70"
        >
          {status === "success" ? "Success" : isSubmitting ? "Saving..." : "Get the checklist"}
        </button>
      </div>
      <p className="text-sm text-white/55">
        Get the free China First-Time Visitor Checklist and practical planning notes.
      </p>
      <p className="text-xs leading-relaxed text-white/48">
        By subscribing, you join the list for future China trip updates. Your
        checklist opens on the next page. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-white/75">
          Privacy Policy
        </Link>
        .
      </p>
      {message ? (
        <p className="text-sm font-semibold text-white" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
