import Link from"next/link";
import type { ReactNode } from"react";
import NextImage from"next/image";
import { FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaBolt } from"react-icons/fa";

// AEO Components
import QuickAnswer from"@/components/blog/aeo/QuickAnswer";
import KeyTakeaways from"@/components/blog/aeo/KeyTakeaways";
import ProsCons from"@/components/blog/aeo/ProsCons";
import ExpertQuote from"@/components/blog/aeo/ExpertQuote";

// Tool slugs for auto-linking
const toolSlugs = ["text-summarizer","paraphraser","grammar-fix","essay-writer","notes-generator","flashcard-maker","homework-solver","chapter-summary","concept-explainer","quiz-generator","mcq-generator","doubt-solver","vocabulary-builder","synonym-finder","antonym-finder","idioms-phrases","one-word-substitution","paragraph-generator","story-generator","speech-writer","email-writer","bio-generator","caption-generator","cover-letter-writer","resume-bullets","interview-generator","linkedin-optimizer","timetable-generator","revision-planner","goal-planner","todo-list-generator","formula-generator","diagram-explainer","text-simplifier","merge-pdf","split-pdf","reorder-pdf","image-to-pdf","image-compressor","image-crop","resize-image","jpg-to-png","png-to-jpg","word-counter","character-counter","case-converter","age-calculator","plagiarism-checker","youtube-summarizer",
];

// Map of keywords to tool URLs
const keywordMap: Record<string, string> = {};

// Generate from tool slugs
toolSlugs.forEach((slug) => {
    // Convert slug to readable name
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    keywordMap[name.toLowerCase()] =`/tools/${slug}`;
});

// Manual keywords for common variations
const manualKeywords: Record<string, string> = {"ai summarizer":"/tools/text-summarizer","ai text summarizer":"/tools/text-summarizer","summarize documents":"/tools/text-summarizer","ai paraphrasing tool":"/tools/paraphraser","paraphrasing tool":"/tools/paraphraser","rewrite text":"/tools/paraphraser","grammar checker":"/tools/grammar-fix","fix grammar":"/tools/grammar-fix","ai essay writer":"/tools/essay-writer","write essays":"/tools/essay-writer","ai notes":"/tools/notes-generator","study notes":"/tools/notes-generator","create flashcards":"/tools/flashcard-maker","ai flashcards":"/tools/flashcard-maker","solve homework":"/tools/homework-solver","ai homework help":"/tools/homework-solver","summarize chapters":"/tools/chapter-summary","explain concepts":"/tools/concept-explainer","generate quiz":"/tools/quiz-generator","create quizzes":"/tools/quiz-generator","mcq questions":"/tools/mcq-generator","find synonyms":"/tools/synonym-finder","find antonyms":"/tools/antonym-finder","merge pdfs":"/tools/merge-pdf","combine pdf":"/tools/merge-pdf","split pdfs":"/tools/split-pdf","compress images":"/tools/image-compressor","convert to pdf":"/tools/image-to-pdf","count words":"/tools/word-counter","count characters":"/tools/character-counter",
};

Object.assign(keywordMap, manualKeywords);

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION' | 'QUOTE';
type AeoType = 'QUICK_ANSWER' | 'KEY_TAKEAWAYS' | 'PROS_CONS' | 'EXPERT_QUOTE';

