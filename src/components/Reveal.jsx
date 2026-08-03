"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals a block once, when it enters the viewport.
 *
 * The visible state is React state rather than an imperative classList
 * mutation — React owns className, so a re-render would silently wipe a class
 * added behind its back.
 *
 * The hidden styles are scoped to `.js` in CSS (set by an inline script in the
 * layout), so if scripting never runs the content is simply visible instead of
 * stuck at opacity 0.
 *
 * Applied to whole sections, never to every element inside them — per-element
 * fade-up chains are what made the old site read as generated.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
