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
    title ="Frequently Asked Questions",
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
                    <p className="eyebrow justify-center mb-2">
                        <HelpCircle className="h-4 w-4" />
                        Got questions?
                    </p>
                    <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="surface-card-quiet"
                                data-open={isOpen}
                                data-speakable={isOpen ? "true" : undefined}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-colors hover:bg-muted/40 rounded-[inherit]"
                                    aria-expanded={isOpen}
                                >
                                    <h3 className="text-base font-bold font-heading text-foreground flex-1 md:text-lg">
                                        {faq.question}
                                    </h3>
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                                            isOpen
                                                ? "bg-primary/12 text-primary"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                        aria-hidden
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </span>
                                </button>

                                <div
                                    className="expand-grid"
                                    data-open={isOpen}
                                >
                                    <div className="expand-grid-inner">
                                        <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6 border-t border-border/50">
                                            <p className="pt-4 text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
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
