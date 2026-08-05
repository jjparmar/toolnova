import { Metadata } from"next";

const LAST_UPDATED ="June 14, 2026";

export const metadata: Metadata = {
    title:"Shipping & Delivery Policy",
    description:"Shipping and Delivery Policy for ToolNova. As a digital SaaS platform, we do not ship physical products.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function ShippingPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl text-foreground">
            <h1 className="text-4xl font-bold mb-8">Shipping & Delivery Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">
                Last Updated: {LAST_UPDATED}
            </p>

            <div className="prose max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Digital Products</h2>
                    <p>
                        ToolNova provides digital software-as-a-service (SaaS) products. <strong>We do not ship physical products.</strong>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Delivery</h2>
                    <p>
                        Upon successful payment, you will receive immediate access to the premium features of ToolNova. You will receive a confirmation email with your order details.
                    </p>
                    <p className="mt-2">
                        If you do not receive access immediately, please try refreshing your browser or logging out and logging back in. If the issue persists, contact us at support@toolnovahub.com.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. International Service</h2>
                    <p>
                        Our services are available globally to anyone with an internet connection. There are no shipping fees or delivery charges.
                    </p>
                </section>
            </div>
        </div>
    );
}
