import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DAILY_FREE_LIMIT } from '@/lib/limits';
import { db } from '@/lib/db';
import { getGuestUsage } from '@/lib/guest-limits';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user || !user.email) {
            // Guest free tier — cookie-based daily counter (no sign-up required)
            const guest = await getGuestUsage();
            return NextResponse.json({
                count: guest.count,
                limit: guest.limit,
                remaining: guest.remaining,
                isPremium: false,
                isGuest: true,
            });
        }
        
        // Ensure user exists in Hostinger MySQL (Prisma) — use email as stable lookup key
        // (JWT session.user.id is OAuth sub, not our Prisma cuid)
        const dbUser = await db.user.upsert({
            where: { email: user.email },
            create: {
                email: user.email,
                name: user.name || null,
                image: user.image || null,
            },
            update: {
                name: user.name || null,
                image: user.image || null,
            },
        });
        const resolvedUserId = dbUser.id;

        // Check if premium
        const subscription = await db.subscription.findFirst({
            where: {
                userId: resolvedUserId,
                status: 'active',
            },
        });

        const isPremium = !!subscription;

        if (isPremium) {
            return NextResponse.json({ count: 0, limit: -1, remaining: -1, isPremium: true });
        }

        // UTC day boundary — matches guest cookie + /api/ai limits
        const startOfToday = new Date();
        startOfToday.setUTCHours(0, 0, 0, 0);

        // Get count from GenerationHistory in MySQL
        const count = await db.generationHistory.count({
            where: {
                userId: resolvedUserId,
                createdAt: {
                    gte: startOfToday,
                },
            },
        });

        return NextResponse.json({
            count,
            limit: DAILY_FREE_LIMIT,
            remaining: Math.max(0, DAILY_FREE_LIMIT - count),
            isPremium: false,
        });
    } catch (error) {
        console.error('Usage API Error:', error);
        return NextResponse.json({ count: 0, limit: DAILY_FREE_LIMIT, remaining: DAILY_FREE_LIMIT, isPremium: false });
    }
}
