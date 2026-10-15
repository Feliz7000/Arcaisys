"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll-linked 3D entrance: the element swings up from a tilted, lowered position
 * as it travels into the viewport, and reverses if you scroll back.
 */
export function ScrollIn({
  children,
  className,
  from = 18,
}: {
  children: React.ReactNode;
  className?: string;
  /** Starting tilt in degrees. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 65%"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [reduce ? 0 : from, 0]);
  const y = useTransform(p, [0, 1], [reduce ? 0 : 90, 0]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 0.9, 1]);
  const opacity = useTransform(p, [0, 0.6], [reduce ? 1 : 0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, y, scale, opacity, transformPerspective: 1200, transformOrigin: "50% 100%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
