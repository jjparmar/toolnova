export default function ToolsLoading() {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-16 animate-pulse">
            <div className="h-8 w-48 bg-slate-200 rounded-full mb-4" />
            <div className="h-4 w-96 bg-slate-100 rounded mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-48 bg-white rounded-2xl shadow-sm border border-slate-100" />
                ))}
            </div>
        </div>
    );
}