"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import {
  FileText,
  Pencil,
  BookOpen,
  Lightbulb,
  MessageSquare,
  AlignLeft,
  Zap,
  Target,
  Users,
  Star,
  Clock,
  Award,
  Brain,
} from"lucide-react";

const systemPrompt =`You are an academic essay writing assistant.

OUTPUT RULES:
- Generate essays at the requested word count (300-1200 words)
- Do NOT limit output to 4-10 lines - essays need full length
- Use the exact structure requested (INTRODUCTION, BODY PARAGRAPH 1/2/3, CONCLUSION)
- Do NOT use FINAL ANSWER/WORKING/QUICK CHECK format
- Include proper transitions between paragraphs
- Match the requested academic level

WRITING QUALITY:
- Start each paragraph with a clear topic sentence
- Provide evidence and explanation in body paragraphs
- Use smooth transitions between ideas
- Maintain consistent tone and style
- End with a memorable conclusion
- Include the WRITING TIP at the end as requested`;

const toolOptions = [
  {
    id:"essayType",
    label:"Essay Type",
    type:"select" as const,
    options: [
      { value:"argumentative", label:"⚔️ Argumentative" },
      { value:"expository", label:"📖 Expository" },
      { value:"narrative", label:"📝 Narrative" },
      { value:"descriptive", label:"🎨 Descriptive" },
      { value:"persuasive", label:"💪 Persuasive" },
      { value:"analytical", label:"🔍 Analytical" },
    ],
    defaultValue:"argumentative",
  },
  {
    id:"length",
    label:"Essay Length",
    type:"select" as const,
    options: [
      { value:"short", label:"📄 Short (300-500 words)" },
      { value:"medium", label:"📑 Medium (500-800 words)" },
      { value:"long", label:"📚 Long (800-1200 words)" },
    ],
    defaultValue:"medium",
  },
  {
    id:"academicLevel",
    label:"Academic Level",
    type:"select" as const,
    options: [
      { value:"high-school", label:"🎓 High School" },
      { value:"undergraduate", label:"🏛️ Undergraduate" },
      { value:"graduate", label:"🎯 Graduate" },
    ],
    defaultValue:"undergraduate",
  },
  {
    id:"includeCitations",
    label:"Include Citation Suggestions",
    type:"toggle" as const,
    defaultValue: false,
  },
  {
    id:"includeOutline",
    label:"Include Essay Outline First",
    type:"toggle" as const,
    defaultValue: false,
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const type = options?.essayType ||"argumentative";
  const length = options?.length ||"medium";
  const level = options?.academicLevel ||"undergraduate";
  const includeCitations = options?.includeCitations || false;
  const includeOutline = options?.includeOutline || false;

  const lengthWords: Record<string, string> = {
    short:"300-500 words",
    medium:"500-800 words",
    long:"800-1200 words",
  };

  const levelContext: Record<string, string> = {"high-school":"high school level with clear, accessible language and fundamental concepts",
    undergraduate:"undergraduate college level with sophisticated vocabulary and deeper analytical thinking",
    graduate:"graduate level with advanced academic language, nuanced argumentation, and critical analysis",
  };

  const essayTypeGuidance: Record<string, string> = {
    argumentative:"Present a clear position and defend it with logical reasoning and evidence. Address counterarguments.",
    expository:"Explain and inform objectively without taking a position. Present facts and analysis clearly.",
    narrative:"Tell a story with a clear beginning, middle, and end. Use descriptive language and sensory details.",
    descriptive:"Create vivid imagery using sensory details. Show rather than tell.",
    persuasive:"Convince the reader of your viewpoint using emotional appeals, logic, and credibility.",
    analytical:"Break down and examine components critically. Analyze relationships and draw conclusions.",
  };

  let prompt =`# Role & Task
You are an expert academic writer and educator. Write a complete, well-structured ${type} essay at the ${level} level.

# Essay Topic"${input}"

# Requirements
- **Essay Type**: ${type} - ${essayTypeGuidance[type] ||"Follow standard academic conventions"}
- **Target Length**: ${lengthWords[length]} (adhere strictly to this range)
- **Academic Level**: ${levelContext[level]}
- **Formatting**: Use clear paragraph breaks and proper essay structure

# Output Structure
${
  includeOutline
    ?`
## 📋 ESSAY OUTLINE
Provide a brief outline before the essay:
- **Thesis Statement**: [Your main argument]
- **Main Point 1**: [Brief description]
- **Main Point 2**: [Brief description]
- **Main Point 3**: [Brief description]
- **Conclusion Focus**: [What you'll emphasize]

---`
    :""
}
## 📖 INTRODUCTION (1 paragraph)
Write an engaging introduction that includes:
1. **Hook**: Start with an attention-grabbing opening (question, quote, statistic, or anecdote)
2. **Context**: Provide necessary background information
3. **Thesis Statement**: Present a clear, specific thesis that outlines your main argument

## 📝 BODY PARAGRAPH 1
**Focus**: [First main supporting point]
- Start with a clear topic sentence
- Provide specific evidence, examples, or data
- Analyze and explain how this supports your thesis
- Use smooth transition to next paragraph

## 📝 BODY PARAGRAPH 2
**Focus**: [Second main supporting point]
- Start with a clear topic sentence
- Provide specific evidence, examples, or data
- Analyze and explain the significance
- Use smooth transition to next paragraph

## 📝 BODY PARAGRAPH 3
**Focus**: [Third main supporting point]
- Start with a clear topic sentence
- Provide specific evidence, examples, or data
- Analyze and connect back to thesis
- Prepare for conclusion

## 🎯 CONCLUSION (1 paragraph)
Write a strong conclusion that:
1. **Restates thesis** in fresh language (don't just repeat)
2. **Synthesizes main points** (show how they connect)
3. **Broader implications**: Discuss significance or call to action
4. **Memorable closing**: End with a thought-provoking final sentence
${
  includeCitations
    ?`
## 📚 CITATION & RESEARCH SUGGESTIONS
Provide guidance on sources to strengthen this essay:
- **Primary Sources**: 2-3 specific types of primary sources relevant to this topic
- **Academic Fields**: Which disciplines or areas of study to research
- **Expert Perspectives**: Types of experts or authorities to cite
- **Current Research**: Suggest recent developments or studies to reference`
    :""
}
## 💡 WRITING TIP
Provide one specific, actionable tip for improving this particular ${type} essay.

# Quality Standards
Before submitting, verify:
- ✓ Thesis is clear, specific, and arguable
- ✓ Each body paragraph has a distinct topic sentence
- ✓ Evidence and examples are specific and relevant
- ✓ Analysis explains HOW evidence supports claims
- ✓ Transitions between paragraphs flow smoothly
- ✓ Conclusion synthesizes rather than just summarizes
- ✓ Grammar, spelling, and punctuation are correct
- ✓ Word count is within the ${lengthWords[length]} range
- ✓ Tone and vocabulary match ${level} level

# Special Instructions
- Use proper paragraph structure with clear breaks between sections
- Maintain consistent academic tone throughout
- Ensure each paragraph is 4-7 sentences long
- Avoid repetitive language - vary sentence structure
- Do not use contractions in formal essays
- Support claims with specific examples, not vague generalizations

Now write the complete ${type} essay following this structure exactly.`;

  return prompt;
};


const features = [
  {
    icon: Zap,
    title:"Lightning Fast",
    description:"Generate complete, well-structured essays in under 2 minutes with AI assistance",
    gradient:"from-yellow-500 to-orange-600",
    bgLight:"bg-yellow-50",
  },
  {
    icon: Target,
    title:"Perfectly Structured",
    description:"Every essay includes a clear introduction, well-developed body paragraphs, and strong conclusion",
    gradient:"from-blue-500 to-indigo-600",
    bgLight:"bg-blue-50",
  },
  {
    icon: Brain,
    title:"Multiple Essay Types",
    description:"Supports argumentative, expository, narrative, descriptive, persuasive, and analytical essays",
    gradient:"from-purple-500 to-pink-600",
    bgLight:"bg-purple-50",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Your Topic",
    desc:"Type your essay topic or thesis statement",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Customize Options",
    desc:"Choose essay type, length, and academic level",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Generate Essay",
    desc:"Get your complete, structured essay instantly",
    icon: Pencil,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Paragraph Generator",
    slug:"paragraph-generator",
    icon: AlignLeft,
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
    name:"Text Summarizer",
    slug:"text-summarizer",
    icon: BookOpen,
    color:"text-orange-600",
  },
];

const faqs = [
  {
    question:"Is the generated essay plagiarism-free?",
    answer:"Yes! Each essay is uniquely generated based on your specific topic and requirements. However, we recommend using it as a reference and starting point, then adding your own voice, insights, and properly cited sources.",
    category:"Usage",
  },
  {
    question:"What essay types are supported?",
    answer:"We support argumentative, expository, narrative, descriptive, persuasive, and analytical essays. Each type follows the appropriate structure and style conventions for that format.",
    category:"Features",
  },
  {
    question:"Can I edit the generated essay?",
    answer:"Absolutely! Use the copy or download buttons to save the essay, then edit it in any text editor. We encourage you to personalize it with your own examples and insights.",
    category:"Usage",
  },
  {
    question:"How long are the generated essays?",
    answer:"You can choose from three length options: Short (300-500 words), Medium (500-800 words), or Long (800-1200 words). The AI will aim for the middle of your selected range.",
    category:"Features",
  },
  {
    question:"Can I use this for my school assignments?",
    answer:"This tool is designed for learning and inspiration. Use it to understand essay structure, see examples of good writing, and get ideas. Always follow your school's academic integrity policies and cite sources appropriately.",
    category:"Academic",
  },
  {
    question:"What academic levels are available?",
    answer:"You can choose between high school, undergraduate, and graduate levels. Each level adjusts the vocabulary, complexity, and depth of analysis accordingly.",
    category:"Features",
  },
];

export default function EssayWriterClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Essay Writer"
      toolSlug="essay-writer"
      tagline="Generate high-quality essays in minutes"
      description="Create well-structured, engaging essays on any topic with AI assistance. Perfect for students, writers, and educators who need inspiration and guidance."
      badge="AI-Powered"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Ready to Write Better Essays?"
      ctaDescription="Start creating professional, well-structured essays in seconds"
      ctaIcon={Pencil}
    >
      <EnhancedToolLayout
        toolSlug="essay-writer"
        systemPrompt={systemPrompt}
        toolName="AI Essay Writer"
        placeholder={`📝 Enter your essay topic or thesis statement...

Examples:
• The impact of social media on mental health in teenagers
• Climate change and its effects on global biodiversity
• The importance of financial literacy for young adults
• How technology is transforming modern education
• The role of renewable energy in combating climate change
• Analyzing the themes of identity in contemporary literature

Be specific for best results!`}
        promptTemplate={generatePrompt}
        inputRows={8}
        toolOptions={toolOptions}
        resultLabel="📄 Your Essay"
        generateButtonText="✍️ Write My Essay"
        inputLabel="📝 Essay Topic"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        supportedFormats={["text","markdown"]}
      />
      <div className="px-6 pb-6">
        <FAQSection faqs={faqs} />
      </div>
    </PremiumToolWrapper>
  );
}
