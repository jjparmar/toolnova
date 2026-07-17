import Link from 'next/link';
import { UtilityToolsClient } from './client';
import { getCategoryAEO } from '@/lib/global-aeo-content';
import { generateFAQPageSchema, generateBreadcrumbListSchema, CATEGORY_BREADCRUMBS } from '@/lib/seo-worldclass';

export const metadata = {
    title: 'Utility Tools - Word Counter, Case Converter & More | ToolNova',
    description: 'Free utility tools: word counter, character counter, case converter, text summarizer, text simplifier, age calculator.',
    alternates: { canonical: 'https://www.toolnovahub.com/tools/utility-tools' },
    openGraph: {
        title: 'Utility Tools - Word Counter, Case Converter & More | ToolNova',
        description: 'Use free utility tools for text counting, formatting, summarizing, and calculations.',
        url: 'https://www.toolnovahub.com/tools/utility-tools',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Utility Tools | ToolNova',
        description: 'Free utility tools for word count, text formatting, summaries, and more.',
    },
};

const tools = [
    { name: 'Word Counter', slug: 'word-counter', description: 'Live word, character & reading-time stats', icon: 'Hash', badge: 'Popular', badgeColor: 'bg-cyan-500' },
    { name: 'Character Counter', slug: 'character-counter', description: 'Character counts with platform limits', icon: 'Type' },
    { name: 'Case Converter', slug: 'case-converter', description: 'UPPER, title, camel, snake, kebab & more', icon: 'AlignLeft', badge: 'Fast', badgeColor: 'bg-teal-500' },
    { name: 'Text Summarizer', slug: 'text-summarizer', description: 'Summarize long texts into key points', icon: 'FileText', badge: 'Top Rated', badgeColor: 'bg-blue-500' },
    { name: 'Text Simplifier', slug: 'text-simplifier', description: 'Simplify complex text for easy reading', icon: 'AlignLeft' },
    { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate exact age from date of birth', icon: 'Calculator' },
    { name: 'YouTube Summarizer', slug: 'youtube-summarizer', description: 'Summarize videos from a YouTube URL', icon: 'FileText' },
];

export default function UtilityToolsPage() {
    const aeoContent = getCategoryAEO('utility-tools');
    const faqSchema = generateFAQPageSchema(aeoContent.faqs);
    const breadcrumbSchema = generateBreadcrumbListSchema(CATEGORY_BREADCRUMBS['utility-tools']);

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
                <UtilityToolsClient tools={tools} />
            </div>

            {/* Rich Editorial Content to satisfy Google AdSense High-Quality / Thin Content policies */}
            <section className="mx-auto max-w-4xl px-6 mt-16 pb-20 border-t border-border/60 pt-16 prose prose-neutral prose-lg">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-6">
                    Micro-Utilities for Daily Digital Workflows and Precision Editing
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    In the modern digital workplace, productivity is often hindered by small, repetitive tasks. Word count constraints, case formatting errors, overly complex text, or date-of-birth calculations can slow down creative and administrative workflows. Access to lightweight, high-performance web utilities allows writers, editors, developers, and administrators to solve these micro-problems instantly and maintain momentum.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    The Importance of Precise Text Metrics: Word and Character Counts
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    For content creators, SEO specialists, students, and social media managers, text metrics are critical. Search engines, academic rubrics, and social media platforms impose strict character limits that must be followed. A Word Counter and Character Counter do more than just count letters; they analyze paragraphs, sentences, and estimated reading time. This allows authors to adjust their writing to meet the constraints of Twitter posts, meta descriptions, or editorial essays, ensuring that content remains concise and meets all technical requirements.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Simplifying Complex Information for Dynamic Audiences
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Writing is only effective if your target audience can understand it. Technical jargon and overly long sentences often alienate readers. In business, communication should be as clear and accessible as possible. A Text Simplifier helps convert dense language into clear, easy-to-read sentences, making it perfect for turning complex technical manuals or academic research papers into plain English. Furthermore, using a Text Summarizer helps digest long reports, articles, or books by extracting the core arguments and presenting them in simple bullet points.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Automating Repetitive Text Formatting and Case Transformations
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Copying text from various sources—such as PDFs, emails, or websites—often leads to inconsistent capitalization. Fixing these errors manually is slow and tedious. A Case Converter solves this by instantly transforming text into UPPERCASE, lowercase, Title Case, sentence case, or camelCase. This is extremely useful for programmers formatting code variables, database administrators cleaning user data, or copywriters formatting titles for blog posts.
                </p>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                    Rapid Computational Calculations in Daily Operations
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Beyond text processing, everyday productivity requires rapid mathematical calculations. Calculating precise age down to the day from a date of birth is a common administrative requirement in HR, user onboarding, or demographics analysis. An Age Calculator simplifies this process, providing instant results without requiring complex spreadsheet formulas or manual calendar counting. These minor digital tasks, when solved instantly by micro-utilities, accumulate to save significant time and focus over the course of a work week.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-10 not-prose">
                <h2 className="text-2xl font-bold mb-4">Which utility should I use?</h2>
                <div className="overflow-x-auto rounded-xl border border-border/40">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-background">
                            <tr>
                                <th className="p-3 font-semibold">Need</th>
                                <th className="p-3 font-semibold">Tool</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/40">
                                <td className="p-3">Essay / blog length &amp; reading time</td>
                                <td className="p-3"><Link href="/tools/word-counter" className="text-primary underline underline-offset-4">Word Counter</Link></td>
                            </tr>
                            <tr className="border-t border-border/40">
                                <td className="p-3">Social captions / SEO title length</td>
                                <td className="p-3"><Link href="/tools/character-counter" className="text-primary underline underline-offset-4">Character Counter</Link></td>
                            </tr>
                            <tr className="border-t border-border/40">
                                <td className="p-3">Title Case / snake_case / camelCase</td>
                                <td className="p-3"><Link href="/tools/case-converter" className="text-primary underline underline-offset-4">Case Converter</Link></td>
                            </tr>
                            <tr className="border-t border-border/40">
                                <td className="p-3">Long article → key points</td>
                                <td className="p-3"><Link href="/tools/text-summarizer" className="text-primary underline underline-offset-4">Text Summarizer</Link></td>
                            </tr>
                            <tr className="border-t border-border/40">
                                <td className="p-3">Hard jargon → plain English</td>
                                <td className="p-3"><Link href="/tools/text-simplifier" className="text-primary underline underline-offset-4">Text Simplifier</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                    Related guides:{""}
                    <Link href="/blog/summarize-long-articles-fast" className="underline underline-offset-4 hover:text-primary">Summarize long articles</Link>
                    {" ·"}
                    <Link href="/blog/compress-images-for-web-speed" className="underline underline-offset-4 hover:text-primary">Compress images for speed</Link>
                </p>
            </section>

            {aeoContent.faqs?.length > 0 && (
                <section className="mx-auto max-w-3xl px-6 pb-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Utility tools FAQ</h2>
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
