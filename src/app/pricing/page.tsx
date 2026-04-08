"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    priceMonthly: "0",
    priceAnnual: "0",
    desc: "Perfect for individuals and small projects.",
    features: ["1,000 workflows/mo", "Basic standard integrations", "Community support", "1 team member"],
    popular: false,
  },
  {
    name: "Pro",
    priceMonthly: "49",
    priceAnnual: "39",
    desc: "For growing teams that need real power.",
    features: ["Unlimited workflows", "200+ Premium integrations", "Priority 24/7 support", "Up to 5 team members", "Custom script execution", "Real-time analytics"],
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    desc: "For large scale, secure, and compliant ops.",
    features: ["Everything in Pro", "Unlimited team members", "Dedicated Account Manager", "SOC2 Compliance Reports", "Custom SLA", "Self-hosted options"],
    popular: false,
  }
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Simple, transparent pricing</h1>
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!annual ? "text-white" : "text-[#71717a]"}`}>Monthly</span>
          <button 
            className="w-12 h-6 bg-[#27272a] rounded-full relative p-1 transition-colors"
            onClick={() => setAnnual(!annual)}
          >
            <motion.div 
              className="w-4 h-4 bg-[#7c3aed] rounded-full"
              animate={{ x: annual ? 24 : 0 }}
            />
          </button>
          <span className={`text-sm flex items-center gap-2 ${annual ? "text-white" : "text-[#71717a]"}`}>
            Annually <Badge variant="glow" className="text-[10px]">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`relative flex flex-col h-full ${plan.popular ? "scale-105 z-10" : "scale-100 mt-0 md:mt-4"}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <Badge className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] border-0">Most Popular</Badge>
              </div>
            )}
            <Card className={`flex-1 flex flex-col ${plan.popular ? "border-[#7c3aed] shadow-[0_0_30px_rgba(124,58,237,0.15)] bg-[#0a0a0a] relative overflow-hidden" : "bg-[#0a0a0a]/50"}`}>
              {plan.popular && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7]" />}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-[#71717a] text-sm h-10">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">
                    {plan.priceMonthly === "Custom" ? "Custom" : `$${annual ? plan.priceAnnual : plan.priceMonthly}`}
                  </span>
                  {plan.priceMonthly !== "Custom" && <span className="text-[#71717a] mb-2">/mo</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex flex-start gap-3 text-sm text-white/80">
                    <Check className="w-5 h-5 text-[#a855f7] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "default" : "outline"} className="w-full mt-auto">
                {plan.priceMonthly === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
