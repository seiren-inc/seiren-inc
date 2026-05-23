import type { Metadata } from "next";
import { AFTERCARE_PAGES } from "@/constants/aftercare";
import type { AftercarePageKey } from "@/types/aftercare";

export function getAftercarePageMeta(pageKey: AftercarePageKey): Metadata {
  const page = AFTERCARE_PAGES[pageKey];

  return {
    title: `${page.title}｜株式会社清蓮`,
    description: page.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}
