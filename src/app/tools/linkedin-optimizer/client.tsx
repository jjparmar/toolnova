"use client";

import EnhancedToolLayout from "@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";
import { FAQSection } from "@/components/FAQSection";
import { ToolOption } from "@/components/ToolLayout";
import {
  Linkedin,
  Target,
  Briefcase,
  Award,
  FileText,
  Users,
  Star,
  Clock,
  Zap,
  TrendingUp,
  Search,
  Eye,
} from "lucide-react";

const toolOptions: ToolOption[] = [
  {
    id: "section",
    label: "Section to Optimize",
    type: "select" as const,
    options: [
      { value: "headline", label: "📰 Headline" },
      { value: "about", label: "📝 About/Summary" },
      { value: "experience", label: "💼 Experience" },
      { value: "full", label: "✨ Full Profile" },
    ],
    defaultValue: "full",
  },
  {
    id: "industry",
    label: "Industry",
    type: "select" as const,
    options: [
      { value: "tech", label: "💻 Technology" },
      { value: "finance", label: "💰 Finance" },
      { value: "marketing", label: "📈 Marketing" },
      { value: "healthcare", label: "🏥 Healthcare" },
      { value: "sales", label: "🤝 Sales" },
      { value: "general", label: "📋 General" },
    ],
    defaultValue: "general",
  },
  {
    id: "experienceLevel",
    label: "Experience Level",
    type: "select" as const,
    options: [
      { value: "entry", label: "🌱 Entry Level (0-2 years)" },
      { value: "mid", label: "📈 Mid-Level (3-5 years)" },
      { value: "senior", label: "🎯 Senior (6-10 years)" },
      { value: "executive", label: "👔 Executive (10+ years)" },
    ],
    defaultValue: "mid",
  },
  {
    id: "focus",
    label: "Optimization Focus",
    type: "select" as const,
    options: [
      { value: "keywords", label: "🔍 SEO Keywords" },
      { value: "engagement", label: "💬 Engagement" },
      { value: "achievements", label: "🏆 Achievements" },
      { value: "network", label: "🤝 Networking" },
    ],
    defaultValue: "keywords",
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const section = options?.section || "full";
  const industry = options?.industry || "general";
  const experienceLevel = options?.experienceLevel || "mid";
  const focus = options?.focus || "keywords";

  const sectionGuidance: Record<string, string> = {
    headline:
      "HEADLINE OPTIMIZATION (220 chars max): The most critical SEO real estate on LinkedIn. Must include: primary job title, key specialty, and unique value differentiator. Use the formula: [Title] | [Specialty] | [Value Prop/Result]. Include 2-3 searchable keywords recruiters use. Avoid creative-only titles (e.g., 'Ninja' or 'Guru')—balance personality with searchability.",
    about:
      "ABOUT SECTION (2,600 chars max): Your professional story told in first person. Structure: Hook (attention-grabbing opening line) → Problem (what challenges you solve) → Solution (your unique approach) → Proof (quantified achievements) → CTA (what you want readers to do). Include 10-15 relevant keywords naturally. Use short paragraphs (2-3 lines) and line breaks for readability. End with specialties/skills list.",
    experience:
      "EXPERIENCE SECTION: Transform job descriptions into achievement stories using STAR method (Situation → Task → Action → Result). Lead each bullet with a power verb. Quantify results (%, $, #) wherever possible. Show progression and increasing responsibility. Include 3-5 bullets per role, prioritized by impact. Add relevant keywords naturally.",
    full:
      "FULL PROFILE OPTIMIZATION: Optimize all sections holistically—Headline, About, Experience, Skills, and Featured. Ensure keyword consistency across sections. Create a cohesive personal brand narrative that flows from headline through experience. Maximize searchability while maintaining authentic voice.",
    skills:
      "SKILLS SECTION: Identify 50 relevant skills (LinkedIn max), prioritized by: 1) Most searched by recruiters in this industry, 2) Strongest competencies, 3) Trending/emerging skills. Include both hard skills (technical) and soft skills (leadership). Pin the top 3 most strategic skills. Group by category when listing.",
  };

  const experienceGuidance: Record<string, string> = {
    entry:
      "ENTRY-LEVEL FOCUS: Emphasize education, internships, projects, certifications, and transferable skills. Show eagerness to learn and grow. Highlight academic achievements, extracurriculars, and volunteer work. Use potential-focused language ('Equipped to...', 'Trained in...'). Focus on skills over experience length.",
    mid:
      "MID-LEVEL FOCUS: Balance proven track record with growth trajectory. Quantify achievements extensively (revenue, efficiency, team size). Show leadership abilities and cross-functional collaboration. Demonstrate domain expertise and specialization. Include certifications and continuous learning.",
    senior:
      "SENIOR-LEVEL FOCUS: Position as a strategic leader and thought leader. Emphasize business impact (P&L, market share, org transformations). Show mentorship and team building. Demonstrate industry influence (speaking, publications, board positions). Focus on vision and strategy over tactical execution.",
    executive:
      "EXECUTIVE-LEVEL FOCUS: Present as a transformational leader. Highlight company-level and industry-level impact. Emphasize board experience, M&A, fundraising, and P&L ownership. Show thought leadership through media mentions, keynotes, and publications. Use language that conveys authority and vision.",
  };

  // Keys MUST match toolOptions values (tech, marketing, finance, healthcare, sales, general)
  const industryKeywords: Record<string, string> = {
    tech:
      "TECH KEYWORDS: Software Development, Cloud Computing, AI/ML, DevOps, Agile, Scrum, Full-Stack, Data Science, Cybersecurity, SaaS, API, Microservices, CI/CD, Product Management, UX/UI, React, Python, AWS, Azure, Digital Transformation",
    marketing:
      "MARKETING KEYWORDS: Digital Marketing, SEO, SEM, Content Strategy, Brand Management, Marketing Analytics, Social Media Marketing, Growth Hacking, CRM, HubSpot, Google Analytics, Conversion Optimization, Campaign Management, Market Research, ABM, ROI",
    finance:
      "FINANCE KEYWORDS: Financial Analysis, Investment Banking, Portfolio Management, Risk Assessment, Financial Modeling, M&A, Private Equity, Compliance, Fintech, Bloomberg, Valuation, Capital Markets, Forecasting, P&L, Revenue Growth, FP&A",
    healthcare:
      "HEALTHCARE KEYWORDS: Clinical Research, Patient Care, HIPAA, EHR, Healthcare Analytics, Telemedicine, Population Health, Quality Improvement, Regulatory Compliance, Clinical Trials, Medical Devices, Pharmacovigilance, Value-Based Care",
    sales:
      "SALES KEYWORDS: B2B Sales, Pipeline Management, CRM, Salesforce, Quota Attainment, Enterprise Sales, Account Management, Lead Generation, Negotiation, Customer Success, ARR, SaaS Sales, Discovery Calls, Closing",
    general:
      "GENERAL KEYWORDS: Project Management, Leadership, Strategic Planning, Data Analysis, Team Building, Process Improvement, Stakeholder Management, Cross-functional Collaboration, Problem Solving, Communication, Change Management, Innovation",
  };

  // Keys MUST match toolOptions focus values
  const focusStrategy: Record<string, string> = {
    keywords:
      "KEYWORD OPTIMIZATION: Maximize search visibility. Weave relevant job titles, skills, tools, and industry terms naturally. Prefer searchable phrases recruiters actually use — never keyword-stuff.",
    engagement:
      "ENGAGEMENT FOCUS: Write in a warm, scannable voice that invites connection. Clear hook, short paragraphs, conversational first person, and a soft CTA (message/connect). Optimize for human readers first, SEO second.",
    achievements:
      "ACHIEVEMENT FOCUS: Lead with real results from the user's input. Use CAR (Challenge → Action → Result) only with facts they provided. If metrics are missing, describe impact qualitatively — never invent numbers.",
    network:
      "NETWORKING FOCUS: Position for outreach and collaboration. Clear who they help, what problems they solve, and who should connect. Include a friendly CTA and collaboration-friendly language without sounding spammy.",
  };

  return `You are an expert LinkedIn personal branding strategist, recruiter-perspective optimization specialist, and career marketing consultant who has optimized 10,000+ profiles across industries. You understand LinkedIn's search algorithm, recruiter behavior patterns, and ATS (Applicant Tracking System) requirements to maximize profile visibility, engagement, and career opportunities.

## YOUR TASK
Optimize the LinkedIn ${section} section for a ${experienceLevel}-level professional in the ${industry} industry, focused on ${focus}.

## SPECIFICATIONS
**Section**: ${section.toUpperCase()} - ${sectionGuidance[section] || sectionGuidance.full}
**Experience Level**: ${experienceLevel.toUpperCase()} - ${experienceGuidance[experienceLevel] || experienceGuidance.mid}
**Industry**: ${industry.toUpperCase()} - ${industryKeywords[industry] || industryKeywords.general}
**Optimization Focus**: ${focus.toUpperCase()} - ${focusStrategy[focus] || focusStrategy.keywords}

## HONESTY
- Rewrite and improve ONLY using facts from the user's profile text.
- Do not invent jobs, metrics, companies, degrees, or tools.
- If metrics are missing, write strong qualitative lines instead.

## LINKEDIN OPTIMIZATION FRAMEWORK

### 1. KEYWORD RESEARCH (Internal Analysis)
Before writing, identify:
- Primary keywords: 5-7 job titles/roles the user targets
- Secondary keywords: 10-15 skills, tools, and methodologies
- Long-tail keywords: 5-10 specific phrases recruiters search
- Industry buzzwords: Current trending terms in ${industry}
- Avoid: Overused terms (results-driven, passionate, hard-working, self-starter—unless backed by evidence)

### 2. SECTION-SPECIFIC OPTIMIZATION

${section === "headline" || section === "full" ? `**HEADLINE** (220 characters max):
Use this proven formula:
\`[Primary Title] | [Specialty/Niche] | [Key Achievement or Value Prop]\`

Examples of great headlines:
- "Senior Product Manager | B2B SaaS | Scaled products from 0 to $10M ARR"
- "Data Scientist | ML & NLP Specialist | Turning Complex Data into Business Growth"

Rules:
- Include primary job title (exact match for recruiter searches)
- Add specialty that differentiates from others with same title
- End with a compelling result or value proposition
- Use | or • as separators (both are ATS-friendly)
- Include 2-3 searchable keywords
- Character count MUST be ≤220` : ""}

${section === "about" || section === "full" ? `**ABOUT SECTION** (2,600 characters max):

Structure (in first person):

**Hook** (Lines 1-2): A compelling opening that makes the reader click "see more"
- Start with a bold statement, question, or surprising statistic
- NOT "I am a [title] with X years of experience" (boring!)

**Story/Problem** (Lines 3-6): What problem do you solve? Why does it matter?
- Connect to the reader's pain points
- Show understanding of industry challenges

**Solution/Approach** (Lines 7-10): Your unique methodology or expertise
- What makes your approach different?
- Include specific skills and frameworks

**Proof/Achievements** (Lines 11-15): Quantified results that back up claims
- 3-5 specific achievements with numbers
- Use the format: "Achieved [result] by [action] in [timeframe]"

**CTA & Specialties** (Lines 16-20):
- Clear call to action (connect, message, view portfolio)
- Keyword-rich specialties list separated by | or •

Rules:
- Write in first person (I/my)
- Short paragraphs (2-3 lines max)
- Use line breaks for readability
- Naturally weave in 10-15 keywords
- Show personality while staying professional` : ""}

${section === "experience" || section === "full" ? `**EXPERIENCE SECTION**:

For each role, structure as:

**[Job Title] at [Company]** | [Date Range]

Brief overview: 1-2 sentences describing scope and impact.

Key achievements (3-5 bullets per role):
• [Power verb] + [Action] + [Quantified Result] + [Context/Impact]
• [Power verb] + [Action] + [Quantified Result] + [Context/Impact]

**Power Verbs by Category**:
- Leadership: Spearheaded, Orchestrated, Championed, Pioneered
- Growth: Accelerated, Scaled, Expanded, Grew, Increased
- Efficiency: Streamlined, Optimized, Automated, Consolidated
- Innovation: Designed, Developed, Launched, Created, Engineered
- Strategy: Formulated, Directed, Architected, Transformed

**Quantification Examples**:
- Revenue: "Generated $2.5M in new revenue" (not "increased sales")
- Efficiency: "Reduced processing time by 40%" (not "improved efficiency")
- Scale: "Led team of 15 across 3 countries" (not "managed team")
- Growth: "Grew user base from 10K to 150K in 18 months"` : ""}

${section === "skills" || section === "full" ? `**SKILLS SECTION**:
List skills in three tiers:

**Tier 1 - Pin These** (top 3 most strategic skills):
The skills most searched by recruiters for target roles

**Tier 2 - Core Competencies** (next 15-20):
Strong skills with endorsement potential

**Tier 3 - Supporting Skills** (remaining 25-30):
Relevant but secondary skills for comprehensive coverage

Include mix of: Technical skills, Tools/Platforms, Methodologies, Soft skills` : ""}

### 3. ATS & ALGORITHM OPTIMIZATION
- Use standard section headers (LinkedIn recognizes these)
- Include exact-match job titles (not creative alternatives)
- Spell out acronyms AND include abbreviations (e.g., "Search Engine Optimization (SEO)")
- Use industry-standard terminology
- Include location-relevant keywords if targeting specific markets
- Maintain consistent keyword density across all sections

### 4. ENGAGEMENT OPTIMIZATION
- Use formatting that encourages "See More" clicks (strong opening)
- Include elements that drive profile interaction (questions, CTAs)
- Structure content for mobile readability (short paragraphs)
- Add relevant hashtags in about section (3-5 max)

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Primary job title appears in headline and about section
2. ✓ At least 15-20 relevant keywords are naturally woven throughout
3. ✓ Achievements are quantified (numbers, %, $, timeframes)
4. ✓ ${experienceLevel}-appropriate tone and content depth
5. ✓ ${industry}-specific terminology and keywords are included
6. ✓ No clichés without evidence (e.g., "results-driven" must have results)
7. ✓ Character limits are respected (headline: 220, about: 2600)
8. ✓ Content reads naturally—not keyword-stuffed
9. ✓ First-person voice in about section, third-person acceptable in headline
10. ✓ Clear call-to-action is included
11. ✓ ATS-friendly formatting (standard headers, no special characters)
12. ✓ Content differentiates from generic profiles in the same role

## CURRENT PROFILE CONTENT TO OPTIMIZE
${input}

## OUTPUT FORMAT

${section === "full" ? "Present each section (Headline, About, Experience, Skills) with clear headers and the optimized content ready to copy-paste directly into LinkedIn." : `Present the optimized ${section} section ready to copy-paste directly into LinkedIn.`}

Include a brief "Changes Made" summary at the end highlighting the key optimizations applied.

Do NOT include:
- Generic buzzwords without supporting evidence
- Content that fabricates achievements not implied by the input
- Overly casual or unprofessional language
- Formatting that doesn't work on LinkedIn's platform
- Your commentary about the optimization process

Provide the optimized LinkedIn content:`;
};


const features = [
  {
    icon: Search,
    title: "SEO-Optimized Keywords",
    desc: "Include industry-specific keywords that recruiters and hiring managers actively search for on LinkedIn.",
  },
  {
    icon: TrendingUp,
    title: "ATS-Friendly Format",
    desc: "Content structured to pass Applicant Tracking Systems and rank higher in LinkedIn search results.",
  },
  {
    icon: Award,
    title: "Achievement-Focused",
    desc: "Highlight measurable accomplishments and unique value proposition that make you stand out.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Input Content",
    desc: "Paste your current LinkedIn section or describe your professional background",
    icon: Linkedin,
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title: "Select Options",
    desc: "Choose your industry, experience level, and optimization focus",
    icon: Target,
    color: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title: "Get Optimized",
    desc: "Receive SEO-optimized, recruiter-friendly LinkedIn content instantly",
    icon: Award,
    color: "from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name: "Resume Bullets",
    slug: "resume-bullets",
    icon: Target,
    color: "text-amber-600",
  },
  {
    name: "Cover Letter Writer",
    slug: "cover-letter-writer",
    icon: FileText,
    color: "text-yellow-600",
  },
  {
    name: "Interview Generator",
    slug: "interview-generator",
    icon: Briefcase,
    color: "text-orange-600",
  },
  {
    name: "Bio Generator",
    slug: "bio-generator",
    icon: Users,
    color: "text-purple-600",
  },
];

const faqs = [
  {
    question: "What is LinkedIn Profile Optimization and why is it important?",
    answer:
      "LinkedIn Profile Optimization is the process of enhancing your LinkedIn profile to increase visibility, attract recruiters, and showcase your professional brand effectively. It involves strategically incorporating industry-specific keywords, highlighting achievements with quantifiable results, using compelling language, and formatting content to be both human-readable and ATS-friendly. An optimized profile can increase your chances of being discovered by recruiters by up to 40x, as LinkedIn's algorithm prioritizes profiles with complete, keyword-rich content. It's crucial because over 90% of recruiters use LinkedIn to find candidates, and your profile is often the first impression you make on potential employers. A well-optimized profile positions you as an industry expert, increases connection requests from relevant professionals, and opens doors to career opportunities you might not find through traditional job boards. The key is to balance professional credibility with personal authenticity while ensuring your profile appears in relevant searches.",
  },
  {
    question: "How does the LinkedIn Optimizer tool work?",
    answer:
      "Our LinkedIn Optimizer uses advanced AI to analyze your current profile content and transform it into recruiter-friendly, SEO-optimized text. The tool first identifies your industry, experience level, and career goals, then researches the most effective keywords recruiters use when searching for professionals in your field. It restructures your content to lead with impact, using strong action verbs and quantified achievements that demonstrate value. The AI ensures your profile passes Applicant Tracking Systems (ATS) by using standard formatting and relevant terminology. For headlines, it creates attention-grabbing statements that showcase your unique value proposition. For About sections, it crafts compelling narratives that tell your professional story while naturally incorporating keywords. For Experience sections, it transforms job descriptions into achievement-focused bullet points. The tool also suggests strategic improvements like adding industry certifications, skills, and accomplishments that increase profile completeness scores. All optimizations follow LinkedIn's best practices to maximize visibility without appearing spammy or keyword-stuffed.",
  },
  {
    question: "Is this LinkedIn Optimizer tool free to use?",
    answer:
      "Yes, our LinkedIn Optimizer is completely free to use with no hidden fees or premium tiers required. You can optimize your headline, about section, experience sections, or entire profile as many times as you need without any cost. We believe that career advancement tools should be accessible to everyone, regardless of their financial situation. The tool provides professional-quality optimizations that you might otherwise pay hundreds of dollars for through career coaching services or professional LinkedIn profile writers. There are no limits on the number of optimizations you can generate, and you retain full ownership of all content created. We don't require credit card information or email registration to use the basic features. Our goal is to democratize access to career development resources and help professionals at all levels increase their visibility on LinkedIn. The tool saves your optimization history locally in your browser for convenience, but all data remains private and under your control. Future premium features may include personalized coaching or industry-specific templates, but the core optimization functionality will always remain free.",
  },
  {
    question: "What sections of my LinkedIn profile should I optimize first?",
    answer:
      "Start with your headline and About section, as these are the most critical for LinkedIn visibility and recruiter engagement. Your headline appears in search results and is limited to 220 characters, making it prime real estate for keywords and your value proposition. A strong headline should include your current role, key skills, and what makes you unique—avoid generic titles like 'Marketing Professional' and instead use 'Digital Marketing Strategist | SEO Expert | Driving 200% ROI Growth for B2B SaaS Companies.' Next, optimize your About section (formerly Summary), which allows 2,600 characters to tell your professional story. This is where you showcase personality, career highlights, core competencies, and what you're passionate about. After these, optimize your Experience section by transforming job descriptions into achievement-focused bullet points with quantified results. Also ensure your Skills section includes industry-specific keywords (you can add up to 50 skills). Profile completeness matters—LinkedIn profiles with complete information receive 21x more profile views. Don't forget to optimize your profile photo, background banner, and featured section. A complete, keyword-optimized profile ranks higher in recruiter searches and appears more credible to viewers.",
  },
  {
    question:
      "How do I use keywords effectively on LinkedIn to attract recruiters?",
    answer:
      "Effective keyword usage on LinkedIn requires strategic placement, natural integration, and industry relevance. Start by researching job descriptions in your target roles to identify frequently used skills, tools, certifications, and qualifications—these are what recruiters search for. Incorporate primary keywords in your headline, About section, and throughout your Experience sections, but avoid keyword stuffing which LinkedIn's algorithm penalizes. Use variations and related terms (e.g., 'project management,' 'PMP certified,' 'agile methodology') to capture different search queries. Place your most important keywords in the first 2-3 lines of your About section, as this appears in search previews. Include both hard skills (technical abilities like 'Python programming,' 'financial analysis') and soft skills ('leadership,' 'cross-functional collaboration'). Add keywords to your Skills section, as recruiters often filter by specific skills. Use them in job titles when accurate (e.g., 'Senior Data Analyst' not just 'Analyst'). Mention industry-specific tools, software, certifications, and methodologies relevant to your field. Update keywords periodically as industry trends evolve. Remember that LinkedIn's algorithm also considers engagement, so keywords should enhance readability, not replace compelling storytelling about your achievements and career journey.",
  },
  {
    question:
      "Will optimizing my LinkedIn profile help me get more recruiter views and job offers?",
    answer:
      "Yes, optimizing your LinkedIn profile significantly increases recruiter visibility and can directly lead to more job opportunities. Profiles with strategic keyword optimization appear up to 40 times more often in recruiter searches compared to generic profiles. LinkedIn data shows that profiles with complete information and regular activity receive 21x more profile views and 9x more connection requests. Recruiters use LinkedIn's search filters extensively, sorting by industry, skills, experience level, and location—an optimized profile matches these search criteria more effectively. When recruiters find your profile, compelling content and clear value proposition increase the likelihood they'll reach out. Many professionals report receiving 3-5x more InMail messages from recruiters within weeks of optimization. However, profile optimization is just one piece of career success—combine it with active networking, engaging with content, building authentic connections, and applying to positions directly. The most successful LinkedIn users post regularly, comment thoughtfully on industry discussions, and maintain an active presence. Think of your optimized profile as your 24/7 career advocate, working even when you're not actively job searching. It positions you for opportunities you might never discover otherwise, including roles that aren't publicly advertised. Many executive-level positions are filled through LinkedIn outreach, making optimization essential for career advancement.",
  },
];

const placeholders = [
  "Software Engineer | Full-Stack Developer | React, Node.js, Python Expert | Building Scalable Solutions",
  "About: Passionate marketing professional with 5+ years driving B2B growth. Led campaigns generating $2M+ revenue. Expertise in content strategy, SEO, and marketing automation. Seeking opportunities to help SaaS companies scale their customer acquisition.",
  "Current role: Product Manager at Tech Startup. 3 years experience launching mobile apps with 1M+ downloads. Strong in user research, agile methodology, and cross-functional team leadership.",
  "Sales professional with 7 years in enterprise B2B. Consistently exceeding quota by 150%. Expert in consultative selling, account management, and building C-suite relationships. Looking to join high-growth fintech company.",
  "Healthcare administrator with MBA and 10+ years hospital management experience. Led department transformations improving patient satisfaction by 40%. Skilled in operations optimization, budgeting, and regulatory compliance.",
  "Tech leader specializing in AI/ML solutions. Built data science teams at Fortune 500 companies. Open to remote CTO or VP Engineering roles. Passionate about using technology to solve complex business problems.",
];

export default function LinkedInOptimizerClient() {
  return (
    <PremiumToolWrapper
      toolName="LinkedIn Profile Optimizer"
      toolSlug="linkedin-optimizer"
      tagline="Get noticed by recruiters on LinkedIn"
      description="Optimize your LinkedIn profile with SEO keywords and compelling content that attracts opportunities and increases visibility."
      badge="Professional Branding"
      category="Career Tools"
      categorySlug="career-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
    >
      <div className="mx-6 mb-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/80 dark:bg-sky-950/30 px-4 py-3 text-sm text-sky-950 dark:text-sky-100">
        <strong className="font-semibold">Headline tip:</strong> Role | who you
        help | proof/outcome. Keep voice human — AI drafts, you personalize.{" "}
        <a
          href="/blog/linkedin-headline-about-formula"
          className="underline font-medium hover:no-underline"
        >
          Headline + About formula →
        </a>
      </div>
      <EnhancedToolLayout
        toolSlug="linkedin-optimizer"
        toolName="LinkedIn Profile Optimizer"
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
        promptTemplate={generatePrompt}
        inputRows={12}
        toolOptions={toolOptions}
        resultLabel="✨ Optimized LinkedIn Content"
        generateButtonText="🚀 Optimize Profile"
        inputLabel="💼 Current LinkedIn Content"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        supportedFormats={["text", "markdown"]}
      />
      <FAQSection faqs={faqs} />
    </PremiumToolWrapper>
  );
}
