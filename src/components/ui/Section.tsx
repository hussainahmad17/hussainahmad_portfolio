import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-line py-20 sm:py-28 lg:py-36",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow">
        <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-[length:var(--text-h2)] leading-[1.08] font-medium text-balance-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
