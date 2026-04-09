"use client";

import { useEffect, useRef, useState } from "react";

export function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ willChange: 'transform' }}
    >
      <div 
        className={`w-2 h-2 bg-[#a855f7] rounded-full shadow-[0_0_15px_rgba(168,85,247,1)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out ${isHovering ? 'scale-[2.0]' : 'scale-100'}`}
      />
    </div>
  );
}
