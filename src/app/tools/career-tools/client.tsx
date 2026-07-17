"use client";

import {
  FileText,
  User,
  Target,
  Calendar,
  CheckSquare,
  Linkedin,
  Briefcase,
} from "lucide-react";
import { CategoryToolsHub } from "@/components/shared/CategoryToolsHub";

const iconMap: Record<string, any> = {
  FileText,
  User,
  Target,
  Calendar,
  CheckSquare,
  Linkedin,
  Briefcase,
};

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
}

export function CareerToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <CategoryToolsHub
      title="Career tools"
      description="Resume bullets, cover letters, interviews, and LinkedIn — built for job seekers."
      kicker={`${tools.length} career tools · Free`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || Briefcase,
      }))}
    />
  );
}
