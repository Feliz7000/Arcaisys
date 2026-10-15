"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Glass card with a soft light that follows the cursor, and an optional 3D tilt toward it. */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(255,106,19,0.16)",
  tilt = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
  /** Maximum tilt in degrees; 0 disables it. */
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    if (tilt && !reduce && e.pointerType === "mouse") {
      ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * tilt);
      rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * tilt);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn("glass group/spot relative overflow-hidden rounded-3xl", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x) var(--y), ${glow}, transparent 65%)` }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
