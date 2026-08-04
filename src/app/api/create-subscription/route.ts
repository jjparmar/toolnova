import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAllowedPlanId } from "@/lib/razorpay-plans";

export async function POST(req: NextRequest) {
  try {
    // Auth guard — only authenticated users can create subscriptions
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const planId = body?.planId;

    if (!isAllowedPlanId(planId)) {
      return NextResponse.json(
        { error: "Invalid or unsupported plan. Please refresh and try again." },
        { status: 400 },
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error("Razorpay keys not configured");
      return NextResponse.json(
        { error: "Payment service is not configured." },
        { status: 503 },
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const subscription = await instance.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // 12 billing cycles
      quantity: 1,
      notes: {
        email: session.user.email,
        planId,
      },
       
    } as any);

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Razorpay Subscription Error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 },
    );
  }
}
