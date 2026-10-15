"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "default" | "hover" | "label" | "text" | "hidden";

const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]";
const TEXT = "input, textarea, select, [contenteditable='true']";

/**
 * Dot + trailing ring cursor. The ring grows over interactive elements and turns into a
 * labelled bubble over anything with data-cursor="Label". Mouse/trackpad only.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const classify = (el: Element | null) => {
      if (!el?.closest) return;
      if (el.closest(TEXT)) return setMode("text");
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        setLabel(labelled.dataset.cursor);
        return setMode("label");
      }
      setMode(el.closest(INTERACTIVE) ? "hover" : "default");
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      classify(e.target as Element | null);
    };
    // Content slides under a still pointer while scrolling, so re-check what it's over.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => classify(document.elementFromPoint(x.get(), y.get())));
    };
    const onLeave = () => setMode("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hidden = mode === "hidden" || mode === "text";
  const ringSize = mode === "label" ? 88 : mode === "hover" ? 56 : 36;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing ring */}
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full border-[1.5px] border-solid"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          scale: pressed ? 0.85 : 1,
          backgroundColor: mode === "label" ? "rgba(242,54,28,0.92)" : mode === "hover" ? "rgba(255,106,19,0.12)" : "rgba(255,106,19,0)",
          borderColor: mode === "label" ? "rgba(242,54,28,0)" : "rgba(242,54,28,0.55)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.6 }}
        initial={false}
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
              className="font-display text-[11px] font-semibold tracking-wide text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="bg-brand absolute top-0 left-0 size-2 rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden || mode === "label" ? 0 : 1, scale: pressed ? 0.6 : mode === "hover" ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        initial={false}
      />
    </div>
  );
}
