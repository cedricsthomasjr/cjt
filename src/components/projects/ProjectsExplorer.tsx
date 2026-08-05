"use client";

import { useState } from "react";
import CategoryFilter, { type Category } from "./CategoryFilter";
import ProjectLedger from "./ProjectLedger";

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

/**
 * Ledger is the only way to browse the minor builds — no grid, no drawer.
 * The one piece of state this owns is which category is active; expansion
 * state for an individual row lives inside ProjectLedger itself.
 */
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <hr className="hairline mb-10" />
      <h2 className="t-h3 mb-6">Other builds &amp; experiments</h2>

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {filtered.length === 0 ? (
        <p className="t-sub-sm mt-10">
          Nothing filed under this category yet.
        </p>
      ) : (
        <ProjectLedger projects={filtered} />
      )}
    </div>
  );
}
