"use client";

import { useEffect, useRef } from "react";

interface MarqueeTextProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export function MarqueeText({
  items,
  speed = 40,
  className = "",
  separator = "—",
}: MarqueeTextProps) {
  const text = items.join(` ${separator} `) + ` ${separator} `;
  const doubled = text + text;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let velocity = 0;
    let targetVelocity = 0;
    let animationId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      // Limit speed boost to prevent visual tearing
      targetVelocity = Math.min(diff * 0.18, 15);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const update = () => {
      // Smooth out transition using lerp
      velocity += (targetVelocity - velocity) * 0.08;
      targetVelocity *= 0.94; // friction decay

      // Recalculate duration: duration = base_speed / (1 + velocity)
      // Increasing velocity decreases duration (meaning the animation speeds up)
      const newDuration = speed / (1 + velocity);

      if (containerRef.current) {
        containerRef.current.style.animationDuration = `${newDuration}s`;
      }

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        style={{
          display: "inline-flex",
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block pr-4">{doubled}</span>
        <span className="inline-block pr-4">{doubled}</span>
      </div>
    </div>
  );
}
