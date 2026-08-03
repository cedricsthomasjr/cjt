"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Remounts on route change so the entry animation replays. Keyed on pathname
 * rather than wrapped in a transition library — this is a five-page site.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  // Mounting proves the React bundle actually ran, so cancel the inline
  // head script's reveal-fallback timer (see layout.js). If the bundle
  // never executes, this never runs, the timer fires, and layout.js strips
  // .js so .reveal content can't be stranded hidden forever.
  useEffect(() => {
    if (typeof window !== "undefined" && window.__revealFallback) {
      clearTimeout(window.__revealFallback);
    }
  }, []);

  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  );
}
