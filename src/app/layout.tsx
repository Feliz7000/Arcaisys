import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { GlobalCursor } from "@/components/ui/GlobalCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcaisys | AI-Powered Workflow Automation",
  description: "Automate Everything. Scale Infinitely. Arcaisys uses cutting-edge AI to eliminate repetitive workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`} style={{ colorScheme: "dark" }}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans noise-bg">
        <GlobalCursor />
        <BackgroundParticles />
        <header className="fixed top-0 left-0 w-full h-16 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]/70 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-tr from-[#7c3aed] to-[#a855f7]" />
            Arcaisys
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#71717a] font-medium">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/features" className="hover:text-white transition-colors">Features</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          {/* <div className="hidden md:block">
            <a href="/contact" className="px-4 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)]">
              Get Early Access
            </a>
          </div> */}
        </header>

        <main className="flex-grow pt-16 flex flex-col">
          {children}
        </main>

        <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 px-6 mt-20 relative z-10 bg-[#0a0a0a]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#71717a]">
            <div className="flex items-center gap-2">
              <div className="font-bold text-white">Arcaisys</div>
              <span>— © 2025 All rights reserved.</span>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Product</a>
              <a href="#" className="hover:text-white transition-colors">Company</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Social</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
