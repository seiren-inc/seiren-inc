"use client";

import { useState } from "react";
import { AFTERCARE_TEXT } from "@/constants/aftercare";
import { trackAftercareEvent } from "@/lib/aftercare/analytics";

type AftercareAlbumActionsProps = {
  submissionId: string | null;
  albumUrl: string;
};

/**
 * AftercareAlbumActions — Suzuri Albumへの外部リンクボタン
 * デザイン設計書の大きなCTAスタイルに統一。
 */
export default function AftercareAlbumActions({
  submissionId,
  albumUrl,
}: AftercareAlbumActionsProps) {
  const [isTracking, setIsTracking] = useState(false);

  async function handleAlbumVisit() {
    if (isTracking) {
      return;
    }

    setIsTracking(true);

    if (submissionId) {
      await trackAftercareEvent({
        id: submissionId,
        eventType: "album_click",
      });
    }

    window.open(albumUrl, "_blank", "noopener,noreferrer");
    setIsTracking(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAlbumVisit}
        disabled={isTracking}
        className="
          flex items-center justify-center gap-3
          w-full py-5 bg-brand-primary text-white
          font-bold text-base rounded-xl tracking-[0.1em]
          hover:bg-brand-hover transition-all duration-300
          active:scale-[0.98]
          shadow-lg shadow-brand-primary/15
          disabled:cursor-not-allowed disabled:opacity-60
        "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        {AFTERCARE_TEXT.albumCta}
      </button>
      <p className="text-xs text-neutral-muted text-center mt-2">
        別タブで開きます
      </p>
    </div>
  );
}
