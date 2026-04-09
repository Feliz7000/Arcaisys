"use client";

import { motion } from "framer-motion";
import { Link2, Sparkles, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      // num: "01",
      title: "Connect your tools",
      desc: "Link your favorite apps in seconds. No code required.",
      icon: Link2,
    },
    {
      // num: "02",
      title: "Define your workflow",
      desc: "Just write what you want to happen in plain English.",
      icon: Sparkles,
    },
    {
      // num: "03",
      title: "Let Arcaisys run it",
      desc: "Our AI handles the rest, 24/7 without complaints.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            How it works
          </motion.h2>
          <p className="text-[#71717a] max-w-2xl mx-auto">Three simple steps to automate your entire business operations.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-6 lg:gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/40 to-[#7c3aed]/0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex-1 flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full bg-[#0a0a0a] border border-[#27272a] flex items-center justify-center relative mb-8 z-10 group-hover:border-[#7c3aed] transition-colors duration-500 shadow-xl overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-[#7c3aed]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-black text-white/5 select-none -translate-y-2">{step.num}</span>
                <step.icon className="w-10 h-10 text-[#a855f7] relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[#71717a] max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
