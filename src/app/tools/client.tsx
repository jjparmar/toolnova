"use client";

import { useState, useMemo, useEffect, useRef } from"react";
import Link from"next/link";
import {
  GraduationCap,
  Pencil,
  BookOpen,
  Image as ImageIcon,
  Wrench,
  Briefcase,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  TrendingUp,
  ShieldCheck,
  Rocket,
  Search,
  Filter,
  Calendar,
  X,
  Users,
  Award,
  Clock,
  Globe,
  Youtube,
  ShieldAlert,
} from"lucide-react";
import { TOOL_COUNT_LABEL } from"@/data/tools";

// Tool data with categories
const ALL_TOOLS = [
  // Study Tools
  {
    name:"Homework Solver",
    slug:"homework-solver",
    category:"Study Tools",
    description:"Get step-by-step solutions to homework problems across math, science, and more",
    icon: BookOpen,
    color:"text-blue-500",
    gradient:"from-blue-500 to-indigo-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    category:"Study Tools",
    description:"Generate comprehensive study notes from any topic instantly",
    icon: BookOpen,
    color:"text-indigo-500",
    gradient:"from-indigo-500 to-violet-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"MCQ Generator",
    slug:"mcq-generator",
    category:"Study Tools",
    description:"Create multiple choice questions for exam preparation",
    icon: Star,
    color:"text-purple-500",
    gradient:"from-purple-500 to-fuchsia-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    category:"Study Tools",
    description:"Create digital flashcards for quick memorization",
    icon: Zap,
    color:"text-yellow-500",
    gradient:"from-yellow-500 to-amber-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Quiz Generator",
    slug:"quiz-generator",
    category:"Study Tools",
    description:"Generate practice quizzes on any subject instantly",
    icon: Sparkles,
    color:"text-green-500",
    gradient:"from-green-500 to-emerald-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Doubt Solver",
    slug:"doubt-solver",
    category:"Study Tools",
    description:"Get instant answers to your study questions",
    icon: GraduationCap,
    color:"text-cyan-500",
    gradient:"from-cyan-500 to-blue-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Formula Generator",
    slug:"formula-generator",
    category:"Study Tools",
    description:"Generate formulas for math and science topics",
    icon: Wrench,
    color:"text-orange-500",
    gradient:"from-orange-500 to-red-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Concept Explainer",
    slug:"concept-explainer",
    category:"Study Tools",
    description:"Break down complex topics into simple explanations",
    icon: BookOpen,
    color:"text-teal-500",
    gradient:"from-teal-500 to-cyan-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Diagram Explainer",
    slug:"diagram-explainer",
    category:"Study Tools",
    description:"Explain diagrams and visual concepts clearly",
    icon: ImageIcon,
    color:"text-pink-500",
    gradient:"from-pink-500 to-rose-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Chapter Summary",
    slug:"chapter-summary",
    category:"Study Tools",
    description:"Summarize chapter content quickly and accurately",
    icon: BookOpen,
    color:"text-violet-500",
    gradient:"from-violet-500 to-purple-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Revision Planner",
    slug:"revision-planner",
    category:"Study Tools",
    description:"Create structured revision schedules",
    icon: Calendar,
    color:"text-blue-600",
    gradient:"from-blue-600 to-indigo-700",
    isNew: false,
    isPopular: false,
  },

  // Writing Tools
  {
    name:"Essay Writer",
    slug:"essay-writer",
    category:"Writing Tools",
    description:"Generate structured, well-researched essays on any topic",
    icon: Pencil,
    color:"text-purple-500",
    gradient:"from-purple-500 to-pink-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Paragraph Generator",
    slug:"paragraph-generator",
    category:"Writing Tools",
    description:"Create paragraphs for various purposes",
    icon: Pencil,
    color:"text-indigo-500",
    gradient:"from-indigo-500 to-blue-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Story Generator",
    slug:"story-generator",
    category:"Writing Tools",
    description:"Create engaging stories with AI creativity",
    icon: BookOpen,
    color:"text-green-500",
    gradient:"from-green-500 to-teal-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Speech Writer",
    slug:"speech-writer",
    category:"Writing Tools",
    description:"Write compelling speeches for any occasion",
    icon: Sparkles,
    color:"text-pink-500",
    gradient:"from-pink-500 to-rose-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Email Writer",
    slug:"email-writer",
    category:"Writing Tools",
    description:"Draft professional emails in seconds",
    icon: Sparkles,
    color:"text-blue-500",
    gradient:"from-blue-500 to-cyan-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    category:"Writing Tools",
    description:"Fix grammar and improve writing quality instantly",
    icon: Pencil,
    color:"text-red-500",
    gradient:"from-red-500 to-orange-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    category:"Writing Tools",
    description:"Rewrite text while keeping the original meaning",
    icon: Pencil,
    color:"text-cyan-500",
    gradient:"from-cyan-500 to-blue-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Resume Bullets",
    slug:"resume-bullets",
    category:"Writing Tools",
    description:"Generate impactful ATS-optimized resume bullet points",
    icon: Pencil,
    color:"text-yellow-500",
    gradient:"from-yellow-500 to-orange-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Bio Generator",
    slug:"bio-generator",
    category:"Writing Tools",
    description:"Create social media bios instantly",
    icon: Sparkles,
    color:"text-purple-600",
    gradient:"from-purple-600 to-violet-700",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Caption Generator",
    slug:"caption-generator",
    category:"Writing Tools",
    description:"Generate catchy social media captions",
    icon: Sparkles,
    color:"text-pink-600",
    gradient:"from-pink-600 to-rose-700",
    isNew: false,
    isPopular: false,
  },

  // Image & PDF Tools
  {
    name:"Merge PDF",
    slug:"merge-pdf",
    category:"Image & PDF Tools",
    description:"Combine multiple PDFs into one file seamlessly",
    icon: ImageIcon,
    color:"text-red-500",
    gradient:"from-red-500 to-rose-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Split PDF",
    slug:"split-pdf",
    category:"Image & PDF Tools",
    description:"Extract pages, pick pages, or download all as ZIP",
    icon: ImageIcon,
    color:"text-orange-500",
    gradient:"from-orange-500 to-amber-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Compress PDF",
    slug:"compress-pdf",
    category:"Image & PDF Tools",
    description:"Shrink PDF file size for email and upload portals",
    icon: ImageIcon,
    color:"text-rose-500",
    gradient:"from-rose-500 to-red-600",
    isNew: true,
    isPopular: true,
  },
  {
    name:"Reorder PDF",
    slug:"reorder-pdf",
    category:"Image & PDF Tools",
    description:"Drag page thumbnails to rearrange order",
    icon: ImageIcon,
    color:"text-indigo-500",
    gradient:"from-indigo-500 to-blue-600",
    isNew: true,
    isPopular: true,
  },
  {
    name:"Image to PDF",
    slug:"image-to-pdf",
    category:"Image & PDF Tools",
    description:"Convert images to PDF documents",
    icon: ImageIcon,
    color:"text-amber-500",
    gradient:"from-amber-500 to-yellow-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Image Compressor",
    slug:"image-compressor",
    category:"Image & PDF Tools",
    description:"Reduce image file size without quality loss",
    icon: ImageIcon,
    color:"text-yellow-500",
    gradient:"from-yellow-500 to-lime-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"JPG to PNG",
    slug:"jpg-to-png",
    category:"Image & PDF Tools",
    description:"Convert JPG images to PNG format",
    icon: ImageIcon,
    color:"text-green-500",
    gradient:"from-green-500 to-emerald-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"PNG to JPG",
    slug:"png-to-jpg",
    category:"Image & PDF Tools",
    description:"Convert PNG images to JPG format",
    icon: ImageIcon,
    color:"text-teal-500",
    gradient:"from-teal-500 to-green-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Crop Image",
    slug:"image-crop",
    category:"Image & PDF Tools",
    description:"Drag to select any region and crop free — aspect presets included",
    icon: ImageIcon,
    color:"text-violet-500",
    gradient:"from-violet-500 to-fuchsia-600",
    isNew: true,
    isPopular: true,
  },
  {
    name:"Image Resizer",
    slug:"resize-image",
    category:"Image & PDF Tools",
    description:"Resize images by exact pixels or percentage without quality loss",
    icon: ImageIcon,
    color:"text-purple-500",
    gradient:"from-purple-500 to-violet-600",
    isNew: false,
    isPopular: true,
  },

  // Utility Tools
  {
    name:"Word Counter",
    slug:"word-counter",
    category:"Utility Tools",
    description:"Count words, characters, sentences & paragraphs",
    icon: TrendingUp,
    color:"text-cyan-500",
    gradient:"from-cyan-500 to-blue-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Character Counter",
    slug:"character-counter",
    category:"Utility Tools",
    description:"Count characters with social media limits",
    icon: Wrench,
    color:"text-blue-500",
    gradient:"from-blue-500 to-indigo-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Case Converter",
    slug:"case-converter",
    category:"Utility Tools",
    description:"Convert text to different cases instantly",
    icon: Wrench,
    color:"text-purple-500",
    gradient:"from-purple-500 to-violet-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Text Summarizer",
    slug:"text-summarizer",
    category:"Utility Tools",
    description:"Summarize long texts into key points",
    icon: TrendingUp,
    color:"text-indigo-500",
    gradient:"from-indigo-500 to-purple-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Text Simplifier",
    slug:"text-simplifier",
    category:"Utility Tools",
    description:"Simplify complex text for easy reading",
    icon: Wrench,
    color:"text-pink-500",
    gradient:"from-pink-500 to-fuchsia-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Age Calculator",
    slug:"age-calculator",
    category:"Utility Tools",
    description:"Calculate age from date of birth",
    icon: Calendar,
    color:"text-green-500",
    gradient:"from-green-500 to-teal-600",
    isNew: false,
    isPopular: false,
  },

  // Career Tools
  {
    name:"Cover Letter Writer",
    slug:"cover-letter-writer",
    category:"Career Tools",
    description:"Generate tailored, professional cover letters",
    icon: Briefcase,
    color:"text-amber-500",
    gradient:"from-amber-500 to-orange-600",
    isNew: false,
    isPopular: true,
  },
  {
    name:"Interview Generator",
    slug:"interview-generator",
    category:"Career Tools",
    description:"Practice with AI-generated interview questions",
    icon: Briefcase,
    color:"text-blue-500",
    gradient:"from-blue-500 to-indigo-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Goal Planner",
    slug:"goal-planner",
    category:"Career Tools",
    description:"Break down goals into actionable steps",
    icon: Rocket,
    color:"text-yellow-500",
    gradient:"from-yellow-500 to-amber-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Timetable Generator",
    slug:"timetable-generator",
    category:"Career Tools",
    description:"Create structured weekly schedules",
    icon: Calendar,
    color:"text-purple-500",
    gradient:"from-purple-500 to-pink-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"To-Do List Generator",
    slug:"todo-list-generator",
    category:"Career Tools",
    description:"Turn goals into organized task lists",
    icon: ShieldCheck,
    color:"text-green-500",
    gradient:"from-green-500 to-emerald-600",
    isNew: false,
    isPopular: false,
  },

  // Exam Prep Tools
  {
    name:"Vocabulary Builder",
    slug:"vocabulary-builder",
    category:"Exam Prep Tools",
    description:"Learn new words with meanings and examples",
    icon: BookOpen,
    color:"text-green-500",
    gradient:"from-green-500 to-lime-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Synonym Finder",
    slug:"synonym-finder",
    category:"Exam Prep Tools",
    description:"Find synonyms for any word instantly",
    icon: Search,
    color:"text-emerald-500",
    gradient:"from-emerald-500 to-teal-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Antonym Finder",
    slug:"antonym-finder",
    category:"Exam Prep Tools",
    description:"Find antonyms for any word",
    icon: Search,
    color:"text-teal-500",
    gradient:"from-teal-500 to-cyan-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"Idioms & Phrases",
    slug:"idioms-phrases",
    category:"Exam Prep Tools",
    description:"Learn idioms with meanings and examples",
    icon: BookOpen,
    color:"text-cyan-500",
    gradient:"from-cyan-500 to-blue-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"One Word Substitution",
    slug:"one-word-substitution",
    category:"Exam Prep Tools",
    description:"Find single words for phrases",
    icon: Pencil,
    color:"text-blue-500",
    gradient:"from-blue-500 to-indigo-600",
    isNew: false,
    isPopular: false,
  },
  {
    name:"LinkedIn Optimizer",
    slug:"linkedin-optimizer",
    category:"Career Tools",
    description:"Optimize your LinkedIn profile for recruiters",
    icon: Users,
    color:"text-blue-600",
    gradient:"from-blue-600 to-cyan-600",
    isNew: true,
    isPopular: false,
  },
  {
    name:"YouTube Summarizer",
    slug:"youtube-summarizer",
    category:"Study Tools",
    description:"Get instant AI summaries from any YouTube video URL.",
    icon: Youtube,
    color:"text-red-500",
    gradient:"from-red-500 to-rose-600",
    isNew: true,
    isPopular: true,
  },
  {
    name:"AI Plagiarism Checker",
    slug:"plagiarism-checker",
    category:"Writing Tools",
    description:"Scan your essay for AI-generated footprints and plagiarism.",
    icon: ShieldAlert,
    color:"text-indigo-500",
    gradient:"from-indigo-500 to-blue-600",
    isNew: true,
    isPopular: true,
  },
];

