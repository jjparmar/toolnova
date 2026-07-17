"use client";

import { BookA, FileSearch, Quote, Text, BookOpen } from "lucide-react";
import { CategoryToolsHub } from "@/components/shared/CategoryToolsHub";

const iconMap: Record<string, any> = {
  BookA,
  FileSearch,
  Quote,
  Text,
  BookOpen,
};

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
}

export function ExamPrepToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <CategoryToolsHub
      title="Exam prep tools"
      description="Vocabulary, synonyms, idioms, and language practice for competitive exams."
      kicker={`${tools.length} exam tools · Free`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || BookOpen,
      }))}
    />
  );
}
