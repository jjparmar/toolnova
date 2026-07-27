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
  Calendar,
  Clock,
  Target,
  Users,
  Star,
  Zap,
  CheckCircle,
  TrendingUp,
  CalendarDays,
} from"lucide-react";

const toolOptions = [
  {
    id:"duration",
    label:"Study Duration",
    type:"select" as const,
    options: [
      { value:"1week", label:"📅 1 Week" },
      { value:"2weeks", label:"📅 2 Weeks" },
      { value:"1month", label:"📅 1 Month" },
      { value:"3months", label:"📅 3 Months" },
    ] as const,
    defaultValue:"2weeks",
  },
  {
    id:"hoursPerDay",
    label:"Hours Per Day",
    type:"select" as const,
    options: [
      { value:"2", label:"⏰ 2 Hours" },
      { value:"4", label:"⏰ 4 Hours" },
      { value:"6", label:"⏰ 6 Hours" },
      { value:"8", label:"⏰ 8 Hours" },
    ] as const,
    defaultValue:"4",
  },
  {
    id:"includeBreaks",
    label:"Schedule Breaks",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const duration = options?.duration ||"2weeks";
  const hoursPerDay = options?.hoursPerDay ||"4";
  const includeBreaks = options?.includeBreaks !== false;

  const durationText: Record<string, string> = {"1week":"1 week","2weeks":"2 weeks","1month":"1 month","3months":"3 months",
  };

  const durationStrategy: Record<string, string> = {"1week":"INTENSIVE SPRINT: Focus exclusively on high-priority topics and exam-likely content. Minimal depth, maximum coverage. Daily reviews mandatory. No rest days—only strategic micro-breaks. Prioritize weak areas ruthlessly.","2weeks":"FOCUSED PREPARATION: Balanced coverage with dedicated review cycles. First week: learn new material. Second week: review, practice, and consolidate. Include 1 rest day. Active recall every other day.","1month":"COMPREHENSIVE STUDY: Deep understanding with multiple review cycles. Week 1-2: cover all topics systematically. Week 3: intensive practice and past papers. Week 4: comprehensive revision, weak areas, and mock tests. Include 2-3 rest days.","3months":"MASTERY PROGRAM: Thorough learning with spaced repetition across multiple cycles. Month 1: foundational understanding of all topics. Month 2: deep practice, problem-solving, and connections. Month 3: mock exams, weak area targeting, and final consolidation. Include weekly rest days.",
  };

  const breakStrategy = includeBreaks
    ?"BREAK SCHEDULE: Apply the Pomodoro-enhanced approach—50 minutes focused study + 10 minute break. After every 3 study blocks, take a 30-minute extended break. Include 1 longer break (1-2 hours) for meals/exercise. Breaks should involve: brief walks, hydration, light stretching, or mindfulness—NOT screens or social media."
    :"Schedule continuous study blocks. Transitions between topics serve as natural mental breaks.";

  return`You are an expert academic success coach, cognitive learning scientist, and study strategy specialist. You design evidence-based revision plans using proven techniques (spaced repetition, active recall, interleaving, and elaborative interrogation) to maximize retention, minimize burnout, and ensure exam readiness.

## YOUR TASK
Create a complete, day-by-day revision plan for ${durationText[duration]} with ${hoursPerDay} hours of daily study time that transforms the listed subjects into mastered material.

## SPECIFICATIONS
**Duration**: ${durationText[duration].toUpperCase()} - ${durationStrategy[duration]}
**Daily Hours**: ${hoursPerDay} hours of productive study time per day
**Breaks**: ${breakStrategy}
**Methodology**: Evidence-based learning science (spaced repetition, active recall, interleaving)

## REVISION PLAN FRAMEWORK

### 1. PLAN OVERVIEW & STRATEGY
- **Total study hours available**: ${durationText[duration]} × ${hoursPerDay} hrs/day = [calculate]
- **Subject prioritization**: Weight allocation based on difficulty, breadth, and exam importance
- **Learning phase distribution**:
  - Learning new material: ${duration ==="1week" ?"60%" : duration ==="2weeks" ?"50%" :"40%"}
  - Active practice & problems: ${duration ==="1week" ?"25%" : duration ==="2weeks" ?"30%" :"35%"}
  - Review & consolidation: ${duration ==="1week" ?"15%" : duration ==="2weeks" ?"20%" :"25%"}

### 2. DAILY SCHEDULE STRUCTURE

**Each Day Should Include**:
- **Session blocks**: ${hoursPerDay ==="2" ?"2 × 50-min blocks" : hoursPerDay ==="4" ?"4 × 50-min blocks" : hoursPerDay ==="6" ?"6 × 50-min blocks" :"8 × 50-min blocks"} with breaks
- **New material**: ${duration ==="1week" ?"Most of the session" :"First half of study session"}
- **Review of previous days**: ${duration ==="1week" ?"Brief 10-min recap" :"Dedicated review block (15-30 min)"}
- **Active recall practice**: Self-testing, flashcards, or practice problems
${includeBreaks ?"- **Strategic breaks**: 10 min between blocks, 30 min extended break midway" :""}
- **End-of-day reflection**: 5-minute review of what was learned today

**Daily Format**:
| Time | Activity | Duration | Notes |
| --- | --- | --- | --- |
| [Start] | [Subject/Topic] | [Duration] | [Method: read/practice/review] |
[Fill for each scheduled block]

### 3. LEARNING TECHNIQUES TO INTEGRATE

**Spaced Repetition Schedule**:
- Day 1: Learn new topic → Review same day (evening)
- Day 2: Quick review (10 min recall)
- Day 4: Active recall test
- Day 7: Comprehensive review
- Day 14+: Final consolidation review

**Active Recall Methods**:
- Close the book and write/recite what you remember
- Create and answer practice questions
- Teach the concept to an imaginary student (Feynman technique)
- Use flashcards for definitions, formulas, and key facts

**Interleaving**:
- Alternate between different subjects/topics within a session
- Don't study the same topic for more than ${hoursPerDay ==="2" ?"50 minutes" :"90 minutes"} straight
- Mix problem types during practice sessions

### 4. WEEKLY MILESTONES & CHECKPOINTS

**For each week, specify**:
- **Topics to complete**: Exact chapters/subjects to finish
- **Review targets**: Previously learned material to revisit
- **Self-assessment**: Mini-test or practice problems to evaluate understanding
- **Confidence check**: Rate understanding of each topic (1-5)
- **Adjustment notes**: How to adapt if falling behind

### 5. PROGRESS TRACKING SYSTEM

Include:
- **Daily checkbox**: ☐ for each planned topic (mark ☑ when done)
- **Weekly assessment**: Brief self-test covering all material from that week
- **Confidence tracker**: Rate each topic: 🔴 Weak → 🟡 Moderate → 🟢 Strong
- **Buffer allocation**: How to use extra time or catch up if behind
${duration !=="1week" ?"- **Mid-plan review point**: Halfway checkpoint to reassess and adjust priorities" :""}

### 6. FINAL PREPARATION PHASE

${duration ==="1week" ?"**Day 7 (Final Day)**:" : duration ==="2weeks" ?"**Days 13-14 (Final Days)**:" : duration ==="1month" ?"**Week 4 (Final Week)**:" :"**Month 3, Week 4 (Final Week)**:"}
- Comprehensive review of ALL topics (speed round)
- Focus on 🔴 weak areas identified during tracking
- Practice with mock questions or past papers
- Review formulas, definitions, and key facts
- Relaxation and confidence-building (no new material)

### 7. WELLNESS & SUSTAINABILITY

${includeBreaks ?`**Anti-burnout Measures**:
- ${duration ==="1week" ?"Micro-breaks every 50 min, no rest days but lighter evening sessions" :"Scheduled rest day(s) for mental recovery"}
- Sleep minimum: 7-8 hours (non-negotiable for memory consolidation)
- Physical activity: 20-30 min daily (walk, exercise, sports)
- Healthy meals: Scheduled mealtimes, not skipped for study
- Reward milestones: Small rewards for hitting weekly targets` :"Focus on continuous, efficient study sessions with natural topic transitions as mental breaks."}

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Every listed subject/topic has allocated study time
2. ✓ Daily plans are realistic for ${hoursPerDay} hours
3. ✓ Spaced repetition is built in (topics revisited at intervals)
4. ✓ Active recall methods are included, not just passive reading
5. ✓ Progressive difficulty: easier topics first, harder later
6. ✓ ${includeBreaks ?"Breaks and rest days are scheduled" :"Study blocks are logically organized"}
7. ✓ Final review/consolidation period is included
8. ✓ Weekly milestones and checkpoints are clear
9. ✓ Plan is flexible with buffer time for difficulties
10. ✓ No single day is overloaded or unrealistic
11. ✓ Mix of subjects prevents monotony (interleaving)
12. ✓ Progress tracking system is actionable

## SUBJECTS & TOPICS TO PLAN
${input}

## OUTPUT FORMAT

Present the plan day-by-day with clear markdown formatting:
- Use headers for each day/week
- Use tables for daily schedules where appropriate
- Bold topic names and time allocations
- Include emoji indicators for activity types (📖 Learn, 🔄 Review, ✍️ Practice, 🧪 Test, 😴 Rest)

Do NOT include:
- Generic study advice unrelated to the specific topics
- Motivational speeches or pep talks
- Vague time allocations ("spend some time on...")
- Unrealistic expectations for the given timeframe
- Your commentary about the planning process

Create a detailed, science-backed revision plan ready for immediate use:`;
};


const features = [
  {
    icon: CalendarDays,
    title:"Day-by-Day Planning",
    description:"Get a complete daily breakdown with specific topics, time allocations, and review sessions structured for optimal learning.",
  },
  {
    icon: TrendingUp,
    title:"Spaced Repetition",
    description:"Built-in review sessions use proven spaced repetition techniques to maximize retention and long-term memory.",
  },
  {
    icon: CheckCircle,
    title:"Strategic Breaks",
    description:"Scientifically-timed breaks and rest days prevent burnout while keeping you productive and focused.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"List Topics",
    desc:"Enter all subjects and topics to study",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Schedule",
    desc:"Choose duration and daily hours",
    icon: Clock,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Plan",
    desc:"Receive structured study schedule",
    icon: Calendar,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Revision Planner?",
    answer:"The Revision Planner is an AI-powered study scheduler that creates personalized day-by-day revision plans based on your subjects, available time, and exam timeline. It uses proven learning techniques like spaced repetition and active recall to structure your study sessions for maximum retention and exam success.",
  },
  {
    question:"Can I customize the study hours?",
    answer:"Yes! Choose from 2, 4, 6, or 8 hours per day based on your availability and other commitments. The planner will intelligently distribute your topics across the available time, ensuring comprehensive coverage without overwhelming you. It also adjusts the depth and pace based on your chosen duration.",
  },
  {
    question:"Does it include revision time?",
    answer:"Absolutely! The plan incorporates spaced repetition - you'll review previously covered material at strategic intervals to strengthen retention. It also includes dedicated review days, practice sessions, and a final comprehensive review period. This ensures you're not just learning new content but actually remembering it.",
  },
  {
    question:"What if I have multiple subjects?",
    answer:"Perfect! List all your subjects with their topics (like 'Mathematics: Calculus, Algebra; Physics: Mechanics, Thermodynamics'). The planner will distribute study time appropriately across subjects, alternate between them to prevent fatigue, and ensure all topics receive adequate coverage before your deadline.",
  },
  {
    question:"How does it handle different durations?",
    answer:"The planner adapts to your timeline: 1 Week (intensive, focused on essentials), 2 Weeks (balanced, covers main topics thoroughly), 1 Month (comprehensive, includes deep practice), 3 Months (thorough, allows multiple review cycles and mastery). Choose based on when your exam is and how much preparation you need.",
  },
  {
    question:"Is the Revision Planner free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: BookOpen,
    color:"text-blue-600",
  },
  {
    name:"Quiz Generator",
    slug:"quiz-generator",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Flashcard Maker",
    slug:"flashcard-maker",
    icon: Brain,
    color:"text-purple-600",
  },
  {
    name:"Chapter Summary",
    slug:"chapter-summary",
    icon: Calculator,
    color:"text-orange-600",
  },
];

export default function RevisionPlannerClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Revision Planner"
      toolSlug="revision-planner"
      tagline="Create your perfect study schedule"
      description="Generate personalized day-by-day revision plans with spaced repetition, strategic breaks, and comprehensive coverage based on your timeline and subjects."
      badge="Study Scheduler"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Plan Your Success"
      ctaDescription="A structured plan is half the battle won. Start your organized study journey!"
      ctaButtonText="Create Plan"
      ctaIcon={Calendar}
    >
      <EnhancedToolLayout
        toolSlug="revision-planner"
        toolName="Revision Planner"
        placeholder={`📚 List the subjects and topics you need to study...

Examples:

• Mathematics: Calculus (derivatives, integrals, limits), Linear Algebra (matrices, vectors), Statistics (probability, distributions)

• Physics: Mechanics (kinematics, dynamics, energy), Thermodynamics (laws, entropy), Optics (reflection, refraction, lenses)

• Chemistry: Organic Chemistry (nomenclature, reactions, mechanisms), Inorganic Chemistry (periodic trends, bonding), Physical Chemistry (thermodynamics, kinetics)

• Biology: Cell Biology (structure, organelles), Genetics (DNA, inheritance), Ecology (ecosystems, populations)

• History: World War II (causes, major events, consequences), Cold War era (1945-1991, key conflicts)

• Computer Science: Data Structures (arrays, trees, graphs), Algorithms (sorting, searching), Object-Oriented Programming (classes, inheritance)

💡 Tip: List all subjects with specific topics/chapters for a more detailed and accurate revision schedule!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📅 Your Revision Plan"
        generateButtonText="📆 Create Study Plan"
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
