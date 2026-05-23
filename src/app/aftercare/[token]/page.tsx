import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AftercarePageShell from "@/components/aftercare/AftercarePageShell";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

type AftercareTokenPageProps = {
  params: Promise<{
    token: string;
  }>;
  searchParams?: Promise<{
    source?: string;
  }>;
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
    <AftercarePageShell
      pageKey="index"
      lead={`${caseRecord.customerName}${AFTERCARE_TEXT.introLeadWithName}`}
    >
      <div className="space-y-8">
        <div className="rounded-3xl bg-brand-secondary px-5 py-6 md:px-8">
          <h2 className="text-xl font-serif font-bold text-gray-900">
            {caseRecord.albumTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">
            ご回答後はご案内に応じて口コミページまたはアルバム案内に進みます。口コミ投稿は任意です。
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
            <p className="text-sm text-neutral-muted">{AFTERCARE_TEXT.introStatsDuration}</p>
            <p className="text-sm text-neutral-muted">{AFTERCARE_TEXT.introStatsQuestions}</p>
          </div>
        </div>

        <Link
          href={buildAftercareHref(AFTERCARE_PAGES.survey.href, {
            source,
            token,
          })}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-brand-primary px-6 py-4 text-center text-base font-bold text-white transition-colors hover:bg-brand-hover"
        >
          {AFTERCARE_TEXT.introCta}
        </Link>
      </div>
    </AftercarePageShell>
  );
}
