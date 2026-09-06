import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide whitespace-nowrap",
        tone === "accent"
          ? "border-accent/30 bg-accent-dim/40 text-accent-soft"
          : "border-line bg-surface-2/70 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
