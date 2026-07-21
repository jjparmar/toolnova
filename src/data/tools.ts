import { LucideIcon } from 'lucide-react';
import {
    FileText, Lightbulb, BookOpen, Target, List, ClipboardList,
    Pen, Calculator, Mail, Mic, Image, Quote, Repeat,
    CheckCircle, Type, GraduationCap, Layout, FileOutput, Users, Youtube, ShieldAlert
} from 'lucide-react';
import { TOOL_FAQS } from '@/lib/seo-worldclass';

export interface ToolData {
    slug: string;
    name: string;
    description: string;
    tagline: string;
    category: string;
    howItWorks: {
        step: number;
        title: string;
        desc: string;
    }[];
    benefits: {
        title: string;
        desc: string;
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
}

export const toolsData: Record<string, ToolData> = {"text-summarizer": {
        slug:"text-summarizer",
        name:"Text Summarizer",
        tagline:"Summarize any text in seconds",
        description:"Condense long articles, documents, and content into clear summaries at your preferred length. Our AI-powered summarizer identifies core concepts and supporting details to provide a coherent reduction of any text while maintaining its original focus and context. Perfect for students, researchers, and busy professionals who need to extract value from information quickly.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Input Content', desc: 'Paste your text directly into the editor or upload a document file (PDF, TXT, DOCX) to get started.' },
            { step: 2, title: 'Customize Settings', desc: 'Select your desired summary length—Brief (TL;DR), Medium (Standard), or Detailed (Comprehensive)—to match your specific needs.' },
            { step: 3, title: 'AI Processing', desc: 'Our advanced neural networks analyze the semantic structure of your text to identify key themes and pivotal information.' },
            { step: 4, title: 'Review & Refine', desc: 'Read your generated summary instantly. You can adjust the length settings and re-summarize if you need more or less detail.' },
            { step: 5, title: 'Export Results', desc: 'Copy your summary to your clipboard or download it as a clean text file for use in your reports or notes.' }
        ],
        benefits: [
            { title:"Time Efficiency", desc:"Extract the most important information from long documents in seconds, allowing you to process more information in less time." },
            { title:"Smart Compression", desc:"Our AI doesn't just cut text; it intelligently compresses ideas for maximum readability and coherence." },
            { title:"Versatile Formats", desc:"Works with articles, research papers, legal documents, and casual emails with equal precision." },
            { title:"Focused Learning", desc:"Ideal for students needing to understand complex topics quickly by focusing on core arguments." }
        ],
        faqs: [
            { question:"How does the AI text summarizer work?", answer:"Our tool uses advanced Natural Language Processing (NLP) to perform 'extractive' and 'abstractive' summarization. It identifies the most important sentences and then weaves them together into a concise, readable version that captures the essence of the original text." },
            { question:"What is the maximum word count I can summarize?", answer:"The free version of ToolNova's summarizer handles up to 10,000 words per session, which covers most articles, essays, and standard business reports. For larger documents, we recommend summarizing in sections." },
            { question:"Does the tool support multiple languages?", answer:"Yes, our AI is multilingual and can accurately summarize text in over 30 languages, including Spanish, French, German, Chinese, and many more, while maintaining grammatical integrity." },
            { question:"Can I use this for academic or research papers?", answer:"Absolutely. Many researchers use our tool to quickly scan through abstracts and long-form studies to determine relevance, saving hours of manual reading time. However, always ensure you've captured all nuance before final citations." },
            { question:"Is the summarized content unique?", answer:"The summary is a condensed version of your specific input. While it uses the same core facts, the arrangement and extraction process create a unique overview tailored to the length you selected." },
            { question:"Is my uploaded content stored on your servers?", answer:"No. At ToolNova, we prioritize user privacy. Your text is processed in a secure environment and is deleted as soon as the session ends. We never use your data to train our public models." }
        ]
    },"paraphraser": {
        slug:"paraphraser",
        name:"Paraphrasing Tool",
        tagline:"Free AI Paraphrasing Tool – Reword Essays Without Plagiarism",
        description:"Rephrase articles, sentences, and essays while avoiding plagiarism and maintaining meaning. Our AI-driven paraphraser uses contextual awareness to find the best synonyms and sentence structures, ensuring your writing is fresh, clear, and professional. It's the ideal companion for writers looking to improve clarity or students needing to rephrase complex academic concepts.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Text Entry', desc: 'Paste your original text or a specific sentence into the paraphrasing box to begin the transformation.' },
            { step: 2, title: 'Style Selection', desc: 'Choose a mode that fits your goal: Standard (most common), Fluency (for better flow), or Creative (for varied vocabulary).' },
            { step: 3, title: 'Intelligent Rewriting', desc: 'Our AI engine analyzes the context of your words to ensure the new version retains the exact same meaning as the original.' },
            { step: 4, title: 'Manual Refinement', desc: 'Click on a specific word in the result to see a list of relevant synonyms and hand-pick the ones that best fit your tone.' },
            { step: 5, title: 'Plagiarism Check Link', desc: 'Review your final version and use our integrated tools to ensure your content is unique and ready for submission.' }
        ],
        benefits: [
            { title:"Plagiarism Avoidance", desc:"Create 100% unique versions of your content that pass strict plagiarism checks while maintaining the original intent." },
            { title:"Enhanced Vocabulary", desc:"Discover new ways to express ideas with our context-aware synonym suggestions and stylistic modes." },
            { title:"Context Preservation", desc:"Unlike simple word-swappers, our AI understands the meaning of the whole sentence to ensure accuracy." },
            { title:"Tone Customization", desc:"Easily switch between formal, casual, and creative tones to match your target audience." }
        ],
        faqs: [
            { question:"Will paraphrasing avoid plagiarism?", answer:"Yes, our tool changes the structure and vocabulary of your text, which helps in creating unique content. However, always remember to cite your original sources when using paraphrased work in academic settings." },
            { question:"How many modes are available?", answer:"We offer three distinct modes: 'Standard' for general use, 'Fluency' to fix awkward phrasing, and 'Creative' for when you want to see a completely different stylistic take on your input." },
            { question:"Does it work for long essays?", answer:"Yes, you can paraphrase entire paragraphs and essays. We recommend processing 500-800 words at a time for the best results and the highest contextual accuracy." },
            { question:"Can the paraphraser improve my writing style?", answer:"Definitely. By seeing how our AI restructures your sentences, you can learn more effective ways to communicate complex ideas and expand your active vocabulary." },
            { question:"Is it better than just using a thesaurus?", answer:"Yes, because our AI understands 'context'. A thesaurus just gives synonyms, but our tool knows which synonym fits the current sentence grammatically and semantically." },
            { question:"Is the paraphrasing tool free to use?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"grammar-fix": {
        slug:"grammar-fix",
        name:"AI Grammar Fix",
        tagline:"Free AI Grammar Checker – Perfect Your Writing Instantly",
        description:"Fix grammar, spelling, punctuation, and style errors with AI-powered corrections. Our advanced proofreading engine goes beyond basic spell-check, identifying subtle issues in tone, clarity, and syntax. Whether you're writing a formal business email, a university essay, or a creative story, ToolNova ensures your message is conveyed with professional polish and zero distractions.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Upload or Paste', desc: 'Submit your draft by pasting the text or uploading your document file into our high-speed processing engine.' },
            { step: 2, title: 'Context Analysis', desc: 'The AI scans your entire text to understand the subject matter and intent, ensuring corrections match the required tone.' },
            { step: 3, title: 'Automatic Correction', desc: 'All obvious errors in spelling, grammar, and punctuation are corrected instantly while maintaining your original voice.' },
            { step: 4, title: 'Style Suggestions', desc: 'Receive high-level suggestions for improving sentence flow, word choice, and overall readability to make your writing more impactful.' },
            { step: 5, title: 'One-Click Apply', desc: 'Review the changes and apply them all at once, or go through them one by one to ensure you stay in total control of your content.' }
        ],
        benefits: [
            { title:"Professional Polish", desc:"Eliminate embarrassing errors and ensure your writing meets the highest professional and academic standards." },
            { title:"Deeper Corrections", desc:"Identify complex issues like dangling modifiers, subject-verb disagreement, and inconsistent tense usage." },
            { title:"Style Enhancement", desc:"Go beyond correctness to improve the overall clarity and impact of your specific communication style." },
            { title:"Learning Tool", desc:"Individual explanations for each correction help you learn from your mistakes and become a better writer." }
        ],
        faqs: [
            { question:"Is this more than just a spell-checker?", answer:"Yes. While it catches spelling mistakes, its real power lies in detecting grammar rules, subject-verb agreement, and complex punctuation issues that standard checkers miss." },
            { question:"Can I use it for professional emails?", answer:"Absolutely. We have a 'Formal' mode optimized specifically for business communications, helping you sound authoritative and polite." },
            { question:"Does the tool explain the errors?", answer:"Yes, we provide explanations for major corrections so you can understand the grammar rule behind the fix and improve your writing over time." },
            { question:"Is it 100% accurate?", answer:"Our AI model is one of the most advanced in the industry and catches 99% of common and advanced errors. We always recommend a final human read-through for creative nuance." },
            { question:"How does it handle different dialects (US vs UK English)?", answer:"You can toggle between different English variants in the settings to ensure you are meeting the specific spelling and grammar conventions of your region." },
            { question:"Is my text private during the grammar check?", answer:"Privacy is our core value. Your text is encrypted during processing and is immediately discarded from our caches once you close the page." }
        ]
    },"essay-writer": {
        slug:"essay-writer",
        name:"AI Essay Writer",
        tagline:"Write professional essays in minutes",
        description:"Generate well-structured essays with introductions, body paragraphs, and conclusions on any topic. Our AI handles the heavy lifting of organization and brainstorming, providing you with a solid foundation to build upon. Perfect for overcoming writer's block and understanding how to structure academic arguments effectively.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Define Topic', desc: 'Type your essay prompt or topic into the generator to provide a clear direction for the AI.' },
            { step: 2, title: 'Select Type', desc: 'Choose the essay format (e.g., Argumentative, Narrative, Descriptive) to ensure the AI uses the correct tone and structure.' },
            { step: 3, title: 'Outline Generation', desc: 'The tool first creates a logical outline, ensuring a smooth transition between introduction, body, and conclusion.' },
            { step: 4, title: 'Full Draft Creation', desc: 'Our AI writes a complete first draft based on the outline, incorporating relevant facts and logical arguments.' },
            { step: 5, title: 'Edit and Personalize', desc: 'Use the generated draft as a starting point. Add your personal insights, cite your sources, and refine the voice to make it your own.' }
        ],
        benefits: [
            { title:"Beat Writer's Block", desc:"Get over the 'blank page' hurdle with an instant, structured draft that you can refine into a masterpiece." },
            { title:"Structural Guidance", desc:"Learn the proper way to organize academic arguments with AI-generated introductions, transitions, and conclusions." },
            { title:"Diverse Topics", desc:"Our AI is trained on a vast array of subjects, from history and literature to science and business technology." },
            { title:"Time Optimization", desc:"Focus your energy on refining arguments and adding personal voice rather than struggling with basic organization." }
        ],
        faqs: [
            { question:"Is using an AI essay writer plagiarism?", answer:"The content generated is unique. However, we recommend using it as a starting point or an 'inspiration tool'. Always rewrite the content in your own voice and adhere to your institution's academic integrity policies." },
            { question:"What essay formats do you support?", answer:"We support Argumentative, Expository, Narrative, Descriptive, and Persuasive essay formats, each with its own specific structural logic." },
            { question:"Can it generate citations?", answer:"The current version generates general text. We recommend using a dedicated citation manager to add accurate APA, MLA, or Chicago style citations to the final draft." },
            { question:"How long can the essays be?", answer:"You can generate essays ranging from 500 to 2,500 words by selecting the 'Long Form' option in the settings." },
            { question:"Can I choose the point of view?", answer:"Yes, you can specify if the essay should be written in the first person (I), second person (you), or third person (it/they) in the advanced settings." },
            { question:"Is the tool completely free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"merge-pdf": {
        slug:"merge-pdf",
        name:"Merge PDF",
        tagline:"Merge PDF Online Free – No Watermark & No Signup",
        description:"Merge multiple PDF files into a single, organized document in seconds. Simply upload your files, drag to reorder, and download the combined PDF. All processing happens securely in your browser—your files are never uploaded to any server.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload Files", desc:"Click the upload area or drag and drop multiple PDF files from your computer." },
            { step: 2, title:"Reorder Pages", desc:"Drag the file thumbnails to arrange them in your preferred order before merging." },
            { step: 3, title:"Merge", desc:"Click the 'Merge' button and our browser-based engine combines all files instantly." },
            { step: 4, title:"Download", desc:"Download your merged PDF file, ready to share or print." }
        ],
        benefits: [
            { title:"100% Browser-Based", desc:"All merging happens locally in your browser. Your files never leave your device, ensuring complete privacy." },
            { title:"No File Limits", desc:"Merge as many PDF files as you need without restrictions on file count or total size." },
            { title:"Preserve Quality", desc:"The merged document retains the exact formatting, fonts, and images of the originals." },
            { title:"No Sign-Up Required", desc:"Start merging immediately—no account, no subscription, no hidden fees." }
        ],
        faqs: [
            { question:"Is it safe to merge PDFs online?", answer:"Yes. ToolNova's Merge PDF tool processes files entirely in your browser using client-side JavaScript. Your PDFs are never uploaded to a server, ensuring complete data privacy and security." },
            { question:"How many PDFs can I merge at once?", answer:"There is no hard limit. You can merge dozens of PDF files in a single session. Performance depends on your device's memory, but most users can merge 50+ files without issues." },
            { question:"Will the merged PDF lose quality?", answer:"No. Our tool performs a lossless merge, preserving all text, images, fonts, and formatting from each original document exactly as they are." },
            { question:"Can I reorder the PDFs before merging?", answer:"Yes. After uploading, you can drag and drop the file thumbnails to arrange them in any order before clicking Merge." },
            { question:"Does this work on mobile devices?", answer:"Yes. The Merge PDF tool is fully responsive and works on smartphones and tablets running modern browsers like Chrome, Safari, and Firefox." }
        ]
    },"split-pdf": {
        slug:"split-pdf",
        name:"Split PDF",
        tagline:"Extract pages from any PDF",
        description:"Split a PDF into individual pages or extract specific page ranges. Whether you need to pull out a single chapter, remove unwanted pages, or break a large document into smaller files, our browser-based splitter handles it instantly and securely.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload PDF", desc:"Upload the PDF file you want to split by clicking the upload area or dragging the file in." },
            { step: 2, title:"Select Pages", desc:"Choose which pages to extract—select individual pages, a range, or split into single-page files." },
            { step: 3, title:"Split", desc:"Click 'Split' and the tool extracts your selected pages into a new PDF instantly." },
            { step: 4, title:"Download", desc:"Download the resulting PDF file(s) to your device, ready for sharing." }
        ],
        benefits: [
            { title:"Precise Extraction", desc:"Extract exactly the pages you need—individual pages, custom ranges, or every page as a separate file." },
            { title:"Privacy Guaranteed", desc:"All splitting happens in your browser. No files are uploaded to any server." },
            { title:"Fast Processing", desc:"Split even large PDFs with hundreds of pages in seconds." },
            { title:"Free & Unlimited", desc:"No limits on file size or number of splits per session." }
        ],
        faqs: [
            { question:"Can I extract specific pages from a PDF?", answer:"Yes. You can select individual pages (e.g., pages 3, 7, 12) or specify a range (e.g., pages 5–15) to extract into a new PDF document." },
            { question:"Is the Split PDF tool free?", answer:"Yes, it is completely free with no limits on usage. There is no sign-up, no watermark, and no subscription required." },
            { question:"Will splitting affect the quality of the PDF?", answer:"No. The extracted pages retain their original quality, formatting, images, and fonts without any degradation." },
            { question:"Can I split a password-protected PDF?", answer:"You will need to unlock the PDF first. Our tool processes unprotected files. Remove the password using your PDF reader before uploading." },
            { question:"Does it work offline?", answer:"After the page loads, the splitting engine works entirely in your browser on your device, so intermittent connectivity won't affect processing." }
        ]
    },"image-to-pdf": {
        slug:"image-to-pdf",
        name:"Image to PDF",
        tagline:"Convert images to PDF instantly",
        description:"Convert JPG, PNG, WebP, and other image formats into a professional PDF document. Upload multiple images, arrange their order, and download a single PDF. Perfect for creating portfolios, scanning documents, or compiling photo collections.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload Images", desc:"Select or drag and drop one or more images (JPG, PNG, WebP, BMP) into the converter." },
            { step: 2, title:"Arrange Order", desc:"Drag thumbnails to reorder the images as you want them to appear in the PDF." },
            { step: 3, title:"Convert", desc:"Click 'Convert to PDF' and the tool generates your document in seconds." },
            { step: 4, title:"Download PDF", desc:"Download the finished PDF, ready to print, email, or archive." }
        ],
        benefits: [
            { title:"Multiple Formats", desc:"Supports JPG, PNG, WebP, BMP, and GIF image formats for maximum flexibility." },
            { title:"Batch Conversion", desc:"Convert multiple images into a single PDF in one go—ideal for photo albums and document scans." },
            { title:"High Quality Output", desc:"Images are embedded at full resolution, ensuring crisp, print-ready PDF documents." },
            { title:"No Watermarks", desc:"The generated PDF is clean with no watermarks, branding, or limitations." }
        ],
        faqs: [
            { question:"What image formats can I convert to PDF?", answer:"You can convert JPG, JPEG, PNG, WebP, BMP, and GIF images to PDF using this tool." },
            { question:"Can I combine multiple images into one PDF?", answer:"Yes. Upload as many images as you like and they will all be combined into a single PDF document. You can reorder them before converting." },
            { question:"Is there a file size limit?", answer:"There is no strict file size limit. The tool processes images locally in your browser, so performance depends on your device's capabilities." },
            { question:"Will the image quality be preserved in the PDF?", answer:"Yes. Images are embedded at their original resolution and quality. There is no compression or quality loss during conversion." },
            { question:"Can I adjust page size or orientation?", answer:"The tool automatically fits each image to a standard page size. Landscape images are fitted accordingly to maintain their aspect ratio." }
        ]
    },"jpg-to-png": {
        slug:"jpg-to-png",
        name:"JPG to PNG Converter",
        tagline:"Convert JPG images to PNG format",
        description:"Convert JPG and JPEG images to PNG format instantly. PNG supports transparency and lossless compression, making it ideal for graphics, logos, and images that need a transparent background. Process multiple files at once with no quality loss.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload JPG", desc:"Select or drag and drop your JPG/JPEG images into the converter." },
            { step: 2, title:"Convert", desc:"The tool automatically converts your images to PNG format in your browser." },
            { step: 3, title:"Preview", desc:"Preview the converted PNG images before downloading." },
            { step: 4, title:"Download", desc:"Download the PNG files individually or as a batch." }
        ],
        benefits: [
            { title:"Transparency Support", desc:"PNG format supports transparent backgrounds—essential for logos, icons, and overlay graphics." },
            { title:"Lossless Quality", desc:"PNG uses lossless compression, preserving every pixel of detail from the original image." },
            { title:"Batch Processing", desc:"Convert multiple JPG files to PNG simultaneously, saving time on large projects." },
            { title:"Instant & Private", desc:"Conversion happens in your browser—no files are uploaded to external servers." }
        ],
        faqs: [
            { question:"Why convert JPG to PNG?", answer:"PNG supports transparency and lossless compression. Convert when you need transparent backgrounds for logos, graphics overlays, or when you want to preserve maximum image quality without compression artifacts." },
            { question:"Will converting JPG to PNG improve quality?", answer:"Converting won't improve quality beyond the original JPG, but it prevents further quality loss from re-saving. PNG's lossless format preserves the current state perfectly." },
            { question:"Is there a file size limit?", answer:"No strict limit. The tool runs in your browser, so it can handle typical web and print images easily." },
            { question:"Can I convert multiple files at once?", answer:"Yes. You can upload and convert multiple JPG images to PNG in a single batch." },
            { question:"Are my images stored anywhere?", answer:"No. All processing happens locally in your browser. Your images are never uploaded to any server." }
        ]
    },"png-to-jpg": {
        slug:"png-to-jpg",
        name:"PNG to JPG Converter",
        tagline:"Convert PNG images to JPG format",
        description:"Convert PNG images to JPG format for smaller file sizes and broader compatibility. JPG is ideal for photographs, web publishing, and email attachments where file size matters. Process multiple files instantly in your browser.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload PNG", desc:"Select or drag and drop your PNG images into the converter." },
            { step: 2, title:"Set Quality", desc:"Optionally adjust the JPG compression quality to balance file size and image clarity." },
            { step: 3, title:"Convert", desc:"The tool converts your PNG images to JPG format instantly in your browser." },
            { step: 4, title:"Download", desc:"Download the converted JPG files ready for use." }
        ],
        benefits: [
            { title:"Smaller File Size", desc:"JPG compression dramatically reduces file size—often 60-80% smaller than PNG—perfect for web and email." },
            { title:"Universal Compatibility", desc:"JPG is the most widely supported image format across all devices, platforms, and applications." },
            { title:"Quality Control", desc:"Adjust compression level to find the perfect balance between file size and visual quality." },
            { title:"Batch Processing", desc:"Convert multiple PNG files at once, saving time on bulk operations." }
        ],
        faqs: [
            { question:"Why convert PNG to JPG?", answer:"JPG files are significantly smaller than PNG, making them ideal for web publishing, email attachments, and social media where file size and loading speed matter." },
            { question:"Will I lose quality converting PNG to JPG?", answer:"JPG uses lossy compression, so there is a slight quality reduction. However, at high quality settings (90%+), the difference is virtually imperceptible to the human eye." },
            { question:"What happens to transparency?", answer:"JPG does not support transparency. Any transparent areas in your PNG will be replaced with a white background in the converted JPG." },
            { question:"Can I batch convert multiple files?", answer:"Yes. Upload multiple PNG files and convert them all to JPG simultaneously." },
            { question:"Is the tool free to use?", answer:"Yes, completely free with no limits, no sign-up, and no watermarks." }
        ]
    },"image-compressor": {
        slug:"image-compressor",
        name:"Image Compressor",
        tagline:"Reduce image file size instantly",
        description:"Compress JPG, PNG, and WebP images to reduce file size without visible quality loss. Our smart compression algorithm analyzes each image to find the optimal balance between size reduction and visual fidelity, helping you speed up websites and save storage.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload Image", desc:"Select or drag and drop the images you want to compress (JPG, PNG, or WebP)." },
            { step: 2, title:"Set Compression", desc:"Choose a compression level or let the tool automatically find the optimal setting." },
            { step: 3, title:"Compress", desc:"The tool compresses your images instantly in your browser using advanced algorithms." },
            { step: 4, title:"Download", desc:"Download the compressed images and see the file size savings." }
        ],
        benefits: [
            { title:"Smart Compression", desc:"Our algorithm intelligently reduces file size while maintaining visual quality that's indistinguishable from the original." },
            { title:"Faster Websites", desc:"Smaller images mean faster page load times, better Core Web Vitals scores, and improved SEO rankings." },
            { title:"Batch Processing", desc:"Compress multiple images at once—perfect for optimizing entire photo galleries or website asset folders." },
            { title:"Privacy First", desc:"All compression runs in your browser. Your images never leave your device." }
        ],
        faqs: [
            { question:"How much can images be compressed?", answer:"Typical compression reduces file size by 40-80% depending on the image and format. JPG images usually see 50-70% reduction, while PNG files can see even larger savings." },
            { question:"Will compression make my images look bad?", answer:"Our smart algorithm prioritizes visual quality. At recommended settings, the compressed image is virtually indistinguishable from the original to the human eye." },
            { question:"What formats are supported?", answer:"The compressor supports JPG, JPEG, PNG, and WebP image formats." },
            { question:"Why should I compress images for my website?", answer:"Compressed images load faster, improving user experience, SEO rankings, and Core Web Vitals scores. Google recommends optimized images for better search performance." },
            { question:"Is there a limit on how many images I can compress?", answer:"No. You can compress as many images as you need in a single session, completely free." }
        ]
    },"reorder-pdf": {
        slug:"reorder-pdf",
        name:"Reorder PDF Pages",
        tagline:"Drag thumbnails to rearrange pages",
        description:"Reorder pages in a PDF with visual thumbnails. Drag and drop, reverse, or reset order, then download a new file. Fully private browser processing — no upload, no watermark.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload PDF", desc:"Drop a PDF to generate page thumbnails." },
            { step: 2, title:"Reorder", desc:"Drag pages or use arrows until the sequence is correct." },
            { step: 3, title:"Download", desc:"Save the reordered PDF instantly." }
        ],
        benefits: [
            { title:"Visual thumbnails", desc:"See each page while reordering." },
            { title:"Drag and drop", desc:"Natural rearrange with reset/reverse helpers." },
            { title:"Full quality", desc:"Pages are copied, not re-compressed as images." },
            { title:"Private & free", desc:"No account, no server upload." }
        ],
        faqs: [
            { question:"Can I reverse page order?", answer:"Yes. Use the Reverse button, then download." },
            { question:"Are thumbnails full quality?", answer:"Thumbnails are previews only. The download uses original PDF page data." },
            { question:"Is reordering free?", answer:"Yes — unlimited and private in your browser." }
        ]
    },"image-crop": {
        slug:"image-crop",
        name:"Crop Image",
        tagline:"Select any region and crop free",
        description:"Crop any part of an image with an interactive selection box. Drag to choose the area, lock aspect ratios like 1:1 or 16:9, and download PNG, JPG, or WebP. Runs fully in your browser with no upload and no watermark.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload Image", desc:"Drop a JPG, PNG, or WebP file into the crop tool." },
            { step: 2, title:"Select Region", desc:"Drag the crop box and resize with corner handles. Optionally lock an aspect ratio." },
            { step: 3, title:"Apply Crop", desc:"Preview the cropped result at exact pixel dimensions." },
            { step: 4, title:"Download", desc:"Save the crop as PNG, JPG, or WebP instantly." }
        ],
        benefits: [
            { title:"Visual selection", desc:"Pick the exact area with drag handles—not just blind pixel numbers." },
            { title:"Aspect presets", desc:"1:1, 4:3, 16:9, 9:16 and freeform for any use case." },
            { title:"Private", desc:"Cropping never leaves your device." },
            { title:"Free", desc:"Unlimited crops, no account, no watermarks." }
        ],
        faqs: [
            { question:"How do I select part of an image to crop?", answer:"Upload the image, then drag the blue selection box over the area you want. Use corner and edge handles to refine the size, or type X/Y/width/height values." },
            { question:"Can I crop to Instagram size?", answer:"Yes. Choose the 1:1 aspect preset for square posts, or 9:16 for stories, then adjust the position." },
            { question:"Is the crop tool free?", answer:"Yes. Completely free with unlimited use in your browser." },
            { question:"Do you upload my photos?", answer:"No. Processing is 100% client-side." }
        ]
    },"resize-image": {
        slug:"resize-image",
        name:"Image Resizer",
        tagline:"Resize images to exact dimensions",
        description:"Resize JPG, PNG, WebP, and other images to exact pixel dimensions or percentages. Perfect for social media profiles, website banners, and printing. Keep aspect ratio or stretch to fit your needs without losing quality. Need to cut a region first? Use Crop Image.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload Image", desc:"Select or drag and drop the image you want to resize." },
            { step: 2, title:"Set Dimensions", desc:"Enter the exact width and height in pixels, pick a preset, or choose a percentage." },
            { step: 3, title:"Adjust Settings", desc:"Choose whether to maintain the aspect ratio to prevent stretching." },
            { step: 4, title:"Download", desc:"Download your newly resized image instantly." }
        ],
        benefits: [
            { title:"Exact Dimensions", desc:"Resize your images to the precise pixel width and height you need." },
            { title:"Maintain Aspect Ratio", desc:"Lock the aspect ratio to ensure your images don't get stretched or distorted." },
            { title:"Fast and Private", desc:"All resizing happens in your browser. Your images are never uploaded to any server." },
            { title:"Multiple Formats", desc:"Supports JPG, PNG, WebP, and other common web image formats." }
        ],
        faqs: [
            { question:"Can I resize an image without losing quality?", answer:"Downsizing an image generally retains quality, while upsizing can make it pixelated. Our tool uses browser-native canvas scaling to ensure the best possible result." },
            { question:"What formats does the resizer support?", answer:"You can resize JPG, JPEG, PNG, WebP, and BMP images." },
            { question:"How do I avoid stretching my image?", answer:"Keep the 'Maintain Aspect Ratio' option checked. When you change the width, the height will automatically adjust to keep the image proportional." },
            { question:"Is there a limit on file size?", answer:"Because everything runs in your browser, the only limit is your device's memory. Most modern devices can easily handle images up to 50MB." },
            { question:"Is the Image Resizer free?", answer:"Yes, completely free with no limits or watermarks." }
        ]
    },"bio-generator": {
        slug:"bio-generator",
        name:"AI Bio Generator",
        tagline:"Create professional bios in seconds",
        description:"Generate polished, professional bios for LinkedIn, social media, company websites, and speaker profiles. Our AI crafts compelling bios that highlight your expertise, achievements, and personality in the right tone for any platform.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Enter Details", desc:"Provide your name, role, key achievements, and the platform the bio is for." },
            { step: 2, title:"Select Tone", desc:"Choose from Professional, Casual, Creative, or Academic to match your audience." },
            { step: 3, title:"Generate", desc:"Our AI crafts a polished bio tailored to your specifications in seconds." },
            { step: 4, title:"Edit & Use", desc:"Review, tweak, and copy your bio directly to your profile or website." }
        ],
        benefits: [
            { title:"Platform-Optimized", desc:"Get bios formatted for LinkedIn, Twitter, Instagram, company websites, and conference programs." },
            { title:"Multiple Tones", desc:"Switch between professional, casual, and creative voices to match different contexts." },
            { title:"Highlight Achievements", desc:"AI strategically weaves in your accomplishments and expertise for maximum impact." },
            { title:"Instant Results", desc:"Generate polished bios in seconds instead of spending hours wordsmithing." }
        ],
        faqs: [
            { question:"What information do I need to provide?", answer:"At minimum, your name and role. For best results, include key achievements, years of experience, specialties, and the platform where the bio will be used." },
            { question:"Can I generate bios for different platforms?", answer:"Yes. The tool optimizes length and tone for LinkedIn (300 words), Twitter (160 characters), Instagram (150 characters), and full-length website bios." },
            { question:"Is the generated bio unique?", answer:"Yes. Each bio is generated fresh based on your specific inputs, ensuring originality and relevance to your personal brand." },
            { question:"Can I edit the generated bio?", answer:"Absolutely. The generated bio is a strong starting point—customize it to add personal touches and ensure accuracy." },
            { question:"Is this tool free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"caption-generator": {
        slug:"caption-generator",
        name:"AI Caption Generator",
        tagline:"Create engaging social media captions",
        description:"Generate scroll-stopping captions for Instagram, Twitter, LinkedIn, TikTok, and more. Our AI understands platform-specific best practices, trending formats, and engagement optimization to help your posts stand out and drive interaction.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Describe Your Post", desc:"Tell us what your post is about—the topic, mood, or key message you want to convey." },
            { step: 2, title:"Choose Platform", desc:"Select the social media platform to optimize caption length, tone, and hashtag strategy." },
            { step: 3, title:"Generate Captions", desc:"Get multiple caption options with relevant hashtags and calls-to-action." },
            { step: 4, title:"Copy & Post", desc:"Pick your favorite caption, copy it, and paste it directly into your social media app." }
        ],
        benefits: [
            { title:"Platform-Specific", desc:"Captions optimized for each platform's unique character limits, tone expectations, and engagement patterns." },
            { title:"Hashtag Suggestions", desc:"Get relevant, trending hashtags to maximize your post's discoverability and reach." },
            { title:"Multiple Variations", desc:"Generate several caption options so you can A/B test or choose the one that feels right." },
            { title:"Engagement-Focused", desc:"AI incorporates proven engagement techniques like questions, CTAs, and emotional hooks." }
        ],
        faqs: [
            { question:"Which social media platforms are supported?", answer:"The tool generates optimized captions for Instagram, Twitter/X, LinkedIn, TikTok, Facebook, YouTube, and Pinterest." },
            { question:"Does it include hashtags?", answer:"Yes. Each generated caption includes relevant hashtags optimized for the selected platform's best practices and current trends." },
            { question:"Can I specify the tone of the caption?", answer:"Yes. Choose from options like Professional, Funny, Inspirational, Casual, or Bold to match your brand voice." },
            { question:"How many captions can I generate?", answer:"There is no limit. Generate as many caption variations as you need until you find the perfect one." },
            { question:"Is the caption generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"email-writer": {
        slug:"email-writer",
        name:"AI Email Writer",
        tagline:"Draft professional emails instantly",
        description:"Generate professional, well-structured emails for any business or personal situation. From cold outreach and follow-ups to thank-you notes and complaint responses, our AI crafts emails with the perfect tone, structure, and call-to-action.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Select Email Type", desc:"Choose the type of email—business inquiry, follow-up, apology, introduction, or custom." },
            { step: 2, title:"Provide Details", desc:"Enter the key points, recipient context, and desired tone for your email." },
            { step: 3, title:"Generate", desc:"Our AI writes a complete, professionally structured email with subject line and body." },
            { step: 4, title:"Review & Send", desc:"Edit as needed, copy the email, and paste it into your email client." }
        ],
        benefits: [
            { title:"Save Hours Weekly", desc:"Draft emails in seconds that would normally take 15-30 minutes to compose manually." },
            { title:"Professional Tone", desc:"AI ensures proper business etiquette, grammar, and formatting for every email." },
            { title:"Subject Line Included", desc:"Get compelling subject lines that increase open rates along with the email body." },
            { title:"Multiple Templates", desc:"Support for dozens of email types—from sales outreach to customer service responses." }
        ],
        faqs: [
            { question:"What types of emails can it write?", answer:"Business inquiries, follow-ups, thank-you notes, apologies, introductions, cold outreach, meeting requests, complaint responses, resignation letters, and many more." },
            { question:"Does it generate subject lines?", answer:"Yes. Every generated email includes an optimized subject line designed to maximize open rates." },
            { question:"Can I customize the tone?", answer:"Yes. Choose from Formal, Friendly, Persuasive, or Urgent tones to match the situation and recipient." },
            { question:"Is the email content unique?", answer:"Yes. Each email is generated fresh based on your specific inputs, ensuring it's tailored to your situation." },
            { question:"Is the AI Email Writer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"speech-writer": {
        slug:"speech-writer",
        name:"AI Speech Writer",
        tagline:"Write compelling speeches effortlessly",
        description:"Generate powerful, audience-appropriate speeches for any occasion. From wedding toasts and graduation addresses to business presentations and keynote speeches, our AI crafts structured, engaging content with strong openings and memorable closings.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Choose Occasion", desc:"Select the type of speech—wedding, graduation, business, motivational, or custom." },
            { step: 2, title:"Add Details", desc:"Provide the topic, key points to cover, audience, and desired speech length." },
            { step: 3, title:"Generate Speech", desc:"AI creates a structured speech with an engaging opening, clear body, and memorable conclusion." },
            { step: 4, title:"Personalize", desc:"Add personal anecdotes, adjust the tone, and practice before delivering." }
        ],
        benefits: [
            { title:"Structured Format", desc:"Every speech follows proven public speaking frameworks with a hook, body, and powerful closing." },
            { title:"Any Occasion", desc:"From weddings and graduations to board meetings and TED-style talks." },
            { title:"Audience-Aware", desc:"AI adjusts vocabulary, humor, and formality based on your target audience." },
            { title:"Time-Calibrated", desc:"Speeches are calibrated to your desired duration with appropriate pacing." }
        ],
        faqs: [
            { question:"What types of speeches can it generate?", answer:"Wedding toasts, graduation speeches, business presentations, motivational talks, eulogies, award acceptance speeches, classroom presentations, and more." },
            { question:"Can I specify the speech length?", answer:"Yes. Choose from 2-minute, 5-minute, 10-minute, or custom lengths. The AI adjusts content density accordingly." },
            { question:"Will the speech sound natural?", answer:"Yes. Our AI writes in a conversational, speech-friendly style designed to be spoken aloud, not just read." },
            { question:"Can I add personal stories?", answer:"The generated speech includes placeholder sections where you can insert personal anecdotes and specific details." },
            { question:"Is the speech writer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"paragraph-generator": {
        slug:"paragraph-generator",
        name:"AI Paragraph Generator",
        tagline:"Generate well-structured paragraphs",
        description:"Generate coherent, well-structured paragraphs on any topic. Whether you need a paragraph for an essay, blog post, report, or assignment, our AI creates focused content with clear topic sentences, supporting details, and smooth transitions.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Enter Topic", desc:"Type the topic or subject you need a paragraph about." },
            { step: 2, title:"Set Parameters", desc:"Choose the tone (academic, casual, professional) and paragraph length." },
            { step: 3, title:"Generate", desc:"AI writes a focused, coherent paragraph with proper structure and flow." },
            { step: 4, title:"Use or Regenerate", desc:"Copy the paragraph or generate a new version with different angle or tone." }
        ],
        benefits: [
            { title:"Instant Drafts", desc:"Get a well-written paragraph in seconds to overcome writer's block or meet tight deadlines." },
            { title:"Any Topic", desc:"Generate paragraphs on academic subjects, business topics, creative writing, and more." },
            { title:"Proper Structure", desc:"Every paragraph includes a topic sentence, supporting details, and a concluding thought." },
            { title:"Tone Flexibility", desc:"Switch between academic, professional, conversational, and creative writing styles." }
        ],
        faqs: [
            { question:"Can I use the generated paragraph in my essay?", answer:"The generated content serves as a starting point. We recommend reviewing, personalizing, and ensuring it aligns with your assignment requirements and academic integrity policies." },
            { question:"What topics can it write about?", answer:"Virtually any topic—science, history, technology, business, literature, social issues, and more." },
            { question:"Can I control the paragraph length?", answer:"Yes. Choose short (3-4 sentences), medium (5-6 sentences), or long (7-10 sentences) paragraphs." },
            { question:"Is the content unique?", answer:"Yes. Each paragraph is generated fresh based on your specific topic and parameters." },
            { question:"Is it free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"story-generator": {
        slug:"story-generator",
        name:"AI Story Generator",
        tagline:"Create captivating stories instantly",
        description:"Generate creative stories with compelling characters, plot twists, and vivid descriptions. Perfect for creative writing exercises, children's stories, content ideas, and overcoming writer's block. Choose your genre, setting, and characters to get started.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Set the Scene", desc:"Choose a genre (fantasy, sci-fi, mystery, etc.) and provide a brief premise or characters." },
            { step: 2, title:"Customize", desc:"Select story length, point of view, and any specific elements you want included." },
            { step: 3, title:"Generate Story", desc:"AI creates a complete story with beginning, middle, and end—including dialogue and descriptions." },
            { step: 4, title:"Refine", desc:"Edit the story, add your personal touch, or regenerate specific sections." }
        ],
        benefits: [
            { title:"Multiple Genres", desc:"Fantasy, sci-fi, mystery, romance, horror, adventure—choose any genre or combine them." },
            { title:"Character Development", desc:"AI creates characters with distinct personalities, motivations, and dialogue styles." },
            { title:"Creative Inspiration", desc:"Perfect for brainstorming sessions, writing prompts, and overcoming creative blocks." },
            { title:"Adjustable Length", desc:"From flash fiction (500 words) to short stories (2,000+ words)." }
        ],
        faqs: [
            { question:"What genres are available?", answer:"Fantasy, science fiction, mystery, romance, horror, adventure, comedy, historical fiction, children's stories, and more." },
            { question:"Can I provide my own characters?", answer:"Yes. Enter character names, traits, and relationships, and the AI will incorporate them into the story." },
            { question:"How long are the generated stories?", answer:"You can choose from flash fiction (300-500 words), short stories (1,000-2,000 words), or longer narratives." },
            { question:"Can I continue a story the AI started?", answer:"Yes. Copy the generated story and use it as a prompt to extend or continue the narrative." },
            { question:"Is the story generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"cover-letter-writer": {
        slug:"cover-letter-writer",
        name:"AI Cover Letter Writer",
        tagline:"Write tailored cover letters fast",
        description:"Generate personalized, job-specific cover letters that highlight your relevant skills, experience, and enthusiasm. Our AI analyzes the job description to emphasize the qualifications that matter most, helping you stand out from other applicants.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Enter Job Details", desc:"Paste the job title, company name, and key requirements from the job listing." },
            { step: 2, title:"Add Your Background", desc:"Provide your relevant experience, skills, and achievements." },
            { step: 3, title:"Generate", desc:"AI crafts a tailored cover letter that aligns your qualifications with the job requirements." },
            { step: 4, title:"Customize & Send", desc:"Review, personalize with specific details, and submit with your application." }
        ],
        benefits: [
            { title:"Job-Specific", desc:"Each cover letter is tailored to the specific job description and company." },
            { title:"ATS-Friendly", desc:"Incorporates relevant keywords to pass Applicant Tracking System screening." },
            { title:"Professional Format", desc:"Follows standard business letter formatting with proper structure and flow." },
            { title:"Save Hours", desc:"Generate a polished cover letter in minutes instead of hours of writing and editing." }
        ],
        faqs: [
            { question:"How does it tailor the cover letter to the job?", answer:"The AI analyzes the job description you provide and matches your skills and experience to the specific requirements, emphasizing the most relevant qualifications." },
            { question:"Should I edit the generated cover letter?", answer:"Yes. While the AI creates a strong foundation, adding specific personal anecdotes and company-specific details makes the letter more authentic and compelling." },
            { question:"Does it work for all industries?", answer:"Yes. The tool generates cover letters for tech, finance, healthcare, education, marketing, engineering, and all other industries." },
            { question:"Can it write cover letters for internships?", answer:"Yes. Select 'Entry-Level' or 'Internship' as the experience level, and the AI adjusts the tone and emphasis accordingly." },
            { question:"Is the cover letter writer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"flashcard-maker": {
        slug:"flashcard-maker",
        name:"AI Flashcard Maker",
        tagline:"Create study flashcards instantly",
        description:"Transform any topic, textbook content, or notes into effective study flashcards. Our AI identifies key concepts and generates question-answer pairs optimized for spaced repetition learning, helping students retain information more efficiently.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Input Content", desc:"Paste your study material, notes, or simply enter a topic you want to learn." },
            { step: 2, title:"Set Options", desc:"Choose the number of flashcards and difficulty level (basic, intermediate, advanced)." },
            { step: 3, title:"Generate Cards", desc:"AI analyzes the content and creates targeted question-answer flashcard pairs." },
            { step: 4, title:"Study & Export", desc:"Review the flashcards on screen or export them for offline study." }
        ],
        benefits: [
            { title:"Active Recall", desc:"Flashcards leverage active recall—the most scientifically proven study technique for long-term retention." },
            { title:"Smart Extraction", desc:"AI identifies the most important concepts and creates focused, testable questions." },
            { title:"Any Subject", desc:"Works for sciences, humanities, languages, medicine, law, and all academic disciplines." },
            { title:"Time Saver", desc:"Create 50+ flashcards in seconds instead of spending hours making them manually." }
        ],
        faqs: [
            { question:"How does the AI create flashcards?", answer:"Our AI analyzes your input text and identifies key concepts, definitions, facts, and relationships. It then formulates focused questions on the front and clear, concise answers on the back of each card." },
            { question:"Can I edit the generated flashcards?", answer:"Yes. You can edit, delete, or add to any generated flashcard to perfectly match your study needs." },
            { question:"What subjects work best?", answer:"The tool works excellently for all subjects—sciences, history, languages, medicine, law, business, and more." },
            { question:"How many flashcards can I generate?", answer:"You can generate as many flashcards as you need. We recommend 20-30 cards per study session for optimal retention." },
            { question:"Is the flashcard maker free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"notes-generator": {
        slug:"notes-generator",
        name:"AI Notes Generator",
        tagline:"Generate organized study notes",
        description:"Transform lectures, textbook chapters, or raw content into well-organized, concise study notes. Our AI structures information with headings, bullet points, and key takeaways, creating notes that are perfect for exam revision and quick reference.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Input Material", desc:"Paste lecture transcripts, textbook text, or describe the topic you need notes for." },
            { step: 2, title:"Choose Format", desc:"Select the note style—bullet points, Cornell method, outline format, or mind map." },
            { step: 3, title:"Generate Notes", desc:"AI organizes the information into clear, structured notes with headings and key points." },
            { step: 4, title:"Review & Save", desc:"Review the generated notes, make edits, and save or copy for your study materials." }
        ],
        benefits: [
            { title:"Structured Organization", desc:"Notes are organized with clear headings, subheadings, and bullet points for easy scanning." },
            { title:"Key Concepts Highlighted", desc:"AI identifies and emphasizes the most important concepts, definitions, and facts." },
            { title:"Multiple Formats", desc:"Choose from bullet points, outline format, Cornell method, or summarized paragraphs." },
            { title:"Exam-Ready", desc:"Notes are structured for quick revision, highlighting what's most likely to be tested." }
        ],
        faqs: [
            { question:"What sources can I use to generate notes?", answer:"You can paste lecture transcripts, textbook passages, article text, or simply enter a topic name and the AI will generate comprehensive notes." },
            { question:"Can I choose different note-taking formats?", answer:"Yes. We support bullet-point lists, outline format, Cornell method, and summarized paragraph styles." },
            { question:"How detailed are the generated notes?", answer:"You can control the detail level—choose concise for quick review or comprehensive for in-depth study." },
            { question:"Can I edit the notes after generation?", answer:"Yes. All generated notes are fully editable so you can add personal annotations or clarifications." },
            { question:"Is the notes generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"mcq-generator": {
        slug:"mcq-generator",
        name:"AI MCQ Generator",
        tagline:"Generate multiple-choice questions",
        description:"Create well-crafted multiple-choice questions from any topic or study material. Our AI generates questions with plausible distractors, correct answers, and optional explanations—perfect for self-testing, exam preparation, and creating practice quizzes.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Input Content", desc:"Paste study material or enter a topic to generate multiple-choice questions from." },
            { step: 2, title:"Set Parameters", desc:"Choose the number of questions, difficulty level, and number of answer options." },
            { step: 3, title:"Generate MCQs", desc:"AI creates questions with plausible wrong answers and marks the correct option." },
            { step: 4, title:"Practice or Export", desc:"Take the quiz online or export the questions for offline use." }
        ],
        benefits: [
            { title:"Realistic Distractors", desc:"AI creates plausible wrong answers that test true understanding, not just recognition." },
            { title:"Adjustable Difficulty", desc:"Generate easy, medium, or hard questions to match your preparation level." },
            { title:"Answer Explanations", desc:"Each question includes an explanation of the correct answer for deeper learning." },
            { title:"Exam Simulation", desc:"Practice with questions formatted like real exams to build confidence and familiarity." }
        ],
        faqs: [
            { question:"How accurate are the generated questions?", answer:"Our AI generates high-quality questions based on the provided content. We recommend reviewing questions for your specific curriculum to ensure alignment with exam expectations." },
            { question:"Can I set the number of options per question?", answer:"Yes. Choose from 3, 4, or 5 answer options per question depending on your preference." },
            { question:"Does it provide answer explanations?", answer:"Yes. Each question includes the correct answer and an explanation of why it's right and why other options are incorrect." },
            { question:"What subjects can it generate questions for?", answer:"All subjects—science, math, history, literature, geography, computer science, medicine, and more." },
            { question:"Is the MCQ generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"quiz-generator": {
        slug:"quiz-generator",
        name:"AI Quiz Generator",
        tagline:"Create custom quizzes on any topic",
        description:"Generate comprehensive quizzes with a mix of question types—multiple choice, true/false, fill-in-the-blank, and short answer. Perfect for teachers creating assessments, students preparing for exams, or trainers building knowledge checks.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter Topic", desc:"Provide the subject matter, paste content, or describe what the quiz should cover." },
            { step: 2, title:"Configure Quiz", desc:"Set the number of questions, question types, and difficulty level." },
            { step: 3, title:"Generate Quiz", desc:"AI creates a balanced quiz with varied question types and an answer key." },
            { step: 4, title:"Take or Share", desc:"Take the quiz yourself or share it with students and colleagues." }
        ],
        benefits: [
            { title:"Mixed Question Types", desc:"Quizzes include multiple choice, true/false, fill-in-the-blank, and short answer for comprehensive testing." },
            { title:"Auto Answer Key", desc:"Every quiz comes with a complete answer key for quick grading." },
            { title:"Teacher-Friendly", desc:"Perfect for creating classroom assessments, homework assignments, and review materials." },
            { title:"Self-Study Tool", desc:"Students can generate quizzes to test their understanding before actual exams." }
        ],
        faqs: [
            { question:"What types of questions can the quiz include?", answer:"Multiple choice, true/false, fill-in-the-blank, short answer, and matching questions depending on the topic and your preferences." },
            { question:"Can teachers use this for classroom quizzes?", answer:"Absolutely. Many educators use our tool to quickly generate assessments, pop quizzes, and review materials for their classes." },
            { question:"How many questions can I generate?", answer:"You can generate quizzes with as few as 5 or as many as 100 questions per session." },
            { question:"Does it include an answer key?", answer:"Yes. Every generated quiz includes a complete answer key with explanations." },
            { question:"Is the quiz generator free?", answer:"Yes, completely free for both students and educators." }
        ]
    },"homework-solver": {
        slug:"homework-solver",
        name:"AI Homework Solver",
        tagline:"Get step-by-step homework help",
        description:"Get detailed, step-by-step solutions and explanations for homework problems across all subjects. Our AI doesn't just give answers—it explains the reasoning behind each step, helping you understand the concepts and learn how to solve similar problems independently.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter Question", desc:"Type your homework question or paste the problem you need help with." },
            { step: 2, title:"Select Subject", desc:"Choose the subject area for more accurate and contextual solutions." },
            { step: 3, title:"Get Solution", desc:"AI provides a detailed, step-by-step solution with clear explanations." },
            { step: 4, title:"Learn & Apply", desc:"Study the explanation to understand the underlying concepts for future problems." }
        ],
        benefits: [
            { title:"Step-by-Step Solutions", desc:"Every answer includes detailed steps so you understand the process, not just the final answer." },
            { title:"All Subjects", desc:"Math, science, English, history, computer science, economics, and more." },
            { title:"Learn to Learn", desc:"Explanations teach problem-solving methods you can apply to future assignments." },
            { title:"Available 24/7", desc:"Get homework help anytime—no waiting for office hours or tutoring sessions." }
        ],
        faqs: [
            { question:"Does it just give answers or explain the process?", answer:"Our tool provides complete step-by-step explanations, not just final answers. The goal is to help you understand the concept so you can solve similar problems on your own." },
            { question:"What subjects does it cover?", answer:"Math (algebra, calculus, statistics), science (physics, chemistry, biology), English, history, computer science, economics, and more." },
            { question:"Is it accurate?", answer:"Our AI provides high-quality solutions, but we recommend verifying important answers and using the tool as a learning aid, not a replacement for understanding." },
            { question:"Can I upload images of my homework?", answer:"Currently, you can type or paste your questions as text. We recommend clearly describing any diagrams or figures." },
            { question:"Is the homework solver free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"doubt-solver": {
        slug:"doubt-solver",
        name:"AI Doubt Solver",
        tagline:"Clear your academic doubts instantly",
        description:"Get instant, detailed answers to your academic questions and conceptual doubts. Whether you're stuck on a specific concept in physics, confused about a historical event, or need clarification on a mathematical theorem, our AI provides clear explanations.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Ask Your Doubt", desc:"Type your question or describe the concept you're struggling with." },
            { step: 2, title:"Select Level", desc:"Choose your academic level for appropriately detailed explanations." },
            { step: 3, title:"Get Explanation", desc:"AI provides a clear, detailed explanation with examples and analogies." },
            { step: 4, title:"Ask Follow-Ups", desc:"Still confused? Ask follow-up questions for deeper clarification." }
        ],
        benefits: [
            { title:"Instant Clarification", desc:"Get answers to conceptual doubts in seconds—no waiting for teacher availability." },
            { title:"Level-Appropriate", desc:"Explanations are tailored to your academic level—from middle school to university." },
            { title:"Examples Included", desc:"Every explanation includes practical examples and analogies for better understanding." },
            { title:"All Subjects", desc:"Covers math, science, humanities, computer science, and all academic disciplines." }
        ],
        faqs: [
            { question:"How is this different from a search engine?", answer:"Unlike search engines that return links, our AI provides a direct, structured explanation tailored to your specific question and academic level—like having a personal tutor." },
            { question:"Can I ask follow-up questions?", answer:"Yes. If the initial explanation isn't clear enough, you can rephrase your question or ask for more detail on a specific part." },
            { question:"What subjects does it cover?", answer:"All academic subjects including mathematics, physics, chemistry, biology, history, geography, English, computer science, and more." },
            { question:"Is it suitable for competitive exam preparation?", answer:"Yes. Students preparing for SAT, GRE, GMAT, and other competitive exams use our doubt solver for concept clarification." },
            { question:"Is the doubt solver free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"concept-explainer": {
        slug:"concept-explainer",
        name:"AI Concept Explainer",
        tagline:"Understand complex concepts simply",
        description:"Get clear, intuitive explanations of complex concepts from any field. Our AI breaks down difficult topics using simple language, real-world analogies, and visual examples. Perfect for students who need a different perspective on confusing textbook material.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter Concept", desc:"Type the concept, theory, or topic you want explained in simple terms." },
            { step: 2, title:"Choose Depth", desc:"Select explanation depth—overview, intermediate, or deep-dive." },
            { step: 3, title:"Get Explanation", desc:"AI explains the concept with analogies, examples, and step-by-step breakdowns." },
            { step: 4, title:"Explore Further", desc:"Ask follow-up questions or request explanations of related concepts." }
        ],
        benefits: [
            { title:"Simple Language", desc:"Complex topics explained in plain language anyone can understand, avoiding unnecessary jargon." },
            { title:"Real-World Analogies", desc:"Abstract concepts connected to everyday experiences for intuitive understanding." },
            { title:"Layered Depth", desc:"Start with a simple overview and progressively dive deeper as understanding grows." },
            { title:"Visual Examples", desc:"Explanations include diagrams, examples, and mental models for visual learners." }
        ],
        faqs: [
            { question:"What concepts can it explain?", answer:"Anything from quantum physics and calculus to philosophical theories and programming concepts. If it can be explained, our AI can break it down." },
            { question:"Can it explain at different levels?", answer:"Yes. Choose 'Explain like I'm 5' for the simplest version, 'High School' for moderate detail, or 'University' for comprehensive explanations." },
            { question:"Are the explanations accurate?", answer:"Our AI provides high-quality explanations based on established knowledge. For exam preparation, cross-reference with your textbook for curriculum-specific details." },
            { question:"Can I ask follow-up questions?", answer:"Yes. If any part of the explanation is unclear, ask for more detail on that specific aspect." },
            { question:"Is the concept explainer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"chapter-summary": {
        slug:"chapter-summary",
        name:"AI Chapter Summary",
        tagline:"Summarize textbook chapters instantly",
        description:"Get concise, comprehensive summaries of textbook chapters, academic papers, or any lengthy study material. Our AI identifies the key themes, arguments, and important details, condensing hours of reading into clear, study-ready summaries.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Input Chapter", desc:"Paste the chapter text or describe the chapter topic and key sections." },
            { step: 2, title:"Set Length", desc:"Choose summary length—brief overview, standard summary, or detailed breakdown." },
            { step: 3, title:"Generate Summary", desc:"AI creates a structured summary highlighting key themes, concepts, and takeaways." },
            { step: 4, title:"Study", desc:"Use the summary for quick revision or as a study guide for the full chapter." }
        ],
        benefits: [
            { title:"Save Reading Time", desc:"Condense a 50-page chapter into a clear, 2-page summary without missing key points." },
            { title:"Key Themes Identified", desc:"AI highlights the most important themes, arguments, and conclusions." },
            { title:"Exam-Focused", desc:"Summaries emphasize testable material—definitions, theories, and important relationships." },
            { title:"Quick Revision", desc:"Perfect for last-minute exam preparation when you need to review multiple chapters fast." }
        ],
        faqs: [
            { question:"How long are the generated summaries?", answer:"You can choose brief (1-2 paragraphs), standard (half-page), or detailed (1-2 pages) summaries depending on your needs." },
            { question:"Will the summary cover all important points?", answer:"Our AI identifies and includes the most critical concepts, definitions, arguments, and conclusions from the source material." },
            { question:"Can I summarize multiple chapters at once?", answer:"For best results, summarize one chapter at a time. This ensures more detailed and accurate coverage of each chapter's content." },
            { question:"What types of content can I summarize?", answer:"Textbook chapters, research papers, articles, lecture notes, and any academic or educational text." },
            { question:"Is the chapter summary tool free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"revision-planner": {
        slug:"revision-planner",
        name:"AI Revision Planner",
        tagline:"Plan your exam revision strategically",
        description:"Create a personalized revision schedule based on your exam dates, subjects, and confidence levels. Our AI uses spaced repetition principles to prioritize weak areas, allocate study time efficiently, and ensure comprehensive coverage before exam day.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter Exams", desc:"Add your exam subjects, dates, and your current confidence level for each topic." },
            { step: 2, title:"Set Availability", desc:"Tell us your available study hours and any days you can't study." },
            { step: 3, title:"Generate Plan", desc:"AI creates a day-by-day revision schedule with specific topics and time allocations." },
            { step: 4, title:"Follow & Adjust", desc:"Follow the plan and adjust as needed based on your progress." }
        ],
        benefits: [
            { title:"Spaced Repetition", desc:"Schedule automatically spaces review sessions for optimal long-term memory retention." },
            { title:"Priority-Based", desc:"Weak subjects get more study time while strong areas receive maintenance reviews." },
            { title:"Realistic Scheduling", desc:"Plans account for your actual available time, preventing burnout and unrealistic expectations." },
            { title:"Comprehensive Coverage", desc:"Ensures all exam topics are covered at least once before the exam date." }
        ],
        faqs: [
            { question:"How does it prioritize subjects?", answer:"The AI allocates more time to subjects where your confidence is low and spaces revision using proven spaced repetition intervals for better retention." },
            { question:"Can I add multiple exams?", answer:"Yes. Add all your exams with their dates and the planner creates an integrated study schedule that covers all subjects." },
            { question:"What if my plan needs to change?", answer:"You can adjust the plan anytime by updating your availability or progress. The AI will recalculate the schedule." },
            { question:"Does it account for breaks?", answer:"Yes. The plan includes regular breaks following the Pomodoro technique and rest days to prevent study burnout." },
            { question:"Is the revision planner free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"timetable-generator": {
        slug:"timetable-generator",
        name:"AI Timetable Generator",
        tagline:"Create optimized study timetables",
        description:"Generate balanced, realistic study timetables that fit your schedule. Our AI considers your classes, commitments, energy levels, and study preferences to create a timetable that maximizes productive study hours and maintains a healthy work-life balance.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter Schedule", desc:"Add your fixed commitments—classes, work, activities, and other obligations." },
            { step: 2, title:"Add Subjects", desc:"List the subjects you need to study and any priority preferences." },
            { step: 3, title:"Generate Timetable", desc:"AI creates an optimized weekly timetable with study blocks and breaks." },
            { step: 4, title:"Print or Save", desc:"Download or print your timetable and start following your optimized schedule." }
        ],
        benefits: [
            { title:"Balanced Schedule", desc:"Evenly distributes study across subjects while respecting your fixed commitments and energy patterns." },
            { title:"Break Management", desc:"Automatically includes breaks and free time to prevent burnout and maintain motivation." },
            { title:"Customizable", desc:"Adjust study block duration, preferred study times, and subject priorities to fit your style." },
            { title:"Weekly & Daily Views", desc:"Get both a weekly overview and detailed daily schedules." }
        ],
        faqs: [
            { question:"Can I set my preferred study times?", answer:"Yes. Specify whether you're a morning person or night owl, and the tool will schedule demanding subjects during your peak productivity hours." },
            { question:"How long are the study blocks?", answer:"Default study blocks are 45-60 minutes with 10-15 minute breaks, following the Pomodoro technique. You can customize these durations." },
            { question:"Can I exclude certain days?", answer:"Yes. Mark any days or time slots as unavailable and the timetable will work around your commitments." },
            { question:"Does it handle multiple subjects?", answer:"Yes. Add as many subjects as you need and the AI will distribute study time evenly based on your priorities." },
            { question:"Is the timetable generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"synonym-finder": {
        slug:"synonym-finder",
        name:"AI Synonym Finder",
        tagline:"Find the perfect word alternative",
        description:"Discover synonyms, related words, and contextual alternatives for any word. Our AI goes beyond basic thesaurus results by understanding context and suggesting words that maintain the original meaning while improving your writing's variety and sophistication.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Enter Word", desc:"Type the word you want to find synonyms for." },
            { step: 2, title:"See Context", desc:"Optionally provide a sentence for context-aware synonym suggestions." },
            { step: 3, title:"Browse Results", desc:"View synonyms organized by meaning, formality level, and usage context." },
            { step: 4, title:"Select & Use", desc:"Pick the best synonym and see example sentences showing proper usage." }
        ],
        benefits: [
            { title:"Context-Aware", desc:"Suggestions consider the context of your sentence, not just the isolated word meaning." },
            { title:"Organized by Tone", desc:"Synonyms grouped by formality level—casual, neutral, formal, and academic." },
            { title:"Usage Examples", desc:"Each synonym includes example sentences showing how to use it naturally." },
            { title:"Vocabulary Building", desc:"Expand your vocabulary by discovering new words and their precise nuances." }
        ],
        faqs: [
            { question:"How is this different from a regular thesaurus?", answer:"Our AI understands context. Instead of listing every possible synonym, it suggests words that actually fit the meaning and tone of your sentence." },
            { question:"Can I provide context for better results?", answer:"Yes. Entering a full sentence helps the AI suggest synonyms that fit your specific context and intended meaning." },
            { question:"Does it show word definitions?", answer:"Yes. Each synonym includes a brief definition and example sentence so you can choose the most appropriate option." },
            { question:"Is it useful for academic writing?", answer:"Absolutely. It helps diversify vocabulary in essays and papers while maintaining appropriate academic tone." },
            { question:"Is the synonym finder free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"antonym-finder": {
        slug:"antonym-finder",
        name:"AI Antonym Finder",
        tagline:"Find opposite words instantly",
        description:"Discover antonyms and opposite words for any term. Our AI provides true antonyms, near-antonyms, and contextual opposites organized by meaning and usage, helping you express contrast and create more dynamic writing.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Enter Word", desc:"Type the word you want to find antonyms for." },
            { step: 2, title:"View Antonyms", desc:"See direct antonyms, near-antonyms, and contextual opposites." },
            { step: 3, title:"Read Examples", desc:"View example sentences showing each antonym used in context." },
            { step: 4, title:"Choose & Apply", desc:"Select the best antonym for your writing needs." }
        ],
        benefits: [
            { title:"Multiple Types", desc:"Find direct antonyms, gradable antonyms, and complementary opposites for nuanced writing." },
            { title:"Context Examples", desc:"Each antonym includes usage examples to ensure you apply it correctly." },
            { title:"Writing Enhancement", desc:"Use antonyms to create contrast, emphasis, and more dynamic prose." },
            { title:"Exam Preparation", desc:"Essential tool for vocabulary sections of standardized tests like SAT, GRE, and GMAT." }
        ],
        faqs: [
            { question:"Does every word have an antonym?", answer:"Not every word has a direct antonym. For words without perfect opposites, our AI provides near-antonyms and words with contrasting meanings." },
            { question:"Can it help with exam preparation?", answer:"Yes. Antonym questions are common in standardized tests (SAT, GRE, GMAT). Practice with our tool to improve your vocabulary skills." },
            { question:"Does it show different meanings?", answer:"Yes. For words with multiple meanings, antonyms are grouped by each definition so you find the right opposite." },
            { question:"Is it useful for creative writing?", answer:"Absolutely. Using antonyms effectively creates contrast, irony, and emphasis in creative and persuasive writing." },
            { question:"Is the antonym finder free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"one-word-substitution": {
        slug:"one-word-substitution",
        name:"One Word Substitution",
        tagline:"Replace phrases with single words",
        description:"Find the single word that replaces an entire phrase or description. Essential for competitive exams, vocabulary building, and writing concisely. Our AI matches descriptions to precise words, making your communication more professional and efficient.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Enter Phrase", desc:"Type a descriptive phrase you want to replace with a single word." },
            { step: 2, title:"Get Results", desc:"AI identifies the best single-word substitution with its definition." },
            { step: 3, title:"Learn Usage", desc:"See example sentences and etymology for deeper understanding." },
            { step: 4, title:"Practice", desc:"Test yourself with similar phrases to build your vocabulary." }
        ],
        benefits: [
            { title:"Exam Essential", desc:"One-word substitution is a key section in competitive exams like SSC, Banking, UPSC, and CAT." },
            { title:"Concise Writing", desc:"Replace wordy phrases with precise single words for more professional communication." },
            { title:"Vocabulary Building", desc:"Learn new words and their meanings through the association with familiar descriptions." },
            { title:"Etymology Included", desc:"Understanding word roots helps you guess meanings of unfamiliar words." }
        ],
        faqs: [
            { question:"What is one word substitution?", answer:"It's the practice of replacing a descriptive phrase with a single word. For example, 'a person who studies stars' can be substituted with 'astronomer.'" },
            { question:"Is this important for competitive exams?", answer:"Yes. One-word substitution questions appear frequently in SSC, Banking, UPSC, CAT, and other competitive exams." },
            { question:"Does it provide word etymology?", answer:"Yes. Understanding the Greek and Latin roots of words helps you deduce meanings of unfamiliar words in exams." },
            { question:"Can I use it for writing improvement?", answer:"Absolutely. Replacing long phrases with precise words makes your writing more concise and professional." },
            { question:"Is the tool free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"idioms-phrases": {
        slug:"idioms-phrases",
        name:"Idioms & Phrases",
        tagline:"Learn idioms and their meanings",
        description:"Explore a comprehensive collection of idioms and phrases with clear meanings, origins, and usage examples. Essential for English learners, competitive exam preparation, and anyone looking to add color and expressiveness to their communication.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Search or Browse", desc:"Search for a specific idiom or browse by category (time, money, emotions, etc.)." },
            { step: 2, title:"Read Meaning", desc:"Get a clear explanation of what the idiom means in modern usage." },
            { step: 3, title:"See Examples", desc:"View the idiom used in real sentences to understand context and tone." },
            { step: 4, title:"Learn Origin", desc:"Discover the historical origin of the phrase for deeper understanding." }
        ],
        benefits: [
            { title:"Clear Explanations", desc:"Every idiom includes a simple, clear meaning that's easy to understand and remember." },
            { title:"Real-World Usage", desc:"Example sentences show how native speakers actually use these expressions." },
            { title:"Historical Origins", desc:"Learn where idioms come from—it makes them easier to remember." },
            { title:"Exam Preparation", desc:"Comprehensive coverage of idioms tested in competitive exams and English proficiency tests." }
        ],
        faqs: [
            { question:"How many idioms are available?", answer:"Our database covers hundreds of common English idioms and phrases, categorized by theme and usage frequency." },
            { question:"Are these useful for competitive exams?", answer:"Yes. Idioms and phrases are commonly tested in SSC, Banking, UPSC, IELTS, TOEFL, and other competitive examinations." },
            { question:"Can I search for specific idioms?", answer:"Yes. Search by keyword, theme, or browse alphabetically to find the idiom you're looking for." },
            { question:"Does it explain the origin of idioms?", answer:"Yes. Many idioms include historical context and origin stories that help with memorization and deeper understanding." },
            { question:"Is the tool free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"vocabulary-builder": {
        slug:"vocabulary-builder",
        name:"AI Vocabulary Builder",
        tagline:"Expand your word power",
        description:"Build a stronger vocabulary with AI-powered word learning. Get daily word recommendations, contextual examples, memory aids, and practice exercises tailored to your current level. Perfect for exam preparation, professional development, and lifelong learning.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Set Your Level", desc:"Choose your starting level—beginner, intermediate, advanced, or exam-specific." },
            { step: 2, title:"Learn Words", desc:"Get new words with definitions, pronunciations, and usage examples." },
            { step: 3, title:"Practice", desc:"Test your knowledge with fill-in-the-blank exercises and multiple choice quizzes." },
            { step: 4, title:"Track Progress", desc:"See which words you've mastered and which need more practice." }
        ],
        benefits: [
            { title:"Contextual Learning", desc:"Learn words in context with example sentences, not just isolated definitions." },
            { title:"Memory Techniques", desc:"Each word includes mnemonics, word roots, and associations to aid memorization." },
            { title:"Level-Appropriate", desc:"Words are selected based on your current level, gradually increasing in difficulty." },
            { title:"Exam-Ready", desc:"Focused word lists for GRE, SAT, IELTS, TOEFL, and other standardized tests." }
        ],
        faqs: [
            { question:"How does the AI select words for me?", answer:"The AI considers your current level, learning goals (general improvement or specific exam), and previously learned words to recommend the most useful new vocabulary." },
            { question:"Does it help with GRE/SAT vocabulary?", answer:"Yes. We have curated word lists specifically for GRE, SAT, IELTS, TOEFL, and other standardized tests." },
            { question:"How many words can I learn?", answer:"There is no limit. We recommend learning 5-10 new words daily for sustainable vocabulary growth." },
            { question:"Does it include pronunciation?", answer:"Yes. Each word includes phonetic transcription and usage notes to help with correct pronunciation." },
            { question:"Is the vocabulary builder free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"text-simplifier": {
        slug:"text-simplifier",
        name:"AI Text Simplifier",
        tagline:"Make complex text easy to read",
        description:"Transform complex, jargon-heavy text into clear, easy-to-understand language. Our AI rewrites content at your chosen reading level while preserving the original meaning—perfect for making technical documents, legal text, and academic papers accessible to everyone.",
        category:"Language Tools",
        howItWorks: [
            { step: 1, title:"Paste Text", desc:"Enter the complex text you want to simplify." },
            { step: 2, title:"Choose Level", desc:"Select the target reading level—elementary, middle school, high school, or general audience." },
            { step: 3, title:"Simplify", desc:"AI rewrites the text in simpler language while preserving key meaning." },
            { step: 4, title:"Review", desc:"Compare the original and simplified versions side by side." }
        ],
        benefits: [
            { title:"Preserve Meaning", desc:"Core ideas and important nuances are maintained even in the simplified version." },
            { title:"Adjustable Level", desc:"Choose exactly how simple you need the text—from 5th grade to professional level." },
            { title:"Accessibility", desc:"Make content accessible to ESL learners, younger audiences, and non-specialist readers." },
            { title:"Side-by-Side View", desc:"Compare original and simplified versions to ensure accuracy." }
        ],
        faqs: [
            { question:"Will simplifying change the meaning?", answer:"Our AI preserves the core meaning while replacing complex vocabulary and sentence structures with simpler alternatives. Always review the output for accuracy." },
            { question:"What types of text can I simplify?", answer:"Academic papers, legal documents, medical reports, technical documentation, news articles, and any text with complex language." },
            { question:"Can I choose the reading level?", answer:"Yes. Select from elementary (grade 3-5), middle school, high school, or general audience reading levels." },
            { question:"Is it useful for ESL learners?", answer:"Absolutely. ESL students and teachers frequently use text simplification to make English content more accessible." },
            { question:"Is the text simplifier free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"case-converter": {
        slug:"case-converter",
        name:"Case Converter",
        tagline:"Convert text between cases instantly",
        description:"Convert text between uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and more. Essential for writers, developers, and content creators who need consistent text formatting across documents and code.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Paste Text", desc:"Enter or paste the text you want to convert." },
            { step: 2, title:"Select Case", desc:"Choose the target case style from 10+ options including Title Case, UPPER, lower, and more." },
            { step: 3, title:"Convert", desc:"Text is instantly converted to your chosen case style." },
            { step: 4, title:"Copy", desc:"Copy the converted text with one click and paste it wherever you need." }
        ],
        benefits: [
            { title:"10+ Case Styles", desc:"Upper, lower, title, sentence, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more." },
            { title:"Developer-Friendly", desc:"Programming-specific cases like camelCase, snake_case, and CONSTANT_CASE for coding conventions." },
            { title:"Instant Conversion", desc:"Convert entire paragraphs instantly—no need to retype or manually change each character." },
            { title:"One-Click Copy", desc:"Copy converted text to clipboard with a single click." }
        ],
        faqs: [
            { question:"What case styles are available?", answer:"UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and alternating case." },
            { question:"Can I convert long paragraphs?", answer:"Yes. There is no length limit. Paste entire documents and convert them instantly." },
            { question:"Is it useful for programming?", answer:"Yes. Developers use it to convert variable names between camelCase, snake_case, PascalCase, and other coding conventions." },
            { question:"Does it handle special characters?", answer:"Yes. Special characters, numbers, and punctuation are preserved during conversion." },
            { question:"Is the case converter free?", answer:"Yes, completely free with unlimited conversions." }
        ]
    },"character-counter": {
        slug:"character-counter",
        name:"Character Counter",
        tagline:"Count characters, words, and more",
        description:"Count characters, words, sentences, and paragraphs in your text instantly. Track your writing against platform limits for Twitter, Instagram, Google Ads, and meta descriptions. Essential for content creators, marketers, and SEO professionals.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Enter Text", desc:"Type or paste your text into the counter." },
            { step: 2, title:"See Stats", desc:"Instantly see character count, word count, sentence count, and paragraph count." },
            { step: 3, title:"Check Limits", desc:"Compare your count against platform-specific character limits." },
            { step: 4, title:"Optimize", desc:"Adjust your text to fit within required limits while maintaining your message." }
        ],
        benefits: [
            { title:"Real-Time Counting", desc:"Stats update instantly as you type—no need to click a button." },
            { title:"Platform Limits", desc:"Built-in reference for Twitter (280), Instagram (2,200), meta titles (60), and meta descriptions (160)." },
            { title:"Multiple Metrics", desc:"Characters (with/without spaces), words, sentences, paragraphs, and estimated reading time." },
            { title:"Reading Time", desc:"Estimated reading time helps you gauge content length for your audience." }
        ],
        faqs: [
            { question:"What does it count?", answer:"Characters (with and without spaces), words, sentences, paragraphs, and estimated reading time based on average reading speed." },
            { question:"Does it update in real time?", answer:"Yes. All counts update instantly as you type or paste text—no need to click a button." },
            { question:"What are common platform character limits?", answer:"Twitter: 280 characters, Instagram bio: 150, Instagram caption: 2,200, Meta title: 60, Meta description: 160, Google Ads headline: 30." },
            { question:"Can I use it for SEO?", answer:"Yes. Track meta title and description lengths to ensure they display properly in search results." },
            { question:"Is the character counter free?", answer:"Yes, completely free with unlimited use." }
        ]
    },"word-counter": {
        slug:"word-counter",
        name:"Word Counter",
        tagline:"Count words and analyze text",
        description:"Count words accurately and get detailed text analytics including reading time, speaking time, keyword density, and readability scores. An essential tool for students meeting essay requirements, bloggers optimizing content, and professionals crafting precise communications.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Input Text", desc:"Type, paste, or upload your text into the word counter." },
            { step: 2, title:"View Count", desc:"See accurate word count, character count, and paragraph count instantly." },
            { step: 3, title:"Analyze", desc:"Review reading time, speaking time, and readability metrics." },
            { step: 4, title:"Optimize", desc:"Use insights to adjust your content length and complexity." }
        ],
        benefits: [
            { title:"Accurate Count", desc:"Precise word counting that handles hyphens, contractions, and special characters correctly." },
            { title:"Reading & Speaking Time", desc:"Estimated reading time (238 wpm) and speaking time (130 wpm) for content planning." },
            { title:"Keyword Density", desc:"See which words appear most frequently—useful for SEO and avoiding repetition." },
            { title:"Readability Score", desc:"Flesch-Kincaid grade level helps you write for your target audience." }
        ],
        faqs: [
            { question:"How is word count calculated?", answer:"Words are counted by splitting text on spaces and line breaks. Hyphenated words count as one word, and contractions count as one word." },
            { question:"Does it calculate reading time?", answer:"Yes. Reading time is based on an average reading speed of 238 words per minute, and speaking time on 130 words per minute." },
            { question:"Can it check keyword density?", answer:"Yes. The tool shows the frequency and percentage of each unique word, helping with SEO optimization and avoiding overuse." },
            { question:"What is the readability score?", answer:"The Flesch-Kincaid grade level indicates the US school grade level needed to understand your text. Lower numbers mean easier reading." },
            { question:"Is the word counter free?", answer:"Yes, completely free with unlimited use." }
        ]
    },"linkedin-optimizer": {
        slug:"linkedin-optimizer",
        name:"AI LinkedIn Optimizer",
        tagline:"Optimize your LinkedIn profile",
        description:"Transform your LinkedIn profile into a recruiter magnet. Our AI analyzes your current profile and generates optimized headlines, summaries, experience descriptions, and skill recommendations that maximize your visibility in recruiter searches and attract more opportunities.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Enter Profile Info", desc:"Provide your current role, industry, key skills, and career goals." },
            { step: 2, title:"Choose Focus", desc:"Select your goal—attract recruiters, build thought leadership, or network effectively." },
            { step: 3, title:"Generate Optimizations", desc:"AI creates an optimized headline, summary, and experience descriptions with relevant keywords." },
            { step: 4, title:"Apply Changes", desc:"Copy the optimized content and update your LinkedIn profile." }
        ],
        benefits: [
            { title:"Keyword Optimized", desc:"Incorporates industry-specific keywords that recruiters actually search for on LinkedIn." },
            { title:"Compelling Headlines", desc:"Create attention-grabbing headlines that go beyond just your job title." },
            { title:"Professional Summary", desc:"Generate a powerful summary that tells your career story and highlights your value proposition." },
            { title:"More Profile Views", desc:"Optimized profiles typically see 3-5x more recruiter views and connection requests." }
        ],
        faqs: [
            { question:"How does LinkedIn optimization work?", answer:"Our AI identifies the keywords, phrases, and formatting patterns that LinkedIn's algorithm and recruiters prioritize, then crafts your profile content to maximize visibility and engagement." },
            { question:"Will it make my profile sound generic?", answer:"No. The AI uses your specific experience and achievements to create unique, personalized content that sounds authentic." },
            { question:"How long should a LinkedIn summary be?", answer:"We recommend 3-5 paragraphs (200-300 words) for maximum impact. The AI generates summaries within this optimal range." },
            { question:"Does it help with the headline?", answer:"Yes. We generate multiple headline options that go beyond your job title to include keywords and value propositions." },
            { question:"Is the LinkedIn optimizer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"resume-bullets": {
        slug:"resume-bullets",
        name:"AI Resume Bullet Points",
        tagline:"Write impactful resume bullets",
        description:"Generate powerful, quantified resume bullet points that showcase your achievements using the proven STAR method. Our AI transforms vague job descriptions into compelling, action-oriented statements that grab recruiter attention and pass ATS screening.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Enter Role", desc:"Provide your job title, company, and key responsibilities or achievements." },
            { step: 2, title:"Add Details", desc:"Include any metrics, numbers, or specific outcomes you achieved." },
            { step: 3, title:"Generate Bullets", desc:"AI creates multiple impactful bullet points using strong action verbs and quantified results." },
            { step: 4, title:"Select & Use", desc:"Choose the best bullets and add them to your resume." }
        ],
        benefits: [
            { title:"Action-Oriented", desc:"Every bullet starts with a strong action verb that demonstrates leadership and initiative." },
            { title:"Quantified Results", desc:"AI helps you quantify achievements with percentages, dollar amounts, and metrics." },
            { title:"ATS-Optimized", desc:"Bullet points include industry keywords that pass Applicant Tracking System screening." },
            { title:"STAR Method", desc:"Structured using the Situation-Task-Action-Result framework preferred by recruiters." }
        ],
        faqs: [
            { question:"What makes a good resume bullet point?", answer:"Strong bullet points start with an action verb, describe a specific achievement, and include a quantified result. Our AI follows this proven formula." },
            { question:"Do I need to provide metrics?", answer:"If you have specific numbers (revenue, team size, percentages), include them. If not, the AI can help you estimate and frame your impact." },
            { question:"How many bullet points per job?", answer:"We recommend 3-6 bullet points per position, focusing on your most impactful achievements." },
            { question:"Does it work for all industries?", answer:"Yes. The tool generates relevant bullets for tech, finance, healthcare, marketing, engineering, education, and all other fields." },
            { question:"Is the resume bullet generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"interview-generator": {
        slug:"interview-generator",
        name:"AI Interview Questions",
        tagline:"Prepare for job interviews",
        description:"Generate realistic interview questions and model answers for any job role. Our AI creates behavioral, technical, and situational questions based on the specific position, helping you prepare confidently and reduce interview anxiety.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Enter Job Details", desc:"Provide the job title, industry, and company type you're interviewing for." },
            { step: 2, title:"Select Question Types", desc:"Choose from behavioral, technical, situational, or mixed question formats." },
            { step: 3, title:"Generate Questions", desc:"AI creates realistic interview questions with detailed model answers." },
            { step: 4, title:"Practice", desc:"Use the questions to practice your responses and build confidence." }
        ],
        benefits: [
            { title:"Role-Specific", desc:"Questions tailored to your specific job title and industry for realistic preparation." },
            { title:"Model Answers", desc:"Each question includes a detailed sample answer using the STAR method." },
            { title:"Multiple Formats", desc:"Behavioral, technical, situational, and competency-based questions covered." },
            { title:"Confidence Builder", desc:"Practicing with realistic questions significantly reduces interview anxiety." }
        ],
        faqs: [
            { question:"Are the questions realistic?", answer:"Yes. Our AI generates questions commonly asked in real interviews for the specific role and industry you specify." },
            { question:"Does it provide sample answers?", answer:"Yes. Each question includes a model answer structured using the STAR method (Situation, Task, Action, Result)." },
            { question:"Can I prepare for specific companies?", answer:"Yes. Mention the company name and the AI will adjust questions to reflect that company's known interview style and values." },
            { question:"Does it cover technical interviews?", answer:"Yes. For technical roles, the tool generates relevant technical questions alongside behavioral ones." },
            { question:"Is the interview generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"goal-planner": {
        slug:"goal-planner",
        name:"AI Goal Planner",
        tagline:"Plan and achieve your goals",
        description:"Transform vague goals into actionable, achievable plans. Our AI uses the SMART framework to break down your objectives into specific milestones, daily habits, and measurable checkpoints, keeping you motivated and on track toward success.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Define Goal", desc:"Describe your goal—career advancement, fitness, learning, financial, or personal." },
            { step: 2, title:"Set Timeline", desc:"Choose your target completion date and available time commitment." },
            { step: 3, title:"Generate Plan", desc:"AI creates a detailed action plan with milestones, habits, and deadlines." },
            { step: 4, title:"Track Progress", desc:"Follow your plan and check off milestones as you complete them." }
        ],
        benefits: [
            { title:"SMART Framework", desc:"Goals are structured to be Specific, Measurable, Achievable, Relevant, and Time-bound." },
            { title:"Milestone Breakdown", desc:"Large goals broken into weekly and daily actionable steps to prevent overwhelm." },
            { title:"Habit Formation", desc:"Identifies daily habits that compound toward your larger goal over time." },
            { title:"Any Goal Type", desc:"Career, fitness, financial, educational, personal development—any goal you want to achieve." }
        ],
        faqs: [
            { question:"What types of goals can I plan?", answer:"Any goal—career advancement, learning a new skill, fitness and health, financial targets, personal development, business growth, and more." },
            { question:"How detailed is the plan?", answer:"The AI creates a comprehensive plan with specific milestones, daily actions, weekly checkpoints, and measurable success criteria." },
            { question:"Can I adjust the timeline?", answer:"Yes. Update your target date or time commitment and the AI will recalculate your plan accordingly." },
            { question:"Does it help with accountability?", answer:"Yes. The milestone structure and daily checkpoints create a built-in accountability system." },
            { question:"Is the goal planner free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"todo-list-generator": {
        slug:"todo-list-generator",
        name:"AI To-Do List Generator",
        tagline:"Create organized to-do lists",
        description:"Generate comprehensive, prioritized to-do lists for any project, event, or daily routine. Our AI breaks down complex tasks into manageable steps, assigns priorities, and estimates time—helping you stay organized and productive.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Describe Task", desc:"Enter your project, event, or objective that needs to be broken into tasks." },
            { step: 2, title:"Set Priorities", desc:"Indicate deadlines and which aspects are most important." },
            { step: 3, title:"Generate List", desc:"AI creates an organized, prioritized task list with time estimates." },
            { step: 4, title:"Execute", desc:"Check off tasks as you complete them and stay on track." }
        ],
        benefits: [
            { title:"Smart Breakdown", desc:"Complex projects automatically broken into specific, actionable sub-tasks." },
            { title:"Priority Ranking", desc:"Tasks ranked by importance and urgency so you know what to tackle first." },
            { title:"Time Estimates", desc:"Each task includes an estimated completion time for better planning." },
            { title:"Any Context", desc:"Works for work projects, event planning, daily routines, travel prep, and more." }
        ],
        faqs: [
            { question:"What can I create to-do lists for?", answer:"Anything—work projects, event planning, moving checklists, travel preparation, daily routines, meal planning, and more." },
            { question:"Does it prioritize tasks?", answer:"Yes. Tasks are automatically ranked by importance and urgency, helping you focus on what matters most." },
            { question:"Can I customize the generated list?", answer:"Yes. Add, remove, reorder, or edit any tasks after generation." },
            { question:"Does it estimate time for each task?", answer:"Yes. Each task includes an estimated completion time to help you plan your day effectively." },
            { question:"Is the to-do list generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"formula-generator": {
        slug:"formula-generator",
        name:"AI Formula Generator",
        tagline:"Generate Excel and math formulas",
        description:"Generate Excel, Google Sheets, and mathematical formulas from plain English descriptions. Simply describe what you want to calculate, and our AI writes the exact formula with explanations. Stop struggling with complex nested functions and let AI handle the syntax.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Describe Calculation", desc:"Explain what you want to calculate in plain English." },
            { step: 2, title:"Choose Platform", desc:"Select Excel, Google Sheets, or mathematical notation." },
            { step: 3, title:"Generate Formula", desc:"AI writes the exact formula with proper syntax and cell references." },
            { step: 4, title:"Copy & Apply", desc:"Copy the formula and paste it into your spreadsheet or document." }
        ],
        benefits: [
            { title:"Plain English Input", desc:"No need to memorize function names—just describe what you want in plain language." },
            { title:"Excel & Sheets", desc:"Generates formulas compatible with Microsoft Excel, Google Sheets, and LibreOffice Calc." },
            { title:"Formula Explanation", desc:"Each formula includes a step-by-step breakdown of how it works." },
            { title:"Complex Functions", desc:"Handles VLOOKUP, INDEX-MATCH, nested IFs, array formulas, and more." }
        ],
        faqs: [
            { question:"What types of formulas can it generate?", answer:"Any spreadsheet formula—VLOOKUP, INDEX-MATCH, SUMIFS, nested IFs, array formulas, date calculations, financial functions, and mathematical formulas." },
            { question:"Does it work for Google Sheets?", answer:"Yes. You can choose between Excel and Google Sheets syntax, as some functions differ between platforms." },
            { question:"Will it explain the formula?", answer:"Yes. Every generated formula includes a plain-English explanation of how each part works." },
            { question:"Can it handle complex nested formulas?", answer:"Yes. The AI excels at nested IF statements, VLOOKUP within IFERROR, and other complex multi-function formulas." },
            { question:"Is the formula generator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"diagram-explainer": {
        slug:"diagram-explainer",
        name:"AI Diagram Explainer",
        tagline:"Understand diagrams and charts",
        description:"Get clear, detailed explanations of diagrams, charts, flowcharts, and visual data representations. Our AI interprets the components, relationships, and patterns in visual content, making complex diagrams accessible and easy to understand.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Upload Diagram", desc:"Upload an image of the diagram, chart, or visual you want explained." },
            { step: 2, title:"Select Type", desc:"Choose the diagram type—flowchart, graph, circuit, anatomy, process diagram, etc." },
            { step: 3, title:"Get Explanation", desc:"AI analyzes the visual and provides a detailed textual explanation." },
            { step: 4, title:"Ask Questions", desc:"Ask follow-up questions about specific parts of the diagram." }
        ],
        benefits: [
            { title:"Visual to Text", desc:"Converts complex visual information into clear, readable explanations." },
            { title:"All Diagram Types", desc:"Flowcharts, circuit diagrams, anatomy charts, graphs, process maps, and more." },
            { title:"Component Breakdown", desc:"Each element of the diagram is identified and its role explained." },
            { title:"Study Aid", desc:"Perfect for understanding textbook diagrams during exam preparation." }
        ],
        faqs: [
            { question:"What types of diagrams can it explain?", answer:"Flowcharts, organizational charts, circuit diagrams, anatomy diagrams, graphs, pie charts, process diagrams, UML diagrams, and more." },
            { question:"Do I need to upload an image?", answer:"You can upload an image or describe the diagram in text. Both approaches generate detailed explanations." },
            { question:"How detailed is the explanation?", answer:"The AI identifies each component, explains relationships between elements, and describes the overall purpose and flow of the diagram." },
            { question:"Is it useful for exam preparation?", answer:"Yes. Many students use it to understand complex textbook diagrams in biology, physics, chemistry, and engineering." },
            { question:"Is the diagram explainer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },"age-calculator": {
        slug:"age-calculator",
        name:"Age Calculator",
        tagline:"Calculate exact age instantly",
        description:"Calculate your exact age in years, months, days, hours, and even seconds. Find the precise time difference between any two dates, determine your age on a future date, or calculate the age gap between two people. A versatile date calculation tool for all needs.",
        category:"Utility Tools",
        howItWorks: [
            { step: 1, title:"Enter Birth Date", desc:"Select or type your date of birth using the date picker." },
            { step: 2, title:"Choose End Date", desc:"Use today's date or select a custom date to calculate your age at that point." },
            { step: 3, title:"Calculate", desc:"Instantly see your exact age broken down into years, months, days, hours, and minutes." },
            { step: 4, title:"Explore More", desc:"See fun facts like your next birthday, total days alive, and zodiac sign." }
        ],
        benefits: [
            { title:"Precision", desc:"Calculate age down to years, months, days, hours, minutes, and seconds." },
            { title:"Date Difference", desc:"Find the exact time difference between any two dates for planning and record-keeping." },
            { title:"Multiple Formats", desc:"See your age expressed in total days, weeks, months, and hours lived." },
            { title:"Fun Facts", desc:"Discover your zodiac sign, birth day of the week, and countdown to next birthday." }
        ],
        faqs: [
            { question:"How accurate is the age calculation?", answer:"The calculator accounts for leap years, varying month lengths, and timezone considerations for precise age calculation down to the second." },
            { question:"Can I calculate age between two custom dates?", answer:"Yes. Enter any start and end dates to find the exact time difference between them." },
            { question:"Does it account for leap years?", answer:"Yes. The calculator correctly handles leap years in all calculations for perfect accuracy." },
            { question:"Can I find out what day I was born on?", answer:"Yes. Enter your birth date and the tool shows you the day of the week you were born." },
            { question:"Is the age calculator free?", answer:"Yes, completely free with unlimited calculations." }
        ]
    },"plagiarism-checker": {
        slug:"plagiarism-checker",
        name:"AI Writing Detector",
        tagline:"Detect AI writing patterns and improve originality",
        description:"Scan essays and articles for AI-generated footprints, robotic phrasing, and generic structure. Get a clear originality assessment plus practical humanization tips so your writing sounds natural, authentic, and ready to submit.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title:"Paste Your Text", desc:"Paste the essay, article, or paragraph you want analyzed into the editor." },
            { step: 2, title:"AI Pattern Scan", desc:"Our model checks for repetitive structure, low burstiness, common AI buzzwords, and derivative phrasing." },
            { step: 3, title:"Review the Score", desc:"See an estimated AI-likelihood assessment with a detailed breakdown of what looks robotic." },
            { step: 4, title:"Humanize & Improve", desc:"Follow actionable rewrite tips to make the text more natural and original." }
        ],
        benefits: [
            { title:"AI Footprint Detection", desc:"Spot patterns typical of machine-generated writing before you submit." },
            { title:"Actionable Feedback", desc:"Get specific rewrite suggestions instead of a vague score alone." },
            { title:"Student-Friendly", desc:"Ideal for essays, reports, and assignments that need a human voice." },
            { title:"Free & Private", desc:"No account required to start. Content is processed for your session, not sold." }
        ],
        faqs: [
            { question:"Is this a traditional plagiarism database checker?", answer:"It focuses on AI-writing patterns and originality signals in the text you paste. For academic integrity, still cite sources and follow your institution’s policies." },
            { question:"How accurate is the AI detection estimate?", answer:"It is an estimate based on stylistic patterns, not a legal proof of authorship. Use it as a writing coach to improve natural flow." },
            { question:"What text length works best?", answer:"Paragraphs of at least 100–150 words give more reliable pattern analysis than very short snippets." },
            { question:"Will it rewrite my essay for me?", answer:"It explains what looks robotic and how to humanize it. You stay in control of the final wording." },
            { question:"Is the plagiarism checker free?", answer:"Yes. Free daily AI use is included; Pro is optional for higher limits and premium models." }
        ]
    },"youtube-summarizer": {
        slug:"youtube-summarizer",
        name:"YouTube Video Summarizer",
        tagline:"Summarize any YouTube video in minutes",
        description:"Paste a YouTube URL to pull the transcript and get a clear, structured AI summary of the video. Perfect for lectures, tutorials, podcasts, and long-form content when you need key takeaways fast.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Paste Video URL", desc:"Copy the full YouTube link of the video you want summarized." },
            { step: 2, title:"Fetch Transcript", desc:"We retrieve available captions/transcript text for that video." },
            { step: 3, title:"AI Summary", desc:"The transcript is condensed into a structured overview with main points." },
            { step: 4, title:"Study & Share", desc:"Copy or download the summary for notes, revision, or team updates." }
        ],
        benefits: [
            { title:"Save Hours", desc:"Extract the core message of long videos without watching every minute." },
            { title:"Study-Ready Format", desc:"Structured summaries work well as lecture notes and revision sheets." },
            { title:"Works From URL", desc:"No downloads or extensions required—just paste the link." },
            { title:"Free to Start", desc:"Use it without an account; free daily AI allowance included." }
        ],
        faqs: [
            { question:"Does every YouTube video work?", answer:"Videos need available captions or a transcript. Private, restricted, or caption-less videos may not process." },
            { question:"How long can the video be?", answer:"Longer videos are summarized from the available transcript (length limits may apply for performance)." },
            { question:"Is the summary a replacement for watching?", answer:"It is a fast overview. For exams or critical decisions, verify important details in the original video." },
            { question:"Do you store the video content?", answer:"Transcript text is processed to generate your summary for the session; we do not build a public archive of your URLs." },
            { question:"Is the YouTube summarizer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
        ]
    },
};

