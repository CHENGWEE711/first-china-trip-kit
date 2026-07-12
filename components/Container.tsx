import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "main" | "reading" | "wide";
};

export function Container({ children, className, size = "main" }: ContainerProps) {
  return (
    <div
      className={cn(
        size === "main" && "editorial-container",
        size === "reading" && "editorial-reading-container",
        size === "wide" && "editorial-wide-container",
        className,
      )}
    >
      {children}
    </div>
  );
}
