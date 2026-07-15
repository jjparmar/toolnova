import React from 'react';
import Link from 'next/link';
import {
    FaLightbulb,
    FaQuestionCircle,
    FaShieldAlt,
    FaRocket,
    FaCheckCircle,
    FaBullseye,
    FaExclamationTriangle,
    FaStar,
    FaCalendarAlt,
    FaUserEdit,
} from 'react-icons/fa';

interface ToolRichContentProps {
    title: string;
    description: string;
    steps: { title: string; desc: string }[];
    benefits: { title: string; desc: string }[];
    faq: { question: string; answer: string }[];
    expertTips?: string[];
    lastReviewed?: string;
}

const REVIEW_DATE = 'June 2026';

const getAnswerSnippet = (title: string, description: string) => {
    // Keep it concise (40-70 words) and answer-shaped for AI/voice extraction.
    const trimmedDesc = description.trim();
    return `The ${title} is a free online tool from ToolNova. ${trimmedDesc} No sign-up is required to start. Browser-based PDF/image tools are unlimited; AI tools include free daily use with optional Pro for higher limits.`;
};

export const ToolRichContent: React.FC<ToolRichContentProps> = ({
    title,
    description,
    steps,
    benefits,
    faq,
    expertTips,
    lastReviewed = REVIEW_DATE,
}) => {
    const answerSnippet = getAnswerSnippet(title, description);

    const defaultTips = [
        `Start with a clear, specific input — the more context you give the ${title}, the better your results will be.`,
        `Review and edit the output before using it. AI tools provide an excellent starting point, but a final human review always improves quality.`,
        `Use the output options (format, length, tone) to tailor results to your exact needs instead of accepting the default settings.`,
    ];

    const tips = expertTips && expertTips.length > 0 ? expertTips : defaultTips;

    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-20 text-slate-800 dark:text-slate-200">

            {/* Trust Badge: Last Reviewed */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                    <FaCalendarAlt className="flex-shrink-0" />
                    <span>Last reviewed by our editorial team: <strong>{lastReviewed}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                    <FaUserEdit className="flex-shrink-0" />
                    <span>Fact-checked by <strong>ToolNova Editorial Team</strong></span>
                </div>
                <Link href="/editorial-policy" className="text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-2 ml-auto text-xs">
                    Our editorial standards →
                </Link>
            </div>

            {/* AEO: Quick answer block — direct, cite-friendly answer for AI search */}
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h2 className="text-2xl font-bold mb-3">Quick answer</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{answerSnippet}</p>
            </section>

            {/* Overview */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                    What is the {title}?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </section>

            {/* Intent fit: best for / not for */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
                    <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                        <FaBullseye />
                        <h3 className="font-bold text-lg">Best for</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Fast task completion with minimal steps</li>
                        <li>• Students and professionals who need reliable output</li>
                        <li>• Users who want browser-based workflow without installs</li>
                    </ul>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 p-6">
                    <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
                        <FaExclamationTriangle />
                        <h3 className="font-bold text-lg">Not ideal for</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Extremely niche enterprise workflows with custom compliance rules</li>
                        <li>• Offline-only environments</li>
                        <li>• Cases requiring human legal/professional certification</li>
                    </ul>
                </div>
            </section>

            {/* How to Use */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <FaRocket className="text-primary text-2xl" />
                    <h2 className="text-2xl font-bold">How to Use the {title}</h2>
                </div>
                <div className="grid gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {i + 1}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">{step.title}</h3>
                                <p className="text-muted-foreground">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <FaLightbulb className="text-amber-500 text-2xl" />
                    <h2 className="text-2xl font-bold">Key Benefits</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <FaCheckCircle />
                                <h3 className="font-bold text-lg">{benefit.title}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expert Tips */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <h2 className="text-2xl font-bold">Expert Tips for Best Results</h2>
                </div>
                <div className="space-y-4">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-yellow-50/60 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-white flex items-center justify-center text-sm font-bold">
                                {i + 1}
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <FaQuestionCircle className="text-primary text-2xl" />
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                    {faq.map((item, i) => (
                        <div key={i} className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0">
                            <h3 className="font-bold text-xl">{item.question}</h3>
                            <p className="text-muted-foreground leading-relaxed italic">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Internal intent links */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
                <h2 className="text-xl font-bold mb-4">Explore related categories</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/tools" className="underline underline-offset-4">All tools</Link>
                    <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
                    <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
                    <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
                    <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image &amp; PDF tools</Link>
                    <Link href="/blog" className="underline underline-offset-4">Guides &amp; blog</Link>
                    <Link href="/editorial-policy" className="underline underline-offset-4">Editorial policy</Link>
                </div>
            </section>

            {/* Trust Banner */}
            <section className="p-8 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl border border-primary/20 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-xl">
                    <FaShieldAlt size={32} />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Safe &amp; Secure Processing</h3>
                    <p className="text-muted-foreground">
                        Your data is processed locally in your browser when possible and never stored on our servers.
                        All AI processing is encrypted and follows strict privacy standards.
                        Read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for full details.
                    </p>
                </div>
            </section>
        </div>
    );
};
