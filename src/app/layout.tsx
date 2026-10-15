import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";
import { Backdrop } from "@/components/layout/Backdrop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Arcaisys — AI-powered software for the real world",
    template: "%s · Arcaisys",
  },
  description:
    "Arcaisys is an AI-powered software company building RestoQR, PACS, Hospio and Meridian — intelligent products for hospitality, healthcare and engineering teams.",
  openGraph: {
    title: "Arcaisys — AI-powered software for the real world",
    description: "Intelligent products for hospitality, healthcare and engineering teams.",
    images: ["/brand/arcaisys-logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <MotionProvider>
          <Backdrop />
          <ScrollProgress />
          <CustomCursor />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
