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
      <div className="page-shell">
        <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="text-center mb-14">
            <span className="section-kicker mb-5">Support</span>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
          <ContactForm />
        </div>
      </div>
    </>
  );
}
