"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  FileText,
  Mic,
  Lightbulb,
  MessageSquare,
  Users,
  Target,
  Star,
  Zap,
  Heart,
  Award,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"occasion",
    label:"Occasion",
    type:"select" as const,
    options: [
      { value:"graduation", label:"🎓 Graduation" },
      { value:"wedding", label:"💒 Wedding" },
      { value:"business", label:"💼 Business/Conference" },
      { value:"award", label:"🏆 Award Ceremony" },
      { value:"memorial", label:"🕊️ Memorial" },
      { value:"motivational", label:"💪 Motivational" },
    ] as const,
    defaultValue:"graduation",
  },
  {
    id:"duration",
    label:"Duration",
    type:"select" as const,
    options: [
      { value:"2min", label:"⏱️ 2 Minutes" },
      { value:"5min", label:"⏱️ 5 Minutes" },
      { value:"10min", label:"⏱️ 10 Minutes" },
    ] as const,
    defaultValue:"5min",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"formal", label:"👔 Formal" },
      { value:"heartfelt", label:"❤️ Heartfelt" },
      { value:"humorous", label:"😄 Humorous" },
      { value:"inspirational", label:"✨ Inspirational" },
    ] as const,
    defaultValue:"heartfelt",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const occasion = options?.occasion ||"graduation";
  const duration = options?.duration ||"5min";
  const tone = options?.tone ||"heartfelt";

  const durationWords: Record<string, string> = {"2min":"300-400 words (2 minutes at 150 words/min speaking pace)","5min":"700-900 words (5 minutes at 150 words/min speaking pace)","10min":"1400-1600 words (10 minutes at 150 words/min speaking pace)",
  };

  const occasionGuidance: Record<string, string> = {
    graduation:"Celebrate achievements and growth, inspire future endeavors, acknowledge mentors/support, balance nostalgia with forward-looking optimism, emphasize potential and possibilities.",
    wedding:"Express genuine joy and love, share meaningful anecdotes about the couple, offer wisdom for marriage, acknowledge families, create emotional moments, end with heartfelt wishes.",
    business:"Deliver clear insights and data, motivate stakeholders, present compelling vision, establish credibility, provide actionable takeaways, inspire confidence and action.",
    award:"Honor specific achievements with details, acknowledge hard work and dedication, inspire continued excellence, make recipient feel valued, connect to larger impact.",
    memorial:"Pay respectful tribute to the deceased, share fond memories and stories, provide comfort to grieving attendees, celebrate the life lived, offer hope and healing.",
    motivational:"Inspire concrete action, share powerful personal stories, empower audience to overcome obstacles, provide practical strategies, build belief in possibility, create lasting impact.",
  };

  const toneGuidance: Record<string, string> = {
    formal:"Professional vocabulary, sophisticated sentence structures, respectful address, polished delivery, authoritative but approachable, minimal personal anecdotes.",
    heartfelt:"Warm and sincere language, emotional authenticity, personal stories, vulnerable moments, genuine connection, expressive and moving.",
    humorous:"Light-hearted jokes and wit, playful language, timing-conscious humor, balance levity with substance, relatable funny observations, appropriate comedic relief.",
    inspirational:"Uplifting language, powerful imagery, motivational themes, calls to greatness, stirring emotion, triumphant tone, empowering message.",
  };

  return`You are an expert speechwriter and public speaking coach. Your task is to craft a compelling, memorable ${occasion} speech that resonates with the audience and achieves its intended impact.

## YOUR TASK
Write a complete ${occasion} speech with a ${tone} tone that captivates the audience and delivers a powerful message. Use the speaker's notes/details below — do not invent personal stories that contradict the user.

## SPECIFICATIONS
**Occasion**: ${occasion} - ${occasionGuidance[occasion] || occasionGuidance.graduation}
**Target Length**: ${durationWords[duration] || durationWords["5min"]} (strictly adhere to word count)
**Tone**: ${tone} - ${toneGuidance[tone] || toneGuidance.heartfelt}
**Delivery Time**: Designed for ${duration} speaking pace with natural pauses

## SPEECH STRUCTURE FRAMEWORK

### 1. OPENING HOOK (First 30-60 seconds)
Start with ONE of these proven attention-grabbers:
- Powerful question that makes audience think
- Surprising statistic or fact
- Brief compelling story or anecdote
- Bold statement or provocative claim
- Relevant quote from respected figure
- Vivid scene description

**Goals**: Capture immediate attention, establish tone, create curiosity

### 2. INTRODUCTION & CONTEXT (Next 1-2 minutes)
- Acknowledge the audience and occasion
- Establish your connection to the topic/people
- Preview your main message or theme
- ${occasion ==="wedding" ?"Thank hosts and acknowledge families" : occasion ==="business" ?"State objectives and relevance" : occasion ==="memorial" ?"Express shared grief and purpose" :"Set the stage for your message"}
- Build rapport and credibility

### 3. BODY - MAIN CONTENT (Core of speech)
Develop 2-3 key points with:
- **Personal Stories/Anecdotes**: ${tone ==="humorous" ?"Funny, relatable stories with good timing" : tone ==="heartfelt" ?"Emotional, genuine experiences" : tone ==="inspirational" ?"Triumphant or transformative stories" :"Relevant professional examples"}
- **Specific Examples**: Concrete details, names, moments (not generic)
- **Universal Themes**: Connect personal to broader meaning
- **Evidence/Support**: Facts, quotes, or observations
- **Emotional Beats**: Vary intensity (${tone ==="humorous" ?"jokes balanced with sincerity" : tone ==="heartfelt" ?"touching moments with lightness" :"build and release tension"})

**Transitions**: Use clear bridges between points ("But here's what I learned..." /"This reminds me..." /"Looking forward...")

### 4. RHETORICAL TECHNIQUES (Weave Throughout)
- **Rule of Three**: Group ideas in threes for memorability
- **Repetition**: Repeat key phrases for emphasis ("I have a dream...")
- **Rhetorical Questions**: Engage audience thinking
- **Metaphors/Analogies**: Make abstract concepts concrete
- **Contrast**:"Not this... but that" structures
- **Callback**: Reference opening or earlier points
- **Pauses**: (Indicate with"..." for dramatic effect)

### 5. CLIMAX & CALL-TO-ACTION (Build to peak)
- Bring all themes together
- Most emotionally powerful moment
- ${occasion ==="motivational" ?"Clear action steps for audience" : occasion ==="business" ?"Specific next steps or decision" : occasion ==="memorial" ?"Honoring legacy through action" :"Culminating inspirational message"}
- Create sense of urgency or importance

### 6. MEMORABLE CLOSING (Final 30-60 seconds)
- ${occasion ==="wedding" ?"Heartfelt toast or blessing" : occasion ==="graduation" ?"Final words of wisdom and encouragement" : occasion ==="memorial" ?"Comforting final thought and goodbye" :"Powerful final statement"}
- Circle back to opening (callback)
- End with strongest line - memorable quote, wish, or charge
- Leave audience with clear takeaway
- ${tone ==="humorous" ?"End on uplifting note (not joke)" : tone ==="inspirational" ?"Soaring, uplifting conclusion" :"Resonant final impression"}

## WRITING QUALITY STANDARDS

### Language & Style
- ${tone ==="formal" ?"Sophisticated vocabulary, complete sentences, third-person when appropriate" : tone ==="heartfelt" ?"Warm, genuine language with emotional resonance" : tone ==="humorous" ?"Conversational with well-timed wit" :"Uplifting, powerful word choices"}
- Speak TO audience, not AT them (use"we" and"you")
- Vary sentence length (short punchy + flowing longer)
- Use concrete details over abstractions
- Active voice for energy and directness

### Emotional Intelligence
- Read the room for ${occasion} (appropriate solemnity/joy)
- Balance ${tone ==="humorous" ?"humor with heartfelt moments" : tone ==="heartfelt" ?"emotion with lighter moments" :"intensity with breathing room"}
- Create emotional arc (don't stay one note)
- Acknowledge shared feelings/experiences

### Delivery Considerations
- Write for SPEAKING, not reading (conversational flow)
- Short paragraphs = natural pause points
- Avoid tongue-twisters or complex phrasing
- Include pronunciation guides in [brackets] if needed
- Mark intentional pauses with"..."
- Keep sentences under 25-30 words for breath control

### Audience Connection
- Make it about THEM, not just you
- Universal experiences they'll recognize
- Specific enough to be authentic, broad enough to resonate
- ${occasion ==="wedding" ?"Include both families/friend groups" : occasion ==="business" ?"Address all stakeholder concerns" :"Connect to shared values"}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Word count: ${durationWords[duration]} (count carefully)
2. ✓ Opening: Immediately engaging hook
3. ✓ Structure: All 6 sections present and balanced
4. ✓ Tone: Consistently ${tone} throughout
5. ✓ Occasion: Appropriate for ${occasion} context
6. ✓ Stories: 2-3 specific, detailed anecdotes included
7. ✓ Rhetorical devices: At least 3 techniques used
8. ✓ Emotional arc: Varied intensity, not monotone
9. ✓ Transitions: Smooth flow between all sections
10. ✓ Call-to-action: Clear and compelling
11. ✓ Closing: Memorable final line
12. ✓ Speakability: Flows naturally when read aloud
13. ✓ Authenticity: Genuine, not clichéd
14. ✓ Impact: Would move/inspire the audience

## SPEECH CONTEXT & DETAILS
${input}

## OUTPUT FORMAT
Write ONLY the complete speech ready to deliver. Do not include:
- Title or header (unless requested)
- Stage directions or meta-commentary
- Labels like"Opening:" or"Body:"
- Notes to the speaker
- Word count

Write as if the speaker will read this directly. Use natural paragraph breaks for breathing/pacing. Make every word count. Create something memorable that will resonate long after delivery.`;
};


