/**
 * Curated, hand-authored data for the /projects dashboard that doesn't belong
 * in projects.json: the "currently building" banner copy, and a fallback
 * GitHub-activity snapshot used until (or unless) the live fetch in
 * GitHubActivity succeeds. See docs/superpowers/specs/2026-08-05-projects-
 * dashboard-design.md for the full design.
 */

export const currentFocus = {
  status: "Active Sprint",
  focus: "Enterprise AI Agent Orchestration & Pipeline Automation",
  tags: ["AWS Bedrock", "Databricks", "Pydantic", "TypeScript"],
};

/**
 * Shape mirrors what the live GitHub Events fetch produces: 12 weeks of
 * commit counts (oldest → newest) plus the summary stats row. Rendered first,
 * on every load, then silently replaced if the live fetch succeeds.
 */
export const githubFallback = {
  weeks: [2, 5, 0, 8, 12, 4, 1, 9, 14, 6, 3, 11],
  stats: {
    reposShipped: "8",
    primaryStack: "Python / TypeScript / SQL",
    engineeringFocus: "Data Engineering & AI/ML",
    latestCommitAt: "2026-08-04T18:00:00Z",
  },
};
