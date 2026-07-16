"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  BookOpen,
  Brain,
  Lightbulb,
  BookMarked,
  Target,
  ClipboardList,
  Users,
  Star,
  Clock,
  GraduationCap,
  Award,
  Sparkles,
} from"lucide-react";

const toolOptions: ToolOption[] = [
  {
    id:"wordCount",
    label:"Word Count",
    type:"select",
    options: [
      { value:"10", label:"10 Words" },
      { value:"20", label:"20 Words" },
      { value:"30", label:"30 Words" },
      { value:"50", label:"50 Words" },
    ],
    defaultValue:"20",
  },
  {
    id:"level",
    label:"Vocabulary Level",
    type:"select",
    options: [
      { value:"basic", label:"📚 Basic" },
      { value:"intermediate", label:"📖 Intermediate" },
      { value:"advanced", label:"🎓 Advanced" },
      { value:"competitive", label:"🏆 Competitive Exams" },
    ],
    defaultValue:"intermediate",
  },
  {
    id:"category",
    label:"Category",
    type:"select",
    options: [
      { value:"general", label:"📋 General" },
      { value:"academic", label:"🎓 Academic" },
      { value:"business", label:"💼 Business" },
      { value:"gre-sat", label:"📝 GRE/SAT" },
      { value:"technical", label:"💻 Technical" },
    ],
    defaultValue:"general",
  },
  {
    id:"includeExtras",
    label:"Include",
    type:"select",
    options: [
      { value:"all", label:"✨ Everything" },
      { value:"basic", label:"📝 Definitions Only" },
      { value:"examples", label:"💡 With Examples" },
      { value:"mnemonics", label:"🧠 With Memory Tips" },
    ],
    defaultValue:"all",
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const wordCount = options?.wordCount ||"20";
  const level = options?.level ||"intermediate";
  const category = options?.category ||"general";
  const includeExtras = options?.includeExtras ||"all";

  const levelGuidance: Record<string, string> = {
    basic:"BASIC (CEFR A1-A2): High-frequency everyday vocabulary. Simple definitions and everyday example sentences. Ideal for beginners building a foundation.",
    intermediate:"INTERMEDIATE (CEFR B1-B2 / GRE ~150): Academic and professional vocabulary found in textbooks, news, and formal writing. Clear definitions with moderate complexity.",
    advanced:"ADVANCED (CEFR C1 / GRE 155-165): Sophisticated vocabulary for essays and exams. Precise definitions, nuanced meanings, formal register.",
    competitive:"COMPETITIVE EXAMS (GRE/GMAT/SAT/IELTS): High-frequency test words, reading-passage vocabulary, and verbal-reasoning terms. Precise definitions + exam-useful examples.",
  };

  // Keys MUST match toolOptions category values
  const categoryGuidance: Record<string, string> = {
    general:"GENERAL: Diverse high-utility vocabulary—abstract concepts, descriptive words, action verbs, and modifiers across topics.",
    academic:"ACADEMIC: Scholarly writing terms (e.g. elucidate, paradigm, empirical), transitions, and abstract reasoning words.",
    business:"BUSINESS: Corporate and workplace vocabulary for emails, reports, strategy, leadership, and meetings.","gre-sat":"GRE/SAT: High-frequency exam words for verbal reasoning and reading comprehension. Prioritize tested items over obscure rarities.",
    technical:"TECHNICAL: STEM and tech-adjacent vocabulary (systems, data, engineering, product) with accessible definitions for non-experts.",
  };

  const extrasConfig: Record<string, string> = {
    all:"FULL ANALYSIS: Include definition, part of speech, pronunciation guide, example sentence, 2-3 synonyms, 1-2 antonyms, etymology/word roots, and memory tip/mnemonic for every word.",
    examples:"DEFINITIONS + EXAMPLES: Include clear definition, part of speech, and 2 example sentences (one formal, one conversational) for each word. Skip etymology and mnemonics.",
    mnemonics:"DEFINITIONS + MEMORY AIDS: Include definition, part of speech, and a creative mnemonic device, visual association, or memory trick for each word. Prioritize retention techniques.",
    basic:"DEFINITIONS ONLY: Include concise, clear definition and part of speech. Keep output clean and scannable for quick reference.",
  };

  return`You are an expert lexicologist, vocabulary acquisition specialist, and language educator who designs evidence-based word lists using spaced repetition principles, etymological analysis, and contextual learning theory. You specialize in preparing students for competitive exams (GRE, SAT, GMAT, IELTS, UPSC) and academic excellence.

## YOUR TASK
Generate ${wordCount} carefully curated ${level}-level vocabulary words for ${category} learning, with comprehensive analysis designed to maximize retention and practical usage.

## SPECIFICATIONS
**Word Count**: ${wordCount} words
**Level**: ${level.toUpperCase()} - ${levelGuidance[level] || levelGuidance.intermediate}
**Category**: ${category.toUpperCase()} - ${categoryGuidance[category] || categoryGuidance.general}
**Detail**: ${includeExtras.toUpperCase()} - ${extrasConfig[includeExtras] || extrasConfig.all}

## VOCABULARY GENERATION FRAMEWORK

### WORD SELECTION CRITERIA
- **Utility**: Choose words the learner will actually encounter and use
- **Difficulty calibration**: Match ${level} level precisely — not too easy, not too hard
- **Diversity**: Mix nouns, verbs, adjectives, and adverbs; avoid clustering one part of speech
- **Exam relevance**: ${category ==="gre-sat" || level ==="competitive" ?"Prioritize frequently tested exam vocabulary" :"Include words commonly seen in academic and professional contexts"}
- **Progressive complexity**: Order words from slightly easier to harder within the set
- **No repeats**: Each word must be unique and distinct from others in the list

### WORD ANALYSIS STRUCTURE

For EACH word, present:

${includeExtras ==="all" ?`**[Number]. [WORD]** /pronunciation/  *(part of speech)*
- **Definition**: Clear, precise meaning (primary definition first, secondary if common)
- **Example 1**:"[Formal/academic sentence demonstrating correct usage]"
- **Example 2**:"[Conversational/practical sentence showing natural usage]"
- **Synonyms**: [2-3 words with subtle difference notes]
- **Antonyms**: [1-2 opposite words]
- **Word Roots**: [Etymology — Latin/Greek roots, prefixes, suffixes explained]
- **Memory Tip**: 💡 [Creative mnemonic, visual association, story, or wordplay that makes this word stick]
- **Usage Note**: [Register (formal/informal), common collocations, or frequent exam context]` :""}

${includeExtras ==="examples" ?`**[Number]. [WORD]**  *(part of speech)*
- **Definition**: Clear, precise meaning
- **Example 1**:"[Formal sentence]"
- **Example 2**:"[Conversational sentence]"` :""}

${includeExtras ==="mnemonics" ?`**[Number]. [WORD]**  *(part of speech)*
- **Definition**: Clear, precise meaning
- **Memory Tip**: 💡 [Creative mnemonic device — use visual imagery, rhymes, wordplay, stories, or connections to familiar words. Make it genuinely memorable, not generic.]` :""}

${includeExtras ==="basic" ?`**[Number]. [WORD]**  *(part of speech)* — [concise definition]` :""}

### MNEMONIC TECHNIQUES TO USE
${includeExtras ==="all" || includeExtras ==="mnemonics" ?`- **Visual association**: Link the word to a vivid mental image
- **Sound-alike**: Connect to a familiar word that sounds similar
- **Story method**: Create a brief, memorable scenario using the word
- **Root breakdown**: Show how prefixes/suffixes reveal meaning
- **Acronym/phrase**: Create a memorable phrase from the word's letters
- **Cultural reference**: Link to a famous person, movie, or event

**GOOD mnemonic**:"EPHEMERAL = E-PH-EMERAL → think 'a FEMORAL artery pulse is ephemeral (brief/fleeting)'"
**BAD mnemonic**:"Remember this word by its definition" (unhelpful!)` :""}

### QUALITY STANDARDS FOR EXAMPLES
- Examples must demonstrate the word's meaning clearly — a reader should understand the word from context alone
- Include diverse subjects (science, history, daily life, business)
- Avoid circular definitions in examples (don't use the word to define itself)
- Show the word in its most common grammatical form

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Exactly ${wordCount} words are provided
2. ✓ All words match ${level} difficulty level — none too easy or too hard
3. ✓ Words are relevant to ${category} learning context
4. ✓ No duplicate or near-duplicate words
5. ✓ Parts of speech are diverse (mix of nouns, verbs, adjectives)
6. ✓ ${includeExtras ==="all" || includeExtras ==="examples" ?"Example sentences clearly demonstrate word meaning in context" :"Definitions are clear and precise"}
7. ✓ ${includeExtras ==="all" || includeExtras ==="mnemonics" ?"Memory tips are genuinely creative and memorable (not generic)" :"Information is concise and scannable"}
8. ✓ Words are ordered from slightly easier to harder
9. ✓ Definitions are accurate and not misleading
10. ✓ Formatting is consistent across all entries

## TOPIC/FOCUS AREA
${input}

## OUTPUT FORMAT

Present as a numbered list with consistent formatting per the detail level selected. Use markdown for bold words and clear section breaks.

Do NOT include:
- Words significantly above or below the ${level} level
- Obscure words with no practical use (unless expert level)
- Generic memory tips ("just memorize it")
- Duplicate information across word entries
- Your commentary about the list creation process

Generate an expertly curated vocabulary list:`;
};


const features = [
  {
    icon: Brain,
    title:"Memory Techniques",
    desc:"Each word includes mnemonics and memory tips to help you remember definitions and usage quickly.",
  },
  {
    icon: GraduationCap,
    title:"Exam-Focused",
    desc:"Specially curated vocabulary for GRE, SAT, IELTS, TOEFL, and competitive exams with high-frequency words.",
  },
  {
    icon: BookOpen,
    title:"Contextual Learning",
    desc:"Learn words with real example sentences, synonyms, and usage context for better retention.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Specify your subject area or leave blank for general vocabulary",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Select Level",
    desc:"Choose from basic to competitive exam difficulty",
    icon: Target,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Study Words",
    desc:"Get comprehensive word lists with definitions, examples, and memory tips",
    icon: Brain,
    color:"from-green-500 to-emerald-600",
  },
];

const relatedTools = [
  {
    name:"Synonym Finder",
    slug:"synonym-finder",
    icon: BookOpen,
    color:"text-green-600",
  },
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    icon: Brain,
    color:"text-blue-600",
  },
  {
    name:"Antonym Finder",
    slug:"antonym-finder",
    icon: Lightbulb,
    color:"text-emerald-600",
  },
  {
    name:"Idioms & Phrases",
    slug:"idioms-phrases",
    icon: BookMarked,
    color:"text-teal-600",
  },
];

