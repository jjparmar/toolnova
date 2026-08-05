import { Metadata } from"next";
import PricingClient from"./PricingClient";
import { TOOL_COUNT_LABEL } from"@/data/tools";

export const metadata: Metadata = {
  title:"Pricing – Free & Pro AI Tools",
  description:`Use ${TOOL_COUNT_LABEL} ToolNova tools free to start. PDF & image tools unlimited in-browser. Upgrade to Pro for unlimited AI, premium models, and ad-free use. 7-day money-back.`,
  keywords: ["ToolNova pricing","AI tools free plan","ToolNova Pro","AI tools subscription","free AI tools","premium AI writing tools",
  ],
  alternates: {
    canonical:"https://www.toolnovahub.com/pricing",
  },
  openGraph: {
    title:"Pricing – Free & Pro",
    description:`Free to start with ${TOOL_COUNT_LABEL} tools. Pro unlocks unlimited AI and an ad-free experience.`,
    url:"https://www.toolnovahub.com/pricing",
    type:"website",
    images: [
      {
        url:"https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt:"ToolNova Pricing Plans",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Pricing – Free & Pro",
    description:`Free plan to start. Pro for unlimited AI. ${TOOL_COUNT_LABEL} tools.`,
    images: ["https://www.toolnovahub.com/og-image.png"],
    creator:"@toolnovahub",
  },
};

const pricingSchema = {"@context":"https://schema.org","@graph": [
    {"@type":"WebPage","@id":"https://www.toolnovahub.com/pricing#webpage",
      url:"https://www.toolnovahub.com/pricing",
      name:"ToolNova Pricing Plans",
      description:`Free and Pro pricing for ToolNova — ${TOOL_COUNT_LABEL} AI and browser tools.`,
      isPartOf: {"@id":"https://www.toolnovahub.com/#website" },
    },
    {"@type":"Product",
      name:"ToolNova Pro",
      description:"Unlimited AI generations, premium models, ad-free experience, and priority support for ToolNova tools.",
      brand: {"@type":"Brand",
        name:"ToolNova",
      },
      url:"https://www.toolnovahub.com/pricing",
      offers: [
        {"@type":"Offer",
          name:"Pro Monthly",
          priceCurrency:"USD",
          price:"2.99",
          priceValidUntil:"2027-12-31",
          availability:"https://schema.org/InStock",
          url:"https://www.toolnovahub.com/pricing",
        },
        {"@type":"Offer",
          name:"Pro Yearly",
          priceCurrency:"USD",
          price:"29.99",
          priceValidUntil:"2027-12-31",
          availability:"https://schema.org/InStock",
          url:"https://www.toolnovahub.com/pricing",
        },
        {"@type":"Offer",
          name:"Free Plan",
          priceCurrency:"USD",
          price:"0",
          priceValidUntil:"2027-12-31",
          availability:"https://schema.org/InStock",
          url:"https://www.toolnovahub.com/pricing",
        },
      ],
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingClient />
    </>
  );
}
