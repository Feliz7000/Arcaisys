"use client";

import { motion } from "framer-motion";

const companies = [
  "Acme Corp", "Quantum", "Nexus", "Starlight", "Horizon", "Ascend", "Pinnacle"
];

export function SocialProof() {
  return (
    <section className="py-12 border-y border-[rgba(255,255,255,0.06)] bg-black/20 overflow-hidden">
      <div className="container mx-auto px-6 text-center text-sm text-[#71717a] mb-8 font-medium">
        Trusted by teams at
      </div>
      <div className="relative w-full flex overflow-hidden">
        {/* Left fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Duplicate list for seamless looping */}
          {[...companies, ...companies].map((company, i) => (
            <div key={i} className="flex items-center gap-2 text-2xl font-bold text-white/20 uppercase tracking-widest grayscale opacity-60 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block opacity-50">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" />
              </svg>
              {company}
            </div>
          ))}
        </motion.div>
        
        {/* Right fade */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