const faqs = [
  {
    question:"What is a Vocabulary Builder and how does it help with learning?",
    answer:"A Vocabulary Builder is an educational tool that helps you systematically expand your word knowledge through structured learning. Our AI-powered vocabulary builder generates customized word lists based on your learning goals, difficulty level, and subject area. It provides comprehensive information for each word including definitions, parts of speech, example sentences, synonyms, antonyms, and memory techniques. This multi-faceted approach aids retention by engaging different learning pathways—visual (seeing the word), contextual (understanding usage), and associative (connecting to similar words). Research shows that learning vocabulary with context and memory aids increases retention by up to 80% compared to simple definition memorization. The tool is particularly valuable for students preparing for standardized tests like GRE, SAT, IELTS, or TOEFL, where vocabulary sections significantly impact scores. It's also useful for professionals looking to improve business communication, non-native English speakers building fluency, or anyone wanting to articulate thoughts more precisely. Regular vocabulary building enhances reading comprehension, writing quality, and overall communication effectiveness in both personal and professional contexts.",
  },
  {
    question:"How can I use this tool for competitive exam preparation?",
    answer:"For competitive exam preparation, select the 'Competitive Exams' level and choose categories like 'GRE/SAT' or 'Academic' to get high-frequency words that commonly appear on standardized tests. Start by generating 20-30 words daily on various topics, then gradually increase to 50 words as you build momentum. The tool provides memory tips and mnemonics specifically designed to help you remember words under exam pressure. Create a study schedule: spend 15-20 minutes learning new words, then review previous words using the history feature. Focus on understanding not just definitions but also usage context, as exams test practical application through sentence completion and reading comprehension. Use the example sentences to see how words function in different contexts. For GRE preparation, prioritize words with multiple meanings and academic vocabulary used in scholarly texts. For SAT, focus on words commonly found in literature and formal writing. Track your progress by testing yourself weekly—try using new words in sentences or identifying them in practice passages. Many students find success by combining this tool with flashcard apps, spacing out reviews over increasing intervals (spaced repetition). Remember, consistent daily practice beats cramming; aim to learn 20-30 words daily over 3-4 months rather than 500 words in one week. The goal is long-term retention, not short-term memorization.",
  },
  {
    question:"Is the Vocabulary Builder suitable for GRE, SAT, IELTS, and other English exams?",
    answer:"Yes, our Vocabulary Builder is specifically designed to support preparation for all major English proficiency and standardized tests including GRE, SAT, IELTS, TOEFL, ACT, GMAT, and competitive exams like UPSC, SSC, and banking exams. When you select the 'Competitive Exams' level, the AI prioritizes high-frequency words that appear most often on these tests based on analysis of past exam patterns. For GRE, it focuses on advanced academic vocabulary, words with multiple meanings, and terms commonly found in graduate-level texts. For SAT, it emphasizes vocabulary that appears in literature, journalism, and formal writing. For IELTS and TOEFL, it includes words important for academic and professional communication contexts. The tool's comprehensive approach—providing definitions, usage examples, synonyms, and contextual notes—aligns perfectly with how these exams test vocabulary knowledge. Tests don't just ask for definitions; they require understanding of connotation, appropriate usage, and ability to recognize words in various contexts. Our example sentences mirror the complexity you'll encounter in reading comprehension passages. The memory techniques help cement words in long-term memory, crucial since these exams test retention of hundreds of vocabulary words. Many test-prep courses recommend building vocabulary of 1000-3000 words for competitive exams; this tool helps you systematically work toward that goal with structured, daily practice.",
  },
  {
    question:"What vocabulary level should I choose based on my current English proficiency?",
    answer:"Choose your vocabulary level based on your current comfort with English and your learning goals. Select 'Basic' if you're a beginner English learner, starting IELTS/TOEFL preparation, or want to build foundational vocabulary for everyday conversation and simple reading. Basic level covers common words, essential verbs, and frequently used adjectives that form the core of English communication. Choose 'Intermediate' if you can hold conversations comfortably, read newspapers with some difficulty, or are in high school/early college. This level introduces more nuanced vocabulary, academic terms, and words used in professional settings. Select 'Advanced' if you're preparing for competitive exams, working in professional environments requiring sophisticated communication, or reading complex literature. Advanced vocabulary includes words with subtle meanings, formal terminology, and expressions used in academic or specialized contexts. Choose 'Competitive Exams' if you're specifically preparing for GRE, SAT, GMAT, or similar tests—this level focuses on high-frequency test words that may not appear in everyday conversation but are crucial for exam success. A good rule of thumb: if you understand 90%+ of words in a generated list, move up a level; if you understand less than 50%, move down a level. Most learners benefit from starting one level below their perceived ability to build confidence and ensure solid foundation. You can always increase difficulty as you progress. Mix levels occasionally—even advanced learners benefit from reviewing intermediate words to understand subtle usage differences and strengthen overall vocabulary mastery.",
  },
  {
    question:"What are the best techniques to memorize new vocabulary words effectively?",
    answer:"Effective vocabulary memorization requires multiple learning strategies used consistently over time. First, use spaced repetition—review new words after 1 day, then 3 days, then 1 week, then 1 month. This scientifically proven method moves words from short-term to long-term memory. Create vivid mental images connecting the word to its meaning; visual associations are powerful memory aids. Use the mnemonic devices provided by our tool, or create your own based on word sounds, parts, or personal associations. Practice active recall by testing yourself regularly rather than passively reading definitions. Write sentences using new words in contexts relevant to your life—personal connections enhance retention. Break complex words into roots, prefixes, and suffixes to understand construction (e.g., 'benevolent' = bene + volent = good + wishing). Read extensively in your areas of interest; encountering words in natural contexts reinforces learning and shows varied usage. Keep a vocabulary journal noting new words, definitions, and where you encountered them. Use words in conversation within 24 hours of learning—speaking activates different neural pathways than reading or writing. Group related words by theme (words about emotions, business terms, descriptive adjectives) to build semantic networks in your brain. Teach words to others; explaining meanings forces deeper processing and reveals gaps in understanding. Use the words multiple times in different contexts—writing, speaking, and thinking. Finally, be patient and consistent; vocabulary building is a gradual process. Studies show you need 7-12 exposures to a word before it truly sticks in long-term memory, so regular review is essential for retention.",
  },
  {
    question:"Can this tool help improve my English communication and writing skills?",
    answer:"Absolutely! A rich vocabulary is fundamental to effective communication and high-quality writing. This tool enhances your English skills in multiple ways. First, expanding your vocabulary gives you more precise words to express thoughts, emotions, and ideas, making your communication more nuanced and impactful. Instead of repeatedly using 'good' or 'bad,' you'll have 'excellent,' 'exceptional,' 'terrible,' or 'abysmal' at your disposal. Second, learning words with example sentences shows you proper usage, helping you avoid common mistakes and awkward phrasing. This is crucial because knowing a word's definition isn't enough—you must understand its connotation and appropriate context. Third, exposure to synonyms and antonyms helps you understand subtle differences between similar words, improving word choice in speaking and writing. Professional writing and eloquent speech require this nuanced understanding. Fourth, building vocabulary improves reading comprehension; when you encounter fewer unknown words while reading, you maintain better flow and understanding, which in turn exposes you to even more vocabulary in context. This creates a positive learning cycle. Fifth, strong vocabulary increases confidence in professional and academic settings, enabling you to participate more actively in discussions, presentations, and debates. For writing specifically, varied vocabulary makes your content more engaging and demonstrates sophistication to readers, whether in academic essays, business reports, or creative writing. Use this tool daily, then actively practice using new words in emails, conversations, and writing projects. Track your progress by periodically reviewing old word lists—you'll be amazed how many once-unfamiliar words become part of your active vocabulary. Consistent practice transforms vocabulary knowledge into communication competence.",
  },
];

