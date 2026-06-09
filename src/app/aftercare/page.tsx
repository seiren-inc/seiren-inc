import type { Metadata } from "next";
import Link from "next/link";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

export const metadata: Metadata = getAftercarePageMeta("index");

type AftercareIndexPageProps = {
  searchParams?: Promise<{
    source?: string;
    token?: string;
  }>;
};

export default async function AftercarePage({
  searchParams,
}: AftercareIndexPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const source = params?.source?.trim() || AFTERCARE_DEFAULT_SOURCE;
  const token = params?.token?.trim() || null;
  const caseRecord = token ? await getAftercareCaseByToken(token) : null;

  return (
    <main id="main-content">
      <h1>{AFTERCARE_PAGES.index.heading}</h1>
      <p>
        {caseRecord
          ? `${caseRecord.customerName}${AFTERCARE_TEXT.introLeadWithName}`
          : AFTERCARE_TEXT.introLead}
      </p>
      <p>
        <Link
          href={buildAftercareHref(AFTERCARE_PAGES.survey.href, {
            source,
            token,
          })}
        >
          {AFTERCARE_TEXT.introCta}
        </Link>
      </p>
    </main>
  );
}
