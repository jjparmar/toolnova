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
  GraduationCap,
  Layers,
  HelpCircle,
  Users,
  Star,
  Zap,
  Target,
  Sparkles,
  CheckCircle,
} from"lucide-react";

const toolOptions = [
  {
    id:"level",
    label:"Explanation Level",
    type:"select" as const,
    options: [
      { value:"beginner", label:"🌱 Beginner" },
      { value:"intermediate", label:"📚 Intermediate" },
      { value:"advanced", label:"🎓 Advanced" },
      { value:"eli5", label:"🧒 ELI5 (Super Simple)" },
    ] as const,
    defaultValue:"intermediate",
  },
  {
    id:"style",
    label:"Explanation Style",
    type:"select" as const,
    options: [
      { value:"detailed", label:"📝 Detailed" },
      { value:"analogy", label:"🎭 With Analogies" },
      { value:"visual", label:"📊 Visual/Diagram" },
    ] as const,
    defaultValue:"detailed",
  },
  {
    id:"includeExamples",
    label:"Real-World Examples",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const level = options?.level ||"intermediate";
  const style = options?.style ||"detailed";
  const includeExamples = options?.includeExamples !== false;

  const levelStyles: Record<string, string> = {
    beginner:"No prior knowledge assumed. Use everyday language, avoid jargon, define all terms. Simple vocabulary (middle school level). Patient, thorough, foundational.",
    intermediate:"Basic familiarity assumed. Use standard terminology with clarification. Balance accessibility with accuracy. High school to college level vocabulary.",
    advanced:"Strong foundation assumed. Use technical terminology, explore nuances, discuss implications. Academic/professional level depth. Challenge and extend understanding.",
    eli5:"Explain to a 5-year-old. Ultra-simple words, concrete examples, playful analogies. No abstract concepts. Make it fun and relatable.",
  };

  const styleDescriptions: Record<string, string> = {
    detailed:"Comprehensive, systematic breakdown. Cover definition, components, mechanisms, significance, and context. Thorough and structured.",
    analogy:"Heavy use of analogies, metaphors, and comparisons. Make abstract concrete through familiar real-world parallels. 'It's like...' approach.",
    visual:"Describe visual representations, diagrams, and spatial relationships. Help reader 'see' the concept. Include how it looks, flows, or connects.",
  };

  const exampleStrategy = includeExamples
    ?"Include 2-3 concrete real-world examples showing the concept in action. Examples should be diverse, relatable, and clearly demonstrate the concept."
    :"Focus purely on conceptual explanation without real-world examples. Abstract understanding prioritized.";

  return`You are an expert educator, concept explainer, and learning specialist with deep expertise in making complex ideas accessible and understandable at any level.

## YOUR TASK
Provide a clear, comprehensive explanation of the requested concept at the ${level} level using a ${style} approach.

## SPECIFICATIONS
**Comprehension Level**: ${level.toUpperCase()} - ${levelStyles[level]}
**Explanation Style**: ${style.toUpperCase()} - ${styleDescriptions[style]}
**Real-World Examples**: ${exampleStrategy}
**Goal**: Build genuine understanding, not just surface-level familiarity

## LEARNING THEORY PRINCIPLES

### Cognitive Load Management
- Break complex ideas into digestible chunks
- Build from simple to complex (scaffolding)
- Connect new information to existing knowledge
- ${level ==="beginner" || level ==="eli5" ?"Minimize technical terminology" :"Introduce terminology progressively"}

### Active Learning Integration
- Engage reader's mental models
- Prompt thinking and connections
- ${style ==="analogy" ?"Use familiar analogies to create 'aha' moments" : style ==="visual" ?"Create mental images for retention" :"Provide structured logical progression"}

## EXPLANATION FRAMEWORK

### 1. HOOK & DEFINITION (First 2-3 sentences)
**Purpose**: Immediate context and clear definition

- Start with relatable hook or why this matters
- Provide clear, ${level ==="eli5" ?"ultra-simple" : level ==="beginner" ?"plain language" : level ==="intermediate" ?"accessible" :"precise technical"} definition
- ${level ==="advanced" ?"Include formal terminology and academic framing" :"Make it immediately understandable"}
- Set the scope (what it is AND what it isn't)

**Example openings**:
${level ==="eli5" ?"- 'Imagine if...' or 'Have you ever noticed...'" : level ==="beginner" ?"- 'Think of a time when...' or '[Concept] is simply...'" : level ==="intermediate" ?"- '[Concept] refers to...' with context" :"- Formal definition with theoretical grounding"}

### 2. CORE COMPONENTS (Main body)
**Purpose**: Break down the concept systematically

${level ==="eli5" || level ==="beginner" ?"**Simple Breakdown**:\n- What it is (in simplest terms)\n- Why it exists or happens\n- How it works (basic mechanism)\n- When you see it (common situations)" :""}

${level ==="intermediate" || level ==="advanced" ?"**Structured Analysis**:\n- **Key Components**: Main elements or parts\n- **Mechanisms**: How it functions or operates\n- **Relationships**: How parts interact or connect\n- **Context**: Where it fits in broader framework" :""}

**Depth Guidelines**:
- ${level ==="eli5" ?"3-5 sentences total, very simple" : level ==="beginner" ?"1-2 paragraphs, clear and foundational" : level ==="intermediate" ?"2-3 paragraphs with appropriate detail" :"3-4 paragraphs with technical nuance"}
- ${style ==="visual" ?"Describe visual representations, diagrams, or spatial relationships" : style ==="analogy" ?"Use 1-2 strong analogies to illuminate meaning" :"Provide logical, sequential explanation"}

### 3. SIGNIFICANCE & APPLICATION
**Purpose**: Why this matters and how it's used

- **Importance**: Why should someone care about this concept?
- **Real-world relevance**: Where does this show up?
- **Practical implications**: What difference does understanding it make?
- ${level ==="advanced" ?"Theoretical significance and research applications" :"Everyday impact and usefulness"}

### 4. EXAMPLES (If Enabled)
${
  includeExamples
    ?`**Requirements**: Provide 2-3 diverse, concrete examples

**Example Quality Standards**:
- **Relatable**: ${level ==="eli5" || level ==="beginner" ?"Use everyday situations (playground, kitchen, family)" : level ==="intermediate" ?"Use familiar contexts (school, work, daily life)" :"Use professional or academic contexts"}
- **Clear demonstration**: Each example clearly shows the concept in action
- **Varied contexts**: Different domains or situations
- **Explanatory**: Don't just list - explain HOW each example demonstrates the concept

**Format**:"For example, [situation]. This demonstrates [concept] because [explanation]."`
    :"Focus on conceptual clarity without examples"
}

### 5. ANALOGIES & COMPARISONS
${
  style ==="analogy"
    ?`**Primary Strategy**: Use 2-3 strong analogies

**Analogy Guidelines**:
- Choose universally familiar comparisons
-"[Concept] is like [familiar thing] because..."
- Map specific elements:"A is like X, B is like Y"
- Acknowledge limitations:"This analogy works for [aspect] but breaks down when..."
- ${level ==="eli5" ?"Use toys, animals, games, food" : level ==="beginner" ?"Use everyday objects and activities" : level ==="intermediate" ?"Use common systems or processes" :"Use sophisticated parallel systems"}`
    : style ==="visual"
      ?"Include visual/spatial analogies where helpful to create mental images"
      :"Use analogies sparingly to clarify particularly abstract points"
}

### 6. COMMON MISCONCEPTIONS (Optional but valuable)
- Address 1-2 common misunderstandings
-"Many people think [misconception], but actually [truth]"
- Clarify confusing aspects proactively
- ${level ==="advanced" ?"Discuss subtle distinctions often confused" :"Clear up basic misunderstandings"}

### 7. SUMMARY & KEY TAKEAWAY
**Purpose**: Reinforce understanding with memorable conclusion

- Synthesize in 2-3 sentences
- Restate core concept in fresh way
- ${level ==="eli5" ?"End with simple, memorable phrase" : level ==="beginner" ?"Emphasize most important point" : level ==="intermediate" ?"Connect to bigger picture" :"Highlight theoretical or practical significance"}
- Leave reader with clear mental model

## LANGUAGE & STYLE REQUIREMENTS

### Vocabulary Level:
- ${level ==="eli5" ?"Kindergarten vocabulary. Single-syllable words preferred. No terms above 2nd grade level." : level ==="beginner" ?"Middle school vocabulary. Define any technical terms immediately." : level ==="intermediate" ?"High school to college vocabulary. Use technical terms with brief clarification." :"Professional/academic vocabulary. Precise terminology with nuanced usage."}

### Sentence Structure:
- ${level ==="eli5" ?"Very short sentences (5-10 words). Simple subject-verb-object." : level ==="beginner" ?"Short to medium sentences (10-15 words). Clear, direct." : level ==="intermediate" ?"Varied sentence length (10-20 words average). Mix simple and complex." :"Sophisticated structures with subordinate clauses. Dense information when appropriate."}

### Tone:
- ${level ==="eli5" ?"Playful, enthusiastic, patient. Like explaining to your little sibling." : level ==="beginner" ?"Friendly, encouraging, clear. Like a helpful teacher." : level ==="intermediate" ?"Professional yet accessible. Like a college instructor." :"Authoritative, precise, academic. Like a subject matter expert."}

### Clarity Techniques:
- Use transitions:"First,""Next,""For example,""In other words"
- ${style ==="visual" ?"Spatial language: 'above,' 'flows into,' 'surrounds,' 'connects'" :""}
- ${style ==="analogy" ?"Comparison language: 'similar to,' 'just like,' 'think of it as'" :""}
- Active voice:"The process converts..." not"Energy is converted by..."
- Concrete over abstract when possible

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Level: Appropriate for ${level} comprehension
2. ✓ Style: Follows ${style} approach consistently
3. ✓ Structure: Includes definition, breakdown, significance, summary
4. ✓ Clarity: Concept is genuinely understandable at target level
5. ✓ Examples: ${includeExamples ?"2-3 diverse, clear real-world examples included" :"No examples, focused on pure explanation"}
6. ✓ ${style ==="analogy" ?"Analogies: 2-3 strong, appropriate analogies used" : style ==="visual" ?"Visual descriptions: Clear mental images provided" :"Logical flow: Sequential, systematic breakdown"}
7. ✓ Accuracy: Information is correct and precise
8. ✓ Completeness: All key aspects covered
9. ✓ No jargon overload: ${level ==="eli5" || level ==="beginner" ?"Minimal technical terms, all defined" : level ==="intermediate" ?"Technical terms explained" :"Technical terms used appropriately"}
10. ✓ Engagement: Interesting and maintains attention
11. ✓ Misconceptions: Common confusions addressed (if applicable)
12. ✓ Memorable: Reader will retain understanding
13. ✓ Length: ${level ==="eli5" ?"Brief (100-150 words)" : level ==="beginner" ?"Moderate (200-300 words)" : level ==="intermediate" ?"Comprehensive (300-400 words)" :"In-depth (400-500 words)"}

## CONCEPT TO EXPLAIN
${input}

## OUTPUT FORMAT

Provide a complete, well-structured explanation. Do NOT include:
- Section headers like"Definition:","Examples:", etc.
- Meta-commentary about the explanation
-"Let me explain..." or"I will now..."
- Your reasoning about how you're explaining
- Apologies or hedging ("This is complicated but...")

Just write the explanation naturally, flowing from introduction through explanation to conclusion. Make it readable as a cohesive piece, not a template.

Create an explanation that genuinely builds understanding:`;
};


const features = [
  {
    icon: Layers,
    title:"4 Complexity Levels",
    description:"From ELI5 (super simple) to Advanced - choose the perfect depth for your understanding level.",
  },
  {
    icon: Sparkles,
    title:"Multiple Explanation Styles",
    description:"Get detailed breakdowns, creative analogies, or visual descriptions based on your learning preference.",
  },
  {
    icon: CheckCircle,
    title:"Real-World Examples",
    description:"Understand concepts through practical examples and applications that make abstract ideas concrete.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Concept",
    desc:"Type the topic you want explained",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Level",
    desc:"Choose complexity and style",
    icon: Layers,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Understand",
    desc:"Get crystal-clear explanation",
    icon: GraduationCap,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Concept Explainer?",
    answer:"The Concept Explainer is an AI-powered learning tool that breaks down complex topics into crystal-clear explanations at your preferred level. Whether you need a simple overview or advanced technical depth, it adapts to your learning needs with multiple explanation styles and optional real-world examples.",
  },
  {
    question:"What does ELI5 mean?",
    answer:"ELI5 stands for 'Explain Like I'm 5 years old.' This mode uses the simplest possible language and analogies to explain complex concepts. It's perfect when you're encountering a topic for the first time and need to understand the basic idea without any technical jargon or assumed knowledge.",
  },
  {
    question:"Can this explain any topic?",
    answer:"Yes! The Concept Explainer can tackle topics from any field - quantum physics, philosophy, economics, computer science, biology, history, and more. Simply enter the concept you want to understand, select your preferred complexity level, and get a clear explanation tailored to your needs.",
  },
  {
    question:"What explanation styles are available?",
    answer:"Choose from three styles: Detailed (comprehensive step-by-step breakdown), Analogy-Based (uses creative comparisons and familiar examples), or Visual (includes descriptions that help you picture how the concept works). Select the style that matches your learning preference.",
  },
  {
    question:"How do I choose the right complexity level?",
    answer:"Start with Intermediate if you have basic familiarity with the topic. Choose Beginner if it's completely new to you, Advanced if you want technical depth, or ELI5 if you want the simplest possible explanation. You can always regenerate with a different level if needed.",
  },
  {
    question:"Is the Concept Explainer free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Doubt Solver",
    slug:"doubt-solver",
    icon: HelpCircle,
    color:"text-orange-600",
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
  {
    name:"Homework Solver",
    slug:"homework-solver",
    icon: Brain,
    color:"text-green-600",
  },
];

export default function ConceptExplainerClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Concept Explainer"
      toolSlug="concept-explainer"
      tagline="Understand any concept in minutes"
      description="Break down complex topics into crystal-clear explanations at your preferred level. From beginner to advanced, with examples and analogies."
      badge="Learning Made Easy"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Start Understanding"
      ctaDescription="No concept too complex - we'll break it down for you!"
      ctaButtonText="Explain Concept"
      ctaIcon={Brain}
    >
      <EnhancedToolLayout
        toolSlug="concept-explainer"
        toolName="Concept Explainer"
        placeholder={`🧠 Enter a concept you want explained...

Examples:
• Blockchain technology and how it works
• DNA replication process in molecular biology
• Supply and demand in economics with real examples
• Machine learning algorithms and neural networks
• Photosynthesis - the process plants use to create energy
• Quantum entanglement explained simply
• How does the stock market actually work?
• The theory of relativity for beginners

💡 Tip: Be specific about what aspect confuses you for more targeted explanations!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📖 Your Explanation"
        generateButtonText="💡 Explain Concept"
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
