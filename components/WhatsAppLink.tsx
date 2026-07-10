"use client";

import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type WhatsAppLinkProps = {
  children?: ReactNode;
  className?: string;
  placement: string;
  sourcePage: string;
  variant?: "primary" | "secondary" | "footer" | "text";
};

function getWhatsAppUrl() {
  const url = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";

  if (!url.startsWith("https://wa.me/")) {
    return "";
  }

  return url;
}

export function WhatsAppLink({
  children = "Message us on WhatsApp",
  className,
  placement,
  sourcePage,
  variant = "secondary",
}: WhatsAppLinkProps) {
  const whatsappUrl = getWhatsAppUrl();

  if (!whatsappUrl) {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp to contact First China Trip Kit"
      onClick={() =>
        trackEvent("whatsapp_contact_clicked", {
          source_page: sourcePage,
          placement,
        })
      }
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2",
        variant === "primary" && "bg-ember text-white shadow-soft hover:bg-[#982F28]",
        variant === "secondary" &&
          "border border-ink/12 bg-paper text-ink hover:border-ember/35 hover:text-ember",
        variant === "footer" &&
          "group grid min-h-0 justify-stretch gap-0.5 rounded-md border border-white/10 bg-white/5 p-3 text-left text-white/72 hover:border-white/22 hover:bg-white/9 hover:text-white focus:ring-offset-ink",
        variant === "text" && "min-h-0 px-0 py-0 text-ember hover:text-[#982F28]",
        className,
      )}
    >
      {variant === "footer" ? (
        <>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <MessageCircle aria-hidden="true" size={16} />
            WhatsApp
          </span>
          <span className="text-sm text-white/55 group-hover:text-white/70">
            Message us on WhatsApp
          </span>
        </>
      ) : (
        <>
          <MessageCircle aria-hidden="true" size={18} />
          <span>{children}</span>
        </>
      )}
    </a>
  );
}
