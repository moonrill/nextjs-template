import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface ConstructMetadataProps {
  title?: string | { default: string; template: string };
  description?: string;
  image?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  canonicalUrl?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: Array<{ name: string; url?: string }>;
}

/**
 * Helper utility to build consistent, SEO-optimized metadata for Next.js pages.
 * Supports OpenGraph, Twitter Cards, Canonical URLs, Robots, and title templating.
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  canonicalUrl,
  keywords = [...siteConfig.keywords],
  type = "website",
  publishedTime,
  authors,
}: ConstructMetadataProps = {}): Metadata {
  const metadataTitle: Metadata["title"] =
    typeof title === "object" && title !== null
      ? title
      : title
        ? `${title} | ${siteConfig.name}`
        : {
            default: siteConfig.name,
            template: `%s | ${siteConfig.name}`,
          };

  const ogTitle =
    typeof title === "object" && title !== null
      ? title.default
      : title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name;

  return {
    metadataBase: new URL(siteConfig.url),
    title: metadataTitle,
    description,
    keywords,
    authors: authors || [
      { name: siteConfig.author.name, url: siteConfig.author.url },
    ],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl || "./",
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl || "./",
      title: ogTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
      creator: siteConfig.links.twitter,
    },
    icons,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
