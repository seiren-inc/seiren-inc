"use client";

import { useState, useCallback } from "react";

type AftercareCopyFieldProps = {
  label: string;
  value: string;
  /** trueの場合、デフォルトでマスク表示 + トグルボタン表示 */
  isPassword?: boolean;
};

/**
 * AftercareCopyField — コピーボタン付きの読み取り専用フィールド
 * isPassword=true の場合はマスク表示/非表示トグル付き。
 * デザイン: 暖かみのある白カード + 丸角 + 大きなタッチターゲット
 */
export default function AftercareCopyField({
  label,
  value,
  isPassword = false,
}: AftercareCopyFieldProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [revealed, setRevealed] = useState(!isPassword);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      // fallback for older browsers
      try {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setStatus("copied");
        window.setTimeout(() => setStatus("idle"), 2000);
      } catch {
        setStatus("error");
        window.setTimeout(() => setStatus("idle"), 2000);
      }
    }
  }, [value]);

  const displayValue = revealed
    ? value
    : "●".repeat(Math.min(value.length, 12));

  return (
    <div>
      <p className="text-xs font-semibold text-neutral-muted tracking-[0.1em] mb-2">
        {label}
      </p>
      <div className="flex items-center gap-2 bg-neutral-surface border border-gray-200 rounded-xl p-3.5">
        <span className="flex-1 text-sm font-mono text-neutral-text break-all select-all leading-relaxed">
          {displayValue}
        </span>

        {/* パスワード表示トグル */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-neutral-muted flex-shrink-0"
            aria-label={revealed ? "パスワードを隠す" : "パスワードを表示"}
          >
            {revealed ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}

        {/* コピーボタン */}
        <button
          type="button"
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
            status === "copied"
              ? "bg-green-100 text-green-600"
              : "hover:bg-gray-200 text-neutral-muted"
          }`}
          aria-label="コピー"
        >
          {status === "copied" ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </button>
      </div>

      <p className="mt-2 text-xs text-neutral-muted h-4" aria-live="polite">
        {status === "copied" ? `${label}をコピーしました` : null}
        {status === "error" ? "コピーに失敗しました。長押ししてコピーしてください。" : null}
      </p>
    </div>
  );
}
