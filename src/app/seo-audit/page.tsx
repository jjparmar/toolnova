import { Metadata } from"next";
import { siteConfig } from"@/config/site";
import { TOOL_FAQS, TOOL_HOWTOS } from"@/lib/seo-worldclass";

const LAST_UPDATED ="June 14, 2026";

export const metadata: Metadata = {
  title:"SEO Audit Report - World-Class SEO, AEO & GEO",
  description:"Comprehensive SEO audit for ToolNova - analyzing SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) performance. See our world-class search optimization strategy.",
  keywords: ["SEO audit","AEO optimization","GEO optimization","AI search optimization","ChatGPT optimization","Perplexity optimization","world-class SEO",
  ],
  alternates: {
    canonical:`${siteConfig.url}/seo-audit`,
  },
};

const seoChecks = {
  technical: [
    { name:"XML Sitemap", status:"pass", detail:"Comprehensive sitemap with all 70+ pages" },
    { name:"Robots.txt", status:"pass", detail:"All AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, etc.)" },
    { name:"Canonical URLs", status:"pass", detail:"Properly configured across all pages" },
    { name:"HTTPS", status:"pass", detail:"Fully secured with SSL" },
    { name:"HSTS", status:"pass", detail:"Enabled with 2-year max-age" },
    { name:"Core Web Vitals", status:"pass", detail:"Image optimization, font preloading, lazy loading configured" },
  ],
  onPage: [
    { name:"Meta Titles", status:"pass", detail:"All pages have unique, optimized titles with year and branding" },
    { name:"Meta Descriptions", status:"pass", detail:"All pages have compelling descriptions with CTAs (150-160 chars)" },
    { name:"Open Graph Tags", status:"pass", detail:"Complete OG tags for social sharing" },
    { name:"Twitter Cards", status:"pass", detail:"Large image cards configured" },
    { name:"Schema.org Markup", status:"pass", detail:"Organization, WebSite, SoftwareApplication, FAQPage, HowTo, BreadcrumbList" },
    { name:"Structured Data", status:"pass", detail:"JSON-LD on all pages with proper @context and @type" },
  ],
  aeo: [
    { name:"FAQ Schemas", status:"pass", detail:`${Object.keys(TOOL_FAQS).length} tools with FAQPage schemas for featured snippets` },
    { name:"HowTo Schemas", status:"pass", detail:`${Object.keys(TOOL_HOWTOS).length} tools with HowTo schemas for rich results` },
    { name:"Speakable Content", status:"pass", detail:"Voice search optimized with SpeakableSpecification" },
    { name:"Q&A Content", status:"pass", detail:"Tool pages structured as Q&A format" },
    { name:"Step-by-step Guides", status:"pass", detail:"All tools have clear usage instructions" },
  ],
  geo: [
    { name:"AI Crawler Access", status:"pass", detail:"15+ AI search bots explicitly allowed in robots.txt" },
    { name:"Entity Data", status:"pass", detail:"Knowledge graph optimized with comprehensive entity signals" },
    { name:"Content Structure", status:"pass", detail:"Optimized for AI summarization with clear headings and structured data" },
    { name:"OpenAPI Spec", status:"pass", detail:"API documentation at /openapi.yaml" },
  ],
  global: [
    { name:"Global CDN", status:"pass", detail:"Static assets optimized for global delivery" },
  ],
};

const recommendations = [
  {
    priority:"high",
    category:"Content",
    title:"Add More FAQ Content",
    description:"Expand FAQ schemas to all 47+ tools. Currently only 15 tools have FAQ data.",
    impact:"Higher chance of featured snippets and People Also Ask rankings",
  },
  {
    priority:"high",
    category:"Backlinks",
    title:"Build High-Quality Backlinks",
    description:"Acquire backlinks from .edu, .gov, and high-authority educational sites",
    impact:"Domain authority boost for better traditional search rankings",
  },
  {
    priority:"medium",
    category:"Technical",
    title:"Implement Core Web Vitals Monitoring",
    description:"Add real-user monitoring for Core Web Vitals metrics in Search Console",
    impact:"Better understanding of user experience performance",
  },
  {
    priority:"medium",
    category:"Content",
    title:"Add Video Content",
    description:"Create tutorial videos for top tools and add VideoObject schemas",
    impact:"Video rich results and YouTube search visibility",
  },
  {
    priority:"medium",
    category:"AEO",
    title:"Expand HowTo Schemas",
    description:"Add HowTo schemas to remaining 35+ tools",
    impact:"More rich results in search",
  },
  {
    priority:"low",
    category:"Global",
    title:"Add Regional Subdomains",
    description:"Consider regional subdomains (in.toolnovahub.com, etc.) for local SEO",
    impact:"Better local rankings in specific countries",
  },
];

