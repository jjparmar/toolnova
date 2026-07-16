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
  Type as TypeIcon,
  Users,
  Star,
  Clock,
  Brain,
  FileText,
  Award,
  BookMarked,
} from"lucide-react";

const toolOptions: ToolOption[] = [
  {
    id:"level",
    label:"Difficulty Level",
    type:"select" as const,
    options: [
      { value:"basic", label:"📚 Basic" },
      { value:"intermediate", label:"📖 Intermediate" },
      { value:"advanced", label:"🎓 Advanced" },
      { value:"expert", label:"🏆 Expert" },
    ],
    defaultValue:"intermediate",
  },
  {
    id:"category",
    label:"Category",
    type:"select" as const,
    options: [
      { value:"general", label:"📋 General" },
      { value:"professional", label:"💼 Professional" },
      { value:"scientific", label:"🔬 Scientific" },
      { value:"legal", label:"⚖️ Legal" },
      { value:"medical", label:"🏥 Medical" },
    ],
    defaultValue:"general",
  },
  {
    id:"count",
    label:"Number of Substitutions",
    type:"select" as const,
    options: [
      { value:"20", label:"20 Words" },
      { value:"50", label:"50 Words" },
      { value:"100", label:"100 Words" },
      { value:"200", label:"200 Words" },
    ],
    defaultValue:"50",
  },
  {
    id:"format",
    label:"Output Format",
    type:"select" as const,
    options: [
      { value:"list", label:"📝 List Format" },
      { value:"quiz", label:"❓ Quiz Mode" },
      { value:"flashcards", label:"🃏 Flashcard Style" },
    ],
    defaultValue:"list",
  },
];

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const level = options?.level ||"intermediate";
  const category = options?.category ||"general";
  const count = options?.count ||"50";
  const format = options?.format ||"list";

  const levelGuidance: Record<string, string> = {
    beginner:"BEGINNER: Common substitutions every educated adult should know. High-frequency words like 'autobiography', 'omnivore', 'anonymous'. Focus on words used in everyday English and basic exam preparation.",
    intermediate:"INTERMEDIATE: Standard competitive exam level. Words regularly tested in SSC, Banking, and state-level exams. Examples: 'misogynist', 'somnambulism', 'blasphemy'. Include clear definitions and practical context.",
    advanced:"ADVANCED: High-difficulty words for UPSC, GRE, and advanced competitive exams. Examples: 'logorrhea', 'petrichor', 'defenestration'. Include detailed etymological breakdowns and sophisticated usage.",
    expert:"EXPERT: Rare, erudite substitutions for the most challenging exams. Words that appear in advanced verbal reasoning and rarely in everyday speech. Include comprehensive analysis with roots and memory aids.",
  };

  const categoryGuidance: Record<string, string> = {
    general:"GENERAL: Cover diverse topics — people, places, actions, qualities, science, arts, governance, and abstract concepts. Ensure a wide spread across domains.",
    people:"PEOPLE & PROFESSIONS: Focus on words describing types of people, professions, behaviors, and character traits. Examples: 'philanthropist' (one who loves humanity), 'misanthrope' (one who hates humankind).",
    science:"SCIENCE & MEDICINE: Focus on scientific, medical, and technical terms. Examples: 'autopsy' (examination of a dead body), 'endemic' (disease prevalent in a particular area).",
    government:"GOVERNMENT & POLITICS: Focus on governance, law, politics, and administration terms. Examples: 'autocracy' (government by one person), 'amnesty' (general pardon).",
    arts:"ARTS & LITERATURE: Focus on literary, artistic, and cultural terms. Examples: 'soliloquy' (talking to oneself), 'epilogue' (concluding part of a literary work).",
  };

  const formatInstructions: Record<string, string> = {
    list:"NUMBERED LIST: Present as a clean, numbered list. Each entry shows the phrase/description followed by the one-word answer with full analysis.",
    quiz:"QUIZ FORMAT: Present as questions where the phrase is the question. Provide the answer below each question with a brief explanation. Include 4 multiple-choice options (1 correct, 3 distractors) for each.",
    flashcards:"FLASHCARD FORMAT: Present each entry as a two-sided card. FRONT: The descriptive phrase (question). BACK: The one-word answer with definition and memory tip. Separated by a clear divider.",
  };

  return`You are an expert verbal aptitude specialist, competitive exam preparation coach, and etymology scholar who specializes in one-word substitutions—the art of replacing descriptive phrases with precise single words. You have helped thousands of students master this critical exam topic through systematic learning, etymological analysis, and effective memory techniques.

## YOUR TASK
Generate ${count} one-word substitutions at ${level} difficulty, covering ${category} topics, presented in ${format} format for effective learning and exam preparation.

## SPECIFICATIONS
**Count**: ${count} substitutions
**Level**: ${level.toUpperCase()} - ${levelGuidance[level]}
**Category**: ${category.toUpperCase()} - ${categoryGuidance[category]}
**Format**: ${format.toUpperCase()} - ${formatInstructions[format]}

## ONE-WORD SUBSTITUTION FRAMEWORK

### SELECTION CRITERIA
- **Exam frequency**: Prioritize words that frequently appear in competitive exams
- **Difficulty calibration**: Match ${level} level precisely
- **Category alignment**: All entries must relate to ${category}
- **Uniqueness**: No overlapping or similar substitutions
- **Practical utility**: Words that can enrich vocabulary beyond exams
- **Progressive difficulty**: Start slightly easier, build to harder

### ENTRY STRUCTURE

${format ==="list" ?`**[Number].** *[Descriptive phrase/definition]*
→ **[ONE-WORD ANSWER]** *(part of speech)*

