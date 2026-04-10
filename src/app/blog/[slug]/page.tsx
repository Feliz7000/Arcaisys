"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

export default function BlogPost() {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  return (
    <>
      <motion.div 
        className="fixed top-16 left-0 right-0 h-1 bg-[#FF6B00] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="container mx-auto px-6 py-32">
        <article className="max-w-[680px] mx-auto text-[#f4f4f5]">
          <header className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <Badge variant="glow">AI / Research</Badge>
              <div className="text-[#71717a] text-sm font-medium">8 min read</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 capitalize leading-tight">
              {slug?.replace(/-/g, " ") || "The Future of AI in Enterprise Automation"}
            </h1>
            
            <div className="flex items-center gap-4 text-sm">
              <Image
                src="https://ui-avatars.com/api/?name=Dr+Harkin&background=E63000&color=fff"
                alt="Author"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold text-white">Dr. James Harkin</div>
                <div className="text-[#71717a]">Oct 12, 2025</div>
              </div>
            </div>
          </header>

          <Image
            src="https://placehold.co/800x400/222/FF6B00?text=Blog+Header+Image"
            alt="Hero"
            width={800}
            height={400}
            className="w-full rounded-2xl mb-12 shadow-2xl border border-[rgba(255,255,255,0.06)]"
          />

          <div className="prose prose-invert prose-p:text-[#71717a] prose-p:leading-loose prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[#E63000] max-w-none">
            <p>
              The concept of a &quot;digital worker&quot; has evolved significantly over the past five years. What once meant a series of brittle macros written in python scripts has now metastasized into full-blown deep learning inference models orchestrating across microservices.
            </p>
            <p>
              In this post, we discuss the core philosophies behind Arcaisys architecture and how we safely contain LLMs while giving them execute permissions via function calling.
            </p>

            <h2>Safeguards and Human-in-the-Loop Architecture</h2>
            <p>
              When a system can invoke API endpoints or run SQL queries automatically, the cost of hallucination goes from &quot;mild inconvenience&quot; to &quot;catastrophic data loss.&quot; That&apos;s why we introduced the dual-agent review standard.
            </p>

            <blockquote>
              <p>“Automation without validation is just computation moving really fast toward failure.”</p>
            </blockquote>

            <h2>Conclusion</h2>
            <p>
              The enterprise of tomorrow won&apos;t run on rigid logic gates. It will run on intent. And while that sounds terrifying, with the right safeguards, it represents the biggest leap in operational efficiency since cloud computing.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
