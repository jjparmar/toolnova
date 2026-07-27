"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Target,
  Calendar,
  Rocket,
  CheckCircle,
  Lightbulb,
  Trophy,
  Users,
  Star,
  Zap,
  TrendingUp,
  Award,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"category",
    label:"Goal Category",
    type:"select" as const,
    options: [
      { value:"career", label:"💼 Career" },
      { value:"personal", label:"🌟 Personal Growth" },
      { value:"fitness", label:"💪 Health & Fitness" },
      { value:"financial", label:"💰 Financial" },
      { value:"learning", label:"📚 Learning" },
    ] as const,
    defaultValue:"career",
  },
  {
    id:"timeframe",
    label:"Timeframe",
    type:"select" as const,
    options: [
      { value:"30days", label:"📅 30 Days" },
      { value:"90days", label:"📅 90 Days" },
      { value:"6months", label:"📅 6 Months" },
      { value:"1year", label:"📅 1 Year" },
    ] as const,
    defaultValue:"90days",
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const category = options?.category ||"career";
  const timeframe = options?.timeframe ||"90days";

  const timeframeText: Record<string, string> = {"30days":"30 days (1 month)","90days":"90 days (3 months)","6months":"6 months","1year":"1 year",
  };

  const timeframeStrategy: Record<string, string> = {"30days":"SPRINT MODE: Focus on 1-2 high-impact objectives. Weekly milestones with daily action items. No time for exploration—prioritize execution. Every day counts. Include a Week 1 quick-win to build momentum.","90days":"QUARTER PLAN: The sweet spot for meaningful transformation. Monthly phases: Month 1 = foundation & learning, Month 2 = execution & building, Month 3 = optimization & results. Bi-weekly check-ins.","6months":"HALF-YEAR JOURNEY: Room for skill development and habit formation. Build in learning curves and plateaus. Monthly milestones with quarterly reviews. Allow 2-3 weeks for course correction.","1year":"ANNUAL TRANSFORMATION: Full lifecycle planning with seasonal phases. Q1 = research & setup, Q2 = build & grow, Q3 = scale & optimize, Q4 = harvest & plan next. Include mid-year review and pivot point.",
  };

  const categoryGuidance: Record<string, string> = {
    career:"CAREER DEVELOPMENT: Focus on professional development, skill acquisition, promotions, projects, and networking. Include industry-specific certifications, portfolio building, mentorship, LinkedIn presence, and measurable career milestones (title changes, salary increases, project completions). Consider the 70-20-10 learning model (70% on-the-job, 20% social learning, 10% formal training).",
    personal:"PERSONAL GROWTH: Focus on habits, relationships, mindfulness, hobbies, and life satisfaction. Use habit stacking and the 21/90 rule (21 days to build, 90 days to make permanent). Include self-care routines, journaling, relationship quality metrics, and personal fulfillment indicators. Address all life dimensions: mental, emotional, social, spiritual.",
    fitness:"FITNESS & HEALTH: Focus on exercise routines, nutrition, physical achievements, and wellness habits. Include progressive overload principles, nutrition tracking (macros/calories), body composition changes, and performance metrics (reps, weight, time, distance). Build in deload weeks and rest days. Reference evidence-based exercise science.",
    financial:"FINANCIAL PLANNING: Focus on savings rate, investments, debt reduction, income growth, and financial literacy. Include specific dollar targets, emergency fund milestones, debt snowball/avalanche strategy, investment allocation, and net worth tracking. Consider tax implications, compounding calculations, and multiple income streams.",
    learning:"SKILL DEVELOPMENT: Focus on skills acquisition, courses, certifications, practice projects, and knowledge milestones. Use the Dreyfus model (Novice → Advanced Beginner → Competent → Proficient → Expert). Include deliberate practice schedules, portfolio projects, knowledge assessments, and community engagement. Track both input metrics (hours studied) and output metrics (skills demonstrated).",
  };

  return`You are an expert strategic life coach, certified goal-setting specialist, and behavioral change consultant who combines SMART methodology with OKR (Objectives & Key Results) frameworks, habit science, and positive psychology to create transformation plans with exceptionally high completion rates.

## YOUR TASK
Create a comprehensive, actionable goal plan for the following ${category} goal to be achieved within ${timeframeText[timeframe]}, designed for maximum likelihood of success.

## SPECIFICATIONS
**Category**: ${category.toUpperCase()} - ${categoryGuidance[category]}
**Timeframe**: ${timeframeText[timeframe].toUpperCase()} - ${timeframeStrategy[timeframe]}
**Framework**: SMART Goals + OKR System + Habit Science
**Output**: A complete, ready-to-execute plan with clear accountability

## GOAL PLANNING FRAMEWORK

### 1. SMART GOAL DEFINITION
Transform the user's goal into a precisely defined SMART objective:

- **S - Specific**: Define exactly what will be accomplished, who is involved, and where it happens. Avoid vague language. Use the"W questions" (What, Why, Who, Where, Which).
- **M - Measurable**: Establish concrete metrics and KPIs. Define"How much?","How many?", and"How will I know when it's accomplished?" Include both leading indicators (actions taken) and lagging indicators (results achieved).
- **A - Achievable**: Assess feasibility given current resources, skills, and constraints. If the goal is stretch, identify the gap and how to bridge it. Reference comparable achievements.
- **R - Relevant**: Connect to broader life/career objectives. Explain WHY this goal matters and what achieving it enables. Link to values and long-term vision.
- **T - Time-bound**: Set the deadline as ${timeframeText[timeframe]} with interim checkpoints. Create urgency without panic.

**Refined SMART Goal Statement**: Write one clear, powerful sentence that captures the complete SMART goal.

### 2. OKR BREAKDOWN (Objectives & Key Results)

**Objective**: [Inspiring, qualitative statement of the goal]

**Key Results** (3-5 measurable outcomes):
- KR1: [Specific metric] from [baseline] to [target] by [date]
- KR2: [Specific metric] from [baseline] to [target] by [date]
- KR3: [Specific metric] from [baseline] to [target] by [date]
${timeframe !=="30days" ?"- KR4: [Specific metric] from [baseline] to [target] by [date]\n- KR5: [Specific metric] from [baseline] to [target] by [date]" :""}

**Confidence Level**: Rate each KR as 🟢 (confident), 🟡 (stretch), or 🔴 (moonshot)

### 3. MILESTONE TIMELINE

${timeframe ==="30days" ?`**Week-by-Week Breakdown**:

📅 **Week 1: Quick Win & Foundation** (Days 1-7)
- Primary focus: [Immediate actions to build momentum]
- Quick win: [One achievable result within 7 days]
- Setup tasks: [Tools, systems, habits to establish]

📅 **Week 2: Build** (Days 8-14)
- Primary focus: [Core work begins]
- Milestone: [Specific checkpoint]

📅 **Week 3: Accelerate** (Days 15-21)
- Primary focus: [Intensify efforts]
- Milestone: [Measurable progress point]

📅 **Week 4: Complete & Assess** (Days 22-30)
- Primary focus: [Final push and goal completion]
- Assessment: [Measure final results against KRs]` :""}

${timeframe ==="90days" ?`**Month-by-Month Breakdown**:

📅 **Month 1: Foundation & Learning** (Days 1-30)
- Theme: Build knowledge, establish habits, set up systems
- Weekly milestones with specific deliverables
- Quick win by end of Week 1

📅 **Month 2: Execution & Building** (Days 31-60)
- Theme: Apply learning, build momentum, track progress
- Bi-weekly milestones with measurable outcomes
- Mid-point review at Day 45

📅 **Month 3: Optimization & Results** (Days 61-90)
- Theme: Refine approach, maximize results, hit targets
- Weekly accountability check-ins
- Final assessment at Day 90` :""}

${timeframe ==="6months" ?`**Monthly Breakdown**:

📅 **Months 1-2: Research & Setup**
📅 **Month 3: Implementation**
📅 **Month 4: Building Momentum**
📅 **Month 5: Optimization**
📅 **Month 6: Final Push & Results**

For each month, include: theme, primary objectives, key deliverables, and success criteria.` :""}

${timeframe ==="1year" ?`**Quarterly Breakdown**:

📅 **Q1 (Months 1-3): Research, Setup & Foundation**
📅 **Q2 (Months 4-6): Build & Grow**
📅 **Q3 (Months 7-9): Scale & Optimize**
📅 **Q4 (Months 10-12): Harvest, Refine & Plan Next**

For each quarter, include: theme, monthly milestones, key deliverables, and quarterly review criteria. Include mid-year review and pivot point.` :""}

### 4. ACTION ITEMS & HABITS

**High-Impact Actions** (ranked by importance):
1. [Action] — Priority: 🔴 Critical | Time: [estimate] | Deadline: [date]
2. [Action] — Priority: 🟡 Important | Time: [estimate] | Deadline: [date]
[Continue for 8-12 actions]

**Daily Habits** (small, consistent actions):
- Morning: [5-15 min habit related to goal]
- During day: [Micro-action or mindset practice]
- Evening: [Reflection or preparation for tomorrow]

**Weekly Rituals**:
- [Day]: [Weekly review/planning session]
- [Day]: [Specific weekly action]

### 5. SUCCESS METRICS & TRACKING

**Primary Metrics** (directly measure goal achievement):
| Metric | Baseline | Target | Current | Tracking Method |
| --- | --- | --- | --- | --- |
| [Metric 1] | [Start] | [Goal] | — | [How to track] |
| [Metric 2] | [Start] | [Goal] | — | [How to track] |

**Leading Indicators** (predict future success):
- [Input metric]: [target frequency/amount]
- [Process metric]: [target frequency/amount]

**Weekly Review Questions**:
1. What progress did I make toward my KRs?
2. What worked well? What didn't?
3. What's my #1 priority for next week?
4. Am I on track? If not, what needs to change?

### 6. OBSTACLE ANTICIPATION & MITIGATION

For each obstacle, use the **If-Then** framework:

| Obstacle | Likelihood | Impact | If-Then Plan |
| --- | --- | --- | --- |
| [Challenge 1] | High/Med/Low | High/Med/Low | IF [trigger], THEN [specific action] |
| [Challenge 2] | — | — | IF [trigger], THEN [specific action] |
| [Challenge 3] | — | — | IF [trigger], THEN [specific action] |
${timeframe !=="30days" ?"| [Challenge 4] | — | — | IF [trigger], THEN [specific action] |\n| [Challenge 5] | — | — | IF [trigger], THEN [specific action] |" :""}

**Contingency plan**: If significantly off-track by [midpoint], then [fallback strategy].

### 7. RESOURCES & SUPPORT

**Tools & Systems**:
- Task management: [Recommended tool]
- Habit tracking: [Recommended tool]
- Progress visualization: [Method]

**Knowledge Resources**:
- [Books, courses, or guides relevant to this specific goal]
- [Communities or forums for support]

**People & Support**:
- Accountability partner: [How to set up]
- Mentor/coach: [How to find one for this domain]
- Community: [Relevant groups or networks]

${category ==="financial" ?"**Financial Tools**: Budgeting apps, investment platforms, compound interest calculators" :""}
${category ==="fitness" ?"**Fitness Tools**: Workout tracking apps, nutrition calculators, body measurement tools" :""}
${category ==="learning" ?"**Learning Platforms**: Specific course recommendations, practice environments, credential programs" :""}

### 8. MOTIVATION & ACCOUNTABILITY

**Reward System**:
- Milestone 1 reached → [Specific reward]
- 50% complete → [Meaningful reward]
- Goal achieved → [Celebration plan]

**Accountability Methods**:
- Daily: [Self-tracking method]
- Weekly: [Review ritual]
- Monthly: [Progress share or check-in]

**Motivation Anchors**:
- Vision statement: [1-2 sentence inspiring vision of the achieved goal]
- Why it matters: [Deep personal reason]
- Identity statement:"I am someone who [goal-aligned identity]"

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ SMART criteria are all explicitly addressed
2. ✓ KRs are specific, measurable, and time-bound
3. ✓ Milestones are realistic for ${timeframeText[timeframe]}
4. ✓ Action items are specific (start with action verbs) and sequenced
5. ✓ Daily/weekly habits are small enough to maintain consistently
6. ✓ Metrics include both leading and lagging indicators
7. ✓ Obstacles have specific If-Then mitigation plans
8. ✓ Resources are specific to this goal (not generic advice)
9. ✓ Rewards and accountability methods are defined
10. ✓ Plan is immediately actionable (user can start today)
11. ✓ ${category}-specific guidance is incorporated
12. ✓ Progress tracking system is practical and sustainable

## GOAL TO PLAN
${input}

## OUTPUT FORMAT

Present the plan with clear markdown headers, tables, and emoji indicators. Make it visually scannable and immediately actionable.

Do NOT include:
- Generic motivational quotes or platitudes
- Vague advice ("work hard,""stay focused")
- Actions that don't directly contribute to the goal
- Unrealistic expectations for the timeframe
- Your commentary about the planning process

Create a detailed, evidence-based, immediately actionable goal plan:`;
};


