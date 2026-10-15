"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check, CodeXml, Stethoscope, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { getProduct, type Product } from "@/lib/products";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Industry = {
  name: string;
  headline: string;
  body: string;
  points: string[];
  icon: LucideIcon;
  products: string[];
  gradient: string;
};

const industries: Industry[] = [
  {
    name: "Hospitality",
    headline: "Restaurants run on seconds.",
    body: "Every minute between a guest deciding and the kitchen knowing costs money and goodwill. We put the menu on the table and the order on the kitchen screen — instantly.",
    points: ["QR ordering at every table", "Live kitchen tickets", "Owner analytics in real time"],
    icon: UtensilsCrossed,
    products: ["restoqr"],
    gradient: "from-amber via-orange to-flame",
  },
  {
    name: "Healthcare",
    headline: "Care shouldn't wait on paperwork.",
    body: "Imaging studies, ward status and billing still live in separate silos. Our platforms connect scanners, radiologists, wards and patients in one secure flow.",
    points: ["DICOM imaging in the browser", "Live bed and ward visibility", "Cloud or on-premise deployment"],
    icon: Stethoscope,
    products: ["pacs", "hospio"],
    gradient: "from-orange via-flame to-crimson",
  },
  {
    name: "Engineering",
    headline: "AI answers you can audit.",
    body: "AI coding assistants sound confident even when they're wrong. Meridian checks every claim against your real code, schema and telemetry before you act on it.",
    points: ["Deterministic verification", "Runtime-aware answers", "Runs locally as an MCP server"],
    icon: CodeXml,
    products: ["meridian"],
    gradient: "from-coral via-flame to-crimson",
  },
];

export function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="industries" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Industries"
          title={<>Built for industries that <span className="text-gradient">can&apos;t afford to guess.</span></>}
          lead="We focus where software failures are felt immediately — by guests, by patients and by the engineers on call."
        />
        <div ref={ref} className="relative mt-14">
          {industries.map((ind, i) => (
            <StackCard key={ind.name} industry={ind} index={i} total={industries.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  industry: ind,
  index,
  total,
  progress,
}: {
  industry: Industry;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Once the next card starts covering this one, shrink and dim it into the stack.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (total - 1 - index) * 0.06]);
  // Only cards with another card stacked on top get dimmed; the last one never does.
  const isLast = index === total - 1;
  const dim = useTransform(progress, [(index + 1) / total, 1], [0, reduce || isLast ? 0 : 0.35]);
  const Icon = ind.icon;
  const prods = ind.products.map((s) => getProduct(s)).filter(Boolean) as Product[];

  return (
    <div className="sticky mb-8 md:h-[min(78svh,38rem)]" style={{ top: `calc(6.5rem + ${index * 1.75}rem)` }}>
      <motion.div style={{ scale }} className="relative h-full origin-top overflow-hidden rounded-[2rem] bg-[#fffaf7] shadow-[0_30px_70px_-30px_rgba(158,11,30,0.35)] ring-1 ring-white">
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-ink" />
        <div className="grid h-full md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col p-7 sm:p-10 md:p-12">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-muted">0{index + 1}</span>
              <span className="h-px w-10 bg-line" />
              <span className="eyebrow text-orange">{ind.name}</span>
            </div>
            <h3 className="mt-5 font-display text-3xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {ind.headline}
            </h3>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-lg">{ind.body}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {ind.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <Check className="size-4 shrink-0 text-flame" /> {pt}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {prods.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  data-cursor="View"
                  className="group flex items-center gap-3 rounded-2xl bg-white/80 py-2 pr-4 pl-2 ring-1 ring-line transition hover:ring-orange/40"
                >
                  <ProductIcon product={p} className="size-9 rounded-xl" />
                  <span className="font-display text-sm font-semibold text-ink">{p.name}</span>
                  <StatusBadge status={p.status} />
                  <ArrowUpRight className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </Link>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className={`relative hidden overflow-hidden bg-gradient-to-br md:block ${ind.gradient}`}>
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
            <span
              aria-hidden
              className="absolute -right-6 -bottom-16 font-display text-[16rem] leading-none font-bold text-white/15"
            >
              0{index + 1}
            </span>
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.6s]" />
                <div className="relative grid size-36 place-items-center rounded-full bg-white/20 ring-1 ring-white/50 backdrop-blur-md">
                  <Icon className="size-16 text-white" strokeWidth={1.5} />
                </div>
                {/* Satellites */}
                {prods.map((p, k) => (
                  <div
                    key={p.slug}
                    className="absolute animate-float"
                    style={{ top: k ? "-2.5rem" : "auto", bottom: k ? "auto" : "-2.5rem", [k ? "left" : "right"]: "-4.5rem", animationDelay: `${-k * 2}s` }}
                  >
                    <div className="flex items-center gap-2 rounded-2xl bg-white/90 py-2 pr-3 pl-2 shadow-xl shadow-crimson/20">
                      <ProductIcon product={p} className="size-8 rounded-lg" />
                      <span className="font-display text-sm font-semibold text-ink">{p.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
