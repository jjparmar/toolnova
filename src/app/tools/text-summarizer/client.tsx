"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  FileText,
  Zap,
  Target,
  Sparkles,
  Users,
  Star,
  Clock,
  BookOpen,
  Lightbulb,
  List,
  AlignLeft,
} from"lucide-react";

const systemPrompt =`You are an expert text summarization assistant.

OUTPUT RULES:
- Capture main claims, key facts, numbers, names, and conclusions accurately
- Never invent details not present in the source
- Match the requested length and style (paragraphs, bullets, etc.)
- Prefer clean Markdown when using bullets or sections
- No preamble like"Here is a summary" — start with the summary itself

QUALITY STANDARDS:
- Faithful to the source meaning
- Logical order (most important first when appropriate)
- Clear, professional language`;

const toolOptions = [
  {
    id:"length",
    label:"Summary Length",
    type:"select" as const,
    options: [
      { value:"brief", label:"⚡ Brief (1-2 sentences)" },
      { value:"short", label:"📝 Short (1 paragraph)" },
      { value:"medium", label:"📄 Medium (2-3 paragraphs)" },
      { value:"detailed", label:"📚 Detailed (comprehensive)" },
    ],
    defaultValue:"short",
  },
  {
    id:"style",
    label:"Output Style",
    type:"select" as const,
    options: [
      { value:"paragraph", label:"📄 Paragraph" },
      { value:"bullets", label:"• Bullet Points" },
      { value:"numbered", label:"🔢 Numbered List" },
      { value:"keypoints", label:"🎯 Key Points Only" },
    ],
    defaultValue:"paragraph",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"neutral", label:"⚖️ Neutral" },
      { value:"academic", label:"🎓 Academic" },
      { value:"simple", label:"😊 Simple/Easy" },
      { value:"professional", label:"💼 Professional" },
    ],
    defaultValue:"neutral",
  },
  {
    id:"includeKeyTerms",
    label:"Highlight Key Terms",
    type:"toggle" as const,
    defaultValue: false,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const length = options?.length ||"short";
  const style = options?.style ||"paragraph";
  const tone = options?.tone ||"neutral";
  const includeKeyTerms = options?.includeKeyTerms ?? false;

  const lengthInstructions: Record<string, string> = {
    brief:"1-2 sentences capturing only the absolute core message",
    short:"One concise paragraph (3-5 sentences) covering main points and key takeaways",
    medium:"2-3 comprehensive paragraphs covering all major points with supporting details",
    detailed:"Multiple detailed paragraphs (4-6 paragraphs) thoroughly covering all important aspects and nuances",
  };

  const styleInstructions: Record<string, string> = {
    paragraph:"Write in flowing paragraphs with smooth transitions between ideas. Use complete sentences.",
    bullets:"Format as bullet points with • symbol. Each major point on a separate line. Start each point with a capital letter.",
    numbered:"Format as a numbered list (1., 2., 3., etc.). Each key point clearly numbered and on its own line.",
    keypoints:"Present only the most essential key points in concise format. Each point should be crystal clear and standalone.",
  };

  const toneInstructions: Record<string, string> = {
    neutral:"Use objective, balanced language suitable for general audiences. Avoid bias or emotional language.",
    academic:"Use formal, scholarly language with precise terminology appropriate for academic or research contexts.",
    simple:"Use plain, easy-to-understand language. Avoid jargon and complex terms. Explain concepts clearly.",
    professional:"Use polished business language appropriate for corporate and professional workplace settings.",
  };

  let prompt =`# Role & Task
You are an expert at summarizing content. Your task is to create a ${length} summary of the provided text while preserving all key information.

# Text to Summarize
${input}

# Summary Requirements
- **Length**: ${length} - ${lengthInstructions[length]}
- **Format**: ${style} - ${styleInstructions[style]}
- **Tone**: ${tone} - ${toneInstructions[tone]}

# Summarization Guidelines
1. **Identify Core Message**: Determine the main point or thesis of the text
2. **Extract Key Information**: Include all important facts, arguments, and conclusions
3. **Maintain Accuracy**: Represent the original meaning faithfully - don't add interpretations
4. **Preserve Context**: Keep essential context that makes the summary understandable
5. **Logical Flow**: Organize information in a clear, logical sequence
6. **Appropriate Detail**: Balance brevity with completeness for ${length} length
${length ==="brief" ?"7. **Extreme Concision**: Focus only on the single most important takeaway" :""}
${length ==="detailed" ?"7. **Comprehensive Coverage**: Include supporting details, examples, and nuances from the original text" :""}

# Output Structure
${style ==="paragraph" ?"Write in clear, well-structured paragraphs with smooth transitions." :""}
${
  style ==="bullets"
    ?`Use this format:
• First major point here
• Second major point here
• Third major point here
(Continue for all key points)`
    :""
}
${
  style ==="numbered"
    ?`Use this format:
1. First major point here
2. Second major point here
3. Third major point here
(Continue for all key points)`
    :""
}
${style ==="keypoints" ?"List only the most critical points in the most concise way possible." :""}
${
  includeKeyTerms
    ?`

## KEY TERMS
After the summary, list 5-8 important terms or concepts:
- **Term 1**: Brief explanation
- **Term 2**: Brief explanation
(etc.)`
    :""
}

# Quality Standards
Before finalizing, verify:
- ✓ Main message is clearly communicated
- ✓ All critical information is included
- ✓ No important details are omitted
- ✓ No information is added that wasn't in the original
- ✓ Length matches ${length} requirement
- ✓ Format matches ${style} style exactly
- ✓ Tone is consistently ${tone}
- ✓ Summary is accurate and faithful to original
${includeKeyTerms ?"- ✓ Key terms are identified and explained" :""}

# Special Instructions
- Do not include your own opinions or interpretations
- Maintain objectivity throughout
- If the original text is unclear, summarize what IS clear
- Use third person perspective unless the original requires first person
- Preserve any critical statistics, dates, or specific data points

Now create the ${length} summary in ${style} format with ${tone} tone.
- Preserve the original meaning
- Make it clear and easy to understand
- Focus on the most important information

Provide ONLY the summary (and key terms if requested) without any additional labels or explanations.`;

  return prompt;
};


