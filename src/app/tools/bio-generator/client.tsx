"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  User,
  Instagram,
  Twitter,
  Linkedin,
  Sparkles,
  FileText,
  Users,
  Star,
  Zap,
  Target,
  Hash,
  TrendingUp,
} from"lucide-react";

const toolOptions = [
  {
    id:"platform",
    label:"Platform",
    type:"select" as const,
    options: [
      { value:"instagram", label:"📸 Instagram" },
      { value:"twitter", label:"🐦 Twitter/X" },
      { value:"linkedin", label:"💼 LinkedIn" },
      { value:"tiktok", label:"🎵 TikTok" },
      { value:"personal", label:"👤 Personal Website" },
    ] as const,
    defaultValue:"instagram",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"professional", label:"👔 Professional" },
      { value:"casual", label:"😊 Casual & Fun" },
      { value:"creative", label:"🎨 Creative" },
      { value:"witty", label:"😄 Witty" },
    ] as const,
    defaultValue:"casual",
  },
  {
    id:"includeEmojis",
    label:"Include Emojis",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const platform = options?.platform ||"instagram";
  const tone = options?.tone ||"casual";
  const includeEmojis = options?.includeEmojis !== false;

  const platformLimits: Record<string, string> = {
    instagram:"150 characters maximum (Instagram bio limit)",
    twitter:"160 characters maximum (Twitter/X bio limit)",
    linkedin:"220 characters maximum (LinkedIn headline + intro)",
    tiktok:"80 characters maximum (TikTok bio limit)",
    personal:"180-220 characters (optimal website/portfolio length)",
  };

  const platformStrategy: Record<string, string> = {
    instagram:"Visual platform culture - emphasize aesthetics, lifestyle, and personality. Include what you post about. Often uses line breaks and emojis. Can mention location or link.",
    twitter:"Concise expertise statement. Often includes: profession + specialty + personality trait. May reference what they tweet about. Hashtags rare in bios.",
    linkedin:"Professional headline format: [Role] | [Key Skills] | [Value Proposition]. Focus on expertise, achievements, and what you offer. Keyword-optimized for searches.",
    tiktok:"Ultra-short and attention-grabbing. Often just: content niche + personality/vibe. Gen Z friendly. Emojis common. Must hook immediately.",
    personal:"Comprehensive introduction for website/portfolio. Cover: who you are, what you do, unique value, and personality. Professional yet approachable.",
  };

  const toneGuidelines: Record<string, string> = {
    professional:"Polished, credible, achievement-focused. Use industry terminology. Highlight expertise and value. No slang. Authoritative tone.",
    casual:"Friendly, approachable, relatable. Conversational language. Show personality. Can use contractions. Warm and authentic.",
    creative:"Unique phrasing, metaphors, wordplay. Stand out with creative descriptions. Show artistic personality. Imaginative language.",
    witty:"Clever humor, puns, self-aware jokes. Entertaining while informative. Don't try too hard. Personality shines through humor.",
  };

  const emojiGuidance = includeEmojis
    ?"Use 1-2 relevant emojis per bio to add visual interest and personality. Place strategically (not random). Match platform culture."
    :"NO emojis - use words only. Create impact through language alone.";

  return`You are an expert social media strategist and personal branding specialist. Your task is to craft compelling, platform-optimized bios that capture attention and communicate identity effectively within strict character limits.

## YOUR TASK
Create 3 distinct ${platform} bio options with a ${tone} tone, each optimized for maximum impact.

## SPECIFICATIONS
**Platform**: ${platform.toUpperCase()} - ${platformStrategy[platform]}
**Character Limit**: ${platformLimits[platform]} (STRICT - count carefully)
**Tone**: ${tone.toUpperCase()} - ${toneGuidelines[tone]}
**Emoji Usage**: ${emojiGuidance}
**Quantity**: Exactly 3 unique, non-repetitive options

## PLATFORM-SPECIFIC OPTIMIZATION

### ${platform.toUpperCase()} Bio Best Practices:

${
  platform ==="instagram"
    ?`- Hook formula: [Descriptor] | [What you do] | [Location/Interest]
- Visual appeal: Use line breaks (|) for readability
- Personality first: Show who you are, not just credentials
- CTA optional:"👇 Latest post" or"Link below 🔗"
- Hashtags: Rarely used in Instagram bios (skip unless brand-specific)`
    :""
}${
    platform ==="twitter"
      ?`- Formula: [Job Title] + [Specialty] + [Personality/Interest]
- Keywords matter: Include searchable terms for your niche
- Punchy and direct: Every word counts
- Show expertise: What you know/do/create
- Optional: Add location or affiliation at end`
      :""
  }${
    platform ==="linkedin"
      ?`- Headline format: [Role] at [Company] | [Skills] | [Value Prop]
- SEO optimized: Include keywords people search for
- Achievement focus: Numbers, results, expertise
- Professional credibility: Certifications, specialties
- Clear value: What you bring to connections/employers`
      :""
  }${
    platform ==="tiktok"
      ?`- Ultra-concise: Get to the point in 5-8 words
- Content focus: What videos you make
- Vibe check: Personality/aesthetic in few words
- Gen Z language: Current, relatable, authentic
- Emojis common: 1-2 relevant ones work well`
      :""
  }${
    platform ==="personal"
      ?`- Full introduction: Name, role, background, expertise
- Unique value: What sets you apart
- Personality: Professional yet personable
- Current focus: What you're working on/passionate about
- Optional CTA: Invite connection/collaboration`
      :""
  }

## BIO WRITING FRAMEWORK

### 1. CORE COMPONENTS (Include 2-3)
- **Identity**: Who you are (role, profession, creator type)
- **Specialty**: What you focus on (niche, expertise, content type)
- **Personality**: Unique trait or interest (makes you memorable)
- **Value**: What you offer (why people should follow/connect)
- **Location/Affiliation**: Where or what org (if relevant)

### 2. CHARACTER OPTIMIZATION STRATEGY
- Every word must earn its place
- Cut filler words:"I am a","passionate about","lover of"
- Use symbols for brevity: | for separation, + for"and"
- Abbreviations where clear: CEO, NYC, AI, UX
- ${platform ==="linkedin" ?"Vertical bars | separate key points efficiently" : platform ==="instagram" ?"Line breaks (|) improve readability" :"Compact phrasing - no wasted characters"}

### 3. HOOK TECHNIQUES
- Lead with strongest identity:"${tone ==="professional" ?"Award-winning [Role]" : tone ==="creative" ?"Creative [descriptor] crafting [specialty]" : tone ==="witty" ?"Professional [role] by day, [funny trait] by night" :"Helping [audience] with [solution]"}"
- Use power words: Creator, Builder, Strategist, Expert, Founder
- Make it searchable: Include keywords for discoverability
- ${tone ==="witty" ?"Open with clever hook or unexpected twist" :"Direct and clear about your value"}

### 4. TONE EXECUTION
**${tone.toUpperCase()} TONE REQUIREMENTS**:
${tone ==="professional" ?"- Industry-standard terminology and credentials\n- Achievement-focused language\n- Authoritative without arrogance\n- Credibility markers (years, companies, results)" :""}${tone ==="casual" ?"- Conversational, friendly language\n- Show personality and authenticity\n- Relatable and approachable\n- Can use contractions and casual phrasing" :""}${tone ==="creative" ?"- Unique descriptions and metaphors\n- Artistic language and imagery\n- Stand out with creative phrasing\n- Show creative personality" :""}${tone ==="witty" ?"- Clever wordplay or humor\n- Self-aware and entertaining\n- Don't force jokes - be naturally funny\n- Balance wit with information" :""}

## QUALITY CHECKPOINTS (For Each Bio)

Before finalizing each option, verify:
1. ✓ Character count: Within ${platformLimits[platform]}
2. ✓ Platform: Optimized for ${platform} culture and norms
3. ✓ Tone: Consistently ${tone} throughout
4. ✓ Clarity: Immediately clear who they are/what they do
5. ✓ Memorable: Has hook or unique element
6. ✓ Searchable: Includes relevant keywords
7. ✓ Emojis: ${includeEmojis ?"1-2 relevant emojis used strategically" :"No emojis used"}
8. ✓ No filler: Every word adds value
9. ✓ Complete: Feels finished, not cut off
10. ✓ Distinct: Different from other 2 options (varied structure/emphasis)

## PERSON DETAILS
${input}

## OUTPUT FORMAT

Provide exactly 3 distinct bio options in this format:

**Option 1:**
[First complete bio here - character count must be within limit]

**Option 2:**
[Second complete bio here - different angle or emphasis]

**Option 3:**
[Third complete bio here - unique approach from first two]

IMPORTANT:
- Each bio must be complete and ready to use
- Count characters carefully (including spaces and emojis)
- Make each option distinctly different (varied structure, emphasis, or approach)
- Do NOT include character counts, explanations, or commentary
- Do NOT label with"Bio Option 1:" - use"**Option 1:**" format shown above
- Each bio should stand alone as a polished option

Create 3 bios that nail the ${platform} ${tone} vibe:
[First bio]

Bio Option 2:
[Second bio]

Bio Option 3:
[Third bio]`;
};


