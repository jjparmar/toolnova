/**
 * Voice Search Content Library
 * AEO-optimized answers for common voice search queries
 * Format: 40-60 words for optimal voice assistant reading
 */

export interface VoiceSearchAnswer {
    question: string;
    answer: string;
    speakable: boolean;
    category?: string;
}

export const voiceSearchAnswers: Record<string, VoiceSearchAnswer> = {
    // ToolNova General
    'what-is-toolnova': {
        question: 'What is ToolNova?',
        answer: 'ToolNova is a comprehensive suite of free AI-powered tools designed to boost productivity for students, professionals, and content creators. It offers tools for writing, editing, PDF management, image processing, and study assistance, all accessible directly in your browser without sign-up.',
        speakable: true,
        category: 'general',
    },
    'how-does-toolnova-work': {
        question: 'How does ToolNova work?',
        answer: 'ToolNova uses advanced AI technology to process your content instantly. Simply select a tool, input your text or file, customize settings if needed, and click generate. Results appear in seconds, ready to copy or download.',
        speakable: true,
        category: 'general',
    },
    'is-toolnova-free': {
        question: 'Is ToolNova free?',
        answer: 'Yes, ToolNova is free to use. All tools are available without sign-up to get started. PDF and image tools run in your browser with no limits; AI tools include a free daily allowance, with optional free accounts and Pro for higher limits.',
        speakable: true,
        category: 'general',
    },

    // Text Tools
    'what-is-paraphraser': {
        question: 'What is a paraphraser?',
        answer: 'A paraphraser is an AI tool that rewrites text while preserving its original meaning. It helps you express ideas in different words, avoid plagiarism, improve clarity, and create unique content from existing material.',
        speakable: true,
        category: 'text-tools',
    },
    'what-is-text-summarizer': {
        question: 'What is a text summarizer?',
        answer: 'A text summarizer is an AI tool that condenses long documents into concise summaries. It extracts key points from articles, research papers, or reports, saving you time while maintaining essential information.',
        speakable: true,
        category: 'text-tools',
    },
    'what-is-grammar-checker': {
        question: 'What is a grammar checker?',
        answer: 'A grammar checker is an AI tool that identifies and corrects grammar, spelling, and punctuation errors in your writing. It helps improve clarity, professionalism, and readability of your content.',
        speakable: true,
        category: 'text-tools',
    },

    // PDF Tools
    'how-to-merge-pdf': {
        question: 'How do I merge PDF files?',
        answer: 'To merge PDFs, upload multiple PDF files to ToolNova\'s Merge PDF tool, arrange them in your desired order, and click merge. Your combined PDF will be ready to download in seconds.',
        speakable: true,
        category: 'pdf-tools',
    },
    'how-to-split-pdf': {
        question: 'How do I split a PDF?',
        answer: 'To split a PDF, upload your file to ToolNova\'s Split PDF tool, select the pages or page ranges you want to extract, and click split. Each section will be saved as a separate PDF.',
        speakable: true,
        category: 'pdf-tools',
    },

    // Study Tools
    'what-is-flashcard-maker': {
        question: 'What is a flashcard maker?',
        answer: 'A flashcard maker is an AI tool that creates study flashcards from your notes or textbook content. It automatically generates question-answer pairs to help you memorize and review key concepts efficiently.',
        speakable: true,
        category: 'study-tools',
    },
    'what-is-homework-solver': {
        question: 'What is a homework solver?',
        answer: 'A homework solver is an AI tool that helps students solve math problems, science questions, and other academic challenges. It provides step-by-step explanations to help you understand concepts, not just get answers.',
        speakable: true,
        category: 'study-tools',
    },

    // Image Tools
    'how-to-compress-image': {
        question: 'How do I compress an image?',
        answer: 'To compress an image, upload your photo to ToolNova\'s Image Compressor, select your desired quality level, and click compress. Your optimized image will maintain visual quality while reducing file size significantly.',
        speakable: true,
        category: 'image-tools',
    },
    'how-to-convert-jpg-to-png': {
        question: 'How do I convert JPG to PNG?',
        answer: 'To convert JPG to PNG, upload your JPG image to ToolNova\'s converter tool and click convert. Your PNG file will be ready to download instantly with preserved image quality.',
        speakable: true,
        category: 'image-tools',
    },

    // Writing Tools
    'what-is-essay-writer': {
        question: 'What is an essay writer?',
        answer: 'An essay writer is an AI tool that helps you create well-structured essays on any topic. It generates outlines, thesis statements, and content based on your requirements, serving as a writing assistant for students.',
        speakable: true,
        category: 'writing-tools',
    },
    'what-is-paragraph-generator': {
        question: 'What is a paragraph generator?',
        answer: 'A paragraph generator is an AI tool that creates coherent paragraphs on any topic. It helps overcome writer\'s block, expand ideas, and generate content quickly for essays, articles, or blog posts.',
        speakable: true,
        category: 'writing-tools',
    },
};

/**
 * Get voice search answer by key
 */
export function getVoiceSearchAnswer(key: string): VoiceSearchAnswer | undefined {
    return voiceSearchAnswers[key];
}

/**
 * Get all voice search answers for a category
 */
export function getVoiceSearchAnswersByCategory(category: string): VoiceSearchAnswer[] {
    return Object.values(voiceSearchAnswers).filter(
        (answer) => answer.category === category
    );
}

/**
 * Search voice search answers by question text
 */
export function searchVoiceSearchAnswers(query: string): VoiceSearchAnswer[] {
    const lowerQuery = query.toLowerCase();
    return Object.values(voiceSearchAnswers).filter(
        (answer) =>
            answer.question.toLowerCase().includes(lowerQuery) ||
            answer.answer.toLowerCase().includes(lowerQuery)
    );
}
