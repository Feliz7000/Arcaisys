"use client";

export function CTABanner() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF6B00]/20 via-[#0a0a0a]/80 to-[#0a0a0a]" />

      <div className="container relative z-10 px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
          Ready to Build the Future with Us?
        </h2>
        <p className="text-xl text-[#71717a] mb-10 max-w-2xl mx-auto">
          Partner with Arcaisys to create intelligent solutions that solve real-world problems across industries.
        </p>
        {/* <Button size="lg" className="scale-110 shadow-[0_0_30px_rgba(255,107,0,0.5)]">
          Get Started Free
        </Button> */}
      </div>
    </section>
  );
}
