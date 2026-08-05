"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  Brain,
  Layers,
  Target,
  Zap,
  Sparkles,
  Users,
  Star,
  Clock,
  BookOpen,
  Lightbulb,
  ClipboardList,
  GraduationCap,
} from"lucide-react";

const systemPrompt =`You are an expert flashcard generator for effective learning and memorization.

OUTPUT RULES:
- Generate the EXACT number of cards requested
- Use the EXACT format: Card 1: / Front: ... / Back: ... / Memory Tip: ...
- Do NOT use FINAL ANSWER/WORKING/QUICK CHECK format
- Output will be long (5-20 cards) - ignore any line limits
- Include all cards with proper numbering
- Keep Front concise (question/term), Back comprehensive (answer/definition)

CARD QUALITY:
- Front should be a clear cue, question, or term
- Back should be the complete answer or definition
- Memory tips should use mnemonics, associations, or visualization
- Make cards testable and specific
- Cover different aspects of the topic`;

const toolOptions = [
  {
    id:"cardCount",
    label:"Number of Cards",
    type:"select" as const,
    options: [
      { value:"5", label:"5 Cards" },
      { value:"10", label:"10 Cards" },
      { value:"15", label:"15 Cards" },
      { value:"20", label:"20 Cards" },
    ],
    defaultValue:"10",
  },
  {
    id:"style",
    label:"Card Style",
    type:"select" as const,
    options: [
      { value:"term-definition", label:"📚 Term → Definition" },
      { value:"question-answer", label:"❓ Question → Answer" },
      { value:"concept-example", label:"💡 Concept → Example" },
      { value:"cue-detail", label:"🎯 Cue → Detail" },
    ],
    defaultValue:"term-definition",
  },
  {
    id:"difficulty",
    label:"Difficulty Level",
    type:"select" as const,
    options: [
      { value:"basic", label:"🟢 Basic" },
      { value:"intermediate", label:"🟡 Intermediate" },
      { value:"advanced", label:"🔴 Advanced" },
    ],
    defaultValue:"intermediate",
  },
  {
    id:"includeMemoryTips",
    label:"Include Memory Tips",
    type:"toggle" as const,
    defaultValue: true,
  },
  {
    id:"includeExamples",
    label:"Include Examples",
    type:"toggle" as const,
    defaultValue: false,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const cardCount = options?.cardCount ||"10";
  const style = options?.style ||"term-definition";
  const difficulty = options?.difficulty ||"intermediate";
  const includeMemoryTips = options?.includeMemoryTips ?? true;
  const includeExamples = options?.includeExamples ?? false;

  const styleInstructions: Record<string, string> = {"term-definition":"Format as Term on front, comprehensive definition on back","question-answer":"Format as clear question on front, detailed answer on back","concept-example":"Format as concept on front, practical example on back","cue-detail":"Format as brief cue/keyword on front, detailed explanation on back",
  };

  const difficultyInstructions: Record<string, string> = {
    basic:"Basic level - fundamental concepts and simple information",
    intermediate:"Intermediate level - moderate complexity requiring good understanding",
    advanced:"Advanced level - complex concepts requiring deep comprehension",
  };

  return`Create exactly ${cardCount} high-quality flashcards for studying this topic:

TOPIC / SOURCE MATERIAL:
${input}

REQUIREMENTS:
- Number of cards: exactly ${cardCount}
- Style: ${styleInstructions[style]}
- Difficulty: ${difficultyInstructions[difficulty]}
- Each card must test a distinct fact or concept (no near-duplicates)
- Front: short prompt/question/term (1 line preferred)
- Back: complete, accurate answer (1–4 lines)

OUTPUT FORMAT (use exactly, Markdown):

### Card 1
**Front:** ...
**Back:** ...
${includeMemoryTips ?"**Memory tip:** short mnemonic or association\n" :""}${includeExamples ?"**Example:** one concrete example\n" :""}
### Card 2
**Front:** ...
**Back:** ...
${includeMemoryTips ?"**Memory tip:** ...\n" :""}${includeExamples ?"**Example:** ...\n" :""}
(continue through Card ${cardCount})

Do not add an introduction or conclusion. Output only the cards.`;
};


const features = [
  {
    icon: Brain,
    title:"Memory-Optimized",
    description:"Cards designed using proven memory techniques with mnemonics and associations for better retention",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Target,
    title:"Multiple Styles",
    description:"Choose from term-definition, Q&A, concept-example, or cue-detail formats for different learning needs",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: Sparkles,
    title:"Smart Content",
    description:"AI generates comprehensive backs with key information and optional memory tips for effective studying",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type the subject or chapter you want to memorize",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Format",
    desc:"Select card style, count, and difficulty level",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Study & Memorize",
    desc:"Get ready-to-use flashcards with memory tips",
    icon: Brain,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"MCQ Generator",
    slug:"mcq-generator",
    icon: Target,
    color:"text-blue-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
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
    icon: ClipboardList,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"How many flashcards can I generate?",
    answer:"You can generate 5, 10, 15, or 20 flashcards at once. For comprehensive coverage, we recommend starting with 10 cards per topic and creating multiple sets for larger subjects.",
    category:"Usage",
  },
  {
    question:"What are the different card styles?",
    answer:"Term-Definition is for vocabulary and concepts. Question-Answer tests understanding. Concept-Example links theory to practice. Cue-Detail uses keywords as memory triggers. Choose based on your learning style.",
    category:"Features",
  },
  {
    question:"What are memory tips and how do they help?",
    answer:"Memory tips are mnemonics, associations, or visualization techniques that help you remember information better. They create mental connections that make recall easier during exams.",
    category:"Learning",
  },
  {
    question:"Can I use these for digital flashcard apps?",
    answer:"Yes! Copy the cards and paste them into apps like Anki, Quizlet, or Notion. The format works well with most flashcard platforms. You can also download them as a text file.",
    category:"Usage",
  },
  {
    question:"How should I study with flashcards?",
    answer:"Use spaced repetition - review cards after 1 day, 3 days, 7 days, etc. Focus on cards you get wrong. Mix up the order each time. Test yourself by reading the front and recalling the back before checking.",
    category:"Learning",
  },
  {
    question:"What's the difference between difficulty levels?",
    answer:"Basic covers fundamental concepts with simple explanations. Intermediate requires deeper understanding with more details. Advanced includes complex concepts and critical thinking. Match it to your current level.",
    category:"Features",
  },
];

export default function FlashcardMakerClient() {
  return (
    <PremiumToolWrapper
      toolName="Make Flashcards from Notes Automatically Free"
      toolSlug="flashcard-maker"
      tagline="Auto-generate Q&A cards from notes or a textbook chapter"
      description="Paste lecture notes or a chapter section and create study flashcards for spaced repetition—free, no signup required to start. Built for exam prep."
      badge="AI-Powered"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to build tonight's deck?"
      ctaDescription="Turn notes into active-recall flashcards in seconds"
      ctaIcon={Brain}
    >
      <EnhancedToolLayout
        toolSlug="flashcard-maker"
        systemPrompt={systemPrompt}
        toolName="Make Flashcards from Notes Automatically Free"
        placeholder={`📚 Enter the topic you need flashcards for...

Examples:
• Biology vocabulary - cell structures and organelles
• Spanish verbs - present tense conjugations
• World capitals and their countries
• Chemistry formulas and equations
• Historical dates of World War II
• Programming concepts - OOP principles
• Medical terminology for anatomy
• Mathematical theorems and proofs

The more specific you are, the better your flashcards will be!`}
        promptTemplate={generatePrompt}
        inputRows={8}
        toolOptions={toolOptions}
        resultLabel="🎴 Your Flashcards"
        generateButtonText="🧠 Create Flashcards"
        inputLabel="📖 Topic"
        showAdvancedOptions={true}
        maxHistoryItems={10}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
