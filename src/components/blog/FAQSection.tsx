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
                <div className="p-2 bg-blue-100 rounded-xl">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-border rounded-xl overflow-hidden bg-white hover:border-blue-200 transition-colors"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/60 transition-colors"
                        >
                            <span className="font-semibold text-foreground pr-4">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                        >
                            <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
