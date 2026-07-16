"use client";

import Script from"next/script";
import { siteConfig } from"@/config/site";

interface SemanticSEOProps {
  type?:"website" |"article" |"tool" |"blog" |"category";
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
  author?: string;
  datePublished?: string;
  dateModified?: string;
  category?: string;
  speakableContent?: string;
}

/**
 * SemanticSEO Component for AI Search Optimization
 * Provides structured data optimized for AI search engines and voice search
 */
export function SemanticSEO({
  type ="website",
  title = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  image =`${siteConfig.url}/logo.png`,
  keywords = [...siteConfig.keywords],
  author ="ToolNova Team",
  datePublished,
  dateModified,
  category,
  speakableContent,
}: SemanticSEOProps) {
  const semanticMetaTags = {"primary-topic": category ||"AI Tools",
    keywords: keywords.slice(0, 10).join(","),
  };

  // Generate speakable specification for voice search
  const speakableSchema = {"@context":"https://schema.org","@type":"SpeakableSpecification",
    cssSelector: [".speakable",".hero-text",".tool-description","h1","h2:first-of-type"],
    xpath: ["/html/head/title","/html/head/meta[@name='description']/@content","/html/body//h1",
    ],
  };

  // Generate main entity schema
  const mainEntitySchema = {"@context":"https://schema.org","@type": type ==="tool" ?"WebApplication" : type ==="blog" ?"Article" :"WebPage",
    name: title,
    description,
    url,
    image,
    ...(type ==="blog" && {
      author: {"@type":"Organization",
        name:"ToolNova Editorial Team",
      },
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
      publisher: {"@type":"Organization",
        name:"ToolNova",
        url: siteConfig.url,
      },
    }),
    ...(type ==="tool" && {
      applicationCategory:"EducationalApplication",
      operatingSystem:"Web Browser",
      offers: {"@type":"Offer",
        price:"0",
        priceCurrency:"USD",
      },
    }),
  };

  return (
    <>
      {Object.entries(semanticMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}

      {/* Semantic content hints for AI */}
      <meta name="about" content={keywords.slice(0, 5).join(",")} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Speakable Specification for Voice Search */}
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />

      {/* Main Entity Schema */}
      <Script
        id="main-entity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainEntitySchema),
        }}
      />

      {/* Custom speakable content if provided */}
      {speakableContent && (
        <div className="speakable sr-only" aria-hidden="true">
          {speakableContent}
        </div>
      )}
    </>
  );
}

/**
 * AEOContent Component - Optimizes content for Answer Engine Optimization
 * Wraps content with semantic hints for AI summarization
 */
export function AEOContent({
  children,
  as ="div",
  summary,
  keyPoints,
  className ="",
}: {
  children: React.ReactNode;
  as?:"div" |"section" |"article" |"aside";
  summary?: string;
  keyPoints?: string[];
  className?: string;
}) {
  const Component = as;

  return (
    <Component
      className={`aeo-content ${className}`}
      data-summary={summary}
      data-key-points={keyPoints?.join("|")}
      itemScope
      itemType="https://schema.org/Thing"
    >
      {/* Hidden summary for AI summarization */}
      {summary && (
        <meta itemProp="description" content={summary} />
      )}
      {children}
    </Component>
  );
}

/**
 * FeaturedSnippet Component - Optimizes content for featured snippets
 */
export function FeaturedSnippet({
  question,
  answer,
  steps,
  list,
  table,
}: {
  question: string;
  answer?: string;
  steps?: { step: number; title: string; description: string }[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
}) {
  return (
    <div
      className="featured-snippet"
      itemScope
      itemType="https://schema.org/Answer"
    >
      <h2 itemProp="name" className="text-xl font-bold mb-4">
        {question}
      </h2>

      {answer && (
        <p itemProp="text" className="mb-4">
          {answer}
        </p>
      )}

      {steps && steps.length > 0 && (
        <ol className="list-decimal list-inside space-y-2">
          {steps.map((step) => (
            <li key={step.step} itemProp="step" itemScope itemType="https://schema.org/HowToStep">
              <strong itemProp="name">{step.title}:</strong>{""}
              <span itemProp="text">{step.description}</span>
            </li>
          ))}
        </ol>
      )}

      {list && list.length > 0 && (
        <ul className="list-disc list-inside space-y-1">
          {list.map((item, index) => (
            <li key={index} itemProp="item">
              {item}
            </li>
          ))}
        </ul>
      )}

      {table && (
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr>
              {table.headers.map((header, index) => (
                <th key={index} className="border p-2 bg-gray-100">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/**
 * KnowledgePanel Component - Optimizes content for Google Knowledge Panel
 */
export function KnowledgePanel({
  name,
  description,
  image,
  url,
  sameAs,
  foundingDate,
  founder,
  headquarters,
  employees,
  products,
}: {
  name: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  foundingDate?: string;
  founder?: string;
  headquarters?: string;
  employees?: string;
  products?: string[];
}) {
  return (
    <aside
      className="knowledge-panel"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <h2 itemProp="name" className="text-2xl font-bold">
        {name}
      </h2>
      <p itemProp="description" className="mt-2">
        {description}
      </p>
      {image && (
        <img
          itemProp="image"
          src={image}
          alt={name}
          className="mt-4 rounded-lg"
        />
      )}
      <dl className="mt-4 space-y-2">
        {url && (
          <div>
            <dt className="font-semibold">Website</dt>
            <dd>
              <a href={url} itemProp="url">
                {url}
              </a>
            </dd>
          </div>
        )}
        {foundingDate && (
          <div>
            <dt className="font-semibold">Founded</dt>
            <dd itemProp="foundingDate">{foundingDate}</dd>
          </div>
        )}
        {founder && (
          <div>
            <dt className="font-semibold">Founder</dt>
            <dd itemProp="founder">{founder}</dd>
          </div>
        )}
        {headquarters && (
          <div>
            <dt className="font-semibold">Headquarters</dt>
            <dd itemProp="address">{headquarters}</dd>
          </div>
        )}
        {employees && (
          <div>
            <dt className="font-semibold">Employees</dt>
            <dd itemProp="numberOfEmployees">{employees}</dd>
          </div>
        )}
        {products && products.length > 0 && (
          <div>
            <dt className="font-semibold">Products</dt>
            <dd>
              <ul className="list-disc list-inside">
                {products.map((product, index) => (
                  <li key={index} itemProp="product">
                    {product}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
      {sameAs && sameAs.length > 0 && (
        <div className="mt-4 flex gap-4">
          {sameAs.map((link, index) => (
            <a
              key={index}
              href={link}
              itemProp="sameAs"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}

export default SemanticSEO;
