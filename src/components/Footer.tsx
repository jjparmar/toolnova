"use client";

import Link from "next/link";
import { Mail, Twitter, Github, Linkedin, Sparkles } from "lucide-react";
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
    <footer className="footer-dark relative mt-auto w-full overflow-hidden">
      {/* Top ambient gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF3B5C] to-transparent opacity-60" />

      <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="group mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF3B5C] to-[#7C3AED] text-lg font-extrabold text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
                T
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                Tool<span className="text-gradient">Nova</span>
              </span>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[hsl(var(--footer-muted))]">
              {TOOL_COUNT_LABEL} free AI-powered productivity tools designed for students, researchers, and professionals worldwide. Zero registration required.
            </p>

            <div className="flex gap-2.5">
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[hsl(var(--footer-muted))] transition-all duration-300 hover:border-primary/50 hover:bg-gradient-to-br hover:from-[#FF3B5C] hover:to-[#7C3AED] hover:text-white hover:shadow-lg hover:shadow-primary/30"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/90">
              Writing Tools
            </h4>
            <ul className="space-y-3">
              {writingTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm font-medium transition-colors hover:text-white">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/90">
              Popular Tools
            </h4>
            <ul className="space-y-3">
              {studyCareerTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm font-medium transition-colors hover:text-white">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/90">
              Company
            </h4>
            <ul className="mb-6 space-y-3">
              {companyLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm font-medium transition-colors hover:text-white">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/90">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm font-medium transition-colors hover:text-white">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[hsl(var(--footer-muted))] md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF3B5C]" />
            <p>© 2026 ToolNova Hub. Built for peak productivity.</p>
          </div>
          <p className="font-medium text-white/80">
            Free AI tools for students &amp; professionals · Singapore
          </p>
        </div>
      </div>
    </footer>
  );
}

