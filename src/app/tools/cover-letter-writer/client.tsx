"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  FileText,
  Briefcase,
  Target,
  Lightbulb,
  Mail,
  Award,
  Users,
  Star,
  Zap,
  CheckCircle,
  TrendingUp,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"jobType",
    label:"Job Type",
    type:"select" as const,
    options: [
      { value:"corporate", label:"🏢 Corporate" },
      { value:"startup", label:"🚀 Startup" },
      { value:"tech", label:"💻 Tech" },
      { value:"creative", label:"🎨 Creative" },
      { value:"academic", label:"🎓 Academic" },
      { value:"nonprofit", label:"🤝 Non-Profit" },
    ] as const,
    defaultValue:"corporate",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"professional", label:"👔 Professional" },
      { value:"enthusiastic", label:"✨ Enthusiastic" },
      { value:"confident", label:"💪 Confident" },
    ] as const,
    defaultValue:"professional",
  },
  {
    id:"experience",
    label:"Experience Level",
    type:"select" as const,
    options: [
      { value:"entry", label:"🌱 Entry Level" },
      { value:"mid", label:"📈 Mid-Level" },
      { value:"senior", label:"🎯 Senior" },
    ] as const,
    defaultValue:"mid",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const jobType = options?.jobType ||"corporate";
  const tone = options?.tone ||"professional";
  const experience = options?.experience ||"mid";

  const toneGuidance: Record<string, string> = {
    professional:"Formal, polished, business-appropriate language. Respectful and measured. Professional vocabulary without being stiff.",
    enthusiastic:"Genuine excitement and energy about the opportunity. Positive, eager tone while maintaining professionalism. Show passion authentically.",
    confident:"Strong self-assurance and assertiveness about abilities. Clear value proposition. Demonstrate competence without arrogance.",
  };

  const experienceGuidance: Record<string, string> = {
    entry:"Emphasize education, coursework, internships, projects, volunteer work, and transferable skills. Show eagerness to learn, adaptability, and fresh perspective. Highlight potential over extensive experience.",
    mid:"Showcase 3-5+ years relevant experience with quantified achievements. Proven track record of results. Balance demonstrated expertise with growth potential and leadership readiness.",
    senior:"Highlight 7-10+ years expertise with strategic impact. Leadership experience managing teams/projects. Industry thought leadership. Significant measurable achievements at scale. Executive presence and vision.",
  };

  const jobTypeStrategy: Record<string, string> = {
    corporate:"Professional corporate standards. Emphasize team collaboration, business impact, cultural fit. Formal structure and business outcomes.",
    startup:"Highlight adaptability, innovation, wearing multiple hats. Show entrepreneurial mindset, quick learning, comfort with ambiguity. Fast-paced energy.",
    nonprofit:"Emphasize mission alignment, passion for cause, community impact. Show values-driven motivation. Balance passion with professional competence.",
    creative:"Showcase creativity, portfolio highlights, innovative thinking. Can be less formal but still professional. Personality and unique perspective valued.",
    technical:"Highlight technical skills, projects, problem-solving abilities. Include specific technologies and methodologies. Demonstrate technical expertise clearly.",
    remote:"Emphasize self-motivation, communication skills, remote work experience. Highlight async collaboration, time management, and proven remote productivity.",
  };

  return`You are an expert career counselor, professional resume writer, and hiring psychology specialist. Your task is to craft a compelling, ATS-optimized cover letter that positions the candidate as the ideal fit while demonstrating genuine interest and cultural alignment.

## YOUR TASK
Write a persuasive ${experience}-level cover letter for a ${jobType} position with a ${tone} tone that captures hiring manager attention and secures an interview.

## SPECIFICATIONS
**Job Type**: ${jobType} - ${jobTypeStrategy[jobType]}
**Experience Level**: ${experience.toUpperCase()} - ${experienceGuidance[experience]}
**Tone**: ${tone.toUpperCase()} - ${toneGuidance[tone]}
**Target Length**: 300-400 words (3-4 concise paragraphs)
**Format**: Professional business letter structure

## HIRING PSYCHOLOGY PRINCIPLES

### What Hiring Managers Look For:
1. **Immediate relevance**: Can they do the job now?
2. **Cultural fit**: Will they thrive here?
3. **Motivation**: Why this role, why this company?
4. **Value proposition**: What unique value do they bring?
5. **Communication skills**: Can they articulate clearly?
6. **Attention to detail**: Error-free, professional presentation

### Differentiation Strategy:
- **Not a resume repeat**: Provide context and narrative, not bullet points
- **Storytelling**: Use specific examples and anecdotes
- **Company research**: Show genuine knowledge and interest
- **Quantified impact**: Numbers make achievements concrete
- **Personality**: Let authentic voice and enthusiasm shine through

## COVER LETTER STRUCTURE

### PARAGRAPH 1: POWERFUL OPENING (3-4 sentences)
**Purpose**: Hook attention immediately and establish fit

**Components**:
- **Position statement**:"I'm writing to apply for [Specific Position] at [Company]"
- **How you found it**:"advertised on LinkedIn" /"referred by [Name]" /"following your company's growth"
- **Compelling hook**: ${experience ==="entry" ?"Share relevant project, coursework, or passion for field" : experience ==="mid" ?"Lead with impressive achievement or relevant expertise" :"Open with significant leadership accomplishment or industry insight"}
- **Thesis statement**: Brief preview of why you're the ideal candidate

**Example opening**:"I'm excited to apply for the Senior Marketing Manager position at TechCorp, advertised on LinkedIn. Having led digital marketing strategies that generated $2M+ in revenue growth, I'm drawn to your mission of democratizing technology education and believe my track record of scaling B2B campaigns aligns perfectly with your expansion goals."

### PARAGRAPH 2: CORE QUALIFICATIONS (5-6 sentences)
**Purpose**: Prove you can excel in this specific role

**Content Strategy**:
- Lead with most relevant qualification for THIS job
- Provide 2-3 specific accomplishments with metrics
- Use the STAR method implicitly (Situation, Task, Action, Result)
- Connect each point directly to job requirements
- ${experience ==="senior" ?"Emphasize leadership and strategic impact" : experience ==="mid" ?"Balance technical skills with results achieved" :"Highlight projects, internships, or relevant coursework"}
- Include numbers: percentages, dollar amounts, team sizes, time saved

**Quantification Examples**:
-"Increased conversion rates by 35%"
-"Led team of 8 across 3 departments"
-"Reduced processing time from 4 hours to 30 minutes"
-"Managed $500K budget while staying 10% under target"

### PARAGRAPH 3: WHY THIS COMPANY (3-4 sentences)
**Purpose**: Demonstrate genuine interest and cultural fit

**Research-Based Content**:
- Reference specific company initiatives, products, or recent news
- Connect to company values or mission authentically
- Explain what excites you about THIS opportunity (not generic)
- Show cultural alignment with company's work style/environment
- ${jobType ==="startup" ?"Show enthusiasm for building and scaling" : jobType ==="nonprofit" ?"Connect to mission and impact goals" : jobType ==="creative" ?"Reference their creative work you admire" :"Demonstrate understanding of business objectives"}

**Avoid Generic Statements**: Not"I admire your innovative company" but"I'm impressed by your recent launch of [Specific Product] and its approach to [Specific Problem]"

### PARAGRAPH 4: STRONG CLOSING (2-3 sentences)
**Purpose**: Call-to-action and next steps

**Components**:
- Reaffirm enthusiasm for opportunity
- State clear availability for interview
- Professional call-to-action:"I'd welcome the opportunity to discuss how my experience in [key skill] can contribute to [company goal]"
- Thank them for consideration
- Professional sign-off:"Sincerely," or"Best regards,"

## ATS OPTIMIZATION

### Keyword Strategy:
- Include exact phrases from job description naturally
- Use industry-standard terminology and titles
- Avoid tables, graphics, or unusual formatting
- Repeat key qualifications from job posting
- ${jobType ==="technical" ?"Include specific technologies, languages, frameworks mentioned" : jobType ==="corporate" ?"Use business terminology and metrics" :"Match language style from job description"}

### Formatting for ATS:
- Standard business letter format
- Simple, clean structure
- No headers/footers with contact info
- Use standard fonts (when submitting)
- Standard section divisions

## WRITING QUALITY STANDARDS

### Tone Consistency:
- Maintain ${tone} tone throughout every sentence
- ${tone ==="enthusiastic" ?"Show energy without seeming desperate or unprofessional" : tone ==="confident" ?"Assert value without arrogance or ego" :"Professional polish without being stiff or robotic"}
- Balance confidence with humility
- Authentic voice, not generic template

### Language Excellence:
- Active voice:"I led" not"I was responsible for"
- Specific details: Names, numbers, concrete examples
- Vary sentence structure and length
- No clichés: Avoid"team player,""think outside the box,""hit the ground running"
- Zero errors: Perfect grammar, spelling, punctuation
- Professional vocabulary appropriate for ${experience} level

### Persuasion Techniques:
- Mirror language from job description
- Address potential concerns proactively
- Show enthusiasm without desperation
- Demonstrate you've done homework on company
- Frame experience as solution to their needs

## HONESTY (CRITICAL)
- Use ONLY details the candidate provided in the input.
- Do NOT invent employers, degrees, metrics, tools, or company facts.
- If metrics are missing, describe impact qualitatively.
- If company/role details are thin, keep"why this company" general but professional — do not invent product lines or values.

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Length: ~300-400 words (3-4 paragraphs)
2. ✓ Structure: Opening → Qualifications → Why company → Closing
3. ✓ Experience level fits ${experience}
4. ✓ Tone is consistently ${tone}
5. ✓ Metrics only if user provided them
6. ✓ No clichés or fabricated claims
7. ✓ Clear call-to-action
8. ✓ Perfect grammar
9. ✓ Distinct from a resume dump

## JOB & CANDIDATE DETAILS
${input}

## OUTPUT FORMAT

Provide the complete cover letter in standard business letter format:

[Formal greeting - use hiring manager name if provided, otherwise"Dear Hiring Manager,"]

[Paragraph 1: Opening hook]

[Paragraph 2: Core qualifications (honest, specific)]

[Paragraph 3: Why this company / role]

[Paragraph 4: Closing with CTA]

[Professional sign-off]
[Candidate name]

Do NOT include:
- Candidate's address/contact info header (that goes on resume/application)
- Date line
- Explanatory notes or commentary
- Section labels like"Opening:" or"Qualifications:"
- Multiple drafts or options
- Bracketed placeholders - fill in with realistic details from provided information

Write one polished, ready-to-submit cover letter that will get them the interview.`;
};


