/**
 * Tool FAQ Data for AEO (Answer Engine Optimization)
 * Provides FAQ schemas for each tool to improve visibility in AI search results
 */

import { FAQItem } from "./seo-advanced";

// FAQ data for each tool category and individual tools
export const toolFAQData: Record<string, FAQItem[]> = {
  // Writing Tools
  "text-summarizer": [
    {
      question: "What is an AI text summarizer?",
      answer: "An AI text summarizer is a tool that uses artificial intelligence to automatically condense long texts into shorter summaries while preserving the key information and main points. ToolNova's text summarizer can summarize articles, essays, and documents in seconds.",
    },
    {
      question: "How do I use the text summarizer for free?",
      answer: "Simply paste your text into ToolNova's text summarizer, click generate, and get your summary instantly. No sign-up or payment required - it's completely free to use.",
    },
    {
      question: "Can I summarize long articles with this tool?",
      answer: "Yes, ToolNova's text summarizer can handle long articles, essays, research papers, and documents. The AI extracts the most important points and creates a concise summary.",
    },
    {
      question: "Is the text summarizer accurate?",
      answer: "ToolNova's AI text summarizer uses advanced language models to ensure high accuracy. It preserves key information, main arguments, and essential details from the original text.",
    },
  ],
  paraphraser: [
    {
      question: "What is an AI paraphraser?",
      answer: "An AI paraphraser is a tool that rewrites text using artificial intelligence while preserving the original meaning. It helps avoid plagiarism, improve writing style, and rephrase content for different audiences.",
    },
    {
      question: "How do I paraphrase text online for free?",
      answer: "Paste your text into ToolNova's paraphraser, click generate, and get your rewritten content instantly. No registration or payment required.",
    },
    {
      question: "Is the paraphraser plagiarism-free?",
      answer: "Yes, ToolNova's paraphraser generates unique content that passes plagiarism checks. The AI rewrites text in new words while maintaining the original meaning.",
    },
    {
      question: "Can I use the paraphraser for academic writing?",
      answer: "Yes, ToolNova's paraphraser is suitable for academic writing, essays, research papers, and assignments. It helps improve clarity and avoid unintentional plagiarism.",
    },
  ],
  "grammar-fix": [
    {
      question: "What is a grammar checker?",
      answer: "A grammar checker is a tool that identifies and corrects grammar, spelling, and punctuation errors in your writing. ToolNova's grammar checker uses AI to provide smart suggestions for better writing.",
    },
    {
      question: "How do I check my grammar for free?",
      answer: "Paste your text into ToolNova's grammar checker and click generate. The AI will identify errors and provide corrections instantly. No sign-up required.",
    },
    {
      question: "Does the grammar checker fix punctuation too?",
      answer: "Yes, ToolNova's grammar checker corrects grammar, spelling, punctuation, and sentence structure. It provides comprehensive writing improvement suggestions.",
    },
    {
      question: "Is this grammar checker accurate?",
      answer: "ToolNova's grammar checker uses advanced AI to achieve high accuracy. It catches common errors, complex grammar issues, and provides context-aware suggestions.",
    },
  ],
  "essay-writer": [
    {
      question: "What is an AI essay writer?",
      answer: "An AI essay writer is a tool that uses artificial intelligence to generate well-structured essays on any topic. It creates introductions, body paragraphs, and conclusions automatically.",
    },
    {
      question: "How do I write an essay using AI for free?",
      answer: "Enter your essay topic into ToolNova's essay writer, specify any requirements, and click generate. You'll receive a complete essay instantly. No payment required.",
    },
    {
      question: "Can AI write essays for school assignments?",
      answer: "ToolNova's essay writer can help generate ideas, outlines, and drafts for school assignments. Use it as a starting point and customize the content for your specific needs.",
    },
    {
      question: "How long should an AI-generated essay be?",
      answer: "You can specify the length when using ToolNova's essay writer. The AI can generate essays of various lengths, from short paragraphs to comprehensive papers.",
    },
  ],
  "homework-solver": [
    {
      question: "What is an AI homework solver?",
      answer: "An AI homework solver is a tool that helps students solve homework problems with step-by-step explanations. It covers math, science, and other subjects.",
    },
    {
      question: "How do I use the homework solver for free?",
      answer: "Enter your homework question into ToolNova's homework solver and click generate. You'll receive a detailed solution with explanations. No sign-up required.",
    },
    {
      question: "Can the homework solver help me learn?",
      answer: "Yes, ToolNova's homework solver provides step-by-step explanations so you understand the method, not just the answer. It's designed to help you learn.",
    },
    {
      question: "What subjects does the homework solver cover?",
      answer: "ToolNova's homework solver covers math, science, physics, chemistry, biology, history, and many other subjects. Enter your question and get help instantly.",
    },
  ],
  "flashcard-maker": [
    {
      question: "What is a flashcard maker?",
      answer: "A flashcard maker is a tool that creates digital flashcards from your notes or topics. It generates question-answer pairs automatically for effective studying.",
    },
    {
      question: "How do I make flashcards online for free?",
      answer: "Enter your topic or notes into ToolNova's flashcard maker and click generate. You'll receive ready-to-use flashcards instantly. No sign-up or payment required.",
    },
    {
      question: "Are AI-generated flashcards effective for studying?",
      answer: "Yes, ToolNova's flashcards are designed for effective learning. They follow proven study techniques and can be customized to your learning style.",
    },
    {
      question: "Can I print the flashcards?",
      answer: "Yes, you can copy the flashcards to any document or use the download feature to save them. Print them out for offline studying.",
    },
  ],
  "quiz-generator": [
    {
      question: "What is a quiz generator?",
      answer: "A quiz generator is a tool that creates custom quizzes from any topic using AI. It generates questions and answers automatically for tests and practice.",
    },
    {
      question: "How do I create a quiz online for free?",
      answer: "Enter your topic into ToolNova's quiz generator, specify the number of questions, and click generate. You'll receive a complete quiz instantly. Free to use.",
    },
    {
      question: "Can I use the quiz generator for exams?",
      answer: "Yes, ToolNova's quiz generator is perfect for exam preparation, practice tests, and self-assessment. Generate quizzes on any subject to test your knowledge.",
    },
    {
      question: "What types of questions does the quiz generator create?",
      answer: "ToolNova's quiz generator creates multiple choice, true/false, short answer, and fill-in-the-blank questions. You can specify the question format you prefer.",
    },
  ],
  "mcq-generator": [
    {
      question: "What is an MCQ generator?",
      answer: "An MCQ generator is a tool that creates multiple choice questions from any topic or text using AI. It generates questions with answer options automatically.",
    },
    {
      question: "How do I create MCQ questions online for free?",
      answer: "Enter your topic or text into ToolNova's MCQ generator and click generate. You'll receive multiple choice questions with correct answers. No sign-up required.",
    },
    {
      question: "Can I use MCQs for competitive exams?",
      answer: "Yes, ToolNova's MCQ generator is ideal for competitive exam preparation. Create practice questions for SAT, GRE, GMAT, and other standardized tests.",
    },
    {
      question: "How many MCQs can I generate at once?",
      answer: "Specify how many questions you want when generating. Free daily AI use is included; free accounts get more daily uses, and Pro unlocks unlimited generation.",
    },
  ],
  "notes-generator": [
    {
      question: "What is an AI notes generator?",
      answer: "An AI notes generator creates organized study notes from any topic or text. It extracts key points, definitions, and important information automatically.",
    },
    {
      question: "How do I generate study notes for free?",
      answer: "Enter your topic or paste your text into ToolNova's notes generator and click generate. You'll receive comprehensive study notes instantly. Free to use.",
    },
    {
      question: "Are the generated notes comprehensive?",
      answer: "Yes, ToolNova's notes generator creates detailed notes covering all important aspects of your topic. It organizes information for easy studying.",
    },
    {
      question: "Can I edit the generated notes?",
      answer: "Yes, you can copy the notes and edit them to add your own insights, examples, or additional information. The notes serve as a starting point.",
    },
  ],
  "merge-pdf": [
    {
      question: "What is a PDF merger?",
      answer: "A PDF merger is a tool that combines multiple PDF files into a single document. It's useful for consolidating reports, presentations, and documents.",
    },
    {
      question: "How do I merge PDF files for free?",
      answer: "Upload your PDF files to ToolNova's merge PDF tool, arrange them in order, and click merge. Your combined PDF will be ready instantly. No sign-up required.",
    },
    {
      question: "Is there a limit on PDF files I can merge?",
      answer: "ToolNova's PDF merger allows you to merge multiple PDF files without strict limits. Combine as many documents as you need for free.",
    },
    {
      question: "Will the merged PDF have watermarks?",
      answer: "No, ToolNova's PDF merger creates clean PDFs without watermarks. Your merged document will look professional and ready to use.",
    },
  ],
  "split-pdf": [
    {
      question: "What is a PDF splitter?",
      answer: "A PDF splitter divides a PDF file into multiple smaller files. It can extract specific pages or split documents into equal parts.",
    },
    {
      question: "How do I split a PDF for free?",
      answer: "Upload your PDF to ToolNova's split PDF tool, select the pages or split method, and click split. Your separated PDFs will be ready instantly. Free to use.",
    },
    {
      question: "Can I extract specific pages from a PDF?",
      answer: "Yes, ToolNova's PDF splitter lets you select specific pages to extract. Choose individual pages or page ranges to create new PDFs.",
    },
    {
      question: "Is the split PDF quality preserved?",
      answer: "Yes, ToolNova's PDF splitter maintains the original quality of your documents. No quality loss occurs during the splitting process.",
    },
  ],
  "image-compressor": [
    {
      question: "What is an image compressor?",
      answer: "An image compressor reduces the file size of images while maintaining visual quality. It helps optimize images for web use and storage.",
    },
    {
      question: "How do I compress images for free?",
      answer: "Upload your images to ToolNova's image compressor and click compress. Your optimized images will be ready instantly. No sign-up required.",
    },
    {
      question: "Will compressing images reduce quality?",
      answer: "ToolNova's image compressor uses smart compression that minimally affects visual quality while significantly reducing file size. Your images remain clear.",
    },
    {
      question: "What image formats are supported?",
      answer: "ToolNova's image compressor supports JPG, JPEG, PNG, WebP, and other common image formats. Compress any image type for free.",
    },
  ],
  "word-counter": [
    {
      question: "What is a word counter?",
      answer: "A word counter is a tool that counts the number of words, characters, sentences, and paragraphs in your text. It's essential for writers and students.",
    },
    {
      question: "How do I count words in my text for free?",
      answer: "Paste your text into ToolNova's word counter and see instant results. Get word count, character count, sentence count, and reading time. Free to use.",
    },
    {
      question: "Does the word counter show reading time?",
      answer: "Yes, ToolNova's word counter calculates estimated reading time based on average reading speed. This helps you gauge content length.",
    },
    {
      question: "Is the word counter accurate?",
      answer: "Yes, ToolNova's word counter provides accurate counts for words, characters, sentences, and paragraphs. It handles all text formats correctly.",
    },
  ],
  "cover-letter-writer": [
    {
      question: "What is an AI cover letter writer?",
      answer: "An AI cover letter writer generates professional cover letters using artificial intelligence. It creates customized letters for job applications.",
    },
    {
      question: "How do I write a cover letter for free?",
      answer: "Enter the job details and your background into ToolNova's cover letter writer and click generate. You'll receive a professional cover letter instantly. Free to use.",
    },
    {
      question: "Can I customize the generated cover letter?",
      answer: "Yes, you can edit the generated cover letter to add personal touches, specific experiences, or customize it for different applications.",
    },
    {
      question: "Is the cover letter professional?",
      answer: "Yes, ToolNova's cover letter writer creates professional, well-formatted letters following business writing standards. Perfect for job applications.",
    },
  ],
  "resume-bullets": [
    {
      question: "What is a resume bullet points generator?",
      answer: "A resume bullet points generator creates professional bullet points for your resume. It highlights achievements and responsibilities effectively.",
    },
    {
      question: "How do I write resume bullet points for free?",
      answer: "Enter your job title and responsibilities into ToolNova's resume bullets tool and click generate. You'll receive professional bullet points instantly. Free to use.",
    },
    {
      question: "What makes good resume bullet points?",
      answer: "Good resume bullet points are action-oriented, quantify achievements, and highlight impact. ToolNova's generator follows these best practices.",
    },
    {
      question: "Can I use these bullet points for LinkedIn?",
      answer: "Yes, the bullet points generated by ToolNova work well for resumes, LinkedIn profiles, and professional bios. They're versatile and professional.",
    },
  ],
  "email-writer": [
    {
      question: "What is an AI email writer?",
      answer: "An AI email writer generates professional emails using artificial intelligence. It creates business emails, replies, and messages for any situation.",
    },
    {
      question: "How do I write a professional email for free?",
      answer: "Describe your email purpose into ToolNova's email writer and click generate. You'll receive a professional email instantly. No sign-up required.",
    },
    {
      question: "Can I write formal business emails?",
      answer: "Yes, ToolNova's email writer creates formal business emails, professional replies, and corporate communications. Specify the tone you need.",
    },
    {
      question: "Does the email writer handle different tones?",
      answer: "Yes, ToolNova's email writer can generate emails in various tones - formal, casual, persuasive, or friendly. Specify your preferred style.",
    },
  ],
  "concept-explainer": [
    {
      question: "What is a concept explainer?",
      answer: "A concept explainer breaks down complex topics into simple, understandable explanations. It helps you learn difficult concepts quickly.",
    },
    {
      question: "How do I understand complex concepts for free?",
      answer: "Enter any topic or concept into ToolNova's concept explainer and click generate. You'll receive a clear, simple explanation instantly. Free to use.",
    },
    {
      question: "Can the concept explainer help with studying?",
      answer: "Yes, ToolNova's concept explainer is perfect for studying. It provides clear explanations of academic concepts, scientific theories, and complex topics.",
    },
    {
      question: "What subjects can the concept explainer cover?",
      answer: "ToolNova's concept explainer covers all subjects - science, math, history, economics, philosophy, technology, and more. Enter any topic for an explanation.",
    },
  ],
  "doubt-solver": [
    {
      question: "What is a doubt solver?",
      answer: "A doubt solver answers your questions and clears confusion on any topic. It provides instant answers with explanations.",
    },
    {
      question: "How do I get answers to my questions for free?",
      answer: "Enter your question into ToolNova's doubt solver and click generate. You'll receive a detailed answer with explanation instantly. No sign-up required.",
    },
    {
      question: "Is the doubt solver accurate?",
      answer: "Yes, ToolNova's doubt solver uses advanced AI to provide accurate answers. It explains the reasoning behind each answer for better understanding.",
    },
    {
      question: "Can I ask any type of question?",
      answer: "Yes, ToolNova's doubt solver handles academic questions, general knowledge, technical queries, and more. Ask anything and get instant help.",
    },
  ],
  "timetable-generator": [
    {
      question: "What is a timetable generator?",
      answer: "A timetable generator creates personalized study schedules and timetables. It helps you organize your time effectively for exams and classes.",
    },
    {
      question: "How do I create a study timetable for free?",
      answer: "Enter your subjects, available time, and goals into ToolNova's timetable generator. You'll receive a personalized schedule instantly. Free to use.",
    },
    {
      question: "Can I customize the timetable?",
      answer: "Yes, you can specify subjects, study hours, breaks, and priorities. ToolNova's timetable generator creates a schedule tailored to your needs.",
    },
    {
      question: "Is the timetable suitable for exam preparation?",
      answer: "Yes, ToolNova's timetable generator is perfect for exam preparation. It creates balanced schedules covering all subjects with adequate revision time.",
    },
  ],
  "goal-planner": [
    {
      question: "What is a goal planner?",
      answer: "A goal planner helps you set, plan, and track your goals. It breaks down objectives into actionable steps and creates achievement roadmaps.",
    },
    {
      question: "How do I plan my goals for free?",
      answer: "Enter your goal into ToolNova's goal planner and click generate. You'll receive a structured plan with actionable steps. No sign-up required.",
    },
    {
      question: "Does the goal planner use SMART goals?",
      answer: "Yes, ToolNova's goal planner follows SMART goal methodology - Specific, Measurable, Achievable, Relevant, and Time-bound objectives.",
    },
    {
      question: "Can I track multiple goals?",
      answer: "Yes, use ToolNova's goal planner for multiple goals - career, fitness, education, personal development. Create separate plans for each objective.",
    },
  ],
};

