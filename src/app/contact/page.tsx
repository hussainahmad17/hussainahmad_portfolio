import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch about AI engineering work — agents, retrieval-augmented systems, LLM applications and the full-stack software around them.",
  path: "/contact",
  keywords: ["hire AI engineer", "AI consultant", "contact"],
});

const goodFits = [
  "An AI feature that works in a prototype and has to become a product",
  "A retrieval system that returns plausible answers you cannot verify",
  "An agent that needs tools, state and a defined escalation path",
  "A workflow where the AI is the easy part and the integration is not",
];

export default function ContactPage() {
  const directLinks = [
    site.email ? { label: "Email", value: site.email, href: `mailto:${site.email}` } : null,
    { label: "LinkedIn", value: "hussainahmaddev", href: site.linkedin },
    { label: "GitHub", value: "hussainahmad17", href: site.github },
  ].filter((link): link is { label: string; value: string; href: string } => link !== null);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="container-page relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
              Contact
            </p>
            <h1 className="mt-6 text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
              Tell me the problem
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Not the specification. The problem, who it affects and what going wrong costs —
              that is what determines whether an AI system is the right answer at all.
            </p>

            <h2 className="mt-12 font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              Usually a good fit
            </h2>
            <ul className="mt-5 space-y-3">
              {goodFits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              Direct
            </h2>
            <dl className="mt-5 space-y-3">
              {directLinks.map((link) => (
                <div key={link.label} className="flex items-baseline gap-4">
                  <dt className="w-20 shrink-0 text-sm text-muted">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                      className="text-sm text-ink transition-colors hover:text-accent"
                    >
                      {link.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline gap-4">
                <dt className="w-20 shrink-0 text-sm text-muted">Based in</dt>
                <dd className="text-sm text-ink">
                  {site.location} · {site.timezone}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="surface-card p-7 sm:p-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
