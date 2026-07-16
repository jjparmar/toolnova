"use client";

import Link from"next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaRocket,
  FaPen,
  FaCalculator,
  FaFileAlt,
} from"react-icons/fa";
import { SidebarAd } from"@/components/ads/AdUnit";

// Featured tools to display in sidebar
const featuredTools = [
  {
    name:"Text Summarizer",
    slug:"text-summarizer",
    icon: <FaFileAlt className="text-primary" />,
  },
  {
    name:"Essay Writer",
    slug:"essay-writer",
    icon: <FaPen className="text-sky-600" />,
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: <FaBookOpen className="text-emerald-600" />,
  },
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    icon: <FaRocket className="text-amber-600" />,
  },
  {
    name:"Word Counter",
    slug:"word-counter",
    icon: <FaCalculator className="text-blue-600" />,
  },
];

export default function BlogSidebar() {
  return (
    <aside className="sticky top-24 space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-heading mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <FaRocket className="text-primary" />
          Popular Tools
        </h3>
        <div className="space-y-3">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                {tool.icon}
              </div>
              <span className="font-medium text-foreground/80 transition-colors group-hover:text-primary">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/tools"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-3 font-semibold text-primary transition-colors hover:bg-primary/15"
        >
          View All Tools
          <FaArrowRight className="text-sm" />
        </Link>
      </div>

      {/* Sidebar Advertisement */}
      <SidebarAd />

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 rounded-2xl p-6 text-white border border-white/10">
        <h3 className="font-heading font-bold text-lg mb-2">Boost your productivity</h3>
        <p className="text-slate-300 text-sm mb-4">
          Try our AI-powered tools to write better, study smarter, and save
          time.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-800 rounded-lg font-bold text-sm hover:bg-teal-50 transition-colors"
        >
          Get started free
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </aside>
  );
}
