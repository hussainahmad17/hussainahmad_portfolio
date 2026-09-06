import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process">
      <SectionHeader
        eyebrow="How I build AI systems"
        title="AI as software engineering, not experimentation alone"
        description="The order matters more than the steps. Most AI projects that fail were built correctly and aimed at the wrong problem, or shipped without any way to tell whether a change made them better."
      />

      <ol className="relative mt-16 sm:mt-20">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent sm:left-[1.4375rem]"
        />

        {processSteps.map((step, index) => (
          <Reveal
            key={step.index}
            as="li"
            index={index}
            className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8"
          >
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas font-mono text-[0.625rem] text-accent sm:h-12 sm:w-12 sm:text-xs">
              {step.index}
            </span>
            <div className="pt-1 sm:pt-3">
              <h3 className="text-base font-medium text-ink sm:text-lg">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
