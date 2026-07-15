"use client";

import EnhancedToolLayout from "@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";
import { FAQSection } from "@/components/FAQSection";
import { HomeworkResultFormatter } from "@/components/HomeworkResultFormatter";
import {
  BookOpen,
  Brain,
  Calculator,
  Clock,
  GraduationCap,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  Lightbulb,
  Award,
} from "lucide-react";

const systemPrompt = `You are a patient, accurate tutor helping students learn step-by-step.

OUTPUT RULES:
- Use the exact structure requested in the user prompt (section labels as specified)
- Do NOT use a generic FINAL ANSWER/WORKING/QUICK CHECK template
- Be as long as needed for a correct explanation
- Use clear Markdown headings and numbered steps
- Number each step clearly (Step 1, Step 2, etc.)
- Explain WHY each step works, not just HOW
- Double-check math/logic before answering; show intermediate work

TEACHING APPROACH:
- Warm and encouraging, never condescending
- Break complex problems into simple steps
- Include verification and practice when requested
- Match language to the specified grade level
- If the problem is ambiguous, state assumptions briefly`;

const toolOptions = [
  {
    id: "subject",
    label: "Subject Area",
    type: "select" as const,
    options: [
      { value: "math", label: "🔢 Mathematics" },
      { value: "physics", label: "⚛️ Physics" },
      { value: "chemistry", label: "🧪 Chemistry" },
      { value: "biology", label: "🧬 Biology" },
      { value: "history", label: "📜 History" },
      { value: "english", label: "📖 English/Literature" },
      { value: "programming", label: "💻 Programming" },
      { value: "economics", label: "📊 Economics" },
      { value: "geography", label: "🌍 Geography" },
      { value: "general", label: "📚 General" },
    ],
    defaultValue: "general",
  },
  {
    id: "gradeLevel",
    label: "Grade Level",
    type: "select" as const,
    options: [
      { value: "elementary", label: "🎒 Elementary School" },
      { value: "middle", label: "📓 Middle School" },
      { value: "high", label: "🎓 High School" },
      { value: "college", label: "🏛️ College/University" },
    ],
    defaultValue: "high",
  },
  {
    id: "explanation",
    label: "Explanation Style",
    type: "select" as const,
    options: [
      { value: "detailed", label: "📝 Detailed Step-by-Step" },
      { value: "concise", label: "⚡ Concise Answer" },
      { value: "eli5", label: "🧒 Explain Like I'm 5" },
      { value: "visual", label: "📊 With Visual Explanations" },
    ],
    defaultValue: "detailed",
  },
  {
    id: "includeExamples",
    label: "Include Practice Problems",
    type: "toggle" as const,
    defaultValue: true,
  },
  {
    id: "showFormulas",
    label: "Show Relevant Formulas",
    type: "toggle" as const,
    defaultValue: true,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const subject = options?.subject || "general";
  const gradeLevel = options?.gradeLevel || "high";
  const explanation = options?.explanation || "detailed";
  const includeExamples = options?.includeExamples ?? true;
  const showFormulas = options?.showFormulas ?? true;

  const gradeLevelContext: Record<string, string> = {
    elementary:
      "elementary school level (ages 6-11). Use simple, clear language with relatable examples and basic concepts",
    middle:
      "middle school level (ages 11-14). Use age-appropriate language with intermediate concepts and practical examples",
    high: "high school level (ages 14-18). Use sophisticated language with advanced topics and detailed analytical thinking",
    college:
      "college/university level. Use academic language with in-depth analysis, complex problem-solving, and theoretical frameworks",
  };

  const explanationStyles: Record<string, string> = {
    detailed:
      "Provide comprehensive step-by-step explanations with detailed reasoning, showing WHY each step is necessary",
    concise:
      "Give clear, direct solutions with essential steps only. Focus on efficiency while maintaining clarity",
    eli5: "Explain in the simplest possible terms using analogies, metaphors, and everyday examples anyone can understand",
    visual:
      "Include detailed descriptions of visual representations, diagrams, charts, or illustrations to aid understanding",
  };

  const subjectSpecifics: Record<string, string> = {
    math: "Show all mathematical work clearly. Use proper notation. Explain the logic behind each calculation.",
    science:
      "Explain scientific concepts and principles. Connect theory to real-world applications.",
    english:
      "Analyze literary elements, provide textual evidence, and explain interpretations thoroughly.",
    history:
      "Provide historical context, explain cause-and-effect relationships, and analyze significance.",
    general:
      "Provide clear, logical explanations appropriate for the subject matter.",
  };

  let prompt = `# Role & Task
You are an expert tutor and educator. Your goal is to help a student understand and solve their homework problem while promoting genuine learning and comprehension.

# Student Context
- **Grade Level**: ${gradeLevel} - ${gradeLevelContext[gradeLevel]}
- **Subject**: ${subject}
- **Explanation Style**: ${explanation} - ${explanationStyles[explanation]}

# Homework Problem
${input}

# Teaching Approach
${subjectSpecifics[subject] || subjectSpecifics.general}

# Required Output Structure
Use this EXACT format with these section headers:

## 🎯 FINAL ANSWER
Provide the complete, clear answer in a box or highlighted format. This should be what the student writes as their final answer.

## 📝 STEP-BY-STEP SOLUTION
Break down the solution into clear, numbered steps:

**Step 1**: [First action or concept]
- Explain WHAT you're doing
- Explain WHY you're doing it
- Show the work or reasoning

**Step 2**: [Second action or concept]
- Explain WHAT you're doing
- Explain WHY you're doing it
- Show the work or reasoning

**Step 3**: [Continue as needed...]
- Each step should build logically on the previous one
- Show all work and calculations clearly
- Explain the reasoning behind each decision

${
  explanation === "detailed"
    ? `
**Note**: For each step, include:
- The mathematical/logical operation performed
- Why this operation is appropriate
- How it connects to the overall solution strategy
`
    : ""
}

## ✅ VERIFICATION
Show how to check if the answer is correct:
- Substitute the answer back into the original problem
- Use alternative method to verify
- Check if the answer makes logical sense
- Confirm units, signs, or formats are correct
${
  showFormulas && ["math", "physics", "chemistry"].includes(subject)
    ? `
## 📐 FORMULAS & CONCEPTS
List and explain all formulas, equations, or key concepts used:
- **Formula Name**: [Write the formula]
  - **What it means**: [Explanation]
  - **When to use it**: [Context]
  - **Variables explained**: [Define each variable]
`
    : ""
}
${
  includeExamples
    ? `
## 💡 PRACTICE PROBLEM
Provide a similar problem for practice:
- **Problem**: [Write a similar problem]
- **Hint**: [Give a helpful hint]
- **Expected approach**: [Brief outline of solution method]
`
    : ""
}

## 🎓 KEY CONCEPTS EXPLAINED
Identify and explain the main concepts:
- **Core Concept**: What fundamental idea is this problem testing?
- **Why It Matters**: How does this concept apply in real situations?
- **Common Mistakes**: What errors do students typically make with this concept?
- **Study Tips**: How can the student better understand this topic?

# Educational Guidelines
1. **Teach, Don't Just Answer**: Focus on building understanding, not just providing solutions
2. **Show Your Work**: Display all steps clearly so the student can follow the logic
3. **Use Appropriate Language**: Match vocabulary and complexity to ${gradeLevel} level
4. **Connect to Prior Knowledge**: Reference concepts the student should already know
5. **Encourage Critical Thinking**: Ask rhetorical questions that promote deeper understanding
${gradeLevel === "elementary" ? "6. **Be Encouraging**: Use positive, supportive language that builds confidence" : ""}
${gradeLevel === "college" ? "6. **Academic Rigor**: Include theoretical background and advanced analytical frameworks" : ""}

# Quality Standards
Before finalizing, verify:
- ✓ Solution is completely accurate and correct
- ✓ All steps are shown clearly and logically
- ✓ Explanations match ${gradeLevel} comprehension level
- ✓ Mathematical notation or terminology is proper
- ✓ Student can learn from this, not just copy it
- ✓ Work is organized and easy to follow
- ✓ Verification method is provided
${includeExamples ? "- ✓ Practice problem is similar but not identical" : ""}

# Special Instructions
- Never just give the answer without explanation
- If the problem is ambiguous, state your assumptions
- For multi-part questions, address each part clearly
- Use proper formatting for equations, chemical formulas, etc.
- Make learning the priority over speed

Now provide the complete educational solution following this structure precisely.`;

  return prompt;
};


const features = [
  {
    icon: Brain,
    title: "Step-by-Step Solutions",
    description:
      "Get detailed explanations that help you understand the problem, not just the answer",
    gradient: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
  },
  {
    icon: Target,
    title: "Multiple Subjects",
    description:
      "Support for Math, Science, History, English, Programming, and more subjects across all grade levels",
    gradient: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
  },
  {
    icon: Lightbulb,
    title: "Practice Problems",
    description:
      "Receive similar practice problems to reinforce your learning and build confidence",
    gradient: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Enter Your Problem",
    desc: "Type or paste your homework question",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title: "Set Preferences",
    desc: "Choose subject, grade level, and explanation style",
    icon: Target,
    color: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title: "Get Solution",
    desc: "Receive structured, verified step-by-step answer",
    icon: Award,
    color: "from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name: "Notes Generator",
    slug: "notes-generator",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    name: "MCQ Generator",
    slug: "mcq-generator",
    icon: Target,
    color: "text-purple-600",
  },
  {
    name: "Formula Generator",
    slug: "formula-generator",
    icon: Calculator,
    color: "text-green-600",
  },
  {
    name: "Concept Explainer",
    slug: "concept-explainer",
    icon: Lightbulb,
    color: "text-orange-600",
  },
];

const faqs = [
  {
    question: "How does the homework solver work?",
    answer:
      "Our AI analyzes your problem, breaks it down into steps, and provides detailed explanations. It focuses on teaching you the concept, not just giving you the answer.",
    category: "Usage",
  },
  {
    question: "What subjects are supported?",
    answer:
      "We support Math, Physics, Chemistry, Biology, History, English/Literature, Programming, Economics, Geography, and general topics across all grade levels from elementary to college.",
    category: "Features",
  },
  {
    question: "Can I use this for exam preparation?",
    answer:
      "Yes! Enable 'Include Practice Problems' to get similar questions for practice. This helps you understand the concept and prepare for tests.",
    category: "Usage",
  },
  {
    question: "Is the solution always correct?",
    answer:
      "Our AI provides highly accurate solutions, but we recommend verifying important answers. Use the verification section to check your work and learn the problem-solving process.",
    category: "Accuracy",
  },
  {
    question: "Can I adjust the explanation level?",
    answer:
      "Absolutely! Choose from Detailed (comprehensive), Concise (quick), ELI5 (very simple), or Visual (with diagrams). Pick what works best for your learning style.",
    category: "Features",
  },
  {
    question: "Will this help me learn or just give answers?",
    answer:
      "It's designed to teach! Each solution includes step-by-step explanations, verification methods, practice problems, and pro tips to help you truly understand the concept.",
    category: "Learning",
  },
];

export default function HomeworkSolverClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Homework Solver"
      toolSlug="homework-solver"
      tagline="Get instant, step-by-step solutions to any homework problem"
      description="AI-powered homework helper that provides detailed explanations, practice problems, and verification methods. Perfect for students of all grades who want to understand, not just answer."
      badge="AI-Powered"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Solve Smarter?"
      ctaDescription="Get detailed homework help in seconds with AI-powered explanations"
      ctaIcon={Brain}
    >
      <div className="mx-6 mb-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/80 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-950 dark:text-amber-100">
        <strong className="font-semibold">Learn, don&apos;t just copy.</strong>{" "}
        Use step-by-step explanations to understand the method. Follow your
        school&apos;s academic integrity policy — submitting AI answers as your
        own work may violate course rules.{" "}
        <a
          href="/blog/homework-solver-best-practices"
          className="underline font-medium hover:no-underline"
        >
          Best practices guide →
        </a>
      </div>
      <EnhancedToolLayout
        toolSlug="homework-solver"
        systemPrompt={systemPrompt}
        toolName="AI Homework Solver"
        placeholder={`✍️ Enter your homework question here...

Examples:
• Solve: 2x² + 5x - 3 = 0
• Explain the process of photosynthesis in plant cells
• What were the main causes of the French Revolution?
• Write a Python function to check if a number is prime
• Calculate the force needed to accelerate a 10kg object at 5m/s²

Be as specific as possible for best results!`}
        promptTemplate={generatePrompt}
        inputRows={10}
        toolOptions={toolOptions}
        resultLabel="📚 Your Solution"
        generateButtonText="🚀 Solve My Homework"
        inputLabel="📝 Your Homework Question"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        customResultRenderer={(result) => (
          <HomeworkResultFormatter result={result} />
        )}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
