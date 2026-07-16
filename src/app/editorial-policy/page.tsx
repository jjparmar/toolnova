import { Metadata } from"next";
import Link from"next/link";
import { CheckCircle, FileText, Users, ShieldCheck, RefreshCw, AlertTriangle } from"lucide-react";

export const metadata: Metadata = {
  title:"Editorial Policy & Standards | ToolNova",
  description:"Learn how ToolNova's editorial team researches, writes, and maintains all blog content and AI tool documentation. Our commitment to accuracy, transparency, and user value.",
  alternates: {
    canonical:"https://www.toolnovahub.com/editorial-policy",
  },
  openGraph: {
    title:"Editorial Policy & Standards | ToolNova",
    description:"ToolNova's standards for content accuracy, author expertise, tool testing, and editorial transparency.",
    url:"https://www.toolnovahub.com/editorial-policy",
    type:"website",
    images: [
      {
        url:"https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt:"ToolNova Editorial Policy",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED ="June 30, 2026";

const standards = [
  {
    icon: FileText,
    title:"Original Research & Writing",
    description:"All blog articles and tool guides published on ToolNova are written by our editorial team — never copied or spun from other sources. Each piece begins with primary research: reading multiple reputable sources, testing relevant tools hands-on, and synthesising findings into actionable guidance. We use AI writing assistants as a drafting aid only; every article is reviewed, fact-checked, and substantially rewritten by a human editor before publication.",
  },
  {
    icon: Users,
    title:"Author Expertise & Credentials",
    description:"Our contributors are subject-matter specialists: career coaches, certified educators, software engineers, and productivity researchers. Author profiles on each article include their name, role, and area of expertise. When an author makes claims about tools, platforms, or outcomes, those claims are backed by direct testing or cited from authoritative third-party sources. We do not publish articles by anonymous contributors on topics requiring specialist knowledge.",
  },
  {
    icon: CheckCircle,
    title:"Fact-Checking Process",
    description:"Before any article is published, a secondary editor verifies all factual claims, statistics, product pricing, and feature descriptions. Statistics are cited with links to the original research. Tool feature descriptions are verified against the tool's official documentation or direct testing. If a fact cannot be verified from at least two independent sources, it is removed or flagged with appropriate caveats.",
  },
  {
    icon: ShieldCheck,
    title:"AI Tool Testing Standards",
    description:"Every ToolNova tool is tested by at least two team members across different use-cases before it is made publicly available. We evaluate accuracy, output quality, privacy compliance, and real-world utility. Tools are re-tested after major model updates or user-reported issues. Our testing notes form the basis of the tool description, FAQ, and expert tips shown on each tool page.",
  },
  {
    icon: RefreshCw,
    title:"Content Updates & Accuracy",
    description:"The AI landscape changes rapidly. We maintain a content review schedule: core tool pages are reviewed every 90 days; blog articles covering fast-moving topics (AI, job market, software) are reviewed every 6 months. When outdated information is found, the article is updated and the 'Last Updated' date is revised. If a major factual error is discovered, we correct it within 48 hours and add a correction notice at the bottom of the article.",
  },
  {
    icon: AlertTriangle,
    title:"Corrections Policy",
    description:"We are committed to transparent error correction. If you find an inaccuracy in any article or tool description, please email us at support@toolnovahub.com with the URL and the specific error. We investigate all reports within 5 business days. Confirmed errors are corrected promptly and, if significant, noted with a dated correction notice appended to the article. We do not silently delete or rewrite content to cover mistakes.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
          <FileText className="h-4 w-4" />
          Publisher Standards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Editorial Policy &amp; Content Standards
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          ToolNova is committed to publishing accurate, helpful, and transparent content. 
          This page documents the standards our editorial team follows when creating blog 
          articles, tool guides, and all other content on this platform.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last Updated: {LAST_UPDATED}
        </p>
      </div>

      {/* Who We Are */}
      <section className="mb-16 p-8 bg-slate-50 rounded-2xl border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">Who Creates Content at ToolNova</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          ToolNova was founded in 2026 in Singapore with the mission of making professional-grade 
          AI tools accessible to everyone — students, educators, and professionals worldwide — at no cost.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our content team consists of software engineers who build and test the tools, subject-matter 
          specialists who write and review educational content, and a senior editor responsible for 
          maintaining our editorial standards. All contributors are vetted for relevant professional 
          experience before being permitted to publish under their byline.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We are a bootstrapped, independent publisher. We do not accept paid guest posts, 
          sponsored content disguised as editorial, or product placements without clear disclosure. 
          When we earn advertising revenue through Google AdSense or other networks, this 
          <strong> does not influence editorial decisions</strong> — tool recommendations and 
          article content are determined solely by quality and user value.
        </p>
      </section>

      {/* Standards Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-10">Our Editorial Standards</h2>
        <div className="space-y-8">
          {standards.map((standard, i) => (
            <div
              key={i}
              className="flex gap-6 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <standard.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{standard.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {standard.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advertising Disclosure */}
      <section className="mb-16 p-8 bg-amber-50 rounded-2xl border border-amber-200">
        <h2 className="text-2xl font-bold mb-4">Advertising &amp; Revenue Disclosure</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          ToolNova is a free platform. We sustain operations primarily through display advertising 
          served by <strong>Google AdSense</strong> (publisher ID: ca-pub-1328083083403070). 
          Google and its partners may use cookies and device identifiers to show you 
          interest-based ads. Our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> explains 
          how this works and how you can opt out.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may also participate in affiliate programs in the future. If we ever do, 
          any affiliate links will be clearly marked with"(affiliate link)" or a similar disclosure 
          adjacent to the link. Affiliate relationships <strong>never influence our tool 
          recommendations or editorial verdicts</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          All tools listed on ToolNova are tools we have built and tested ourselves. 
          We do not receive payment to include or rank any third-party tool.
        </p>
      </section>

      {/* Contact */}
      <section className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl border border-primary/20 text-center">
        <h2 className="text-2xl font-bold mb-3">Questions or Corrections?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          If you&apos;ve spotted an error, want to suggest a correction, or have 
          questions about our editorial process, please reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@toolnovahub.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Email the Editorial Team
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 :bg-slate-700 transition-colors"
          >
            Contact Form
          </Link>
        </div>
      </section>
    </div>
  );
}
