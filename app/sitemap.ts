// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import solutions from "@/data/solutions";

const staticPaths = [
  "",
  "/about",
  "/solutions",
  "/ecommerce",
  "/homedome",
  "/insights",
  "/faqs",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const base = staticPaths.map((p) => ({
    url: `${SITE.baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const solutionPages = solutions.map((s) => ({
    url: `${SITE.baseUrl}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...solutionPages];
}
