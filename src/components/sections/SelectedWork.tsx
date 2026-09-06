import { Section, SectionHeader } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProjects, projects } from "@/data/projects";

export function SelectedWork() {
  const remaining = projects.length - featuredProjects.length;

  return (
    <Section id="work">
      <SectionHeader
        eyebrow="Selected work"
        title="Systems, not demonstrations"
        description="Four projects, each written up as an engineering case study: the problem, the architecture, the decisions that shaped it, and what proved difficult."
      />

      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} as="div" index={index}>
            <ProjectCard project={project} index={index} priority={index === 0} />
          </Reveal>
        ))}
      </div>

      {remaining > 0 ? (
        <div className="mt-16 flex justify-center">
          <ButtonLink href="/work" variant="secondary" size="lg">
            All work
            <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}
