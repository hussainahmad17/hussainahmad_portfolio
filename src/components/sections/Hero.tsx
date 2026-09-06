import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { HeroDiagram } from "@/components/sections/HeroDiagram";
import { site } from "@/data/site";

const positioning = [
  "AI Agents",
  "RAG",
  "LLM Applications",
  "Automation",
  "Full-Stack AI",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-6">
            {site.availability ? <StatusPill label={site.availability} /> : null}

            <h1 className="mt-7 text-[length:var(--text-display)] leading-[1.02] font-medium text-balance-tight">
              I build AI systems that survive contact with{" "}
              <span className="text-accent">production</span>.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              I&rsquo;m {site.shortName} — an AI Software Engineer working on agents,
              retrieval-augmented generation and LLM applications, and on the
              full-stack software that has to hold them up.
            </p>

            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Architecture, implementation, evaluation and deployment — treated as one
              job, because a model that works in a notebook and a system people can
              depend on are not the same deliverable.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/work" size="lg">
                View my work
                <span aria-hidden="true">→</span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Let&rsquo;s talk
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
              {positioning.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-line-strong">
                      ·
                    </span>
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end xl:col-span-6">
            <HeroDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
