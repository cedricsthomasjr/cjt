"use client";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import useInView from "@/components/useInView";
import { TIMELINE_DATA } from "@/data/timelineData";
import { DOTS, OUTLINE, project } from "@/data/usaGeometry";

/**
 * The route across the country, on a real projection.
 *
 * The landmass is a hex lattice of dots sampled inside the actual US boundary
 * (see usaGeometry.ts) rather than a hand-traced silhouette, and the five nodes
 * are the coordinates in timelineData.ts run through the same Albers conic. So
 * the shape is true: Beaverton really is that far from everything else, and
 * Farmington really does sit a half-inch off New York.
 *
 * Everywhere else on this site the light source is the cursor. Here it is the
 * story — the lamp is pinned to whichever stop is active, and the country
 * brightens around it. Moving through the route moves the light across the map.
 */

/* The viewBox is wider than the geometry (which fits 0–1000 x 0–620) so the
   labels have gutters to sit in instead of clipping at the edges. */
const BOX = { x: -80, y: -18, w: 1160, h: 656 };

/* Zero-length subpaths with a round linecap render as dots, which turns 1100
   circles into one path element. */
const DOT_PATH = DOTS.map(([x, y]) => `M${x} ${y}L${x} ${y}`).join("");

type Place = {
  id: string;
  label: string;
  stopIds: string[];
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
};

/* Label placement is authored per stop rather than derived. Connecticut and
   New York are 30px apart on this projection, and Beaverton is hard against
   the west edge, so one rule would either collide or clip. */
const PLACES: Place[] = [
  { id: "atlanta", label: "Atlanta", stopIds: ["atl-stop"], anchor: "start", dx: 24, dy: 7 },
  { id: "baton-rouge", label: "Baton Rouge", stopIds: ["btr-stop"], anchor: "middle", dx: 0, dy: 44 },
  {
    id: "connecticut",
    label: "Connecticut",
    stopIds: ["ct-corbin-1", "ct-corbin-2", "ct-corbin-3"],
    anchor: "start",
    dx: 24,
    dy: -12,
  },
  { id: "new-york", label: "New York", stopIds: ["nyc-stop"], anchor: "start", dx: 26, dy: 32 },
  { id: "beaverton", label: "Beaverton", stopIds: ["beaverton-stop"], anchor: "end", dx: -24, dy: 5 },
];

const NODES = PLACES.map((place) => {
  const stops = place.stopIds
    .map((id) => TIMELINE_DATA.find((stop) => stop.id === id))
    .filter((stop): stop is (typeof TIMELINE_DATA)[number] => Boolean(stop));
  const [x, y] = project(stops[0].location.coordinates);
  return { ...place, stops, x, y };
});

