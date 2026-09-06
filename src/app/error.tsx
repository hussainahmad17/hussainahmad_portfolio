"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Route-level error boundary. Renders a usable page rather than a blank screen,
 * and never surfaces internal error details to a visitor.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col justify-center py-32">
      <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
        Error
      </p>
      <h1 className="mt-5 max-w-2xl text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
        Something went wrong on this page
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        This one is on me. Reloading usually clears it — if it doesn&rsquo;t, I&rsquo;d
        genuinely like to know.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-faint">Reference: {error.digest}</p>
      ) : null}
      <div className="mt-9 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
