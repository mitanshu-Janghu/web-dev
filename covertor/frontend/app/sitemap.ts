import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["contact", "privacy", "terms"];

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages.map((page) => ({
      url: `${siteConfig.baseUrl}/${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.baseUrl}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
