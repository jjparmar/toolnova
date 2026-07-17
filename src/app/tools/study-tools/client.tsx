"use client";

import {
  BookOpen,
  ClipboardList,
  FileQuestion,
  Brain,
  Lightbulb,
  HelpCircle,
  Calculator,
  FlaskConical,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { CategoryToolsHub } from "@/components/shared/CategoryToolsHub";

const iconMap: Record<string, any> = {
  BookOpen,
  ClipboardList,
  FileQuestion,
  Brain,
  Lightbulb,
  HelpCircle,
  Calculator,
  FlaskConical,
  Calendar,
  GraduationCap,
};

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
}

export function StudyToolsClient({ tools }: { tools: Tool[] }) {
  return (
    <CategoryToolsHub
      title="Study tools"
      description="Homework help, notes, quizzes, and flashcards — free AI for learning faster."
      kicker={`${tools.length} study tools · Free`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || BookOpen,
      }))}
    />
  );
}
