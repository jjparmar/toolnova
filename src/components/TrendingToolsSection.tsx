'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Sparkles, ArrowRight, Zap } from 'lucide-react';

interface TrendingTool {
    name: string;
    href: string;
    description: string;
    category: string;
    trend: 'up' | 'hot';
    badge?: string;
}

const trendingTools: TrendingTool[] = [
    {
        name: 'AI Homework Solver',
        href: '/tools/homework-solver',
        description: 'Get step-by-step solutions to any homework problem',
        category: 'AI Study Tools',
        trend: 'hot',
        badge: '🔥 Most Popular',
    },
    {
        name: 'Essay Writer',
        href: '/tools/essay-writer',
        description: 'Generate well-structured essays on any topic',
        category: 'Writing Tools',
        trend: 'hot',
        badge: '✨ Featured',
    },
    {
        name: 'Paraphraser',
        href: '/tools/paraphraser',
        description: 'Rewrite text while maintaining original meaning',
        category: 'Writing Tools',
        trend: 'up',
    },
    {
        name: 'AI Notes Generator',
        href: '/tools/notes-generator',
        description: 'Create comprehensive study notes from any material',
        category: 'AI Study Tools',
        trend: 'up',
    },
    {
        name: 'MCQ Generator',
        href: '/tools/mcq-generator',
        description: 'Generate practice questions for exam preparation',
        category: 'AI Study Tools',
        trend: 'up',
    },
    {
        name: 'Text Summarizer',
        href: '/tools/text-summarizer',
        description: 'Summarize long texts in seconds',
        category: 'AI Study Tools',
        trend: 'up',
    },
];

export default function TrendingToolsSection() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-muted/15"></div>

            <div className="container px-4 md:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-4 mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 mb-4">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">Trending This Week</span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                        Most Popular <span className="text-gradient">Tools</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our most-used tools loved by students and professionals
                    </p>
                </div>

                {/* Trending Tools Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {trendingTools.map((tool, index) => (
                        <Link key={tool.name} href={tool.href}>
                            <Card
                                className="glass-card h-full hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 cursor-pointer group animate-scale-in"
                                style={{ animationDelay:`${index * 0.1}s` }}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            {tool.badge && (
                                                <div className="inline-block px-2.5 py-1 bg-gradient-brand text-white text-xs font-bold rounded-lg mb-2">
                                                    {tool.badge}
                                                </div>
                                            )}
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {tool.name}
                                            </CardTitle>
                                        </div>
                                        {tool.trend === 'hot' ? (
                                            <Zap className="h-5 w-5 text-orange-500 fill-orange-500" />
                                        ) : (
                                            <TrendingUp className="h-5 w-5 text-success" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {tool.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Category Badge */}
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                                        <Sparkles className="h-3 w-3" />
                                        {tool.category}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                        <span>Try it now — it&apos;s free</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* View All Tools Button */}
                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-primary/30 hover:bg-primary/10 rounded-xl font-semibold"
                        asChild
                    >
                        <a href="#tools">
                            View All Tools
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>

                {/* Trust Signal — honest */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">
                        100% free · No sign-up required · Browser-based privacy
                    </span>
                </div>
            </div>
        </section>
    );
}
