"use client";

import EnhancedToolLayout from "@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";
import { FAQSection } from "@/components/FAQSection";
import {
  CheckCircle2,
  Pencil,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  FileText,
  Users,
  Star,
  Clock,
  Shield,
  Lightbulb,
} from "lucide-react";

const systemPrompt = `You are an expert grammar and writing improvement assistant.

OUTPUT RULES:
- Fix ALL grammar, spelling, punctuation, and style errors
- Maintain the original meaning and tone
- Provide clear, corrected text without explanations unless requested
- Use proper formatting and structure
- Ensure clarity and readability

QUALITY STANDARDS:
- Professional-level corrections
- Natural, fluent language
- Consistent style throughout
- Proper sentence structure
- Correct punctuation placement`;

const toolOptions = [
  {
    id: "level",
    label: "Correction Level",
    type: "select" as const,
    options: [
      { value: "basic", label: "📝 Basic (Grammar & Spelling)" },
      { value: "standard", label: "✏️ Standard (+ Punctuation)" },
      { value: "advanced", label: "⚡ Advanced (+ Style & Clarity)" },
      { value: "professional", label: "👔 Professional (Complete Polish)" },
    ],
    defaultValue: "standard",
  },
  {
    id: "tone",
    label: "Writing Tone",
    type: "select" as const,
    options: [
      { value: "maintain", label: "🔄 Maintain Original" },
      { value: "formal", label: "👔 More Formal" },
      { value: "casual", label: "😊 More Casual" },
      { value: "professional", label: "💼 Professional" },
      { value: "friendly", label: "🤝 Friendly" },
    ],
    defaultValue: "maintain",
  },
  {
    id: "showExplanations",
    label: "Show Explanations",
    type: "toggle" as const,
    defaultValue: false,
  },
  {
    id: "improveClarity",
    label: "Improve Clarity & Flow",
    type: "toggle" as const,
    defaultValue: true,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const level = options?.level || "standard";
  const tone = options?.tone || "maintain";
  const showExplanations = options?.showExplanations ?? false;
  const improveClarity = options?.improveClarity ?? true;

  const levelInstructions: Record<string, string> = {
    basic:
      "Fix only critical errors: spelling mistakes, basic grammar errors, and obvious typos. Preserve original style and structure.",
    standard:
      "Fix grammar, spelling, and punctuation errors. Maintain the original writing style and voice.",
    advanced:
      "Comprehensive corrections including grammar, spelling, punctuation, sentence structure, and readability improvements.",
    professional:
      "Complete professional polish with grammar fixes, style enhancements, clarity improvements, and optimal word choice for maximum impact.",
  };

  const toneInstructions: Record<string, string> = {
    maintain: "Preserve the original tone, style, and personality of the writing",
    formal:
      "Elevate to formal, professional tone suitable for business or academic contexts",
    casual: "Adjust to casual, conversational tone while maintaining clarity",
    professional:
      "Use polished business language appropriate for corporate and professional settings",
    friendly:
      "Create warm, approachable tone that's both friendly and clear",
  };

  const errorCategories: Record<string, string[]> = {
    basic: ["Spelling errors", "Basic grammar mistakes", "Obvious typos"],
    standard: [
      "Spelling errors",
      "Grammar mistakes",
      "Punctuation errors",
      "Subject-verb agreement",
      "Tense consistency",
    ],
    advanced: [
      "All grammar and spelling",
      "Sentence structure",
      "Word choice",
      "Clarity issues",
      "Redundancy",
      "Flow and transitions",
    ],
    professional: [
      "All grammar and spelling",
      "Sentence structure optimization",
      "Professional word choice",
      "Clarity and concision",
      "Impact and persuasiveness",
      "Readability enhancement",
    ],
  };

  let prompt = `# Role & Task
You are an expert grammar checker, editor, and writing coach. Your task is to fix and improve the provided text according to the specified correction level.

# Original Text
${input}

# Correction Requirements
**Correction Level**: ${level} (${levelInstructions[level]})
**Tone Adjustment**: ${tone} - ${toneInstructions[tone]}
**Clarity Enhancement**: ${improveClarity ? "Yes - improve sentence clarity and flow" : "No - maintain current clarity level"}

# What to Fix (${level} level)
${errorCategories[level].map((category) => `- ${category}`).join("\n")}

# Correction Guidelines
1. **Preserve Meaning**: Never change the intended meaning or core message
2. **Natural Language**: Ensure corrections sound natural and fluent
3. **Consistency**: Maintain consistent tense, voice, and style throughout
4. **Context-Aware**: Consider context when making corrections
5. **Tone Matching**: ${toneInstructions[tone]}
${improveClarity ? "6. **Clarity**: Simplify complex sentences, remove ambiguity, improve flow" : ""}
${level === "professional" ? "7. **Professional Polish**: Optimize word choice, enhance impact, ensure perfect presentation" : ""}

# Output Format
${showExplanations ? `Provide your response in this exact format:

## ✅ CORRECTED TEXT
[The fully corrected and improved text here]

## 📝 IMPROVEMENTS MADE
Briefly explain the key changes:
- **Grammar & Spelling**: [Number] errors fixed
- **Punctuation**: [Key punctuation improvements]
- **Clarity**: [How readability was improved]
- **Style**: [Notable style enhancements]
- **Key Changes**: [2-3 most significant improvements]` : "Provide ONLY the corrected text with no labels, explanations, or commentary. The output should be clean and ready to use immediately."}

# Quality Standards
Before finalizing, verify:
- ✓ All spelling errors are corrected
- ✓ Grammar is perfect throughout
- ✓ Punctuation is proper and consistent
- ✓ Sentence structure is clear and logical
- ✓ Tone matches the ${tone} requirement
- ✓ Original meaning is fully preserved
- ✓ Text flows naturally and reads smoothly
${improveClarity ? "- ✓ Clarity and readability are enhanced" : ""}
${level === "professional" ? "- ✓ Professional polish is applied throughout" : ""}

# Special Instructions
- Keep factual information unchanged
- Preserve proper nouns and technical terms
- Don't add information that wasn't in the original
- Maintain paragraph structure unless it needs improvement
- If the original text is already perfect, return it as-is

Now proceed to correct the text according to these specifications.`;

  return prompt;
};




const features = [
  {
    icon: Zap,
    title: "Instant Corrections",
    description:
      "Get professional-level grammar, spelling, and punctuation fixes in seconds",
    gradient: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
  },
  {
    icon: Target,
    title: "Multiple Levels",
    description:
      "Choose from basic grammar fixes to complete professional polish based on your needs",
    gradient: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
  },
  {
    icon: Sparkles,
    title: "Style Enhancement",
    description:
      "Improve clarity, flow, and readability while maintaining your original meaning",
    gradient: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Paste Your Text",
    desc: "Add the text you want to fix",
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title: "Set Preferences",
    desc: "Choose correction level and tone",
    icon: Target,
    color: "from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title: "Get Perfect Text",
    desc: "Receive polished, error-free writing",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name: "Paraphraser",
    slug: "paraphraser",
    icon: Pencil,
    color: "text-blue-600",
  },
  {
    name: "Text Simplifier",
    slug: "text-simplifier",
    icon: Lightbulb,
    color: "text-purple-600",
  },
  {
    name: "Essay Writer",
    slug: "essay-writer",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    name: "Email Writer",
    slug: "email-writer",
    icon: Sparkles,
    color: "text-orange-600",
  },
];

const faqs = [
  {
    question: "What types of errors does it fix?",
    answer:
      "Our grammar checker fixes spelling mistakes, grammar errors, punctuation issues, verb tense problems, subject-verb agreement, word choice errors, and style inconsistencies. Advanced modes also improve clarity and flow.",
    category: "Features",
  },
  {
    question: "Can I see what was changed?",
    answer:
      "Yes! Enable 'Show Explanations' in the settings to see a summary of major improvements made to your text. This helps you learn from corrections.",
    category: "Usage",
  },
  {
    question: "Will it change the meaning of my text?",
    answer:
      "No, the tool is designed to preserve your original meaning while fixing errors and improving clarity. It corrects mistakes without altering your intended message.",
    category: "Accuracy",
  },
  {
    question: "What's the difference between correction levels?",
    answer:
      "Basic fixes only grammar and spelling. Standard adds punctuation corrections. Advanced improves style and clarity. Professional provides complete polish for business use.",
    category: "Features",
  },
  {
    question: "Can I use this for academic writing?",
    answer:
      "Absolutely! It's perfect for essays, research papers, and assignments. Use the 'Professional' level for academic work and enable explanations to learn from corrections.",
    category: "Usage",
  },
  {
    question: "Does it work for different English variants?",
    answer:
      "Yes, the tool handles American, British, and other English variants. It maintains consistency throughout your text.",
    category: "Features",
  },
];

export default function GrammarFixClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Grammar Fix"
      toolSlug="grammar-fix"
      tagline="Perfect your writing with AI-powered grammar corrections"
      description="Fix grammar, spelling, punctuation, and style errors instantly. Get professional-quality writing with advanced corrections and clarity improvements."
      badge="AI-Powered"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Perfect Your Writing?"
      ctaDescription="Get instant grammar corrections and professional polish"
      ctaIcon={CheckCircle2}
    >
      <EnhancedToolLayout
        toolSlug="grammar-fix"
        systemPrompt={systemPrompt}
        toolName="AI Grammar Fix"
        placeholder={`📝 Paste or type your text here...

Examples:
• "Me and him went to the store yesterday"
• "The company are planning they're expansion"
• "I would of finished the project but its taking longer then expected"
• "Between you and I, this tool is really helpfull for fixing grammer"

Try pasting text with errors to see instant corrections!`}
        promptTemplate={generatePrompt}
        inputRows={10}
        toolOptions={toolOptions}
        resultLabel="✅ Corrected Text"
        generateButtonText="✨ Fix Grammar"
        inputLabel="📝 Your Text"
        showAdvancedOptions={true}
        maxHistoryItems={10}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
