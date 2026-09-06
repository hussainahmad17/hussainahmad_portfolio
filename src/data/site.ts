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

  // Fallback origin, used when NEXT_PUBLIC_SITE_URL and the Vercel-provided
  // deployment URL are both unavailable. Overridden by NEXT_PUBLIC_SITE_URL.
  url: "https://hussainahmad.me",
};

/**
 * Normalises a candidate origin.
 *
 * Returns null for anything unusable — unset, empty, whitespace, or not a
 * parseable URL. An environment variable that exists but is blank is the
 * common case (`??` does not catch it), and it must not reach `new URL()`.
 *
 * Vercel supplies host names without a scheme, so one is added when missing.
 * `origin` is returned rather than the raw string, which drops any path and
 * trailing slash in one step.
 */
function normaliseOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withScheme).origin;
  } catch {
    return null;
  }
}

/**
 * Canonical origin, environment-aware.
 *
 * Order: an explicit NEXT_PUBLIC_SITE_URL wins; then the deployment URL Vercel
 * provides (the stable production domain for production builds, the ephemeral
 * deployment URL otherwise); then the configured fallback above. Every step is
 * validated, so this is always a usable absolute origin and never an empty
 * string — which would break `metadataBase`, the sitemap and robots.txt.
 */
const vercelOrigin =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_URL;

export const siteUrl =
  normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseOrigin(vercelOrigin) ??
  normaliseOrigin(site.url) ??
  "https://example.com";

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "AI Engineering", href: "/ai-engineering" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;
