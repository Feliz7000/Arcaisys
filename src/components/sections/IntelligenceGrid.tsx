"use client";

import React, { useEffect, useRef, useState } from "react";

interface Line {
  originalLength: number;
  angle: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftRadiusX: number;
  driftRadiusY: number;
  currentRadius: number;
  currentOpacity: number;
  interactDx: number;
  interactDy: number;
}

export function IntelligenceGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const linesRef = useRef<Line[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (containerRef.current) {
        // Fallback or double check intersection is better, 
        // but just toggling visibility back true if intersecting will be handled by observer
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const numLines = isMobile ? 100 : 200; // between 180-220, using 200

    // Initialize lines
    if (linesRef.current.length === 0 || linesRef.current.length !== numLines) {
      const lines: Line[] = [];
      for (let i = 0; i < numLines; i++) {
        const length = 100 + Math.random() * 450; // 100 to 550px spread

        // Spread 170 degrees upward (- Math.PI to 0) -> center is -Math.PI / 2
        // So from (-Math.PI/2 - 85 deg) to (-Math.PI/2 + 85 deg)
        const spreadRadians = (170 * Math.PI) / 180;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * spreadRadians;

        lines.push({
          originalLength: length,
          angle: angle,
          driftPhaseX: Math.random() * Math.PI * 2,
          driftPhaseY: Math.random() * Math.PI * 2,
          driftSpeedX: 0.005 + Math.random() * 0.01,
          driftSpeedY: 0.005 + Math.random() * 0.01,
          driftRadiusX: Math.random() * 8, // max drift 8px
          driftRadiusY: Math.random() * 8,
          currentRadius: 2.5,
          currentOpacity: 0.15,
          interactDx: 0,
          interactDy: 0,
        });
      }
      linesRef.current = lines;
    }

    const handleResizeCanvas = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResizeCanvas);

    const render = () => {
      // Pause completely if tab inactive or off-screen, unless reduced motion limits rendering to 1 frame
      if (!isVisible && !prefersReducedMotion) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const { x: mouseX, y: mouseY } = mouseRef.current;
      const isHovering = mouseX !== -1000 && mouseY !== -1000;
      const interactable = !isMobile && !prefersReducedMotion;

      const originX = width / 2;
      const originY = height; // Anchor at the very bottom edge

      // Draw lines and nodes
      const lines = linesRef.current;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Ambient drift
        if (!prefersReducedMotion) {
          line.driftPhaseX += line.driftSpeedX;
          line.driftPhaseY += line.driftSpeedY;
        }
        const dx = prefersReducedMotion ? 0 : Math.cos(line.driftPhaseX) * line.driftRadiusX;
        const dy = prefersReducedMotion ? 0 : Math.sin(line.driftPhaseY) * line.driftRadiusY;

        const currentLength = line.originalLength;

        // Base tip calculated with length, angle, and Brownian drift
        let tipX = originX + Math.cos(line.angle) * currentLength + dx;
        let tipY = originY + Math.sin(line.angle) * currentLength + dy;

        // Interaction: hover near tip pushes it away individually
        const distToTip = interactable && isHovering ? Math.hypot(mouseX - tipX, mouseY - tipY) : Infinity;
        const hoverRadius = 150;
        const isTipHovered = distToTip < hoverRadius;

        let targetInteractDx = 0;
        let targetInteractDy = 0;
        if (isTipHovered && distToTip > 0.1) {
          const repelForce = (hoverRadius - distToTip) / hoverRadius;
          targetInteractDx = ((tipX - mouseX) / distToTip) * repelForce * 50;
          targetInteractDy = ((tipY - mouseY) / distToTip) * repelForce * 50;
        }

        // Smooth physics spring for interaction offset
        line.interactDx += (targetInteractDx - line.interactDx) * 0.15;
        line.interactDy += (targetInteractDy - line.interactDy) * 0.15;

        // Apply physical offset
        tipX += line.interactDx;
        tipY += line.interactDy;

        const targetRadius = isTipHovered ? 5 : 2.5;
        line.currentRadius += (targetRadius - line.currentRadius) * 0.15;

        const targetOpacity = isTipHovered ? 1.0 : 0.15;
        line.currentOpacity += (targetOpacity - line.currentOpacity) * 0.15;

        // Draw Line
        const grad = ctx.createLinearGradient(originX, originY, tipX, tipY);
        grad.addColorStop(0, "rgba(124, 58, 237, 0.6)");
        grad.addColorStop(1, `rgba(168, 85, 247, ${line.currentOpacity})`);

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(tipX, tipY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Node Dot
        ctx.beginPath();
        ctx.arc(tipX, tipY, line.currentRadius, 0, Math.PI * 2);
        const nodeBaseOpacity = isTipHovered ? 1.0 : 0.6; // Base opacity when not hovered
        ctx.fillStyle = `rgba(168, 85, 247, ${nodeBaseOpacity})`;
        ctx.shadowBlur = isTipHovered ? 12 : 6;
        ctx.shadowColor = "#a855f7";
        ctx.fill();

        // Reset shadow for next line/dot to avoid bleed
        ctx.shadowBlur = 0;
      }

      // Draw Origin Point
      ctx.beginPath();
      ctx.arc(originX, originY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#7c3aed";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#7c3aed";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Custom Cursor
      if (interactable && isHovering) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#a855f7";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#a855f7";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!prefersReducedMotion) {
        requestRef.current = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      requestRef.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", handleResizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, isMobile]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600px] bg-[#0a0a0a] overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 100%, rgba(124, 58, 237, 0.15) 0%, rgba(10, 10, 10, 1) 60%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-none"
      />
    </section>
  );
}
