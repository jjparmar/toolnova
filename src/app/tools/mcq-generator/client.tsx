"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  Target,
  Brain,
  Lightbulb,
  CheckCircle2,
  Zap,
  Users,
  Star,
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
} from"lucide-react";

const systemPrompt =`You are an expert MCQ (Multiple Choice Question) generator for exam preparation.

OUTPUT RULES:
- Generate the EXACT number of questions requested
- Use the EXACT format: Question 1: [question text] A) ... B) ... C) ... D) ...
- Do NOT use FINAL ANSWER/WORKING format
- Output can be long (5-20 questions) - ignore any line limits
- Include all questions with proper numbering
- Add answer key at the end when requested

QUESTION QUALITY:
- Make distractors plausible but clearly incorrect
- Ensure ONE clear correct answer per question
- Match the requested difficulty level
- Keep questions clear and unambiguous
- Test understanding, not just memorization
- Cover different aspects of the topic`;

const toolOptions = [
  {
    id:"questionCount",
    label:"Number of Questions",
    type:"select" as const,
    options: [
      { value:"5", label:"5 Questions" },
      { value:"10", label:"10 Questions" },
      { value:"15", label:"15 Questions" },
      { value:"20", label:"20 Questions" },
    ],
    defaultValue:"10",
  },
  {
    id:"difficulty",
    label:"Difficulty Level",
    type:"select" as const,
    options: [
      { value:"easy", label:"🟢 Easy" },
      { value:"medium", label:"🟡 Medium" },
      { value:"hard", label:"🔴 Hard" },
      { value:"mixed", label:"🎯 Mixed" },
    ],
    defaultValue:"medium",
  },
  {
    id:"questionType",
    label:"Question Focus",
    type:"select" as const,
    options: [
      { value:"conceptual", label:"💡 Conceptual Understanding" },
      { value:"factual", label:"📚 Factual Knowledge" },
      { value:"application", label:"🔧 Application-based" },
      { value:"mixed", label:"🎯 Mixed Types" },
    ],
    defaultValue:"mixed",
  },
  {
    id:"includeAnswers",
    label:"Include Answer Key",
    type:"toggle" as const,
    defaultValue: true,
  },
  {
    id:"includeExplanations",
    label:"Include Explanations",
    type:"toggle" as const,
    defaultValue: false,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const questionCount = options?.questionCount ||"10";
  const difficulty = options?.difficulty ||"medium";
  const questionType = options?.questionType ||"mixed";
  const includeAnswers = options?.includeAnswers ?? true;
  const includeExplanations = options?.includeExplanations ?? false;

  const difficultyInstructions: Record<string, string> = {
    easy:"Easy level - Basic concepts and straightforward questions. Suitable for beginners.",
    medium:"Medium level - Moderate complexity requiring good understanding. Standard exam level.",
    hard:"Hard level - Advanced concepts requiring deep understanding and critical thinking.",
    mixed:"Mixed difficulty - Combination of easy, medium, and hard questions for comprehensive assessment.",
  };

  const typeInstructions: Record<string, string> = {
    conceptual:"Focus on testing conceptual understanding and comprehension of key ideas.",
    factual:"Focus on testing factual knowledge, definitions, dates, names, and specific information.",
    application:"Focus on testing ability to apply knowledge to solve problems or real-world scenarios.",
    mixed:"Include a variety of question types covering concepts, facts, and applications.",
  };

  let prompt =`Generate exactly ${questionCount} high-quality multiple-choice questions about:

TOPIC / MATERIAL:
${input}

SPECS:
- Difficulty: ${difficultyInstructions[difficulty]}
- Focus: ${typeInstructions[questionType]}
- Exactly 4 options (A–D) per question
- Exactly one correct answer
- Plausible distractors (not silly or obviously wrong)
- Clear, unambiguous stems (no"all of the above" /"none of the above")
- Cover different aspects; no duplicate questions

OUTPUT FORMAT (Markdown):

### Question 1
[Question stem]
A) ...
B) ...
C) ...
D) ...

### Question 2
...
(continue through Question ${questionCount})`;

  if (includeAnswers) {
    prompt +=`
---
### Answer key
1. [Letter] — one-line reason
2. [Letter] — one-line reason
(for every question)`;
  } else if (includeExplanations) {
    prompt +=`
After all questions, add brief explanations for each correct answer.`;
  }

  prompt +=`
Output only the quiz content—no intro paragraph.`;

  return prompt;
};


const features = [
  {
    icon: Zap,
    title:"Customizable Difficulty",
    description:"Choose from easy, medium, hard, or mixed difficulty levels to match your preparation needs",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Brain,
    title:"Multiple Question Types",
    description:"Generate conceptual, factual, or application-based questions for comprehensive learning",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: CheckCircle2,
    title:"Answer Keys & Explanations",
    description:"Get instant answer keys and detailed explanations to understand why each answer is correct",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type the subject or chapter you want to practice",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Preferences",
    desc:"Choose number of questions, difficulty, and type",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Practice & Learn",
    desc:"Get MCQs with answers and explanations",
    icon: CheckCircle2,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Quiz Generator",
    slug:"quiz-generator",
    icon: Lightbulb,
    color:"text-blue-600",
  },
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    icon: Brain,
    color:"text-purple-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Homework Solver",
    slug:"homework-solver",
    icon: GraduationCap,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"How many questions can I generate at once?",
    answer:"You can generate 5, 10, 15, or 20 questions at once. For comprehensive practice, we recommend starting with 10 questions and adjusting based on your needs.",
    category:"Usage",
  },
  {
    question:"What's the difference between difficulty levels?",
    answer:"Easy questions test basic concepts, Medium requires solid understanding, Hard tests advanced knowledge and critical thinking, and Mixed includes all levels for comprehensive assessment.",
    category:"Features",
  },
  {
    question:"Can I get answer explanations?",
    answer:"Yes! Enable 'Include Explanations' to get detailed explanations for each correct answer, helping you understand the reasoning behind the solutions.",
    category:"Features",
  },
  {
    question:"What are the different question types?",
    answer:"Conceptual questions test understanding of ideas, Factual questions test specific knowledge, Application questions test problem-solving ability, and Mixed includes all types.",
    category:"Features",
  },
  {
    question:"Are these suitable for exam preparation?",
    answer:"Absolutely! These MCQs are designed specifically for exam prep. They follow standard exam formats and test various aspects of the topic to ensure thorough preparation.",
    category:"Academic",
  },
  {
    question:"Can I practice multiple times on the same topic?",
    answer:"Yes! Each generation creates new questions, so you can practice the same topic multiple times with different questions to reinforce your learning.",
    category:"Usage",
  },
];

export default function MCQGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="MCQ Generator"
      toolSlug="mcq-generator"
      tagline="Generate practice multiple-choice questions instantly"
      description="Create custom MCQ tests for any subject with adjustable difficulty levels, answer keys, and explanations. Perfect for exam preparation and self-assessment."
      badge="AI-Powered"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Test Your Knowledge?"
      ctaDescription="Generate practice MCQs and ace your exams"
      ctaIcon={Target}
    >
      <EnhancedToolLayout
        toolSlug="mcq-generator"
        systemPrompt={systemPrompt}
        toolName="MCQ Generator"
        placeholder={`📚 Enter the topic you need MCQs for...

Examples:
• Cell biology and mitosis
• World War II major events
• Chemical bonding and molecular structures
• Newton's laws of motion
• Shakespeare's Macbeth themes
• Java programming - OOP concepts
• Marketing mix and 4 Ps
• Photosynthesis process in plants

The more specific you are, the better the questions will be!`}
        promptTemplate={generatePrompt}
        inputRows={8}
        toolOptions={toolOptions}
        resultLabel="📝 Your MCQ Questions"
        generateButtonText="🎯 Generate MCQs"
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
