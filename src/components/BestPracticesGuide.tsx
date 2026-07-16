'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle2, XCircle, Info } from 'lucide-react';

export interface BestPractice {
    title: string;
    description: string;
    type: 'do' | 'dont' | 'tip';
}

interface BestPracticesGuideProps {
    practices: BestPractice[];
    title?: string;
}

export function BestPracticesGuide({ practices, title ="Best Practices & Tips" }: BestPracticesGuideProps) {
    const dos = practices.filter(p => p.type === 'do');
    const donts = practices.filter(p => p.type === 'dont');
    const tips = practices.filter(p => p.type === 'tip');

    return (
        <section className="py-12">
            <div className="container px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Get the most out of this tool with these proven tips and strategies
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Do's */}
                        {dos.length > 0 && (
                            <Card className="border-success/50">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-success" />
                                        <CardTitle className="text-lg">Best Practices</CardTitle>
                                    </div>
                                    <CardDescription>Follow these guidelines for optimal results</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {dos.map((practice, index) => (
                                            <li key={index} className="flex gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-success mt-1 shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-sm">{practice.title}</p>
                                                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Don'ts */}
                        {donts.length > 0 && (
                            <Card className="border-destructive/50">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-destructive" />
                                        <CardTitle className="text-lg">Common Mistakes</CardTitle>
                                    </div>
                                    <CardDescription>Avoid these pitfalls for better outcomes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {donts.map((practice, index) => (
                                            <li key={index} className="flex gap-3">
                                                <XCircle className="w-4 h-4 text-destructive mt-1 shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-sm">{practice.title}</p>
                                                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Pro Tips */}
                    {tips.length > 0 && (
                        <Card className="mt-6 bg-primary/5 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Info className="w-5 h-5 text-primary" />
                                    <CardTitle className="text-lg">Pro Tips</CardTitle>
                                </div>
                                <CardDescription>Advanced techniques for power users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tips.map((practice, index) => (
                                        <div key={index} className="flex gap-3 p-3 bg-background rounded-lg">
                                            <Badge variant="outline" className="h-fit shrink-0">
                                                {index + 1}
                                            </Badge>
                                            <div>
                                                <p className="font-semibold text-sm mb-1">{practice.title}</p>
                                                <p className="text-sm text-muted-foreground">{practice.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
