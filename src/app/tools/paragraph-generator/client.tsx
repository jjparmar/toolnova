"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  FileText,
  Pencil,
  BookOpen,
  Lightbulb,
  MessageSquare,
  AlignLeft,
  Users,
  Star,
  Zap,
  Type,
  Target,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"type",
    label:"Paragraph Type",
    type:"select" as const,
    options: [
      { value:"general", label:"📝 General" },
      { value:"introduction", label:"👋 Introduction" },
      { value:"conclusion", label:"🎯 Conclusion" },
      { value:"body", label:"📄 Body Paragraph" },
      { value:"creative", label:"🎨 Creative" },
    ] as const,
    defaultValue:"general",
  },
  {
    id:"length",
    label:"Length",
    type:"select" as const,
    options: [
      { value:"short", label:"⚡ Short (3-4 sentences)" },
      { value:"medium", label:"📝 Medium (5-7 sentences)" },
      { value:"long", label:"📚 Long (8-10 sentences)" },
    ] as const,
    defaultValue:"medium",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"formal", label:"👔 Formal" },
      { value:"casual", label:"😊 Casual" },
      { value:"academic", label:"🎓 Academic" },
    ] as const,
    defaultValue:"formal",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const type = options?.type ||"general";
  const length = options?.length ||"medium";
  const tone = options?.tone ||"formal";

  const lengthSentences: Record<string, string> = {
    short:"3-4 sentences",
    medium:"5-7 sentences",
    long:"8-10 sentences",
  };

  const typeInstructions: Record<string, string> = {
    general:"Write a clear, well-structured general paragraph that effectively develops the main idea with supporting details.",
    introduction:"Write an engaging introduction paragraph with a hook, background context, and a clear thesis statement that previews what follows.",
    conclusion:"Write a strong conclusion paragraph that synthesizes key points, reinforces the main argument, and provides closure or a call to action.",
    body:"Write a detailed body paragraph with a clear topic sentence, 2-3 supporting points with evidence or examples, and a smooth transition to the next idea.",
    creative:"Write a creative, vivid paragraph that uses descriptive language, sensory details, figurative language, and engaging narrative techniques.",
  };

  const toneGuidelines: Record<string, string> = {
    formal:"Use professional vocabulary, complete sentences, third-person perspective, and avoid contractions or colloquialisms.",
    casual:"Use conversational language, contractions, second-person 'you', and friendly tone as if speaking to a peer.",
    academic:"Use scholarly language, precise terminology, objective tone, evidence-based statements, and formal citation-ready structure.",
  };

  return`You are an expert writing coach and paragraph construction specialist. Your task is to generate a well-crafted, cohesive paragraph that meets specific requirements.

## YOUR TASK
Write a ${type} paragraph about the provided topic, following all specified guidelines for structure, tone, and length.

## SPECIFICATIONS
**Paragraph Type**: ${typeInstructions[type]}
**Target Length**: ${lengthSentences[length]} (strictly adhere to this)
**Tone**: ${toneGuidelines[tone]}

## PARAGRAPH STRUCTURE REQUIREMENTS

### Opening (Topic Sentence)
- Start with a strong, clear topic sentence that introduces the main idea
- Make it engaging and directly address the topic
- ${type ==="introduction" ?"Include a hook (question, fact, quote, or anecdote)" :"Clearly state what this paragraph will discuss"}

### Development (Supporting Sentences)
- Develop 2-3 supporting points that elaborate on the topic sentence
- Use specific details, examples, or evidence
- Ensure each sentence logically flows from the previous one
- ${type ==="body" ?"Include concrete evidence or examples to support claims" :"Maintain focus on the central theme"}
- Use transitions between ideas (Furthermore, Additionally, However, In contrast, For example)

### Conclusion (Closing Sentence)
- ${type ==="introduction" ?"End with a clear thesis statement" : type ==="conclusion" ?"Provide a memorable final thought or call to action" :"End with a transitional or conclusive sentence"}
- Connect back to the main idea
- ${type !=="conclusion" ?"Set up natural flow to what might come next" :"Leave reader with lasting impression"}

## WRITING QUALITY STANDARDS

### Coherence
- Every sentence must relate directly to the topic
- Ideas flow logically from one to the next
- Use transition words to connect thoughts

### Unity
- Single, focused main idea throughout
- No tangential or off-topic sentences
- All details support the central point

### Tone Consistency
- Maintain ${tone} tone throughout every sentence
- ${tone ==="academic" ?"Use scholarly vocabulary and precise terminology" : tone ==="formal" ?"Use professional language, no slang" :"Use natural, conversational language"}
- Appropriate word choice for ${tone} writing

### Sentence Variety
- Mix sentence lengths (short punchy sentences with longer complex ones)
- Vary sentence structures (simple, compound, complex)
- Avoid starting consecutive sentences the same way

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Sentence count: ${lengthSentences[length]} (count carefully)
2. ✓ Paragraph type: Meets all ${type} paragraph requirements
3. ✓ Tone: Consistently ${tone} throughout
4. ✓ Topic sentence: Strong, clear, and engaging
5. ✓ Supporting details: 2-3 well-developed points
6. ✓ Coherence: Smooth transitions between all ideas
7. ✓ Unity: Every sentence relates to main idea
8. ✓ Closing: ${type ==="conclusion" ?"Memorable final thought" :"Strong transitional sentence"}
9. ✓ Grammar: No errors, proper punctuation
10. ✓ Engagement: Interesting and well-written

## TOPIC
${input}

## OUTPUT FORMAT
Provide ONLY the paragraph itself. Do not include:
- Titles or headings
- Explanations or commentary
- Labels like"Paragraph:" or"Topic sentence:"
- Bullet points or numbering

Just write the complete, polished paragraph ready to use.`;
};


