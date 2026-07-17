"use client";

import Link from "next/link";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TOOL_COUNT_LABEL } from "@/data/tools";

const writingTools = [
  { name: "Grammar Checker", href: "/tools/grammar-fix" },
  { name: "Essay Writer", href: "/tools/essay-writer" },
  { name: "Paraphraser", href: "/tools/paraphraser" },
  { name: "Text Summarizer", href: "/tools/text-summarizer" },
  { name: "Email Writer", href: "/tools/email-writer" },
];

const studyCareerTools = [
  { name: "Homework Solver", href: "/tools/homework-solver" },
  { name: "Flashcard Maker", href: "/tools/flashcard-maker" },
  { name: "Merge PDF", href: "/tools/merge-pdf" },
  { name: "Resume Bullets", href: "/tools/resume-bullets" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
];

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "All tools" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms & conditions" },
  { href: "/cookie-policy", label: "Cookies" },
  { href: "/advertising", label: "Advertising" },
  { href: "/editorial-policy", label: "Editorial" },
];

export function Footer() {
  return (
    <footer className="footer-dark mt-auto w-full">
      <div className="mx-auto max-w-[1200px] px-6 py-14 md:py-16">
        <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground">
                T
              </div>
              <span className="font-heading text-lg font-extrabold tracking-tight text-white">
                Tool<span className="text-primary">Nova</span>
              </span>
            </div>
            <p className="mb-5 max-w-[280px] text-sm leading-relaxed text-[hsl(var(--footer-muted))]">
              {TOOL_COUNT_LABEL} free AI-powered tools for students and
              professionals. Write better, study smarter, get more done — no
              sign-up required.
            </p>
            <div className="flex gap-2">
              {[
                { href: siteConfig.links.twitter, label: "Twitter", Icon: Twitter },
                { href: siteConfig.links.github, label: "GitHub", Icon: Github },
                { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: `mailto:${siteConfig.author.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[hsl(var(--footer-muted))] transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
              Writing
            </h4>
            <ul className="space-y-2.5">
              {writingTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
              Popular tools
            </h4>
            <ul className="space-y-2.5">
              {studyCareerTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
              Company
            </h4>
            <ul className="mb-6 space-y-2.5">
              {companyLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/90">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[hsl(var(--footer-muted))] md:flex-row">
          <p>© 2026 ToolNova. All rights reserved.</p>
          <p>Free AI tools for students &amp; professionals · Singapore</p>
        </div>
      </div>
    </footer>
  );
}
