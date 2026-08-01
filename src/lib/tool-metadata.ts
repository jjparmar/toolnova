/**
 * Optimized Tool Page Metadata Generator
 * Strategy: Long-tail, low-competition keywords with clear search intent.
 * - Avoid year in title (makes content feel stale post-year)
 * - Target specific, conversational queries instead of broad keywords
 * - Under 60 chars for title, 150-160 chars for description
 * - Include trust signals:"no watermark","no signup","free"
 */

interface ToolMetadata {
    slug: string;
    name: string;
    title: string;
    description: string;
    keywords: string[];
}

export const optimizedToolMetadata: Record<string, ToolMetadata> = {
    'text-summarizer': {
        slug: 'text-summarizer',
        name: 'Text Summarizer',
        title: 'Summarize Any Article or Essay Free – No Signup | ToolNova',
        description: 'Paste any article, essay, or document and get a clear summary in seconds. Adjustable length — brief or detailed. 100% free, works instantly, no account needed.',
        keywords: ['summarize article free', 'text summarizer no signup', 'how to summarize an essay online free', 'free article summarizer tool', 'AI summary generator for students', 'summarize long text online'],
    },
    'paraphraser': {
        slug: 'paraphraser',
        name: 'Paraphrasing Tool',
        title: 'Paraphrase Essay Without Changing Meaning – Free | ToolNova',
        description: 'Rewrite essays, paragraphs, and sentences while preserving the original meaning. Avoid plagiarism instantly. Three modes: Standard, Fluency, and Creative. Free, no signup.',
        keywords: ['paraphrase essay without changing meaning free', 'rewrite text to avoid plagiarism', 'free paraphrasing tool no login', 'paraphrase paragraph online free', 'rephrase sentence free', 'paraphrasing tool for students'],
    },
    'grammar-fix': {
        slug: 'grammar-fix',
        name: 'AI Grammar Fix',
        title: 'Fix Grammar Mistakes in Essays Free – AI Checker | ToolNova',
        description: 'Instantly fix grammar, spelling, and punctuation errors in essays, emails, and assignments. AI-powered with style suggestions. Free grammar checker, no account needed.',
        keywords: ['fix grammar mistakes in essay free', 'grammar checker for students no signup', 'correct grammar and spelling online free', 'free AI grammar fixer for essays', 'grammar check for ESL students', 'proofread my essay free'],
    },
    'essay-writer': {
        slug: 'essay-writer',
        name: 'Essay Writer',
        title: 'Write a Free Essay Online – AI Essay Generator | ToolNova',
        description: 'Generate a well-structured essay with intro, body paragraphs, and conclusion in seconds. Perfect for high school and college students. Free AI essay writer, no login required.',
        keywords: ['write essay online free for students', 'free AI essay generator for high school', 'generate essay introduction and conclusion free', 'AI essay writer no login', 'write my essay free online', 'essay writing tool for college students'],
    },
    'homework-solver': {
        slug: 'homework-solver',
        name: 'Homework Solver',
        title: 'Solve Homework Step by Step Free – AI Tutor | ToolNova',
        description: 'Get step-by-step explanations for math, science, history, and English homework. Our free AI homework solver shows the method, not just the answer. No signup required.',
        keywords: ['solve homework step by step free', 'step by step math homework solver free', 'free AI homework help for high school', 'solve math problems with explanation free', 'online homework helper no signup', 'AI tutor for homework free'],
    },
    'flashcard-maker': {
        slug: 'flashcard-maker',
        name: 'Flashcard Maker',
        title: 'Make Flashcards from Notes Automatically Free | ToolNova',
        description: 'Paste your notes or a textbook chapter and instantly generate question-and-answer flashcards. Perfect for spaced repetition and exam prep. Free, no account needed.',
        keywords: ['make flashcards from notes automatically free', 'generate flashcards from textbook chapter', 'free digital flashcard maker no signup', 'create study cards from notes AI', 'automatic flashcard generator for exams', 'free flashcard creator for students'],
    },
    'merge-pdf': {
        slug: 'merge-pdf',
        name: 'Merge PDF',
        title: 'Merge PDF Files Online Free – No Watermark | ToolNova',
        description: 'Combine multiple PDF files into one document in seconds. No watermarks, no file size limits, no signup. Drag, drop, and download your merged PDF instantly.',
        keywords: ['merge PDF files online free no watermark', 'combine PDF files without watermark free', 'join multiple PDF into one free online', 'merge PDF no signup no download', 'free PDF merger for students', 'combine PDF files on any device free'],
    },
    'split-pdf': {
        slug: 'split-pdf',
        name: 'Split PDF',
        title: 'Split PDF into Separate Pages Free – No Signup | ToolNova',
        description: 'Split a PDF into individual pages or extract specific page ranges. No watermarks, no upload limit. Free online PDF splitter, works on any browser without signing in.',
        keywords: ['split PDF into separate pages free', 'extract specific pages from PDF free online', 'free PDF splitter no watermark', 'split PDF without signing up', 'separate PDF pages online free', 'PDF page extractor free'],
    },
    'notes-generator': {
        slug: 'notes-generator',
        name: 'Notes Generator',
        title: 'Generate Study Notes from Any Topic Free – AI | ToolNova',
        description: 'Type any topic or paste a passage and get organized, structured study notes in seconds. AI-generated notes for exams, classes, and self-study. Free, no login required.',
        keywords: ['generate study notes from any topic free', 'AI study notes generator for students', 'make organized notes from text free', 'free notes generator for exam prep', 'create study notes automatically AI', 'summarize topic into notes free'],
    },
    'quiz-generator': {
        slug: 'quiz-generator',
        name: 'Quiz Generator',
        title: 'Create a Quiz from Any Topic Free – AI | ToolNova',
        description: 'Generate custom quiz questions and answers from any topic or text. Perfect for self-testing and teachers creating practice tests. Free AI quiz maker, no account needed.',
        keywords: ['create quiz from any topic free', 'generate quiz questions from text free', 'free AI quiz maker for teachers', 'make practice test from notes free', 'online quiz generator no signup', 'quiz creator for students free'],
    },
    'mcq-generator': {
        slug: 'mcq-generator',
        name: 'MCQ Generator',
        title: 'Generate Multiple Choice Questions Free – AI | ToolNova',
        description: 'Create multiple choice questions (MCQs) with answer options from any topic or notes. Great for competitive exam practice and teacher test prep. Free, no signup required.',
        keywords: ['generate multiple choice questions from text free', 'MCQ generator for competitive exams free', 'create MCQ from notes online free', 'free multiple choice question maker', 'AI MCQ generator for teachers', 'practice MCQ generator no signup'],
    },
    'concept-explainer': {
        slug: 'concept-explainer',
        name: 'Concept Explainer',
        title: 'Explain Any Concept Simply for Free – AI | ToolNova',
        description: 'Type any complex concept and get a simple, clear explanation with examples. Like having a tutor available 24/7. Perfect for students. Free AI concept explainer, no signup.',
        keywords: ['explain concept in simple words free', 'AI concept explainer for students', 'understand difficult topics online free', 'simplify complex concepts free tool', 'free explanation generator for students', 'make any topic easy to understand free'],
    },
    'speech-writer': {
        slug: 'speech-writer',
        name: 'Speech Writer',
        title: 'Write a Speech on Any Topic Free – AI | ToolNova',
        description: 'Generate a complete speech with introduction, main points, and conclusion. Works for school presentations, debates, and events. Free AI speech writer, no account needed.',
        keywords: ['write speech on any topic free', 'AI speech generator for school presentations', 'generate speech for debate competition free', 'free speech writer for students no login', 'write motivational speech online free', 'speech outline generator AI free'],
    },
    'email-writer': {
        slug: 'email-writer',
        name: 'Email Writer',
        title: 'Write Professional Emails Free – AI Email Generator | ToolNova',
        description: 'Generate clear, professional emails for any purpose — job applications, follow-ups, requests. AI writes the draft, you send it. Free email writer, no signup required.',
        keywords: ['write professional email free online', 'AI email generator no login', 'generate job application email free', 'free email writer for professionals', 'write formal email for students free', 'professional email template generator AI'],
    },
    'caption-generator': {
        slug: 'caption-generator',
        name: 'Caption Generator',
        title: 'Generate Instagram Captions Free – AI | ToolNova',
        description: 'Create engaging social media captions for Instagram, Facebook, and Twitter instantly. Choose tone: funny, motivational, or professional. Free caption generator, no signup.',
        keywords: ['generate Instagram captions free online', 'AI caption generator for social media', 'create funny captions for photos free', 'free Instagram caption maker no login', 'social media caption generator AI', 'post caption ideas generator free'],
    },
    'story-generator': {
        slug: 'story-generator',
        name: 'Story Generator',
        title: 'Generate a Short Story from a Prompt Free – AI | ToolNova',
        description: 'Enter a theme or prompt and get a complete short story with characters and plot. Great for creative writing practice and English assignments. Free AI story generator.',
        keywords: ['generate short story from prompt free', 'AI creative story writer online free', 'write story from topic free no login', 'free fiction story generator for students', 'story writing AI tool for English class', 'creative writing generator free'],
    },
    'paragraph-generator': {
        slug: 'paragraph-generator',
        name: 'Paragraph Generator',
        title: 'Generate a Paragraph on Any Topic Free – AI | ToolNova',
        description: 'Type a topic and get a well-written paragraph instantly. Perfect for essays, blogs, and academic writing. Free AI paragraph generator, no account or signup needed.',
        keywords: ['generate paragraph on any topic free', 'AI paragraph writer for essays free', 'write paragraph from topic free online', 'free paragraph generator no signup', 'academic paragraph writer AI free', 'generate essay paragraph free tool'],
    },
    'text-simplifier': {
        slug: 'text-simplifier',
        name: 'Text Simplifier',
        title: 'Simplify Complex Text to Plain English Free | ToolNova',
        description: 'Paste any difficult passage and get it rewritten in simple, easy-to-understand language. Great for students, ESL learners, and dense academic texts. Free, no login.',
        keywords: ['simplify complex text to plain English free', 'rewrite text in simple language free', 'make difficult text easy to read free', 'free text simplifier for ESL students', 'simplify academic writing online free', 'explain text in simple words free AI'],
    },
    'vocabulary-builder': {
        slug: 'vocabulary-builder',
        name: 'Vocabulary Builder',
        title: 'Build Vocabulary for SAT and GRE Free – AI | ToolNova',
        description: 'Learn new words with definitions, examples, and usage tips. AI curates vocabulary for SAT, GRE, IELTS, and TOEFL prep. Free vocabulary builder, no signup required.',
        keywords: ['build vocabulary for SAT free online', 'vocabulary builder for GRE free', 'learn new words with examples free', 'free vocabulary practice for IELTS TOEFL', 'AI vocabulary builder for competitive exams', 'word learning tool for students free'],
    },
    'synonym-finder': {
        slug: 'synonym-finder',
        name: 'Synonym Finder',
        title: 'Find Synonyms for Better Writing Free – AI | ToolNova',
        description: 'Find the perfect synonym for any word with context-aware suggestions. Improve your essays and avoid repetition. Free AI synonym finder — smarter than a thesaurus.',
        keywords: ['find synonyms for essay writing free', 'context-aware synonym finder free', 'AI thesaurus for better writing', 'free synonym tool for students', 'find better word choices for essay free', 'synonym and word alternatives free online'],
    },
    'antonym-finder': {
        slug: 'antonym-finder',
        name: 'Antonym Finder',
        title: 'Find Antonyms and Opposite Words Free – AI | ToolNova',
        description: 'Look up antonyms (opposite words) for any term instantly with usage examples. Great for vocabulary expansion and competitive exam prep. Free antonym finder, no login.',
        keywords: ['find antonym of any word free', 'opposite words finder online free', 'antonym generator for competitive exams', 'free antonym and opposite word tool', 'vocabulary antonym practice free', 'learn opposite words with examples free'],
    },
    'idioms-phrases': {
        slug: 'idioms-phrases',
        name: 'Idioms and Phrases',
        title: 'Learn English Idioms and Phrases Free – AI | ToolNova',
        description: 'Discover the meaning and usage of English idioms and phrases with examples. Perfect for ESL learners, students, and competitive exam prep. Free idioms tool, no signup.',
        keywords: ['learn English idioms and phrases free', 'idiom meaning and example sentences free', 'common English phrases for ESL students', 'free idiom finder with examples', 'English phrases for competitive exams free', 'idioms and phrases learning tool AI'],
    },
    'one-word-substitution': {
        slug: 'one-word-substitution',
        name: 'One Word Substitution',
        title: 'One Word Substitution for Exams Free – AI | ToolNova',
        description: 'Learn one-word substitutions for SSC, UPSC, and other competitive exams. AI explains the word and its usage. Free one-word substitution tool, no account needed.',
        keywords: ['one word substitution for competitive exams free', 'one word substitution for SSC UPSC free', 'learn one word substitution online free', 'vocabulary one word replacement tool AI', 'one word substitution practice free', 'English vocabulary exam prep free'],
    },
    'resume-bullets': {
        slug: 'resume-bullets',
        name: 'Resume Bullets',
        title: 'Generate Resume Bullet Points Free – AI | ToolNova',
        description: 'Turn your job duties into strong, action-verb-driven resume bullet points. AI generates ATS-friendly achievements for any role. Free resume bullet writer, no signup.',
        keywords: ['generate resume bullet points free', 'AI resume bullet point generator', 'write resume achievements with action verbs free', 'free ATS-friendly resume bullet generator', 'improve resume bullet points free', 'resume writer for job seekers free'],
    },
    'cover-letter-writer': {
        slug: 'cover-letter-writer',
        name: 'Cover Letter Writer',
        title: 'Write a Cover Letter for Any Job Free – AI | ToolNova',
        description: 'Generate a professional, personalized cover letter for any job in seconds. Enter the role and company — AI does the rest. Free cover letter writer, no login required.',
        keywords: ['write cover letter for any job free', 'AI cover letter generator no signup', 'free cover letter writer for job application', 'personalized cover letter generator AI', 'professional cover letter template free', 'write cover letter for internship free'],
    },
    'interview-generator': {
        slug: 'interview-generator',
        name: 'Interview Generator',
        title: 'Generate Interview Questions for Any Role Free | ToolNova',
        description: 'Get role-specific interview questions with model answers. Practice for software, marketing, finance, and more. Free AI interview prep tool, no account needed.',
        keywords: ['generate interview questions for any job free', 'AI interview prep questions with answers free', 'practice interview questions for software engineer', 'free job interview question generator', 'interview preparation tool free no login', 'common interview questions and answers free AI'],
    },
    'bio-generator': {
        slug: 'bio-generator',
        name: 'Bio Generator',
        title: 'Generate a Professional Bio for Free – AI | ToolNova',
        description: 'Create a professional LinkedIn bio, Twitter bio, or personal bio in seconds. Enter your name, role, and highlights — AI writes the rest. Free bio generator, no signup.',
        keywords: ['generate professional bio free online', 'AI bio writer for LinkedIn free', 'write personal bio for social media free', 'free professional bio generator no login', 'create Twitter bio with AI free', 'bio generator for students and professionals'],
    },
    'word-counter': {
        slug: 'word-counter',
        name: 'Word Counter',
        title: 'Count Words and Characters in Any Text – Free | ToolNova',
        description: 'Instantly count words, characters (with/without spaces), sentences, and paragraphs. Also shows estimated reading time. Free word counter tool, no login needed.',
        keywords: ['count words and characters in text free', 'free word counter online no signup', 'word count checker for essays free', 'character count tool for social media free', 'words and paragraphs counter online', 'estimate reading time for article free'],
    },
    'character-counter': {
        slug: 'character-counter',
        name: 'Character Counter',
        title: 'Count Characters in Text – Free Online Tool | ToolNova',
        description: 'Count characters with and without spaces instantly. Perfect for Twitter posts, SMS limits, and meta descriptions. Free character counter, no account required.',
        keywords: ['count characters in text free online', 'character counter for Twitter SMS free', 'character limit checker for social media', 'free character count tool no login', 'count letters and spaces in text free', 'meta description character counter free'],
    },
    'case-converter': {
        slug: 'case-converter',
        name: 'Case Converter',
        title: 'Convert Text to Uppercase or Lowercase Free | ToolNova',
        description: 'Instantly switch text between UPPERCASE, lowercase, Title Case, Sentence case, and camelCase. Free online case converter, no signup or installation needed.',
        keywords: ['convert text to uppercase lowercase free', 'title case converter online free', 'change text case online no signup', 'free text case converter tool', 'sentence case converter free online', 'camelCase converter for programmers free'],
    },
    'age-calculator': {
        slug: 'age-calculator',
        name: 'Age Calculator',
        title: 'Calculate Exact Age in Years Months Days – Free | ToolNova',
        description: 'Enter your date of birth to instantly calculate your exact age in years, months, and days. Also calculates the age between any two dates. Free age calculator, no login.',
        keywords: ['calculate exact age in years months days free', 'age calculator from date of birth free', 'how old am I calculator free online', 'age between two dates calculator free', 'free age finder tool no signup', 'date of birth age calculator online'],
    },
    'image-compressor': {
        slug: 'image-compressor',
        name: 'Image Compressor',
        title: 'Compress Images Without Losing Quality – Free | ToolNova',
        description: 'Reduce JPG, PNG, and WebP file sizes without visible quality loss. Compress images for websites, emails, and Google Slides. Free, no watermarks, no signup needed.',
        keywords: ['compress image without losing quality free', 'reduce image file size online free no watermark', 'compress JPG PNG for website free', 'free image compressor for email attachment', 'compress images for Google Slides free', 'online photo compressor no signup'],
    },
    'jpg-to-png': {
        slug: 'jpg-to-png',
        name: 'JPG to PNG',
        title: 'Convert JPG to PNG Free Online – No Watermark | ToolNova',
        description: 'Convert JPG images to transparent-background PNG format instantly. No watermarks, no quality loss, no file limits. Free JPG to PNG converter, no signup required.',
        keywords: ['convert JPG to PNG free online no watermark', 'JPG to PNG converter no signup', 'change JPEG to PNG free online', 'free image format converter no login', 'convert photo to PNG free transparent', 'batch JPG to PNG converter free'],
    },
    'png-to-jpg': {
        slug: 'png-to-jpg',
        name: 'PNG to JPG',
        title: 'Convert PNG to JPG Free Online – No Watermark | ToolNova',
        description: 'Convert PNG images to JPG format to reduce file size. No watermarks, no quality loss, unlimited conversions. Free PNG to JPG converter, no account needed.',
        keywords: ['convert PNG to JPG free online no watermark', 'PNG to JPEG converter no signup', 'reduce PNG file size by converting to JPG free', 'free image to JPG converter no login', 'batch PNG to JPG converter free', 'convert transparent PNG to JPG background free'],
    },
    'image-to-pdf': {
        slug: 'image-to-pdf',
        name: 'Image to PDF',
        title: 'Convert Images to PDF Free Online – No Watermark | ToolNova',
        description: 'Convert JPG, PNG, or multiple images into a single PDF document. No watermarks, no signup, works on any device. Free image to PDF converter, unlimited use.',
        keywords: ['convert images to PDF free no watermark', 'JPG PNG to PDF converter free online', 'combine multiple images into one PDF free', 'image to PDF no signup no download', 'free photo to PDF converter for students', 'convert screenshots to PDF free online'],
    },
    'chapter-summary': {
        slug: 'chapter-summary',
        name: 'Chapter Summary',
        title: 'Summarize a Textbook Chapter Free – AI | ToolNova',
        description: 'Paste a textbook chapter or section and get a clear, concise summary with key points highlighted. Perfect for exam revision. Free chapter summarizer, no account needed.',
        keywords: ['summarize textbook chapter free AI', 'chapter summary generator for students free', 'get key points from textbook chapter free', 'free study chapter summarizer no login', 'summarize book chapter for exam prep free', 'textbook chapter to notes AI free'],
    },
    'doubt-solver': {
        slug: 'doubt-solver',
        name: 'Doubt Solver',
        title: 'Get Answers to Study Doubts Free – AI Tutor | ToolNova',
        description: 'Ask any study question and get a clear, detailed answer instantly. Works for all subjects — math, science, history, and more. Free AI doubt solver, no signup needed.',
        keywords: ['get answers to study doubts free', 'AI question answering for students free', 'free online doubt solving tool no login', 'ask any study question get answer free', 'clear study doubts with AI free', 'doubt solving AI tutor free online'],
    },
    'diagram-explainer': {
        slug: 'diagram-explainer',
        name: 'Diagram Explainer',
        title: 'Explain Diagrams and Charts Simply Free – AI | ToolNova',
        description: 'Upload or describe a diagram, chart, or graph and get a clear explanation in plain English. Great for students struggling with visual content. Free, no signup required.',
        keywords: ['explain diagram in simple words free', 'understand charts and graphs with AI free', 'free diagram explainer for students', 'explain flowchart diagram online free', 'AI chart explainer no login', 'visual learning tool diagram explainer free'],
    },
    'formula-generator': {
        slug: 'formula-generator',
        name: 'Formula Generator',
        title: 'Get Math and Science Formulas with Explanation Free | ToolNova',
        description: 'Enter a math or science topic and get the relevant formulas with step-by-step explanations and examples. Perfect for exam prep. Free formula generator, no signup.',
        keywords: ['math and science formulas with explanation free', 'get formula for any math topic free', 'physics chemistry formula generator AI free', 'formula finder for exam prep free', 'free formula generator for students no login', 'explain math formula with example free'],
    },
    'timetable-generator': {
        slug: 'timetable-generator',
        name: 'Timetable Generator',
        title: 'Create a Study Timetable for Exams Free – AI | ToolNova',
        description: 'Enter your subjects and exam dates, and AI creates a personalized study schedule. Balanced, realistic, and effective. Free study timetable generator, no signup needed.',
        keywords: ['create study timetable for exams free', 'AI exam study schedule generator free', 'personalized study timetable maker free', 'free study planner for students no login', 'make exam revision schedule free online', 'study timetable generator for school college'],
    },
    'revision-planner': {
        slug: 'revision-planner',
        name: 'Revision Planner',
        title: 'Plan Your Exam Revision Schedule Free – AI | ToolNova',
        description: 'Get a structured revision plan based on your subjects and time available. AI schedules topics using spaced repetition principles. Free revision planner, no signup.',
        keywords: ['plan exam revision schedule free online', 'AI revision planner for students free', 'free exam revision timetable generator', 'spaced repetition study planner free', 'make revision plan for exams free no login', 'revision schedule creator for school free'],
    },
    'goal-planner': {
        slug: 'goal-planner',
        name: 'Goal Planner',
        title: 'Set and Plan Your Goals with AI Free | ToolNova',
        description: 'Enter your goal and AI breaks it down into actionable steps with a timeline. Based on SMART goal principles. Free goal planner, no account or signup required.',
        keywords: ['set and plan goals with AI free', 'SMART goal planner free online', 'break down goals into action steps free', 'free goal setting tool no login', 'AI productivity planner for goals free', 'personal goal action plan generator free'],
    },
    'todo-list-generator': {
        slug: 'todo-list-generator',
        name: 'Todo List Generator',
        title: 'Generate a To-Do List from Your Tasks Free – AI | ToolNova',
        description: 'Describe your project or day, and AI creates a prioritized, organized to-do list instantly. Better than a blank page. Free to-do list generator, no account needed.',
        keywords: ['generate to-do list from tasks free AI', 'AI task list organizer free online', 'create prioritized todo list free', 'free productivity task planner no login', 'to-do list generator for students free', 'organize daily tasks with AI free'],
    },
    'youtube-summarizer': {
        slug: 'youtube-summarizer',
        name: 'YouTube Summarizer',
        title: 'Summarize Any YouTube Video Free – No Signup | ToolNova',
        description: 'Paste a YouTube video URL and get a full summary with key points and timestamps. Save hours of watching time. Free YouTube video summarizer, no account required.',
        keywords: ['summarize YouTube video free no signup', 'get summary of YouTube video free', 'YouTube video key points extractor free', 'free YouTube summarizer no login', 'summarize long YouTube video instantly', 'AI YouTube video summary tool free'],
    },
    'linkedin-optimizer': {
        slug: 'linkedin-optimizer',
        name: 'LinkedIn Optimizer',
        title: 'Optimize LinkedIn Profile for More Recruiter Views Free | ToolNova',
        description: 'Get AI suggestions to improve your LinkedIn headline, summary, and experience sections. Attract more recruiters and connection requests. Free LinkedIn optimizer, no signup.',
        keywords: ['optimize LinkedIn profile for recruiters free', 'improve LinkedIn headline and summary free AI', 'LinkedIn profile checker free no login', 'get more LinkedIn views with AI free', 'free LinkedIn profile optimizer for job seekers', 'LinkedIn summary writer AI free'],
    },
    'resize-image': {
        slug: 'resize-image',
        name: 'Resize Image',
        title: 'Resize Image by Pixels or Percentage Free | ToolNova',
        description: 'Resize any image to exact dimensions in pixels or by percentage. Maintain aspect ratio automatically. Free image resizer for web, social media, and print. No signup.',
        keywords: ['resize image by pixels free online', 'change image dimensions free no watermark', 'resize photo to exact size free', 'free image resizer for social media no signup', 'resize image without losing quality free', 'bulk image resizer online free'],
    },
    'plagiarism-checker': {
        slug: 'plagiarism-checker',
        name: 'AI Writing Detector',
        title: 'AI Writing Detector – Spot AI Patterns Free | ToolNova',
        description: 'Estimate AI-like writing patterns in essays and get humanization tips. Not a legal plagiarism database scan — use as a writing coach. Free daily AI use, no login required to start.',
        keywords: ['AI writing detector free online', 'detect AI writing patterns free', 'AI content detector for students', 'humanize AI text free', 'check AI footprint in essay free', 'originality writing coach free'],
    },
    'compress-pdf': {
        slug: 'compress-pdf',
        name: 'Compress PDF',
        title: 'Compress PDF to 1MB Free Online – No Signup | ToolNova',
        description: 'Compress PDF files free in your browser. Shrink PDFs to under 1MB for email and portal uploads—no watermark, no signup, files never leave your device.',
        keywords: ['compress PDF to 1mb free online', 'reduce PDF file size free no watermark', 'shrink PDF for email attachment free', 'free online PDF compressor no signup', 'compress scanned PDF in browser', 'make PDF smaller for job application'],
    },
    'image-crop': {
        slug: 'image-crop',
        name: 'Crop Image',
        title: 'Crop Image Online Free – Aspect Ratios 1:1, 16:9 | ToolNova',
        description: 'Crop any image online free. Select the region with drag handles, lock aspect ratios like 1:1 and 16:9, download PNG/JPG/WebP. Private browser tool—no signup.',
        keywords: ['crop image online free', 'crop photo to 1:1 16:9 free', 'free image cropper no signup', 'crop jpg png webp free online', 'crop picture for instagram free', 'browser crop tool no upload'],
    },
    'reorder-pdf': {
        slug: 'reorder-pdf',
        name: 'Reorder PDF Pages',
        title: 'Reorder PDF Pages Free – Drag Thumbnails Online | ToolNova',
        description: 'Reorder PDF pages free with visual thumbnails. Drag and drop pages, reverse the order, then download instantly. Private browser tool—no upload, no signup.',
        keywords: ['reorder pdf pages free online', 'rearrange pdf page order no signup', 'drag and drop pdf pages free', 'reverse pdf page order online', 'change pdf page sequence free', 'free pdf page sorter in browser'],
    },
};

/**
 * Get optimized metadata for a tool
 */
export function getOptimizedToolMetadata(toolSlug: string): ToolMetadata | null {
    return optimizedToolMetadata[toolSlug] || null;
}

/**
 * Generate all tool slugs — derived from the canonical tools catalog so the
 * metadata store can never silently drift out of sync with the tool pages.
 */
export function getAllToolSlugs(): string[] {
    return Object.keys(optimizedToolMetadata);
}