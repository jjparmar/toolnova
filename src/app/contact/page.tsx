import { Metadata } from"next";
import { ContactForm } from"./ContactForm";

export const metadata: Metadata = {
  title:"Contact Us - Get in Touch | ToolNova",
  description:"Get in touch with the ToolNova team for support, feedback, or partnership inquiries. We respond within 24 hours.",
  keywords: ["contact ToolNova","ToolNova support","AI tools help","feedback",
  ],
  alternates: {
    canonical:"https://www.toolnovahub.com/contact",
  },
  openGraph: {
    title:"Contact Us - Get in Touch | ToolNova",
    description:"Get in touch with the ToolNova team for support, feedback, or partnership inquiries.",
    url:"https://www.toolnovahub.com/contact",
    type:"website",
    images: [
      {
        url:"https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt:"Contact ToolNova",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Contact Us | ToolNova",
    description:"Get in touch with the ToolNova team for support or inquiries.",
    images: ["https://www.toolnovahub.com/og-image.png"],
    creator:"@toolnovahub",
  },
};

const contactPageSchema = {"@context":"https://schema.org","@graph": [
    {"@type":"ContactPage","@id":"https://www.toolnovahub.com/contact#contactpage",
      url:"https://www.toolnovahub.com/contact",
      name:"Contact ToolNova",
      description:"Contact the ToolNova team for support, feedback, or partnership inquiries.",
      isPartOf: {"@id":"https://www.toolnovahub.com/#website" },
    },
    {"@type":"Organization","@id":"https://www.toolnovahub.com/#organization",
      name:"ToolNova",
      url:"https://www.toolnovahub.com",
      contactPoint: [
        {"@type":"ContactPoint",
          email:"support@toolnovahub.com",
          contactType:"customer support",
          availableLanguage: ["English"],
          areaServed:"Worldwide",
          hoursAvailable: {"@type":"OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            opens:"09:00",
            closes:"18:00",
          },
        },
      ],
      address: {"@type":"PostalAddress",
        streetAddress:"71 Ayer Rajah Crescent",
        addressLocality:"Singapore",
        postalCode:"139951",
        addressCountry:"SG",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <div className="min-h-screen bg-background">
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-[900px] px-6 py-14 text-center md:py-16">
            <span className="section-kicker mb-4">Support</span>
            <h1 className="font-heading mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Contact us
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Have questions about our tools, a partnership idea, or just want to
              say hello? We&apos;d love to hear from you. Prefer email?{""}
              <a
                href="mailto:support@toolnovahub.com"
                className="text-primary hover:underline font-medium"
              >
                support@toolnovahub.com
              </a>
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
