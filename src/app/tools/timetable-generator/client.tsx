"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";
import { PremiumToolWrapper } from"@/components/PremiumToolWrapper";
import { FAQSection } from"@/components/FAQSection";
import { ToolOption } from"@/components/ToolLayout";
import {
  Calendar,
  Clock,
  Target,
  BookOpen,
  Lightbulb,
  CheckSquare,
  Users,
  Star,
  Zap,
  CalendarDays,
  TrendingUp,
  LayoutGrid,
} from"lucide-react";

const toolOptions = [
  {
    id:"days",
    label:"Days Per Week",
    type:"select" as const,
    options: [
      { value:"5", label:"📅 5 Days (Weekdays)" },
      { value:"6", label:"📅 6 Days" },
      { value:"7", label:"📅 7 Days" },
    ] as const,
    defaultValue:"5",
  },
  {
    id:"format",
    label:"Format",
    type:"select" as const,
    options: [
      { value:"detailed", label:"📋 Detailed Schedule" },
      { value:"simple", label:"📝 Simple Overview" },
      { value:"blocks", label:"🧱 Time Blocks" },
    ] as const,
    defaultValue:"detailed",
  },
  {
    id:"includeBreaks",
    label:"Include Breaks",
    type:"toggle" as const,
    defaultValue: true,
  },
] as const;

