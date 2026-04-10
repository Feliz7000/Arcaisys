"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Operations",
    company: "TechNexus",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=FF6B00&color=fff",
    quote: "Arcaisys literally replaced two full-time manual data entry roles. The AI understood our weird proprietary formats instantly.",
  },
  {
    name: "David Chen",
    role: "Founder",
    company: "HyperGrowth",
    avatar: "https://ui-avatars.com/api/?name=David+Chen&background=E63000&color=fff",
    quote: "We set up automated customer onboarding in 15 minutes. It hasn&apos;t broken once in 6 months. Absolute game changer.",
  },
  {
    name: "Elena Rodriguez",
    role: "Director of Engineering",
    company: "Starlight Inc",
    avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random&color=fff",
    quote: "The ability to just type &apos;when a high priority ticket comes in, page the on-call&apos; and have it WORK... magic.",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 container mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Loved by engineering teams</h2>
        <p className="text-[#71717a]">Don&apos;t just take our word for it.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbars no-scrollbar" style={{ scrollbarWidth: "none" }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="snap-center shrink-0 w-[85vw] md:w-[400px]"
          >
            <Card className="h-full flex flex-col justify-between bg-[#0a0a0a]/50 p-8">
              <p className="text-white/80 leading-relaxed mb-8 italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border border-white/10"
                />
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[#71717a] text-xs">{t.role} @ {t.company}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
