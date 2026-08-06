/**
 * Server-side data layer for the /projects page's live GitHub badges.
 *
 * "Live and updated" here means the same thing it means for the shipping-
 * cadence strip in GitHubActivity: a Next.js `revalidate` window, not a
 * cron job or a database. getRepoStats() is called from the /projects
 * Server Component with REVALIDATE_SECONDS wired through to the underlying
 * fetches (see fetchAllProjectStats), so Vercel serves the cached page
 * instantly and refreshes it in the background roughly every 30 minutes —
 * no redeploy required for the numbers to move.
 *
 * data/repo-cache.json (written at build time by scripts/fetch-github-
 * stats.ts) is the fallback for the two cases that path can't cover: no
 * GITHUB_TOKEN in the runtime environment, or GitHub being unreachable —
 * exactly the githubFallback pattern GitHubActivity already uses, one layer
 * down the stack.
 */

import staticCache from "../../data/repo-cache.json";
import { fetchAllProjectStats, type ProjectStats, type RepoCache } from "./repoStats";

export const REVALIDATE_SECONDS = 1800;

const FALLBACK_CACHE = staticCache as RepoCache;

function isEmpty(stats: ProjectStats) {
  return stats.commits === 0 && stats.stars === 0 && stats.languages.length === 0;
}

/** Live stats when they're available, the last committed snapshot otherwise.
 *  Never throws — a page rendering with slightly stale numbers is fine; a
 *  build failing because GitHub had a bad moment is not. */
export async function getRepoStats(): Promise<RepoCache> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return FALLBACK_CACHE;

  try {
    const live = await fetchAllProjectStats(token, REVALIDATE_SECONDS);
    const hasAnyData = Object.values(live).some((stats) => !isEmpty(stats));
    return hasAnyData ? live : FALLBACK_CACHE;
  } catch {
    return FALLBACK_CACHE;
  }
}

/** projects.json slugs → the REPO_CONFIG key that carries their stats.
 *  Kept explicit rather than assuming slug === key, since project slugs
 *  follow the site's own kebab-case convention while REPO_CONFIG keys are
 *  literal GitHub repo names (`CrossyAnt`, not `crossyant`). */
const SLUG_TO_STATS_KEY: Record<string, string> = {
  bullbrief: "bullbrief",
  apeirion: "apeirion",
  cjt: "cjt",
  crossyant: "CrossyAnt",
  "air-ticket-system": "air-ticket-system",
};

type ImpactMetric = { label: string; value: string };
type ProjectLike = { slug: string; impactMetrics?: ImpactMetric[] };

/** Appends live-derived readouts (commit count, primary language, stars) to
 *  a project's existing impactMetrics, rather than replacing them — the
 *  curated metrics describe what the project *does*; these describe how
 *  actively it's maintained. Returns the project unchanged if its slug
 *  isn't mapped or the cache has nothing for it, so calling this on every
 *  project in the ledger (not just the five with GitHub-backed metrics) is
 *  safe by construction.
 *
 *  This is the "populate UI metric badges" wiring: HeroProject and
 *  ProjectLedger already render `impactMetrics` as-is, so merging happens
 *  here at the data layer and neither component's interface changes. */
export function withLiveMetrics<T extends ProjectLike>(
  project: T,
  repoStats: RepoCache
): T {
  const statsKey = SLUG_TO_STATS_KEY[project.slug];
  const stats = statsKey ? repoStats[statsKey] : undefined;
  if (!stats) return project;

  const liveMetrics: ImpactMetric[] = [
    { label: "Commits (main)", value: String(stats.commits) },
  ];
  if (stats.languages.length > 0) {
    liveMetrics.push({
      label: "Primary language(s)",
      value: stats.languages.join(" / "),
    });
  }
  if (stats.stars > 0) {
    liveMetrics.push({ label: "Stars", value: String(stats.stars) });
  }

  return {
    ...project,
    impactMetrics: [...(project.impactMetrics ?? []), ...liveMetrics],
  };
}
