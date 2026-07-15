'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllAchievements, type Achievement } from '@/lib/usage-tracker';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock } from 'lucide-react';

/**
 * Achievement System Component
 * Shows all achievements with progress
 */

export default function AchievementSystem() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [unlockedCount, setUnlockedCount] = useState(0);

    useEffect(() => {
        const loadAchievements = () => {
            const allAchievements = getAllAchievements();
            setAchievements(allAchievements);
            setUnlockedCount(allAchievements.filter(a => a.unlocked).length);
        };

        loadAchievements();

        // Listen for storage changes (achievements unlocked in other tabs)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'toolnova_achievements') {
                loadAchievements();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>
                            {unlockedCount} of {achievements.length} unlocked
                        </CardDescription>
                    </div>
                    <div className="text-4xl">🏆</div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Overall Progress */}
                <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">
                            {Math.round((unlockedCount / achievements.length) * 100)}%
                        </span>
                    </div>
                    <Progress value={(unlockedCount / achievements.length) * 100} />
                </div>

                {/* Achievement List */}
                <div className="space-y-3">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-3 rounded-lg border transition-all ${achievement.unlocked
                                ? 'bg-primary/5 border-primary/20'
                                : 'bg-muted/30 border-border opacity-60'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-3xl">{achievement.icon}</div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                                        {achievement.unlocked ? (
                                            <Badge variant="secondary" className="text-xs">
                                                Unlocked
                                            </Badge>
                                        ) : (
                                            <Lock className="h-3 w-3 text-muted-foreground" />
                                        )}
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-2">
                                        {achievement.description}
                                    </p>

                                    {/* Progress Bar for Locked Achievements */}
                                    {!achievement.unlocked && achievement.progress !== undefined && achievement.target && (
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                <span>Progress</span>
                                                <span>
                                                    {achievement.progress} / {achievement.target}
                                                </span>
                                            </div>
                                            <Progress
                                                value={(achievement.progress / achievement.target) * 100}
                                                className="h-1.5"
                                            />
                                        </div>
                                    )}

                                    {/* Unlock Date */}
                                    {achievement.unlocked && achievement.unlockedDate && (
                                        <div className="text-xs text-muted-foreground">
                                            Unlocked on{' '}
                                            {new Date(achievement.unlockedDate).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
