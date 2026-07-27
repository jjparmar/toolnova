/**
 * Related Tools Component
 * Shows related tools for internal linking and better UX
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedTool {
    name: string;
    slug: string;
    description: string;
    category: string;
}

interface RelatedToolsProps {
    currentTool: string;
    category?: string;
}

// Related tools mapping for internal linking
const relatedToolsMap: Record<string, string[]> = {
    // Writing Tools
    'text-summarizer': ['paraphraser', 'grammar-fix', 'essay-writer', 'notes-generator'],
    'paraphraser': ['text-summarizer', 'grammar-fix', 'essay-writer', 'text-simplifier'],
    'grammar-fix': ['paraphraser', 'essay-writer', 'email-writer', 'plagiarism-checker'],
    'essay-writer': ['grammar-fix', 'paraphraser', 'text-summarizer', 'paragraph-generator'],
    'email-writer': ['grammar-fix', 'cover-letter-writer', 'speech-writer', 'bio-generator'],
    'speech-writer': ['essay-writer', 'email-writer', 'paragraph-generator', 'caption-generator'],
    'caption-generator': ['bio-generator', 'email-writer', 'story-generator', 'paragraph-generator'],
    'story-generator': ['essay-writer', 'paragraph-generator', 'caption-generator', 'text-simplifier'],
    'paragraph-generator': ['essay-writer', 'story-generator', 'text-summarizer', 'grammar-fix'],
    'text-simplifier': ['paraphraser', 'text-summarizer', 'grammar-fix', 'concept-explainer'],

    // Study Tools
    'homework-solver': ['notes-generator', 'concept-explainer', 'doubt-solver', 'formula-generator'],
    'flashcard-maker': ['quiz-generator', 'mcq-generator', 'notes-generator', 'revision-planner'],
    'notes-generator': ['text-summarizer', 'chapter-summary', 'flashcard-maker', 'quiz-generator'],
    'quiz-generator': ['mcq-generator', 'flashcard-maker', 'notes-generator', 'revision-planner'],
    'mcq-generator': ['quiz-generator', 'flashcard-maker', 'homework-solver', 'notes-generator'],
    'concept-explainer': ['doubt-solver', 'homework-solver', 'text-simplifier', 'notes-generator'],
    'chapter-summary': ['text-summarizer', 'notes-generator', 'flashcard-maker', 'concept-explainer'],
    'doubt-solver': ['homework-solver', 'concept-explainer', 'formula-generator', 'notes-generator'],
    'diagram-explainer': ['concept-explainer', 'doubt-solver', 'formula-generator', 'homework-solver'],
    'formula-generator': ['homework-solver', 'doubt-solver', 'concept-explainer', 'diagram-explainer'],
    'timetable-generator': ['revision-planner', 'goal-planner', 'todo-list-generator', 'flashcard-maker'],
    'revision-planner': ['timetable-generator', 'flashcard-maker', 'quiz-generator', 'goal-planner'],
    'goal-planner': ['todo-list-generator', 'timetable-generator', 'revision-planner', 'notes-generator'],
    'todo-list-generator': ['goal-planner', 'timetable-generator', 'revision-planner', 'notes-generator'],

    // Exam Prep Tools
    'vocabulary-builder': ['synonym-finder', 'antonym-finder', 'idioms-phrases', 'one-word-substitution'],
    'synonym-finder': ['antonym-finder', 'vocabulary-builder', 'paraphraser', 'idioms-phrases'],
    'antonym-finder': ['synonym-finder', 'vocabulary-builder', 'one-word-substitution', 'idioms-phrases'],
    'idioms-phrases': ['vocabulary-builder', 'one-word-substitution', 'synonym-finder', 'antonym-finder'],
    'one-word-substitution': ['vocabulary-builder', 'idioms-phrases', 'synonym-finder', 'antonym-finder'],

    // PDF & Image Tools
    'merge-pdf': ['split-pdf', 'compress-pdf', 'image-to-pdf', 'image-compressor'],
    'split-pdf': ['merge-pdf', 'compress-pdf', 'image-to-pdf', 'image-compressor'],
    'compress-pdf': ['split-pdf', 'merge-pdf', 'image-compressor', 'image-to-pdf'],
    'image-to-pdf': ['merge-pdf', 'split-pdf', 'compress-pdf', 'image-compressor'],
    'image-compressor': ['compress-pdf', 'resize-image', 'jpg-to-png', 'image-to-pdf'],
    'jpg-to-png': ['png-to-jpg', 'image-compressor', 'resize-image', 'image-to-pdf'],
    'png-to-jpg': ['jpg-to-png', 'image-compressor', 'resize-image', 'image-to-pdf'],
    'resize-image': ['image-compressor', 'jpg-to-png', 'png-to-jpg', 'image-to-pdf'],

    // Career Tools
    'resume-bullets': ['cover-letter-writer', 'interview-generator', 'bio-generator', 'linkedin-optimizer'],
    'cover-letter-writer': ['resume-bullets', 'interview-generator', 'email-writer', 'linkedin-optimizer'],
    'interview-generator': ['resume-bullets', 'cover-letter-writer', 'bio-generator', 'linkedin-optimizer'],
    'bio-generator': ['linkedin-optimizer', 'resume-bullets', 'caption-generator', 'cover-letter-writer'],
    'linkedin-optimizer': ['resume-bullets', 'cover-letter-writer', 'bio-generator', 'interview-generator'],

    // Utility Tools
    'word-counter': ['character-counter', 'case-converter', 'text-summarizer', 'grammar-fix'],
    'character-counter': ['word-counter', 'case-converter', 'text-summarizer', 'grammar-fix'],
    'case-converter': ['word-counter', 'character-counter', 'text-simplifier', 'grammar-fix'],
    'age-calculator': ['word-counter', 'character-counter', 'timetable-generator', 'goal-planner'],

    // Special Tools
    'youtube-summarizer': ['text-summarizer', 'notes-generator', 'chapter-summary', 'flashcard-maker'],
    'plagiarism-checker': ['grammar-fix', 'paraphraser', 'essay-writer', 'text-simplifier'],
};

const toolData: Record<string, { name: string; description: string; category: string }> = {
    'text-summarizer': { name: 'Text Summarizer', description: 'Summarize long articles and documents', category: 'Writing' },
    'paraphraser': { name: 'Paraphraser', description: 'Rewrite text while preserving meaning', category: 'Writing' },
    'grammar-fix': { name: 'Grammar Checker', description: 'Fix grammar and spelling errors', category: 'Writing' },
    'essay-writer': { name: 'Essay Writer', description: 'Generate well-structured essays', category: 'Writing' },
    'email-writer': { name: 'Email Writer', description: 'Write professional emails', category: 'Writing' },
    'speech-writer': { name: 'Speech Writer', description: 'Write compelling speeches', category: 'Writing' },
    'caption-generator': { name: 'Caption Generator', description: 'Create engaging social media captions', category: 'Writing' },
    'story-generator': { name: 'Story Generator', description: 'Generate creative stories with AI', category: 'Writing' },
    'paragraph-generator': { name: 'Paragraph Generator', description: 'Generate well-written paragraphs', category: 'Writing' },
    'text-simplifier': { name: 'Text Simplifier', description: 'Simplify complex text', category: 'Writing' },
    'homework-solver': { name: 'Homework Solver', description: 'Get step-by-step homework help', category: 'Study' },
    'flashcard-maker': { name: 'Flashcard Maker', description: 'Create digital flashcards for studying', category: 'Study' },
    'notes-generator': { name: 'Notes Generator', description: 'Generate organized study notes', category: 'Study' },
    'quiz-generator': { name: 'Quiz Generator', description: 'Create custom quizzes and tests', category: 'Study' },
    'mcq-generator': { name: 'MCQ Generator', description: 'Generate multiple choice questions', category: 'Study' },
    'concept-explainer': { name: 'Concept Explainer', description: 'Understand complex concepts', category: 'Study' },
    'chapter-summary': { name: 'Chapter Summary', description: 'Summarize textbook chapters', category: 'Study' },
    'doubt-solver': { name: 'Doubt Solver', description: 'Get answers to your questions', category: 'Study' },
    'diagram-explainer': { name: 'Diagram Explainer', description: 'Understand complex diagrams with AI', category: 'Study' },
    'formula-generator': { name: 'Formula Generator', description: 'Generate math and science formulas', category: 'Study' },
    'timetable-generator': { name: 'Timetable Generator', description: 'Create personalized study schedules', category: 'Study' },
    'revision-planner': { name: 'Revision Planner', description: 'Plan your exam revision', category: 'Study' },
    'goal-planner': { name: 'Goal Planner', description: 'Set and track academic goals', category: 'Study' },
    'todo-list-generator': { name: 'Todo List Generator', description: 'Create prioritized task lists', category: 'Study' },
    'vocabulary-builder': { name: 'Vocabulary Builder', description: 'Build vocabulary for SAT, GRE, TOEFL', category: 'Exam Prep' },
    'synonym-finder': { name: 'Synonym Finder', description: 'Find synonyms for any word', category: 'Exam Prep' },
    'antonym-finder': { name: 'Antonym Finder', description: 'Find antonyms for any word', category: 'Exam Prep' },
    'idioms-phrases': { name: 'Idioms & Phrases', description: 'Learn English idioms and phrases', category: 'Exam Prep' },
    'one-word-substitution': { name: 'One Word Substitution', description: 'Replace phrases with single words', category: 'Exam Prep' },
    'merge-pdf': { name: 'Merge PDF', description: 'Combine multiple PDFs into one', category: 'PDF & Image' },
    'split-pdf': { name: 'Split PDF', description: 'Split PDF into multiple files', category: 'PDF & Image' },
    'compress-pdf': { name: 'Compress PDF', description: 'Shrink PDF size for email and portals', category: 'PDF & Image' },
    'image-to-pdf': { name: 'Image to PDF', description: 'Convert images to PDF format', category: 'PDF & Image' },
    'image-compressor': { name: 'Image Compressor', description: 'Compress images without quality loss', category: 'PDF & Image' },
    'jpg-to-png': { name: 'JPG to PNG', description: 'Convert JPG images to PNG format', category: 'PDF & Image' },
    'png-to-jpg': { name: 'PNG to JPG', description: 'Convert PNG images to JPG format', category: 'PDF & Image' },
    'resize-image': { name: 'Resize Image', description: 'Resize images by pixels or percentage', category: 'PDF & Image' },
    'resume-bullets': { name: 'Resume Bullets', description: 'Generate professional resume points', category: 'Career' },
    'cover-letter-writer': { name: 'Cover Letter Writer', description: 'Write compelling cover letters', category: 'Career' },
    'interview-generator': { name: 'Interview Prep', description: 'Prepare for job interviews', category: 'Career' },
    'bio-generator': { name: 'Bio Generator', description: 'Create professional bios', category: 'Career' },
    'linkedin-optimizer': { name: 'LinkedIn Optimizer', description: 'Optimize your LinkedIn profile', category: 'Career' },
    'word-counter': { name: 'Word Counter', description: 'Count words, characters, and sentences', category: 'Utility' },
    'character-counter': { name: 'Character Counter', description: 'Count characters with and without spaces', category: 'Utility' },
    'case-converter': { name: 'Case Converter', description: 'Convert text between cases', category: 'Utility' },
    'age-calculator': { name: 'Age Calculator', description: 'Calculate exact age from birthdate', category: 'Utility' },
    'youtube-summarizer': { name: 'YouTube Summarizer', description: 'Summarize YouTube videos with AI', category: 'Utility' },
    'plagiarism-checker': { name: 'Plagiarism Checker', description: 'Check text for plagiarism', category: 'Writing' },
};

export function RelatedTools({ currentTool, category }: RelatedToolsProps) {
    let relatedSlugs = relatedToolsMap[currentTool] || [];

    // Fallback if specific mapping is not found to maintain internal link equity
    if (relatedSlugs.length === 0) {
        const fallbackTools = ['text-summarizer', 'essay-writer', 'merge-pdf', 'homework-solver', 'cover-letter-writer'];
        relatedSlugs = fallbackTools.filter(slug => slug !== currentTool).slice(0, 4);
    }

    const relatedTools: RelatedTool[] = relatedSlugs
        .map(slug => ({
            slug,
            name: toolData[slug]?.name || '',
            description: toolData[slug]?.description || '',
            category: toolData[slug]?.category || '',
        }))
        .filter(tool => tool.name)
        .slice(0, 4); // Show max 4 related tools

    if (relatedTools.length === 0) return null;

    return (
        <section className="border-t border-border bg-card py-12">
            <div className="mx-auto max-w-[1100px] px-6">
                <h2 className="font-heading mb-6 text-2xl font-extrabold tracking-tight text-foreground">
                    You might also like
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {relatedTools.map((tool) => (
                        <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="surface-card group flex flex-col p-5"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <span className="inline-flex items-center rounded-full bg-accent px-2 py-1 text-xs font-bold text-primary">
                                    {tool.category}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                            </div>
                            <h3 className="mb-2 font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary">
                                {tool.name}
                            </h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {tool.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