const categories = [
  {
    name:"Study Tools",
    slug:"study-tools",
    description:"AI-powered tools for homework, notes, and exams.",
    icon: GraduationCap,
    gradient:"from-blue-500 to-indigo-600",
  },
  {
    name:"Writing Tools",
    slug:"writing-tools",
    description:"Create essays, stories, and professional content.",
    icon: Pencil,
    gradient:"from-purple-500 to-pink-600",
  },
  {
    name:"Image & PDF Tools",
    slug:"image-pdf-tools",
    description:"Manage PDFs and process images with ease.",
    icon: ImageIcon,
    gradient:"from-red-500 to-orange-600",
  },
  {
    name:"Utility Tools",
    slug:"utility-tools",
    description:"Calculators and text processing utilities.",
    icon: Wrench,
    gradient:"from-cyan-500 to-blue-600",
  },
  {
    name:"Career Tools",
    slug:"career-tools",
    description:"Cover letters, interviews, and career planning.",
    icon: Briefcase,
    gradient:"from-amber-500 to-yellow-600",
  },
  {
    name:"Exam Prep Tools",
    slug:"exam-prep-tools",
    description:"Vocabulary, synonyms, and language learning.",
    icon: BookOpen,
    gradient:"from-green-500 to-emerald-600",
  },
];

