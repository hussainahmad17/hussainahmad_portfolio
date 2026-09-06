import type { ArchitectureLayer } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  layers: ArchitectureLayer[];
  caption?: string;
  className?: string;
};

/**
 * Layered architecture diagram.
 *
 * Rendered from data rather than as an image, so it stays readable at every
 * width, scales with the user's font size and is available to screen readers as
 * an ordered list of layers. Flow is top to bottom at all breakpoints — the one
 * direction that survives a narrow viewport without becoming unreadable.
 */
export function ArchitectureDiagram({ layers, caption, className }: Props) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/40">
        <div
          aria-hidden="true"
          className="grid-backdrop pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 accent-glow opacity-50"
        />

        <ol className="relative space-y-0 p-5 sm:p-8">
          {layers.map((layer, layerIndex) => (
            <li key={layer.label}>
              <div className="grid gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5">
                <p className="pt-1 font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase sm:text-right">
                  {layer.label}
                </p>

                <div
                  className={cn(
                    "grid gap-2.5",
                    layer.nodes.length === 1 && "sm:grid-cols-1",
                    layer.nodes.length === 2 && "sm:grid-cols-2",
                    layer.nodes.length >= 3 && "sm:grid-cols-3",
                  )}
                >
                  {layer.nodes.map((node) => (
                    <div
                      key={node.title}
                      className={cn(
                        "rounded-xl border px-4 py-3 transition-colors",
                        node.accent
                          ? "border-accent/35 bg-accent-dim/25"
                          : "border-line-strong bg-surface-2/80",
                      )}
                    >
                      <p
                        className={cn(
                          "text-sm leading-snug font-medium",
                          node.accent ? "text-accent-soft" : "text-ink",
                        )}
                      >
                        {node.title}
                      </p>
                      {node.detail ? (
                        <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted">
                          {node.detail}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {layerIndex < layers.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="grid gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5"
                >
                  <span />
                  <span className="flex h-7 items-center">
                    <span className="ml-5 flex h-full flex-col items-center">
                      <span className="w-px flex-1 bg-gradient-to-b from-line-strong to-accent/40" />
                      <span className="-mt-px text-[0.5rem] leading-none text-accent/70">
                        ▼
                      </span>
                    </span>
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
