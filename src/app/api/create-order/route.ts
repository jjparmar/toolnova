import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/** Allowed one-time order amounts in major currency units (USD/INR display amount). */
const ALLOWED_AMOUNTS = new Set([2.99, 29.99, 299, 2999]);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount);

    if (!Number.isFinite(amount) || !ALLOWED_AMOUNTS.has(amount)) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 },
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment service is not configured." },
        { status: 503 },
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        email: session.user.email,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
