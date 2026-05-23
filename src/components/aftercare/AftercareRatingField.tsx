"use client";

import type { SatisfactionScore } from "@/types/aftercare";

type AftercareRatingFieldProps = {
  id: string;
  label: string;
  value: SatisfactionScore | null;
  onChange: (value: SatisfactionScore) => void;
  error?: string;
  hint?: string;
};

const options: { value: SatisfactionScore; emoji: string; label: string }[] = [
  { value: 5, emoji: "😊", label: "大変満足" },
  { value: 4, emoji: "🙂", label: "満足" },
  { value: 3, emoji: "😐", label: "ふつう" },
  { value: 2, emoji: "😟", label: "やや不満" },
];

/**
 * AftercareRatingField — 絵文字4段階の満足度セレクター
 * 高齢者でもタップしやすい大きなタッチターゲット（min-h 80px）。
 * デザインコンセプト: 直感的、視認性重視、誤タップ防止。
 *
 * NOTE: SatisfactionScore は 1-5 だが、UI上は 2-5 の4段階を表示。
 * 「1 = 不満」は心理的に選びにくいため非表示。
 */
export default function AftercareRatingField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
}: AftercareRatingFieldProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <fieldset>
        <div className="flex items-baseline gap-2 mb-1">
          <legend className="text-base font-semibold text-neutral-text">
            {label}
          </legend>
        </div>
        {hint && (
          <p className="text-sm text-neutral-muted mb-4">{hint}</p>
        )}

        <div className="grid grid-cols-4 gap-3">
          {options.map((opt) => {
            const isSelected = value === opt.value;

            return (
              <label
                key={opt.value}
                htmlFor={`${id}-${opt.value}`}
                className={`
                  flex flex-col items-center justify-center gap-1.5 cursor-pointer
                  min-h-[80px] rounded-xl border-2 transition-all duration-200
                  active:scale-[0.96]
                  ${isSelected
                    ? "bg-brand-secondary border-brand-primary shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <input
                  id={`${id}-${opt.value}`}
                  name={id}
                  type="radio"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  className="sr-only"
                />
                <span className="text-[28px] leading-none" role="img" aria-label={opt.label}>
                  {opt.emoji}
                </span>
                <span
                  className={`text-[11px] font-semibold leading-tight text-center ${
                    isSelected ? "text-brand-primary" : "text-neutral-muted"
                  }`}
                >
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    </div>
  );
}
