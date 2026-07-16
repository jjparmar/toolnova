import { Metadata } from"next";

const LAST_UPDATED ="June 14, 2026";

export const metadata: Metadata = {
    title:"Refund & Cancellation Policy | ToolNova",
    description:"Refund and Cancellation Policy for ToolNova. Learn about our refund eligibility, cancellation process, and subscription terms.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function RefundPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl text-slate-800">
            <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">
                Last Updated: {LAST_UPDATED}
            </p>

            <div className="prose max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Subscription Cancellations</h2>
                    <p>
                        You may cancel your ToolNova subscription at any time. If you cancel, your subscription will remain active until the end of your current billing period. You will not be charged for the next billing cycle.
                    </p>
                    <p className="mt-2">
                        To cancel, navigate to your Account Settings or contact our support team at support@toolnovahub.com.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Refund Policy</h2>
                    <p>
                        ToolNova offers a <strong>7-day money-back guarantee</strong> for new Pro subscriptions. If you are not satisfied with our service, you may request a full refund within 7 days of your initial purchase.
                    </p>
                    <p className="mt-2">
                        To request a refund, please contact us at support@toolnovahub.com with your order details.
                    </p>
                    <p className="mt-2">
                        <strong>Exceptions:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Refusals: We reserve the right to refuse a refund if we detect abuse of our policy (e.g., creating multiple accounts to get refunds).</li>
                        <li>Renewals: Refunds are not typically granted for automatic renewals if you failed to cancel before the renewal date, but exceptions may be made on a case-by-case basis.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Processing Time</h2>
                    <p>
                        Refunds are typically processed within 5-7 business days. The funds will be returned to the original payment method used for the purchase.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
                    <p>
                        If you have any questions about our Refund & Cancellation Policy, please contact us at support@toolnovahub.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
