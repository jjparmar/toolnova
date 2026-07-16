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
  HelpCircle,
  MessageCircle,
  ClipboardList,
  Users,
  Star,
  Zap,
  CheckCircle,
  Target,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"subject",
    label:"Subject Area",
    type:"select" as const,
    options: [
      { value:"general", label:"📚 General" },
      { value:"math", label:"🔢 Mathematics" },
      { value:"science", label:"🔬 Science" },
      { value:"history", label:"📜 History" },
      { value:"programming", label:"💻 Programming" },
    ] as const,
    defaultValue:"general",
  },
  {
    id:"depth",
    label:"Answer Depth",
    type:"select" as const,
    options: [
      { value:"quick", label:"⚡ Quick Answer" },
      { value:"detailed", label:"📝 Detailed Explanation" },
      { value:"eli5", label:"🧒 Simple (ELI5)" },
    ] as const,
    defaultValue:"detailed",
  },
  {
    id:"includeExamples",
    label:"Include Examples",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const subject = options?.subject ||"general";
  const depth = options?.depth ||"detailed";
  const includeExamples = options?.includeExamples !== false;

  const depthStyles: Record<string, string> = {
    quick:"Brief, direct answer (50-100 words). Essential information only. Clear and immediate resolution.",
    detailed:"Comprehensive explanation (300-500 words). Step-by-step breakdown. Include background, reasoning, context, and understanding verification.",
    eli5:"Ultra-simple explanation for a child (100-200 words). No jargon. Use everyday analogies, playful examples, and relatable comparisons.",
  };

  const subjectGuidance: Record<string, string> = {
    general:"Accurate, well-researched information. Clear explanations suitable for general understanding. Cite key facts and provide context.",
    math:"Show mathematical reasoning clearly. Include formulas, variable definitions, and work through each calculation step-by-step. Explain the 'why' behind each operation.",
    science:"Explain scientific principles, concepts, and laws. Use proper terminology with definitions. Connect theory to real-world applications. Include cause-effect relationships.",
    history:"Provide historical context with dates, key figures, and locations. Explain cause-and-effect relationships. Connect events to broader historical trends.",
    programming:"Include code examples with syntax highlighting. Explain logic flow and algorithm. Discuss best practices, common pitfalls, and optimization considerations.",
  };

  const exampleStrategy = includeExamples
    ?"Include 1-2 concrete examples demonstrating the concept or solution. Examples should clarify understanding and show practical application."
    :"Focus on conceptual explanation without specific examples. Abstract understanding prioritized.";

  return`You are an expert tutor, educator, and doubt-solving specialist with deep knowledge across multiple subjects. Your goal is to not just answer questions, but to build genuine understanding through clear explanation and guided reasoning.

## YOUR TASK
Resolve the student's doubt or question about ${subject} using a ${depth} approach that promotes true comprehension.

## SPECIFICATIONS
**Subject Area**: ${subject.toUpperCase()} - ${subjectGuidance[subject]}
**Explanation Depth**: ${depth.toUpperCase()} - ${depthStyles[depth]}
**Examples**: ${exampleStrategy}
**Teaching Philosophy**: Socratic method - guide understanding, don't just give answers

## DOUBT-SOLVING FRAMEWORK

### 1. UNDERSTAND THE QUESTION (Internal analysis)
- Identify what the student is really asking
- Recognize underlying misconceptions if present
- Determine prerequisite knowledge needed
- Assess complexity level

### 2. OPENING RESPONSE (First 1-2 sentences)
${depth ==="quick" ?"- Provide direct answer immediately\n- State the key point concisely" :"- Acknowledge the question\n- Provide brief preview of answer\n- Orient student to what they'll learn"}
- ${depth ==="eli5" ?"Use friendly, encouraging tone: 'Great question! Let me explain...'" :"Professional yet supportive tone"}

### 3. CORE EXPLANATION STRUCTURE

${depth ==="quick" ?"**Quick Answer Format**:\n- Direct answer to the question (2-3 sentences)\n- Essential information only\n- Key takeaway or formula\n- No lengthy background" :""}

${depth ==="eli5" ?"**Simple Explanation Format**:\n- Use everyday language and analogies\n- 'Imagine if...' or 'Think of it like...'\n- No technical terms without immediate simple definition\n- Short sentences (5-10 words)\n- Playful, engaging tone" :""}

${depth ==="detailed" ?"**Detailed Explanation Format**:\n\n#### Step 1: Foundation\n- Provide necessary background/context\n- Define key terms and concepts\n- Explain 'why this matters'\n\n#### Step 2: Core Concept\n- Break down the main idea systematically\n- Explain the 'what' and 'how'\n- Use clear, logical progression\n\n#### Step 3: Step-by-Step Process (if problem-solving)\n- Show each step of solution\n- Explain reasoning at each stage\n- Include formulas, calculations, or logic\n- Highlight common mistakes to avoid\n\n#### Step 4: Connection & Context\n- Relate to broader concepts\n- Show practical applications\n- Connect to what student already knows" :""}

### 4. SUBJECT-SPECIFIC REQUIREMENTS

${subject ==="math" ?"**Mathematics Requirements**:\n- Show all work and calculations\n- Label variables and units\n- Explain each mathematical operation\n- Use proper notation: fractions, exponents, equations\n- Verify answer at the end\n- Example format:\n  Given: [what we know]\n  Find: [what we need]\n  Solution: [step-by-step]\n  Answer: [final result with units]" :""}

${subject ==="science" ?"**Science Requirements**:\n- State relevant scientific principles/laws\n- Explain mechanisms or processes\n- Use scientific terminology correctly\n- Include diagrams descriptions if helpful\n- Cite evidence or empirical basis\n- Connect theory to observable phenomena" :""}

${subject ==="history" ?"**History Requirements**:\n- Provide chronological context\n- Identify key figures and their roles\n- Explain cause-and-effect relationships\n- Include relevant dates and locations\n- Discuss multiple perspectives if applicable\n- Connect events to broader historical themes" :""}

${subject ==="programming" ?"**Programming Requirements**:\n- Include code snippets with explanations\n- Comment code for clarity\n- Explain algorithm/logic flow\n- Discuss time/space complexity if relevant\n- Mention best practices\n- Warn about common bugs or pitfalls\n- Format code properly with syntax" :""}

${subject ==="general" ?"**General Knowledge Requirements**:\n- Provide accurate, factual information\n- Cite sources or basis when helpful\n- Acknowledge complexity or multiple viewpoints\n- Use accessible language\n- Provide context for understanding" :""}

### 5. EXAMPLES & ANALOGIES
${
  includeExamples
    ?`**Requirements**: Include 1-2 relevant examples

**Example Guidelines**:
- ${depth ==="eli5" ?"Use toys, animals, games, or everyday situations" : depth ==="quick" ?"Brief example only if it clarifies immediately" :"Concrete examples from real-world or familiar contexts"}
- Show how concept applies in practice
-"For example, [situation]..."
- Explain HOW the example demonstrates the concept
- ${subject ==="math" ?"Include practice problem with solution" : subject ==="science" ?"Real-world phenomena or experiments" : subject ==="programming" ?"Code examples with output" :"Relatable scenarios"}`
    :"Focus on conceptual clarity without specific examples"
}

### 6. COMMON PITFALLS & MISCONCEPTIONS
${depth ==="detailed" ?"- Address typical mistakes students make\n- Clarify common misunderstandings\n- 'Many students think [wrong], but actually [correct]'\n- Explain WHY the misconception is wrong" :""}

### 7. VERIFICATION & UNDERSTANDING CHECK
${depth ==="detailed" ?"- Verify the solution/answer is correct\n- Summarize key points (2-3 sentences)\n- Suggest how to check their own understanding\n- 'You can verify this by [method]'" : depth ==="quick" ?"- Confirm answer is complete" :"- End with memorable summary phrase"}

### 8. CLOSURE & NEXT STEPS
- ${depth ==="detailed" ?"Suggest related concepts to explore or practice problems" : depth ==="quick" ?"Brief final statement" :"Encouraging closing"}
- Leave student confident and understanding
- ${depth ==="detailed" ?"'To master this, try [suggestion]'" :""}

## PEDAGOGICAL PRINCIPLES

### Socratic Guidance
- Guide thinking, don't just state facts
- Ask rhetorical questions:"Why might this be?""What happens if..."
- Help student discover connections
- Build on prior knowledge

### Clarity Standards
- ${depth ==="eli5" ?"Kindergarten vocabulary, simple sentences" : depth ==="quick" ?"Concise, no fluff" :"Clear but comprehensive, appropriate terminology"}
- Active voice:"We calculate" not"It is calculated"
- Logical flow from simple to complex
- Transitions between ideas

### Accuracy Requirements
- 100% factually correct information
- ${subject ==="math" ?"Double-check all calculations" : subject ==="science" ?"Use established scientific consensus" : subject ==="programming" ?"Code must be syntactically correct" :"Verify facts"}
- Acknowledge limitations or uncertainties
- No oversimplification that creates misconceptions

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Depth: Matches ${depth} requirements
2. ✓ Subject: Appropriate for ${subject} domain
3. ✓ Accuracy: All information is factually correct
4. ✓ Clarity: Explanation is understandable at target level
5. ✓ Completeness: Question is fully answered
6. ✓ Structure: Logical flow from question to resolution
7. ✓ ${subject ==="math" ?"All calculations shown and verified" : subject ==="science" ?"Scientific principles explained" : subject ==="programming" ?"Code examples included and correct" :"Factual accuracy confirmed"}
8. ✓ Examples: ${includeExamples ?"1-2 relevant examples included" :"No examples, focused explanation"}
9. ✓ ${depth ==="detailed" ?"Step-by-step breakdown provided" : depth ==="quick" ?"Brief and concise (50-100 words)" :"Simple language for child (100-200 words)"}
10. ✓ Understanding: Student will genuinely comprehend, not just memorize
11. ✓ No jargon: ${depth ==="eli5" ?"Zero technical terms without simple explanation" : depth ==="quick" ?"Minimal, only essential terms" :"Technical terms explained appropriately"}
12. ✓ Confidence-building: Encouraging and supportive tone

## QUESTION/DOUBT
${input}

## OUTPUT FORMAT

Provide a complete, well-structured answer. Do NOT include:
- Labels like"Answer:","Explanation:","Step 1:"
- Meta-commentary:"Let me explain..." or"I will show..."
- Apologies:"This is complicated..." or"Sorry if this is unclear..."
- Questions back to student (this is the answer, not a conversation)
- Your internal reasoning process

Write the explanation naturally as if speaking to the student. ${depth ==="detailed" ?"Use paragraph breaks and formatting for readability." :""} Make it flow as a cohesive response that resolves their doubt completely.

Provide an answer that truly helps them understand:`;
};


