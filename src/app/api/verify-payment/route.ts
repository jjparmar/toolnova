import crypto from"crypto";
import { NextRequest, NextResponse } from"next/server";
import { db } from"@/lib/db";
import { getServerSession } from"next-auth";
import { authOptions } from"@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("x-razorpay-signature");

        // CASE 1: Webhook Verification (server-to-server)
        if (signature) {
            const body = await req.text();
            const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

            if (!webhookSecret) {
                console.error("RAZORPAY_WEBHOOK_SECRET is not defined");
                return NextResponse.json({ success: false, error:"Configuration error" }, { status: 500 });
            }

            const expectedSignature = crypto
                .createHmac("sha256", webhookSecret)
                .update(body)
                .digest("hex");

            if (signature === expectedSignature) {
                console.log("Webhook verified ✅");
                const event = JSON.parse(body);
                const { event: eventName, payload } = event;
                console.log(`Received Razorpay Event: ${eventName}`);

                const subId =
                    payload.subscription?.entity?.id ||
                    payload.payment?.entity?.subscription_id;

                if (subId) {
                    await db.subscription.updateMany({
                        where: { razorpaySubscriptionId: subId },
                        data: { status: eventName.includes("cancel") ?"cancelled" :"active" },
                    });
                }

                return new Response("OK", { status: 200 });
            } else {
                return new Response("Invalid signature", { status: 400 });
            }
        }

        // CASE 2: Client-side Payment Verification (from checkout modal)
        const body = await req.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
            planId,
        } = body;

        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            console.error("RAZORPAY_KEY_SECRET is not defined");
            return NextResponse.json({ success: false, error:"Configuration error" }, { status: 500 });
        }

        // Verify signature
        const signatureBase = razorpay_subscription_id
            ?`${razorpay_payment_id}|${razorpay_subscription_id}`
            :`${razorpay_order_id}|${razorpay_payment_id}`;

        const sign = crypto
            .createHmac("sha256", secret)
            .update(signatureBase)
            .digest("hex");

        if (sign !== razorpay_signature) {
            return NextResponse.json({ success: false, message:"Invalid signature" }, { status: 400 });
        }

        // Save subscription to DB if this is a subscription payment
        if (razorpay_subscription_id && planId) {
            const session = await getServerSession(authOptions);
            const user = session?.user;

            if (user && user.email) {
                const userId = (user as any).id;
                // Upsert subscription record
                const existing = await db.subscription.findUnique({
                    where: { razorpaySubscriptionId: razorpay_subscription_id },
                });

                if (!existing) {
                    // Find or create user in DB
                    await db.user.upsert({
                        where: { id: userId },
                        create: { id: userId, email: user.email, name: user.name || null },
                        update: { email: user.email, name: user.name || null },
                    });

                    await db.subscription.create({
                        data: {
                            userId: userId,
                            razorpaySubscriptionId: razorpay_subscription_id,
                            planId: planId,
                            status:"active",
                        },
                    });
                    console.log("✅ Subscription saved to DB for user:", userId);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Razorpay Verification Error:", error);
        return NextResponse.json({ success: false, error:"Internal server error" }, { status: 500 });
    }
}
