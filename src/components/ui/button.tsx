import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-[0_0_15px_rgba(124,58,237,0.4)]": variant === "default",
            "border border-[rgba(255,255,255,0.1)] bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-white": variant === "outline",
            "hover:bg-[rgba(255,255,255,0.05)] text-white bg-transparent": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
