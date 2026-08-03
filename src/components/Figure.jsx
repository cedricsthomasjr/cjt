"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wipes a figure up into place the first time it scrolls into view.
 *
 * Deliberately NOT a count-up. Counting from zero means the page renders
 * "$6K" where it should say "$100K" for the better part of a second, and the
 * whole point of this readout is figures that survive scrutiny. A masked
 * reveal shows the number or shows nothing.
 */
export default function Figure({ prefix = "", num, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`fig ${shown ? "is-in" : ""}`}>
      <span
        className="fig-inner"
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {prefix}
        {num}
        {suffix}
      </span>
    </span>
  );
}
