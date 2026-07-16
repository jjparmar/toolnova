"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  BookOpen,
  Brain,
  Lightbulb,
  FileText,
  Calculator,
  HelpCircle,
  ClipboardList,
  Users,
  Star,
  Zap,
  CheckCircle,
  Target,
} from"lucide-react";

const systemPrompt =`You are an expert assessment designer.

Create accurate, clear quiz questions that test real understanding.
Follow the user format exactly. Include the answer key when requested.
No filler intro. Markdown is preferred for structure.`;

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
    ] as const,
    defaultValue:"10",
  },
  {
    id:"questionTypes",
    label:"Question Types",
    type:"select" as const,
    options: [
      { value:"mixed", label:"🎯 Mixed Types" },
      { value:"short", label:"📝 Short Answer" },
      { value:"true-false", label:"✅ True/False" },
      { value:"fill-blank", label:"📋 Fill in the Blanks" },
    ] as const,
    defaultValue:"mixed",
  },
  {
    id:"includeAnswers",
    label:"Include Answer Key",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const questionCount = options?.questionCount ||"10";
  const questionTypes = options?.questionTypes ||"mixed";
  const includeAnswers = options?.includeAnswers !== false;

  const typeDescriptions: Record<string, string> = {
    mixed:"Balanced mix: combine short answer, true/false, and fill-in-the-blank questions for comprehensive assessment. Varies question difficulty and cognitive levels.",
    short:"Short answer questions requiring 1-3 sentence explanations. Test understanding, application, and critical thinking. Require written responses demonstrating comprehension.","true-false":"True/false questions with clear, unambiguous statements. Test factual knowledge and ability to identify accurate information. Avoid trick questions or double negatives.","fill-blank":"Fill-in-the-blank questions with key terms, concepts, or facts missing. Test recall and vocabulary. Provide clear context clues without giving away answers.",
  };

  const typeStrategies: Record<string, string> = {
    mixed:"Include roughly equal distribution: 40% short answer, 30% true/false, 30% fill-in-the-blank. Start with easier recall questions, progress to harder application questions.",
    short:"Vary question complexity using Bloom's Taxonomy: some recall (define, list), some comprehension (explain, describe), some application (apply, demonstrate). Require clear, concise answers.","true-false":"Make statements definitively true or false (not partially true). Include both positive and negative statements. Test important concepts, not trivial details. Avoid patterns (like T,T,F,T,T,F).","fill-blank":"Remove only the most important term/concept in each sentence. Provide sufficient context for one correct answer. Avoid removing too many words from one sentence. Use blanks of equal length.",
  };

  return`You are an expert assessment designer and educational psychologist specializing in creating effective quizzes that accurately measure student learning and comprehension.

## YOUR TASK
Create a ${questionCount}-question quiz on the provided topic using ${questionTypes ==="mixed" ?"mixed question types" : questionTypes +" questions"} that effectively assesses understanding and knowledge retention.

## SPECIFICATIONS
**Question Count**: Exactly ${questionCount} questions
**Question Types**: ${typeDescriptions[questionTypes]}
**Answer Key**: ${includeAnswers ?"Include complete answer key with explanations after the quiz" :"Questions only, no answers"}
**Difficulty**: Progressive from easier to harder
**Assessment Strategy**: ${typeStrategies[questionTypes]}

## QUESTION WRITING FRAMEWORK

### 1. COGNITIVE LEVELS (Bloom's Taxonomy)
Distribute questions across cognitive levels:
- **Remember** (20-30%): Recall facts, terms, concepts
- **Understand** (30-40%): Explain ideas, summarize, interpret
- **Apply** (20-30%): Use knowledge in new situations
- **Analyze** (10-20%): Break down information, identify patterns
${questionTypes ==="short" ?"- **Evaluate/Create**: Include 1-2 higher-order thinking questions" :""}

### 2. QUESTION QUALITY STANDARDS

${
  questionTypes ==="short" || questionTypes ==="mixed"
    ?`#### Short Answer Questions:
- **Clear prompt**: Ask one specific thing
- **Appropriate scope**: Answerable in 1-3 sentences
- **No ambiguity**: One clearly correct answer approach
- **Examples of good prompts**:
  ✅"Explain how photosynthesis converts light energy into chemical energy."
  ✅"Describe two main causes of the American Revolution."
  ❌"What do you think about photosynthesis?" (too vague)
  ❌"Tell me everything about the American Revolution." (too broad)`
    :""
}
${
  questionTypes ==="true-false" || questionTypes ==="mixed"
    ?`#### True/False Questions:
- **Unambiguous statements**: Definitively true or false, not partially
- **Test key concepts**: Not trivial or trick questions
- **Avoid absolutes**: Rarely use"always,""never,""all,""none" (signals false)
- **Vary statement types**: Mix positive and negative statements
- **Examples**:
  ✅"Water boils at 100°C at sea level. (True)"
  ✅"The Earth revolves around the Sun in 365 days. (True)"
  ❌"All mammals live in water. (False)" - too obviously false
  ❌"Shakespeare never wrote comedies. (False)" - absolute + trick`
    :""
}
${
  questionTypes ==="fill-blank" || questionTypes ==="mixed"
    ?`#### Fill-in-the-Blank Questions:
- **Remove key term**: Delete the most important word/concept
- **Sufficient context**: Reader can determine one correct answer
- **One blank preferred**: Multiple blanks increase difficulty exponentially
- **Same blank length**: Use"___________" consistently (don't reveal answer length)
- **Examples**:
  ✅"The process by which plants convert sunlight into energy is called ___________."
  ✅"The capital of France is ___________."
  ❌"The ___ of France is ___." - too many blanks, insufficient context`
    :""
}

### 3. CONTENT COVERAGE
- **Comprehensive**: Cover main topics and subtopics proportionally
- **Important concepts**: Focus on key learning objectives, not trivial details
- **Avoid repetition**: Each question tests different knowledge
- **Balanced difficulty**: ${questionCount ==="5" ?"2 easy, 2 medium, 1 hard" : questionCount ==="10" ?"3 easy, 4 medium, 3 hard" : questionCount ==="15" ?"5 easy, 6 medium, 4 hard" :"Progressive from easier to harder"}
- **Real understanding**: Test comprehension, not just memorization

### 4. QUESTION FORMATTING

**Numbering**: 1, 2, 3, etc.
**Clear instructions**: Brief instruction for each question type
**Consistent style**: Professional, educational tone
**Proper grammar**: Perfect spelling and punctuation

${
  questionTypes ==="mixed"
    ?`**Mixed Quiz Structure**:
- Group by question type for clarity
- Section 1: Short Answer (Questions 1-X)
- Section 2: True/False (Questions X-Y)
- Section 3: Fill in the Blank (Questions Y-Z)
- Or: Interweave types if instructed`
    :""
}

## ANSWER KEY STANDARDS
${
  includeAnswers
    ?`
Include after the quiz with this format:

**ANSWER KEY**

For each question provide:
1. **Question number** clearly labeled
2. **Correct answer** in bold or clearly marked
3. **Explanation** (2-3 sentences) explaining:
   - Why this is the correct answer
   - Key concept being tested
   - Common misconceptions to avoid (if relevant)

**Short Answer Grading Guidance**:
- Provide model answer (ideal response)
- List required elements for full credit
- Note acceptable alternative phrasings

**True/False Explanations**:
- Explain why statement is true or false
- Clarify any potentially confusing aspects
- Reference key facts supporting the answer

**Fill-in-the-Blank Answers**:
- Provide exact answer
- Note acceptable variations (e.g.,"photosynthesis" or"the process of photosynthesis")
- Brief explanation of the term's significance`
    :"Questions only - no answer key needed"
}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Question count: Exactly ${questionCount} questions
2. ✓ Question types: ${questionTypes ==="mixed" ?"Mix of short answer, true/false, and fill-in-the-blank" :"All" + questionTypes +" format"}
3. ✓ Cognitive levels: Questions span multiple thinking levels
4. ✓ Content coverage: All major topics from material addressed
5. ✓ Clarity: Every question is unambiguous and clear
6. ✓ Difficulty progression: Starts easier, builds to harder
7. ✓ No repetition: Each question tests unique knowledge
8. ✓ Grammar: Perfect spelling, punctuation, capitalization
9. ✓ Formatting: Consistent numbering and structure
10. ✓ Appropriate scope: Questions answerable with provided content
11. ✓ ${includeAnswers ?"Answer key: Complete with explanations for every question" :"No answers included"}
12. ✓ Educational value: Tests meaningful understanding, not trivia

## TOPIC/CONTENT TO ASSESS
${input}

## OUTPUT FORMAT

Provide the quiz in this format:

**QUIZ: [Topic Name]**
${questionTypes ==="mixed" ?"\n**Section 1: Short Answer Questions**\n[Short answer questions here]\n\n**Section 2: True/False Questions**\n[True/false questions here]\n\n**Section 3: Fill in the Blank Questions**\n[Fill-in-the-blank questions here]" :"\n[All questions numbered sequentially]"}

${
  includeAnswers
    ?`
---

**ANSWER KEY**

1. [Answer and explanation]
2. [Answer and explanation]
[Continue for all ${questionCount} questions]`
    :""
}

Do NOT include:
- Instructions to the quiz taker (like"Choose the best answer")
- Point values or scoring rubrics
- Time limits or test-taking tips
-"Question 1:","Question 2:" labels (just use numbers)
- Your commentary about the quiz

Create an educationally sound quiz that effectively measures comprehension:`;
};


const features = [
  {
    icon: Target,
    title:"Custom Question Types",
    description:"Choose from short answer, true/false, fill-in-the-blanks, or mixed formats to match your study needs.",
  },
  {
    icon: CheckCircle,
    title:"Answer Keys Included",
    description:"Get detailed answer keys with explanations to help you understand why each answer is correct.",
  },
  {
    icon: Brain,
    title:"Smart Question Generation",
    description:"AI generates relevant, well-structured questions that test key concepts and understanding.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Add your study content or topic",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Pick Format",
    desc:"Choose question types and count",
    icon: HelpCircle,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Take Quiz",
    desc:"Test your knowledge instantly",
    icon: Lightbulb,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Quiz Generator?",
    answer:"The Quiz Generator is an AI-powered tool that creates custom practice quizzes based on any topic or content you provide. It generates various question types including short answer, true/false, and fill-in-the-blanks to help you test your knowledge and prepare for exams.",
  },
  {
    question:"What question types are available?",
    answer:"We offer four question formats: Mixed Types (combination of different formats), Short Answer (requiring brief explanations), True/False (statement-based questions), and Fill in the Blanks (testing key terms and concepts). Choose based on your learning preference and exam format.",
  },
  {
    question:"Can I get answer keys with my quiz?",
    answer:"Yes! Toggle 'Include Answer Key' to receive detailed answers with explanations for each question. This helps you understand not just what the correct answer is, but why it's correct, making it a powerful learning tool.",
  },
  {
    question:"How many questions can I generate?",
    answer:"You can generate quizzes with 5, 10, 15, or 20 questions depending on how much time you have to study. Shorter quizzes are great for quick reviews, while longer ones are perfect for comprehensive test preparation.",
  },
  {
    question:"Can I use this for test prep?",
    answer:"Absolutely! The Quiz Generator is perfect for exam preparation. Create multiple quizzes on the same topic to reinforce learning, identify weak areas, and build confidence before your actual test. Many students use it for daily practice leading up to exams.",
  },
  {
    question:"Is the Quiz Generator free?",
    answer:"Yes! The Quiz Generator is completely free to use. Create unlimited quizzes for any subject or topic without any cost. Perfect for students, teachers creating practice materials, or anyone who wants to test their knowledge.",
  },
];

const relatedTools = [
  {
    name:"MCQ Generator",
    slug:"mcq-generator",
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
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Homework Solver",
    slug:"homework-solver",
    icon: Calculator,
    color:"text-orange-600",
  },
];

export default function QuizGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Quiz Generator"
      toolSlug="quiz-generator"
      tagline="Test your knowledge with custom quizzes"
      description="Generate practice quizzes with various question types to reinforce your learning. Perfect for exam prep, self-testing, and knowledge retention."
      badge="Self-Test Tool"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Generate Your Quiz"
      ctaDescription="Test yourself and track your progress with custom quizzes!"
      ctaButtonText="Start Creating"
      ctaIcon={HelpCircle}
    >
      <EnhancedToolLayout
        toolSlug="quiz-generator"
        systemPrompt={systemPrompt}
        toolName="Quiz Generator"
        placeholder={`📖 Enter your topic or paste study content...

Examples:
• The American Civil War and its causes
• Newton's Laws of Motion explained
• Cell structure and organelle functions
• World War II major events timeline
• Photosynthesis process in plants
• Shakespeare's Romeo and Juliet themes

💡 Tip: Provide detailed content for more specific and challenging questions!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📝 Your Quiz"
        generateButtonText="🎯 Generate Quiz"
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
