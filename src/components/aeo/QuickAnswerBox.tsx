import React from 'react';
import { Info } from 'lucide-react';

interface QuickAnswerBoxProps {
    question: string;
    answer: string;
    className?: string;
}

/**
 * AEO-optimized Quick Answer component
 * - Optimized for voice search (40-60 words)
 * - Featured snippet friendly
 * - Speakable content
 */
export function QuickAnswerBox({ question, answer, className = '' }: QuickAnswerBoxProps) {
    return (
        <div
            className={`quick-answer mb-8 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 dark:border-primary/25 dark:bg-primary/10 ${className}`}
            data-speakable="true"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/25">
                    <Info className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                    <h2 className="font-heading mb-3 text-xl font-semibold text-foreground md:text-2xl">
                        {question}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}
