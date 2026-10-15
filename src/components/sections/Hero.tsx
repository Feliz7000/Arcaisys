"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChefHat, CircleCheck, Mouse, Sparkles } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { Magnetic } from "@/components/ui/Magnetic";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ease = [0.22, 1, 0.36, 1] as const;
/** How many full revolutions the products make across the pinned scroll. */
const TURNS = 1.25;

/** Orbit geometry, sized to the viewport. */
function useOrbitSize() {
  const [size, setSize] = useState({ rx: 420, ry: 110, mobile: false });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setSize({
        rx: mobile ? w * 0.27 : Math.min(w * 0.36, 440),
        ry: mobile ? Math.min(h * 0.12, 90) : Math.min(h * 0.15, 120),
        mobile,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/** Headline that rises in word by word from behind a mask. */
function WordRise({ text, gradient, delay }: { text: string; gradient: string; delay: number }) {
  const all = [
    ...text.split(" ").map((w) => ({ w, g: false })),
    ...gradient.split(" ").map((w) => ({ w, g: true })),
  ];
  return (
    <>
      {all.map(({ w, g }, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${g ? "text-gradient" : ""}`}
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
          </motion.span>
          {i < all.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const size = useOrbitSize();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const still = useMotionValue(0.35);
  const p = reduce ? still : smooth;

  // Phase 1 (0 → 0.2): headline lifts away, logo settles to centre, orbit opens up.
  const headlineOpacity = useTransform(p, [0, 0.16], [1, 0]);
  const headlineY = useTransform(p, [0, 0.16], [0, -90]);
  const headlineScale = useTransform(p, [0, 0.16], [1, 0.94]);
  const hintOpacity = useTransform(p, [0, 0.04], [1, 0]);
  // Phase 2 (0.2 → 0.8): the products revolve.
  // Start at 45° so no card sits in front of the logo before scrolling.
  const angle = useTransform(p, [0, 1], [45, 45 + 360 * TURNS]);
  const spread = useTransform(p, [0, 0.2, 0.8, 0.95], [0.8, 1, 1, 0.45]);
  const captionOpacity = useTransform(p, [0.14, 0.22, 0.78, 0.86], [0, 1, 1, 0]);
  const ringTilt = useTransform(p, [0, 0.5, 1], [68, 74, 80]);
  // Phase 3 (0.8 → 1): the whole system sinks below, into the next section.
  const centerY = useTransform(p, [0, 0.2, 0.8, 1], ["16vh", "0vh", "0vh", "58vh"]);
  const systemScale = useTransform(p, [0.8, 1], [1, 0.72]);
  const systemOpacity = useTransform(p, [0.9, 1], [1, 0]);
  const logoScale = useTransform(p, [0, 0.2, 0.8], [0.82, 1.05, 1]);
  const logoTurn = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * 16);

  // Name whichever product is currently at the front of the orbit.
  const [front, setFront] = useState(0);
  useMotionValueEvent(angle, "change", (a) => {
    let best = 0;
    let bestZ = -2;
    products.forEach((_, i) => {
      const z = Math.cos(((a + i * (360 / products.length)) * Math.PI) / 180);
      if (z > bestZ) {
        bestZ = z;
        best = i;
      }
    });
    if (best !== front) setFront(best);
  });
  const frontProduct = products[front];

  return (
    <section ref={ref} className="relative" style={{ height: reduce ? "100svh" : "340vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1400px]">
        {/* Stage glow */}
        <div aria-hidden className="absolute top-1/2 left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber/30 via-orange/20 to-crimson/25 blur-[90px]" />

        {/* Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale }}
          className="absolute inset-x-0 top-[13vh] z-40 px-4 text-center sm:top-[15vh]"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-soft"
          >
            <Sparkles className="size-3.5 text-orange" />
            AI-powered software company
          </motion.span>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.3rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
            <WordRise text="Intelligent software, built for the" gradient="real world." delay={0.1} />
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <Link
                href="/#products"
                data-cursor="Explore"
                className="bg-brand group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/30 transition hover:shadow-xl hover:shadow-flame/30"
              >
                Explore our products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#contact" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white">
                Talk to our team
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* The system: logo + orbit */}
        <motion.div
          style={{ y: centerY, scale: systemScale, opacity: systemOpacity }}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {/* Orbit rings */}
          <OrbitRing size={size.rx * 2} tilt={ringTilt} angle={angle} spread={spread} direction={1} />
          <OrbitRing size={size.rx * 1.44} tilt={ringTilt} angle={angle} spread={spread} direction={-1} dashed />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
            style={{ x: "-50%", y: "-50%" }}
            className="absolute top-0 left-0 z-20"
          >
            <motion.div style={{ scale: logoScale, rotateY: logoTurn }} className="relative">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-orange/15 [animation-duration:3s]" />
              <div className="glass-strong relative grid size-32 place-items-center rounded-full sm:size-44">
                <Image
                  src="/brand/arcaisys-mark.png"
                  alt="Arcaisys"
                  width={220}
                  height={190}
                  priority
                  className="w-[62%] drop-shadow-[0_18px_28px_rgba(224,20,34,0.35)]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Revolving products */}
          {products.map((product, i) => (
            <OrbitCard
              key={product.slug}
              product={product}
              index={i}
              angle={angle}
              spread={spread}
              size={size}
            />
          ))}

          {/* Front product caption */}
          <motion.div
            style={{ opacity: captionOpacity, x: "-50%", paddingTop: size.ry + (size.mobile ? 80 : 110) }}
            className="absolute top-0 left-0 z-30 w-[min(90vw,28rem)] text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={frontProduct.slug}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{frontProduct.name}</p>
                <p className="mt-1 text-sm text-muted sm:text-base">{frontProduct.tagline}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-6 z-40 flex flex-col items-center gap-2 text-xs text-muted">
          <Mouse className="size-5 animate-bounce" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}

function OrbitRing({
  size,
  tilt,
  angle,
  spread,
  direction,
  dashed,
}: {
  size: number;
  tilt: MotionValue<number>;
  angle: MotionValue<number>;
  spread: MotionValue<number>;
  direction: 1 | -1;
  dashed?: boolean;
}) {
  const rotateZ = useTransform(angle, (a) => a * 0.5 * direction);
  return (
    <motion.div
      aria-hidden
      style={{ width: size, height: size, x: "-50%", y: "-50%", rotateX: tilt, rotateZ, scale: spread }}
      className={`absolute top-0 left-0 rounded-full ${
        dashed ? "border border-dashed border-orange/35" : "border-[1.5px] border-flame/25 shadow-[0_0_40px_rgba(242,54,28,0.15)]"
      }`}
    >
      {!dashed && <span className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full bg-flame shadow-[0_0_14px_4px_rgba(242,54,28,0.6)]" />}
    </motion.div>
  );
}

function OrbitCard({
  product,
  index,
  angle,
  spread,
  size,
}: {
  product: Product;
  index: number;
  angle: MotionValue<number>;
  spread: MotionValue<number>;
  size: { rx: number; ry: number; mobile: boolean };
}) {
  const offset = index * (360 / products.length);
  const theta = useTransform(angle, (a) => ((a + offset) * Math.PI) / 180);
  // z: 1 at the front of the orbit, -1 at the back.
  const z = useTransform(theta, Math.cos);
  const x = useTransform(() => Math.sin(theta.get()) * size.rx * spread.get());
  const y = useTransform(() => z.get() * size.ry * spread.get());
  const depth = useTransform(z, (v) => (v + 1) / 2);
  const scale = useTransform(depth, (d) => 0.6 + 0.4 * d);
  const opacity = useTransform(depth, (d) => 0.35 + 0.65 * d);
  const rotateY = useTransform(theta, (t) => -Math.sin(t) * 30);
  const zIndex = useTransform(z, (v) => (v > 0 ? 30 : 10));
  const filter = useTransform(depth, (d) => `blur(${((1 - d) * 2.5).toFixed(2)}px)`);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotateY, zIndex, filter }}
      className="absolute top-0 left-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.5 + index * 0.12 }}
        style={{ x: "-50%", y: "-50%" }}
      >
        <Link
          href={`/products/${product.slug}`}
          data-cursor="View"
          className="glass-strong block w-36 rounded-2xl p-3 transition-shadow hover:shadow-2xl hover:shadow-orange/20 sm:w-64 sm:p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <ProductIcon product={product} className="size-8 rounded-xl sm:size-9" />
              <span className="font-display text-sm font-semibold text-ink sm:text-base">{product.name}</span>
            </span>
            {!size.mobile && <StatusBadge status={product.status} />}
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted sm:text-xs">{product.industry}</p>
          {!size.mobile && <MiniPreview product={product} />}
        </Link>
      </motion.div>
    </motion.div>
  );
}

/** A tiny glimpse of each product at work. */
function MiniPreview({ product }: { product: Product }) {
  switch (product.slug) {
    case "restoqr":
      return (
        <div className="mt-3 rounded-xl bg-white/80 p-2.5 ring-1 ring-black/5">
          <p className="text-[11px] font-medium text-ink">Table 12 · 3 items</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-muted">
            <ChefHat className="size-3 text-orange" /> Sent to kitchen · 0:42
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-orange/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber to-orange"
              animate={{ width: ["15%", "80%", "80%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />
          </div>
        </div>
      );
    case "pacs":
      return (
        <div className="mt-3 grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md bg-[radial-gradient(circle_at_50%_45%,#6b5a60_0%,#2a1f24_55%,#140d10_100%)]"
              style={{ opacity: 0.55 + i * 0.12 }}
            />
          ))}
        </div>
      );
    case "hospio":
      return (
        <div className="mt-3 flex h-8 items-end gap-1">
          {[62, 80, 54, 91, 73, 86].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-crimson/80 to-flame/70"
              animate={{ height: [`${h}%`, `${Math.max(30, h - 25)}%`, `${h}%`] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    default:
      return (
        <div className="mt-3 rounded-xl bg-ink/90 p-2.5 font-mono text-[10px] leading-relaxed text-white/80">
          <p className="flex items-center gap-1"><CircleCheck className="size-3 text-emerald-400" /> route exists</p>
          <p className="text-amber">17/18 grounded</p>
        </div>
      );
  }
}
