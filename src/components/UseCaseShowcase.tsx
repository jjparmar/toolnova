'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export interface UseCase {
    title: string;
    description: string;
    input: string;
    output: string;
    benefit: string;
    category?: string;
}

interface UseCaseShowcaseProps {
    cases: UseCase[];
    toolSlug?: string;
}

export function UseCaseShowcase({ cases, toolSlug }: UseCaseShowcaseProps) {
    return (
        <section className="py-12 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Lightbulb className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight">Real-World Use Cases</h2>
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            See how students are using this tool to succeed in their studies
                        </p>
                    </div>

                    {/* Use Case Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cases.map((useCase, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    {useCase.category && (
                                        <Badge variant="secondary" className="w-fit mb-2">
                                            {useCase.category}
                                        </Badge>
                                    )}
                                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                                    <CardDescription>{useCase.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Input Example */}
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-muted-foreground">Example Input:</p>
                                        <div className="bg-muted/50 rounded-lg p-3 text-sm border">
                                            <code>{useCase.input}</code>
                                        </div>
                                    </div>

                                    {/* Output Preview */}
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-muted-foreground">Result:</p>
                                        <div className="bg-primary/5 rounded-lg p-3 text-sm border border-primary/20">
                                            {useCase.output.length > 100
                                                ?`${useCase.output.substring(0, 100)}...`
                                                : useCase.output
                                            }
                                        </div>
                                    </div>

                                    {/* Benefit */}
                                    <div className="flex items-start gap-2 pt-2 border-t">
                                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-semibold text-foreground">Benefit:</span> {useCase.benefit}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* CTA */}
                    {toolSlug && (
                        <div className="text-center mt-8">
                            <a
                                href="#tool-input"
                                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                            >
                                Try it yourself now <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
