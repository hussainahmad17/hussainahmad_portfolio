import type { SiteConfig } from "@/types";

/**
 * Identity and contact details.
 *
 * Values sourced from the public GitHub profile at github.com/hussainahmad17.
 * Fields set to `null` are not yet supplied — see PROJECT_INFO.md. Every surface
 * that consumes them hides itself rather than rendering a placeholder.
 */
export const site: SiteConfig = {
  name: "Hussain Ahmad",
  shortName: "Hussain",
  monogram: "HA",
  title: "AI Software Engineer",
  tagline:
    "AI Software Engineer building intelligent, production-ready software and autonomous AI systems.",
  description:
    "I design and build AI agents, RAG systems, LLM applications and the full-stack software around them — from architecture through deployment and monitoring.",
  location: "Faisalabad, Pakistan",
  timezone: "PKT (UTC+5)",

  // [REQUIRED] Add a real address here to enable the contact CTA and mailto links.
  email: null,

  github: "https://github.com/hussainahmad17",
  linkedin: "https://www.linkedin.com/in/hussainahmaddev/",
  twitter: null,

  // [REQUIRED] Place a PDF at public/hussain-ahmad-resume.pdf, then set the path here.
  resumeUrl: null,

  // [REQUIRED — optional] e.g. "/hussain-ahmad.jpg"
  photo: null,

  availability: "Open to AI engineering roles and freelance work",

  // Overridden by NEXT_PUBLIC_SITE_URL in production.
  url: "https://hussainahmad.dev",
};

/** Canonical origin, environment-aware. Never hard-codes localhost into output. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : site.url)
).replace(/\/$/, "");

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "AI Engineering", href: "/ai-engineering" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;
