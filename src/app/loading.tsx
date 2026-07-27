export default function Loading() {
  return (
    <div
      className="w-full min-h-[60vh] bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="motion-safe:animate-pulse">
        <div className="h-[200px] border-b border-border/40 bg-muted/40 md:h-[280px]" />
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
          <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-muted" />
          <div className="mx-auto mb-10 h-9 w-64 max-w-full rounded-lg bg-muted" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl border border-border bg-card shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
