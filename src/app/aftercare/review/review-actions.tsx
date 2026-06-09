"use client";

import { useRouter } from "next/navigation";
import { trackAftercareEvent } from "@/lib/aftercare/analytics";
import { buildAftercareHref } from "@/lib/aftercare/navigation";

type ReviewActionsProps = {
  submissionId: string | null;
  source: string;
  reviewUrl: string;
  token?: string | null;
};

export default function ReviewActions({
  submissionId,
  source,
  reviewUrl,
  token = null,
}: ReviewActionsProps) {
  const router = useRouter();

  async function handleReviewClick() {
    if (submissionId) {
      await trackAftercareEvent({
        id: submissionId,
        eventType: "review_click",
      });
    }
  }

  async function handleAlbumClick() {
    if (submissionId) {
      await trackAftercareEvent({
        id: submissionId,
        eventType: "album_click",
      });
    }

    router.push(
      buildAftercareHref("/aftercare/album", {
        id: submissionId,
        source,
        token,
      })
    );
  }

  return (
    <div>
      <p>
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer" onClick={handleReviewClick}>
          口コミページを開く
        </a>
      </p>
      <button type="button" onClick={handleAlbumClick}>
        アルバム案内へ進む
      </button>
    </div>
  );
}
