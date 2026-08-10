"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type ImpactMetric = { label: string; value: string };

type HeroProjectData = {
  title: string;
  year: string;
  role: string;
  summary: string;
  overview?: string;
  tags: string[];
  impactMetrics?: ImpactMetric[];
  github?: string;
  live?: string;
};

const TABS = [
  { key: "overview", label: "System Overview" },
  { key: "stack", label: "Tech Stack & Tools" },
  { key: "impact", label: "Impact Metrics" },
] as const;

/**
 * The flagship spotlight. Left column sells the project in plain language;
 * right column is a tabbed instrument panel, reusing the same is-active pill
 * pattern as .usa-chip / .impcalc-tick rather than a fourth tab component.
 */
export default function HeroProject({ project }: { project: HeroProjectData }) {
  const [active, setActive] = useState<number>(0);
  const metrics = project.impactMetrics ?? [];

  return (
    <section className="card relative overflow-hidden lg:grid lg:grid-cols-[1.1fr_1fr]">
      {/* A single gold bloom off the top-right corner. The card already picks up
          the pointer light on hover; this gives the flagship a standing lift the
          minor cards don't have, so it reads as the primary object at rest. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%, rgb(200 64 54 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative z-1 p-6 sm:p-8 lg:p-10">
        <p className="t-label">
          {project.year} · {project.role} · Flagship build
        </p>
        <h2 className="t-h2 mt-3">{project.title}</h2>
        <p className="t-sub mt-4 max-w-md">{project.summary}</p>

        {/* Three columns rather than a wrapping flex row: the metrics are a
            spec sheet, and a fixed grid keeps their labels aligned no matter
            how long the values get. */}
        {metrics.length > 0 && (
          <ul className="mt-7 grid max-w-lg grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <li key={metric.label} className="min-w-0">
                <p className="t-figure text-[1.375rem] text-gold">
                  {metric.value}
                </p>
                <p className="t-label mt-1">{metric.label}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
            >
              Open the site <ArrowUpRight size={15} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Source <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>

      <div className="relative z-1 border-t border-rule p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        {/* Standard ARIA tabs pattern (tablist/tab/tabpanel), not aria-pressed
            toggle-button semantics — a screen reader now announces "tab 2 of
            3, selected" rather than just "button, pressed". Tabs stay in
            normal tab order (no roving tabindex / arrow-key nav): that's an
            ARIA APG recommendation, not a WCAG 2.1 AA requirement, and
            without arrow-key handling a roving tabindex would make the
            unselected tabs unreachable by keyboard — worse, not better. */}
        <div
          role="tablist"
          aria-label="Flagship project details"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              id={`hero-tab-${tab.key}`}
              role="tab"
              onClick={() => setActive(i)}
              aria-selected={active === i}
              aria-controls={`hero-panel-${tab.key}`}
              className={`usa-chip ${active === i ? "is-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`hero-panel-${TABS[active].key}`}
          aria-labelledby={`hero-tab-${TABS[active].key}`}
          className="mt-6"
        >
          {/* The overview is the one long prose block on the card; a gold left
              rule marks it as a callout rather than another paragraph. */}
          {active === 0 && (
            <p className="t-sub border-l-2 border-gold/40 py-1 pl-4">
              {project.overview ?? project.summary}
            </p>
          )}

          {active === 1 && (
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="pill">{tag}</span>
                </li>
              ))}
            </ul>
          )}

          {active === 2 && (
            <div className="readout">
              {metrics.length === 0 ? (
                <p className="t-sub-sm opacity-50">
                  No published metrics yet.
                </p>
              ) : (
                metrics.map((metric) => (
                  <div key={metric.label} className="readout-row">
                    <span className="readout-key t-label">
                      {metric.label}
                    </span>
                    <span className="readout-value t-figure">
                      {metric.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
