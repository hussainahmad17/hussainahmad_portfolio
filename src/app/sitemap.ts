import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { projects } from "@/data/projects";
import { publishedArticles } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${siteUrl}/`, priority: 1, changeFrequency: "monthly" },
      { url: `${siteUrl}/work`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${siteUrl}/ai-engineering`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${siteUrl}/about`, priority: 0.7, changeFrequency: "yearly" },
      { url: `${siteUrl}/writing`, priority: 0.6, changeFrequency: "weekly" },
      { url: `${siteUrl}/contact`, priority: 0.6, changeFrequency: "yearly" },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: `${siteUrl}/writing/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : lastModified,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
