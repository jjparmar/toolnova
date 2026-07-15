"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Twitter, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TOOL_COUNT_LABEL } from "@/data/tools";

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
    <footer className="w-full mt-auto relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background */}
      <div className="bg-muted/30 border-t border-border/60 relative">
        {/* Subtle mesh bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 10% 0%, hsl(var(--primary) / 0.04) 0%, transparent 50%), radial-gradient(ellipse at 90% 0%, hsl(198 90% 52% / 0.03) 0%, transparent 50%)',
          }}
        />

        <div className="mx-auto max-w-[1240px] px-6 py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-md shadow-primary/20 ring-1 ring-primary/15">
                  <Image
                    src="/logo.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-heading text-[1.1rem] font-extrabold text-foreground tracking-tight">
                  Tool<span className="text-brand-gradient">Nova</span>
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mb-3">
                {TOOL_COUNT_LABEL} free AI-powered tools for students and
                professionals. Write better, study smarter, and get more done —
                no sign-up required.
              </p>
              <p className="text-muted-foreground/70 text-xs mb-6 leading-relaxed max-w-[280px]">
                Free to start · No sign-up required · Browser-based privacy · Based
                in Singapore
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5">
                {[
                  { href: siteConfig.links.twitter, label: "Follow ToolNova on Twitter/X", Icon: Twitter },
                  { href: siteConfig.links.github, label: "ToolNova on GitHub", Icon: Github },
                  { href: siteConfig.links.linkedin, label: "ToolNova on LinkedIn", Icon: Linkedin },
                  { href: `mailto:${siteConfig.author.email}`, label: "Email ToolNova support", Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-background border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Writing Tools */}
            <div className="col-span-1">
              <h4 className="font-heading text-foreground font-bold mb-5 text-xs uppercase tracking-widest">
                Writing Tools
              </h4>
              <ul className="space-y-2.5">
                {writingTools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:translate-x-0.5 inline-block transition-transform duration-200"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools/writing-tools"
                    className="text-primary text-sm font-semibold hover:underline underline-offset-4 inline-flex items-center gap-1 mt-1"
                  >
                    All writing tools
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Study & Career */}
            <div className="col-span-1">
              <h4 className="font-heading text-foreground font-bold mb-5 text-xs uppercase tracking-widest">
                Study &amp; Career
              </h4>
              <ul className="space-y-2.5">
                {studyCareerTools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:translate-x-0.5 inline-block transition-transform duration-200"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools/study-tools"
                    className="text-primary text-sm font-semibold hover:underline underline-offset-4 inline-flex items-center gap-1 mt-1"
                  >
                    All study tools
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company + Legal */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-heading text-foreground font-bold mb-5 text-xs uppercase tracking-widest">
                Company
              </h4>
              <ul className="space-y-2.5 mb-8">
                {[
                  { href: "/", label: "Home" },
                  { href: "/tools", label: "All Tools" },
                  { href: "/blog", label: "Blog" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-heading text-foreground font-bold mb-5 text-xs uppercase tracking-widest">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/editorial-policy", label: "Editorial Policy" },
                  { href: "/disclaimer", label: "Disclaimer" },
                  { href: "/cookie-policy", label: "Cookie Policy" },
                  { href: "/advertising", label: "Advertising Disclosure" },
                  { href: "/refund", label: "Refund Policy" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tool Categories */}
          <div className="border-t border-border pt-8 pb-6">
            <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-4">
              Tool Categories
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
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
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-muted-foreground/70 text-xs text-center md:text-left">
                © 2026 ToolNova. All rights reserved. · Free AI Tools for Students &amp; Professionals · Founded in Singapore
              </div>
              <div className="flex gap-5 flex-wrap justify-center">
                {[
                  { href: "/privacy", label: "Privacy" },
                  { href: "/terms", label: "Terms" },
                  { href: "/editorial-policy", label: "Editorial" },
                  { href: "/advertising", label: "Advertising" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/about", label: "About" },
                  { href: "/sitemap-page", label: "Sitemap" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground/70 hover:text-primary transition-colors text-xs"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
