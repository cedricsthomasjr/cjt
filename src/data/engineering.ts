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
  tags: ["AWS Bedrock", "Databricks", "Pydantic", "AWS Strands SDK"],
};

/**
 * Hand-authored summary stats for the /projects dashboard. These are claims
 * about the shape of the work, not measurements, so they live here.
 *
 * Deliberately absent: any stand-in for the daily contribution counts. Those
 * come from /api/github-activity (GitHub's own contribution calendar) or the
 * strip renders empty. A plausible-looking placeholder array is precisely how
 * the widget ended up disagreeing with the real profile graph.
 */
export const githubFallback = {
  stats: {
    reposShipped: "8",
    primaryStack: "Python / TypeScript / SQL",
    engineeringFocus: "Data Engineering & AI/ML",
  },
};
