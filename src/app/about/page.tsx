import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/sections/ContactCta";
import { NowSection } from "@/components/sections/NowSection";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Hussain Ahmad is an AI Software Engineer based in Faisalabad, Pakistan, building agent systems, retrieval-augmented applications and the full-stack software around them.",
  path: "/about",
  keywords: ["about", "AI engineer Pakistan", "remote AI engineer"],
});

const interests = [
  {
    title: "Problems with a real cost of being wrong",
    body: "Systems where an incorrect answer has a consequence are more interesting than ones where it does not, because they force the design questions that matter: confidence, escalation, auditability.",
  },
  {
    title: "Work that reaches production",
    body: "Prototypes are useful and I build them, but the engineering I care about starts at the point where other people begin to depend on the thing.",
  },
  {
    title: "Teams that write things down",
    body: "Architecture decisions, trade-offs and the reasons behind them. It is the difference between a codebase that can be changed and one that can only be added to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
                About
              </p>
              <h1 className="mt-6 text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
                I came to AI engineering through software engineering, and it shows.
              </h1>

              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  I&rsquo;m {site.name}, an AI Software Engineer based in {site.location}.
                  I build agent systems, retrieval-augmented applications and the full-stack
                  software that has to support them.
                </p>
                <p>
                  My background is in building conventional systems — APIs, access control,
                  queues, realtime delivery, test suites, deployment pipelines. That turned out
                  to be the useful preparation. Most of what makes an AI feature trustworthy is
                  not model work: it is validation at the boundary, work moved off the request
                  path, provenance carried with an answer, and a way to tell whether last
                  week&rsquo;s change made anything better.
                </p>
                <p>
                  So I treat a model as one component inside a system that has to keep its
                  promises. I&rsquo;m interested in where that component should be trusted, where
                  it should be constrained, and where it should hand back to a person.
                </p>
                <p>
                  I work in the open. Everything on this site links to source, and where a
                  result has not been measured I say so rather than filling the gap with a
                  number.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/work" variant="secondary">
                  See the work
                  <span aria-hidden="true">→</span>
                </ButtonLink>
                {site.resumeUrl ? (
                  <ButtonLink href={site.resumeUrl} external variant="secondary">
                    Résumé
                    <span aria-hidden="true">↗</span>
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              {site.photo ? (
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={site.photo}
                    alt={`${site.name}, ${site.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative flex aspect-4/5 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface/50 p-8">
                  <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 accent-glow opacity-60"
                  />
                  <p
                    aria-hidden="true"
                    className="relative font-mono text-7xl leading-none font-medium text-accent"
                  >
                    {site.monogram}
                  </p>
                  <dl className="relative space-y-4 text-sm">
                    <div>
                      <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
                        Role
                      </dt>
                      <dd className="mt-1 text-ink">{site.title}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
                        Based in
                      </dt>
                      <dd className="mt-1 text-ink">
                        {site.location} · {site.timezone}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
                        Focus
                      </dt>
                      <dd className="mt-1 text-ink">
                        AI agents, RAG, LLM applications, full-stack systems
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {experience.length > 0 ? (
        <Section id="experience">
          <SectionHeader eyebrow="Experience" title="Where I've worked" />
          <ol className="mt-14 space-y-12">
            {experience.map((entry) => (
              <li
                key={`${entry.company}-${entry.role}`}
                className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[12rem_1fr] sm:gap-10"
              >
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
                    {entry.period}
                  </p>
                  {entry.location ? (
                    <p className="mt-1 text-sm text-muted">{entry.location}</p>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ink">
                    {entry.role} · {entry.company}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <Section id="interests" className="bg-surface/25">
        <SectionHeader
          eyebrow="What I look for"
          title="The work I want to be doing"
          description="Being specific about this saves everyone time, including me."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {interests.map((interest, index) => (
            <li key={interest.title}>
              <span
                aria-hidden="true"
                className="font-mono text-[0.6875rem] text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-medium text-ink">{interest.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{interest.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {education.length > 0 ? (
        <Section id="education">
          <SectionHeader eyebrow="Education" title="Background" />
          <ul className="mt-12 space-y-8">
            {education.map((entry) => (
              <li
                key={`${entry.institution}-${entry.degree}`}
                className="grid gap-2 border-t border-line pt-6 sm:grid-cols-[12rem_1fr] sm:gap-10"
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
                  {entry.period}
                </p>
                <div>
                  <h3 className="font-medium text-ink">{entry.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                  {entry.detail ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{entry.detail}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <NowSection />
      <ContactCta />
    </>
  );
}
