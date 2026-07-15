'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ToolCTAProps {
    toolName: string;
    toolSlug: string;
    description?: string;
    variant?: 'inline' | 'block';
}

export function ToolCTA({ toolName, toolSlug, description, variant = 'inline' }: ToolCTAProps) {
    if (variant === 'inline') {
        return (
            <Link
                href={`/tools/${toolSlug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
                <Sparkles className="h-3.5 w-3.5" />
                Try {toolName}
                <ArrowRight className="h-3.5 w-3.5" />
            </Link>
        );
    }

    return (
        <div className="my-8 p-6 bg-gradient-to-r from-primary/8 to-teal-500/10 rounded-2xl border border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-slate-900">Try {toolName} Free</span>
                    </div>
                    {description && (
                        <p className="text-slate-600 text-sm">{description}</p>
                    )}
                </div>
                <Link
                    href={`/tools/${toolSlug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shrink-0"
                >
                    Use Tool
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
