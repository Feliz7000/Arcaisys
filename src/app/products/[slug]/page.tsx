import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollIn } from "@/components/ui/ScrollIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProductIcon } from "@/components/ui/ProductIcon";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} — ${product.tagline}`, description: product.summary };
}

export default async function ProductPage({ params }: Params) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const live = p.status === "live";
  const others = products.filter((o) => o.slug !== p.slug);

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/#products" className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink">
            <ArrowLeft className="size-4" /> All products
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <ProductIcon product={p} className="size-14" />
                <StatusBadge status={p.status} />
                <span className="eyebrow text-muted">{p.industry}</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">{p.name}</h1>
              <p
                className="mt-3 bg-clip-text font-display text-2xl font-medium text-transparent sm:text-3xl"
                style={{ backgroundImage: `linear-gradient(120deg, ${p.accent.from}, ${p.accent.to})` }}
              >
                {p.tagline}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/#contact"
                    className="bg-brand group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/30 transition hover:shadow-xl"
                  >
                    {live ? "Book a demo" : "Request early access"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Open"
                      className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
                    >
                      Open {p.name} <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <a href="#features" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white">
                      See features
                    </a>
                  )}
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard tilt={6} glow={`${p.accent.from}29`} className="glass-strong rounded-[2rem] p-8">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 size-64 animate-drift rounded-full opacity-30 blur-3xl"
                  style={{ background: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
                />
                <Image
                  src={p.logo.src}
                  alt={`${p.name} logo`}
                  width={p.logo.width}
                  height={p.logo.height}
                  className="relative mx-auto mb-6 h-36 w-auto"
                  priority
                />
                <p className="eyebrow relative text-muted">At a glance</p>
                <ul className="relative mt-4 space-y-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[15px] text-ink-soft">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: p.accent.to }}>
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-7 border-t border-line pt-5">
                  <p className="eyebrow text-muted">Built for</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.audience.map((a) => (
                      <span key={a} className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-line">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-orange">Features</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {live ? "Everything a modern restaurant needs." : `What ${p.name} is being built to do.`}
            </h2>
            {!live && (
              <p className="mt-4 text-lg text-muted">
                {p.name} is in active development. Features below reflect our product plan and may evolve as we work with early partners.
              </p>
            )}
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <ScrollIn key={f.title} from={12}>
                <SpotlightCard tilt={6} glow={`${p.accent.from}29`} className="group h-full p-7">
                  <span className="font-mono text-xs font-semibold" style={{ color: p.accent.to }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                  <span
                    aria-hidden
                    className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, ${p.accent.from}, ${p.accent.to})` }}
                  />
                </SpotlightCard>
              </ScrollIn>
            ))}
          </div>
        </div>
      </section>

      {/* Modules (RestoQR) */}
      {p.modules && (
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollIn from={10} className="glass-strong rounded-[2rem] p-8 sm:p-12">
              <p className="eyebrow text-orange">One platform, every role</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Five purpose-built apps sharing one live source of truth.
              </h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.modules.map((m, i) => (
                  <Reveal key={m.name} delay={i * 0.07} y={20}>
                    <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-orange/10">
                      <p className="font-display font-semibold text-ink">{m.name}</p>
                      <p className="mt-1 text-sm text-muted">{m.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </ScrollIn>
          </div>
        </section>
      )}

      {/* Stack + CTA */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollIn from={10}>
            <div
              className="relative overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl shadow-flame/20 sm:p-12"
              style={{ background: `linear-gradient(125deg, ${p.accent.from}, ${p.accent.to} 60%, #9e0b1e)` }}
            >
              <div aria-hidden className="absolute -top-24 -left-10 size-72 animate-drift rounded-full bg-white/20 blur-3xl" />
              <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {live ? `See ${p.name} in action.` : `Be among the first to use ${p.name}.`}
                  </h2>
                  <p className="mt-3 max-w-lg text-white/85">
                    {live
                      ? "We'll walk you through the platform with your own menu and floor plan in mind."
                      : "We're partnering with a small group of early customers to shape the product. Tell us about your needs."}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Magnetic>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
                      >
                        {live ? "Book a demo" : "Request early access"} <ArrowRight className="size-4" />
                      </Link>
                    </Magnetic>
                    {p.url && (
                      <Magnetic>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Open"
                          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/25"
                        >
                          Open {p.name} <ArrowUpRight className="size-4" />
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-white/70">Built with</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium ring-1 ring-white/30 backdrop-blur">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollIn>
        </div>
      </section>

      {/* Other products */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-muted">More from Arcaisys</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <Link href={`/products/${o.slug}`} data-cursor="View" className="group block h-full">
                  <SpotlightCard tilt={6} glow={`${o.accent.from}29`} className="h-full p-6 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <ProductIcon product={o} className="size-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                      <ArrowUpRight className="size-5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                    </div>
                    <p className="mt-4 font-display text-lg font-semibold text-ink">{o.name}</p>
                    <p className="mt-1 text-sm text-muted">{o.tagline}</p>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
