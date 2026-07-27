"use client";

import { Hash, Type, AlignLeft, FileText, Calculator, Wrench } from "lucide-react";
import { CategoryToolsHub } from "@/components/shared/CategoryToolsHub";

const iconMap: Record<string, any> = {
  Hash,
  Type,
  AlignLeft,
  FileText,
  Calculator,
  Wrench,
};

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
}

export function UtilityToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <CategoryToolsHub
      title="Utility tools"
      description="Word counters, case converters, calculators, and everyday helpers."
      kicker={`${tools.length} utility tools · Free forever (browser tools)`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || Wrench,
      }))}
    />
  );
}