const features = [
  {
    icon: Target,
    title:"Platform-Optimized",
    description:"Bios tailored for Instagram, Twitter, LinkedIn, TikTok, and personal websites with proper character limits.",
  },
  {
    icon: Sparkles,
    title:"Multiple Options",
    description:"Get 3 different bio variations to choose from, each with a unique angle and style.",
  },
  {
    icon: TrendingUp,
    title:"Tone Variety",
    description:"Choose from professional, casual, creative, or witty tones to match your personal brand.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Share Info",
    desc:"Tell us about yourself or interests",
    icon: User,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Pick Platform",
    desc:"Choose where you'll use it",
    icon: Instagram,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get 3 Bios",
    desc:"Pick your favorite option",
    icon: Sparkles,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Bio Generator?",
    answer:"The Bio Generator is an AI-powered tool that creates engaging social media bios for various platforms. It generates 3 different bio options optimized for each platform's character limits and audience, helping you craft the perfect introduction for your profile.",
  },
  {
    question:"How many bios do I get?",
    answer:"You get 3 different bio options with each generation! This gives you multiple choices with different angles and styles, so you can pick the one that resonates most with your personal brand or combine elements from different options.",
  },
  {
    question:"What platforms are supported?",
    answer:"We support Instagram (150 chars), Twitter/X (160 chars), LinkedIn (220 chars), TikTok (80 chars), and Personal Websites (200 chars recommended). Each platform has unique character limits and style considerations that our AI takes into account.",
  },
  {
    question:"What character limits apply?",
    answer:"Bios are automatically optimized for each platform's specific limits: Instagram (150), Twitter (160), LinkedIn (220), TikTok (80), and Personal Website (200 recommended). The AI ensures your bio fits perfectly while conveying your message effectively.",
  },
  {
    question:"Can I control the tone?",
    answer:"Yes! Choose from four tones: Professional (formal and business-like), Casual & Fun (friendly and approachable), Creative (artistic and unique), or Witty (clever and humorous). You can also toggle emoji usage on or off.",
  },
  {
    question:"Is the Bio Generator free?",
    answer:"Yes! The Bio Generator is completely free to use. Create unlimited bios for any platform without any cost. Perfect for influencers, professionals, students, or anyone looking to improve their social media presence.",
  },
];

