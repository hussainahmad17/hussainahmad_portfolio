import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { ContactCta } from "@/components/sections/ContactCta";
import { getProject, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This case study does not exist.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [project.title, project.category, ...project.primaryStack],
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const schema = projectSchema(slug);

  return (
    <>
      <CaseStudy project={project} />

      {next.slug !== project.slug ? (
        <section className="border-t border-line" aria-label="Next project">
          <div className="container-page py-14">
            <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2">
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
                Next case study
              </span>
              <span className="flex items-center gap-3 text-[length:var(--text-h3)] font-medium text-ink">
                {next.title}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="max-w-2xl text-sm leading-relaxed text-muted">
                {next.summary}
              </span>
            </Link>
          </div>
        </section>
      ) : null}

      <ContactCta />

      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </>
  );
}
