"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleCheck, LoaderCircle, Mail, MapPin, Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const interests = [...products.map((p) => p.name), "A custom AI project", "Something else"];

const field =
  "w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/10";

export function Contact() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [interest, setInterest] = useState(interests[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      form.reset();
      setState({ kind: "sent" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <section id="contact" className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="bg-brand relative overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl shadow-flame/25 sm:p-10">
          <div aria-hidden className="absolute -top-20 -left-16 size-72 animate-drift rounded-full bg-white/20 blur-3xl" />
          <div aria-hidden className="absolute -right-20 -bottom-24 size-80 animate-drift rounded-full bg-crimson/50 blur-3xl [animation-delay:-9s]" />
          <div className="relative flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium ring-1 ring-white/30 backdrop-blur">
              <Sparkles className="size-3.5" /> Let&apos;s build together
            </span>
            <h2 className="mt-6 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              Have an operation that deserves better software?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              Book a demo of one of our products, ask about early access to what we&apos;re building, or tell us about
              a problem you want AI to solve. We reply within one business day.
            </p>
            <div className="mt-auto space-y-3 pt-10 text-sm">
              <p className="flex items-center gap-3"><Mail className="size-4 opacity-80" /> Send us a message using the form</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 opacity-80" /> Serving customers across India and beyond</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="glass-strong rounded-[2rem] p-6 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {state.kind === "sent" ? (
              <motion.div
                key="sent"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0, rotate: -120 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                  className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                >
                  <CircleCheck className="size-7" />
                </motion.span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Message received</h3>
                <p className="mt-2 max-w-sm text-muted">Thank you for reaching out. Someone from our team will get back to you shortly.</p>
                <button
                  type="button"
                  onClick={() => setState({ kind: "idle" })}
                  className="mt-6 text-sm font-semibold text-orange hover:text-flame"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.97 }} className="space-y-5">
                <div>
                  <p className="mb-3 text-sm font-medium text-ink">I&apos;m interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => {
                      const on = interest === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setInterest(i)}
                          aria-pressed={on}
                          className={cn(
                            "relative rounded-full px-4 py-2 text-sm transition-colors active:scale-95",
                            on ? "text-white" : "bg-white/70 text-ink-soft ring-1 ring-line hover:bg-white hover:ring-orange/40",
                          )}
                        >
                          {on && (
                            <motion.span
                              layoutId="interest-pill"
                              className="bg-brand absolute inset-0 rounded-full shadow-md shadow-orange/30"
                              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }}
                            />
                          )}
                          <span className="relative">{i}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
                    <input name="name" required autoComplete="name" placeholder="Your full name" className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Work email</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink">
                    Company <span className="font-normal text-muted">(optional)</span>
                  </span>
                  <input name="company" autoComplete="organization" placeholder="Restaurant, hospital, team…" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink">How can we help?</span>
                  <textarea name="message" required rows={5} placeholder="Tell us a little about what you need." className={cn(field, "resize-none")} />
                </label>

                {state.kind === "error" && (
                  <motion.p
                    role="alert"
                    initial={reduce ? false : { x: -8 }}
                    animate={{ x: [0, 8, -6, 4, 0] }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl bg-red/5 px-4 py-3 text-sm text-red ring-1 ring-red/20"
                  >
                    {state.message}
                  </motion.p>
                )}

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={state.kind === "sending"}
                    className="bg-brand group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-orange/30 transition hover:shadow-xl active:scale-[0.97] disabled:opacity-70 sm:w-auto"
                  >
                    {state.kind === "sending" ? (
                      <><LoaderCircle className="size-4 animate-spin" /> Sending…</>
                    ) : (
                      <>Send message <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></>
                    )}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
