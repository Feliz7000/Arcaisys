import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glow";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2",
        {
          "border-transparent bg-[#FF6B00] text-white hover:bg-[#8B0000]": variant === "default",
          "border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.05)]": variant === "outline",
          "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00] shadow-[0_0_40px_rgba(255,107,0,0.4)]": variant === "glow",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
