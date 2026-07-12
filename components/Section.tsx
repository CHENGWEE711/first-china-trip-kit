import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "main" | "reading" | "wide";
  variant?: "default" | "warm" | "light" | "dark" | "full-bleed";
  spacing?: "default" | "compact";
  as?: ElementType;
  id?: string;
};

export function Section({
  children,
  className,
  containerClassName,
  containerSize = "main",
  variant = "default",
  spacing = "default",
  as: Component = "section",
  id,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        spacing === "default" ? "py-12 md:py-20 lg:py-24" : "py-8 md:py-12",
        variant === "warm" && "bg-sand",
        variant === "light" && "bg-paper",
        variant === "dark" && "bg-ink text-white",
        className,
      )}
    >
      {variant === "full-bleed" ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>{children}</Container>
      )}
    </Component>
  );
}
