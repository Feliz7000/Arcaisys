"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const stats = [
  { value: 4, label: "Products", note: "One live, three in active development" },
  { value: 5, label: "Apps inside RestoQR", note: "One for every role in the restaurant" },
  { value: 11, label: "Meridian tools", note: "Exposed to AI agents over MCP" },
  { value: 3, label: "Industries", note: "Hospitality, healthcare, engineering" },
];

export function Numbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center 55%"] });

  return (
    <section ref={ref} className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Stat key={s.label} stat={s} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function Stat({ stat, index, progress }: { stat: (typeof stats)[number]; index: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Stagger each tile's count across the scroll range.
  const start = index * 0.12;
  const local = useTransform(progress, [start, start + 0.6], [reduce ? 1 : 0, 1]);
  const count = useTransform(local, (v) => Math.round(v * stat.value));
  const y = useTransform(local, [0, 1], [40, 0]);
  const opacity = useTransform(local, [0, 0.4], [0.2, 1]);
  const bar = useTransform(local, [0, 1], [0, 1]);

  return (
    <motion.div style={{ y, opacity }} className="glass relative overflow-hidden rounded-3xl p-7">
      <motion.p className="text-gradient font-display text-7xl leading-none font-bold tabular-nums">{count}</motion.p>
      <p className="mt-4 font-display text-lg font-semibold text-ink">{stat.label}</p>
      <p className="mt-1 text-sm text-muted">{stat.note}</p>
      <motion.span style={{ scaleX: bar }} className="bg-brand absolute inset-x-0 bottom-0 h-1 origin-left" />
    </motion.div>
  );
}
