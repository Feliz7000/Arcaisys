import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Arcaisys home" className={cn("group flex items-center gap-2.5", className)}>
      <Image
        src="/brand/arcaisys-mark.png"
        alt=""
        width={36}
        height={32}
        priority
        className="h-8 w-auto transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
      />
      <span className="font-display text-[15px] font-semibold tracking-[0.28em] text-ink">ARCAISYS</span>
    </Link>
  );
}
