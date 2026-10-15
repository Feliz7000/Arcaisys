import { cn } from "@/lib/utils";
import { statusLabel, type ProductStatus } from "@/lib/products";

export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium",
        live
          ? "border-emerald-200 bg-emerald-50/80 text-emerald-700"
          : "border-orange-200 bg-orange-50/80 text-orange-700",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full animate-pulse-dot", live ? "bg-emerald-500 text-emerald-500" : "bg-orange-500 text-orange-500")} />
      {statusLabel[status]}
    </span>
  );
}
