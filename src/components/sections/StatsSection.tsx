"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ from, to, suffix = "", duration = 2 }: { from: number, to: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function StatsSection() {
  const stats = [
    { value: 10000, suffix: "+", label: "Workflows Automated" },
    { value: 99, suffix: ".9%", label: "Uptime SLA" },
    { value: 3, suffix: "x", label: "Faster Team Output" },
    { value: 200, suffix: "+", label: "Integrations" },
  ];

  return (
    <section className="relative z-20 pb-20 pt-0 px-6 container mx-auto bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-12 md:p-16 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF6B00]/10 blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#71717a] text-sm md:text-base font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
