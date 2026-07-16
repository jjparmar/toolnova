/**
 * World-Class SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization)
 * Optimized for ranking on all AI search engines (ChatGPT, Perplexity, Gemini, Claude) and traditional search globally
 */

import { siteConfig } from"@/config/site";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ============================================
// TOOL-SPECIFIC FAQ DATA (AEO - Featured Snippets)
// ============================================

export const TOOL_FAQS: Record<string, ToolFAQ[]> = {
  // ============================================
  // WRITING TOOLS
  // ============================================
  "text-summarizer": [
    {
      question:"How to summarize text online for free?",
      answer:"Use ToolNova's free text summarizer. Paste your text, click summarize, and get an instant AI-powered summary in seconds. No sign-up required.",
    },
    {
      question:"What is the best free text summarizer?",
      answer:"ToolNova offers the best free text summarizer with AI-powered extraction. It works on articles, documents, and web content without any cost.",
    },
    {
      question:"Can I summarize long articles?",
      answer:"Yes, ToolNova's text summarizer can handle articles up to 10,000 words. Simply paste your content and get a concise summary instantly.",
    },
    {
      question:"Does the summarizer work for academic papers?",
      answer:"Yes, ToolNova's text summarizer is perfect for academic papers, research articles, and essays. It extracts key points while maintaining context.",
    },
  ],"paraphraser": [
    {
      question:"How to paraphrase text without plagiarism?",
      answer:"Use ToolNova's free paraphraser. Paste your text and get unique, plagiarism-free content in seconds. Perfect for academic and professional use.",
    },
    {
      question:"Is ToolNova paraphraser free?",
      answer:"Yes, ToolNova offers a free paraphrasing tool with no sign-up required to start. Use the free daily allowance, or create a free account for more uses.",
    },
    {
      question:"What is the best free paraphrasing tool?",
      answer:"ToolNova provides the best free paraphrasing tool with AI-powered rewriting that preserves meaning while creating unique content.",
    },
  ],"grammar-fix": [
    {
      question:"How to fix grammar mistakes online?",
      answer:"Use ToolNova's grammar checker. Paste your text and get instant corrections for grammar, spelling, and punctuation errors.",
    },
    {
      question:"Best free grammar checker?",
      answer:"ToolNova provides the best free grammar checker with advanced AI that detects and fixes all types of grammar errors.",
    },
    {
      question:"How to check grammar for free?",
      answer:"Use ToolNova's free grammar checker. Paste your text and get instant corrections with explanations. No sign-up required.",
    },
  ],"essay-writer": [
    {
      question:"How to write an essay with AI?",
      answer:"Use ToolNova's essay writer. Enter your topic, specify requirements, and get a well-structured essay in minutes. Free and no sign-up.",
    },
    {
      question:"Can AI write essays for free?",
      answer:"Yes, ToolNova's essay writer is free. Enter your topic and get a custom essay instantly. Perfect for students and professionals.",
    },
    {
      question:"What is the best free essay generator?",
      answer:"ToolNova offers the best free essay generator with AI-powered writing that creates well-structured, coherent essays on any topic.",
    },
  ],"email-writer": [
    {
      question:"How to write professional emails?",
      answer:"Use ToolNova's email writer. Describe your purpose and get a professional email draft. Free, fast, and no sign-up required.",
    },
    {
      question:"Best free email writer tool?",
      answer:"ToolNova provides the best free email writer that generates professional, well-formatted emails for any purpose instantly.",
    },
  ],"speech-writer": [
    {
      question:"How to write a speech?",
      answer:"Use ToolNova's speech writer. Enter your topic, occasion, and tone to get a professionally written speech in minutes. Free to use.",
    },
    {
      question:"Best free speech generator?",
      answer:"ToolNova offers the best free speech generator that creates compelling, well-structured speeches for any occasion.",
    },
  ],"caption-generator": [
    {
      question:"How to generate social media captions?",
      answer:"Use ToolNova's caption generator. Describe your content and get engaging captions for Instagram, TikTok, Facebook, and more. Free.",
    },
    {
      question:"Best free caption generator?",
      answer:"ToolNova provides the best free caption generator with AI-powered creativity for all social media platforms.",
    },
  ],"story-generator": [
    {
      question:"How to generate stories with AI?",
      answer:"Use ToolNova's story generator. Enter your prompt or theme and get creative, engaging stories instantly. Free and no sign-up.",
    },
    {
      question:"Best free story generator?",
      answer:"ToolNova offers the best free story generator that creates unique, creative stories with compelling characters and plots.",
    },
  ],"paragraph-generator": [
    {
      question:"How to generate paragraphs for essays?",
      answer:"Use ToolNova's paragraph generator. Enter your topic and get well-structured, coherent paragraphs instantly. Free to use.",
    },
    {
      question:"Best free paragraph writer?",
      answer:"ToolNova provides the best free paragraph generator that creates clear, focused paragraphs for any writing purpose.",
    },
  ],"text-simplifier": [
    {
      question:"How to simplify complex text?",
      answer:"Use ToolNova's text simplifier. Paste complex content and get an easier-to-read version instantly. Free and no sign-up required.",
    },
    {
      question:"Best free text simplifier?",
      answer:"ToolNova offers the best free text simplifier that makes complex content accessible while preserving meaning.",
    },
  ],
  // ============================================
  // STUDY TOOLS
  // ============================================
  "homework-solver": [
    {
      question:"How to solve homework problems?",
      answer:"Use ToolNova's homework solver. Enter your question and get step-by-step solutions for math, science, and other subjects.",
    },
    {
      question:"Is homework help free?",
      answer:"Yes, ToolNova offers free homework help with step-by-step solutions. No sign-up required for instant answers.",
    },
    {
      question:"Best free homework solver?",
      answer:"ToolNova provides the best free homework solver with detailed explanations for math, science, and more.",
    },
  ],"notes-generator": [
    {
      question:"How to generate study notes?",
      answer:"Use ToolNova's notes generator. Enter your topic or content and get comprehensive, organized study notes instantly. Free.",
    },
    {
      question:"Best free notes generator?",
      answer:"ToolNova offers the best free notes generator that creates structured, easy-to-review notes from any content.",
    },
  ],"flashcard-maker": [
    {
      question:"How to make flashcards online?",
      answer:"Use ToolNova's flashcard maker. Enter your study material and generate flashcards instantly. Perfect for exam preparation.",
    },
    {
      question:"Best free flashcard maker?",
      answer:"ToolNova provides the best free flashcard maker that auto-generates study cards from your notes and textbooks.",
    },
  ],"quiz-generator": [
    {
      question:"How to generate quizzes from text?",
      answer:"Use ToolNova's quiz generator. Paste your study material and get multiple-choice questions instantly. Free and easy to use.",
    },
    {
      question:"Best free quiz maker?",
      answer:"ToolNova offers the best free quiz generator that creates custom quizzes with answers from any content.",
    },
  ],"mcq-generator": [
    {
      question:"How to create MCQ questions?",
      answer:"Use ToolNova's MCQ generator. Enter your content and get multiple choice questions with answers instantly. Free to use.",
    },
    {
      question:"Best free MCQ generator?",
      answer:"ToolNova provides the best free MCQ generator for teachers and students to create tests quickly.",
    },
  ],"concept-explainer": [
    {
      question:"How to explain complex concepts simply?",
      answer:"Use ToolNova's concept explainer. Enter any topic and get a clear, simple explanation. Perfect for learning and teaching.",
    },
    {
      question:"Best free concept explainer?",
      answer:"ToolNova offers the best free concept explainer that breaks down complex topics into easy-to-understand explanations.",
    },
  ],"chapter-summary": [
    {
      question:"How to summarize textbook chapters?",
      answer:"Use ToolNova's chapter summary tool. Paste chapter content and get key points, themes, and summaries instantly. Free.",
    },
    {
      question:"Best free chapter summarizer?",
      answer:"ToolNova provides the best free chapter summary generator for students to quickly grasp textbook content.",
    },
  ],"doubt-solver": [
    {
      question:"How to clear academic doubts online?",
      answer:"Use ToolNova's doubt solver. Enter your question and get clear, detailed explanations. Free for all subjects.",
    },
    {
      question:"Best free doubt solver?",
      answer:"ToolNova offers the best free doubt solver that provides step-by-step explanations for academic questions.",
    },
  ],"diagram-explainer": [
    {
      question:"How to explain diagrams?",
      answer:"Use ToolNova's diagram explainer. Describe or upload your diagram and get detailed explanations. Free to use.",
    },
    {
      question:"Best free diagram explainer?",
      answer:"ToolNova provides the best free diagram explainer for science, math, and technical diagrams.",
    },
  ],"formula-generator": [
    {
      question:"How to generate math formulas?",
      answer:"Use ToolNova's formula generator. Enter your problem type and get relevant formulas with explanations. Free.",
    },
    {
      question:"Best free formula generator?",
      answer:"ToolNova offers the best free formula generator for math, physics, and chemistry formulas.",
    },
  ],"timetable-generator": [
    {
      question:"How to create a study timetable?",
      answer:"Use ToolNova's timetable generator. Enter your subjects and available time to get a personalized study schedule. Free.",
    },
    {
      question:"Best free timetable maker?",
      answer:"ToolNova provides the best free timetable generator for students to organize their study time effectively.",
    },
  ],"revision-planner": [
    {
      question:"How to plan revision for exams?",
      answer:"Use ToolNova's revision planner. Enter your exam dates and subjects to get a structured revision schedule. Free.",
    },
    {
      question:"Best free revision planner?",
      answer:"ToolNova offers the best free revision planner that creates effective study schedules before exams.",
    },
  ],"goal-planner": [
    {
      question:"How to set academic goals?",
      answer:"Use ToolNova's goal planner. Define your objectives and get a structured plan to achieve them. Free to use.",
    },
    {
      question:"Best free goal planner?",
      answer:"ToolNova provides the best free goal planner for students to set and track academic objectives.",
    },
  ],"todo-list-generator": [
    {
      question:"How to create a todo list for studying?",
      answer:"Use ToolNova's todo list generator. Enter your tasks and get an organized, prioritized list. Free and instant.",
    },
    {
      question:"Best free todo list generator?",
      answer:"ToolNova offers the best free todo list generator that organizes tasks for maximum productivity.",
    },
  ],
  // ============================================
  // LANGUAGE TOOLS
  // ============================================
  "vocabulary-builder": [
    {
      question:"How to build vocabulary for free?",
      answer:"Use ToolNova's vocabulary builder. Get new words daily with meanings, examples, and usage tips. Free to use.",
    },
    {
      question:"Best free vocabulary builder?",
      answer:"ToolNova provides the best free vocabulary builder for students and professionals to expand word knowledge.",
    },
  ],"synonym-finder": [
    {
      question:"How to find synonyms for words?",
      answer:"Use ToolNova's synonym finder. Enter any word and get a list of synonyms with usage examples. Free.",
    },
    {
      question:"Best free synonym finder?",
      answer:"ToolNova offers the best free synonym finder with context-aware suggestions for better writing.",
    },
  ],"antonym-finder": [
    {
      question:"How to find antonyms for words?",
      answer:"Use ToolNova's antonym finder. Enter any word and get opposite words with examples. Free to use.",
    },
    {
      question:"Best free antonym finder?",
      answer:"ToolNova provides the best free antonym finder for writers and students.",
    },
  ],"idioms-phrases": [
    {
      question:"How to learn idioms and phrases?",
      answer:"Use ToolNova's idioms and phrases tool. Browse common idioms with meanings and examples. Free.",
    },
    {
      question:"Best free idioms resource?",
      answer:"ToolNova offers the best free idioms and phrases collection for English learners.",
    },
  ],"one-word-substitution": [
    {
      question:"How to find one-word substitutions?",
      answer:"Use ToolNova's one-word substitution tool. Enter a phrase and get the single word equivalent. Free.",
    },
    {
      question:"Best free one-word substitution tool?",
      answer:"ToolNova provides the best free one-word substitution finder for competitive exams and writing.",
    },
  ],
  // ============================================
  // CAREER TOOLS
  // ============================================
  "resume-bullets": [
    {
      question:"How to write resume bullet points?",
      answer:"Use ToolNova's resume bullet generator. Enter your job experience and get professional bullet points instantly.",
    },
    {
      question:"Best free resume bullet generator?",
      answer:"ToolNova offers the best free resume bullet generator that creates impactful, achievement-focused points.",
    },
  ],"cover-letter-writer": [
    {
      question:"How to write a cover letter?",
      answer:"Use ToolNova's cover letter writer. Enter job details and get a professional cover letter in minutes. Free and customizable.",
    },
    {
      question:"Best free cover letter generator?",
      answer:"ToolNova provides the best free cover letter writer that creates personalized, professional letters.",
    },
  ],"interview-generator": [
    {
      question:"How to prepare for interviews?",
      answer:"Use ToolNova's interview generator. Enter job role and get common questions with suggested answers. Free.",
    },
    {
      question:"Best free interview question generator?",
      answer:"ToolNova offers the best free interview generator with role-specific questions and expert answers.",
    },
  ],"bio-generator": [
    {
      question:"How to write a professional bio?",
      answer:"Use ToolNova's bio generator. Enter your details and get a polished bio for LinkedIn, websites, and more. Free.",
    },
    {
      question:"Best free bio generator?",
      answer:"ToolNova provides the best free bio generator for professional profiles and social media.",
    },
  ],"linkedin-optimizer": [
    {
      question:"How to optimize LinkedIn profile?",
      answer:"Use ToolNova's LinkedIn optimizer. Get suggestions to improve your headline, summary, and experience. Free.",
    },
    {
      question:"Best free LinkedIn optimizer?",
      answer:"ToolNova offers the best free LinkedIn optimizer to enhance your professional profile visibility.",
    },
  ],
  // ============================================
  // PDF & IMAGE TOOLS
  // ============================================
  "merge-pdf": [
    {
      question:"How to merge PDF files online?",
      answer:"Use ToolNova's free PDF merger. Upload multiple PDFs, arrange order, and merge into one file. No sign-up required.",
    },
    {
      question:"Best free PDF merger?",
      answer:"ToolNova offers the best free PDF merger with high-quality output. Merge unlimited PDFs securely in your browser.",
    },
  ],"split-pdf": [
    {
      question:"How to split PDF pages?",
      answer:"Use ToolNova's free PDF splitter. Upload your PDF, select pages to extract, and download instantly. 100% free.",
    },
    {
      question:"Best free PDF splitter?",
      answer:"ToolNova provides the best free PDF splitter to extract specific pages from any PDF document.",
    },
  ],"image-to-pdf": [
    {
      question:"How to convert images to PDF?",
      answer:"Use ToolNova's image to PDF converter. Upload JPG or PNG images and convert to PDF instantly. Free and no sign-up.",
    },
    {
      question:"Best free image to PDF converter?",
      answer:"ToolNova offers the best free image to PDF converter with high-quality output and no file limits.",
    },
  ],"image-compressor": [
    {
      question:"How to compress images without losing quality?",
      answer:"Use ToolNova's free image compressor. Upload your image and reduce file size while maintaining quality. Supports JPG, PNG, WebP.",
    },
    {
      question:"Best free image compressor?",
      answer:"ToolNova provides the best free image compressor that reduces file size while preserving visual quality.",
    },
  ],"jpg-to-png": [
    {
      question:"How to convert JPG to PNG?",
      answer:"Use ToolNova's free JPG to PNG converter. Upload your JPG image and get PNG format instantly. No sign-up required.",
    },
    {
      question:"Best free JPG to PNG converter?",
      answer:"ToolNova offers the best free JPG to PNG converter with fast, high-quality conversions.",
    },
  ],"png-to-jpg": [
    {
      question:"How to convert PNG to JPG?",
      answer:"Use ToolNova's free PNG to JPG converter. Upload your PNG image and get JPG format instantly. Free to use.",
    },
    {
      question:"Best free PNG to JPG converter?",
      answer:"ToolNova provides the best free PNG to JPG converter for quick format changes.",
    },
  ],
  // ============================================
  // UTILITY TOOLS
  // ============================================
  "word-counter": [
    {
      question:"How to count words in text?",
      answer:"Use ToolNova's free word counter. Paste your text and get instant word, character, and sentence counts. No sign-up.",
    },
    {
      question:"Best free word counter?",
      answer:"ToolNova offers the best free word counter with detailed statistics for writers and students.",
    },
  ],"character-counter": [
    {
      question:"How to count characters in text?",
      answer:"Use ToolNova's free character counter. Get character count with and without spaces instantly. Free to use.",
    },
    {
      question:"Best free character counter?",
      answer:"ToolNova provides the best free character counter for social media, essays, and more.",
    },
  ],"case-converter": [
    {
      question:"How to convert text case?",
      answer:"Use ToolNova's free case converter. Convert text to uppercase, lowercase, title case, and more instantly.",
    },
    {
      question:"Best free case converter?",
      answer:"ToolNova offers the best free case converter with multiple text transformation options.",
    },
  ],"age-calculator": [
    {
      question:"How to calculate age from date of birth?",
      answer:"Use ToolNova's free age calculator. Enter your birthdate and get exact age in years, months, and days. Free.",
    },
    {
      question:"Best free age calculator?",
      answer:"ToolNova provides the best free age calculator with precise age calculations.",
    },
  ],
};

