import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GlobalRelatedTools } from "@/components/GlobalRelatedTools";
import { MultiplexAd } from "@/components/ads/AdUnit";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs />
        {children}
      </div>
      <GlobalRelatedTools />
      {/* Reserve space to reduce CLS when ad fills */}
      <div className="container mx-auto min-h-[120px] px-4 py-8 md:px-6">
        <MultiplexAd />
      </div>
    </div>
  );
}
