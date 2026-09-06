import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Project preview.
 *
 * Uses a real screenshot when one exists. Where none has been supplied, it
 * renders a condensed schematic built from the project's own architecture data
 * — an honest abstraction of the system rather than a mocked-up screenshot of a
 * product that does not look like that.
 *
 * The node labels are real, so the thumbnail carries information instead of
 * reading as a placeholder.
 */
export function ProjectVisual({
  project,
  priority = false,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const screenshot = project.images[0];

  if (screenshot) {
    return (
      <div
        className={cn(
          "relative aspect-16/10 overflow-hidden rounded-xl border border-line bg-surface",
          className,
        )}
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          className="object-cover"
        />
      </div>
    );
  }

  const layers = project.architecture.layers.slice(0, 5);

  return (
    <div
      className={cn(
        "relative aspect-16/10 overflow-hidden rounded-xl border border-line bg-surface",
        className,
      )}
      role="img"
      aria-label={`Schematic of the ${project.title} architecture, from ${layers[0]?.label} to ${
        layers[layers.length - 1]?.label
      }.`}
    >
      <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
      <div
        aria-hidden="true"
        className="accent-glow absolute inset-x-0 -bottom-1/4 h-3/4 opacity-70"
      />

      <div
        aria-hidden="true"
        className="relative flex h-full flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6"
      >
        {layers.map((layer) => (
          <div key={layer.label} className="flex items-center gap-2.5 sm:gap-3">
            <span className="hidden w-[4.5rem] shrink-0 truncate font-mono text-[0.5rem] tracking-[0.12em] text-faint uppercase sm:block">
              {layer.label}
            </span>
            <div className="flex min-w-0 flex-1 gap-1.5">
              {layer.nodes.map((node) => (
                <span
                  key={node.title}
                  className={cn(
                    "flex h-7 min-w-0 flex-1 items-center justify-center rounded-md border px-1.5 text-center sm:h-8",
                    node.accent
                      ? "border-accent/40 bg-accent/12"
                      : "border-line-strong bg-surface-2",
                  )}
                >
                  <span
                    className={cn(
                      "truncate text-[0.5625rem] leading-none font-medium sm:text-[0.625rem]",
                      node.accent ? "text-accent-soft" : "text-ink-soft",
                    )}
                  >
                    {node.title}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="absolute right-3.5 bottom-3 font-mono text-[0.5rem] tracking-[0.14em] text-faint uppercase">
        System schematic
      </p>
    </div>
  );
}
