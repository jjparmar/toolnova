import React from 'react';
import Link from 'next/link';
import {
    Lightbulb,
    HelpCircle,
    ShieldCheck,
    Rocket,
    CheckCircle2,
    Target,
    AlertTriangle,
    Star,
    CalendarDays,
    PenLine,
} from 'lucide-react';

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
    return`The ${title} is a free online tool from ToolNova. ${trimmedDesc} No sign-up is required to start. Browser-based PDF/image tools are unlimited; AI tools include free daily use with optional Pro for higher limits.`;
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

    const defaultTips = [`Start with a clear, specific input — the more context you give the ${title}, the better your results will be.`,`Review and edit the output before using it. AI tools provide an excellent starting point, but a final human review always improves quality.`,`Use the output options (format, length, tone) to tailor results to your exact needs instead of accepting the default settings.`,
    ];

    const tips = expertTips && expertTips.length > 0 ? expertTips : defaultTips;

    return (
        <div className="mx-auto max-w-4xl space-y-20 px-6 py-16 text-foreground">

            {/* Trust Badge: Last Reviewed */}
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-success/25 bg-success/8 p-4 text-sm">
                <div className="flex items-center gap-2 font-medium text-success">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>Last reviewed by our editorial team: <strong>{lastReviewed}</strong></span>
                </div>
                <div className="flex items-center gap-2 font-medium text-success">
                    <PenLine className="h-4 w-4 shrink-0" />
                    <span>Fact-checked by <strong>ToolNova Editorial Team</strong></span>
                </div>
                <Link href="/editorial-policy" className="ml-auto text-xs text-success hover:underline underline-offset-2">
                    Our editorial standards →
                </Link>
            </div>

            {/* AEO: Quick answer block — direct, cite-friendly answer for AI search */}
            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h2 className="mb-3 text-xl font-bold text-foreground">Quick answer</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{answerSnippet}</p>
            </section>

            {/* Overview */}
            <section className="space-y-6">
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
                    What is the {title}?
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </section>

            {/* Intent fit: best for / not for */}
            <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-success/20 bg-success/5 p-6">
                    <div className="mb-3 flex items-center gap-2 text-success">
                        <Target className="h-5 w-5" />
                        <h3 className="text-lg font-bold">Best for</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Fast task completion with minimal steps</li>
                        <li>• Students and professionals who need reliable output</li>
                        <li>• Users who want browser-based workflow without installs</li>
                    </ul>
                </div>
                <div className="rounded-2xl border border-warning/20 bg-warning/5 p-6">
                    <div className="mb-3 flex items-center gap-2 text-warning-foreground">
                        <AlertTriangle className="h-5 w-5" />
                        <h3 className="text-lg font-bold">Not ideal for</h3>
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
                    <Rocket className="h-6 w-6 text-primary" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">How to Use the {title}</h2>
                </div>
                <div className="grid gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4 rounded-2xl border border-border bg-muted/40 p-6">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                                {i + 1}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
                                <p className="text-muted-foreground">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-warning-foreground" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Key Benefits</h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <CheckCircle2 className="h-5 w-5" />
                                <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                            </div>
                            <p className="leading-relaxed text-muted-foreground">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expert Tips */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-warning-foreground" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Expert Tips for Best Results</h2>
                </div>
                <div className="space-y-4">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex gap-4 rounded-xl border border-warning/20 bg-warning/5 p-5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning-foreground text-xs font-bold text-white">
                                {i + 1}
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">{tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="space-y-10">
                <div className="flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                    {faq.map((item, i) => (
                        <div key={i} className="space-y-3 border-b border-border pb-6 last:border-0">
                            <h3 className="text-xl font-bold text-foreground">{item.question}</h3>
                            <p className="italic leading-relaxed text-muted-foreground">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Internal intent links */}
            <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Explore related categories</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/tools" className="text-primary underline-offset-4 hover:underline">All tools</Link>
                    <Link href="/tools/writing-tools" className="text-primary underline-offset-4 hover:underline">Writing tools</Link>
                    <Link href="/tools/study-tools" className="text-primary underline-offset-4 hover:underline">Study tools</Link>
                    <Link href="/tools/career-tools" className="text-primary underline-offset-4 hover:underline">Career tools</Link>
                    <Link href="/tools/image-pdf-tools" className="text-primary underline-offset-4 hover:underline">Image &amp; PDF tools</Link>
                    <Link href="/blog" className="text-primary underline-offset-4 hover:underline">Guides &amp; blog</Link>
                    <Link href="/editorial-policy" className="text-primary underline-offset-4 hover:underline">Editorial policy</Link>
                </div>
            </section>

            {/* Trust Banner */}
            <section className="flex flex-col items-center gap-6 rounded-3xl border border-primary/20 bg-primary/5 p-8 md:flex-row">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card text-primary shadow-premium">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="mb-2 text-xl font-bold text-foreground">Safe &amp; Secure Processing</h3>
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