const features = [
  {
    icon: Brain,
    title:"All Subjects Covered",
    description:"Get help with Math, Science, History, Programming, or General knowledge questions anytime.",
  },
  {
    icon: Target,
    title:"Multiple Answer Depths",
    description:"Choose Quick answers, Detailed explanations, or Simple (ELI5) based on your learning needs.",
  },
  {
    icon: CheckCircle,
    title:"Examples Included",
    description:"Understand concepts better with relevant examples, analogies, and real-world applications.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Ask Doubt",
    desc:"Type your question clearly",
    icon: HelpCircle,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Depth",
    desc:"Choose explanation detail level",
    icon: MessageCircle,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Answer",
    desc:"Receive clear, accurate explanation",
    icon: Lightbulb,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Doubt Solver?",
    answer:"The Doubt Solver is an AI-powered academic assistant that provides instant answers to your study questions 24/7. Whether you need help with Math, Science, History, Programming, or General knowledge, it delivers clear explanations at your preferred depth level. Perfect for homework help, exam preparation, or satisfying your curiosity.",
  },
  {
    question:"What types of doubts can I ask?",
    answer:"You can ask any academic question across multiple subjects: Mathematics (algebra, calculus, geometry, statistics), Science (physics, chemistry, biology), History (events, dates, causes and effects), Programming (coding problems, algorithms, debugging), or General topics (language, geography, current affairs). From simple conceptual questions to complex problem-solving.",
  },
  {
    question:"How detailed are the answers?",
    answer:"Choose from three depth levels: Quick Answer (brief and concise, gets straight to the point), Detailed Explanation (comprehensive with step-by-step breakdown and thorough reasoning), or Simple/ELI5 (explained in everyday language with easy-to-understand analogies). Select based on your time and learning needs.",
  },
  {
    question:"Will I get examples with explanations?",
    answer:"Yes! When enabled, each answer includes relevant examples, analogies, or real-world applications to help you understand the concept better. For math problems, you'll see worked examples. For science concepts, you'll get practical applications. This makes learning more concrete and memorable.",
  },
  {
    question:"Is this available 24/7?",
    answer:"Absolutely! Unlike human tutors, the Doubt Solver is available round-the-clock, every day of the year. Get instant answers during late-night study sessions, weekend homework, or whenever questions arise. No appointments needed, no waiting time.",
  },
  {
    question:"Is the Doubt Solver free?",
    answer:"Yes! The Doubt Solver is completely free to use. Ask unlimited questions across all subjects without any cost. Perfect for students at all levels, lifelong learners, or anyone seeking quick answers to academic questions.",
  },
];