const features = [
  {
    icon: Target,
    title:"Multiple Paragraph Types",
    description:"Create introductions, conclusions, body paragraphs, or general content for any writing project.",
  },
  {
    icon: Type,
    title:"Flexible Tone Options",
    description:"Choose between formal, casual, or academic tones to match your audience and purpose.",
  },
  {
    icon: AlignLeft,
    title:"Adjustable Length",
    description:"Control paragraph length from short and concise to long and detailed based on your needs.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type your paragraph topic or idea",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Style",
    desc:"Select type, length, and tone",
    icon: AlignLeft,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Result",
    desc:"Receive your polished paragraph",
    icon: Pencil,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Paragraph Generator?",
    answer:"The Paragraph Generator is an AI-powered writing tool that creates well-structured, coherent paragraphs on any topic. It helps you overcome writer's block and produce professional-quality content quickly, whether you need introductions, conclusions, body paragraphs, or creative content.",
  },
  {
    question:"What paragraph types can I create?",
    answer:"You can create five types of paragraphs: General (all-purpose content), Introduction (engaging opening paragraphs), Conclusion (strong closing paragraphs), Body (detailed supporting paragraphs), and Creative (descriptive, vivid paragraphs). Each type is optimized for its specific purpose in writing.",
  },
  {
    question:"What's the difference between the tones?",
    answer:"Formal tone is professional and suitable for business or academic writing. Casual tone is friendly and conversational, perfect for blogs or social media. Academic tone is scholarly and technical, ideal for research papers and educational content. Choose based on your audience and purpose.",
  },
  {
    question:"How do I choose the right length?",
    answer:"Short paragraphs (3-4 sentences) are great for quick points or web content. Medium paragraphs (5-7 sentences) work well for most writing needs, including essays and articles. Long paragraphs (8-10 sentences) are ideal when you need detailed explanations or comprehensive coverage of a topic.",
  },
  {
    question:"Can I use this for essays and assignments?",
    answer:"Yes! The Paragraph Generator is perfect for essays, assignments, articles, and any writing project. Use it to craft introduction and conclusion paragraphs, or generate body paragraphs with supporting details. It's an excellent tool for overcoming writer's block and maintaining consistent quality throughout your work.",
  },
  {
    question:"Is the Paragraph Generator free?",
    answer:"Yes! The Paragraph Generator is completely free to use. Generate unlimited paragraphs for essays, articles, creative writing, or any content needs without any cost. Perfect for students, writers, and content creators of all levels.",
  },
];

const relatedTools = [
  {
    name:"Essay Writer",
    slug:"essay-writer",
    icon: FileText,
    color:"text-blue-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: MessageSquare,
    color:"text-purple-600",
  },
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    icon: Pencil,
    color:"text-green-600",
  },
  {
    name:"Story Generator",
    slug:"story-generator",
    icon: BookOpen,
    color:"text-orange-600",
  },
];

export default function ParagraphGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Paragraph Generator"
      toolSlug="paragraph-generator"
      tagline="Create perfect paragraphs instantly"
      description="Generate well-structured, engaging paragraphs for essays, articles, or any content needs. Choose from multiple types, tones, and lengths."
      badge="Writing Helper"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Generate Your Paragraph"
      ctaDescription="Never get stuck on a blank page again. Create perfect paragraphs in seconds!"
      ctaButtonText="Start Writing"
      ctaIcon={Sparkles}
    >
      <EnhancedToolLayout
        toolSlug="paragraph-generator"
        toolName="Paragraph Generator"
        placeholder={`📝 Enter your paragraph topic...

Examples:
• The importance of time management for students
• Benefits of regular exercise and physical activity
• How technology is transforming modern education
• The impact of social media on communication
• Why reading books improves creativity
• The role of renewable energy in climate change

💡 Tip: Be specific about your topic for more focused and relevant paragraphs!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📄 Your Paragraph"
        generateButtonText="✍️ Generate Paragraph"
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