const features = [
  {
    icon: Target,
    title:"Job-Type Optimized",
    description:"Tailored for corporate, startup, tech, creative, academic, or non-profit positions with industry-specific language.",
  },
  {
    icon: TrendingUp,
    title:"Experience-Matched",
    description:"Adapts to entry, mid-level, or senior positions, emphasizing appropriate skills and achievements for your level.",
  },
  {
    icon: CheckCircle,
    title:"Results-Focused",
    description:"Highlights quantifiable achievements and specific examples that demonstrate your value to potential employers.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Details",
    desc:"Job title, company, and your background",
    icon: Briefcase,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Preferences",
    desc:"Choose job type, tone, and level",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Letter",
    desc:"Receive polished, ready-to-submit letter",
    icon: FileText,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Cover Letter Writer?",
    answer:"The Cover Letter Writer is an AI-powered tool that creates personalized, professional cover letters tailored to specific jobs and companies. It generates compelling letters that highlight your relevant skills, experiences, and achievements while demonstrating genuine interest in the position. Perfect for job seekers at any career level who want to stand out from other applicants.",
  },
  {
    question:"What information should I provide?",
    answer:"Include: the job title you're applying for, company name, your relevant skills and experiences, specific achievements (with numbers/metrics if possible), why you're interested in this role, and any research you've done about the company. The more specific details you provide, the more personalized and compelling your cover letter will be.",
  },
  {
    question:"What job types are supported?",
    answer:"We support six job types: Corporate (traditional businesses and large companies), Startup (fast-paced, entrepreneurial environments), Tech (software, IT, engineering roles), Creative (design, marketing, media positions), Academic (teaching, research, university roles), and Non-Profit (mission-driven organizations). Each type uses appropriate industry language and emphasis.",
  },
  {
    question:"How do the tone options work?",
    answer:"Choose from three tones: Professional (formal, polished, business-appropriate), Enthusiastic (energetic, showing genuine excitement while remaining professional), or Confident (assertive, demonstrating strong self-assurance in your abilities). Select the tone that best matches your personality and the company culture.",
  },
  {
    question:"What's the difference between experience levels?",
    answer:"Entry Level emphasizes education, internships, projects, and transferable skills with eagerness to learn. Mid-Level highlights relevant work experience, accomplishments, and proven track record. Senior showcases leadership experience, strategic thinking, significant achievements, and industry expertise. The AI adjusts focus and language accordingly.",
  },
  {
    question:"Is the Cover Letter Writer free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Resume Bullets",
    slug:"resume-bullets",
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
    name:"Email Writer",
    slug:"email-writer",
    icon: Mail,
    color:"text-green-600",
  },
  {
    name:"Goal Planner",
    slug:"goal-planner",
    icon: Award,
    color:"text-orange-600",
  },
];

