import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = true,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2",
        variant === "primary" &&
          "bg-ember text-white shadow-soft hover:bg-[#982F28]",
        variant === "secondary" &&
          "border border-white/70 bg-white/90 text-ink shadow-soft hover:bg-white",
        variant === "ghost" &&
          "border border-ink/12 bg-paper text-ink hover:border-ember/35 hover:text-ember",
        className,
      )}
    >
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </Link>
  );
}
