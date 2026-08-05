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
        tagline:"Summarize Any Article or Essay Free – No Signup",
        description:"Summarize any article or essay free—no signup. Paste long text and get a brief, medium, or detailed summary that keeps the main ideas. Free article summarizer for students and professionals who need clarity fast.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Paste the text', desc: 'Drop an article, essay draft, report, or chapter section into the editor.' },
            { step: 2, title: 'Pick summary length', desc: 'Choose Brief (TL;DR), Medium, or Detailed depending on how much depth you need.' },
            { step: 3, title: 'Generate summary', desc: 'AI compresses key claims and supporting points into a readable overview.' },
            { step: 4, title: 'Verify against source', desc: 'Skim the original for quotes and numbers before you cite or decide.' },
            { step: 5, title: 'Study next step', desc: 'Send insights into Notes Generator or Flashcard Maker for revision.' }
        ],
        benefits: [
            { title:"Summarize articles free, fast", desc:"Cut reading time when you only need the core argument first." },
            { title:"Length you control", desc:"Brief for triage, detailed when you will study the ideas further." },
            { title:"Student-ready workflow", desc:"Great before class responses, literature skims, and revision packs." },
            { title:"No signup to start", desc:"Free text summarizer access without an account wall." }
        ],
        faqs: [
            { question:"Can I summarize an article free with no signup?", answer:"Yes. Paste text into ToolNova’s summarizer and start without creating an account. Free daily AI use is included." },
            { question:"How do I summarize an essay online free?", answer:"Paste the essay or a section, choose Medium or Detailed, generate, then check that the summary still matches your thesis." },
            { question:"Should I cite a summary without reading the source?", answer:"No. Use summaries to triage reading, then verify claims in the original before citing." },
            { question:"What length options exist?", answer:"Brief (TL;DR), Medium (standard), and Detailed (more comprehensive)." },
            { question:"Does it work for long documents?", answer:"Yes—summarize in sections for research papers or books for better accuracy." },
            { question:"Is my text stored?", answer:"Text is processed for the request. See our Privacy Policy for details; we do not treat your drafts as a public content library." }
        ]
    },"paraphraser": {
        slug:"paraphraser",
        name:"Paraphrasing Tool",
        tagline:"Paraphrase Essay Without Changing Meaning – Free, No Login",
        description:"Paraphrase essays, paragraphs, and sentences without changing meaning. This free paraphrasing tool rewrites text with Standard, Fluency, or Creative modes so students and writers can rephrase online without a login wall—always cite sources when ideas come from others.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Paste the paragraph', desc: 'Drop in 1–2 paragraphs (or up to a few hundred words) for the highest accuracy—better than dumping a whole essay at once.' },
            { step: 2, title: 'Pick a rewrite mode', desc: 'Standard keeps meaning tight, Fluency smooths awkward phrasing, Creative varies vocabulary when text feels repetitive.' },
            { step: 3, title: 'Generate the paraphrase', desc: 'AI rewrites structure and wording while aiming to preserve the original idea—not a blind thesaurus swap.' },
            { step: 4, title: 'Compare meaning side by side', desc: 'Check that claims, numbers, and intent still match. Edit any sentence that drifted.' },
            { step: 5, title: 'Cite + polish', desc: 'Add your citation, then run Grammar Fix if you want a final grammar and punctuation pass.' }
        ],
        benefits: [
            { title:"Meaning-first rewrites", desc:"Context-aware paraphrasing targets full sentences so ideas stay intact while wording changes." },
            { title:"Modes for real tasks", desc:"Standard for safe academic restating, Fluency for clarity, Creative when you need fresher phrasing." },
            { title:"Faster than a thesaurus", desc:"Rewrite a dense paragraph in seconds instead of hunting synonyms that break grammar." },
            { title:"Free to start, no login wall", desc:"Paraphrase paragraph online free without creating an account first. Free daily AI use included." }
        ],
        faqs: [
            { question:"Can I paraphrase an essay without changing meaning?", answer:"Yes—paste section by section, use Standard mode, then verify every claim still matches the source. Meaning-first rewriting is the goal; always review before you submit." },
            { question:"Will paraphrasing avoid plagiarism?", answer:"New wording alone is not enough. If the idea comes from another author, you must cite them. Use this tool to restate ideas you understand—not to hide copy-paste work." },
            { question:"Is there a free paraphrasing tool with no login?", answer:"Yes. ToolNova lets you start paraphrasing without signing up. Free daily AI use is included; create an account or upgrade to Pro for higher limits." },
            { question:"How long should each paraphrase run be?", answer:"Best results come from 500–800 words or 1–2 paragraphs at a time. Very long dumps reduce contextual accuracy." },
            { question:"What modes are available?", answer:"Standard (safe rewrite), Fluency (smoother flow), and Creative (more varied vocabulary). Pick based on whether you need safety or style." },
            { question:"Should I run a grammar check after paraphrasing?", answer:"Recommended. Pair with Grammar Fix so any awkward edges get cleaned before submission." }
        ]
    },"grammar-fix": {
        slug:"grammar-fix",
        name:"AI Grammar Fix",
        tagline:"Fix Grammar Mistakes in Essays Free – No Signup",
        description:"Fix grammar mistakes in essays free with an AI grammar checker that catches spelling, punctuation, subject-verb agreement, and clarity issues. Built for students, ESL writers, and professionals who need a free proofreading pass without signup.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Paste your draft', desc: 'Copy the essay, email, or assignment paragraph into the editor—no account required to start.' },
            { step: 2, title: 'Choose correction level', desc: 'Basic for spelling, Standard for grammar + punctuation, Advanced for style and clarity polish.' },
            { step: 3, title: 'Set tone (optional)', desc: 'Keep original voice or shift toward Formal / Professional for academic and workplace writing.' },
            { step: 4, title: 'Generate corrections', desc: 'AI returns a cleaned version of your text with errors fixed while aiming to preserve your meaning.' },
            { step: 5, title: 'Review explanations', desc: 'Turn on explanations when you want to learn the rule—not only accept the fix blindly.' }
        ],
        benefits: [
            { title:"Beyond spell-check", desc:"Catch agreement errors, run-ons, comma issues, and unclear phrasing browsers often miss." },
            { title:"Essay-ready polish", desc:"Fix grammar mistakes in essays free before deadlines—no premium paywall to open the tool." },
            { title:"ESL-friendly help", desc:"Strong on articles, prepositions, tense consistency, and natural wording for non-native writers." },
            { title:"Learn while you fix", desc:"Optional explanations turn each correction into a mini grammar lesson." }
        ],
        faqs: [
            { question:"Can I fix grammar mistakes in an essay free?", answer:"Yes. Paste your draft into ToolNova’s AI grammar checker and run Standard or Advanced correction without creating an account first. Free daily AI use is included." },
            { question:"Is this better than browser spell-check?", answer:"Spell-check mostly finds typos. This tool also targets grammar, punctuation, agreement, and clarity—especially useful for longer essays." },
            { question:"Does it work for ESL students?", answer:"Yes. It is commonly used for article use (a/an/the), prepositions, tense consistency, and smoother academic phrasing." },
            { question:"Will it change my ideas?", answer:"It aims to keep your meaning while fixing errors. Always skim the output and reject any rewrite that shifts your argument." },
            { question:"Can I use it for emails and cover letters?", answer:"Yes. Choose a more Formal or Professional tone for workplace and application writing." },
            { question:"Is my text private?", answer:"Text is processed for the correction request and is not kept as a public document store. See our Privacy Policy for details." }
        ]
    },"essay-writer": {
        slug:"essay-writer",
        name:"AI Essay Writer",
        tagline:"Write a Free Essay Online – AI Generator, No Login",
        description:"Write a free essay online with a structured AI draft—introduction, body paragraphs, and conclusion. Built for high school and college students who need a free AI essay writer to beat blank-page block, then rewrite in their own voice and add real citations.",
        category:"Writing Tools",
        howItWorks: [
            { step: 1, title: 'Enter your prompt', desc: 'Paste the essay question, topic, or assignment brief so the draft stays on task.' },
            { step: 2, title: 'Choose essay type', desc: 'Pick argumentative, expository, narrative, descriptive, or persuasive structure.' },
            { step: 3, title: 'Generate structured draft', desc: 'AI produces intro, body, and conclusion you can treat as a scaffold—not a final submit.' },
            { step: 4, title: 'Rewrite in your voice', desc: 'Edit every paragraph, insert your examples, and remove anything that does not match your view.' },
            { step: 5, title: 'Cite + polish', desc: 'Add verified sources, then run Grammar Fix before submission per school rules.' }
        ],
        benefits: [
            { title:"Blank-page killer", desc:"Get a free essay draft online in seconds so you spend time improving, not stalling." },
            { title:"Clear academic structure", desc:"Practice intro → claims → evidence → conclusion flow used in real assignments." },
            { title:"Works across subjects", desc:"History, literature, science prompts, and general education topics." },
            { title:"No login to start", desc:"Free AI essay writer access for daily use without an account wall." }
        ],
        faqs: [
            { question:"Can I write an essay online free for school?", answer:"Yes—generate a draft free, then rewrite it in your own words, add sources, and follow your school’s academic integrity policy. Do not submit AI text unchanged." },
            { question:"Is using an AI essay writer plagiarism?", answer:"Unedited AI text can violate school rules. Use the tool as a scaffold: personalize heavily, cite real sources, and meet your institution’s guidelines." },
            { question:"What essay formats are supported?", answer:"Argumentative, expository, narrative, descriptive, and persuasive structures." },
            { question:"Does it create real citations?", answer:"Add verified APA/MLA/Chicago citations yourself with a citation manager. Do not invent references." },
            { question:"Is there a free AI essay writer with no login?", answer:"Yes. Start without signing up. Free daily AI use is included; accounts unlock higher limits." },
            { question:"How should I improve the draft?", answer:"Rewrite in your voice, verify facts, add evidence, then polish with Grammar Fix." }
        ]
    },"merge-pdf": {
        slug:"merge-pdf",
        name:"Merge PDF",
        tagline:"Merge PDF Files Online Free – No Watermark, No Signup",
        description:"Merge PDF files online free into one organized document—no watermark, no signup, no install. Drag multiple PDFs into order, combine them in your browser, and download a single file. Ideal for students and professionals who need to join multiple PDF into one before emailing or uploading.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload every PDF", desc:"Drag and drop multiple PDF files (assignments, scans, certificates) into the merger—no account required." },
            { step: 2, title:"Reorder before merge", desc:"Drag thumbnails so cover pages, main docs, and appendices sit in the exact order you need." },
            { step: 3, title:"Merge in the browser", desc:"Click Merge. Pages are stitched locally so fonts, images, and layout stay intact—no server upload." },
            { step: 4, title:"Download one file", desc:"Save the combined PDF. If a portal rejects the size, run Compress PDF next to hit 1MB–5MB caps." }
        ],
        benefits: [
            { title:"No watermark, free forever for local merge", desc:"Combine files without logo stamps, trial paywalls, or forced signup prompts." },
            { title:"Private browser processing", desc:"Files never leave your device—safer for personal IDs, transcripts, and contracts." },
            { title:"Preserve formatting", desc:"Lossless page merge keeps text, images, and fonts from each original PDF." },
            { title:"Built for real submissions", desc:"One clean file for school portals, job applications, and email attachments." }
        ],
        faqs: [
            { question:"Can I merge PDF files online free with no watermark?", answer:"Yes. ToolNova’s Merge PDF tool combines files in your browser with no watermark and no signup. Download the merged PDF ready for submission." },
            { question:"Is it safe to merge PDFs online?", answer:"Yes when processing is client-side. Your files are merged in the browser and are not uploaded to ToolNova servers for storage." },
            { question:"How do I join multiple PDF into one free?", answer:"Upload all files, drag them into the correct order, click Merge, then download the single combined document." },
            { question:"Will merging lose formatting or quality?", answer:"No. This is a page-level merge, not a low-quality re-export. Text, images, and fonts from each source stay as they were." },
            { question:"How many PDFs can I merge at once?", answer:"There is no hard product cap. Most users can merge dozens of files; very large batches depend on your device memory." },
            { question:"What if the merged file is too big for a portal?", answer:"Use Compress PDF after merging to shrink toward common 1MB–5MB limits, or split out unused pages first." }
        ]
    },"compress-pdf": {
        slug:"compress-pdf",
        name:"Compress PDF",
        tagline:"Compress PDF to 1MB Free Online – No Signup",
        description:"Compress PDF online free in your browser to hit email and portal size limits. Shrink PDFs toward 1MB–5MB for university uploads, job applications, and Gmail attachments—no watermark, no signup, files stay on your device.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Drop your PDF", desc:"Upload a scanned assignment, portfolio, or multi-page form. Processing stays on your device." },
            { step: 2, title:"Pick a size goal", desc:"Choose High (max quality), Balanced (most portals), or Smallest (hard 1MB–2MB caps)." },
            { step: 3, title:"Compress locally", desc:"Pages are re-encoded in the browser—no server upload and no watermark on the result." },
            { step: 4, title:"Check size & download", desc:"Confirm the new file size against your limit, then download. Re-run with a stronger preset if needed." }
        ],
        benefits: [
            { title:"Hit 1MB portal limits", desc:"Shrink PDF file size free for common university, government, and job upload caps." },
            { title:"Private by design", desc:"Compression runs fully in your browser—documents never leave your device." },
            { title:"Simple quality presets", desc:"No advanced Acrobat menus—just High, Balanced, or Smallest." },
            { title:"Free, unlimited local use", desc:"No account, no watermark, no daily cap on browser PDF compression." }
        ],
        faqs: [
            { question:"Can I compress PDF to 1MB free?", answer:"Often yes—use the Smallest or Balanced preset and check the resulting size. Scan-heavy files shrink more than tiny text PDFs. If you are still over, split pages or compress images first." },
            { question:"Will text stay readable?", answer:"Balanced keeps most assignments readable on screen. Aggressive compression may reduce zoom sharpness; always preview before submitting." },
            { question:"Are my files uploaded to a server?", answer:"No. Compression runs client-side in your browser." },
            { question:"Is this free without signup?", answer:"Yes. Browser PDF tools on ToolNova are free and unlimited with no account required." },
            { question:"What if the file is still too large?", answer:"Switch to Smallest, remove unused pages with Split PDF, or compress photos with Image Compressor and rebuild." },
            { question:"Should I merge or compress first?", answer:"Merge related PDFs first, then compress the final file so you only optimize one document for the portal." }
        ]
    },"split-pdf": {
        slug:"split-pdf",
        name:"Split PDF",
        tagline:"Split PDF into Separate Pages Free – No Watermark",
        description:"Split a PDF into separate pages free or extract a page range online—no watermark, no signup. Pull chapters, forms, or single pages in your browser for school portals and email. Private, lossless page extraction.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload the PDF", desc:"Drop the multi-page file you want to split—assignments, packets, or scanned forms." },
            { step: 2, title:"Pick pages or ranges", desc:"Select individual pages (e.g. 3, 7) or a range (e.g. 5–15) to extract." },
            { step: 3, title:"Split in the browser", desc:"Pages are extracted locally with no server upload and no watermark on the result." },
            { step: 4, title:"Download the extract", desc:"Save the new PDF. Compress next if a portal has a size limit." }
        ],
        benefits: [
            { title:"Extract only what you need", desc:"Stop uploading 40-page packets when the portal needs three pages." },
            { title:"No watermark, free unlimited local use", desc:"Browser PDF splitter without account walls or logo stamps." },
            { title:"Lossless page quality", desc:"Extracted pages keep original text, fonts, and images." },
            { title:"Private by design", desc:"Splitting stays on your device—safer for personal documents." }
        ],
        faqs: [
            { question:"Can I split a PDF into separate pages free?", answer:"Yes. Use ToolNova’s free PDF splitter in your browser with no watermark and no signup." },
            { question:"Can I extract specific pages from a PDF free online?", answer:"Yes. Choose individual pages or a range and download only that extract." },
            { question:"Will splitting reduce quality?", answer:"No. Pages are copied as-is—not re-exported as low-quality images." },
            { question:"Can I split a password-protected PDF?", answer:"Unlock it first in a PDF reader. Encrypted files cannot be processed until the password is removed." },
            { question:"Is Split PDF free without an account?", answer:"Yes. Browser PDF tools are free and unlimited with no sign-up." },
            { question:"What if I need the pages together again later?", answer:"Use Merge PDF to recombine extracts in the correct order." }
        ]
    },"image-to-pdf": {
        slug:"image-to-pdf",
        name:"Image to PDF",
        tagline:"Convert Images to PDF Free Online – No Watermark",
        description:"Convert images to PDF free online—JPG, PNG, WebP, and more—with no watermark and no signup. Combine multiple images into one PDF in your browser for homework scans, forms, and portfolios.",
        category:"PDF Tools",
        howItWorks: [
            { step: 1, title:"Upload images", desc:"Drop JPG, PNG, WebP, or other supported photos/scans—phone homework shots welcome." },
            { step: 2, title:"Reorder pages", desc:"Drag thumbnails so page 1 is the cover or first worksheet." },
            { step: 3, title:"Convert in browser", desc:"Build one PDF locally with no watermark and no server upload." },
            { step: 4, title:"Download & optional compress", desc:"Save the PDF. If a portal rejects the size, run Compress PDF next." }
        ],
        benefits: [
            { title:"JPG/PNG to PDF free", desc:"Convert photos and scans into portal-ready PDFs without paid apps." },
            { title:"Multi-image combine", desc:"Merge many images into one PDF in a single pass with order control." },
            { title:"No watermark", desc:"Clean PDFs for school and work—no logo on every page." },
            { title:"Private browser conversion", desc:"Images stay on your device during conversion." }
        ],
        faqs: [
            { question:"Can I convert images to PDF free online with no watermark?", answer:"Yes. ToolNova’s image to PDF converter is free, watermark-free, and works without signup." },
            { question:"Can I combine multiple images into one PDF free?", answer:"Yes. Upload many files, reorder them, and download a single multi-page PDF." },
            { question:"What formats are supported?", answer:"JPG, JPEG, PNG, WebP, BMP, and GIF are commonly supported." },
            { question:"Will quality drop during conversion?", answer:"Images are embedded at full resolution during conversion. File size can still grow—compress afterward if needed." },
            { question:"Is there a file size limit?", answer:"No hard product cap; performance depends on your device when processing large batches." },
            { question:"My portal still rejects the PDF—what next?", answer:"Use Compress PDF, or compress images first with Image Compressor, then convert again." }
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
            { question:"Is the tool free to use?", answer:"Yes. Browser image conversion is free and unlimited—no sign-up required." }
        ]
    },"image-compressor": {
        slug:"image-compressor",
        name:"Image Compressor",
        tagline:"Compress Images Without Losing Quality – Free",
        description:"Compress images without losing quality free—reduce JPG, PNG, and WebP file size in your browser for websites, email, and slides. No watermark, no signup, files never leave your device.",
        category:"Image Tools",
        howItWorks: [
            { step: 1, title:"Upload images", desc:"Drop JPG, PNG, or WebP files—photos, screenshots, or web assets." },
            { step: 2, title:"Choose compression level", desc:"Start moderate for near-original look; go stronger only if size still fails limits." },
            { step: 3, title:"Compress locally", desc:"Optimization runs in your browser—no upload to a third-party server." },
            { step: 4, title:"Download smaller files", desc:"Save compressed images and compare size vs quality before publishing or attaching." }
        ],
        benefits: [
            { title:"Smaller without obvious blur", desc:"Sensible settings keep photos looking sharp at normal viewing sizes." },
            { title:"Faster pages & better SEO signals", desc:"Lighter images improve load time and Core Web Vitals." },
            { title:"Email and portal friendly", desc:"Reduce image file size free so attachments and LMS uploads succeed." },
            { title:"Private & free", desc:"Browser compression with no signup and no watermark." }
        ],
        faqs: [
            { question:"Can I compress an image without losing quality free?", answer:"Yes—at moderate settings most photos look the same at normal zoom while file size drops a lot. Always preview text-heavy screenshots." },
            { question:"How much size can I save?", answer:"Often 40–80% depending on the photo and format. Results vary; check the new file size after each run." },
            { question:"What formats are supported?", answer:"JPG, JPEG, PNG, and WebP." },
            { question:"Is this free without signup?", answer:"Yes. Browser image tools are free and unlimited with no account required." },
            { question:"Should I compress before Image to PDF?", answer:"Yes when photos are large. Compress first, convert to PDF, then Compress PDF if the portal still rejects the file." },
            { question:"Are my images uploaded?", answer:"No. Compression runs in your browser on your device." }
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
            { question:"Is reordering free?", answer:"Yes. Reorder PDF is free and unlimited in your browser—no account required." }
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
            { question:"Is the crop tool free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." },
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
            { question:"Is the Image Resizer free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
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
        tagline:"Write a Cover Letter for Any Job Free – AI",
        description:"Write a cover letter for any job free with AI. Enter the role, company, and your background to generate a personalized draft—no login required to start. Customize with real stories before you apply.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Paste job details", desc:"Add job title, company, and key requirements from the posting." },
            { step: 2, title:"Add your background", desc:"List relevant experience, projects, skills, and one or two wins." },
            { step: 3, title:"Generate the draft", desc:"AI writes a tailored letter structure mapped to the role." },
            { step: 4, title:"Personalize & send", desc:"Insert a real anecdote, company-specific why, and proofread before apply." }
        ],
        benefits: [
            { title:"Job-specific by default", desc:"Uses the description you paste instead of a one-size template." },
            { title:"Faster first draft", desc:"Minutes to a full letter you can edit instead of a blank page." },
            { title:"Works for internships too", desc:"Emphasize projects and coursework when experience is thin." },
            { title:"Free to start", desc:"Free cover letter writer without a login wall for first drafts." }
        ],
        faqs: [
            { question:"Can I write a cover letter for any job free?", answer:"Yes. Generate a free AI cover letter draft without signing up first, then personalize it for each application." },
            { question:"Should I edit the generated letter?", answer:"Always. Add a true story, name the company, and delete anything that could fit any job." },
            { question:"Does it work for internships?", answer:"Yes. Provide projects, coursework, and skills; the draft can emphasize potential and learning." },
            { question:"Will a generic letter hurt me?", answer:"Yes. Recruiters spot copy-paste. Tailor every letter to the posting." },
            { question:"Is the cover letter writer free?", answer:"Yes. Free daily AI use is included without sign-up; higher limits via account/Pro." },
            { question:"How does it pair with resume bullets?", answer:"Reuse the same achievements so your letter and resume tell one consistent story." }
        ]
    },"flashcard-maker": {
        slug:"flashcard-maker",
        name:"AI Flashcard Maker",
        tagline:"Make Flashcards from Notes Automatically Free",
        description:"Make flashcards from notes automatically free. Paste lecture notes or a textbook chapter and generate question-and-answer cards for spaced repetition and exam prep—no account required to start.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Paste notes or a chapter section", desc:"Drop lecture notes, definitions, or one textbook section—not an entire book—for sharper cards." },
            { step: 2, title:"Set count & difficulty", desc:"Choose how many cards you want and Basic / Intermediate / Advanced based on your exam level." },
            { step: 3, title:"Generate Q&A cards", desc:"AI extracts key facts and turns them into focused front/back flashcards for active recall." },
            { step: 4, title:"Edit weak cards, then review", desc:"Delete duplicates, tighten vague answers, and practice out loud before flipping." }
        ],
        benefits: [
            { title:"Active recall by default", desc:"Q&A format beats passive re-reading for long-term retention before exams." },
            { title:"From notes in seconds", desc:"Generate flashcards from textbook chapter sections instead of handwriting for hours." },
            { title:"Works across subjects", desc:"Science, history, languages, business, medicine—any text-based material." },
            { title:"Free to start", desc:"Free digital flashcard maker with no signup required for your first sessions." }
        ],
        faqs: [
            { question:"Can I make flashcards from notes automatically free?", answer:"Yes. Paste your notes into ToolNova’s flashcard maker and generate Q&A cards without signing up first. Free daily AI use is included." },
            { question:"Can I generate flashcards from a textbook chapter?", answer:"Yes—paste one section or chapter chunk at a time. Smaller inputs produce cleaner, less duplicate cards." },
            { question:"How many cards should I make per session?", answer:"Aim for 20–30 cards. That is enough for a solid review block without overwhelm." },
            { question:"Can I edit the generated flashcards?", answer:"Yes. Edit, delete, or rewrite any card so every prompt tests one clear idea." },
            { question:"What subjects work best?", answer:"Any text-heavy subject: sciences, humanities, languages, law, medicine, business, and certifications." },
            { question:"Is the flashcard maker free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for higher limits." }
        ]
    },"notes-generator": {
        slug:"notes-generator",
        name:"AI Notes Generator",
        tagline:"Generate Study Notes from Any Topic Free – AI",
        description:"Generate study notes from any topic free. Paste a lecture, textbook passage, or topic name and get organized headings and bullets for exam prep—no login required to start. Free AI study notes generator for students.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Paste material or topic", desc:"Drop lecture notes, a chapter section, or type a topic when you need a starter outline." },
            { step: 2, title:"Choose note style", desc:"Prefer bullets, outline structure, or denser study notes depending on how you revise." },
            { step: 3, title:"Generate structured notes", desc:"AI organizes definitions, processes, and key points under clear headings." },
            { step: 4, title:"Edit & practice", desc:"Add professor examples, then turn key facts into flashcards or a quiz." }
        ],
        benefits: [
            { title:"Organized by default", desc:"Headings and bullets beat walls of text for fast revision." },
            { title:"From mess to exam pack", desc:"Turn rough transcripts into study-ready notes free." },
            { title:"Works with or without a source paste", desc:"Topic-only mode helps when you need a scaffold fast." },
            { title:"No login to start", desc:"Free notes generator access for daily AI use without signup first." }
        ],
        faqs: [
            { question:"Can I generate study notes from any topic free?", answer:"Yes. Enter a topic or paste text into ToolNova’s notes generator without signing up first. Free daily AI use is included." },
            { question:"What sources work best?", answer:"Lecture notes, textbook sections, article text, or a clear topic name. Smaller chunks produce cleaner structure." },
            { question:"Can I edit the notes?", answer:"Yes—and you should. Add class-specific examples and syllabus terms after generation." },
            { question:"Are the notes exam-ready as-is?", answer:"They are a strong skeleton. Active practice (flashcards/quizzes) still beats re-reading alone." },
            { question:"Is the notes generator free?", answer:"Yes. Free daily AI use without sign-up; higher limits with account/Pro." }
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
        tagline:"Create a Quiz from Any Topic Free – AI",
        description:"Create a quiz from any topic free—or paste notes and generate practice questions with an answer key. Free AI quiz maker for students and teachers. No account needed to start self-testing.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Enter topic or paste notes", desc:"Describe the subject or drop the study text you want tested." },
            { step: 2, title:"Set size & difficulty", desc:"Choose question count and level so practice matches your exam." },
            { step: 3, title:"Generate quiz + key", desc:"AI builds mixed practice questions with answers for review." },
            { step: 4, title:"Take closed-book", desc:"Answer first, then check the key—misses become flashcards." }
        ],
        benefits: [
            { title:"Active recall built in", desc:"Practice tests beat passive re-reading for memory." },
            { title:"From notes to questions free", desc:"Turn your own material into a quiz without manual item writing." },
            { title:"Answer key included", desc:"Grade yourself or use as a teacher draft for review sets." },
            { title:"No signup wall to start", desc:"Free online quiz generator for daily AI use without an account first." }
        ],
        faqs: [
            { question:"Can I create a quiz from any topic free?", answer:"Yes. Enter a topic in ToolNova’s quiz generator without signing up first. Free daily AI use is included." },
            { question:"Can I generate quiz questions from text free?", answer:"Yes—paste notes or a chapter summary so questions track your actual study material." },
            { question:"Does it include an answer key?", answer:"Yes. Use it after you attempt the quiz, not before." },
            { question:"Can teachers use it?", answer:"Yes for warm-ups and review drafts. Human-review items before high-stakes grading." },
            { question:"Is the quiz generator free?", answer:"Yes. Free daily AI use without sign-up; higher limits with account/Pro." }
        ]
    },"homework-solver": {
        slug:"homework-solver",
        name:"AI Homework Solver",
        tagline:"Solve Homework Step by Step Free – AI Tutor",
        description:"Solve homework step by step free with an AI tutor that explains the method—not only the final answer. Free AI homework help for math, science, English, and history. No signup required to start; use it to learn, not to cheat on exams.",
        category:"Study Tools",
        howItWorks: [
            { step: 1, title:"Paste the full problem", desc:"Include given values, what to find, and any constraints—clear prompts get clearer steps." },
            { step: 2, title:"Pick the subject", desc:"Math, science, English, history, and more for better context in the explanation." },
            { step: 3, title:"Get step-by-step help", desc:"AI walks through reasoning so you can redo the approach on similar problems." },
            { step: 4, title:"Re-solve without looking", desc:"Cover the solution and practice once yourself—that is how the learning sticks." }
        ],
        benefits: [
            { title:"Method over shortcuts", desc:"Step-by-step math and science help free—built to teach process, not copy-paste." },
            { title:"Multi-subject coverage", desc:"Algebra to essays: one free AI homework helper for common school subjects." },
            { title:"24/7 study support", desc:"Get unstuck after class without waiting for office hours." },
            { title:"No signup wall to start", desc:"Free daily AI use included without creating an account first." }
        ],
        faqs: [
            { question:"Can I solve homework step by step free?", answer:"Yes. Paste your problem into ToolNova’s AI homework solver for free daily use without signup. Focus on learning the steps, not only the answer." },
            { question:"Does it explain math problems with work shown?", answer:"Yes—step-by-step reasoning is the point. Use it as a tutor, then re-solve on paper." },
            { question:"What subjects are supported?", answer:"Math (algebra, calculus, statistics), science (physics, chemistry, biology), English, history, computer science, economics, and more." },
            { question:"Is this free AI homework help for high school?", answer:"Yes. High school and college students can start without an account. Free daily limits apply; Pro raises caps." },
            { question:"Should I submit the AI answer as-is?", answer:"No. School integrity rules apply. Use explanations to learn, write your own work, and never use it during closed-book exams." },
            { question:"How accurate is it?", answer:"Strong for common problems, but always verify critical numbers and methods with your textbook or teacher." }
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
            { question:"Is the case converter free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
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
            { question:"Is the character counter free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
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
            { question:"Is the word counter free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
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
        tagline:"Generate Resume Bullet Points Free – AI",
        description:"Generate resume bullet points free with AI. Turn job duties into action-verb, results-focused achievements that scan better for recruiters and ATS. Free resume bullet writer—no signup required to start. Always use real metrics.",
        category:"Career Tools",
        howItWorks: [
            { step: 1, title:"Describe the role", desc:"Job title, company, and what you actually did day to day." },
            { step: 2, title:"Add real metrics", desc:"%, $, time saved, users, tickets—truthful numbers only." },
            { step: 3, title:"Generate bullets", desc:"AI drafts multiple action + result lines you can edit." },
            { step: 4, title:"Tailor & paste", desc:"Keep 3–6 strongest bullets; mirror keywords only when true." }
        ],
        benefits: [
            { title:"Action + result formula", desc:"Replace vague duties with scannable achievement lines." },
            { title:"Quantify your impact", desc:"Prompted metrics make bullets stronger and more credible." },
            { title:"ATS-friendly wording", desc:"Easier to include role keywords without keyword stuffing." },
            { title:"Free to start", desc:"Generate resume bullet points free without a login wall." }
        ],
        faqs: [
            { question:"Can I generate resume bullet points free?", answer:"Yes. Use ToolNova’s resume bullet generator without signing up first. Free daily AI use is included." },
            { question:"What makes a good resume bullet?", answer:"Strong action verb + what you did + measurable result. One idea per line." },
            { question:"Should I invent metrics?", answer:"Never. Only use numbers you can defend in an interview." },
            { question:"How many bullets per job?", answer:"Usually 3–6 for recent roles; fewer for older positions." },
            { question:"Is the resume bullet generator free?", answer:"Yes. Free daily AI use without sign-up; higher limits with account/Pro." }
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
            { question:"Is the age calculator free?", answer:"Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access." }
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

