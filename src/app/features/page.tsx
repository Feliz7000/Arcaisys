"use client";

import { motion } from "framer-motion";
import { Bot, Layers, Zap } from "lucide-react";

const featureBreakdown = [
  {
    title: "AI Automation Agent",
    desc: "Our core engine isn't just a static ruleset. It's a deep learning model that understands context, identifies edge cases, and intelligently repairs broken automation paths.",
    icon: Bot,
    mock: "https://placehold.co/600x400/222/7c3aed?text=AI+Agent+Interface",
  },
  {
    title: "Infinite Scalability",
    desc: "Run 10 workflows or 10 million. Built on a serverless event-driven architecture, Arcaisys ensures 99.9% uptime with latency measured in milliseconds.",
    icon: Layers,
    mock: "https://placehold.co/600x400/222/a855f7?text=Scalability+Graph",
  },
  {
    title: "Real-time Magic",
    desc: "Witness your workflows executing live. Debug with our step-by-step trace viewer, and optimize performance before it becomes a bottleneck.",
    icon: Zap,
    mock: "https://placehold.co/600x400/222/555?text=Live+Trace+Logs",
  }
];

export default function Features() {
  return (
    <div className="container mx-auto px-6 py-32 overflow-hidden">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Explore the Platform</h1>
        <p className="text-xl text-[#71717a] max-w-2xl mx-auto">
          Deep dive into the architecture and capabilities that make Arcaisys the leading automation platform.
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
              <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center mb-6">
                <feat.icon className="w-8 h-8 text-[#a855f7]" />
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
              <div className="absolute inset-0 bg-[#7c3aed]/20 blur-[100px] rounded-full pointer-events-none" />
              <img
                src={feat.mock}
                alt={feat.title}
                className="relative z-10 w-full rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
