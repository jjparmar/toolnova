"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  RefreshCw,
  Pencil,
  FileText,
  Sparkles,
  Target,
  Zap,
  Users,
  Star,
  Clock,
  Lightbulb,
  MessageSquare,
  BookOpen,
} from"lucide-react";

const systemPrompt =`You are an expert paraphrasing assistant.

OUTPUT RULES:
- Rewrite while preserving 100% of the original meaning
- Change sentence structure AND vocabulary (not synonym-only swaps)
- Natural, fluent English — not awkward or robotic
- Output ONLY the paraphrased text (no labels, no commentary, no quotes wrapping the whole result)
- Keep roughly similar length unless the user chose shorter/longer mode
- Never invent new facts or drop important details

QUALITY STANDARDS:
- Grammatically correct and coherent
- Matches the requested mode (formal, academic, casual, etc.)
- Reads as if a skilled human rewrote it`;

const toolOptions = [
  {
    id:"mode",
    label:"Paraphrase Mode",
    type:"select" as const,
    options: [
      { value:"standard", label:"📝 Standard" },
      { value:"formal", label:"👔 More Formal" },
      { value:"casual", label:"😊 More Casual" },
      { value:"shorter", label:"⚡ Shorter/Concise" },
      { value:"longer", label:"📚 Longer/Detailed" },
      { value:"creative", label:"✨ Creative" },
      { value:"academic", label:"🎓 Academic" },
    ],
    defaultValue:"standard",
  },
  {
    id:"strength",
    label:"Paraphrase Strength",
    type:"select" as const,
    options: [
      { value:"light", label:"📋 Light (Similar structure)" },
      { value:"medium", label:"📝 Medium (Balanced)" },
      { value:"heavy", label:"🔄 Heavy (Complete rewrite)" },
    ],
    defaultValue:"medium",
  },
  {
    id:"preserveKeywords",
    label:"Preserve Key Terms",
    type:"toggle" as const,
    defaultValue: false,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const mode = options?.mode ||"standard";
  const strength = options?.strength ||"medium";
  const preserveKeywords = options?.preserveKeywords ?? false;

  const modeInstructions: Record<string, string> = {
    standard:"Paraphrase in a neutral, balanced style suitable for general use.",
    formal:"Paraphrase using formal, professional language. Use sophisticated vocabulary and formal sentence structures.",
    casual:"Paraphrase in a casual, conversational style. Use everyday language and a friendly tone.",
    shorter:"Paraphrase to make it more concise. Remove unnecessary words while keeping all key information.",
    longer:"Paraphrase to make it more detailed. Add explanations and elaborations while maintaining the core message.",
    creative:"Paraphrase with creative flair. Use vivid language, interesting metaphors, and engaging expressions.",
    academic:"Paraphrase in an academic style. Use formal language, precise terminology, and scholarly tone suitable for research papers.",
  };

  const strengthInstructions: Record<string, string> = {
    light:"Make light changes - replace some words with synonyms but keep similar sentence structures.",
    medium:"Make moderate changes - use different vocabulary and vary sentence structures while clearly conveying the same meaning.",
    heavy:"Make extensive changes - completely restructure sentences, use entirely different wording, but preserve all original meaning.",
  };

  let prompt =`# Role & Task
You are an expert writer and language specialist. Your task is to paraphrase the given text while preserving its exact meaning.

# Original Text
${input}

# Paraphrasing Requirements
- **Style Mode**: ${mode} - ${modeInstructions[mode]}
- **Paraphrase Strength**: ${strength} - ${strengthInstructions[strength]}
- **Keyword Preservation**: ${preserveKeywords ?"Keep technical terms, proper nouns, specific keywords, and specialized terminology unchanged" :"You may change all words and phrases as needed for natural paraphrasing"}

# Paraphrasing Guidelines
1. **Meaning Preservation**: Retain 100% of the original meaning - don't add or remove information
2. **Natural Flow**: Ensure the paraphrased text reads naturally and fluently
3. **Sentence Restructuring**: Vary sentence structure - don't just swap synonyms
4. **Grammar & Style**: Maintain proper grammar, punctuation, and the specified style
5. **Tone Consistency**: Keep the same overall tone and intent as the original
6. **Vocabulary Variety**: Use diverse vocabulary appropriate for the ${mode} mode
${strength ==="heavy" ?"7. **Extensive Changes**: Completely rewrite sentences while preserving meaning\n8. **Fresh Perspective**: Approach the content from a different structural angle" :""}
${strength ==="light" ?"7. **Subtle Changes**: Make minimal but effective modifications\n8. **Structure Similarity**: Maintain similar sentence flow with different words" :""}

# Quality Standards
Before finalizing, verify:
- ✓ Original meaning is completely preserved
- ✓ No information added or omitted
- ✓ Text flows naturally in ${mode} style
- ✓ Grammar and punctuation are correct
- ✓ Sentence structures are appropriately varied
- ✓ Vocabulary matches the ${mode} mode
${preserveKeywords ?"- ✓ Technical terms and keywords remain unchanged" :""}
- ✓ Length is similar to original (unless mode is 'shorter' or 'longer')

# Output Format
Provide ONLY the paraphrased text with no explanations, labels, or commentary. Output should be clean and ready to use immediately.

Now paraphrase the text following these instructions precisely.`;

  return prompt;
};


const features = [
  {
    icon: Zap,
    title:"Multiple Modes",
    description:"Choose from 7 paraphrase modes including formal, casual, academic, creative, and more to fit any writing style",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Target,
    title:"Adjustable Strength",
    description:"Control how much the text changes - from light synonym replacements to complete rewrites",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: Sparkles,
    title:"Plagiarism-Free",
    description:"Generate unique, original text that preserves meaning while ensuring your content is completely unique",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Paste Your Text",
    desc:"Add the text you want to paraphrase",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Settings",
    desc:"Select mode and paraphrase strength",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get New Version",
    desc:"Receive unique, rewritten text instantly",
    icon: RefreshCw,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    icon: Pencil,
    color:"text-blue-600",
  },
  {
    name:"Text Simplifier",
    slug:"text-simplifier",
    icon: Lightbulb,
    color:"text-purple-600",
  },
  {
    name:"Text Summarizer",
    slug:"text-summarizer",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Essay Writer",
    slug:"essay-writer",
    icon: FileText,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"Will the paraphrased text have the same meaning?",
    answer:"Yes! Our AI is specifically trained to preserve the original meaning while completely changing the wording and structure. The core message and intent remain intact.",
    category:"Accuracy",
  },
  {
    question:"Is the paraphrased content plagiarism-free?",
    answer:"Yes, the output is designed to be unique and original. However, for academic work, we recommend running it through a plagiarism checker and citing sources appropriately.",
    category:"Usage",
  },
  {
    question:"What's the difference between paraphrase strengths?",
    answer:"Light makes minimal changes (similar structure, different words). Medium balances new vocabulary with restructured sentences. Heavy completely rewrites with extensive changes while keeping meaning.",
    category:"Features",
  },
  {
    question:"Can I paraphrase technical or academic content?",
    answer:"Absolutely! Use the 'Academic' mode and enable 'Preserve Key Terms' to keep technical terminology, names, and specific keywords unchanged while paraphrasing the rest.",
    category:"Usage",
  },
  {
    question:"How is this different from just using synonyms?",
    answer:"Unlike simple synonym replacement, our tool restructures entire sentences, changes word order, combines or splits ideas, and ensures natural flow - not just word swapping.",
    category:"Features",
  },
  {
    question:"Can I use this for my essays or articles?",
    answer:"Yes, but use it responsibly. It's great for rephrasing your own work, avoiding self-plagiarism, or getting inspiration. Always ensure the final content represents your own understanding.",
    category:"Ethics",
  },
];

export default function ParaphraserClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Paraphraser"
      toolSlug="paraphraser"
      tagline="Rewrite text in your own unique voice"
      description="Transform any text into fresh, original content while preserving the meaning. Perfect for avoiding plagiarism, improving clarity, or adapting tone for different audiences."
      badge="AI-Powered"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Rewrite Your Content?"
      ctaDescription="Get unique, plagiarism-free text in seconds"
      ctaIcon={RefreshCw}
    >
      <div className="mx-6 mb-4 rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-sm text-sky-950">
        <strong className="font-semibold">Use responsibly.</strong> Paraphrasing
        is great for clarity and your own drafts. Always cite sources for ideas
        that are not yours, and follow academic integrity rules.{""}
        <a
          href="/blog/paraphrasing-vs-rewriting-for-assignments"
          className="underline font-medium hover:no-underline"
        >
          Paraphrasing vs rewriting →
        </a>
      </div>
      <EnhancedToolLayout
        toolSlug="paraphraser"
        systemPrompt={systemPrompt}
        toolName="AI Paraphraser"
        placeholder={`📝 Paste or type your text here...

Examples:
•"Artificial intelligence has transformed modern technology, making machines capable of learning and adapting."
•"The research demonstrates that regular exercise significantly improves cardiovascular health."
•"Our company's mission is to deliver innovative solutions that empower businesses."

The tool will rewrite it in a fresh, unique way while keeping the same meaning!`}
        promptTemplate={generatePrompt}
        inputRows={10}
        toolOptions={toolOptions}
        resultLabel="🔄 Paraphrased Text"
        generateButtonText="🔄 Paraphrase Now"
        inputLabel="📝 Original Text"
        showAdvancedOptions={true}
        maxHistoryItems={10}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
