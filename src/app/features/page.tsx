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
    <div className="container mx-auto px-6 py-32 overflow-hidden">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Explore Our Capabilities</h1>
        <p className="text-xl text-[#71717a] max-w-2xl mx-auto">
          Discover how Arcaisys combines artificial intelligence, hardware systems, and real-world engineering to build scalable solutions across industries.
        </p>
      </div>

      <div className="space-y-32">
        {featureBreakdown.map((feat, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                <feat.icon className="w-8 h-8 text-[#E63000]" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">{feat.title}</h2>
              <p className="text-lg text-[#71717a] leading-relaxed">{feat.desc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-[#FF6B00]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 w-full rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl bg-[linear-gradient(160deg,rgba(255,107,0,0.14),rgba(10,10,10,0.92)_45%,rgba(230,48,0,0.12))] p-8 md:p-10 min-h-[260px] flex flex-col justify-center">
                <div className="text-white text-xl md:text-2xl font-bold tracking-tight mb-5">{feat.previewTitle}</div>
                <div className="space-y-3">
                  {feat.previewLines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex items-center gap-3 text-[#b4b4bc] text-sm md:text-base">
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
