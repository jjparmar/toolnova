"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Mail,
  Send,
  FileText,
  Lightbulb,
  MessageSquare,
  Briefcase,
  Users,
  Star,
  Zap,
  CheckCircle,
  Target,
  Clock,
} from"lucide-react";

const toolOptions = [
  {
    id:"emailType",
    label:"Email Type",
    type:"select" as const,
    options: [
      { value:"professional", label:"💼 Professional/Business" },
      { value:"followup", label:"🔄 Follow-Up" },
      { value:"request", label:"📋 Request" },
      { value:"apology", label:"🙏 Apology" },
      { value:"thank-you", label:"🙌 Thank You" },
      { value:"introduction", label:"👋 Introduction" },
    ] as const,
    defaultValue:"professional",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"formal", label:"👔 Formal" },
      { value:"friendly", label:"😊 Friendly" },
      { value:"persuasive", label:"💪 Persuasive" },
      { value:"urgent", label:"⚡ Urgent" },
    ] as const,
    defaultValue:"formal",
  },
  {
    id:"length",
    label:"Length",
    type:"select" as const,
    options: [
      { value:"brief", label:"⚡ Brief" },
      { value:"medium", label:"📝 Medium" },
      { value:"detailed", label:"📚 Detailed" },
    ] as const,
    defaultValue:"medium",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const type = options?.emailType ||"professional";
  const tone = options?.tone ||"formal";
  const length = options?.length ||"medium";

  const lengthGuide: Record<string, string> = {
    brief:"3-5 sentences (50-100 words) - Essential information only, direct and efficient",
    medium:"6-10 sentences (150-250 words) - Balanced detail with context and explanation",
    detailed:"10-15 sentences (300-500 words) - Comprehensive coverage with background, details, and next steps",
  };

  const typeGuidance: Record<string, string> = {
    professional:"Maintain professional standards, clear business communication, appropriate formality, focus on objectives and outcomes.",
    thankyou:"Express genuine gratitude, be specific about what you're thanking for, acknowledge the impact, warm and appreciative tone.",
    followup:"Reference previous communication, provide updates or ask for status, include clear next steps, polite persistence.",
    apology:"Take responsibility sincerely, explain what happened, outline corrective actions, rebuild trust, professional humility.",
    inquiry:"Ask clear, specific questions, provide context for your request, make it easy to respond, professional curiosity.",
    invitation:"Clearly state what you're inviting to, include all key details (date, time, location/link), make responding easy, enthusiastic tone.",
  };

  const toneGuidance: Record<string, string> = {
    formal:"Professional vocabulary, complete sentences, respectful address, no contractions, polished and authoritative.",
    casual:"Conversational language, contractions acceptable, friendly but professional, approachable and warm.",
    friendly:"Warm and personable, use first names, express genuine interest, build relationship, positive and upbeat.",
  };

  return`You are an expert business communication specialist and professional email writer. Your task is to craft a clear, effective email that achieves its intended purpose while maintaining appropriate professionalism.

## YOUR TASK
Write a complete ${type} email with a ${tone} tone that communicates clearly and prompts the desired response.

## SPECIFICATIONS
**Email Type**: ${type} - ${typeGuidance[type] || typeGuidance.professional}
**Tone**: ${tone} - ${toneGuidance[tone] || toneGuidance.formal}
**Target Length**: ${lengthGuide[length] || lengthGuide.medium}

## EMAIL STRUCTURE FRAMEWORK

### 1. SUBJECT LINE (Critical First Impression)
- Keep to 6-10 words (40-60 characters max)
- Be specific and actionable
- Create urgency or interest where appropriate
- Avoid spam triggers (!!!, FREE, ALL CAPS)
- ${type ==="professional" ?"Professional and clear about content" : type ==="thankyou" ?"Warm and specific (e.g., 'Thank You for [Specific Action]')" : type ==="followup" ?"Reference previous topic (e.g., 'Following Up: [Topic]')" : type ==="apology" ?"Sincere and direct" : type ==="inquiry" ?"Question-focused" :"Event/action-focused"}

Examples of strong subject lines:
-"Meeting Request: Q4 Budget Discussion"
-"Follow-Up: Your Proposal Feedback"
-"Thank You for Yesterday's Presentation"
-"Quick Question About Project Timeline"

### 2. GREETING (Set the Tone)
- ${tone ==="formal" ?"Use 'Dear [Full Name],' or 'Dear Mr./Ms. [Last Name],'" : tone ==="casual" ?"Use 'Hi [First Name],' or 'Hello [First Name],'" :"Use 'Hey [First Name],' or 'Hi [First Name],'"}
- If name unknown: ${tone ==="formal" ?"'Dear Hiring Manager,' or 'To Whom It May Concern,'" :"'Hi there,' or 'Hello,'"}
- Match formality to relationship and context

### 3. OPENING SENTENCE (State Purpose Immediately)
- Lead with your main purpose within first 1-2 sentences
- ${type ==="thankyou" ?"Express gratitude immediately: 'Thank you for [specific action]'" : type ==="apology" ?"Acknowledge issue upfront: 'I apologize for [specific problem]'" : type ==="followup" ?"Reference previous communication: 'Following up on my email from [date] regarding [topic]'" : type ==="inquiry" ?"State your question context: 'I'm reaching out to inquire about [topic]'" : type ==="invitation" ?"Extend invitation clearly: 'I'd like to invite you to [event]'" :"State purpose clearly: 'I'm writing to [purpose]'"}
- Be direct - recipient should know why you're writing immediately

### 4. BODY (Develop Message)

**For Brief Emails (${length ==="brief" ?"YOUR TARGET" :"if needed"}):**
- 2-3 sentences of essential information
- One main point only
- Skip background unless critical

**For Medium Emails (${length ==="medium" ?"YOUR TARGET" :"if needed"}):**
- Opening context (1-2 sentences)
- Main information (3-5 sentences)
- Supporting details or explanation
- Organized in logical flow

**For Detailed Emails (${length ==="detailed" ?"YOUR TARGET" :"if needed"}):**
- Background/context (2-3 sentences)
- Main information broken into digestible paragraphs
- Supporting details, examples, or data
- Multiple points organized clearly
- Use bullet points for lists of 3+ items

**Content Guidelines:**
- One idea per paragraph (short paragraphs for readability)
- Use bullet points for multiple items or action steps
- Include specific details (dates, times, numbers)
- ${type ==="professional" ?"Focus on business outcomes and next steps" : type ==="thankyou" ?"Be specific about impact and appreciation" : type ==="apology" ?"Explain what happened and how you'll fix it" : type ==="followup" ?"Summarize previous discussion and status" :"Provide all necessary context"}
- Avoid jargon unless recipient will understand
- Be concrete and specific, not vague

### 5. CALL-TO-ACTION (If Applicable)
- Clearly state what you need from recipient
- ${type ==="inquiry" ?"Ask specific questions that are easy to answer" : type ==="invitation" ?"Request RSVP with deadline" : type ==="followup" ?"Specify next steps or response needed" : type ==="professional" ?"Define expected action or response" :"Make request clear and reasonable"}
- Include deadlines if time-sensitive
- Make it easy to respond (yes/no question, specific date options)
- Example:"Could you please review the attached document by Friday, March 15?"

### 6. CLOSING (Professional Sign-Off)
- ${type ==="thankyou" ?"Reiterate appreciation: 'Thanks again for your help!'" : type ==="apology" ?"Final apology and commitment: 'Again, I sincerely apologize and appreciate your understanding.'" :"Brief courteous closing: 'Thank you for your time' or 'Looking forward to hearing from you'"}
- Match tone: ${tone ==="formal" ?"'Best regards,' 'Sincerely,' 'Kind regards,'" : tone ==="casual" ?"'Best,' 'Thanks,' 'Regards,'" :"'Cheers,' 'Warmly,' 'All the best,'"}
- Include your name (full name for formal, first name for casual)

## WRITING QUALITY STANDARDS

### Clarity & Conciseness
- Every sentence should add value
- Cut unnecessary words ("in order to" →"to")
- Avoid redundancy ("past history" →"history")
- Use active voice ("I will send" not"It will be sent by me")

### Professional Polish
- ${tone ==="formal" ?"No contractions, complete sentences, proper grammar" :"Contractions okay, maintain readability"}
- No typos or grammatical errors
- Consistent formatting (spacing, punctuation)
- Proper capitalization and punctuation

### Tone Consistency
- Maintain ${tone} tone throughout every sentence
- ${type ==="apology" ?"Sincere and humble, take ownership" : type ==="thankyou" ?"Warm and genuine, not over-the-top" : type ==="inquiry" ?"Curious but respectful, not demanding" :"Professional and purpose-driven"}
- Avoid passive-aggressive language
- Be positive when possible

### Readability
- Short paragraphs (2-4 sentences max)
- White space between sections
- Scannable with clear structure
- Mobile-friendly formatting

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Subject line: Specific, clear, 6-10 words
2. ✓ Length: ${lengthGuide[length]}
3. ✓ Greeting: Appropriate for ${tone} tone
4. ✓ Purpose: Stated clearly in first 1-2 sentences
5. ✓ Email type: Meets all ${type} requirements
6. ✓ Tone: Consistently ${tone} throughout
7. ✓ Body: Well-organized with logical flow
8. ✓ Specificity: Includes concrete details, not vague
9. ✓ Call-to-action: Clear next steps (if applicable)
10. ✓ Closing: Professional and appropriate
11. ✓ Grammar: No errors, proper punctuation
12. ✓ Formatting: Scannable with paragraph breaks
13. ✓ Completeness: All necessary information included
14. ✓ Effectiveness: Would achieve intended purpose

## CONTEXT & PURPOSE
${input}

## OUTPUT FORMAT

Provide the complete email in this exact format:

**Subject:** [Your compelling subject line here]

[Greeting]

[Opening sentence stating purpose]

[Body paragraphs with details]

[Call-to-action if applicable]

[Closing sentence]

[Sign-off],
[Name]

Do NOT include:
- Meta-commentary or explanations
- Multiple drafts or options
- Notes to the sender
- Formatting instructions

Just provide one polished, ready-to-send email.`;
};


