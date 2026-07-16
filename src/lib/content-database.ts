import { FAQItem } from '@/components/FAQSection';
import { UseCase } from '@/components/UseCaseShowcase';
import { BestPractice } from '@/components/BestPracticesGuide';

// ========================================
// FAQ DATABASE
// ========================================

export const toolFAQs: Record<string, FAQItem[]> = {
    'homework-solver': [
        {
            question:"Is the AI homework solver really free?",
            answer:"Yes — free to start with no credit card required. Guests get a free daily AI allowance without sign-up; a free account adds more daily uses. Optional Pro unlocks unlimited AI access. PDF/image tools stay unlimited in your browser.",
            category:"pricing"
        },
        {
            question:"What subjects does it support?",
            answer:"Our AI works for all subjects including math (algebra, calculus, geometry), science (physics, chemistry, biology), English, history, geography, and more. It handles both STEM and humanities equally well.",
            category:"features"
        },
        {
            question:"How accurate are the solutions?",
            answer:"Our AI provides highly accurate step-by-step solutions. However, we recommend double-checking critical answers with your teacher or textbook, especially for exams.",
            category:"accuracy"
        },
        {
            question:"Can I use it for college-level homework?",
            answer:"Absolutely! The AI handles everything from middle school through college-level coursework, including advanced topics like calculus, organic chemistry, and statistics.",
            category:"features"
        },
        {
            question:"Does it show step-by-step solutions?",
            answer:"Yes! The AI breaks down problems into clear, easy-to-understand steps so you can learn the process, not just get the answer.",
            category:"features"
        },
        {
            question:"Can it solve word problems?",
            answer:"Yes, it excels at word problems. Just paste the complete problem with all details, and it will interpret and solve it step-by-step.",
            category:"features"
        },
        {
            question:"Is there a usage limit?",
            answer:"No limits! Use the homework solver as many times as you need, whenever you need it. It's available 24/7.",
            category:"pricing"
        },
        {
            question:"Can I use it during tests or exams?",
            answer:"While the tool is available anytime, we recommend using it for learning and practice, not during actual tests. Use it ethically to understand concepts better.",
            category:"ethics"
        },
        {
            question:"What if the answer seems wrong?",
            answer:"Try rephrasing your question with more details or context. The more specific you are, the better the AI can help. If issues persist, double-check your input formatting.",
            category:"troubleshooting"
        },
        {
            question:"Does it work on mobile devices?",
            answer:"Yes! Our website is fully responsive and works perfectly on smartphones and tablets. Access it from any device, anywhere.",
            category:"technical"
        }
    ],

    'essay-writer': [
        {
            question:"Can I use AI-generated essays for school?",
            answer:"AI essays should be used as learning aids and references. Always review, edit, personalize, and cite sources before submitting. Check your school's AI usage policy.",
            category:"ethics"
        },
        {
            question:"How long are the generated essays?",
            answer:"Essay length varies based on your topic and requirements, typically 300-500 words with multiple well-structured paragraphs including introduction, body, and conclusion.",
            category:"features"
        },
        {
            question:"Does it include citations?",
            answer:"The AI provides content structure and ideas. You should add proper citations and sources based on your research and your school's citation style requirements.",
            category:"features"
        },
        {
            question:"Can it write different types of essays?",
            answer:"Yes! It handles argumentative, persuasive, expository, narrative, compare/contrast, and analytical essays. Just specify the type in your prompt.",
            category:"features"
        },
        {
            question:"Is the content original and plagiarism-free?",
            answer:"The AI generates original content each time. However, you should always personalize it, add your own insights, and run it through a plagiarism checker before submission.",
            category:"originality"
        }
    ],

    'notes-generator': [
        {
            question:"What format are the notes in?",
            answer:"Notes are generated in clear bullet-point format, organized by main topics and subtopics for easy studying and quick revision.",
            category:"format"
        },
        {
            question:"Can it generate notes from my textbook?",
            answer:"Yes! Just paste the chapter content or topic name, and it will create concise, exam-ready notes highlighting key concepts.",
            category:"features"
        },
        {
            question:"Are the notes good for exam preparation?",
            answer:"Absolutely! The notes focus on key concepts, important facts, and exam-relevant information, making them perfect for last-minute revision.",
            category:"study"
        }
    ],

    'text-summarizer': [
        {
            question:"How long can the input text be?",
            answer:"You can paste lengthy articles, research papers, or chapters. The AI will extract the key points regardless of length.",
            category:"features"
        },
        {
            question:"Does it work for academic papers?",
            answer:"Yes! It's perfect for summarizing research papers, articles, and academic texts while maintaining the main arguments and findings.",
            category:"features"
        },
        {
            question:"Can I control the summary length?",
            answer:"The AI creates concise summaries automatically. You can request shorter or longer summaries in your prompt.",
            category:"features"
        },
        {
            question:"Will it include the main points?",
            answer:"Yes, the AI identifies and highlights key arguments, conclusions, and important details from your text.",
            category:"accuracy"
        }
    ],

    'mcq-generator': [
        {
            question:"How many questions does it generate?",
            answer:"Typically 5-10 multiple choice questions based on your topic. You can request more in your prompt.",
            category:"features"
        },
        {
            question:"Does it include answer keys?",
            answer:"Yes! Each MCQ set includes correct answers and can include explanations if requested.",
            category:"features"
        },
        {
            question:"Can it create questions for any subject?",
            answer:"Absolutely! It works for all subjects: science, math, history, English, and more.",
            category:"features"
        },
        {
            question:"Is it good for exam preparation?",
            answer:"Perfect for self-testing! Use these MCQs to practice and identify knowledge gaps before exams.",
            category:"study"
        }
    ],

    'flashcard-maker': [
        {
            question:"What format are the flashcards in?",
            answer:"Flashcards are generated with clear questions/terms on one side and answers/definitions on the other, perfect for Anki or Quizlet.",
            category:"format"
        },
        {
            question:"How many flashcards does it create?",
            answer:"Typically 10-20 flashcards per topic. You can request more or fewer as needed.",
            category:"features"
        },
        {
            question:"Can I use them in flashcard apps?",
            answer:"Yes! The format is compatible with popular apps like Anki, Quizlet, and physical flashcard makers.",
            category:"compatibility"
        }
    ],

    'paraphraser': [
        {
            question:"Will it change the meaning?",
            answer:"No, the AI preserves the original meaning while rewording the text in different ways.",
            category:"accuracy"
        },
        {
            question:"Is the output plagiarism-free?",
            answer:"The paraphraser creates unique wording, but you should still cite sources and run it through a plagiarism checker.",
            category:"originality"
        },
        {
            question:"Can it paraphrase long texts?",
            answer:"Yes! It handles paragraphs, essays, and even full articles efficiently.",
            category:"features"
        },
        {
            question:"How many versions can I get?",
            answer:"Generate as many paraphrased versions as you need. Each time produces slightly different wording.",
            category:"features"
        }
    ],

    'quiz-generator': [
        {
            question:"What types of questions does it create?",
            answer:"It creates various question types including multiple choice, true/false, and short answer questions.",
            category:"features"
        },
        {
            question:"Can I specify the difficulty level?",
            answer:"Yes! Mention 'easy', 'medium', or 'hard' in your prompt to control question difficulty.",
            category:"customization"
        },
        {
            question:"Does it provide answers?",
            answer:"Yes, each quiz includes an answer key with correct responses.",
            category:"features"
        }
    ],

    'grammar-fix': [
        {
            question:"What errors does it fix?",
            answer:"It corrects grammar, spelling, punctuation, sentence structure, and improves overall clarity.",
            category:"features"
        },
        {
            question:"Does it explain the corrections?",
            answer:"The AI shows the corrected version. You can request explanations for specific changes.",
            category:"features"
        },
        {
            question:"Will it change my writing style?",
            answer:"No, it maintains your voice while fixing errors. It focuses on corrections, not style changes.",
            category:"accuracy"
        }
    ],

    'character-counter': [
        {
            question:"Does it count spaces?",
            answer:"Yes, it counts total characters including spaces, and also provides character count without spaces.",
            category:"features"
        },
        {
            question:"Is it accurate for special characters?",
            answer:"Absolutely! It accurately counts all characters including emojis, symbols, and special characters.",
            category:"accuracy"
        },
        {
            question:"Can I use it for social media limits?",
            answer:"Perfect for Twitter, Instagram, LinkedIn, or any platform with character limits.",
            category:"use-cases"
        }
    ],

    'word-counter': [
        {
            question:"Does it count contractions as one word?",
            answer:"Yes, contractions like 'don't' or 'it's' are counted as single words.",
            category:"accuracy"
        },
        {
            question:"Can it estimate reading time?",
            answer:"Yes! It provides estimated reading time based on average reading speed.",
            category:"features"
        },
        {
            question:"Does it count hyphenated words correctly?",
            answer:"Yes, hyphenated words (like 'mother-in-law') are counted as single words.",
            category:"accuracy"
        }
    ],

    'age-calculator': [
        {
            question:"How accurate is the calculation?",
            answer:"The calculator provides exact age down to years, months, and days based on the dates you provide.",
            category:"accuracy"
        },
        {
            question:"Can it calculate future ages?",
            answer:"Yes! Enter a future date to see how old you'll be on that date.",
            category:"features"
        },
        {
            question:"Does it account for leap years?",
            answer:"Absolutely! The calculator accounts for leap years and provides precise calculations.",
            category:"accuracy"
        }
    ],

    'caption-generator': [
        {
            question:"What platforms are captions for?",
            answer:"Works for all platforms: Instagram, Facebook, Twitter, TikTok, LinkedIn, and more.",
            category:"compatibility"
        },
        {
            question:"Can I specify tone or style?",
            answer:"Yes! Mention 'funny', 'professional', 'casual', or any desired tone in your prompt.",
            category:"customization"
        },
        {
            question:"Does it include hashtags?",
            answer:"Yes, the AI can include relevant hashtags if requested.",
            category:"features"
        }
    ],

    'case-converter': [
        {
            question:"What cases does it support?",
            answer:"Supports uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more.",
            category:"features"
        },
        {
            question:"Does it work for programming?",
            answer:"Yes! Perfect for converting between camelCase, snake_case, PascalCase, and kebab-case.",
            category:"use-cases"
        },
        {
            question:"Can it handle large texts?",
            answer:"Absolutely! Convert entire paragraphs or documents instantly.",
            category:"features"
        }
    ],

    'email-writer': [
        {
            question:"What types of emails can it write?",
            answer:"Professional emails, job applications, follow-ups, complaints, thank you notes, and more.",
            category:"features"
        },
        {
            question:"Is it professional enough for work?",
            answer:"Yes! The AI uses professional language appropriate for workplace communication.",
            category:"quality"
        },
        {
            question:"Can I customize the tone?",
            answer:"Absolutely! Specify 'formal', 'friendly', 'urgent', or any desired tone.",
            category:"customization"
        }
    ],

    'resume-bullets': [
        {
            question:"What format does it use?",
            answer:"Creates action-based bullet points using strong verbs and quantifiable achievements.",
            category:"format"
        },
        {
            question:"Can it work for any industry?",
            answer:"Yes! Provide your role and achievements, and it adapts to your industry.",
            category:"versatility"
        },
        {
            question:"Does it use ATS-friendly language?",
            answer:"Yes, the bullets use keywords and formatting that pass Applicant Tracking Systems.",
            category:"optimization"
        }
    ],

    'speech-writer': [
        {
            question:"How long are the speeches?",
            answer:"Speech length varies based on your requirements, typically 300-600 words (2-5 minutes spoken).",
            category:"features"
        },
        {
            question:"Can it include jokes or quotes?",
            answer:"Yes! Request humor, quotes, or specific elements in your prompt.",
            category:"customization"
        },
        {
            question:"Is it appropriate for formal events?",
            answer:"Absolutely! Specify the occasion (wedding, graduation, business) for appropriate tone.",
            category:"adaptability"
        }
    ],

    'story-generator': [
        {
            question:"What genres can it write?",
            answer:"All genres: fantasy, sci-fi, mystery, romance, thriller, adventure, and more.",
            category:"versatility"
        },
        {
            question:"How long are the stories?",
            answer:"Typically 300-500 words for short stories. Request longer stories in your prompt.",
            category:"features"
        },
        {
            question:"Can I specify characters or plot?",
            answer:"Yes! Provide character names, plot points, or settings for customized stories.",
            category:"customization"
        }
    ],
};

