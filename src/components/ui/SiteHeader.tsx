"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "@/app/logo/logo.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="h-16 px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2 text-white hover:opacity-90 transition-opacity rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/70"
          aria-label="Go to Arcaisys homepage"
          onClick={() => setMenuOpen(false)}
        >
          <Image src={logo} alt="Arcaisys logo" width={24} height={24} className="rounded-sm object-contain" priority />
          <span className="font-[family-name:var(--font-orbital)]">ARCAISYS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a] font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[rgba(255,255,255,0.1)] text-white hover:bg-white/5 transition-colors"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]/95 transition-[max-height,opacity] duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="px-4 py-4 flex flex-col gap-2 text-sm text-[#71717a] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
