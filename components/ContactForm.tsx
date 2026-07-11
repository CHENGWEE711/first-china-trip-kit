"use client";

import { type FormEvent, useRef, useState } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { hasWhatsAppContact } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type ContactFormProps = {
  source?: string;
};

export function ContactForm({ source = "contact-page" }: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [continueOnWhatsApp, setContinueOnWhatsApp] = useState(false);
  const hasTrackedStart = useRef(false);
  const isSubmitting = status === "loading";
  const whatsappEnabled = hasWhatsAppContact();

  function trackFormStart() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("contact_form_started", {
      source_page: "/contact",
      placement: source,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const question = String(formData.get("main_question") || "").trim();
    const preferredReplyMethod = String(formData.get("preferred_reply_method") || "email");
    setContinueOnWhatsApp(false);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("idle");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (question.length < 10) {
      setStatus("idle");
      setMessage("Please add a little more detail to your main question.");
      return;
    }

    let response: Response;
    let data: { message?: string } = {};

    try {
      response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      data = (await response.json()) as { message?: string };
    } catch {
      setStatus("idle");
      setMessage(
        "The contact form is temporarily unavailable. Please email us or contact us through WhatsApp.",
      );
      return;
    }

    if (!response.ok) {
      setStatus("idle");
      setMessage(
        data.message ||
          "The contact form is temporarily unavailable. Please email us or contact us through WhatsApp.",
      );
      return;
    }

    setStatus("success");
    trackEvent("contact_form_submitted", {
      source_page: "/contact",
      placement: source,
      preferred_reply_method: preferredReplyMethod,
      interested_in_custom_itinerary:
        String(formData.get("interested_in_custom_itinerary") || "no") === "yes",
    });
    setMessage(data.message || "Thanks! Your China trip question has been saved.");
    setContinueOnWhatsApp(preferredReplyMethod === "whatsapp" && whatsappEnabled);
    form.reset();
  }

  const inputClass =
    "min-h-12 w-full min-w-0 rounded-md border border-ink/12 bg-paper px-4 py-3 text-base text-ink outline-none focus:border-ember";
  const labelClass = "grid min-w-0 gap-2 text-base font-semibold text-ink";
  const radioClass =
    "flex min-h-11 items-center gap-2 rounded-md border border-ink/10 bg-paper px-3 py-2 text-base text-ink/72";

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={trackFormStart}
      className="grid min-w-0 gap-4 rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
    >
      <input type="hidden" name="source" value={source} />
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Name
          <input name="name" type="text" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Email
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Country or passport nationality
          <input name="country_or_passport" type="text" className={inputClass} />
        </label>
        <label className={labelClass}>
          Travel month
          <input name="travel_month" type="text" placeholder="e.g. October 2026" className={inputClass} />
        </label>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Cities considered
          <input name="cities_considered" type="text" placeholder="e.g. Shanghai, Beijing, Xi'an" className={inputClass} />
        </label>
        <label className={labelClass}>
          Trip length
          <input name="trip_length" type="text" placeholder="e.g. 7 days" className={inputClass} />
        </label>
      </div>

      <label className={labelClass}>
        Main question
        <textarea
          name="main_question"
          required
          rows={6}
          placeholder="Tell us what you are trying to plan, what feels confusing, and any timing or route constraints."
          className="w-full min-w-0 rounded-md border border-ink/12 bg-paper px-4 py-3 text-base text-ink outline-none focus:border-ember"
        />
      </label>

      <fieldset className="grid gap-3 rounded-md bg-sand p-4">
        <legend className="text-base font-semibold text-ink">
          Interested in custom itinerary?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={radioClass}>
            <input
              type="radio"
              name="interested_in_custom_itinerary"
              value="yes"
              className="h-4 w-4 accent-[#B43D35]"
            />
            Yes
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="interested_in_custom_itinerary"
              value="no"
              defaultChecked
              className="h-4 w-4 accent-[#B43D35]"
            />
            No
          </label>
        </div>
      </fieldset>

      <fieldset className="grid gap-3 rounded-md bg-sand p-4">
        <legend className="text-base font-semibold text-ink">
          Preferred reply method
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={radioClass}>
            <input
              type="radio"
              name="preferred_reply_method"
              value="email"
              defaultChecked
              className="h-4 w-4 accent-[#B43D35]"
            />
            Email
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="preferred_reply_method"
              value="whatsapp"
              className="h-4 w-4 accent-[#B43D35]"
            />
            WhatsApp
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full rounded-md bg-ember px-5 py-3 text-base font-bold text-white transition hover:bg-[#982F28] disabled:cursor-wait disabled:opacity-70 sm:w-fit"
      >
        {status === "success" ? "Message saved" : isSubmitting ? "Saving..." : "Send question"}
      </button>
      <p className="text-sm leading-relaxed text-ink/58">
        We do not provide legal, immigration, visa, financial, or official government
        advice. For visa or entry questions, always verify official requirements.
      </p>

      {message ? (
        <div role="status" aria-live="polite" className="grid gap-3">
          <p
            className={`text-base font-semibold ${status === "success" ? "text-jade" : "text-ember"}`}
          >
            {message}
          </p>
          {continueOnWhatsApp ? (
            <div className="rounded-md border border-ink/10 bg-sand p-4">
              <p className="text-sm leading-relaxed text-ink/66">
                To continue on WhatsApp, please open the WhatsApp chat and send
                the pre-filled message. We cannot initiate a WhatsApp conversation
                unless you message us first.
              </p>
              <WhatsAppLink
                placement="contact_form_success"
                sourcePage="/contact"
                className="mt-3 w-full sm:w-fit"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
