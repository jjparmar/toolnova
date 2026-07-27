"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  FileText,
  Lightbulb,
  Sparkles,
  BookOpen,
  Eye,
  CheckCircle,
  Users,
  Star,
  Zap,
  Target,
  Type,
  MessageSquare,
} from"lucide-react";

const toolOptions = [
  {
    id:"level",
    label:"Reading Level",
    type:"select" as const,
    options: [
      { value:"elementary", label:"📚 Elementary (Grade 3-5)" },
      { value:"middle", label:"📖 Middle School (Grade 6-8)" },
      { value:"simple", label:"📝 Simple Adult" },
      { value:"conversational", label:"💬 Conversational" },
    ] as const,
    defaultValue:"simple",
  },
  {
    id:"style",
    label:"Simplification Style",
    type:"select" as const,
    options: [
      { value:"standard", label:"📄 Standard Simplification" },
      { value:"explain", label:"💡 Explain Technical Terms" },
      { value:"bullets", label:"• Break Into Bullet Points" },
    ] as const,
    defaultValue:"standard",
  },
  {
    id:"preserveTerms",
    label:"Preserve Key Terms",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const level = options?.level ||"simple";
  const style = options?.style ||"standard";
  const preserveTerms = options?.preserveTerms !== false;

  const levelDescriptions: Record<string, string> = {
    elementary:"Elementary school reading level (grades 3-5). Use very simple words, short sentences (8-12 words max), and basic concepts only.",
    middle:"Middle school reading level (grades 6-8). Use common vocabulary, moderate sentence length (12-18 words), and explain technical concepts simply.",
    simple:"Simple adult reading level. Use everyday language, clear structure (15-20 words per sentence), minimal jargon, but maintain professionalism.",
    conversational:"Friendly, conversational tone. Write as if explaining to a friend - use natural language, contractions, and casual phrasing while staying clear.",
  };

  const styleInstructions: Record<string, string> = {
    standard:"Rewrite the text in simpler language, maintaining the original paragraph structure and flow.",
    explain:"When you encounter technical terms or complex concepts, keep them but add brief explanations in parentheses immediately after: 'photosynthesis (how plants make food from sunlight)'",
    bullets:"Break the content into clear bullet points or numbered lists. Each point should be concise and scannable.",
  };

  return`You are an expert content simplification specialist and plain language editor. Your task is to transform complex text into clear, accessible language that preserves the exact meaning while making it easy to understand.

## YOUR TASK
Simplify the provided text to the specified reading level while maintaining 100% accuracy of the original message.

## SPECIFICATIONS
**Target Reading Level**: ${levelDescriptions[level]}
**Simplification Style**: ${styleInstructions[style]}
**Technical Terms**: ${preserveTerms ?"Keep essential technical terms but add simple explanations in parentheses: 'cryptocurrency (digital money)'" :"Replace ALL technical terms with simple everyday alternatives"}

## SIMPLIFICATION FRAMEWORK

### 1. Vocabulary Transformation
- Replace complex/formal words with common alternatives
- Examples:
  • utilize → use
  • commence → start
  • endeavor → try
  • expedite → speed up
  • terminate → end
  • ascertain → find out
  • subsequently → then
  • approximately → about

### 2. Sentence Structure
- Break long sentences (25+ words) into shorter ones (${level ==="elementary" ?"8-12" : level ==="middle" ?"12-18" :"15-20"} words)
- One main idea per sentence
- Avoid nested clauses and complex subordination
- Remove double negatives

### 3. Active Voice Priority
- Convert passive constructions to active voice
- ❌"The report was completed by the team"
- ✅"The team completed the report"

### 4. Clarity Enhancements
- Remove unnecessary jargon and legal language
- Eliminate redundant phrases ("end result" →"result")
- Replace nominalizations with verbs ("make a decision" →"decide")
- Use concrete examples instead of abstract concepts

### 5. Formatting for Readability
${style ==="bullets" ?"- Organize into clear bullet points\n- Use parallel structure\n- Keep points concise and actionable" :"- Maintain logical paragraph breaks\n- Use transition words (however, therefore, next)\n- Keep related ideas together"}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ All original information is preserved (no meaning lost)
2. ✓ Facts and numbers remain accurate
3. ✓ Reading level matches target: ${level}
4. ✓ Sentence length appropriate: ${level ==="elementary" ?"8-12 words" : level ==="middle" ?"12-18 words" :"15-20 words"} average
5. ✓ No unnecessary jargon remains
6. ✓ Technical terms ${preserveTerms ?"are explained in parentheses" :"are replaced with simple words"}
7. ✓ Text flows naturally and sounds conversational
8. ✓ Key message is immediately clear

## TEXT TO SIMPLIFY
${input}

## OUTPUT FORMAT
Provide ONLY the simplified text. Do not add explanations, notes, or commentary. Just return the clear, simplified version that anyone can understand.`;
};


const features = [
  {
    icon: Target,
    title:"Multiple Reading Levels",
    description:"Choose from elementary to conversational styles to match your audience's comprehension needs.",
  },
  {
    icon: Type,
    title:"Flexible Formatting",
    description:"Get standard simplified text, explanations of technical terms, or organized bullet points.",
  },
  {
    icon: CheckCircle,
    title:"Meaning Preserved",
    description:"Core message stays intact while making content accessible to everyone, regardless of reading level.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Paste Text",
    desc:"Add complex or technical content",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Level",
    desc:"Select target reading level",
    icon: Eye,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Clarity",
    desc:"Receive simplified, clear version",
    icon: Sparkles,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Text Simplifier?",
    answer:"The Text Simplifier is an AI-powered tool that transforms complex, technical, or jargon-heavy text into clear, easy-to-understand language. It rewrites content at various reading levels while preserving the original meaning, making information accessible to broader audiences. Perfect for simplifying legal documents, medical information, academic papers, or any difficult text.",
  },
  {
    question:"What reading levels are available?",
    answer:"Choose from four levels: Elementary (grades 3-5, very simple words and short sentences), Middle School (grades 6-8, common words with moderate complexity), Simple Adult (everyday language for general readers), or Conversational (friendly, natural tone as if explaining to a friend). Select based on your target audience's reading ability.",
  },
  {
    question:"Will the meaning change?",
    answer:"No! The core message and factual information stay exactly the same. Only the language complexity changes. The tool replaces difficult words with simpler alternatives, breaks long sentences into shorter ones, and removes unnecessary jargon - but all the important information remains intact and accurate.",
  },
  {
    question:"What simplification styles can I choose?",
    answer:"Three styles are available: Standard Simplification (rewrites in simpler language maintaining structure), Explain Technical Terms (keeps necessary technical terms but adds simple explanations), or Break Into Bullet Points (organizes information as easy-to-scan lists). Choose based on how your audience prefers to consume information.",
  },
  {
    question:"What types of text work best?",
    answer:"The tool excels with: legal documents (contracts, terms of service), medical information (diagnoses, treatment plans), academic papers (research, textbooks), technical documentation (manuals, specifications), business jargon (corporate communications), and government documents (policies, regulations). Any complex text benefits from simplification.",
  },
  {
    question:"Is the Text Simplifier free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    icon: CheckCircle,
    color:"text-blue-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: Sparkles,
    color:"text-purple-600",
  },
  {
    name:"Concept Explainer",
    slug:"concept-explainer",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Essay Writer",
    slug:"essay-writer",
    icon: FileText,
    color:"text-orange-600",
  },
];

export default function TextSimplifierClient() {
  return (
    <PremiumToolWrapper
      toolName="Text Simplifier"
      toolSlug="text-simplifier"
      tagline="Make any text easy to understand"
      description="Transform complex text into simple, clear language that anyone can comprehend. Choose your reading level and simplification style for perfect clarity."
      badge="Clarity Tool"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Simplify Your Text"
      ctaDescription="Clarity is the ultimate form of intelligence. Make your content accessible!"
      ctaButtonText="Simplify Now"
      ctaIcon={Sparkles}
    >
      <EnhancedToolLayout
        toolSlug="text-simplifier"
        toolName="Text Simplifier"
        placeholder={`📄 Paste complex text to simplify...

Works great with:

• Legal documents:"The party of the first part hereby agrees to indemnify..."
• Technical documentation:"Initialize the asynchronous protocol handler..."
• Medical information:"The patient exhibits bilateral pulmonary infiltrates..."
• Academic papers:"The phenomenological approach utilizes hermeneutic methodology..."
• Business jargon:"We need to leverage our core competencies to synergize..."
• Government policies:"Pursuant to subsection 4(a), the aforementioned provision..."

Examples of complex text:"Notwithstanding the provisions of the preceding paragraph, the party of the first part shall be obligated to remit payment within thirty (30) days of invoice date.""The implementation of blockchain technology facilitates the decentralization of trust through cryptographic verification mechanisms."

💡 Tip: The longer and more complex your text, the more beneficial the simplification will be!`}
        inputRows={12}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="✨ Simplified Text"
        generateButtonText="🔄 Simplify Text"
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
