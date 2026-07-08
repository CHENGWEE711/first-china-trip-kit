"use client";

import { type FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

type ContactFormProps = {
  source?: string;
};

export function ContactForm({ source = "contact-page" }: ContactFormProps) {
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
    const question = String(formData.get("main_question") || "").trim();

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

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("idle");
      setMessage(data.message || `Please email ${siteConfig.contactEmail} directly for now.`);
      return;
    }

    setStatus("success");
    setMessage(data.message || "Thanks! Your China trip question has been saved.");
    form.reset();
  }

  const inputClass =
    "min-h-12 rounded-md border border-ink/12 bg-paper px-4 py-3 text-base text-ink outline-none focus:border-ember";
  const labelClass = "grid gap-2 text-base font-semibold text-ink";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
    >
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Name
          <input name="name" type="text" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Email
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Country or passport
          <input name="country_or_passport" type="text" className={inputClass} />
        </label>
        <label className={labelClass}>
          Travel month
          <input name="travel_month" type="text" placeholder="e.g. October 2026" className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
          className="rounded-md border border-ink/12 bg-paper px-4 py-3 text-base text-ink outline-none focus:border-ember"
        />
      </label>

      <fieldset className="grid gap-3 rounded-md bg-sand p-4">
        <legend className="text-base font-semibold text-ink">
          Interested in custom itinerary?
        </legend>
        <div className="flex flex-wrap gap-4 text-base text-ink/72">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="interested_in_custom_itinerary"
              value="yes"
              className="h-4 w-4 accent-[#B43D35]"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
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
        <div className="flex flex-wrap gap-4 text-base text-ink/72">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="preferred_reply_method"
              value="email"
              defaultChecked
              className="h-4 w-4 accent-[#B43D35]"
            />
            Email
          </label>
          <label className="flex items-center gap-2">
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
        className="min-h-12 rounded-md bg-ember px-5 py-3 text-base font-bold text-white transition hover:bg-[#982F28] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "success" ? "Message saved" : isSubmitting ? "Saving..." : "Send question"}
      </button>

      {message ? (
        <p
          className={`text-base font-semibold ${status === "success" ? "text-jade" : "text-ember"}`}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