const heroStats = [
  { icon: Zap, value: TOOL_COUNT_LABEL, label: "Tools" },
  { icon: Globe, value: "Free", label: "To start" },
  { icon: ShieldCheck, value: "Local", label: "PDF privacy" },
  { icon: Clock, value: "Live", label: "AI stream" },
];

export function ToolsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K for search; Escape clears
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearchQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.slug.includes(q) ||
        tool.category.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const popularTools = useMemo(
    () => ALL_TOOLS.filter((t) => t.isPopular),
    []
  );

  const toolCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_TOOLS.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-12 text-center md:pb-12 md:pt-14">
          <div className="section-kicker mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>All tools · Free to open · No sign-up</span>
          </div>

          <h1 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Every tool you need — free
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Search writing, study, PDF, image, and career tools. Built for speed
            and clarity.
          </p>

          <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-5 md:gap-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-heading text-lg font-extrabold leading-tight text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <label htmlFor="tools-catalog-search" className="sr-only">
              Search all tools
            </label>
            <div className="input-surface relative flex items-center rounded-xl">
              <Search className="ml-4 mr-2 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <input
                id="tools-catalog-search"
                ref={searchRef}
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools… (essay, pdf, resume, compress)"
                className="flex-1 border-none bg-transparent py-3.5 text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-2 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <div className="mr-3 hidden items-center rounded-md border border-border bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground md:flex">
                  Ctrl + K
                </div>
              )}
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Tip: try “compress”, “grammar”, or “flashcard”
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-6 py-10 md:py-12">
          {/* Sticky category filter */}
          <div className="sticky top-[68px] z-20 -mx-2 mb-10 border-b border-border/60 bg-background/90 px-2 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
            <div
              className="flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Filter tools by category"
            >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              className={`cat-pill ${
                activeCategory === "All" ? "cat-pill-active" : ""
              }`}
            >
              All ({ALL_TOOLS.length})
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.name}
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`cat-pill ${
                  activeCategory === cat.name ? "cat-pill-active" : ""
                }`}
              >
                <cat.icon className="h-4 w-4" aria-hidden />
                <span>{cat.name.replace(" Tools", "")}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.name
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {toolCountByCategory[cat.name] || 0}
                </span>
              </button>
            ))}
            </div>
          </div>

        {/* Featured / Popular Tools Banner (only when no search/filter) */}
        {!searchQuery && activeCategory === "All" && (
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Award className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-extrabold text-foreground">
                Popular tools
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTools.slice(0, 4).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="surface-card group flex items-center gap-4 p-5"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tool.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground">
              {activeCategory ==="All" ?"All Tools" : activeCategory}
              <span className="text-muted-foreground font-medium ml-2 text-base">
                ({filteredTools.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div key={tool.slug} className="h-full">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="surface-card group flex h-full flex-col p-6"
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                        >
                          <tool.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.isNew && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                              New
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {tool.category.replace(" Tools","")}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                        {tool.description}
                      </p>

                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all pt-3 border-t border-border">
                        <span>Open Tool</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
              <div className="col-span-full text-center py-20">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" aria-hidden />
                </div>
                <h3 className="font-heading mb-2 text-2xl font-bold text-foreground">
                  No tools match{searchQuery ? ` “${searchQuery}”` : ""}
                </h3>
                <p className="mx-auto mb-6 max-w-md text-muted-foreground">
                  Try another keyword, or jump to a category below.
                </p>
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                  {["pdf", "essay", "homework", "image", "resume"].map((hint) => (
                    <button
                      key={hint}
                      type="button"
                      onClick={() => {
                        setActiveCategory("All");
                        setSearchQuery(hint);
                        searchRef.current?.focus();
                      }}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Show all tools
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        {!searchQuery && activeCategory ==="All" && (
          <div className="mb-24 animate-fade-in">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Filter className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Browse by Category
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/tools/${category.slug}`}
                  className="surface-card group p-6 text-center"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <category.icon className="h-7 w-7" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-1.5 text-lg">
                    {category.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {toolCountByCategory[category.name] || 0} tools
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO Text Block for AdSense / Thin Content Prevention */}
        <section className="mt-24 border-t border-border py-12">
          <div className="content-panel max-w-4xl mx-auto p-7 md:p-10">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">About ToolNova&apos;s Free AI Tool Library</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to the internet's most comprehensive collection of browser-based productivity utilities. Our library features over 50 specialized tools designed to streamline the workflows of students, educators, writers, and digital professionals. Unlike complex enterprise software suites that require expensive subscriptions and steep learning curves, ToolNova offers specialized, single-purpose micro-applications that solve immediate problems instantly.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our curated categories cover every aspect of modern digital life. For academic success, our <strong>Study Tools</strong> and <strong>Exam Prep Tools</strong> include advanced flashcard generators, concept explainers, and math formula creators that leverage advanced AI to simplify complex learning objectives. Digital creators and marketers rely heavily on our <strong>Writing Tools</strong>—including AI essay generators, email drafters, and semantic paraphrasers—to produce high-quality written content efficiently.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Furthermore, we understand the critical importance of document and media management. Our robust suite of <strong>Image & PDF Tools</strong> allows users to merge, split, compress, and convert files securely directly within their browser, ensuring sensitive data never leaves their local device permanently. For job seekers, our <strong>Career Tools</strong> provide actionable, AI-driven feedback for resume building and cover letter drafting to help you land your dream role.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every tool on this platform operates on a frictionless,"no sign-up required" model. By processing heavily optimized algorithms on our secure global edge network, we guarantee sub-second response times for routine tasks and unparalleled privacy for your personal documents. Browse the directory above to discover how ToolNova can automate your repetitive tasks and return hours of valuable time to your week.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
