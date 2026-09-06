import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "AI and full-stack engineering case studies: retrieval-augmented generation, agent workflows, queue-backed platforms and role-based products — with architecture, decisions and trade-offs.",
  path: "/work",
  keywords: ["AI case studies", "RAG project", "AI agent project", "portfolio"],
});

export default function WorkPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
            Work
          </p>
          <h1 className="mt-6 max-w-3xl text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
            Case studies, written the way I&rsquo;d want to read them
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Each one covers the problem, the architecture, the decisions and what turned out
            to be hard. Where a metric has not been measured, it is not claimed.
          </p>
        </div>
      </div>

      <div className="container-page py-20 sm:py-28">
        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, index) => (
            <Reveal key={project.slug} as="div" index={index}>
              <ProjectCard project={project} index={index} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>

      <ContactCta />
    </>
  );
}
