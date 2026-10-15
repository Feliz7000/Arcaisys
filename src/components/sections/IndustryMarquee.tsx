"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const items = [
  "Hospitality",
  "Medical imaging",
  "Hospital operations",
  "Developer tools",
  "Applied AI",
  "Real-time systems",
  "Cloud & on-premise",
  "Data & analytics",
];

/** Percent of one copy's width moved per second when the page is still. */
const BASE_SPEED = 2.2;

export function IndustryMarquee() {
  const reduce = useReducedMotion();
  const offset = useMotionValue(0);
  const direction = useRef(1);

  // Scrolling speeds the band up; scrolling back up reverses it.
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    let next = offset.get() - direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(b));
    // Two copies sit side by side, so wrap within one copy's width (0 → -50%).
    next = ((next % 50) - 50) % 50;
    offset.set(next);
  });

  const x = useTransform(offset, (v) => `${v}%`);
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/70 bg-white/35 py-5 backdrop-blur-md [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div style={{ x }} className="flex w-max gap-12 pr-12">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-sm font-medium tracking-wide whitespace-nowrap text-muted">
            {t}
            <span className="size-1.5 rotate-45 bg-gradient-to-br from-amber to-flame" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
