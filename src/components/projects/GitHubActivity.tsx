"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { githubFallback } from "@/data/engineering";

const DAY_COUNT = 30;
const VIEWPORT_MARGIN = 12;
const TIP_GAP = 8;

/** One cell: a calendar date plus the contribution count and quartile level
 *  GitHub's own graph assigns it. Both come from /api/github-activity, which
 *  reads the same contribution calendar the profile page renders — so this
 *  strip and the profile graph can't disagree. */
type DayActivity = {
  date: string;
  count: number;
  level: number;
};

/** "2026-08-05" → "Aug 5", parsed as a *local* date. Splitting the parts by
 *  hand matters: `new Date("2026-08-05")` is parsed as UTC midnight, which
 *  renders as Aug 4 for anyone west of Greenwich. */
function formatDayLabel(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/** Only ever called client-side, post-mount — never during SSR — so it can't
 *  produce a hydration mismatch even though its output changes by the minute. */
function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

/** Five visual states, gold intensity climbing from a bare outline to a lit
 *  glow — built on the site's own --color-gold tokens rather than a Tailwind
 *  amber scale, so it reads as the same material as every other gold accent
 *  on the page. The level driving these is GitHub's own quartile, not a
 *  locally invented scale. */
const TIER_STYLE: Record<number, CSSProperties> = {
  0: {
    border: "1px solid var(--color-rule)",
    background: "transparent",
  },
  1: {
    border: "1px solid rgb(200 64 54 / 0.35)",
    background: "rgb(200 64 54 / 0.16)",
  },
  2: {
    border: "1px solid rgb(200 64 54 / 0.55)",
    background: "rgb(200 64 54 / 0.38)",
  },
  3: {
    border: "1px solid var(--color-gold)",
    background: "rgb(200 64 54 / 0.65)",
    boxShadow: "0 2px 10px rgb(200 64 54 / 0.25)",
  },
  4: {
    border: "1px solid var(--color-gold-lift)",
    background: "linear-gradient(160deg, var(--color-gold), var(--color-gold-lift))",
    boxShadow: "0 0 14px rgb(232 206 138 / 0.55)",
  },
};

const CELL_CLASS =
  "h-3.5 w-3.5 shrink-0 rounded-sm sm:h-4 sm:w-4";

/**
 * One cell in the shipping-cadence strip. Hover (mouse) or focus opens a
 * portaled, viewport-clamped tooltip — same positioning approach as
 * SkillPill, so a cell near a screen edge slides in rather than clipping.
 * Tap toggles it open on touch, where hover never fires.
 */
function DayCell({ day }: { day: DayActivity }) {
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const anchorRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const lastPointerType = useRef<string>("");
  const tipId = useId();

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

      const fitsAbove = anchorBox.top - TIP_GAP - tipHeight >= VIEWPORT_MARGIN;
      const top = fitsAbove
        ? anchorBox.top - TIP_GAP - tipHeight
        : anchorBox.bottom + TIP_GAP;

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

  // Same vocabulary GitHub uses, because it's the same number.
  const description =
    day.count === 0
      ? "No contributions"
      : `${day.count} contribution${day.count === 1 ? "" : "s"}`;

  const dayLabel = formatDayLabel(day.date);

  return (
    <>
      <button
        type="button"
        ref={anchorRef}
        aria-label={`${dayLabel}: ${description}`}
        aria-describedby={open ? tipId : undefined}
        // Enter/leave are gated on a real mouse. Touch browsers synthesize a
        // mouseenter on tap, so ungated these would open the tooltip and let
        // the click below immediately toggle it shut — a tap that does nothing.
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
          if (lastPointerType.current === "mouse") return;
          setOpen((value) => !value);
        }}
        className={`${CELL_CLASS} cursor-pointer appearance-none bg-none transition-transform duration-150 hover:z-10 hover:scale-125 focus-visible:z-10 focus-visible:scale-125 focus-visible:outline-none`}
        style={TIER_STYLE[day.level] ?? TIER_STYLE[0]}
      />
      {open &&
        mounted &&
        createPortal(
          <div
            ref={tipRef}
            id={tipId}
            role="tooltip"
            aria-hidden="true"
            className="skillpill-tip"
            style={{ ...style, visibility: placed ? "visible" : "hidden" }}
          >
            <span className="skillpill-tip-label">{dayLabel}</span>
            <span className="skillpill-tip-when">{description}</span>
          </div>,
          document.body
        )}
    </>
  );
}

export default function GitHubActivity() {
  // Starts empty and fills in after mount. Nothing here is derived from the
  // clock during SSR, so there's no server/client date drift to hydrate
  // around — and no placeholder numbers standing in for real ones.
  const [days, setDays] = useState<DayActivity[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [latestPushAt, setLatestPushAt] = useState<string | null>(null);
  const [latestLabel, setLatestLabel] = useState("—");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-activity")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (cancelled || !Array.isArray(data.days)) return;
        setDays(data.days);
        setTotal(
          typeof data.totalContributions === "number"
            ? data.totalContributions
            : null
        );
        setLatestPushAt(data.latestPushAt ?? null);
      })
      .catch(() => {
        /* No token, rate-limited, or offline. The strip stays empty rather
           than inventing a cadence — see the note in data/engineering.ts. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Relative time only ever runs on the client, after mount, so the server-
  // rendered markup and the first client render always agree.
  useEffect(() => {
    if (!latestPushAt) return;
    setLatestLabel(formatRelative(latestPushAt));
    const id = setInterval(() => {
      setLatestLabel(formatRelative(latestPushAt));
    }, 60_000);
    return () => clearInterval(id);
  }, [latestPushAt]);

  const { stats } = githubFallback;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="t-label">Shipping cadence</p>
        <p className="t-label">
          {total === null
            ? "Last 30 days"
            : `${total} contribution${total === 1 ? "" : "s"} · last 30 days`}
        </p>
      </div>

      <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto py-2">
        {days.length === 0
          ? // Pre-load / unavailable: 30 inert outlines. Same footprint as the
            // loaded strip, so nothing shifts when the real data lands.
            Array.from({ length: DAY_COUNT }, (_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={CELL_CLASS}
                style={TIER_STYLE[0]}
              />
            ))
          : days.map((day) => <DayCell key={day.date} day={day} />)}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        <div className="border-t border-rule pt-3">
          <p className="t-label">Repositories Shipped</p>
          <p className="t-figure mt-1.5 text-[1.5rem] text-gold">
            {stats.reposShipped}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Primary Stack</p>
          <p className="t-figure mt-1.5 text-[1.25rem] text-gold">
            {stats.primaryStack}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Engineering Focus</p>
          <p className="t-figure mt-1.5 text-[1.25rem] text-gold">
            {stats.engineeringFocus}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Latest Push</p>
          <p className="t-figure mt-1.5 text-[1.5rem] text-gold">
            {latestLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
