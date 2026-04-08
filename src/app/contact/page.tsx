"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Left Side: Form */}
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Get in touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#71717a] mb-12"
          >
            Our team is ready to help you automate your business. Reach out below.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="relative group">
              <input type="text" required id="name" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#7c3aed] transition-colors" placeholder="Name" />
              <label htmlFor="name" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#7c3aed] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#7c3aed]">Name</label>
            </div>
            
            <div className="relative group">
              <input type="email" required id="email" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#7c3aed] transition-colors" placeholder="Email" />
              <label htmlFor="email" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#7c3aed] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#7c3aed]">Email</label>
            </div>
            
            <div className="relative group">
              <input type="text" required id="company" className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#7c3aed] transition-colors" placeholder="Company" />
              <label htmlFor="company" className="absolute left-0 top-3 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#7c3aed] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#7c3aed]">Company</label>
            </div>

            <div className="relative group pt-4">
              <textarea required id="msg" rows={4} className="peer w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#7c3aed] transition-colors resize-none" placeholder="Message"></textarea>
              <label htmlFor="msg" className="absolute left-0 top-7 text-[#71717a] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#7c3aed] peer-valid:-top-3 peer-valid:text-xs peer-valid:text-[#7c3aed]">Message</label>
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

        {/* Right Side: Info */}
        <div className="flex-1 lg:pl-16">
          <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Mail className="w-5 h-5 text-[#a855f7]" /> Email</h3>
              <p className="text-[#71717a]">hello@arcaisys.com</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#a855f7]" /> HQ Location</h3>
              <p className="text-[#71717a]">1 Market St. Ste 300<br/>San Francisco, CA 94105</p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-white font-bold mb-4">Or book a meeting directly</h3>
              <Button variant="outline" className="w-full">
                Schedule on Calendly
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
