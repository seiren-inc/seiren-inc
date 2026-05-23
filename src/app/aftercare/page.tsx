import type { Metadata } from "next";
import Link from "next/link";
import AftercarePageShell from "@/components/aftercare/AftercarePageShell";
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
    <AftercarePageShell
      pageKey="index"
      lead={
        caseRecord
          ? `${caseRecord.customerName}${AFTERCARE_TEXT.introLeadWithName}`
          : AFTERCARE_TEXT.introLead
      }
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
            <div className="flex items-center justify-center gap-2 text-neutral-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{AFTERCARE_TEXT.introStatsDuration}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-neutral-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              <span className="text-sm">{AFTERCARE_TEXT.introStatsQuestions}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <p className="text-sm leading-[2] text-neutral-muted text-center">
            ご回答後はご案内に応じて口コミページまたはアルバム案内へ進みます。
            <br />
            口コミ投稿は任意であり、投稿の有無にかかわらずお写真はご覧いただけます。
          </p>
        </div>

        <Link
          href={buildAftercareHref(AFTERCARE_PAGES.survey.href, {
            source,
            token,
          })}
          className="
            flex items-center justify-center
            w-full py-5 bg-brand-primary text-white
            font-bold text-base rounded-xl tracking-[0.1em]
            hover:bg-brand-hover transition-all duration-300
            active:scale-[0.98]
            shadow-lg shadow-brand-primary/15
          "
        >
          {AFTERCARE_TEXT.introCta}
        </Link>
      </div>
    </AftercarePageShell>
  );
}