// ============================================
// HOW-TO SCHEMAS FOR TOOLS
// ============================================

export const TOOL_HOWTOS: Record<string, { name: string; description: string; steps: HowToStep[] }> = {"text-summarizer": {
    name:"How to Summarize Text",
    description:"Learn how to use ToolNova's text summarizer to create concise summaries of any content.",
    steps: [
      { name:"Paste your text", text:"Copy and paste the text you want to summarize into the input box." },
      { name:"Choose summary length", text:"Select your preferred summary length - brief, medium, or detailed." },
      { name:"Click summarize", text:"Click the Summarize button to generate your AI-powered summary." },
      { name:"Copy or download", text:"Copy the summary or download it as a text file." },
    ],
  },"grammar-fix": {
    name:"How to Fix Grammar",
    description:"Learn how to use ToolNova's grammar checker to correct all grammar errors.",
    steps: [
      { name:"Paste your text", text:"Copy and paste the text you want to check into the input area." },
      { name:"Click check", text:"Click the Check Grammar button to analyze your text." },
      { name:"Review corrections", text:"Review all suggested corrections and explanations." },
      { name:"Apply changes", text:"Apply the corrections to fix your text instantly." },
    ],
  },"merge-pdf": {
    name:"How to Merge PDFs",
    description:"Learn how to combine multiple PDF files into one document.",
    steps: [
      { name:"Upload PDFs", text:"Click to upload or drag and drop multiple PDF files." },
      { name:"Arrange order", text:"Drag and drop to reorder the PDF pages in your preferred sequence." },
      { name:"Click merge", text:"Click the Merge button to combine all PDFs." },
      { name:"Download result", text:"Download your merged PDF file instantly." },
    ],
  },"flashcard-maker": {
    name:"How to Create Flashcards",
    description:"Learn how to generate study flashcards from any material.",
    steps: [
      { name:"Enter study material", text:"Paste your notes, textbook content, or study material into the input." },
      { name:"Set options", text:"Choose the number of flashcards you want to generate." },
      { name:"Generate cards", text:"Click Generate to create your flashcards." },
      { name:"Study and review", text:"Review your flashcards and use them for effective studying." },
    ],
  },
};

