
import { Metadata } from"next";

const LAST_UPDATED ="June 14, 2026";

export const metadata: Metadata = {
    title:"Cookie Policy",
    description:"Detailed cookie policy for ToolNova. Learn how we use cookies to improve your experience and serve personalized advertisements.",
    alternates: {
        canonical:"https://www.toolnovahub.com/cookie-policy",
    },
};

export default function CookiePolicyPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl text-foreground">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground mb-12 italic">
                Last Updated: {LAST_UPDATED}
            </p>

            <div className="prose max-w-none space-y-10 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold">1. What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your computer or
                        mobile device when you visit a website. They are widely used to
                        make websites work more efficiently and provide information to
                        the owners of the site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold">2. How We Use Cookies</h2>
                    <p>
                        ToolNova uses cookies for several reasons:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 pt-4">
                        <li>
                            <strong>Essential Cookies:</strong> These are necessary for
                            the Site to function properly, such as managing your session
                            and security.
                        </li>
                        <li>
                            <strong>Preference Cookies:</strong> We use these to remember
                            your settings, such as Dark Mode or your last used tool
                            options.
                        </li>
                        <li>
                            <strong>Advertising Cookies:</strong> We work with third-party
                            advertising partners, like Google AdSense, to show you
                            relevant ads. These cookies help track ad performance and
                            measure ad performance and personalize ads where
                            permitted by your consent and applicable law.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold">3. Google AdSense & Third Parties</h2>
                    <p>
                        Google, as a third-party vendor, uses cookies to serve ads on
                        our Site. Google's use of advertising cookies enables it and
                        its partners to serve ads to our users based on their visit
                        to our Site or other sites on the Internet.
                    </p>
                    <p className="mt-4 italic">
                        You may opt out of personalized advertising by visiting
                        <a href="https://www.google.com/settings/ads" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                            Google Ad Settings
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold">4. Managing Your Cookies</h2>
                    <p>
                        You can control and/or delete cookies as you wish. You can delete
                        all cookies that are already on your computer and you can set
                        most browsers to prevent them from being placed. However, if you
                        do this, you may have to manually adjust some preferences every
                        time you visit a site and some services and functionalities may
                        not work.
                    </p>
                </section>

                <section className="bg-muted/60 p-8 rounded-2xl border border-border">
                    <h2 className="text-xl font-bold mb-4">Contact for Cookie Related Inquiries</h2>
                    <p>
                        For any questions about our use of cookies, please contact
                        us at:
                    </p>
                    <p className="mt-2 font-bold text-primary">
                        privacy@toolnovahub.com
                    </p>
                </section>
            </div>
        </div>
    );
}
