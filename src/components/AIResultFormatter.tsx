'use client';

import {
    CheckCircle2,
    Lightbulb,
    Calculator,
    Target,
    Dumbbell,
    BookOpen,
    FileText,
    HelpCircle,
    Pen,
    ListChecks,
    Quote,
    Sparkles,
    Brain,
    ClipboardList,
    Star,
    Zap
} from 'lucide-react';

interface Section {
    type: 'answer' | 'steps' | 'formulas' | 'verification' | 'learning' | 'practice' |
    'introduction' | 'body' | 'conclusion' | 'questions' | 'answers' | 'tips' |
    'notes' | 'summary' | 'key-terms' | 'content' | 'text';
    title: string;
    content: string;
    emoji?: string;
}

interface AIResultFormatterProps {
    result: string;
    toolType?: 'study' | 'writing' | 'quiz' | 'generic';
}

// Color schemes for different section types
const sectionStyles: Record<string, {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    icon: React.ElementType;
}> = {
    answer: {
        bg: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20',
        border: 'border-green-300 dark:border-green-700/50',
        text: 'from-green-600 to-emerald-600',
        gradient: 'from-green-500 to-emerald-600',
        icon: Target
    },
    steps: {
        bg: 'from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/20',
        border: 'border-blue-200 dark:border-blue-800/50',
        text: 'from-blue-600 to-sky-600',
        gradient: 'from-blue-500 to-sky-600',
        icon: BookOpen
    },
    formulas: {
        bg: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20',
        border: 'border-orange-200 dark:border-orange-800/50',
        text: 'from-orange-600 to-amber-600',
        gradient: 'from-orange-500 to-amber-600',
        icon: Calculator
    },
    verification: {
        bg: 'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20',
        border: 'border-teal-200 dark:border-teal-800/50',
        text: 'from-teal-600 to-cyan-600',
        gradient: 'from-teal-500 to-cyan-600',
        icon: CheckCircle2
    },
    learning: {
        bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20',
        border: 'border-amber-200 dark:border-amber-800/50',
        text: 'from-amber-600 to-orange-600',
        gradient: 'from-amber-500 to-orange-600',
        icon: Lightbulb
    },
    practice: {
        bg: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20',
        border: 'border-pink-200 dark:border-pink-800/50',
        text: 'from-pink-600 to-rose-600',
        gradient: 'from-pink-500 to-rose-600',
        icon: Dumbbell
    },
    introduction: {
        bg: 'from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20',
        border: 'border-indigo-200 dark:border-indigo-800/50',
        text: 'from-indigo-600 to-blue-600',
        gradient: 'from-indigo-500 to-blue-600',
        icon: Sparkles
    },
    body: {
        bg: 'from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/20',
        border: 'border-slate-200 dark:border-slate-800/50',
        text: 'from-slate-600 to-gray-600',
        gradient: 'from-slate-500 to-gray-600',
        icon: FileText
    },
    conclusion: {
        bg: 'from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20',
        border: 'border-sky-200 dark:border-sky-800/50',
        text: 'from-sky-600 to-blue-600',
        gradient: 'from-sky-500 to-blue-600',
        icon: Star
    },
    questions: {
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20',
        border: 'border-blue-200 dark:border-blue-800/50',
        text: 'from-blue-600 to-indigo-600',
        gradient: 'from-blue-500 to-indigo-600',
        icon: HelpCircle
    },
    answers: {
        bg: 'from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/20',
        border: 'border-green-200 dark:border-green-800/50',
        text: 'from-green-600 to-teal-600',
        gradient: 'from-green-500 to-teal-600',
        icon: ListChecks
    },
    tips: {
        bg: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20',
        border: 'border-amber-200 dark:border-amber-800/50',
        text: 'from-amber-600 to-yellow-600',
        gradient: 'from-amber-500 to-yellow-600',
        icon: Zap
    },
    notes: {
        bg: 'from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/20',
        border: 'border-cyan-200 dark:border-cyan-800/50',
        text: 'from-cyan-600 to-sky-600',
        gradient: 'from-cyan-500 to-sky-600',
        icon: ClipboardList
    },
    summary: {
        bg: 'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20',
        border: 'border-emerald-200 dark:border-emerald-800/50',
        text: 'from-emerald-600 to-green-600',
        gradient: 'from-emerald-500 to-green-600',
        icon: Brain
    },
    'key-terms': {
        bg: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20',
        border: 'border-rose-200 dark:border-rose-800/50',
        text: 'from-rose-600 to-pink-600',
        gradient: 'from-rose-500 to-pink-600',
        icon: BookOpen
    },
    content: {
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20',
        border: 'border-blue-200 dark:border-blue-800/50',
        text: 'from-blue-600 to-indigo-600',
        gradient: 'from-blue-500 to-indigo-600',
        icon: Pen
    },
    text: {
        bg: 'from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/20',
        border: 'border-gray-200 dark:border-gray-800/50',
        text: 'from-gray-600 to-slate-600',
        gradient: 'from-gray-500 to-slate-600',
        icon: FileText
    },
};

