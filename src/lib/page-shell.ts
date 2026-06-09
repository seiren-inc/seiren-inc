import type { Metadata } from "next";

type PageShellOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageShellOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
  };
}
