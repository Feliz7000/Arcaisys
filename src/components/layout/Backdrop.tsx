/** Fixed ambient backdrop: drifting brand-colour light behind every glass surface. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute -top-[18%] -left-[10%] size-[55vmax] rounded-full bg-amber/25 blur-[110px] animate-drift" />
      <div className="absolute top-[8%] -right-[18%] size-[50vmax] rounded-full bg-flame/15 blur-[120px] animate-drift [animation-delay:-8s]" />
      <div className="absolute -bottom-[25%] left-[20%] size-[50vmax] rounded-full bg-coral/15 blur-[120px] animate-drift [animation-delay:-15s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-canvas)_85%)] opacity-60" />
    </div>
  );
}
