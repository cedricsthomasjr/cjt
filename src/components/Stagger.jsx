"use client";

import { Children } from "react";
import useInView from "@/components/useInView";

/**
 * Reveals children in sequence. Kept to lists that are genuinely a set —
 * a run of cards, a run of rows — never applied to arbitrary prose.
 */
export default function Stagger({ children, step = 70, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          className={`reveal ${inView ? "is-in" : ""}`}
          style={{ transitionDelay: `${i * step}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
