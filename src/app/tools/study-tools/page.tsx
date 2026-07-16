import Link from 'next/link';
import { StudyToolsClient } from './client';
import { getCategoryAEO } from '@/lib/global-aeo-content';
import { generateFAQPageSchema, generateBreadcrumbListSchema, CATEGORY_BREADCRUMBS } from '@/lib/seo-worldclass';

export const metadata = {
    title: 'AI Study Tools - Homework Solver, Notes Generator & More | ToolNova',
    description: 'Free AI-powered study tools: homework solver, notes generator, flashcard maker, quiz generator, formula generator, and more.',
    alternates: { canonical: 'https://www.toolnovahub.com/tools/study-tools' },
    openGraph: {
        title: 'AI Study Tools - Homework Solver, Notes Generator & More | ToolNova',
        description: 'Explore free AI study tools for homework, notes, flashcards, quizzes, and revision.',
        url: 'https://www.toolnovahub.com/tools/study-tools',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Study Tools | ToolNova',
        description: 'Free AI study tools for homework, flashcards, quizzes, and revision.',
    },
};

const tools = [
    { name: 'Homework Solver', slug: 'homework-solver', description: 'Get step-by-step solutions to homework problems', icon: 'BookOpen', badge: 'Popular', badgeColor: 'bg-blue-500' },
    { name: 'Notes Generator', slug: 'notes-generator', description: 'Generate comprehensive study notes from any topic', icon: 'ClipboardList', badge: 'Top Rated', badgeColor: 'bg-green-500' },
    { name: 'MCQ Generator', slug: 'mcq-generator', description: 'Create multiple choice questions for practice', icon: 'FileQuestion' },
    { name: 'Flashcard Maker', slug: 'flashcard-maker', description: 'Create digital flashcards for memorization', icon: 'Brain', badge: 'New', badgeColor: 'bg-purple-500' },
    { name: 'Quiz Generator', slug: 'quiz-generator', description: 'Generate practice quizzes on any subject', icon: 'Lightbulb' },
    { name: 'Doubt Solver', slug: 'doubt-solver', description: 'Get instant answers to your study questions', icon: 'HelpCircle' },
    { name: 'Formula Generator', slug: 'formula-generator', description: 'Generate formulas for math and science topics', icon: 'Calculator' },
    { name: 'Concept Explainer', slug: 'concept-explainer', description: 'Break down complex topics into simple explanations', icon: 'Brain' },
    { name: 'Diagram Explainer', slug: 'diagram-explainer', description: 'Explain diagrams and visual concepts', icon: 'FlaskConical' },
    { name: 'Chapter Summary', slug: 'chapter-summary', description: 'Summarize chapter content quickly', icon: 'ClipboardList' },
    { name: 'Revision Planner', slug: 'revision-planner', description: 'Create structured study schedules', icon: 'Calendar' },
];

export default function StudyToolsPage() {
    const aeoContent = getCategoryAEO('study-tools');
    const faqSchema = generateFAQPageSchema(aeoContent.faqs);
    const breadcrumbSchema = generateBreadcrumbListSchema(CATEGORY_BREADCRUMBS['study-tools']);

    return (
        <div className="page-shell w-full min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="mx-auto max-w-[1200px] px-6 py-10">
                <StudyToolsClient tools={tools} />
            </div>

            {/* Rich Editorial Content to satisfy Google AdSense High-Quality / Thin Content policies */}
            <section className="mx-auto max-w-4xl px-6 mt-16 pb-20 border-t border-border/60 pt-16 prose prose-neutral dark:prose-invert prose-lg">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-6">
                    Active Recall, Spaced Repetition, and AI-Enhanced Learning Methodologies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    The landscape of modern education is moving rapidly away from passive reading and towards active, scientifically proven learning methods. Students are increasingly expected to master vast amounts of highly complex information in compressed timelines. Utilizing strategic learning methodologies like active recall and spaced repetition, supported by AI-driven study tools, allows students to dramatically increase comprehension, retention, and academic efficiency.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    The Science of Effective Learning: Beyond Passive Reading
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    For decades, the default study habit for many students has been passive review: highlight text, re-read notes, and listen to lectures. Cognitive science research has repeatedly shown that these methods are highly inefficient for long-term memory retrieval. True comprehension occurs when the brain is forced to actively retrieve information. This cognitive strain strengthens neural pathways, ensuring that the knowledge remains accessible during exams and real-world application. AI study utilities, such as a Concept Explainer or a Doubt Solver, can instantly turn passive materials into active dialogue, prompting students to explain concepts in their own words or providing immediate feedback on difficult questions.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Maximizing Retention with Flashcards and Conceptual Summaries
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Flashcards represent one of the most effective implementations of active recall. A Flashcard Maker allows students to convert dense textbook chapters and lecture notes into dynamic question-and-answer pairs. By integrating this with spaced repetition—the practice of reviewing information at increasing intervals—students target their cognitive weaknesses directly. Additionally, generating automated Chapter Summaries allows students to view the macro-structure of their coursework before diving into micro-details. This top-down conceptual approach helps the brain build cognitive schemas, making it easier to hook new facts onto existing frameworks.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Structural Study Planning: Timetables and Revision Frameworks
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Mastering a syllabus requires systematic planning. Students often struggle with time management, leading to high levels of stress and last-minute cramming. AI-powered Revision Planners and Timetable Generators remove the cognitive overhead of planning. By analyzing the date of an exam, the volume of material, and the student's available daily hours, these tools generate structured, realistic study schedules. Breaking down a massive curriculum into bite-sized daily milestones helps reduce procrastination, ensures complete coverage of all topics, and leaves ample time for practice exams.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Resolving Complex Academic Doubts with Contextual Explanations
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    When students encounter complex problems outside the classroom, they often get stuck, leading to frustration and lost momentum. A Homework Solver or a specialized Formula Generator acts as a round-the-clock academic tutor. These tools do not simply output the final answer; instead, they focus on showing the logical flow and the reasoning behind each step. When a student understands *why* a particular mathematical formula or scientific principle is applied, they develop problem-solving intuition rather than simple rote memorization. This deeper comprehension is the key to mastering both standardized testing and advanced academic research.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-10">
                <h2 className="text-xl font-semibold mb-3">Study guides from the blog</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/blog/homework-solver-best-practices" className="underline underline-offset-4 hover:text-primary">Homework solver best practices</Link></li>
                    <li><Link href="/blog/build-exam-revision-system-30-minutes" className="underline underline-offset-4 hover:text-primary">Build an exam revision system in 30 minutes</Link></li>
                    <li><Link href="/blog/flashcards-vs-notes-for-retention" className="underline underline-offset-4 hover:text-primary">Flashcards vs notes for retention</Link></li>
                    <li><Link href="/blog/ai-writing-workflow-students" className="underline underline-offset-4 hover:text-primary">Ethical AI writing workflow for students</Link></li>
                </ul>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 pb-12">
                <h2 className="text-xl font-semibold mb-3">Explore more categories</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/tools" className="underline underline-offset-4">All tools</Link>
                    <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
                    <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
                    <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
                    <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
                    <Link href="/blog" className="underline underline-offset-4">Blog</Link>
                </div>
            </section>
        </div>
    );
}
