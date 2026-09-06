import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { stackGroups } from "@/data/stack";

export function StackSection() {
  return (
    <Section id="stack" className="bg-surface/25">
      <SectionHeader
        eyebrow="Technical stack"
        title="Tools I have actually shipped with"
        description="Restricted to technologies that appear in real work. A longer list would be easy to write and worth less to read."
      />

      <div className="mt-14 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, index) => (
          <Reveal key={group.group} as="div" index={index}>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
              {group.group}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{group.note}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
