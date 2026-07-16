"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  BookOpen,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Quote,
  Users,
  Star,
  Clock,
  Brain,
  Globe,
  BookMarked,
} from"lucide-react";

const toolOptions: ToolOption[] = [
  {
    id:"category",
    label:"Category",
    type:"select" as const,
    options: [
      { value:"general", label:"📋 General" },
      { value:"business", label:"💼 Business" },
      { value:"academic", label:"🎓 Academic" },
      { value:"conversational", label:"💬 Conversational" },
    ],
    defaultValue:"general",
  },
  {
    id:"region",
    label:"English Variant",
    type:"select" as const,
    options: [
      { value:"global", label:"🌍 Global" },
      { value:"american", label:"🇺🇸 American" },
      { value:"british", label:"🇬🇧 British" },
    ],
    defaultValue:"global",
  },
  {
    id:"count",
    label:"Number of Idioms",
    type:"select" as const,
    options: [
      { value:"10", label:"10 Idioms" },
      { value:"20", label:"20 Idioms" },
      { value:"30", label:"30 Idioms" },
      { value:"50", label:"50 Idioms" },
    ],
    defaultValue:"20",
  },
  {
    id:"include",
    label:"Include",
    type:"select" as const,
    options: [
      { value:"all", label:"✨ Everything" },
      { value:"meaning", label:"📖 Meaning Only" },
      { value:"origin", label:"📜 Meaning + Origin" },
      { value:"examples", label:"💡 Meaning + Examples" },
    ],
    defaultValue:"all",
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const category = options?.category ||"general";
  const region = options?.region ||"global";
  const count = options?.count ||"20";
  const include = options?.include ||"all";

  const categoryGuidance: Record<string, string> = {
    general:"GENERAL: Include versatile idioms and phrases used across contexts—daily conversation, writing, and speaking. Prioritize widely recognized expressions with high practical utility.",
    academic:"ACADEMIC/FORMAL: Focus on idioms and phrases appropriate for essays, research writing, formal speeches, and professional documents. Include expressions used in analytical and argumentative writing (e.g., 'the crux of the matter', 'by and large').",
    competitive:"COMPETITIVE EXAMS: Focus on idioms frequently tested in GRE, SAT, IELTS, UPSC, SSC, Banking, and CAT exams. Prioritize expressions that appear in reading comprehension passages and verbal reasoning. Include commonly tested idiomatic pairs and confusing expressions.",
    conversational:"CONVERSATIONAL: Focus on everyday spoken English idioms and colloquial phrases. Include expressions used in casual conversation, social media, and informal writing. Prioritize natural, contemporary usage.",
    literary:"LITERARY: Focus on idioms and phrases found in classic and contemporary literature, poetry, and creative writing. Include expressions with rich imagery and cultural depth.",
  };

  const regionGuidance: Record<string, string> = {
    global:"GLOBAL ENGLISH: Include widely understood idioms used across English-speaking cultures. Avoid highly region-specific expressions that might be unknown elsewhere.",
    american:"AMERICAN ENGLISH: Include idioms specific to or predominantly used in American English. Include expressions from American culture, sports (baseball, football), and history.",
    british:"BRITISH ENGLISH: Include idioms specific to or predominantly used in British English. Include expressions rooted in British culture, history, and traditions.",
    indian:"INDIAN ENGLISH: Include idioms commonly used in Indian English, as well as translated expressions from Hindi and regional languages. Focus on phrases frequently tested in Indian competitive exams (UPSC, SSC, Banking).",
  };

  const includeConfig: Record<string, string> = {
    all:"FULL ANALYSIS: Include meaning, origin/etymology, 2 example sentences, similar expressions, formality level, and usage notes.",
    origin:"MEANING + ORIGIN: Include meaning and fascinating origin/etymology story. Focus on the historical context that gave rise to each expression.",
    examples:"MEANING + EXAMPLES: Include meaning and 2 practical example sentences showing natural usage in context.",
    basic:"MEANING ONLY: Include clear, concise meaning. Keep output scannable for quick reference.",
  };

  return`You are an expert phraseologist, idiom specialist, and English language educator with deep knowledge of figurative language across cultures and historical periods. You specialize in curating idiom collections that maximize language fluency, exam performance, and expressive communication.

## YOUR TASK
Provide ${count} carefully curated idioms and phrases related to the given topic, optimized for ${category} usage in ${region} English.

## SPECIFICATIONS
**Count**: ${count} idioms and phrases
**Category**: ${category.toUpperCase()} - ${categoryGuidance[category]}
**Region**: ${region.toUpperCase()} - ${regionGuidance[region]}
**Detail Level**: ${include.toUpperCase()} - ${includeConfig[include]}

## IDIOM CURATION FRAMEWORK

### SELECTION CRITERIA
- **Relevance**: Each idiom must clearly relate to the given topic/keyword
- **Utility**: Prioritize expressions the learner will actually encounter and can use
- **Recognition**: ${category ==="competitive" ?"Include frequently tested expressions from past exam papers" :"Include widely recognized expressions"}
- **Diversity**: Mix metaphorical, proverbial, and phrasal expressions
- **Progression**: Order from most common/useful to more specialized
- **Uniqueness**: No overlapping or near-identical expressions

### IDIOM ANALYSIS STRUCTURE

For EACH idiom/phrase:

${include ==="all" ?`**[Number]."[IDIOM/PHRASE]"**
- **Meaning**: [Clear, precise definition of the figurative meaning — what it ACTUALLY means when used, not the literal interpretation]
- **Literal vs. Figurative**: [Brief note on the gap between literal and intended meaning]
- **Origin**: 📜 [Fascinating etymological story — when, where, and why this expression originated. Make it memorable!]
- **Example 1**:"[Formal/written context demonstrating natural usage]"
- **Example 2**:"[Conversational context showing everyday usage]"
- **Similar Expressions**: [2-3 related idioms or phrases with similar meanings]
- **Register**: Casual / Neutral / Formal / Literary
- **Usage Note**: 💡 [When to use this expression, when to avoid it, and any cultural sensitivity considerations]
${category ==="competitive" ?"- **Exam Tip**: [How this idiom typically appears in exam questions — as the answer, as a distractor, or in reading passages]" :""}` :""}

${include ==="origin" ?`**[Number]."[IDIOM/PHRASE]"**
- **Meaning**: [Clear figurative meaning]
- **Origin**: 📜 [Detailed, fascinating etymology — the story behind the expression. Include historical period, cultural context, and how it evolved to its current meaning. Make it engaging and memorable!]` :""}

${include ==="examples" ?`**[Number]."[IDIOM/PHRASE]"**
- **Meaning**: [Clear figurative meaning]
- **Example 1**:"[Formal sentence showing natural usage]"
- **Example 2**:"[Conversational sentence showing everyday usage]"` :""}

${include ==="basic" ?`**[Number]."[IDIOM/PHRASE]"** — [concise figurative meaning]` :""}

### ORGANIZATION

Group idioms by sub-theme or conceptual category where natural:
- **[Sub-theme 1]** (e.g., Success & Achievement)
  - [Idioms]
- **[Sub-theme 2]** (e.g., Failure & Difficulty)
  - [Idioms]

If the topic doesn't naturally subdivide, organize by frequency of use (most common first).

${include ==="all" ?`### COMPARISON TABLE

| # | Idiom | Meaning (Brief) | Register | Region |
| --- | --- | --- | --- | --- |
| 1 | [Idiom] | [2-3 word meaning] | Formal/Informal | US/UK/Global |
[Continue for all]` :""}

${category ==="competitive" ?`### EXAM STRATEGY NOTES
- Flag idioms that are"favorites" in specific exam types
- Note commonly confused idiom pairs (e.g.,"break the ice" vs."break the mold")
- Identify idioms where the literal interpretation is tested as a distractor` :""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Exactly ${count} idioms/phrases are provided
2. ✓ All idioms genuinely relate to the given topic
3. ✓ Figurative meanings are accurately explained (not literal translations)
4. ✓ ${include ==="all" || include ==="origin" ?"Origins are historically accurate and engaging" :"Meanings are clear and concise"}
5. ✓ ${include ==="all" || include ==="examples" ?"Example sentences demonstrate natural, idiomatic usage" :"Definitions are easy to understand"}
6. ✓ ${region}-appropriate expressions are prioritized
7. ✓ No duplicate or near-identical phrases
8. ✓ Idioms are ordered from most common to more specialized
9. ✓ Register labels are accurate (formal/informal/neutral)
10. ✓ ${category ==="competitive" ?"Exam-relevant idioms are highlighted" :"Practical usage context is clear"}

## TOPIC/KEYWORD
${input}

## OUTPUT FORMAT

Use numbered list with consistent formatting. Group by sub-theme where applicable. ${include ==="all" ?"Include the comparison table at the end." :""} Bold idiom phrases.

Do NOT include:
- Expressions unrelated to the given topic
- Made-up or non-standard idioms
- Incorrect etymologies (say"origin uncertain" if unknown)
- Overly obscure regional expressions (unless specifically relevant to ${region})
- Your commentary about the curation process

Provide an expertly curated idioms and phrases collection:`;
};


const features = [
  {
    icon: Globe,
    title:"Cultural Context",
    desc:"Learn idioms with their origins and cultural significance for deeper understanding.",
  },
  {
    icon: Brain,
    title:"Exam-Focused",
    desc:"Perfect for IELTS, TOEFL, and competitive exams that test idiomatic expressions.",
  },
  {
    icon: Sparkles,
    title:"Usage Examples",
    desc:"See idioms used in real sentences to understand proper context and application.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Type a theme, emotion, or keyword you want idioms about",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Select Options",
    desc:"Choose category, region, and what information to include",
    icon: Quote,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Learn Idioms",
    desc:"Get comprehensive list with meanings, origins, and examples",
    icon: Sparkles,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Vocabulary Builder",
    slug:"vocabulary-builder",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"One Word Substitution",
    slug:"one-word-substitution",
    icon: Sparkles,
    color:"text-emerald-600",
  },
  {
    name:"Synonym Finder",
    slug:"synonym-finder",
    icon: Lightbulb,
    color:"text-teal-600",
  },
  {
    name:"Paraphraser",
    slug:"paraphraser",
    icon: MessageCircle,
    color:"text-green-600",
  },
];

const faqs = [
  {
    question:"What are idioms and phrases in English language?",
    answer:"Idioms and phrases are expressions whose meanings cannot be understood from the literal definitions of individual words. An idiom like 'raining cats and dogs' doesn't actually involve animals falling from the sky—it means raining heavily. These figurative expressions are fundamental to natural, fluent English communication because native speakers use them constantly in everyday conversation, writing, and formal discourse. Idioms typically have fixed structures and cannot be translated word-for-word into other languages, which makes them challenging for English learners but essential for achieving native-like fluency. They fall into several categories: pure idioms have completely non-literal meanings (kick the bucket = die), semi-idioms combine literal and figurative elements (foot the bill uses 'foot' figuratively but 'bill' literally), and prepositional phrases function idiomatically (in a nutshell, on the fence). Understanding idioms requires cultural knowledge because many originate from historical events, literature, occupations, or cultural practices specific to English-speaking countries. For example, 'the whole nine yards' may come from World War II aircraft ammunition belts, and 'break the ice' dates back to literal ice-breaking ships. Learning idioms improves comprehension of movies, books, news, and conversations while making your own English sound more natural and sophisticated. They add color, emotion, and cultural authenticity to communication, which is why English proficiency exams like IELTS, TOEFL, and Cambridge tests specifically evaluate idiomatic usage in speaking and writing sections.",
  },
  {
    question:"How can I learn and remember idioms effectively?",
    answer:"Learning idioms effectively requires strategic approaches that go beyond simple memorization. First, learn idioms in thematic groups—study all time-related idioms together (against the clock, in the nick of time, once in a blue moon) or emotion-related expressions (on cloud nine, down in the dumps, over the moon). This creates mental networks that improve retention. Second, understand the origin or etymology when available. Knowing that 'spill the beans' comes from ancient Greek voting with beans makes it memorable. Origins provide hooks for memory and deepen cultural understanding. Third, create vivid mental images. For 'let the cat out of the bag,' imagine literally revealing a hidden cat—visual associations strengthen memory. Fourth, practice using idioms in your own sentences immediately after learning them. Write three original sentences for each new idiom, varying contexts and tenses. This moves idioms from passive recognition to active usage. Fifth, encounter idioms in multiple contexts through reading English novels, watching shows with subtitles, and listening to podcasts. Repeated exposure in varied situations helps you understand appropriate usage. Sixth, use flashcard systems with spaced repetition—review idioms at increasing intervals (1 day, 3 days, 1 week, 1 month). Seventh, learn idioms with their grammatical patterns and common collocations. 'Make' collocates with many idioms (make ends meet, make a mountain out of a molehill), as does 'break' (break the ice, break a leg). Understanding these patterns helps you recognize and produce idioms correctly. Finally, be aware of formality levels and register—'piece of cake' is casual, while 'easier said than done' works in formal contexts. Don't use informal idioms in academic essays or formal business communication.",
  },
  {
    question:"Is this tool suitable for non-native English speakers and ESL students?",
    answer:"Absolutely! This idiom finder is specifically designed to support English as a Second Language (ESL) and English as a Foreign Language (EFL) learners at all proficiency levels. Learning idioms is one of the most challenging aspects of language acquisition because they require cultural knowledge, can't be translated literally, and don't follow regular grammar rules. Our tool addresses these challenges by providing not just lists of idioms but comprehensive explanations including meanings in clear, simple English that intermediate learners can understand, cultural context and origins that help you grasp why expressions exist, example sentences demonstrating proper usage in realistic situations, formality level indicators so you know when idioms are appropriate, and regional variations noting differences between American and British English. For beginners, we recommend starting with common, useful idioms for everyday topics (time, weather, emotions) at 10-20 idioms per session. Intermediate learners can explore business and academic idioms while expanding to 30-50 idioms with origins included. Advanced learners should focus on nuanced expressions, less common idioms, and appropriate usage in formal contexts. The tool categorizes idioms by context (general, business, academic, conversational) which helps you learn expressions relevant to your goals—business English learners can focus on workplace idioms, while students preparing for IELTS can study conversational expressions commonly tested in speaking modules. Understanding idioms dramatically improves listening comprehension—when you hear native speakers say 'I'm all ears' or 'it's not rocket science,' you'll understand immediately rather than being confused. It also helps with reading comprehension in newspapers, novels, and online content where idioms appear frequently. Most importantly for ESL students, appropriate idiomatic usage demonstrates advanced proficiency and cultural integration, which is specifically tested and valued in English proficiency exams and real-world communication.",
  },
  {
    question:"When should I use idioms in my speaking and writing?",
    answer:"Using idioms appropriately requires understanding context, audience, and purpose. In speaking, idioms make conversation more natural, engaging, and native-like, but timing matters. Use idioms in informal conversations with friends, casual business discussions, storytelling and anecdotes, and IELTS/TOEFL speaking tests where they demonstrate fluency. However, avoid idioms in formal presentations unless you're certain of appropriateness, technical discussions where precision is crucial, and conversations with non-native speakers who may not understand. In writing, idioms work well in creative writing and fiction where they add color and character voice, opinion pieces and blogs where conversational tone is acceptable, and personal statements or narratives for college applications. However, minimize or avoid idioms in academic essays and research papers (they're considered too informal), technical or scientific writing where literal precision is required, business reports and formal documents, and legal or medical writing where misunderstanding could have serious consequences. The key is matching idiom formality to context. Some idioms like 'make ends meet' or 'turn over a new leaf' are acceptable in semi-formal contexts, while slang-based idioms like 'piece of cake' or 'hit the sack' should stay casual. For English learners, start by using idioms you're absolutely confident about—it's better to use three idioms correctly than ten inappropriately. Pay attention to native speakers' usage patterns in similar contexts. In exams like IELTS, examiners look for natural idiomatic usage as one marker of advanced proficiency, but forced or incorrect usage hurts your score more than not using idioms at all. The golden rule: use idioms when they naturally fit your meaning and when you're certain about their connotation and appropriateness. Don't insert them artificially just to sound sophisticated. Native speakers unconsciously choose idioms that perfectly match their intended emphasis and tone—develop this intuition through extensive reading and listening to authentic English materials.",
  },
  {
    question:"What's the difference between formal and informal idioms?",
    answer:"The formality level of idioms significantly impacts where and when they should be used, just like other vocabulary choices. Informal idioms are casual, colloquial expressions appropriate for conversations with friends, social media, texts and emails to familiar people, and casual storytelling. Examples include 'piece of cake' (easy), 'hit the hay' (go to sleep), 'spill the beans' (reveal a secret), 'cost an arm and a leg' (expensive), and 'chicken out' (lose courage). These often have playful or slang-like qualities and may sound childish or unprofessional in formal settings. Neutral idioms work across multiple contexts and are safe choices for most situations, including business communication, classroom discussions, newspaper articles, and everyday conversation. Examples include 'turn over a new leaf' (start fresh), 'miss the boat' (miss an opportunity), 'the ball is in your court' (it's your turn to act), 'keep an eye on' (monitor), and 'break the ice' (ease tension). These maintain professionalism while adding expressiveness. Formal idioms appear in business writing, academic discussions, news reporting, and professional presentations. Examples include 'at the end of the day' (ultimately), 'by and large' (generally), 'in light of' (considering), 'take into account' (consider), and 'come to terms with' (accept). These sound sophisticated and appropriate in serious contexts. The distinction matters because using informal idioms in formal contexts makes you seem unprofessional or immature, while using overly formal idioms in casual conversation can sound stiff or pretentious. For English learners, start with neutral idioms that work in most situations, then gradually expand to context-specific expressions. Our tool labels each idiom's formality level to guide your choices. When in doubt, err on the side of formality in professional or academic contexts—it's better to sound slightly formal than inappropriately casual. Regional differences also affect formality; some British idioms sound formal to American ears and vice versa. Always consider your audience's expectations and the communication setting before choosing which idioms to use.",
  },
  {
    question:"Can this help with English proficiency exams like IELTS and TOEFL?",
    answer:"Yes, this idiom finder is specifically valuable for IELTS, TOEFL, Cambridge English, and other proficiency exams that assess idiomatic language use as a marker of advanced English competence. In IELTS speaking tests, examiners evaluate 'lexical resource'—your range and accuracy of vocabulary including appropriate idiom usage. Using 3-5 well-placed idioms naturally during your speaking test can boost your band score from 6.5 to 7 or higher, but they must fit naturally and be used correctly. Forced or inappropriate idiom usage actually lowers your score. For IELTS writing Task 2 essays, carefully selected neutral or formal idioms demonstrate sophisticated language command, though overuse is penalized. In TOEFL speaking and writing sections, idioms show you can understand and produce language as native speakers do, but again, quality trumps quantity. Focus on idioms related to common exam topics: education and learning, technology and innovation, environment and sustainability, work and career, health and lifestyle, culture and society, and relationships and communication. Our tool helps you generate idioms for specific topics you're likely to encounter in exam questions. For optimal exam preparation, learn 50-100 common idioms across these topics, practice using them in response to sample questions, record yourself speaking to check if idiom usage sounds natural, get feedback from teachers or native speakers, and study model answers to see how high-scoring responses incorporate idioms. Remember that reading comprehension sections also test idiom recognition—passages often include idiomatic expressions, and questions may ask about their meaning in context. Our detailed explanations and example sentences prepare you for these questions. The key to exam success with idioms is understanding that examiners want to hear natural, appropriate usage that enhances communication—not forced inclusion of expressions you barely understand. Use our tool to learn idioms thoroughly, including meanings, contexts, and examples, so they become part of your active vocabulary rather than memorized phrases you awkwardly insert.",
  },
];

const placeholders = ["Time and Patience","Success and Achievement","Weather and Nature","Money and Wealth","Love and Relationships","Work and Career","Food and Eating","Communication and Speaking","Emotions and Feelings","Challenges and Difficulties",
];

export default function IdiomsPhrasesClient() {
  return (
    <PremiumToolWrapper
      toolName="Idioms & Phrases"
      toolSlug="idioms-phrases"
      tagline="Master idioms to enrich your language"
      description="Learn idioms with meanings, origins, examples, and similar expressions for any topic. Perfect for IELTS, TOEFL, and fluent communication."
      badge="Language Master"
      category="Exam Prep Tools"
      categorySlug="exam-prep-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
    >
      <EnhancedToolLayout
        toolSlug="idioms-phrases"
        toolName="Idioms & Phrases Finder"
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
        promptTemplate={generatePrompt}
        inputRows={4}
        toolOptions={toolOptions}
        resultLabel="💬 Idioms & Phrases"
        generateButtonText="📖 Get Idioms"
        inputLabel="📚 Topic or Theme"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        supportedFormats={["text","markdown"]}
      />
      <FAQSection faqs={faqs} />
    </PremiumToolWrapper>
  );
}
