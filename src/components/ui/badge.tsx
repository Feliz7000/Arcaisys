import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glow";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-2",
        {
          "border-transparent bg-[#7c3aed] text-white hover:bg-[#6d28d9]": variant === "default",
          "border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.05)]": variant === "outline",
          "border-[#7c3aed] bg-[#7c3aed]/10 text-[#a855f7] shadow-[0_0_10px_rgba(124,58,237,0.3)]": variant === "glow",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
