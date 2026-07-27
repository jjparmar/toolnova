"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  BookOpen,
  Brain,
  Lightbulb,
  Calculator,
  FileText,
  ClipboardList,
  List,
  Users,
  Star,
  Zap,
  Target,
  CheckCircle,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"length",
    label:"Summary Length",
    type:"select" as const,
    options: [
      { value:"brief", label:"⚡ Brief (1-2 paragraphs)" },
      { value:"medium", label:"📝 Medium (3-5 paragraphs)" },
      { value:"detailed", label:"📚 Detailed (Full summary)" },
    ] as const,
    defaultValue:"medium",
  },
  {
    id:"format",
    label:"Format",
    type:"select" as const,
    options: [
      { value:"paragraph", label:"📄 Paragraph Style" },
      { value:"bullets", label:"• Bullet Points" },
      { value:"outline", label:"🔢 Numbered Outline" },
    ] as const,
    defaultValue:"bullets",
  },
  {
    id:"highlightKeyTerms",
    label:"Highlight Key Terms",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const length = options?.length ||"medium";
  const format = options?.format ||"bullets";
  const highlightKeyTerms = options?.highlightKeyTerms !== false;

  const lengthStyles: Record<string, string> = {
    brief:"Ultra-concise summary (100-200 words). Only the most essential points. 1-2 short paragraphs capturing the core thesis and 3-5 key facts.",
    medium:"Balanced summary (300-500 words). Main points, key concepts, supporting details, and important examples. 3-5 well-structured sections.",
    detailed:"Comprehensive summary (600-1000 words). Complete coverage of all topics, concepts, examples, evidence, and nuances. Full chapter representation suitable for exam review.",
  };

  const formatInstructions: Record<string, string> = {
    paragraph:"Flowing paragraph format with smooth transitions between ideas. Each paragraph covers a distinct subtopic. Use topic sentences and concluding transitions.",
    bullets:"Clean bullet point format for easy scanning. Group related points under bold subheadings. Use indented sub-bullets for supporting details. One concept per bullet.",
    outline:"Hierarchical numbered outline (1., 1.1, 1.1.1). Main topics as primary numbers, subtopics as secondary, details as tertiary. Clear indentation showing relationships.",
  };

  const highlightStrategy = highlightKeyTerms
    ?"KEY TERM HIGHLIGHTING: Use **bold** for critical vocabulary, concepts, definitions, names, dates, and formulas throughout. These should be the terms a student would need to memorize or recognize on an exam."
    :"Present information clearly without special formatting emphasis on individual terms.";

  return`You are an expert academic content analyst, study guide specialist, and educational summarizer with deep experience condensing complex material into clear, retention-optimized summaries across all academic disciplines.

## YOUR TASK
Create a ${length} summary of the provided chapter/content in ${format} format that captures all essential information while eliminating redundancy.

## SPECIFICATIONS
**Summary Length**: ${length.toUpperCase()} - ${lengthStyles[length]}
**Format**: ${format.toUpperCase()} - ${formatInstructions[format]}
**Highlighting**: ${highlightStrategy}
**Purpose**: Exam preparation, quick review, and efficient study material creation

## SUMMARIZATION FRAMEWORK

### 1. COGNITIVE PRIORITIZATION (Internal Analysis)
Before writing, mentally:
- Identify the chapter's central thesis or main argument
- Distinguish primary concepts (must include) from secondary details (include if space)
- Recognize cause-effect relationships and hierarchies
- Note definitions, formulas, and key data points
- Identify exam-likely topics and commonly tested points

### 2. OPENING CONTEXT (First Section)
- **Chapter Theme**: One sentence stating what this chapter is fundamentally about
- **Scope**: What specific aspects of the broader topic are covered
- **Significance**: Why this content matters in the subject area
${length ==="detailed" ?"- **Prerequisites**: What knowledge this chapter builds upon" :""}

### 3. CORE CONTENT EXTRACTION

${format ==="paragraph" ?`**Paragraph Format Rules**:
- Lead each paragraph with a clear topic sentence
- Present information in logical progression (chronological, causal, or thematic)
- Use transition words between paragraphs (Furthermore, In contrast, Consequently)
- Conclude each paragraph by connecting to the next concept
- Final paragraph should synthesize rather than introduce new information` :""}

${format ==="bullets" ?`**Bullet Point Format Rules**:
- Group bullets under **bold section headings**
- One distinct concept per bullet point
- Start each bullet with the key concept, then explain
- Use indented sub-bullets (—) for supporting details, examples, or evidence
- Keep bullets concise: 1-2 sentences maximum
- Leave blank line between major sections` :""}

${format ==="outline" ?`**Outline Format Rules**:
- Use numbered hierarchy: 1. Main Topic → 1.1 Subtopic → 1.1.1 Detail
- Bold main topic numbers for visual distinction
- Include brief explanations alongside points, not just labels
- Indent consistently to show relationships
- Cross-reference between sections where concepts connect` :""}

**Content to Extract**:
- **Main concepts & theories**: Central ideas with clear explanations
- **Key definitions**: Important terms with precise definitions
- **Evidence & examples**: Supporting facts, data, and illustrative examples
- **Relationships**: Cause-effect chains, comparisons, and contrasts
- **Processes & sequences**: Step-by-step breakdowns of any procedures
${length !=="brief" ?"- **Dates, names, formulas**: Specific data points that are commonly tested\n- **Exceptions & nuances**: Important caveats or special cases" :""}
${length ==="detailed" ?"- **Debates & perspectives**: Different viewpoints or interpretations\n- **Applications**: Real-world uses or implications of concepts" :""}

### 4. SYNTHESIS & TAKEAWAYS (Closing Section)
- **Key takeaways**: ${length ==="brief" ?"2-3" : length ==="medium" ?"3-5" :"5-7"} most important points to remember
- **Connections**: How concepts in this chapter relate to each other
${length !=="brief" ?"- **Study focus areas**: What to prioritize when reviewing this material" :""}
${length ==="detailed" ?"- **Potential exam questions**: 2-3 questions likely to be asked about this content\n- **Further reading**: Connections to related topics or chapters" :""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Length: Appropriate for ${length} setting (${length ==="brief" ?"100-200" : length ==="medium" ?"300-500" :"600-1000"} words)
2. ✓ Format: Correctly structured as ${format}
3. ✓ Completeness: All major topics from the chapter are represented
4. ✓ Accuracy: Facts, dates, and definitions are faithfully preserved
5. ✓ ${highlightKeyTerms ?"Key terms are bolded throughout" :"Clean formatting without excessive emphasis"}
6. ✓ No filler: Every sentence adds value; no generic padding
7. ✓ Hierarchy: Most important concepts receive proportionally more coverage
8. ✓ Coherence: Summary reads logically even without the original chapter
9. ✓ Exam readiness: A student could use this to review effectively
10. ✓ Original meaning: No distortion or misinterpretation of source material

## CONTENT TO SUMMARIZE
${input}

## OUTPUT FORMAT

Begin directly with the summary content. ${format ==="bullets" ?"Start with bold section headings and grouped bullet points." :""} ${format ==="outline" ?"Start with the numbered outline structure." :""} ${format ==="paragraph" ?"Start with the opening context paragraph." :""}

Do NOT include:
- Introductory text ("Here is your summary...")
- Meta-commentary about the summarization process
- Content not present in the original chapter
- Opinions or editorializing beyond the source material
- Excessive length beyond the ${length} specification

Create a clear, well-organized, exam-ready summary:`;
};