export function AIResultFormatter({ result, toolType = 'generic' }: AIResultFormatterProps) {
    const sections = parseResult(result);

    // If no sections were detected, show the result as a styled content block
    if (sections.length === 0 || (sections.length === 1 && sections[0].type === 'text')) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800/50 p-6 shadow-lg">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"></div>
                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ✨ Result
                        </h3>
                    </div>
                    <div className="bg-white/70 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
                        <p className="text-base text-blue-900 dark:text-blue-100 whitespace-pre-wrap leading-relaxed">
                            {result}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {sections.map((section, index) => {
                const style = sectionStyles[section.type] || sectionStyles.text;
                const IconComponent = style.icon;
                const isAnswer = section.type === 'answer';

                return (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.bg} border-2 ${style.border} ${isAnswer ? 'p-8 shadow-xl' : 'p-6 shadow-lg'} hover:shadow-xl hover:scale-[1.005] transition-all duration-300`}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-current opacity-5 rounded-full blur-3xl"></div>
                        <div className="relative flex items-start gap-4">
                            <div className={`flex-shrink-0 ${isAnswer ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg ${isAnswer ? 'animate-pulse' : ''}`}>
                                <IconComponent className={`${isAnswer ? 'w-8 h-8' : 'w-7 h-7'} text-white`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className={`${isAnswer ? 'text-2xl' : 'text-xl'} font-black bg-gradient-to-r ${style.text} bg-clip-text text-transparent`}>
                                        {section.emoji} {section.title}
                                    </h3>
                                    {isAnswer && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                                </div>
                                <div className={`bg-white/70 dark:bg-black/20 rounded-xl ${isAnswer ? 'p-5' : 'p-4'} border border-current/10`}>
                                    <p className={`${isAnswer ? 'text-2xl md:text-3xl font-black' : 'text-base'} whitespace-pre-wrap leading-relaxed`}>
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Smart parser that detects section patterns
function parseResult(result: string): Section[] {
    const sections: Section[] = [];
    const lines = result.split('\n');
    let currentSection: Section | null = null;
    let currentContent: string[] = [];

    // Pattern matchers for different section types
    const sectionPatterns: Array<{ pattern: RegExp; type: Section['type']; emoji: string; title: string }> = [
        // Answer patterns
        { pattern: /^🎯\s*ANSWER/i, type: 'answer', emoji: '🎯', title: 'ANSWER' },
        { pattern: /^FINAL\s*ANSWER/i, type: 'answer', emoji: '🎯', title: 'ANSWER' },
        { pattern: /^ANSWER:/i, type: 'answer', emoji: '🎯', title: 'ANSWER' },

        // Steps patterns
        { pattern: /^📝\s*STEP-BY-STEP/i, type: 'steps', emoji: '📝', title: 'STEP-BY-STEP SOLUTION' },
        { pattern: /^STEP-BY-STEP/i, type: 'steps', emoji: '📝', title: 'STEP-BY-STEP SOLUTION' },
        { pattern: /^SOLUTION:/i, type: 'steps', emoji: '📝', title: 'SOLUTION' },
        { pattern: /^WORKING:/i, type: 'steps', emoji: '📝', title: 'WORKING' },

        // Formula patterns
        { pattern: /^📐\s*FORMULA/i, type: 'formulas', emoji: '📐', title: 'FORMULAS USED' },
        { pattern: /^FORMULA/i, type: 'formulas', emoji: '📐', title: 'FORMULAS USED' },

        // Verification patterns
        { pattern: /^✅\s*VERIFICATION/i, type: 'verification', emoji: '✅', title: 'VERIFICATION' },
        { pattern: /^VERIFICATION:/i, type: 'verification', emoji: '✅', title: 'VERIFICATION' },
        { pattern: /^QUICK\s*CHECK/i, type: 'verification', emoji: '✅', title: 'QUICK CHECK' },

        // Learning patterns
        { pattern: /^💡\s*KEY\s*LEARNING/i, type: 'learning', emoji: '💡', title: 'KEY LEARNING POINT' },
        { pattern: /^LEARNING\s*TIP/i, type: 'learning', emoji: '💡', title: 'LEARNING TIP' },
        { pattern: /^💡\s*TIP/i, type: 'learning', emoji: '💡', title: 'TIP' },
        { pattern: /^MEMORY\s*TIP/i, type: 'learning', emoji: '💡', title: 'MEMORY TIP' },

        // Practice patterns
        { pattern: /^🏋️\s*PRACTICE/i, type: 'practice', emoji: '🏋️', title: 'PRACTICE PROBLEM' },
        { pattern: /^PRACTICE/i, type: 'practice', emoji: '🏋️', title: 'PRACTICE' },

        // Essay/Writing patterns
        { pattern: /^INTRODUCTION:/i, type: 'introduction', emoji: '✨', title: 'INTRODUCTION' },
        { pattern: /^BODY\s*PARAGRAPH/i, type: 'body', emoji: '📝', title: 'BODY' },
        { pattern: /^CONCLUSION:/i, type: 'conclusion', emoji: '🎯', title: 'CONCLUSION' },
        { pattern: /^WRITING\s*TIP/i, type: 'tips', emoji: '💡', title: 'WRITING TIP' },

        // Quiz patterns
        { pattern: /^ANSWER\s*KEY/i, type: 'answers', emoji: '✅', title: 'ANSWER KEY' },
        { pattern: /^EXPLANATIONS?:/i, type: 'learning', emoji: '💡', title: 'EXPLANATIONS' },
        { pattern: /^REVIEW\s*QUESTIONS/i, type: 'questions', emoji: '❓', title: 'REVIEW QUESTIONS' },

        // Notes patterns
        { pattern: /^KEY\s*TERMS/i, type: 'key-terms', emoji: '📚', title: 'KEY TERMS' },
        { pattern: /^SUMMARY:/i, type: 'summary', emoji: '📋', title: 'SUMMARY' },
        { pattern: /^MAIN\s*NOTES/i, type: 'notes', emoji: '📝', title: 'MAIN NOTES' },
        { pattern: /^CUES:/i, type: 'notes', emoji: '📌', title: 'CUES' },

        // Generic tip patterns
        { pattern: /^TIP:/i, type: 'tips', emoji: '💡', title: 'TIP' },
        { pattern: /^NOTE:/i, type: 'notes', emoji: '📝', title: 'NOTE' },
    ];

    for (const line of lines) {
        const trimmedLine = line.trim();
        let foundSection = false;

        for (const { pattern, type, emoji, title } of sectionPatterns) {
            if (pattern.test(trimmedLine)) {
                // Save previous section
                if (currentSection) {
                    currentSection.content = currentContent.join('\n').trim();
                    if (currentSection.content) {
                        sections.push(currentSection);
                    }
                }

                // Start new section
                currentSection = { type, title, content: '', emoji };
                currentContent = [];
                foundSection = true;
                break;
            }
        }

        if (!foundSection && currentSection) {
            currentContent.push(line);
        } else if (!foundSection && trimmedLine && !currentSection) {
            // Text before any section marker - create a content section
            if (sections.length === 0 || sections[sections.length - 1].type !== 'text') {
                sections.push({ type: 'text', title: '', content: trimmedLine, emoji: '' });
            } else {
                sections[sections.length - 1].content += '\n' + trimmedLine;
            }
        }
    }

    // Save last section
    if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        if (currentSection.content) {
            sections.push(currentSection);
        }
    }

    return sections;
}