/**
 * A quadratic arc bowed perpendicular to the line, so a long hop curves like a
 * flight path and a short one stays nearly straight. Rounded for the same
 * server/client agreement reason as project().
 */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const snap = (value: number) => Math.round(value * 100) / 100;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = snap(Math.hypot(dx, dy)) || 1;
  const lift = Math.min(distance * 0.17, 92);
  const side = dx < 0 ? -1 : 1;
  const cx = snap((a.x + b.x) / 2 + (dy / distance) * lift * side);
  const cy = snap((a.y + b.y) / 2 - (dx / distance) * lift * side);
  return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`, length: snap(distance * 1.1) };
}

const SEGMENTS = NODES.slice(0, -1).map((from, i) => arc(from, NODES[i + 1]));

/* Connecticut and New York project only 29.5 units apart — closer than the
   38-unit hit circles authored for a thumb. Relying on per-circle hit-testing
   means whichever node paints on top always wins there, so tapping dead center
   on Connecticut actually selects New York. Resolving by nearest-center instead
   of DOM order fixes that: the boundary between the two becomes the
   perpendicular bisector of their centers, not an accident of paint order.
   getScreenCTM is used rather than a manual rect/viewBox ratio so this stays
   correct even if the SVG is ever letterboxed. */
const CAPTURE_R = 42;

function nearestNode(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const point = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  let nearest = NODES[0];
  let best = Infinity;
  for (const node of NODES) {
    const distance = Math.hypot(node.x - point.x, node.y - point.y);
    if (distance < best) {
      best = distance;
      nearest = node;
    }
  }
  return best <= CAPTURE_R ? nearest : null;
}

export default function UsaMap() {
  /* useInView.js is plain JS, so TS widens its tuple return to a union across
     both elements rather than pairing them positionally. Cast at this one
     call site instead of converting the hook, which three other JS
     components still import untyped. */
  const [ref, inView] = useInView({ threshold: 0.2 }) as [
    RefObject<HTMLDivElement | null>,
    boolean,
  ];
  const [activeId, setActiveId] = useState(NODES[NODES.length - 1].id);
  const svgRef = useRef<SVGSVGElement>(null);

  /* Single point of truth for pointer interaction, mouse and touch alike —
     see the note above CAPTURE_R for why this replaced per-circle handlers.
     Hover-follow only for mice; a touch drag firing pointermove shouldn't
     flip the active stop mid-scroll the way a mouse hovering past should. */
  const handlePointer = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.type === "pointermove" && event.pointerType !== "mouse") return;
    const svg = svgRef.current;
    if (!svg) return;
    const node = nearestNode(svg, event.clientX, event.clientY);
    if (node) setActiveId(node.id);
  };

  const active = useMemo(
    () => NODES.find((node) => node.id === activeId) ?? NODES[0],
    [activeId]
  );
  const activeIndex = NODES.findIndex((node) => node.id === activeId);

  /* Connecticut is three stints at one employer in one job. Repeating the org
     and the title above all three would say the same two lines three times, so
     they get hoisted whenever every stop agrees on them and each entry is left
     with only what actually differs: when it was, and what happened. */
  const sharedOrg = active.stops.every(
    (stop) =>
      stop.companyOrContext === active.stops[0].companyOrContext &&
      stop.roleTitle === active.stops[0].roleTitle
  );

  return (
    <div ref={ref} className={`usa ${inView ? "is-in" : ""}`}>
      <div className="usa-layout">
        <div>
          <div className="card usa-frame">
            <svg
              ref={svgRef}
              className="usa-map"
              viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Map of the United States showing a route from Atlanta to Baton Rouge to Connecticut to New York to Beaverton."
              onClick={handlePointer}
              onPointerMove={handlePointer}
            >
              <defs>
                {/* The lamp. cx/cy on a gradient are plain attributes rather
                    than geometry properties, so they cannot be transitioned —
                    the gradient sits at the origin and the masking rect carries
                    it to the active stop under a transform, which can. */}
                <radialGradient id="usa-lamp" gradientUnits="userSpaceOnUse" cx={0} cy={0} r={290}>
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#fff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <mask id="usa-lamp-mask">
                  <rect
                    className="usa-lamp"
                    x={-1400}
                    y={-1400}
                    width={2800}
                    height={2800}
                    fill="url(#usa-lamp)"
                    style={{ transform: `translate(${active.x}px, ${active.y}px)` }}
                  />
                </mask>
              </defs>

              <path className="usa-outline" d={OUTLINE} />

              {/* The landmass twice: unlit underneath, lit through the lamp. */}
              <path className="usa-dots" d={DOT_PATH} />
              <g mask="url(#usa-lamp-mask)">
                <path className="usa-dots-lit" d={DOT_PATH} />
              </g>

              {SEGMENTS.map((segment, i) => (
                <path
                  key={segment.d}
                  className="usa-arc"
                  d={segment.d}
                  style={{
                    strokeDasharray: segment.length,
                    ["--len" as string]: segment.length,
                    animationDelay: `${i * 240}ms`,
                  }}
                  aria-hidden="true"
                />
              ))}

              {NODES.map((node, i) => {
                const isActive = node.id === activeId;
                return (
                  <g
                    key={node.id}
                    className={`usa-node ${isActive ? "is-active" : ""}`}
                    style={{ animationDelay: `${820 + i * 150}ms` }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${node.label} — ${node.stops[0].companyOrContext}, ${node.stops[0].period}`}
                    onFocus={() => setActiveId(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveId(node.id);
                      }
                    }}
                  >
                    {/* Pointer interaction (hover, click, tap) is resolved at
                        the svg level by nearest-center distance — see
                        handlePointer. This circle still exists as the visual
                        hit-area and, via role="button" on the parent <g>,
                        the keyboard/focus target; it no longer needs its own
                        pointer handlers. */}
                    <circle className="usa-hit" cx={node.x} cy={node.y} r={38} />
                    {isActive && <circle className="usa-pulse" cx={node.x} cy={node.y} r={13} />}
                    <circle className="usa-halo" cx={node.x} cy={node.y} r={17} />
                    <circle className="usa-dot" cx={node.x} cy={node.y} r={6.5} />
                    <text
                      className="usa-label"
                      x={node.x + node.dx}
                      y={node.y + node.dy}
                      textAnchor={node.anchor}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* The same five stops as real buttons: the map's controls under a
              thumb, and a keyboard path that does not depend on SVG focus
              behaviour. They sit with the map because that is what they drive. */}
          <div className="usa-chips">
            {NODES.map((node, i) => (
              <button
                key={node.id}
                type="button"
                aria-pressed={node.id === activeId}
                className={`usa-chip ${node.id === activeId ? "is-active" : ""}`}
                onClick={() => setActiveId(node.id)}
                onMouseEnter={() => setActiveId(node.id)}
              >
                <span className="usa-chip-index">{String(i + 1).padStart(2, "0")}</span>
                {node.label}
                {node.stops.length > 1 && (
                  <span className="usa-chip-count">×{node.stops.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* One live region the map writes into. */}
        <div className="card usa-panel" aria-live="polite">
          <div className="flex items-baseline justify-between gap-4">
            <p className="t-label-gold">
              {String(activeIndex + 1).padStart(2, "0")} of{" "}
              {String(NODES.length).padStart(2, "0")}
            </p>
            <p className="t-label">{active.stops[0].location.cityState}</p>
          </div>

          <h3 className="t-h2 mt-4">{active.label}</h3>
          <hr className="hairline-gold mt-4" />

          {sharedOrg && (
            <div className="mt-5">
              <p className="t-sub-sm text-bone">{active.stops[0].companyOrContext}</p>
              <p className="t-sub-sm mt-1">{active.stops[0].roleTitle}</p>
            </div>
          )}

          <div className="usa-entries">
            {active.stops.map((stop) => (
              <div key={stop.id} className="usa-entry">
                {sharedOrg ? (
                  <p className="t-label">{stop.period}</p>
                ) : (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="t-sub-sm text-bone">{stop.companyOrContext}</p>
                      <p className="t-label">{stop.period}</p>
                    </div>
                    <p className="t-sub-sm mt-1">{stop.roleTitle}</p>
                  </>
                )}
                <p className="t-sub mt-2">{stop.narrativeSummary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
