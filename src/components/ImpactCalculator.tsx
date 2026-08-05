"use client";

import { useMemo, useState } from "react";
import { TIMELINE_DATA, type TimelineStop } from "@/data/timelineData";

/**
 * A scrubber over all seven stops, including the three Corbin stints
 * individually — where <UsaMap> on the About page groups them under one
 * "Connecticut" node for the story, this stays one row per resume line and
 * lets a reader jump straight to the stint that had the metric they're
 * checking.
 *
 * Built for scanning, not for delight: no counters, no draw-in animation. A
 * native range input carries real keyboard support (arrow keys, Home/End)
 * for free, so this needed no custom key handling the way the map's SVG
 * buttons did.
 */

const TICKS = [
  { label: "Atlanta" },
  { label: "Baton Rouge" },
  { label: "Corbin I" },
  { label: "Corbin II" },
  { label: "Corbin III" },
  { label: "New York" },
  { label: "Beaverton" },
];

type Category = {
  key: keyof TimelineStop;
  label: string;
  render: "metric" | "pill" | "plain";
};

const CATEGORIES: Category[] = [
  { key: "quantifiableData", label: "Quantifiable metrics", render: "metric" },
  { key: "frameworkSkills", label: "Framework & skills", render: "pill" },
  { key: "tricksOfTheTrade", label: "Tricks of the trade", render: "plain" },
  { key: "softSkills", label: "Soft skills", render: "plain" },
  { key: "affiliationsGained", label: "Affiliations gained", render: "pill" },
];

/**
 * Splits a metric string at its leading quantitative token — "450+", "~$100K",
 * "+25%", "3.55" out of "GPA 3.55" — so the number a reader is actually
 * scanning for is the part set in gold, not the sentence around it.
 */
function splitMetric(text: string): [string, string, string] {
  const match = text.match(/([~$+]*\d[\d,.]*\+?[KkMmBb]?\+?%?)/);
  if (!match || match.index === undefined) return [text, "", ""];
  const start = match.index;
  const end = start + match[0].length;
  return [text.slice(0, start), text.slice(start, end), text.slice(end)];
}

export default function ImpactCalculator() {
  const [index, setIndex] = useState(TIMELINE_DATA.length - 1);
  const stop = TIMELINE_DATA[index];
  const progress = useMemo(
    () => (index / (TIMELINE_DATA.length - 1)) * 100,
    [index]
  );

  return (
    <div className="impcalc">
      <div className="impcalc-scrubber">
        <input
          type="range"
          className="impcalc-range"
          min={0}
          max={TIMELINE_DATA.length - 1}
          step={1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
          style={{ ["--fill" as string]: `${progress}%` }}
          aria-label="Timeline stop"
          aria-valuetext={`${stop.period}, ${stop.companyOrContext}`}
        />
        <div className="impcalc-ticks">
          {TICKS.map((tick, i) => (
            <button
              key={tick.label}
              type="button"
              className={`impcalc-tick ${i === index ? "is-active" : ""}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span className="impcalc-tick-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              {tick.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card impcalc-panel">
        <div className="impcalc-head">
          <div>
            <p className="t-label-gold">
              {String(index + 1).padStart(2, "0")} / {String(TIMELINE_DATA.length).padStart(2, "0")}
            </p>
            <p className="t-h3 mt-2">{stop.companyOrContext}</p>
            <p className="t-sub-sm mt-1">{stop.roleTitle}</p>
          </div>
          <div className="impcalc-head-meta">
            <p className="t-label">{stop.period}</p>
            <p className="t-label mt-1.5">{stop.location.cityState}</p>
          </div>
        </div>

        <hr className="hairline-gold mt-5" />

        <div className="impcalc-grid mt-5">
          {CATEGORIES.map((category) => {
            const items = stop[category.key] as string[];
            return (
              <div key={category.key} className="impcalc-col">
                <p className="t-label-gold">{category.label}</p>
                {items.length === 0 ? (
                  <p className="t-sub-sm mt-2 opacity-50">—</p>
                ) : category.render === "pill" ? (
                  <div className="impcalc-pills">
                    {items.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ul className="impcalc-list">
                    {items.map((item) => {
                      if (category.render !== "metric") {
                        return (
                          <li key={item} className="t-sub-sm">
                            {item}
                          </li>
                        );
                      }
                      const [before, metric, after] = splitMetric(item);
                      return (
                        <li key={item} className="t-sub-sm">
                          {before}
                          {metric && <strong className="impcalc-metric">{metric}</strong>}
                          {after}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