const features = [
  {
    icon: Mic,
    title:"Multiple Occasions",
    description:"Create speeches for graduations, weddings, business events, awards, memorials, and motivational talks.",
  },
  {
    icon: Heart,
    title:"Tone Variety",
    description:"Choose from formal, heartfelt, humorous, or inspirational tones to match your speaking style.",
  },
  {
    icon: Target,
    title:"Custom Length",
    description:"Generate speeches from 2 to 10 minutes with precise word counts for perfect timing.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Share Details",
    desc:"Describe your speech requirements",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Tone",
    desc:"Choose occasion, length, and style",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Practice",
    desc:"Get your polished speech",
    icon: Mic,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Speech Writer?",
    answer:"The Speech Writer is an AI-powered tool that creates powerful, personalized speeches for any occasion. Whether you need a graduation speech, wedding toast, business presentation, or motivational talk, our AI crafts engaging content with the perfect tone, structure, and length. Perfect for public speaking, special events, or professional presentations.",
  },
  {
    question:"What occasions are covered?",
    answer:"We support six major occasions: Graduation (celebrating achievements and new beginnings), Wedding (toasts and vows), Business/Conference (professional presentations), Award Ceremony (honoring achievements), Memorial (paying tribute), and Motivational (inspiring audiences). Each occasion has specific guidance and structure.",
  },
  {
    question:"How do I personalize my speech?",
    answer:"Include specific names, personal stories, memories, dates, achievements, and relevant details in your input. The more context you provide (like 'my brother John,' 'fishing trip in 2020,' or 'team sales record'), the more personalized and authentic your speech will be.",
  },
  {
    question:"What speech lengths are available?",
    answer:"Choose from three lengths: 2 Minutes (300-400 words, quick and impactful), 5 Minutes (700-900 words, balanced and comprehensive), or 10 Minutes (1400-1600 words, detailed and thorough). Select based on your time slot and how much you want to cover.",
  },
  {
    question:"How do the tone options work?",
    answer:"Choose from four tones: Formal (professional and traditional), Heartfelt (emotional and sincere), Humorous (light and entertaining), or Inspirational (motivating and uplifting). The tone affects word choice, storytelling style, and emotional impact throughout the speech.",
  },
  {
    question:"Is the Speech Writer free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
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
    name:"Email Writer",
    slug:"email-writer",
    icon: MessageSquare,
    color:"text-purple-600",
  },
  {
    name:"Bio Generator",
    slug:"bio-generator",
    icon: Users,
    color:"text-green-600",
  },
  {
    name:"Cover Letter",
    slug:"cover-letter-writer",
    icon: Target,
    color:"text-orange-600",
  },
];

