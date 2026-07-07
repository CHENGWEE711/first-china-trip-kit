"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    va?: {
      track?: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("idle");
      setMessage("Please enter a valid email address.");
      return;
    }

    window.dataLayer?.push({
      event: "newsletter_submit",
      source_page: source,
    });
    window.va?.track?.("newsletter_submit", { source_page: source });

    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("idle");
      setMessage(data.message || "Subscription could not be completed.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Thanks! Your China First Trip Checklist is on the way.");
    form.reset();
    window.setTimeout(() => {
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    }, 350);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "grid gap-3" : "grid gap-3 rounded-lg border border-white/12 bg-white/8 p-4"}
    >
      <input type="hidden" name="source_page" value={source} />
      <label htmlFor={`newsletter-email-${source}`} className="text-sm font-semibold text-white/84">
        Email address
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id={`newsletter-email-${source}`}
          name="email"
          type="email"
          required
          aria-label="Email address"
          className="min-h-12 rounded-md border border-white/18 bg-white px-4 text-base text-ink outline-none focus:border-clay"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 rounded-md bg-clay px-5 text-base font-bold text-white transition hover:bg-ember disabled:cursor-wait disabled:opacity-70"
        >
          {status === "success" ? "Success" : isSubmitting ? "Saving..." : "Get the checklist"}
        </button>
      </div>
      <p className="text-sm text-white/55">
        Get the free China First-Time Visitor Checklist and practical planning notes.
      </p>
      {message ? (
        <p className="text-sm font-semibold text-white" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
