"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TOOL_COUNT, TOOL_COUNT_LABEL } from "@/data/tools";

const writingTools = [
  { name: "Grammar Checker", href: "/tools/grammar-fix" },
  { name: "Essay Writer", href: "/tools/essay-writer" },
  { name: "Paraphraser", href: "/tools/paraphraser" },
  { name: "Text Summarizer", href: "/tools/text-summarizer" },
  { name: "Email Writer", href: "/tools/email-writer" },
  { name: "Caption Generator", href: "/tools/caption-generator" },
  { name: "Story Generator", href: "/tools/story-generator" },
  { name: "Speech Writer", href: "/tools/speech-writer" },
];

const studyCareerTools = [
  { name: "Homework Solver", href: "/tools/homework-solver" },
  { name: "Flashcard Maker", href: "/tools/flashcard-maker" },
  { name: "Quiz Generator", href: "/tools/quiz-generator" },
  { name: "Notes Generator", href: "/tools/notes-generator" },
  { name: "Resume Bullets", href: "/tools/resume-bullets" },
  { name: "Cover Letter Writer", href: "/tools/cover-letter-writer" },
  { name: "Merge PDF", href: "/tools/merge-pdf" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
];

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-[#0f1419] dark:to-background border-t border-slate-100 dark:border-slate-800 mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-primary/25">
                <Image
                  src="/logo.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                ToolNova
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-4">
              {TOOL_COUNT_LABEL} free AI-powered tools for students and
              professionals. Write better, study smarter, and get more done —
              no sign-up required.
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              Free to start · No sign-up required · Browser-based privacy · Based
              in Singapore, serving users globally
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ToolNova on Twitter/X"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolNova on GitHub"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolNova on LinkedIn"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Email ToolNova support"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Writing Tools */}
          <div className="col-span-1">
            <h4 className="text-foreground font-bold mb-4 text-sm uppercase tracking-wider">
              Writing Tools
            </h4>
            <ul className="space-y-2.5">
              {writingTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools/writing-tools"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  All writing tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Study & Career Tools */}
          <div className="col-span-1">
            <h4 className="text-foreground font-bold mb-4 text-sm uppercase tracking-wider">
              Study &amp; Career
            </h4>
            <ul className="space-y-2.5">
              {studyCareerTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools/study-tools"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  All study tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + Legal combined */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-foreground font-bold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 mb-8">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <h4 className="text-foreground font-bold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial-policy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/advertising"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Advertising Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Tool Categories Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 pb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tool Categories
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { name: "Writing Tools", href: "/tools/writing-tools" },
              { name: "Study Tools", href: "/tools/study-tools" },
              { name: "Exam Prep", href: "/tools/exam-prep-tools" },
              { name: "Career Tools", href: "/tools/career-tools" },
              { name: "Image & PDF", href: "/tools/image-pdf-tools" },
              { name: "Utility Tools", href: "/tools/utility-tools" },
              { name: "Word Counter", href: "/tools/word-counter" },
              { name: "Age Calculator", href: "/tools/age-calculator" },
              { name: "Case Converter", href: "/tools/case-converter" },
              { name: "Vocabulary Builder", href: "/tools/vocabulary-builder" },
              { name: "Synonym Finder", href: "/tools/synonym-finder" },
              { name: "LinkedIn Optimizer", href: "/tools/linkedin-optimizer" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2026 ToolNova. All rights reserved. ·
              Free AI Tools for Students &amp; Professionals · Founded in Singapore
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                href="/editorial-policy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Editorial Policy
              </Link>
              <Link
                href="/advertising"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Advertising
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/sitemap-page"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Sitemap
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
