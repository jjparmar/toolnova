'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getUsageData } from '@/lib/usage-tracker';

/**
 * Streak Display Component
 * Shows current usage streak with fire animation
 */

export default function StreakDisplay() {
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    useEffect(() => {
        const data = getUsageData();
        setStreak(data.currentStreak);
        setLongestStreak(data.longestStreak);
    }, []);

    if (streak === 0) return null;

    const getMessage = () => {
        if (streak >= 30) return"Unstoppable! 🔥";
        if (streak >= 14) return"On fire! 🔥";
        if (streak >= 7) return"Keep it up! 🔥";
        if (streak >= 3) return"Great streak!";
        return"You're getting started!";
    };

    return (
        <Card className="glass-card border-orange-500/20">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl animate-pulse">🔥</div>
                        <div>
                            <div className="text-2xl font-bold text-orange-500">
                                {streak} Day{streak !== 1 ? 's' : ''}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {getMessage()}
                            </div>
                        </div>
                    </div>

                    {longestStreak > streak && (
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Best Streak</div>
                            <div className="text-lg font-bold">{longestStreak}</div>
                        </div>
                    )}
                </div>

                {/* Progress to next milestone */}
                {streak < 30 && (
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Next milestone:</span>
                            <span>
                                {streak < 7 ? '7 days' : streak < 14 ? '14 days' : '30 days'}
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                                style={{
                                    width:`${(streak / (streak < 7 ? 7 : streak < 14 ? 14 : 30)) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
