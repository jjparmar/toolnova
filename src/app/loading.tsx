export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] animate-pulse bg-background">
      <div className="bg-muted/30 border-b border-border/40 h-[280px] md:h-[360px]" />
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="h-6 w-28 bg-muted rounded-full mx-auto mb-4" />
        <div className="h-10 w-56 bg-muted rounded-lg mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-52 bg-card border border-border rounded-2xl shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
