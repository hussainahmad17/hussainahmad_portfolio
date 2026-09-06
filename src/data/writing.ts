import type { Article } from "@/types";

/**
 * Article registry.
 *
 * `published` entries must have a matching MDX page at
 * `src/app/writing/(articles)/<slug>/page.mdx`. Entries marked `in-progress`
 * render as a non-clickable planned entry — no fake bylines, no dead links.
 *
 * There are deliberately no published articles yet.
 */
export const articles: Article[] = [
  {
    slug: "designing-reliable-ai-agents",
    title: "Designing Reliable AI Agents",
    summary:
      "Why agent failures are almost always control-flow failures, and what changes when you model an agent as an explicit graph rather than a prompt loop.",
    status: "in-progress",
    topics: ["Agents", "Reliability", "LangGraph"],
  },
  {
    slug: "production-rag-systems",
    title: "What Breaks in Production RAG",
    summary:
      "Chunk boundaries, embedding mismatches, stale corpora and unverifiable citations — the four failures that account for most bad answers, and how each one is fixed.",
    status: "in-progress",
    topics: ["RAG", "Retrieval", "Vector search"],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: Choosing on Constraints, Not Preference",
    summary:
      "A decision framework based on how often knowledge changes, whether answers must be attributable, and what the cost of being wrong is.",
    status: "in-progress",
    topics: ["RAG", "Fine-tuning", "Architecture"],
  },
  {
    slug: "structured-output-boundaries",
    title: "Treat Model Output as an Untrusted Interface",
    summary:
      "Schema-constrained responses move an entire class of parsing bugs from deep inside application code to a single validation error at the boundary.",
    status: "in-progress",
    topics: ["LLM applications", "Type safety", "Structured output"],
  },
  {
    slug: "evaluating-ai-systems",
    title: "Evaluating AI Systems Without a Ground Truth",
    summary:
      "How to build a question set, establish a retrieval baseline and make prompt changes provable instead of anecdotal.",
    status: "in-progress",
    topics: ["Evaluation", "Testing", "Observability"],
  },
  {
    slug: "long-term-agent-memory",
    title: "Long-Term Memory for AI Agents",
    summary:
      "What an agent should remember between sessions, where that memory should live, and why forgetting has to be designed as deliberately as recall.",
    status: "in-progress",
    topics: ["Agents", "Memory", "Architecture"],
  },
];

export const publishedArticles = articles.filter(
  (article) => article.status === "published",
);

export const plannedArticles = articles.filter(
  (article) => article.status === "in-progress",
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
