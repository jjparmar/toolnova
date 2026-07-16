'use client';

import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface FAQItem {
    question: string;
    answer: string;
    category?: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
    title?: string;
    showSearch?: boolean;
}

export function FAQSection({ faqs, title ="Frequently Asked Questions", showSearch = true }: FAQSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter FAQs based on search query
    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-12">
            <div className="container px-0">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <HelpCircle className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Find answers to common questions about this tool
                        </p>
                    </div>

                    {/* Search */}
                    {showSearch && faqs.length > 5 && (
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    )}

                    {/* FAQ Accordion */}
                    <Card className="p-6">
                        {filteredFAQs.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full">
                                {filteredFAQs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left hover:no-underline">
                                            <span className="font-semibold">{faq.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No FAQs found matching your search.
                            </div>
                        )}
                    </Card>

                    {/* SEO Note */}
                    <p className="text-sm text-muted-foreground text-center mt-4">
                        Still have questions? Try the tool above or contact support.
                    </p>
                </div>
            </div>
        </section>
    );
}
