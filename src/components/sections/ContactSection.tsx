"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Loader2, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const target = e.target as HTMLFormElement;
      const name = (target.elements.namedItem('name') as HTMLInputElement).value;
      const email = (target.elements.namedItem('email') as HTMLInputElement).value;
      const company = (target.elements.namedItem('company') as HTMLInputElement).value;
      const message = (target.elements.namedItem('msg') as HTMLTextAreaElement).value;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, company, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      target.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[#71717a] mb-12"
          >
            Our team is ready to help you automate your business. Reach out below.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="relative group">
              <input type="text" required id="name" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#FF6B00] transition-colors" placeholder="Name" />
              <label htmlFor="name" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FF6B00] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#FF6B00]">Name</label>
            </div>

            <div className="relative group">
              <input type="email" required id="email" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#FF6B00] transition-colors" placeholder="Email" />
              <label htmlFor="email" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FF6B00] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#FF6B00]">Email</label>
            </div>

            <div className="relative group">
              <input type="text" required id="company" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#FF6B00] transition-colors" placeholder="Company" />
              <label htmlFor="company" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FF6B00] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#FF6B00]">Company</label>
            </div>

            <div className="relative group pt-4">
              <textarea required id="msg" rows={4} className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#FF6B00] transition-colors resize-none" placeholder="Message"></textarea>
              <label htmlFor="msg" className="absolute left-0 top-7 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#FF6B00] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#FF6B00]">Message</label>
            </div>

            <Button type="submit" className="w-full mt-8" disabled={loading || success}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : success ? (
                <span className="flex items-center justify-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> Sent Successfully</span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>

        <div className="flex-1 lg:pl-16">
          <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Mail className="w-5 h-5 text-[#E63000]" /> Email</h3>
              <p className="text-[#71717a]">contact@arcaisys.com</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#E63000]" /> HQ Location</h3>
              <p className="text-[#71717a]">Village Road,<br />Mumbai, Maharashtra, India</p>
            </div>
            {/* <div className="pt-4 border-t border-white/10">
              <h3 className="text-white font-bold mb-4">Or book a meeting directly</h3>
              <Button variant="outline" className="w-full">
                Schedule on Calendly
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}