// ============================================
// BREADCRUMB DATA
// ============================================

export const CATEGORY_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  home: [
    { name:"Home", url: siteConfig.url },
  ],
  tools: [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
  ],"writing-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Writing Tools", url:`${siteConfig.url}/tools/writing-tools` },
  ],"study-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Study Tools", url:`${siteConfig.url}/tools/study-tools` },
  ],"exam-prep-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Exam Prep Tools", url:`${siteConfig.url}/tools/exam-prep-tools` },
  ],"image-pdf-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Image & PDF Tools", url:`${siteConfig.url}/tools/image-pdf-tools` },
  ],"career-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Career Tools", url:`${siteConfig.url}/tools/career-tools` },
  ],"utility-tools": [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name:"Utility Tools", url:`${siteConfig.url}/tools/utility-tools` },
  ],
};

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Generate FAQPage Schema for AEO (Featured Snippets)
 */
export function generateFAQPageSchema(faqs: ToolFAQ[]) {
  return {"@context":"https://schema.org","@type":"FAQPage",
    mainEntity: faqs.map((faq) => ({"@type":"Question",
      name: faq.question,
      acceptedAnswer: {"@type":"Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo Schema for step-by-step guides (AEO)
 */
export function generateHowToPageSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  toolSlug: string
) {
  return {"@context":"https://schema.org","@type":"HowTo",
    name,
    description,
    url:`${siteConfig.url}/tools/${toolSlug}`,
    totalTime:"PT5M",
    step: steps.map((step, index) => ({"@type":"HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
    tool: {"@type":"HowToTool",
      name:"ToolNova AI Tools",
    },
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {"@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement: items.map((item, index) => ({"@type":"ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate QAPage Schema for Q&A content (AEO)
 */
export function generateQAPageSchema(question: string, answer: string, url: string) {
  return {"@context":"https://schema.org","@type":"QAPage",
    mainEntity: {"@type":"Question",
      name: question,
      answerCount: 1,
      upvoteCount: 0,
      downvoteCount: 0,
      answer: {"@type":"Answer",
        text: answer,
        dateCreated: new Date().toISOString(),
        author: {"@type":"Organization",
          name:"ToolNova",
        },
      },
      dateCreated: new Date().toISOString(),
    },
  };
}

/**
 * Generate Course Schema for educational content
 */
export function generateCourseSchema(
  name: string,
  description: string,
  provider: string ="ToolNova"
) {
  return {"@context":"https://schema.org","@type":"Course",
    name,
    description,
    provider: {"@type":"Organization",
      name: provider,
      sameAs: siteConfig.url,
    },
    offers: {"@type":"Offer",
      price:"0",
      priceCurrency:"USD",
      availability:"https://schema.org/InStock",
    },
  };
}

/**
 * Generate WebApplication Schema (GEO - for AI search)
 */
export function generateWebApplicationSchema(toolName: string, toolDescription: string, toolSlug: string) {
  return {"@context":"https://schema.org","@type":"WebApplication",
    name: toolName,
    description: toolDescription,
    url:`${siteConfig.url}/tools/${toolSlug}`,
    applicationCategory:"EducationalApplication",
    operatingSystem:"Web Browser",
    browserRequirements:"Requires JavaScript. Requires HTML5.",
    offers: {"@type":"Offer",
      price:"0",
      priceCurrency:"USD",
      priceValidUntil:"2027-12-31",
      availability:"https://schema.org/InStock",
    },
    author: {"@type":"Organization",
      name:"ToolNova",
      url: siteConfig.url,
    },
  };
}

/**
 * Generate VideoObject Schema for tutorial content
 */
export function generateVideoSchema(
  title: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string
) {
  return {"@context":"https://schema.org","@type":"VideoObject",
    name: title,
    description,
    thumbnailUrl,
    uploadDate,
    duration:"PT5M",
    contentUrl:`${siteConfig.url}/videos/${title.toLowerCase().replace(/\s+/g,"-")}`,
    embedUrl:`${siteConfig.url}/embed/${title.toLowerCase().replace(/\s+/g,"-")}`,
    interactionStatistic: {"@type":"InteractionCounter",
      interactionType:"https://schema.org/WatchAction",
      userInteractionCount: 0,
    },
  };
}

/**
 * Generate Comprehensive Schema for Tool Pages (combines multiple schemas)
 */
export function generateToolPageSchema(
  toolName: string,
  toolDescription: string,
  toolSlug: string,
  category: string
) {
  const schemas: object[] = [];

  // WebApplication schema (primary for AI search)
  schemas.push(generateWebApplicationSchema(toolName, toolDescription, toolSlug));

  // Breadcrumb schema
  const breadcrumbs = [
    { name:"Home", url: siteConfig.url },
    { name:"AI Tools", url:`${siteConfig.url}/tools` },
    { name: category, url:`${siteConfig.url}/tools/${category.toLowerCase().replace(/\s+/g,"-")}` },
    { name: toolName, url:`${siteConfig.url}/tools/${toolSlug}` },
  ];
  schemas.push(generateBreadcrumbListSchema(breadcrumbs));

  // FAQ schema if available
  const faqs = TOOL_FAQS[toolSlug];
  if (faqs) {
    schemas.push(generateFAQPageSchema(faqs));
  }

  // HowTo schema if available
  const howTo = TOOL_HOWTOS[toolSlug];
  if (howTo) {
    schemas.push(generateHowToPageSchema(howTo.name, howTo.description, howTo.steps, toolSlug));
  }

  return {"@context":"https://schema.org","@graph": schemas,
  };
}

/**
 * Generate Organization Schema with enhanced entity signals for AI
 */
export function generateEnhancedOrganizationSchema() {
  return {"@context":"https://schema.org","@type":"Organization","@id":`${siteConfig.url}/#organization`,
    name:"ToolNovaHub",
    alternateName: ["ToolNova","ToolNova Hub","AI Tools Hub"],
    url: siteConfig.url,
    logo: {"@type":"ImageObject",
      url: siteConfig.logo,
      width: 512,
      height: 512,
      caption: siteConfig.logoAlt,
    },
    description: siteConfig.description,
    foundingDate:"2024",
    foundingLocation: {"@type":"Place",
      address: {"@type":"PostalAddress",
        addressLocality:"Singapore",
        addressCountry:"SG",
      },
    },
    areaServed: [
      {"@type":"Country", name:"United States" },
      {"@type":"Country", name:"United Kingdom" },
      {"@type":"Country", name:"Canada" },
      {"@type":"Country", name:"Australia" },
      {"@type":"Country", name:"India" },
      {"@type":"Country", name:"Singapore" },
      {"@type":"Country", name:"Germany" },
      {"@type":"Country", name:"France" },
      {"@type":"Country", name:"United Arab Emirates" },
      {"@type":"Country", name:"World" },
    ],
    serviceType: ["AI Tools","Educational Services","Productivity Tools"],
    contactPoint: {"@type":"ContactPoint",
      email: siteConfig.author.email,
      contactType:"customer service",
      availableLanguage: ["English"],
      areaServed:"World",
    },
    address: {"@type":"PostalAddress",
      streetAddress:"71 Ayer Rajah Crescent",
      addressLocality:"Singapore",
      postalCode:"139951",
      addressCountry:"SG",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    brand: {"@type":"Brand",
      name:"ToolNova",
      description:"Free AI-powered tools for students and professionals worldwide",
    },
    knowsAbout: ["Artificial Intelligence","Natural Language Processing","PDF Processing","Educational Technology","Productivity Software",
    ],
  };
}

/**
 * Generate WebSite Schema with enhanced search action for AI
 */
export function generateEnhancedWebSiteSchema() {
  return {"@context":"https://schema.org","@type":"WebSite","@id":`${siteConfig.url}/#website`,
    name:"ToolNova - Free AI Tools",
    alternateName: ["ToolNovaHub","AI Tools Hub","Free AI Tools"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: ["en-US","en-GB","en-CA","en-AU","en-IN","en-SG","en-DE","en-FR"],
    publisher: {"@id":`${siteConfig.url}/#organization`,
    },
    potentialAction: [
      {"@type":"SearchAction",
        target: {"@type":"EntryPoint",
          urlTemplate:`${siteConfig.url}/search?q={search_term_string}`,
        },"query-input":"required name=search_term_string",
      },
      {"@type":"Action",
        name:"Use AI Tools",
        description:"Access free AI-powered tools for writing, studying, and productivity",
        target: {"@type":"EntryPoint",
          urlTemplate:`${siteConfig.url}/tools`,
        },
      },
    ],
    hasPart: [
      {"@type":"WebPage", name:"All Tools", url:`${siteConfig.url}/tools` },
      {"@type":"WebPage", name:"Blog", url:`${siteConfig.url}/blog` },
      {"@type":"WebPage", name:"Writing Tools", url:`${siteConfig.url}/tools/writing-tools` },
      {"@type":"WebPage", name:"Study Tools", url:`${siteConfig.url}/tools/study-tools` },
      {"@type":"WebPage", name:"PDF Tools", url:`${siteConfig.url}/tools/image-pdf-tools` },
      {"@type":"WebPage", name:"Career Tools", url:`${siteConfig.url}/tools/career-tools` },
    ],
  };
}

// ============================================
// GEO OPTIMIZATION - AI SUMMARIZATION
// ============================================

/**
 * Generate structured data optimized for AI summarization (GEO)
 * AI search engines prefer well-structured, factual content
 */
export function generateGEOStructuredData(title: string, description: string, toolSlug: string) {
  return {"@context":"https://schema.org","@type":"TechArticle",
    headline: title,
    description,
    url:`${siteConfig.url}/tools/${toolSlug}`,
    inLanguage:"en-US",
    about: {"@type":"Thing",
      name:"AI Tools",
      description:"Free AI-powered productivity and educational tools",
    },
    genre:"Web Application",
    platform:"Web Browser",
    publisher: {"@type":"Organization",
      name:"ToolNova",
    },
    datePublished:"2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    // AI-friendly structured content
    tutorial: {"@type":"TechArticle",
      about: [
        {"@type":"Thing", name:"Text Processing" },
        {"@type":"Thing", name:"AI Assistance" },
        {"@type":"Thing", name:"Productivity" },
      ],
    },
  };
}

/**
 * Generate entity data for knowledge graph (important for AI search)
 */
export function generateEntityData() {
  return {"@context":"https://schema.org","@type":"Thing","@id":`${siteConfig.url}/#main-entity`,
    name:"ToolNova",
    // toolCount kept in sync with src/data/tools.ts TOOL_COUNT_LABEL (avoid circular import)
    description:"A comprehensive free AI tools platform offering 47+ utilities for students and professionals covering writing, studying, PDF tools, career development, and productivity",
    url: siteConfig.url,
    additionalProperty: [
      {"@type":"PropertyValue", name:"toolCount", value:"47+" },
      {"@type":"PropertyValue", name:"pricing", value:"Free" },
      {"@type":"PropertyValue", name:"signUpRequired", value:"No" },
      {"@type":"PropertyValue", name:"platform", value:"Web" },
      {"@type":"PropertyValue", name:"launchYear", value:"2024" },
      {"@type":"PropertyValue", name:"headquarters", value:"Singapore" },
      {"@type":"PropertyValue", name:"serviceArea", value:"Global" },
      {"@type":"PropertyValue", name:"category", value:"AI Tools, Education, Productivity" },
      {"@type":"PropertyValue", name:"toolCategories", value:"Writing, Study, Exam Prep, PDF & Image, Career, Utility" },
    ],
  };
}

// ============================================
// ADVANCED AEO/GEO SCHEMAS FOR AI SEARCH
// ============================================

/**
 * Generate Service Schema for AI discovery
 */
export function generateServiceSchema() {
  return {"@context":"https://schema.org","@type":"Service","@id":`${siteConfig.url}/#service`,
    name:"ToolNova AI Tools Platform",
    description:"Free AI-powered productivity tools for writing, studying, career development, and document processing. No sign-up required.",
    provider: {"@type":"Organization","@id":`${siteConfig.url}/#organization`,
    },
    serviceType:"AI Tools Platform",
    areaServed: {"@type":"GeoShape",
      name:"Worldwide",
    },
    hasOfferCatalog: {"@type":"OfferCatalog",
      name:"Free AI Tools",
      itemListElement: [
        {"@type":"OfferCatalog",
          name:"Writing Tools",
          itemListElement: [
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Text Summarizer" } },
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Paraphraser" } },
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Grammar Checker" } },
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Essay Writer" } },
          ],
        },
        {"@type":"OfferCatalog",
          name:"Study Tools",
          itemListElement: [
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Homework Solver" } },
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Flashcard Maker" } },
            {"@type":"Offer", itemOffered: {"@type":"Service", name:"Quiz Generator" } },
          ],
        },
      ],
    },
    offers: {"@type":"Offer",
      price:"0",
      priceCurrency:"USD",
      priceValidUntil:"2030-12-31",
      availability:"https://schema.org/InStock",
    },
  };
}

/**
 * Generate Dataset Schema for AI Training Data Discovery
 * This helps AI models understand the structure of your tools
 */
export function generateDatasetSchema() {
  return {"@context":"https://schema.org","@type":"Dataset",
    name:"ToolNova AI Tools Catalog",
    description:"Comprehensive catalog of 47+ free AI-powered tools for productivity, education, and content creation",
    url: siteConfig.url,
    license:"https://creativecommons.org/licenses/by/4.0/",
    creator: {"@type":"Organization",
      name:"ToolNova",
      url: siteConfig.url,
    },
    datePublished:"2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    keywords: ["AI tools","free tools","productivity","education","writing tools","study tools","PDF tools","career tools",
    ],
    distribution: [
      {"@type":"DataDownload",
        name:"Tools API",
        encodingFormat:"application/json",
        contentUrl:`${siteConfig.url}/api/tools`,
      },
      {"@type":"DataDownload",
        name:"OpenAPI Specification",
        encodingFormat:"application/yaml",
        contentUrl:`${siteConfig.url}/openapi.yaml`,
      },
    ],
    spatialCoverage: {"@type":"Place",
      name:"Global",
    },
    temporalCoverage:"2024-01-01/..",
  };
}

/**
 * Generate SoftwareSourceCode Schema for AI Code Discovery
 */
export function generateSoftwareSourceCodeSchema() {
  return {"@context":"https://schema.org","@type":"SoftwareSourceCode",
    name:"ToolNova Platform",
    description:"Web-based platform providing 47+ free AI-powered tools",
    codeRepository: siteConfig.links.github,
    programmingLanguage:"TypeScript",
    runtimePlatform:"Next.js",
    targetProduct: {"@type":"SoftwareApplication",
      name:"ToolNova",
      applicationCategory:"EducationalApplication",
      operatingSystem:"Web Browser",
    },
    author: {"@type":"Organization",
      name:"ToolNova",
    },
    dateCreated:"2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

/**
 * Generate ItemList Schema for All Tools (AEO Optimization)
 */
export function generateAllToolsItemListSchema() {
  const allTools = [
    // Writing Tools
    { slug:"text-summarizer", name:"Text Summarizer", description:"Summarize articles and documents instantly" },
    { slug:"paraphraser", name:"Paraphrasing Tool", description:"Rewrite text while preserving meaning" },
    { slug:"grammar-fix", name:"Grammar Checker", description:"Fix grammar, spelling, and punctuation errors" },
    { slug:"essay-writer", name:"Essay Writer", description:"Generate well-structured essays" },
    { slug:"email-writer", name:"Email Writer", description:"Create professional emails instantly" },
    { slug:"speech-writer", name:"Speech Writer", description:"Write compelling speeches" },
    { slug:"caption-generator", name:"Caption Generator", description:"Generate social media captions" },
    { slug:"story-generator", name:"Story Generator", description:"Create creative stories" },
    { slug:"paragraph-generator", name:"Paragraph Generator", description:"Generate well-structured paragraphs" },
    { slug:"text-simplifier", name:"Text Simplifier", description:"Simplify complex text" },
    // Study Tools
    { slug:"homework-solver", name:"Homework Solver", description:"Solve problems with step-by-step explanations" },
    { slug:"notes-generator", name:"Notes Generator", description:"Generate comprehensive study notes" },
    { slug:"flashcard-maker", name:"Flashcard Maker", description:"Create digital flashcards" },
    { slug:"quiz-generator", name:"Quiz Generator", description:"Generate custom quizzes" },
    { slug:"mcq-generator", name:"MCQ Generator", description:"Create multiple choice questions" },
    { slug:"concept-explainer", name:"Concept Explainer", description:"Explain complex topics simply" },
    { slug:"chapter-summary", name:"Chapter Summary", description:"Summarize textbook chapters" },
    { slug:"doubt-solver", name:"Doubt Solver", description:"Clear academic doubts" },
    { slug:"diagram-explainer", name:"Diagram Explainer", description:"Explain diagrams and visuals" },
    { slug:"formula-generator", name:"Formula Generator", description:"Generate mathematical formulas" },
    { slug:"timetable-generator", name:"Timetable Generator", description:"Create study timetables" },
    { slug:"revision-planner", name:"Revision Planner", description:"Plan revision schedules" },
    { slug:"goal-planner", name:"Goal Planner", description:"Set and track goals" },
    { slug:"todo-list-generator", name:"Todo List Generator", description:"Generate organized todo lists" },
    // Language Tools
    { slug:"vocabulary-builder", name:"Vocabulary Builder", description:"Build vocabulary with new words" },
    { slug:"synonym-finder", name:"Synonym Finder", description:"Find synonyms for any word" },
    { slug:"antonym-finder", name:"Antonym Finder", description:"Find antonyms for any word" },
    { slug:"idioms-phrases", name:"Idioms & Phrases", description:"Learn idioms and phrases" },
    { slug:"one-word-substitution", name:"One Word Substitution", description:"Find one-word substitutions" },
    // Career Tools
    { slug:"resume-bullets", name:"Resume Bullets", description:"Generate professional resume points" },
    { slug:"cover-letter-writer", name:"Cover Letter Writer", description:"Write cover letters" },
    { slug:"interview-generator", name:"Interview Generator", description:"Generate interview Q&A" },
    { slug:"bio-generator", name:"Bio Generator", description:"Create professional bios" },
    { slug:"linkedin-optimizer", name:"LinkedIn Optimizer", description:"Optimize LinkedIn profile" },
    // PDF & Image Tools
    { slug:"merge-pdf", name:"Merge PDF", description:"Combine multiple PDFs" },
    { slug:"split-pdf", name:"Split PDF", description:"Extract pages from PDFs" },
    { slug:"image-to-pdf", name:"Image to PDF", description:"Convert images to PDF" },
    { slug:"image-compressor", name:"Image Compressor", description:"Reduce image file size" },
    { slug:"jpg-to-png", name:"JPG to PNG", description:"Convert JPG to PNG" },
    { slug:"png-to-jpg", name:"PNG to JPG", description:"Convert PNG to JPG" },
    // Utility Tools
    { slug:"word-counter", name:"Word Counter", description:"Count words and characters" },
    { slug:"character-counter", name:"Character Counter", description:"Count characters with details" },
    { slug:"case-converter", name:"Case Converter", description:"Convert text case" },
    { slug:"age-calculator", name:"Age Calculator", description:"Calculate age from birthdate" },
  ];

  return {"@context":"https://schema.org","@type":"ItemList",
    name:"ToolNova AI Tools",
    description:"Complete list of 47+ free AI-powered tools for productivity and education",
    numberOfItems: allTools.length,
    itemListElement: allTools.map((tool, index) => ({"@type":"ListItem",
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url:`${siteConfig.url}/tools/${tool.slug}`,
    })),
  };
}

/**
 * Generate Knowledge Graph Schema for AI Understanding
 */
export function generateKnowledgeGraphSchema() {
  return {"@context":"https://schema.org","@graph": [
      // Main Entity
      {"@type":"WebApplication","@id":`${siteConfig.url}/#webapp`,
        name:"ToolNova",
        alternateName: ["ToolNovaHub","AI Tools Hub"],
        url: siteConfig.url,
        description:"Free AI-powered tools platform for students and professionals",
        applicationCategory:"EducationalApplication",
        operatingSystem:"Web Browser",
        browserRequirements:"Requires JavaScript",
        offers: {"@type":"Offer",
          price:"0",
          priceCurrency:"USD",
        },
        author: {"@id":`${siteConfig.url}/#organization` },
        publisher: {"@id":`${siteConfig.url}/#organization` },
      },
      // Organization
      {"@type":"Organization","@id":`${siteConfig.url}/#organization`,
        name:"ToolNovaHub",
        alternateName:"ToolNova",
        url: siteConfig.url,
        logo: {"@type":"ImageObject",
          url:`${siteConfig.url}/logo.png`,
          width: 512,
          height: 512,
        },
        foundingDate:"2024",
        foundingLocation: {"@type":"Place",
          name:"Singapore",
        },
        sameAs: ["https://twitter.com/toolnovahub","https://github.com/toolnovahub","https://linkedin.com/company/toolnovahub",
        ],
        contactPoint: {"@type":"ContactPoint",
          email:"support@toolnovahub.com",
          contactType:"customer service",
        },
      },
      // Website
      {"@type":"WebSite","@id":`${siteConfig.url}/#website`,
        name:"ToolNova",
        url: siteConfig.url,
        publisher: {"@id":`${siteConfig.url}/#organization` },
        potentialAction: {"@type":"SearchAction",
          target:`${siteConfig.url}/search?q={search_term_string}`,"query-input":"required name=search_term_string",
        },
      },
    ],
  };
}

/**
 * Generate Action Schema for AI Assistants
 */
export function generateActionSchema() {
  return {"@context":"https://schema.org","@type":"Action",
    name:"Use ToolNova AI Tools",
    description:"Access free AI-powered tools for writing, studying, and productivity",
    target: {"@type":"EntryPoint",
      urlTemplate: siteConfig.url,
      actionPlatform: ["http://schema.org/DesktopWebPlatform","http://schema.org/MobileWebPlatform",
      ],
    },
    result: {"@type":"Thing",
      description:"AI-generated content, summaries, study materials, and more",
    },
  };
}

/**
 * Generate Claim Schema for Trust Signals (GEO)
 */
export function generateClaimSchema() {
  return {"@context":"https://schema.org","@type":"Claim",
    appearance: [
      {"@type":"CreativeWork",
        name:"ToolNova Platform",
        url: siteConfig.url,
      },
    ],
    claimReviewed:"ToolNova provides free AI tools with no sign-up required",
    itemReviewed: {"@type":"Service",
      name:"ToolNova AI Tools",
    },
    author: {"@type":"Organization",
      name:"ToolNova",
    },
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get FAQ for a specific tool
 */
export function getToolFAQs(toolSlug: string): ToolFAQ[] {
  return TOOL_FAQS[toolSlug] || [];
}

/**
 * Get HowTo for a specific tool
 */
export function getToolHowTo(toolSlug: string) {
  return TOOL_HOWTOS[toolSlug] || null;
}

/**
 * Get breadcrumb for a category
 */
export function getCategoryBreadcrumb(categorySlug: string): BreadcrumbItem[] {
  return CATEGORY_BREADCRUMBS[categorySlug] || CATEGORY_BREADCRUMBS.tools;
}

/**
 * Generate all schemas for a tool page (comprehensive)
 */
export function generateAllToolSchemas(
  toolName: string,
  toolDescription: string,
  toolSlug: string,
  category: string
) {
  return {"@context":"https://schema.org","@graph": [
      generateWebApplicationSchema(toolName, toolDescription, toolSlug),
      generateGEOStructuredData(toolName, toolDescription, toolSlug),
      generateBreadcrumbListSchema([
        { name:"Home", url: siteConfig.url },
        { name:"Tools", url:`${siteConfig.url}/tools` },
        { name: category, url:`${siteConfig.url}/tools/${category.toLowerCase().replace(/\s+/g,"-")}` },
        { name: toolName, url:`${siteConfig.url}/tools/${toolSlug}` },
      ]),
      ...(TOOL_FAQS[toolSlug] ? [generateFAQPageSchema(TOOL_FAQS[toolSlug])] : []),
      ...(TOOL_HOWTOS[toolSlug] ? [generateHowToPageSchema(TOOL_HOWTOS[toolSlug].name, TOOL_HOWTOS[toolSlug].description, TOOL_HOWTOS[toolSlug].steps, toolSlug)] : []),
    ],
  };
}

const seoWorldclass = {
  TOOL_FAQS,
  TOOL_HOWTOS,
  generateFAQPageSchema,
  generateHowToPageSchema,
  generateBreadcrumbListSchema,
  generateQAPageSchema,
  generateCourseSchema,
  generateWebApplicationSchema,
  generateVideoSchema,
  generateToolPageSchema,
  generateEnhancedOrganizationSchema,
  generateEnhancedWebSiteSchema,
  generateGEOStructuredData,
  generateEntityData,
  getToolFAQs,
  getToolHowTo,
  getCategoryBreadcrumb,
  // New exports
  generateServiceSchema,
  generateDatasetSchema,
  generateSoftwareSourceCodeSchema,
  generateAllToolsItemListSchema,
  generateKnowledgeGraphSchema,
  generateActionSchema,
  generateClaimSchema,
  generateAllToolSchemas,
};

export default seoWorldclass;
