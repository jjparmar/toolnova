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
  Image,
  FileText,
  Activity,
  Users,
  Star,
  Zap,
  Target,
  Layers,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"subject",
    label:"Subject",
    type:"select" as const,
    options: [
      { value:"biology", label:"🧬 Biology" },
      { value:"chemistry", label:"🧪 Chemistry" },
      { value:"physics", label:"⚛️ Physics" },
      { value:"geography", label:"🌍 Geography" },
      { value:"general", label:"📚 General" },
    ] as const,
    defaultValue:"biology",
  },
  {
    id:"detail",
    label:"Detail Level",
    type:"select" as const,
    options: [
      { value:"basic", label:"📋 Basic Overview" },
      { value:"detailed", label:"📝 Detailed Analysis" },
      { value:"comprehensive", label:"📚 Comprehensive" },
    ] as const,
    defaultValue:"detailed",
  },
  {
    id:"labelParts",
    label:"Label All Parts",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const subject = options?.subject ||"biology";
  const detail = options?.detail ||"detailed";
  const labelParts = options?.labelParts !== false;

  const detailStyles: Record<string, string> = {
    basic:"Concise overview (150-250 words). Cover main components and their primary functions. Accessible language, no excessive technical depth.",
    detailed:"Thorough explanation (400-600 words). All parts, functions, and interactions explained. Technical terminology with clear definitions. Include underlying mechanisms.",
    comprehensive:"In-depth analysis (700-1000 words). Complete breakdown of all components, relationships, processes, and scientific significance. Advanced details, cross-references, and clinical/practical applications.",
  };

  const subjectGuidance: Record<string, string> = {
    biology:"Use biological terminology and nomenclature. Explain cellular, molecular, or organismal structures. Reference relevant biological processes (e.g., mitosis, photosynthesis, homeostasis). Include taxonomy and classification where relevant.",
    chemistry:"Use IUPAC nomenclature and chemical notation. Explain molecular geometry, bonding, and electronic structure. Reference reaction mechanisms, equilibria, and thermodynamic principles where relevant.",
    physics:"Use SI units and proper physical notation. Explain forces, fields, motion, and energy transformations. Reference relevant laws (Newton's, Ohm's, Faraday's, etc.) and include vector/scalar distinctions.",
    geography:"Use proper geographic and geological terminology. Explain spatial relationships, scales, and environmental processes. Reference climate patterns, tectonic activity, or human geography concepts as relevant.",
    general:"Use clear, accessible language suitable for the diagram type. Adapt terminology to the specific field. Focus on logical flow and conceptual clarity.",
  };

  const labelStrategy = labelParts
    ?"LABELING REQUIRED: Identify and label every distinct part/component with its specific scientific name, function, and role in the system. Use numbered labels or bold formatting for each part."
    :"Focus on the overall concept and major relationships without exhaustive part-by-part labeling.";

  return`You are an expert visual learning specialist, scientific diagram analyst, and ${subject} educator with extensive experience translating complex visual representations into clear, structured explanations that promote deep understanding.

## YOUR TASK
Analyze and explain the described ${subject} diagram with ${detail}-level depth, transforming the visual description into a comprehensive educational explanation.

## SPECIFICATIONS
**Subject Area**: ${subject.toUpperCase()} - ${subjectGuidance[subject]}
**Detail Level**: ${detail.toUpperCase()} - ${detailStyles[detail]}
**Labeling**: ${labelStrategy}
**Audience**: Students seeking to understand visual scientific/academic concepts

## DIAGRAM ANALYSIS FRAMEWORK

### 1. CONTEXTUAL OVERVIEW (Opening Section)
- **What it represents**: Name the diagram type and subject
- **Purpose**: Why this diagram is important in ${subject}
- **Scope**: What aspects of the topic this diagram covers
- **Context**: How it fits into the broader topic or curriculum
${detail ==="comprehensive" ?"- **Historical significance**: Brief mention of discovery or development if relevant" :""}

### 2. COMPONENT IDENTIFICATION & ANALYSIS
${labelParts ?`**For EACH identifiable component, provide**:
- **Name**: Proper scientific/technical name (bold)
- **Location**: Where in the diagram it appears
- **Structure**: Physical characteristics or appearance
- **Function**: What it does and why it matters
- **Significance**: Its role in the overall system
${detail ==="comprehensive" ?"- **Additional detail**: Size, composition, variations, or clinical relevance" :""}` :"Identify the major components and explain their primary functions."}

### 3. RELATIONSHIPS & INTERACTIONS
- **Connections**: How components connect to or affect each other
- **Flow/Direction**: If arrows present, explain what they indicate
- **Hierarchy**: Organizational structure (if applicable)
- **Dependencies**: Which parts rely on others to function
${detail !=="basic" ?"- **Feedback loops**: Any circular or regulatory relationships\n- **Cause and effect**: How changes in one component affect others" :""}

### 4. PROCESS & SEQUENCE ANALYSIS (If Applicable)
- **Starting point**: Where the process begins
- **Steps/Stages**: Sequential breakdown of the process shown
- **Inputs & Outputs**: What enters and leaves at each stage
- **Energy/Resource flow**: Transformations occurring at each step
${detail ==="comprehensive" ?"- **Rate-limiting steps**: Bottlenecks or critical stages\n- **Regulation points**: Where the process is controlled" :""}

### 5. KEY TAKEAWAYS & LEARNING POINTS
- **Essential concepts**: 3-5 most important things to understand
- **Common misconceptions**: What students often get wrong about this diagram
${detail !=="basic" ?"- **Exam relevance**: Points likely to appear in assessments\n- **Memory aids**: Tips for remembering key components or sequences" :""}
${detail ==="comprehensive" ?"- **Real-world applications**: Practical or clinical significance\n- **Connections to other topics**: How this relates to other chapters/concepts" :""}

### 6. SUBJECT-SPECIFIC REQUIREMENTS

${subject ==="biology" ?"**Biology Diagram Standards**:\n- Use correct biological nomenclature\n- Explain organelle/organ functions at appropriate depth\n- Reference relevant biological processes and pathways\n- Note structural adaptations and their functional significance\n- Include magnification/scale context where relevant" :""}
${subject ==="chemistry" ?"**Chemistry Diagram Standards**:\n- Use proper chemical notation and IUPAC names\n- Explain bond types, angles, and molecular geometry\n- Reference electron configurations where relevant\n- Discuss reaction conditions and mechanisms if shown\n- Include state symbols and energy changes" :""}
${subject ==="physics" ?"**Physics Diagram Standards**:\n- Specify all quantities with SI units\n- Distinguish vectors (direction + magnitude) from scalars\n- Reference applicable physical laws and equations\n- Explain field lines, force arrows, or circuit symbols precisely\n- Include relevant formulas connecting depicted quantities" :""}
${subject ==="geography" ?"**Geography Diagram Standards**:\n- Reference map scales, coordinates, or spatial relationships\n- Explain geological or atmospheric processes shown\n- Discuss temporal aspects (seasons, geological time)\n- Connect to climate patterns or human geography impacts\n- Include regional/global context" :""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ All described components have been identified and explained
2. ✓ Relationships between parts are clearly described
3. ✓ Explanation depth matches ${detail} level requirements
4. ✓ ${subject}-appropriate terminology is used correctly
5. ✓ ${labelParts ?"Every part is labeled with name and function" :"Major components are identified"}
6. ✓ Processes/sequences are explained in logical order
7. ✓ Key takeaways are actionable and exam-relevant
8. ✓ Common misconceptions are addressed
9. ✓ Scientific accuracy is maintained throughout
10. ✓ Language is clear and educational

## DIAGRAM DESCRIPTION TO ANALYZE
${input}

## OUTPUT FORMAT

Use clear markdown with headers for each section. ${labelParts ?"Number or bold each component label." :""} Use bullet points for detailed breakdowns. ${detail ==="comprehensive" ?"Include a brief summary table of components if helpful." :""}

Do NOT include:
- Conversational filler ("Sure, let me explain...")
- Disclaimers about not being able to see the actual image
- Generic definitions unrelated to the specific diagram
- Excessive repetition across sections
- Your commentary about the explanation process

Provide a clear, structured, and educational explanation of this diagram:`;
};


