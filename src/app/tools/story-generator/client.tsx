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
  Sparkles,
  BookMarked,
  Users,
  Star,
  Zap,
  Feather,
  Target,
  Heart,
} from"lucide-react";

const toolOptions = [
  {
    id:"genre",
    label:"Genre",
    type:"select" as const,
    options: [
      { value:"fantasy", label:"🧙 Fantasy" },
      { value:"scifi", label:"🚀 Sci-Fi" },
      { value:"romance", label:"❤️ Romance" },
      { value:"mystery", label:"🔍 Mystery" },
      { value:"adventure", label:"⚔️ Adventure" },
      { value:"horror", label:"👻 Horror" },
    ] as const,
    defaultValue:"adventure",
  },
  {
    id:"length",
    label:"Story Length",
    type:"select" as const,
    options: [
      { value:"flash", label:"⚡ Flash Fiction (100-300 words)" },
      { value:"short", label:"📖 Short Story (500-800 words)" },
      { value:"detailed", label:"📚 Detailed (1000+ words)" },
    ] as const,
    defaultValue:"short",
  },
  {
    id:"audience",
    label:"Audience",
    type:"select" as const,
    options: [
      { value:"children", label:"👶 Children" },
      { value:"teens", label:"👦 Teens" },
      { value:"adults", label:"👨 Adults" },
    ] as const,
    defaultValue:"teens",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const genre = options?.genre ||"adventure";
  const length = options?.length ||"short";
  const audience = options?.audience ||"teens";

  const lengthWords: Record<string, string> = {
    flash:"100-300 words (ultra-concise, single scene or moment)",
    short:"500-800 words (complete narrative arc with depth)",
    detailed:"1000-1500 words (fully developed plot with rich details)",
  };

  const audienceGuidance: Record<string, string> = {
    children:"Simple vocabulary (grades 3-5 level), short sentences, clear moral lessons, positive themes, no violence or scary content, happy/hopeful endings.",
    teens:"Relatable teen issues, moderate vocabulary complexity, contemporary dialogue, coming-of-age themes, appropriate emotional depth, engaging pacing.",
    adults:"Sophisticated vocabulary, complex character psychology, mature themes, nuanced conflicts, literary techniques (symbolism, metaphor), open or ambiguous endings acceptable.",
  };

  const genreElements: Record<string, string> = {
    fantasy:"Magic system with clear rules, mythical creatures or supernatural beings, world-building (describe the setting), fantastical conflicts, sense of wonder and enchantment.",
    scifi:"Futuristic technology or scientific concepts, space/future setting details, exploration of 'what if' scenarios, believable science-based elements, innovation and discovery themes.",
    romance:"Emotional connection and chemistry between characters, relationship development arc (meeting → conflict → resolution), heartfelt dialogue, romantic tension, emotional vulnerability.",
    mystery:"Central puzzle or crime to solve, clues scattered throughout, red herrings to mislead, investigative process, suspenseful reveals, satisfying solution at the climax.",
    adventure:"Physical journey or quest, obstacles and challenges to overcome, discoveries and exploration, action sequences, character growth through trials, exciting pacing.",
    horror:"Eerie, unsettling atmosphere, building tension and dread, fear-inducing elements, psychological or supernatural threats, sensory descriptions (sounds, shadows), shocking or disturbing moments.",
  };

  return`You are an expert creative fiction writer and storytelling specialist. Your task is to craft an engaging, well-structured ${genre} story that captivates readers from start to finish.

## YOUR TASK
Write a complete ${genre} story for a ${audience} audience based on the provided premise.

## SPECIFICATIONS
**Genre**: ${genre.toUpperCase()} - ${genreElements[genre]}
**Target Length**: ${lengthWords[length]}
**Target Audience**: ${audience} - ${audienceGuidance[audience]}

## NARRATIVE STRUCTURE (Follow This Framework)

### 1. OPENING HOOK (First 1-2 paragraphs)
- Start with action, dialogue, or intriguing situation
- Immediately grab reader attention
- Establish tone and atmosphere
- Introduce protagonist in an engaging way
- Create questions in reader's mind

### 2. CHARACTER INTRODUCTION & SETTING
- Develop protagonist with clear personality traits
- Show character through actions and dialogue, not just description
- Establish the story world (time, place, atmosphere)
- ${audience ==="children" ?"Make characters relatable and likeable" : audience ==="teens" ?"Create authentic, complex teen characters" :"Develop psychologically realistic, flawed characters"}
- Set up character's goal or desire

### 3. RISING ACTION & CONFLICT
- Introduce the central problem or conflict
- Build tension progressively with obstacles
- Include 2-3 escalating complications
- ${length ==="flash" ?"Keep it tight - single conflict/resolution" :"Develop subplots or character relationships"}
- Use vivid sensory details to immerse readers
- Show character reactions and internal struggles

### 4. CLIMAX (Story Peak)
- Build to the most intense moment
- Protagonist faces the biggest challenge
- High stakes and emotional intensity
- Action, revelation, or critical decision point
- ${genre ==="mystery" ?"Reveal the solution to the puzzle" : genre ==="romance" ?"Emotional confession or breakthrough" :"Confrontation with the main obstacle"}

### 5. RESOLUTION & ENDING
- Resolve the main conflict satisfactorily
- Show how characters have changed/grown
- Tie up loose ends (unless intentional cliffhanger)
- ${audience ==="children" ?"Provide clear, positive conclusion with lesson" : audience ==="teens" ?"Hopeful or meaningful ending" :"Can be ambiguous, bittersweet, or thought-provoking"}
- Leave lasting impression with final image or line

## WRITING QUALITY STANDARDS

### Genre Authenticity
- Include ALL essential ${genre} elements listed above
- Meet reader expectations for ${genre} conventions
- Add unique twists to avoid clichés

### Show, Don't Tell
- Use action and dialogue to reveal character
- Describe sensory details (what characters see, hear, feel)
- Avoid stating emotions directly; show through behavior

### Engaging Prose
- Vary sentence length (mix short punchy sentences with flowing longer ones)
- Use strong, specific verbs (sprinted, whispered, shattered vs. went, said, broke)
- Include vivid imagery and metaphors
- ${audience ==="children" ?"Simple but descriptive language" : audience ==="teens" ?"Contemporary, energetic style" :"Literary, sophisticated prose"}

### Dialogue (if included)
- Make it natural and character-specific
- Use dialogue to advance plot or reveal character
- Balance with action and description
- ${audience ==="adults" ?"Can be subtle, layered with subtext" :"Clear and purposeful"}

### Pacing
- ${length ==="flash" ?"Move quickly, every word counts" : length ==="short" ?"Balanced pacing with key scene emphasis" :"Allow for slower character moments between action"}
- Cut unnecessary exposition
- End scenes with momentum

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Word count: ${lengthWords[length]} (count carefully)
2. ✓ All 5 narrative structure elements present
3. ✓ Genre: Clear ${genre} elements throughout
4. ✓ Audience: Appropriate for ${audience} (language, themes, content)
5. ✓ Opening: Immediately engaging hook
6. ✓ Characters: Well-developed with clear motivations
7. ✓ Conflict: Central problem clearly established and resolved
8. ✓ Climax: Emotionally satisfying peak moment
9. ✓ Ending: Provides closure and impact
10. ✓ Prose: Vivid, varied, showing rather than telling
11. ✓ Dialogue: Natural and purposeful (if included)
12. ✓ Consistency: No plot holes or contradictions
13. ✓ Engagement: Would hold reader attention throughout

## STORY PREMISE
${input}

## OUTPUT FORMAT
Write ONLY the complete story. Do not include:
- Title (unless specifically requested in premise)
- Author notes or explanations
- Genre labels or tags
-"Once upon a time" unless it fits naturally
- Meta-commentary about the story

Start directly with the narrative. Make every word count. Create something memorable.`;
};


const features = [
  {
    icon: BookOpen,
    title:"Multiple Genres",
    description:"Choose from Fantasy, Sci-Fi, Romance, Mystery, Adventure, or Horror to match your creative vision.",
  },
  {
    icon: Target,
    title:"Audience-Tailored",
    description:"Stories optimized for children, teens, or adults with appropriate language and themes.",
  },
  {
    icon: Feather,
    title:"Flexible Length",
    description:"From flash fiction (100 words) to detailed narratives (1000+ words) based on your needs.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Idea",
    desc:"Describe your story premise",
    icon: Lightbulb,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Pick Genre",
    desc:"Choose style, length, and audience",
    icon: BookMarked,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Read Story",
    desc:"Enjoy your unique creation",
    icon: BookOpen,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Story Generator?",
    answer:"The Story Generator is an AI-powered creative writing tool that creates original stories based on your ideas. Choose your genre, length, and target audience, and our AI crafts a complete narrative with engaging characters, plot development, and a satisfying conclusion. Perfect for creative writing, entertainment, or overcoming writer's block.",
  },
  {
    question:"What genres are available?",
    answer:"We offer six popular genres: Fantasy (magical elements and mythical worlds), Sci-Fi (futuristic technology and space), Romance (love stories and relationships), Mystery (puzzles and detective work), Adventure (exciting journeys and exploration), and Horror (suspenseful and scary tales). Each genre has specific storytelling elements.",
  },
  {
    question:"Can I specify characters and details?",
    answer:"Absolutely! Include character names, personality traits, settings, and specific plot points in your premise. The more details you provide, the more personalized your story will be. For example, 'A shy teenage girl discovers she can control fire and must save her village from dark forces.'",
  },
  {
    question:"What story lengths can I choose?",
    answer:"Choose from three lengths: Flash Fiction (100-300 words, quick reads), Short Story (500-800 words, balanced narratives), or Detailed (1000+ words, comprehensive tales). Flash fiction is great for quick creative exercises, while detailed stories offer full character development and plot complexity.",
  },
  {
    question:"How does audience selection work?",
    answer:"Select Children (ages 6-10) for simple, positive stories with age-appropriate themes. Choose Teens (13-18) for relatable, moderately complex narratives. Select Adults (18+) for sophisticated language and mature themes. The AI adjusts vocabulary, themes, and complexity accordingly.",
  },
  {
    question:"Is the Story Generator free?",
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
    name:"Speech Writer",
    slug:"speech-writer",
    icon: Lightbulb,
    color:"text-purple-600",
  },
  {
    name:"Bio Generator",
    slug:"bio-generator",
    icon: Pencil,
    color:"text-green-600",
  },
  {
    name:"Caption Generator",
    slug:"caption-generator",
    icon: Sparkles,
    color:"text-orange-600",
  },
];

export default function StoryGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Story Generator"
      toolSlug="story-generator"
      tagline="Create captivating stories in any genre"
      description="Generate unique short stories, flash fiction, or detailed narratives based on your ideas. Perfect for creative writing, entertainment, or inspiration."
      badge="Creative Writing"
      category="Writing Tools"
      categorySlug="writing-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Start Your Story"
      ctaDescription="Every great story starts with an idea. Let AI bring yours to life!"
      ctaButtonText="Create Story"
      ctaIcon={BookOpen}
    >
      <EnhancedToolLayout
        toolSlug="story-generator"
        toolName="Story Generator"
        placeholder={`🎭 Enter your story idea or premise...

Examples:
• A young wizard discovers a hidden power on their 13th birthday and must decide whether to use it for good or evil
• Two strangers meet on a train to Paris and realize they're connected by a mysterious past
• A detective receives a cryptic letter from the future warning about a crime that hasn't happened yet
• In a world where emotions are illegal, a rebel starts feeling again
• A teenage girl finds a portal in her grandmother's attic that leads to a parallel universe
• A group of friends discover their town is built on an ancient burial ground

💡 Tip: Include specific characters, settings, or plot twists for more personalized stories!`}
        inputRows={8}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📖 Your Story"
        generateButtonText="✨ Generate Story"
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