// ========================================
// USE CASES DATABASE
// ========================================

export const toolUseCases: Record<string, UseCase[]> = {
    'homework-solver': [
        {
            title:"Solving Algebra Equations",
            description:"Get step-by-step solutions for algebraic problems",
            input:"Solve for x: 2x + 5 = 15",
            output:"Step 1: Subtract 5 from both sides: 2x = 10\nStep 2: Divide both sides by 2: x = 5\nSolution: x = 5",
            benefit:"Learn the equation-solving process, not just the answer",
            category:"Mathematics"
        },
        {
            title:"Chemistry Problem Solving",
            description:"Balance chemical equations and understand reactions",
            input:"Balance this equation: H2 + O2 → H2O",
            output:"Balanced equation: 2H2 + O2 → 2H2O\nExplanation: We need 2 hydrogen molecules...",
            benefit:"Understand chemical balancing principles",
            category:"Science"
        },
        {
            title:"Physics Calculations",
            description:"Calculate physics problems with formulas",
            input:"Calculate velocity: distance = 100m, time = 5s",
            output:"Using v = d/t\nv = 100m / 5s = 20 m/s\nThe velocity is 20 meters per second",
            benefit:"See formula application in real scenarios",
            category:"Science"
        },
        {
            title:"Biology Explanations",
            description:"Understand complex biological processes",
            input:"Explain the process of photosynthesis",
            output:"Photosynthesis is the process where plants convert light energy into chemical energy...",
            benefit:"Get clear explanations of complex concepts",
            category:"Science"
        },
        {
            title:"History Analysis",
            description:"Understand historical events and causes",
            input:"What were the main causes of World War I?",
            output:"The main causes include: 1. Militarism 2. Alliances 3. Imperialism 4. Nationalism...",
            benefit:"Structured answers perfect for exam preparation",
            category:"Humanities"
        }
    ],

    'essay-writer': [
        {
            title:"Argumentative Essay",
            description:"Build strong arguments with evidence",
            input:"The impact of social media on society",
            output:"Introduction: Social media has fundamentally transformed how we communicate...\nBody: Studies show that social media increases connectivity but...",
            benefit:"Learn proper essay structure and argumentation",
            category:"Academic"
        },
        {
            title:"Compare & Contrast Essay",
            description:"Analyze similarities and differences",
            input:"Compare online learning vs traditional classroom",
            output:"Introduction: Education delivery has evolved...\nSimilarities: Both aim to educate...\nDifferences: Flexibility vs structure...",
            benefit:"Master comparison essay techniques",
            category:"Academic"
        },
        {
            title:"Persuasive Essay",
            description:"Convince readers of your viewpoint",
            input:"Why renewable energy is the future",
            output:"Hook: Imagine a world without fossil fuels...\nThesis: Renewable energy is not just an option, it's a necessity...",
            benefit:"Learn persuasive writing techniques",
            category:"Academic"
        }
    ],

    'notes-generator': [
        {
            title:"Lecture Summary Notes",
            description:"Convert lecture content into study notes",
            input:"World War II causes and effects",
            output:"**Causes:**\n• Treaty of Versailles\n• Economic depression\n• Rise of totalitarianism\n**Effects:**\n• 50+ million deaths\n• Formation of UN...",
            benefit:"Quick review before exams",
            category:"Exam Prep"
        },
        {
            title:"Book Chapter Notes",
            description:"Summarize textbook chapters efficiently",
            input:"Biology Chapter 5: Cell Structure",
            output:"**Main Concepts:**\n• Prokaryotic vs Eukaryotic cells\n• Organelles and functions\n• Cell membrane structure...",
            benefit:"Save hours of manual note-taking",
            category:"Study"
        }
    ],

    'text-summarizer': [
        {
            title:"Research Paper Summary",
            description:"Condense academic papers into key points",
            input:"Full research paper on climate change impacts",
            output:"**Key Findings:**\n• Global temperature rise of 1.5°C\n• Impact on ecosystems\n• Proposed solutions...",
            benefit:"Understand papers quickly without reading 20+ pages",
            category:"Academic"
        }
    ],

    'mcq-generator': [
        {
            title:"Exam Practice Questions",
            description:"Create practice MCQs for self-testing",
            input:"Photosynthesis process",
            output:"Q1: What is the primary pigment in photosynthesis?\nA) Carotene B) Chlorophyll C) Xanthophyll D) Melanin\nAnswer: B",
            benefit:"Test your knowledge before exams",
            category:"Study"
        }
    ],

    'flashcard-maker': [
        {
            title:"Vocabulary Flashcards",
            description:"Create language learning flashcards",
            input:"Spanish vocabulary: food items",
            output:"Front: Apple | Back: Manzana\nFront: Bread | Back: Pan\nFront: Water | Back: Agua",
            benefit:"Perfect for Anki or Quizlet import",
            category:"Language Learning"
        }
    ],

    'paraphraser': [
        {
            title:"Academic Paraphrasing",
            description:"Reword text while preserving meaning",
            input:"The experiment demonstrated significant results in laboratory conditions.",
            output:"Laboratory testing revealed substantial outcomes from the experimental procedure.",
            benefit:"Avoid plagiarism while maintaining ideas",
            category:"Academic"
        }
    ],

    'quiz-generator': [
        {
            title:"Study Quiz Creation",
            description:"Generate mixed-format quizzes",
            input:"American Revolution key events",
            output:"Q1: (MCQ) Which year did the Declaration of Independence sign?\nQ2: (True/False) The Boston Tea Party occurred in 1776...",
            benefit:"Comprehensive self-assessment",
            category:"Exam Prep"
        }
    ],

    'grammar-fix': [
        {
            title:"Essay Proofreading",
            description:"Correct grammar and spelling errors",
            input:"Their going to the store to buy some apples and orange's.",
            output:"They're going to the store to buy some apples and oranges.",
            benefit:"Polish your writing quickly",
            category:"Academic"
        }
    ],

    'character-counter': [
        {
            title:"Twitter Post Optimization",
            description:"Ensure posts fit character limits",
            input:"Your tweet or Instagram caption",
            output:"Characters: 145/280 (with spaces)\nCharacters: 128/280 (without spaces)",
            benefit:"Perfect posts for social media limits",
            category:"Social Media"
        }
    ],

    'word-counter': [
        {
            title:"Essay Length Check",
            description:"Verify essay meets word requirements",
            input:"Your complete essay text",
            output:"Words: 523\nCharacters: 3,245\nReading time: ~2 min",
            benefit:"Ensure you meet assignment requirements",
            category:"Academic"
        }
    ],

    'age-calculator': [
        {
            title:"Exact Age Calculation",
            description:"Calculate precise age for forms",
            input:"Birthdate: January 15, 2000",
            output:"Age: 26 years, 0 months, 13 days\nNext birthday in: 352 days",
            benefit:"Accurate age for official documents",
            category:"Utility"
        }
    ],

    'caption-generator': [
        {
            title:"Instagram Caption Creation",
            description:"Generate engaging captions",
            input:"Beach sunset photo",
            output:"Golden hour magic ✨ Chasing sunsets and good vibes 🌅 #BeachLife #SunsetLovers #TravelGoals",
            benefit:"Boost engagement with catchy captions",
            category:"Social Media"
        }
    ],

    'case-converter': [
        {
            title:"Programming Variable Names",
            description:"Convert between naming conventions",
            input:"user profile data",
            output:"camelCase: userProfileData\nsnake_case: user_profile_data\nPascalCase: UserProfileData",
            benefit:"Follow coding standards instantly",
            category:"Programming"
        }
    ],

    'email-writer': [
        {
            title:"Professional Job Application",
            description:"Write formal job inquiry emails",
            input:"Applying for Marketing Manager position",
            output:"Subject: Application for Marketing Manager Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Manager position...",
            benefit:"Professional communication that gets responses",
            category:"Career"
        }
    ],

    'resume-bullets': [
        {
            title:"Achievement-Based Bullets",
            description:"Transform job duties into impact statements",
            input:"Managed a team and completed projects",
            output:"• Led cross-functional team of 8 members, delivering 12 projects ahead of schedule\n• Increased team productivity by 35% through process optimization",
            benefit:"Stand out to recruiters and hiring managers",
            category:"Career"
        }
    ],

    'speech-writer': [
        {
            title:"Wedding Toast Speech",
            description:"Create memorable speeches for special occasions",
            input:"Wedding toast for best friend",
            output:"Good evening everyone! For those who don't know me, I'm [Name], and I've had the privilege of being [Groom's] best friend for over 15 years...",
            benefit:"Deliver confident, touching speeches",
            category:"Events"
        }
    ],

    'story-generator': [
        {
            title:"Creative Short Story",
            description:"Generate imaginative narratives",
            input:"A mystery in an old library",
            output:"The ancient library stood silent as midnight approached. Eleanor's flashlight beam cut through the darkness, revealing dusty shelves that hadn't been touched in decades...",
            benefit:"Spark creativity and overcome writer's block",
            category:"Creative Writing"
        }
    ],
};

