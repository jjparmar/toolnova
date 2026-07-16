import crypto from"crypto";
import { NextRequest, NextResponse } from"next/server";
import { db } from"@/lib/db";

// Store processed event IDs for idempotency (in production, use a cache like Redis)
const processedEvents = new Set<string>();
const IDEMPOTENCY_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("RAZORPAY_WEBHOOK_SECRET is not defined");
            return NextResponse.json(
                { error:"Configuration error" },
                { status: 500 }
            );
        }

        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            console.error("Invalid Webhook Signature");
            return NextResponse.json(
                { error:"Invalid signature" },
                { status: 400 }
            );
        }

        const event = JSON.parse(body);
        const { event: eventName, payload, id: eventId, created_at } = event;

        // Idempotency check - prevent duplicate processing
        if (eventId && processedEvents.has(eventId)) {
            console.log(`⚠️ Duplicate webhook event detected: ${eventId}`);
            return NextResponse.json({ status:"ok" }, { status: 200 });
        }

        if (eventId) {
            processedEvents.add(eventId);
            // Clean up old events (optional: implement with a timer in production)
            setTimeout(() => processedEvents.delete(eventId), IDEMPOTENCY_TIMEOUT);
        }

        const subId =
            payload.subscription?.entity?.id ||
            payload.payment?.entity?.subscription_id;

        console.log(`Razorpay Webhook Event: ${eventName} | ID: ${eventId} | Subscription: ${subId}`);

        if (subId) {
            switch (eventName) {
                case"subscription.activated":
                case"subscription.charged": {
                    const currentEnd = payload.subscription?.entity?.current_end;
                    await db.subscription.updateMany({
                        where: { razorpaySubscriptionId: subId },
                        data: {
                            status:"active",
                            ...(currentEnd && {
                                currentPeriodEnd: new Date(currentEnd * 1000),
                            }),
                        },
                    });
                    console.log(`✅ Subscription ${subId} marked active`);
                    break;
                }
                case"subscription.cancelled":
                case"subscription.completed":
                case"subscription.expired": {
                    await db.subscription.updateMany({
                        where: { razorpaySubscriptionId: subId },
                        data: { status:"cancelled" },
                    });
                    console.log(`❌ Subscription ${subId} marked cancelled`);
                    break;
                }
                case"subscription.halted":
                case"subscription.paused": {
                    await db.subscription.updateMany({
                        where: { razorpaySubscriptionId: subId },
                        data: { status:"halted" },
                    });
                    console.log(`⚠️ Subscription ${subId} halted`);
                    break;
                }
                case"payment.failed":
                    console.error("⚠️ Payment failed for subscription:", subId);
                    // Optionally: update subscription status to failed
                    break;
                default:
                    console.log("ℹ️ Unhandled webhook event:", eventName);
            }
        }

        return NextResponse.json({ status:"ok" }, { status: 200 });
    } catch (error) {
        console.error("Razorpay Webhook Error:", {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
            { error:"Internal Server Error" },
            { status: 500 }
        );
    }
}

