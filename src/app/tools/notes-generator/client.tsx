"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  BookOpen,
  ClipboardList,
  Brain,
  Lightbulb,
  Target,
  Zap,
  Users,
  Star,
  Clock,
  Sparkles,
  FileText,
  GraduationCap,
} from"lucide-react";

const systemPrompt =`You are an expert note-taking assistant helping students create comprehensive study notes.

OUTPUT RULES:
- Create well-organized, clear notes that capture all key information
- Use proper formatting with headers, bullet points, and sections
- Highlight important concepts and definitions
- Include examples where helpful
- Make notes easy to review and understand

QUALITY STANDARDS:
- Comprehensive coverage of the topic
- Clear organization and structure
- Easy-to-scan format
- Academic rigor appropriate for the subject
- Helpful for studying and review`;

const toolOptions = [
  {
    id:"noteStyle",
    label:"Note Style",
    type:"select" as const,
    options: [
      { value:"detailed", label:"📝 Detailed Notes" },
      { value:"summary", label:"📋 Summary Points" },
      { value:"outline", label:"🔢 Outline Format" },
      { value:"cornell", label:"📚 Cornell Style" },
      { value:"mindmap", label:"🧠 Mind Map Structure" },
    ],
    defaultValue:"detailed",
  },
  {
    id:"subject",
    label:"Subject Area",
    type:"select" as const,
    options: [
      { value:"general", label:"📚 General" },
      { value:"science", label:"🔬 Science" },
      { value:"math", label:"🔢 Mathematics" },
      { value:"history", label:"📜 History" },
      { value:"literature", label:"📖 Literature" },
      { value:"business", label:"💼 Business" },
      { value:"technology", label:"💻 Technology" },
    ],
    defaultValue:"general",
  },
  {
    id:"length",
    label:"Note Length",
    type:"select" as const,
    options: [
      { value:"brief", label:"⚡ Brief (Key points only)" },
      { value:"standard", label:"📄 Standard" },
      { value:"comprehensive", label:"📚 Comprehensive" },
    ],
    defaultValue:"standard",
  },
  {
    id:"includeKeyTerms",
    label:"Highlight Key Terms",
    type:"toggle" as const,
    defaultValue: true,
  },
  {
    id:"includeQuestions",
    label:"Add Review Questions",
    type:"toggle" as const,
    defaultValue: true,
  },
  {
    id:"includeExamples",
    label:"Include Examples",
    type:"toggle" as const,
    defaultValue: true,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const noteStyle = options?.noteStyle ||"detailed";
  const subject = options?.subject ||"general";
  const length = options?.length ||"standard";
  const includeKeyTerms = options?.includeKeyTerms ?? true;
  const includeQuestions = options?.includeQuestions ?? true;
  const includeExamples = options?.includeExamples ?? true;

  const styleInstructions: Record<string, string> = {
    detailed:"Create comprehensive, detailed notes with full explanations of each concept. Use paragraphs and clear explanations.",
    summary:"Create concise summary notes using bullet points. Focus on the most important information only.",
    outline:"Create notes in outline format with numbered sections (1, 1.1, 1.1.1) and hierarchical structure.",
    cornell:"Use Cornell note-taking format with: Main Notes (detailed content), Cues (keywords/questions on left), and Summary (bottom section).",
    mindmap:"Structure notes like a mind map with main topic at center, major branches for main concepts, and sub-branches for details.",
  };

  const lengthInstructions: Record<string, string> = {
    brief:"Keep it concise - only essential information and key points.",
    standard:"Provide balanced coverage with main concepts and important details.",
    comprehensive:"Create extensive notes covering all aspects in depth with thorough explanations.",
  };

  let prompt =`Create study notes about: ${input}

📚 Subject: ${subject}
📝 Style: ${styleInstructions[noteStyle]}
📏 Length: ${lengthInstructions[length]}

Structure your notes with:

📌 TOPIC OVERVIEW:
[Brief introduction to the topic]

📖 MAIN CONTENT:
${noteStyle ==="cornell" ?"[Divide into: Cues column | Main Notes column]" :"[Organized sections covering all key aspects]"}`;

  if (includeKeyTerms) {
    prompt +=`
🔑 KEY TERMS & DEFINITIONS:
[Important terminology with clear definitions]`;
  }

  if (includeExamples) {
    prompt +=`
💡 EXAMPLES:
[Practical examples illustrating concepts]`;
  }

  if (includeQuestions) {
    prompt +=`
❓ REVIEW QUESTIONS:
[3-5 questions to test understanding of the material]`;
  }

  if (noteStyle ==="cornell") {
    prompt +=`
📝 SUMMARY:
[Brief summary section at the bottom]`;
  }

  prompt +=`
Remember to:
- Use clear headings and formatting
- Organize information logically
- Make it easy to review and study
- Highlight important concepts
- Keep explanations clear and accessible`;

  return prompt;
};


const features = [
  {
    icon: Brain,
    title:"Multiple Note Styles",
    description:"Choose from detailed notes, summaries, outlines, Cornell method, or mind map structures",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Target,
    title:"Subject-Optimized",
    description:"Notes adapted to different subjects including science, math, history, literature, and more",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: Sparkles,
    title:"Study-Ready Format",
    description:"Includes key terms, examples, and review questions to help you ace your exams",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type the subject or chapter you need notes for",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Format",
    desc:"Select note style and preferences",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Notes",
    desc:"Receive comprehensive, study-ready notes",
    icon: ClipboardList,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    icon: Brain,
    color:"text-blue-600",
  },
  {
    name:"MCQ Generator",
    slug:"mcq-generator",
    icon: Target,
    color:"text-purple-600",
  },
  {
    name:"Chapter Summary",
    slug:"chapter-summary",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Concept Explainer",
    slug:"concept-explainer",
    icon: Lightbulb,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"What note-taking styles are available?",
    answer:"We offer 5 styles: Detailed (comprehensive paragraphs), Summary (bullet points), Outline (numbered hierarchy), Cornell (divided format with cues and summary), and Mind Map (branching structure). Each is designed for different learning preferences.",
    category:"Features",
  },
  {
    question:"Can I generate notes for any subject?",
    answer:"Yes! The tool works for all subjects including science, math, history, literature, business, technology, and general topics. The AI adapts its approach based on the subject you select.",
    category:"Usage",
  },
  {
    question:"Are review questions included?",
    answer:"Yes, when enabled, we include 3-5 review questions to help you test your understanding of the material. These are great for self-assessment and exam preparation.",
    category:"Features",
  },
  {
    question:"What's the Cornell note-taking method?",
    answer:"Cornell notes divide the page into three sections: a narrow left column for cues/keywords, a wider right column for main notes, and a bottom section for summary. It's proven effective for studying and review.",
    category:"Methods",
  },
  {
    question:"How detailed should my input be?",
    answer:"You can be brief (e.g., 'Photosynthesis') or detailed (e.g., 'The light-dependent reactions of photosynthesis in plant cells'). More specific input typically generates more focused notes.",
    category:"Usage",
  },
  {
    question:"Can I use these notes for exam preparation?",
    answer:"Absolutely! The notes are specifically designed for studying and exam prep. They include key terms, examples, and review questions to help you master the material.",
    category:"Academic",
  },
];

export default function NotesGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="Generate Study Notes from Any Topic Free"
      toolSlug="notes-generator"
      tagline="Free AI study notes — headings, bullets, exam-ready"
      description="Paste a lecture, textbook section, or topic and get organized notes for revision. No login required to start. Edit with your own examples next."
      badge="AI-Powered"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Study Smarter?"
      ctaDescription="Generate comprehensive study notes in seconds"
      ctaIcon={ClipboardList}
    >
      <EnhancedToolLayout
        toolSlug="notes-generator"
        systemPrompt={systemPrompt}
        toolName="Generate Study Notes from Any Topic Free"
        placeholder={`📚 Enter the topic you need notes for...

Examples:
• The water cycle and its stages
• World War II causes and major events
• Cellular respiration process
• Shakespeare's Romeo and Juliet themes
• Marketing fundamentals and the 4 Ps
• Python programming basics - functions and loops

The more specific you are, the better your notes will be!`}
        promptTemplate={generatePrompt}
        inputRows={10}
        toolOptions={toolOptions}
        resultLabel="📝 Your Study Notes"
        generateButtonText="📚 Generate Notes"
        inputLabel="📖 Topic/Chapter"
        showAdvancedOptions={true}
        maxHistoryItems={10}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