/** Display string for marketing copy, e.g."47+" — always derived from real catalog size. */
export const TOOL_COUNT_LABEL =`${Object.keys(toolsData).length}+`;

export function getToolData(slug: string): ToolData | null {
    const rawData = toolsData[slug];
    if (!rawData) return null;

    // Merge FAQs from TOOL_FAQS
    const worldclassFAQs = TOOL_FAQS[slug] || [];
    const mergedFAQs = [...rawData.faqs];
    const existingQuestions = new Set(mergedFAQs.map(f => f.question.toLowerCase().trim()));

    for (const faq of worldclassFAQs) {
        const qLower = faq.question.toLowerCase().trim();
        if (!existingQuestions.has(qLower)) {
            mergedFAQs.push(faq);
            existingQuestions.add(qLower);
        }
    }

    return {
        ...rawData,
        faqs: mergedFAQs
    };
}

/** Total number of tools — single source of truth so marketing copy never drifts. */
export const TOOL_COUNT = Object.keys(toolsData).length;

/** All tool slugs, derived from the data so the sitemap/nav can't drift. */
export function getAllToolSlugs(): string[] {
    return Object.keys(toolsData);
}

/** All tool entries as { slug, data } pairs. */
export function getAllTools(): { slug: string; data: ToolData }[] {
    return Object.entries(toolsData).map(([slug, data]) => ({ slug, data }));
}