- **Definition**: [Clear, exam-style definition]
- **Example**:"[Sentence using the word correctly in context]"
- **Roots**: 📜 [Greek/Latin root breakdown — prefix + root + suffix with meanings]
- **Memory Tip**: 💡 [Creative mnemonic — visual, auditory, or story-based association]
- **Related Words**: [2-3 words from the same root family]
${level ==="advanced" || level ==="expert" ?"- **Exam Note**: [How this word typically appears in exam questions — as the answer, distractor, or in comprehension]" :""}` :""}

${format ==="quiz" ?`**Q[Number].** A single word for: *"[Descriptive phrase]"*

**Options**:
(a) [Distractor 1]   (b) [Correct Answer]   (c) [Distractor 2]   (d) [Distractor 3]

**Answer**: (b) **[CORRECT WORD]**
**Explanation**: [Brief definition + why other options are wrong]
**Memory Tip**: 💡 [Quick mnemonic]` :""}

${format ==="flashcards" ?`---
**CARD [Number] — FRONT**
📝 *[Descriptive phrase/definition]*

**CARD [Number] — BACK**
✅ **[ONE-WORD ANSWER]** *(part of speech)*
Definition: [Clear meaning]
💡 Memory Tip: [Quick mnemonic]
---` :""}

### ROOT ANALYSIS PATTERNS

Help learners recognize word-building patterns:

**Common Prefixes**:
- Mis- (wrong/bad): misogynist, misanthrope, misnomer
- Phil- (love): philanthropist, philosopher, bibliophile
- -cide (killing): homicide, genocide, fratricide
- Omni- (all): omnivore, omniscient, omnipotent
- Auto- (self): autobiography, autopsy, autocracy

Show these patterns within the entries to help learners decode unknown words.

### THEMATIC GROUPING

Organize entries into sub-groups where natural:

${category ==="general" ?`**👤 People & Behaviors**
[Entries about types of people]

**🏛️ Government & Society**
[Entries about governance and social concepts]

**🔬 Science & Nature**
[Entries about scientific and natural phenomena]

