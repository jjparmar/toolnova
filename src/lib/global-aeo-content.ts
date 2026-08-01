/**
 * Global AEO content for homepage and category pages
 * Voice-optimized content for site-wide queries
 */

import { LucideIcon } from 'lucide-react';
import { TOOL_COUNT_LABEL } from '@/data/tool-search-index';

export interface GlobalAEOContent {
    quickAnswer: {
        question: string;
        answer: string;
    };
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export const homepageAEO: GlobalAEOContent = {
    quickAnswer: {
        question: 'What is ToolNova?',
        answer:`ToolNova is a free online platform offering ${TOOL_COUNT_LABEL} AI-powered tools for students, professionals, and content creators. It includes PDF tools (merge, split), image editors, AI writing assistants (essay writer, paraphraser, grammar checker), study aids (flashcard maker, homework solver, YouTube summarizer), and productivity tools. No account is required to start; free daily AI use is included and Pro is optional for unlimited AI.`,
    },
    faqs: [
        {
            question: 'Is ToolNova really free?',
            answer: 'Yes. All tools are free to start with no credit card required. PDF and image tools run fully in your browser with no account. AI writing and study tools include a free daily allowance without sign-up; a free account adds more daily uses and history, and Pro unlocks unlimited AI access.',
        },
        {
            question: 'Do I need to create an account to use ToolNova?',
            answer: 'No. You can use every tool without creating an account. Guests get a free daily AI allowance; PDF/image utilities work with no limits in the browser. Sign-up is optional if you want more free AI uses, saved history, or a Pro plan.',
        },
        {
            question: 'What types of tools does ToolNova offer?',
            answer: 'ToolNova offers 6 main categories: Study Tools (homework solver, flashcard maker, notes generator, quiz generator, YouTube summarizer), Writing Tools (essay writer, paraphraser, grammar checker, plagiarism checker), Exam Prep (vocabulary builder, synonym finder), PDF Tools (merge, split, image to PDF), Image Tools (resize, convert, compress), and Career Tools (resume bullets, cover letter writer, interview prep).',
        },
        {
            question: 'Are the ToolNova tools AI-powered?',
            answer: 'Yes. ToolNova uses advanced AI and machine learning models for intelligent tools like the homework solver, essay writer, paraphraser, flashcard maker, and content generators. These produce context-aware, accurate results in seconds rather than requiring manual input.',
        },
        {
            question: 'Is my data safe and private on ToolNova?',
            answer: 'Yes. ToolNova enforces a strict zero-retention policy: uploaded files are encrypted during transfer and automatically deleted from servers after processing. No personal data, documents, or file contents are stored, sold, or shared.',
        },
        {
            question: 'Can I use ToolNova on mobile devices?',
            answer: 'Yes. ToolNova is fully responsive and mobile-optimized. All tools work on smartphones, tablets, and desktop computers through any modern web browser—no app download required. The interface uses touch-friendly design for mobile users.',
        },
        {
            question: 'How many tools does ToolNova have?',
            answer:`ToolNova currently offers ${TOOL_COUNT_LABEL} free AI tools across 6 categories: writing, study, exam prep, PDF & image, career, and utility. New tools are added regularly based on user requests.`,
        },
    ],
};

export const categoryAEO: Record<string, GlobalAEOContent> = {
    'study-tools': {
        quickAnswer: {
            question: 'What are ToolNova study tools?',
            answer: 'ToolNova study tools are AI-powered learning aids including homework solver, flashcard maker, notes generator, quiz creator, and concept explainer. These free tools help students study more efficiently, prepare for exams, and understand complex topics with step-by-step explanations.',
        },
        faqs: [
            {
                question: 'What study tools are available?',
                answer: 'We offer 11 study tools including Homework Solver, Flashcard Maker, Notes Generator, Quiz Generator, MCQ Generator, Concept Explainer, Diagram Explainer, Doubt Solver, Formula Generator, Revision Planner, and Timetable Generator.',
            },
            {
                question: 'Are the study tools suitable for all grade levels?',
                answer: 'Yes! Our study tools work for elementary, middle school, high school, and college students. The AI adapts to your academic level and provides appropriate explanations and content.',
            },
            {
                question: 'Can the homework solver show step-by-step solutions?',
                answer: 'Yes, the Homework Solver provides detailed step-by-step explanations for math, science, and other subjects. It teaches you the problem-solving method, not just the answer.',
            },
        ],
    },
    'writing-tools': {
        quickAnswer: {
            question: 'What are ToolNova writing tools?',
            answer: 'ToolNova writing tools are AI assistants for creating essays, stories, emails, captions, and professional content. They include essay writer, paraphraser, grammar fix, text summarizer, and more—all free tools that help students and professionals write better, faster.',
        },
        faqs: [
            {
                question: 'What writing tools are available?',
                answer: 'We offer 10 writing tools including Essay Writer, Paraphraser, Grammar Fix, Text Summarizer, Email Writer, Story Generator, Caption Generator, Speech Writer, Bio Generator, and Paragraph Generator.',
            },
            {
                question: 'Is the content plagiarism-free?',
                answer: 'Yes, our AI generates unique content. However, we recommend using the tools as writing assistants—add your own voice, research, and always cite sources for academic work.',
            },
            {
                question: 'Can I use these for professional writing?',
                answer: 'Absolutely! Our writing tools are perfect for professional emails, business content, cover letters, and marketing copy. The Grammar Fix and Email Writer are especially popular for professional use.',
            },
        ],
    },
    'exam-prep-tools': {
        quickAnswer: {
            question: 'What are ToolNova exam prep tools?',
            answer: 'ToolNova exam prep tools help students prepare for tests with vocabulary builders, synonym finders, idioms and phrases guides, and one-word substitution tools. These free resources improve language skills and help students excel in English exams and competitive tests.',
        },
        faqs: [
            {
                question: 'What exam prep tools are available?',
                answer: 'We offer 5 exam prep tools: Vocabulary Builder, Synonym Finder, Antonym Finder, Idioms and Phrases, and One Word Substitution. These tools are perfect for SAT, GRE, TOEFL, and other competitive exams.',
            },
            {
                question: 'How does the vocabulary builder work?',
                answer: 'The Vocabulary Builder helps you learn new words with definitions, examples, and usage in context. It\'s designed to expand your vocabulary for exams, essays, and professional communication.',
            },
        ],
    },
    'image-pdf-tools': {
        quickAnswer: {
            question: 'What are ToolNova PDF and image tools?',
            answer: 'ToolNova offers free PDF tools (merge, split, compress) and image tools (resize, convert JPG/PNG, compress). These utilities help students and professionals manage documents and images without quality loss—no watermarks, no file size limits, completely free.',
        },
        faqs: [
            {
                question: 'What PDF tools are available?',
                answer: 'We offer Merge PDF, Split PDF, Image to PDF, Image Compressor, Image Resizer, and format converters (JPG/PNG). All tools are free with no watermarks.',
            },
            {
                question: 'What image tools are available?',
                answer: 'We offer Image Compressor, JPG to PNG converter, and PNG to JPG converter. All tools preserve image quality while optimizing file size.',
            },
            {
                question: 'Is there a file size limit?',
                answer: 'No! You can process PDFs and images of any size. Our tools handle small documents and large files equally well without compression or quality loss.',
            },
        ],
    },
    'utility-tools': {
        quickAnswer: {
            question: 'What are ToolNova utility tools?',
            answer: 'ToolNova utility tools include word counter, character counter, case converter, text simplifier, and age calculator. These free productivity tools help students and professionals with everyday tasks like counting words, changing text case, and simplifying complex content.',
        },
        faqs: [
            {
                question: 'What utility tools are available?',
                answer: 'We offer 6 utility tools: Word Counter, Character Counter, Case Converter, Text Simplifier, Text Summarizer, and Age Calculator. These tools help with writing, editing, and productivity.',
            },
            {
                question: 'Does the word counter show reading time?',
                answer: 'Yes! The Word Counter shows word count, character count, sentence count, paragraph count, and estimated reading time for your text.',
            },
        ],
    },
    'career-tools': {
        quickAnswer: {
            question: 'What are ToolNova career tools?',
            answer: 'ToolNova career tools help with job applications and professional development: resume bullets, cover letter writer, LinkedIn optimizer, interview generator, bio generator, goal planner, timetable, and to-do lists. Free to start with no account required for basic use.',
        },
        faqs: [
            {
                question: 'What career tools are available?',
                answer: 'Resume Bullets, Cover Letter Writer, LinkedIn Optimizer, Interview Generator, Bio Generator, Goal Planner, Timetable Generator, and To-Do List Generator. Use them as a stack from resume → LinkedIn → applications → interview practice.',
            },
            {
                question: 'Can the cover letter writer customize for different jobs?',
                answer: 'Yes. Paste the job description and your experience to generate a tailored draft, then edit tone and facts so the letter is accurate and personal.',
            },
            {
                question: 'Are AI career tools free?',
                answer: 'Yes — free daily AI use is included without sign-up. PDF/image tools stay unlimited in the browser. Optional Pro unlocks unlimited AI generations.',
            },
        ],
    },
};

/**
 * Get AEO content for homepage
 */
export function getHomepageAEO(): GlobalAEOContent {
    return homepageAEO;
}

/**
 * Get AEO content for a category page
 */
export function getCategoryAEO(categorySlug: string): GlobalAEOContent {
    return categoryAEO[categorySlug] || homepageAEO;
}
