import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_70%_at_50%_100%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 accent-glow opacity-60"
      />

      <div className="container-page relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
            Contact
          </p>

          <h2 className="mt-6 text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
            Have an AI product or workflow worth building?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Send me the problem — not the spec. If it&rsquo;s a fit I&rsquo;ll tell you how
            I&rsquo;d approach it; if it isn&rsquo;t, I&rsquo;ll say so.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Let&rsquo;s talk
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink
              href={site.linkedin}
              external
              variant="secondary"
              size="lg"
            >
              Connect on LinkedIn
            </ButtonLink>
          </div>

          <p className="mt-8 font-mono text-xs tracking-[0.14em] text-faint uppercase">
            {site.location} · {site.timezone} · Working remotely
          </p>
        </div>
      </div>
    </section>
  );
}
