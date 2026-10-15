"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Brand-gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX }} className="bg-brand fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />;
}
