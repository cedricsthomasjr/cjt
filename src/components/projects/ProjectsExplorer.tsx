"use client";

import { useState } from "react";
import CategoryFilter, { type Category } from "./CategoryFilter";
import ProjectCard from "./ProjectCard";
import ProjectLedger from "./ProjectLedger";
import ProjectDrawer from "./ProjectDrawer";

export type Project = {
  title: string;
  slug: string;
  year: string;
  role: string;
  status: string;
  category: string;
  image: string | null;
  linkOut?: boolean;
  external?: string;
  summary: string;
  overview?: string;
  impactMetrics?: { label: string; value: string }[];
  tags: string[];
  content: string[];
  features: string[];
  lessons: string[];
  github?: string;
  live?: string;
  gallery?: { src: string; caption: string }[];
};

type ViewMode = "grid" | "ledger";

/**
 * Owns the three pieces of state the filterable grid needs: which category is
 * active, whether we're in grid or ledger view, and which project (if any)
 * has its detail drawer open. Everything below it is presentational.
 */
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <hr className="hairline mb-10" />
      <h2 className="t-h3 mb-6">More builds</h2>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <div className="flex gap-2" role="group" aria-label="Switch view">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            className={`usa-chip ${viewMode === "grid" ? "is-active" : ""}`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode("ledger")}
            aria-pressed={viewMode === "ledger"}
            className={`usa-chip ${viewMode === "ledger" ? "is-active" : ""}`}
          >
            Ledger
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="t-sub-sm mt-10">
          Nothing filed under this category yet.
        </p>
      ) : viewMode === "grid" ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <ProjectLedger projects={filtered} />
      )}

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
