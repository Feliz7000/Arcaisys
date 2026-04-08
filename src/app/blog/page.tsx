"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  { id: "1", slug: "future-of-ai-automation", title: "The Future of AI in Enterprise Automation", category: "AI", readTime: "5 min read", date: "Oct 12, 2025", img: "https://placehold.co/600x400/222/7c3aed?text=AI+Automation" },
  { id: "2", slug: "release-v2", title: "Announcing Arcaisys 2.0: Deep Reinforcement Workflows", category: "Product", readTime: "4 min read", date: "Sep 28, 2025", img: "https://placehold.co/600x400/222/a855f7?text=Arcaisys+2.0" },
  { id: "3", slug: "soc2-type-2", title: "Security First: Achieving SOC2 Type II Certification", category: "Company", readTime: "3 min read", date: "Aug 15, 2025", img: "https://placehold.co/600x400/222/555?text=SOC2" },
  { id: "4", slug: "how-to-automate-onboarding", title: "Tutorial: 100% Automated Employee Onboarding", category: "Product", readTime: "8 min read", date: "Jul 02, 2025", img: "https://placehold.co/600x400/222/7c3aed?text=Onboarding" },
];

export default function Blog() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Our Blog</h1>
        <p className="text-xl text-[#71717a] max-w-2xl mx-auto">Latest news, tutorials, and insights from the team at Arcaisys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <a href={`/blog/${post.slug}`} className="block h-full group">
              <Card className="h-full bg-[#0a0a0a] overflow-hidden p-0 border-[rgba(255,255,255,0.06)] group-hover:border-[#7c3aed]/50 group-hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden relative border-b border-[rgba(255,255,255,0.06)]">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <Badge variant={post.category === "Product" ? "glow" : "outline"}>{post.category}</Badge>
                    <span className="text-[#71717a] text-xs font-medium self-center">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                  <p className="text-[#71717a] text-sm">{post.date}</p>
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
