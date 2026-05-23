/**
 * ChapterMark — 編集デザインの章番号マーク
 *
 * 縦ヘアライン → 漢数字（serif） → 英ラベル の3レイヤー。
 * 領域の沈静さを保ちつつ視線誘導の支点として機能する。
 *
 * 法務系ページなど数を持たない節では `num` を省略可。
 */
type ChapterMarkProps = {
  num?: string;
  label: string;
  align?: "left" | "center";
  className?: string;
};

export default function ChapterMark({
  num,
  label,
  align = "left",
  className = "",
}: ChapterMarkProps) {
  const wrapAlign =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${wrapAlign} ${className}`}>
      <span aria-hidden="true" className="block h-12 w-px bg-brand-primary/60" />
      <div className="flex items-baseline gap-4">
        {num ? (
          <span className="font-serif text-3xl text-brand-primary leading-none">
            {num}
          </span>
        ) : null}
        <span className="text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
