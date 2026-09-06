/**
 * Content types for the portfolio.
 *
 * Everything a visitor reads is typed here and authored in `src/data`.
 * UI components never hard-code personal facts.
 */

export type ExternalLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  monogram: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  timezone: string;
  /** Null until a real address is supplied. Contact surfaces degrade gracefully. */
  email: string | null;
  github: string;
  linkedin: string;
  /** Null hides the link entirely rather than rendering a dead anchor. */
  twitter: string | null;
  resumeUrl: string | null;
  photo: string | null;
  availability: string | null;
  /** Canonical origin. Overridden in production by NEXT_PUBLIC_SITE_URL. */
  url: string;
};

/** A single layer of an architecture diagram, rendered top to bottom. */
export type ArchitectureLayer = {
  /** Left-hand rail label, e.g. "Retrieval". */
  label: string;
  nodes: {
    title: string;
    detail?: string;
    /** Visually emphasises the node as the AI/decision core of the system. */
    accent?: boolean;
  }[];
};

export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type ProjectStatus = "live" | "in-development" | "archived";

export type Project = {
  slug: string;
  title: string;
  /** One line, outcome-first. Shown on cards and in metadata. */
  summary: string;
  /** Domain label, e.g. "Retrieval-Augmented Generation". */
  category: string;
  /** Short, scannable capability chips on the project card. */
  capabilities: string[];
  /** Verified technologies, grouped for the case study. */
  stack: { group: string; items: string[] }[];
  /** Flat list used for card chips and metadata keywords. */
  primaryStack: string[];
  status: ProjectStatus;
  year: string;
  featured: boolean;
  /** Case study body. Headings are numbered automatically. */
  overview: string;
  problem: CaseStudySection;
  businessContext: CaseStudySection;
  solution: CaseStudySection;
  architecture: {
    caption: string;
    layers: ArchitectureLayer[];
  };
  aiWorkflow?: CaseStudySection;
  implementation: CaseStudySection;
  challenges: { title: string; body: string }[];
  decisions: { decision: string; rationale: string }[];
  /** Empty array renders an honest "not yet measured" note instead of invented numbers. */
  results: { label: string; value: string }[];
  demoUrl: string | null;
  githubUrl: string | null;
  images: { src: string; alt: string }[];
  /** Rendered verbatim as a disclosure note on the case study. Used for scope honesty. */
  note?: string;
};

export type Capability = {
  id: string;
  title: string;
  summary: string;
  /** Concrete things built, not adjectives. */
  practices: string[];
  /** Named tools actually used. */
  tools: string[];
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export type Principle = {
  title: string;
  body: string;
};

export type StackGroup = {
  group: string;
  note: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type ArticleStatus = "published" | "in-progress";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  status: ArticleStatus;
  /** ISO date. Only meaningful for published articles. */
  date?: string;
  readingTime?: string;
  topics: string[];
};
