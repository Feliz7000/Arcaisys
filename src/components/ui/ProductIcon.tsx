import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** The product's own mark on a white tile. */
export function ProductIcon({ product, className }: { product: Product; className?: string }) {
  const raster = product.mark.endsWith(".png");
  return (
    <span
      className={cn(
        "relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <Image
        src={product.mark}
        alt=""
        width={96}
        height={96}
        className={cn("size-full object-contain", raster ? "p-0.5" : "p-[16%]")}
      />
    </span>
  );
}
