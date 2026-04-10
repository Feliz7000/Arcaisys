"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target } from "lucide-react";

const team = [
  { name: "Alice Vanderbilt", role: "CEO & Co-founder", avatar: "https://ui-avatars.com/api/?name=Alice+Vanderbilt&background=random&color=fff" },
  { name: "Dr. James Harkin", role: "Chief AI Officer", avatar: "https://ui-avatars.com/api/?name=James+Harkin&background=random&color=fff" },
  { name: "Sam Chen", role: "VP of Engineering", avatar: "https://ui-avatars.com/api/?name=Sam+Chen&background=random&color=fff" },
  { name: "Maya Patel", role: "Head of Product", avatar: "https://ui-avatars.com/api/?name=Maya+Patel&background=random&color=fff" },
];

export default function About() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-4xl mx-auto space-y-32">
        
        {/* Story */}
        <section className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            We believe in working smarter, not harder.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#71717a] leading-relaxed"
          >
            Arcaisys was founded in 2024 with a rebellious spirit and a lofty objective: 
            to free humans from the tyranny of repetitive, soul-crushing tasks. We build 
            AI that doesn&apos;t just assist, but completely offloads operations safely and reliably.
          </motion.p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:border-[#FF6B00]/50 transition-colors bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#E63000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision</h3>
              <p className="text-[#71717a] text-sm">When executing operations, &apos;good enough&apos; isn&apos;t acceptable. We aim for zero defects.</p>
            </Card>
            <Card className="text-center group hover:border-[#FF6B00]/50 transition-colors bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-[#E63000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Human-centric</h3>
              <p className="text-[#71717a] text-sm">AI exists to elevate human potential, not to replace the human element.</p>
            </Card>
            <Card className="text-center group hover:border-[#FF6B00]/50 transition-colors bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-[#E63000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-[#71717a] text-sm">Clear decisions. Traceable actions. No black boxes when it comes to automation.</p>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">The Minds Behind Arcaisys</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 border border-[rgba(255,255,255,0.1)]">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h4 className="font-bold text-white text-lg">{t.name}</h4>
                <p className="text-[#71717a] text-sm">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
