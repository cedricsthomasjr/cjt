"use client";

import useInView from "@/components/useInView";

/**
 * The vertical gold hairline that links one section to the next. Taken from
 * rython.dev's circuit connectors, drawn as a single tapered rule instead —
 * the same gesture as the site's existing gold hairlines, turned 90 degrees.
 */
export default function Connector({ height = "4rem" }) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`connector ${inView ? "is-in" : ""}`}
      style={{ height }}
    />
  );
}