**📚 Arts & Knowledge**
[Entries about literature, arts, and learning]

**💀 Death & Crime**
[Entries about morbid or legal concepts]` :`Organize by natural sub-themes within ${category}.`}

### DIFFICULTY PROGRESSION

Order within each group:
1. Words most learners know (anchor concepts)
2. Words learners have seen but may not recall
3. Words learners need to learn fresh

${category ==="general" && (level ==="advanced" || level ==="expert") ?`### COMMONLY TESTED PAIRS

Include 5-10 frequently confused pairs:
| Word 1 | Meaning | Word 2 | Meaning |
| --- | --- | --- | --- |
| Emigrate | Leave a country | Immigrate | Enter a country |
| [Continue with relevant pairs]` :""}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Exactly ${count} substitutions are provided
2. ✓ All entries match ${level} difficulty level
3. ✓ Entries relate to ${category} category
4. ✓ Each descriptive phrase has exactly ONE correct word answer
5. ✓ Word answers are genuine single words (not hyphenated compounds)
6. ✓ No duplicate or near-duplicate entries
7. ✓ Definitions are accurate and exam-standard
8. ✓ Format follows ${format} structure correctly
9. ✓ ${format ==="quiz" ?"All 4 options are plausible but only 1 is correct" :"Memory tips are creative and genuinely helpful"}
10. ✓ Entries progress from easier to harder
11. ✓ Root/etymology breakdowns are linguistically accurate
12. ✓ Example sentences demonstrate natural word usage

## TOPIC/FOCUS
${input ?`Focus on topic or theme: ${input}` :"Cover diverse topics commonly tested in competitive exams (UPSC, SSC, Banking, GRE, CAT, IELTS, etc.)"}

## OUTPUT FORMAT

Present in ${format} format with consistent structure. Use markdown formatting for readability. ${format ==="list" ?"Number each entry clearly." :""} ${format ==="quiz" ?"Randomize the position of correct answers across options." :""} ${format ==="flashcards" ?"Use horizontal rules to separate cards." :""}

Do NOT include:
- Phrases that have multiple equally valid one-word answers (ambiguous entries)
- Made-up or non-standard words
- Entries significantly above or below ${level} level
- Generic memory tips ("just memorize it")
- Your commentary about the generation process

Generate a comprehensive, exam-ready one-word substitution collection:`;
};


const features = [
  {
    icon: Award,
    title:"Exam-Focused Content",
    desc:"Specifically designed for competitive exams like UPSC, SSC, Banking, and government tests.",
  },
  {
    icon: Brain,
    title:"Memory Techniques",
    desc:"Includes mnemonics and memory tips to help you remember complex substitutions quickly.",
  },
  {
    icon: FileText,
    title:"Multiple Formats",
    desc:"Choose list, quiz, or flashcard format based on your study preference and learning style.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"Enter Topic",
    desc:"Specify a topic or leave blank for general substitutions",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Select Level",
    desc:"Choose difficulty from basic to expert based on your needs",
    icon: TypeIcon,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Study & Practice",
    desc:"Get comprehensive list with definitions, examples, and memory tips",
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
    name:"Idioms & Phrases",
    slug:"idioms-phrases",
    icon: MessageCircle,
    color:"text-emerald-600",
  },
  {
    name:"Synonym Finder",
    slug:"synonym-finder",
    icon: Lightbulb,
    color:"text-teal-600",
  },
  {
    name:"Antonym Finder",
    slug:"antonym-finder",
    icon: BookMarked,
    color:"text-green-600",
  },
];

