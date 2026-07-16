/**
 * Schema.org structured data utilities for SEO/AEO/GEO optimization
 */

export interface OrganizationSchema {"@context":"https://schema.org";"@type":"Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {"@type":"ContactPoint";
    email: string;
    contactType: string;
  };
}

export interface WebSiteSchema {"@context":"https://schema.org";"@type":"WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction: {"@type":"SearchAction";
    target: {"@type":"EntryPoint";
      urlTemplate: string;
    };"query-input": string;
  };
}

export interface SoftwareApplicationSchema {"@context":"https://schema.org";"@type":"SoftwareApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  offers: {"@type":"Offer";
    price: string;
    priceCurrency: string;
  };
}

export interface FAQPageSchema {"@context":"https://schema.org";"@type":"FAQPage";
  mainEntity: Array<{"@type":"Question";
    name: string;
    acceptedAnswer: {"@type":"Answer";
      text: string;
    };
  }>;
}

export interface HowToSchema {"@context":"https://schema.org";"@type":"HowTo";
  name: string;
  description: string;
  step: Array<{"@type":"HowToStep";
    name: string;
    text: string;
    url?: string;
  }>;
}

export interface BreadcrumbListSchema {"@context":"https://schema.org";"@type":"BreadcrumbList";
  itemListElement: Array<{"@type":"ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {"@context":"https://schema.org";"@type":"Article";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {"@type":"Person";
    name: string;
    url?: string;
    jobTitle?: string;
  };
  publisher: {"@type":"Organization";
    name: string;
    logo: {"@type":"ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {"@type":"WebPage";"@id": string;
  };
  wordCount?: number;
  articleBody?: string;
}

export interface PersonSchema {"@context":"https://schema.org";"@type":"Person";
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

/**
 * Generate Organization schema for the website
 */
export function getOrganizationSchema(): OrganizationSchema {
  return {"@context":"https://schema.org","@type":"Organization",
    name:"ToolNova",
    url:"https://www.toolnovahub.com",
    logo:"https://www.toolnovahub.com/logo.png",
    description:"The ultimate hub for premium AI tools. Edit PDFs, optimize images, and boost productivity with ToolNova's advanced suite.",
    sameAs: ["https://twitter.com/toolnovahub","https://github.com/toolnovahub","https://linkedin.com/company/toolnovahub",
    ],
    contactPoint: {"@type":"ContactPoint",
      email:"support@toolnovahub.com",
      contactType:"Customer Service",
    },
  };
}

/**
 * Generate WebSite schema for search functionality
 */
export function getWebSiteSchema(): WebSiteSchema {
  return {"@context":"https://schema.org","@type":"WebSite",
    name:"ToolNova",
    url:"https://www.toolnovahub.com",
    description:"The ultimate hub for premium AI tools.",
    potentialAction: {"@type":"SearchAction",
      target: {"@type":"EntryPoint",
        urlTemplate:"https://www.toolnovahub.com/search?q={search_term_string}",
      },"query-input":"required name=search_term_string",
    },
  };
}

/**
 * Generate SoftwareApplication schema for a tool
 */
export function getToolSchema(
  toolName: string,
  description: string,
  url: string,
  featureList?: string[]
): SoftwareApplicationSchema & { operatingSystem: string; featureList?: string[] } {
  return {"@context":"https://schema.org","@type":"SoftwareApplication",
    name: toolName,
    description,
    url,
    applicationCategory:"ProductivityApplication",
    operatingSystem:"Web Browser, Chrome, Firefox, Safari, Edge",
    offers: {"@type":"Offer",
      price:"0",
      priceCurrency:"USD",
    },
    featureList: featureList,
  };
}

/**
 * Generate FAQ schema for a page
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
): FAQPageSchema {
  return {"@context":"https://schema.org","@type":"FAQPage",
    mainEntity: faqs.map((faq) => ({"@type":"Question",
      name: faq.question,
      acceptedAnswer: {"@type":"Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function getHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>,
): HowToSchema {
  return {"@context":"https://schema.org","@type":"HowTo",
    name: title,
    description,
    step: steps.map((step) => ({"@type":"HowToStep",
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

/**
 * Generate Breadcrumb schema for navigation
 */
export function getBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
): BreadcrumbListSchema {
  return {"@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({"@type":"ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate Article schema for blog posts (GEO Optimization)
 */
export function getArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  authorName: string,
  authorUrl?: string,
  authorJobTitle?: string,
  imageUrl?: string,
  wordCount?: number,
): ArticleSchema {
  return {"@context":"https://schema.org","@type":"Article",
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {"@type":"Person",
      name: authorName,
      url: authorUrl,
      jobTitle: authorJobTitle,
    },
    publisher: {"@type":"Organization",
      name:"ToolNova",
      logo: {"@type":"ImageObject",
        url:"https://www.toolnovahub.com/logo.png",
      },
    },
    mainEntityOfPage: {"@type":"WebPage","@id": url,
    },
    wordCount,
  };
}

/**
 * Generate Person schema for author profiles (GEO Optimization)
 */
export function getPersonSchema(
  name: string,
  jobTitle: string,
  description: string,
  url?: string,
  socials?: string[],
  expertise?: string[],
): PersonSchema {
  return {"@context":"https://schema.org","@type":"Person",
    name,
    jobTitle,
    description,
    url,
    sameAs: socials,
    knowsAbout: expertise,
  };
}

/**
 * Convert schema object to JSON-LD script tag string
 */
export function schemaToJsonLd(schema: any): string {
  return JSON.stringify(schema);
}

// ============================================
// AEO (Answer Engine Optimization) Schemas
// ============================================

/**
 * Speakable Schema for Voice Search Optimization
 */
export interface SpeakableSchema {"@context":"https://schema.org";"@type":"WebPage";
  name: string;
  speakable: {"@type":"SpeakableSpecification";
    cssSelector: string[];
  };
}

/**
 * ItemList Schema for Tool Categories
 */
export interface ItemListSchema {"@context":"https://schema.org";"@type":"ItemList";
  itemListElement: Array<{"@type":"ListItem";
    position: number;
    url: string;
    name: string;
    description?: string;
  }>;
}

/**
 * Enhanced SoftwareApplication with Features for AEO
 */
export interface EnhancedSoftwareApplicationSchema extends SoftwareApplicationSchema {
  featureList?: string[];
  screenshot?: string[];
  operatingSystem?: string;
  requirements?: string;
  softwareVersion?: string;
  author?: {"@type":"Organization";
    name: string;
  };
}

/**
 * Generate Speakable schema for voice search optimization
 */
export function getSpeakableSchema(
  pageName: string,
  cssSelectors: string[],
): SpeakableSchema {
  return {"@context":"https://schema.org","@type":"WebPage",
    name: pageName,
    speakable: {"@type":"SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/**
 * Generate ItemList schema for tool categories
 */
export function getItemListSchema(
  items: Array<{ name: string; url: string; description?: string }>,
): ItemListSchema {
  return {"@context":"https://schema.org","@type":"ItemList",
    itemListElement: items.map((item, index) => ({"@type":"ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      description: item.description,
    })),
  };
}

/**
 * Generate comprehensive tool schema (combines SoftwareApplication + HowTo + FAQ)
 * AEO Optimized for answer engines and voice search
 */
export function getComprehensiveToolSchema(
  toolName: string,
  description: string,
  url: string,
  features: string[],
  howToSteps: Array<{ name: string; text: string }>,
  faqs: Array<{ question: string; answer: string }>,
): {
  software: EnhancedSoftwareApplicationSchema;
  howTo: HowToSchema;
  faq: FAQPageSchema;
} {
  const softwareSchema: EnhancedSoftwareApplicationSchema = {"@context":"https://schema.org","@type":"SoftwareApplication",
    name: toolName,
    description: description,
    url: url,
    applicationCategory:"UtilityApplication",
    offers: {"@type":"Offer",
      price:"0",
      priceCurrency:"USD",
    },
    featureList: features,
    operatingSystem:"Web Browser",
    author: {"@type":"Organization",
      name:"ToolNova",
    },
  };

  const howToSchema = getHowToSchema(toolName, description, howToSteps);
  const faqSchema = getFAQSchema(faqs);

  return {
    software: softwareSchema,
    howTo: howToSchema,
    faq: faqSchema,
  };
}
