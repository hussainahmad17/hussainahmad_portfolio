import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { currentFocus } from "@/data/now";

export function NowSection() {
  return (
    <Section id="now">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader
            eyebrow="Currently exploring"
            title="What I'm working through right now"
            description="Open questions I'm spending time on, rather than a list of things I already know."
          />
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {currentFocus.map((item, index) => (
            <Reveal key={item.title} as="li" index={index}>
              <h3 className="flex items-baseline gap-2.5 text-[0.9375rem] font-medium text-ink">
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