const features = [
  {
    icon: Target,
    title:"Multiple Email Types",
    description:"From professional business emails to thank-you notes, generate the perfect email for any situation.",
  },
  {
    icon: CheckCircle,
    title:"Subject Line Included",
    description:"Every email comes with an optimized subject line designed to increase open rates and engagement.",
  },
  {
    icon: Clock,
    title:"Tone & Length Control",
    description:"Choose from formal to friendly tones and brief to detailed lengths to match your needs perfectly.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Describe Need",
    desc:"Tell us what you need to communicate",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Tone",
    desc:"Choose type, tone, and length",
    icon: FileText,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Send It",
    desc:"Copy and send your polished email",
    icon: Send,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Email Writer?",
    answer:"The Email Writer is an AI-powered tool that generates professional, polished emails for any situation. Whether you need to write a business request, follow-up, apology, or thank-you email, our AI creates well-structured messages with appropriate tone and formatting, including subject lines.",
  },
  {
    question:"What email types can I create?",
    answer:"You can create six types of emails: Professional/Business (formal correspondence), Follow-Up (checking in on previous communication), Request (asking for information or action), Apology (addressing mistakes or issues), Thank You (expressing gratitude), and Introduction (introducing yourself or others).",
  },
  {
    question:"Will it include a subject line?",
    answer:"Yes! Every email generated includes a suggested subject line optimized for clarity and engagement. The subject line is specifically crafted to match your email type and increase the likelihood of your email being opened and read.",
  },
  {
    question:"How do the tone options work?",
    answer:"Choose from four tones: Formal (professional and traditional), Friendly (warm and approachable), Persuasive (convincing and compelling), or Urgent (time-sensitive and direct). The tone affects word choice, phrasing, and overall style while maintaining professionalism.",
  },
  {
    question:"Can I control email length?",
    answer:"Absolutely! Select Brief for quick, concise emails (3-5 sentences), Medium for balanced detail (6-10 sentences), or Detailed for comprehensive messages (10-15 sentences). Choose based on the complexity of your message and recipient's time.",
  },
  {
    question:"Is the Email Writer free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Cover Letter",
    slug:"cover-letter-writer",
    icon: FileText,
    color:"text-blue-600",
  },
  {
    name:"Grammar Fix",
    slug:"grammar-fix",
    icon: MessageSquare,
    color:"text-purple-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Bio Generator",
    slug:"bio-generator",
    icon: Briefcase,
    color:"text-orange-600",
  },
];

export default function EmailWriterClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Email Writer"
      toolSlug="email-writer"
      tagline="Write professional emails in seconds"
      description="Generate polished, effective emails for any situation - from business requests to thank-you notes. Includes subject lines and multiple tone options."
      badge="Email Pro"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Compose Your Email"
      ctaDescription="Professional communication made easy. Write better emails faster!"
      ctaButtonText="Start Writing"
      ctaIcon={Mail}
    >
      <EnhancedToolLayout
        toolSlug="email-writer"
        toolName="Email Writer"
        systemPrompt="You are an expert professional email writer. Output a complete email with Subject line, greeting, body, and sign-off. Match the requested tone and length. No meta commentary. Be specific and actionable."
        placeholder={`📧 Describe what you need to communicate...

Examples:
• Follow up on job interview I had last week with hiring manager Sarah
• Request a meeting with my professor to discuss thesis progress
• Thank client for their business and introduce new services we're offering
• Apologize for missing deadline and provide new timeline
• Introduce myself to new team members after promotion
• Request time off for family vacation in July

💡 Tip: Include relevant details like names, dates, and specific circumstances for better results!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📧 Your Email"
        generateButtonText="✉️ Write Email"
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
