import type { Metadata } from "next";
import Link from "next/link";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_DEFAULT_LINKS,
  AFTERCARE_PAGES,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";
import ReviewActions from "./review-actions";

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

  if (!reviewUrl) {
    return (
      <main id="main-content">
        <h1>口コミ案内</h1>
        <p>{AFTERCARE_TEXT.reviewThanks}</p>
        <p>口コミ案内の準備中です。</p>
        <p>
          <Link href={albumHref}>{AFTERCARE_TEXT.reviewSkipCta}</Link>
        </p>
      </main>
    );
  }

  return (
    <main id="main-content">
      <h1>口コミ案内</h1>
      <p>{AFTERCARE_TEXT.reviewThanks}</p>
      <p>{AFTERCARE_TEXT.reviewRequest}</p>
      <ReviewActions
        submissionId={submissionId}
        source={source}
        token={token}
        reviewUrl={reviewUrl}
      />
    </main>
  );
}
