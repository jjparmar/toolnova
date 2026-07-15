import { Metadata } from "next";
import Link from "next/link";
import { Rocket, Heart, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Team | ToolNova",
  description:
    "Learn about ToolNova's mission to democratize AI productivity tools. Meet the team behind free AI-powered tools for students and professionals.",
  keywords: [
    "about ToolNova",
    "AI tools team",
    "ToolNova mission",
    "free AI tools company",
  ],
  alternates: {
    canonical: "https://www.toolnovahub.com/about",
  },
  openGraph: {
    title: "About Us - Our Mission & Team | ToolNova",
    description:
      "Learn about ToolNova's mission to democratize AI productivity tools for everyone.",
    url: "https://www.toolnovahub.com/about",
    type: "website",
    images: [
      {
        url: "https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About ToolNova - Free AI Tools Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | ToolNova",
    description:
      "Learn about ToolNova's mission to democratize AI productivity tools.",
    images: ["https://www.toolnovahub.com/og-image.png"],
    creator: "@toolnovahub",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
          Democratizing AI for Everyone
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          ToolNova is an all-in-one platform built to empower students,
          creators, and professionals with professional-grade AI tools —
          completely free, with no account required.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          {
            icon: Rocket,
            title: "Our Mission",
            desc: "To provide accessible, high-quality AI tools that simplify complex tasks and boost global productivity — with no paywalls, no subscriptions, and no sign-up barriers.",
          },
          {
            icon: Heart,
            title: "Our Values",
            desc: "We believe in radical transparency, privacy by design, and creating software that genuinely helps people accomplish more in less time.",
          },
          {
            icon: Shield,
            title: "Privacy First",
            desc: "Your data belongs to you. Files are processed securely and never retained on our servers. We will never use your content to train AI models.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800"
          >
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-6">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Story + Details */}
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h2>Our Story</h2>
        <p>
          ToolNova was founded in 2026 in Singapore with a straightforward conviction:
          the best AI productivity tools should not cost $30/month. We watched students
          struggle to afford subscriptions, professionals juggle four different SaaS
          tools to do one job, and educators piece together workflows from a dozen
          scattered utilities. We decided to fix that.
        </p>
        <p>
          We started with three tools — a text summarizer, a grammar fixer, and a PDF
          merger — and built from there based directly on user requests. Today, ToolNova
          offers 47+ tools across writing, study, career, image and PDF processing, and
          general productivity. Every single one is free to use with no account required.
          Our team of software engineers, UX designers, and domain experts continues to
          expand and refine the platform every week.
        </p>

        <h2 className="mt-16 mb-8">Editorial &amp; Quality Standards</h2>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 not-prose mb-8">
          <p className="text-muted-foreground mb-6">
            We hold our content and tools to strict standards to ensure every user gets
            genuine value. Our full editorial process is documented in our{" "}
            <Link
              href="/editorial-policy"
              className="text-primary hover:underline font-medium"
            >
              Editorial Policy
            </Link>
            . The highlights:
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Accuracy Above All:</strong> Every tool is tested against
                real-world use cases before launch and re-reviewed after major AI
                model updates. We document test results and discard tools that
                consistently underperform.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacy by Design:</strong> We process data locally in the
                browser wherever possible. We never store personal documents or use
                submitted content for AI training. Our zero-retention policy applies
                to all user-uploaded files.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Human-Reviewed Content:</strong> Our blog articles and tool
                documentation are written by subject-matter experts and reviewed by
                a senior editor. We use AI as a drafting aid only — every piece
                published is verified by a human before going live.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <strong>Transparent Corrections:</strong> We maintain a corrections
                policy. If we publish an error, we correct it within 48 hours and
                note the correction. We do not silently rewrite content to cover
                mistakes.
              </span>
            </li>
          </ul>
        </div>

        <h2 className="mt-16 mb-8">Our Technology</h2>
        <p>
          ToolNova tools are powered by state-of-the-art large language models and
          proprietary processing pipelines we have developed specifically for each
          tool&apos;s use case. We deliberately fine-tune our prompts and output
          post-processors — rather than relying on raw LLM output — to deliver results
          that are more accurate, more structured, and more useful than generic AI
          interfaces.
        </p>
        <p>
          For image and PDF tools, we use optimised client-side libraries (running
          directly in your browser) wherever possible, which means your files never
          leave your device. For AI-powered tools that require server processing, all
          data is encrypted in transit and immediately discarded after your result is
          delivered.
        </p>

        <h2 className="mt-16 mb-8">Our Team</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 not-prose mb-8">
          <div className="space-y-6">
            {[
              {
                initials: "ET",
                name: "ToolNova Engineering Team",
                role: "Product & Software Development",
                desc: "Our engineering team builds and maintains all 47+ tools on the platform. Engineers specialise in AI/ML integration, browser-based file processing, and full-stack web development. Every tool is tested end-to-end before release and monitored for quality regressions.",
              },
              {
                initials: "EC",
                name: "ToolNova Editorial Team",
                role: "Content, Research & Quality",
                desc: "Our editorial team includes certified educators, career coaches, and professional writers who research and produce all blog content and tool documentation. They are also responsible for fact-checking, content updates, and responding to user correction requests.",
              },
              {
                initials: "DS",
                name: "ToolNova Design & UX Team",
                role: "User Experience & Interface Design",
                desc: "Our design team ensures every tool is intuitive and accessible regardless of technical background. They conduct usability reviews, manage our design system, and work directly with users to improve workflows based on real feedback.",
              },
            ].map((member, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-base font-bold text-primary flex-shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-bold text-base">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-16 mb-8">Advertise with ToolNova</h2>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 not-prose mb-8">
          <p className="text-muted-foreground mb-4">
            ToolNova reaches a global audience of students, educators, and professionals
            who actively seek AI productivity solutions. Our readers are high-intent
            users in the education and productivity market.
          </p>
          <p className="text-muted-foreground mb-4">
            We currently serve display advertising through{" "}
            <strong>Google AdSense</strong>. If you are interested in direct advertising
            opportunities, sponsorships, or editorial partnerships, please contact us.
            Full details are on our{" "}
            <Link href="/advertising" className="text-primary hover:underline font-medium">
              Advertising Disclosure
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/advertising"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Advertising disclosure
            </Link>
            <a
              href="mailto:support@toolnovahub.com?subject=Advertising%20inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-colors"
            >
              Contact about advertising
            </a>
          </div>
        </div>

        <h2 className="mt-16 mb-8 text-2xl font-bold text-center">
          Publisher Contact Information
        </h2>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center mb-16 not-prose">
          <p className="text-muted-foreground mb-6">
            ToolNova is operated as an independent web platform based in Singapore.
            For editorial, advertising, legal, or general inquiries:
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm font-semibold">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary">Email:</span>
              <a
                href="mailto:support@toolnovahub.com"
                className="hover:text-primary transition-colors"
              >
                support@toolnovahub.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary">Registered Office:</span>
              <span>71 Ayer Rajah Crescent, Singapore 139951</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Founded 2026 · Singapore · Serving users globally
          </p>
        </div>

        <h2>Why Choose ToolNova?</h2>
        <p>
          Unlike platforms that lock basic features behind subscriptions and clutter
          interfaces with intrusive popups, ToolNova puts users first. We offer a
          completely free tier because we believe world-class AI tools should be
          accessible to everyone — not just those who can afford a premium subscription.
          Every tool we build starts with the question:{" "}
          <em>&ldquo;Is this genuinely useful for a student at 11pm before an exam?&rdquo;</em>{" "}
          If the answer is yes, it gets built and stays free.
        </p>
      </div>
    </div>
  );
}
