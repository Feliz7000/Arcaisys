"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, MessageSquare, Zap, Lock, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: FeatureItem[] = [
  {
    title: "Intelligent Systems",
    description: "AI-powered systems that analyze, learn, and act in dynamic real-world environments.",
    icon: Sparkles,
  },
  {
    title: "Real-time Insights",
    description: "Process live data from sensors, devices, and platforms to generate instant decisions.",
    icon: BarChart3,
  },
  {
    title: "Human-AI Interaction",
    description: "Control and interact with systems using natural, intuitive communication.",
    icon: MessageSquare,
  },
  {
    title: "Cross-Industry Integration",
    description: "Seamlessly connects with hardware, IoT devices, and software platforms across domains.",
    icon: Zap,
  },
  {
    title: "Secure & Reliable Systems",
    description: "Designed with strong security, stability, and reliability for critical applications.",
    icon: Lock,
  },
  {
    title: "Scalable Deployment",
    description: "From prototype to production — fast, efficient, and scalable solutions.",
    icon: Rocket,
  },
];

export function BentoFeatures() {
  return (
    <section className="py-32 container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Built for Real-World Impact
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#71717a] max-w-2xl mx-auto"
        >
          We design intelligent systems that work across industries — from defence to smart cities, healthcare, and beyond.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <FeatureCard key={i} index={i} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        className="relative h-full overflow-hidden group cursor-pointer border-[rgba(255,255,255,0.06)] hover:border-[#FF6B00]/50 transition-colors bg-[#0a0a0a]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow spotlight effect */}
        {isHovered && (
          <div 
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 0, 0.15), transparent 40%)`,
            }}
          />
        )}
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF6B00]/20 transition-all">
            <feature.icon className="w-6 h-6 text-[#E63000]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
          <p className="text-[#71717a] leading-relaxed flex-grow">{feature.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