const generatePrompt = (input: string, options?: Record<string, any>) => {
  const days = options?.days ||"5";
  const format = options?.format ||"detailed";
  const includeBreaks = options?.includeBreaks !== false;

  const formatStyles: Record<string, string> = {
    detailed:"Precise schedule with exact start/end times, duration, and brief description for every activity. Include specific time slots (e.g., 6:00 AM - 7:00 AM).",
    simple:"Clean overview listing main activities with approximate time ranges. Focus on what happens in each part of the day without minute-by-minute detail.",
    blocks:"Time block format organizing activities into Morning (6 AM-12 PM), Afternoon (12 PM-5 PM), and Evening (5 PM-10 PM) blocks. List activities within each block with approximate durations.",
  };

  const daysLabel: Record<string, string> = {"5":"Monday through Friday (weekdays only, weekends free)","6":"Monday through Saturday (Sunday rest day)","7":"Monday through Sunday (full week coverage)",
  };

  const breakStrategy = includeBreaks
    ?"BREAK INTEGRATION: Include 10-15 minute transition breaks between major activity changes. Add a 30-60 minute recharge break midday. Include buffer time (15-30 min) between scheduled blocks for unexpected delays. Mark breaks clearly in the schedule."
    :"Schedule activities in continuous flow. Use activity transitions as natural breaks.";

  return`You are an expert productivity coach, time management specialist, and behavioral psychologist who designs realistic, balanced weekly schedules. You understand energy management, ultradian rhythms, task batching, and the importance of work-life balance in creating sustainable routines.

## YOUR TASK
Create a ${format} weekly timetable covering ${days} days that organizes all listed activities into a realistic, balanced, and sustainable schedule.

## SPECIFICATIONS
**Days**: ${daysLabel[days]}
**Format**: ${format.toUpperCase()} - ${formatStyles[format]}
**Breaks**: ${breakStrategy}
**Philosophy**: Balance productivity with wellness; sustainable schedules beat intense ones

## TIMETABLE DESIGN FRAMEWORK

### 1. ENERGY MAPPING PRINCIPLES
Design the schedule around natural human energy patterns:

**Peak Energy (Morning 6-11 AM)**:
- Schedule the most cognitively demanding tasks
- Deep work, studying, creative tasks, problem-solving
- Avoid routine or administrative tasks during this window

**Sustained Energy (Late Morning - Afternoon 11 AM-3 PM)**:
- Collaborative work, meetings, classes, discussions
- Tasks requiring moderate focus
- Schedule lunch and a recharge break in this window

**Declining Energy (Afternoon 3-5 PM)**:
- Lighter tasks, admin work, email, organizing
- Physical activities (gym, sports, walks) to re-energize
- Review sessions or lighter study material

**Recovery Period (Evening 5-10 PM)**:
- Personal time, hobbies, socializing, family
- Light review or reading (not intensive study)
- Meal preparation, relaxation, wind-down routine
- Screen-free time before sleep recommended

### 2. SCHEDULING PRINCIPLES

**Task Batching**:
- Group similar activities together to minimize context switching
- Schedule all classes/meetings in continuous blocks when possible
- Batch errands on a single day or time slot

**Consistency**:
- Keep recurring activities at the same time each day
- Maintain consistent wake-up and sleep times
- Anchor habits to fixed daily rituals

**Buffer Time**:
- Add 15-30 min buffers between major activities
- Don't schedule back-to-back intensive tasks
- Leave ${days ==="7" ?"2-3 hours" :"1-2 hours"} per day unscheduled for flexibility

**Balance Check**:
- No day should exceed 12 hours of scheduled activities
- Each day must include: meals (3), personal time (1+ hr), adequate sleep (7-8 hrs)
- Distribute workload evenly—don't front-load the week
- Include at least 1 recreational/enjoyable activity per day

### 3. FORMAT-SPECIFIC OUTPUT RULES

${format ==="detailed" ?`**Detailed Schedule Format**:
Present each day as a table or time-stamped list:

**📅 [Day Name]**
| Time | Activity | Duration | Notes |
| --- | --- | --- | --- |
| 6:00-6:30 AM | Morning Routine | 30 min | Wake up, hygiene, breakfast |
| 6:30-8:00 AM | [Activity] | 90 min | [Brief context] |
[Continue for all waking hours]

- Include exact start and end times
- Specify duration for each activity
- Add brief notes for context or priority
- Use consistent time formatting (AM/PM)` :""}

${format ==="simple" ?`**Simple Schedule Format**:
Present each day as a clean list:

**📅 [Day Name]**
🌅 Morning: [Main activities with approximate times]
☀️ Afternoon: [Main activities with approximate times]
🌙 Evening: [Main activities with approximate times]

- Keep it scannable and uncluttered
- Focus on what, not exact when
- Group activities by time period
- Include approximate durations in parentheses` :""}

${format ==="blocks" ?`**Time Block Format**:
Present each day in three blocks:

**📅 [Day Name]**

🌅 **MORNING BLOCK (6 AM - 12 PM)**
- [Activity 1] (~duration)
- [Activity 2] (~duration)
${includeBreaks ?"- ☕ Break (15 min)" :""}

☀️ **AFTERNOON BLOCK (12 PM - 5 PM)**
- 🍽️ Lunch (1 hr)
- [Activity 3] (~duration)
- [Activity 4] (~duration)

🌙 **EVENING BLOCK (5 PM - 10 PM)**
- [Activity 5] (~duration)
- [Personal/Leisure time]
- 😴 Wind-down routine

- Group activities within each block
- Show block boundaries clearly
- Include transition time between blocks` :""}

### 4. WEEKLY OVERVIEW

After the daily schedules, include:
- **Weekly summary**: Total hours per activity category
- **Balance assessment**: Work/study vs personal time ratio
- **Flexibility notes**: Which slots can be swapped if needed

## QUALITY CHECKPOINTS

Before finalizing, verify:
1. ✓ All listed activities are scheduled with realistic time allocations
2. ✓ No day exceeds a sustainable number of active hours
3. ✓ Energy levels are considered (hard tasks in morning, light in evening)
4. ✓ Meals, sleep, and personal time are included every day
5. ✓ ${includeBreaks ?"Breaks and buffers are included between activities" :"Activity transitions are logical"}
6. ✓ Similar activities are batched together where possible
7. ✓ Recurring activities are at consistent times across days
8. ✓ Work-life balance is maintained (not all work, not all play)
9. ✓ Format matches ${format} style requirements
10. ✓ Schedule is realistic and followable by a real person
11. ✓ ${days ==="7" ?"Weekend activities differ from weekdays" : days ==="6" ?"Saturday has a different pace from weekdays" :"Weekdays only, no weekend scheduling"}
12. ✓ No time conflicts or overlapping activities

## ACTIVITIES & PREFERENCES TO SCHEDULE
${input}

## OUTPUT FORMAT

Present the complete timetable starting with a brief overview, then day-by-day schedules. ${format ==="detailed" ?"Use tables for each day." :""} End with the weekly summary.

Do NOT include:
- Generic productivity advice or motivational text
- Activities not mentioned or implied by the user
- Unrealistic scheduling (studying 10 hours straight)
- Your commentary about the schedule design
- Overly rigid timing that doesn't allow flexibility

Create a well-organized, realistic, and balanced weekly timetable:`;
};


const features = [
  {
    icon: CalendarDays,
    title:"Flexible Scheduling",
    description:"Choose 5, 6, or 7-day weeks with detailed, simple, or time-block formats to match your lifestyle.",
  },
  {
    icon: LayoutGrid,
    title:"Balanced Distribution",
    description:"Activities intelligently distributed across your week considering energy levels and productivity patterns.",
  },
  {
    icon: Clock,
    title:"Strategic Breaks",
    description:"Includes optimal break times and buffer periods to maintain energy and handle unexpected events.",
  },
];

const howItWorks = [
  {
    step: 1,
    title:"List Activities",
    desc:"Add everything you need to schedule",
    icon: BookOpen,
    color:"from-blue-500 to-indigo-600",
  },
  {
    step: 2,
    title:"Set Options",
    desc:"Choose days, format, and preferences",
    icon: Clock,
    color:"from-purple-500 to-pink-600",
  },
  {
    step: 3,
    title:"Get Schedule",
    desc:"Follow your organized timetable",
    icon: Calendar,
    color:"from-green-500 to-emerald-600",
  },
];

