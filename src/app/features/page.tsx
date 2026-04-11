"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Globe2, Layers, Zap } from "lucide-react";

const featureBreakdown = [
  {
    title: "Intelligent AI Systems",
    desc: "We design AI systems that understand context, adapt to changing environments, and make intelligent decisions across real-world applications — from automation to advanced analytics.",
    icon: Bot,
    previewTitle: "AI Agent Interface",
    previewLines: ["Context understanding enabled", "Adaptive policy active", "Decision flow aligned"],
  },
  {
    title: "Scalable System Architecture",
    desc: "Our solutions are built to scale — from small prototypes to large deployments — ensuring performance, reliability, and efficiency across different use cases.",
    icon: Layers,
    previewTitle: "Scalability Graph",
    previewLines: ["Load balancing ready", "Elastic orchestration active", "Architecture synchronized"],
  },
  {
    title: "Real-Time Processing",
    desc: "Process and analyze live data from sensors, devices, and platforms to enable fast, accurate, and actionable decision-making.",
    icon: Zap,
    previewTitle: "Live Trace Logs",
    previewLines: ["Telemetry stream synced", "Continuous processing active", "Action routing ready"],
  },
  {
    title: "Hardware + Software Integration",
    desc: "We bridge the gap between physical systems and intelligent software — integrating sensors, embedded systems, and AI to create complete end-to-end solutions.",
    icon: Cpu,
    previewTitle: "Embedded System Link",
    previewLines: ["Sensor bus connected", "Firmware + AI sync", "Edge node: operational"],
  },
  {
    title: "Multi-Domain Applications",
    desc: "Our solutions are designed to work across industries including defence, healthcare, smart cities, industrial automation, and consumer technology.",
    icon: Globe2,
    previewTitle: "Domain Deployment Matrix",
    previewLines: ["Defence deployment active", "Industrial deployment active", "Consumer deployment active"],
  }
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 overflow-hidden">
      <div className="text-center mb-16 sm:mb-24">
        <h1 className="text-[clamp(2.25rem,8vw,4rem)] md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.02] text-balance">Explore Our Capabilities</h1>
        <p className="text-base sm:text-lg md:text-xl text-[#71717a] max-w-2xl mx-auto leading-relaxed text-balance">
          Discover how Arcaisys combines artificial intelligence, hardware systems, and real-world engineering to build scalable solutions across industries.
        </p>
      </div>

      <div className="space-y-20 sm:space-y-28 md:space-y-32">
        {featureBreakdown.map((feat, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-8 sm:gap-10 md:gap-16 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-5 sm:mb-6">
                <feat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#E63000]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight text-balance">{feat.title}</h2>
              <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl">{feat.desc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 relative w-full"
            >
              <div className="absolute inset-0 bg-[#FF6B00]/16 blur-[72px] sm:blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 w-full rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl bg-[linear-gradient(160deg,rgba(255,107,0,0.14),rgba(10,10,10,0.92)_45%,rgba(230,48,0,0.12))] p-6 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[260px] flex flex-col justify-center">
                <div className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-4 sm:mb-5">{feat.previewTitle}</div>
                <div className="space-y-2 sm:space-y-3">
                  {feat.previewLines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex items-center gap-3 text-[#b4b4bc] text-xs sm:text-sm md:text-base">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
