"use client";

import { usePathname } from "next/navigation";

/**
 * Remounts on route change so the entry animation replays. Keyed on pathname
 * rather than wrapped in a transition library — this is a five-page site.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  );
}
