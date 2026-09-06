import { site, siteUrl } from "@/data/site";
import { projects } from "@/data/projects";

/**
 * JSON-LD. Only facts that exist in the data layer are emitted — no invented
 * employment, credentials or ratings.
 */
export function personSchema() {
  const sameAs = [site.github, site.linkedin, site.twitter].filter(
    (value): value is string => Boolean(value),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    jobTitle: site.title,
    description: site.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
    sameAs,
    knowsAbout: [
      "Artificial Intelligence",
      "AI Agents",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "Software Architecture",
      "Full-Stack Development",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.title}`,
    url: siteUrl,
    description: site.description,
    author: { "@type": "Person", name: site.name, url: siteUrl },
  };
}

export function projectSchema(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    codeRepository: project.githubUrl ?? undefined,
    programmingLanguage: project.primaryStack,
    author: { "@type": "Person", name: site.name, url: siteUrl },
  };
}