export function processContent(content: string): React.ReactNode[] {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    // State for standard lists
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    // State for blockquotes/alerts
    let blockquoteItems: string[] = [];
    let blockquoteType: AlertType | null = null;

    // State for AEO components
    let aeoType: AeoType | null = null;
    let aeoLines: string[] = [];

    // State for tables
    let tableLines: string[] = [];
    let inTable = false;

    let paragraphCount = 0;

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            const ListTag = listType === 'ol' ? 'ol' : 'ul';
            elements.push(
                <ListTag key={key} className={`space-y-2 my-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 text-slate-700`}>
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed pl-2">{parseInlineMarkdown(item,`li-${key}-${i}`, true)}</li>
                    ))}
                </ListTag>
            );
            listItems = [];
            listType = null;
        }
    };

    const flushBlockquote = (key: string) => {
        if (blockquoteItems.length > 0 && blockquoteType) {
            const contentElements = blockquoteItems.map((item, i) => (
                <p key={i} className={`leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
                    {parseInlineMarkdown(item,`bq-${key}-${i}`, true)}
                </p>
            ));

            if (blockquoteType === 'QUOTE') {
                elements.push(
                    <blockquote key={key} className="border-l-4 border-primary bg-primary/5 p-6 my-8 rounded-r-xl text-slate-700 italic shadow-sm">
                        {contentElements}
                    </blockquote>
                );
            } else {
                // Alert styles
                let styles ="";
                let icon: ReactNode = null;
                let title: string ="";

                switch (blockquoteType) {
                    case 'NOTE':
                        styles ="bg-blue-50 border-blue-200 text-slate-700";
                        icon = <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />;
                        title ="Note";
                        break;
                    case 'TIP':
                        styles ="bg-emerald-50 border-emerald-200 text-slate-700";
                        icon = <FaLightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />;
                        title ="Pro Tip";
                        break;
                    case 'IMPORTANT':
                        styles ="bg-primary/5 border-primary/20 text-slate-700";
                        icon = <FaBolt className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />;
                        title ="Important";
                        break;
                    case 'WARNING':
                        styles ="bg-amber-50 border-amber-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />;
                        title ="Warning";
                        break;
                    case 'CAUTION':
                        styles ="bg-red-50 border-red-200 text-slate-800";
                        icon = <FaExclamationTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />;
                        title ="Caution";
                        break;
                }

                elements.push(
                    <div key={key} className={`flex gap-4 p-6 my-8 rounded-xl border ${styles} shadow-sm items-start`}>
                        {icon}
                        <div className="flex-1">
                            <h4 className="font-bold text-sm uppercase tracking-wider opacity-90 mb-2 select-none">
                                {title}
                            </h4>
                            <div className="text-base">
                                {contentElements}
                            </div>
                        </div>
                    </div>
                );
            }

            blockquoteItems = [];
            blockquoteType = null;
        }
    };

    const flushAEO = (key: string) => {
        if (aeoType && aeoLines.length > 0) {
            switch (aeoType) {
                case 'QUICK_ANSWER':
                    elements.push(
                        <QuickAnswer key={key}>
                            {aeoLines.map((line, i) => (
                                <p key={i} className={i > 0 ?"mt-2" :""}>{parseInlineMarkdown(line,`qa-${key}-${i}`, true)}</p>
                            ))}
                        </QuickAnswer>
                    );
                    break;
                case 'KEY_TAKEAWAYS':
                    const points = aeoLines
                        .filter(l => l.trim().startsWith('-'))
                        .map(l => l.trim().replace(/^-\s*/, ''));
                    elements.push(<KeyTakeaways key={key} points={points} />);
                    break;
                case 'PROS_CONS':
                    const pros: string[] = [];
                    const cons: string[] = [];
                    let currentSection: 'PROS' | 'CONS' | null = null;

                    aeoLines.forEach(line => {
                        const tLine = line.trim();
                        if (tLine.toUpperCase() === 'PROS:') { currentSection = 'PROS'; return; }
                        if (tLine.toUpperCase() === 'CONS:') { currentSection = 'CONS'; return; }

                        if (currentSection && (tLine.startsWith('+') || tLine.startsWith('-'))) {
                            const text = tLine.substring(1).trim();
                            if (currentSection === 'PROS') pros.push(text);
                            else cons.push(text);
                        }
                    });
                    elements.push(<ProsCons key={key} pros={pros} cons={cons} />);
                    break;
                case 'EXPERT_QUOTE':
                    const props: Record<string, string> = {};
                    aeoLines.forEach(line => {
                        const [k, ...v] = line.split('=');
                        if (k && v) props[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
                    });
                    elements.push(
                        <ExpertQuote
                            key={key}
                            quote={props.quote ||""}
                            author={props.author ||""}
                            role={props.role ||""}
                            image={props.image}
                        />
                    );
                    break;
            }
            aeoType = null;
            aeoLines = [];
        }
    };

    const flushTable = (key: string) => {
        if (tableLines.length > 0) {
            const rows = tableLines.map(line =>
                line.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
            );

            if (rows.length >= 2) {
                const headerRow = rows[0];
                const dataRows = rows.slice(2); // Skip separator row

                elements.push(
                    <div key={key} className="my-8 overflow-x-auto">
                        <table className="w-full border-collapse border border-slate-200 rounded-xl overflow-hidden">
                            <thead className="bg-slate-100">
                                <tr>
                                    {headerRow.map((cell, i) => (
                                        <th key={i} className="px-4 py-3 text-left font-bold text-slate-900 border-b border-slate-200">
                                            {cell}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataRows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-4 py-3 text-slate-600 border-b border-slate-100">
                                                {parseInlineMarkdown(cell,`td-${key}-${i}-${j}`, false)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
            tableLines = [];
            inTable = false;
        }
    };

    // Keep track of which keywords we've already linked
    const linkedKeywords = new Set<string>();

    const parseInlineMarkdown = (text: string, keyPrefix: string, autoLink: boolean = false): React.ReactNode[] => {
        const pattern = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^\)]+\))|(!\[[^\]]*\]\([^\)]+\))/g;
        const parts = text.split(pattern).filter((p) => p !== undefined && p !== '');

        const nodes: React.ReactNode[] = [];

        parts.forEach((part, i) => {
            const key =`${keyPrefix}-${i}`;

            // Image: ![alt](url)
            if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
                if (match) {
                    const alt = match[1];
                    const src = match[2];
                    nodes.push(
                        <div key={key} className="my-10 relative rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
                            <NextImage
                                src={src}
                                alt={alt}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                            {alt && <p className="text-center text-sm text-slate-500 mt-3 italic">{alt}</p>}
                        </div>
                    );
                    return;
                }
            }

            // Bold: **text**
            if (part.startsWith('**') && part.endsWith('**')) {
                const innerText = part.slice(2, -2);
                nodes.push(
                    <strong key={key} className="font-bold text-slate-900">
                        {parseInlineMarkdown(innerText,`${key}-bold`, false)}
                    </strong>
                );
                return;
            }

            // Link: [label](url)
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
                if (match) {
                    const label = match[1];
                    const url = match[2];
                    const isInternal = url.startsWith('/');

                    if (isInternal) {
                        nodes.push(
                            <Link
                                key={key}
                                href={url}
                                className="text-primary hover:text-primary font-medium underline underline-offset-2 transition-colors"
                            >
                                {label}
                            </Link>
                        );
                        return;
                    }

                    nodes.push(
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary font-medium underline underline-offset-2 transition-colors"
                        >
                            {label}
                        </a>
                    );
                    return;
                }
            }

            // Plain text - apply auto-linking if enabled
            if (autoLink) {
                let textSegments: (string | React.ReactNode)[] = [part];

                for (const [keyword, url] of Object.entries(keywordMap)) {
                    if (linkedKeywords.has(keyword)) continue;

                    const newSegments: (string | React.ReactNode)[] = [];
                    let foundInThisBlock = false;

                    for (const segment of textSegments) {
                        if (typeof segment !== 'string') {
                            newSegments.push(segment);
                            continue;
                        }

                        const lowerSegment = segment.toLowerCase();
                        const idx = lowerSegment.indexOf(keyword.toLowerCase());

                        if (idx !== -1 && !foundInThisBlock) {
                            const before = segment.slice(0, idx);
                            const match = segment.slice(idx, idx + keyword.length);
                            const after = segment.slice(idx + keyword.length);

                            if (before) newSegments.push(before);
                            newSegments.push(
                                <Link
                                    key={`${key}-${keyword}`}
                                    href={url}
                                    className="text-primary hover:text-primary font-medium border-b border-dotted border-primary/40 hover:border-solid transition-all"
                                    title={`Try our ${keyword} tool`}
                                >
                                    {match}
                                </Link>
                            );
                            if (after) newSegments.push(after);

                            linkedKeywords.add(keyword);
                            foundInThisBlock = true;
                        } else {
                            newSegments.push(segment);
                        }
                    }
                    textSegments = newSegments;
                }
                nodes.push(...textSegments);
            } else {
                nodes.push(part);
            }
        });

        return nodes;
    };


    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Empty line
        if (trimmedLine === '') {
            if (aeoType) {
                return;
            }
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            if (inTable) {
                flushTable(`table-${index}`);
            }
            return;
        }

        // Table detection
        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            inTable = true;
            tableLines.push(trimmedLine);
            return;
        } else if (inTable) {
            flushTable(`table-${index}`);
        }

        // Custom AEO Block Start/End detection
        if (trimmedLine.startsWith(':::')) {
            if (aeoType) {
                flushAEO(`aeo-${index}`);
            } else {
                const type = trimmedLine.replace(':::', '').trim().toUpperCase();
                if (type === 'QUICK-ANSWER') aeoType = 'QUICK_ANSWER';
                else if (type === 'KEY-TAKEAWAYS') aeoType = 'KEY_TAKEAWAYS';
                else if (type === 'PROS-CONS') aeoType = 'PROS_CONS';
                else if (type === 'EXPERT-QUOTE') aeoType = 'EXPERT_QUOTE';
            }
            return;
        }

        // If inside AEO block, capture lines
        if (aeoType) {
            if (trimmedLine) aeoLines.push(trimmedLine);
            return;
        }

        // YouTube Embed Detection
        const ytRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^& \n<]+)(?:&.*)?$/;
        const ytMatch = trimmedLine.match(ytRegex);
        if (ytMatch && ytMatch[1]) {
            flushList(`list-${index}`);
            flushBlockquote(`quote-${index}`);
            elements.push(
                <div key={index} className="my-10 relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-primary/10">
                    <iframe
                        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                    />
                </div>
            );
            return;
        }

        // Blockquotes/Alerts
        if (line.trim().startsWith('>')) {
            flushList(`list-${index}`);

            const alertMatch = trimmedLine.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);

            if (alertMatch) {
                flushBlockquote(`quote-prev-${index}`);
                blockquoteType = alertMatch[1].toUpperCase() as AlertType;
                return;
            }

            if (!blockquoteType) {
                blockquoteType = 'QUOTE';
            }

            const contentText = trimmedLine.replace(/^>\s?/, '');
            if (contentText) {
                blockquoteItems.push(contentText);
            }
            return;
        }

        flushBlockquote(`quote-${index}`);

        // H2 heading
        if (trimmedLine.startsWith('## ')) {
            flushList(`list-${index}`);
            const text = trimmedLine.replace('## ', '');
            const id = slugifyHeading(text);
            elements.push(
                <h2 id={id} key={index} className="text-3xl font-bold text-slate-900 mt-16 mb-6 tracking-tight leading-tight scroll-mt-24">
                    {text}
                </h2>
            );
            return;
        }

        // H3 heading
        if (trimmedLine.startsWith('### ')) {
            flushList(`list-${index}`);
            const text = trimmedLine.replace('### ', '');
            const id = slugifyHeading(text);
            elements.push(
                <h3 id={id} key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-5 tracking-tight scroll-mt-24">
                    {text}
                </h3>
            );
            return;
        }

        // H4 heading
        if (trimmedLine.startsWith('#### ')) {
            flushList(`list-${index}`);
            elements.push(
                <h4 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-4 tracking-tight">
                    {trimmedLine.replace('#### ', '')}
                </h4>
            );
            return;
        }

        // Unordered list item
        if (trimmedLine.startsWith('- ')) {
            listType = 'ul';
            listItems.push(trimmedLine.replace('- ', ''));
            return;
        }

        // Ordered list item
        if (/^\d+\.\s/.test(trimmedLine)) {
            listType = 'ol';
            listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
            return;
        }

        // Bold paragraph (standalone bold)
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            flushList(`list-${index}`);
            elements.push(
                <p key={index} className="font-bold text-slate-900 text-lg my-6">
                    {parseInlineMarkdown(trimmedLine.replace(/\*\*/g, ''),`p-${index}`, false)}
                </p>
            );

            paragraphCount++;
            return;
        }

        // Regular paragraph
        flushList(`list-${index}`);
        elements.push(
            <p key={index} className="text-slate-600 outline-none my-5 leading-8 text-[1.1rem]">
                {parseInlineMarkdown(trimmedLine,`p-${index}`, true)}
            </p>
        );

        paragraphCount++;
    });

    // Flush any remaining items
    flushList('list-final');
    flushBlockquote('quote-final');
    flushAEO('aeo-final');
    flushTable('table-final');

    return elements;
}

// Helper to extract YouTube IDs for Schema
export function extractYoutubeVideoIds(content: string): string[] {
    const ids: string[] = [];
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match[1]) {
            ids.push(match[1]);
        }
    }
    return [...new Set(ids)];
}

export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

export interface ArticleHeading {
    id: string;
    text: string;
    level: 2 | 3;
}

export function extractHeadings(content: string): ArticleHeading[] {
    const lines = content.split('\n');
    const headings: ArticleHeading[] = [];

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
            const text = trimmed.replace('## ', '').trim();
            headings.push({ id: slugifyHeading(text), text, level: 2 });
        } else if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
            const text = trimmed.replace('### ', '').trim();
            headings.push({ id: slugifyHeading(text), text, level: 3 });
        }
    });

    return headings;
}
