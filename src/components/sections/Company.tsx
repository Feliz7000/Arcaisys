"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { HeartHandshake, Lightbulb, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation with purpose",
    body: "We research and experiment constantly — then ship only what makes someone's day measurably better.",
  },
  {
    icon: Target,
    title: "Real-world impact",
    body: "Faster tables, quicker reports, smoother wards, safer code. We judge ourselves by outcomes, not demos.",
  },
  {
    icon: HeartHandshake,
    title: "Reliability & trust",
    body: "Our software runs critical operations, so it is built to be secure, stable and honest about what it knows.",
  },
];

const HEADLINE = "We don't just build software. We build";
const ACCENT = "systems that run the real world.";

/** One word whose opacity follows scroll progress through its slot. */
function Word({ progress, range, gradient, children }: { progress: MotionValue<number>; range: [number, number]; gradient?: boolean; children: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${gradient ? "text-gradient" : ""}`}>
      {children}&nbsp;
    </motion.span>
  );
}

export function Company() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: headingProgress } = useScroll({ target: ref, offset: ["start 85%", "start 25%"] });
  const { scrollYProgress: sectionProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markRotate = useTransform(sectionProgress, [0, 1], [-25, reduce ? -25 : 25]);
  const markY = useTransform(sectionProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  const words = [
    ...HEADLINE.split(" ").map((w) => ({ w, g: false })),
    ...ACCENT.split(" ").map((w) => ({ w, g: true })),
  ];

  return (
    <section id="company" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12 md:p-16">
          <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-gradient-to-br from-amber/30 to-flame/20 blur-3xl" />
          <motion.div aria-hidden style={{ rotate: markRotate, y: markY }} className="pointer-events-none absolute -top-6 -right-8 w-56 opacity-[0.1] md:w-80">
            <Image src="/brand/arcaisys-mark.png" alt="" width={677} height={589} />
          </motion.div>
          <div className="relative max-w-3xl">
            <p className="eyebrow text-orange">About Arcaisys</p>
            <h2
              aria-label={`${HEADLINE} ${ACCENT}`}
              className="mt-4 font-display text-3xl leading-[1.15] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              {words.map(({ w, g }, i) =>
                reduce ? (
                  <span key={i} className={g ? "text-gradient" : ""}>{w} </span>
                ) : (
                  <Word key={i} progress={headingProgress} range={[i / words.length, (i + 1) / words.length]} gradient={g}>
                    {w}
                  </Word>
                ),
              )}
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Arcaisys is an AI-powered software company. We build complete products for industries where things
                have to work — hospitality, healthcare and software engineering itself — pairing modern AI with the
                careful, dependable engineering those environments demand.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} y={36}>
                <div className="group h-full rounded-2xl bg-white/60 p-6 ring-1 ring-white transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-orange/10">
                  <v.icon className="size-6 text-flame transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
