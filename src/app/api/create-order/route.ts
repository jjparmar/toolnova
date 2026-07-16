import Razorpay from"razorpay";
import { NextRequest, NextResponse } from"next/server";

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID as string, // server only
            key_secret: process.env.RAZORPAY_KEY_SECRET as string,
        });

        const order = await instance.orders.create({
            amount: amount * 100,
            currency:"INR",
            receipt:"receipt_" + Date.now(),
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ error:"Failed to create order" }, { status: 500 });
    }
}
