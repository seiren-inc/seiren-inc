import type { ReactNode } from "react";
import { AFTERCARE_PAGES, AFTERCARE_STEPS } from "@/constants/aftercare";
import type { AftercarePageKey } from "@/types/aftercare";

type AftercarePageShellProps = {
  pageKey: AftercarePageKey;
  lead?: string;
  children: ReactNode;
};

/**
 * AftercarePageShell — aftercareフロー全ページ共通のUIシェル
 * ステップインジケーター + セクションラベル + 見出し + リード文 + children
 * デザインコンセプト: 上質で静かな高級感、余白を広く、供養サービスの安心感
 */
export default function AftercarePageShell({
  pageKey,
  lead,
  children,
}: AftercarePageShellProps) {
  const page = AFTERCARE_PAGES[pageKey];
  const currentIndex = AFTERCARE_STEPS.findIndex((s) => s.key === pageKey);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-aftercare-warm">
      <div className="max-w-md mx-auto px-6 py-10 md:max-w-lg md:px-8">

        {/* ステップインジケーター */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="flex items-center">
            {AFTERCARE_STEPS.map((step, idx) => {
              const isCompleted = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={step.key} className="flex items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                      ${isCompleted
                        ? "bg-brand-primary text-white"
                        : isCurrent
                          ? "bg-aftercare-gold text-white shadow-sm shadow-aftercare-gold/30"
                          : "bg-gray-200 text-neutral-muted"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  {idx < AFTERCARE_STEPS.length - 1 && (
                    <div
                      className={`w-8 h-[2px] ${
                        idx < currentIndex ? "bg-brand-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs font-semibold text-aftercare-gold tracking-[0.15em]">
            {AFTERCARE_STEPS[currentIndex]?.label}
          </p>
        </div>

        {/* 英語ラベル + ゴールド装飾線 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-8 bg-aftercare-gold/40" />
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-aftercare-gold">
            {page.eyebrow}
          </p>
          <div className="h-[1px] w-8 bg-aftercare-gold/40" />
        </div>

        {/* ページタイトル */}
        <h1
          className="text-center font-serif font-bold text-neutral-text tracking-[0.06em] leading-snug mb-4"
          style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.5vw, 1.625rem)" }}
        >
          {page.heading}
        </h1>

        {/* ゴールドアクセント線 */}
        <div className="w-12 h-[1px] bg-aftercare-gold mx-auto mb-8" />

        {/* リード文 */}
        {lead && (
          <p className="text-base leading-[2] text-neutral-text tracking-[0.04em] text-left mb-8">
            {lead}
          </p>
        )}

        {/* ページコンテンツ */}
        {children}
      </div>
    </div>
  );
}
