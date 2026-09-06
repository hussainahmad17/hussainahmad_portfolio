import Link from "next/link";
import type { Project } from "@/types";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In development",
  archived: "Archived",
};

export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const reversed = index % 2 === 1;

  return (
    <article className="group relative">
      <div
        className={cn(
          "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden rounded-xl transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-1"
        >
          <ProjectVisual project={project} priority={priority} />
        </Link>

        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
              {project.category}
            </span>
            <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
              {statusLabel[project.status]} · {project.year}
            </span>
          </div>

          <h3 className="mt-4 text-[length:var(--text-h3)] leading-tight font-medium">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-4 max-w-xl leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
            {project.capabilities.map((capability) => (
              <li key={capability}>
                <Tag tone="accent">{capability}</Tag>
              </li>
            ))}
          </ul>

          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technology">
            {project.primaryStack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">
            View case study
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