const features = [
  {
    icon: Target,
    title:"Multi-Subject Support",
    description:"Explain diagrams from Biology, Chemistry, Physics, Geography, or any subject with specialized terminology.",
  },
  {
    icon: Layers,
    title:"Flexible Detail Levels",
    description:"Choose from basic overview to comprehensive analysis based on your learning needs and time available.",
  },
  {
    icon: Activity,
    title:"Component Breakdown",
    description:"Get each part labeled and explained with its function, relationships, and role in the overall process.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Describe Diagram",
    desc:"Describe what you see in the diagram",
    icon: Image,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Select Subject",
    desc:"Choose the subject field",
    icon: FileText,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Explanation",
    desc:"Understand every part clearly",
    icon: Activity,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Diagram Explainer?",
    answer:"The Diagram Explainer is an AI-powered educational tool that helps you understand visual concepts, diagrams, charts, and illustrations from any subject. Simply describe what you see in the diagram, and the AI will provide a comprehensive explanation of all components, their functions, and how they work together. Perfect for science diagrams, flowcharts, anatomical illustrations, and more.",
  },
  {
    question:"What types of diagrams can I explain?",
    answer:"You can explain any type of diagram: Biology (cell structures, body systems, plant anatomy), Chemistry (molecular structures, reaction diagrams, atomic models), Physics (circuit diagrams, force diagrams, wave illustrations), Geography (climate zones, geological formations, maps), and General diagrams (flowcharts, process diagrams, organizational charts). The tool adapts to your subject area.",
  },
  {
    question:"How do I describe my diagram?",
    answer:"Simply write what you see in the diagram: the shapes, labels, arrows, colors, and any text present. For example: 'A cell diagram showing nucleus in the center, mitochondria scattered around, cell membrane on the outside, and ribosomes attached to rough ER.' The more details you provide about what you observe, the more accurate and helpful the explanation will be.",
  },
  {
    question:"What detail levels are available?",
    answer:"Choose from three levels: Basic (quick overview of main components and their primary functions), Detailed (thorough explanation of all parts with technical terms and interactions), or Comprehensive (in-depth analysis including processes, significance, and advanced details). Select based on your learning goals and how deeply you need to understand the concept.",
  },
  {
    question:"Can I upload an image of my diagram?",
    answer:"Currently, the tool works by text description. Describe what you see in your diagram - the components, labels, arrows, relationships, and any text. This description method actually helps you practice observation skills and ensures you're actively engaging with the material, which aids learning and retention.",
  },
  {
    question:"Is the Diagram Explainer free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Concept Explainer",
    slug:"concept-explainer",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Homework Solver",
    slug:"homework-solver",
    icon: Calculator,
    color:"text-orange-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-purple-600",
  },
  {
    name:"Formula Generator",
    slug:"formula-generator",
    icon: Brain,
    color:"text-blue-600",
  },
];

