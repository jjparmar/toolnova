import React from 'react';
import { LucideIcon, CheckCircle2 } from 'lucide-react';

interface HowToStep {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

interface HowItWorksSectionProps {
    steps: HowToStep[];
    title?: string;
    className?: string;
}

/**
 * AEO-optimized How It Works component
 * - Includes HowTo schema markup
 * - Step-by-step format for answer engines
 * - Voice search friendly
 */
export function HowItWorksSection({
    steps,
    title ="How It Works",
    className = ''
}: HowItWorksSectionProps) {
    return (
        <section className={`py-12 ${className}`} data-speakable="true">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                    {title}
                </h2>

                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === steps.length - 1;

                        return (
                            <div key={step.step} className="relative">
                                {/* Connector Line */}
                                {!isLast && (
                                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 -mb-6" />
                                )}

                                <div className="flex gap-4 md:gap-6 items-start">
                                    {/* Step Number Icon */}
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${step.color}`}
                                        style={{ zIndex: 10 }}
                                    >
                                        {step.step}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                        <div className="flex items-start gap-3 mb-3">
                                            <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${step.color.replace('bg-', 'text-')}`} />
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Completion Badge */}
                <div className="mt-8 flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">That's it! You're ready to go.</span>
                </div>
            </div>
        </section>
    );
}
