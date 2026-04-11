import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { GlobalCursor } from "@/components/ui/GlobalCursor";
import { SiteHeader } from "@/components/ui/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbital",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full antialiased dark`} style={{ colorScheme: "dark" }}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans noise-bg">
        <GlobalCursor />
        <BackgroundParticles />
        <SiteHeader />

        <main className="flex-grow pt-16 flex flex-col relative z-10">
          {children}
        </main>

        <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 px-6 mt-20 relative z-10 bg-[#0a0a0a]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#71717a]">
            <div className="flex items-center gap-2">
              <div className="font-bold text-white">Arcaisys</div>
              <span>— © 2025 All rights reserved.</span>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              {/* <a href="#" className="hover:text-white transition-colors">Product</a> */}
              <a href="#" className="hover:text-white transition-colors">Company</a>
              {/* <a href="#" className="hover:text-white transition-colors">Legal</a> */}
              {/* <a href="#" className="hover:text-white transition-colors">Social</a> */}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