export default function CoverLetterWriterClient() {
  return (
    <PremiumToolWrapper
      toolName="Write a Cover Letter for Any Job Free"
      toolSlug="cover-letter-writer"
      tagline="Free AI cover letter — tailor, personalize, apply"
      description="Paste the role, company, and your background for a job-specific draft. No login to start—always add a real story before you send."
      badge="Career Essential"
      category="Career Tools"
      categorySlug="career-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Start Your Application"
      ctaDescription="Get noticed by hiring managers with a standout cover letter!"
      ctaButtonText="Write Cover Letter"
      ctaIcon={FileText}
    >
      <EnhancedToolLayout
        toolSlug="cover-letter-writer"
        toolName="Write a Cover Letter for Any Job Free"
        placeholder={`💼 Enter your job application details...

Include:
• Job title and company name
• Your relevant skills and experience
• Specific achievements (with numbers/metrics)
• Why you're interested in this role/company
• Any company research you've done

Example:

Job Title: Senior Product Manager at TechCorp
Company: TechCorp is a leading SaaS company focused on productivity tools

My Background:
• 5 years of product management experience in B2B SaaS
• Led product that grew from 10K to 100K users in 18 months
• Increased customer retention by 35% through feature improvements
• Experience with agile development and cross-functional teams
• MBA from Stanford, BS in Computer Science

Why I'm interested:
• Passionate about TechCorp's mission to empower remote teams
• Impressed by recent launch of AI-powered productivity features
• Want to contribute to scaling products in fast-growing market
• Align with company values of innovation and customer focus

Skills: Product strategy, user research, data analytics, stakeholder management, roadmap planning, A/B testing

💡 Tip: Include specific numbers, achievements, and company research for the most compelling cover letter!`}
        inputRows={12}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📄 Your Cover Letter"
        generateButtonText="✍️ Write Cover Letter"
        showCopyButton={true}
        showDownloadButton={true}
        showWordCount={true}
        showFeedbackButtons={true}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
