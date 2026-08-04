"use client";

import { useEffect, useRef } from "react";

/**
 * The site has one light source, and it is the cursor.
 *
 * This writes the pointer position to two custom properties on the root
 * (--px / --py) and, whenever the pointer is over a card, the same position in
 * that card's local space (--cx / --cy). CSS does the rest: the background dot
 * grid brightens under the cursor, and each card catches the same light on its
 * own surface. One input, every surface responding to it.
 *
 * Writes go through a single rAF so a burst of pointermove events collapses
 * into one style write per frame, and the listener is passive so it never
 * blocks scrolling. Fine pointers only — on touch there is no cursor to follow
 * and the whole effect is dead weight.
 *
 * The is-live class is toggled imperatively rather than through state on
 * purpose: this component takes no props and holds no state, so it never
 * re-renders and React will not clobber the class behind our back.
 */
export default function PointerLight() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const flush = () => {
      frame = 0;
      root.style.setProperty("--px", `${x}px`);
      root.style.setProperty("--py", `${y}px`);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;

      if (el) el.classList.add("is-live");
      if (!frame) frame = requestAnimationFrame(flush);

      const card = event.target.closest?.(".card");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--cx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--cy", `${event.clientY - rect.top}px`);
      }
    };

    const onLeave = () => el && el.classList.remove("is-live");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="pointer-light" aria-hidden="true" />;
}
