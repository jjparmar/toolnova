import Razorpay from"razorpay";
import { NextRequest, NextResponse } from"next/server";
import { getServerSession } from"next-auth";
import { authOptions } from"@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        // Auth guard — only authenticated users can create subscriptions
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error:"Unauthorized. Please sign in first." }, { status: 401 });
        }

        const { planId } = await req.json();

        if (!planId) {
            return NextResponse.json({ error:"planId is required" }, { status: 400 });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID as string,
            key_secret: process.env.RAZORPAY_KEY_SECRET as string,
        });

        const subscription = await instance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12, // 12 billing cycles
            quantity: 1,
        } as any);

        return NextResponse.json(subscription);
    } catch (error) {
        console.error("Razorpay Subscription Error:", error);
        return NextResponse.json({ error:"Failed to create subscription" }, { status: 500 });
    }
}