const relatedTools = [
  {
    name:"Caption Generator",
    slug:"caption-generator",
    icon: Instagram,
    color:"text-pink-600",
  },
  {
    name:"Cover Letter",
    slug:"cover-letter-writer",
    icon: FileText,
    color:"text-blue-600",
  },
  {
    name:"Resume Bullets",
    slug:"resume-bullets",
    icon: Sparkles,
    color:"text-purple-600",
  },
  {
    name:"Email Writer",
    slug:"email-writer",
    icon: Twitter,
    color:"text-green-600",
  },
];

export default function BioGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Bio Generator"
      toolSlug="bio-generator"
      tagline="Create the perfect social media bio"
      description="Generate catchy, platform-optimized bios for Instagram, Twitter, LinkedIn, and more. Get 3 unique options every time!"
      badge="Profile Booster"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Create Your Bio"
      ctaDescription="Stand out on social media with a bio that captures who you are!"
      ctaButtonText="Generate Bios"
      ctaIcon={Sparkles}
    >
      <EnhancedToolLayout
        toolSlug="bio-generator"
        toolName="Bio Generator"
        placeholder={`👤 Tell us about yourself...

Examples:
• Freelance photographer based in NYC, specializing in portrait and street photography, coffee enthusiast and dog lover
• Software engineer at tech startup, building AI tools, passionate about open source and teaching
• Travel blogger exploring Southeast Asia, foodie, yoga instructor, sharing adventures daily
• Marketing consultant helping small businesses grow, TEDx speaker, podcast host
• College student studying biology, aspiring doctor, volunteer at local hospital

💡 Tip: Include your profession, interests, location, and what makes you unique!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="✨ Your Bio Options"
        generateButtonText="🚀 Generate Bios"
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
