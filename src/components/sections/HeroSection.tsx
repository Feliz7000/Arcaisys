"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InteractiveGlobe } from "@/components/ui/InteractiveGlobe";

export function HeroSection() {

  const headline = "Arcaisys";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">


      {/* Interactive WebGL Globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-90 flex items-center justify-center">
        <InteractiveGlobe />
      </div>

      {/* Base glow to ground the globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a855f7]"></span>
          </span>
          AI-Powered Workflow Automation
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl text-white">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="inline-block mr-3 lg:mr-4 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-[#71717a] max-w-2xl mb-12"
        >
          Arcaisys uses cutting-edge AI to eliminate repetitive workflows, so your team can focus on what actually matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* <Button size="lg" className="relative overflow-hidden group">
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Button> */}
          {/* <Button size="lg" variant="outline">
            Watch Demo
          </Button> */}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#71717a]"
      >
        <span className="text-sm">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-[#71717a]/50 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#71717a] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
