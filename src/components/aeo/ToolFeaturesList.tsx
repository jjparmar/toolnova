import React from 'react';
import { LucideIcon, Check } from 'lucide-react';

interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ToolFeaturesListProps {
    features: Feature[];
    title?: string;
    className?: string;
}

/**
 * AEO-optimized Tool Features List
 * - Structured for SoftwareApplication schema
 * - Icon-based visual display
 * - Benefit-focused descriptions
 */
export function ToolFeaturesList({
    features,
    title = "Key Features",
    className = ''
}: ToolFeaturesListProps) {
    return (
        <section className={`py-12 ${className}`}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
                    {title}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/40 transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Feature Summary for Schema */}
                <div className="mt-8 bg-gradient-to-r from-primary/8 to-teal-500/10 dark:from-primary/15 dark:to-teal-900/20 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                    <div className="flex items-center gap-2 mb-3">
                        <Check className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">
                            Free to start · clear limits on AI
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        No sign-up required to open tools. Browser PDF/image tools stay unlimited; AI tools include free daily use.
                    </p>
                </div>
            </div>
        </section>
    );
}
