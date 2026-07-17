import { Breadcrumbs } from"@/components/Breadcrumbs";
import { GlobalRelatedTools } from"@/components/GlobalRelatedTools";
import { MultiplexAd } from"@/components/ads/AdUnit";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs />
        {children}
      </div>
      <GlobalRelatedTools />
      {/* Ad — Multiplex (footer recommendations) */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <MultiplexAd />
      </div>
    </div>
  );
}
