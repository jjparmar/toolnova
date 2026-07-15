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
            className={`quick-answer bg-gradient-to-br from-primary/8 to-teal-500/8 dark:from-primary/15 dark:to-teal-900/20 border-2 border-primary/20 dark:border-primary/30 rounded-2xl p-6 md:p-8 mb-8 ${className}`}
            data-speakable="true"
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/25">
                    <Info className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                        {question}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}
