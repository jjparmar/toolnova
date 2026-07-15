/**
 * Usage Tracker for Gamification
 * Tracks tool usage, streaks, and daily activity
 * Privacy-focused: all data stored locally
 */

export interface UsageData {
    totalUses: number;
    toolsUsed: string[];
    dailyActivity: Record<string, number>; // date -> count
    currentStreak: number;
    longestStreak: number;
    lastActive: string; // ISO date
    firstUse: string; // ISO date
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedDate?: string;
    progress?: number;
    target?: number;
}

const STORAGE_KEY = 'toolnova_usage';
const ACHIEVEMENTS_KEY = 'toolnova_achievements';
const CHALLENGE_KEY = 'toolnova_daily_challenge';

/**
 * Get current usage data
 */
export function getUsageData(): UsageData {
    if (typeof window === 'undefined') {
        return getDefaultUsageData();
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return getDefaultUsageData();

        const data = JSON.parse(stored);
        return {
            ...getDefaultUsageData(),
            ...data,
        };
    } catch (error) {
        console.error('Error reading usage data:', error);
        return getDefaultUsageData();
    }
}

/**
 * Default usage data
 */
function getDefaultUsageData(): UsageData {
    return {
        totalUses: 0,
        toolsUsed: [],
        dailyActivity: {},
        currentStreak: 0,
        longestStreak: 0,
        lastActive: '',
        firstUse: new Date().toISOString(),
    };
}

/**
 * Track tool usage
 */
export function trackToolUse(toolSlug: string): UsageData {
    const data = getUsageData();
    const today = new Date().toISOString().split('T')[0];

    // Update counts
    data.totalUses += 1;
    if (!data.toolsUsed.includes(toolSlug)) {
        data.toolsUsed.push(toolSlug);
    }

    // Update daily activity
    data.dailyActivity[today] = (data.dailyActivity[today] || 0) + 1;

    // Calculate streak
    data.currentStreak = calculateStreak(data.dailyActivity, data.lastActive);
    if (data.currentStreak > data.longestStreak) {
        data.longestStreak = data.currentStreak;
    }

    data.lastActive = today;

    // Save
    saveUsageData(data);

    // Check for new achievements
    checkAchievements(data);

    return data;
}

/**
 * Calculate current streak
 */
function calculateStreak(dailyActivity: Record<string, number>, lastActive: string): number {
    const today = new Date().toISOString().split('T')[0];

    // If no previous activity, streak is 1
    if (!lastActive) return 1;

    // If last active was today, keep current streak
    if (lastActive === today) {
        return getCurrentStreak(dailyActivity);
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActive === yesterdayStr) {
        // Continue streak
        return getCurrentStreak(dailyActivity) + 1;
    }

    // Streak broken, start new
    return 1;
}

/**
 * Get current streak from daily activity
 */
function getCurrentStreak(dailyActivity: Record<string, number>): number {
    const dates = Object.keys(dailyActivity).sort().reverse();
    let streak = 0;
    let currentDate = new Date();

    for (const date of dates) {
        const dateObj = new Date(date);
        const diffDays = Math.floor((currentDate.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === streak) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Save usage data
 */
function saveUsageData(data: UsageData): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving usage data:', error);
    }
}

/**
 * Get all achievements
 */
export function getAllAchievements(): Achievement[] {
    const achievements: Achievement[] = [
        {
            id: 'first_timer',
            name: 'First Timer',
            description: 'Use your first AI tool',
            icon: '🎯',
            unlocked: false,
            target: 1,
        },
        {
            id: 'explorer',
            name: 'Explorer',
            description: 'Try 5 different tools',
            icon: '🗺️',
            unlocked: false,
            target: 5,
        },
        {
            id: 'scholar',
            name: 'Scholar',
            description: 'Use 10+ AI study tools',
            icon: '📚',
            unlocked: false,
            target: 10,
        },
        {
            id: 'writer',
            name: 'Writer',
            description: 'Use 10+ writing tools',
            icon: '✍️',
            unlocked: false,
            target: 10,
        },
        {
            id: 'completionist',
            name: 'Completionist',
            description: 'Try 40+ different tools',
            icon: '🏆',
            unlocked: false,
            target: 40,
        },
        {
            id: 'daily_dedicated',
            name: 'Daily Dedicated',
            description: '7-day streak',
            icon: '🔥',
            unlocked: false,
            target: 7,
        },
        {
            id: 'week_warrior',
            name: 'Week Warrior',
            description: '14-day streak',
            icon: '⚡',
            unlocked: false,
            target: 14,
        },
        {
            id: 'month_master',
            name: 'Month Master',
            description: '30-day streak',
            icon: '👑',
            unlocked: false,
            target: 30,
        },
        {
            id: 'power_user',
            name: 'Power User',
            description: 'Use tools 50 times',
            icon: '💪',
            unlocked: false,
            target: 50,
        },
    ];

    // Load saved achievements
    try {
        const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            return achievements.map(achievement => ({
                ...achievement,
                ...(savedAchievements[achievement.id] || {}),
            }));
        }
    } catch (error) {
        console.error('Error loading achievements:', error);
    }

    return achievements;
}

