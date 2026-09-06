import Link from "next/link";
import { navigation, site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const externalLinks = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    site.twitter ? { label: "X", href: site.twitter } : null,
    site.resumeUrl ? { label: "Résumé", href: site.resumeUrl } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <footer className="border-t border-line">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-base font-medium text-ink">{site.name}</p>
            <p className="mt-1 font-mono text-xs tracking-[0.14em] text-accent uppercase">
              {site.title}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            {site.availability ? (
              <p className="mt-4 text-sm text-ink-soft">{site.availability}</p>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[{ label: "Home", href: "/" }, ...navigation, { label: "Contact", href: "/contact" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    Email
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs text-faint">
            {site.location} · {site.timezone}
          </p>
        </div>
      </div>
    </footer>
  );
}