const features = [
  {
    icon: Zap,
    title:"Multiple Lengths",
    description:"Choose from brief TL;DR to detailed summaries - get exactly what you need",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Target,
    title:"Flexible Formats",
    description:"Output as paragraphs, bullet points, numbered lists, or key points only",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
  {
    icon: Sparkles,
    title:"Smart Extraction",
    description:"AI identifies and captures the most important information automatically",
    gradient:"from-green-500 to-emerald-600",
    bgLight:"bg-green-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Paste Text",
    desc:"Add the article, document, or content you want summarized",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Options",
    desc:"Select length, format, and tone preferences",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Summary",
    desc:"Receive a clear, concise summary instantly",
    icon: Sparkles,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Text Simplifier",
    slug:"text-simplifier",
    icon: Lightbulb,
    color:"text-blue-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: AlignLeft,
    color:"text-purple-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Chapter Summary",
    slug:"chapter-summary",
    icon: FileText,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"How long can the text be?",
    answer:"You can summarize texts of any length - from a few paragraphs to entire articles or research papers. The AI will extract the key information regardless of length.",
    category:"Usage",
  },
  {
    question:"What's the difference between summary lengths?",
    answer:"Brief gives you a 1-2 sentence TL;DR. Short provides a paragraph covering main points. Medium offers 2-3 paragraphs with more detail. Detailed gives comprehensive coverage of all major aspects.",
    category:"Features",
  },
  {
    question:"Will the summary be accurate?",
    answer:"Yes! Our AI is trained to capture the main ideas and preserve the original meaning. However, we recommend reviewing important summaries to ensure they meet your needs.",
    category:"Accuracy",
  },
  {
    question:"Can I summarize academic papers?",
    answer:"Absolutely! Use the 'Academic' tone option for scholarly content. The AI will maintain appropriate terminology and capture research findings accurately.",
    category:"Usage",
  },
  {
    question:"What's the bullet points vs key points difference?",
    answer:"Bullet points provide complete ideas in list format. Key points only extracts the most essential information in the most concise way possible - great for quick overviews.",
    category:"Features",
  },
  {
    question:"Can I use this for studying?",
    answer:"Yes! It's perfect for quickly understanding long readings, textbook chapters, or articles. Enable 'Highlight Key Terms' to get important vocabulary extracted too.",
    category:"Academic",
  },
];

export default function TextSummarizerClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Text Summarizer"
      toolSlug="text-summarizer"
      tagline="Summarize any text in seconds with AI"
      description="Condense long articles, documents, and content into clear summaries. Choose from brief overviews to detailed summaries in multiple formats."
      badge="AI-Powered"
      category="Utility Tools"
      categorySlug="utility-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Save Time Reading?"
      ctaDescription="Get instant summaries of any text with AI"
      ctaIcon={Zap}
    >
      <EnhancedToolLayout
        toolSlug="text-summarizer"
        systemPrompt={systemPrompt}
        toolName="AI Text Summarizer"
        placeholder={`📝 Paste or type the text you want to summarize...

Examples:
• Long articles or blog posts
• Research papers or academic texts
• Book chapters or study materials
• News articles or reports
• Business documents or emails
• Meeting notes or transcripts

The tool works with texts of any length - just paste and summarize!`}
        promptTemplate={generatePrompt}
        inputRows={12}
        toolOptions={toolOptions}
        resultLabel="📄 Summary"
        generateButtonText="✨ Summarize Text"
        inputLabel="📝 Text to Summarize"
        showAdvancedOptions={true}
        maxHistoryItems={10}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
