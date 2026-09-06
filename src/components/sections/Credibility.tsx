import { site } from "@/data/site";

const domains = [
  { title: "AI Agents", detail: "Graph-structured workflows, tool calling, state" },
  { title: "RAG Systems", detail: "Ingestion, chunking, retrieval, grounded answers" },
  { title: "LLM Applications", detail: "Structured output, streaming, context budgets" },
  { title: "Intelligent Automation", detail: "Queues, schedules, realtime and push delivery" },
  { title: "Full-Stack Systems", detail: "Typed APIs, access control, tested domains" },
  { title: "Cloud Deployment", detail: "Stateless compute, CI, environment-scoped config" },
];

export function Credibility() {
  const links = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    site.resumeUrl ? { label: "Résumé", href: site.resumeUrl } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <section
      aria-label="Areas of practice"
      className="border-t border-line bg-surface/30"
    >
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <ul className="grid flex-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => (
              <li key={domain.title}>
                <p className="text-sm font-medium text-ink">{domain.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{domain.detail}</p>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-2 lg:border-l lg:border-line lg:pl-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="text-xs text-faint transition-transform group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
