import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/sections/ContactCta";
import { Tag } from "@/components/ui/Tag";
import { publishedArticles, plannedArticles } from "@/data/writing";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Engineering notes on AI agents, retrieval-augmented generation, structured output, evaluation and the parts of AI systems that break in production.",
  path: "/writing",
  keywords: ["AI engineering blog", "RAG article", "AI agent architecture"],
});

export default function WritingPage() {
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
            Writing
          </p>
          <h1 className="mt-6 max-w-3xl text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
            Engineering notes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Working notes on the parts of AI systems that are hard: control flow, retrieval
            quality, output contracts and evaluation.
          </p>
        </div>
      </div>

      <div className="container-page py-20 sm:py-24">
        {publishedArticles.length > 0 ? (
          <section aria-label="Published articles">
            <ul className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
              {publishedArticles.map((article) => (
                <li key={article.slug} className="bg-canvas">
                  <Link
                    href={`/writing/${article.slug}`}
                    className="group flex flex-col gap-3 p-7 transition-colors hover:bg-surface/60 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">
                      {article.date ? (
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      ) : null}
                      {article.readingTime ? <span>{article.readingTime}</span> : null}
                    </div>
                    <h2 className="flex items-center gap-3 text-[length:var(--text-h3)] leading-tight font-medium text-ink">
                      {article.title}
                      <span
                        aria-hidden="true"
                        className="text-accent transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-muted">{article.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section
            aria-label="Publishing status"
            className="rounded-2xl border border-line bg-surface/40 p-8 sm:p-10"
          >
            <h2 className="text-[length:var(--text-h3)] leading-tight font-medium">
              Nothing published yet
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              I&rsquo;d rather this section were empty than padded. The essays below are the
              ones I&rsquo;m actually working on — each one comes out of a problem I hit while
              building something on this site. Until they&rsquo;re finished, the case studies in{" "}
              <Link href="/work" className="text-accent underline underline-offset-4">
                Work
              </Link>{" "}
              carry the same reasoning in more depth.
            </p>
            <p className="mt-4 text-sm text-muted">
              Want to know when the first one lands?{" "}
              {site.email ? (
                <a
                  href={`mailto:${site.email}?subject=Notify%20me%20about%20new%20writing`}
                  className="text-accent underline underline-offset-4"
                >
                  Email me
                </a>
              ) : (
                <Link href="/contact" className="text-accent underline underline-offset-4">
                  Get in touch
                </Link>
              )}
              .
            </p>
          </section>
        )}

        {plannedArticles.length > 0 ? (
          <section aria-label="In progress" className="mt-16">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              In progress
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {plannedArticles.map((article) => (
                <li key={article.slug} className="border-t border-line pt-6">
                  <h3 className="text-base leading-snug font-medium text-ink-soft">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {article.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {article.topics.map((topic) => (
                      <li key={topic}>
                        <Tag>{topic}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <ContactCta />
    </>
  );
}
