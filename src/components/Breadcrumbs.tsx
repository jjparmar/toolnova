"use client";

import { usePathname } from"next/navigation";
import Link from"next/link";
import { ChevronRight, Home } from"lucide-react";
import { getBreadcrumbSchema, schemaToJsonLd } from"@/lib/schema";
import { siteConfig } from"@/config/site";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname ==="/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const url = `/${segments.slice(0, index + 1).join("/")}`;
    const name = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { name, url };
  });

  const schema = getBreadcrumbSchema([
    { name:"Home", url: siteConfig.url },
    ...breadcrumbs.map((b) => ({
      name: b.name,
      url:`${siteConfig.url}${b.url}`,
    })),
  ]);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(schema) }}
      />
      <ol
        className="flex items-center space-x-2 text-sm text-muted-foreground"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="/"
            className="flex items-center hover:text-primary transition-colors"
            title="Home"
            itemProp="item"
          >
            <Home className="h-4 w-4" />
            <span itemProp="name" className="sr-only">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const position = index + 2;

          return (
            <li
              key={crumb.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center space-x-2"
            >
              <ChevronRight className="h-4 w-4 opacity-50" />
              {isLast ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                  itemProp="name"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.url}
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
