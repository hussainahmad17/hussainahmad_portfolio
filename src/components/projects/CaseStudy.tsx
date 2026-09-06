import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

type SectionSpec = {
  id: string;
  label: string;
  render: () => ReactNode;
};

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In development",
  archived: "Archived",
};

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="max-w-[68ch] leading-relaxed text-ink-soft">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * Case study layout.
 *
 * Sections are built as data so numbering stays correct when an optional
 * section (such as the AI workflow) is absent for a given project.
 */
export function CaseStudy({ project }: { project: Project }) {
  const aiWorkflow = project.aiWorkflow;

  const sections: SectionSpec[] = [
    {
      id: "overview",
      label: "Overview",
      render: () => <Prose paragraphs={[project.overview]} />,
    },
    {
      id: "problem",
      label: "Problem",
      render: () => <Prose paragraphs={project.problem.body} />,
    },
    {
      id: "context",
      label: "Business context",
      render: () => <Prose paragraphs={project.businessContext.body} />,
    },
    {
      id: "solution",
      label: "Solution",
      render: () => <Prose paragraphs={project.solution.body} />,
    },
    {
      id: "architecture",
      label: "Architecture",
      render: () => (
        <ArchitectureDiagram
          layers={project.architecture.layers}
          caption={project.architecture.caption}
        />
      ),
    },
    ...(aiWorkflow
      ? [
          {
            id: "ai-workflow",
            label: "AI workflow",
            render: () => <Prose paragraphs={aiWorkflow.body} />,
          },
        ]
      : []),
    {
      id: "implementation",
      label: "Implementation",
      render: () => <Prose paragraphs={project.implementation.body} />,
    },
    {
      id: "challenges",
      label: "Engineering challenges",
      render: () => (
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {project.challenges.map((challenge) => (
            <li key={challenge.title} className="bg-canvas p-6 sm:p-7">
              <h3 className="text-base font-medium text-ink">{challenge.title}</h3>
              <p className="mt-2.5 max-w-[74ch] text-sm leading-relaxed text-muted">
                {challenge.body}
              </p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "decisions",
      label: "Key decisions",
      render: () => (
        <dl className="space-y-7">
          {project.decisions.map((item) => (
            <div key={item.decision} className="border-l border-accent/40 pl-5">
              <dt className="font-medium text-ink">{item.decision}</dt>
              <dd className="mt-2 max-w-[74ch] text-sm leading-relaxed text-muted">
                {item.rationale}
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "results",
      label: "Results",
      render: () =>
        project.results.length > 0 ? (
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.label} className="bg-canvas p-7">
                <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                  {result.label}
                </dt>
                <dd className="mt-3 text-2xl font-medium text-accent">{result.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="max-w-[74ch] rounded-xl border border-line bg-surface/40 p-6 text-sm leading-relaxed text-muted">
            No production metrics are published for this project yet. I would rather show
            nothing here than a number I cannot stand behind — the architecture and the
            decisions above are the part worth reviewing.
          </p>
        ),
    },
    {
      id: "technology",
      label: "Technology",
      render: () => (
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((group) => (
            <div key={group.group}>
              <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                {group.group}
              </h3>
              <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "links",
      label: "Links",
      render: () => (
        <div className="flex flex-wrap gap-3">
          {project.demoUrl ? (
            <ButtonLink href={project.demoUrl} external>
              Live demo
              <span aria-hidden="true">↗</span>
            </ButtonLink>
          ) : null}
          {project.githubUrl ? (
            <ButtonLink href={project.githubUrl} external variant="secondary">
              Source code
              <span aria-hidden="true">↗</span>
            </ButtonLink>
          ) : null}
          {!project.demoUrl && !project.githubUrl ? (
            <p className="text-sm text-muted">
              This project is not publicly linked. Details available on request.
            </p>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
            All work
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                  {project.category}
                </span>
                <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
                  {statusLabel[project.status]} · {project.year}
                </span>
              </div>

              <h1 className="mt-5 text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
                {project.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {project.summary}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {project.primaryStack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <ButtonLink href={project.demoUrl} external>
                    Live demo
                    <span aria-hidden="true">↗</span>
                  </ButtonLink>
                ) : null}
                {project.githubUrl ? (
                  <ButtonLink href={project.githubUrl} external variant="secondary">
                    Source
                    <span aria-hidden="true">↗</span>
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              <ProjectVisual project={project} priority />
            </div>
          </div>

          {project.note ? (
            <p className="mt-10 max-w-3xl rounded-xl border border-line bg-surface/50 p-5 text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink-soft">Scope note — </span>
              {project.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-page py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Case study sections" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
                Contents
              </p>
              <ol className="mt-5 space-y-2.5">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={"#" + section.id}
                      className="flex gap-3 text-sm text-muted transition-colors hover:text-ink"
                    >
                      <span className="font-mono text-[0.6875rem] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-9">
            <div className="space-y-16 sm:space-y-20">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="mb-6 flex items-baseline gap-3 text-[length:var(--text-h3)] leading-tight font-medium">
                    <span aria-hidden="true" className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.label}
                  </h2>
                  {section.render()}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
