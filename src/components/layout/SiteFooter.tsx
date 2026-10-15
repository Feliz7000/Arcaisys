import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 px-4 pb-8">
      <div className="glass mx-auto max-w-6xl overflow-hidden rounded-3xl p-8 sm:p-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Arcaisys is an AI-powered software company building intelligent products for hospitality,
              healthcare and engineering teams.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-muted">Products</p>
            <ul className="space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.slug} className="flex items-center gap-2">
                  <Link href={`/products/${p.slug}`} className="text-ink-soft transition hover:text-orange">
                    {p.name}
                  </Link>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.name}`}
                      className="inline-flex items-center gap-0.5 rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-medium text-orange transition hover:bg-orange/20"
                    >
                      Open <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-muted">Company</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#capabilities" className="text-ink-soft transition hover:text-orange">Capabilities</Link></li>
              <li><Link href="/#approach" className="text-ink-soft transition hover:text-orange">Approach</Link></li>
              <li><Link href="/#company" className="text-ink-soft transition hover:text-orange">About</Link></li>
              <li><Link href="/#contact" className="text-ink-soft transition hover:text-orange">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arcaisys. All rights reserved.</p>
          <p className="font-mono">Intelligent software, built for the real world.</p>
        </div>
      </div>
    </footer>
  );
}
