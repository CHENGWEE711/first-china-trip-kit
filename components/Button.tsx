import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";

export function buttonClassName(variant: ButtonVariant, className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45",
    variant === "primary" && "bg-ember text-white shadow-soft hover:bg-ember-hover",
    variant === "secondary" && "border border-ink/25 bg-transparent text-ink hover:border-ember hover:text-ember",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}