export default function SpeechWriterClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Speech Writer"
      toolSlug="speech-writer"
      tagline="Write memorable speeches for any occasion"
      description="Create powerful, personalized speeches for graduations, weddings, business events, and more. Choose your tone, length, and let AI craft the perfect words."
      badge="Public Speaking"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Write Your Speech"
      ctaDescription="Make an unforgettable impression with words that matter!"
      ctaButtonText="Start Writing"
      ctaIcon={Mic}
    >
      <EnhancedToolLayout
        toolSlug="speech-writer"
        toolName="Speech Writer"
        placeholder={`🎤 Describe your speech requirements...

Examples:
• Graduation speech for Class of 2026, theme: resilience and new beginnings, mention overcoming pandemic challenges
• Best man speech for my brother John's wedding, include story about our fishing trip where he met his bride
• Motivational speech for sales team Q4 kickoff meeting, focus on exceeding targets and teamwork
• Award acceptance speech for Employee of the Year, thank my team and mentor Sarah
• Wedding toast for my daughter Emma, share story about her childhood dream of becoming a doctor
• Business keynote on innovation in AI technology for tech conference with 500 attendees

💡 Tip: Include specific names, stories, themes, and personal details for a more authentic speech!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="🎤 Your Speech"
        generateButtonText="✨ Write Speech"
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