const features = [
  {
    icon: Target,
    title:"Flexible Length Options",
    description:"Choose from brief overview to comprehensive summary based on your study needs and time available.",
  },
  {
    icon: List,
    title:"Multiple Formats",
    description:"Get summaries as flowing paragraphs, scannable bullet points, or organized numbered outlines.",
  },
  {
    icon: CheckCircle,
    title:"Key Terms Highlighted",
    description:"Important concepts and vocabulary are emphasized to help you focus on what matters most.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Paste Content",
    desc:"Add your chapter text or notes",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Format",
    desc:"Select length and style preference",
    icon: List,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Summary",
    desc:"Receive condensed, organized notes",
    icon: ClipboardList,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Chapter Summary tool?",
    answer:"The Chapter Summary tool is an AI-powered study assistant that transforms lengthy textbook chapters into concise, organized summaries. It extracts main concepts, key terms, and important details while maintaining the essential information you need to learn. Perfect for exam preparation, quick reviews, or creating study notes from dense reading materials.",
  },
  {
    question:"How long can my chapter content be?",
    answer:"You can paste entire chapters or long sections - the AI is designed to handle extensive content. Whether it's a 20-page textbook chapter, multiple pages of lecture notes, or a long article, the tool will intelligently identify and extract the most important information. There's no strict length limit, though very long texts may take slightly longer to process.",
  },
  {
    question:"What subjects work best with this tool?",
    answer:"All subjects work excellently! History, Biology, Chemistry, Physics, Business, Literature, Psychology, Economics, and more. The AI adapts to different subject matters and academic writing styles. Whether you're summarizing scientific concepts, historical events, literary analysis, or theoretical frameworks, you'll get accurate, subject-appropriate summaries.",
  },
  {
    question:"What's the difference between summary lengths?",
    answer:"Brief (1-2 paragraphs) gives you a quick overview of the main idea - great for last-minute reviews. Medium (3-5 paragraphs) covers main points and key concepts - ideal for regular study sessions. Detailed provides comprehensive coverage of all important information - perfect when you need thorough notes or missed class. Choose based on your time and depth needed.",
  },
  {
    question:"How does key term highlighting work?",
    answer:"When enabled, the AI identifies and bolds important vocabulary, concepts, definitions, and critical information throughout the summary. This makes it easy to spot what you need to memorize, understand, or review. Terms are highlighted based on their importance to understanding the chapter, not just frequency of appearance.",
  },
  {
    question:"Is the Chapter Summary tool free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: ClipboardList,
    color:"text-blue-600",
  },
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    icon: Brain,
    color:"text-purple-600",
  },
  {
    name:"Quiz Generator",
    slug:"quiz-generator",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Revision Planner",
    slug:"revision-planner",
    icon: Calculator,
    color:"text-orange-600",
  },
];

