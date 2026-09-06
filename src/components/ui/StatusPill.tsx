export function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-3 text-xs text-ink-soft">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}
