"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import type { Project } from "./ProjectsExplorer";

const MONO_STACK =
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace';

const TABS = [
  { key: "overview", label: "System Overview" },
  { key: "stack", label: "Tech Stack & Tools" },
  { key: "impact", label: "Impact Metrics" },
] as const;

/**
 * Developer-flavored alternative to the grid: one row per project, styled as
 * a ledger. Unlike the grid, a row doesn't open the drawer — it expands
 * in place into a tabbed tray, so the ledger stays a single dense, scannable
 * surface with no overlay. Only one row is open at a time (classic accordion),
 * tracked here and handed down to each row.
 */
export default function ProjectLedger({ projects }: { projects: Project[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div className="mt-8">
      {projects.map((project) => (
        <LedgerRow
          key={project.slug}
          project={project}
          isOpen={expandedSlug === project.slug}
          onToggle={() =>
            setExpandedSlug((current) =>
              current === project.slug ? null : project.slug
            )
          }
        />
      ))}
    </div>
  );
}

function LedgerRow({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const hasCaseStudy = !project.linkOut && project.content.length > 0;
  const metrics = project.impactMetrics ?? [];
  const trayId = `ledger-tray-${project.slug}`;

  return (
    <div>
      {/* Row header is a real <button>, so Enter/Space activation, focus, and
          tab order all come from the browser for free — no role="button" +
          manual keydown handler needed, that pattern is only for non-button
          elements. The monospace stack is scoped to just this button via
          inline style, same as before; the tray below it uses the site's
          normal type (prose, not code), so it isn't inherited down. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={trayId}
        className="readout-row w-full text-left transition-colors hover:border-gold/40"
        style={{ fontFamily: MONO_STACK }}
      >
        <span className="readout-key text-[0.8125rem]">
          <span className="text-bone">{project.slug}</span>
          <span className="text-muted"> · main</span>
        </span>

        <span className="readout-note mt-1 flex flex-wrap gap-1.5 sm:mt-0">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="pill text-[0.625rem]"
              style={{ fontFamily: "var(--font-hn)" }}
            >
              {tag}
            </span>
          ))}
        </span>

        <span className="readout-value flex items-center justify-end gap-2 text-[0.8125rem]">
          <span
            className={project.status === "Live" ? "text-gold" : "text-muted"}
          >
            {project.status}
          </span>
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div id={trayId} className="border-b border-rule py-5 pl-1">
          <div
            role="tablist"
            aria-label={`Details for ${project.title}`}
            className="flex flex-wrap gap-2"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                id={`ledger-tab-${project.slug}-${tab.key}`}
                role="tab"
                onClick={() => setActiveTab(i)}
                aria-selected={activeTab === i}
                aria-controls={`ledger-panel-${project.slug}-${tab.key}`}
                className={`usa-chip ${activeTab === i ? "is-active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`ledger-panel-${project.slug}-${TABS[activeTab].key}`}
            aria-labelledby={`ledger-tab-${project.slug}-${TABS[activeTab].key}`}
            className="mt-4 max-w-2xl"
          >
            {activeTab === 0 && (
              <p className="t-sub-sm border-l-2 border-gold/40 py-1 pl-4">
                {project.overview ?? project.summary}
              </p>
            )}

            {activeTab === 1 && (
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className="pill">{tag}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 2 &&
              (metrics.length === 0 ? (
                <p className="t-sub-sm opacity-50">No published metrics yet.</p>
              ) : (
                <div className="readout">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="readout-row">
                      <span className="readout-key t-label">
                        {metric.label}
                      </span>
                      <span className="readout-value t-figure">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            {hasCaseStudy && (
              <Link
                href={`/projects/${project.slug}`}
                className="link-rule text-[0.8125rem] text-gold"
              >
                Read the full case study <ArrowUpRight size={15} />
              </Link>
            )}
            {project.linkOut && project.external && (
              <a
                href={project.external}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[0.8125rem]"
              >
                Visit the site <ArrowUpRight size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[0.8125rem]"
              >
                Open the site <ArrowUpRight size={15} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[0.8125rem]"
              >
                Source <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
