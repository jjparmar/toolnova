export default function BlogPostLoading() {
    return (
        <div className="min-h-screen animate-pulse bg-background">
            {/* Header skeleton */}
            <div className="py-6 bg-white border-b border-border/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-4 w-28 bg-muted rounded" />
                </div>
            </div>

            {/* Article header skeleton */}
            <div className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-5 w-24 bg-primary/10 rounded-full mb-6" />
                    <div className="h-10 w-3/4 bg-muted rounded mb-4" />
                    <div className="h-6 w-full bg-muted rounded mb-3" />
                    <div className="h-6 w-2/3 bg-muted rounded mb-6" />
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-muted rounded-full" />
                        <div>
                            <div className="h-4 w-32 bg-muted rounded mb-1" />
                            <div className="h-3 w-48 bg-muted rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {/* Cover image skeleton */}
                        <div className="mb-10 rounded-2xl bg-muted h-[400px]" />

                        {/* Article body skeleton */}
                        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
                            <div className="space-y-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={`p-${i}`} className="space-y-2">
                                        <div className="h-4 w-full bg-muted rounded" />
                                        <div className="h-4 w-5/6 bg-muted rounded" />
                                        <div className="h-4 w-4/5 bg-muted rounded" />
                                    </div>
                                ))}
                                <div className="h-7 w-2/5 bg-muted rounded mt-8" />
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={`q-${i}`} className="space-y-2">
                                        <div className="h-4 w-full bg-muted rounded" />
                                        <div className="h-4 w-3/4 bg-muted rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar skeleton */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-[300px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
