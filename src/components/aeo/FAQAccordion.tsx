'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    title?: string;
    className?: string;
}

/**
 * AEO-optimized FAQ Accordion component
 * - Expandable Q&A format
 * - FAQ schema markup ready
 * - Voice search optimized
 */
export function FAQAccordion({
    faqs,
    title = "Frequently Asked Questions",
    className = ''
}: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`py-12 ${className}`}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 border border-primary/15">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            Got questions?
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                        {title}
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-card rounded-xl border-2 border-border overflow-hidden transition-all duration-200 hover:border-primary/40"
                                data-speakable={isOpen ? "true" : undefined}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                    aria-expanded={isOpen}
                                >
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex-1">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 pt-2">
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
