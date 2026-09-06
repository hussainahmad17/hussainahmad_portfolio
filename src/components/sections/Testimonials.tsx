import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

/**
 * Renders nothing while no real, permitted testimonials exist. The structure is
 * ready; the section simply does not appear rather than showing invented praise.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" className="bg-surface/25">
      <SectionHeader eyebrow="References" title="What people I've worked with say" />

      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={`${testimonial.name}-${testimonial.company}`}
            as="li"
            index={index}
            className="surface-card flex flex-col p-7"
          >
            <blockquote className="flex-1 leading-relaxed text-ink-soft">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 border-t border-line pt-5">
              <p className="text-sm font-medium text-ink">{testimonial.name}</p>
              <p className="mt-0.5 text-sm text-muted">
                {testimonial.role}, {testimonial.company}
              </p>
            </footer>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
