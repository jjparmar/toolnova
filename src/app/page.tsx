import { Metadata } from 'next';
import { getHomepageMetadata } from '@/lib/seo';
import { HomeDashboard } from '@/components/HomeDashboard';
import { getHomepageAEO } from '@/lib/global-aeo-content';
import { generateWebSiteSchema, generateFAQSchema } from '@/lib/seo-advanced';
import { generateEnhancedOrganizationSchema, generateEntityData, generateServiceSchema } from '@/lib/seo-worldclass';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = getHomepageMetadata();

export default function Home() {
  const aeoContent = getHomepageAEO();
  const websiteSchema = generateWebSiteSchema();
  const orgSchema = generateEnhancedOrganizationSchema();
  const faqSchema = generateFAQSchema(aeoContent.faqs);
  const entityData = generateEntityData();
  const serviceSchema = generateServiceSchema();

  // ItemList schema for featured tools (AEO + Google Discover)
  const featuredToolsSchema = {"@context":"https://schema.org","@type":"ItemList",
    name:"Most Popular Free AI Tools",
    description:"Top free tools for students and professionals — PDF utilities and AI study helpers, no sign-up required to start.",
    url:`${siteConfig.url}/tools`,
    numberOfItems: 3,
    itemListElement: [
      {"@type":"ListItem",
        position: 1,
        name:"Merge PDF",
        description:"Combine multiple PDF files into one organized document instantly. Free, no watermarks.",
        url:`${siteConfig.url}/tools/merge-pdf`,
        item: {"@type":"SoftwareApplication",
          name:"Merge PDF",
          applicationCategory:"UtilitiesApplication",
          operatingSystem:"Web Browser",
          offers: {"@type":"Offer", price:"0", priceCurrency:"USD" },
        },
      },
      {"@type":"ListItem",
        position: 2,
        name:"Compress PDF",
        description:"Compress PDF files in your browser for email and portal size limits. Free, private.",
        url:`${siteConfig.url}/tools/compress-pdf`,
        item: {"@type":"SoftwareApplication",
          name:"Compress PDF",
          applicationCategory:"UtilitiesApplication",
          operatingSystem:"Web Browser",
          offers: {"@type":"Offer", price:"0", priceCurrency:"USD" },
        },
      },
      {"@type":"ListItem",
        position: 3,
        name:"Flashcard Maker",
        description:"Create AI-powered study flashcards for exam prep. Perfect for students. Free.",
        url:`${siteConfig.url}/tools/flashcard-maker`,
        item: {"@type":"SoftwareApplication",
          name:"Flashcard Maker",
          applicationCategory:"EducationalApplication",
          operatingSystem:"Web Browser",
          offers: {"@type":"Offer", price:"0", priceCurrency:"USD" },
        },
      },
    ],
  };

  // SpeakableSpecification for voice search (Google Assistant, Siri, Alexa)
  const speakableSchema = {"@context":"https://schema.org","@type":"WebPage","@id":`${siteConfig.url}/#webpage`,
    name:"Free AI Tools for Students \u0026 Professionals | ToolNova",
    description:"Free AI-powered tools for writing, studying, and productivity. No sign-up required.",
    url: siteConfig.url,
    speakable: {"@type":"SpeakableSpecification",
      cssSelector: [".hero-title",".hero-description",".quick-answer"],
      xpath: ["/html/head/title","/html/head/meta[@name='description']/@content",
      ],
    },
    breadcrumb: {"@type":"BreadcrumbList",
      itemListElement: [
        {"@type":"ListItem", position: 1, name:"Home", item: siteConfig.url },
      ],
    },
    isPartOf: {"@id":`${siteConfig.url}/#website` },
    about: {"@type":"Thing",
      name:"Free AI Tools for Students and Professionals",
    },
    primaryImageOfPage: {"@type":"ImageObject",
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
    },
  };

  // Consolidate everything into a single @graph to avoid duplicate schema IDs
  const consolidatedSchema = {"@context":"https://schema.org","@graph": [
      websiteSchema,
      orgSchema,
      entityData,
      serviceSchema,
      speakableSchema,
      featuredToolsSchema,
      faqSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }}
      />
      <HomeDashboard />
    </>
  );
}
