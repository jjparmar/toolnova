'use client';

import { useEffect, useState } from 'react';
import { Zap, Crown, Flame } from 'lucide-react';
import Link from 'next/link';

interface UsageData {
    count: number;
    limit: number;
    remaining: number;
    isPremium: boolean;
    isGuest?: boolean;
}

export function UsageCounter() {
    const [usage, setUsage] = useState<UsageData | null>(null);

    const fetchUsage = async () => {
        try {
            const res = await fetch('/api/usage');
            if (res.ok) {
                const data = await res.json();
                setUsage(data);
            }
        } catch {
            // Silently fail
        }
    };

    useEffect(() => {
        fetchUsage();

        // Listen for custom event when AI is used (tool pages can dispatch this)
        const handler = () => fetchUsage();
        window.addEventListener('ai-usage-updated', handler);
        return () => window.removeEventListener('ai-usage-updated', handler);
    }, []);

    if (!usage) return null;

    // Premium users see a badge
    if (usage.isPremium) {
        return (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                <Crown className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold text-amber-600">PRO</span>
            </div>
        );
    }

    // Free users / guests see remaining count
    const percentage =
        usage.limit > 0
            ? ((usage.limit - usage.remaining) / usage.limit) * 100
            : 0;
    const isLow = usage.remaining <= 2;
    const isOut = usage.remaining === 0;
    const title = isOut
        ? usage.isGuest
            ?"Free daily AI limit reached — create an account for more"
            :"Daily AI limit reached — upgrade for unlimited"
        : usage.isGuest
            ?"Guest free AI uses left today (create account for more)"
            :"Free AI uses left today";

    return (
        <Link href={isOut || usage.isGuest ?"/pricing" :"/dashboard"} title={title}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer hover:scale-105 ${isOut
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                    : isLow
                        ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                        : 'bg-primary/5 border-primary/20 hover:border-primary/40'
                }`}>
                {isOut ? (
                    <Flame className="h-3.5 w-3.5 text-red-500" />
                ) : (
                    <Zap className={`h-3.5 w-3.5 ${isLow ? 'text-amber-500' : 'text-primary'}`} />
                )}
                <span className={`text-xs font-bold ${isOut ? 'text-red-600 ' : isLow ? 'text-amber-600 ' : 'text-primary'
                    }`}>
                    {usage.remaining}/{usage.limit}
                </span>
                {/* Mini progress bar */}
                <div className="w-8 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${isOut ? 'bg-red-500' : isLow ? 'bg-amber-500' : 'bg-primary'
                            }`}
                        style={{ width:`${Math.max(0, Math.min(100, 100 - percentage))}%` }}
                    />
                </div>
            </div>
        </Link>
    );
}
