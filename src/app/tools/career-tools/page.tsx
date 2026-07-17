import Link from 'next/link';
import { CareerToolsClient } from './client';
import { getCategoryAEO } from '@/lib/global-aeo-content';
import { generateFAQPageSchema, generateBreadcrumbListSchema, CATEGORY_BREADCRUMBS } from '@/lib/seo-worldclass';

export const metadata = {
    title: 'Career Tools - Cover Letter, Interview Prep & More | ToolNova',
    description: 'Free career tools: cover letter writer, interview question generator, goal planner, timetable generator, to-do list generator.',
    alternates: { canonical: 'https://www.toolnovahub.com/tools/career-tools' },
    openGraph: {
        title: 'Career Tools - Cover Letter, Interview Prep & More | ToolNova',
        description: 'Explore free AI career tools for cover letters, interviews, resumes, and productivity planning.',
        url: 'https://www.toolnovahub.com/tools/career-tools',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Career Tools | ToolNova',
        description: 'Free career tools for cover letters, interviews, resumes, and planning.',
    },
};

const tools = [
    { name: 'Resume Bullets', slug: 'resume-bullets', description: 'Turn duties into achievement-focused bullets', icon: 'FileText', badge: 'Popular', badgeColor: 'bg-amber-500' },
    { name: 'Cover Letter Writer', slug: 'cover-letter-writer', description: 'Generate professional cover letters', icon: 'FileText', badge: 'Top Rated', badgeColor: 'bg-yellow-500' },
    { name: 'LinkedIn Optimizer', slug: 'linkedin-optimizer', description: 'Improve headline, About, and experience', icon: 'Linkedin' },
    { name: 'Interview Generator', slug: 'interview-generator', description: 'Practice with role-specific questions', icon: 'User' },
    { name: 'Bio Generator', slug: 'bio-generator', description: 'Write bios for LinkedIn, sites, and events', icon: 'User' },
    { name: 'Goal Planner', slug: 'goal-planner', description: 'Break down goals into actionable steps', icon: 'Target' },
    { name: 'Timetable Generator', slug: 'timetable-generator', description: 'Create structured weekly schedules', icon: 'Calendar' },
    { name: 'To-Do List Generator', slug: 'todo-list-generator', description: 'Turn goals into organized task lists', icon: 'CheckSquare' },
];

export default function CareerToolsPage() {
    const aeoContent = getCategoryAEO('career-tools');
    const faqSchema = generateFAQPageSchema(aeoContent.faqs);
    const breadcrumbSchema = generateBreadcrumbListSchema(CATEGORY_BREADCRUMBS['career-tools']);

    return (
        <div className="min-h-screen w-full bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="mx-auto max-w-[1200px] px-6 py-10">
                <CareerToolsClient tools={tools} />
            </div>

            {/* Rich Editorial Content to satisfy Google AdSense High-Quality / Thin Content policies */}
            <section className="mx-auto max-w-4xl px-6 mt-16 pb-20 border-t border-border/60 pt-16 prose prose-neutral prose-lg">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-6">
                    Navigating the Modern Job Market: ATS Optimization & Resume Strategy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Securing a position in today’s highly competitive employment landscape requires a strategic approach to application materials. Most mid-to-large-size organizations filter applications using automated Applicant Tracking Systems (ATS) before a human hiring manager ever reviews them. To stand out and pass these initial filters, job seekers must optimize their resumes, customize cover letters, and prepare for interviews using data-driven, structured methods.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Designing High-Impact Resume Bullet Points that Get Noticed
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    A common mistake on resumes is listing job duties rather than concrete achievements. Hiring managers want to see the impact of your work. By using a Resume Bullets builder, candidates can transform passive descriptions into impact-oriented statements. For example, instead of writing"responsible for managing social media," write"engineered a social media strategy that increased user engagement by 40% over six months." Utilizing action verbs and quantifying results shows your direct value and aligns your resume with what recruiters are looking for.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Crafting Personalized and Persuasive Cover Letters
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    While a resume lists your historical achievements, a cover letter explains your future value. It tells your professional story and explains *why* you are interested in a specific role. However, writing a unique letter for every single job application can lead to application fatigue. Utilizing an AI Cover Letter Writer helps job seekers generate tailored drafts based on their experience and the specific job description. This draft can then be personalized, ensuring that the tone is professional and that key cultural values of the target company are highlighted.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Simulation-Based Interview Preparation: Anticipating Key Questions
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Once your resume and cover letter successfully pass the screening process, the final challenge is the job interview. Interviews can be stressful, but preparation can build confidence. An Interview Generator helps job seekers practice by producing relevant, role-specific questions based on industry standards and job listings. Practicing your responses using structured frameworks—such as the STAR method (Situation, Task, Action, Result)—helps you provide concise, logical, and impactful answers that demonstrate your competency.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Career Productivity: Goal Planning and Daily Actionable To-Do Lists
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    The job application process is itself a project that requires organization and persistence. Managing applications, follow-ups, and interviews requires structured goal planning. A Goal Planner helps break down long-term objectives (like landing a software engineering job) into monthly, weekly, and daily tasks. Converting these goals into simple, actionable To-Do lists prevents cognitive overload. Keeping a structured timetable ensures that you dedicate consistent time each day to applications, skill development, and interview prep, maintaining momentum until you secure your desired role.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-10 not-prose">
                <h2 className="text-2xl font-bold mb-4">Job-search workflow (free stack)</h2>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground text-sm md:text-base">
                    <li>Rewrite experience with <Link href="/tools/resume-bullets" className="text-primary underline underline-offset-4">Resume Bullets</Link></li>
                    <li>Align profile with <Link href="/tools/linkedin-optimizer" className="text-primary underline underline-offset-4">LinkedIn Optimizer</Link></li>
                    <li>Draft applications with <Link href="/tools/cover-letter-writer" className="text-primary underline underline-offset-4">Cover Letter Writer</Link></li>
                    <li>Practice answers with <Link href="/tools/interview-generator" className="text-primary underline underline-offset-4">Interview Generator</Link></li>
                    <li>Stay organized with <Link href="/tools/goal-planner" className="text-primary underline underline-offset-4">Goal Planner</Link> + <Link href="/tools/todo-list-generator" className="text-primary underline underline-offset-4">To-Do List</Link></li>
                </ol>
                <h3 className="text-lg font-semibold mt-8 mb-3">Career guides</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/blog/resume-bullets-that-get-interviews" className="underline underline-offset-4 hover:text-primary">Resume bullets that get interviews</Link></li>
                    <li><Link href="/blog/linkedin-headline-about-formula" className="underline underline-offset-4 hover:text-primary">LinkedIn headline + About formula</Link></li>
                </ul>
            </section>

            {aeoContent.faqs?.length > 0 && (
                <section className="mx-auto max-w-3xl px-6 pb-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Career tools FAQ</h2>
                    <div className="space-y-4">
                        {aeoContent.faqs.map((f, i) => (
                            <div key={i} className="rounded-xl border border-border/40 p-5 bg-card/40 backdrop-blur-md">
                                <h3 className="font-semibold mb-2">{f.question}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-[1200px] px-6 pb-12">
                <h2 className="text-xl font-semibold mb-3">Explore more categories</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/tools" className="underline underline-offset-4">All tools</Link>
                    <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
                    <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
                    <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
                    <Link href="/tools/utility-tools" className="underline underline-offset-4">Utility tools</Link>
                    <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
                    <Link href="/blog" className="underline underline-offset-4">Blog</Link>
                </div>
            </section>
        </div>
    );
}
