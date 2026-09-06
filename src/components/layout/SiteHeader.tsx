"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render is the
  // recommended pattern here — an effect would cause a cascading re-render.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  // Lock scroll and allow Escape to dismiss while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-6 sm:h-18">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-md border border-line-strong bg-surface font-mono text-[0.6875rem] font-medium tracking-tight text-accent transition-colors group-hover:border-accent/50"
            >
              {site.monogram}
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-medium text-ink">{site.name}</span>
              <span className="mt-1 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
                {site.title}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-canvas transition-colors hover:bg-accent-soft md:inline-flex"
            >
              Let&rsquo;s talk
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink md:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/*
        Collapsed with a grid-rows transition rather than an animation library.
        `inert` removes the links from focus order and the accessibility tree
        while closed, which `display: none` would do at the cost of the animation.
      */}
      <div
        id="mobile-navigation"
        inert={!open}
        className={cn(
          "grid overflow-hidden border-t transition-[grid-template-rows,opacity,border-color] duration-300 ease-[var(--ease-out-quint)] md:hidden",
          open
            ? "grid-rows-[1fr] border-line bg-canvas opacity-100"
            : "grid-rows-[0fr] border-transparent opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-lg",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-xs text-faint">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 flex h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-canvas"
            >
              Let&rsquo;s talk
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