const faqs = [
  {
    question:"What is One Word Substitution and why is it important?",
    answer:"One Word Substitution is a linguistic concept where a lengthy phrase or description is replaced with a single, precise word that conveys the same meaning concisely. For example, instead of saying 'a person who studies birds,' you can simply say 'ornithologist.' This concept is crucial for multiple reasons. First, it's heavily tested in competitive exams including UPSC Civil Services, SSC CGL, Banking exams (IBPS, SBI), Railway exams, and state government tests where vocabulary sections specifically include one-word substitution questions worth significant marks. Second, mastering these substitutions makes your writing more concise, professional, and impactful—essential for essays, reports, and business communication. Third, it expands your vocabulary naturally by connecting concepts with precise terminology used in academic and professional contexts. Fourth, it improves reading comprehension because many texts, especially formal or technical writing, use these specialized terms assuming reader familiarity. Understanding 'philanthropist' instead of 'person who loves humanity' speeds up reading and comprehension. Fifth, one-word substitutions demonstrate language sophistication and educational depth, which impresses in interviews, presentations, and professional correspondence. The Indian administrative and banking exams particularly emphasize this skill because government communication requires precise, unambiguous language. For students preparing for competitive exams, learning 500-1000 common one-word substitutions is considered essential preparation that can directly improve scores by 10-15 marks in English sections.",
  },
  {
    question:"How is this tool useful for competitive exams like UPSC, SSC, and Banking?",
    answer:"This One Word Substitution tool is specifically designed for competitive exam preparation where vocabulary questions are worth significant marks and can make the difference between qualifying and missing cutoffs. In UPSC Civil Services Prelims and Mains, one-word substitutions appear in the General English paper, essay writing requires concise expression using appropriate substitutions, and interview boards assess vocabulary depth. For SSC CGL, CPO, and CHSL exams, the English section includes 5-10 direct one-word substitution questions, and descriptive papers reward precise word usage. Banking exams (IBPS PO, SBI Clerk, RRB) test substitutions in vocabulary sections worth 3-5 marks. Railway exams and state government tests include similar patterns. Our tool helps by generating exam-pattern questions organized by difficulty (basic to expert) and category (general, professional, scientific, legal), providing memory techniques and mnemonics that aid rapid learning—crucial when preparing 500+ substitutions, offering example sentences showing real-world usage, which helps in descriptive writing sections, and allowing quiz mode for self-testing and flashcard format for quick revision before exams. The tool covers high-frequency substitutions that appear repeatedly across different exams: professions and people (lexicographer, misanthrope, bibliophile), sciences and studies (ornithology, etymology, anthropology), fears and phobias (acrophobia, claustrophobia), killing and death (patricide, regicide), government and political terms (autocracy, bureaucracy), and medical and legal terminology. Practicing with this tool builds confidence and speed—you'll recognize substitution questions instantly and answer within seconds, saving time for complex questions. Many toppers credit systematic vocabulary preparation, including one-word substitutions, as key to scoring 90+ percentiles in English sections.",
  },
  {
    question:"Is this One Word Substitution tool free to use for exam preparation?",
    answer:"Yes, our One Word Substitution tool is completely free to use with unlimited access to all features including the ability to generate lists of 20, 50, 100, or even 200 substitutions, choose difficulty levels from basic to expert, select categories (general, professional, scientific, legal, medical), access memory tips and mnemonics for complex words, use quiz mode for self-testing, and format as flashcards for quick revision. There are no daily limits, premium tiers, or hidden charges. We created this tool specifically to democratize exam preparation resources because quality coaching and expensive vocabulary books shouldn't be barriers to success in government exams. Many coaching institutes charge thousands of rupees for vocabulary modules that include one-word substitution content identical to what our tool generates for free. The tool saves your practice history locally for convenience but maintains complete privacy—no email registration or account creation required. We understand that most competitive exam aspirants are students or job seekers with limited budgets, which is why we've made this comprehensive resource available freely. You can use it daily throughout your preparation period, generate topic-wise lists, create personalized study materials, and practice in various formats without spending anything. While we may introduce optional premium features in the future like personalized progress tracking, adaptive difficulty based on your performance, or expanded word databases with 10,000+ substitutions, the core functionality providing comprehensive one-word substitution lists with definitions, examples, and memory techniques will always remain free. This is our contribution to supporting India's exam aspirants in achieving their career goals through accessible, quality educational resources.",
  },
  {
    question:"What difficulty level should I start with as a beginner?",
    answer:"If you're beginning your one-word substitution preparation, start with the 'Basic' level and systematically progress to higher difficulties rather than jumping to advanced lists. Basic level covers common, everyday substitutions that you may already know partially, like 'optimist' (person who looks at the bright side), 'annual' (happening once a year), 'autobiography' (story of one's life written by oneself), and 'pedestrian' (person walking on foot). These build confidence and establish the concept before tackling complex terms. Spend 2-3 days with basic level, learning 20-30 substitutions daily, ensuring you can recall them without hesitation and use them correctly in sentences. Once comfortable (around 80-100 basic substitutions learned), move to 'Intermediate' level which introduces moderately challenging terms like 'philanthropist,' 'contemporary,' 'versatile,' and 'procrastinate.' These appear frequently in competitive exams and general reading. Spend 1-2 weeks at intermediate level, learning 30-40 substitutions daily. After mastering 300-400 intermediate substitutions, progress to 'Advanced' level featuring specialized terms like 'misanthrope' (hater of mankind), 'bibliophile' (lover of books), 'numismatics' (study of coins), and 'gerontology' (study of old age). These are crucial for scoring high marks in competitive exams as they differentiate you from average test-takers. Finally, reach 'Expert' level only when preparing for top-tier exams like UPSC or when aiming for 95+ percentile, featuring rare substitutions like 'pyromaniac,' 'kleptomaniac,' 'epistolary,' and obscure scientific terms. The key is gradual progression with thorough revision—rushing through expert-level words without mastering basics leads to confusion and poor retention. Use spaced repetition: review basic words weekly even while learning advanced ones. Track your accuracy: if you're scoring below 70% in quiz mode, stay at current difficulty longer before advancing. Remember, exam questions mix all difficulty levels, so strong foundation in basic and intermediate substitutions is more valuable than superficial knowledge of expert terms.",
  },
  {
    question:"What are effective techniques to memorize one-word substitutions quickly?",
    answer:"Memorizing hundreds of one-word substitutions requires strategic techniques beyond simple rote learning. First, use mnemonic devices and associations provided by our tool or create your own. For 'lexicographer' (person who compiles dictionaries), remember LEX sounds like 'letters' and GRAPH means 'write'—someone who writes about letters/words. For 'ornithologist' (bird scientist), connect to 'ornithopter' (bird-like flying machine). These mental hooks make recall instant during exams. Second, learn substitutions in thematic groups rather than random lists. Study all profession-related words together (cartographer, archaeologist, cardiologist), then science studies (biology, geology, psychology), then fears (claustrophobia, agoraphobia), then governance (democracy, autocracy, bureaucracy). Thematic learning creates neural networks where recalling one word triggers related words. Third, create vivid visual images. For 'misanthrope' (hater of mankind), imagine a mean anthropomorphic character pushing people away. Visualization engages different brain areas, strengthening memory. Fourth, use the words in your own sentences immediately after learning. Write three original sentences using each new substitution—this moves words from passive recognition to active recall. Fifth, practice with fill-in-the-blanks: 'A person who hates women is called a _____' (misogynist). This mirrors exam question format and tests real understanding. Sixth, employ spaced repetition: review new words after 1 hour, 1 day, 3 days, 1 week, 2 weeks. This scientifically proven method moves information to long-term memory. Seventh, focus on word roots, prefixes, and suffixes. Understanding that 'phil' means love (bibliophile, philanthropist), 'phobia' means fear (acrophobia, claustrophobia), 'cide' means killing (homicide, genocide), and 'ology' means study (psychology, biology) helps you decode unfamiliar words during exams. Eighth, use our quiz mode for self-testing rather than just reading lists—active recall is far more effective than passive review. Ninth, teach words to study partners or family—explaining meanings to others reinforces your own understanding. Finally, maintain a personal notebook with difficult words you struggle to remember, reviewing it during spare moments. Consistency matters more than intensity—30 minutes daily of focused practice beats 3-hour weekly cramming sessions for long-term retention.",
  },
  {
    question:"Which competitive exams test one-word substitution and how many marks?",
    answer:"One-word substitution questions appear across numerous competitive exams in India with varying weightage, making them essential for serious aspirants. In UPSC Civil Services Examination, the Prelims General Studies paper includes English comprehension where substitutions appear indirectly, the Mains Compulsory English paper (for IAS, IPS, IFS) includes direct substitution questions worth 3-5 marks, and essay papers reward concise expression using appropriate single-word terminology. For SSC examinations (CGL, CHSL, CPO, MTS), the English section worth 25-50 marks includes 5-10 direct one-word substitution questions worth 1 mark each, descriptive papers evaluate vocabulary range including substitution usage, and sentence completion questions often test substitution knowledge indirectly. Banking exams including IBPS PO/Clerk, SBI PO/Clerk, and RRB feature English sections with 3-5 substitution questions worth 1 mark each, descriptive writing (letter/essay) rewards precise vocabulary, and interview rounds assess communication skills where substitution knowledge demonstrates sophistication. Railway exams (RRB NTPC, Group D, ALP) include English sections with 2-4 substitution questions and general awareness sections may test term knowledge. State government exams like State PSC, Police Constable/SI recruitments, and State Bank tests follow similar patterns with 3-7 questions. Additionally, entrance exams such as CLAT (law entrance), AFCAT (Air Force), NDA/CDS, and management entrances (CAT, XAT) include vocabulary sections where substitutions commonly appear. The direct marks may seem small (1 mark per question), but their cumulative impact is significant—scoring 8/10 substitution questions versus 4/10 creates a 4-mark advantage, which in competitive exams with cutoffs decided by 1-2 marks, can determine selection. Moreover, substitution knowledge indirectly improves performance in reading comprehension (faster understanding), sentence correction (recognizing appropriate word usage), para jumbles (connecting ideas through precise terminology), and descriptive writing (concise, impressive expression). Toppers consistently emphasize that vocabulary preparation including one-word substitutions isn't just about direct marks—it's about building overall English competency that elevates performance across all question types in English sections, ultimately contributing 10-20 marks to your total score through direct and indirect benefits.",
  },
];

