"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Target,
  FileText,
  Briefcase,
  Lightbulb,
  Award,
  Rocket,
  Users,
  Star,
  Zap,
  TrendingUp,
  CheckCircle,
} from"lucide-react";

const toolOptions = [
  {
    id:"industry",
    label:"Industry",
    type:"select" as const,
    options: [
      { value:"tech", label:"💻 Technology" },
      { value:"marketing", label:"📈 Marketing" },
      { value:"finance", label:"💰 Finance" },
      { value:"healthcare", label:"🏥 Healthcare" },
      { value:"education", label:"🎓 Education" },
      { value:"general", label:"📋 General" },
    ],
    defaultValue:"general",
  },
  {
    id:"style",
    label:"Bullet Style",
    type:"select" as const,
    options: [
      { value:"action", label:"⚡ Action-Oriented" },
      { value:"impact", label:"📊 Impact-Focused" },
      { value:"skills", label:"🛠️ Skills-Based" },
    ],
    defaultValue:"impact",
  },
  {
    id:"bulletCount",
    label:"Number of Bullets",
    type:"select" as const,
    options: [
      { value:"3", label:"3 Bullets" },
      { value:"5", label:"5 Bullets" },
      { value:"7", label:"7 Bullets" },
    ],
    defaultValue:"5",
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const industry = options?.industry ||"general";
  const style = options?.style ||"impact";
  const bulletCount = options?.bulletCount ||"5";

  const styleDescriptions: Record<string, string> = {
    action:"Lead with powerful action verbs showing leadership and initiative. Focus on what you actively DID and accomplished.",
    impact:"Emphasize quantifiable results and measurable achievements. Every bullet should demonstrate concrete value delivered.",
    skills:"Showcase specific technical and professional competencies. Highlight tools, technologies, and methodologies mastered.",
  };

  const industryGuidance: Record<string, string> = {
    tech:"Include programming languages, frameworks, tools, and tech stack. Emphasize scalability, performance improvements, system design, and innovation metrics.",
    marketing:"Highlight campaign ROI, engagement rates, conversion metrics, audience growth, brand awareness increases, and data-driven strategies.",
    finance:"Emphasize revenue generation, cost savings, ROI percentages, portfolio performance, risk mitigation, and financial analysis results.",
    healthcare:"Focus on patient outcomes, care quality improvements, compliance achievements, safety metrics, efficiency gains, and compassionate care delivery.",
    education:"Highlight student achievement gains, curriculum innovations, engagement improvements, learning outcomes, program development, and educational impact.",
    general:"Use universally professional language. Focus on leadership, team collaboration, process improvements, and measurable business outcomes.",
  };

  const actionVerbsByCategory = {
    leadership:"Led, Directed, Managed, Supervised, Coordinated, Orchestrated, Spearheaded, Championed",
    achievement:"Achieved, Accomplished, Attained, Exceeded, Surpassed, Delivered, Generated, Produced",
    improvement:"Improved, Enhanced, Optimized, Streamlined, Transformed, Revitalized, Upgraded, Modernized",
    creation:"Developed, Created, Built, Designed, Engineered, Established, Launched, Implemented",
    analysis:"Analyzed, Evaluated, Assessed, Investigated, Researched, Identified, Diagnosed, Measured"
  };

  return`You are an expert resume writer and career coach specializing in ATS-optimized, achievement-focused resume bullet points. Your task is to transform job experiences into compelling, quantified accomplishments that pass Applicant Tracking Systems and impress hiring managers.

## YOUR TASK
Generate ${bulletCount} powerful, distinct resume bullet points for a ${industry} role using the ${style} style.

## SPECIFICATIONS
**Industry**: ${industry} - ${industryGuidance[industry]}
**Style**: ${style.toUpperCase()} - ${styleDescriptions[style]}
**Quantity**: Exactly ${bulletCount} unique, non-repetitive bullets
**Length**: 1-2 lines each (15-25 words optimal)

## RESUME BULLET FRAMEWORK

### 1. ACTION VERB SELECTION
Start EVERY bullet with a strong action verb (past tense for previous roles):
- **Leadership**: ${actionVerbsByCategory.leadership}
- **Achievement**: ${actionVerbsByCategory.achievement}
- **Improvement**: ${actionVerbsByCategory.improvement}
- **Creation**: ${actionVerbsByCategory.creation}
- **Analysis**: ${actionVerbsByCategory.analysis}

❌ Avoid weak verbs: Helped, Worked on, Was responsible for, Assisted, Handled
✅ Use power verbs: Spearheaded, Achieved, Transformed, Engineered, Orchestrated

### 2. QUANTIFICATION STRATEGY (Critical for Impact)

Include numbers in EVERY bullet possible using:

**Scale & Scope**:
- Team size:"Led 12-person cross-functional team"
- Budget:"Managed $2.5M annual budget"
- Users/Customers:"Serving 50K+ active users"
- Volume:"Processing 10K transactions daily"

**Results & Impact**:
- Percentages:"Increased revenue by 35%"
- Time savings:"Reduced processing time by 4 hours/week"
- Growth:"Grew customer base from 500 to 2,000"
- Cost reduction:"Cut operational costs by $150K annually"

**Comparison & Context**:
- Before/After:"Improved efficiency from 60% to 95%"
- vs. Target:"Exceeded sales goals by 125%"
- Rankings:"Ranked #1 in regional performance"
- Frequency:"Delivered 20+ presentations quarterly"

### CRITICAL HONESTY RULES
- Use ONLY facts, tools, roles, and numbers the user provided.
- If the user gives metrics, weave them in. If not, write strong qualitative bullets — do NOT invent percentages, revenue, headcount, or rankings.
- Prefer"Improved checkout reliability for peak traffic" over fake"Improved conversion 35%".
- Never invent employers, titles, tools, or certifications.

### 3. BULLET STRUCTURE FORMULA

Use this structure:
**[Action Verb] + [What You Did] + [How/Method] + [Result if known]**

Examples (patterns only — adapt to the user's real input):
✅"Spearheaded migration of legacy checkout to microservices, cutting deployment friction and improving release reliability"
✅"Led a cross-functional squad to ship a new onboarding flow used by new customers in the first quarter"
✅"Optimized SQL queries and caching, reducing page load times for high-traffic product pages"

### 4. ATS OPTIMIZATION KEYWORDS

Include industry-specific keywords naturally:
${industry ==="tech" ?"- Technical: Cloud computing, Agile, CI/CD, APIs, frameworks, programming languages\n- Leadership: Cross-functional, stakeholder management, technical leadership" :""}${industry ==="marketing" ?"- Marketing: SEO, SEM, content strategy, campaign management, social media, analytics\n- Metrics: ROI, conversion rate, engagement, brand awareness, lead generation" :""}${industry ==="finance" ?"- Finance: Financial modeling, risk assessment, portfolio management, compliance, forecasting\n- Analysis: Due diligence, variance analysis, P&L, budgeting, financial reporting" :""}${industry ==="healthcare" ?"- Healthcare: Patient care, compliance, HIPAA, clinical protocols, quality assurance\n- Outcomes: Patient satisfaction, treatment efficacy, safety metrics, care coordination" :""}${industry ==="education" ?"- Education: Curriculum development, pedagogy, assessment, learning outcomes, differentiation\n- Impact: Student achievement, engagement, retention, academic growth" :""}${industry ==="general" ?"- Universal: Leadership, project management, process improvement, collaboration, strategic planning\n- Skills: Problem-solving, communication, stakeholder engagement, data analysis" :""}

### 5. CONTENT FOCUS

**DO Include**:
- Specific achievements grounded in the user's input
- Initiative, problem-solving, and outcomes described honestly
- Real tools/methods the user mentioned
- Scope only when the user stated it (team size, budget, etc.)
- ${style ==="skills" ?"Technologies and competencies the user actually listed" : style ==="impact" ?"Real impact language — metrics only if user provided them" :"Strong action verbs and clear contributions"}

**DON'T Include**:
- Job duties with no achievement framing ("Responsible for...")
- Invented metrics, tools, or employers
- Personal pronouns (I, me, my, we)
- Empty buzzwords (synergy, leveraged, innovative) without substance
- Confidential data the user did not share

## QUALITY CHECKPOINTS

Before finalizing each bullet, verify:
1. ✓ Starts with a strong action verb
2. ✓ Uses real details from the user input (no invented numbers)
3. ✓ Length: ~12–25 words (1–2 lines)
4. ✓ Shows result or value, not only duty
5. ✓ Industry keywords used naturally when relevant
6. ✓ Specific and concrete
7. ✓ No personal pronouns
8. ✓ Unique from other bullets
9. ✓ Matches ${style} style
10. ✓ Exactly ${bulletCount} bullets

## JOB/EXPERIENCE DETAILS
${input}

## OUTPUT FORMAT

Provide ONLY the ${bulletCount} bullet points, formatted as:

• [First bullet point here]
• [Second bullet point here]
• [Third bullet point here]
${bulletCount ==="5" || bulletCount ==="7" ?"• [Continue for all" + bulletCount +" bullets]" :""}

Do NOT include:
- Explanations or commentary
- Numbering (use bullet points •)
- Section headers or categories
-"Bullet 1:","Bullet 2:" labels
- Meta-text about the bullets

Just ${bulletCount} polished, ATS-optimized resume bullets ready to copy directly into a resume.`;


};


const features = [
  {
    icon: Target,
    title:"ATS-Optimized",
    description:"Bullets formatted to pass Applicant Tracking Systems with industry-relevant keywords.",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: CheckCircle,
    title:"Quantifiable Results",
    description:"Focus on metrics and measurable achievements that demonstrate your impact.",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: Award,
    title:"Industry-Specific",
    description:"Tailored for Tech, Marketing, Finance, Healthcare, Education, or General industries.",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Share Experience",
    desc:"Describe your role and achievements",
    icon: Briefcase,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Pick Style",
    desc:"Choose industry and bullet format",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Bullets",
    desc:"Copy to your resume instantly",
    icon: Award,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Resume Bullet Generator?",
    answer:"The Resume Bullet Generator is an AI-powered tool that transforms your job experiences into powerful, achievement-focused resume bullet points. It creates ATS-optimized bullets with strong action verbs, quantifiable results, and industry-specific keywords that help you stand out to recruiters and hiring managers.",
  },
  {
    question:"What makes a good resume bullet?",
    answer:"Great resume bullets start with strong action verbs, show impact (not only duties), use industry keywords naturally, and stay truthful. Prefer real metrics when you have them. Pattern: Action + what you did + result. Example shape: 'Led a 10-person squad to ship checkout redesign, cutting support tickets for payment issues' — only use numbers you can defend in an interview.",
  },
  {
    question:"What bullet styles are available?",
    answer:"Choose from three styles: Action-Oriented (starts with powerful action verbs like Led, Developed, Achieved), Impact-Focused (emphasizes results and outcomes), or Skills-Based (highlights tools and competencies you actually used). Select based on what you want to emphasize for each role.",
  },
  {
    question:"How do I add numbers and metrics?",
    answer:"Paste real metrics from your experience: team size, budget, time saved, volume handled, rank, or conversion improvements you measured. The tool will weave numbers you provide into bullets. If you have no numbers, it writes strong qualitative impact lines instead of inventing fake percentages.",
  },
  {
    question:"What industries are supported?",
    answer:"We support six industries: Technology (for engineers, developers, IT professionals), Marketing (for marketers, content creators, brand managers), Finance (for accountants, analysts, financial advisors), Healthcare (for nurses, doctors, healthcare administrators), Education (for teachers, professors, administrators), and General (applicable across all fields).",
  },
  {
    question:"Is the Resume Bullet Generator free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Cover Letter",
    slug:"cover-letter-writer",
    icon: FileText,
    color:"text-blue-600",
  },
  {
    name:"Interview Prep",
    slug:"interview-generator",
    icon: Lightbulb,
    color:"text-purple-600",
  },
  {
    name:"Bio Generator",
    slug:"bio-generator",
    icon: Award,
    color:"text-green-600",
  },
  {
    name:"Goal Planner",
    slug:"goal-planner",
    icon: Rocket,
    color:"text-orange-600",
  },
];

export default function ResumeBulletsClient() {
  return (
    <PremiumToolWrapper
      toolName="Resume Bullet Generator"
      toolSlug="resume-bullets"
      tagline="Create impactful resume bullets that get noticed"
      description="Transform your job experience into powerful, achievement-focused resume bullet points. ATS-optimized with quantifiable results and industry-specific keywords."
      badge="Career Booster"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Upgrade Your Resume"
      ctaDescription="Stand out from the competition with powerful resume bullets!"

      ctaIcon={Target}
    >
      <div className="mx-6 mb-4 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
        <strong className="font-semibold">Impact formula:</strong> Action verb +
        what you did + metric + result. Edit every AI line so it is true and
        specific to you.{""}
        <a
          href="/blog/resume-bullets-that-get-interviews"
          className="underline font-medium hover:no-underline"
        >
          Full guide →
        </a>
      </div>
      <EnhancedToolLayout
        toolSlug="resume-bullets"
        toolName="Resume Bullet Generator"
        placeholder={`💼 Describe your job responsibilities and achievements...

Examples:
• Job Title: Sales Manager at ABC Corp (2020-2023)
• Led a team of 10 sales representatives across 3 regions
• Increased regional sales from $2M to $3.5M annually (75% growth)
• Implemented new CRM system that reduced response time by 40%
• Trained and mentored 15 new hires with 90% retention rate

OR

• Software Engineer role developing web applications
• Built features using React, Node.js, and PostgreSQL
• Improved application performance and reduced load time
• Collaborated with cross-functional team of 12 people
• Deployed features that increased user engagement

💡 Tip: Include numbers, metrics, team sizes, percentages, and specific achievements for better results!`}
        inputRows={10}
        maxHistoryItems={10}
        toolOptions={toolOptions}
        promptTemplate={generatePrompt}
        resultLabel="🎯 Your Resume Bullets"
        generateButtonText="✨ Generate Bullets"

      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
