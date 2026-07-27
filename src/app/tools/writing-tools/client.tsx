"use client";

import {
  FileText,
  Edit3,
  BookOpen,
  Mic,
  Mail,
  MessageSquare,
  UserCircle,
  Instagram,
  Shield,
  Pencil,
} from "lucide-react";
import { CategoryToolsHub } from "@/components/shared/CategoryToolsHub";

const iconMap: Record<string, any> = {
  FileText,
  Edit3,
  BookOpen,
  Mic,
  Mail,
  MessageSquare,
  UserCircle,
  Instagram,
  Shield,
  Pencil,
};

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
}

export function WritingToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <CategoryToolsHub
      title="Writing tools"
      description="Create essays, emails, captions, and more with free AI writing assistants."
      kicker={`${tools.length} writing tools · Free to start`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || FileText,
      }))}
      relatedGuides={[
        {
          href: "/blog/ai-writing-workflow-students",
          label: "Ethical AI writing workflow",
        },
        {
          href: "/blog/grammar-checker-vs-human-editing",
          label: "Grammar vs human editing",
        },
        {
          href: "/blog/free-grammar-checker-tools-students-2026",
          label: "Best free grammar checkers",
        },
      ]}
    />
  );
}
