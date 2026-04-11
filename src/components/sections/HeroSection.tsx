"use client";

import { motion } from "framer-motion";
import { NodeEarthGlobe } from "@/components/ui/NodeEarthGlobe";

export function HeroSection() {

  const headline = "ARCAISYS";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 sm:pb-32">


      {/* Rotating node-earth visual */}
      <div className="absolute top-[42%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-90 flex items-center justify-center scale-[0.78] sm:scale-90 md:scale-100">
        <NodeEarthGlobe />
      </div>

      {/* Base glow to ground the globe */}
      <div className="absolute top-[42%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,92vw)] h-[min(600px,92vw)] bg-[#E63000]/15 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none z-0 mix-blend-screen" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8 max-w-[92vw]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
          </span>
          AI • Hardware • Intelligent Systems
        </motion.div>

        <h1 className="font-[family-name:var(--font-orbital)] text-[clamp(2.8rem,12vw,4.5rem)] md:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 max-w-4xl text-white leading-[0.95]">
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
          className="text-base sm:text-lg md:text-xl text-[#71717a] max-w-2xl mb-10 sm:mb-12 leading-relaxed px-1"
        >
          ARCAISYS builds advanced hardware and software systems to solve complex challenges across defence, industry, and everyday life — turning ideas into scalable, real-world solutions.
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
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#71717a]"
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