const faqs = [
  {
    question:"What is the Timetable Generator?",
    answer:"The Timetable Generator is an AI-powered scheduling tool that creates balanced, realistic weekly timetables based on your activities, commitments, and preferences. It considers productivity patterns, energy levels, and work-life balance to organize your week optimally. Perfect for students, professionals, or anyone juggling multiple responsibilities.",
  },
  {
    question:"How detailed are the timetables?",
    answer:"Choose from three formats: Detailed Schedule (exact times and durations for each activity), Simple Overview (main activities with approximate times for quick reference), or Time Blocks (activities grouped into morning/afternoon/evening blocks). Select based on how much structure you need and your scheduling style.",
  },
  {
    question:"Can I include personal and work activities?",
    answer:"Absolutely! Include everything: study time, work hours, gym sessions, hobbies, social activities, meal times, sleep schedule, and more. The more complete your activity list, the better the timetable will balance your commitments. It works for students, professionals, parents, or anyone with a busy schedule.",
  },
  {
    question:"What's the difference between 5, 6, and 7 days?",
    answer:"5 Days schedules weekdays (Monday-Friday) leaving weekends free. 6 Days includes Saturday for activities requiring extra time. 7 Days creates a full week schedule including Sunday. Choose based on your commitment patterns - most students and professionals use 5-day schedules with dedicated weekend time for flexibility.",
  },
  {
    question:"How are breaks scheduled?",
    answer:"When enabled, the timetable includes strategic 10-15 minute breaks between activities to prevent fatigue and maintain productivity. It also adds buffer time for transitions and unexpected delays. Breaks are positioned based on activity intensity - more breaks after demanding tasks, fewer after lighter activities.",
  },
  {
    question:"Is the Timetable Generator free?",
    answer:"Yes! The Timetable Generator is completely free to use. Create unlimited weekly schedules for any purpose without any cost. Perfect for organizing study schedules, work routines, fitness plans, or balancing multiple commitments efficiently.",
  },
];

const relatedTools = [
  {
    name:"Revision Planner",
    slug:"revision-planner",
    icon: BookOpen,
    color:"text-blue-600",
  },
  {
    name:"Goal Planner",
    slug:"goal-planner",
    icon: Target,
    color:"text-purple-600",
  },
  {
    name:"Todo List",
    slug:"todo-list-generator",
    icon: CheckSquare,
    color:"text-green-600",
  },
  {
    name:"Notes Generator",
    slug:"notes-generator",
    icon: Lightbulb,
    color:"text-orange-600",
  },
];

export default function TimetableGeneratorClient() {
  return (
    <PremiumToolWrapper
      toolName="Timetable Generator"
      toolSlug="timetable-generator"
      tagline="Organize your week perfectly"
      description="Create balanced weekly schedules for studying, work, and personal activities. Intelligent time allocation with strategic breaks and realistic planning."
      badge="Time Manager"
      category="Study Tools"
      categorySlug="study-tools"
      features={features}
      howItWorks={howItWorks}
      relatedTools={relatedTools}
      ctaTitle="Create Your Timetable"
      ctaDescription="Time well spent starts with good planning. Organize your week now!"
      ctaButtonText="Generate Schedule"
      ctaIcon={Calendar}
    >
      <EnhancedToolLayout
        toolSlug="timetable-generator"
        toolName="Timetable Generator"
        placeholder={`📅 List your activities and preferences...

Examples:

• Study time: 4 hours daily for Mathematics and Physics (mornings preferred)
• Work: Part-time job 3-6 PM on weekdays
• Gym: 1 hour workout, 3 days a week (evening preferred)
• Classes: University lectures Monday, Wednesday, Friday 9 AM - 2 PM
• Hobbies: Guitar practice 30 min daily, Gaming 2 hours on weekends
• Personal: Meal prep Sundays, Family time Saturday evenings
• Sleep: 7-8 hours, prefer sleeping by 11 PM

OR

• Morning routine: 6-8 AM (workout, breakfast, prepare for day)
• Work: 9 AM - 5 PM Monday to Friday (desk job, remote)
• Lunch break: 1 hour
• Side project: 2 hours daily for app development
• Learning: 1 hour daily for Spanish lessons
• Free time: Reading, Netflix, friends

💡 Tip: Include time preferences (morning/evening), durations, and priorities for the most useful schedule!`}
        inputRows={10}
        maxHistoryItems={10}
        options={toolOptions}
        generatePrompt={generatePrompt}
        resultLabel="📆 Your Weekly Timetable"
        generateButtonText="📅 Generate Timetable"
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
