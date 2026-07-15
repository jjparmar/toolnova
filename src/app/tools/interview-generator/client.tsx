"use client";

import EnhancedToolLayout from "@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";
import { FAQSection } from "@/components/FAQSection";
import { ToolOption } from "@/components/ToolLayout";
import {
  FileText,
  Briefcase,
  Target,
  Lightbulb,
  Users,
  MessageCircle,
  Star,
  Zap,
  CheckCircle,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

const toolOptions = [
  {
    id: "roleType",
    label: "Role Type",
    type: "select" as const,
    options: [
      { value: "technical", label: "💻 Technical" },
      { value: "behavioral", label: "🤝 Behavioral" },
      { value: "managerial", label: "👔 Managerial" },
      { value: "creative", label: "🎨 Creative" },
      { value: "general", label: "📋 General" },
    ] as const,
    defaultValue: "general",
  },
  {
    id: "difficulty",
    label: "Difficulty",
    type: "select" as const,
    options: [
      { value: "entry", label: "🌱 Entry Level" },
      { value: "mid", label: "📈 Mid Level" },
      { value: "senior", label: "🎯 Senior Level" },
    ] as const,
    defaultValue: "mid",
  },
  {
    id: "includeAnswers",
    label: "Include Sample Answers",
    type: "toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const roleType = options?.roleType || "general";
  const difficulty = options?.difficulty || "mid";
  const includeAnswers = options?.includeAnswers !== false;

  const roleGuidance: Record<string, string> = {
    technical:
      "Coding problems, algorithms, system design, debugging scenarios, technical concepts, architecture decisions, problem-solving approach, code quality, and scalability thinking.",
    behavioral:
      "Past experiences using STAR method, teamwork scenarios, conflict resolution, adaptability, leadership moments, failure handling, communication skills, and cultural fit.",
    managerial:
      "Leadership philosophy, team building, performance management, strategic planning, difficult conversations, delegation, stakeholder management, and organizational impact.",
    creative:
      "Portfolio review, creative process, design thinking, innovation approach, handling feedback, collaboration with non-creatives, meeting deadlines, and project examples.",
    general:
      "Balanced mix: background/experience (30%), technical/role skills (40%), motivation/culture fit (20%), scenario-based problem-solving (10%).",
  };

  const difficultyGuidance: Record<string, string> = {
    entry:
      "Foundation and potential focus. Questions about education, projects, internships, willingness to learn, basic skills, cultural fit, and career goals. Assess aptitude over experience.",
    mid: "Experience and accomplishment focus. Questions about specific work achievements, technical depth, independent work, collaboration, problem-solving, and growth trajectory. Expect concrete examples.",
    senior:
      "Leadership and strategic focus. Questions about organizational impact, mentoring, decision-making, handling ambiguity, driving initiatives, technical leadership, and long-term vision. Expect executive-level thinking.",
  };

  const answerStrategy = includeAnswers
    ? "For each question, provide a strong model answer (150-200 words) using STAR method where applicable. Include specific metrics, outcomes, and what interviewers assess. Add brief 'What Interviewers Look For' guidance."
    : "Questions only. Include brief 'What Interviewers Look For' note after each question to guide preparation.";

  return `You are an expert interview coach, recruiter, and talent assessment specialist with extensive experience preparing candidates for successful interviews across industries and roles.

## YOUR TASK
Generate 10 strategic ${roleType} interview questions for ${difficulty}-level positions that effectively assess candidate qualifications and readiness.

## SPECIFICATIONS
**Interview Type**: ${roleType.toUpperCase()} - ${roleGuidance[roleType] || roleGuidance.general}
**Level**: ${difficulty.toUpperCase()} - ${difficultyGuidance[difficulty] || difficultyGuidance.mid}
**Sample Answers**: ${answerStrategy}
**Quantity**: Exactly 10 distinct, non-repetitive questions
**Purpose**: Assess both competency and cultural fit authentically

## HONESTY
- Tailor questions to the role/context the user described (see JOB/ROLE DETAILS below).
- Sample answers are EXAMPLES only — never present them as the user's real experience.
- Do not invent employers, metrics, or credentials for the candidate.

## INTERVIEW DESIGN FRAMEWORK

### 1. QUESTION STRUCTURE & PROGRESSION

**Question Distribution**:
- **Warmup** (Q1-2): Easier questions to build rapport and confidence
- **Core Assessment** (Q3-7): Substantive questions testing key competencies
- **Challenging** (Q8-9): Difficult scenarios or deep technical probing
- **Closing** (Q10): Forward-looking or candidate questions

**Difficulty Calibration**:
- ${difficulty === "entry" ? "Focus on potential, learning agility, foundational skills\n- Avoid requiring extensive work experience\n- Ask about projects, coursework, internships" : ""}${difficulty === "mid" ? "Balance between technical depth and soft skills\n- Expect 3-5 years relevant experience\n- Focus on specific accomplishments with metrics" : ""}${difficulty === "senior" ? "Executive-level strategic thinking required\n- Expect 7-10+ years with leadership experience\n- Focus on organizational impact and vision" : ""}

### 2. QUESTION TYPES TO INCLUDE

${roleType === "technical" ? "**Technical Interview Types**:\n- **Coding/Algorithm** (2-3 questions): Live coding, algorithm design, complexity analysis\n- **System Design** (2 questions): Architecture, scalability, trade-offs\n- **Debugging** (1 question): Troubleshooting, problem diagnosis\n- **Theoretical** (2 questions): Concepts, best practices, technical decisions\n- **Past Projects** (2 questions): Technical challenges solved, technologies used" : ""}

${roleType === "behavioral" ? "**Behavioral Interview Types**:\n- **Teamwork** (2 questions): Collaboration, conflict resolution\n- **Leadership** (2 questions): Taking initiative, influencing others\n- **Problem-Solving** (2 questions): Handling challenges, creative solutions\n- **Adaptability** (2 questions): Change management, learning from failure\n- **Communication** (2 questions): Stakeholder management, difficult conversations" : ""}

${roleType === "managerial" ? "**Managerial Interview Types**:\n- **Leadership Style** (2 questions): Management philosophy, team building\n- **Performance Management** (2 questions): Handling underperformance, development\n- **Strategic Thinking** (2 questions): Planning, resource allocation, vision\n- **Difficult Decisions** (2 questions): Trade-offs, tough calls, stakeholder management\n- **Team Development** (2 questions): Hiring, mentoring, culture building" : ""}

${roleType === "creative" ? "**Creative Interview Types**:\n- **Portfolio Discussion** (2 questions): Specific project deep-dives\n- **Creative Process** (2 questions): Ideation to execution workflow\n- **Collaboration** (2 questions): Working with stakeholders, feedback handling\n- **Problem-Solving** (2 questions): Design challenges, constraints\n- **Innovation** (2 questions): Staying current, pushing boundaries" : ""}

${roleType === "general" ? "**General Interview Mix**:\n- **Background** (2 questions): Experience, motivation, career goals\n- **Role-Specific Skills** (3 questions): Key competencies for the position\n- **Behavioral** (2 questions): Teamwork, problem-solving scenarios\n- **Cultural Fit** (2 questions): Values, work style, long-term fit\n- **Situational** (1 question): Hypothetical scenario handling" : ""}

### 3. QUESTION QUALITY STANDARDS

**Effective Questions Are**:
- **Open-ended**: Require detailed answers, not yes/no
- **Specific**: Target particular competencies or experiences
- **Relevant**: Directly related to role requirements
- **Revealing**: Expose thinking process, values, and abilities
- **Fair**: Appropriate for experience level, no trick questions

**Avoid**:
- ❌ Generic questions ("What's your biggest weakness?")
- ❌ Overly personal or illegal questions
- ❌ Questions with obvious "right" answers
- ❌ Repetitive variations of same question
- ❌ Questions requiring confidential information

### 4. STAR METHOD FRAMEWORK (For Behavioral Questions)
${includeAnswers ? "\nWhen providing sample answers for behavioral questions, use:\n\n**S - Situation**: Set context (2-3 sentences)\n- Where, when, what was happening\n- Relevant background information\n\n**T - Task**: Your responsibility (1-2 sentences)\n- What you needed to accomplish\n- Your specific role or challenge\n\n**A - Action**: What you did (3-4 sentences)\n- Specific steps you took\n- Skills/tools you used\n- Your decision-making process\n\n**R - Result**: Outcomes (2-3 sentences)\n- Quantifiable results with metrics\n- What you learned\n- Impact on team/company\n\n**Metrics to Include**: percentages, dollar amounts, time saved, team size, customer satisfaction scores, etc." : ""}

### 5. SAMPLE ANSWER REQUIREMENTS
${
  includeAnswers
    ? `
**Answer Structure**:
- **Length**: 150-200 words per answer
- **Tone**: Professional, confident, authentic
- **Content**: Specific and detailed, not vague generalities
- **Metrics**: Include 2-3 quantifiable results
- **Learning**: Show growth or takeaway from experience

**Answer Quality Markers**:
- Uses first person ("I led..." not "We did...")
- Specific names, numbers, timeframes (not "a few" or "some")
- Shows problem-solving process
- Demonstrates impact with evidence
- ${difficulty === "senior" ? "Strategic thinking and organizational impact" : difficulty === "mid" ? "Balance of skills and results" : "Enthusiasm and learning mindset"}
- Concise and well-structured

**What to Avoid in Answers**:
- Vague generalizations ("I'm a team player")
- Blaming others for failures
- Overly long rambling responses
- Taking credit for team accomplishments without acknowledging others
- Confidential company information
`
    : ""
}

### 6. ASSESSMENT GUIDANCE

For each question, include "**What Interviewers Look For**:" section covering:
- **Key competency** being evaluated
- **Green flags**: Strong answer indicators
- **Red flags**: Concerning responses
- **Follow-up potential**: What they might probe deeper on
- **${difficulty} level expectations**: Appropriate depth/sophistication

### 7. ROLE-SPECIFIC ELEMENTS

${roleType === "technical" ? "**Technical Questions Must**:\n- Test actual skills needed for the role\n- Include varied difficulty levels\n- Allow multiple solution approaches\n- Assess problem-solving process, not just answers\n- Cover both breadth and depth\n- Include system design for mid/senior levels" : ""}

${roleType === "behavioral" ? "**Behavioral Questions Must**:\n- Probe past actual experiences, not hypotheticals\n- Cover diverse competencies (leadership, teamwork, conflict, etc.)\n- Allow STAR method responses\n- Reveal character and values\n- Assess emotional intelligence and self-awareness" : ""}

${roleType === "managerial" ? "**Managerial Questions Must**:\n- Assess leadership philosophy and style\n- Test difficult people management scenarios\n- Evaluate strategic thinking ability\n- Probe conflict resolution and decision-making\n- Explore team development and culture building" : ""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Question count: Exactly 10 questions
2. ✓ Interview type: All ${roleType} questions appropriate
3. ✓ Level: Suitable for ${difficulty} candidates
4. ✓ Distribution: Warmup → Core → Challenging → Closing progression
5. ✓ Variety: Diverse question types, no repetition
6. ✓ Open-ended: All questions require detailed answers
7. ✓ Relevance: Directly related to role/industry specified
8. ✓ ${includeAnswers ? "Answers: STAR method used, 150-200 words, metrics included" : "Assessment guidance included"}
9. ✓ "What Interviewers Look For": Included for each question
10. ✓ No generic questions: All specific and meaningful
11. ✓ Fair and legal: No inappropriate or discriminatory questions
12. ✓ Actionable: Questions that actually reveal candidate quality

## JOB/ROLE DETAILS
${input}

## OUTPUT FORMAT

Provide questions numbered 1-10 in this format:

**1. [Question text here]**
${includeAnswers ? "\n**Sample Answer:**\n[Well-structured answer using STAR method if behavioral, 150-200 words]\n" : ""}
**What Interviewers Look For:**
[Brief guidance on assessment criteria, green/red flags, 40-60 words]

---

**2. [Next question]**
${includeAnswers ? "**Sample Answer:**\n[Answer]\n" : ""}
**What Interviewers Look For:**
[Assessment guidance]

---

[Continue for all 10 questions]

Do NOT include:
- Introductory text ("Here are the questions...")
- Explanations about the question structure
- General interview advice (focus on specific questions)
- Your commentary about the interview process
- Section headers like "Warmup Questions" or "Technical Questions" (just number 1-10)

Create interview questions that truly assess candidate readiness and fit:`;
};


const features = [
  {
    icon: Target,
    title: "Role-Specific Questions",
    description:
      "Get technical, behavioral, managerial, creative, or general questions tailored to your target position.",
  },
  {
    icon: CheckCircle,
    title: "STAR Method Answers",
    description:
      "Sample answers using the proven STAR framework with specific examples and measurable results.",
  },
  {
    icon: TrendingUp,
    title: "Level-Appropriate",
    description:
      "Questions matched to entry, mid, or senior level expectations with appropriate difficulty and depth.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Enter Role",
    desc: "Describe the position you're interviewing for",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title: "Set Options",
    desc: "Choose question type and difficulty",
    icon: Target,
    color: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title: "Practice",
    desc: "Review questions and ace your interview",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question: "What is the Interview Question Generator?",
    answer:
      "The Interview Question Generator is an AI-powered interview prep tool that creates role-specific, level-appropriate interview questions with optional sample answers. It helps job candidates prepare for technical, behavioral, managerial, creative, or general interviews by providing realistic questions they're likely to face, complete with STAR-method answers and expert tips.",
  },
  {
    question: "What's the STAR method?",
    answer:
      "STAR stands for Situation, Task, Action, Result - a proven framework for answering behavioral interview questions. Situation: describe the context. Task: explain what needed to be done. Action: detail what YOU specifically did. Result: share the measurable outcome. This method helps you give structured, compelling answers that demonstrate your capabilities with concrete examples.",
  },
  {
    question: "How many questions do I get?",
    answer:
      "You receive 10 carefully selected interview questions tailored to your role and experience level. Questions range from common interview queries to more challenging, role-specific ones. When sample answers are enabled, each question includes a detailed response with tips on what interviewers look for. You can generate multiple sets for comprehensive preparation.",
  },
  {
    question: "What role types are available?",
    answer:
      "Choose from five types: Technical (coding, system design, problem-solving), Behavioral (past experiences, soft skills, teamwork), Managerial (leadership, team management, strategy), Creative (portfolio, design process, innovation), or General (balanced mix covering all aspects). Each type focuses on questions relevant to that interview format.",
  },
  {
    question: "How do difficulty levels work?",
    answer:
      "Entry Level questions focus on education, basic skills, potential, and learning ability. Mid Level emphasizes proven experience, specific accomplishments, and technical depth. Senior Level questions probe leadership, strategic thinking, complex problem-solving, and industry expertise. The AI adjusts question complexity and expected answer depth accordingly.",
  },
  {
    question: "Is the Interview Generator free?",
    answer:
      "Yes! The Interview Question Generator is completely free to use. Generate unlimited question sets for any role or interview type without any cost. Perfect for job seekers, career changers, or anyone preparing for important interviews who wants to practice with realistic questions.",
  },
];

const relatedTools = [
  {
    name: "Cover Letter",
    slug: "cover-letter-writer",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    name: "Resume Bullets",
    slug: "resume-bullets",
    icon: Target,
    color: "text-purple-600",
  },
  {
    name: "Goal Planner",
    slug: "goal-planner",
    icon: Lightbulb,
    color: "text-green-600",
  },
  {
    name: "Email Writer",
    slug: "email-writer",
    icon: MessageCircle,
    color: "text-orange-600",
  },
];

export default function InterviewGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="Interview Question Generator"
      toolSlug="interview-generator"
      tagline="Prepare for any interview with confidence"
      description="Get role-specific interview questions with expert sample answers using the STAR method. Practice makes perfect!"
      badge="Interview Prep"
      category="Career Tools"
      categorySlug="career-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ace Your Interview"
      ctaDescription="Confidence comes from preparation. Start practicing now!"
      ctaButtonText="Generate Questions"
      ctaIcon={HelpCircle}
    >
      <EnhancedToolLayout
        toolSlug="interview-generator"
        toolName="Interview Question Generator"
        placeholder={`💼 Describe the role you're interviewing for...

Examples:

Position: Software Engineer at a fintech startup
Tech stack: React, Node.js, PostgreSQL, AWS
Team size: 15 engineers
Responsibilities: Building payment processing features, API development, code reviews
Company: Fast-growing startup (Series B), focus on innovation

OR

Position: Marketing Manager at Fortune 500 company
Industry: Consumer electronics
Team: Managing 8 direct reports
Responsibilities: Campaign strategy, brand management, budget oversight ($5M), cross-functional collaboration
Focus: Digital transformation and growth initiatives

OR

Position: Senior Product Designer at design agency
Specialization: UX/UI for mobile apps
Experience needed: 5+ years, portfolio review required
Tools: Figma, Sketch, prototyping, user research
Projects: E-commerce and SaaS products

💡 Tip: Include role details, tech stack, team size, and key responsibilities for the most relevant questions!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📋 Interview Questions & Answers"
        generateButtonText="🎯 Generate Questions"
        showCopyButton={true}
        showDownloadButton={true}
        showWordCount={false}
        showFeedbackButtons={true}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
