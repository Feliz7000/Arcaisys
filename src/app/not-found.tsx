import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 pt-32">
      <div className="glass-strong max-w-md rounded-[2rem] p-10 text-center">
        <p className="font-display text-7xl font-semibold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">This page wandered off.</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="bg-brand mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
          <ArrowLeft className="size-4" /> Back home
        </Link>
      </div>
    </section>
  );
}
