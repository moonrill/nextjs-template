import { describe, it, expect } from "vitest";
import { constructMetadata } from "./seo";
import { siteConfig } from "@/config/site";

describe("constructMetadata", () => {
  it("should return default metadata matching siteConfig", () => {
    const metadata = constructMetadata();

    expect(metadata.title).toEqual({
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    });
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
    expect(metadata.openGraph?.siteName).toBe(siteConfig.name);
    expect(metadata.robots).toEqual(
      expect.objectContaining({
        index: true,
        follow: true,
      })
    );
  });

  it("should format custom page title and override description", () => {
    const metadata = constructMetadata({
      title: "Custom Page",
      description: "Custom Page Description",
    });

    expect(metadata.title).toBe(`Custom Page | ${siteConfig.name}`);
    expect(metadata.description).toBe("Custom Page Description");
    expect(metadata.openGraph?.title).toBe(`Custom Page | ${siteConfig.name}`);
    expect(metadata.openGraph?.description).toBe("Custom Page Description");
  });

  it("should disable indexing when noIndex is true", () => {
    const metadata = constructMetadata({
      noIndex: true,
    });

    expect(metadata.robots).toEqual(
      expect.objectContaining({
        index: false,
        follow: false,
      })
    );
  });

  it("should set custom canonical URL and image", () => {
    const metadata = constructMetadata({
      canonicalUrl: "https://example.com/custom",
      image: "https://example.com/custom.png",
    });

    expect(metadata.alternates?.canonical).toBe("https://example.com/custom");
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "https://example.com/custom.png",
      }),
    ]);
  });
});
