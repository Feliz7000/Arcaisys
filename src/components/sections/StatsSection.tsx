"use client";

import { motion } from "framer-motion";

export function StatsSection() {
  const highlights = [
    {
      title: "Multiple Domains",
      description: "Solutions across defence, industry, and consumer applications",
    },
    {
      title: "AI + Hardware Focus",
      description: "End-to-end intelligent system development",
    },
    {
      title: "Scalable Solutions",
      description: "Built for real-world deployment and growth",
    },
    // {
    //   title: "Innovation Driven",
    //   description: "Constant research and development mindset",
    // },
  ];

  return (
    <section className="relative z-20 pb-20 pt-0 px-6 container mx-auto bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel !border-0 p-12 md:p-16 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF6B00]/10 blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
          {highlights.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-[#71717a] text-sm md:text-base font-medium max-w-md">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
