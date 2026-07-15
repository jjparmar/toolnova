'use client';

import {
    CheckCircle2,
    Lightbulb,
    Calculator,
    Target,
    Dumbbell,
    BookOpen,
    Copy,
    Check,
    Download,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Section {
    type: 'answer' | 'steps' | 'formulas' | 'verification' | 'learning' | 'practice' | 'text';
    content: string;
    emoji?: string;
}

interface HomeworkResultFormatterProps {
    result: string;
}

export function HomeworkResultFormatter({ result }: HomeworkResultFormatterProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    // Parse the result into sections
    const sections = parseResult(result);

    const handleCopy = (content: string, index: number) => {
        navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        toast.success('Section copied!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleExport = () => {
        try {
            const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `homework-solution-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast.success("Solution downloaded as text file");
        } catch {
            toast.error("Could not download — try copy instead");
        }
    };

    return (
        <div className="space-y-8">
            {sections.map((section, index) => (
                <div key={index}>
                    {section.type === 'answer' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 border-2 border-green-300 dark:border-green-700/50 p-8 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/15 rounded-full blur-3xl"></div>

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleCopy(section.content, index)}
                                    className="p-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all"
                                    title="Copy Answer"
                                >
                                    {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="p-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all"
                                    title="Export to PDF"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="relative flex items-start gap-5">
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl animate-pulse">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            🎯 ANSWER
                                        </h3>
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div className="bg-white/60 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                        <p className="text-2xl md:text-4xl font-black text-green-700 dark:text-green-200 whitespace-pre-wrap leading-relaxed tracking-tight">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section.type === 'steps' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/20 border-2 border-blue-200 dark:border-blue-800/50 p-6 shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all duration-300 group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"></div>

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleCopy(section.content, index)}
                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all"
                                    title="Copy Steps"
                                >
                                    {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </button>
                            </div>

                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-5">
                                        📝 STEP-BY-STEP SOLUTION
                                    </h3>
                                    <div className="space-y-6 text-blue-950 dark:text-blue-50">
                                        {parseSteps(section.content)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section.type === 'formulas' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border-2 border-orange-200 dark:border-orange-800/50 p-6 shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/15 rounded-full blur-3xl"></div>
                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                                    <Calculator className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                                        📐 FORMULAS USED
                                    </h3>
                                    <div className="bg-white/70 dark:bg-orange-900/30 rounded-xl p-5 font-mono text-base text-orange-800 dark:text-orange-100 whitespace-pre-wrap border border-orange-200 dark:border-orange-800">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {section.type === 'verification' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20 border-2 border-teal-200 dark:border-teal-800/50 p-6 shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/15 rounded-full blur-3xl"></div>
                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                                        ✅ VERIFICATION
                                    </h3>
                                    <div className="bg-white/70 dark:bg-teal-900/30 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
                                        <p className="text-base text-teal-800 dark:text-teal-200 whitespace-pre-wrap leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section.type === 'learning' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800/50 p-6 shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg animate-pulse">
                                    <Lightbulb className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                        💡 KEY LEARNING POINT
                                    </h3>
                                    <div className="bg-white/70 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                                        <p className="text-lg font-semibold text-purple-800 dark:text-purple-200 whitespace-pre-wrap leading-relaxed italic">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section.type === 'practice' && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20 border-2 border-pink-200 dark:border-pink-800/50 p-6 shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all duration-300 group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/15 rounded-full blur-3xl"></div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleCopy(section.content, index)}
                                    className="p-2 rounded-lg bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 transition-all"
                                    title="Copy Practice"
                                >
                                    {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </button>
                            </div>

                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                                    <Dumbbell className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
                                        🏋️ PRACTICE PROBLEM
                                    </h3>
                                    <div className="bg-white/70 dark:bg-pink-900/30 rounded-xl p-5 border border-pink-200 dark:border-pink-800">
                                        <p className="text-base text-pink-900 dark:text-pink-100 whitespace-pre-wrap leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {section.type === 'text' && section.content.trim() && (
                        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {section.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Helper function to parse the result into sections
function parseResult(result: string): Section[] {
    const sections: Section[] = [];
    const lines = result.split('\n');
    let currentSection: Section | null = null;
    let currentContent: string[] = [];

    const sectionMarkers = {
        '🎯 ANSWER': 'answer',
        '📝 STEP-BY-STEP SOLUTION': 'steps',
        '📐 FORMULAS USED': 'formulas',
        '✅ VERIFICATION': 'verification',
        '💡 KEY LEARNING POINT': 'learning',
        '🏋️ PRACTICE': 'practice',
    } as const;

    for (const line of lines) {
        let foundSection = false;

        for (const [marker, type] of Object.entries(sectionMarkers)) {
            if (line.trim().startsWith(marker) || line.trim().includes(marker)) {
                // Save previous section
                if (currentSection) {
                    currentSection.content = currentContent.join('\n').trim();
                    sections.push(currentSection);
                }

                // Start new section
                const emoji = marker.split(' ')[0];
                currentSection = { type: type as any, content: '', emoji };
                currentContent = [];
                foundSection = true;
                break;
            }
        }

        if (!foundSection && currentSection) {
            currentContent.push(line);
        } else if (!foundSection && line.trim()) {
            // Text that doesn't belong to any section
            sections.push({ type: 'text', content: line });
        }
    }

    // Save last section
    if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        sections.push(currentSection);
    }

    return sections;
}

// Helper function to parse steps with WHY subsections
function parseSteps(content: string): React.ReactNode {
    const lines = content.split('\n');
    const steps: React.ReactNode[] = [];
    let currentStep: string[] = [];
    let stepNumber = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().match(/^Step \d+:/i)) {
            // Save previous step
            if (currentStep.length > 0) {
                steps.push(renderStep(stepNumber, currentStep));
            }

            // Start new step
            stepNumber++;
            currentStep = [line];
        } else if (currentStep.length > 0) {
            currentStep.push(line);
        }
    }

    // Save last step
    if (currentStep.length > 0) {
        steps.push(renderStep(stepNumber, currentStep));
    }

    return steps.length > 0 ? steps : <div className="whitespace-pre-wrap">{content}</div>;
}

function renderStep(stepNum: number, lines: string[]): React.ReactNode {
    const stepContent: React.ReactNode[] = [];
    let whyContent: string[] = [];
    let inWhy = false;

    for (const line of lines) {
        if (line.trim().toUpperCase().startsWith('WHY:')) {
            inWhy = true;
            whyContent.push(line.replace(/^WHY:\s*/i, ''));
        } else if (inWhy) {
            whyContent.push(line);
        } else {
            stepContent.push(<div key={stepContent.length}>{line}</div>);
        }
    }

    return (
        <div key={stepNum} className="mb-4 last:mb-0">
            <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {stepNum}
                </div>
                <div className="flex-1">
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                        {stepContent}
                    </div>
                    {whyContent.length > 0 && (
                        <div className="mt-2 pl-4 border-l-2 border-purple-300 dark:border-purple-700">
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                                <span className="font-semibold">💭 Why: </span>
                                {whyContent.join(' ')}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
