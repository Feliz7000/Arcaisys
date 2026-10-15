"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Start on the floor",
    body: "We spend time where the work happens — the kitchen pass, the reading room, the ward desk — before we draw a single screen.",
  },
  {
    n: "02",
    title: "Design the whole system",
    body: "Every role gets a purpose-built tool, all sharing one source of truth, so information moves without re-keying.",
  },
  {
    n: "03",
    title: "Add AI where it earns its place",
    body: "Intelligence goes where it saves real time or catches real mistakes — and its output is checked, not trusted blindly.",
  },
  {
    n: "04",
    title: "Ship, measure, improve",
    body: "We release early, watch how the product is used in production and keep refining it with the people who depend on it.",
  },
];

export function Approach() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 200, damping: 35, mass: 0.4 });
  const [reached, setReached] = useState(-1);

  // Re-render only when the reached step changes, not on every scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v <= 0.01 ? -1 : Math.min(steps.length - 1, Math.round(v * (steps.length - 1)));
    if (next !== reached) setReached(next);
  });

  return (
    <section id="approach" className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="How we build"
            title={<>Practical by design. <span className="text-gradient">Intelligent</span> by default.</>}
            lead="Understand the work deeply, build the system around the people, then let AI multiply what they can do."
          />
          <Reveal delay={0.1} className="glass mt-10 rounded-2xl p-6">
            <p className="font-display text-lg leading-snug font-medium text-ink">
              &ldquo;If we can&apos;t verify it, we don&apos;t ship it.&rdquo;
            </p>
            <p className="mt-2 text-sm text-muted">
              The principle behind Meridian runs through everything we build: AI should show its evidence.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative space-y-5">
          {/* Track, plus a gradient fill that grows with scroll. */}
          <span aria-hidden className="absolute top-8 bottom-8 left-[2.85rem] w-0.5 rounded-full bg-line sm:left-[3.1rem]" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute top-8 bottom-8 left-[2.85rem] w-0.5 origin-top rounded-full bg-gradient-to-b from-amber via-flame to-crimson shadow-[0_0_12px_rgba(242,54,28,0.6)] sm:left-[3.1rem]"
          />
          {steps.map((s, i) => {
            const on = reduce || i <= reached;
            return (
              <li
                key={s.n}
                className={cn(
                  "glass relative flex gap-6 rounded-3xl p-6 transition-all duration-500 sm:p-7",
                  on ? "translate-x-0 opacity-100" : "translate-x-4 opacity-50",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 grid size-11 shrink-0 place-items-center rounded-2xl font-mono text-sm font-semibold transition-all duration-500",
                    on ? "bg-brand scale-100 text-white shadow-lg shadow-orange/30" : "scale-90 bg-white text-muted ring-1 ring-line",
                  )}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