export default function ChapterSummaryClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Chapter Summary"
      toolSlug="chapter-summary"
      tagline="Summarize any chapter in seconds"
      description="Transform lengthy chapters into concise, easy-to-review summaries with key points highlighted. Perfect for exam prep and quick reviews."
      badge="Quick Review Tool"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Summarize Your Content"
      ctaDescription="Save hours of reading time with instant, accurate AI summaries!"
      ctaButtonText="Create Summary"
      ctaIcon={BookOpen}
    >
      <EnhancedToolLayout
        toolSlug="chapter-summary"
        toolName="Chapter Summary"
        placeholder={`📚 Paste your chapter content here...

You can paste:
• Textbook chapters (any subject)
• Lecture notes and transcripts
• Academic articles and papers
• Study materials from PDFs
• Online course content
• Research papers and reports

Examples of what to paste:
•"Chapter 5: The French Revolution began in 1789... [entire chapter text]"
•"Photosynthesis is the process by which plants... [biology chapter content]"
•"Supply and demand are fundamental economic principles... [economics chapter]"
•"The Civil War (1861-1865) was a pivotal moment... [history chapter content]"

💡 Tip: The more complete content you provide, the better and more comprehensive the summary will be!`}
        inputRows={12}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📋 Your Chapter Summary"
        generateButtonText="📝 Summarize Chapter"
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
