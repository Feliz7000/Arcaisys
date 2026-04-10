"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = window.devicePixelRatio || 1;

    const startGlobe = (size: number) => {
      // Tear down any existing instance
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      // Guard: cobe crashes on size ≤ 0
      if (size <= 0) return;

      // Sync backing-store resolution
      canvas.width = size * DPR;
      canvas.height = size * DPR;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: DPR,
        width: size * DPR,
        height: size * DPR,
        phi: phiRef.current,
        theta: 0.3,
        dark: 1,
        diffuse: 2.5,
        scale: 1,
        mapSamples: 16000,
        mapBrightness: 12,
        baseColor: [1.0, 0.42, 0.0],
        markerColor: [230 / 255, 48 / 255, 0],
        glowColor: [1.0, 165 / 255, 0],
        markers: [
          { location: [37.7595, -122.4367], size: 0.05 },
          { location: [40.7128, -74.006],   size: 0.05 },
          { location: [51.5072, -0.1276],   size: 0.04 },
          { location: [35.6895, 139.6917],  size: 0.06 },
          { location: [1.3521,  103.8198],  size: 0.05 },
          { location: [-33.8688, 151.2093], size: 0.05 },
          { location: [19.076,  72.8777],   size: 0.06 }, // Mumbai
        ],
        onRender: (state: any) => {
          state.phi = phiRef.current;
          phiRef.current += 0.003;
        },
      } as any);
    };

    // ResizeObserver fires immediately on first observe() call with the real layout size
    const ro = new ResizeObserver((entries) => {
      const size = Math.round(entries[0].contentRect.width);
      startGlobe(size);
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: "min(900px, 90vw)", height: "min(900px, 90vw)" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          animation: "globeFadeIn 1.5s ease forwards 0.5s",
        }}
      />
      <style>{`
        @keyframes globeFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
