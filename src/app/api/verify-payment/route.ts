import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAllowedPlanId } from "@/lib/razorpay-plans";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-razorpay-signature");

    // CASE 1: Webhook Verification (server-to-server)
    // Prefer /api/razorpay-webhook for production; keep this path for backwards compat.
    if (signature) {
      const body = await req.text();
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error("RAZORPAY_WEBHOOK_SECRET is not defined");
        return NextResponse.json(
          { success: false, error: "Configuration error" },
          { status: 500 },
        );
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        return new Response("Invalid signature", { status: 400 });
      }

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
          data: {
            status: eventName.includes("cancel") ? "cancelled" : "active",
          },
        });
      }

      return new Response("OK", { status: 200 });
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

    if (!razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment fields" },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET is not defined");
      return NextResponse.json(
        { success: false, error: "Configuration error" },
        { status: 500 },
      );
    }

    // Verify signature
    const signatureBase = razorpay_subscription_id
      ? `${razorpay_payment_id}|${razorpay_subscription_id}`
      : `${razorpay_order_id}|${razorpay_payment_id}`;

    if (!razorpay_subscription_id && !razorpay_order_id) {
      return NextResponse.json(
        { success: false, message: "Missing order or subscription id" },
        { status: 400 },
      );
    }

    const sign = crypto
      .createHmac("sha256", secret)
      .update(signatureBase)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 },
      );
    }

    // Save subscription to DB if this is a subscription payment
    if (razorpay_subscription_id) {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;

      if (!email) {
        return NextResponse.json(
          {
            success: false,
            message: "Sign in required to activate Pro on this account",
          },
          { status: 401 },
        );
      }

      // Resolve plan — client should send planId; fall back is safe only if one plan exists
      const resolvedPlanId = isAllowedPlanId(planId)
        ? planId
        : isAllowedPlanId(body.plan_id)
          ? body.plan_id
          : null;

      if (!resolvedPlanId) {
        console.error(
          "verify-payment: missing or invalid planId for subscription",
          planId,
        );
        return NextResponse.json(
          {
            success: false,
            message:
              "Payment verified but plan could not be determined. Contact support with your payment id.",
            paymentId: razorpay_payment_id,
          },
          { status: 422 },
        );
      }

      // IMPORTANT: JWT session.user.id is the OAuth subject, NOT our Prisma cuid.
      // Always resolve the DB user by email (same as dashboard / AI routes).
      const dbUser = await db.user.upsert({
        where: { email },
        create: {
          email,
          name: session?.user?.name || null,
          image: session?.user?.image || null,
        },
        update: {
          name: session?.user?.name || null,
          image: session?.user?.image || null,
        },
      });

      const existing = await db.subscription.findUnique({
        where: { razorpaySubscriptionId: razorpay_subscription_id },
      });

      if (!existing) {
        await db.subscription.create({
          data: {
            userId: dbUser.id,
            razorpaySubscriptionId: razorpay_subscription_id,
            planId: resolvedPlanId,
            status: "active",
          },
        });
        console.log(
          "✅ Subscription saved for user:",
          dbUser.id,
          "plan:",
          resolvedPlanId,
        );
      } else if (existing.userId !== dbUser.id) {
        // Re-link if a previous partial write used the wrong user id
        await db.subscription.update({
          where: { id: existing.id },
          data: {
            userId: dbUser.id,
            planId: resolvedPlanId,
            status: "active",
          },
        });
        console.log("✅ Subscription re-linked to user:", dbUser.id);
      } else if (existing.status !== "active") {
        await db.subscription.update({
          where: { id: existing.id },
          data: { status: "active", planId: resolvedPlanId },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
