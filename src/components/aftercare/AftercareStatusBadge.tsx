import { cn } from "@/lib/utils";

type AftercareStatusBadgeProps = {
  label: string;
  tone: "neutral" | "success" | "warning";
};

export default function AftercareStatusBadge({
  label,
  tone,
}: AftercareStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-[0.08em]",
        tone === "success" && "bg-green-100 text-green-700",
        tone === "warning" && "bg-amber-100 text-amber-700",
        tone === "neutral" && "bg-gray-100 text-gray-600"
      )}
    >
      {label}
    </span>
  );
}
