import Link from "next/link";
import { ContactCta } from "@/components/sections/ContactCta";

/**
 * Layout for MDX articles.
 *
 * To publish an article:
 *   1. Create `src/app/writing/(articles)/<slug>/page.mdx`
 *   2. Export `metadata` from it (title, description)
 *   3. Add the matching entry to `src/data/writing.ts` with `status: "published"`
 *
 * Step 3 is what makes it appear in the index — the registry is the source of truth.
 */
export default function ArticleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <article className="container-page pt-32 pb-20 sm:pt-40 sm:pb-24">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>
          All writing
        </Link>

        <div className="prose-article mt-10 max-w-2xl">{children}</div>
      </article>

      <ContactCta />
    </>
  );
}
