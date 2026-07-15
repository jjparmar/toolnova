"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaRocket,
  FaPen,
  FaCalculator,
  FaFileAlt,
} from "react-icons/fa";
import { SidebarAd } from "@/components/ads/AdUnit";

// Featured tools to display in sidebar
const featuredTools = [
  {
    name: "Text Summarizer",
    slug: "text-summarizer",
    icon: <FaFileAlt className="text-purple-500" />,
  },
  {
    name: "Essay Writer",
    slug: "essay-writer",
    icon: <FaPen className="text-blue-500" />,
  },
  {
    name: "Paraphraser",
    slug: "paraphraser",
    icon: <FaBookOpen className="text-green-500" />,
  },
  {
    name: "Grammar Fix",
    slug: "grammar-fix",
    icon: <FaRocket className="text-orange-500" />,
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    icon: <FaCalculator className="text-indigo-500" />,
  },
];

export default function BlogSidebar() {
  return (
    <aside className="space-y-8 sticky top-24">
      {/* Featured Tools */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
          <FaRocket className="text-purple-600" />
          Popular Tools
        </h3>
        <div className="space-y-3">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                {tool.icon}
              </div>
              <span className="text-slate-700 font-medium group-hover:text-purple-600 transition-colors">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/tools"
          className="flex items-center justify-center gap-2 mt-4 py-3 px-4 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/15 transition-colors"
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
