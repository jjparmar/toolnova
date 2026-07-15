/**
 * Comprehensive AEO content for all major tools
 * Includes quick answers, features, how-it-works, and FAQs
 */

import {
    FileText,
    Sparkles,
    Zap,
    Shield,
    Clock,
    CheckCircle,
    Brain,
    Target,
    LucideIcon
} from 'lucide-react';

export interface ToolAEOContent {
    quickAnswer: {
        question: string;
        answer: string;
    };
    features: Array<{
        title: string;
        description: string;
        icon: LucideIcon;
    }>;
    howItWorks: Array<{
        step: number;
        title: string;
        description: string;
        icon: LucideIcon;
        color: string;
    }>;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export const toolAEOContent: Record<string, ToolAEOContent> = {
    'text-summarizer': {
        quickAnswer: {
            question: 'What is the Text Summarizer?',
            answer: 'The Text Summarizer is an AI-powered tool that condenses long documents, articles, or research papers into concise summaries. It extracts key points and main ideas, saving you time while preserving essential information. Perfect for students, researchers, and professionals.',
        },
        features: [
            {
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms identify and extract the most important information',
                icon: Brain,
            },
            {
                title: 'Instant Results',
                description: 'Get comprehensive summaries in seconds, not hours',
                icon: Zap,
            },
            {
                title: 'Adjustable Length',
                description: 'Control summary length from brief overviews to detailed condensations',
                icon: Target,
            },
            {
                title: 'Preserves Context',
                description: 'Maintains the original meaning and key relationships between ideas',
                icon: Shield,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Paste Your Text',
                description: 'Copy and paste the document or article you want to summarize into the text box.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Choose Summary Length',
                description: 'Select how detailed you want your summary to be - short, medium, or long.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Generate Summary',
                description: 'Click the generate button and let AI analyze and condense your content.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Review & Use',
                description: 'Read your summary, copy it, or download it for your needs.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'How accurate are the summaries?',
                answer: 'Our AI-powered summarizer maintains high accuracy by using advanced natural language processing. It identifies key concepts, main arguments, and important details while filtering out redundant information. The summaries preserve the original meaning and context.',
            },
            {
                question: 'What types of documents can I summarize?',
                answer: 'You can summarize any text-based content including research papers, articles, blog posts, reports, essays, books, meeting notes, and more. The tool works best with well-structured content that has clear main points.',
            },
            {
                question: 'Is there a word limit?',
                answer: 'The free version supports documents up to 10,000 words. This is sufficient for most articles, papers, and reports. For longer documents, consider breaking them into sections and summarizing each part separately.',
            },
            {
                question: 'Can I adjust the summary length?',
                answer: 'Yes! You can choose between short (25% of original), medium (50% of original), or long (75% of original) summaries. This flexibility lets you get quick overviews or more detailed condensations based on your needs.',
            },
            {
                question: 'How is this different from just reading the conclusion?',
                answer: 'Unlike reading just the conclusion, our summarizer extracts key points from the entire document, including important details from the introduction, body, and conclusion. It creates a comprehensive overview that captures the full scope of the content.',
            },
        ],
    },

    'paraphraser': {
        quickAnswer: {
            question: 'What is the Paraphraser?',
            answer: 'The Paraphraser is an AI tool that rewrites text while preserving its original meaning. It helps you express ideas in different words, avoid plagiarism, improve clarity, and create unique content. Ideal for students, writers, and content creators.',
        },
        features: [
            {
                title: 'Multiple Modes',
                description: 'Choose from standard, fluency, creative, or formal paraphrasing styles',
                icon: Sparkles,
            },
            {
                title: 'Plagiarism-Free',
                description: 'Generate unique content that passes plagiarism checkers',
                icon: Shield,
            },
            {
                title: 'Instant Processing',
                description: 'Rewrite paragraphs or entire articles in seconds',
                icon: Zap,
            },
            {
                title: 'Preserves Meaning',
                description: 'Maintains the original message while changing the wording',
                icon: Brain,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Input Your Text',
                description: 'Paste the text you want to paraphrase into the input box.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Select Mode',
                description: 'Choose your preferred paraphrasing style - standard, creative, or formal.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Generate',
                description: 'Click paraphrase and let AI rewrite your content intelligently.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Copy & Use',
                description: 'Review the paraphrased text and use it in your work.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'Will paraphrased content pass plagiarism checkers?',
                answer: 'Yes, our paraphraser generates unique content that typically passes plagiarism detection tools. However, we recommend always citing your sources and using paraphrasing as a tool to understand and express ideas in your own words, not to avoid attribution.',
            },
            {
                question: 'What is the difference between paraphrasing modes?',
                answer: 'Standard mode provides balanced rewrites, Creative mode uses more varied vocabulary and sentence structures, and Formal mode maintains professional tone. Choose based on your audience and purpose - academic writing benefits from formal mode, while blog posts work well with creative mode.',
            },
            {
                question: 'Can I paraphrase in different languages?',
                answer: 'Currently, our paraphraser works best with English text. We are working on adding support for Spanish, French, German, and other languages. The tool can handle some multilingual content but results are optimal with English input.',
            },
            {
                question: 'How much text can I paraphrase at once?',
                answer: 'You can paraphrase up to 5,000 words at a time with the free version. For longer documents, we recommend breaking them into sections. This also gives you better control over the paraphrasing quality and style consistency.',
            },
        ],
    },

    'grammar-fix': {
        quickAnswer: {
            question: 'What is the Grammar Fix tool?',
            answer: 'Grammar Fix is an AI-powered tool that automatically detects and corrects grammar, spelling, punctuation, and style errors in your writing. It provides instant suggestions to improve clarity, fix mistakes, and enhance your writing quality—perfect for students, professionals, and content creators.',
        },
        features: [
            {
                title: 'Instant Error Detection',
                description: 'Identifies grammar, spelling, and punctuation mistakes in real-time',
                icon: Target,
            },
            {
                title: 'Smart Suggestions',
                description: 'Provides context-aware corrections and style improvements',
                icon: Brain,
            },
            {
                title: 'Multiple Writing Styles',
                description: 'Adapts to academic, professional, or casual writing contexts',
                icon: Sparkles,
            },
            {
                title: 'Clarity Enhancement',
                description: 'Improves sentence structure and readability',
                icon: CheckCircle,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Paste Your Text',
                description: 'Copy and paste the text you want to check into the input box.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'AI Analysis',
                description: 'Our AI scans for grammar, spelling, and style errors instantly.',
                icon: Brain,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Review Suggestions',
                description: 'See highlighted errors with explanations and corrections.',
                icon: Target,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Apply Fixes',
                description: 'Accept suggestions and copy your corrected text.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'What types of errors does Grammar Fix detect?',
                answer: 'Grammar Fix detects grammar mistakes, spelling errors, punctuation issues, verb tense problems, subject-verb agreement errors, and style inconsistencies. It also suggests improvements for clarity and readability.',
            },
            {
                question: 'Is Grammar Fix suitable for academic writing?',
                answer: 'Yes! Grammar Fix is excellent for essays, research papers, and academic assignments. It helps maintain formal tone, proper citation format, and academic writing standards while catching common student errors.',
            },
            {
                question: 'Can it check different English variants?',
                answer: 'Yes, Grammar Fix supports both American and British English. It adapts spelling, punctuation, and grammar rules based on your preferred variant.',
            },
            {
                question: 'How is this different from spell check?',
                answer: 'Unlike basic spell checkers, Grammar Fix uses AI to understand context. It catches grammar errors, suggests better word choices, improves sentence structure, and provides explanations—not just spelling corrections.',
            },
        ],
    },

    'essay-writer': {
        quickAnswer: {
            question: 'What is the Essay Writer tool?',
            answer: 'Essay Writer is an AI assistant that helps you create well-structured essays, research papers, and academic content. It generates outlines, introductions, body paragraphs, and conclusions based on your topic and requirements—helping students write better essays faster while learning proper structure.',
        },
        features: [
            {
                title: 'Structured Outlines',
                description: 'Generates organized essay outlines with main points and subpoints',
                icon: FileText,
            },
            {
                title: 'Academic Tone',
                description: 'Maintains formal, scholarly writing appropriate for essays',
                icon: Brain,
            },
            {
                title: 'Multiple Essay Types',
                description: 'Supports argumentative, persuasive, narrative, and expository essays',
                icon: Sparkles,
            },
            {
                title: 'Citation Ready',
                description: 'Creates content that is easy to cite and reference',
                icon: Shield,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Enter Your Topic',
                description: 'Provide your essay topic, thesis, or main argument.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Choose Essay Type',
                description: 'Select argumentative, persuasive, narrative, or expository.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Generate Content',
                description: 'AI creates structured paragraphs with supporting arguments.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Edit & Personalize',
                description: 'Review, edit, and add your own insights and research.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'Can I use this for school assignments?',
                answer: 'Essay Writer is a learning tool to help you understand essay structure and generate ideas. Use it as a starting point, then add your own research, analysis, and voice. Always follow your school\'s academic integrity policies.',
            },
            {
                question: 'What essay types are supported?',
                answer: 'We support argumentative essays, persuasive essays, narrative essays, expository essays, compare and contrast essays, and analytical essays. Each type follows appropriate structure and tone.',
            },
            {
                question: 'Does it include citations?',
                answer: 'The tool generates content that you can cite, but you must add your own sources and citations. We recommend using proper citation formats (MLA, APA, Chicago) and citing all sources you reference.',
            },
            {
                question: 'How long can the essays be?',
                answer: 'You can generate essays from 250 words (1 page) to 2000+ words (5-8 pages). Specify your desired length, and the AI will create appropriately detailed content.',
            },
        ],
    },

    'homework-solver': {
        quickAnswer: {
            question: 'What is the Homework Solver?',
            answer: 'Homework Solver is an AI-powered tool that helps students solve math, science, and other homework problems with step-by-step explanations. It does not just give answers—it teaches you the problem-solving process, making it perfect for learning and exam preparation.',
        },
        features: [
            {
                title: 'Step-by-Step Solutions',
                description: 'Detailed explanations showing how to solve each problem',
                icon: Target,
            },
            {
                title: 'Multiple Subjects',
                description: 'Supports math, physics, chemistry, and more',
                icon: Brain,
            },
            {
                title: 'Learn the Method',
                description: 'Understand the process, not just the answer',
                icon: Sparkles,
            },
            {
                title: 'Instant Help',
                description: 'Get solutions in seconds, 24/7 availability',
                icon: Zap,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Enter Your Problem',
                description: 'Type or paste your homework question or math problem.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Select Subject',
                description: 'Choose math, science, or the relevant subject area.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Get Solution',
                description: 'Receive step-by-step explanation with the answer.',
                icon: Brain,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Learn & Practice',
                description: 'Study the method and apply it to similar problems.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'What subjects does Homework Solver support?',
                answer: 'Homework Solver supports mathematics (algebra, geometry, calculus), physics, chemistry, biology, and general science. It works best with problems that have clear, definable solutions.',
            },
            {
                question: 'Does it show work or just answers?',
                answer: 'It shows complete step-by-step work! You will see each step of the solution process with explanations, helping you understand the method and learn how to solve similar problems yourself.',
            },
            {
                question: 'Is this cheating?',
                answer: 'Homework Solver is a learning tool, not a cheating tool. Use it to understand concepts and check your work, but always attempt problems yourself first. Learning the process is more important than just getting answers.',
            },
            {
                question: 'Can it solve word problems?',
                answer: 'Yes! Homework Solver can interpret and solve word problems. It identifies the key information, sets up equations, and solves step-by-step, teaching you how to approach complex word problems.',
            },
        ],
    },

    'merge-pdf': {
        quickAnswer: {
            question: 'What is the Merge PDF tool?',
            answer: 'Merge PDF is a free online tool that combines multiple PDF files into a single document. Simply upload your PDFs, arrange them in your preferred order, and merge them instantly—no watermarks, no file size limits, completely free and secure.',
        },
        features: [
            {
                title: 'Unlimited Merging',
                description: 'Combine as many PDF files as you need, no restrictions',
                icon: Zap,
            },
            {
                title: 'Drag & Drop Order',
                description: 'Easily rearrange PDFs before merging',
                icon: Target,
            },
            {
                title: 'No Watermarks',
                description: 'Clean, professional output without branding',
                icon: Shield,
            },
            {
                title: 'Fast Processing',
                description: 'Merge large files in seconds',
                icon: Sparkles,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Upload PDFs',
                description: 'Select or drag and drop multiple PDF files to upload.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Arrange Order',
                description: 'Drag files to rearrange them in your desired sequence.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Merge Files',
                description: 'Click merge and wait a few seconds for processing.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Download',
                description: 'Download your combined PDF file instantly.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'Is there a file size limit?',
                answer: 'No! You can merge PDFs of any size. Whether you have small documents or large files with hundreds of pages, our tool handles them all without restrictions.',
            },
            {
                question: 'How many PDFs can I merge at once?',
                answer: 'You can merge unlimited PDF files in a single operation. Combine 2, 10, 50, or even 100+ PDFs into one document—there is no maximum limit.',
            },
            {
                question: 'Will the quality be reduced?',
                answer: 'No, quality is preserved! Merge PDF maintains the original quality of all your documents. Images, text, and formatting remain exactly as they were in the source files.',
            },
            {
                question: 'Is my data secure?',
                answer: 'Yes, your files are completely secure. All uploads are encrypted, and we automatically delete your files from our servers after processing. Your privacy is our priority.',
            },
        ],
    },

    'split-pdf': {
        quickAnswer: {
            question: 'What is the Split PDF tool?',
            answer: 'Split PDF is a free tool that separates a single PDF into multiple files. Extract specific pages, split by page ranges, or divide a large PDF into smaller documents—perfect for sharing individual sections or reducing file sizes. No watermarks, completely free.',
        },
        features: [
            {
                title: 'Flexible Splitting',
                description: 'Split by page ranges, extract specific pages, or divide evenly',
                icon: Target,
            },
            {
                title: 'Preview Pages',
                description: 'See thumbnails before splitting',
                icon: Brain,
            },
            {
                title: 'Batch Processing',
                description: 'Create multiple PDFs from one source file',
                icon: Zap,
            },
            {
                title: 'Quality Preserved',
                description: 'Original formatting and quality maintained',
                icon: Shield,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Upload PDF',
                description: 'Select the PDF file you want to split.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Choose Pages',
                description: 'Select specific pages or page ranges to extract.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Split PDF',
                description: 'Click split and let the tool process your file.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Download Files',
                description: 'Download individual PDF files or all at once.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'Can I extract specific pages?',
                answer: 'Yes! You can extract any specific pages you want. For example, extract pages 1-5, 10, and 15-20 from a 50-page PDF. You have complete control over which pages to split.',
            },
            {
                question: 'Can I split into equal parts?',
                answer: 'Yes, you can split a PDF into equal parts. For example, divide a 100-page PDF into 10 files of 10 pages each, or split it in half. Choose your preferred division method.',
            },
            {
                question: 'What happens to the original file?',
                answer: 'The original PDF remains unchanged. Split PDF creates new files from your source document without modifying the original. You can download both the splits and keep your original file.',
            },
            {
                question: 'Is there a page limit?',
                answer: 'No page limit! Split PDFs with 10 pages or 1000+ pages. Our tool handles documents of any size efficiently.',
            },
        ],
    },

    'flashcard-maker': {
        quickAnswer: {
            question: 'What is the Flashcard Maker?',
            answer: 'Flashcard Maker is an AI tool that creates digital study flashcards from your notes, textbooks, or topics. It generates question-answer pairs automatically, helping you memorize key concepts efficiently. Perfect for exam prep, vocabulary building, and active recall learning.',
        },
        features: [
            {
                title: 'AI-Generated Cards',
                description: 'Automatically creates flashcards from your content',
                icon: Brain,
            },
            {
                title: 'Customizable',
                description: 'Edit questions and answers to fit your needs',
                icon: Target,
            },
            {
                title: 'Multiple Formats',
                description: 'Export as digital cards or printable sheets',
                icon: Sparkles,
            },
            {
                title: 'Study Mode',
                description: 'Practice with interactive flashcard review',
                icon: CheckCircle,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Input Content',
                description: 'Paste your notes, textbook content, or topic to study.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'AI Generation',
                description: 'AI analyzes content and creates question-answer pairs.',
                icon: Brain,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Review & Edit',
                description: 'Customize flashcards, add more, or remove unnecessary ones.',
                icon: Target,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Study & Practice',
                description: 'Use study mode or export for offline review.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'How many flashcards can I create?',
                answer: 'You can generate multiple flashcard sets within your free daily AI allowance. Create a free account for more daily uses, or upgrade to Pro for unlimited AI generation. Edit and reorganize cards freely after they are created.',
            },
            {
                question: 'Can I edit the generated flashcards?',
                answer: 'Yes! You have full control to edit questions, answers, add new cards, delete cards, or reorganize your deck. The AI provides a starting point, but you can customize everything.',
            },
            {
                question: 'What subjects work best?',
                answer: 'Flashcard Maker works great for any subject with facts, definitions, or concepts: languages, history, science, medicine, law, and more. It is especially effective for memorization-based learning.',
            },
            {
                question: 'Can I print the flashcards?',
                answer: 'Yes! You can export flashcards as printable PDFs or use the digital study mode. Choose the format that works best for your learning style—digital for convenience or printed for tactile learning.',
            },
        ],
    },

    // Default/fallback AEO content for tools without specific content
    'default': {
        quickAnswer: {
            question: 'What is this tool?',
            answer: 'This is a free AI-powered tool from ToolNova designed to help students, professionals, and content creators boost their productivity. Get instant results with no sign-up required, completely free to use.',
        },
        features: [
            {
                title: 'AI-Powered',
                description: 'Advanced AI technology for accurate and intelligent results',
                icon: Brain,
            },
            {
                title: 'Instant Results',
                description: 'Get your output in seconds, not minutes',
                icon: Zap,
            },
            {
                title: 'Free to Use',
                description: 'No sign-up, no subscriptions, completely free',
                icon: Shield,
            },
            {
                title: 'Easy to Use',
                description: 'Simple interface designed for everyone',
                icon: Target,
            },
        ],
        howItWorks: [
            {
                step: 1,
                title: 'Enter Your Input',
                description: 'Type or paste your content into the input field.',
                icon: FileText,
                color: 'bg-blue-600',
            },
            {
                step: 2,
                title: 'Customize Options',
                description: 'Choose your preferred settings and options.',
                icon: Target,
                color: 'bg-purple-600',
            },
            {
                step: 3,
                title: 'Generate',
                description: 'Click generate and let AI process your request.',
                icon: Sparkles,
                color: 'bg-indigo-600',
            },
            {
                step: 4,
                title: 'Use Your Result',
                description: 'Copy, download, or use your result immediately.',
                icon: CheckCircle,
                color: 'bg-green-600',
            },
        ],
        faqs: [
            {
                question: 'Is this tool free?',
                answer: 'Yes, this tool is completely free to use. There are no hidden fees, subscriptions, or sign-up requirements. You can use it as many times as you need.',
            },
            {
                question: 'Do I need to create an account?',
                answer: 'No account is required! You can start using the tool immediately without any sign-up process. Your privacy is important to us.',
            },
            {
                question: 'How accurate are the results?',
                answer: 'Our AI is trained on vast datasets to provide highly accurate results. However, we recommend reviewing the output and making adjustments as needed for your specific use case.',
            },
            {
                question: 'Can I use this for commercial purposes?',
                answer: 'Yes, you can use the output for personal, educational, or commercial purposes. We only ask that you review and verify the content before using it professionally.',
            },
        ],
    },
};

/**
 * Get AEO content for a specific tool
 * Falls back to default content if tool-specific content doesn't exist
 */
export function getToolAEOContent(toolSlug: string): ToolAEOContent {
    return toolAEOContent[toolSlug] || toolAEOContent['default'];
}
