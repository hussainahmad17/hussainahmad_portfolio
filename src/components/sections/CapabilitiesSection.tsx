import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { capabilities } from "@/data/capabilities";

export function CapabilitiesSection({ limit }: { limit?: number }) {
  const shown = limit ? capabilities.slice(0, limit) : capabilities;

  return (
    <Section id="ai-engineering">
      <SectionHeader
        eyebrow="AI Engineering"
        title="What I actually do when I build an AI system"
        description="Capability described through implementation. Every practice below exists in code, not just in a list of technologies."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((capability, index) => (
          <Reveal
            key={capability.id}
            as="div"
            index={index}
            className="flex flex-col bg-canvas p-7 transition-colors hover:bg-surface/60 sm:p-8"
          >
            <h3 className="text-lg font-medium text-ink">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{capability.summary}</p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {capability.practices.map((practice) => (
                <li key={practice} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {practice}
                </li>
              ))}
            </ul>

            <ul className="mt-7 flex flex-wrap gap-2">
              {capability.tools.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {limit && limit < capabilities.length ? (
        <div className="mt-10">
          <Link
            href="/ai-engineering"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            The full breakdown
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      ) : null}
    </Section>
  );
}