/**
 * Check and unlock achievements
 */
function checkAchievements(usageData: UsageData): Achievement[] {
    const achievements = getAllAchievements();
    const unlockedAchievements: Achievement[] = [];
    const savedAchievements: Record<string, any> = {};

    achievements.forEach(achievement => {
        if (achievement.unlocked) {
            savedAchievements[achievement.id] = achievement;
            return;
        }

        let shouldUnlock = false;
        let progress = 0;

        switch (achievement.id) {
            case 'first_timer':
                progress = usageData.totalUses;
                shouldUnlock = usageData.totalUses >= 1;
                break;
            case 'explorer':
                progress = usageData.toolsUsed.length;
                shouldUnlock = usageData.toolsUsed.length >= 5;
                break;
            case 'scholar':
            case 'writer':
                progress = usageData.toolsUsed.length;
                shouldUnlock = usageData.toolsUsed.length >= 10;
                break;
            case 'completionist':
                progress = usageData.toolsUsed.length;
                shouldUnlock = usageData.toolsUsed.length >= 40;
                break;
            case 'daily_dedicated':
                progress = usageData.currentStreak;
                shouldUnlock = usageData.currentStreak >= 7;
                break;
            case 'week_warrior':
                progress = usageData.currentStreak;
                shouldUnlock = usageData.currentStreak >= 14;
                break;
            case 'month_master':
                progress = usageData.currentStreak;
                shouldUnlock = usageData.currentStreak >= 30;
                break;
            case 'power_user':
                progress = usageData.totalUses;
                shouldUnlock = usageData.totalUses >= 50;
                break;
        }

        achievement.progress = progress;

        if (shouldUnlock) {
            achievement.unlocked = true;
            achievement.unlockedDate = new Date().toISOString();
            unlockedAchievements.push(achievement);
        }

        savedAchievements[achievement.id] = achievement;
    });

    // Save achievements
    try {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(savedAchievements));
    } catch (error) {
        console.error('Error saving achievements:', error);
    }

    return unlockedAchievements;
}

/**
 * Get daily challenge
 */
export interface DailyChallenge {
    date: string;
    toolSlug: string;
    toolName: string;
    description: string;
    completed: boolean;
}

const challenges = [
    { slug: 'paraphraser', name: 'AI Paraphraser', description: 'Rewrite text in a different way' },
    { slug: 'essay-writer', name: 'AI Essay Writer', description: 'Create an essay outline' },
    { slug: 'flashcard-maker', name: 'Flashcard Maker', description: 'Generate 10 flashcards' },
    { slug: 'mcq-generator', name: 'MCQ Generator', description: 'Create practice questions' },
    { slug: 'notes-generator', name: 'Notes Generator', description: 'Summarize your study material' },
    { slug: 'homework-solver', name: 'Homework Solver', description: 'Solve a challenging problem' },
    { slug: 'text-summarizer', name: 'Text Summarizer', description: 'Summarize an article' },
];

export function getDailyChallenge(): DailyChallenge {
    const today = new Date().toISOString().split('T')[0];
    const dayIndex = new Date().getDate() % challenges.length;
    const selectedChallenge = challenges[dayIndex];
    const defaultChallenge: DailyChallenge = {
        date: today,
        toolSlug: selectedChallenge.slug,
        toolName: selectedChallenge.name,
        description: selectedChallenge.description,
        completed: false,
    };

    if (typeof window === 'undefined') return defaultChallenge;

    try {
        const saved = localStorage.getItem(CHALLENGE_KEY);
        if (saved) {
            const challenge = JSON.parse(saved);
            if (challenge.date === today) {
                return challenge;
            }
        }
    } catch (error) {
        console.error('Error loading daily challenge:', error);
    }

    try {
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify(defaultChallenge));
    } catch (error) {
        console.error('Error saving daily challenge:', error);
    }

    return defaultChallenge;
}

/**
 * Complete daily challenge
 */
export function completeDailyChallenge(): void {
    const challenge = getDailyChallenge();
    challenge.completed = true;

    try {
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify(challenge));
    } catch (error) {
        console.error('Error completing challenge:', error);
    }
}
