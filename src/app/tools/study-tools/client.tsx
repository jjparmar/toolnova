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
      kicker={`${tools.length} study tools · Free to start`}
      tools={tools.map((t) => ({
        ...t,
        icon: iconMap[t.icon] || BookOpen,
      }))}
      relatedGuides={[
        {
          href: "/blog/homework-solver-best-practices",
          label: "Homework solver best practices",
        },
        {
          href: "/blog/build-exam-revision-system-30-minutes",
          label: "30-minute exam revision system",
        },
        {
          href: "/blog/flashcards-vs-notes-for-retention",
          label: "Flashcards vs notes",
        },
      ]}
    />
  );
}
