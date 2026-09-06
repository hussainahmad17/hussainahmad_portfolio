"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — multiplied by 60ms, capped so long lists stay responsive. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Scroll reveal.
 *
 * An IntersectionObserver toggles a class; the transition itself is CSS. This
 * replaced an animation library that cost ~133 KB of JavaScript for an effect
 * the platform already provides.
 *
 * Reduced motion is handled in CSS (`.reveal` is always visible under
 * `prefers-reduced-motion: reduce`), and a `noscript` rule in the layout keeps
 * content visible if JavaScript never runs.
 */
export function Reveal({ children, index = 0, className, as: Tag = "div" }: RevealProps) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // A callback ref rather than an effect: the observer attaches exactly when the
  // node does, with no extra render pass.
  const attach = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
          observerRef.current = null;
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return (
    <Tag
      ref={attach}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${Math.min(index, 6) * 60}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
