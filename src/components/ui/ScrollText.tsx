"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/** Text whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({
  text,
  accent = [],
  className,
  as: Tag = "p",
}: {
  text: string;
  /** Words (exact match, punctuation included) rendered with the brand gradient. */
  accent?: string[];
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <div ref={ref}>
      <Tag aria-label={text} className={cn("flex flex-wrap", className)}>
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            gradient={accent.includes(w)}
            still={!!reduce}
          >
            {w}
          </Word>
        ))}
      </Tag>
    </div>
  );
}

function Word({
  progress,
  range,
  gradient,
  still,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  gradient: boolean;
  still: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, range, [still ? 1 : 0.12, 1]);
  const y = useTransform(progress, range, [still ? 0 : 10, 0]);
  const blur = useTransform(progress, range, [still ? "blur(0px)" : "blur(4px)", "blur(0px)"]);
  return (
    <motion.span aria-hidden style={{ opacity, y, filter: blur }} className={cn("mr-[0.28em] inline-block", gradient && "text-gradient")}>
      {children}
    </motion.span>
  );
}