const features = [
  {
    icon: Target,
    title:"SMART Goal Framework",
    description:"Create Specific, Measurable, Achievable, Relevant, and Time-bound goals with structured planning.",
  },
  {
    icon: TrendingUp,
    title:"Milestone Tracking",
    description:"Break down big goals into manageable milestones with clear checkpoints and progress indicators.",
  },
  {
    icon: CheckCircle,
    title:"Action-Oriented Plans",
    description:"Get specific action items, success metrics, obstacle solutions, and motivation strategies.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"State Goal",
    desc:"Describe what you want to achieve",
    icon: Target,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Timeline",
    desc:"Choose category and timeframe",
    icon: Calendar,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Plan",
    desc:"Receive your actionable roadmap",
    icon: Rocket,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Goal Planner?",
    answer:"The Goal Planner is an AI-powered tool that transforms your aspirations into structured, actionable plans using the SMART framework. It creates comprehensive roadmaps with milestones, action items, success metrics, obstacle solutions, and motivation strategies. Perfect for career goals, personal development, fitness targets, financial objectives, or learning ambitions.",
  },
  {
    question:"What's a SMART goal?",
    answer:"SMART is the gold standard for goal setting: Specific (clearly defined), Measurable (with concrete metrics), Achievable (realistic and attainable), Relevant (aligned with broader objectives), and Time-bound (with clear deadlines). This framework dramatically increases the likelihood of goal achievement by providing structure and accountability.",
  },
  {
    question:"What goal categories are available?",
    answer:"Choose from five categories: Career (promotions, skills, projects), Personal Growth (habits, relationships, development), Health & Fitness (exercise, nutrition, wellness), Financial (savings, investments, debt reduction), or Learning (skills, courses, certifications). Each category provides tailored guidance and relevant metrics.",
  },
  {
    question:"How detailed is the plan?",
    answer:"Very detailed! Each plan includes: SMART goal breakdown, milestone timeline with dates, 5-10 specific action items, success metrics and KPIs, potential obstacles with solutions, required resources, and motivation strategies. You get everything needed to turn your goal from dream to reality.",
  },
  {
    question:"What timeframes can I choose?",
    answer:"Select from four timeframes: 30 Days (for quick wins and habit formation), 90 Days (ideal for substantial progress), 6 Months (for significant transformations), or 1 Year (for major life changes). The plan adjusts milestone frequency and action item pacing based on your chosen timeline.",
  },
  {
    question:"Is the Goal Planner free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Revision Planner",
    slug:"revision-planner",
    icon: Calendar,
    color:"text-blue-600",
  },
  {
    name:"Todo List",
    slug:"todo-list-generator",
    icon: CheckCircle,
    color:"text-purple-600",
  },
  {
    name:"Interview Prep",
    slug:"interview-generator",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Cover Letter",
    slug:"cover-letter-writer",
    icon: Trophy,
    color:"text-orange-600",
  },
];

