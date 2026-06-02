"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 45, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  if (!children || !React.isValidElement(children)) {
    return children;
  }

  const child = children as React.ReactElement<any>;
  const childProps = child.props || {};

  return React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      (ref as any).current = node;
      const childRef = (child as any).ref || childProps.ref;
      if (childRef) {
        if (typeof childRef === "function") {
          childRef(node);
        } else if (childRef && "current" in childRef) {
          childRef.current = node;
        }
      }
    },
    style: {
      ...childProps.style,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: position.x === 0 && position.y === 0 
        ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" 
        : "transform 0.08s ease-out",
      display: "inline-block",
    },
  });
}