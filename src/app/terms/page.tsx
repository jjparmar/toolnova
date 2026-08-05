import { Metadata } from"next";

const LAST_UPDATED ="June 14, 2026";

export const metadata: Metadata = {
  title:"Terms of Service",
  description:"Terms of Service for ToolNova. Read our rules, regulations, and usage policies for all AI-powered tools.",
  alternates: {
    canonical:"https://www.toolnovahub.com/terms",
  },
  openGraph: {
    title:"Terms of Service",
    description:"Read ToolNova's terms of service, rules, and usage policies.",
    url:"https://www.toolnovahub.com/terms",
    type:"website",
    images: [
      {
        url:"https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt:"ToolNova Terms of Service",
      },
    ],
  },
  twitter: {
    card:"summary",
    title:"Terms of Service",
    description:"Read ToolNova's terms of service, rules, and usage policies.",
    creator:"@toolnovahub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl text-slate-800">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: {LAST_UPDATED}
      </p>

      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity ("you")
            and ToolNova ("we,""us" or"our"), concerning your access to and
            use of the ToolNova website as well as any other media form, media
            channel, mobile website or mobile application related, linked, or
            otherwise connected thereto (collectively, the"Site").
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the"Content") and the trademarks, service marks, and
            logos contained therein (the"Marks") are owned or controlled by us
            or licensed to us, and are protected by copyright and trademark laws
            and various other intellectual property rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. User Representations
          </h2>
          <p>
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Terms
            of Service; (4) you are not a minor in the jurisdiction in which you
            reside.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Prohibited Activities
          </h2>
          <p>
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
          <p>
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
            THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE
            RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
            WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
            USE THEREOF. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SITE'S CONTENT OR THE CONTENT OF ANY
            WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR
            RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
            CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF
            ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
            SITE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
            PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
            YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES.
          </p>
        </section>
      </div>
    </div>
  );
}