const placeholders = ["General topics for competitive exams","Government and political terms","Medical and healthcare terminology","Scientific studies and professions","Legal and judicial vocabulary","Fears, phobias, and psychology","Arts, literature, and culture","Animals, nature, and environment","Technology and modern life","Historical and geographical terms",
];

export default function OneWordSubstitutionClient() {
  return (
    <PremiumToolWrapper
      toolName="One Word Substitution"
      toolSlug="one-word-substitution"
      tagline="Master concise vocabulary for exams"
      description="Find single words that replace entire phrases - perfect for competitive exams like UPSC, SSC, and Banking with definitions, examples, and memory techniques."
      badge="Exam Essential"
      category="Exam Prep Tools"
      categorySlug="exam-prep-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
    >
      <EnhancedToolLayout
        toolSlug="one-word-substitution"
        toolName="One Word Substitution"
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
        promptTemplate={generatePrompt}
        inputRows={5}
        toolOptions={toolOptions}
        resultLabel="📝 One-Word Substitutions"
        generateButtonText="🔤 Generate Substitutions"
        inputLabel="📚 Topic or Category (Optional)"
        showAdvancedOptions={true}
        maxHistoryItems={10}
        supportedFormats={["text","markdown"]}
      />
      <FAQSection faqs={faqs} />
    </PremiumToolWrapper>
  );
}
