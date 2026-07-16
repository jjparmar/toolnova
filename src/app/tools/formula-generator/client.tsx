"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Calculator,
  Sigma,
  FileText,
  ClipboardList,
  Users,
  Star,
  Zap,
  BookOpen,
  Brain,
  Lightbulb,
  Beaker,
  TrendingUp,
} from"lucide-react";

const toolOptions = [
  {
    id:"subject",
    label:"Subject",
    type:"select" as const,
    options: [
      { value:"math", label:"🔢 Mathematics" },
      { value:"physics", label:"⚛️ Physics" },
      { value:"chemistry", label:"🧪 Chemistry" },
      { value:"economics", label:"📊 Economics" },
    ] as const,
    defaultValue:"math",
  },
  {
    id:"format",
    label:"Output Format",
    type:"select" as const,
    options: [
      { value:"list", label:"📋 List Format" },
      { value:"table", label:"📊 Table Format" },
      { value:"explained", label:"📝 With Explanations" },
    ] as const,
    defaultValue:"explained",
  },
  {
    id:"includeExamples",
    label:"Include Examples",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const systemPrompt =`You are an expert mathematician, physicist, and academic formula specialist. Your role is to create comprehensive, accurate formula sheets that serve as essential study and reference materials for students and professionals.`;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const subject = options?.subject ||"math";
  const format = options?.format ||"explained";
  const includeExamples = options?.includeExamples !== false;

  const subjectGuidance: Record<string, string> = {
    math:"Mathematical formulas with standard notation. Include algebra, geometry, calculus, trigonometry formulas as relevant. Use proper mathematical symbols (√, ∑, ∫, π, etc.).",
    physics:"Physics equations with SI units. Include mechanics, thermodynamics, electromagnetism, optics formulas. Specify variable meanings and unit conversions.",
    chemistry:"Chemical formulas and equations. Include stoichiometry, thermodynamics, kinetics, equilibrium. Use proper chemical notation and balanced equations.",
    statistics:"Statistical formulas and distributions. Include descriptive statistics, probability, hypothesis testing. Specify when to use each formula.",
    engineering:"Engineering formulas and principles. Include relevant physical laws, design equations, and conversion factors. Specify applications and constraints.",
  };

  const formatInstructions: Record<string, string> = {
    list:"Bullet list format with clear organization by category or topic. Each formula on its own line with proper mathematical notation and brief description.",
    table:"Markdown pipe table format. Structure: | Formula Name | Equation | Variables/Notes |. Use pipe | characters for columns. Include header row with separator (| --- | --- | --- |). Ensure proper alignment and readability.",
    explained:"Detailed format with each formula presented individually. Include: formula name (bold), equation with notation, explanation of terms, when to use it, and important notes or constraints.",
  };

  const exampleStrategy = includeExamples
    ?"For each major formula, include a worked example showing: given values, step-by-step solution, and final answer with units. Examples should demonstrate practical application."
    :"Formulas only without worked examples. Focus on comprehensive coverage and clear notation.";

  return`You are an expert ${subject} specialist creating a comprehensive formula reference sheet. Your goal is to provide accurate, well-organized formulas that students can rely on for studying and problem-solving.

## YOUR TASK
Generate a complete, organized formula sheet for ${subject} covering the requested topic in ${format} format.

## SPECIFICATIONS
**Subject Area**: ${subject.toUpperCase()} - ${subjectGuidance[subject]}
**Format**: ${format.toUpperCase()} - ${formatInstructions[format]}
**Examples**: ${exampleStrategy}
**Audience**: Students and professionals needing reliable formula reference

## FORMULA SHEET FRAMEWORK

### 1. ORGANIZATION STRUCTURE
- **Logical grouping**: Organize formulas by subtopic or category
- **Progressive complexity**: Basic formulas first, then advanced
- **Clear hierarchy**: Use headings/sections for different formula groups
- **Complete coverage**: Include ALL essential formulas for the topic
${format ==="table" ?"- **Table structure**: Consistent column widths and alignment" :""}

### 2. MATHEMATICAL NOTATION STANDARDS

**Required notation elements**:
- **Variables**: Define all variables clearly (e.g.,"v = velocity")
- **Units**: Specify units in brackets or notes [m/s], [kg], [J]
- **Greek letters**: Use Unicode symbols (α, β, γ, θ, π, Σ, Δ, ∫)
- **Superscripts/Subscripts**: Use Unicode or clear notation (x², v₀, aₙ)
- **Special symbols**: √ (root), ± (plus-minus), ≈ (approximately), ≠ (not equal)
- **Fractions**: Use proper fraction notation or / for division
- **Operators**: × or · for multiplication, ÷ or / for division

**Common mathematical symbols**:
- Calculus: ∫ (integral), d/dx (derivative), ∂ (partial), lim, Σ (sum)
- Geometry: ∠ (angle), ⊥ (perpendicular), ∥ (parallel), ≅ (congruent)
- Logic: ∀ (for all), ∃ (exists), ∈ (element of), ⊂ (subset)
- Trigonometry: sin, cos, tan, sec, csc, cot

### 3. FORMAT-SPECIFIC REQUIREMENTS

${
  format ==="list"
    ?`**List Format Rules**:
- Use bullet points (•) or dashes (-)
- **Bold formula names**
- Equation on same line or indented below
- Brief description after equation
- Group related formulas together
- Leave blank line between major sections

Example structure:
**Category Name**
• **Formula Name**: equation | description
• **Another Formula**: equation | description`
    :""
}

${
  format ==="table"
    ?`**Table Format Rules - CRITICAL**:
- MUST use pipe | characters for columns
- Include header row: | Formula Name | Equation | Variables/Notes |
- Include separator: | --- | --- | --- |
- Each formula is one table row
- Keep cells concise but complete
- Use proper mathematical notation within cells
- Ensure table is valid Markdown syntax

Example structure:
| Formula Name | Equation | Variables/Notes |
| --- | --- | --- |
| Distance | d = vt | d=distance, v=velocity, t=time |
| Acceleration | a = Δv/Δt | a=acceleration, Δv=change in velocity |`
    :""
}

${
  format ==="explained"
    ?`**Explained Format Rules**:
For each formula provide:
1. **Formula Name** (bold, clear identifier)
2. **Equation**: Full mathematical expression with notation
3. **Where**: When and where to use this formula
4. **Variables**: Define each variable with units
5. **Notes**: Constraints, special cases, or important points
${includeExamples ?"6. **Example**: Brief worked example with numbers" :""}

Use clear section breaks between formulas.`
    :""
}

### 4. CONTENT QUALITY STANDARDS

**Accuracy Requirements**:
- Formulas must be mathematically/scientifically correct
- Use standard notation for the field
- Include domain/range restrictions where relevant
- Specify conditions for formula validity
- ${subject ==="physics" || subject ==="chemistry" ?"Include proper SI units" :"Use standard mathematical units"}

**Completeness Checklist**:
- Core fundamental formulas
- Derived formulas (if topic requires)
- Special cases or variations
- Conversion factors (if applicable)
- Constants with values (π, e, g, c, h, k, R, etc.)

**Variable Definitions**:
- Every variable explained clearly
- Units specified in brackets or notes
- Distinguish between similar variables (v vs V, m vs M)
- Note vector vs scalar where relevant

### 5. EXAMPLES (If Enabled)
${
  includeExamples
    ?`
**Example Requirements**:
- Include 1-2 worked examples per major formula
- Use realistic, practical values
- Show all calculation steps
- Include units throughout
- Present final answer clearly

**Example format**:
Given: [list known values with units]
Find: [what we're solving for]
Solution: [step-by-step with formulas]
Answer: [final result with units]`
    :"Skip examples - formulas only"
}

### 6. SUBJECT-SPECIFIC ELEMENTS

${subject ==="physics" ?"**Physics Specifics**:\n- Always include units (SI preferred)\n- Specify vector quantities (use bold or arrow)\n- Include reference frames when relevant\n- Note sign conventions\n- Mention assumptions (frictionless, ideal gas, etc.)" :""}
${subject ==="chemistry" ?"**Chemistry Specifics**:\n- Balance all chemical equations\n- Include states of matter (s, l, g, aq)\n- Specify standard conditions (STP, SATP)\n- Include oxidation states where relevant\n- Use proper chemical notation (subscripts, coefficients)" :""}
${subject ==="math" ?"**Mathematics Specifics**:\n- Specify domain and range restrictions\n- Note discontinuities or asymptotes\n- Include conditions (n > 0, x ≠ 0, etc.)\n- Show both exact and approximate forms\n- Mention special cases" :""}
${subject ==="statistics" ?"**Statistics Specifics**:\n- Specify distribution assumptions\n- Include degrees of freedom formulas\n- Note sample vs population formulas\n- Specify confidence levels\n- Include decision rules" :""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Format: Correctly formatted as ${format} ${format ==="table" ?"(valid Markdown table with pipes)" :""}
2. ✓ Subject: All formulas appropriate for ${subject}
3. ✓ Notation: Proper mathematical symbols and notation used
4. ✓ Variables: All variables defined with units
5. ✓ Completeness: All major formulas for topic included
6. ✓ Organization: Logical grouping and clear hierarchy
7. ✓ Accuracy: Formulas are mathematically/scientifically correct
8. ✓ Units: ${subject ==="physics" || subject ==="chemistry" ?"SI units specified throughout" :"Appropriate units included"}
9. ✓ Examples: ${includeExamples ?"1-2 worked examples included per major formula" :"No examples, formulas only"}
10. ✓ Clarity: Easy to read and reference
11. ✓ Constants: Common constants included with values if relevant
12. ✓ Special cases: Constraints and conditions noted

## TOPIC TO COVER
${input}

## OUTPUT FORMAT

${
  format ==="table"
    ?`Output a valid Markdown table:

| Formula Name | Equation | Variables/Notes |
| --- | --- | --- |
| [Name] | [Equation] | [Definitions] |
[Continue for all formulas]

CRITICAL: Use pipe | characters. Ensure valid Markdown syntax.`
    :""
}

${
  format ==="list"
    ?`Output organized list:

**Section 1: [Category]**
• **Formula 1**: equation | description
• **Formula 2**: equation | description

**Section 2: [Category]**
[Continue organized by topic]`
    :""
}

${
  format ==="explained"
    ?`Output detailed explanations:

**Formula Name 1**
Equation: [full equation]
Where: [when to use]
Variables: [define each]
Notes: [important points]
${includeExamples ?"Example: [worked problem]" :""}

[Continue for each formula]`
    :""
}

Do NOT include:
- Conversational text ("Here are the formulas...")
- Explanations about the format itself
- Apologies or disclaimers
- Your commentary about the formulas
${format !=="table" ?"- Tables if list/explained format chosen" :"- Lists if table format chosen"}

Create a comprehensive, accurate formula sheet ready for immediate use as study material.`;
};


const features = [
  {
    icon: Sigma,
    title:"Multi-Subject Support",
    description:"Get formulas for Math, Physics, Chemistry, Economics, and more with accurate notation.",
  },
  {
    icon: ClipboardList,
    title:"Multiple Formats",
    description:"Choose between list, table, or explained formats to match your study style.",
  },
  {
    icon: FileText,
    title:"Examples Included",
    description:"Understand how to apply each formula with practical examples and use cases.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type your formula topic or chapter",
    icon: FileText,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Choose Format",
    desc:"Select list, table, or explained",
    icon: ClipboardList,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Formulas",
    desc:"Receive organized formula sheet",
    icon: Sigma,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Formula Generator?",
    answer:"The Formula Generator is an AI-powered tool that creates comprehensive formula sheets for various subjects including Mathematics, Physics, Chemistry, and Economics. It organizes all relevant formulas for any topic with proper mathematical notation and optional explanations.",
  },
  {
    question:"What subjects are covered?",
    answer:"We currently support Mathematics (algebra, calculus, geometry, trigonometry), Physics (mechanics, thermodynamics, electromagnetism), Chemistry (equations, constants, conversions), and Economics (financial formulas, ratios). More subjects are being added regularly.",
  },
  {
    question:"Can I get explanations with formulas?",
    answer:"Yes! Choose the 'With Explanations' format to get each formula with a clear explanation of when and how to use it. This helps you understand the context and application of each formula, not just memorize it.",
  },
  {
    question:"Are examples included?",
    answer:"You can enable the 'Include Examples' toggle to get practical examples showing how to apply each formula. This is especially helpful for understanding problem-solving techniques and exam preparation.",
  },
  {
    question:"What output formats are available?",
    answer:"Choose from three formats: List Format (simple bullet list), Table Format (organized Markdown table), or Explained Format (formulas with detailed explanations). Pick the format that works best for your study notes or revision materials.",
  },
  {
    question:"Is the Formula Generator free to use?",
    answer:"Yes! The Formula Generator is completely free. You can generate unlimited formula sheets for any subject or topic without any cost. Perfect for students, teachers, and anyone needing quick formula references.",
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
    name:"Doubt Solver",
    slug:"doubt-solver",
    icon: Brain,
    color:"text-purple-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-blue-600",
  },
];

export default function FormulaGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Formula Generator"
      toolSlug="formula-generator"
      tagline="Get all the formulas you need for any topic"
      description="Generate comprehensive formula sheets for Math, Physics, Chemistry, and more with explanations and examples. Perfect for exam preparation and quick reference."
      badge="Formula Reference"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Generate Your Formula Sheet"
      ctaDescription="Never forget a formula again. Get organized formula sheets instantly!"
      ctaButtonText="Start Generating"
      ctaIcon={Sigma}
    >
      <EnhancedToolLayout
        toolSlug="formula-generator"
        toolName="Formula Generator"
        placeholder={`📐 Enter your topic for formula generation...

Examples:
• Trigonometry identities
• Kinematics and motion equations
• Chemical equilibrium formulas
• Financial ratios and calculations
• Integration formulas
• Thermodynamics laws

💡 Tip: Be specific about the topic or chapter for more relevant formulas!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        systemPrompt={systemPrompt}
        resultLabel="📊 Your Formula Sheet"
        generateButtonText="📐 Generate Formulas"
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
