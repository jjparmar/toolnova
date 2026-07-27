'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
    title?: string;
}

export function FAQSection({ faqs, title ="Frequently Asked Questions" }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (faqs.length === 0) return null;

    // Generate FAQ schema
    const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity": faqs.map(faq => ({"@type":"Question","name": faq.question,"acceptedAnswer": {"@type":"Answer","text": faq.answer
            }
        }))
    };

    return (
        <section className="my-12 py-12 border-t border-border">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div
                        key={index}
                        className="surface-card-quiet"
                        data-open={isOpen}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors rounded-[inherit]"
                            aria-expanded={isOpen}
                        >
                            <span className="font-semibold font-heading text-foreground pr-4">
                                {faq.question}
                            </span>
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                                    isOpen
                                        ? "bg-primary/12 text-primary"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </span>
                        </button>
                        <div className="expand-grid" data-open={isOpen}>
                            <div className="expand-grid-inner">
                                <div className="px-5 pb-5 border-t border-border/50">
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
        </section>
    );
}
