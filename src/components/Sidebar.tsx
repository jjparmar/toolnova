"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Image as ImageIcon, 
  Wrench, 
  Calculator, 
  Type, 
  FileOutput
} from "lucide-react";

const CATEGORIES = [
  { name: "Writing Tools", href: "/tools/writing-tools", icon: FileText },
  { name: "Study Tools", href: "/tools/study-tools", icon: BookOpen },
  { name: "Exam Prep", href: "/tools/exam-prep-tools", icon: GraduationCap },
  { name: "Career Tools", href: "/tools/career-tools", icon: Briefcase },
  { name: "Image & PDF", href: "/tools/image-pdf-tools", icon: ImageIcon },
  { name: "Utility Tools", href: "/tools/utility-tools", icon: Wrench },
  { name: "Calculators", href: "/tools/age-calculator", icon: Calculator }, /* using age-calculator as an example */
  { name: "Formatters", href: "/tools/case-converter", icon: Type },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 flex items-center gap-3 border-b border-border">
        <div className="relative h-8 w-8 overflow-hidden rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
          T
        </div>
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">
          Tool<span className="text-primary">Nova</span>
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <FileOutput className="h-4 w-4" />
          All Tools
        </Link>
        
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Categories
          </p>
        </div>
        
        {CATEGORIES.map((category) => {
          const isActive = pathname?.startsWith(category.href);
          const Icon = category.icon;
          return (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          © 2026 ToolNova
        </div>
      </div>
    </aside>
  );
}
