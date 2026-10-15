import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ScrollIn } from "@/components/ui/ScrollIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProductIcon } from "@/components/ui/ProductIcon";

// Bento layout: wide cards alternate sides.
const spans: Record<string, string> = {
  restoqr: "lg:col-span-2",
  pacs: "",
  hospio: "",
  meridian: "lg:col-span-2",
};

export function Products() {
  return (
    <section id="products" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our products"
            title={<>One studio. <span className="text-gradient">Four products</span> solving real operations.</>}
            lead="Each product is built for a specific industry, designed with the people who use it, and powered by AI where it genuinely helps."
          />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {products.map((p) => (
            <ScrollIn key={p.slug} className={spans[p.slug]}>
              <ProductCard product={p} wide={spans[p.slug] !== ""} />
            </ScrollIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product: p, wide }: { product: Product; wide: boolean }) {
  return (
    <div
      data-cursor="View"
      className="group relative h-full rounded-3xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-orange"
    >
      <SpotlightCard
        glow={`${p.accent.from}29`}
        tilt={wide ? 3 : 5}
        className="ring-gradient h-full transition-transform duration-500 group-hover:-translate-y-1"
      >
        <div className={cn("flex h-full flex-col gap-8 p-7 sm:p-8", wide && "md:flex-row md:gap-10")}>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <ProductIcon product={p} className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              <StatusBadge status={p.status} />
            </div>
            <p className="eyebrow mt-6 text-muted">{p.industry}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{p.name}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: p.accent.to }}>{p.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.summary}</p>
            {!wide && (
              <ul className="mt-6 space-y-2.5 border-t border-line/80 pt-6">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0" style={{ color: p.accent.to }} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
              {/* Stretched link: its ::after covers the whole card. */}
              <Link
                href={`/products/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink outline-none after:absolute after:inset-0 after:rounded-3xl"
              >
                Explore {p.name}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-crimson"
                >
                  Open {p.name} <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>

          {wide && (
            <div className="flex flex-1 flex-col justify-center gap-3">
              {p.slug === "restoqr" && (
                <div className="mb-2 hidden rounded-2xl bg-white/80 p-4 ring-1 ring-black/5 md:block">
                  <Image
                    src="/brand/restoqr-logo.png"
                    alt="RestoQR logo"
                    width={962}
                    height={756}
                    className="mx-auto h-28 w-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              {p.slug === "meridian" && (
                <div className="mb-2 hidden rounded-2xl bg-ink p-4 font-mono text-[11px] leading-relaxed text-white/75 md:block">
                  <p className="text-white/45">$ meridian ask &quot;why is GET /api/orders slow?&quot;</p>
                  <p className="mt-1.5 text-amber">N+1 suspected · 10.4× per request · 88% of time</p>
                  <p className="mt-1 text-coral">[REFUTED] package fastcache not declared</p>
                  <p className="text-emerald-400">Critic: 17/18 claims grounded</p>
                </div>
              )}
              {p.highlights.map((h, i) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl bg-white/55 px-4 py-3 text-sm text-ink-soft ring-1 ring-white transition-transform duration-500 group-hover:translate-x-1"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Check className="mt-0.5 size-4 shrink-0" style={{ color: p.accent.to }} />
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}