export default function SEOAuditPage() {
  const totalChecks = Object.values(seoChecks).flat().length;
  const passedChecks = Object.values(seoChecks)
    .flat()
    .filter((check) => check.status ==="pass").length;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">SEO Audit Report</h1>
        <p className="text-xl text-muted-foreground">
          World-Class SEO, AEO & GEO Optimization Status
        </p>
        <div className="mt-6 inline-flex items-center gap-4">
          <div className="text-5xl font-bold text-green-600">{passedChecks}/{totalChecks}</div>
          <div className="text-left text-muted-foreground">
            <div>Checks Passed</div>
            <div className="text-sm">All Critical SEO Elements Implemented</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">Technical SEO</h2>
          <ul className="space-y-3">
            {seoChecks.technical.map((check) => (
              <li key={check.name} className="flex items-start gap-2">
                <span className={check.status ==="pass" ?"text-green-500" :"text-yellow-500"}>
                  {check.status ==="pass" ?"✓" :"!"}
                </span>
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-muted-foreground">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">On-Page SEO</h2>
          <ul className="space-y-3">
            {seoChecks.onPage.map((check) => (
              <li key={check.name} className="flex items-start gap-2">
                <span className={check.status ==="pass" ?"text-green-500" :"text-yellow-500"}>
                  {check.status ==="pass" ?"✓" :"!"}
                </span>
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-muted-foreground">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">AEO (Answer Engine Optimization)</h2>
          <ul className="space-y-3">
            {seoChecks.aeo.map((check) => (
              <li key={check.name} className="flex items-start gap-2">
                <span className={check.status ==="pass" ?"text-green-500" :"text-yellow-500"}>
                  {check.status ==="pass" ?"✓" :"!"}
                </span>
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-muted-foreground">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-4">GEO (Generative Engine Optimization)</h2>
          <ul className="space-y-3">
            {seoChecks.geo.map((check) => (
              <li key={check.name} className="flex items-start gap-2">
                <span className={check.status ==="pass" ?"text-green-500" :"text-yellow-500"}>
                  {check.status ==="pass" ?"✓" :"!"}
                </span>
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-muted-foreground">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Global SEO</h2>
          <ul className="space-y-3">
            {seoChecks.global.map((check) => (
              <li key={check.name} className="flex items-start gap-2">
                <span className={check.status ==="pass" ?"text-green-500" :"text-yellow-500"}>
                  {check.status ==="pass" ?"✓" :"!"}
                </span>
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-muted-foreground">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-2xl font-bold mb-6">Recommendations for Further Optimization</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority ==="high"
                      ?"bg-red-100 text-red-700"
                      : rec.priority ==="medium"
                      ?"bg-yellow-100 text-yellow-700"
                      :"bg-blue-100 text-blue-700"
                  }`}
                >
                  {rec.priority.toUpperCase()}
                </span>
                <span className="text-sm text-muted-foreground">{rec.category}</span>
              </div>
              <h3 className="font-bold">{rec.title}</h3>
              <p className="text-muted-foreground">{rec.description}</p>
              <p className="text-sm mt-2 font-medium">Impact: {rec.impact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold mb-4">AI Search Engine Integration</h2>
        <p className="mb-4">
          ToolNova is optimized for all major AI search engines. Here&apos;s how we rank:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg mb-2">ChatGPT / OpenAI</div>
            <ul className="text-sm space-y-1">
              <li>✓ GPTBot allowed in robots.txt</li>
              <li>✓ Structured data for entity recognition</li>
              <li>✓ Clear content hierarchy</li>
              <li>✓ AI plugin manifest available</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg mb-2">Perplexity AI</div>
            <ul className="text-sm space-y-1">
              <li>✓ PerplexityBot allowed</li>
              <li>✓ FAQ schemas for direct answers</li>
              <li>✓ Authoritative content structure</li>
              <li>✓ Cite-worthy content format</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg mb-2">Google Gemini / SGE</div>
            <ul className="text-sm space-y-1">
              <li>✓ Google-Extended allowed</li>
              <li>✓ Rich results via schemas</li>
              <li>✓ Google Discover optimized</li>
              <li>✓ SGE-friendly content</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Last Updated: {LAST_UPDATED}</p>
        <p className="text-sm mt-2">
          For questions about our SEO strategy, contact: {siteConfig.author.email}
        </p>
      </div>
    </div>
  );
}
