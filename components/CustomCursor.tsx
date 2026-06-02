"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTextCursor, setIsTextCursor] = useState(false);
  const isTextCursorRef = useRef(false);

  const setIsTextCursorState = (val: boolean) => {
    isTextCursorRef.current = val;
    setIsTextCursor(val);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const onInputEnter = () => setIsTextCursorState(true);
    const onInputLeave = () => setIsTextCursorState(false);

    const onMouseLeaveWindow = () => setVisible(false);
    const onMouseEnterWindow = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input[type='submit'], input[type='button'], label")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });

      document
        .querySelectorAll("input:not([type='submit']):not([type='button']), textarea, [contenteditable]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onInputEnter);
          el.removeEventListener("mouseleave", onInputLeave);
          el.addEventListener("mouseenter", onInputEnter);
          el.addEventListener("mouseleave", onInputLeave);
        });
    };

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        const dx = isTextCursorRef.current ? -1 : -4;
        const dy = isTextCursorRef.current ? -8 : -4;
        dotRef.current.style.transform = `translate(${pos.current.x + dx}px, ${pos.current.y + dy}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows mouse exactly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isTextCursor ? 2 : 8,
          height: isTextCursor ? 16 : 8,
          borderRadius: isTextCursor ? 0 : "50%",
          backgroundColor: "white",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms, width 200ms, height 200ms, border-radius 200ms",
          willChange: "transform",
        }}
      />
      {/* Ring — follows with lerp lag */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isTextCursor ? 0 : (hovered ? 56 : 40),
          height: isTextCursor ? 0 : (hovered ? 56 : 40),
          borderRadius: "50%",
          border: isTextCursor ? "0px solid white" : "1px solid white",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "difference",
          opacity: visible ? (isTextCursor ? 0 : (hovered ? 1 : 0.4)) : 0,
          transition: "opacity 300ms, width 300ms cubic-bezier(0.4,0,0.2,1), height 300ms cubic-bezier(0.4,0,0.2,1), border 300ms",
          willChange: "transform",
          transform: clicked ? "scale(0.85)" : "scale(1)",
        }}
      />
    </>
  );
}