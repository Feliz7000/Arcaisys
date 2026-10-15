"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, ChefHat, CodeXml, QrCode, Radar, ScanHeart, Stethoscope } from "lucide-react";
import { ScrollText } from "@/components/ui/ScrollText";

/** Icons that drift past the statement at different speeds (speed = px of travel across the section). */
const floaters = [
  { icon: QrCode, className: "top-[8%] left-[6%]", speed: -220, rotate: -25 },
  { icon: ScanHeart, className: "top-[18%] right-[8%]", speed: -320, rotate: 30 },
  { icon: ChefHat, className: "bottom-[16%] left-[12%]", speed: 260, rotate: 20 },
  { icon: Stethoscope, className: "bottom-[10%] right-[14%]", speed: 200, rotate: -35 },
  { icon: CodeXml, className: "top-[46%] left-[2%]", speed: -140, rotate: 15 },
  { icon: Radar, className: "top-[52%] right-[3%]", speed: 160, rotate: -20 },
  { icon: BrainCircuit, className: "top-[4%] left-[46%]", speed: -380, rotate: 40 },
];

function Floater({ f, progress }: { f: (typeof floaters)[number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : f.speed]);
  const rotate = useTransform(progress, [0, 1], [0, reduce ? 0 : f.rotate]);
  const Icon = f.icon;
  return (
    <motion.div style={{ y, rotate }} className={`absolute hidden md:block ${f.className}`} aria-hidden>
      <div className="glass grid size-14 place-items-center rounded-2xl text-flame">
        <Icon className="size-6" />
      </div>
    </motion.div>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-32 md:py-44">
      {floaters.map((f, i) => (
        <Floater key={i} f={f} progress={scrollYProgress} />
      ))}
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="eyebrow mb-8 text-orange">Why Arcaisys</p>
        <ScrollText
          as="h2"
          text="We turn messy, high-pressure operations into calm, intelligent software — so the people running them can focus on the work that actually matters."
          accent={["calm,", "intelligent", "software"]}
          className="justify-center font-display text-3xl leading-[1.2] font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.4rem]"
        />
      </div>
    </section>
  );
}
