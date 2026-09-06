import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
      />
      <div className="container-page relative flex min-h-[70vh] flex-col justify-center py-32">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-5 max-w-2xl text-[length:var(--text-h1)] leading-[1.05] font-medium text-balance-tight">
          That page doesn&rsquo;t exist
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. The work and the
          engineering notes are both a click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View the work
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-muted">
          Looking for something specific?{" "}
          <Link href="/contact" className="text-accent underline underline-offset-4">
            Ask me
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
