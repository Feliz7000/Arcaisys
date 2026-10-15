"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BrainCircuit, Cloud, Layers, Lock, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const capabilities = [
  {
    icon: BrainCircuit,
    title: "Applied AI",
    body: "Forecasting, summarisation, triage, vision and agents — built into everyday workflows, not bolted on as a chat box.",
  },
  {
    icon: ShieldCheck,
    title: "Grounded, verifiable AI",
    body: "We check AI output against real code, data and telemetry before anyone relies on it. Confidence is earned, not assumed.",
  },
  {
    icon: Activity,
    title: "Real-time systems",
    body: "Software for live environments — kitchens mid-rush, scanners mid-study, wards mid-shift — where latency is felt.",
  },
  {
    icon: Layers,
    title: "End-to-end product engineering",
    body: "Backends, web apps, native mobile and admin consoles, designed together so every role gets a tool that fits.",
  },
  {
    icon: Lock,
    title: "Security by design",
    body: "Role-based access, audit trails, encryption and multi-tenancy from day one — ready for sensitive, regulated data.",
  },
  {
    icon: Cloud,
    title: "Cloud & on-premise",
    body: "Run as a managed cloud service or inside your own network. Your data lives where it needs to.",
  },
];

export function Capabilities() {
  const reduce = useReducedMotion();
  return (
    <section id="capabilities" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="What we do"
          title={<>AI at the core. <span className="text-gradient">Engineering</span> all the way through.</>}
          lead="Great AI products are mostly great software. We bring both — the intelligence, and the reliable systems it needs to be useful."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.1} y={40}>
              <SpotlightCard tilt={6} className="group h-full p-7">
                <motion.span
                  initial={reduce ? false : { rotate: -90, scale: 0.4, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 + (i % 3) * 0.1 }}
                  className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-amber/20 to-flame/20 text-flame ring-1 ring-orange/20 transition-colors duration-300 group-hover:from-amber group-hover:to-flame group-hover:text-white"
                >
                  <c.icon className="size-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </motion.span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