const placeholders = ["Technology and Innovation","Business and Finance","Science and Research","Literature and Arts","Current Affairs and Politics","Medical and Healthcare Terminology","Legal and Governmental Terms","Environmental and Sustainability","Psychology and Human Behavior","Philosophy and Ethics",
];

export default function VocabularyBuilderClient() {
  return (
    <PremiumToolWrapper
      toolName="Vocabulary Builder"
      toolSlug="vocabulary-builder"
      tagline="Expand your vocabulary effortlessly"
      description="Build your vocabulary with word lists, definitions, examples, and memory tips for competitive exams and language learning."
      badge="Word Power"
      category="Exam Prep Tools"
      categorySlug="exam-prep-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Build Your Vocabulary"
      ctaDescription="Words are the building blocks of success."
    >
      <EnhancedToolLayout
        toolSlug="vocabulary-builder"
        toolName="Vocabulary Builder"
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
        promptTemplate={generatePrompt}
        inputRows={10}
        toolOptions={toolOptions}
        resultLabel="📖 Vocabulary List"
        generateButtonText="📚 Generate Words"
        inputLabel="📚 Topic or Subject Area"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        supportedFormats={["text","markdown"]}
      />
      <FAQSection faqs={faqs} />
    </PremiumToolWrapper>
  );
}
