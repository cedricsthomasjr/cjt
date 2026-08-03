"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One IntersectionObserver contract for the whole site. Returns `true`
 * immediately when the visitor has asked for reduced motion, so callers never
 * have to branch on it themselves.
 */
export default function useInView({
  threshold = 0.1,
  rootMargin = "0px 0px -6% 0px",
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
