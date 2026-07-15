import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const LAST_UPDATED = "July 15, 2026";

export const metadata: Metadata = {
  title: "Advertising Disclosure | ToolNova",
  description:
    "How ToolNova is funded, how Google AdSense and ads work on our site, and your advertising privacy choices. Transparent disclosure for users and partners.",
  alternates: {
    canonical: "https://www.toolnovahub.com/advertising",
  },
  openGraph: {
    title: "Advertising Disclosure | ToolNova",
    description:
      "How ToolNova is funded and how advertising works on our free tools platform.",
    url: "https://www.toolnovahub.com/advertising",
    type: "website",
    images: [
      {
        url: "https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNova Advertising Disclosure",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function AdvertisingPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-bold mb-4">Advertising Disclosure</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last Updated: {LAST_UPDATED}
      </p>

      <div className="prose dark:prose-invert max-w-none space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-3">How ToolNova stays free</h2>
          <p>
            ToolNova provides free browser-based productivity, study, writing,
            PDF, and image tools at{" "}
            <a href={siteConfig.url}>{siteConfig.domain}</a>. We fund hosting,
            AI infrastructure, and product development primarily through:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Display advertising</strong> (including Google AdSense when
              approved and enabled)
            </li>
            <li>
              <strong>Optional ToolNova Pro</strong> subscriptions for users who
              want higher AI limits and premium models
            </li>
          </ul>
          <p className="mt-3">
            Core tools remain free to start. PDF and image utilities process in
            your browser where possible. AI tools include a free daily allowance;
            Pro is optional for unlimited AI access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Google AdSense</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based
            on a user&apos;s prior visits to this website or other websites.
            Google&apos;s use of advertising cookies enables it and its partners
            to serve ads based on your visits to ToolNova and/or other sites on
            the Internet.
          </p>
          <p className="mt-3">
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            . Learn more about how Google uses data when you use our partners&apos;
            sites or apps at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google&apos;s partner sites policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Ad labeling &amp; placement</h2>
          <p>
            Ads are labeled (for example, &quot;Advertisement&quot;) and are
            intended to be clearly distinguishable from ToolNova&apos;s tools,
            guides, and editorial content. We do not sell editorial placement as
            disguised advertising. We aim for a balanced ad density so tools
            remain usable on mobile and desktop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Cookies &amp; consent</h2>
          <p>
            Non-essential cookies (analytics and personalized ads) require your
            choice via our cookie notice where applicable. You can review details
            in our{" "}
            <Link href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Editorial independence</h2>
          <p>
            Advertising does not control our tool recommendations, blog
            guidance, or quality standards. See our{" "}
            <Link
              href="/editorial-policy"
              className="text-primary hover:underline"
            >
              Editorial Policy
            </Link>{" "}
            for how we create and review content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Direct advertising &amp; partnerships</h2>
          <p>
            Interested in sponsoring a guide, category, or newsletter mention?
            Email{" "}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-primary hover:underline"
            >
              {siteConfig.author.email}
            </a>{" "}
            with &quot;Advertising&quot; in the subject line. Sponsored items
            will always be clearly disclosed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            Questions about ads on ToolNova?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            or write to {siteConfig.author.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
