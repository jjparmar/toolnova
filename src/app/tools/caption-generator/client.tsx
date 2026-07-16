"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Image,
  Instagram,
  Camera,
  Lightbulb,
  Sparkles,
  Hash,
  Users,
  Star,
  Zap,
  TrendingUp,
  Target,
  MessageSquare,
} from"lucide-react";

const toolOptions = [
  {
    id:"platform",
    label:"Platform",
    type:"select" as const,
    options: [
      { value:"instagram", label:"📸 Instagram" },
      { value:"facebook", label:"👥 Facebook" },
      { value:"linkedin", label:"💼 LinkedIn" },
      { value:"tiktok", label:"🎵 TikTok" },
      { value:"twitter", label:"🐦 Twitter/X" },
    ] as const,
    defaultValue:"instagram",
  },
  {
    id:"tone",
    label:"Tone",
    type:"select" as const,
    options: [
      { value:"casual", label:"😊 Casual" },
      { value:"professional", label:"👔 Professional" },
      { value:"funny", label:"😂 Funny" },
      { value:"inspirational", label:"✨ Inspirational" },
    ] as const,
    defaultValue:"casual",
  },
  {
    id:"includeHashtags",
    label:"Include Hashtags",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const platform = (options?.platform as string) ||"instagram";
  const tone = options?.tone ||"casual";
  const includeHashtags = options?.includeHashtags !== false;

  const platformStrategy: Record<string, string> = {
    instagram:"Visual storytelling platform. Algorithm favors engagement (saves, shares, comments). Captions can be long. First 1-2 lines crucial (before 'more'). Questions and CTAs boost interaction.",
    facebook:"Community-focused platform. Algorithm prioritizes meaningful conversations. Longer captions work well. Stories and emotional connections perform best. Encourage comments and shares.",
    linkedin:"Professional networking platform. Algorithm favors native content and engagement. Value-driven captions with insights. Professional tone but authentic. Use line breaks for readability.",
    tiktok:"Entertainment-first platform. Captions are secondary to video but add context. Keep ultra-short (1-2 sentences). Trend-aware language. Hook users who watch without sound.",
    twitter:"Real-time conversation platform. 280 character limit. Brevity is key. Thread-worthy insights perform well. Retweets matter. Clear, punchy, quotable content.",
  };

  const toneGuidelines: Record<string, string> = {
    casual:"Friendly, conversational, relatable. Use contractions, everyday language, and personality. Like chatting with a friend. Warm and approachable.",
    professional:"Polished, credible, value-focused. Industry-appropriate language. Share expertise and insights. Authoritative yet accessible. Business-minded.",
    funny:"Humorous, entertaining, witty. Use clever wordplay, puns, or observations. Self-aware and playful. Don't force jokes - natural humor works best.",
    inspirational:"Uplifting, motivational, empowering. Share wisdom, encouragement, and positive messages. Aspirational tone. Make readers feel inspired to take action.",
  };

  const hashtagStrategy: Record<string, string> | null = includeHashtags
    ? {
        instagram:"5-10 hashtags. Mix popular (100K+ posts), medium (10K-100K), and niche (under 10K). Place at end or in first comment.",
        facebook:"1-3 hashtags max. Facebook users don't engage heavily with hashtags. Keep minimal and relevant.",
        linkedin:"3-5 hashtags. Use industry-specific tags. Place at end. Help with discoverability in professional searches.",
        tiktok:"3-5 hashtags. Include trending tags + niche tags. Research current trending hashtags for your content type.",
        twitter:"1-3 hashtags. Keep concise due to character limit. Trend-aware hashtags can boost visibility.",
      }
    : null;

  return`You are an expert social media manager and content strategist specializing in high-engagement captions. Your task is to create scroll-stopping captions optimized for ${platform}'s algorithm and audience behavior.

## YOUR TASK
Write 3 distinct ${platform} captions with a ${tone} tone that maximize engagement and align with platform best practices.

## SPECIFICATIONS
**Platform**: ${platform.toUpperCase()} - ${platformStrategy[platform]}
**Tone**: ${tone.toUpperCase()} - ${toneGuidelines[tone]}
**Hashtags**: ${includeHashtags ? hashtagStrategy![platform] :"NO hashtags - caption text only"}
**Quantity**: Exactly 3 unique, distinct caption options

## PLATFORM-SPECIFIC OPTIMIZATION

### ${platform.toUpperCase()} Caption Strategy:

${
  platform ==="instagram"
    ?`**Length**: 125-150 words optimal (can go longer for storytelling)
**Hook**: First 1-2 lines must grab attention (visible before"more")
**Structure**: Hook → Story/Value → Call-to-Action
**Engagement Tactics**:
- Ask questions to spark comments
- Use emoji line breaks for scannability
- Include clear CTA (tag a friend, share thoughts, save for later)
- Carousel posts: Tease content in caption
**Algorithm Boost**: Saves > Shares > Comments > Likes`
    :""
}${
    platform ==="facebook"
      ?`**Length**: 40-80 words for high engagement (can be longer for stories)
**Structure**: Attention-grabbing opener → Story/insight → Discussion prompt
**Engagement Tactics**:
- Ask open-ended questions
- Encourage tagging friends
- Create conversation starters
- Share relatable experiences
**Algorithm Boost**: Meaningful conversations > Reactions > Shares`
      :""
  }${
    platform ==="linkedin"
      ?`**Length**: 150-200 words for thought leadership
**Structure**: Hook → Insight/Lesson → Value/Takeaway → CTA
**Formatting**: Use line breaks for readability (2-3 lines per paragraph)
**Engagement Tactics**:
- Share professional insights
- Ask for experiences/opinions
- Provide actionable advice
- Tag relevant professionals (when appropriate)
**Algorithm Boost**: Comments > Reactions > Shares`
      :""
  }${
    platform ==="tiktok"
      ?`**Length**: 1-2 sentences (ultra-short)
**Purpose**: Add context to video, not standalone content
**Structure**: Hook or question → Relate to video
**Engagement Tactics**:
- Reference video content directly
- Use trending phrases or sounds
- Encourage duets/stitches
- Ask viewers to comment answers
**Algorithm Boost**: Watch time > Shares > Comments`
      :""
  }${
    platform ==="twitter"
      ?`**Length**: 100-280 characters (punchy and complete)
**Structure**: Hook → Insight/Value (if space allows)
**Engagement Tactics**:
- Quotable and retweetable
- Clear, bold statements
- Questions that prompt replies
- Thread-starters for complex topics
**Algorithm Boost**: Retweets > Replies > Likes`
      :""
  }

## CAPTION WRITING FRAMEWORK

### 1. OPENING HOOK (First 1-2 Sentences)
**Purpose**: Stop the scroll immediately

Proven hook types:
- **Question**:"Ever felt like you're the only one who...?"
- **Bold Statement**:"This changed everything for me."
- **Relatable Confession**:"Real talk: I used to struggle with..."
- **Controversy/Hot Take**:"Unpopular opinion: [surprising view]"
- **Curiosity Gap**:"The secret to [desired outcome]? It's not what you think."
- **Direct Address**:"You need to hear this today..."

${tone ==="funny" ?"Use humor or wit in the opening to hook attention" : tone ==="inspirational" ?"Lead with powerful, uplifting statement" : tone ==="professional" ?"Open with valuable insight or question" :"Be relatable and conversational"}

### 2. BODY CONTENT (Middle Section)
- **Story**: Share personal experience or observation
- **Value**: Provide tip, insight, or lesson learned
- **Details**: ${platform ==="instagram" || platform ==="facebook" ?"Can elaborate with details and context" : platform ==="linkedin" ?"Professional insights with takeaways" :"Keep minimal - video is the star"}
- **Emotion**: ${tone ==="inspirational" ?"Build emotional connection and motivation" : tone ==="funny" ?"Deliver punchline or humorous payoff" :"Connect authentically with audience"}
- **Formatting**: ${platform ==="linkedin" || platform ==="instagram" ?"Use line breaks and spacing for readability" :"Keep tight and concise"}

### 3. CALL-TO-ACTION (Closing)
Include clear CTA to boost algorithm performance:

${platform ==="instagram" ?"- 'Save this for later' (saves boost reach)\n- 'Tag someone who needs this'\n- 'Drop a 💜 if you agree'\n- 'Share your experience in comments'" :""}${platform ==="facebook" ?"- 'What's your experience with this?'\n- 'Tag a friend who relates'\n- 'Share your thoughts below'\n- 'Who else feels this way?'" :""}${platform ==="linkedin" ?"- 'What's been your experience?'\n- 'Thoughts on this approach?'\n- 'How do you handle [situation]?'\n- 'Share your insights below'" :""}${platform ==="tiktok" ?"- 'Comment if you relate'\n- 'Duet this with your version'\n- 'Follow for more [content type]'\n- 'Which one are you?'" :""}${platform ==="twitter" ?"- 'Retweet if you agree'\n- 'Thoughts?'\n- 'Quote tweet with your take'\n- Thread-starting question" :""}

### 4. HASHTAG INTEGRATION
${
  includeHashtags
    ?`**Hashtag Strategy for ${platform}**: ${hashtagStrategy![platform]}

**Selection Criteria**:
- Relevant to content (not generic #love #instagood)
- Mix of popularity levels (high, medium, niche)
- Industry/niche-specific tags
- Location tags if relevant
- Branded hashtag if applicable

**Placement**: ${platform ==="instagram" ?"At the end after line breaks, or as first comment" : platform ==="facebook" ?"Integrated naturally in caption or at end (minimal)" : platform ==="linkedin" ?"At the very end of caption" : platform ==="tiktok" ?"Mixed with caption or at end" :"Integrated naturally (1-3 max)"}

**Format**: Space-separated with # symbol. Capitalize for readability (#SocialMediaTips)`
    :"NO HASHTAGS - Focus entirely on caption content quality"
}

## QUALITY CHECKPOINTS (For Each Caption)

Before finalizing each option, verify:
1. ✓ Length: Appropriate for ${platform} (${platform ==="instagram" ?"125-150 words" : platform ==="facebook" ?"40-80 words" : platform ==="linkedin" ?"150-200 words" : platform ==="tiktok" ?"1-2 sentences" :"100-280 characters"})
2. ✓ Hook: First line immediately grabs attention
3. ✓ Tone: Consistently ${tone} throughout
4. ✓ Platform: Optimized for ${platform} culture and algorithm
5. ✓ CTA: Clear call-to-action for engagement
6. ✓ ${includeHashtags ?`Hashtags: ${hashtagStrategy![platform].split(".")[0]}` :"No hashtags included"}
7. ✓ Formatting: ${platform ==="linkedin" || platform ==="instagram" ?"Line breaks for readability" :"Appropriate spacing"}
8. ✓ Engagement: Encourages comments, saves, or shares
9. ✓ Authentic: Genuine, not overly salesy or generic
10. ✓ Complete: Feels finished, not cut off
11. ✓ Distinct: Different angle/approach from other 2 options
12. ✓ No clichés: Avoid overused phrases

## PHOTO/POST DESCRIPTION
${input}

## OUTPUT FORMAT

Provide exactly 3 distinct captions in this format:

**Caption 1:**
[Complete first caption here${includeHashtags ?" with hashtags at the end" :""}]

**Caption 2:**
[Complete second caption here with different angle/approach${includeHashtags ?" with hashtags at the end" :""}]

**Caption 3:**
[Complete third caption here with unique perspective${includeHashtags ?" with hashtags at the end" :""}]

IMPORTANT:
- Each caption must be complete and ready to post
- Make each option distinctly different (varied hook, structure, or emphasis)
- ${includeHashtags ?"Include strategic hashtags matching the criteria above" :"No hashtags - caption only"}
- Do NOT include labels like"Hook:","Body:","CTA:" in the actual caption
- Do NOT add explanations or commentary
- Write as if posting directly to ${platform}

Create 3 scroll-stopping captions that drive engagement:`;
};


const features = [
  {
    icon: Target,
    title:"Multi-Platform Support",
    description:"Create captions optimized for Instagram, Facebook, LinkedIn, TikTok, and Twitter with platform-specific styles.",
  },
  {
    icon: Hash,
    title:"Smart Hashtag Suggestions",
    description:"Get 5-10 relevant, trending hashtags with each caption to boost discoverability and reach.",
  },
  {
    icon: Sparkles,
    title:"Multiple Caption Options",
    description:"Receive 3 unique caption variations per generation, each with a different angle and style.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Describe Post",
    desc:"Tell us about your photo or video",
    icon: Camera,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Pick Style",
    desc:"Choose platform and tone",
    icon: Image,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Captions",
    desc:"Copy and post instantly",
    icon: Sparkles,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Caption Generator?",
    answer:"The Caption Generator is an AI-powered tool that creates engaging social media captions for your photos and videos. It generates 3 unique captions with relevant hashtags, optimized for each platform's audience and style. Perfect for content creators, businesses, and anyone looking to boost their social media engagement.",
  },
  {
    question:"How many captions do I get?",
    answer:"You receive 3 unique caption options with each generation! This gives you multiple choices with different angles, styles, and calls-to-action. Pick your favorite or mix and match elements from different options to create the perfect caption.",
  },
  {
    question:"Are hashtags included?",
    answer:"Yes! When enabled, each caption includes 5-10 relevant, trending hashtags optimized for your content and platform. Hashtags are strategically chosen to increase discoverability and reach. You can toggle this feature on or off based on your preference.",
  },
  {
    question:"What platforms are supported?",
    answer:"We support Instagram, Facebook, LinkedIn, TikTok, and Twitter/X. Each platform has unique audience expectations and algorithm preferences, which our AI considers when creating captions. For example, Instagram captions focus on visual storytelling while LinkedIn captions are more professional and value-driven.",
  },
  {
    question:"How do the tone options work?",
    answer:"Choose from four tones: Casual (friendly and relatable), Professional (business-appropriate), Funny (humorous and entertaining), or Inspirational (motivating and uplifting). The tone affects word choice, emoji usage, and overall messaging style to match your brand voice.",
  },
  {
    question:"Is the Caption Generator free?",
    answer:"Yes! The Caption Generator is completely free to use. Create unlimited captions with hashtags for any platform without any cost. Perfect for influencers, businesses, content creators, or anyone looking to improve their social media presence and engagement.",
  },
];

const relatedTools = [
  {
    name:"Bio Generator",
    slug:"bio-generator",
    icon: Instagram,
    color:"text-pink-600",
  },
  {
    name:"Story Generator",
    slug:"story-generator",
    icon: Sparkles,
    color:"text-blue-600",
  },
  {
    name:"Email Writer",
    slug:"email-writer",
    icon: Lightbulb,
    color:"text-purple-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: MessageSquare,
    color:"text-green-600",
  },
];

export default function CaptionGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="Caption Generator"
      toolSlug="caption-generator"
      tagline="Create engaging social media captions"
      description="Generate scroll-stopping captions with hashtags for Instagram, TikTok, and more. Get 3 unique options every time!"
      badge="Social Media Pro"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Create Captions"
      ctaDescription="Boost your social media engagement with perfect captions!"
      ctaButtonText="Start Creating"
      ctaIcon={Camera}
    >
      <EnhancedToolLayout
        toolSlug="caption-generator"
        toolName="Caption Generator"
        placeholder={`📸 Describe your photo or post...

Examples:
• Beach sunset photo with my best friend enjoying vacation
• New product launch for my sustainable fashion line
• Healthy breakfast bowl I made this morning with avocado and eggs
• Behind-the-scenes of my photography studio setup
• Team celebration after completing major project milestone
• Morning workout routine at the gym showing progress
• Travel photo from mountain hiking adventure in Colorado

💡 Tip: Include details about the mood, setting, and context for more relevant captions!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📝 Your Captions"
        generateButtonText="✨ Generate Captions"
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
