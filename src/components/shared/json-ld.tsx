import { siteConfig } from "@/config/site";

interface JsonLdProps {
  customSchema?: Record<string, unknown>;
}

/**
 * Structured Data (Schema.org) JSON-LD component for rich Google search snippets.
 */
export function JsonLd({ customSchema }: JsonLdProps) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.locale.replace("_", "-"),
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/favicon.ico`,
        sameAs: [siteConfig.links.github, siteConfig.links.twitter],
      },
    ],
  };

  const schema = customSchema || defaultSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
