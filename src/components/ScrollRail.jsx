"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A gold hairline under the navigation that fills as you move down a page.
 *
 * The site already reads as an instrument — hairlines that draw, tabular
 * figures, dotted timelines. This is the readout that says how far through the
 * document you are, in the same language rather than a new one.
 *
 * Scroll writes are collapsed to one per frame and the listener is passive.
 * Recomputed on route change because the next page is a different length.
 */
export default function ScrollRail() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    let frame = 0;

    const flush = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (el) el.style.setProperty("--sp", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return <div ref={ref} className="rail" aria-hidden="true" />;
}