export default function DiagramExplainerClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Diagram Explainer"
      toolSlug="diagram-explainer"
      tagline="Understand any diagram or visual concept"
      description="Get detailed explanations of diagrams, charts, and visual representations from any subject. Perfect for science, medicine, engineering, and more."
      badge="Visual Learning"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Decode Any Diagram"
      ctaDescription="Visual concepts made crystal clear with detailed explanations!"
      ctaButtonText="Explain Diagram"
      ctaIcon={Activity}
    >
      <EnhancedToolLayout
        toolSlug="diagram-explainer"
        toolName="Diagram Explainer"
        placeholder={`📊 Describe the diagram you want explained...

Examples:
• Cell structure diagram with nucleus in center, mitochondria scattered around, cell membrane on outside, ribosomes on rough ER, and golgi apparatus near nucleus
• Water cycle showing evaporation from ocean, condensation into clouds, precipitation as rain, and runoff back to ocean with arrows
• Circuit diagram with battery, three resistors in series, a switch, and an LED light bulb
• Heart anatomy showing four chambers - left and right atria on top, left and right ventricles below, with valves between chambers and major blood vessels
• Photosynthesis diagram with chloroplast, showing light reactions in thylakoids and Calvin cycle in stroma
• Nitrogen cycle with bacteria, plants, animals, and atmosphere showing decomposition and nitrogen fixation

💡 Tip: Include labels, arrows, and spatial relationships you see in the diagram for more accurate explanations!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📖 Diagram Explanation"
        generateButtonText="🔍 Explain Diagram"
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
