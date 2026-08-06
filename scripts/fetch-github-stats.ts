/**
 * Build-time GitHub stats fetcher. Runs as `prebuild` (see package.json) so
 * data/repo-cache.json — the committed fallback the live /projects page
 * falls back to when it can't reach GitHub — stays reasonably fresh across
 * deploys, even though the page itself no longer depends on this file being
 * current (see src/lib/projectStats.ts for the live path).
 *
 * Mirrors the token handling and fail-soft posture of
 * src/app/api/github-activity/route.ts: this only ever reads GITHUB_TOKEN
 * build-side, and a missing token or a bad API response degrades to "keep
 * whatever is already on disk" rather than breaking the build or writing
 * hollow data over good data.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fetchAllProjectStats, type RepoCache } from "../src/lib/repoStats";

const CACHE_PATH = path.join(process.cwd(), "data", "repo-cache.json");

async function loadExistingCache(): Promise<RepoCache> {
  try {
    const raw = await readFile(CACHE_PATH, "utf-8");
    return JSON.parse(raw) as RepoCache;
  } catch {
    return {};
  }
}

function isEmpty(stats: RepoCache[string]) {
  return stats.commits === 0 && stats.stars === 0 && stats.languages.length === 0;
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const existing = await loadExistingCache();

  if (!token) {
    console.warn(
      "[fetch-github-stats] GITHUB_TOKEN is not configured — keeping existing data/repo-cache.json"
    );
    return;
  }

  const fetched = await fetchAllProjectStats(token);
  const allFailed = Object.values(fetched).every(isEmpty);

  if (allFailed && Object.keys(existing).length > 0) {
    console.warn(
      "[fetch-github-stats] every repo fetch failed — keeping existing data/repo-cache.json"
    );
    return;
  }

  // Merge onto the existing cache so a project whose repos all failed this
  // run keeps its last-known-good numbers instead of getting zeroed out.
  const merged: RepoCache = { ...existing };
  for (const [projectKey, stats] of Object.entries(fetched)) {
    if (isEmpty(stats) && existing[projectKey]) continue;
    merged[projectKey] = stats;
  }

  await mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await writeFile(CACHE_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");
  console.log(
    `[fetch-github-stats] wrote data/repo-cache.json (${Object.keys(merged).length} projects)`
  );
}

main().catch((error) => {
  console.warn(
    `[fetch-github-stats] unexpected failure — keeping existing data/repo-cache.json: ${
      error instanceof Error ? error.message : error
    }`
  );
});
