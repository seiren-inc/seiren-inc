import { MetadataRoute } from "next";
import { SEO_BASE_URL } from "@/lib/seo";

const normalizePath = (route: string): string =>
  route === "/" ? "/" : route.replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/business",
    "/company",
    "/contact",
    "/partner",
    "/privacy",
    "/strength",
    "/terms",
  ].map((route) => {
    const normalizedRoute = normalizePath(route);

    return {
      url: normalizedRoute === "/" ? SEO_BASE_URL : `${SEO_BASE_URL}${normalizedRoute}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
      priority: normalizedRoute === "/" ? 1 : 0.8,
    };
  });

  return routes;
}
