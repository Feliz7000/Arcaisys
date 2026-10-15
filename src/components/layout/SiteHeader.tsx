"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "./Logo";

const links = [
  { href: "/#products", label: "Products" },
  { href: "/#industries", label: "Industries" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#approach", label: "Approach" },
  { href: "/#company", label: "Company" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled || open ? "glass-strong" : "border border-transparent",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex" onPointerLeave={() => setHovered(null)}>
          {links.map((l) => (
            <li key={l.href} className="relative">
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-orange/15"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <Link
                href={l.href}
                onPointerEnter={() => setHovered(l.href)}
                className="relative block rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25}>
            <Link
              href="/#contact"
              className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-crimson sm:inline-flex"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-ink transition hover:bg-white/70 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="glass-strong mx-auto mt-2 max-w-6xl origin-top rounded-2xl p-2 md:hidden"
          >
            {[...links, { href: "/#contact", label: "Start a project" }].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.25 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base text-ink-soft hover:bg-white hover:text-ink"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
