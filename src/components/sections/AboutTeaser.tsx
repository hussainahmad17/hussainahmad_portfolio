import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * The "why should someone trust me" step of the page.
 *
 * With no employment history, testimonials or metrics supplied, the honest
 * basis for trust is verifiability: every claim on this site points at source
 * that can be read. That is stated plainly rather than substituted with
 * borrowed credibility.
 */
const commitments = [
  {
    title: "Every project links to its source",
    body: "The case studies describe code you can open and check. Nothing here rests on a claim you have to take on faith.",
  },
  {
    title: "No metric I haven't measured",
    body: "Where a result has not been measured, the case study says so. An invented number is worth less than an empty space.",
  },
  {
    title: "Decisions, including the trade-offs",
    body: "Each case study records what was chosen and what was given up. Architecture without its trade-offs is marketing.",
  },
];

export function AboutTeaser() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="About"
            title="Judge the work, not the adjectives"
            description="I came to AI engineering through software engineering, and most of what makes an AI feature trustworthy turns out to be ordinary engineering — validation, queues, provenance, evaluation."
          />

          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            I&rsquo;m based in {site.location} and work remotely. If something below
            doesn&rsquo;t hold up under inspection, I&rsquo;d rather hear it than not.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            More about how I work
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-7">
          {commitments.map((commitment, index) => (
            <Reveal
              key={commitment.title}
              as="li"
              index={index}
              className="bg-canvas p-7 sm:p-8"
            >
              <h3 className="text-base font-medium text-ink">{commitment.title}</h3>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted">
                {commitment.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
