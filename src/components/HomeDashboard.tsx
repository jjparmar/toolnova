"use client";

import Link from "next/link";
import {
  ArrowRight,
  Merge,
  Image as ImageIcon,
  Library,
  Zap,
  ShieldCheck,
  Sparkles,
  Grid2X2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAnswerBox } from "@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from "@/components/aeo/FAQAccordion";
import { getHomepageAEO } from "@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from "@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL } from "@/data/tools";

// Lightweight motion stubs (avoids shipping framer-motion on homepage for better TTI/LCP)
const motion = {
  div: ({
    children,
    className,
    // accept motion props without failing when motion is stubbed
    ..._rest
  }: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => <div className={className}>{children}</div>,
  h1: ({
    children,
    className,
    ..._rest
  }: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => <h1 className={className}>{children}</h1>,
  p: ({
    children,
    className,
    ..._rest
  }: {
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => <p className={className}>{children}</p>,
};

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();

  return (
    <div className="w-full font-display">
      {/* Hero Section - Gradient Style */}
      <section className="relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full -ml-32 -mb-32 blur-3xl"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8"
              >
                <Sparkles className="h-4 w-4" /> Free to start · No sign-up required
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hero-title speakable text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              >
                Free AI Tools for <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  Students &amp; Professionals
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hero-description text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
              >
                A professional suite of{" "}
                <strong>free AI writing, study, and productivity tools</strong>.
                Merge PDFs, generate flashcards, fix grammar, and write essays
                instantly with AI. Free to start — no sign-up required.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link href="/tools/homework-solver">
                  <Button className="h-14 px-8 rounded-xl bg-white text-primary hover:bg-blue-50 font-bold text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                    Try a tool free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-semibold text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Grid2X2 className="h-5 w-5" />
                    Browse all tools
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex md:flex-col gap-8 md:gap-6"
            >
              <div className="text-center md:text-right p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <div className="text-white text-3xl md:text-4xl font-black">
                  {TOOL_COUNT}
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  AI Tools
                </div>
              </div>
              <div className="text-center md:text-right p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <div className="text-white text-3xl md:text-4xl font-black">
                  $0
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Free to Start
                </div>
              </div>
              <div className="text-center md:text-right p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <div className="text-white text-3xl md:text-4xl font-black flex items-center justify-center md:justify-end gap-1">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Private & Secure
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 50L48 45.8C96 41.7 192 33.3 288 29.2C384 25 480 25 576 33.3C672 41.7 768 58.3 864 62.5C960 66.7 1056 58.3 1152 50C1248 41.7 1344 33.3 1392 29.2L1440 25V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
              className="fill-[#f8f9fb] dark:fill-[#0f1419]"
            />
          </svg>
        </div>
      </section>

      {/* AEO: Quick Answer Section */}
      <section className="py-12 bg-[#f8f9fb] dark:bg-[#0f1419]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* Most Popular Tools */}
      <section id="tools" className="py-24 bg-[#f8f9fb] dark:bg-[#0f1419]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
              Featured Tools
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
              Most Popular Tools
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Jump straight into our most frequently used utilities, optimized
              for speed and ease of use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Merge PDF */}
            <Link
              href="/tools/merge-pdf"
              className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1a1f2e] p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100/80 to-transparent dark:from-red-900/20 rounded-bl-full rounded-tr-2xl"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Merge className="h-8 w-8" />
                </div>
                <h3 className="text-foreground text-2xl font-bold mb-3">
                  Merge PDF
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Combine multiple PDF files into a single, organized document
                  instantly.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-1.5 rounded-full">
                  Top Rated
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Image Resizer */}
            <Link
              href="/tools/resize-image"
              className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1a1f2e] p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/80 to-transparent dark:from-purple-900/20 rounded-bl-full rounded-tr-2xl"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <h3 className="text-foreground text-2xl font-bold mb-3">
                  Image Resizer
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Change image dimensions perfectly by percentage or exact
                  pixels without quality loss.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full">
                  Trending
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Flashcard Maker */}
            <Link
              href="/tools/flashcard-maker"
              className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1a1f2e] p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-100/80 to-transparent dark:from-teal-900/20 rounded-bl-full rounded-tr-2xl"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Library className="h-8 w-8" />
                </div>
                <h3 className="text-foreground text-2xl font-bold mb-3">
                  Flashcard Maker
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Create digital study sets to memorize efficiently. Perfect for
                  exam prep.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-full">
                  Student Pick
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>

          {/* View All Tools Button */}
          <div className="text-center mt-14">
            <Link href="/tools">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-2 font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                View All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Internal Links Hub */}
      <section className="py-14 bg-white dark:bg-background border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-3">Writing & Study</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/tools/writing-tools"
                    className="hover:text-primary"
                  >
                    AI Writing Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/study-tools"
                    className="hover:text-primary"
                  >
                    Study Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/exam-prep-tools"
                    className="hover:text-primary"
                  >
                    Exam Prep Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/flashcard-maker"
                    className="hover:text-primary"
                  >
                    Flashcard Maker
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">PDF & Utility</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/tools/image-pdf-tools"
                    className="hover:text-primary"
                  >
                    Image & PDF Tools
                  </Link>
                </li>
                <li>
                  <Link href="/tools/merge-pdf" className="hover:text-primary">
                    Merge PDF
                  </Link>
                </li>
                <li>
                  <Link href="/tools/split-pdf" className="hover:text-primary">
                    Split PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/utility-tools"
                    className="hover:text-primary"
                  >
                    Utility Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Career & Guides</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/tools/career-tools"
                    className="hover:text-primary"
                  >
                    Career Tools
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary">
                    AI Productivity Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About ToolNova
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-slate-100/80 to-transparent dark:from-slate-800/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Built for productivity,
                <br /> designed for <span className="text-primary">you</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              We combine cutting-edge technology with user-friendly design to
              make your study workflow seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col items-start p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Process documents and images in seconds. Our optimized engines
                ensure you never wait for a download.
              </p>
            </div>
            <div className="group flex flex-col items-start p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Privacy First
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your files are secure. We automatically delete all uploaded data
                after processing to ensure complete privacy.
              </p>
            </div>
            <div className="group flex flex-col items-start p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                AI-Powered
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Leverage advanced artificial intelligence for smarter summaries,
                better image scaling, and clearer flashcards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / how free tools are funded — AdSense transparency */}
      <section className="py-12 bg-white dark:bg-background border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              How ToolNova stays free
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hosting and AI infrastructure cost money. We keep tools free to
              start by offering optional{" "}
              <Link href="/pricing" className="text-primary hover:underline font-medium">
                ToolNova Pro
              </Link>{" "}
              for unlimited AI, and by showing clearly labeled display ads when
              approved. Ads never control our editorial standards. Details:{" "}
              <Link
                href="/advertising"
                className="text-primary hover:underline font-medium"
              >
                Advertising disclosure
              </Link>
              .
            </p>
            <ul className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <li className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3">
                <strong className="text-foreground block mb-1">No account wall</strong>
                Start any tool without signing up
              </li>
              <li className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3">
                <strong className="text-foreground block mb-1">Browser privacy</strong>
                PDF &amp; image tools process locally when possible
              </li>
              <li className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3">
                <strong className="text-foreground block mb-1">Honest limits</strong>
                Free daily AI allowance; Pro is optional
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* About ToolNova & E-E-A-T Section for AdSense/SEO */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-[1000px] prose prose-slate dark:prose-invert prose-lg">
          <div className="mb-16">
            <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
              About ToolNova
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Empowering Digital Workflows for Students and Professionals
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At ToolNova, our mission is fundamentally simple: to eliminate the
              friction from your daily digital tasks. In a world increasingly
              saturated with complex software and fragmented applications, we
              recognized a critical need for a unified, high-performance toolkit
              that is accessible directly from your browser. We built ToolNova
              to serve as the definitive hub for document management, image
              optimization, and AI-accelerated study workflows.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you are a university student organizing a semester's worth
              of research PDFs, a digital marketer needing rapid image
              compression without quality degradation, or an educator seeking to
              generate interactive learning materials like active-recall
              flashcards, our growing suite of {TOOL_COUNT_LABEL} specialized
              micro-applications is engineered to save you hours of
              administrative labor. By leveraging state-of-the-art Artificial
              Intelligence and optimized processing algorithms, we transform
              tasks that traditionally required expensive desktop software—such
              as merging documents, generating complex summaries, and correcting
              advanced grammar—into instant, frictionless experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We continually iterate on our platform based on the feedback of
              our global user base. Our dedicated team tracks the latest
              advancements in web technologies and machine learning to ensure
              that every tool on ToolNova is not only fast but demonstrably more
              accurate and capable than standard alternatives. Your productivity
              is our ultimate metric for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <ShieldCheck className="text-primary h-6 w-6" /> Our Quality
                Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to delivering enterprise-grade reliability to
                every user. Our infrastructure is built by veteran software
                engineers with decades of combined experience in cloud
                architecture and data processing. When you use a ToolNova
                application, you are relying on heavily tested, secure, and
                robust systems designed to execute your request perfectly every
                single time, without fail.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Check className="text-primary h-6 w-6" /> Strict Data Privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Trust is the foundation of our platform. We understand that you
                process sensitive financial, academic, and personal documents
                using our PDF and summarization tools. ToolNova enforces a
                strict, automated zero-retention policy. All files uploaded for
                processing are encrypted in transit and are automatically,
                permanently deleted from our secure servers within hours of your
                session ending. We do not read, store, or sell your documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AEO: FAQ Section */}
      <section className="py-16 bg-[#f8f9fb] dark:bg-[#0f1419]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <FAQAccordion
            faqs={aeoContent.faqs}
            title="Frequently Asked Questions"
          />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to upgrade your <br className="hidden sm:block" />
            workflow?
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Start using {TOOL_COUNT_LABEL} free tools to write better, study
            smarter, and get more done — no sign-up required. PDF/image tools
            run unlimited in your browser; AI tools include free daily use.
          </p>
          <Link href="/tools">
            <Button className="h-16 px-12 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all shadow-2xl hover:shadow-primary/30 hover:scale-105">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      <MultiplexAd />
    </div>
  );
}
