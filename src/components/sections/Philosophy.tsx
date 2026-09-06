import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { principles } from "@/data/process";

export function Philosophy() {
  return (
    <Section id="philosophy" className="bg-surface/25">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Engineering philosophy"
            title={
              <>
                I don&rsquo;t build AI demos.
                <br />
                <span className="text-muted">I build AI systems.</span>
              </>
            }
            description="A demo has to work once, for someone who wants it to. A system has to keep working while inputs change, providers change and nobody is watching. Almost everything that separates the two is ordinary engineering."
          />
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              as="li"
              index={index}
              className="bg-canvas p-6 sm:p-7"
            >
              <h3 className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.625rem] text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
