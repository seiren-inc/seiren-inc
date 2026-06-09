import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

type AftercareTokenPageProps = {
  params: Promise<{ token: string }>;
  searchParams?: Promise<{ source?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getAftercarePageMeta("index");
}

export default async function AftercareTokenPage({
  params,
  searchParams,
}: AftercareTokenPageProps) {
  const { token } = await params;
  const caseRecord = await getAftercareCaseByToken(token);

  if (!caseRecord) {
    notFound();
  }

  const search = searchParams ? await searchParams : undefined;
  const source = search?.source?.trim() || AFTERCARE_DEFAULT_SOURCE;

  return (
    <main id="main-content">
      <h1>{AFTERCARE_PAGES.index.heading}</h1>
      <p>{`${caseRecord.customerName}${AFTERCARE_TEXT.introLeadWithName}`}</p>
      <p>{caseRecord.albumTitle}</p>
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
