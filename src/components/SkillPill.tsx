"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export interface SkillMeta {
  name: string;
  learnedWhere: string;
  learnedWhen: string;
}

const VIEWPORT_MARGIN = 12;
const TIP_GAP = 8;

/**
 * A skill pill that reveals where/when it was learned. Opens on hover and
 * keyboard focus (desktop), and on tap (touch, where hover doesn't fire) —
 * a second tap, an outside tap, or Escape closes it.
 *
 * Position is computed in JS and re-clamped to the viewport on open,
 * resize, and scroll, rather than relying on CSS anchoring. That's what
 * keeps the card fully on-screen — never sliced off at a mobile screen
 * edge, and never wide enough to push the page into horizontal scroll —
 * for a pill sitting anywhere in the grid, including the last one in a row.
 *
 * The tooltip is portaled to document.body rather than rendered in place.
 * PageTransition's route wrapper (.page-in) runs an entrance animation
 * with animation-fill-mode: both, which leaves a non-"none" transform
 * matrix on that ancestor even at rest — and per spec, any transform other
 * than the literal keyword `none` turns an element into the containing
 * block for its `position: fixed` descendants. Left in place, this pill's
 * "fixed" tooltip would position itself relative to that wrapper instead
 * of the viewport. The portal sidesteps it regardless of what animates
 * between here and <body>.
 */
export default function SkillPill({ skill }: { skill: SkillMeta }) {
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const anchorRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const lastPointerType = useRef<string>("");
  const tipId = useId();

  // Portal target isn't available during SSR/first paint.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      setPlaced(false);
      return;
    }

    const place = () => {
      const anchor = anchorRef.current;
      const tip = tipRef.current;
      if (!anchor || !tip) return;

      const anchorBox = anchor.getBoundingClientRect();
      const tipWidth = tip.offsetWidth;
      const tipHeight = tip.offsetHeight;

      let left = anchorBox.left + anchorBox.width / 2 - tipWidth / 2;
      left = Math.max(
        VIEWPORT_MARGIN,
        Math.min(left, window.innerWidth - tipWidth - VIEWPORT_MARGIN)
      );

      const fitsBelow =
        anchorBox.bottom + TIP_GAP + tipHeight <= window.innerHeight - VIEWPORT_MARGIN;
      const top = fitsBelow
        ? anchorBox.bottom + TIP_GAP
        : Math.max(VIEWPORT_MARGIN, anchorBox.top - TIP_GAP - tipHeight);

      setStyle({ position: "fixed", left, top });
      setPlaced(true);
    };

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (anchorRef.current?.contains(target) || tipRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={anchorRef}
        className="pill skillpill"
        aria-describedby={open ? tipId : undefined}
        // Enter/leave are gated on a real mouse. Touch browsers synthesize a
        // mouseenter on tap, so ungated these would open the card and let the
        // click below immediately toggle it shut — a tap that does nothing.
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        onClick={(event) => {
          event.stopPropagation();
          // With a mouse, hover already governs open/closed — toggling here
          // would just undo the mouseenter that fired a moment earlier.
          if (lastPointerType.current === "mouse") return;
          setOpen((value) => !value);
        }}
      >
        {skill.name}
      </button>
      {open &&
        mounted &&
        createPortal(
          <div
            ref={tipRef}
            id={tipId}
            role="tooltip"
            className="skillpill-tip"
            style={{ ...style, visibility: placed ? "visible" : "hidden" }}
          >
            <span className="skillpill-tip-label">Learned at {skill.learnedWhere}</span>
            <span className="skillpill-tip-when">{skill.learnedWhen}</span>
          </div>,
          document.body
        )}
    </>
  );
}
