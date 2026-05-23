"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AFTERCARE_TEXT } from "@/constants/aftercare";
import { trackAftercareEvent } from "@/lib/aftercare/analytics";
import { buildAftercareHref } from "@/lib/aftercare/navigation";

type AftercareReviewActionsProps = {
  submissionId: string | null;
  source: string;
  reviewUrl: string;
  token?: string | null;
};

/**
 * AftercareReviewActions — 口コミ＋写真案内の並列ボタン（Framer Motionモダン版）
 *
 * 口コミボタン押下後にユーザーが元タブに戻ると:
 * 1. AnimatePresenceで口コミボタンが退場し、完了バッジがスプリングでポップイン
 * 2. 感謝メッセージが優雅にフェード・スライドイン
 * 3. 写真ボタンに強いハイライトシマー（きらめき）と浮遊感が加わり、注目を集める
 * 4. 「次のステップ」も躍動感のある登場
 */
export default function AftercareReviewActions({
  submissionId,
  source,
  reviewUrl,
  token = null,
}: AftercareReviewActionsProps) {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);
  const [reviewOpened, setReviewOpened] = useState(false);
  const [returnedFromReview, setReturnedFromReview] = useState(false);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const albumHref = useMemo(
    () =>
      buildAftercareHref("/aftercare/album", {
        id: submissionId,
        source,
        token,
      }),
    [submissionId, source, token]
  );

  // visibilitychange で「別タブから戻ってきた」ことを検知
  useEffect(() => {
    if (!reviewOpened) return;

    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && !returnedFromReview) {
        setReturnedFromReview(true);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reviewOpened, returnedFromReview]);

  const handleReviewClick = useCallback(async () => {
    setReviewOpened(true);

    if (submissionId) {
      await trackAftercareEvent({
        id: submissionId,
        eventType: "review_click",
      });
    }
  }, [submissionId]);

  const handleAlbumClick = useCallback(async () => {
    if (isRouting) return;

    setIsRouting(true);

    if (submissionId) {
      await trackAftercareEvent({
        id: submissionId,
        eventType: "album_click",
      });
    }

    // Modern feature: Provide a slight delay to show exit animations if we had any
    router.push(albumHref);
  }, [isRouting, submissionId, albumHref, router]);

  // アニメーション有無の判定
  const showPostReview = returnedFromReview;
  const disableAnimations = prefersReducedMotion;

  // アニメーション設定
  const springConfig = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!showPostReview ? (
          <motion.div
            key="pre-review"
            initial={disableAnimations ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={disableAnimations ? {} : { opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* ボタンA: Google口コミを書く */}
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReviewClick}
              className="
                flex items-center justify-center gap-3
                w-full py-5 bg-aftercare-navy text-white
                font-bold text-base rounded-xl tracking-[0.1em]
                hover:bg-aftercare-navy-hover transition-all duration-300
                active:scale-[0.98]
              "
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {AFTERCARE_TEXT.reviewCta}
            </a>
            <p className="text-xs text-neutral-muted text-center">別タブで開きます</p>

            {/* 区切り */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <span className="text-xs text-neutral-muted tracking-wider">または</span>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="post-review"
            initial={disableAnimations ? {} : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...springConfig }}
            className="space-y-6" // メッセージとの間隔を広げる
          >
            {/* 口コミページを開いた後の完了状態（プレミアムバッジ風） */}
            <div
              className="
                flex flex-col items-center justify-center gap-2
                w-full py-4 bg-brand-secondary/50 border border-brand-primary/20
                text-brand-primary rounded-xl
              "
            >
              <motion.div
                initial={disableAnimations ? {} : { scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-500/30"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p className="font-bold text-sm tracking-[0.1em] mt-1">口コミページを開きました</p>
            </div>
            
            {/* 感謝メッセージ */}
            <motion.div
              initial={disableAnimations ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center pb-2"
            >
            <p className="text-lg font-bold text-neutral-text leading-relaxed tracking-wider">
              ご協力いただき
              <br />
              誠にありがとうございます
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 写真ボタン（Framer Motionモダン演出） ─── */}
      <motion.div
        animate={
          showPostReview && !disableAnimations
            ? {
                scale: [1, 1.03, 1], // 全体のスケールが1回だけ大きく跳ねる
              }
            : {}
        }
        transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 400, damping: 10 }}
        className="relative pt-2"
      >
        {/* モダンなハイライトの光輪（口コミ後のみ表示＆点滅） */}
        <AnimatePresence>
          {showPostReview && !disableAnimations && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 0.4, 0.8, 0.2] }}
              transition={{ delay: 0.9, duration: 2.5, times: [0, 0.2, 0.4, 0.7, 1] }}
              className="absolute -inset-2 bg-brand-primary/20 blur-xl rounded-2xl pointer-events-none"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleAlbumClick}
          disabled={isRouting}
          className={`
            relative z-10 flex items-center justify-center gap-3
            w-full py-5 bg-brand-primary text-white
            font-bold text-base rounded-xl tracking-[0.1em]
            hover:bg-brand-hover transition-all duration-300
            active:scale-[0.98] overflow-hidden
            ${showPostReview ? "shadow-xl shadow-brand-primary/40" : "shadow-lg shadow-brand-primary/15"}
            disabled:cursor-not-allowed disabled:opacity-60
          `}
        >
          {/* モダンきらめき効果（口コミ後に左から右へ斜め線が走り抜ける） */}
          <AnimatePresence>
            {showPostReview && !disableAnimations && (
              <motion.div
                initial={{ x: "-100%", skewX: "-20deg" }}
                animate={{ x: "250%" }}
                transition={{ delay: 1.1, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"
              />
            )}
          </AnimatePresence>

          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            {AFTERCARE_TEXT.reviewSkipCta}
          </span>
        </button>

        {/* 誘導ラベル（口コミ後にスライドイン） */}
        <AnimatePresence>
          {showPostReview && (
            <motion.div
              initial={disableAnimations ? {} : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, ...springConfig }}
              className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none"
            >
              <span className="bg-aftercare-navy text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md tracking-wider">
                次はこちらへお進みください ↓
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── 注意事項 ─── */}
      <AnimatePresence>
        {!showPostReview && (
          <motion.p
            exit={disableAnimations ? {} : { opacity: 0 }}
            className="text-[13px] leading-relaxed text-neutral-muted text-center pt-2"
          >
            ※ {AFTERCARE_TEXT.reviewOptional}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