export default function GoalPlannerClient() {
  return (
    <PremiumToolWrapper
      toolName="AI Goal Planner"
      toolSlug="goal-planner"
      tagline="Turn dreams into actionable plans"
      description="Create SMART goal plans with milestones, action items, success metrics, and progress tracking strategies. Achieve what matters most!"
      badge="Achievement Unlock"
      category="Career Tools"
      categorySlug="career-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Plan Your Success"
      ctaDescription="A goal without a plan is just a wish. Start achieving today!"
      ctaButtonText="Create Plan"
      ctaIcon={Rocket}
    >
      <EnhancedToolLayout
        toolSlug="goal-planner"
        toolName="Goal Planner"
        placeholder={`🎯 Describe your goal in detail...

Examples:

Career Goal:
Get promoted to Senior Engineer within 6 months by demonstrating technical leadership, completing 2 major projects, and obtaining AWS certification

Personal Growth Goal:
Build a daily meditation habit and improve mental clarity by practicing 20 minutes daily for 90 days, reading 3 books on mindfulness, and joining a meditation community

Fitness Goal:
Run a half marathon (21km) in 3 months by following a structured training plan, running 4x per week, improving pace to sub-6 min/km, and maintaining proper nutrition

Financial Goal:
Save $10,000 for home down payment in 1 year by cutting unnecessary expenses, starting a side freelance business, automating savings, and investing $500 monthly

Learning Goal:
Learn conversational Spanish in 6 months by completing Duolingo course, practicing with native speakers 3x/week, watching Spanish shows, and passing DELE A2 exam

💡 Tip: Include specific targets, metrics, and context for the most comprehensive action plan!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📋 Your SMART Goal Plan"
        generateButtonText="🚀 Create Goal Plan"
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
