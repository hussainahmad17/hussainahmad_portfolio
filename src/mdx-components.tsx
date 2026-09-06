import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * MDX element mapping for articles.
 *
 * Typography is handled by the `.prose-article` class applied in the writing
 * layout, so this file only overrides behaviour that CSS cannot: internal links
 * routed through next/link, and external links marked as such.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const target = href ?? "";

      if (target.startsWith("/")) {
        return (
          <Link href={target} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a href={target} target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