const relatedTools = [
  {
    name:"Homework Solver",
    slug:"homework-solver",
    icon: Calculator,
    color:"text-orange-600",
  },
  {
    name:"Concept Explainer",
    slug:"concept-explainer",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Formula Generator",
    slug:"formula-generator",
    icon: Calculator,
    color:"text-blue-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-purple-600",
  },
];

export default function DoubtSolverClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Doubt Solver"
      toolSlug="doubt-solver"
      tagline="Get instant answers to your study questions"
      description="Ask any academic question and receive clear, detailed explanations 24/7. Perfect for homework help, exam prep, and understanding difficult concepts."
      badge="Instant Help"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ask Your Doubt Now"
      ctaDescription="No question too big or small - get expert answers instantly!"
      ctaButtonText="Solve Doubt"
      ctaIcon={Brain}
    >
      <EnhancedToolLayout
        toolSlug="doubt-solver"
        toolName="Doubt Solver"
        placeholder={`❓ Type your question or doubt here...

Examples:
• Why does the sky appear blue during the day?
• How do I solve quadratic equations step by step?
• What were the main causes of the French Revolution?
• Explain photosynthesis in simple terms
• How does a for loop work in Python programming?
• What's the difference between speed and velocity?
• Why do we use semicolons in JavaScript?
• Explain Newton's third law with real-world examples

💡 Tip: Be specific with your question for more accurate and helpful answers!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="💡 Your Answer"
        generateButtonText="🎓 Solve My Doubt"
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
