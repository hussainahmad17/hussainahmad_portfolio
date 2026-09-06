import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

const baseKeywords = [
  "AI Software Engineer",
  "AI Engineer",
  "AI Agent Developer",
  "LLM Engineer",
  "RAG Engineer",
  "AI Automation Engineer",
  "Full-stack AI developer",
  site.name,
];

/** Builds page metadata with canonical, Open Graph and Twitter cards from one input. */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${site.name} — ${site.title}`,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: site.twitter ?? undefined,
    },
  };
}
