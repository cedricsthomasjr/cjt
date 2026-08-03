"use client";

import useInView from "@/components/useInView";

/**
 * Reveals a block once, when it enters the viewport. Applied to whole
 * sections; use Stagger when the children should arrive in sequence.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
