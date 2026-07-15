import { Metadata } from "next";

const LAST_UPDATED = "July 15, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | ToolNova",
  description:
    "Privacy Policy for ToolNova. Learn how we collect, use, protect, and disclose personal data, including cookie and advertising disclosures.",
  alternates: {
    canonical: "https://www.toolnovahub.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | ToolNova",
    description:
      "Learn how ToolNova collects, uses, protects, and discloses data.",
    url: "https://www.toolnovahub.com/privacy",
    type: "website",
    images: [
      {
        url: "https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNova Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | ToolNova",
    description: "Learn how ToolNova collects, uses, and protects your data.",
    creator: "@toolnovahub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: {LAST_UPDATED}
      </p>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            ToolNova ("we," "our," or "us") provides AI-powered productivity,
            writing, study, image, and PDF tools at https://www.toolnovahub.com.
            This policy explains what we collect, why we collect it, and how you
            can contact us about your privacy choices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Information you provide:</strong> name, email address,
              account credentials, payment-related details handled by payment
              providers, and messages you send to support.
            </li>
            <li>
              <strong>Tool inputs:</strong> text, files, or prompts you choose
              to submit for processing. We avoid storing personal documents
              unless needed to provide the requested service or support.
            </li>
            <li>
              <strong>Automated information:</strong> IP address, browser type,
              device information, pages visited, referring URLs, approximate
              location, and usage events for analytics, security, and service
              improvement.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Information
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>To provide, maintain, and improve ToolNova tools.</li>
            <li>To secure accounts, prevent abuse, and troubleshoot issues.</li>
            <li>To respond to support requests and user feedback.</li>
            <li>To process subscriptions, orders, refunds, and account access.</li>
            <li>To measure traffic and performance with analytics tools.</li>
            <li>To serve and measure advertising when you consent where required.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Cookies, Analytics, and Advertising
          </h2>
          <p>
            ToolNova uses cookies and similar technologies for essential site
            functions, preferences, analytics, fraud prevention, and advertising.
            You can accept or decline non-essential cookies through our cookie
            consent notice and can also manage cookies in your browser settings.
            See also our{" "}
            <a href="/advertising" className="text-primary hover:underline">
              Advertising Disclosure
            </a>{" "}
            and{" "}
            <a href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            .
          </p>
          <p className="mt-4">
            <strong>Google AdSense:</strong> ToolNova participates in the Google
            AdSense program (publisher ID:{" "}
            <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              ca-pub-1328083083403070
            </code>
            ). Google and its advertising partners use cookies, device
            identifiers, and similar technologies to collect information about
            your browsing activity on ToolNova and across other websites in order
            to deliver interest-based (personalised) ads. This includes the
            DoubleClick cookie and similar mechanisms.
          </p>
          <p className="mt-4">
            You may opt out of personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>{" "}
            or the{" "}
            <a
              href="https://optout.networkadvertising.org/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NAI opt-out page
            </a>
            . You can also learn how Google uses data from partner sites at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google's partner policy
            </a>
            .
          </p>
          <p className="mt-4">
            <strong>Editorial independence:</strong> Advertising revenue from
            Google AdSense or any other advertising network does not influence
            our editorial decisions, tool recommendations, or article content.
            Our editorial and advertising operations are managed independently.
          </p>
          <p className="mt-4">
            <strong>Google Analytics:</strong> We use Google Analytics to
            measure site traffic and usage patterns. Analytics data is
            anonymised and aggregated. No personally identifiable information
            is shared with Google Analytics.
          </p>
          <p className="mt-4">
            If we add other third-party ad vendors or ad networks in future, we
            will disclose them here and link to their privacy or opt-out pages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Sharing Information
          </h2>
          <p>
            We do not sell your personal content. We may share limited
            information with service providers that help us operate the site,
            including hosting, analytics, authentication, AI processing,
            payments, security, and advertising partners. We may also disclose
            information when required by law or to protect users and the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Data Retention and Security
          </h2>
          <p>
            We keep personal information only as long as needed for the purposes
            described in this policy, unless a longer period is required by law.
            We use reasonable technical and organizational safeguards, but no
            online service can guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Your Privacy Rights
          </h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, export, restrict, or object to certain processing of your
            personal information. You may also request that we stop selling or
            sharing personal information where applicable. Contact us to make a
            request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Children's Privacy
          </h2>
          <p>
            ToolNova is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13. If
            you believe a child has provided personal information, contact us so
            we can review and delete it where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>
            For privacy questions or requests, contact us at{" "}
            <a
              href="mailto:support@toolnovahub.com"
              className="text-primary hover:underline"
            >
              support@toolnovahub.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
