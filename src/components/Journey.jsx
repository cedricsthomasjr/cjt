"use client";

import { useState } from "react";
import Figure from "@/components/Figure";
import useInView from "@/components/useInView";
import { journey, record } from "@/data/resume";

/**
 * The route, drawn on a real projection.
 *
 * Every node sits at its actual latitude and longitude, run through a plain
 * equirectangular projection over the continental United States. No coastline
 * is drawn — a hand-traced outline would be decoration pretending to be a map,
 * and the site does not do that with data. What carries the geography instead
 * is the graticule and the true relative positions: Beaverton really is that
 * far from everything else, and Farmington really does sit just off New York.
 *
 * The arcs bow so the path reads as travel rather than a wireframe, and they
 * draw in sequence once the figure enters the viewport.
 */

/* Continental US bounds, west/east longitude and south/north latitude. */
const BOUNDS = { west: -125, east: -66, south: 24, north: 50 };
const VIEW = { w: 1000, h: 440 };

function project({ lat, lon }) {
  return {
    x: ((lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w,
    y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h,
  };
}

const points = journey.map((stop) => ({ ...stop, ...project(stop) }));

/**
 * A quadratic arc between two points, bowed perpendicular to the line so long
 * hops curve like a flight path and short ones stay nearly straight.
 */
function arc(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy);
  const lift = Math.min(distance * 0.18, 90);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  // Perpendicular offset, always bowing upward on screen.
  const controlX = midX + (dy / distance) * lift * (dx < 0 ? -1 : 1);
  const controlY = midY - (dx / distance) * lift * (dx < 0 ? -1 : 1);
  return `M ${a.x} ${a.y} Q ${controlX} ${controlY} ${b.x} ${b.y}`;
}

const segments = points.slice(0, -1).map((from, i) => arc(from, points[i + 1]));

/* Longitude and latitude lines, purely to say "this is a projection". */
const meridians = [-120, -105, -90, -75].map(
  (lon) => project({ lat: 0, lon }).x
);
const parallels = [45, 40, 35, 30].map((lat) => project({ lat, lon: 0 }).y);

export default function Journey() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [activeId, setActiveId] = useState(journey[journey.length - 1].id);

  const active = journey.find((stop) => stop.id === activeId);
  const activeIndex = journey.findIndex((stop) => stop.id === activeId);

  return (
    <div ref={ref} className={`journey ${inView ? "is-in" : ""}`}>
      <div className="card overflow-hidden">
        <svg
          className="journey-map"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label="Map of five places, from Atlanta to Baton Rouge to Farmington to New York to Beaverton."
        >
          <g className="journey-grid" aria-hidden="true">
            {meridians.map((x) => (
              <line key={`m${x}`} x1={x} y1="0" x2={x} y2={VIEW.h} />
            ))}
            {parallels.map((y) => (
              <line key={`p${y}`} x1="0" y1={y} x2={VIEW.w} y2={y} />
            ))}
          </g>

          {segments.map((d, i) => (
            <path
              key={d}
              className="journey-arc"
              d={d}
              style={{ animationDelay: `${i * 260}ms` }}
              aria-hidden="true"
            />
          ))}

          {points.map((stop, i) => {
            const isActive = stop.id === activeId;
            return (
              <g
                key={stop.id}
                className={`journey-node ${isActive ? "is-active" : ""}`}
                style={{ animationDelay: `${700 + i * 160}ms` }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${stop.city}, ${stop.region} — ${stop.org}, ${stop.time}`}
                onMouseEnter={() => setActiveId(stop.id)}
                onFocus={() => setActiveId(stop.id)}
                onClick={() => setActiveId(stop.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(stop.id);
                  }
                }}
              >
                {/* Generous invisible target so this is tappable on a phone. */}
                <circle className="journey-hit" cx={stop.x} cy={stop.y} r="34" />
                <circle className="journey-halo" cx={stop.x} cy={stop.y} r="16" />
                <circle className="journey-dot" cx={stop.x} cy={stop.y} r="6" />
                {/* Placement is authored per stop rather than derived. Two of
                    these sit almost on top of each other (Farmington is a short
                    hop from New York) and Beaverton is hard against the west
                    edge, so a single rule would either collide or clip. */}
                <text
                  className="journey-label"
                  x={stop.x + stop.label.dx}
                  y={stop.y + stop.label.dy}
                  textAnchor={stop.label.anchor}
                >
                  {stop.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* The same five stops as real buttons: the map's controls on a phone,
          and the keyboard path that does not depend on SVG focus behaviour. */}
      {/* Plain toggle buttons rather than a tabs pattern. A real tablist needs
          tabpanel semantics and roving tabindex to be honest; these just swap
          the content of one live region, and aria-pressed says exactly that. */}
      <div className="journey-chips">
        {journey.map((stop, i) => (
          <button
            key={stop.id}
            type="button"
            aria-pressed={stop.id === activeId}
            className={`journey-chip ${stop.id === activeId ? "is-active" : ""}`}
            onClick={() => setActiveId(stop.id)}
            onMouseEnter={() => setActiveId(stop.id)}
          >
            <span className="journey-chip-index">{String(i + 1).padStart(2, "0")}</span>
            {stop.city}
          </button>
        ))}
      </div>

      <div className="card mt-4 p-6 sm:p-8" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="t-label-gold">{active.kicker}</p>
          <p className="t-label">{active.time}</p>
        </div>

        <h3 className="t-h2 mt-4">{active.org}</h3>
        <p className="t-label mt-2">
          {active.city}, {active.region}
        </p>
        <p className="t-sub mt-4 max-w-2xl">{active.text}</p>

        {active.figures && (
          <div className="readout mt-6 border-t border-rule pt-2">
            {record.map((row, i) => (
              <div key={row.key} className="readout-row">
                <p className="readout-key t-label">{row.key}</p>
                <p className="readout-note t-sub-sm">{row.note}</p>
                <p className="readout-value t-figure">
                  <Figure
                    prefix={row.prefix}
                    num={row.num}
                    suffix={row.suffix}
                    delay={i * 90}
                  />
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="t-label mt-6">
          Stop {String(activeIndex + 1).padStart(2, "0")} of{" "}
          {String(journey.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
