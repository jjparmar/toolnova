"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  CheckSquare,
  Calendar,
  Target,
  Lightbulb,
  Clock,
  List,
  Users,
  Star,
  Zap,
  TrendingUp,
  ListChecks,
  Sparkles,
} from"lucide-react";

const toolOptions = [
  {
    id:"category",
    label:"Category",
    type:"select" as const,
    options: [
      { value:"work", label:"💼 Work" },
      { value:"personal", label:"🏠 Personal" },
      { value:"study", label:"📚 Study" },
      { value:"project", label:"🚀 Project" },
      { value:"mixed", label:"🎯 Mixed" },
    ] as const,
    defaultValue:"mixed",
  },
  {
    id:"priority",
    label:"Add Priorities",
    type:"toggle" as const,
    defaultValue: true,
  },
  {
    id:"timeEstimates",
    label:"Time Estimates",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const category = options?.category ||"mixed";
  const priority = options?.priority !== false;
  const timeEstimates = options?.timeEstimates !== false;

  const categoryGuidance: Record<string, string> = {
    work:"PROFESSIONAL TASKS: Focus on deliverables, meetings, communications, and career-advancing activities. Apply the 80/20 rule—identify the 20% of tasks that drive 80% of results. Separate deep work (focus-intensive) from shallow work (administrative). Include stakeholder communication and deadline awareness.",
    personal:"PERSONAL TASKS: Focus on household management, errands, self-care, health, and relationship maintenance. Batch similar errands together (all shopping in one trip). Include recurring maintenance tasks. Balance obligations with enjoyable activities. Flag tasks that can be delegated or automated.",
    study:"ACADEMIC TASKS: Focus on assignments, reading, research, practice problems, and exam preparation. Sequence tasks by deadline proximity and dependency chain. Break large assignments into daily sub-tasks. Include active learning tasks (not just passive reading). Apply the Pomodoro technique for focused sessions.",
    project:"PROJECT TASKS: Focus on deliverables, phases, dependencies, and milestone tracking. Use work breakdown structure (WBS) principles. Identify critical path tasks vs. parallel tasks. Include review/approval steps. Flag blockers and dependencies between tasks. Note handoff points.",
    mixed:"MIXED TASKS: Balance different life areas (work, personal, health, learning). Color-code or tag by category. Ensure no single area dominates. Include both productive and restorative activities. Apply the 1-3-5 rule: 1 big thing, 3 medium things, 5 small things per day.",
  };

  const priorityFramework = priority
    ?`PRIORITY SYSTEM (Eisenhower Matrix):
- 🔴 **HIGH** (Do First): Urgent AND important. Deadlines today/tomorrow, critical deliverables, time-sensitive opportunities. These are non-negotiable.
- 🟡 **MEDIUM** (Schedule): Important but NOT urgent. Strategic work, skill development, relationship building, planning. These drive long-term success.
- 🟢 **LOW** (Fit In): Nice-to-have. Can be done if time permits, delegated, or deferred without consequences. These add polish but aren't essential.

Aim for distribution: ~20% High, ~50% Medium, ~30% Low. If everything is"High priority," nothing is.`
    :"";

  const timeFramework = timeEstimates
    ?`TIME ESTIMATION:
- Use realistic estimates based on task complexity (include setup/transition time)
- ⚡ Quick wins: 5-15 min (email, quick call, simple update)
- 🕐 Short tasks: 15-45 min (writing, planning, research)
- 🕑 Medium tasks: 1-2 hours (deep work, complex deliverables)
- 🕒 Long tasks: 2-4 hours (major projects, creative work)
- For tasks >4 hours, break into smaller sub-tasks
- Add 20% buffer to estimates for interruptions and context switching`
    :"";

  return`You are an expert productivity systems architect and task management specialist who combines GTD (Getting Things Done), Eisenhower Matrix, and Agile methodologies to transform overwhelming goals into clear, actionable, achievable task lists that drive completion and reduce cognitive overwhelm.

## YOUR TASK
Transform the provided goals, projects, and ideas into a structured, actionable todo list organized for ${category} tasks with maximum clarity and executability.

## SPECIFICATIONS
**Category**: ${category.toUpperCase()} - ${categoryGuidance[category]}
${priority ?`**Priority**: ENABLED\n${priorityFramework}` :"**Priority**: Disabled (no priority labels)"}
${timeEstimates ?`**Time Estimates**: ENABLED\n${timeFramework}` :"**Time Estimates**: Disabled (no time labels)"}
**Methodology**: GTD + Eisenhower Matrix + Work Breakdown Structure

## TODO LIST CREATION FRAMEWORK

### 1. TASK DECOMPOSITION RULES
- **Action verb start**: Every task MUST begin with a specific action verb (Write, Call, Review, Research, Design, Send, Update, Create, Schedule, Prepare, Complete, Submit, Analyze, Organize)
- **Single outcome**: Each task produces exactly ONE clear deliverable or outcome
- **2-hour rule**: If a task takes >2 hours, break it into sub-tasks
- **No ambiguity**: Anyone reading the task should know exactly what to do
- **Dependency aware**: Note if a task depends on another task's completion [depends on: #X]

**GOOD examples**:
- ✅"Draft Q1 budget proposal with revenue projections (3 pages)"
- ✅"Email Sarah the updated project timeline by 2 PM"
- ✅"Review and approve 5 pull requests in the frontend repo"

**BAD examples** (never create tasks like these):
- ❌"Work on project" (too vague)
- ❌"Stuff to do" (not actionable)
- ❌"Think about strategy" (not measurable)

### 2. ORGANIZATION STRUCTURE

**Group tasks into logical sections** using one of these approaches:

${category ==="project" ?`**Work Breakdown Structure**:
- **Phase 1: [Name]** — Foundation tasks
  - Task 1.1
  - Task 1.2
- **Phase 2: [Name]** — Build tasks
  - Task 2.1
- **Phase 3: [Name]** — Delivery tasks
  - Task 3.1` :""}

${category ==="work" ?`**By Work Type**:
- **🎯 Deep Work** — Focus-intensive tasks (schedule in morning)
- **📧 Communication** — Emails, calls, messages
- **📋 Administrative** — Reports, filing, organizing
- **🤝 Collaborative** — Meetings, reviews, discussions
- **📈 Strategic** — Planning, learning, career development` :""}

${category ==="personal" ?`**By Life Area**:
- **🏠 Home** — Household tasks and maintenance
- **🛒 Errands** — Shopping, appointments, pickups
- **💪 Health** — Exercise, meal prep, medical
- **👥 Relationships** — Family, friends, social
- **🌟 Self-care** — Hobbies, relaxation, personal growth` :""}

${category ==="study" ?`**By Academic Priority**:
- **📝 Assignments** — Due date ordered, with deadlines
- **📖 Reading** — Required and supplementary materials
- **🔬 Research** — Data gathering, analysis, writing
- **✍️ Practice** — Problems, exercises, skill application
- **🧪 Review** — Test prep, concept reinforcement` :""}

${category ==="mixed" ?`**By Life Category** (tag each task):
- **💼 Work** — Professional responsibilities
- **🏠 Personal** — Home and errands
- **📚 Learning** — Study and development
- **💪 Health** — Fitness and wellness
- **🎨 Creative** — Hobbies and projects` :""}

### 3. TASK FORMAT

Present each task consistently:

${priority && timeEstimates ?`**Format**: [Priority Emoji] **Task description** — ⏱️ [time estimate]
  - Sub-task 1 — ⏱️ [time]
  - Sub-task 2 — ⏱️ [time]` :""}
${priority && !timeEstimates ?`**Format**: [Priority Emoji] **Task description**
  - Sub-task 1
  - Sub-task 2` :""}
${!priority && timeEstimates ?`**Format**: **Task description** — ⏱️ [time estimate]
  - Sub-task 1 — ⏱️ [time]` :""}
${!priority && !timeEstimates ?`**Format**: **Task description**
  - Sub-task 1
  - Sub-task 2` :""}

### 4. COMPLETION TRACKING

Include for each section:
- ☐ Checkbox format for tracking (unchecked)
- Section subtotal: [X tasks, ~Y hours total]
${priority ?"- Priority summary: [X High, Y Medium, Z Low]" :""}

### 5. DAILY GAME PLAN (Optional Summary)

If the list contains enough tasks, suggest a daily execution order:
- **Start with**: [1 High-priority task to build momentum]
- **Focus block**: [2-3 Medium-priority deep work tasks]
- **Fill gaps with**: [Quick wins and Low-priority tasks]
- **End with**: [Planning/prep for tomorrow]

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ Every task starts with a specific action verb
2. ✓ No task is vague or ambiguous
3. ✓ Complex tasks are broken into sub-tasks (nothing >2 hours without breakdown)
4. ✓ Tasks are grouped logically by category or phase
5. ✓ ${priority ?"Priorities follow Eisenhower distribution (~20% High, ~50% Med, ~30% Low)" :"Tasks are organized by logical sequence"}
6. ✓ ${timeEstimates ?"Time estimates are realistic (include 20% buffer)" :"Task scope is clear even without time estimates"}
7. ✓ Dependencies between tasks are noted
8. ✓ All input goals/projects are represented in the task list
9. ✓ Tasks are immediately actionable (no prerequisite information missing)
10. ✓ List is comprehensive but not overwhelming

## GOALS/PROJECTS TO ORGANIZE INTO TASKS
${input}

## OUTPUT FORMAT

Use markdown with checkboxes (☐), clear section headers, and ${priority ?"priority emojis (🔴🟡🟢)" :"organized groupings"}. ${timeEstimates ?"Include ⏱️ time estimates for each task." :""} End with a total task count and ${timeEstimates ?"estimated total time" :"section summary"}.

Do NOT include:
- Vague or unmeasurable tasks
- Tasks not derivable from the provided input
- Motivational commentary or productivity advice
- Duplicate tasks across sections
- Your commentary about the list creation process

Create a comprehensive, actionable, well-organized todo list:`;
};


const features = [
  {
    icon: ListChecks,
    title:"Smart Task Breakdown",
    description:"Automatically breaks down large goals into smaller, manageable, actionable tasks you can start immediately.",
  },
  {
    icon: Target,
    title:"Priority Levels",
    description:"Assigns High, Medium, or Low priority to each task based on urgency and importance for better focus.",
  },
  {
    icon: Clock,
    title:"Time Estimates",
    description:"Provides realistic time estimates for each task to help you plan your day and manage time effectively.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"List Goals",
    desc:"Describe what needs to be done",
    icon: List,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Options",
    desc:"Choose category, priorities, and time estimates",
    icon: Clock,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Organized",
    desc:"Receive structured list and start checking off!",
    icon: CheckSquare,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Todo List Generator?",
    answer:"The Todo List Generator is an AI-powered productivity tool that transforms your goals, projects, and vague ideas into organized, actionable todo lists. It breaks down complex objectives into specific tasks, assigns priorities, estimates time requirements, and structures everything for maximum productivity. Perfect for work projects, personal goals, study plans, or any area where you need to get things done.",
  },
  {
    question:"How are tasks prioritized?",
    answer:"When priorities are enabled, tasks are assigned High (urgent and important - do these first), Medium (important but not urgent - schedule these), or Low (nice-to-have - do when time permits) levels. The AI considers urgency, importance, dependencies, and impact when assigning priorities to help you focus on what matters most.",
  },
  {
    question:"Are time estimates accurate?",
    answer:"Time estimates are based on typical task complexity and provide reasonable benchmarks (e.g., 15 min for quick tasks, 1-2 hours for moderate tasks, half-day for complex tasks). They're meant as guidelines you can adjust based on your own pace, experience level, and working style. Use them for planning and time-blocking your day.",
  },
  {
    question:"What task categories are available?",
    answer:"Choose from five categories: Work (professional tasks and deliverables), Personal (household and life tasks), Study (academic assignments and learning), Project (specific project deliverables), or Mixed (combination across life areas). Each category influences how tasks are organized and prioritized.",
  },
  {
    question:"How does task breakdown work?",
    answer:"The AI analyzes your input and breaks large goals or vague objectives into specific, actionable tasks. For example, 'Launch website' becomes: create content, design pages, set up hosting, configure domain, test functionality, etc. Each task starts with an action verb and is concrete enough to complete in one session.",
  },
  {
    question:"Is the Todo List Generator free?",
    answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.",
  },
];

const relatedTools = [
  {
    name:"Timetable Generator",
    slug:"timetable-generator",
    icon: Calendar,
    color:"text-blue-600",
  },
  {
    name:"Goal Planner",
    slug:"goal-planner",
    icon: Target,
    color:"text-purple-600",
  },
  {
    name:"Revision Planner",
    slug:"revision-planner",
    icon: Lightbulb,
    color:"text-green-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: List,
    color:"text-orange-600",
  },
];

export default function TodoListGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="Todo List Generator"
      toolSlug="todo-list-generator"
      tagline="Turn goals into actionable tasks"
      description="Create organized, prioritized todo lists with time estimates. Break down projects into manageable tasks and boost your productivity!"
      badge="Productivity Boost"
      category="Career Tools"
      categorySlug="career-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Get Things Done"
      ctaDescription="Organize your tasks and accomplish more every day!"
      ctaButtonText="Create Todo List"
      ctaIcon={CheckSquare}
    >
      <EnhancedToolLayout
        toolSlug="todo-list-generator"
        toolName="Todo List Generator"
        placeholder={`📋 Describe your goals, projects, or what you need to accomplish...

Examples:

Work Project:
Launch new marketing website by end of month
- Need to finalize design mockups
- Write all page content (homepage, about, services, contact)
- Set up hosting and domain
- Implement SEO best practices
- Test on mobile devices
- Get stakeholder approval

Personal Goals:
Organize and clean home office
- Sort through old papers and files
- Organize desk drawers and supplies
- Clean computer cables and setup
- Donate unused items
- Paint walls and add decorations

Study Tasks:
Prepare for final exams next week
- Review chapters 1-10 of biology textbook
- Complete practice problems for calculus
- Create study notes for history
- Attend review sessions
- Form study group with classmates

Project Launch:
Complete online course platform MVP
- Design user dashboard
- Build authentication system
- Create course upload functionality
- Implement video player
- Add payment integration
- Write documentation

Mixed Daily Tasks:
Tomorrow's schedule: Work presentation, gym, grocery shopping, call mom, finish report, meal prep for week, respond to emails, pay bills

💡 Tip: Include all tasks, big or small - the AI will organize and prioritize everything for you!`}
        inputRows={12}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="✅ Your Organized Todo List"
        generateButtonText="📝 Generate Todo List"
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
