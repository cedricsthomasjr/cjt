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

const TABS = ["System Overview", "Tech Stack & Tools", "Impact Metrics"] as const;

/**
 * The flagship spotlight. Left column sells the project in plain language;
 * right column is a tabbed instrument panel, reusing the same is-active pill
 * pattern as .usa-chip / .impcalc-tick rather than a fourth tab component.
 */
export default function HeroProject({ project }: { project: HeroProjectData }) {
  const [active, setActive] = useState<number>(0);
  const metrics = project.impactMetrics ?? [];

  return (
    <section className="card overflow-hidden lg:grid lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="t-label">
          {project.year} · {project.role} · Flagship build
        </p>
        <h2 className="t-h2 mt-3">{project.title}</h2>
        <p className="t-sub mt-4 max-w-md">{project.summary}</p>

        {metrics.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
            {metrics.map((metric) => (
              <li key={metric.label}>
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

      <div className="border-t border-rule p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        <div className="flex flex-wrap gap-2">
          {TABS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`usa-chip ${active === i ? "is-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {active === 0 && (
            <p className="t-sub">
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