// Default FAQ for tools without specific FAQs
export const defaultToolFAQ: FAQItem[] = [
  {
    question: "Is this tool free to use?",
    answer: "Yes, ToolNova provides this tool completely free. No sign-up, registration, or payment required. Simply use it whenever you need.",
  },
  {
    question: "How do I use this tool?",
    answer: "Enter your input into the tool, adjust any available options, and click generate. You'll receive instant results powered by AI.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, ToolNova processes your input securely. We don't store your personal data permanently. Your privacy is protected.",
  },
  {
    question: "Can I use this on mobile?",
    answer: "Yes, ToolNova's tools work on all devices - desktop, tablet, and mobile. Access them anywhere, anytime.",
  },
];

/**
 * Get FAQ data for a specific tool
 */
export function getToolFAQ(toolSlug: string): FAQItem[] {
  return toolFAQData[toolSlug] || defaultToolFAQ;
}

/**
 * Get all FAQ data
 */
export function getAllToolFAQs(): Record<string, FAQItem[]> {
  return toolFAQData;
}

/**
 * Get FAQ questions for a tool (for display purposes)
 */
export function getToolFAQQuestions(toolSlug: string): string[] {
  const faq = getToolFAQ(toolSlug);
  return faq.map((item) => item.question);
}

export default toolFAQData;
