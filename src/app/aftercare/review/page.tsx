import type { Metadata } from "next";
import Link from "next/link";
import AftercarePageShell from "@/components/aftercare/AftercarePageShell";
import AftercareReviewActions from "@/components/aftercare/AftercareReviewActions";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_DEFAULT_LINKS,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

export const metadata: Metadata = getAftercarePageMeta("review");

type AftercareReviewPageProps = {
  searchParams?: Promise<{
    id?: string;
    source?: string;
    token?: string;
  }>;
};

export default async function AftercareReviewPage({
  searchParams,
}: AftercareReviewPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const submissionId = params?.id?.trim() || null;
  const source = params?.source?.trim() || AFTERCARE_DEFAULT_SOURCE;
  const token = params?.token?.trim() || null;
  const caseRecord = token ? await getAftercareCaseByToken(token) : null;
  const reviewUrl = caseRecord?.reviewUrl || AFTERCARE_DEFAULT_LINKS.reviewUrl;

  const albumHref = buildAftercareHref(AFTERCARE_PAGES.album.href, {
    id: submissionId,
    source,
    token,
  });

  // 口コミ URL が未設定の場合はアルバムへ直接案内する
  if (!reviewUrl) {
    return (
      <AftercarePageShell
        pageKey="review"
        lead={AFTERCARE_TEXT.reviewThanks}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
            <p className="text-base leading-[2] text-neutral-text tracking-[0.04em]">
              現在、口コミ案内の準備中です。引き続き写真案内へお進みください。
            </p>
          </div>
          <Link
            href={albumHref}
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-primary px-6 py-4 text-center text-base font-bold text-white transition-colors hover:bg-brand-hover"
          >
            {AFTERCARE_TEXT.reviewSkipCta}
          </Link>
        </div>
      </AftercarePageShell>
    );
  }

  return (
    <AftercarePageShell
      pageKey="review"
      lead={AFTERCARE_TEXT.reviewThanks}
    >
      <div className="space-y-6">
        {/* 口コミ案内カード */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
          <p className="text-base leading-[2] text-neutral-text tracking-[0.04em] mb-4">
            {AFTERCARE_TEXT.reviewRequest}
          </p>
          <p className="text-[13px] leading-relaxed text-neutral-muted">
            ※ {AFTERCARE_TEXT.reviewOptional}
          </p>
        </div>

        {/* ボタンエリア */}
        <AftercareReviewActions
          submissionId={submissionId}
          source={source}
          token={token}
          reviewUrl={reviewUrl}
        />
      </div>
    </AftercarePageShell>
  );
}
