"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ChartColumn, ChefHat, ConciergeBell, QrCode, Users, type LucideIcon } from "lucide-react";
import { getProduct } from "@/lib/products";

type App = { name: string; role: string; body: string; points: string[]; icon: LucideIcon };

const apps: App[] = [
  {
    name: "TableOS",
    role: "The guest's menu",
    body: "Guests scan the QR code on their table, browse a rich digital menu and order — no app to install.",
    points: ["Add items mid-meal", "Call staff with a tap", "View the bill anytime"],
    icon: QrCode,
  },
  {
    name: "KitchenOS",
    role: "The kitchen display",
    body: "Tickets land on the kitchen screen the moment a guest orders, and move from preparing to ready with a tap.",
    points: ["Live ticket queue", "Add-on acknowledgements", "Native app for busy kitchens"],
    icon: ChefHat,
  },
  {
    name: "WaiterOS",
    role: "The floor in your pocket",
    body: "Waiters see service requests and ready dishes the instant they happen, so no table waits unnoticed.",
    points: ["Instant table alerts", "Ready-to-serve pings", "Native mobile app"],
    icon: ConciergeBell,
  },
  {
    name: "StaffOS",
    role: "Tables, sessions & payments",
    body: "Floor managers run tables and sessions, punch in orders for guests and close out payments.",
    points: ["Table & session control", "Orders on behalf of guests", "Payments and settlement"],
    icon: Users,
  },
  {
    name: "OwnerOS",
    role: "The business at a glance",
    body: "Owners watch live sales, manage menus and inventory, design floor plans and print QR codes for every table.",
    points: ["Live analytics", "Menu & inventory", "Printable table QR codes"],
    icon: ChartColumn,
  },
];

export function RestoTour() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const restoqr = getProduct("restoqr");

  // How far the track must travel so its last card ends at the right edge.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(p, [0, 1], [0, -distance]);
  // Cards lean into the direction of travel, more the faster you scroll.
  const skewX = useTransform(useSpring(useVelocity(x), { stiffness: 300, damping: 40 }), [-2500, 0, 2500], [8, 0, -8], {
    clamp: true,
  });

  if (reduce) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Intro url={restoqr?.url} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a, i) => (
              <AppCard key={a.name} app={a} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-6 px-4 sm:px-[max(1rem,calc((100vw-72rem)/2))]">
          <div className="flex w-[min(85vw,26rem)] shrink-0 flex-col justify-center pr-6">
            <Intro url={restoqr?.url} />
          </div>
          {apps.map((a, i) => (
            <motion.div key={a.name} style={{ skewX }} className="w-[min(80vw,22rem)] shrink-0">
              <AppCard app={a} index={i} />
            </motion.div>
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        <ProgressRail progress={p} />
      </div>
    </section>
  );
}

function Intro({ url }: { url?: string }) {
  return (
    <div>
      <p className="eyebrow text-orange">Inside RestoQR</p>
      <h2 className="mt-4 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl">
        Five apps. <span className="text-gradient">One live restaurant.</span>
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Every role gets a purpose-built tool — all sharing one real-time source of truth. Keep scrolling to walk the
        floor.
      </p>
      <div className="mt-7 flex items-center gap-4">
        <Image src="/brand/restoqr-logo.png" alt="RestoQR" width={962} height={756} className="h-14 w-auto" />
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-crimson"
          >
            Open RestoQR <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  const Icon = app.icon;
  return (
    <div className="glass-strong group relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-[1.75rem] p-7">
      <span
        aria-hidden
        className="text-gradient pointer-events-none absolute -top-4 -right-2 font-display text-[8rem] leading-none font-bold opacity-15 transition-opacity duration-500 group-hover:opacity-30"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="bg-brand grid size-14 place-items-center rounded-2xl text-white shadow-lg shadow-orange/30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
        <Icon className="size-7" />
      </span>
      <p className="mt-6 font-display text-2xl font-semibold text-ink">{app.name}</p>
      <p className="mt-1 text-sm font-medium text-orange">{app.role}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">{app.body}</p>
      <ul className="mt-auto space-y-2 pt-6">
        {app.points.map((pt) => (
          <li key={pt} className="flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="size-1.5 rotate-45 bg-gradient-to-br from-amber to-flame" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mx-auto mt-10 flex w-[min(90vw,40rem)] items-center gap-4 px-4">
      <span className="font-mono text-xs text-muted">TableOS</span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
        <motion.div style={{ scaleX: progress }} className="bg-brand h-full origin-left rounded-full" />
      </div>
      <span className="font-mono text-xs text-muted">OwnerOS</span>
    </div>
  );
}