// ========================================
// BEST PRACTICES DATABASE
// ========================================

export const toolBestPractices: Record<string, BestPractice[]> = {
    'homework-solver': [
        {
            title:"Include all problem details",
            description:"Paste the complete question with all given information, formulas, and context for accurate solutions.",
            type:"do"
        },
        {
            title:"Ask for step-by-step explanations",
            description:"Request detailed breakdowns to understand the solving process, not just the final answer.",
            type:"do"
        },
        {
            title:"Verify your formatting",
            description:"Ensure equations and symbols are clearly written. Use standard notation (e.g., x^2 for x²).",
            type:"do"
        },
        {
            title:"Learn from the solution",
            description:"Study the steps shown to understand the methodology. This helps you solve similar problems independently.",
            type:"do"
        },
        {
            title:"Don't copy blindly",
            description:"Never submit AI solutions without understanding them. Use as a learning tool, not a shortcut.",
            type:"dont"
        },
        {
            title:"Don't skip context",
            description:"Avoid partial questions. Include all variables, units, and constraints for accurate results.",
            type:"dont"
        },
        {
            title:"Use specific subject keywords",
            description:"Mention the subject (e.g., 'chemistry', 'calculus') to help the AI provide context-appropriate solutions.",
            type:"tip"
        },
        {
            title:"Double-check critical answers",
            description:"Always verify important calculations independently, especially for exams or graded assignments.",
            type:"tip"
        }
    ],

    'essay-writer': [
        {
            title:"Provide clear topic details",
            description:"Include essay type (argumentative, persuasive, etc.), word count goal, and key points to cover.",
            type:"do"
        },
        {
            title:"Review and personalize",
            description:"Always edit the output to match your voice, add personal insights, and ensure accuracy.",
            type:"do"
        },
        {
            title:"Add proper citations",
            description:"Research and cite sources appropriately based on your assigned citation style (MLA, APA, etc.).",
            type:"do"
        },
        {
            title:"Don't submit without editing",
            description:"Never submit AI content directly. It must be personalized and refined to reflect your understanding.",
            type:"dont"
        },
        {
            title:"Don't plagiarize",
            description:"Use AI as a starting point or reference, not as your final submission. Add original thoughts.",
            type:"dont"
        },
        {
            title:"Specify essay structure",
            description:"Request specific formats like 5-paragraph structure or thesis-driven approach for better results.",
            type:"tip"
        }
    ],

    'notes-generator': [
        {
            title:"Be specific about topics",
            description:"Provide chapter names, lecture topics, or specific concepts for focused, relevant notes.",
            type:"do"
        },
        {
            title:"Review for accuracy",
            description:"Cross-check generated notes with your textbook or lecture materials to ensure correctness.",
            type:"do"
        },
        {
            title:"Don't rely solely on AI notes",
            description:"Use as a supplement to your own notes, not a replacement for attending class or reading.",
            type:"dont"
        },
        {
            title:"Organize by exam topics",
            description:"Generate separate notes for different exam topics to make studying more manageable.",
            type:"tip"
        }
    ],

    'text-summarizer': [
        {
            title:"Paste complete text",
            description:"Include the entire article or paper for comprehensive summary.",
            type:"do"
        },
        {
            title:"Specify summary focus",
            description:"Mention what aspects you want emphasized (methodology, results, etc.).",
            type:"do"
        },
        {
            title:"Don't skip the original",
            description:"Use summaries for quick review, but read the full text for important work.",
            type:"dont"
        },
        {
            title:"Use for research screening",
            description:"Quickly evaluate if papers are relevant before deep reading.",
            type:"tip"
        }
    ],

    'mcq-generator': [
        {
            title:"Provide topic depth",
            description:"Give detailed topics or paste study material for relevant questions.",
            type:"do"
        },
        {
            title:"Specify question count",
            description:"Request the number of questions you need for effective practice.",
            type:"do"
        },
        {
            title:"Don't skip explanations",
            description:"Request answer explanations to understand why answers are correct.",
            type:"dont"
        },
        {
            title:"Mix difficulty levels",
            description:"Ask for varied difficulty to test different knowledge depths.",
            type:"tip"
        }
    ],

    'flashcard-maker': [
        {
            title:"Organize by topic",
            description:"Create separate sets for different topics or chapters.",
            type:"do"
        },
        {
            title:"Keep cards concise",
            description:"Request one concept per flashcard for better retention.",
            type:"do"
        },
        {
            title:"Don't overload",
            description:"Avoid creating too many cards at once - focus on quality.",
            type:"dont"
        },
        {
            title:"Use spaced repetition",
            description:"Import to apps like Anki for optimal memorization.",
            type:"tip"
        }
    ],

    'paraphraser': [
        {
            title:"Maintain context",
            description:"Include surrounding sentences for accurate paraphrasing.",
            type:"do"
        },
        {
            title:"Verify meaning",
            description:"Always check that the paraphrase maintains the original meaning.",
            type:"do"
        },
        {
            title:"Don't forget citations",
            description:"Paraphrasing still requires proper source attribution.",
            type:"dont"
        },
        {
            title:"Use for learning",
            description:"Paraphrase to understand concepts better, not just to avoid plagiarism.",
            type:"tip"
        }
    ],

    'quiz-generator': [
        {
            title:"Define quiz purpose",
            description:"Specify if for self-study, class review, or exam prep.",
            type:"do"
        },
        {
            title:"Mix question types",
            description:"Request variety - MCQs, true/false, short answer.",
            type:"do"
        },
        {
            title:"Don't skip answer keys",
            description:"Always request answers for effective self-assessment.",
            type:"dont"
        },
        {
            title:"Set time limits",
            description:"Practice with timed quizzes to simulate exam conditions.",
            type:"tip"
        }
    ],

    'grammar-fix': [
        {
            title:"Paste complete sentences",
            description:"Provide full sentences or paragraphs for context-aware corrections.",
            type:"do"
        },
        {
            title:"Learn from mistakes",
            description:"Review corrections to understand and avoid future errors.",
            type:"do"
        },
        {
            title:"Don't ignore context",
            description:"AI fixes grammar, but you should ensure the meaning stays correct.",
            type:"dont"
        },
        {
            title:"Use before submission",
            description:"Final proofread step before submitting important documents.",
            type:"tip"
        }
    ],

    'character-counter': [
        {
            title:"Check before posting",
            description:"Verify character count before publishing on social platforms.",
            type:"do"
        },
        {
            title:"Include emojis",
            description:"Emojis count as characters - include them when counting.",
            type:"do"
        },
        {
            title:"Don't exceed limits",
            description:"Stay under platform limits to avoid cut-off text.",
            type:"dont"
        }
    ],

    'word-counter': [
        {
            title:"Use for assignments",
            description:"Verify essays and papers meet word count requirements.",
            type:"do"
        },
        {
            title:"Track progress",
            description:"Monitor writing progress toward your target word count.",
            type:"do"
        },
        {
            title:"Don't pad unnecessarily",
            description:"Focus on quality content, not just hitting word count.",
            type:"dont"
        }
    ],

    'age-calculator': [
        {
            title:"Use correct date format",
            description:"Enter dates clearly to ensure accurate calculations.",
            type:"do"
        },
        {
            title:"Double-check dates",
            description:"Verify birthdate entry for precise results.",
            type:"do"
        },
        {
            title:"Check for leap years",
            description:"The calculator handles leap years automatically.",
            type:"tip"
        }
    ],

    'caption-generator': [
        {
            title:"Describe your content",
            description:"Provide clear description of your photo/video for relevant captions.",
            type:"do"
        },
        {
            title:"Specify tone",
            description:"Mention if you want funny, professional, or inspirational tone.",
            type:"do"
        },
        {
            title:"Don't overuse hashtags",
            description:"Use 3-5 relevant hashtags, not 20+.",
            type:"dont"
        },
        {
            title:"Personalize generated captions",
            description:"Edit to match your voice and brand style.",
            type:"tip"
        }
    ],

    'case-converter': [
        {
            title:"Know your target format",
            description:"Understand which case format you need before converting.",
            type:"do"
        },
        {
            title:"Use for code consistency",
            description:"Maintain consistent naming conventions in projects.",
            type:"do"
        },
        {
            title:"Check language rules",
            description:"Different languages have different capitalization rules.",
            type:"tip"
        }
    ],

    'email-writer': [
        {
            title:"Provide context",
            description:"Include recipient, purpose, and key points to cover.",
            type:"do"
        },
        {
            title:"Specify formality level",
            description:"Mention if email should be formal, casual, or friendly.",
            type:"do"
        },
        {
            title:"Don't send without review",
            description:"Always personalize and proofread before sending.",
            type:"dont"
        },
        {
            title:"Add personal touches",
            description:"Include specific details only you would know.",
            type:"tip"
        }
    ],

    'resume-bullets': [
        {
            title:"Quantify achievements",
            description:"Include numbers, percentages, and measurable results.",
            type:"do"
        },
        {
            title:"Use action verbs",
            description:"Start bullets with strong verbs like 'Led', 'Achieved', 'Drove'.",
            type:"do"
        },
        {
            title:"Don't be vague",
            description:"Avoid generic descriptions without specific accomplishments.",
            type:"dont"
        },
        {
            title:"Tailor to job posting",
            description:"Align bullets with keywords from job description.",
            type:"tip"
        }
    ],

    'speech-writer': [
        {
            title:"Define occasion and audience",
            description:"Specify event type and who will be listening.",
            type:"do"
        },
        {
            title:"Set speech length",
            description:"Mention time limit (e.g., 3-5 minutes).",
            type:"do"
        },
        {
            title:"Don't read verbatim",
            description:"Use as an outline, deliver naturally with eye contact.",
            type:"dont"
        },
        {
            title:"Practice multiple times",
            description:"Rehearse to ensure smooth delivery on the day.",
            type:"tip"
        }
    ],

    'story-generator': [
        {
            title:"Provide creative prompts",
            description:"Give characters, settings, or plot ideas for better stories.",
            type:"do"
        },
        {
            title:"Specify genre",
            description:"Mention genre (fantasy, mystery, sci-fi) for appropriate style.",
            type:"do"
        },
        {
            title:"Don't expect perfection",
            description:"Use as a starting point, then edit and refine.",
            type:"dont"
        },
        {
            title:"Iterate and expand",
            description:"Generate multiple versions and combine the best parts.",
            type:"tip"
        }
    ],
};
